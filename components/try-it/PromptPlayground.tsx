// components/try-it/PromptPlayground.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send, Sparkles } from 'lucide-react';

const presets = [
  {
    id: 'chef',
    label: 'Chef',
    emoji: '👨‍🍳',
    prompt: 'You are a friendly Italian chef. You give short, practical recipes. You are passionate about fresh ingredients and simple techniques. Keep responses under 3 sentences.',
  },
  {
    id: 'pirate',
    label: 'Pirate',
    emoji: '🏴‍☠️',
    prompt: 'You are a pirate captain. You answer every question in pirate speak. You relate everything to sailing, treasure, and the sea. Keep responses under 3 sentences.',
  },
  {
    id: 'teacher',
    label: 'Teacher',
    emoji: '👩‍🏫',
    prompt: 'You are a patient kindergarten teacher. You explain everything simply using analogies a 5-year-old would understand. You are encouraging. Keep responses under 3 sentences.',
  },
  {
    id: 'poet',
    label: 'Poet',
    emoji: '📝',
    prompt: 'You are a romantic poet. You answer every question in the form of a short poem with rhyming couplets. Keep it to 4 lines.',
  },
];

export function PromptPlayground() {
  const [systemPrompt, setSystemPrompt] = useState(presets[0].prompt);
  const [userMessage, setUserMessage] = useState('What should I make for dinner tonight?');
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [previousResponse, setPreviousResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>('chef');

  const handleSend = async (overrideSystemPrompt?: string) => {
    const promptToUse = overrideSystemPrompt || systemPrompt;
    if (!promptToUse.trim() || !userMessage.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Move current response to previous for comparison
    if (currentResponse) {
      setPreviousResponse(currentResponse);
    }
    setCurrentResponse(null);

    try {
      const response = await fetch('/api/try-it/prompt-playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: promptToUse, userMessage: userMessage.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }

      setCurrentResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (preset: typeof presets[0]) => {
    setSystemPrompt(preset.prompt);
    setActivePreset(preset.id);
    handleSend(preset.prompt);
  };

  return (
    <div className="rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 sm:px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-lg">Try It Yourself: The Prompt Playground</h3>
        </div>
        <p className="text-white/90 text-sm mt-1">
          See how system prompts change AI behavior
        </p>
      </div>

      {/* Body */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 sm:p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: System Prompt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => {
                setSystemPrompt(e.target.value);
                setActivePreset(null);
              }}
              className="w-full h-32 sm:h-40 p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm resize-none"
              placeholder="Tell the AI how to behave..."
              maxLength={500}
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {systemPrompt.length}/500
            </div>

            {/* Preset Buttons */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Quick presets:</p>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activePreset === preset.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-white border border-orange-200 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {preset.emoji} {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Test It */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              placeholder="Type a message to send..."
              maxLength={300}
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {userMessage.length}/300
            </div>

            <button
              onClick={() => handleSend()}
              disabled={isLoading || !systemPrompt.trim() || !userMessage.trim()}
              className="mt-3 w-full px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Response Area */}
            <div className="mt-4 bg-white rounded-xl border border-orange-100 p-4 min-h-[120px]">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </motion.div>
                )}

                {!isLoading && !error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {previousResponse && currentResponse && (
                      <div className="mb-3 pb-3 border-b border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Previous:</p>
                        <p className="text-gray-400 text-sm italic line-clamp-3">
                          {previousResponse}
                        </p>
                      </div>
                    )}

                    {currentResponse ? (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">AI Response:</p>
                        <p className="text-gray-700 leading-relaxed">
                          {currentResponse}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Click "Send Message" to see how the AI responds with this system prompt
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-5 pt-4 border-t border-orange-200">
          <p className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>
              Click different presets to instantly see how the <strong>same question</strong> gets completely different answers!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
