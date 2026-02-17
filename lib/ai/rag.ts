// lib/ai/rag.ts
// RAG pipeline for the chat assistant - in-memory vector search

import { embedQuery, embedDocuments, cosineSimilarity } from './embeddings';
import { lessonData } from '@/content/lessons';
import type { UserLevel } from '@/types';

// ============================================
// TYPES
// ============================================

export interface ContentChunk {
  id: string;
  text: string;
  embedding?: number[];
  metadata: {
    lessonId: string;
    lessonTitle: string;
    section: string;
    level?: UserLevel;
    termId?: string;
    termName?: string;
  };
}

export interface SearchResult {
  chunk: ContentChunk;
  score: number;
}

export interface RAGSearchOptions {
  topK?: number;
  minScore?: number;
  level?: UserLevel;
  lessonId?: string;
}

// Alias for backwards compatibility
export type SearchOptions = RAGSearchOptions;

interface IndexState {
  ready: boolean;
  chunks: ContentChunk[];
  error: string | null;
  buildPromise: Promise<void> | null;
}

// ============================================
// CONSTANTS
// ============================================

const MAX_CHUNK_SIZE = 1200;
const MIN_CHUNK_SIZE = 30;
const DEFAULT_TOP_K = 5;
const DEFAULT_MIN_SCORE = 0.25;
const LEVEL_BOOST = 0.10;  // +10% for matching level
const LESSON_BOOST = 0.15; // +15% for matching lesson

// Lesson metadata mapping
const LESSON_META: Record<string, { id: string; title: string }> = {
  '01-how-ai-works': { id: 'lesson-01', title: 'How AI Works' },
  '02-prompt-engineering': { id: 'lesson-02', title: 'Prompt Engineering' },
  '03-embeddings': { id: 'lesson-03', title: 'Embeddings & Vector Search' },
  '04-rag': { id: 'lesson-04', title: 'RAG' },
  '05-agents': { id: 'lesson-05', title: 'Agents & Tools' },
};

// ============================================
// MODULE STATE (Singleton Index)
// ============================================

const indexState: IndexState = {
  ready: false,
  chunks: [],
  error: null,
  buildPromise: null,
};

// ============================================
// TEXT CLEANING
// ============================================

/**
 * Clean markdown text for embedding.
 * Removes formatting that adds noise to semantic search.
 */
function cleanMarkdown(text: string): string {
  return text
    // Remove mermaid code blocks entirely
    .replace(/```mermaid[\s\S]*?```/g, '')
    // Remove code block markers but keep code text
    .replace(/```\w*\n([\s\S]*?)```/g, '$1')
    // Remove inline code backticks
    .replace(/`([^`]+)`/g, '$1')
    // Remove markdown images ![...](...)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // Remove link syntax but keep text: [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Remove [bracket terms] syntax but keep text: [term] → term
    .replace(/\[([^\]]+)\]/g, '$1')
    // Remove **bold** and *italic* markers but keep text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove # header markers but keep text
    .replace(/^#{1,6}\s+/gm, '')
    // Remove > blockquote markers
    .replace(/^>\s?/gm, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Normalize whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ============================================
// CHUNKING
// ============================================

/**
 * Split content by ## headers, keeping header with content.
 */
function splitBySections(content: string): Array<{ header: string; text: string }> {
  const sections: Array<{ header: string; text: string }> = [];
  const parts = content.split(/(?=^## )/gm);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('## ')) {
      const lines = trimmed.split('\n');
      const header = lines[0].replace(/^## /, '').trim();
      const text = lines.slice(1).join('\n').trim();
      sections.push({ header, text: `## ${header}\n\n${text}` });
    } else {
      // Content before first header
      sections.push({ header: 'Introduction', text: trimmed });
    }
  }

  return sections;
}

/**
 * Split large text by paragraphs, carrying header into continuations.
 */
