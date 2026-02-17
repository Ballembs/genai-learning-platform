// components/content/HighlightedCode.tsx
'use client';

import { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';

// Register common languages
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import yaml from 'highlight.js/lib/languages/yaml';

// Register languages once
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);

interface HighlightedCodeProps {
  code: string;
  language?: string;
  className?: string;
}

/**
 * Escape HTML special characters for safe rendering
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

/**
 * Renders syntax-highlighted code using highlight.js directly.
 * Uses suppressHydrationWarning to avoid SSR/client mismatch errors.
 */
export function HighlightedCode({
  code,
  language = '',
  className = '',
}: HighlightedCodeProps) {
  // Start with escaped plain code (same on server and client initial render)
  const [highlightedHtml, setHighlightedHtml] = useState<string>(() => escapeHtml(code));

  useEffect(() => {
    if (!code) return;

    try {
      const normalizedLang = language.toLowerCase().trim();

      let result;
      if (normalizedLang && hljs.getLanguage(normalizedLang)) {
        result = hljs.highlight(code, { language: normalizedLang });
      } else {
        result = hljs.highlightAuto(code);
      }

      setHighlightedHtml(result.value);
    } catch (err) {
      console.warn('Highlight.js error:', err);
      setHighlightedHtml(escapeHtml(code));
    }
  }, [code, language]);

  return (
    <pre className={`bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm ${className}`}>
      <code
        className={`hljs ${language ? `language-${language}` : ''}`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  );
}

/**
 * Inline code component with consistent styling
 */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}
