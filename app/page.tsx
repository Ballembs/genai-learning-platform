// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  Brain, 
  Zap, 
  ChevronRight,
  GraduationCap,
  Code,
  Briefcase
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store';
import type { UserLevel, UserGoal } from '@/types';
import { USER_GOALS } from '@/types';

const levels = [
  {
    id: 'beginner' as UserLevel,
    title: 'Beginner',
    subtitle: 'New to AI',
    description: 'Perfect for high schoolers, students, or anyone starting their AI journey. We use simple analogies and everyday examples.',
    icon: GraduationCap,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    features: ['Simple analogies', 'Visual explanations', 'No prerequisites'],
  },
  {
    id: 'intermediate' as UserLevel,
    title: 'Intermediate',
    subtitle: 'Some tech background',
    description: 'For developers, analysts, or tech-savvy professionals who want practical AI knowledge with code examples.',
    icon: Code,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    features: ['Code examples', 'Technical depth', 'Practical applications'],
  },
  {
    id: 'advanced' as UserLevel,
    title: 'Advanced',
    subtitle: 'Deep technical dive',
    description: 'For ML engineers, researchers, or experts who want comprehensive technical details and implementation specifics.',
    icon: Briefcase,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    features: ['Implementation details', 'Architecture deep-dives', 'Research references'],
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Infinite Exploration',
    description: 'Click any term to go deeper. Every concept is explorable.',
  },
  {
    icon: BookOpen,
    title: 'Nothing Gets Lost',
    description: 'Every exploration is saved to your profile. Pick up where you left off.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Clarity',
    description: 'Confused? Ask the AI assistant. It knows exactly what you\'re learning.',
  },
  {
    icon: Zap,
    title: 'Adaptive Content',
    description: 'Switch levels anytime. Content adapts to your expertise.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { setLevel, setGoal, currentLevel, currentGoal } = useUserStore();
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>(currentLevel);
  const [selectedGoal, setSelectedGoal] = useState<UserGoal | null>(currentGoal || null);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (!selectedGoal) return;
    setIsStarting(true);
    setLevel(selectedLevel);
    setGoal(selectedGoal);
    setTimeout(() => {
      router.push('/course');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenAI Academy</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#levels" className="text-gray-600 hover:text-gray-900 transition-colors">
              Levels
            </a>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Generative AI
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                From Zero to Hero
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The learning platform where no question goes unanswered and no concept is left unexplored. 
              Click any term to dive deeper. Your journey is saved.
            </p>
          </motion.div>

          {/* Quick Features */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <feature.icon className="w-8 h-8 text-primary-500 mb-2 mx-auto" />
                <h3 className="font-medium text-gray-900 text-sm">{feature.title}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Level Selection */}
      <section id="levels" className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Choose Your Level
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Start at your comfort level. You can always change it later, and all content adapts instantly.
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
                  <p className="text-gray-600 text-sm mb-4">{level.description}</p>
                  <ul className="space-y-2">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Goal Selection - appears after level is selected */}
          <AnimatePresence>
            {selectedLevel && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                  What are you building?
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                  Every lesson will connect to your goal. Pick what excites you most.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {(Object.entries(USER_GOALS) as [UserGoal, typeof USER_GOALS[UserGoal]][]).map(([id, goal]) => (
                    <motion.button
                      key={id}
                      onClick={() => setSelectedGoal(id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        p-5 rounded-xl border-2 text-left transition-all duration-200
                        ${selectedGoal === id
                          ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                        }
                      `}
                    >
                      <span className="text-3xl block mb-2">{goal.emoji}</span>
                      <h3 className="font-semibold text-gray-900">{goal.label}</h3>
                      <p className="text-sm text-gray-500 mt-1">{goal.tagline}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start Button - only shows when both level AND goal are selected */}
          <AnimatePresence>
            {selectedLevel && selectedGoal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.button
                  onClick={handleStart}
                  disabled={isStarting}
                  className={`
                    px-8 py-4 rounded-xl font-semibold text-lg
                    bg-gradient-to-r from-primary-500 to-primary-600 text-white
                    hover:shadow-lg hover:scale-105 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
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
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Master
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { num: 1, title: 'How AI Works', desc: 'Tokens, generation, the magic behind ChatGPT' },
              { num: 2, title: 'Prompt Engineering', desc: 'Control AI output like a pro' },
              { num: 3, title: 'Embeddings', desc: 'Find meaning in numbers' },
              { num: 4, title: 'RAG', desc: 'Teach AI your data' },
              { num: 5, title: 'Agents', desc: 'AI that takes action' },
            ].map((lesson, index) => (
              <motion.div
                key={lesson.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center mb-3">
                  {lesson.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                <p className="text-sm text-gray-500">{lesson.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-900 text-white">
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
            © 2025 GenAI Academy. The greatest learning app.
          </p>
        </div>
      </footer>
    </div>
  );
}
