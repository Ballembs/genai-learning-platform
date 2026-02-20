// app/course/projects/[projectSlug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Check, Clock, Loader2, Lightbulb,
  Save, RotateCcw, ExternalLink, CheckCircle, Circle
} from 'lucide-react';
import { projectBySlug } from '@/content/projects';

interface StepState {
  content: string;
  reviewed: boolean;
  passed: boolean;
  feedback: string | null;
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.projectSlug as string;
  const project = projectBySlug[slug];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStates, setStepStates] = useState<Record<string, StepState>>({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    if (!project) return;
    const saved = localStorage.getItem(`project-${project.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStepStates(parsed.stepStates || {});
        setCurrentStepIndex(parsed.currentStepIndex || 0);
      } catch { /* ignore */ }
    }
  }, [project]);

  // Save progress
  useEffect(() => {
    if (!project) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(`project-${project.id}`, JSON.stringify({
        stepStates,
        currentStepIndex,
      }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [stepStates, currentStepIndex, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Project not found</p>
          <Link href="/course/projects" className="text-primary-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = project.steps[currentStepIndex];
  const currentState = stepStates[currentStep.id] || {
    content: currentStep.starterCode || '',
    reviewed: false,
    passed: false,
    feedback: null,
  };

  const completedSteps = project.steps.filter(s => stepStates[s.id]?.passed).length;

  const updateStepContent = (content: string) => {
    setStepStates(prev => ({
      ...prev,
      [currentStep.id]: { ...currentState, content },
    }));
  };

  const handleReview = async () => {
    if (currentState.content.trim().length < 30 || isReviewing) return;
    setIsReviewing(true);
    setError(null);

    try {
      const res = await fetch('/api/review-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stepId: currentStep.id,
          projectTitle: project.title,
          stepTitle: currentStep.title,
          instructions: currentStep.instructions,
          deliverable: currentStep.deliverable,
          reviewCriteria: currentStep.reviewCriteria,
          userWork: currentState.content,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Review failed');
      }

      const result = await res.json();
      setStepStates(prev => ({
        ...prev,
        [currentStep.id]: {
          ...currentState,
          reviewed: true,
          passed: result.passed,
          feedback: result.feedback,
        },
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Review failed. Please try again.');
    } finally {
      setIsReviewing(false);
    }
  };

  const canAdvance = currentState.passed;
  const isLastStep = currentStepIndex === project.steps.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/course/projects"
              className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors text-sm flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              Projects
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-sm font-medium text-gray-900 truncate hidden sm:block">
              {project.icon} {project.title}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 font-medium">
            {completedSteps}/{project.steps.length} steps
          </div>
        </div>

        {/* Step progress bar */}
        <div className="flex">
          {project.steps.map((step, i) => {
            const state = stepStates[step.id];
            const isActive = i === currentStepIndex;
            const isPassed = state?.passed;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(i)}
                className={`flex-1 h-1.5 transition-colors ${
                  isPassed ? 'bg-green-500' :
                  isActive ? 'bg-primary-500' :
                  'bg-gray-200'
                }`}
                title={`Step ${i + 1}: ${step.title}`}
              />
            );
          })}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Instructions */}
          <div className="space-y-4">
            {/* Step header */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentState.passed ? 'bg-green-500 text-white' : 'bg-primary-100 text-primary-600'
                }`}>
                  {currentState.passed ? <Check className="w-4 h-4" /> : currentStepIndex + 1}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{currentStep.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{currentStep.estimatedMinutes} min
                    </span>
                    <span>•</span>
                    <Link
                      href={`/course/${currentStep.lessonSlug}`}
                      className="text-primary-600 hover:underline flex items-center gap-1"
                    >
                      {currentStep.lessonTitle}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Instructions rendered as markdown-ish */}
              <div className="prose prose-sm max-w-none text-gray-700 mt-4"
                   dangerouslySetInnerHTML={{
                     __html: currentStep.instructions
                       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                       .replace(/\n\n/g, '</p><p>')
                       .replace(/^/, '<p>')
                       .replace(/$/, '</p>')
                       .replace(/(\d+)\.\s/g, '<br/>$1. ')
                   }}
              />
            </div>

            {/* Hints */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
              <button
                onClick={() => setHintsRevealed(prev => Math.min(prev + 1, currentStep.hints.length))}
                disabled={hintsRevealed >= currentStep.hints.length}
                className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 disabled:opacity-40 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                {hintsRevealed === 0 ? 'Need a hint?' : `Hint ${hintsRevealed}/${currentStep.hints.length}`}
              </button>

              <AnimatePresence>
                {hintsRevealed > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2"
                  >
                    {currentStep.hints.slice(0, hintsRevealed).map((hint, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-sm text-amber-800 p-3 bg-amber-50 rounded-lg border border-amber-100"
                      >
                        {hint}
                      </motion.p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => { setCurrentStepIndex(prev => prev - 1); setHintsRevealed(0); }}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {isLastStep && canAdvance ? (
                <Link
                  href="/course/projects"
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Project Complete!
                </Link>
              ) : (
                <button
                  onClick={() => { setCurrentStepIndex(prev => prev + 1); setHintsRevealed(0); }}
                  disabled={!canAdvance}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Workspace */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">Your Work</h3>
                <span className="text-xs text-gray-400">Auto-saved</span>
              </div>

              <textarea
                value={currentState.content}
                onChange={(e) => updateStepContent(e.target.value)}
                rows={16}
                className="w-full p-4 border border-gray-200 rounded-xl text-sm font-mono leading-relaxed resize-y focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-colors bg-gray-50"
                placeholder="Start writing here..."
                disabled={isReviewing}
              />

              {/* Review criteria (shown as checklist) */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs font-medium text-gray-500 mb-2">Review criteria:</p>
                <ul className="space-y-1">
                  {currentStep.reviewCriteria.map((criteria, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                      <Circle className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-300" />
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleReview}
                  disabled={currentState.content.trim().length < 30 || isReviewing}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                  {isReviewing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Reviewing...
                    </>
                  ) : currentState.reviewed ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      Re-submit
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Submit for Review
                    </>
                  )}
                </button>

                <span className="text-xs text-gray-400">
                  {currentState.content.trim().length} chars
                  {currentState.content.trim().length < 30 && ' (min 30)'}
                </span>
              </div>

              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {currentState.feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl border-2 ${
                    currentState.passed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <p className="font-bold text-sm mb-2">
                    {currentState.passed ? '\u2705 Step Passed!' : '\u26A0\uFE0F Needs Improvement'}
                  </p>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {currentState.feedback}
                  </div>
                  {currentState.passed && !isLastStep && (
                    <button
                      onClick={() => { setCurrentStepIndex(prev => prev + 1); setHintsRevealed(0); }}
                      className="mt-3 flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                    >
                      Continue to next step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
