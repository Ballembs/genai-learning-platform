// app/course/[lessonSlug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle,
  Circle,
  User,
  List,
  TrendingUp,
} from 'lucide-react';
import { useUserStore, useNavigationStore } from '@/lib/store';
import { LessonContent } from '@/components/lesson/LessonContent';
import { LessonQuiz } from '@/components/lesson/LessonQuiz';
import { Sidebar } from '@/components/lesson/Sidebar';
import { BottomSheet, BottomSheetTrigger } from '@/components/ui/BottomSheet';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { lessonData } from '@/content/lessons';

// Dynamic imports for interactive demos (only loaded when needed)
const PromptPlayground = dynamic(
  () => import('@/components/try-it/PromptPlayground').then(m => ({ default: m.PromptPlayground })),
  {
    loading: () => <div className="h-96 bg-gray-50 rounded-2xl animate-pulse" />,
    ssr: false,
  }
);

const SimilarityChecker = dynamic(
  () => import('@/components/try-it/SimilarityChecker').then(m => ({ default: m.SimilarityChecker })),
  {
    loading: () => <div className="h-96 bg-gray-50 rounded-2xl animate-pulse" />,
    ssr: false,
  }
);

// Map lesson slugs to their interactive demos
const lessonDemos: Record<string, React.ComponentType | null> = {
  '02-prompt-engineering': PromptPlayground,
  '03-embeddings': SimilarityChecker,
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonSlug = params.lessonSlug as string;
  
  const { currentLevel, hasExplored } = useUserStore();
  const { setCurrentLesson, setBreadcrumbs } = useNavigationStore();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Get lesson data
  const lesson = lessonData[lessonSlug];

  // Set navigation state
  useEffect(() => {
    if (lesson) {
      setCurrentLesson(lesson.id);
      setBreadcrumbs([
        { label: 'Course', href: '/course', type: 'course' },
        { label: lesson.title, href: `/course/${lessonSlug}`, type: 'lesson' },
      ]);
    }

    return () => {
      setCurrentLesson(null);
    };
  }, [lesson, lessonSlug, setCurrentLesson, setBreadcrumbs]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
          <p className="text-gray-600 mb-4">This lesson doesn't exist yet.</p>
          <Link 
            href="/course"
            className="text-primary-600 hover:underline"
          >
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Get previous and next lessons
  const lessonOrder = ['01-how-ai-works', '02-prompt-engineering', '03-embeddings', '04-rag', '05-agents'];
  const currentIndex = lessonOrder.indexOf(lessonSlug);
  const prevLesson = currentIndex > 0 ? lessonOrder[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessonOrder.length - 1 ? lessonOrder[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-primary-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Link
                href="/course"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors touch-target flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Course</span>
              </Link>
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <div className="min-w-0">
                <h1 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{lesson.title}</h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">{lesson.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {lesson.estimatedMinutes} min
              </div>
              <div className="text-xs sm:text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {scrollProgress}%
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-32 lg:pb-8">
        <div className="flex gap-8">
          {/* Lesson Content */}
          <article className="flex-1 w-full lg:max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Lesson Header */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mb-6 sm:mb-8">
                <div className={`
                  inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4
                  ${currentLevel === 'beginner' ? 'bg-green-100 text-green-700' :
                    currentLevel === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                    'bg-pink-100 text-pink-700'}
                `}>
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Level
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {lesson.title}
                </h1>
                <p className="text-lg sm:text-xl text-primary-600 mb-3 sm:mb-4">
                  {lesson.subtitle}
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  {lesson.description}
                </p>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-500">
                    💡 <strong>Tip:</strong> Tap any{' '}
                    <span className="clickable-term cursor-default">highlighted term</span>{' '}
                    to explore.
                  </p>
                </div>
              </div>

              {/* Lesson Body */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                <LessonContent
                  content={lesson.content[currentLevel]}
                  terms={lesson.terms}
                />
              </div>

              {/* Try It Yourself Demo */}
              {lessonDemos[lessonSlug] && (() => {
                const DemoComponent = lessonDemos[lessonSlug]!;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 sm:mt-8"
                  >
                    <DemoComponent />
                  </motion.div>
                );
              })()}

              {/* Advanced Topics */}
              {lesson.advancedTopics && lesson.advancedTopics.length > 0 && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 p-5 sm:p-8 mt-6 sm:mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    🚀 Want to Go Deeper?
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    Tap any topic to explore further.
                  </p>
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    {lesson.advancedTopics.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/course/term/${topic.id}`}
                        className="bg-white rounded-xl p-4 border border-gray-200 hover:border-primary-300 hover:shadow-md active:scale-[0.98] transition-all group touch-target-card"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {topic.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {topic.description}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                        </div>
                        <div className={`
                          inline-block mt-3 px-2 py-0.5 rounded text-xs font-medium
                          ${topic.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-pink-100 text-pink-700'}
                        `}>
                          {topic.difficulty}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz */}
              {lesson.quiz && lesson.quiz.questions.length > 0 && (
                <LessonQuiz quiz={lesson.quiz} lessonId={lesson.id} />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 sm:mt-8 gap-4">
                {prevLesson ? (
                  <Link
                    href={`/course/${prevLesson}`}
                    className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-primary-600 transition-colors touch-target text-sm sm:text-base"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Previous Lesson</span>
                    <span className="sm:hidden">Previous</span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Link
                    href={`/course/${nextLesson}`}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-[0.98] transition-all touch-target text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Next Lesson</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <div className="px-4 sm:px-6 py-3 bg-green-500 text-white rounded-xl text-sm sm:text-base">
                    🎉 Complete!
                  </div>
                )}
              </div>
            </motion.div>
          </article>

          {/* Sidebar - Desktop */}
          <aside className="w-80 flex-shrink-0 hidden lg:block">
            <Sidebar lessonId={lesson.id} terms={lesson.terms} />
          </aside>
        </div>
      </main>

      {/* Mobile Sidebar Trigger */}
      {isMobile && (
        <BottomSheetTrigger
          onClick={() => setIsSidebarOpen(true)}
          label="Progress & Terms"
          icon={<TrendingUp className="w-5 h-5 text-primary-500" />}
          badge={lesson.terms.filter(t => hasExplored(t.id)).length}
        />
      )}

      {/* Mobile Sidebar Bottom Sheet */}
      <BottomSheet
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title="Lesson Progress"
      >
        <Sidebar lessonId={lesson.id} terms={lesson.terms} />
      </BottomSheet>
    </div>
  );
}
