'use client';

// app/profile/page.tsx
// Comprehensive user learning dashboard

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Clock,
  Trophy,
  CheckCircle,
  ExternalLink,
  LogOut,
  User,
  Mail,
  Shield,
  Loader2,
  MessageSquare,
  Settings,
  Bell,
  BellOff,
  Target,
  TrendingUp,
  Zap,
  Network,
  Calendar,
  X,
} from 'lucide-react';
import { useUserStore, useChatStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { lessonData } from '@/content/lessons';
import { KnowledgeGraph } from '@/components/diagrams/KnowledgeGraph';
import type { UserLevel, Exploration } from '@/types';

// ============================================
// CONSTANTS
// ============================================

const levelConfig: Record<UserLevel, { label: string; color: string; bgColor: string; borderColor: string }> = {
  beginner: { label: 'Beginner', color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-300' },
  intermediate: { label: 'Intermediate', color: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-300' },
  advanced: { label: 'Advanced', color: 'text-pink-700', bgColor: 'bg-pink-100', borderColor: 'border-pink-300' },
};

const lessonNames: Record<string, string> = {
  'lesson-01': 'How AI Works',
  'lesson-02': 'Prompt Engineering',
  'lesson-03': 'Embeddings',
  'lesson-04': 'RAG',
  'lesson-05': 'Agents',
  'lesson-06': 'Agentic AI Patterns',
  'lesson-07': 'Agentic AI in Practice',
  'lesson-08': 'MCP Protocol',
};

const lessonSlugs: Record<string, string> = {
  'lesson-01': '01-how-ai-works',
  'lesson-02': '02-prompt-engineering',
  'lesson-03': '03-embeddings',
  'lesson-04': '04-rag',
  'lesson-05': '05-agents',
  'lesson-06': '06-agentic-patterns',
  'lesson-07': '07-agentic-practice',
  'lesson-08': '08-mcp',
};

type TabType = 'overview' | 'explorations' | 'chat' | 'settings';

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProfilePage() {
  const router = useRouter();
  const { profile, currentLevel, setLevel } = useUserStore();
  const { messages, clearMessages } = useChatStore();
  const { user, isLoading: authLoading, signOut, isConfigured } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Calculate comprehensive stats
  const stats = useMemo(() => {
    const explorations = profile?.explorations || [];
    const lessonProgress = profile?.lessonProgress || [];

    // Term quizzes (from explorations/deep dives)
    const termQuizzesWithScores = explorations.filter(e => e.quizScore !== undefined);
    const termQuizzesPassed = termQuizzesWithScores.filter(e => e.quizScore! >= 70).length;
    const termQuizAttempts = explorations.reduce((acc, e) => acc + (e.quizAttempts || 0), 0);

    // Lesson quizzes
    const lessonQuizzesWithScores = lessonProgress.filter(p => p.quizScore !== undefined);
    const lessonQuizzesPassed = lessonQuizzesWithScores.filter(p => p.quizScore! >= 70).length;
    const lessonQuizAttempts = lessonProgress.reduce((acc, p) => acc + (p.quizAttempts || 0), 0);

    // Combined quiz stats
    const allQuizScores = [
      ...termQuizzesWithScores.map(e => e.quizScore!),
      ...lessonQuizzesWithScores.map(p => p.quizScore!),
    ];

    const totalQuizzesPassed = termQuizzesPassed + lessonQuizzesPassed;
    const totalQuizAttempts = termQuizAttempts + lessonQuizAttempts;
    const avgQuizScore = allQuizScores.length > 0
      ? Math.round(allQuizScores.reduce((acc, s) => acc + s, 0) / allQuizScores.length)
      : 0;
    const bestQuizScore = allQuizScores.length > 0 ? Math.max(...allQuizScores) : 0;

    return {
      termsExplored: explorations.length,
      deepDivesCompleted: explorations.filter(e => e.deepDiveViewedAt).length,
      quizzesPassed: totalQuizzesPassed,
      lessonsStarted: lessonProgress.length,
      lessonsCompleted: lessonProgress.filter(p => p.percentComplete === 100).length,
      totalTimeMinutes: lessonProgress.reduce((acc, p) => acc + p.timeSpentMinutes, 0),
      avgQuizScore,
      bestQuizScore,
      totalQuizAttempts,
      totalQuizzesTaken: allQuizScores.length,
    };
  }, [profile]);

  // Group explorations by lesson
  const explorationsByLesson = useMemo(() => {
    const grouped: Record<string, Exploration[]> = {};
    (profile?.explorations || []).forEach(exp => {
      const lessonId = exp.fromLessonId || 'other';
      if (!grouped[lessonId]) {
        grouped[lessonId] = [];
      }
      grouped[lessonId].push(exp);
    });
    // Sort each group by date
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        const dateA = a.popupViewedAt ? new Date(a.popupViewedAt).getTime() : 0;
        const dateB = b.popupViewedAt ? new Date(b.popupViewedAt).getTime() : 0;
        return dateB - dateA;
      });
    });
    return grouped;
  }, [profile?.explorations]);

  // Knowledge graph data
  const knowledgeGraphData = useMemo(() => {
    const nodes: Array<{ id: string; label: string; type: 'lesson' | 'term'; explored: boolean; quizScore?: number }> = [];
    const edges: Array<{ from: string; to: string; type: 'contains' | 'related' }> = [];

    // Add lesson nodes
    const exploredLessons = new Set(
      (profile?.explorations || []).map(e => e.fromLessonId).filter(Boolean)
    );
    Object.keys(lessonNames).forEach(lessonId => {
      nodes.push({
        id: lessonId,
        label: lessonNames[lessonId] || lessonId,
        type: 'lesson',
        explored: exploredLessons.has(lessonId),
      });
    });

    // Add term nodes and lesson→term edges
    (profile?.explorations || []).forEach(exp => {
      nodes.push({
        id: exp.termId,
        label: exp.termName,
        type: 'term',
        explored: true,
        quizScore: exp.quizScore,
      });
      if (exp.fromLessonId) {
        edges.push({ from: exp.fromLessonId, to: exp.termId, type: 'contains' });
      }
    });

    // Add related term edges from lesson data
    const exploredTermIds = new Set(nodes.filter(n => n.type === 'term').map(n => n.id));
    Object.values(lessonData).forEach(lesson => {
      lesson.terms.forEach(term => {
        if (exploredTermIds.has(term.id)) {
          term.relatedTerms.forEach(relatedId => {
            if (exploredTermIds.has(relatedId)) {
              // Avoid duplicate edges
              const exists = edges.some(e =>
                (e.from === term.id && e.to === relatedId) ||
                (e.from === relatedId && e.to === term.id)
              );
              if (!exists) {
                edges.push({ from: term.id, to: relatedId, type: 'related' });
              }
            }
          });
        }
      });
    });

    return { nodes, edges };
  }, [profile?.explorations]);

  // Combined quiz history (lesson + term quizzes)
  interface QuizHistoryItem {
    id: string;
    type: 'lesson' | 'term';
    name: string;
    score: number;
    attempts: number;
    href: string;
    lastAttemptAt?: Date;
  }

  const quizHistory = useMemo(() => {
    const items: QuizHistoryItem[] = [];

    // Add lesson quizzes
    (profile?.lessonProgress || []).forEach(progress => {
      if (progress.quizScore !== undefined) {
        items.push({
          id: `lesson-${progress.lessonId}`,
          type: 'lesson',
          name: lessonNames[progress.lessonId] || progress.lessonId,
          score: progress.quizScore,
          attempts: progress.quizAttempts || 1,
          href: `/course/${progress.lessonId.replace('lesson-', '')}`,
          lastAttemptAt: progress.lastAccessedAt,
        });
      }
    });

    // Add term quizzes (from explorations/deep dives)
    (profile?.explorations || []).forEach(exp => {
      if (exp.quizScore !== undefined) {
        items.push({
          id: `term-${exp.termId}`,
          type: 'term',
          name: exp.termName,
          score: exp.quizScore,
          attempts: exp.quizAttempts || 1,
          href: `/course/term/${exp.termId}`,
          lastAttemptAt: exp.deepDiveViewedAt || exp.popupViewedAt,
        });
      }
    });

    // Sort by most recent first
    items.sort((a, b) => {
      const dateA = a.lastAttemptAt ? new Date(a.lastAttemptAt).getTime() : 0;
      const dateB = b.lastAttemptAt ? new Date(b.lastAttemptAt).getTime() : 0;
      return dateB - dateA;
    });

    return items;
  }, [profile?.lessonProgress, profile?.explorations]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    router.push('/');
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show sign-in prompt for unauthenticated users when Supabase is configured
  // If Supabase is NOT configured, show profile with localStorage data
  if (isConfigured && !user && !authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Sign in to view your profile
          </h1>
          <p className="text-slate-400 mb-8">
            Your learning progress, explorations, and quiz results will be saved here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Create Account
            </Link>
          </div>
          <Link
            href="/course"
            className="inline-block mt-6 text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            Continue as Guest →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Link
                href="/course"
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors touch-target flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Course</span>
              </Link>
              <div className="h-6 w-px bg-slate-700 hidden sm:block" />
              <h1 className="font-semibold text-white text-sm sm:text-base truncate">Dashboard</h1>
            </div>
            <Link href="/" className="flex items-center gap-2 touch-target">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 min-w-max">
            {[
              { id: 'overview' as TabType, label: 'Overview', icon: TrendingUp },
              { id: 'explorations' as TabType, label: 'Explorations', icon: Sparkles },
              { id: 'chat' as TabType, label: 'Chat', icon: MessageSquare },
              { id: 'settings' as TabType, label: 'Settings', icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap touch-target ${
                  activeTab === tab.id
                    ? 'text-cyan-400 border-cyan-400'
                    : 'text-slate-400 border-transparent hover:text-white active:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="space-y-3 sm:space-y-4">
                {/* Learning Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <StatCard
                    icon={Sparkles}
                    value={stats.termsExplored}
                    label="Terms Explored"
                    color="cyan"
                    delay={0}
                  />
                  <StatCard
                    icon={BookOpen}
                    value={stats.deepDivesCompleted}
                    label="Deep Dives"
                    color="purple"
                    delay={0.1}
                  />
                  <StatCard
                    icon={Trophy}
                    value={stats.quizzesPassed}
                    label="Quizzes Passed"
                    color="green"
                    delay={0.2}
                  />
                  <StatCard
                    icon={Clock}
                    value={stats.totalTimeMinutes}
                    label="Minutes Learned"
                    color="amber"
                    delay={0.3}
                  />
                </div>

                {/* Quiz Stats */}
                {stats.totalQuizzesTaken > 0 && (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <StatCard
                      icon={Target}
                      value={stats.avgQuizScore}
                      label="Avg Quiz Score"
                      color="cyan"
                      delay={0.4}
                      suffix="%"
                    />
                    <StatCard
                      icon={Trophy}
                      value={stats.bestQuizScore}
                      label="Best Score"
                      color="green"
                      delay={0.5}
                      suffix="%"
                    />
                    <StatCard
                      icon={Zap}
                      value={stats.totalQuizAttempts}
                      label="Quiz Attempts"
                      color="purple"
                      delay={0.6}
                    />
                  </div>
                )}
              </div>

              {/* Progress & Graph Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Lesson Progress */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Lesson Progress
                  </h2>
                  {profile?.lessonProgress && profile.lessonProgress.length > 0 ? (
                    <div className="space-y-4">
                      {profile.lessonProgress.map((progress, index) => (
                        <motion.div
                          key={progress.lessonId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-300">
                              {lessonNames[progress.lessonId] || progress.lessonId}
                            </span>
                            <motion.span
                              className="text-sm text-slate-500"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            >
                              {progress.percentComplete}%
                            </motion.span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative group">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.percentComplete}%` }}
                              transition={{
                                duration: 0.8,
                                delay: index * 0.1 + 0.2,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative"
                            >
                              {/* Shimmer effect on hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                              {/* Glow at the end */}
                              {progress.percentComplete > 0 && (
                                <motion.div
                                  className="absolute right-0 top-0 w-2 h-full bg-white/40 rounded-full"
                                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                              )}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Target className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>Start a lesson to track progress</p>
                    </div>
                  )}
                </div>

                {/* Knowledge Graph */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Network className="w-5 h-5 text-purple-400" />
                    Knowledge Map
                  </h2>
                  <KnowledgeGraph
                    nodes={knowledgeGraphData.nodes}
                    edges={knowledgeGraphData.edges}
                    height={280}
                    onNodeClick={(id, type) => {
                      if (type === 'lesson') {
                        router.push(`/course/${lessonSlugs[id] || id}`);
                      } else {
                        router.push(`/course/term/${id}`);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Recent Activity
                </h2>
                {profile?.explorations && profile.explorations.length > 0 ? (
                  <div className="space-y-3">
                    {profile.explorations.slice(0, 5).map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <Link
                          href={`/course/term/${exp.termId}`}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors"
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.4 }}
                            >
                              <Sparkles className="w-4 h-4 text-cyan-400" />
                            </motion.div>
                            <div>
                              <p className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                                {exp.termName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {formatDate(exp.popupViewedAt)}
                              </p>
                            </div>
                          </div>
                          <motion.div
                            className="text-slate-500 group-hover:text-cyan-400"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Zap className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>No activity yet. Start exploring!</p>
                    <Link href="/course" className="text-cyan-400 hover:underline text-sm mt-2 inline-block">
                      Go to Course
                    </Link>
                  </div>
                )}
              </div>

              {/* Quiz Scores */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  Quiz Scores
                  {quizHistory.length > 0 && (
                    <span className="text-sm font-normal text-slate-500">
                      ({quizHistory.length} quiz{quizHistory.length !== 1 ? 'zes' : ''})
                    </span>
                  )}
                </h2>

                {quizHistory.length > 0 ? (
                  <>
                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-white">{stats.avgQuizScore}%</p>
                        <p className="text-xs text-slate-500">Average</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-green-400">{stats.bestQuizScore}%</p>
                        <p className="text-xs text-slate-500">Best Score</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-cyan-400">{stats.totalQuizAttempts}</p>
                        <p className="text-xs text-slate-500">Attempts</p>
                      </div>
                    </div>

                    {/* Quiz List */}
                    <div className="space-y-3">
                      {quizHistory.map((quiz, index) => (
                        <motion.div
                          key={quiz.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={quiz.href}
                            className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                quiz.type === 'lesson'
                                  ? 'bg-cyan-500/20'
                                  : 'bg-purple-500/20'
                              }`}>
                                {quiz.type === 'lesson' ? (
                                  <BookOpen className="w-5 h-5 text-cyan-400" />
                                ) : (
                                  <Sparkles className="w-5 h-5 text-purple-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-white group-hover:text-cyan-400 transition-colors truncate">
                                  {quiz.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {quiz.type === 'lesson' ? 'Lesson Quiz' : 'Deep Dive Quiz'}
                                  {quiz.attempts > 1 && ` · ${quiz.attempts} attempts`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className={`
                                text-sm font-semibold px-3 py-1 rounded-full
                                ${quiz.score >= 70
                                  ? 'bg-green-500/20 text-green-400'
                                  : quiz.score >= 50
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-red-500/20 text-red-400'
                                }
                              `}>
                                {quiz.score}%
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Trophy className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="mb-1">No quiz scores yet</p>
                    <p className="text-sm text-slate-600">
                      Complete a lesson or deep dive quiz to see your scores here!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Explorations Tab */}
          {activeTab === 'explorations' && (
            <motion.div
              key="explorations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {Object.keys(explorationsByLesson).length > 0 ? (
                Object.entries(explorationsByLesson).map(([lessonId, explorations]) => (
                  <div key={lessonId} className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      {lessonNames[lessonId] || 'Other Explorations'}
                      <span className="text-sm font-normal text-slate-500">
                        ({explorations.length} terms)
                      </span>
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {explorations.map(exp => (
                        <Link
                          key={exp.id}
                          href={`/course/term/${exp.termId}`}
                          className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                                {exp.termName}
                              </p>
                              <div className="flex gap-2 mt-1">
                                {exp.deepDiveViewedAt && (
                                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                                    Deep Dive
                                  </span>
                                )}
                                {exp.quizScore !== undefined && (
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    exp.quizScore >= 70
                                      ? 'bg-green-500/20 text-green-400'
                                      : 'bg-amber-500/20 text-amber-400'
                                  }`}>
                                    Quiz: {exp.quizScore}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
                  <Sparkles className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Explorations Yet</h3>
                  <p className="text-slate-400 mb-6">
                    Click any [highlighted term] in a lesson to start your exploration journey.
                  </p>
                  <Link
                    href="/course"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-colors"
                  >
                    Start Learning
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Chat History Tab */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    Chat History
                    <span className="text-sm font-normal text-slate-500">
                      ({messages.length} messages)
                    </span>
                  </h2>
                  {messages.length > 0 && (
                    <button
                      onClick={clearMessages}
                      className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear History
                    </button>
                  )}
                </div>

                {messages.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {messages.map((msg, i) => (
                      <div
                        key={msg.id || i}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-cyan-500/20'
                            : 'bg-purple-500/20'
                        }`}>
                          {msg.role === 'user' ? (
                            <User className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Brain className="w-4 h-4 text-purple-400" />
                          )}
                        </div>
                        <div className={`flex-1 max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block p-3 rounded-xl ${
                            msg.role === 'user'
                              ? 'bg-cyan-500/20 text-cyan-100'
                              : 'bg-slate-800 text-slate-200'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {msg.timestamp ? formatDate(new Date(msg.timestamp)) : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium text-slate-400 mb-2">No Chat History</h3>
                    <p className="text-sm">
                      Use the chat assistant while learning to ask questions.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Account Section */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Account
                </h2>

                {authLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  </div>
                ) : user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-400 font-medium">Signed In</p>
                        <p className="text-slate-300 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">
                      Your progress syncs automatically across all devices.
                    </p>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSigningOut ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-amber-400">Guest Mode</p>
                        <p className="text-sm text-slate-400">Progress saved locally</p>
                      </div>
                    </div>
                    {isConfigured && (
                      <div className="flex gap-3">
                        <Link
                          href="/auth/signin"
                          className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium text-center hover:from-cyan-600 hover:to-purple-600 transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="flex-1 py-2 px-4 border border-slate-700 text-slate-300 rounded-lg font-medium text-center hover:bg-slate-800 transition-colors"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Learning Level */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Learning Level
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as UserLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => setLevel(level)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        currentLevel === level
                          ? `${levelConfig[level].bgColor} ${levelConfig[level].color} ${levelConfig[level].borderColor}`
                          : 'border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <span className="font-medium">{levelConfig[level].label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  Content adapts instantly to your selected level.
                </p>
              </div>

              {/* Notifications */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-cyan-400" />
                  Notifications
                </h2>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {notifications ? (
                      <Bell className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <BellOff className="w-5 h-5 text-slate-500" />
                    )}
                    <div>
                      <p className="font-medium text-white">Learning Reminders</p>
                      <p className="text-sm text-slate-500">Get notified about your learning goals</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  Data Management
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                    <div>
                      <p className="font-medium text-white">Export Data</p>
                      <p className="text-sm text-slate-500">Download all your learning data</p>
                    </div>
                    <button className="px-4 py-2 text-sm text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors">
                      Export
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                    <div>
                      <p className="font-medium text-white">Clear Local Data</p>
                      <p className="text-sm text-slate-500">Remove all data from this browser</p>
                    </div>
                    <button className="px-4 py-2 text-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================
// STAT CARD COMPONENT
// ============================================

function StatCard({
  icon: Icon,
  value,
  label,
  color,
  delay = 0,
  suffix = '',
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  color: 'cyan' | 'purple' | 'green' | 'amber';
  delay?: number;
  suffix?: string;
}) {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30',
    purple: 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30',
    green: 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30',
    amber: 'bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30',
  };

  const glowClasses = {
    cyan: 'group-hover:shadow-cyan-500/20',
    purple: 'group-hover:shadow-purple-500/20',
    green: 'group-hover:shadow-green-500/20',
    amber: 'group-hover:shadow-amber-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-slate-900 rounded-xl border border-slate-800 p-5 cursor-default group transition-shadow duration-300 hover:shadow-xl ${glowClasses[color]}`}
    >
      <motion.div
        className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3 transition-colors duration-300`}
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
      <motion.p
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        <CountUp value={value} />{suffix}
      </motion.p>
      <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{label}</p>
    </motion.div>
  );
}

// ============================================
// COUNT UP ANIMATION
// ============================================

function CountUp({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) return;

    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
}
