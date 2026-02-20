# Add "Explain Like..." Feature

## Overview
Add a persona-based re-explanation feature to lesson pages. Users click "Explain Like..." and pick a persona (Chef, Doctor, 10-year-old, Manager, Developer). The entire lesson content gets regenerated through that persona's lens via Claude API, with clickable [terms] preserved. Users can toggle back to the original anytime.

## Architecture

```
New files:
  1. app/api/explain-like/route.ts    — API endpoint calling Claude
  2. components/lesson/ExplainLike.tsx — Persona selector + banner UI

Modified files:
  3. lib/ai/prompts.ts                — Add buildExplainLikePrompt()
  4. app/course/[lessonSlug]/page.tsx  — Wire button + state + content swap
```

---

## File 1: `app/api/explain-like/route.ts`

New API endpoint that takes lesson content + persona and returns re-explained markdown.

```typescript
// app/api/explain-like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateContent, isClaudeError } from '@/lib/ai/claude';
import { buildExplainLikePrompt } from '@/lib/ai/prompts';
import type { UserLevel } from '@/types';

// In-memory cache: lesson+persona+level → regenerated content
const explainCache = new Map<string, { content: string; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface ExplainLikeRequest {
  lessonContent: string;   // The original markdown content
  lessonTitle: string;
  persona: string;         // e.g., "chef", "doctor", "kid", "manager", "developer"
  level: UserLevel;
}

function validateRequest(body: unknown): body is ExplainLikeRequest {
  if (!body || typeof body !== 'object') return false;
  const req = body as Record<string, unknown>;
  if (typeof req.lessonContent !== 'string' || !req.lessonContent) return false;
  if (typeof req.lessonTitle !== 'string' || !req.lessonTitle) return false;
  if (typeof req.persona !== 'string' || !req.persona) return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(req.level as string)) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!validateRequest(body)) {
      return NextResponse.json(
        { error: 'Required: lessonContent, lessonTitle, persona, level' },
        { status: 400 }
      );
    }

    const { lessonContent, lessonTitle, persona, level } = body;

    // Check cache
    const cacheKey = `explain:${lessonTitle}:${persona}:${level}`;
    const cached = explainCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({ content: cached.content, cached: true });
    }

    // Build prompt and call Claude
    const prompt = buildExplainLikePrompt({
      lessonContent,
      lessonTitle,
      persona,
      level,
    });

    // Use generateContent but we need raw text, not JSON
    // So we'll call Claude directly here for text output
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      temperature: 0.8,  // Slightly creative for persona voice
      system: `You are a creative AI educator who can explain technical concepts through the lens of different professions and perspectives. You maintain technical accuracy while making the content feel native to the chosen persona's world.`,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find(b => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 502 }
      );
    }

    const generatedContent = textBlock.text.trim();

    // Cache it
    explainCache.set(cacheKey, {
      content: generatedContent,
      timestamp: Date.now(),
    });

    return NextResponse.json({ content: generatedContent, cached: false });

  } catch (error) {
    console.error('Explain-like error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('rate') || error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Try again shortly.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate explanation. Please try again.' },
      { status: 500 }
    );
  }
}
```

---

## File 2: `lib/ai/prompts.ts` — Add the prompt builder

Add this function to the EXISTING `lib/ai/prompts.ts` file. Do NOT replace the file — just append this function.

```typescript
/**
 * Build prompt for "Explain Like..." persona re-explanation
 */
