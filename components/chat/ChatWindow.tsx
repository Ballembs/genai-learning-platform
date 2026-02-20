// components/chat/ChatWindow.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Minimize2, Maximize2, Trash2, Bot, User, Loader2, X, ChevronDown } from 'lucide-react';
import { useChatStore, useUserStore, useNavigationStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { lessonData } from '@/content/lessons';
import type { ChatMessage } from '@/types';

// Get friendly lesson name from slug
function getLessonName(lessonId: string | null): string | null {
  if (!lessonId) return null;
  const lesson = lessonData[lessonId];
  return lesson?.title || lessonId;
}

export function ChatWindow() {
  const [input, setInput] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const {
    isOpen,
    isMinimized,
    messages,
    isLoading,
    toggleMinimize,
    closeChat,
    addMessage,
    setLoading,
    clearMessages,
  } = useChatStore();

  const { currentLevel, currentGoal } = useUserStore();
  const { currentLessonId, currentTermId } = useNavigationStore();

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && isMobile && !isMinimized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile, isMinimized]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      context: currentLessonId || undefined,
    };

    const userInput = input.trim();
    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          context: {
            currentPage: typeof window !== 'undefined' ? window.location.pathname : '',
            lessonId: currentLessonId || undefined,
            termId: currentTermId || undefined,
            userLevel: currentLevel,
            recentExplorations: [],
          },
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          goal: currentGoal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.message || data.response || data.content || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I'm having trouble connecting right now. ${error instanceof Error ? error.message : 'Please try again in a moment.'}`,
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Send a message directly (for suggestions)
  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    setInput(message);
    // Use setTimeout to ensure state is updated before sending
    setTimeout(() => {
      const syntheticInput = message.trim();
      sendDirectMessage(syntheticInput);
    }, 0);
  };

  const sendDirectMessage = async (messageText: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      context: currentLessonId || undefined,
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: {
            currentPage: typeof window !== 'undefined' ? window.location.pathname : '',
            lessonId: currentLessonId || undefined,
            termId: currentTermId || undefined,
            userLevel: currentLevel,
            recentExplorations: [],
          },
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          goal: currentGoal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.message || data.response || data.content || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `I'm having trouble connecting right now. ${error instanceof Error ? error.message : 'Please try again in a moment.'}`,
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: isMobile ? '100%' : 100, scale: isMobile ? 1 : 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          height: isMinimized ? 60 : isMobile ? '100%' : 500,
        }}
        exit={{ opacity: 0, y: isMobile ? '100%' : 50, scale: isMobile ? 1 : 0.95 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          height: { duration: 0.3, ease: 'easeInOut' },
        }}
        className={`
          ${isMobile
            ? 'fixed inset-0 z-50 bg-white flex flex-col'
            : 'chat-window'
          }
        `}
      >
        {/* Header */}
        <div className={`
          flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white flex-shrink-0
          ${isMobile ? 'pt-safe-area-top' : ''}
        `}>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-medium">AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => messages.length > 0 ? setShowClearConfirm(true) : undefined}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors touch-target disabled:opacity-50"
              title="Clear chat"
              disabled={messages.length === 0}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {isMobile ? (
              <button
                onClick={closeChat}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors touch-target"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={toggleMinimize}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors touch-target"
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Content (hidden when minimized) */}
        {!isMinimized && (
          <>
            {/* Context indicator */}
            {currentLessonId && (
              <div className="px-4 py-2 bg-primary-50 text-primary-700 text-sm border-b border-primary-100">
                📍 Context: {getLessonName(currentLessonId)}
                {currentTermId && ` > ${currentTermId.replace(/-/g, ' ')}`}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">Hi! I'm your learning assistant.</p>
                  <p className="text-sm mt-1">
                    Ask me anything about what you're learning.
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-400">Try asking:</p>
                    {[
                      "Explain this concept simpler",
                      "Give me a real-world example",
                      "What should I learn next?",
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => sendDirectMessage(suggestion)}
                        disabled={isLoading}
                        className="block w-full text-sm text-primary-600 hover:text-primary-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        "{suggestion}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 40,
                      delay: index === messages.length - 1 ? 0 : 0,
                    }}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0"
                      >
                        <Bot className="w-4 h-4 text-primary-600" />
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-primary-200' : 'text-gray-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </motion.div>
                    {message.role === 'user' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                      >
                        <User className="w-4 h-4 text-gray-600" />
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"
                  >
                    <Bot className="w-4 h-4 text-primary-600" />
                  </motion.div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-primary-400 rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`
              p-4 border-t border-gray-100 flex-shrink-0 bg-white
              ${isMobile ? 'pb-safe-area-bottom' : ''}
            `}>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base transition-shadow duration-200"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/25 touch-target"
                >
                  <motion.div
                    animate={input.trim() ? { x: [0, 3, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </>
        )}

        {/* Clear confirmation modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-10"
              onClick={() => setShowClearConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-5 max-w-xs w-full shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-semibold text-gray-900 mb-2">Clear chat history?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will remove all messages from this conversation. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      clearMessages();
                      setShowClearConfirm(false);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

