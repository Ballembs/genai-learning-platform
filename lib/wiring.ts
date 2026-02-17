// lib/wiring.ts
// Wiring configurations for "Show the Wiring" meta-learning feature
// This file defines the AI pipeline for each feature, making the platform its own case study

export interface WiringStep {
  technique: string;
  lessonSlug?: string;
  description: string;
  icon?: string;
}

export interface WiringConfig {
  label: string;
  steps: WiringStep[];
}

export const WIRING: Record<string, WiringConfig> = {
  popup: {
    label: 'How this popup was generated',
    steps: [
      {
        technique: 'Prompt Engineering',
        lessonSlug: '02-prompt-engineering',
        description: 'Your click context + term name + your level → structured prompt',
        icon: '📝',
      },
      {
        technique: 'Claude API',
        lessonSlug: '01-how-ai-works',
        description: 'Prompt sent to Claude → generates explanation as JSON',
        icon: '🤖',
      },
      {
        technique: 'JSON Parsing',
        lessonSlug: '01-how-ai-works',
        description: 'Raw text → parsed into explanation + example + diagram',
        icon: '⚙️',
      },
    ],
  },

  chat: {
    label: 'How the AI assistant works',
    steps: [
      {
        technique: 'Prompt Engineering',
        lessonSlug: '02-prompt-engineering',
        description: 'System prompt sets personality + your level + page context',
        icon: '📝',
      },
      {
        technique: 'RAG Search',
        lessonSlug: '04-rag',
        description: 'Your question → embedded → searched against course content',
        icon: '🔍',
      },
      {
        technique: 'Context Window',
        lessonSlug: '01-how-ai-works',
        description: 'System prompt + RAG results + chat history + your message',
        icon: '📦',
      },
      {
        technique: 'Claude API',
        lessonSlug: '01-how-ai-works',
        description: 'Everything combined → Claude generates a response',
        icon: '🤖',
      },
    ],
  },

  deepDive: {
    label: 'How this deep dive was generated',
    steps: [
      {
        technique: 'Prompt Engineering',
        lessonSlug: '02-prompt-engineering',
        description: 'Structured prompt with sections: analogy, code, quiz, etc.',
        icon: '📝',
      },
      {
        technique: 'Few-Shot Pattern',
        lessonSlug: '02-prompt-engineering',
        description: 'Prompt includes output format example so Claude matches the structure',
        icon: '🎯',
      },
      {
        technique: 'Claude API',
        lessonSlug: '01-how-ai-works',
        description: 'Long-form generation with temperature 0.7 for creative explanations',
        icon: '🤖',
      },
      {
        technique: 'Caching',
        lessonSlug: '04-rag',
        description: 'Generated content cached so repeat visits are instant',
        icon: '💾',
      },
    ],
  },

  clickableTerms: {
    label: 'How clickable terms work',
    steps: [
      {
        technique: 'Text Parsing',
        lessonSlug: '01-how-ai-works',
        description: 'Content scanned for [bracket] patterns → converted to clickable components',
        icon: '🔤',
      },
      {
        technique: 'State Management',
        description: 'Your exploration history tracked in local storage + Supabase',
        icon: '💾',
      },
    ],
  },

  goalPersonalization: {
    label: 'How your goal shapes content',
    steps: [
      {
        technique: 'Prompt Engineering',
        lessonSlug: '02-prompt-engineering',
        description: 'Your build goal injected into every AI prompt as context',
        icon: '📝',
      },
      {
        technique: 'Dynamic Examples',
        description: 'Claude adapts analogies and code examples to match your project',
        icon: '🎯',
      },
    ],
  },
};

/**
 * Get wiring configuration for a feature with dynamic annotations
 */
export function getWiring(
  feature: keyof typeof WIRING,
  extras?: {
    isFromCache?: boolean;
    ragEnabled?: boolean;
    generationTime?: number;
  }
): WiringConfig {
  const wiring = { ...WIRING[feature], steps: [...WIRING[feature].steps] };

  if (extras?.isFromCache) {
    wiring.steps.push({
      technique: 'Cache Hit',
      description: 'Loaded from cache — no API call needed (saved ~$0.01)',
      icon: '⚡',
    });
  }

  if (extras?.generationTime) {
    wiring.steps.push({
      technique: 'Result',
      description: `Generated in ${extras.generationTime}ms`,
      icon: '✅',
    });
  }

  return wiring;
}
