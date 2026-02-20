// components/lesson/LessonContent.tsx
'use client';

import React, { useState } from 'react';
import { ClickableTerm } from './ClickableTerm';
import { MermaidDiagram } from '@/components/diagrams/MermaidDiagram';
import type { Term } from '@/types';

interface LessonContentProps {
  content: string;
  terms: Term[];
}

export function LessonContent({ content, terms }: LessonContentProps) {
  // Create a map of term keywords to term data
  const termsMap = new Map<string, Term>();
  terms.forEach(term => {
    // Add the term itself
    termsMap.set(term.term.toLowerCase(), term);
    // Also add the slug as a key
    termsMap.set(term.slug, term);
  });

  // Parse the content and render
  const renderContent = () => {
    // STEP 1: Extract all fenced code blocks BEFORE splitting by paragraphs
    // This prevents code blocks with blank lines from being fragmented
    const codeBlocks: string[] = [];
    let contentWithPlaceholders = content.replace(
      /```(\w*)\n([\s\S]*?)```/g,
      (_match, language, code) => {
        const index = codeBlocks.length;
        codeBlocks.push(JSON.stringify({ language: language || '', code: code.trimEnd() }));
        return `\n\n__CODE_BLOCK_${index}__\n\n`;
      }
    );

    // STEP 2: Also extract mermaid diagrams (they may have been caught above, but let's be safe)
    const mermaidBlocks: string[] = [];
    contentWithPlaceholders = contentWithPlaceholders.replace(
      /__CODE_BLOCK_(\d+)__/g,
      (match, indexStr) => {
        const idx = parseInt(indexStr, 10);
        const blockData = JSON.parse(codeBlocks[idx]);
        if (blockData.language === 'mermaid') {
          const mermaidIndex = mermaidBlocks.length;
          mermaidBlocks.push(blockData.code);
          return `__MERMAID_BLOCK_${mermaidIndex}__`;
        }
        return match;
      }
    );

    // STEP 3: Now safe to split by double newlines
    const blocks = contentWithPlaceholders.split(/\n\n+/);

    return blocks.map((block, blockIndex) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Check for code block placeholder
      const codeMatch = trimmed.match(/^__CODE_BLOCK_(\d+)__$/);
      if (codeMatch) {
        const { language, code } = JSON.parse(codeBlocks[parseInt(codeMatch[1])]);
        return (
          <CodeBlock key={blockIndex} code={code} language={language} />
        );
      }

      // Check for mermaid placeholder
      const mermaidMatch = trimmed.match(/^__MERMAID_BLOCK_(\d+)__$/);
      if (mermaidMatch) {
        return <MermaidDiagram key={blockIndex} chart={mermaidBlocks[parseInt(mermaidMatch[1])]} />;
      }

      // Headers
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={blockIndex} className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            {parseInlineContent(trimmed.slice(3), termsMap)}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={blockIndex} className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            {parseInlineContent(trimmed.slice(4), termsMap)}
          </h3>
        );
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        const quoteContent = trimmed.split('\n').map(line => line.replace(/^>\s?/, '')).join('\n');
        return (
          <blockquote key={blockIndex} className="border-l-4 border-primary-400 bg-primary-50 pl-4 py-3 pr-4 my-6 rounded-r-lg">
            {parseInlineContent(quoteContent, termsMap)}
          </blockquote>
        );
      }

      // Unordered lists
      if (trimmed.match(/^[\-\*] /m)) {
        const items = trimmed.split(/\n/).filter(line => line.match(/^[\-\*] /));
        return (
          <ul key={blockIndex} className="my-4 pl-6 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700 list-disc">
                {parseInlineContent(item.slice(2), termsMap)}
              </li>
            ))}
          </ul>
        );
      }

      // Ordered lists
      if (trimmed.match(/^\d+\. /m)) {
        const items = trimmed.split(/\n/).filter(line => line.match(/^\d+\. /));
        return (
          <ol key={blockIndex} className="my-4 pl-6 space-y-2 list-decimal">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700">
                {parseInlineContent(item.replace(/^\d+\. /, ''), termsMap)}
              </li>
            ))}
          </ol>
        );
      }

      // Tables
      if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
        return renderTable(trimmed, blockIndex, termsMap);
      }

      // Default paragraph
      return (
        <p key={blockIndex} className="text-gray-700 leading-relaxed mb-4">
          {parseInlineContent(trimmed, termsMap)}
        </p>
      );
    });
  };

  return (
    <div className="lesson-content">
      {renderContent()}
    </div>
  );
}

// Code block component with copy button
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm">
        <code className={language ? `language-${language}` : ''}>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-gray-600 hover:text-white transition-all"
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

// Render table
function renderTable(block: string, key: number, termsMap: Map<string, Term>) {
  const rows = block.split('\n').filter(row => row.trim());
  const headers = rows[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim());
  const dataRows = rows.slice(2).map(row =>
    row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
  );

  return (
    <div key={key} className="my-6 -mx-4 sm:mx-0">
      <div className="overflow-x-auto px-4 sm:px-0">
        <table className="w-full border-collapse min-w-[500px] sm:min-w-0">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="bg-gray-100 text-left p-2 sm:p-3 font-semibold border-b-2 border-gray-300 text-sm sm:text-base whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2 sm:p-3 border-b border-gray-200 text-sm sm:text-base">
                    {parseInlineContent(cell, termsMap)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Parse inline content with clickable terms, bold, italic, code
function parseInlineContent(text: string, termsMap: Map<string, Term>): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  // Combined regex for all inline elements
  // Matches: [term], **bold**, *italic*, `code`
  const regex = /\[([^\]]+)\]|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > currentIndex) {
      elements.push(text.slice(currentIndex, match.index));
    }

    if (match[1]) {
      // [term] - clickable term
      const termText = match[1];
      const termKey = termText.toLowerCase().replace(/\s+/g, '-');
      const term = termsMap.get(termKey) || termsMap.get(termText.toLowerCase());

      elements.push(
        <ClickableTerm
          key={`term-${match.index}`}
          termId={term?.id || termKey}
        >
          {termText}
        </ClickableTerm>
      );
    } else if (match[2]) {
      // **bold**
      elements.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-gray-900">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // *italic*
      elements.push(
        <em key={`italic-${match.index}`} className="italic">
          {match[3]}
        </em>
      );
    } else if (match[4]) {
      // `code`
      elements.push(
        <code key={`code-${match.index}`} className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono">
          {match[4]}
        </code>
      );
    }

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    elements.push(text.slice(currentIndex));
  }

  return elements;
}
