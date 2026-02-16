// components/ui/BottomSheet.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X, ChevronUp, GripHorizontal } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[];
  defaultSnap?: number;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = [0.5, 0.9],
  defaultSnap = 0,
}: BottomSheetProps) {
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [currentSnap, setCurrentSnap] = useState(defaultSnap);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Fast swipe down closes
    if (velocity > 500) {
      onClose();
      return;
    }

    // Fast swipe up expands
    if (velocity < -500 && currentSnap < snapPoints.length - 1) {
      setCurrentSnap(currentSnap + 1);
      return;
    }

    // Calculate closest snap point based on position
    const currentHeight = windowHeight * snapPoints[currentSnap];
    const newHeight = currentHeight - offset;
    const newRatio = newHeight / windowHeight;

    // Find closest snap point
    let closestSnap = 0;
    let minDiff = Math.abs(snapPoints[0] - newRatio);

    snapPoints.forEach((snap, index) => {
      const diff = Math.abs(snap - newRatio);
      if (diff < minDiff) {
        minDiff = diff;
        closestSnap = index;
      }
    });

    // Close if dragged below minimum
    if (newRatio < snapPoints[0] * 0.5) {
      onClose();
    } else {
      setCurrentSnap(closestSnap);
    }
  };

  const sheetHeight = windowHeight * snapPoints[currentSnap];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: windowHeight }}
            animate={{ y: windowHeight - sheetHeight }}
            exit={{ y: windowHeight }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="fixed left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col touch-none"
            style={{
              height: windowHeight * 0.95,
              top: 0,
            }}
          >
            {/* Drag Handle */}
            <div
              className="flex-shrink-0 pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-600 touch-target"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              {children}
            </div>

            {/* Safe area padding for iOS */}
            <div className="flex-shrink-0 h-safe-area-bottom" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Trigger button for bottom sheet
interface BottomSheetTriggerProps {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

export function BottomSheetTrigger({ onClick, label, icon, badge }: BottomSheetTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 left-4 right-4 z-30 flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg touch-target md:hidden"
    >
      {icon}
      <span className="font-medium text-gray-900">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full">
          {badge}
        </span>
      )}
      <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" />
    </motion.button>
  );
}
