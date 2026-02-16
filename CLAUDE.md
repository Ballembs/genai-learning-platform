# GenAI Learning Platform - Claude Code Project Context

## Project Vision

Build the **greatest AI learning platform** where:
- **No question goes unanswered** - Every term is clickable and explorable
- **No concept is left unexplored** - "Advanced topics" become rabbit holes, not omissions
- **Nothing gets lost** - Every exploration is saved to the user's profile
- **Zero confusion** - Chat assistant available for clarification anytime

## Core UX Pattern: The Rabbit Hole

```
User reads lesson
    → Sees [highlighted term]
    → Clicks it
    → Popup appears with quick explanation
    → "Got it!" dismisses (saved to profile)
    → "Learn More" opens full deep dive page
        → Deep dive has ITS OWN [clickable terms]
        → User can go deeper and deeper
        → Breadcrumb navigation: Lesson > Term > Sub-term
        → "Back" returns to original context
```

## Critical Requirements

### 1. Nothing Gets Omitted
Instead of "What we simplified" sections, every advanced topic becomes a clickable rabbit hole:

```
❌ WRONG: "We won't cover multi-agent systems here"
✅ RIGHT: "Click [multi-agent systems] to explore this advanced topic"
```

### 2. Everything Persists
- Popup viewed → Saved to profile
- Deep dive opened → Saved to profile  
- Chat question asked → Saved to profile
- Progress on lessons → Saved to profile

### 3. Generated Content = Hand-Crafted Quality
When AI generates a deep dive, it must include:
- One-liner summary
- Relatable analogy
- Mermaid diagram
- Code example (if applicable)
- Common misconceptions
- Related terms (clickable!)
- Quiz questions

### 4. Chat Assistant Always Available
- Floating button on every page
- Knows current context (which lesson/term user is viewing)
- Uses RAG to answer from course content
- Explains at user's selected level

## Tech Stack

```
Frontend:        Next.js 14 (App Router) + TypeScript + Tailwind CSS
State:           Zustand (persisted to localStorage, later Supabase)
Diagrams:        Mermaid.js
Animations:      Framer Motion
Icons:           Lucide React

Backend:         Next.js API Routes
AI:              Claude API (Anthropic)
Embeddings:      Voyage AI
Vector DB:       ChromaDB (dev) → Pinecone (prod)
Database:        Supabase (PostgreSQL)
Auth:            Supabase Auth

Hosting:         Vercel
```

## Environment Variables

```bash
# AI Services
ANTHROPIC_API_KEY=           # Claude API key for content generation
VOYAGE_API_KEY=              # Voyage AI for embeddings (optional)

# Supabase (Optional - falls back to localStorage without these)
NEXT_PUBLIC_SUPABASE_URL=    # Project URL (https://xxxxx.supabase.co)

# IMPORTANT: Supabase has deprecated legacy API keys
# Use the NEW key names from Settings > API > Project API keys:

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=  # Safe for browser/client-side
                                        # REQUIRES Row Level Security (RLS) policies
                                        # Previously called "anon key"

SUPABASE_SECRET_KEY=                    # Server-side only, NEVER expose to client
                                        # Bypasses RLS - use in API routes only
                                        # Previously called "service_role key"
```

### Key Security Notes
- **Publishable key**: Safe for client-side code, but ALL data access MUST be protected by RLS policies
- **Secret key**: Bypasses RLS entirely - only use in server-side code (API routes, server actions)
- Never commit real keys to version control - use `.env.local`

## File Structure

```
genai-learning-platform/
├── app/
│   ├── layout.tsx                 # Root layout with global components
│   ├── page.tsx                   # Landing page with level selection
│   ├── globals.css                # Tailwind + custom styles
│   ├── course/
│   │   ├── page.tsx               # Course overview (all lessons)
│   │   ├── [lessonSlug]/
│   │   │   └── page.tsx           # Individual lesson view
│   │   └── term/
│   │       └── [termSlug]/
│   │           └── page.tsx       # Deep dive page
│   ├── profile/
│   │   └── page.tsx               # User profile & explorations
│   └── api/
│       ├── popup/route.ts         # Generate popup content
│       ├── deep-dive/route.ts     # Generate full deep dive
│       ├── chat/route.ts          # Chat assistant (RAG)
│       └── progress/route.ts      # Save/load progress
│
├── components/
│   ├── lesson/
│   │   ├── ClickableTerm.tsx      # The [term] component
│   │   ├── Popup.tsx              # Quick explanation modal
│   │   ├── LessonContent.tsx      # Markdown renderer with terms
│   │   └── Sidebar.tsx            # Explorations & progress
│   ├── deep-dive/
│   │   ├── DeepDiveContent.tsx    # Full deep dive renderer
│   │   └── Breadcrumb.tsx         # Navigation path
│   ├── chat/
│   │   ├── ChatButton.tsx         # Floating chat button
│   │   └── ChatWindow.tsx         # Chat interface
│   └── diagrams/
│       └── MermaidDiagram.tsx     # Render Mermaid diagrams
│
├── content/
│   └── lessons/
│       ├── index.ts               # Lesson data exports
│       ├── 01-how-ai-works.ts
│       ├── 02-prompt-engineering.ts
│       ├── 03-embeddings.ts
│       ├── 04-rag.ts
│       └── 05-agents.ts
│
├── lib/
│   ├── store.ts                   # Zustand stores
│   ├── ai/
│   │   ├── claude.ts              # Claude API wrapper
│   │   ├── embeddings.ts          # Voyage AI wrapper
│   │   └── prompts.ts             # Generation prompts
│   └── db/
│       └── supabase.ts            # Database client
│
├── types/
│   └── index.ts                   # TypeScript types
│
└── public/
    └── ...                        # Static assets
```

