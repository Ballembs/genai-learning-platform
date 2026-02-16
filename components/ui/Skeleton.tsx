// components/ui/Skeleton.tsx
'use client';

import { motion } from 'framer-motion';

// Base skeleton with shimmer animation
function SkeletonBase({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-slate-800 ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"
        animate={{ x: ['0%', '200%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Text line skeleton
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          className={`h-4 rounded ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

// Card skeleton
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-900 rounded-xl border border-slate-800 p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <SkeletonBase className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-4 w-1/2 rounded" />
          <SkeletonBase className="h-3 w-1/3 rounded" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

// Stats card skeleton
export function SkeletonStats() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
      <SkeletonBase className="w-10 h-10 rounded-lg mb-3" />
      <SkeletonBase className="h-8 w-16 rounded mb-1" />
      <SkeletonBase className="h-4 w-24 rounded" />
    </div>
  );
}

// List item skeleton
export function SkeletonListItem({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl ${className}`}>
      <SkeletonBase className="w-8 h-8 rounded-lg" />
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-4 w-1/3 rounded" />
        <SkeletonBase className="h-3 w-1/4 rounded" />
      </div>
      <SkeletonBase className="w-4 h-4 rounded" />
    </div>
  );
}

// Popup content skeleton
export function SkeletonPopup() {
  return (
    <div className="space-y-4 p-4">
      <SkeletonText lines={3} />
      <SkeletonBase className="h-20 w-full rounded-lg" />
      <div className="flex gap-2 mt-4">
        <SkeletonBase className="h-10 flex-1 rounded-lg" />
        <SkeletonBase className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

// Progress bar skeleton
export function SkeletonProgress({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex justify-between mb-2">
        <SkeletonBase className="h-4 w-24 rounded" />
        <SkeletonBase className="h-4 w-12 rounded" />
      </div>
      <SkeletonBase className="h-2 w-full rounded-full" />
    </div>
  );
}

// Avatar skeleton
export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return <SkeletonBase className={`${sizeClasses[size]} rounded-full`} />;
}

// Chat message skeleton
export function SkeletonChatMessage({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <SkeletonAvatar size="sm" />
      <div className={`max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <SkeletonBase className={`h-16 w-48 rounded-2xl ${isUser ? 'rounded-br-md' : 'rounded-bl-md'}`} />
      </div>
    </div>
  );
}
