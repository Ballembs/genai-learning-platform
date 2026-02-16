// lib/db/supabase.ts
// Supabase client and database helper functions
// Updated to use @supabase/ssr for modern Next.js App Router support

import { SupabaseClient } from '@supabase/supabase-js';
import { createClient as createBrowserSupabaseClient, isSupabaseConfigured } from './supabase-client';
import type { Exploration, LessonProgress, ChatMessage, UserLevel } from '@/types';

// Re-export for convenience
export { isSupabaseConfigured };

// ============================================
// DATABASE TYPES (matching our schema)
// ============================================

export interface DbExploration {
  id: string;
  user_id: string;
  term_id: string;
  term_name: string;
  from_lesson_id: string | null;
  from_context: string | null;
  popup_viewed_at: string | null;
  deep_dive_viewed_at: string | null;
  mastery_viewed_at: string | null;
  quiz_score: number | null;
  created_at: string;
}

export interface DbLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  percent_complete: number;
  sections_completed: string[];
  time_spent_minutes: number;
  last_accessed_at: string;
}

export interface DbChatMessage {
  id: string;
  user_id: string;
  session_id: string;
  role: string;
  content: string;
  context: string | null;
  created_at: string;
}

export interface DbUserPreferences {
  user_id: string;
  level: string;
  created_at: string;
}

export interface DbGeneratedContent {
  id: string;
  term_id: string;
  level: string;
  content_type: 'popup' | 'deep_dive';
  content: Record<string, unknown>;
  created_at: string;
}

// ============================================
// SUPABASE CLIENT
// ============================================

/**
 * Get the Supabase browser client (singleton pattern)
 * Uses @supabase/ssr for proper cookie-based session handling
 * Returns null if Supabase is not configured
 */
export function getSupabaseClient(): SupabaseClient | null {
  return createBrowserSupabaseClient();
}

/**
 * Get the current user ID from Supabase auth
 * Returns null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data: { user } } = await client.auth.getUser();
  return user?.id ?? null;
}

// ============================================
// CONVERSION HELPERS
// ============================================

function dbToExploration(db: DbExploration): Exploration {
  return {
    id: db.id,
    termId: db.term_id,
    termName: db.term_name,
    fromLessonId: db.from_lesson_id || '',
    fromContext: db.from_context || '',
    popupViewedAt: db.popup_viewed_at ? new Date(db.popup_viewed_at) : undefined,
    deepDiveViewedAt: db.deep_dive_viewed_at ? new Date(db.deep_dive_viewed_at) : undefined,
    masteryViewedAt: db.mastery_viewed_at ? new Date(db.mastery_viewed_at) : undefined,
    quizScore: db.quiz_score ?? undefined,
    quizAttempts: 0, // Not stored in DB yet
  };
}

function explorationToDb(userId: string, exploration: Exploration): Omit<DbExploration, 'id' | 'created_at'> {
  return {
    user_id: userId,
    term_id: exploration.termId,
    term_name: exploration.termName,
    from_lesson_id: exploration.fromLessonId || null,
    from_context: exploration.fromContext || null,
    popup_viewed_at: exploration.popupViewedAt?.toISOString() ?? null,
    deep_dive_viewed_at: exploration.deepDiveViewedAt?.toISOString() ?? null,
    mastery_viewed_at: exploration.masteryViewedAt?.toISOString() ?? null,
    quiz_score: exploration.quizScore ?? null,
  };
}

function dbToLessonProgress(db: DbLessonProgress): LessonProgress {
  return {
    lessonId: db.lesson_id,
    percentComplete: db.percent_complete,
    sectionsCompleted: db.sections_completed || [],
    lastAccessedAt: new Date(db.last_accessed_at),
    timeSpentMinutes: db.time_spent_minutes,
  };
}

function dbToChatMessage(db: DbChatMessage): ChatMessage {
  return {
    id: db.id,
    role: db.role as 'user' | 'assistant',
    content: db.content,
    timestamp: new Date(db.created_at),
    context: db.context ?? undefined,
  };
}

// ============================================
// EXPLORATION FUNCTIONS
// ============================================

/**
 * Save an exploration to the database
 * Falls back to localStorage for non-authenticated users
 */
