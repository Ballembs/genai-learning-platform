// hooks/useAudioReader.ts
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AudioSegment } from '@/lib/audio/contentParser';

export interface AudioReaderState {
  isPlaying: boolean;
  isPaused: boolean;
  currentIndex: number;
  speed: number;
  isSupported: boolean;
  progress: number; // 0-100
}

export interface AudioReaderControls {
  play: () => void;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
  stop: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  setSpeed: (speed: number) => void;
}

export function useAudioReader(
  segments: AudioSegment[]
): [AudioReaderState, AudioReaderControls] {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [speed, setSpeedState] = useState(1);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentsRef = useRef(segments);
  const currentIndexRef = useRef(-1);
  const isStoppedRef = useRef(false);
  const speedRef = useRef(speed);

  // Keep refs in sync
  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Speak a single segment, returns a promise that resolves when done
  const speakSegment = useCallback(
    (index: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (!isSupported) return reject(new Error('Not supported'));

        const seg = segmentsRef.current[index];
        if (!seg) return reject(new Error('No segment'));

        const utterance = new SpeechSynthesisUtterance(seg.text);
        utterance.rate = speedRef.current;
        utterance.pitch = 1;
        utterance.lang = 'en-US';

        // Try to pick a natural-sounding voice
        const voices = speechSynthesis.getVoices();
        const preferred = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel') ||
              v.name.includes('Natural'))
        );
        if (preferred) utterance.voice = preferred;

        utterance.onend = () => resolve();
        utterance.onerror = (e) => {
          // 'interrupted' and 'canceled' are expected when user pauses/stops
          if (e.error === 'interrupted' || e.error === 'canceled') {
            resolve();
          } else {
            reject(e);
          }
        };

        utteranceRef.current = utterance;
        setCurrentIndex(index);
        speechSynthesis.speak(utterance);
      });
    },
    [isSupported]
  );

  // Play through all segments starting from a given index
  const playFrom = useCallback(
    async (startIndex: number) => {
      isStoppedRef.current = false;
      setIsPlaying(true);
      setIsPaused(false);

      for (let i = startIndex; i < segmentsRef.current.length; i++) {
        if (isStoppedRef.current) break;

        try {
          await speakSegment(i);
        } catch {
          break;
        }

        // Check if we were stopped or paused during playback
        if (isStoppedRef.current) break;
      }

      // Only mark as not playing if we weren't paused
      if (!isStoppedRef.current) {
        setIsPlaying(false);
        setCurrentIndex(-1);
      }
    },
    [speakSegment]
  );

  const play = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.cancel(); // Clear any queued speech
    playFrom(0);
  }, [isSupported, playFrom]);

  const pause = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.pause();
    setIsPaused(true);
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported]);

  const toggle = useCallback(() => {
    if (!isPlaying) {
      // If we were paused mid-read, resume from current segment
      if (currentIndexRef.current >= 0) {
        // Cancel the old utterance and replay from current segment
        speechSynthesis.cancel();
        playFrom(currentIndexRef.current);
      } else {
        play();
      }
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPlaying, isPaused, play, pause, resume, playFrom]);

  const stop = useCallback(() => {
    isStoppedRef.current = true;
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(-1);
  }, []);

  const skipForward = useCallback(() => {
    const nextIndex = Math.min(
      currentIndexRef.current + 1,
      segmentsRef.current.length - 1
    );
    speechSynthesis.cancel();
    isStoppedRef.current = true;
    // Small delay to let cancel take effect
    setTimeout(() => {
      playFrom(nextIndex);
    }, 50);
  }, [playFrom]);

  const skipBackward = useCallback(() => {
    const prevIndex = Math.max(currentIndexRef.current - 1, 0);
    speechSynthesis.cancel();
    isStoppedRef.current = true;
    setTimeout(() => {
      playFrom(prevIndex);
    }, 50);
  }, [playFrom]);

  const setSpeed = useCallback(
    (newSpeed: number) => {
      setSpeedState(newSpeed);
      speedRef.current = newSpeed;
      // If currently playing, restart current segment at new speed
      if (isPlaying && !isPaused) {
        const idx = currentIndexRef.current;
        speechSynthesis.cancel();
        isStoppedRef.current = true;
        setTimeout(() => {
          playFrom(idx);
        }, 50);
      }
    },
    [isPlaying, isPaused, playFrom]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Load voices (some browsers load them async)
  useEffect(() => {
    if (!isSupported) return;
    speechSynthesis.getVoices(); // trigger load
    const handleVoicesChanged = () => speechSynthesis.getVoices();
    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () =>
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
  }, [isSupported]);

  const progress =
    segments.length > 0 && currentIndex >= 0
      ? Math.round(((currentIndex + 1) / segments.length) * 100)
      : 0;

  return [
    { isPlaying, isPaused, currentIndex, speed, isSupported, progress },
    { play, pause, resume, toggle, stop, skipForward, skipBackward, setSpeed },
  ];
}
