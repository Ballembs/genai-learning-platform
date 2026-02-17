// app/api/rag/route.ts
// RAG index status and test search endpoint

import { NextRequest, NextResponse } from 'next/server';
import { getIndexStats, searchContent, isIndexReady } from '@/lib/ai/rag';
import type { UserLevel } from '@/types';

/**
 * GET /api/rag
 * Returns RAG index status
 */
export async function GET() {
  const stats = getIndexStats();

  const status = stats.error
    ? 'error'
    : stats.ready
      ? 'ready'
      : 'not_initialized';

  return NextResponse.json({
    endpoint: '/api/rag',
    status,
    chunkCount: stats.chunkCount,
    error: stats.error,
    notes: [
      'Index builds lazily on first chat message',
      'POST to test search',
    ],
  });
}

/**
 * POST /api/rag
 * Test search endpoint (development only)
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Test endpoint not available in production' },
      { status: 403 }
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
  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { error: 'Request body must be an object' },
      { status: 400 }
    );
  }

  const { query, level, lessonId, topK } = body as {
    query?: string;
    level?: string;
    lessonId?: string;
    topK?: number;
  };

  if (!query || typeof query !== 'string' || !query.trim()) {
    return NextResponse.json(
      { error: 'query is required and must be a non-empty string' },
      { status: 400 }
    );
  }

  // Validate level if provided
  const validLevels = ['beginner', 'intermediate', 'advanced'];
  if (level && !validLevels.includes(level)) {
    return NextResponse.json(
      { error: `level must be one of: ${validLevels.join(', ')}` },
      { status: 400 }
    );
  }

  // Perform search
  const startTime = Date.now();

  try {
    const results = await searchContent(query.trim(), {
      topK: topK ?? 5,
      level: level as UserLevel | undefined,
      lessonId,
    });

    const searchTimeMs = Date.now() - startTime;
    const stats = getIndexStats();

    return NextResponse.json({
      query: query.trim(),
      resultCount: results.length,
      searchTimeMs,
      indexReady: isIndexReady(),
      indexStats: {
        ready: stats.ready,
        chunkCount: stats.chunkCount,
        error: stats.error,
      },
      results: results.map((result) => ({
        score: Math.round(result.score * 1000) / 1000, // Round to 3 decimals
        metadata: result.chunk.metadata,
        textPreview: result.chunk.text.slice(0, 200) + (result.chunk.text.length > 200 ? '...' : ''),
      })),
    });
  } catch (error) {
    console.error('[RAG API] Search error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Search failed',
        message: errorMessage,
        indexStats: getIndexStats(),
      },
      { status: 500 }
    );
  }
}