export async function saveExploration(
  userId: string | null,
  exploration: Exploration
): Promise<{ success: boolean; error?: string }> {
  // If no userId or Supabase not configured, the Zustand store handles localStorage
  if (!userId || userId === 'guest') {
    return { success: true }; // Let Zustand handle it
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: true }; // Fallback to localStorage via Zustand
  }

  try {
    // Check if exploration already exists
    const { data: existing } = await client
      .from('explorations')
      .select('id')
      .eq('user_id', userId)
      .eq('term_id', exploration.termId)
      .single();

    if (existing) {
      // Update existing exploration
      const { error } = await client
        .from('explorations')
        .update({
          popup_viewed_at: exploration.popupViewedAt?.toISOString(),
          deep_dive_viewed_at: exploration.deepDiveViewedAt?.toISOString(),
          mastery_viewed_at: exploration.masteryViewedAt?.toISOString(),
          quiz_score: exploration.quizScore,
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Insert new exploration
      const { error } = await client
        .from('explorations')
        .insert(explorationToDb(userId, exploration));

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving exploration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all explorations for a user
 */
export async function getExplorations(
  userId: string | null
): Promise<Exploration[]> {
  if (!userId || userId === 'guest') {
    return []; // Let Zustand handle localStorage
  }

  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  try {
    const { data, error } = await client
      .from('explorations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(dbToExploration);
  } catch (error) {
    console.error('Error fetching explorations:', error);
    return [];
  }
}

// ============================================
// LESSON PROGRESS FUNCTIONS
// ============================================

/**
 * Update lesson progress for a user
 */
export async function updateLessonProgress(
  userId: string | null,
  lessonId: string,
  progress: Partial<LessonProgress>
): Promise<{ success: boolean; error?: string }> {
  if (!userId || userId === 'guest') {
    return { success: true }; // Let Zustand handle it
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: true };
  }

  try {
    // Upsert progress (insert or update)
    const { error } = await client
      .from('lesson_progress')
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          percent_complete: progress.percentComplete ?? 0,
          sections_completed: progress.sectionsCompleted ?? [],
          time_spent_minutes: progress.timeSpentMinutes ?? 0,
          last_accessed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,lesson_id',
        }
      );

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get lesson progress for a user
 */
export async function getLessonProgress(
  userId: string | null,
  lessonId?: string
): Promise<LessonProgress[]> {
  if (!userId || userId === 'guest') {
    return [];
  }

  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  try {
    let query = client
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId);

    if (lessonId) {
      query = query.eq('lesson_id', lessonId);
    }

    const { data, error } = await query.order('last_accessed_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(dbToLessonProgress);
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    return [];
  }
}

// ============================================
// CHAT MESSAGE FUNCTIONS
// ============================================

/**
 * Save a chat message to the database
 */
export async function saveChatMessage(
  userId: string | null,
  sessionId: string,
  message: ChatMessage
): Promise<{ success: boolean; error?: string }> {
  if (!userId || userId === 'guest') {
    return { success: true }; // Let Zustand handle it
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: true };
  }

  try {
    const { error } = await client
      .from('chat_messages')
      .insert({
        user_id: userId,
        session_id: sessionId,
        role: message.role,
        content: message.content,
        context: message.context ?? null,
      });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error saving chat message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get chat messages for a session
 */
export async function getChatMessages(
  userId: string | null,
  sessionId: string
): Promise<ChatMessage[]> {
  if (!userId || userId === 'guest') {
    return [];
  }

  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  try {
    const { data, error } = await client
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(dbToChatMessage);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
}

/**
 * Get all chat sessions for a user
 */
export async function getChatSessions(
  userId: string | null
): Promise<Array<{ sessionId: string; lastMessage: string; createdAt: Date }>> {
  if (!userId || userId === 'guest') {
    return [];
  }

  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  try {
    // Get distinct sessions with their latest message
    const { data, error } = await client
      .from('chat_messages')
      .select('session_id, content, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by session and get latest message
    const sessions = new Map<string, { lastMessage: string; createdAt: Date }>();
    (data || []).forEach((msg) => {
      if (!sessions.has(msg.session_id)) {
        sessions.set(msg.session_id, {
          lastMessage: msg.content.slice(0, 100),
          createdAt: new Date(msg.created_at),
        });
      }
    });

    return Array.from(sessions.entries()).map(([sessionId, info]) => ({
      sessionId,
      ...info,
    }));
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return [];
  }
}

// ============================================
// USER PREFERENCES FUNCTIONS
// ============================================

/**
 * Get user preferences
 */
export async function getUserPreferences(
  userId: string | null
): Promise<{ level: UserLevel } | null> {
  if (!userId || userId === 'guest') {
    return null;
  }

  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client
      .from('user_preferences')
      .select('level')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

    return data ? { level: data.level as UserLevel } : null;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string | null,
  preferences: { level: UserLevel }
): Promise<{ success: boolean; error?: string }> {
  if (!userId || userId === 'guest') {
    return { success: true };
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: true };
  }

  try {
    const { error } = await client
      .from('user_preferences')
      .upsert({
        user_id: userId,
        level: preferences.level,
      });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================
// GENERATED CONTENT CACHE FUNCTIONS
// ============================================

/**
 * Get cached generated content
 */
export async function getCachedContent<T>(
  termId: string,
  level: UserLevel,
  contentType: 'popup' | 'deep_dive'
): Promise<T | null> {
  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client
      .from('generated_content')
      .select('content')
      .eq('term_id', termId)
      .eq('level', level)
      .eq('content_type', contentType)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return data?.content as T ?? null;
  } catch (error) {
    console.error('Error fetching cached content:', error);
    return null;
  }
}

/**
 * Cache generated content
 */
export async function cacheContent(
  termId: string,
  level: UserLevel,
  contentType: 'popup' | 'deep_dive',
  content: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await client
      .from('generated_content')
      .upsert(
        {
          term_id: termId,
          level,
          content_type: contentType,
          content,
        },
        {
          onConflict: 'term_id,level,content_type',
        }
      );

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error caching content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
