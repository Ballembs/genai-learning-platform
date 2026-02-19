# Fix Lesson Progress Stuck at 0% — Three Root Causes

## Problem
Lesson progress always shows 0% on both the profile page and course page, even after completing lessons. Course page shows "0/8 lessons" with no completion indicators.

## Root Causes

### Root Cause 1: Store silently drops progress when profile is null
In `lib/store.ts`, `updateLessonProgress` has `if (!state.profile) return state` — it silently does NOTHING if the user hasn't clicked a term yet. Unlike `addExploration` which creates a guest profile when none exists, progress updates are simply lost.

### Root Cause 2: Cleanup function overwrites 100% with stale scroll position  
In the lesson page, when the user clicks "Continue Lesson", it saves 100% then calls `router.push()`. But React's cleanup function ALSO fires and calls `updateLessonProgress` with `scrollProgressRef.current` (which might be 85% or less), overwriting the explicit 100%.

### Root Cause 3: Progress can decrease, and initial save is always 0%
The lesson page records access immediately with `updateLessonProgress(lesson.id, { lastAccessedAt })` which creates an entry with `percentComplete: 0`. If scroll events don't fire (short content, no scrolling, or timing issues), this 0% persists. And if the store allows lower values to overwrite higher ones, progress can regress.

---

## Fix — File 1: `lib/store.ts`

Find the `updateLessonProgress` method (around line 106). Replace the ENTIRE function body from `updateLessonProgress: (lessonId, progress) => set((state) => {` through its closing `}),` with:

```typescript
      updateLessonProgress: (lessonId, progress) => set((state) => {
        const newEntry: LessonProgress = {
          lessonId,
          percentComplete: 0,
          sectionsCompleted: [],
          lastAccessedAt: new Date(),
          timeSpentMinutes: 0,
          ...progress,
        };

        // Create guest profile if none exists (same pattern as addExploration)
        if (!state.profile) {
          return {
            profile: {
              user: {
                id: 'guest',
                level: state.currentLevel,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              explorations: [],
              lessonProgress: [newEntry],
              chatSessions: [],
              stats: {
                termsExplored: 0,
                deepDivesCompleted: 0,
                quizzesPassed: 0,
                totalTimeMinutes: 0,
                currentStreak: 1,
                longestStreak: 1,
              },
            },
          };
        }
        
        const existing = state.profile.lessonProgress.find(p => p.lessonId === lessonId);
        
        if (existing) {
          // Never decrease percentComplete — only update if new value is higher
          const mergedProgress = {
            ...existing,
            ...progress,
            percentComplete: Math.max(
              existing.percentComplete,
              progress.percentComplete ?? existing.percentComplete
            ),
          };
          return {
            profile: {
              ...state.profile,
              lessonProgress: state.profile.lessonProgress.map((p) =>
                p.lessonId === lessonId ? mergedProgress : p
              ),
            },
          };
        }
        
        return {
          profile: {
            ...state.profile,
            lessonProgress: [
              ...state.profile.lessonProgress,
              newEntry,
            ],
          },
        };
      }),
```

**Key changes:**
- Creates a guest profile if `state.profile` is null (was: silently returned unchanged state)
- Uses `Math.max()` for percentComplete so progress can never decrease
- Spreads `progress` param properly with defaults

---

## Fix — File 2: `app/course/[lessonSlug]/page.tsx`

### Change 1: Add `useRef` to import (if not already there)
```typescript
import { useEffect, useState, useRef } from 'react';
```

### Change 2: Add `updateLessonProgress` to the store destructuring (if not already there)
```typescript
  const { currentLevel, hasExplored, updateLessonProgress } = useUserStore();
```

### Change 3: Replace the entire scroll tracking + progress saving section

Find the two useEffects that handle scroll tracking and progress saving. They start with `const scrollProgressRef = useRef(0);` and end before the `if (!lesson)` check.

Replace that entire section with:

