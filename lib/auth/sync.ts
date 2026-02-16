// lib/auth/sync.ts
// Functions to sync local data with Supabase database

import {
  saveExploration,
  getExplorations,
  updateLessonProgress,
  getLessonProgress,
  getUserPreferences,
  updateUserPreferences,
} from '@/lib/db/supabase';
import type { UserProfile, Exploration, LessonProgress, UserLevel } from '@/types';

/**
 * Sync local (guest) data to the database when user signs in
 * This preserves any explorations/progress made before signing in
 */
export async function syncLocalDataToDatabase(
  userId: string,
  localProfile: UserProfile
): Promise<void> {
  try {
    // Sync explorations
    for (const exploration of localProfile.explorations) {
      await saveExploration(userId, exploration);
    }

    // Sync lesson progress
    for (const progress of localProfile.lessonProgress) {
      await updateLessonProgress(userId, progress.lessonId, progress);
    }

    // Sync user level preference
    await updateUserPreferences(userId, { level: localProfile.user.level });

    console.log('Successfully synced local data to database');
  } catch (error) {
    console.error('Error syncing local data:', error);
  }
}

/**
 * Load user data from database on login/page load
 * Returns a UserProfile object for the Zustand store
 */
export async function loadUserDataFromDatabase(
  userId: string
): Promise<UserProfile | null> {
  try {
    // Load explorations
    const explorations = await getExplorations(userId);

    // Load lesson progress
    const lessonProgress = await getLessonProgress(userId);

    // Load user preferences
    const preferences = await getUserPreferences(userId);
    const level: UserLevel = preferences?.level || 'beginner';

    // Build stats from explorations
    const stats = {
      termsExplored: explorations.length,
      deepDivesCompleted: explorations.filter((e) => e.deepDiveViewedAt).length,
      quizzesPassed: explorations.filter((e) => e.quizScore && e.quizScore >= 70).length,
      totalTimeMinutes: lessonProgress.reduce((sum, p) => sum + p.timeSpentMinutes, 0),
      currentStreak: 1, // TODO: Calculate from activity dates
      longestStreak: 1, // TODO: Calculate from activity history
    };

    const profile: UserProfile = {
      user: {
        id: userId,
        level,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      explorations,
      lessonProgress,
      chatSessions: [], // Loaded separately when needed
      stats,
    };

    return profile;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}

/**
 * Merge local and database explorations
 * Keeps the most recent data for each term
 */
export function mergeExplorations(
  local: Exploration[],
  remote: Exploration[]
): Exploration[] {
  const merged = new Map<string, Exploration>();

  // Add remote explorations first
  for (const exp of remote) {
    merged.set(exp.termId, exp);
  }

  // Merge local explorations (newer data takes precedence)
  for (const exp of local) {
    const existing = merged.get(exp.termId);
    if (!existing) {
      merged.set(exp.termId, exp);
    } else {
      // Merge: keep most recent timestamps and best quiz score
      merged.set(exp.termId, {
        ...existing,
        popupViewedAt: mostRecent(existing.popupViewedAt, exp.popupViewedAt),
        deepDiveViewedAt: mostRecent(existing.deepDiveViewedAt, exp.deepDiveViewedAt),
        masteryViewedAt: mostRecent(existing.masteryViewedAt, exp.masteryViewedAt),
        quizScore: Math.max(existing.quizScore ?? 0, exp.quizScore ?? 0) || undefined,
        quizAttempts: (existing.quizAttempts || 0) + (exp.quizAttempts || 0),
      });
    }
  }

  return Array.from(merged.values());
}

/**
 * Merge local and database lesson progress
 */
export function mergeLessonProgress(
  local: LessonProgress[],
  remote: LessonProgress[]
): LessonProgress[] {
  const merged = new Map<string, LessonProgress>();

  // Add remote progress first
  for (const progress of remote) {
    merged.set(progress.lessonId, progress);
  }

  // Merge local progress (higher completion takes precedence)
  for (const progress of local) {
    const existing = merged.get(progress.lessonId);
    if (!existing) {
      merged.set(progress.lessonId, progress);
    } else {
      merged.set(progress.lessonId, {
        lessonId: progress.lessonId,
        percentComplete: Math.max(existing.percentComplete, progress.percentComplete),
        sectionsCompleted: Array.from(
          new Set([...existing.sectionsCompleted, ...progress.sectionsCompleted])
        ),
        lastAccessedAt: mostRecent(existing.lastAccessedAt, progress.lastAccessedAt) || new Date(),
        timeSpentMinutes: existing.timeSpentMinutes + progress.timeSpentMinutes,
      });
    }
  }

  return Array.from(merged.values());
}

/**
 * Helper: Get the most recent date
 */
function mostRecent(a?: Date, b?: Date): Date | undefined {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}
