// components/try-it/SimilarityChecker.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, Sparkles, Info } from 'lucide-react';

const presets = [
  {
    id: 'animals-tech',
    label: 'Animals vs Tech',
    emoji: '🐱',
    sentences: [
      'The cat sat on the warm mat',
      'A kitten was resting on the rug',
      'The stock market crashed yesterday',
    ],
  },
  {
    id: 'synonyms',
    label: 'Synonyms',
    emoji: '🔄',
    sentences: [
      'I am happy today',
      'I feel joyful right now',
      'The weather is cold outside',
    ],
  },
  {
    id: 'same-words',
    label: 'Same Words',
    emoji: '❓',
    sentences: [
      'The bank by the river is steep',
      'I went to the bank to deposit money',
      'She sat on the river bank to fish',
    ],
  },
  {
    id: 'sarcasm',
    label: 'Sarcasm',
    emoji: '🎭',
    sentences: [
      'Great, another Monday morning',
      'I love Mondays so much',
      'Monday is the best day of the week',
    ],
  },
];

interface SimilarityResult {
  pair: [number, number];
  sentence1: string;
  sentence2: string;
  score: number;
}

function getScoreStyle(score: number) {
  if (score >= 0.75) {
    return { barColor: 'bg-green-500', textColor: 'text-green-600', label: 'Very Similar' };
  } else if (score >= 0.5) {
    return { barColor: 'bg-amber-500', textColor: 'text-amber-600', label: 'Somewhat Similar' };
  } else if (score >= 0.3) {
    return { barColor: 'bg-orange-500', textColor: 'text-orange-600', label: 'Loosely Related' };
  } else {
    return { barColor: 'bg-red-400', textColor: 'text-red-500', label: 'Different' };
  }
}

function truncate(str: string, maxLength: number = 30): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

function getInsight(results: SimilarityResult[], dimensions: number): string {
  if (results.length === 0) return '';

  const highest = results[0];
  const lowest = results[results.length - 1];

  if (highest.score > 0.75 && lowest.score < 0.4) {
    return "The AI can tell which sentences are about the same topic — even when they use completely different words!";
  }

  // Check for same word different meaning
  const hasSharedWord = results.some(r => {
    const words1 = r.sentence1.toLowerCase().split(/\s+/);
    const words2 = r.sentence2.toLowerCase().split(/\s+/);
    return words1.some(w => words2.includes(w) && w.length > 3) && r.score < 0.5;
  });

  if (hasSharedWord) {
    return "Same word, different meaning! Embeddings understand context, not just keywords.";
  }

  return `Scores closer to 1.0 mean the sentences have more similar meanings. The AI converts each sentence into ${dimensions} numbers to measure this.`;
}

export function SimilarityChecker() {
  const [sentences, setSentences] = useState<string[]>(presets[0].sentences);
  const [results, setResults] = useState<SimilarityResult[] | null>(null);
  const [embeddingDimensions, setEmbeddingDimensions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>('animals-tech');

  const handlePresetClick = (preset: typeof presets[0]) => {
    setSentences(preset.sentences);
    setActivePreset(preset.id);
    setResults(null);
    setError(null);
  };

  const handleSentenceChange = (index: number, value: string) => {
    const newSentences = [...sentences];
    newSentences[index] = value;
    setSentences(newSentences);
    setActivePreset(null);
  };

  const handleCompare = async () => {
    const validSentences = sentences.filter(s => s.trim().length > 0);
    if (validSentences.length < 2) {
      setError('Please enter at least 2 sentences');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/try-it/similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentences: validSentences }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to compute similarities');
      }

      setResults(data.similarities);
      setEmbeddingDimensions(data.embeddingDimensions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-5 sm:px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-lg">Try It Yourself: Similarity Checker</h3>
        </div>
        <p className="text-white/90 text-sm mt-1">
          See how AI measures meaning — not just keywords
        </p>
      </div>

      {/* Body */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 sm:p-6">
        <p className="text-gray-700 mb-4">
          Enter 3 sentences and see how similar AI thinks they are:
        </p>

        {/* Sentence Inputs */}
        <div className="space-y-3 mb-4">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <input
                type="text"
                value={sentence}
                onChange={(e) => handleSentenceChange(index, e.target.value)}
                className="flex-1 p-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                placeholder={`Sentence ${index + 1}...`}
                maxLength={200}
              />
            </div>
          ))}
        </div>

        {/* Compare Button */}
        <button
          onClick={handleCompare}
          disabled={isLoading || sentences.filter(s => s.trim()).length < 2}
          className="w-full px-4 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Computing embeddings...
            </>
          ) : (
            <>
              Compare Sentences
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Preset Buttons */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Try these:</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activePreset === preset.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white border border-emerald-200 text-gray-700 hover:bg-emerald-100'
                }`}
              >
                {preset.emoji} {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          {results && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 bg-white rounded-xl border border-emerald-100 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Results</h4>
                {embeddingDimensions && (
                  <span className="text-xs text-gray-500">
                    ({embeddingDimensions}-dimensional embeddings)
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {results.map((result, index) => {
                  const style = getScoreStyle(result.score);
                  return (
                    <motion.div
                      key={`${result.pair[0]}-${result.pair[1]}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">&quot;{truncate(result.sentence1)}&quot;</span>
                        <span className="mx-2 text-gray-400">↔</span>
                        <span className="font-medium">&quot;{truncate(result.sentence2)}&quot;</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.score * 100}%` }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className={`h-full rounded-full ${style.barColor}`}
                          />
                        </div>
                        <span className="text-sm font-mono font-medium text-gray-700 w-12">
                          {result.score.toFixed(3)}
                        </span>
                        <span className={`text-xs font-medium ${style.textColor} w-28 text-right`}>
                          {style.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Insight */}
              {embeddingDimensions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2"
                >
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    {getInsight(results, embeddingDimensions)}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
