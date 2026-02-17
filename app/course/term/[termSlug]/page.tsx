// app/course/term/[termSlug]/page.tsx
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Code,
  AlertTriangle,
  Link2,
  Sparkles,
  CheckCircle,
  Circle,
  ArrowRight,
  Trophy,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { useUserStore, useNavigationStore } from '@/lib/store';
import { MermaidDiagram } from '@/components/diagrams/MermaidDiagram';
import { MarkdownContent, CodeBlock } from '@/components/content/MarkdownContent';
import { lessonData } from '@/content/lessons';
import { getCached, setCache } from '@/lib/cache';
import type { UserLevel, UserGoal } from '@/types';

const DEEP_DIVE_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// ============================================
// TYPES
// ============================================

/** Shape returned by /api/deep-dive (single level) */
interface APIDeepDiveContent {
  oneLiner: string;
  analogy: string;
  explanation: string;
  howItWorks: string;
  diagram: string;
  codeExample?: {
    language: string;
    code: string;
    explanation: string;
    runnable?: boolean;
  };
  commonMisconceptions: {
    wrong: string;
    right: string;
    explanation: string;
  }[];
  relatedTerms: {
    termId: string;
    termName: string;
    relationship: string;
  }[];
  advancedTopics: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    prerequisites?: string[];
    hasDeepDive?: boolean;
  }[];
  quiz: {
    id?: string;
    question: string;
    options: string[];
    correctIndex?: number;
    correctAnswer?: number;
    explanation: string;
  }[];
  estimatedMinutes: number;
}

interface TermInfo {
  termName: string;
  fromLessonId: string;
  fromLessonTitle: string;
  fromLessonSlug: string;
}

// ============================================
// HELPERS
// ============================================

/**
 * Look up a term's display name and origin lesson from lesson data.
 * Searches all lessons for a term matching the slug.
 */
function findTermInfo(termSlug: string): TermInfo | null {
  const lessonMeta: Record<string, { id: string; title: string; slug: string }> = {
    '01-how-ai-works': { id: 'lesson-01', title: 'How AI Works', slug: '01-how-ai-works' },
    '02-prompt-engineering': { id: 'lesson-02', title: 'Prompt Engineering', slug: '02-prompt-engineering' },
    '03-embeddings': { id: 'lesson-03', title: 'Embeddings & Vector Search', slug: '03-embeddings' },
    '04-rag': { id: 'lesson-04', title: 'RAG', slug: '04-rag' },
    '05-agents': { id: 'lesson-05', title: 'Agents & Tools', slug: '05-agents' },
  };

  for (const [lessonKey, lesson] of Object.entries(lessonData)) {
    const meta = lessonMeta[lessonKey];
    if (!meta) continue;

    const term = lesson.terms.find((t) => t.slug === termSlug || t.id === termSlug);
    if (term) {
      return {
        termName: term.term,
        fromLessonId: meta.id,
        fromLessonTitle: meta.title,
        fromLessonSlug: meta.slug,
      };
    }
  }

  return null;
}

/**
 * Convert a slug to a readable display name
 * e.g. "cosine-similarity" → "Cosine Similarity"
 */