```typescript
  const scrollProgressRef = useRef(0);
  const markedCompleteRef = useRef(false);
  const lastSavedProgressRef = useRef(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return; // Avoid NaN/Infinity
      const progress = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setScrollProgress(progress);
      scrollProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll);
    // Fire once immediately in case user is already scrolled
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save lesson progress to store: on access, periodically, and on leave
  useEffect(() => {
    if (!lesson) return;
    const startTime = Date.now();
    markedCompleteRef.current = false;
    lastSavedProgressRef.current = 0;

    const saveProgress = () => {
      // Don't overwrite if explicitly marked complete
      if (markedCompleteRef.current) return;
      
      const currentProgress = scrollProgressRef.current;
      const minutesSpent = Math.max(1, Math.round((Date.now() - startTime) / 60000));
      
      // Only save if progress actually increased
      if (currentProgress > lastSavedProgressRef.current || lastSavedProgressRef.current === 0) {
        lastSavedProgressRef.current = currentProgress;
        updateLessonProgress(lesson.id, {
          percentComplete: currentProgress,
          lastAccessedAt: new Date(),
          timeSpentMinutes: minutesSpent,
        });
      }
    };

    // Record lesson access immediately
    updateLessonProgress(lesson.id, {
      lastAccessedAt: new Date(),
    });

    // Save progress every 5 seconds
    const interval = setInterval(saveProgress, 5000);

    // Save on tab hide (user switches tabs/apps)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveProgress();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Save on beforeunload (tab close / hard nav)
    const handleBeforeUnload = () => saveProgress();
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Save on unmount (Next.js client-side navigation)
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveProgress();
    };
  }, [lesson, updateLessonProgress]);
```

**IMPORTANT:** `scrollProgress` must NOT be in the dependency array. Only `lesson` and `updateLessonProgress`.

### Change 4: Fix the "Continue Lesson" / "Next" button

Find the `nextLesson` button and update the onClick handler to set `markedCompleteRef.current = true` BEFORE saving:

```typescript
                {nextLesson ? (
                  <button
                    onClick={() => {
                      // Set flag FIRST to prevent cleanup from overwriting
                      markedCompleteRef.current = true;
                      updateLessonProgress(lesson.id, {
                        percentComplete: 100,
                        lastAccessedAt: new Date(),
                      });
                      router.push(`/course/${nextLesson}`);
                    }}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-[0.98] transition-all touch-target text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Continue Lesson</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
```

### Change 5: Fix the last lesson "Complete!" element

If there is a static "Complete!" `<div>` for the last lesson (when `!nextLesson`), replace it with a button:

```typescript
                ) : (
                  <button
                    onClick={() => {
                      markedCompleteRef.current = true;
                      updateLessonProgress(lesson.id, {
                        percentComplete: 100,
                        lastAccessedAt: new Date(),
                      });
                      router.push('/course');
                    }}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-[0.98] transition-all touch-target text-sm sm:text-base"
                  >
                    <span>🎉 Complete!</span>
                  </button>
```

### Change 6: Make lesson navigation order dynamic

Find the hardcoded `lessonOrder` array and replace it:

```typescript
  // Get previous and next lessons - dynamically from lessonData keys
  const lessonOrder = Object.keys(lessonData).sort();
  const currentIndex = lessonOrder.indexOf(lessonSlug);
  const prevLesson = currentIndex > 0 ? lessonOrder[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessonOrder.length - 1 ? lessonOrder[currentIndex + 1] : null;
```

---

## Summary of Changes

| File | What Changed | Why |
|------|-------------|-----|
| `lib/store.ts` | `updateLessonProgress` creates guest profile when null, uses `Math.max` for percentComplete | Progress was silently dropped when no profile existed; progress could decrease |
| `app/course/[lessonSlug]/page.tsx` | Added `markedCompleteRef` guard, save every 5s + visibilitychange, fire scroll handler on mount, dynamic lesson order | Cleanup was overwriting 100%, no scroll = 0% forever, hardcoded 5 lessons |

## Do NOT change these files
- `app/course/page.tsx` — course page display logic is correct, it will work once the store actually has correct data
- `app/profile/page.tsx` — profile reads from store correctly
- `lib/auth/sync.ts` — merge functions already use Math.max for progress

## After deploying

**CRITICAL:** Clear the old corrupted localStorage data:
1. Open browser DevTools → Application → Local Storage
2. Find the key `genai-learning-user` 
3. Delete it
4. Refresh the page

This is needed because the old 0% values are persisted in localStorage. With the "never decrease" fix, they won't be overwritten by higher values since the initial load hydrates with 0%.

Alternatively, you can re-visit each lesson and click "Continue Lesson" or "Complete!" — this will force-save 100%.

## Testing

After clearing localStorage:
1. Open Lesson 1 → scroll through it → check profile shows progress > 0%
2. Click "Continue Lesson" → check profile shows Lesson 1 at 100%
3. Go back to course page → should show "1/5 lessons" (or 1/8 if you have 8 lessons) with a checkmark on Lesson 1
4. Open DevTools Console → should see no errors
5. Close tab and reopen → progress should still be saved
