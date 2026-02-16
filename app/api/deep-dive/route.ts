// app/api/deep-dive/route.ts
// POST endpoint for generating comprehensive deep dive content

import { NextRequest, NextResponse } from 'next/server';
import { generateContent, isClaudeError } from '@/lib/ai/claude';
import { buildDeepDivePrompt } from '@/lib/ai/prompts';
import type {
  GenerateDeepDiveRequest,
  GenerateDeepDiveResponse,
  DeepDiveContent,
  CodeExample,
  Misconception,
  RelatedTerm,
  AdvancedTopic,
  QuizQuestion,
  UserLevel,
} from '@/types';

// In-memory cache for generated deep dives
// In production, this would be stored in a database (Supabase)
const deepDiveCache = new Map<
  string,
  { content: DeepDiveContent; timestamp: number; generatedAt: Date }
>();

// Cache TTL: 7 days (deep dives are expensive to generate)
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Generate a cache key from request parameters
 */
function getCacheKey(termId: string, level: UserLevel): string {
  return `deep-dive:${termId}:${level}`;
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
function validateRequest(body: unknown): body is GenerateDeepDiveRequest {
  if (!body || typeof body !== 'object') return false;

  const req = body as Record<string, unknown>;

  if (typeof req.termId !== 'string' || !req.termId) return false;
  if (typeof req.term !== 'string' || !req.term) return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(req.level as string)) return false;
  if (!req.context || typeof req.context !== 'object') return false;

  const ctx = req.context as Record<string, unknown>;
  if (typeof ctx.fromLessonId !== 'string') return false;
  if (!Array.isArray(ctx.exploredTerms)) return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(ctx.userLevel as string)) return false;

  return true;
}

/**
 * Raw response from Claude (before normalization)
 */
interface RawDeepDiveResponse {
  oneLiner: string;
  analogy: string;
  explanation: string;
  howItWorks: string;
  diagram: string;
  codeExample: {
    language: string;
    code: string;
    explanation: string;
    runnable?: boolean;
  } | null;
  commonMisconceptions: Array<{
    wrong: string;
    right: string;
    explanation: string;
  }>;
  relatedTerms: Array<{
    termId: string;
    termName: string;
    relationship: string;
  }>;
  advancedTopics: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    prerequisites?: string[];
    hasDeepDive?: boolean;
  }>;
  quiz: Array<{
    id: string;
    question: string;
    type?: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty?: string;
  }>;
  estimatedMinutes: number;
}

/**
 * Validate and normalize the AI response to match DeepDiveContent type
 */
function normalizeResponse(raw: RawDeepDiveResponse, termId: string, level: UserLevel): DeepDiveContent {
  // Validate required string fields
  if (!raw.oneLiner || typeof raw.oneLiner !== 'string') {
    throw new Error('Invalid response: missing oneLiner');
  }
  if (!raw.analogy || typeof raw.analogy !== 'string') {
    throw new Error('Invalid response: missing analogy');
  }
  if (!raw.explanation || typeof raw.explanation !== 'string') {
    throw new Error('Invalid response: missing explanation');
  }
  if (!raw.howItWorks || typeof raw.howItWorks !== 'string') {
    throw new Error('Invalid response: missing howItWorks');
  }
  if (!raw.diagram || typeof raw.diagram !== 'string') {
    throw new Error('Invalid response: missing diagram');
  }

  // Normalize code example
  let codeExample: CodeExample | undefined;
  if (raw.codeExample && typeof raw.codeExample === 'object') {
    codeExample = {
      language: raw.codeExample.language || 'python',
      code: raw.codeExample.code || '',
      explanation: raw.codeExample.explanation || '',
      runnable: raw.codeExample.runnable ?? true,
    };
  }

  // Normalize misconceptions
  const commonMisconceptions: Misconception[] = (raw.commonMisconceptions || [])
    .filter((m): m is { wrong: string; right: string; explanation: string } =>
      typeof m === 'object' &&
      typeof m.wrong === 'string' &&
      typeof m.right === 'string' &&
      typeof m.explanation === 'string'
    )
    .slice(0, 5); // Max 5 misconceptions

  if (commonMisconceptions.length === 0) {
    // Provide a default if none were generated
    commonMisconceptions.push({
      wrong: `${termId} is too complex to understand`,
      right: `${termId} can be understood step by step`,
      explanation: 'Breaking down complex concepts makes them accessible.',
    });
  }

  // Normalize related terms
  const relatedTerms: RelatedTerm[] = (raw.relatedTerms || [])
    .filter((t): t is { termId: string; termName: string; relationship: string } =>
      typeof t === 'object' &&
      typeof t.termId === 'string' &&
      typeof t.termName === 'string' &&
      typeof t.relationship === 'string'
    )
    .slice(0, 5); // Max 5 related terms

  // Normalize advanced topics
  const advancedTopics: AdvancedTopic[] = (raw.advancedTopics || [])
    .filter((t): boolean =>
      typeof t === 'object' &&
      t !== null &&
      typeof t.id === 'string' &&
      typeof t.title === 'string' &&
      typeof t.description === 'string'
    )
    .map((t) => {
      const topic = t as { id: string; title: string; description: string; difficulty?: string; prerequisites?: string[]; hasDeepDive?: boolean };
      return {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        difficulty: (['beginner', 'intermediate', 'advanced'].includes(topic.difficulty || '')
          ? topic.difficulty
          : 'intermediate') as UserLevel,
        prerequisites: Array.isArray(topic.prerequisites) ? topic.prerequisites : [termId],
        hasDeepDive: topic.hasDeepDive ?? true,
      };
    })
    .slice(0, 5); // Max 5 advanced topics

  // Normalize quiz questions
  const quiz: QuizQuestion[] = (raw.quiz || [])
    .filter((q): q is { id: string; question: string; options: string[]; correctAnswer: number; explanation: string } =>
      typeof q === 'object' &&
      typeof q.id === 'string' &&
      typeof q.question === 'string' &&
      Array.isArray(q.options) &&
      typeof q.correctAnswer === 'number' &&
      typeof q.explanation === 'string'
    )
    .map((q, index) => ({
      id: q.id || `${termId}-q${index + 1}`,
      question: q.question,
      type: 'multiple-choice' as const,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: level,
    }))
    .slice(0, 5); // Max 5 quiz questions

  // Ensure we have at least one quiz question
  if (quiz.length === 0) {
    quiz.push({
      id: `${termId}-q1`,
      question: `What is the main purpose of ${termId}?`,
      type: 'multiple-choice',
      options: [
        'To simplify complex processes',
        'To improve performance',
        'To enhance understanding',
        'All of the above',
      ],
      correctAnswer: 3,
      explanation: `Understanding ${termId} helps with all these aspects.`,
      difficulty: level,
    });
  }

  // Build the normalized content
  const content: DeepDiveContent = {
    oneLiner: raw.oneLiner,
    analogy: raw.analogy,
    explanation: raw.explanation,
    howItWorks: raw.howItWorks,
    diagram: raw.diagram,
    codeExample,
    commonMisconceptions,
    relatedTerms,
    advancedTopics,
    quiz,
    estimatedMinutes: typeof raw.estimatedMinutes === 'number'
      ? Math.min(Math.max(raw.estimatedMinutes, 3), 30) // Clamp between 3-30 minutes
      : 8, // Default to 8 minutes
  };

  return content;
}

