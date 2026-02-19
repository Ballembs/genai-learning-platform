'use client';

// lib/auth/AuthProvider.tsx
// Authentication context provider using Supabase Auth

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from '@/lib/db/supabase-client';
import { useUserStore } from '@/lib/store';
import { syncLocalDataToDatabase, loadUserDataFromDatabase, mergeExplorations, mergeLessonProgress } from '@/lib/auth/sync';
import type { UserProfile } from '@/types';

// ============================================
// TYPES
// ============================================

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
}

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  const { setProfile, profile, currentLevel, logout: storeLogout } = useUserStore();
  const profileRef = useRef(profile);

  // Keep ref in sync so the auth callback always sees current local data
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  /**
   * Merge database data with local Zustand data instead of overwriting.
   * This prevents losing explorations/progress saved in localStorage.
   */
  const mergeAndSetProfile = useCallback((dbProfile: UserProfile) => {
    if (!dbProfile) return;

    const localProfile = profileRef.current;

    // If no local data, just use DB data
    if (!localProfile || localProfile.explorations.length === 0) {
      setProfile(dbProfile);
      return;
    }

    // Merge local + DB data (keeps the most complete version of each)
    const mergedExplorations = mergeExplorations(localProfile.explorations, dbProfile.explorations);
    const mergedProgress = mergeLessonProgress(localProfile.lessonProgress, dbProfile.lessonProgress);

    const mergedProfile: UserProfile = {
      ...dbProfile,
      explorations: mergedExplorations,
      lessonProgress: mergedProgress,
      stats: {
        ...dbProfile.stats,
        termsExplored: mergedExplorations.length,
        deepDivesCompleted: mergedExplorations.filter(e => e.deepDiveViewedAt).length,
        quizzesPassed: mergedExplorations.filter(e => e.quizScore && e.quizScore >= 70).length,
        totalTimeMinutes: mergedProgress.reduce((sum, p) => sum + p.timeSpentMinutes, 0),
      },
    };

    setProfile(mergedProfile);
  }, [setProfile]);

  // Initialize auth state
  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    const client = createClient();
    if (!client) {
      setIsLoading(false);
      return;
    }

    // Get initial session
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Load user data if authenticated — MERGE with local data, don't overwrite
      if (session?.user) {
        loadUserDataFromDatabase(session.user.id).then((userData) => {
          if (userData) {
            mergeAndSetProfile(userData);
          }
        });
      }

      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN' && session?.user) {
        // Always sync local data to database on sign in
        const localProfile = profileRef.current;
        if (localProfile && localProfile.explorations.length > 0) {
          await syncLocalDataToDatabase(session.user.id, localProfile);
        }

        // Load user data from database and MERGE with local
        const userData = await loadUserDataFromDatabase(session.user.id);
        if (userData) {
          mergeAndSetProfile(userData);
        }
      }

      if (event === 'SIGNED_OUT') {
        storeLogout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured, mergeAndSetProfile, storeLogout]);

  // Sign in with email/password
  const signIn = useCallback(async (email: string, password: string) => {
    const client = createClient();
    if (!client) {
      return { error: new Error('Supabase not configured') };
    }

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error ? new Error(error.message) : null };
  }, []);

  // Sign up with email/password
  const signUp = useCallback(async (email: string, password: string) => {
    const client = createClient();
    if (!client) {
      return { error: new Error('Supabase not configured') };
    }

    const { error } = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error: error ? new Error(error.message) : null };
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    const client = createClient();
    if (!client) return;

    await client.auth.signOut();
    storeLogout();
  }, [storeLogout]);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    const client = createClient();
    if (!client) {
      return { error: new Error('Supabase not configured') };
    }

    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error: error ? new Error(error.message) : null };
  }, []);

  // Sign in with GitHub
  const signInWithGithub = useCallback(async () => {
    const client = createClient();
    if (!client) {
      return { error: new Error('Supabase not configured') };
    }

    const { error } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error: error ? new Error(error.message) : null };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isConfigured,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithGithub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
