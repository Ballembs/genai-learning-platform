// components/lesson/Sidebar.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import type { Term } from '@/types';

interface SidebarProps {
  lessonId: string;
  terms: Term[];
}

export function Sidebar({ lessonId, terms }: SidebarProps) {
  const { profile, hasExplored, getExploration } = useUserStore();
  const { user } = useAuth();

  // Get explorations for this lesson
  const lessonExplorations = profile?.explorations.filter(
    e => e.fromLessonId === lessonId
  ) || [];

  // Count explored terms
  const exploredCount = terms.filter(t => hasExplored(t.id)).length;
  const totalTerms = terms.length;
  const progressPercent = totalTerms > 0 ? Math.round((exploredCount / totalTerms) * 100) : 0;

  return (
    <div className="sticky top-24 space-y-6">
      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="sidebar"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <h3 className="sidebar-title mb-0">Lesson Progress</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Terms Explored</span>
            <motion.span
              className="font-medium text-gray-900"
              key={exploredCount}
              initial={{ scale: 1.2, color: '#0ea5e9' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {exploredCount}/{totalTerms}
            </motion.span>
          </div>
          <div className="progress-bar group relative">
            <motion.div
              className="progress-bar-fill relative"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Glow effect at the end */}
              {progressPercent > 0 && (
                <motion.div
                  className="absolute right-0 top-0 w-2 h-full bg-white/40 rounded-full"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
        </div>

        {progressPercent === 100 ? (
          <p className="text-sm text-green-600 font-medium">
            🎉 All terms explored!
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            Click highlighted terms to explore
          </p>
        )}
      </motion.div>

      {/* Terms List */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="sidebar"
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary-500" />
          <h3 className="sidebar-title mb-0">Key Terms</h3>
        </div>

        <div className="space-y-1">
          {terms.map((term, index) => {
            const isExplored = hasExplored(term.id);
            const exploration = getExploration(term.id);
            const hasDeepDive = exploration?.deepDiveViewedAt;

            return (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/course/term/${term.slug}`}
                  className={`
                    sidebar-item group
                    ${isExplored ? 'sidebar-item--explored' : ''}
                    hover:translate-x-1 transition-all duration-200
                  `}
                >
                  {isExplored ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    </motion.div>
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-primary-400 transition-colors" />
                  )}
                  <span className="flex-1 truncate group-hover:text-primary-600 transition-colors">{term.term}</span>
                  {hasDeepDive && (
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </motion.div>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Explorations */}
      {lessonExplorations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="sidebar"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h3 className="sidebar-title mb-0">Your Explorations</h3>
          </div>

          <div className="space-y-2">
            {lessonExplorations.slice(0, 5).map((exploration, index) => (
              <motion.div
                key={exploration.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/course/term/${exploration.termId}`}
                  className="block p-2 bg-gray-50 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                      {exploration.termName}
                    </span>
                    {exploration.deepDiveViewedAt && (
                      <motion.span
                        className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded"
                        whileHover={{ scale: 1.05 }}
                      >
                        Deep Dive
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {exploration.popupViewedAt && new Date(exploration.popupViewedAt).toLocaleDateString()}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {lessonExplorations.length > 5 && (
            <Link 
              href="/profile"
              className="block text-center text-sm text-primary-600 hover:underline mt-3"
            >
              View all explorations →
            </Link>
          )}
        </motion.div>
      )}

      {/* Help Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-100 p-5"
      >
        <h3 className="font-medium text-gray-900 mb-2">
          💡 Need Help?
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Click the chat button to ask questions about what you're learning.
        </p>
        <p className="text-xs text-gray-500">
          The AI knows exactly what lesson you're on!
        </p>
      </motion.div>

      {/* Sign-in prompt for guests */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl border border-cyan-100 p-4"
        >
          <p className="text-sm text-gray-700 mb-2">
            Sign in to save your progress across devices
          </p>
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            Sign in →
          </Link>
        </motion.div>
      )}
    </div>
  );
}
