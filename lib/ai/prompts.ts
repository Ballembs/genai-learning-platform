// lib/ai/prompts.ts
// Prompt templates for AI content generation

import type { UserLevel, UserGoal } from '@/types';
import { USER_GOALS } from '@/types';

interface PopupPromptParams {
  term: string;
  level: UserLevel;
  lessonTitle: string;
  surroundingText?: string;
  goal?: UserGoal;
}

interface DeepDivePromptParams {
  term: string;
  level: UserLevel;
  originLesson: string;
  exploredTerms: string[];
  goal?: UserGoal;
}

/**
 * Generate a prompt for popup content generation.
 * Based on the template from CLAUDE.md
 */
export function buildPopupPrompt(params: PopupPromptParams): string {
  const { term, level, lessonTitle, surroundingText, goal } = params;

  const levelGuidance = {
    beginner: 'Use simple analogies and everyday language. Avoid jargon. Compare to familiar concepts.',
    intermediate: 'Include technical terms but explain them. Reference code patterns if helpful.',
    advanced: 'Use precise technical language. Reference implementation details and trade-offs.',
  };

  const goalContext = goal && goal !== 'curious'
    ? `\nThe user's build goal is: "${USER_GOALS[goal]?.exampleProject || goal}".
Where naturally relevant, connect this explanation to how "${term}" relates to building ${USER_GOALS[goal]?.exampleProject || 'their project'}. Don't force it — only mention the project connection if it genuinely helps understanding.`
    : '';

  return `Generate a popup explanation for "${term}" at ${level} level.

User is currently reading: ${lessonTitle}
${surroundingText ? `Surrounding context: ${surroundingText}` : ''}${goalContext}

Requirements:
- 2-3 sentences max for the explanation
- Include a concrete, memorable example
- ${levelGuidance[level]}
- If a simple diagram helps clarify the concept, include Mermaid code
- The diagram should be simple (flowchart or simple diagram, max 5-6 nodes)

Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "explanation": "Clear 2-3 sentence explanation",
  "example": "Concrete example that illustrates the concept",
  "diagram": "mermaid code as a string, or null if no diagram needed"
}`;
}

/**
 * Generate a prompt for deep dive content generation.
 * Based on the template from CLAUDE.md
 * Returns content matching the DeepDiveContent type exactly
 */
