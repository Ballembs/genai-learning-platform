# GenAI Learning Platform

> The learning platform where no question goes unanswered and no concept is left unexplored.

## 🚀 Quick Start with Claude Code

### Step 1: Create the Project

Open your terminal and run:

```bash
# Create Next.js project
npx create-next-app@latest genai-learning-platform --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

cd genai-learning-platform
```

### Step 2: Install Dependencies

```bash
npm install @anthropic-ai/sdk @supabase/supabase-js framer-motion lucide-react mermaid react-markdown zustand

npm install -D @types/node
```

### Step 3: Copy Project Files

Copy these files from this package into your project:
- `CLAUDE.md` → Root of your project
- `docs/PRD.md` → `docs/PRD.md`

### Step 4: Open in VS Code with Claude Code

```bash
code .
```

Then in Claude Code, say:

> "Read CLAUDE.md and help me build this project. Let's start with Phase 1: the landing page and course overview."

---

## 📁 Project Structure

See `CLAUDE.md` for complete file structure and specifications.

## 🎯 Development Phases

### Phase 1: Core Experience (Week 1-2)
- Landing page with level selection
- Course overview with 5 lessons
- Lesson view with clickable terms
- Popup component
- Local storage persistence

### Phase 2: Deep Dives (Week 3-4)
- Deep dive page
- AI-generated content
- Breadcrumb navigation
- Recursive term clicking

### Phase 3: Chat Assistant (Week 5-6)
- Floating chat button
- Context-aware RAG chat
- Chat history

### Phase 4: Persistence (Week 7-8)
- Supabase authentication
- Database storage
- Profile page

### Phase 5: Polish (Week 9-10)
- Full lesson content
- Quizzes
- Animations
- Mobile support

---

## 💡 Using Claude Code Effectively

### Starting a Feature

```
"Let's implement the ClickableTerm component. It should:
- Wrap text that users can click
- Show a popup on click
- Track whether user has explored this term
- Follow the specs in CLAUDE.md"
```

### Adding Content

```
"Add the complete content for Lesson 4 (RAG) with:
- Beginner, intermediate, and advanced versions
- All terms defined with popup content
- Advanced topics as clickable rabbit holes
- A quiz at the end"
```

### Debugging

```
"The popup isn't appearing in the right position. 
Here's my current code: [paste code]
Help me fix the positioning logic."
```

### Refactoring

```
"Refactor the lesson content to use MDX instead of 
plain strings, so we can have better formatting support."
```

---

## 🔑 Environment Variables

Create `.env.local`:

```env
# Anthropic (Claude API)
ANTHROPIC_API_KEY=your_key_here

# Voyage AI (Embeddings)
VOYAGE_API_KEY=your_key_here

# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_key_here
```

---

## 📚 Key Files to Review

1. **CLAUDE.md** - Complete project specification
2. **docs/PRD.md** - Product requirements document
3. **types/index.ts** - TypeScript type definitions
4. **lib/store.ts** - Zustand state management
5. **content/lessons/index.ts** - Lesson data structure

---

## 🎨 Design Principles

1. **No dead ends** - Everything is explorable
2. **Nothing gets lost** - All progress saved
3. **Quality consistency** - Generated = hand-crafted
4. **Zero confusion** - Help always available
5. **Infinite depth** - Rabbit holes all the way down

---

## 📝 License

MIT

---

Built with the concepts it teaches. 🧠
