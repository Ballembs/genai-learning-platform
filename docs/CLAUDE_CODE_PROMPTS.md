# Claude Code Startup Prompts

Use these prompts to build the platform step by step with Claude Code.

---

## 🚀 INITIAL SETUP

### Prompt 1: Project Setup
```
I want to build a GenAI learning platform. Please:

1. Read the CLAUDE.md file in this project
2. Set up the basic Next.js structure with:
   - App router pages: /, /course, /course/[lessonSlug], /profile
   - Tailwind configured with custom colors for beginner (green), intermediate (amber), advanced (pink)
   - Basic layout with header

Start with just the file structure and basic pages.
```

### Prompt 2: Zustand Store
```
Create the Zustand store (lib/store.ts) for:
- User preferences (level: beginner/intermediate/advanced)
- Explorations tracking (terms they've clicked and viewed)
- Lesson progress
- Chat state (open/closed, messages)

Use persist middleware to save to localStorage.
Include TypeScript types.
```

---

## 📄 PAGE COMPONENTS

### Prompt 3: Landing Page
```
Create the landing page (app/page.tsx) with:
- Hero section: "Master Generative AI From Zero to Hero"
- Level selection cards (Beginner, Intermediate, Advanced) 
- Feature highlights (Infinite Exploration, Nothing Gets Lost, AI-Powered Clarity, Adaptive Content)
- "Start Learning" button that saves level and redirects to /course

Use Framer Motion for animations.
Make it visually impressive - this is the first thing users see!
```

### Prompt 4: Course Overview
```
Create the course overview page (app/course/page.tsx) with:
- Header with level indicator (can change level)
- Progress bar showing overall completion
- 5 lesson cards in a vertical list:
  1. How AI Works
  2. Prompt Engineering  
  3. Embeddings & Vector Search
  4. RAG
  5. Agents & Tools
  
Each card shows: number, title, subtitle, description, time estimate, completion status.
Cards link to /course/[lesson-slug].
```

### Prompt 5: Lesson Page Layout
```
Create the lesson page (app/course/[lessonSlug]/page.tsx) with:
- Sticky header with back button, title, progress bar
- Main content area (left side, ~70%)
- Sidebar (right side, ~30%) with:
  - Progress indicator
  - "Key Terms" list (checkmarks for explored)
  - "Your Explorations" recent clicks
  - Help card pointing to chat

For now, use placeholder content. We'll add the real content renderer next.
```

---

## 🔗 CORE COMPONENTS

### Prompt 6: ClickableTerm Component
```
Create components/lesson/ClickableTerm.tsx:

This is the HEART of our UX. When text is wrapped in [brackets] in lesson content:
1. It becomes a clickable highlighted term
2. On click, it triggers a popup at the click position
3. It shows a checkmark if user has already explored it
4. It tracks the click in the Zustand store

Props: termId, children
Use: <ClickableTerm termId="embeddings">embeddings</ClickableTerm>
```

### Prompt 7: Popup Component
```
Create components/lesson/Popup.tsx:

When user clicks a term:
1. Popup appears near the click position (smart positioning to stay in viewport)
2. Header shows term name with level indicator
3. Body shows explanation, example, optional Mermaid diagram
4. Two buttons: "Got it!" (dismiss) and "Learn More →" (navigate to deep dive)
5. Automatically marks term as "popup viewed" in store

Use Framer Motion for smooth enter/exit animations.
Add click-outside-to-close behavior.
```

### Prompt 8: LessonContent Renderer
```
Create components/lesson/LessonContent.tsx:

This component renders lesson markdown with special handling:
1. Parse [term] syntax and replace with ClickableTerm components
2. Render Mermaid code blocks as diagrams
3. Render regular code blocks with syntax highlighting
4. Handle headers, paragraphs, lists, tables, blockquotes
5. Support **bold**, *italic*, `code` inline

Input: markdown string + terms array
Output: React components with interactive terms
```

### Prompt 9: Mermaid Diagram Component
```
Create components/diagrams/MermaidDiagram.tsx:

Renders Mermaid diagrams from text:
1. Dynamic import of mermaid (avoid SSR issues)
2. Custom theme matching our brand colors
3. Responsive sizing
4. Loading state while rendering
5. Error state if diagram is invalid

Make diagrams look professional and consistent.
```

---

## 💬 CHAT ASSISTANT

### Prompt 10: Chat Button
```
Create components/chat/ChatButton.tsx:

A floating button in bottom-right corner:
1. Gradient background (our primary color)
2. MessageCircle icon (or X when open)
3. Subtle pulse animation when closed
4. Toggles chat window open/closed
5. Uses Zustand chat state
```

### Prompt 11: Chat Window
```
Create components/chat/ChatWindow.tsx:

The chat interface:
1. Header with "AI Learning Assistant" and minimize/clear buttons
2. Context indicator showing current lesson/term
3. Messages area with user/assistant bubbles
4. Input field with send button
5. Loading state while waiting for response
6. Smooth animations for open/close/minimize

For now, use mock responses. We'll add the real AI later.
```

---

## 📚 DEEP DIVE PAGE