export function buildExplainLikePrompt(params: {
  lessonContent: string;
  lessonTitle: string;
  persona: string;
  level: string;
}): string {
  const { lessonContent, lessonTitle, persona, level } = params;

  const personaGuide: Record<string, string> = {
    chef: `You are a master chef explaining AI concepts using cooking and kitchen analogies.
- Tokens = ingredients, Context window = the size of your pot, Temperature = how experimental the recipe is
- Models = recipe books trained on millions of dishes
- Embeddings = how a sommelier maps flavors in their mind
- RAG = having your recipe binder open while cooking instead of cooking from memory
- Use terms like: recipe, ingredients, kitchen, mise en place, seasoning, flavor profile, plating
- Make it feel like a warm, engaging cooking lesson`,

    doctor: `You are a medical doctor explaining AI concepts using healthcare and biology analogies.
- Tokens = cells (basic building blocks), Context window = short-term memory capacity
- Models = diagnostic reasoning trained on millions of patient cases
- Embeddings = how the brain encodes symptoms into patterns for differential diagnosis
- RAG = consulting medical references during a diagnosis instead of relying on memory alone
- Use terms like: diagnosis, symptoms, treatment, vitals, triage, prognosis, neural pathways
- Make it feel like a clear, authoritative medical briefing`,

    kid: `You are explaining AI concepts to a curious 10-year-old using fun, simple analogies.
- Tokens = LEGO bricks that AI snaps together to build sentences
- Context window = how many LEGO bricks fit on the baseplate
- Models = a super-smart robot that read every book in the biggest library ever
- Embeddings = sorting your toys by how similar they are (action figures near action figures)
- RAG = the robot carrying a cheat sheet instead of memorizing everything
- Use short sentences, exciting examples, "Imagine..." and "It's like..."
- Reference things kids know: video games, school, toys, cartoons, snacks`,

    manager: `You are a business strategist explaining AI concepts in terms of ROI, operations, and strategy.
- Tokens = units of compute cost (every word costs money), Context window = meeting agenda capacity
- Models = a highly trained analyst who read every report in the industry
- Embeddings = how market research segments customers by behavior similarity
- RAG = giving your analyst access to your company's documents before they answer
- Use terms like: ROI, pipeline, throughput, stakeholder, deliverable, cost-per-unit, scalability
- Focus on business impact, cost implications, and competitive advantage
- Make it feel like an executive briefing`,

    developer: `You are a senior software engineer explaining AI concepts using programming and systems analogies.
- Tokens = lexer tokens / bytecodes that the model processes
- Context window = stack size / buffer capacity
- Models = a giant hash map from input patterns to probability distributions
- Embeddings = feature vectors / hash functions that preserve semantic distance
- RAG = dependency injection — give the model data at runtime instead of compile time
- Use terms like: API, runtime, cache, buffer, latency, throughput, hash map, index
- Include mental models about data structures and system design
- Make it feel like a senior dev explaining to a mid-level colleague`,
  };

  const guide = personaGuide[persona] || personaGuide['kid'];

  return `Re-explain the following lesson content using a specific persona/perspective.

PERSONA: ${persona.toUpperCase()}
${guide}

LESSON TITLE: ${lessonTitle}
LEVEL: ${level}

ORIGINAL CONTENT:
---
${lessonContent}
---

INSTRUCTIONS:
1. Rewrite ALL the content above through the ${persona} persona's lens
2. PRESERVE the exact same structure: same ## headings, same ### subheadings, same sections
3. PRESERVE all [bracketed terms] exactly as they are — these are clickable links. Every [term] in the original MUST appear in your version too
4. PRESERVE any mermaid code blocks exactly as-is (do NOT modify diagrams)
5. PRESERVE any code blocks exactly as-is (do NOT modify code examples)
6. PRESERVE tables exactly as-is (do NOT modify tables)
7. Replace explanations, analogies, and examples with ones that fit the ${persona} persona
8. Keep the same approximate length for each section
9. Maintain technical accuracy — the persona affects HOW you explain, not WHAT you explain
10. Make it feel natural and immersive, not forced

OUTPUT: Return ONLY the rewritten markdown content. No preamble, no "Here's the rewritten content:", no wrapping. Just the markdown, starting with the first ## heading.`;
}
```

---

## File 3: `components/lesson/ExplainLike.tsx`

The UI component with persona selector and active-persona banner.

```typescript
// components/lesson/ExplainLike.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, X, Loader2, ChefHat, Stethoscope, Baby, Briefcase, Code2 } from 'lucide-react';

export interface Persona {
  id: string;
  label: string;
  emoji: string;
  icon: React.ReactNode;
  description: string;
  color: string; // Tailwind bg color for the banner
}

export const PERSONAS: Persona[] = [
  {
    id: 'chef',
    label: 'Chef',
    emoji: '👨‍🍳',
    icon: <ChefHat className="w-5 h-5" />,
    description: 'Cooking & kitchen analogies',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'doctor',
    label: 'Doctor',
    emoji: '🩺',
    icon: <Stethoscope className="w-5 h-5" />,
    description: 'Medical & biology analogies',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'kid',
    label: '10-Year-Old',
    emoji: '🧒',
    icon: <Baby className="w-5 h-5" />,
    description: 'Super simple, fun examples',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'manager',
    label: 'Manager',
    emoji: '💼',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Business & ROI framing',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'developer',
    label: 'Developer',
    emoji: '💻',
    icon: <Code2 className="w-5 h-5" />,
    description: 'Code & systems analogies',
    color: 'from-green-600 to-emerald-600',
  },
];

interface ExplainLikeButtonProps {
  onSelect: (persona: Persona) => void;
  isLoading: boolean;
  activePersona: Persona | null;
  onClear: () => void;
}