/**
 * POST /api/deep-dive
 * Generate comprehensive deep dive content for a term
 */
export async function POST(request: NextRequest) {
  try {
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
          error: 'Invalid request. Required: termId, term, level, context.fromLessonId, context.exploredTerms, context.userLevel',
        },
        { status: 400 }
      );
    }

    const { termId, term, level, context } = body;

    // Check cache first
    const cacheKey = getCacheKey(termId, level);
    const cached = deepDiveCache.get(cacheKey);

    if (cached && isCacheValid(cached.timestamp)) {
      const response: GenerateDeepDiveResponse = {
        content: cached.content,
        cached: true,
        generatedAt: cached.generatedAt,
      };
      return NextResponse.json(response);
    }

    // Generate new content with Claude
    const prompt = buildDeepDivePrompt({
      term,
      level,
      originLesson: context.fromLessonId,
      exploredTerms: context.exploredTerms,
    });

    // Deep dives need more tokens and slightly lower temperature for consistency
    const result = await generateContent<RawDeepDiveResponse>(prompt, {
      maxTokens: 4096,
      temperature: 0.6,
    });

    // Validate and normalize the response
    const content = normalizeResponse(result.data, termId, level);
    const generatedAt = new Date();

    // Cache the result
    deepDiveCache.set(cacheKey, {
      content,
      timestamp: Date.now(),
      generatedAt,
    });

    // Log usage for monitoring (in production, this would go to a metrics service)
    console.log(`Deep dive generated for "${term}" at ${level} level:`, {
      inputTokens: result.usage.inputTokens,
      outputTokens: result.usage.outputTokens,
      estimatedMinutes: content.estimatedMinutes,
      quizQuestions: content.quiz.length,
      relatedTerms: content.relatedTerms.length,
    });

    // Return response
    const response: GenerateDeepDiveResponse = {
      content,
      cached: false,
      generatedAt,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Deep dive generation error:', error);

    // Handle specific error types
    if (isClaudeError(error)) {
      if (error.code === 'config_error') {
        return NextResponse.json(
          { error: 'AI service not configured. Please set ANTHROPIC_API_KEY.' },
          { status: 503 }
        );
      }
      if (error.code === 'parse_error') {
        console.error('Parse error details:', error.details);
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
      // Validation errors from normalizeResponse
      if (error.message.startsWith('Invalid response:')) {
        return NextResponse.json(
          { error: 'AI generated incomplete content. Please try again.' },
          { status: 502 }
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
 * GET /api/deep-dive
 * Return API information
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/deep-dive',
    method: 'POST',
    description: 'Generate comprehensive deep dive content for a term',
    body: {
      termId: 'string - Unique identifier for the term (slug format)',
      term: 'string - The term to explain',
      level: 'beginner | intermediate | advanced',
      context: {
        fromLessonId: 'string - Origin lesson ID',
        exploredTerms: 'string[] - Terms the user has already explored',
        userLevel: 'beginner | intermediate | advanced',
      },
    },
    response: {
      content: {
        oneLiner: 'string - Single sentence summary',
        analogy: 'string - Relatable comparison',
        explanation: 'string - Markdown explanation',
        howItWorks: 'string - Detailed markdown explanation',
        diagram: 'string - Mermaid diagram code',
        codeExample: 'CodeExample | undefined',
        commonMisconceptions: 'Misconception[]',
        relatedTerms: 'RelatedTerm[]',
        advancedTopics: 'AdvancedTopic[]',
        quiz: 'QuizQuestion[]',
        estimatedMinutes: 'number',
      },
      cached: 'boolean - Whether result was from cache',
      generatedAt: 'Date - When content was generated',
    },
    notes: [
      'Deep dives are cached for 7 days to reduce API costs',
      'Content is generated at high quality using Claude Sonnet',
      'Quiz questions are automatically adapted to the requested level',
      'Related terms become clickable rabbit holes in the UI',
    ],
  });
}
