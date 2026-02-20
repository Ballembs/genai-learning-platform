// app/api/review-step/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ReviewRequest {
  stepId: string;
  projectTitle: string;
  stepTitle: string;
  instructions: string;
  deliverable: string;
  reviewCriteria: string[];
  userWork: string;
}

function validateRequest(body: unknown): body is ReviewRequest {
  if (!body || typeof body !== 'object') return false;
  const req = body as Record<string, unknown>;
  return (
    typeof req.stepId === 'string' &&
    typeof req.projectTitle === 'string' &&
    typeof req.stepTitle === 'string' &&
    typeof req.instructions === 'string' &&
    typeof req.deliverable === 'string' &&
    Array.isArray(req.reviewCriteria) &&
    typeof req.userWork === 'string'
  );
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try { body = await request.json(); } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!validateRequest(body)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { projectTitle, stepTitle, instructions, deliverable, reviewCriteria, userWork } = body;

    if (userWork.trim().length < 30) {
      return NextResponse.json({
        passed: false,
        feedback: 'Please write a more detailed response so I can review it properly.',
      });
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
    }

    const client = new Anthropic({ apiKey });

    const criteriaList = reviewCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n');

    const prompt = `You are reviewing a student's work on a guided project step.

PROJECT: ${projectTitle}
STEP: ${stepTitle}

THE TASK WAS:
${instructions}

EXPECTED DELIVERABLE: ${deliverable}

REVIEW CRITERIA:
${criteriaList}

STUDENT'S WORK:
---
${userWork}
---

REVIEW INSTRUCTIONS:
1. Evaluate the work against each criterion
2. Determine if the work passes (meets most criteria adequately)
3. Be encouraging and specific — point out what's good AND what could improve
4. If it doesn't pass, give clear guidance on what to add or fix

Return ONLY valid JSON:
{
  "passed": true/false,
  "feedback": "2-4 paragraphs: what's good, what could improve, and overall verdict. Use plain text, not markdown."
}`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      temperature: 0.3,
      system: 'You are an encouraging but thorough project mentor. Review student work honestly. Return only valid JSON.',
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find(b => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'Review failed' }, { status: 502 });
    }

    let jsonText = textBlock.text.trim();
    if (jsonText.startsWith('```json')) jsonText = jsonText.slice(7);
    if (jsonText.startsWith('```')) jsonText = jsonText.slice(3);
    if (jsonText.endsWith('```')) jsonText = jsonText.slice(0, -3);

    const result = JSON.parse(jsonText.trim());
    return NextResponse.json(result);

  } catch (error) {
    console.error('Step review error:', error);
    return NextResponse.json(
      { error: 'Review failed. Please try again.' },
      { status: 500 }
    );
  }
}
