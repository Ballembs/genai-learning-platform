# GenAI Learning Platform - Product Requirements Document

## Vision Statement

**"The learning platform where no question goes unanswered and no concept is left unexplored."**

Build the most comprehensive, adaptive AI learning platform where users can infinitely explore concepts through a "rabbit hole" UX, with every exploration saved to their learning journey, ensuring complete understanding with zero confusion.

---

## Core Principles

### 1. No Dead Ends
Every term, concept, or advanced topic is clickable. Nothing is "omitted" — it's just "not explored yet." Users can always go deeper.

### 2. Nothing Gets Lost
Every popup viewed, every deep dive taken, every question asked — all saved to the user's learning profile. Their journey is preserved.

### 3. Quality Consistency
AI-generated content must match the quality of hand-crafted lessons: clear analogies, diagrams, code examples, and proper structure.

### 4. Zero Confusion
If a user doesn't understand something, they have immediate paths to clarity: click a term, open a popup, ask in chat, or dive deeper.

### 5. Infinite Depth
From "What is AI?" to "Implementing HNSW indices with product quantization" — the platform adapts and generates content at any depth.

---

## User Experience Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   USER JOURNEY                                                              │
│   ════════════                                                              │
│                                                                             │
│   1. LANDING                                                                │
│      ├── Select experience level (Beginner / Intermediate / Advanced)     │
│      ├── Optional: Create account (to save progress)                       │
│      └── Enter learning dashboard                                          │
│                                                                             │
│   2. COURSE VIEW                                                            │
│      ├── See all 5 lessons (+ future lessons)                              │
│      ├── Progress indicators per lesson                                    │
│      └── Click to enter any lesson                                         │
│                                                                             │
│   3. LESSON VIEW                                                            │
│      ├── Full lesson content with [clickable terms]                        │
│      ├── Sidebar: "Your Explorations" (terms you've clicked)              │
│      ├── Floating chat button for questions                                │
│      └── Progress bar showing reading progress                             │
│                                                                             │
│   4. POPUP (Quick Explanation)                                             │
│      ├── 2-3 sentence explanation at user's level                         │
│      ├── Small diagram if applicable                                       │
│      ├── [Got it!] — Dismiss, marked as "viewed"                          │
│      ├── [Learn More →] — Opens deep dive                                 │
│      └── Saved to "Your Explorations" sidebar                             │
│                                                                             │
│   5. DEEP DIVE PAGE (Full Exploration)                                     │
│      ├── Full lesson-quality content on the topic                         │
│      ├── Level selector (can adjust mid-reading)                          │
│      ├── Contains its OWN [clickable terms] → more rabbit holes           │
│      ├── Diagrams (Mermaid), code examples, analogies                     │
│      ├── "Advanced Topics" section with clickable items                   │
│      ├── Quiz to check understanding                                       │
│      ├── [← Back to {origin}] — Returns to where they came from          │
│      ├── [🎓 Master This] — Even deeper content                           │
│      └── Breadcrumb: Lesson 4 > RAG > Embeddings > Vector Search          │
│                                                                             │
│   6. CHAT ASSISTANT (Always Available)                                     │
│      ├── Floating button on every page                                     │
│      ├── Context-aware: knows what lesson/topic user is viewing          │
│      ├── Answers questions using course content (RAG)                     │
│      ├── Can generate clarifications at user's level                      │
│      ├── Suggests related topics to explore                                │
│      └── Chat history saved to profile                                     │
│                                                                             │
│   7. LEARNING PROFILE                                                       │
│      ├── All explored topics (popups viewed, deep dives taken)            │
│      ├── Quiz results and understanding scores                             │
│      ├── Chat history and questions asked                                  │
│      ├── Recommended next topics                                           │
│      ├── Time spent learning                                               │
│      └── "Knowledge graph" visualization of explored concepts             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Content Structure

### Core Lessons (Hand-Crafted)
These are the foundation — your 5 lessons, polished and complete.

```
lessons/
├── lesson-01-how-ai-works/
│   ├── content.md              # Main lesson content
│   ├── terms.json              # Clickable terms with popup content
│   ├── advanced-topics.json    # "What we simplified" → rabbit holes
│   └── quiz.json               # Understanding check
├── lesson-02-prompt-engineering/
├── lesson-03-embeddings/
├── lesson-04-rag/
└── lesson-05-agents/
```

### Term Definitions (For Popups)
Each lesson has clickable terms. These can be:
- **Pre-defined**: Hand-crafted popup content
- **AI-generated**: Generated on-demand if not pre-defined

```json
{
  "embeddings": {
    "popup": {
      "beginner": "Numbers that capture meaning. Similar ideas = similar numbers.",
      "intermediate": "Dense vector representations of text, typically 768-1536 dimensions.",
      "advanced": "Learned projections into continuous vector spaces via transformer architectures."
    },
    "diagram": "flowchart LR\n  A[Text] --> B[Model] --> C[Numbers]",
    "hasDeepDive": true,
    "deepDiveLesson": "embeddings"
  }
}
```

### Deep Dive Content (AI-Generated with Quality Control)
When user clicks "Learn More", the system:
1. Checks if pre-generated content exists
2. If not, generates using Claude with strict quality template
3. Caches the result for future users
4. Saves to user's profile

### Advanced Topics (Rabbit Holes)
Instead of omitting topics, we include them as explorable items:

```json
{
  "lesson": "agents",
  "advancedTopics": [
    {
      "title": "Multi-Agent Systems",
      "description": "Multiple AI agents working together",
      "difficulty": "advanced",
      "prerequisites": ["agents-basics"],
      "clickable": true
    },
    {
      "title": "LangChain Framework",
      "description": "Popular framework for building agent applications",
      "difficulty": "intermediate",
      "prerequisites": ["agents-basics"],
      "clickable": true
    }
  ]
}
```

---

## Page Layouts

### Lesson Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Back to Course]                    [💬 Chat] [👤 Profile]              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────┐  ┌───────────────────────────┐│
│  │                                         │  │ YOUR EXPLORATIONS         ││
│  │  LESSON 4: RAG                          │  │ ───────────────────────   ││
│  │  Teaching AI Your Data                  │  │                           ││
│  │  ═══════════════════════                │  │ ✓ embeddings (viewed)     ││
│  │                                         │  │ ✓ vector database         ││
│  │  [Beginner ▼] level                     │  │ ○ chunking (not viewed)   ││
│  │                                         │  │ ○ reranking               ││
│  │  ─────────────────────────────────────  │  │                           ││
│  │                                         │  │ ───────────────────────   ││
│  │  RAG solves two problems that every     │  │ ADVANCED TOPICS           ││
│  │  AI application faces...                │  │                           ││
│  │                                         │  │ ○ GraphRAG                ││
│  │  It uses [embeddings] to convert your   │  │ ○ HyDE                    ││
│  │  documents into searchable [vectors],   │  │ ○ Multi-vector retrieval  ││
│  │  stores them in a [vector database],    │  │                           ││
│  │  and retrieves the most relevant...     │  │ ───────────────────────   ││
│  │                                         │  │ PROGRESS                  ││
│  │  ════════════════════════════════════   │  │ ████████░░ 75%            ││
│  │                                         │  │                           ││
│  │  [Continue Reading ↓]                   │  │                           ││
│  │                                         │  │                           ││
│  └─────────────────────────────────────────┘  └───────────────────────────┘│
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════  │
│  Progress: ████████████░░░░░░░░ Section 2 of 5                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Popup Design

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  📚 EMBEDDINGS                                           │  │
│  │  ─────────────                                            │  │
│  │                                                           │  │
│  │  Numbers that capture the meaning of text. Words with     │  │
│  │  similar meanings get similar numbers, making it possible │  │
│  │  to find related content mathematically.                  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  "happy" ──→ [0.2, 0.8, 0.1]  ─┐                    │  │  │
│  │  │                                 ├── Close!          │  │  │
│  │  │  "joyful" ─→ [0.2, 0.7, 0.2]  ─┘                    │  │  │
│  │  │                                                     │  │  │
│  │  │  "refrigerator" → [0.9, 0.1, 0.5] ── Far away      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────┐  ┌────────────────────────────┐     │  │
│  │  │   ✓ Got it!     │  │   Learn More →             │     │  │
│  │  └─────────────────┘  └────────────────────────────┘     │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Deep Dive Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  BREADCRUMB: Course > Lesson 4: RAG > Embeddings                           │
│  [← Back to RAG Lesson]                        [💬 Chat] [👤 Profile]      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  📚 EMBEDDINGS: GPS Coordinates for Meaning                        │   │
│  │  ══════════════════════════════════════════                         │   │
│  │                                                                     │   │
│  │  Level: [Beginner ▼]                    ⏱️ 8 min read               │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  🎯 ONE-LINER                                                       │   │
│  │  Embeddings convert text into numbers where similar meanings        │   │
│  │  become similar numbers.                                            │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  📖 THE ANALOGY                                                     │   │
│  │                                                                     │   │
│  │  Imagine every word has GPS coordinates—not for location on        │   │
│  │  Earth, but for location in "meaning space." The word "happy"      │   │
│  │  might be at coordinates [0.2, 0.8], while "joyful" is nearby      │   │
│  │  at [0.2, 0.7]. But "refrigerator" is way over at [0.9, 0.1]—     │   │
│  │  far away because it means something completely different.         │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  📊 HOW IT WORKS                                                    │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │         [MERMAID DIAGRAM: Text → Model → Vector]            │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  When you send text to an [embedding model], it returns a list    │   │
│  │  of numbers (typically 1,536 of them). These numbers together     │   │
│  │  represent the meaning of your text...                             │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  💻 TRY IT YOURSELF                                                │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  [Interactive code playground]                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  🔗 RELATED CONCEPTS                                               │   │
│  │  [Vector Database]  [Cosine Similarity]  [Chunking]               │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  🚀 ADVANCED TOPICS                                                │   │
│  │  Want to go deeper? Explore these:                                 │   │
│  │                                                                     │   │
│  │  • [Embedding Models Compared] - Voyage, OpenAI, Cohere           │   │
│  │  • [Dimensionality] - Why 1,536 numbers?                          │   │
│  │  • [Fine-tuning Embeddings] - Custom models for your domain       │   │
│  │  • [Matryoshka Embeddings] - Variable-size representations        │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  ✅ CHECK YOUR UNDERSTANDING                                        │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  Q: What happens when two texts have similar embeddings?    │   │   │
│  │  │                                                             │   │   │
│  │  │  ○ They have similar meanings                               │   │   │
│  │  │  ○ They have the same words                                 │   │   │
│  │  │  ○ They are the same length                                 │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ═══════════════════════════════════════════════════════════════   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────┐          ┌─────────────────────────┐     │   │
│  │  │  ← Back to RAG      │          │  🎓 Master This Topic   │     │   │
│  │  └─────────────────────┘          └─────────────────────────┘     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Models

### User Profile
```typescript
interface UserProfile {
  id: string;
  email?: string;
  createdAt: Date;
  
  // Learning preferences
  level: 'beginner' | 'intermediate' | 'advanced';
  
  // Progress tracking
  lessonsProgress: {
    lessonId: string;
    percentComplete: number;
    lastAccessedAt: Date;
  }[];
  
  // Explorations (rabbit holes taken)
  explorations: {
    termId: string;
    term: string;
    fromLesson: string;
    popupViewedAt?: Date;
    deepDiveViewedAt?: Date;
    masteryViewedAt?: Date;
    quizScore?: number;
  }[];
  
  // Chat history
  chatHistory: {
    context: string;  // Which page they were on
    messages: Message[];
    timestamp: Date;
  }[];
  
  // Achievements
  termsExplored: number;
  deepDivesCompleted: number;
  quizzesPassed: number;
  timeSpentLearning: number;  // minutes
}
```

### Content Models
```typescript
interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedTime: number;  // minutes
  
  content: {
    beginner: string;     // Markdown with [clickable terms]
    intermediate: string;
    advanced: string;
  };
  
  terms: Term[];
  advancedTopics: AdvancedTopic[];
  quiz: Quiz;
}

interface Term {
  id: string;
  term: string;
  
  popup: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  
  diagram?: string;  // Mermaid code
  hasDeepDive: boolean;
  relatedTerms: string[];
}

interface DeepDive {
  termId: string;
  
  content: {
    beginner: LessonContent;
    intermediate: LessonContent;
    advanced: LessonContent;
  };
  
  // Can be pre-generated or AI-generated
  source: 'manual' | 'ai-generated';
  generatedAt?: Date;
  approvedAt?: Date;
}

interface LessonContent {
  oneLiner: string;
  analogy: string;
  explanation: string;
  diagram: string;        // Mermaid code
  codeExample?: string;
  relatedTerms: string[];
  advancedTopics: AdvancedTopic[];
  quiz: QuizQuestion[];
}
```

---

## AI Generation Quality Standards

When AI generates content (popups, deep dives, etc.), it MUST follow this template:

### Popup Generation Prompt
```
Generate a popup explanation for "{term}" at {level} level.

Context: The user is learning about {currentLesson} and clicked on this term.

Requirements:
- 2-3 sentences maximum
- Use simple language for beginners, technical for advanced
- Include a concrete example or analogy
- End with something that makes them want to learn more

Format:
{
  "explanation": "...",
  "example": "...",
  "diagram": "mermaid code if applicable"
}
```

### Deep Dive Generation Prompt
```
Generate a complete lesson about "{term}" at {level} level.

This must match the quality of our hand-crafted lessons. Include:

1. ONE-LINER (1 sentence that captures the essence)
2. ANALOGY (relatable comparison, 2-3 sentences)
3. HOW IT WORKS (clear explanation with diagram)
4. CODE EXAMPLE (if applicable)
5. COMMON MISCONCEPTIONS (what people get wrong)
6. RELATED TERMS (3-5 terms they should explore)
7. ADVANCED TOPICS (2-4 deeper topics to explore)
8. QUIZ (3 questions to check understanding)

User's current context:
- Came from: {originLesson}
- Previously explored: {exploredTerms}
- Level: {level}

Generate content that connects to what they already know.
```

---

## Technical Architecture

### Tech Stack
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  FRONTEND                          BACKEND                                  │
│  ────────                          ───────                                  │
│  Next.js 14 (App Router)           Next.js API Routes                      │
│  React 18                          ─────────────────                        │
│  TypeScript                        Claude API (generation)                  │
│  Tailwind CSS                      Voyage AI (embeddings)                   │
│  Framer Motion (animations)        PostgreSQL (Supabase)                    │
│  Mermaid.js (diagrams)            Redis (caching)                          │
│  Monaco Editor (code)                                                       │
│                                                                             │
│  ───────────────────────────────────────────────────────────────────────   │
│                                                                             │
│  DATABASE STRUCTURE                                                         │
│  ──────────────────                                                         │
│                                                                             │
│  Supabase (PostgreSQL):                                                     │
│  ├── users                         # User profiles                         │
│  ├── lessons                       # Core lesson content                   │
│  ├── terms                         # Clickable terms + popup content       │
│  ├── deep_dives                    # Full deep dive content                │
│  ├── user_explorations             # What users have explored              │
│  ├── user_progress                 # Lesson progress                       │
│  ├── chat_history                  # Saved conversations                   │
│  └── generated_content             # AI-generated content cache            │
│                                                                             │
│  Vector Store (for RAG chat):                                               │
│  └── lesson_chunks                 # Embedded lesson content               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### File Structure
```
genai-learning-platform/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing page
│   ├── course/
│   │   ├── page.tsx                  # Course overview
│   │   └── [lessonId]/
│   │       ├── page.tsx              # Lesson view
│   │       └── [termId]/
│   │           └── page.tsx          # Deep dive view
│   ├── profile/
│   │   └── page.tsx                  # User profile
│   └── api/
│       ├── popup/route.ts            # Generate popup content
│       ├── deep-dive/route.ts        # Generate deep dive
│       ├── chat/route.ts             # Chat assistant
│       ├── progress/route.ts         # Save progress
│       └── explore/route.ts          # Track exploration
│
├── components/
│   ├── ui/                           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── lesson/
│   │   ├── LessonContent.tsx         # Main lesson renderer
│   │   ├── ClickableTerm.tsx         # Clickable [term] component
│   │   ├── Popup.tsx                 # Quick explanation popup
│   │   └── Sidebar.tsx               # Explorations sidebar
│   ├── deep-dive/
│   │   ├── DeepDiveContent.tsx       # Full deep dive page
│   │   ├── Breadcrumb.tsx            # Navigation breadcrumb
│   │   └── LevelSelector.tsx         # Difficulty selector
│   ├── chat/
│   │   ├── ChatButton.tsx            # Floating chat button
│   │   ├── ChatWindow.tsx            # Chat interface
│   │   └── ChatMessage.tsx           # Individual message
│   └── diagrams/
│       ├── MermaidDiagram.tsx        # Render Mermaid diagrams
│       └── CodePlayground.tsx        # Interactive code
│
├── content/
│   ├── lessons/
│   │   ├── 01-how-ai-works/
│   │   │   ├── content.mdx           # Lesson content
│   │   │   ├── terms.json            # Term definitions
│   │   │   └── quiz.json             # Quiz questions
│   │   ├── 02-prompt-engineering/
│   │   ├── 03-embeddings/
│   │   ├── 04-rag/
│   │   └── 05-agents/
│   └── deep-dives/                   # Pre-generated deep dives
│       ├── embeddings.json
│       ├── vector-database.json
│       └── ...
│
├── lib/
│   ├── ai/
│   │   ├── claude.ts                 # Claude API wrapper
│   │   ├── embeddings.ts             # Voyage AI wrapper
│   │   └── prompts.ts                # Generation prompts
│   ├── db/
│   │   ├── supabase.ts               # Supabase client
│   │   └── queries.ts                # Database queries
│   ├── content/
│   │   ├── parser.ts                 # Parse markdown with terms
│   │   └── generator.ts              # Generate content
│   └── utils/
│       └── ...
│
├── hooks/
│   ├── useUser.ts                    # User context
│   ├── useExploration.ts             # Track explorations
│   └── useChat.ts                    # Chat functionality
│
└── types/
    └── index.ts                      # TypeScript types
```

---

## MVP Scope

### Phase 1: Core Experience (Week 1-2)
- [ ] Landing page with level selection
- [ ] Lesson view with clickable terms
- [ ] Popup component (pre-defined content)
- [ ] Basic navigation (lessons list)
- [ ] Local storage for progress (no auth yet)

### Phase 2: Deep Dives (Week 3-4)
- [ ] Deep dive page layout
- [ ] AI-generated deep dive content
- [ ] Breadcrumb navigation
- [ ] Level switching within deep dive
- [ ] Related terms linking

### Phase 3: Persistence (Week 5-6)
- [ ] User authentication (Supabase)
- [ ] Save explorations to database
- [ ] Progress tracking
- [ ] Profile page with exploration history

### Phase 4: Chat Assistant (Week 7-8)
- [ ] Floating chat button
- [ ] Context-aware chat (knows current page)
- [ ] RAG-powered answers from course content
- [ ] Chat history persistence

### Phase 5: Polish (Week 9-10)
- [ ] Animations and transitions
- [ ] Quiz functionality
- [ ] Knowledge graph visualization
- [ ] Advanced topics as clickable rabbit holes
- [ ] Mobile responsiveness

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Terms explored per user | > 10 |
| Deep dives completed per user | > 5 |
| Average session duration | > 15 min |
| Return rate (7 day) | > 40% |
| Quiz pass rate | > 70% |
| Chat usage rate | > 30% of users |
| User satisfaction (NPS) | > 50 |

---

## What Makes This Special

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   OTHER PLATFORMS:              THIS PLATFORM:                              │
│   ────────────────              ──────────────                              │
│                                                                             │
│   ❌ "We simplified this"       ✓ "Click to go deeper"                     │
│   ❌ "Out of scope"             ✓ "Explore when ready"                     │
│   ❌ Linear progression         ✓ Infinite exploration                     │
│   ❌ Content disappears         ✓ Everything saved                         │
│   ❌ One-size-fits-all          ✓ Adapts to your level                    │
│   ❌ Stuck? Too bad             ✓ Click, popup, chat, or dive             │
│   ❌ Passive consumption        ✓ Active exploration                       │
│                                                                             │
│   THE PROMISE:                                                              │
│   "No question goes unanswered. No concept left unexplored."               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Next Steps

1. ✅ Product Requirements (this document)
2. 🔲 Set up Next.js project with basic structure
3. 🔲 Implement lesson content renderer with clickable terms
4. 🔲 Build popup component
5. 🔲 Create first lesson with real content
6. 🔲 Test the core experience
7. 🔲 Iterate based on feedback

---

*Document Version: 1.0*
*Created: February 2025*
*Project: GenAI Learning Platform*
