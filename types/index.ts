// types/index.ts
// ============================================
// Core type definitions for GenAI Learning Platform
// ============================================

// ============================================
// USER TYPES
// ============================================

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  email?: string;
  name?: string;
  level: UserLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exploration {
  id: string;
  termId: string;
  termName: string;
  fromLessonId: string;
  fromContext: string;  // breadcrumb path
  popupViewedAt?: Date;
  deepDiveViewedAt?: Date;
  masteryViewedAt?: Date;
  quizScore?: number;
  quizAttempts: number;
  notes?: string;
}

export interface LessonProgress {
  lessonId: string;
  percentComplete: number;
  sectionsCompleted: string[];
  lastAccessedAt: Date;
  timeSpentMinutes: number;
  quizScore?: number;
  quizAttempts?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: string;  // what page they were on
}

export interface ChatSession {
  id: string;
  context: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export interface UserProfile {
  user: User;
  explorations: Exploration[];
  lessonProgress: LessonProgress[];
  chatSessions: ChatSession[];
  stats: UserStats;
}

export interface UserStats {
  termsExplored: number;
  deepDivesCompleted: number;
  quizzesPassed: number;
  totalTimeMinutes: number;
  currentStreak: number;
  longestStreak: number;
}

// ============================================
// CONTENT TYPES
// ============================================

export interface Lesson {
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  icon: string;
  
  // Content at different levels
  content: LeveledContent;
  
  // Clickable terms in this lesson
  terms: Term[];
  
  // Advanced topics (rabbit holes)
  advancedTopics: AdvancedTopic[];
  
  // End of lesson quiz
  quiz: Quiz;
  
  // Prerequisites
  prerequisites: string[];  // lesson IDs
}

export interface LeveledContent {
  beginner: string;      // Markdown with [clickable terms]
  intermediate: string;
  advanced: string;
}

export interface Term {
  id: string;
  term: string;
  slug: string;
  
  // Quick popup content
  popup: {
    beginner: PopupContent;
    intermediate: PopupContent;
    advanced: PopupContent;
  };
  
  // Does this term have a full deep dive?
  hasDeepDive: boolean;
  
  // Related terms to suggest
  relatedTerms: string[];  // term IDs
  
  // Which lessons reference this term
  usedInLessons: string[];  // lesson IDs
}

export interface PopupContent {
  explanation: string;
  example?: string;
  diagram?: string;  // Mermaid code
}

export interface AdvancedTopic {
  id: string;
  title: string;
  description: string;
  difficulty: UserLevel;
  prerequisites: string[];  // term IDs
  hasDeepDive: boolean;
  icon?: string;
}

// ============================================
// DEEP DIVE TYPES
// ============================================

export interface DeepDive {
  id: string;
  termId: string;
  termName: string;
  
  // Full content at each level
  content: {
    beginner: DeepDiveContent;
    intermediate: DeepDiveContent;
    advanced: DeepDiveContent;
  };
  
  // Metadata
  source: 'manual' | 'ai-generated';
  generatedAt?: Date;
  lastUpdatedAt: Date;
  qualityScore?: number;
}

export interface DeepDiveContent {
  // Core content sections
  oneLiner: string;
  analogy: string;
  explanation: string;
  howItWorks: string;
  
  // Visual elements
  diagram: string;  // Mermaid code
  codeExample?: CodeExample;
  
  // Connections
  commonMisconceptions: Misconception[];
  relatedTerms: RelatedTerm[];
  advancedTopics: AdvancedTopic[];
  
  // Assessment
  quiz: QuizQuestion[];
  
  // Meta
  estimatedMinutes: number;
}

export interface CodeExample {
  language: string;
  code: string;
  explanation: string;
  runnable: boolean;
}

export interface Misconception {
  wrong: string;
  right: string;
  explanation: string;
}

export interface RelatedTerm {
  termId: string;
  termName: string;
  relationship: string;  // "is used by", "is part of", "is similar to"
}

// ============================================
// QUIZ TYPES
// ============================================

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;  // percentage
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: UserLevel;
}

// ============================================
// NAVIGATION TYPES
// ============================================

export interface Breadcrumb {
  label: string;
  href: string;
  type: 'course' | 'lesson' | 'term' | 'advanced';
}

export interface NavigationState {
  currentLesson?: string;
  currentTerm?: string;
  breadcrumbs: Breadcrumb[];
  explorationStack: string[];  // stack of term IDs for back navigation
}

// ============================================
// UI STATE TYPES
// ============================================

export interface PopupState {
  isOpen: boolean;
  termId: string | null;
  position: { x: number; y: number } | null;
}

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  context: string;
}

export interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  currentLevel: UserLevel;
  navigation: NavigationState;
  popup: PopupState;
  chat: ChatState;
  isLoading: boolean;
}

// ============================================
// API TYPES
// ============================================

export interface GeneratePopupRequest {
  termId: string;
  term: string;
  level: UserLevel;
  context: {
    lessonId: string;
    lessonTitle: string;
    surroundingText?: string;
  };
}

export interface GeneratePopupResponse {
  content: PopupContent;
  cached: boolean;
}

export interface GenerateDeepDiveRequest {
  termId: string;
  term: string;
  level: UserLevel;
  context: {
    fromLessonId: string;
    exploredTerms: string[];
    userLevel: UserLevel;
  };
}

export interface GenerateDeepDiveResponse {
  content: DeepDiveContent;
  cached: boolean;
  generatedAt: Date;
}

export interface ChatRequest {
  message: string;
  context: {
    currentPage: string;
    lessonId?: string;
    termId?: string;
    userLevel: UserLevel;
    recentExplorations: string[];
  };
  history: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  suggestedTerms?: string[];
  suggestedLessons?: string[];
}

// ============================================
// EVENT TYPES
// ============================================

export interface ExplorationEvent {
  type: 'popup_viewed' | 'deep_dive_viewed' | 'mastery_viewed' | 'quiz_completed';
  termId: string;
  fromLessonId: string;
  timestamp: Date;
  data?: {
    quizScore?: number;
    timeSpent?: number;
  };
}

export interface ProgressEvent {
  type: 'section_completed' | 'lesson_completed';
  lessonId: string;
  sectionId?: string;
  timestamp: Date;
  percentComplete: number;
}
