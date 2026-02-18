// app/api/try-it/similarity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getEmbeddings, cosineSimilarity } from '@/lib/ai/embeddings';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sentences } = body;

    // Validation
    if (!Array.isArray(sentences) || sentences.length < 2 || sentences.length > 4) {
      return NextResponse.json({ error: 'Provide 2-4 sentences' }, { status: 400 });
    }
    for (const s of sentences) {
      if (typeof s !== 'string' || s.trim().length === 0 || s.length > 200) {
        return NextResponse.json({ error: 'Each sentence must be 1-200 characters' }, { status: 400 });
      }
    }

    // Get embeddings for all sentences in one batch call
    const embeddings = await getEmbeddings(sentences, 'document');

    // Calculate pairwise similarities
    const similarities: {
      pair: [number, number];
      sentence1: string;
      sentence2: string;
      score: number;
    }[] = [];

    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        similarities.push({
          pair: [i, j],
          sentence1: sentences[i],
          sentence2: sentences[j],
          score: Math.round(cosineSimilarity(embeddings[i], embeddings[j]) * 1000) / 1000,
        });
      }
    }

    // Sort by score descending
    similarities.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      similarities,
      embeddingDimensions: embeddings[0]?.length || 0,
    });

  } catch (error) {
    console.error('Similarity checker error:', error);
    if (error instanceof Error && error.message.includes('VOYAGE_API_KEY')) {
      return NextResponse.json({ error: 'Embedding service not configured' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to compute similarities. Try again.' }, { status: 500 });
  }
}