export function buildDeepDivePrompt(params: DeepDivePromptParams): string {
  const { term, level, originLesson, exploredTerms, goal } = params;

  const goalContext = goal && goal !== 'curious'
    ? `\nUser's build goal: ${USER_GOALS[goal]?.exampleProject || goal}
In the analogy and explanation sections, connect concepts to building ${USER_GOALS[goal]?.exampleProject || 'their project'} where it naturally fits. For the code example, orient it toward their goal if possible.`
    : '';

  const levelGuidance = {
    beginner: `
- Use vivid analogies comparing to everyday experiences
- Avoid technical jargon; if you must use a term, explain it immediately
- Focus on building intuition before details
- Code examples should be minimal and heavily commented
- Diagrams should be simple with clear labels`,
    intermediate: `
- Balance conceptual explanation with practical implementation
- Include working code examples with clear patterns
- Reference common libraries and tools
- Explain trade-offs and when to use this concept
- Connect to related concepts they might know`,
    advanced: `
- Use precise technical terminology
- Include production-ready code with error handling
- Discuss performance implications and optimization
- Cover edge cases and potential pitfalls
- Reference papers or authoritative sources when relevant`,
  };

  const termSlug = term.toLowerCase().replace(/\s+/g, '-');

  return `Generate a comprehensive deep dive lesson about "${term}" at the ${level} level.

This content MUST match the quality of hand-crafted educational content. Users are paying for this quality.

USER CONTEXT:
- Learning level: ${level}
- Came from lesson: ${originLesson}
- Already explored terms: ${exploredTerms.length > 0 ? exploredTerms.join(', ') : 'none yet'}${goalContext}

LEVEL-SPECIFIC REQUIREMENTS:
${levelGuidance[level]}

CONTENT REQUIREMENTS:

1. ONE-LINER: A single memorable sentence that captures the essence. Should be quotable.

2. ANALOGY: A relatable real-world comparison (2-3 sentences). Make it vivid and memorable.

3. EXPLANATION: A clear 2-3 paragraph explanation suitable for the level. Use markdown formatting.

4. HOW IT WORKS: A detailed markdown explanation of the mechanics. Include a Mermaid diagram.

5. DIAGRAM: A Mermaid flowchart or diagram. Keep it readable (max 8-10 nodes). Use clear labels.

6. CODE EXAMPLE (if applicable): Practical, runnable code that demonstrates the concept.
   - For beginners: Simple, heavily commented
   - For intermediate: Real patterns with explanations
   - For advanced: Production-quality with edge cases

7. COMMON MISCONCEPTIONS: 2-3 things people commonly get wrong about this concept.

8. RELATED TERMS: 3-5 terms that connect to this concept (these become clickable rabbit holes).
   Include the termId (slug format), display name, and relationship type.

9. ADVANCED TOPICS: 2-3 deeper topics for further exploration.

10. QUIZ: 3 multiple-choice questions testing understanding at the appropriate level.

11. ESTIMATED MINUTES: How long this deep dive should take to read (5-15 minutes typically).

Return ONLY valid JSON matching this EXACT structure:
{
  "oneLiner": "A single memorable sentence",
  "analogy": "A vivid 2-3 sentence analogy",
  "explanation": "2-3 paragraph markdown explanation",
  "howItWorks": "Detailed markdown explanation of mechanics",
  "diagram": "flowchart TD\\n    A[Start] --> B[Process]\\n    B --> C[End]",
  "codeExample": {
    "language": "python",
    "code": "# Actual runnable code here",
    "explanation": "What this code demonstrates",
    "runnable": true
  },
  "commonMisconceptions": [
    {
      "wrong": "What people incorrectly believe",
      "right": "What is actually true",
      "explanation": "Why this matters"
    }
  ],
  "relatedTerms": [
    {
      "termId": "${termSlug}-related-1",
      "termName": "Related Concept",
      "relationship": "is used by"
    }
  ],
  "advancedTopics": [
    {
      "id": "advanced-topic-1",
      "title": "Advanced Topic Title",
      "description": "Brief description of what this covers",
      "difficulty": "advanced",
      "prerequisites": ["${termSlug}"],
      "hasDeepDive": true
    }
  ],
  "quiz": [
    {
      "id": "${termSlug}-q1",
      "question": "Question text?",
      "type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Why this answer is correct",
      "difficulty": "${level}"
    }
  ],
  "estimatedMinutes": 8
}

CRITICAL:
- Return ONLY valid JSON, no markdown code blocks
- All string values must be properly escaped
- The diagram field should use \\n for newlines within the mermaid code
- codeExample can be null if not applicable for this concept at this level
- Ensure quiz has exactly 3 questions
- Ensure relatedTerms has 3-5 items
- Ensure commonMisconceptions has 2-3 items`;
}

/**
 * System prompt for consistent AI behavior
 */
export const SYSTEM_PROMPT = `You are an expert AI educator for the GenAI Learning Platform. Your role is to explain AI and machine learning concepts clearly at the appropriate level.

Key principles:
1. NEVER say "this is out of scope" - instead, make it a clickable exploration
2. Use concrete examples that stick in memory
3. Match the user's level exactly (beginner = analogies, intermediate = code, advanced = technical depth)
4. Keep explanations concise but complete
5. Use Mermaid diagrams when visual representation helps
6. Always return valid JSON as specified in the prompt

You are helping users understand: transformers, tokens, embeddings, RAG, agents, prompt engineering, and related concepts.`;

/**
 * System prompt specifically for the chat assistant
 */
