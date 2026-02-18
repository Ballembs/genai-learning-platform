// app/course/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Database,
  Search,
  Bot,
  Workflow,
  Factory,
  Plug,
  ChevronRight,
  Clock,
  CheckCircle,
  Circle,
  User,
  Settings,
} from 'lucide-react';
import { useUserStore } from '@/lib/store';
import type { UserLevel } from '@/types';

// Course lessons data
const lessons = [
  {
    id: 'lesson-01',
    slug: '01-how-ai-works',
    number: 1,
    title: 'How AI Works',
    subtitle: 'The Magic Behind ChatGPT',
    description: 'Understand how AI generates text, what tokens are, and why AI sometimes "hallucinates". The foundation for everything else.',
    icon: Brain,
    estimatedMinutes: 25,
    color: 'from-violet-400 to-purple-500',
    topics: ['Tokens', 'Context Window', 'Temperature', 'Generation'],
  },
  {
    id: 'lesson-02',
    slug: '02-prompt-engineering',
    number: 2,
    title: 'Prompt Engineering',
    subtitle: 'Control AI Like a Pro',
    description: 'Learn to write prompts that get exactly what you want. System prompts, few-shot learning, chain-of-thought reasoning.',
    icon: MessageSquare,
    estimatedMinutes: 30,
    color: 'from-blue-400 to-cyan-500',
    topics: ['System Prompts', 'Few-shot', 'Chain of Thought', 'Personas'],
  },
  {
    id: 'lesson-03',
    slug: '03-embeddings',
    number: 3,
    title: 'Embeddings & Vector Search',
    subtitle: 'Finding Meaning in Numbers',
    description: 'Discover how AI understands meaning by converting text to numbers. The key to building search that actually works.',
    icon: Database,
    estimatedMinutes: 35,
    color: 'from-emerald-400 to-green-500',
    topics: ['Embeddings', 'Vector Databases', 'Similarity Search', 'Chunking'],
  },
  {
    id: 'lesson-04',
    slug: '04-rag',
    number: 4,
    title: 'RAG',
    subtitle: 'Teaching AI Your Data',
    description: 'Build AI systems that answer questions using YOUR documents. The pattern behind every modern AI assistant.',
    icon: Search,
    estimatedMinutes: 40,
    color: 'from-orange-400 to-amber-500',
    topics: ['Retrieval', 'Context Injection', 'Citations', 'Accuracy'],
  },
  {
    id: 'lesson-05',
    slug: '05-agents',
    number: 5,
    title: 'Agents & Tools',
    subtitle: 'AI That Takes Action',
    description: 'Create AI that can decide what to do, use tools, and accomplish complex tasks autonomously.',
    icon: Bot,
    estimatedMinutes: 45,
    color: 'from-pink-400 to-rose-500',
    topics: ['Tools', 'ReAct Pattern', 'Multi-step', 'Autonomous'],
  },
  {
    id: 'lesson-06',
    slug: '06-agentic-patterns',
    number: 6,
    title: 'Agentic AI Patterns',
    subtitle: 'Architecting Intelligent Systems',
    description: 'Design patterns for production AI agents — orchestration, multi-agent systems, planning, guardrails, and agentic RAG.',
    icon: Workflow,
    estimatedMinutes: 45,
    color: 'from-indigo-400 to-blue-500',
    topics: ['Orchestration', 'Multi-Agent', 'Planning', 'Guardrails'],
  },
  {
    id: 'lesson-07',
    slug: '07-agentic-practice',
    number: 7,
    title: 'Agentic AI in Practice',
    subtitle: 'Reshaping Real Workflows',
    description: 'How agentic AI is transforming data engineering, governance, security, and DevOps — with architectures you can implement today.',
    icon: Factory,
    estimatedMinutes: 50,
    color: 'from-teal-400 to-cyan-500',
    topics: ['Data Pipelines', 'Governance', 'NL-to-SQL', 'CI/CD Agents'],
  },
  {
    id: 'lesson-08',
    slug: '08-mcp',
    number: 8,
    title: 'MCP: Model Context Protocol',
    subtitle: 'The Universal Language for AI Agents',
    description: 'Master the open standard that connects AI to tools, data, and services — the protocol behind Claude, Cursor, and every modern AI agent.',
    icon: Plug,
    estimatedMinutes: 45,
    color: 'from-amber-400 to-orange-500',
    topics: ['MCP Protocol', 'Tools & Resources', 'JSON-RPC', 'Transports'],
  },
];