function slugToDisplayName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Level configuration
const levelConfig: Record<UserLevel, { label: string; color: string; bgColor: string; borderColor: string }> = {
  beginner: { label: 'Beginner', color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-200' },
  intermediate: { label: 'Intermediate', color: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-200' },
  advanced: { label: 'Advanced', color: 'text-pink-700', bgColor: 'bg-pink-100', borderColor: 'border-pink-200' },
};

// ============================================
// LOADING SKELETON
// ============================================

function DeepDiveSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-full bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Generating indicator */}
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-8 mb-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-6">
              <Sparkles className="w-12 h-12 text-primary-400 animate-pulse" />
              <Loader2 className="w-6 h-6 text-primary-500 animate-spin absolute -right-2 -bottom-1" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Deep Dive...</h3>
            <p className="text-gray-600 text-center max-w-md">
              AI is crafting a comprehensive explanation with analogies, code examples, diagrams, and quizzes.
              This usually takes 5-10 seconds.
            </p>
          </div>
        </div>

        {/* Content skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

// ============================================
// ERROR STATE
// ============================================

function DeepDiveError({
  termName,
  error,
  onRetry,
  onBack,
}: {
  termName: string;
  error: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Couldn&apos;t generate deep dive
        </h1>
        <p className="text-gray-600 mb-2">
          We had trouble generating the deep dive for &ldquo;{termName}&rdquo;.
        </p>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function TermDeepDivePage() {
  const params = useParams();
  const router = useRouter();
  const termSlug = params.termSlug as string;

  const { currentLevel, currentGoal, setLevel, updateExploration, hasExplored, profile, saveQuizScore } = useUserStore();
  const { setBreadcrumbs, currentLessonId } = useNavigationStore();

  // Content state
  const [content, setContent] = useState<APIDeepDiveContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Cache: store fetched content per level to avoid re-fetching on level toggle
  const contentCache = useRef<Partial<Record<UserLevel, APIDeepDiveContent>>>({});

  // Resolve term info from lesson data
  const termInfo = findTermInfo(termSlug);
  const termName = termInfo?.termName ?? slugToDisplayName(termSlug);
  const fromLessonId = termInfo?.fromLessonId ?? currentLessonId ?? 'lesson-01';
  const fromLessonTitle = termInfo?.fromLessonTitle ?? 'Course';
  const fromLessonSlug = termInfo?.fromLessonSlug ?? '01-how-ai-works';

  // Get explored terms for context
  const exploredTermIds = (profile?.explorations || []).map((e) => e.termId);

  /**
   * Fetch deep dive content from the API
   * Caching priority: useRef (instant) → localStorage (fast) → API (slow)
   */
  const fetchDeepDive = useCallback(
    async (level: UserLevel, goal: UserGoal) => {
      const cacheKey = `deepdive:${termSlug}:${level}:${goal}`;

      // 1. Check in-memory cache first (instant, same session)
      if (contentCache.current[level]) {
        setContent(contentCache.current[level]!);
        setLoading(false);
        setError(null);
        return;
      }

      // 2. Check localStorage cache (fast, cross-session)
      const cached = getCached<APIDeepDiveContent>(cacheKey);
      if (cached) {
        // Store in memory cache too for instant access within session
        contentCache.current[level] = cached;
        setContent(cached);
        setLoading(false);
        setError(null);
        return;
      }

      // 3. Fetch from API (slow)
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/deep-dive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            termId: termSlug,
            term: termName,
            level,
            context: {
              fromLessonId,
              exploredTerms: exploredTermIds,
              userLevel: level,
            },
            goal,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Server error (${response.status})`
          );
        }

        const data = await response.json();
        const deepDiveContent: APIDeepDiveContent = data.content;

        // Cache in memory (instant access within session)
        contentCache.current[level] = deepDiveContent;

        // Cache in localStorage (persists across sessions)
        setCache(cacheKey, deepDiveContent, DEEP_DIVE_CACHE_TTL);

        setContent(deepDiveContent);
        setError(null);
      } catch (err) {
        console.error('Deep dive fetch error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [termSlug, termName, fromLessonId]
  );

  // Fetch on mount and when level/goal changes
  useEffect(() => {
    fetchDeepDive(currentLevel, currentGoal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, currentGoal, termSlug]);

  // Update breadcrumbs
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Course', href: '/course', type: 'course' },
      { label: fromLessonTitle, href: `/course/${fromLessonSlug}`, type: 'lesson' },
      { label: termName, href: `/course/term/${termSlug}`, type: 'term' },
    ]);
  }, [termSlug, termName, fromLessonTitle, fromLessonSlug, setBreadcrumbs]);

  // Track deep dive view
  useEffect(() => {
    if (content && hasExplored(termSlug)) {
      updateExploration(termSlug, { deepDiveViewedAt: new Date() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, termSlug]);

  // Reset quiz when level changes
  useEffect(() => {
    setSelectedAnswers({});
    setShowResults({});
    setQuizCompleted(false);
    setQuizScore(null);
  }, [currentLevel]);

  // --- Loading State ---
  if (loading && !content) {
    return <DeepDiveSkeleton />;
  }

  // --- Error State ---
  if (error && !content) {
    return (
      <DeepDiveError
        termName={termName}
        error={error}
        onRetry={() => fetchDeepDive(currentLevel, currentGoal)}
        onBack={() => router.back()}
      />
    );
  }

  // --- No Content (shouldn't happen if API is working) ---
  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Sparkles className="w-16 h-16 text-primary-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Deep Dive Coming Soon</h1>
          <p className="text-gray-600 mb-6">
            We&apos;re preparing an in-depth exploration of &ldquo;{termName}&rdquo;.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // --- Quiz Handlers ---
  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [questionIndex]: true }));
  };

  const allQuestionsAnswered = content.quiz.length > 0 &&
    content.quiz.every((_, idx) => selectedAnswers[idx] !== undefined);

  const calculateQuizScore = (): number | null => {
    if (!content.quiz.length || !allQuestionsAnswered) return null;

    const correctCount = content.quiz.reduce((count, q, idx) => {
      const correctIdx = q.correctIndex ?? q.correctAnswer ?? 0;
      return selectedAnswers[idx] === correctIdx ? count + 1 : count;
    }, 0);

    return Math.round((correctCount / content.quiz.length) * 100);
  };

  const handleSubmitQuiz = () => {
    const score = calculateQuizScore();
    if (score === null) return;

    setQuizScore(score);
    setQuizCompleted(true);
    saveQuizScore(termSlug, score);
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setShowResults({});
    setQuizCompleted(false);
    setQuizScore(null);
  };

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/course" className="text-gray-500 hover:text-gray-700">
                Course
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <Link
                href={`/course/${fromLessonSlug}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {fromLessonTitle}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="text-gray-900 font-medium">{termName}</span>
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2">
              {(['beginner', 'intermediate', 'advanced'] as UserLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setLevel(level)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-all
                    ${currentLevel === level
                      ? `${levelConfig[level].bgColor} ${levelConfig[level].color}`
                      : 'text-gray-500 hover:bg-gray-100'
                    }
                  `}
                >
                  {levelConfig[level].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Loading overlay when switching levels */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 z-30 flex items-center justify-center"
          >
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
              <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
              <span className="text-gray-700 font-medium">Switching to {levelConfig[currentLevel].label}...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          key={`${termSlug}-${currentLevel}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${levelConfig[currentLevel].bgColor}`}>
                <Sparkles className={`w-6 h-6 ${levelConfig[currentLevel].color}`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelConfig[currentLevel].bgColor} ${levelConfig[currentLevel].color}`}>
                Deep Dive
              </span>
              {content.estimatedMinutes && (
                <span className="text-sm text-gray-500 ml-auto">
                  ~{content.estimatedMinutes} min read
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{termName}</h1>

            <p className="text-xl text-gray-600">{content.oneLiner}</p>
          </div>

          {/* Analogy Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">The Analogy</h2>
            </div>
            <MarkdownContent content={content.analogy} className="text-gray-700" />
          </motion.section>

          {/* Explanation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">Explanation</h2>
            </div>

            <MarkdownContent content={content.explanation} className="prose prose-gray max-w-none" />
          </motion.section>

          {/* How It Works + Diagram */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900">How It Works</h2>
            </div>

            <MarkdownContent content={content.howItWorks} className="prose prose-gray max-w-none" />

            {content.diagram && (
              <div className="mt-6">
                <MermaidDiagram chart={content.diagram} />
              </div>
            )}
          </motion.section>

          {/* Code Example */}
          {content.codeExample && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Code Example</h2>
              </div>

              <CodeBlock
                code={content.codeExample.code}
                language={content.codeExample.language}
                className="mb-4"
              />

              <p className="text-gray-600 text-sm">{content.codeExample.explanation}</p>
            </motion.section>
          )}

          {/* Common Misconceptions */}
          {content.commonMisconceptions.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-bold text-gray-900">Common Misconceptions</h2>
              </div>

              <div className="space-y-4">
                {content.commonMisconceptions.map((item, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-red-50 px-4 py-3 border-b border-red-100">
                      <p className="text-red-800 font-medium">
                        <span className="text-red-500">Myth:</span> {item.wrong}
                      </p>
                    </div>
                    <div className="bg-green-50 px-4 py-3">
                      <p className="text-green-800">
                        <span className="text-green-600 font-medium">Reality:</span> {item.right}
                      </p>
                    </div>
                    {item.explanation && (
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                        <p className="text-gray-600 text-sm">{item.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Related Terms - THE RABBIT HOLE */}
          {content.relatedTerms.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Link2 className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Related Terms</h2>
                <span className="text-sm text-gray-500 ml-2">Click to explore</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {content.relatedTerms.map((term) => (
                  <Link
                    key={term.termId}
                    href={`/course/term/${term.termId}`}
                    className="group p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {term.termName}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{term.relationship}</p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Advanced Topics - MORE RABBIT HOLES */}
          {content.advancedTopics.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Go Deeper</h2>
              </div>

              <div className="space-y-3">
                {content.advancedTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/course/term/${topic.id}`}
                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${topic.difficulty === 'intermediate'
                          ? 'bg-amber-100 text-amber-700'
                          : topic.difficulty === 'beginner'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-pink-100 text-pink-700'}
                      `}>
                        {topic.difficulty}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Quiz Section */}
          {content.quiz.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-bold text-gray-900">Quick Quiz</h2>
              </div>

              <div className="space-y-8">
                {content.quiz.map((q, qIndex) => (
                  <div key={q.id || qIndex} className="space-y-4">
                    <p className="font-medium text-gray-900">
                      {qIndex + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => {
                        const isSelected = selectedAnswers[qIndex] === oIndex;
                        const correctIdx = q.correctIndex ?? q.correctAnswer ?? 0;
                        const isCorrect = oIndex === correctIdx;
                        const showResult = showResults[qIndex];

                        return (
                          <button
                            key={oIndex}
                            onClick={() => !showResult && handleQuizAnswer(qIndex, oIndex)}
                            disabled={showResult}
                            className={`
                              w-full text-left p-4 rounded-xl border-2 transition-all
                              ${showResult
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : isSelected
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-200'
                                : isSelected
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              {showResult ? (
                                isCorrect ? (
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : isSelected ? (
                                  <Circle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                                )
                              ) : (
                                <Circle className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-primary-500' : 'text-gray-300'}`} />
                              )}
                              <span className={showResult && isCorrect ? 'text-green-700 font-medium' : ''}>
                                {option}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {showResults[qIndex] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-blue-50 rounded-xl border border-blue-100"
                      >
                        <p className="text-blue-800 text-sm">
                          <span className="font-medium">Explanation:</span> {q.explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quiz Submit / Results Section */}
              {!quizCompleted && allQuestionsAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-6 border-t border-gray-100"
                >
                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-5 h-5" />
                    Submit Quiz
                  </button>
                </motion.div>
              )}

              {quizCompleted && quizScore !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-8 p-6 rounded-xl border-2 ${
                    quizScore >= 70
                      ? 'bg-green-50 border-green-200'
                      : quizScore >= 50
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      quizScore >= 70
                        ? 'text-green-600'
                        : quizScore >= 50
                          ? 'text-amber-600'
                          : 'text-red-600'
                    }`}>
                      {quizScore}%
                    </div>
                    <p className="text-gray-700 mb-2">
                      {content.quiz.reduce((count, q, idx) => {
                        const correctIdx = q.correctIndex ?? q.correctAnswer ?? 0;
                        return selectedAnswers[idx] === correctIdx ? count + 1 : count;
                      }, 0)} out of {content.quiz.length} correct
                    </p>
                    <p className={`font-medium mb-4 ${
                      quizScore >= 70
                        ? 'text-green-700'
                        : quizScore >= 50
                          ? 'text-amber-700'
                          : 'text-red-700'
                    }`}>
                      {quizScore >= 70
                        ? "Great job! You've mastered this topic!"
                        : "Keep learning! Review the content and try again."}
                    </p>
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-6 py-2 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retake Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* Navigation Footer */}
          <div className="flex items-center justify-between py-8 border-t border-gray-200">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <Link
              href={`/course/${fromLessonSlug}`}
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              Continue Lesson
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

