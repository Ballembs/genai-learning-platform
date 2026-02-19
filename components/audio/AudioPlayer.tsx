// components/audio/AudioPlayer.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  X,
} from 'lucide-react';
import type { AudioReaderState, AudioReaderControls } from '@/hooks/useAudioReader';
import type { AudioSegment } from '@/lib/audio/contentParser';

interface AudioPlayerProps {
  state: AudioReaderState;
  controls: AudioReaderControls;
  segments: AudioSegment[];
  lessonTitle: string;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

export function AudioPlayer({
  state,
  controls,
  segments,
}: AudioPlayerProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  if (!state.isSupported) return null;

  return (
    <AnimatePresence>
      {state.isPlaying || state.isPaused ? (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white border-b border-gray-100 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full mb-2">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                animate={{ width: `${state.progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Left: Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={controls.skipBackward}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Previous paragraph"
                  title="Previous paragraph"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={controls.toggle}
                  className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                  aria-label={state.isPaused ? 'Resume' : 'Pause'}
                >
                  {state.isPaused ? (
                    <Play className="w-4 h-4 ml-0.5" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={controls.skipForward}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Next paragraph"
                  title="Next paragraph"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Center: Current segment info */}
              <div className="flex-1 min-w-0 text-center hidden sm:block">
                <p className="text-xs text-gray-400 truncate">
                  {state.currentIndex >= 0
                    ? `${state.currentIndex + 1} / ${segments.length}`
                    : 'Ready'}
                </p>
              </div>

              {/* Right: Speed + Stop */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Speed control */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="Playback speed"
                  >
                    {state.speed}x
                  </button>

                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                      >
                        {SPEED_OPTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              controls.setSpeed(s);
                              setShowSpeedMenu(false);
                            }}
                            className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                              s === state.speed
                                ? 'bg-primary-50 text-primary-600 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {s}x{s === 1 ? ' (Normal)' : s >= 1.5 ? ' (Fast)' : ' (Slow)'}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Stop button */}
                <button
                  onClick={controls.stop}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Stop reading"
                  title="Stop"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Small play button that goes in the lesson header to start audio.
 * Only shown when NOT currently playing.
 */
export function AudioPlayButton({
  onClick,
  isSupported,
}: {
  onClick: () => void;
  isSupported: boolean;
}) {
  if (!isSupported) return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors"
      aria-label="Listen to this lesson"
      title="Listen to this lesson"
    >
      <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="hidden sm:inline">Listen</span>
    </button>
  );
}
