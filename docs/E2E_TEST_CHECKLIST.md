# E2E Test Checklist

## Pre-requisites
- [ ] `npm run dev` running on localhost:3000
- [ ] `.env.local` has ANTHROPIC_API_KEY
- [ ] `.env.local` has VOYAGE_API_KEY (for RAG chat)
- [ ] `.env.local` has Supabase keys (for auth features)

## 1. Landing Page
- [ ] Page loads at /
- [ ] Three level buttons visible (Beginner, Intermediate, Advanced)
- [ ] Clicking a level navigates to /course
- [ ] Level persists in header/UI after selection

## 2. Course Overview (/course)
- [ ] All 5 lesson cards visible
- [ ] Each card shows title, description, estimated time
- [ ] Clicking a card navigates to /course/{lessonSlug}
- [ ] Level selector in header works

## 3. Lesson Page (/course/01-how-ai-works)
- [ ] Lesson content renders correctly
- [ ] Code blocks display with syntax highlighting (not empty dark bars)
- [ ] No stray backtick characters visible
- [ ] [Bracketed terms] render as clickable blue/highlighted text
- [ ] Tables render properly
- [ ] Mermaid diagrams render (not blank gray boxes)
- [ ] Switching levels (Beginner → Intermediate → Advanced) changes content
- [ ] Sidebar shows "Key Terms" list
- [ ] Sidebar shows progress
- [ ] Scroll progress bar works
- [ ] Previous/Next lesson navigation works
- [ ] Quiz section appears at bottom (if implemented)

## 4. Clickable Terms → Popup
- [ ] Clicking a [term] opens popup near click position
- [ ] Popup shows explanation at current level
- [ ] Popup shows example
- [ ] "Got it!" closes popup
- [ ] "Learn More →" navigates to deep dive
- [ ] Term marked as explored in sidebar after viewing popup

## 5. Deep Dive Page (/course/term/{termSlug})
- [ ] Loading skeleton shows while generating
- [ ] Content generates successfully (one-liner, analogy, explanation, etc.)
- [ ] Breadcrumb navigation works (Course > Lesson > Term)
- [ ] Level switcher works (re-fetches content for new level)
- [ ] Second visit at same level loads from cache (instant, no loading)
- [ ] Code example renders with syntax highlighting
- [ ] Mermaid diagram renders
- [ ] Related terms are clickable (rabbit hole!)
- [ ] Advanced topics are clickable
- [ ] Quiz section works:
  - [ ] Can select answers
  - [ ] Submit button appears when all answered
  - [ ] Score displays after submit
  - [ ] Correct/incorrect shown per question
  - [ ] Explanation shown
  - [ ] Retake works

## 6. Chat Assistant
- [ ] Floating chat button visible on all pages
- [ ] Chat window opens on click
- [ ] Can type and send message
- [ ] Response is context-aware (references current lesson/term)
- [ ] RAG-powered: answers reference actual course content (not generic)
- [ ] Chat history persists across page navigation
- [ ] Clear chat works
- [ ] Chat works at all three levels

## 7. Authentication
- [ ] Sign up page loads
- [ ] Can create account with email
- [ ] Email confirmation flow works
- [ ] Sign in page loads
- [ ] Can sign in with email/password
- [ ] Auth state persists across refresh
- [ ] Sign out works
- [ ] Profile syncs with Supabase when authenticated

## 8. Profile Page (/profile)
- [ ] Shows user stats (terms explored, deep dives, quizzes)
- [ ] Shows exploration history
- [ ] Shows quiz scores
- [ ] Knowledge map visualization shows explored terms
- [ ] Level can be changed from profile
- [ ] Recent activity section populated

## 9. Mobile Responsiveness
- [ ] Landing page readable on mobile
- [ ] Lesson content doesn't overflow
- [ ] Sidebar accessible via bottom sheet on mobile
- [ ] Chat window usable on mobile
- [ ] Popups positioned correctly on mobile
- [ ] Navigation works on mobile

## 10. Edge Cases
- [ ] Invalid lesson slug shows 404/not found
- [ ] Very long term names don't break layout
- [ ] Rapid clicking doesn't cause duplicate API calls
- [ ] Browser back button works correctly through rabbit holes
- [ ] Refreshing a deep dive page works (not just client navigation)

## API Test
Run `bash scripts/test-api.sh` and verify all pass.
