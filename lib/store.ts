// lib/store.ts
// ============================================
// Global State Management with Zustand
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserLevel,
  UserProfile,
  Exploration,
  LessonProgress,
  Breadcrumb,
  ChatMessage,
  PopupState,
  ChatState,
} from '@/types';

// ============================================
// USER STORE
// ============================================

interface UserStore {
  // State
  profile: UserProfile | null;
  currentLevel: UserLevel;
  isAuthenticated: boolean;
  
  // Actions
  setLevel: (level: UserLevel) => void;
  setProfile: (profile: UserProfile) => void;
  addExploration: (exploration: Exploration) => void;
  updateExploration: (termId: string, updates: Partial<Exploration>) => void;
  updateLessonProgress: (lessonId: string, progress: Partial<LessonProgress>) => void;
  getExploration: (termId: string) => Exploration | undefined;
  hasExplored: (termId: string) => boolean;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profile: null,
      currentLevel: 'beginner',
      isAuthenticated: false,
      
      setLevel: (level) => set({ currentLevel: level }),
      
      setProfile: (profile) => set({ profile, isAuthenticated: true }),
      
      addExploration: (exploration) => set((state) => {
        if (!state.profile) {
          // Create temporary profile for non-authenticated users
          return {
            profile: {
              user: {
                id: 'guest',
                level: state.currentLevel,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              explorations: [exploration],
              lessonProgress: [],
              chatSessions: [],
              stats: {
                termsExplored: 1,
                deepDivesCompleted: 0,
                quizzesPassed: 0,
                totalTimeMinutes: 0,
                currentStreak: 1,
                longestStreak: 1,
              },
            },
          };
        }
        
        // Check if already exists
        const exists = state.profile.explorations.some(e => e.termId === exploration.termId);
        if (exists) return state;
        
        return {
          profile: {
            ...state.profile,
            explorations: [...state.profile.explorations, exploration],
            stats: {
              ...state.profile.stats,
              termsExplored: state.profile.stats.termsExplored + 1,
            },
          },
        };
      }),
      
      updateExploration: (termId, updates) => set((state) => {
        if (!state.profile) return state;
        
        return {
          profile: {
            ...state.profile,
            explorations: state.profile.explorations.map((e) =>
              e.termId === termId ? { ...e, ...updates } : e
            ),
          },
        };
      }),
      
      updateLessonProgress: (lessonId, progress) => set((state) => {
        if (!state.profile) return state;
        
        const existing = state.profile.lessonProgress.find(p => p.lessonId === lessonId);
        
        if (existing) {
          return {
            profile: {
              ...state.profile,
              lessonProgress: state.profile.lessonProgress.map((p) =>
                p.lessonId === lessonId ? { ...p, ...progress } : p
              ),
            },
          };
        }
        
        return {
          profile: {
            ...state.profile,
            lessonProgress: [
              ...state.profile.lessonProgress,
              {
                lessonId,
                percentComplete: 0,
                sectionsCompleted: [],
                lastAccessedAt: new Date(),
                timeSpentMinutes: 0,
                ...progress,
              },
            ],
          },
        };
      }),
      
      getExploration: (termId) => {
        const state = get();
        return state.profile?.explorations.find(e => e.termId === termId);
      },
      
      hasExplored: (termId) => {
        const state = get();
        return state.profile?.explorations.some(e => e.termId === termId) ?? false;
      },
      
      logout: () => set({ profile: null, isAuthenticated: false }),
    }),
    {
      name: 'genai-learning-user',
      partialize: (state) => ({
        profile: state.profile,
        currentLevel: state.currentLevel,
      }),
    }
  )
);

// ============================================
// NAVIGATION STORE
// ============================================

interface NavigationStore {
  // State
  breadcrumbs: Breadcrumb[];
  explorationStack: string[];  // term IDs for back navigation
  currentLessonId: string | null;
  currentTermId: string | null;
  
  // Actions
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  pushBreadcrumb: (breadcrumb: Breadcrumb) => void;
  popBreadcrumb: () => void;
  pushExploration: (termId: string) => void;
  popExploration: () => string | undefined;
  setCurrentLesson: (lessonId: string | null) => void;
  setCurrentTerm: (termId: string | null) => void;
  reset: () => void;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  breadcrumbs: [{ label: 'Course', href: '/course', type: 'course' }],
  explorationStack: [],
  currentLessonId: null,
  currentTermId: null,
  
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  
  pushBreadcrumb: (breadcrumb) => set((state) => ({
    breadcrumbs: [...state.breadcrumbs, breadcrumb],
  })),
  
  popBreadcrumb: () => set((state) => ({
    breadcrumbs: state.breadcrumbs.slice(0, -1),
  })),
  
  pushExploration: (termId) => set((state) => ({
    explorationStack: [...state.explorationStack, termId],
  })),
  
  popExploration: () => {
    const state = get();
    const termId = state.explorationStack[state.explorationStack.length - 1];
    set({ explorationStack: state.explorationStack.slice(0, -1) });
    return termId;
  },
  
  setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
  setCurrentTerm: (termId) => set({ currentTermId: termId }),
  
  reset: () => set({
    breadcrumbs: [{ label: 'Course', href: '/course', type: 'course' }],
    explorationStack: [],
    currentLessonId: null,
    currentTermId: null,
  }),
}));

// ============================================
// POPUP STORE
// ============================================

interface PopupStore {
  // State
  isOpen: boolean;
  termId: string | null;
  termName: string | null;
  position: { x: number; y: number } | null;
  isLoading: boolean;
  content: {
    explanation: string;
    example?: string;
    diagram?: string;
  } | null;
  
  // Actions
  openPopup: (termId: string, termName: string, position: { x: number; y: number }) => void;
  closePopup: () => void;
  setContent: (content: { explanation: string; example?: string; diagram?: string }) => void;
  setLoading: (isLoading: boolean) => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  isOpen: false,
  termId: null,
  termName: null,
  position: null,
  isLoading: false,
  content: null,
  
  openPopup: (termId, termName, position) => set({
    isOpen: true,
    termId,
    termName,
    position,
    isLoading: true,
    content: null,
  }),
  
  closePopup: () => set({
    isOpen: false,
    termId: null,
    termName: null,
    position: null,
    isLoading: false,
    content: null,
  }),
  
  setContent: (content) => set({ content, isLoading: false }),
  
  setLoading: (isLoading) => set({ isLoading }),
}));

// ============================================
// CHAT STORE
// ============================================

interface ChatStore {
  // State
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  context: string;
  
  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleMinimize: () => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setLoading: (isLoading: boolean) => void;
  setContext: (context: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      isOpen: false,
      isMinimized: false,
      messages: [],
      isLoading: false,
      context: '',
      
      openChat: () => set({ isOpen: true, isMinimized: false }),
      closeChat: () => set({ isOpen: false }),
      toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
      })),
      
      setMessages: (messages) => set({ messages }),
      setLoading: (isLoading) => set({ isLoading }),
      setContext: (context) => set({ context }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'genai-learning-chat',
      partialize: (state) => ({
        messages: state.messages.slice(-50),  // Keep last 50 messages
      }),
    }
  )
);