## Key Components to Build

### 1. ClickableTerm Component
```tsx
// Wraps any term in brackets [like this]
// On click: opens popup at click position
// Tracks: whether user has explored this term
<ClickableTerm termId="embeddings">embeddings</ClickableTerm>
```

### 2. Popup Component
```tsx
// Appears near clicked term
// Shows: explanation, example, small diagram
// Actions: "Got it!" (dismiss) or "Learn More" (navigate)
// Always saves to profile when viewed
```

### 3. Deep Dive Page
```tsx
// Full lesson-quality content for any term
// Has its OWN clickable terms (rabbit hole!)
// Sections: One-liner, Analogy, How it Works, Code, Quiz
// Navigation: Breadcrumb + Back button
```

### 4. Chat Assistant
```tsx
// Floating button → expandable window
// Context-aware (knows current page)
// Uses RAG to search course content
// Adapts to user's level setting
```

## Content Generation Prompts

### Popup Generation
```
Generate a popup explanation for "{term}" at {level} level.

User is currently reading: {lessonTitle}
Surrounding context: {surroundingText}

Requirements:
- 2-3 sentences max
- Include concrete example
- {level}-appropriate language
- If diagram helps, include Mermaid code

Return JSON:
{
  "explanation": "...",
  "example": "...",
  "diagram": "mermaid code or null"
}
```

### Deep Dive Generation
```
Generate a complete lesson about "{term}" at {level} level.

This content must match hand-crafted lesson quality.

Structure:
1. ONE-LINER: Single sentence capturing essence
2. ANALOGY: Relatable real-world comparison (2-3 sentences)
3. HOW IT WORKS: Clear explanation with Mermaid diagram
4. CODE EXAMPLE: Practical implementation (if applicable)
5. COMMON MISCONCEPTIONS: What people get wrong
6. RELATED TERMS: 3-5 terms to explore (will become clickable)
7. ADVANCED TOPICS: Deeper rabbit holes available
8. QUIZ: 3 questions to check understanding

User context:
- Current level: {level}
- Came from: {originLesson}
- Already explored: {exploredTerms}

Make connections to what they already know.
```

## Database Schema (Supabase)

```sql
-- Users (handled by Supabase Auth)

-- User preferences
CREATE TABLE user_preferences (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  level TEXT DEFAULT 'beginner',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Explorations (every popup/deep dive viewed)
CREATE TABLE explorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  term_id TEXT NOT NULL,
  term_name TEXT NOT NULL,
  from_lesson_id TEXT,
  from_context TEXT,
  popup_viewed_at TIMESTAMPTZ,
  deep_dive_viewed_at TIMESTAMPTZ,
  mastery_viewed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson progress
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  lesson_id TEXT NOT NULL,
  percent_complete INTEGER DEFAULT 0,
  sections_completed TEXT[],
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Chat history
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  session_id UUID,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated content cache
CREATE TABLE generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id TEXT NOT NULL,
  level TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'popup' or 'deep_dive'
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(term_id, level, content_type)
);
```

## Development Phases

### Phase 1: Core Experience (MVP)
- [ ] Next.js project setup with Tailwind
- [ ] Landing page with level selection
- [ ] Course overview page
- [ ] Lesson page with clickable terms (hardcoded content)
- [ ] Popup component
- [ ] Local storage persistence (Zustand)
- [ ] Basic styling and animations

### Phase 2: Deep Dives
- [ ] Deep dive page layout
- [ ] Breadcrumb navigation
- [ ] AI-generated deep dive content (Claude API)
- [ ] Recursive clickable terms in deep dives
- [ ] Content caching

### Phase 3: Chat Assistant
- [ ] Chat button and window UI
- [ ] Context awareness
- [ ] RAG implementation (embed lessons, search)
- [ ] Level-adaptive responses

### Phase 4: Persistence & Auth
- [ ] Supabase setup
- [ ] User authentication
- [ ] Save explorations to database
- [ ] Profile page with exploration history
- [ ] Progress tracking

### Phase 5: Polish
- [ ] All 5 lessons with full content
- [ ] Quiz functionality
- [ ] Animations and micro-interactions
- [ ] Mobile responsiveness
- [ ] Knowledge graph visualization

## Commands for Claude Code

When working on this project, use these patterns:

```bash
# Start development
npm run dev

# Create new component
# Ask: "Create the ClickableTerm component following the spec in CLAUDE.md"

# Add lesson content
# Ask: "Add the full content for Lesson 3 (Embeddings) following the content structure"

# Implement feature
# Ask: "Implement the popup component with animations and profile saving"
```

## Quality Standards

### Code
- TypeScript strict mode
- All components have proper types
- No `any` types
- Consistent naming (PascalCase components, camelCase functions)

### Content
- Every term definition has all three levels (beginner/intermediate/advanced)
- Diagrams are Mermaid-compatible
- Code examples are runnable
- No "this is out of scope" - make it a clickable rabbit hole instead

### UX
- Animations are smooth but not slow (150-300ms)
- Popups appear near click position
- Navigation state is preserved
- Progress saves automatically

## Remember

1. **Never omit content** - Make it a clickable exploration instead
2. **Always save** - Every interaction updates the profile
3. **Quality consistency** - AI-generated content must match hand-crafted
4. **Zero confusion** - Chat is always available for help
5. **The product teaches itself** - This platform is built using the concepts it teaches