const levelLabels: Record<UserLevel, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: 'bg-green-100 text-green-700' },
  intermediate: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700' },
  advanced: { label: 'Advanced', color: 'bg-pink-100 text-pink-700' },
};

export default function CoursePage() {
  const { currentLevel, setLevel, profile } = useUserStore();
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  // Get progress for each lesson
  const getProgress = (lessonId: string) => {
    return profile?.lessonProgress.find(p => p.lessonId === lessonId);
  };

  // Calculate overall progress
  const completedLessons = lessons.filter(l => {
    const progress = getProgress(l.id);
    return progress && progress.percentComplete === 100;
  }).length;

  const overallProgress = Math.round((completedLessons / lessons.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 touch-target">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">GenAI Academy</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Level Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLevelSelector(!showLevelSelector)}
                  className={`px-3 py-2 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium touch-target ${levelLabels[currentLevel].color}`}
                >
                  {levelLabels[currentLevel].label}
                </button>

                {showLevelSelector && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {Object.entries(levelLabels).map(([level, { label, color }]) => (
                      <button
                        key={level}
                        onClick={() => {
                          setLevel(level as UserLevel);
                          setShowLevelSelector(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 active:bg-gray-100 flex items-center justify-between touch-target ${
                          currentLevel === level ? 'font-medium' : ''
                        }`}
                      >
                        <span>{label}</span>
                        {currentLevel === level && (
                          <CheckCircle className="w-4 h-4 text-primary-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/profile"
                className="p-2.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-target"
              >
                <User className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 pb-24 sm:pb-12">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Generative AI Mastery
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
            From understanding how AI thinks to building AI agents.
            <span className="text-primary-600 font-medium"> Tap any term</span> to explore.
          </p>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900 text-sm sm:text-base">Your Progress</span>
              <span className="text-xs sm:text-sm text-gray-500">
                {completedLessons}/{lessons.length} lessons
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            {profile && profile.explorations.length > 0 && (
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                🔍 {profile.explorations.length} terms explored
              </p>
            )}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-3 sm:space-y-4">
          {lessons.map((lesson, index) => {
            const progress = getProgress(lesson.id);
            const isCompleted = progress?.percentComplete === 100;
            const isStarted = progress && progress.percentComplete > 0;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/course/${lesson.slug}`}>
                  <div className={`
                    bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm
                    hover:shadow-md active:shadow-sm hover:border-gray-200 active:scale-[0.99] transition-all duration-200
                    overflow-hidden group touch-target-card
                  `}>
                    {/* Mobile Layout - stacked */}
                    <div className="flex flex-col sm:flex-row">
                      {/* Lesson Number Indicator */}
                      <div className={`
                        sm:w-24 flex-shrink-0 bg-gradient-to-br ${lesson.color}
                        flex items-center sm:flex-col justify-between sm:justify-center text-white
                        px-4 py-3 sm:px-0 sm:py-0
                      `}>
                        <div className="flex items-center sm:flex-col gap-2 sm:gap-0">
                          <span className="text-2xl sm:text-3xl font-bold">{lesson.number}</span>
                          <span className="text-xs uppercase tracking-wide opacity-80">Lesson</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/80 text-xs sm:hidden">
                          <Clock className="w-3 h-3" />
                          {lesson.estimatedMinutes}m
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 sm:p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                              <h3 className="text-base sm:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {lesson.title}
                              </h3>
                              {isCompleted && (
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                              )}
                              {isStarted && !isCompleted && (
                                <div className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0">
                                  {progress?.percentComplete}%
                                </div>
                              )}
                            </div>
                            <p className="text-primary-600 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                              {lesson.subtitle}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                              {lesson.description}
                            </p>

                            {/* Topics - hidden on small mobile */}
                            <div className="hidden xs:flex flex-wrap gap-1.5 sm:gap-2">
                              {lesson.topics.slice(0, 4).map((topic) => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Time & Arrow - desktop only */}
                          <div className="hidden sm:flex flex-col items-end gap-4 ml-6">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <Clock className="w-4 h-4" />
                              {lesson.estimatedMinutes} min
                            </div>
                            <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                          </div>

                          {/* Mobile arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-300 sm:hidden flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-500 text-sm sm:text-base mb-2 sm:mb-4">
            Tap any <span className="clickable-term cursor-default">highlighted term</span> to learn more
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            Progress saves automatically
          </p>
        </div>
      </main>
    </div>
  );
}
