// app/api/explain-like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { buildExplainLikePrompt } from '@/lib/ai/prompts';
import type { UserLevel } from '@/types';

// In-memory cache: lesson+persona+level → regenerated content
const explainCache = new Map<string, { content: string; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface ExplainLikeRequest {
  lessonContent: string;   // The original markdown content
  lessonTitle: string;
  persona: string;         // e.g., "chef", "doctor", "kid", "manager", "developer"
  level: UserLevel;
}

function validateRequest(body: unknown): body is ExplainLikeRequest {
  if (!body || typeof body !== 'object') return false;
  const req = body as Record<string, unknown>;
  if (typeof req.lessonContent !== 'string' || !req.lessonContent) return false;
  if (typeof req.lessonTitle !== 'string' || !req.lessonTitle) return false;
  if (typeof req.persona !== 'string' || !req.persona) return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(req.level as string)) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!validateRequest(body)) {
      return NextResponse.json(
        { error: 'Required: lessonContent, lessonTitle, persona, level' },
        { status: 400 }
      );
    }

    const { lessonContent, lessonTitle, persona, level } = body;

    // Check cache
    const cacheKey = `explain:${lessonTitle}:${persona}:${level}`;
    const cached = explainCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({ content: cached.content, cached: true });
    }

    // Build prompt and call Claude
    const prompt = buildExplainLikePrompt({
      lessonContent,
      lessonTitle,
      persona,
      level,
    });

    // Use generateContent but we need raw text, not JSON
    // So we'll call Claude directly here for text output
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      temperature: 0.8,  // Slightly creative for persona voice
      system: `You are a creative AI educator who can explain technical concepts through the lens of different professions and perspectives. You maintain technical accuracy while making the content feel native to the chosen persona's world.`,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find(b => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 502 }
      );
    }

    const generatedContent = textBlock.text.trim();

    // Cache it
    explainCache.set(cacheKey, {
      content: generatedContent,
      timestamp: Date.now(),
    });

    return NextResponse.json({ content: generatedContent, cached: false });

  } catch (error) {
    console.error('Explain-like error:', error);

    if (error instanceof Error) {
      if (error.message.includes('rate') || error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Try again shortly.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate explanation. Please try again.' },
      { status: 500 }
    );
  }
}
