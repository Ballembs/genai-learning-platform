// lib/ai/claude.ts
// Claude API wrapper for content generation

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './prompts';

// Lazy initialization of Anthropic client
let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY environment variable is not set. ' +
        'Please add it to your .env.local file.'
      );
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

export interface ClaudeResponse<T> {
  data: T;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface ClaudeError {
  message: string;
  code: 'api_error' | 'parse_error' | 'config_error';
  details?: string;
}

/**
 * Generate content using Claude API
 * @param prompt The user prompt
 * @param options Optional configuration
 * @returns Parsed JSON response
 */
export async function generateContent<T>(
  prompt: string,
  options: {
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<ClaudeResponse<T>> {
  const { maxTokens = 1024, temperature = 0.7 } = options;

  const client = getClient();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    temperature,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  // Extract text content from response
  const textContent = response.content.find((block) => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw createError('parse_error', 'No text content in response');
  }

  // Parse JSON response
  let parsed: T;
  try {
    // Clean up the response - remove any markdown code blocks if present
    let jsonText = textContent.text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.slice(7);
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith('```')) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    parsed = JSON.parse(jsonText);
  } catch (e) {
    throw createError(
      'parse_error',
      'Failed to parse JSON response',
      textContent.text
    );
  }

  return {
    data: parsed,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

/**
 * Create a standardized error object
 */
function createError(
  code: ClaudeError['code'],
  message: string,
  details?: string
): ClaudeError {
  return { code, message, details };
}

/**
 * Check if an error is a ClaudeError
 */
export function isClaudeError(error: unknown): error is ClaudeError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}
