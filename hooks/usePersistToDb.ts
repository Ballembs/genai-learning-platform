// hooks/usePersistToDb.ts
'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { useUserStore } from '@/lib/store';
import { saveExploration, updateLessonProgress } from '@/lib/db/supabase';

/**
 * Safely convert a date value to ISO string.
 * Handles both Date objects and already-stringified dates from localStorage.
 */
function toISOStringSafe(date: Date | string | null | undefined): string | undefined {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  if (date instanceof Date) return date.toISOString();
  return undefined;
}

/**
 * Hook that syncs Zustand store changes to Supabase for authenticated users.
 * Place this in app/providers.tsx so it runs globally.
 *
 * This hook:
 * - Listens for changes to explorations and lesson progress
 * - When a change is detected and user is authenticated, saves to Supabase
 * - Does nothing for guest users (localStorage only via Zustand)
 */
export function usePersistToDb() {
  const { user } = useAuth();
  const prevProgressRef = useRef<string>('');
  const prevExplorationsRef = useRef<string>('');

  useEffect(() => {
    if (!user) return;

    // Subscribe to store changes
    const unsub = useUserStore.subscribe((state, prevState) => {
      const explorations = state.profile?.explorations || [];
      const prevExplorations = prevState.profile?.explorations || [];

      // Serialize for comparison (use safe helper for dates from localStorage)
      const explorationsKey = JSON.stringify(explorations.map(e => ({
        id: e.id,
        termId: e.termId,
        popupViewedAt: toISOStringSafe(e.popupViewedAt),
        deepDiveViewedAt: toISOStringSafe(e.deepDiveViewedAt),
        masteryViewedAt: toISOStringSafe(e.masteryViewedAt),
        quizScore: e.quizScore,
      })));

      // Detect new or updated explorations
      if (explorationsKey !== prevExplorationsRef.current) {
        prevExplorationsRef.current = explorationsKey;

        // Find new explorations (added since last check)
        if (explorations.length > prevExplorations.length) {
          const newExplorations = explorations.slice(prevExplorations.length);
          newExplorations.forEach(exp => {
            saveExploration(user.id, exp).catch(console.error);
          });
        }

        // Find updated explorations (same termId but different values)
        explorations.forEach(exp => {
          const prev = prevExplorations.find(p => p.termId === exp.termId);
          if (prev) {
            const hasChanged =
              toISOStringSafe(prev.popupViewedAt) !== toISOStringSafe(exp.popupViewedAt) ||
              toISOStringSafe(prev.deepDiveViewedAt) !== toISOStringSafe(exp.deepDiveViewedAt) ||
              toISOStringSafe(prev.masteryViewedAt) !== toISOStringSafe(exp.masteryViewedAt) ||
              prev.quizScore !== exp.quizScore;

            if (hasChanged) {
              saveExploration(user.id, exp).catch(console.error);
            }
          }
        });
      }

      // Detect lesson progress changes
      const progress = state.profile?.lessonProgress || [];
      const progressKey = JSON.stringify(progress.map(p => ({
        lessonId: p.lessonId,
        percentComplete: p.percentComplete,
        sectionsCompleted: p.sectionsCompleted,
        timeSpentMinutes: p.timeSpentMinutes,
      })));

      if (progressKey !== prevProgressRef.current) {
        prevProgressRef.current = progressKey;

        // Save all progress entries that have changed
        const prevProgress = prevState.profile?.lessonProgress || [];
        progress.forEach(p => {
          const prev = prevProgress.find(pp => pp.lessonId === p.lessonId);
          if (!prev || JSON.stringify(prev) !== JSON.stringify(p)) {
            updateLessonProgress(user.id, p.lessonId, p).catch(console.error);
          }
        });
      }
    });

    return () => unsub();
  }, [user]);
}