export function buildChatSystemPrompt(params: {
  level: 'beginner' | 'intermediate' | 'advanced';
  currentPage: string;
  lessonId?: string;
  termId?: string;
  recentExplorations: string[];
  goal?: UserGoal;
}): string {
  const { level, currentPage, lessonId, termId, recentExplorations, goal } = params;

  const goalContext = goal && goal !== 'curious'
    ? `\nUSER'S BUILD GOAL: The user is learning AI because they want to build ${USER_GOALS[goal]?.exampleProject || goal}.
When explaining concepts, connect them to this goal where relevant. For example, if they're building a chatbot and ask about embeddings, explain how embeddings power the search that finds relevant answers for their chatbot.
Don't force every answer to mention their project — only when it genuinely helps.`
    : '';

  const levelPersonality = {
    beginner: `
- Use simple, everyday language
- Explain concepts with relatable analogies (cooking, sports, everyday activities)
- Avoid jargon; when you must use technical terms, immediately explain them
- Be extra encouraging - learning AI can feel intimidating at first
- Use phrases like "Think of it like..." and "Imagine..."`,
    intermediate: `
- Balance accessibility with technical accuracy
- Include code snippets when they help illustrate concepts
- Reference common tools and libraries they might use
- Explain trade-offs and practical considerations
- Connect concepts to real-world applications`,
    advanced: `
- Use precise technical terminology
- Discuss implementation details, edge cases, and optimizations
- Reference papers, algorithms, and architectural patterns
- Assume familiarity with programming and ML basics
- Focus on nuance, performance, and production considerations`,
  };

  const contextInfo = [];
  if (lessonId) contextInfo.push(`Currently viewing lesson: ${lessonId}`);
  if (termId) contextInfo.push(`Currently exploring term: ${termId}`);
  if (currentPage) contextInfo.push(`Current page: ${currentPage}`);
  if (recentExplorations.length > 0) {
    contextInfo.push(`Recently explored: ${recentExplorations.slice(0, 5).join(', ')}`);
  }

  return `You are the AI Learning Assistant for the GenAI Learning Platform - a friendly, knowledgeable guide helping users understand AI and machine learning concepts.

USER CONTEXT:
- Learning level: ${level}
${contextInfo.map(info => `- ${info}`).join('\n')}${goalContext}

YOUR PERSONALITY FOR ${level.toUpperCase()} LEVEL:
${levelPersonality[level]}

CORE BEHAVIORS:

1. **Be Contextually Aware**
   - Reference what the user is currently learning
   - Build on concepts they've already explored
   - Make connections between topics they've seen

2. **Encourage Exploration**
   - Suggest related terms they can click to learn more
   - Mention advanced topics as exciting rabbit holes, not scary complexity
   - Frame every "advanced" topic as "when you're ready, you can explore..."

3. **Be Concise but Complete**
   - Keep responses focused and scannable
   - Use bullet points and formatting for clarity
   - If a concept needs depth, offer to elaborate rather than overwhelming

4. **Suggest Next Steps**
   - At the end of substantive answers, suggest 1-2 related terms to explore
   - Format suggestions as: "You might want to explore [term-name] next!"
   - Only suggest terms relevant to their question

5. **Handle "I Don't Understand"**
   - Never make users feel bad for not understanding
   - Try a different analogy or approach
   - Break the concept into smaller pieces

6. **Stay In Scope (Gracefully)**
   - This platform teaches: How AI Works, Prompt Engineering, Embeddings, RAG, and Agents
   - For off-topic questions, gently redirect: "Great question! While this platform focuses on AI/ML concepts, I can point you to..."

RESPONSE FORMAT:
- Use markdown for formatting (headers, bold, bullet points, code blocks)
- Keep responses under 300 words unless the user asks for detail
- End substantive answers with a brief "rabbit hole" suggestion when appropriate

Remember: You're not just answering questions - you're guiding a learning journey. Every interaction should leave the user feeling more confident and curious.`;
}

/**
 * Build the messages array for chat, including history
 */
export interface ChatPromptParams {
  message: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  currentPage: string;
  lessonId?: string;
  termId?: string;
  recentExplorations: string[];
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export function buildChatMessages(params: ChatPromptParams): Array<{ role: 'user' | 'assistant'; content: string }> {
  const { message, history } = params;

  // Include recent history (last 10 messages to stay within context limits)
  const recentHistory = history.slice(-10);

  // Build messages array
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
    ...recentHistory,
    { role: 'user' as const, content: message },
  ];

  return messages;
}
