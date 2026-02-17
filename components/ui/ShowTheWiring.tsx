'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/lib/store';

interface WiringStep {
  technique: string;
  lessonSlug?: string;
  description: string;
  icon?: string;
}

interface ShowTheWiringProps {
  label: string;
  steps: WiringStep[];
  compact?: boolean;
}

export function ShowTheWiring({ label, steps, compact = false }: ShowTheWiringProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showWiring } = useUserStore();

  // Don't render if global toggle is off
  if (!showWiring) return null;

  // Compact single-line summary
  const summaryText = steps.map(s => s.technique).join(' → ');

  if (compact && !isExpanded) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsExpanded(true)}
        className="mt-3 pt-3 border-t border-gray-100 w-full text-left group"
      >
        <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary-600 transition-colors">
          <Zap className="w-3 h-3 text-amber-500" />
          <span className="font-mono">{summaryText}</span>
          <ChevronRight className="w-3 h-3 ml-auto opacity-50 group-hover:opacity-100" />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`${compact ? 'mt-3 pt-3 border-t border-gray-100' : 'mb-6'}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors mb-3"
      >
        <Zap className="w-4 h-4 text-amber-500" />
        <span>{label}</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 ml-1" />
        ) : (
          <ChevronRight className="w-4 h-4 ml-1" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-800 rounded-xl p-4 overflow-x-auto"
          >
            {/* Desktop: horizontal flow */}
            <div className="hidden md:flex items-stretch gap-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <StepCard step={step} />
                  {index < steps.length - 1 && (
                    <div className="flex items-center px-2">
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-cyan-400"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: vertical stack */}
            <div className="md:hidden space-y-2">
              {steps.map((step, index) => (
                <div key={index}>
                  <StepCard step={step} />
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ChevronDown className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StepCard({ step }: { step: WiringStep }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        bg-slate-700/50 border border-slate-600 rounded-lg p-3 min-w-[160px]
        ${step.lessonSlug ? 'hover:border-cyan-500 hover:bg-slate-700 transition-colors cursor-pointer' : ''}
      `}
    >
      <div className="flex items-center gap-2 mb-1">
        {step.icon && <span className="text-base">{step.icon}</span>}
        <span className="font-mono text-sm font-semibold text-cyan-300">
          {step.technique}
        </span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        {step.description}
      </p>
      {step.lessonSlug && (
        <p className="text-[10px] text-cyan-500 mt-1 font-mono">
          → Click to learn more
        </p>
      )}
    </motion.div>
  );

  if (step.lessonSlug) {
    return (
      <Link href={`/course/${step.lessonSlug}`}>
        {content}
      </Link>
    );
  }

  return content;
}
