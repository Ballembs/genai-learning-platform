// app/api/chat/route.ts
// POST endpoint for the AI chat assistant

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildChatSystemPrompt, buildChatMessages } from '@/lib/ai/prompts';
import type {
  ChatRequest,
  ChatResponse,
  ChatMessage,
  UserLevel,
} from '@/types';

// Lazy initialization of Anthropic client
let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

/**
 * Validate the request body
 */
function validateRequest(body: unknown): body is ChatRequest {
  if (!body || typeof body !== 'object') return false;

  const req = body as Record<string, unknown>;

  if (typeof req.message !== 'string' || !req.message.trim()) return false;
  if (!req.context || typeof req.context !== 'object') return false;
  if (!Array.isArray(req.history)) return false;

  const ctx = req.context as Record<string, unknown>;
  if (typeof ctx.currentPage !== 'string') return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(ctx.userLevel as string)) return false;
  if (!Array.isArray(ctx.recentExplorations)) return false;

  return true;
}

/**
 * Convert ChatMessage history to the format needed for Claude
 */
function convertHistory(
  history: ChatMessage[]
): Array<{ role: 'user' | 'assistant'; content: string }> {
  return history
    .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
    .map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
}

/**
 * Extract term suggestions from the response
 * Looks for patterns like [term-name] or "explore [term]"
 */
function extractSuggestedTerms(response: string): string[] {
  const terms: string[] = [];

  // Match [bracketed-terms]
  const bracketMatches = response.match(/\[([a-z0-9-]+)\]/gi);
  if (bracketMatches) {
    bracketMatches.forEach((match) => {
      const term = match.slice(1, -1).toLowerCase();
      if (!terms.includes(term)) {
        terms.push(term);
      }
    });
  }

  // Match "explore X" patterns
  const exploreMatches = response.match(/explore\s+(\w+[-\w]*)/gi);
  if (exploreMatches) {
    exploreMatches.forEach((match) => {
      const term = match.replace(/^explore\s+/i, '').toLowerCase();
      if (!terms.includes(term) && term.length > 2) {
        terms.push(term);
      }
    });
  }

  return terms.slice(0, 5); // Max 5 suggestions
}

/**
 * Extract lesson suggestions from the response
 */
function extractSuggestedLessons(response: string): string[] {
  const lessons: string[] = [];
  const lessonPatterns = [
    /lesson\s*(\d+)/gi,
    /check out lesson\s*(\d+)/gi,
    /(how ai works|prompt engineering|embeddings|rag|agents)/gi,
  ];

  const lessonMap: Record<string, string> = {
    '1': 'lesson-01',
    '2': 'lesson-02',
    '3': 'lesson-03',
    '4': 'lesson-04',
    '5': 'lesson-05',
    'how ai works': 'lesson-01',
    'prompt engineering': 'lesson-02',
    'embeddings': 'lesson-03',
    'rag': 'lesson-04',
    'agents': 'lesson-05',
  };

  lessonPatterns.forEach((pattern) => {
    const matches = response.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        const key = match.replace(/lesson\s*/i, '').toLowerCase();
        const lessonId = lessonMap[key];
        if (lessonId && !lessons.includes(lessonId)) {
          lessons.push(lessonId);
        }
      });
    }
  });

  return lessons.slice(0, 3); // Max 3 lesson suggestions
}

/**
 * POST /api/chat
 * Handle chat messages with context-aware responses
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
          error: 'Invalid request. Required: message, context.currentPage, context.userLevel, context.recentExplorations, history',
        },
        { status: 400 }
      );
    }

    const { message, context, history } = body;

    // Build system prompt with user context
    const systemPrompt = buildChatSystemPrompt({
      level: context.userLevel,
      currentPage: context.currentPage,
      lessonId: context.lessonId,
      termId: context.termId,
      recentExplorations: context.recentExplorations,
    });

    // Build messages array with history
    const messages = buildChatMessages({
      message,
      level: context.userLevel,
      currentPage: context.currentPage,
      lessonId: context.lessonId,
      termId: context.termId,
      recentExplorations: context.recentExplorations,
      history: convertHistory(history),
    });

    // Call Claude API
    const client = getClient();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    // Extract text content
    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }

    const assistantMessage = textContent.text;

    // Extract suggestions from the response
    const suggestedTerms = extractSuggestedTerms(assistantMessage);
    const suggestedLessons = extractSuggestedLessons(assistantMessage);

    // Build response
    const chatResponse: ChatResponse = {
      message: assistantMessage,
      suggestedTerms: suggestedTerms.length > 0 ? suggestedTerms : undefined,
      suggestedLessons: suggestedLessons.length > 0 ? suggestedLessons : undefined,
    };

    return NextResponse.json(chatResponse);

  } catch (error) {
    console.error('Chat error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('ANTHROPIC_API_KEY')) {
        return NextResponse.json(
          { error: 'Chat service not configured. Please set ANTHROPIC_API_KEY.' },
          { status: 503 }
        );
      }
      if (error.message.includes('rate') || error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'Chat service is temporarily busy. Please try again in a moment.' },
          { status: 429 }
        );
      }
      if (error.message.includes('authentication') || error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Chat service authentication failed.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to process chat message. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 * Return API information
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/chat',
    method: 'POST',
    description: 'AI chat assistant for learning support',
    body: {
      message: 'string - The user\'s message',
      context: {
        currentPage: 'string - Current page path (e.g., "/course/lesson-01")',
        lessonId: 'string (optional) - Current lesson ID',
        termId: 'string (optional) - Current term being explored',
        userLevel: 'beginner | intermediate | advanced',
        recentExplorations: 'string[] - Recently explored term IDs',
      },
      history: 'ChatMessage[] - Previous messages in the conversation',
    },
    response: {
      message: 'string - The assistant\'s response',
      suggestedTerms: 'string[] (optional) - Terms to explore',
      suggestedLessons: 'string[] (optional) - Lessons to check out',
    },
    features: [
      'Context-aware responses based on current page',
      'Level-appropriate explanations',
      'Conversation history support',
      'Automatic term and lesson suggestions',
      'Encouraging, educational tone',
    ],
    notes: [
      'History is limited to last 10 messages to stay within context limits',
      'RAG integration planned for searching lesson content',
    ],
  });
}
