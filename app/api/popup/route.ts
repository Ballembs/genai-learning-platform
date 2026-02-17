// app/api/popup/route.ts
// POST endpoint for generating popup content for unknown terms

import { NextRequest, NextResponse } from 'next/server';
import { generateContent, isClaudeError, checkDailyLimit } from '@/lib/ai/claude';
import { buildPopupPrompt } from '@/lib/ai/prompts';
import { checkRateLimit } from '@/lib/rate-limit';
import type {
  GeneratePopupRequest,
  GeneratePopupResponse,
  PopupContent,
  UserLevel,
  UserGoal,
} from '@/types';

/**
 * Extract client IP address from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

// In-memory cache for generated popups
// In production, this would be stored in a database (Supabase)
const popupCache = new Map<string, { content: PopupContent; timestamp: number }>();

// Cache TTL: 24 hours
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Generate a cache key from request parameters
 */
function getCacheKey(termId: string, level: UserLevel): string {
  return `popup:${termId}:${level}`;
}

/**
 * Check if a cached entry is still valid
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL_MS;
}

/**
 * Validate the request body
 */
function validateRequest(body: unknown): body is GeneratePopupRequest {
  if (!body || typeof body !== 'object') return false;

  const req = body as Record<string, unknown>;

  if (typeof req.termId !== 'string' || !req.termId) return false;
  if (typeof req.term !== 'string' || !req.term) return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(req.level as string)) return false;
  if (!req.context || typeof req.context !== 'object') return false;

  const ctx = req.context as Record<string, unknown>;
  if (typeof ctx.lessonId !== 'string') return false;
  if (typeof ctx.lessonTitle !== 'string') return false;

  return true;
}

/**
 * POST /api/popup
 * Generate popup content for a term
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 30 requests per minute (popups are lightweight)
    const ip = getClientIP(request);
    const { allowed, resetIn } = checkRateLimit(`popup:${ip}`, 30, 60000);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
      );
    }

    // Daily API spending guard
    const dailyCheck = checkDailyLimit();
    if (!dailyCheck.allowed) {
      return NextResponse.json(
        { error: 'Daily API limit reached. Service will reset at midnight UTC.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate request
    if (!validateRequest(body)) {
      return NextResponse.json(
        {
          error: 'Invalid request. Required: termId, term, level, context.lessonId, context.lessonTitle'
        },
        { status: 400 }
      );
    }

    const { termId, term, level, context } = body;
    const goal = (body as { goal?: string }).goal as UserGoal | undefined;

    // Check cache first
    const cacheKey = getCacheKey(termId, level);
    const cached = popupCache.get(cacheKey);

    if (cached && isCacheValid(cached.timestamp)) {
      const response: GeneratePopupResponse = {
        content: cached.content,
        cached: true,
      };
      return NextResponse.json(response);
    }

    // Generate new content with Claude
    const prompt = buildPopupPrompt({
      term,
      level,
      lessonTitle: context.lessonTitle,
      surroundingText: context.surroundingText,
      goal,
    });

    const result = await generateContent<PopupContent>(prompt, {
      maxTokens: 512,
      temperature: 0.7,
    });

    // Validate the response structure
    const content = result.data;
    if (!content.explanation || typeof content.explanation !== 'string') {
      throw new Error('Invalid response: missing explanation');
    }

    // Normalize the response (ensure optional fields are properly typed)
    const normalizedContent: PopupContent = {
      explanation: content.explanation,
      example: content.example || undefined,
      diagram: content.diagram || undefined,
    };

    // Cache the result
    popupCache.set(cacheKey, {
      content: normalizedContent,
      timestamp: Date.now(),
    });

    // Return response
    const response: GeneratePopupResponse = {
      content: normalizedContent,
      cached: false,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Popup generation error:', error);

    // Handle specific error types
    if (isClaudeError(error)) {
      if (error.code === 'config_error') {
        return NextResponse.json(
          { error: 'AI service not configured. Please set ANTHROPIC_API_KEY.' },
          { status: 503 }
        );
      }
      if (error.code === 'parse_error') {
        return NextResponse.json(
          { error: 'Failed to parse AI response. Please try again.' },
          { status: 502 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Handle Anthropic API errors
    if (error instanceof Error) {
      // Rate limit or quota errors
      if (error.message.includes('rate') || error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'AI service is temporarily unavailable. Please try again later.' },
          { status: 429 }
        );
      }
      // API key errors
      if (error.message.includes('API key') || error.message.includes('authentication')) {
        return NextResponse.json(
          { error: 'AI service authentication failed. Please check configuration.' },
          { status: 503 }
        );
      }
    }

    // Generic error
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/popup
 * Return API information
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/popup',
    method: 'POST',
    description: 'Generate popup content for a term',
    body: {
      termId: 'string - Unique identifier for the term',
      term: 'string - The term to explain',
      level: 'beginner | intermediate | advanced',
      context: {
        lessonId: 'string - Current lesson ID',
        lessonTitle: 'string - Current lesson title',
        surroundingText: 'string (optional) - Text around the term',
      },
    },
    response: {
      content: {
        explanation: 'string - 2-3 sentence explanation',
        example: 'string (optional) - Concrete example',
        diagram: 'string (optional) - Mermaid diagram code',
      },
      cached: 'boolean - Whether result was from cache',
    },
  });
}
