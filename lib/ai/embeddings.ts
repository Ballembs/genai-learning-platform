// lib/ai/embeddings.ts
// Voyage AI embeddings wrapper for RAG

const VOYAGE_API_URL = 'https://api.voyageai.com/v1/embeddings';
const VOYAGE_MODEL = 'voyage-3-lite'; // 512 dimensions, fast + cheap
const MAX_BATCH_SIZE = 64;

interface VoyageEmbeddingResponse {
  data: Array<{
    embedding: number[];
    index: number;
  }>;
  usage: {
    total_tokens: number;
  };
}

/**
 * Get embeddings for multiple texts using Voyage AI.
 * Automatically batches requests if more than 64 texts are provided.
 *
 * @param texts - Array of texts to embed
 * @param inputType - 'document' for indexing, 'query' for searching (asymmetric)
 * @returns Array of embedding vectors (512 dimensions each)
 */
export async function getEmbeddings(
  texts: string[],
  inputType: 'document' | 'query'
): Promise<number[][]> {
  const apiKey = process.env.VOYAGE_API_KEY;

  if (!apiKey) {
    throw new Error(
      'VOYAGE_API_KEY is not set. Please add it to your .env file.\n' +
      'Get your API key at: https://dash.voyageai.com/'
    );
  }

  if (texts.length === 0) {
    return [];
  }

  // Process in batches
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += MAX_BATCH_SIZE) {
    const batch = texts.slice(i, i + MAX_BATCH_SIZE);
    const batchEmbeddings = await fetchEmbeddings(apiKey, batch, inputType);
    allEmbeddings.push(...batchEmbeddings);
  }

  return allEmbeddings;
}

/**
 * Fetch embeddings for a single batch from Voyage AI.
 */
async function fetchEmbeddings(
  apiKey: string,
  texts: string[],
  inputType: 'document' | 'query'
): Promise<number[][]> {
  const response = await fetch(VOYAGE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: VOYAGE_MODEL,
      input: texts,
      input_type: inputType,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Voyage AI API error (${response.status}): ${errorText}`
    );
  }

  const data: VoyageEmbeddingResponse = await response.json();

  // Sort by index to maintain order
  const sorted = data.data.sort((a, b) => a.index - b.index);
  return sorted.map((item) => item.embedding);
}

/**
 * Embed a single query text for searching.
 * Uses inputType='query' for asymmetric search optimization.
 *
 * @param text - The query text to embed
 * @returns Embedding vector (512 dimensions)
 */
export async function embedQuery(text: string): Promise<number[]> {
  const embeddings = await getEmbeddings([text], 'query');
  return embeddings[0];
}

/**
 * Embed multiple documents for indexing.
 * Uses inputType='document' for asymmetric search optimization.
 *
 * @param texts - Array of document texts to embed
 * @returns Array of embedding vectors (512 dimensions each)
 */
export async function embedDocuments(texts: string[]): Promise<number[][]> {
  return getEmbeddings(texts, 'document');
}

/**
 * Calculate cosine similarity between two vectors.
 * Voyage AI vectors are pre-normalized, so this is just a dot product.
 *
 * @param a - First embedding vector
 * @param b - Second embedding vector
 * @returns Similarity score between -1 and 1 (higher = more similar)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Vector dimension mismatch: ${a.length} vs ${b.length}`
    );
  }

  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }

  return dotProduct;
}

/**
 * Find the top-k most similar items from a list of embeddings.
 * Useful for simple in-memory vector search.
 *
 * @param queryEmbedding - The query vector
 * @param documentEmbeddings - Array of document vectors to search
 * @param topK - Number of results to return
 * @returns Array of { index, score } sorted by similarity (highest first)
 */
export function findTopK(
  queryEmbedding: number[],
  documentEmbeddings: number[][],
  topK: number
): Array<{ index: number; score: number }> {
  const scores = documentEmbeddings.map((docEmb, index) => ({
    index,
    score: cosineSimilarity(queryEmbedding, docEmb),
  }));

  // Sort by score descending and take top K
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
