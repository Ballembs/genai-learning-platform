// components/lesson/ExplainLike.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, X, Loader2, ChefHat, Stethoscope, Baby, Briefcase, Code2 } from 'lucide-react';

export interface Persona {
  id: string;
  label: string;
  emoji: string;
  icon: React.ReactNode;
  description: string;
  color: string; // Tailwind bg color for the banner
}

export const PERSONAS: Persona[] = [
  {
    id: 'chef',
    label: 'Chef',
    emoji: '\u{1F468}\u200D\u{1F373}',
    icon: <ChefHat className="w-5 h-5" />,
    description: 'Cooking & kitchen analogies',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'doctor',
    label: 'Doctor',
    emoji: '\u{1FA7A}',
    icon: <Stethoscope className="w-5 h-5" />,
    description: 'Medical & biology analogies',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'kid',
    label: '10-Year-Old',
    emoji: '\u{1F9D2}',
    icon: <Baby className="w-5 h-5" />,
    description: 'Super simple, fun examples',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'manager',
    label: 'Manager',
    emoji: '\u{1F4BC}',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Business & ROI framing',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'developer',
    label: 'Developer',
    emoji: '\u{1F4BB}',
    icon: <Code2 className="w-5 h-5" />,
    description: 'Code & systems analogies',
    color: 'from-green-600 to-emerald-600',
  },
];

interface ExplainLikeButtonProps {
  onSelect: (persona: Persona) => void;
  isLoading: boolean;
  activePersona: Persona | null;
  onClear: () => void;
}

export function ExplainLikeButton({
  onSelect,
  isLoading,
  activePersona,
  onClear,
}: ExplainLikeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // If a persona is active, show the clear button instead
  if (activePersona) {
    return (
      <button
        onClick={onClear}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r ${activePersona.color} rounded-full transition-all hover:shadow-md active:scale-[0.97]`}
        title="Back to original"
      >
        <span>{activePersona.emoji}</span>
        <span className="hidden sm:inline">{activePersona.label} Mode</span>
        <X className="w-3.5 h-3.5 ml-0.5" />
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-full transition-colors disabled:opacity-50"
        title="Explain using different analogies"
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
        ) : (
          <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
        <span className="hidden sm:inline">Explain Like...</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Explain this lesson as a...</p>
              <p className="text-xs text-gray-500 mt-0.5">Same concepts, different perspective</p>
            </div>

            <div className="p-2">
              {PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => {
                    onSelect(persona);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                >
                  <span className="text-xl flex-shrink-0">{persona.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{persona.label}</p>
                    <p className="text-xs text-gray-500">{persona.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Banner shown above lesson content when a persona is active
 */
interface ExplainLikeBannerProps {
  persona: Persona;
  onClear: () => void;
  isLoading: boolean;
}

export function ExplainLikeBanner({ persona, onClear, isLoading }: ExplainLikeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-r ${persona.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-white`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl sm:text-3xl flex-shrink-0">{persona.emoji}</span>
          <div className="min-w-0">
            <p className="font-bold text-sm sm:text-base">
              {isLoading ? 'Regenerating...' : `${persona.label} Mode`}
            </p>
            <p className="text-xs sm:text-sm text-white/80">
              {isLoading
                ? `Rewriting this lesson through a ${persona.label.toLowerCase()}'s perspective...`
                : `This lesson is explained using ${persona.description.toLowerCase()}`}
            </p>
          </div>
        </div>

        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin flex-shrink-0 text-white/70" />
        ) : (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Original</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
