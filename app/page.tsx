// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  ChevronRight,
  GraduationCap,
  Code,
  Briefcase,
  Clock,
  MousePointerClick,
  Layers,
  TrendingUp,
  Users,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { useUserStore } from '@/lib/store';
import type { UserLevel } from '@/types';

// ============================================
// INTERACTIVE PREVIEW COMPONENT
// ============================================

function InteractivePreview() {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const terms: Record<string, { name: string; explanation: string }> = {
    'next-token': {
      name: 'Next Token Prediction',
      explanation: 'AI generates text one piece at a time by predicting what word most likely comes next — like autocomplete on your phone, but trained on the entire internet.',
    },
    'tokens': {
      name: 'Tokens',
      explanation: 'The pieces AI reads — like LEGO bricks that make up words. "Hello" is 1 token, but "ChatGPT" becomes 3 tokens: "Chat", "G", "PT".',
    },
    'transformer': {
      name: 'Transformer',
      explanation: 'The architecture that makes modern AI work. It lets AI look at all words simultaneously and understand how they relate to each other.',
    },
    'hallucination': {
      name: 'Hallucination',
      explanation: 'When AI confidently states something false. It happens because AI optimizes for "sounds right" not "is true" — like a student who\'s great at writing essays but didn\'t study.',
    },
  };

  const ClickableTerm = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <button
      onClick={() => setActiveTerm(activeTerm === id ? null : id)}
      className={`
        text-primary-600 border-b border-dashed border-primary-400 cursor-pointer
        hover:text-primary-700 hover:border-primary-500 transition-colors
        ${activeTerm === id ? 'bg-primary-50 px-1 -mx-1 rounded' : ''}
      `}
    >
      {children}
    </button>
  );

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Click any highlighted term. This is how every lesson works.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            When you ask ChatGPT a question, it doesn&apos;t actually &ldquo;think.&rdquo; It predicts the most likely{' '}
            <ClickableTerm id="next-token">next token</ClickableTerm> — one word-piece at a time.
            The AI reads your message as <ClickableTerm id="tokens">tokens</ClickableTerm>,
            processes them through a <ClickableTerm id="transformer">transformer</ClickableTerm> architecture,
            and generates a response. If the AI confidently states something false, that&apos;s called a{' '}
            <ClickableTerm id="hallucination">hallucination</ClickableTerm>.
          </p>

          {/* Explanation card */}
          {activeTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                {terms[activeTerm].name}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {terms[activeTerm].explanation}
              </p>
              <p className="text-xs text-primary-600 mt-3 flex items-center gap-1">
                <MousePointerClick className="w-3 h-3" />
                This is what every term does in our lessons →
              </p>
            </motion.div>
          )}

          {!activeTerm && (
            <p className="text-sm text-gray-400 mt-4 text-center">
              ↑ Click any blue term above to see it in action
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// LEVEL DATA
// ============================================

const levels = [
  {
    id: 'beginner' as UserLevel,
    title: 'Beginner',
    subtitle: 'New to AI',
    description: 'Simple analogies and everyday examples. No technical prerequisites.',
    icon: GraduationCap,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'intermediate' as UserLevel,
    title: 'Intermediate',
    subtitle: 'Some tech background',
    description: 'Code examples and technical depth. For developers and analysts.',
    icon: Code,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    id: 'advanced' as UserLevel,
    title: 'Advanced',
    subtitle: 'Deep technical dive',
    description: 'Implementation details and research references. For ML engineers.',
    icon: Briefcase,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
];

// ============================================
// LESSON DATA
// ============================================

const lessons = [
  {
    num: 1,
    title: 'How AI Works',
    outcome: 'Understand what happens when you type into ChatGPT — tokens, prediction, why AI hallucinates',
    time: 25,
    terms: 8,
  },
  {
    num: 2,
    title: 'Prompt Engineering',
    outcome: 'Write prompts that get exactly what you want — system prompts, few-shot, chain-of-thought',
    time: 30,
    terms: 10,
  },
  {
    num: 3,
    title: 'Embeddings & Search',
    outcome: 'Learn how AI finds meaning in text — vectors, similarity search, semantic understanding',
    time: 35,
    terms: 9,
  },
  {
    num: 4,
    title: 'RAG',
    outcome: 'Teach AI your own data — document chunking, retrieval, grounded answers',
    time: 40,
    terms: 10,
  },
  {
    num: 5,
    title: 'Agents & Tools',
    outcome: 'Build AI that takes action — tool calling, ReAct pattern, multi-step reasoning',
    time: 45,
    terms: 8,
  },
];

// ============================================
// PERSONAS
// ============================================

const personas = [
  {
    icon: Users,
    title: 'Tech Leaders & Managers',
    description: 'You\'re evaluating AI for your team. You need to understand what\'s possible, what\'s hype, and what questions to ask your engineers.',
  },
  {
    icon: Code,
    title: 'Developers New to AI',
    description: 'You can code, but LLMs are new territory. You want practical understanding — how tokens work, when to use RAG vs fine-tuning, how agents are built.',
  },
  {
    icon: Lightbulb,
    title: 'Curious Professionals',
    description: 'You use ChatGPT daily but want to understand what\'s actually happening. No PhD required — start at beginner level and go as deep as you want.',
  },
];

// ============================================
// DIFFERENTIATORS
// ============================================

const differentiators = [
  {
    icon: MousePointerClick,
    title: 'Click anything you don\'t understand',
    description: 'Every technical term is clickable. Get a quick explanation, or dive into a full deep-dive page with diagrams, code examples, and quizzes. Never get stuck.',
  },
  {
    icon: Layers,
    title: 'Three levels, one platform',
    description: 'Switch between Beginner, Intermediate, and Advanced anytime. Same concepts explained three different ways — from simple analogies to research-level implementation.',
  },
  {
    icon: TrendingUp,
    title: 'Your progress, your pace',
    description: 'Every term you explore, every quiz you take — all tracked. Pick up where you left off. See your knowledge grow on your profile.',
  },
];

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function LandingPage() {
  const router = useRouter();
  const { setLevel, currentLevel } = useUserStore();
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>(currentLevel);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setLevel(selectedLevel);
    setTimeout(() => {
      router.push('/course');
    }, 300);
  };

  const scrollToLevels = () => {
    document.getElementById('level-selection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-4 sm:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenAI Academy</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/course/01-how-ai-works"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm hidden sm:block"
            >
              Preview Lesson 1
            </Link>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Understand AI — From ChatGPT to Building Your Own
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              5 lessons that take you from &ldquo;How does AI even work?&rdquo; to understanding tokens, embeddings, RAG, and agents. Every concept is clickable. Every question has an answer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <motion.button
                onClick={scrollToLevels}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                Start Learning Free
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <Link
                href="/course/01-how-ai-works"
                className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Preview Lesson 1
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-sm text-gray-400">
              No account needed · 5 lessons · Works on mobile · Free
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <InteractivePreview />

      {/* What You'll Learn Section */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You&apos;ll Actually Learn
            </h2>
            <p className="text-gray-600">
              Each lesson includes interactive terms, diagrams, code examples, and quizzes.
            </p>
          </motion.div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 sm:w-48 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                      {lesson.num}
                    </div>
                    <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                  </div>
                  <p className="text-gray-600 flex-1">{lesson.outcome}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.time} min
                    </span>
                    <span className="flex items-center gap-1">
                      <MousePointerClick className="w-4 h-4" />
                      {lesson.terms} terms
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who This Is For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((persona, index) => (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <persona.icon className="w-10 h-10 text-primary-500 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-3">{persona.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{persona.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different Section */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes This Different
            </h2>
          </motion.div>

          <div className="space-y-8">
            {differentiators.map((diff, index) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <diff.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{diff.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{diff.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Level Selection */}
      <section id="level-selection" className="py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready? Pick your starting level.
            </h2>
            <p className="text-gray-600">
              You can switch anytime. All content adapts instantly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSelectedLevel(level.id)}
                  className={`
                    w-full p-6 rounded-2xl border-2 text-left transition-all duration-200
                    ${selectedLevel === level.id
                      ? `${level.borderColor} ${level.bgColor} shadow-lg scale-[1.02]`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl bg-gradient-to-br ${level.color}
                    flex items-center justify-center mb-4
                  `}>
                    <level.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {level.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{level.subtitle}</p>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.button
              onClick={handleStart}
              disabled={isStarting}
              className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {isStarting ? (
                'Loading...'
              ) : (
                <>
                  Start Learning as {levels.find(l => l.id === selectedLevel)?.title}
                  <ChevronRight className="inline-block ml-2 w-5 h-5" />
                </>
              )}
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              No account required. Your progress is saved locally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold">GenAI Academy</span>
          </div>
          <p className="text-gray-400 text-sm">
            Built with the concepts it teaches. Learn AI by exploring AI.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © 2025-2026 GenAI Academy
          </p>
        </div>
      </footer>
    </div>
  );
}
