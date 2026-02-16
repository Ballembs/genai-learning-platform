// components/ui/SuccessAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, CheckCircle, Sparkles, Trophy, Star } from 'lucide-react';

interface SuccessCheckProps {
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  className?: string;
}

// Animated checkmark that draws in
export function SuccessCheck({ size = 'md', delay = 0, className = '' }: SuccessCheckProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const containerSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay,
      }}
      className={`${containerSizes[size]} rounded-full bg-green-500/20 flex items-center justify-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 15,
          delay: delay + 0.15,
        }}
      >
        <Check className={`${sizeClasses[size]} text-green-500`} />
      </motion.div>
    </motion.div>
  );
}

// Circle check with fill animation
export function SuccessCircle({ size = 'md', delay = 0, className = '' }: SuccessCheckProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
      }}
      className={className}
    >
      <CheckCircle className={`${sizeClasses[size]} text-green-500`} />
    </motion.div>
  );
}

// Celebration burst animation
export function SuccessBurst({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  const particles = [
    { icon: Sparkles, angle: 0, distance: 40 },
    { icon: Star, angle: 72, distance: 35 },
    { icon: Sparkles, angle: 144, distance: 40 },
    { icon: Star, angle: 216, distance: 35 },
    { icon: Sparkles, angle: 288, distance: 40 },
  ];

  return (
    <motion.div className={`relative ${className}`}>
      {/* Center icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{
          duration: 0.5,
          delay,
          times: [0, 0.6, 1],
        }}
      >
        <Trophy className="w-8 h-8 text-amber-500" />
      </motion.div>

      {/* Burst particles */}
      {particles.map((particle, i) => {
        const rad = (particle.angle * Math.PI) / 180;
        const x = Math.cos(rad) * particle.distance;
        const y = Math.sin(rad) * particle.distance;

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: [0, x, x],
              y: [0, y, y],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: delay + 0.2,
              times: [0, 0.5, 1],
            }}
          >
            <particle.icon className="w-4 h-4 text-amber-400" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Quiz complete animation
export function QuizCompleteAnimation({ score, className = '' }: { score: number; className?: string }) {
  const passed = score >= 70;

  return (
    <motion.div
      className={`flex flex-col items-center gap-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {passed ? (
        <>
          <SuccessBurst delay={0.2} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-xl font-bold text-green-400">Excellent!</p>
            <p className="text-slate-400">You scored {score}%</p>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-amber-400"
            >
              {score}%
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-lg font-medium text-amber-400">Keep Learning!</p>
            <p className="text-sm text-slate-400">Review the material and try again</p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

// Explore badge animation (appears when user first explores a term)
export function ExploreBadge({ termName, className = '' }: { termName: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full ${className}`}
    >
      <SuccessCircle size="sm" delay={0.1} />
      <span className="text-sm text-green-400">
        <span className="font-medium">{termName}</span> explored!
      </span>
    </motion.div>
  );
}
