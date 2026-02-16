// content/lessons/index.ts
// ============================================
// Lesson Content Data
// ============================================

import type { Term, AdvancedTopic, UserLevel, Quiz } from '@/types';

// Import individual lesson content
import { lesson01 } from './lesson-01';
import { lesson02 } from './lesson-02';
import { lesson03 } from './lesson-03';
import { lesson04 } from './lesson-04';
import { lesson05 } from './lesson-05';

interface LessonData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  content: Record<UserLevel, string>;
  terms: Term[];
  advancedTopics: AdvancedTopic[];
  quiz: Quiz;
}

// ============================================
// EXPORT ALL LESSONS
// ============================================

export const lessonData: Record<string, LessonData> = {
  '01-how-ai-works': lesson01,
  '02-prompt-engineering': lesson02,
  '03-embeddings': lesson03,
  '04-rag': lesson04,
  '05-agents': lesson05,
};