### Prompt 12: Deep Dive Page
```
Create app/course/term/[termSlug]/page.tsx:

When user clicks "Learn More" on a popup, they come here:
1. Breadcrumb: Course > Lesson > Term
2. Level selector (can change mid-reading)
3. Full lesson-quality content:
   - One-liner summary
   - Analogy section
   - How it Works (with diagram)
   - Code Example (if applicable)
   - Common Misconceptions
   - Related Terms (THESE ARE CLICKABLE - rabbit hole!)
   - Advanced Topics (MORE RABBIT HOLES!)
   - Quiz section
4. Navigation: Back to origin, Master This Topic button

This page should feel as polished as the main lessons.
```

---

## 📝 CONTENT

### Prompt 13: Lesson Data Structure
```
Create content/lessons/index.ts:

Define the structure for all lessons with:
- id, slug, title, subtitle, description
- estimatedMinutes
- content object with beginner/intermediate/advanced versions
- terms array with popup definitions for each level
- advancedTopics array (clickable rabbit holes!)
- quiz questions

Start with Lesson 4 (RAG) as the example since we've already drafted it.
Include at least 6-8 terms with full definitions.
```

### Prompt 14: Add Remaining Lessons
```
Add complete content for:
- Lesson 1: How AI Works (tokens, generation, hallucination, temperature, context window)
- Lesson 2: Prompt Engineering (system prompts, few-shot, chain-of-thought)
- Lesson 3: Embeddings (vectors, similarity, semantic search, chunking)
- Lesson 5: Agents (tools, ReAct, multi-step reasoning)

Each lesson needs:
- Full content at all 3 levels
- 6-10 clickable terms with definitions
- 3-5 advanced topics as rabbit holes
- 3-5 quiz questions

Make the beginner content use analogies. Make intermediate include code. Make advanced be technical.
```

---

## 🔌 API ROUTES

### Prompt 15: Popup Generation API
```
Create app/api/popup/route.ts:

POST endpoint that generates popup content for unknown terms:
1. Receive: termId, term name, level, context (lesson info)
2. Call Claude API with our popup generation prompt
3. Return: explanation, example, diagram (optional)
4. Cache the result for future requests

Use the prompt template from CLAUDE.md.
Handle errors gracefully.
```

### Prompt 16: Deep Dive Generation API
```
Create app/api/deep-dive/route.ts:

POST endpoint that generates full deep dive content:
1. Receive: termId, term name, level, user context (explored terms, origin)
2. Call Claude API with our deep dive generation prompt
3. Return full structured content matching our DeepDiveContent type
4. Cache for future requests

This is the most important API - content must be high quality!
```

### Prompt 17: Chat API
```
Create app/api/chat/route.ts:

POST endpoint for chat assistant:
1. Receive: message, context (current page), history, level
2. (For now) Use Claude with a good system prompt
3. (Later) Add RAG to search lesson content
4. Return assistant message

The assistant should:
- Know what the user is currently learning
- Explain at the appropriate level
- Suggest related topics to explore
- Be encouraging and helpful
```

---

## 💾 PERSISTENCE

### Prompt 18: Supabase Setup
```
Set up Supabase integration:
1. Create lib/db/supabase.ts with client
2. Add the database schema from CLAUDE.md
3. Create helper functions:
   - saveExploration(userId, exploration)
   - getExplorations(userId)
   - updateLessonProgress(userId, lessonId, progress)
   - saveChatMessage(userId, sessionId, message)

For now, keep localStorage as fallback for non-authenticated users.
```

### Prompt 19: Auth Flow
```
Add authentication:
1. Sign up / Sign in pages using Supabase Auth
2. Auth context provider
3. Protected routes for /profile
4. Sync localStorage data to database on login
5. Load user data on page load if authenticated
```

### Prompt 20: Profile Page
```
Create app/profile/page.tsx:

User's learning dashboard:
1. Stats: terms explored, deep dives completed, quizzes passed, time spent
2. Exploration history (grouped by lesson)
3. Knowledge graph visualization (stretch goal)
4. Chat history
5. Settings (level preference, notifications)
```

---

## ✨ POLISH

### Prompt 21: Animations
```
Add polish animations throughout:
1. Page transitions (fade + slide)
2. Popup entrance (scale + fade)
3. Chat window slide up
4. Progress bar smooth fill
5. Hover effects on cards and buttons
6. Loading skeletons
7. Success states (checkmarks appearing)
```

### Prompt 22: Mobile Responsiveness
```
Make everything mobile-friendly:
1. Responsive lesson layout (sidebar becomes bottom sheet on mobile)
2. Full-width cards on small screens
3. Chat window becomes full screen on mobile
4. Popup becomes modal on small screens
5. Touch-friendly click targets (min 44px)
```

### Prompt 23: Final Testing
```
Review and test:
1. All clickable terms work across all lessons
2. Popup appears in correct position
3. Deep dives have their own clickable terms (recursion works)
4. Progress saves correctly
5. Chat maintains context
6. Level switching updates content immediately
7. Mobile experience is smooth
```

---

## 📊 Success Metrics

After building, verify:
- [ ] Can click any [term] and see popup
- [ ] "Learn More" opens full deep dive
- [ ] Deep dive has its own clickable terms
- [ ] Breadcrumb shows full path
- [ ] "Back" returns to original context
- [ ] All explorations saved to profile
- [ ] Chat knows current context
- [ ] Level switching works everywhere
- [ ] No "we won't cover this" - only rabbit holes

---

Good luck building the greatest learning platform! 🚀