export function ExplainLikeButton({
  onSelect,
  isLoading,
  activePersona,
  onClear,
}: ExplainLikeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // If a persona is active, show the clear button instead
  if (activePersona) {
    return (
      <button
        onClick={onClear}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r ${activePersona.color} rounded-full transition-all hover:shadow-md active:scale-[0.97]`}
        title="Back to original"
      >
        <span>{activePersona.emoji}</span>
        <span className="hidden sm:inline">{activePersona.label} Mode</span>
        <X className="w-3.5 h-3.5 ml-0.5" />
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-full transition-colors disabled:opacity-50"
        title="Explain using different analogies"
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
        ) : (
          <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
        <span className="hidden sm:inline">Explain Like...</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Explain this lesson as a...</p>
              <p className="text-xs text-gray-500 mt-0.5">Same concepts, different perspective</p>
            </div>

            <div className="p-2">
              {PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => {
                    onSelect(persona);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                >
                  <span className="text-xl flex-shrink-0">{persona.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{persona.label}</p>
                    <p className="text-xs text-gray-500">{persona.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Banner shown above lesson content when a persona is active
 */
interface ExplainLikeBannerProps {
  persona: Persona;
  onClear: () => void;
  isLoading: boolean;
}

export function ExplainLikeBanner({ persona, onClear, isLoading }: ExplainLikeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-r ${persona.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-white`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl sm:text-3xl flex-shrink-0">{persona.emoji}</span>
          <div className="min-w-0">
            <p className="font-bold text-sm sm:text-base">
              {isLoading ? 'Regenerating...' : `${persona.label} Mode`}
            </p>
            <p className="text-xs sm:text-sm text-white/80">
              {isLoading
                ? `Rewriting this lesson through a ${persona.label.toLowerCase()}'s perspective...`
                : `This lesson is explained using ${persona.description.toLowerCase()}`}
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin flex-shrink-0 text-white/70" />
        ) : (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Original</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
```

---

## File 4: Modify `app/course/[lessonSlug]/page.tsx`

Wire the Explain Like feature into the lesson page.

### Add imports at top (add to existing imports):
```typescript
import { ExplainLikeButton, ExplainLikeBanner, PERSONAS } from '@/components/lesson/ExplainLike';
import type { Persona } from '@/components/lesson/ExplainLike';
```

### Add state inside the component (after existing state declarations):
```typescript
  // Explain Like... feature
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [personaContent, setPersonaContent] = useState<string | null>(null);
  const [isExplainLoading, setIsExplainLoading] = useState(false);
  // Cache: persona.id → content (so switching back and forth is instant)
  const [personaCache, setPersonaCache] = useState<Record<string, string>>({});
```

### Add the handler function (after the state declarations):
```typescript
  const handlePersonaSelect = async (persona: Persona) => {
    if (!lesson) return;

    // Check client-side cache first
    const cacheKey = `${lesson.id}:${persona.id}:${currentLevel}`;
    if (personaCache[cacheKey]) {
      setActivePersona(persona);
      setPersonaContent(personaCache[cacheKey]);
      return;
    }

    setActivePersona(persona);
    setIsExplainLoading(true);

    try {
      const res = await fetch('/api/explain-like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonContent: lesson.content[currentLevel],
          lessonTitle: lesson.title,
          persona: persona.id,
          level: currentLevel,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Failed to generate');
      }

      const data = await res.json();
      setPersonaContent(data.content);
      // Cache it client-side
      setPersonaCache(prev => ({ ...prev, [cacheKey]: data.content }));
    } catch (error) {
      console.error('Explain Like error:', error);
      // Clear persona on error so user can try again
      setActivePersona(null);
      setPersonaContent(null);
      // Optionally show a toast/alert here
    } finally {
      setIsExplainLoading(false);
    }
  };

  const handleClearPersona = () => {
    setActivePersona(null);
    setPersonaContent(null);
  };

  // Clear persona content when level changes (content is different per level)
  useEffect(() => {
    setActivePersona(null);
    setPersonaContent(null);
  }, [currentLevel]);
```

### Add the ExplainLikeButton to the lesson header

Find the right side of the sticky header (the `<div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">` section). Add the button BEFORE the clock/time element:

```tsx
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Explain Like button */}
              <ExplainLikeButton
                onSelect={handlePersonaSelect}
                isLoading={isExplainLoading}
                activePersona={activePersona}
                onClear={handleClearPersona}
              />
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {lesson.estimatedMinutes} min
              </div>
              <div className="text-xs sm:text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {scrollProgress}%
              </div>
            </div>
```

### Add the banner and swap content in the lesson body

Find the lesson body section:
```tsx
              {/* Lesson Body */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                <LessonContent
                  content={lesson.content[currentLevel]}
                  terms={lesson.terms}
                />
              </div>
```

Replace with:
```tsx
              {/* Persona Banner */}
              <AnimatePresence>
                {activePersona && (
                  <ExplainLikeBanner
                    persona={activePersona}
                    onClear={handleClearPersona}
                    isLoading={isExplainLoading}
                  />
                )}
              </AnimatePresence>

              {/* Lesson Body */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                {isExplainLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                    <div className="h-4 bg-gray-100 rounded w-4/6" />
                    <div className="h-8 bg-gray-200 rounded w-2/3 mt-8" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                  </div>
                ) : (
                  <LessonContent
                    content={activePersona && personaContent ? personaContent : lesson.content[currentLevel]}
                    terms={lesson.terms}
                  />
                )}
              </div>
```

Make sure `AnimatePresence` is imported from `framer-motion` (it likely already is).

---

## UX Flow

```
1. User reads Lesson 1: "How AI Works" at beginner level

2. User clicks the ✨ "Explain Like..." button in the header

3. Dropdown appears with 5 personas:
   👨‍🍳 Chef — Cooking & kitchen analogies
   🩺 Doctor — Medical & biology analogies  
   🧒 10-Year-Old — Super simple, fun examples
   💼 Manager — Business & ROI framing
   💻 Developer — Code & systems analogies

4. User picks "Chef" 👨‍🍳

5. Banner appears: "Chef Mode — Regenerating..."
   Content area shows skeleton loading state

6. After 2-3 seconds, content swaps to chef version:
   - "## AI is a Super-Powered Autocomplete" becomes
     "## AI is Like a Chef Who Tasted Every Dish Ever Made"
   - "Tokens are pieces of text" becomes
     "Think of [tokens] as your ingredients — the building blocks of every dish"
   - [clickable terms] still work!
   - Diagrams and code blocks are preserved

7. Header button changes: "👨‍🍳 Chef Mode ✕" (click to go back)
   Banner has "Original" button to switch back

8. Switching back to original is instant (cached)
   Switching to the same persona again is instant (cached)
   Switching levels clears persona (different base content)
```

---

## What the Persona Content Looks Like

### Original (Beginner):
```markdown
## AI is a Super-Powered Autocomplete

Here's the surprising truth: AI doesn't "understand" anything the way you do. 
It's doing one thing incredibly well: **predicting what comes next**.

When you text a friend and your phone suggests "sounds good!" — that's autocomplete. 
[Next token prediction] is the same idea, but trained on essentially the entire internet.
```

### Chef Mode 👨‍🍳:
```markdown
## AI is Like a Chef Who Tasted Every Recipe Ever Written

Here's what's really happening in the AI kitchen: it's not actually "cooking" 
with understanding — it's predicting what **ingredient comes next** in the recipe.

Think of your phone's autocomplete as a line cook who knows your ordering habits. 
[Next token prediction] is that same idea, but imagine a master chef who has tasted 
every dish from every restaurant on Earth and can predict exactly what flavor goes next.
```

### Doctor Mode 🩺:
```markdown
## AI is Like Pattern Recognition in Diagnosis

Here's the clinical truth: AI doesn't "understand" the way a physician does. 
It performs one function extraordinarily well: **predicting the most probable next symptom 
in a pattern**.

Your phone suggesting the next word is like recognizing a common symptom cluster. 
[Next token prediction] scales this up — imagine a diagnostician who has reviewed 
every patient chart ever recorded, identifying the most likely next element in a sequence.
```

---

## Testing Checklist

- [ ] "Explain Like..." button appears in lesson header
- [ ] Clicking it opens persona dropdown with 5 options
- [ ] Selecting a persona shows loading state (skeleton + banner with "Regenerating...")
- [ ] After loading, content swaps to persona version
- [ ] [Clickable terms] in persona content still work (open popups)
- [ ] Code blocks and Mermaid diagrams are preserved unchanged
- [ ] Header button shows active persona with X to clear
- [ ] Banner shows "Original" button to switch back
- [ ] Switching back to original is instant (no API call)
- [ ] Selecting the same persona again is instant (cached)
- [ ] Switching expertise level clears the persona (content is per-level)
- [ ] Works on mobile (button shows icon only, dropdown fits screen)
- [ ] API errors are handled gracefully (persona clears, user can retry)
- [ ] Test with Lesson 1 + Chef persona
- [ ] Test with Lesson 2 + Developer persona (has code blocks that should be preserved)

## API Cost Estimate
- ~4K chars input + prompt = ~2K tokens input
- ~4K chars output = ~1K tokens output
- At Sonnet pricing: ~$0.01-0.02 per regeneration
- Cached after first call (per lesson × persona × level)

## Commit
Use message: "Add 'Explain Like...' persona-based re-explanation feature"