function splitByParagraphs(
  text: string,
  header: string,
  maxSize: number
): string[] {
  if (text.length <= maxSize) {
    return [text];
  }

  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    const candidate = currentChunk ? `${currentChunk}\n\n${para}` : para;

    if (candidate.length > maxSize && currentChunk) {
      chunks.push(currentChunk);
      // Start new chunk with header context
      currentChunk = `[continued: ${header}]\n\n${para}`;
    } else {
      currentChunk = candidate;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Extract all chunks from lesson data.
 */
function extractChunks(): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  let chunkId = 0;

  console.log('[RAG] Extracting chunks from lesson data...');

  for (const [lessonKey, lesson] of Object.entries(lessonData)) {
    const meta = LESSON_META[lessonKey];
    if (!meta) continue;

    // Process each level's content
    const levels: UserLevel[] = ['beginner', 'intermediate', 'advanced'];

    for (const level of levels) {
      const content = lesson.content[level];
      if (!content) continue;

      const cleanedContent = cleanMarkdown(content);
      const sections = splitBySections(cleanedContent);

      for (const section of sections) {
        const sectionChunks = splitByParagraphs(
          section.text,
          section.header,
          MAX_CHUNK_SIZE
        );

        for (const chunkText of sectionChunks) {
          if (chunkText.length < MIN_CHUNK_SIZE) continue;

          chunks.push({
            id: `chunk-${chunkId++}`,
            text: chunkText,
            metadata: {
              lessonId: meta.id,
              lessonTitle: meta.title,
              section: 'main-content',
              level,
            },
          });
        }
      }
    }

    // Process terms (popup content)
    for (const term of lesson.terms) {
      for (const level of levels) {
        const popupContent = term.popup[level];
        if (!popupContent) continue;

        const text = cleanMarkdown(
          `${term.term}: ${popupContent.explanation}\n\n${popupContent.example || ''}`
        );

        if (text.length < MIN_CHUNK_SIZE) continue;

        chunks.push({
          id: `chunk-${chunkId++}`,
          text,
          metadata: {
            lessonId: meta.id,
            lessonTitle: meta.title,
            section: 'term-popup',
            level,
            termId: term.id,
            termName: term.term,
          },
        });
      }
    }

    // Process lesson-level advanced topics
    if (lesson.advancedTopics) {
      for (const topic of lesson.advancedTopics) {
        const text = cleanMarkdown(
          `${topic.title}: ${topic.description}`
        );

        if (text.length < MIN_CHUNK_SIZE) continue;

        chunks.push({
          id: `chunk-${chunkId++}`,
          text,
          metadata: {
            lessonId: meta.id,
            lessonTitle: meta.title,
            section: 'advanced-topic',
          },
        });
      }
    }
  }

  console.log(`[RAG] Extracted ${chunks.length} chunks`);
  return chunks;
}

// ============================================
// INDEX BUILDING
// ============================================

/**
 * Build the vector index (called lazily on first search).
 */
async function buildIndex(): Promise<void> {
  if (indexState.ready) return;
  if (indexState.buildPromise) return indexState.buildPromise;

  indexState.buildPromise = (async () => {
    const startTime = Date.now();
    console.log('[RAG] Building vector index...');

    try {
      // Extract chunks
      const chunks = extractChunks();

      if (chunks.length === 0) {
        throw new Error('No chunks extracted from lesson data');
      }

      // Get embeddings in batches
      console.log(`[RAG] Embedding ${chunks.length} chunks...`);
      const texts = chunks.map((c) => c.text);
      const embeddings = await embedDocuments(texts);

      // Assign embeddings to chunks
      for (let i = 0; i < chunks.length; i++) {
        chunks[i].embedding = embeddings[i];
      }

      indexState.chunks = chunks;
      indexState.ready = true;
      indexState.error = null;

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`[RAG] Index built: ${chunks.length} chunks in ${elapsed}s`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('[RAG] Index build failed:', message);
      indexState.error = message;
      indexState.ready = false;
      throw err;
    }
  })();

  return indexState.buildPromise;
}

// ============================================
// SEARCH
// ============================================

/**
 * Search the content index for relevant chunks.
 *
 * @param query - The search query
 * @param options - Search options (topK, minScore, level, lessonId)
 * @returns Array of search results sorted by score
 */
export async function searchContent(
  query: string,
  options: RAGSearchOptions = {}
): Promise<SearchResult[]> {
  const {
    topK = DEFAULT_TOP_K,
    minScore = DEFAULT_MIN_SCORE,
    level,
    lessonId,
  } = options;

  // Build index if not ready
  await buildIndex();

  if (!indexState.ready || indexState.chunks.length === 0) {
    return [];
  }

  // Embed query
  const queryEmbedding = await embedQuery(query);

  // Score all chunks
  const results: SearchResult[] = [];

  for (const chunk of indexState.chunks) {
    if (!chunk.embedding) continue;

    // Base similarity score
    let score = cosineSimilarity(queryEmbedding, chunk.embedding);

    // Boost for matching level
    if (level && chunk.metadata.level === level) {
      score *= (1 + LEVEL_BOOST);
    }

    // Boost for matching lesson
    if (lessonId && chunk.metadata.lessonId === lessonId) {
      score *= (1 + LESSON_BOOST);
    }

    if (score >= minScore) {
      results.push({ chunk, score });
    }
  }

  // Sort by score descending and take top K
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// ============================================
// RAG CONTEXT FORMATTING
// ============================================

/**
 * Get formatted RAG context for Claude.
 * Best-effort: returns empty string on error.
 *
 * @param query - The user's query
 * @param options - Search options
 * @returns Formatted context string or empty string
 */
export async function getRAGContext(
  query: string,
  options: RAGSearchOptions = {}
): Promise<string> {
  try {
    const results = await searchContent(query, options);

    if (results.length === 0) {
      return '';
    }

    const contextParts = results.map((result, index) => {
      const { chunk } = result;
      const { lessonTitle, level, termName } = chunk.metadata;

      // Build source label: "Lesson Title → Term Name (level)"
      let source = lessonTitle;
      if (termName) {
        source += ` → ${termName}`;
      }
      if (level) {
        source += ` (${level})`;
      }

      return `[Source ${index + 1}: ${source}]\n${chunk.text}`;
    });

    return `RELEVANT COURSE CONTENT (use this to answer the user's question):\n\n${contextParts.join('\n\n---\n\n')}`;
  } catch (err) {
    // Best-effort: log error but don't break chat
    console.error('[RAG] getRAGContext error:', err);
    return '';
  }
}

// ============================================
// INDEX STATUS
// ============================================

/**
 * Get index statistics.
 */
export function getIndexStats(): {
  ready: boolean;
  chunkCount: number;
  error: string | null;
} {
  return {
    ready: indexState.ready,
    chunkCount: indexState.chunks.length,
    error: indexState.error,
  };
}

/**
 * Check if the index is ready.
 */
export function isIndexReady(): boolean {
  return indexState.ready;
}

/**
 * Preload the index (optional, for warming up).
 * Returns immediately, building happens in background.
 */
export function preloadIndex(): void {
  if (!indexState.ready && !indexState.buildPromise) {
    buildIndex().catch(() => {
      // Errors are logged in buildIndex
    });
  }
}
