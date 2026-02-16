// components/chat/ChatButton.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatStore } from '@/lib/store';

export function ChatButton() {
  const { isOpen, openChat, closeChat } = useChatStore();

  const handleClick = () => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="chat-button group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 30px rgba(14, 165, 233, 0.4)',
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      <motion.div
        initial={false}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </motion.div>

      {/* Pulse indicator when closed */}
      {!isOpen && (
        <motion.span
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Hover tooltip */}
      {!isOpen && (
        <motion.span
          className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ x: 10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          Ask AI anything
        </motion.span>
      )}
    </motion.button>
  );
}
