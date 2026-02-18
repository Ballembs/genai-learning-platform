// app/api/try-it/prompt-playground/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');
    client = new Anthropic({ apiKey });
  }
  return client;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { systemPrompt, userMessage } = body;

    // Validation
    if (!systemPrompt || typeof systemPrompt !== 'string' || systemPrompt.length > 500) {
      return NextResponse.json({ error: 'System prompt required (max 500 chars)' }, { status: 400 });
    }
    if (!userMessage || typeof userMessage !== 'string' || userMessage.length > 300) {
      return NextResponse.json({ error: 'User message required (max 300 chars)' }, { status: 400 });
    }

    const response = await getClient().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const textContent = response.content.find(b => b.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text in response');
    }

    return NextResponse.json({
      response: textContent.text,
      model: 'claude-sonnet',
    });

  } catch (error) {
    console.error('Prompt playground error:', error);
    if (error instanceof Error && error.message.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to generate response. Try again.' }, { status: 500 });
  }
}
