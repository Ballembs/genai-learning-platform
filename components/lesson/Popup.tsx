// components/lesson/Popup.tsx
'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Check, Loader2, Sparkles } from 'lucide-react';
import { usePopupStore, useUserStore, useNavigationStore } from '@/lib/store';
import { MermaidDiagram } from '@/components/diagrams/MermaidDiagram';
import { SkeletonText } from '@/components/ui/Skeleton';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { lessonData } from '@/content/lessons';
import { getCached, setCache } from '@/lib/cache';
import type { UserLevel } from '@/types';

const POPUP_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// In-memory cache for instant access within session
const memoryCache = new Map<string, PopupContentType>();

interface PopupContentType {
  explanation: string;
  example?: string;
  diagram?: string;
}

/**
 * Get popup content for a term.
 * Priority: memory cache → localStorage → lessonData → API
 */
async function getPopupContent(
  termId: string,
  level: UserLevel,
  lessonId?: string
): Promise<PopupContentType> {
  const cacheKey = `popup:${termId}:${level}`;

  // 1. Check in-memory cache (instant, same session)
  const memCached = memoryCache.get(cacheKey);
  if (memCached) {
    return memCached;
  }

  // 2. Check localStorage cache (fast, cross-session)
  const localCached = getCached<PopupContentType>(cacheKey);
  if (localCached) {
    memoryCache.set(cacheKey, localCached);
    return localCached;
  }

  // 3. Check lessonData for pre-defined term popups
  for (const [, lesson] of Object.entries(lessonData)) {
    const term = lesson.terms.find((t) => t.id === termId || t.slug === termId);
    if (term && term.popup[level]) {
      const content: PopupContentType = {
        explanation: term.popup[level].explanation,
        example: term.popup[level].example,
        // Note: lessonData popups don't have diagrams currently
      };
      // Cache it
      memoryCache.set(cacheKey, content);
      setCache(cacheKey, content, POPUP_CACHE_TTL);
      return content;
    }
  }

  // 4. Call API for unknown terms (generates with Claude)
  try {
    // Find lesson context
    let lessonTitle = 'AI Course';
    if (lessonId) {
      const lessonMeta: Record<string, string> = {
        'lesson-01': 'How AI Works',
        'lesson-02': 'Prompt Engineering',
        'lesson-03': 'Embeddings & Vector Search',
        'lesson-04': 'RAG',
        'lesson-05': 'Agents & Tools',
      };
      lessonTitle = lessonMeta[lessonId] || lessonTitle;
    }

    const response = await fetch('/api/popup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        termId,
        term: termId.replace(/-/g, ' '),
        level,
        context: {
          lessonId: lessonId || 'unknown',
          lessonTitle,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content: PopupContentType = data.content;

    // Cache the API response
    memoryCache.set(cacheKey, content);
    setCache(cacheKey, content, POPUP_CACHE_TTL);

    return content;
  } catch (err) {
    console.error('Popup content fetch error:', err);
    // Return fallback content
    return {
      explanation: `Unable to load explanation for "${termId.replace(/-/g, ' ')}". Please try again later.`,
    };
  }
}

export function Popup() {
  const router = useRouter();
  const popupRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const {
    isOpen,
    termId,
    termName,
    position,
    content,
    isLoading,
    closePopup,
    setContent,
    setLoading
  } = usePopupStore();
  const { currentLevel, addExploration, updateExploration, hasExplored } = useUserStore();
  const { currentLessonId } = useNavigationStore();

  // Prevent body scroll when popup is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  // Load content when popup opens
  useEffect(() => {
    if (isOpen && termId) {
      setLoading(true);
      getPopupContent(termId, currentLevel as UserLevel, currentLessonId || undefined)
        .then(setContent)
        .catch(console.error);

      // Track exploration
      if (!hasExplored(termId)) {
        addExploration({
          id: `exp-${Date.now()}`,
          termId,
          termName: termName || termId,
          fromLessonId: currentLessonId || 'unknown',
          fromContext: window.location.pathname,
          popupViewedAt: new Date(),
          quizAttempts: 0,
        });
      } else {
        updateExploration(termId, { popupViewedAt: new Date() });
      }
    }
  }, [isOpen, termId, currentLevel, currentLessonId]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closePopup]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closePopup]);

  // Calculate position
  const getPopupStyle = useCallback(() => {
    if (!position) return {};
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
    const popupWidth = 400;
    const popupHeight = 350;
    
    let left = position.x - popupWidth / 2;
    let top = position.y;
    
    // Keep within viewport horizontally
    if (left < 16) left = 16;
    if (left + popupWidth > viewportWidth - 16) left = viewportWidth - popupWidth - 16;
    
    // If too close to bottom, show above the term
    if (top + popupHeight > viewportHeight - 16) {
      top = position.y - popupHeight - 50;
    }
    
    return { left, top };
  }, [position]);

  const handleLearnMore = () => {
    if (termId) {
      closePopup();
      router.push(`/course/term/${termId}`);
    }
  };

  const handleGotIt = () => {
    closePopup();
  };

  const wasExplored = termId ? hasExplored(termId) : false;
  const [showExploredBadge, setShowExploredBadge] = useState(false);

  // Show badge animation when first exploring a term
  useEffect(() => {
    if (isOpen && termId && !wasExplored) {
      const timer = setTimeout(() => setShowExploredBadge(true), 500);
      return () => clearTimeout(timer);
    }
    setShowExploredBadge(false);
  }, [isOpen, termId, wasExplored]);

  return (
    <AnimatePresence>
      {isOpen && (position || isMobile) && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            onClick={closePopup}
          />

          {/* Popup - Desktop positioned, Mobile centered/bottom sheet */}
          <motion.div
            ref={popupRef}
            initial={isMobile
              ? { opacity: 0, y: '100%' }
              : { opacity: 0, scale: 0.9, y: 10 }
            }
            animate={isMobile
              ? { opacity: 1, y: 0 }
              : { opacity: 1, scale: 1, y: 0 }
            }
            exit={isMobile
              ? { opacity: 0, y: '100%' }
              : { opacity: 0, scale: 0.95, y: -5 }
            }
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            style={isMobile ? {} : getPopupStyle()}
            className={`
              ${isMobile
                ? 'fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col'
                : 'popup-container'
              }
            `}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div className="flex-shrink-0 pt-3 pb-1">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
              </div>
            )}
            {/* Header */}
            <div className={`popup-header ${isMobile ? 'rounded-t-3xl' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  <h3 className="font-semibold capitalize truncate">
                    {termName || termId}
                  </h3>
                  {wasExplored && (
                    <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full flex-shrink-0">
                      <Check className="w-3 h-3" />
                      <span className="hidden sm:inline">Explored</span>
                    </span>
                  )}
                </div>
                <button
                  onClick={closePopup}
                  className="p-2 -mr-1 hover:bg-white/20 rounded-lg transition-colors touch-target flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-1 text-sm text-white/80 capitalize">
                {currentLevel} explanation
              </div>
            </div>

            {/* Content */}
            <div className={`popup-content ${isMobile ? 'flex-1 overflow-y-auto overscroll-contain' : ''}`}>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-4"
                >
                  <SkeletonText lines={3} className="mb-4" />
                  <div className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                </motion.div>
              ) : content ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-4"
                >
                  {/* Explanation */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {content.explanation}
                  </motion.p>

                  {/* Example */}
                  {content.example && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-primary-200 transition-colors"
                    >
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Example: </span>
                        {content.example}
                      </p>
                    </motion.div>
                  )}

                  {/* Diagram */}
                  {content.diagram && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 }}
                      className="mt-3"
                    >
                      <MermaidDiagram chart={content.diagram} />
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center py-4"
                >
                  Content not available
                </motion.p>
              )}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`popup-actions flex-shrink-0 ${isMobile ? 'pb-safe-area-bottom' : ''}`}
            >
              <motion.button
                onClick={handleGotIt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3.5 sm:py-2.5 bg-gray-100 text-gray-700 rounded-xl sm:rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors flex items-center justify-center gap-2 group touch-target"
              >
                <motion.span
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Check className="w-5 h-5 sm:w-4 sm:h-4 group-hover:text-green-600 transition-colors" />
                </motion.span>
                Got it!
              </motion.button>
              <motion.button
                onClick={handleLearnMore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3.5 sm:py-2.5 bg-primary-500 text-white rounded-xl sm:rounded-lg font-medium hover:bg-primary-600 active:bg-primary-700 transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-primary-500/25 touch-target"
              >
                <Sparkles className="w-5 h-5 sm:w-4 sm:h-4" />
                Learn More
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                >
                  <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
