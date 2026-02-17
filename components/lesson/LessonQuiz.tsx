// components/lesson/LessonQuiz.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import { useUserStore } from '@/lib/store';
import type { Quiz, QuizQuestion, UserLevel } from '@/types';

interface LessonQuizProps {
  quiz: Quiz;
  lessonId: string;
}

export function LessonQuiz({ quiz, lessonId }: LessonQuizProps) {
  const { currentLevel, profile, updateLessonProgress } = useUserStore();

  // Filter questions based on user level
  const filteredQuestions = useMemo(() => {
    const levelOrder: UserLevel[] = ['beginner', 'intermediate', 'advanced'];
    const currentLevelIndex = levelOrder.indexOf(currentLevel);

    // Include questions at or below the user's level
    return quiz.questions.filter((q) => {
      const questionLevelIndex = levelOrder.indexOf(q.difficulty);
      return questionLevelIndex <= currentLevelIndex;
    });
  }, [quiz.questions, currentLevel]);

  // State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Get previous score from profile
  const lessonProgress = profile?.lessonProgress.find((p) => p.lessonId === lessonId);
  const previousBestScore = lessonProgress?.quizScore;
  const previousAttempts = lessonProgress?.quizAttempts ?? 0;

  // Check if all questions are answered
  const allQuestionsAnswered = filteredQuestions.length > 0 &&
    filteredQuestions.every((_, idx) => selectedAnswers[idx] !== undefined);

  // Calculate score
  const calculateQuizScore = (): number | null => {
    if (!filteredQuestions.length || !allQuestionsAnswered) return null;

    const correctCount = filteredQuestions.reduce((count, q, idx) => {
      const correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
      return selectedAnswers[idx] === correctIdx ? count + 1 : count;
    }, 0);

    return Math.round((correctCount / filteredQuestions.length) * 100);
  };

  // Handle answer selection
  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizCompleted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    const score = calculateQuizScore();
    if (score === null) return;

    setQuizScore(score);
    setQuizCompleted(true);

    // Save to store - keep the best score
    const newBestScore = previousBestScore !== undefined
      ? Math.max(score, previousBestScore)
      : score;

    updateLessonProgress(lessonId, {
      quizScore: newBestScore,
      quizAttempts: previousAttempts + 1,
    });
  };

  // Retake quiz
  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizScore(null);
  };

  // Don't render if no questions for this level
  if (filteredQuestions.length === 0) {
    return null;
  }

  const isPassing = quizScore !== null && quizScore >= quiz.passingScore;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mt-6 sm:mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {quiz.title}
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} for {currentLevel} level
            {previousBestScore !== undefined && (
              <span className="ml-2 text-primary-600">
                (Best: {previousBestScore}%)
              </span>
            )}
          </p>
        </div>
        {previousAttempts > 0 && (
          <div className="text-xs text-gray-400">
            {previousAttempts} attempt{previousAttempts !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {filteredQuestions.map((question, qIdx) => {
          const isAnswered = selectedAnswers[qIdx] !== undefined;
          const correctIdx = typeof question.correctAnswer === 'number' ? question.correctAnswer : 0;
          const isCorrect = isAnswered && selectedAnswers[qIdx] === correctIdx;

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.1 }}
              className={`p-4 sm:p-6 rounded-xl border-2 transition-colors ${
                quizCompleted
                  ? isCorrect
                    ? 'border-green-200 bg-green-50/50'
                    : 'border-red-200 bg-red-50/50'
                  : 'border-gray-100 bg-gray-50/50'
              }`}
            >
              {/* Question */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-medium text-gray-900">
                  {qIdx + 1}. {question.question}
                </h3>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full flex-shrink-0
                  ${question.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    question.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                    'bg-pink-100 text-pink-700'}
                `}>
                  {question.difficulty}
                </span>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {question.options?.map((option, oIdx) => {
                  const isSelected = selectedAnswers[qIdx] === oIdx;
                  const isCorrectOption = oIdx === correctIdx;
                  const showResult = quizCompleted;

                  return (
                    <motion.button
                      key={oIdx}
                      onClick={() => handleSelectAnswer(qIdx, oIdx)}
                      disabled={quizCompleted}
                      whileHover={!quizCompleted ? { scale: 1.01 } : {}}
                      whileTap={!quizCompleted ? { scale: 0.99 } : {}}
                      className={`
                        w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all
                        flex items-center justify-between gap-3
                        ${!quizCompleted && !isSelected
                          ? 'border-gray-200 hover:border-primary-300 hover:bg-white cursor-pointer'
                          : ''
                        }
                        ${!quizCompleted && isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : ''
                        }
                        ${showResult && isCorrectOption
                          ? 'border-green-500 bg-green-50'
                          : ''
                        }
                        ${showResult && isSelected && !isCorrectOption
                          ? 'border-red-500 bg-red-50'
                          : ''
                        }
                        ${showResult && !isSelected && !isCorrectOption
                          ? 'border-gray-200 opacity-50'
                          : ''
                        }
                        ${quizCompleted ? 'cursor-default' : ''}
                      `}
                    >
                      <span className="text-sm sm:text-base">{option}</span>
                      {showResult && isCorrectOption && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation - shown after completion */}
              <AnimatePresence>
                {quizCompleted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Explanation: </span>
                      {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.button
              key="submit"
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={allQuestionsAnswered ? { scale: 1.02 } : {}}
              whileTap={allQuestionsAnswered ? { scale: 0.98 } : {}}
              className={`
                w-full py-3 px-6 rounded-xl font-medium transition-all
                flex items-center justify-center gap-2
                ${allQuestionsAnswered
                  ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <CheckCircle className="w-5 h-5" />
              Submit Quiz
            </motion.button>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Score Result */}
              <div className={`
                p-4 sm:p-6 rounded-xl text-center
                ${isPassing
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                  : 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'
                }
              `}>
                <div className="flex justify-center mb-3">
                  {isPassing ? (
                    <Trophy className="w-10 h-10 text-green-500" />
                  ) : (
                    <Target className="w-10 h-10 text-amber-500" />
                  )}
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  <span className={isPassing ? 'text-green-600' : 'text-amber-600'}>
                    {quizScore}%
                  </span>
                </div>
                <p className={`text-sm ${isPassing ? 'text-green-700' : 'text-amber-700'}`}>
                  {isPassing
                    ? 'Great job! You passed the quiz!'
                    : `You need ${quiz.passingScore}% to pass. Keep learning!`
                  }
                </p>
                {previousBestScore !== undefined && quizScore !== null && quizScore > previousBestScore && (
                  <p className="text-sm text-primary-600 mt-2 font-medium">
                    New personal best!
                  </p>
                )}
              </div>

              {/* Retake Button */}
              <motion.button
                onClick={handleRetakeQuiz}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
