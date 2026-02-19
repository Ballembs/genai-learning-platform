// components/lesson/LessonContent.tsx
'use client';

import React from 'react';
import { ClickableTerm } from './ClickableTerm';
import { MermaidDiagram } from '@/components/diagrams/MermaidDiagram';
import { HighlightedCode } from '@/components/content/HighlightedCode';
import type { Term } from '@/types';

interface LessonContentProps {
  content: string;
  terms: Term[];
  highlightIndex?: number; // index of currently-read audio segment
}

export function LessonContent({ content, terms, highlightIndex = -1 }: LessonContentProps) {
  // Create a map of term keywords to term data
  const termsMap = new Map<string, Term>();
  terms.forEach(term => {
    // Add the term itself
    termsMap.set(term.term.toLowerCase(), term);
    // Also add the slug as a key
    termsMap.set(term.slug, term);
  });

  // Global block counter for audio indexing (reset each render)
  let audioIndex = 0;

  // Helper to add highlight class when audio is reading this block
  const highlightClass = (idx: number) =>
    idx === highlightIndex ? 'audio-highlight' : '';

  // Parse the content and render
  const renderContent = () => {
    // Split content by sections (## headers)
    const sections = content.split(/(?=^## )/gm);
    
    return sections.map((section, sectionIndex) => {
      // Check if this section contains a diagram
      const diagramMatch = section.match(/```mermaid\n([\s\S]*?)\n```/);
      
      if (diagramMatch) {
        const [fullMatch, diagramCode] = diagramMatch;
        const beforeDiagram = section.slice(0, section.indexOf(fullMatch));
        const afterDiagram = section.slice(section.indexOf(fullMatch) + fullMatch.length);
        const diagramIdx = audioIndex++;

        return (
          <React.Fragment key={sectionIndex}>
            {beforeDiagram && renderTextContent(beforeDiagram, sectionIndex + '-before')}
            <div data-audio-index={diagramIdx} className={highlightClass(diagramIdx)}>
              <MermaidDiagram chart={diagramCode.trim()} />
            </div>
            {afterDiagram && renderTextContent(afterDiagram, sectionIndex + '-after')}
          </React.Fragment>
        );
      }
      
      return renderTextContent(section, sectionIndex);
    });
  };

  const renderTextContent = (text: string, key: string | number) => {
    // Step 1: Extract code blocks before splitting to protect them from paragraph splitting
    // Code blocks can contain blank lines that would otherwise be split incorrectly
    const codeBlocks: { language: string; code: string }[] = [];
    const processedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const index = codeBlocks.length;
      codeBlocks.push({ language: lang || '', code: code.trimEnd() });
      return `%%CODE_BLOCK_${index}%%`;
    });

    // Step 2: Now split by double newlines (code blocks are protected)
    const blocks = processedText.split(/\n\n+/);

    return (
      <div key={key}>
        {blocks.map((block, blockIndex) => {
          // Step 3: Check for code block placeholders first
          const codeBlockMatch = block.match(/^%%CODE_BLOCK_(\d+)%%$/);
          if (codeBlockMatch) {
            const codeBlockIndex = parseInt(codeBlockMatch[1], 10);
            const codeBlock = codeBlocks[codeBlockIndex];
            if (codeBlock) {
              const idx = audioIndex++;
              return (
                <div key={blockIndex} data-audio-index={idx} className={highlightClass(idx)}>
                  <HighlightedCode
                    code={codeBlock.code}
                    language={codeBlock.language}
                    className="my-6"
                  />
                </div>
              );
            }
          }

          // Check for headers
          if (block.startsWith('## ')) {
            const idx = audioIndex++;
            return (
              <h2 key={blockIndex} data-audio-index={idx} className={`text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200 ${highlightClass(idx)}`}>
                {parseInlineContent(block.slice(3), termsMap)}
              </h2>
            );
          }

          if (block.startsWith('### ')) {
            const idx = audioIndex++;
            return (
              <h3 key={blockIndex} data-audio-index={idx} className={`text-xl font-semibold text-gray-800 mt-8 mb-3 ${highlightClass(idx)}`}>
                {parseInlineContent(block.slice(4), termsMap)}
              </h3>
            );
          }

          // Defensive: handle code blocks that weren't matched by the regex (e.g., malformed)
          if (block.startsWith('```')) {
            const lines = block.split('\n');
            const language = lines[0].slice(3).trim();
            // Handle both proper code blocks and those without closing ```
            const hasClosingBackticks = lines[lines.length - 1] === '```';
            const code = hasClosingBackticks
              ? lines.slice(1, -1).join('\n')
              : lines.slice(1).join('\n');

            const idx = audioIndex++;
            return (
              <div key={blockIndex} data-audio-index={idx} className={highlightClass(idx)}>
                <HighlightedCode
                  code={code}
                  language={language}
                  className="my-6"
                />
              </div>
            );
          }

          // Check for blockquotes
          if (block.startsWith('> ')) {
            const quoteContent = block.split('\n').map(line => line.slice(2)).join('\n');
            const idx = audioIndex++;
            return (
              <blockquote key={blockIndex} data-audio-index={idx} className={`border-l-4 border-primary-400 bg-primary-50 pl-4 py-3 pr-4 my-6 rounded-r-lg ${highlightClass(idx)}`}>
                {parseInlineContent(quoteContent, termsMap)}
              </blockquote>
            );
          }

          // Check for unordered lists
          if (block.match(/^[\-\*] /m)) {
            const items = block.split(/\n/).filter(line => line.match(/^[\-\*] /));
            const idx = audioIndex++;
            return (
              <ul key={blockIndex} data-audio-index={idx} className={`my-4 pl-6 space-y-2 ${highlightClass(idx)}`}>
                {items.map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {parseInlineContent(item.slice(2), termsMap)}
                  </li>
                ))}
              </ul>
            );
          }

          // Check for ordered lists
          if (block.match(/^\d+\. /m)) {
            const items = block.split(/\n/).filter(line => line.match(/^\d+\. /));
            const idx = audioIndex++;
            return (
              <ol key={blockIndex} data-audio-index={idx} className={`my-4 pl-6 space-y-2 list-decimal ${highlightClass(idx)}`}>
                {items.map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {parseInlineContent(item.replace(/^\d+\. /, ''), termsMap)}
                  </li>
                ))}
              </ol>
            );
          }

          // Check for tables
          if (block.includes('|')) {
            const idx = audioIndex++;
            return renderTable(block, blockIndex, idx);
          }

          // Default to paragraph
          if (block.trim()) {
            const idx = audioIndex++;
            return (
              <p key={blockIndex} data-audio-index={idx} className={`text-gray-700 leading-relaxed mb-4 ${highlightClass(idx)}`}>
                {parseInlineContent(block, termsMap)}
              </p>
            );
          }

          return null;
        })}
      </div>
    );
  };

  const renderTable = (block: string, key: number, idx: number) => {
    const rows = block.split('\n').filter(row => row.trim());
    const headers = rows[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim());
    const dataRows = rows.slice(2).map(row =>
      row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
    );

    return (
      <div key={key} data-audio-index={idx} className={`my-6 overflow-x-auto ${highlightClass(idx)}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="bg-gray-100 text-left p-3 font-semibold border-b-2 border-gray-300">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3 border-b border-gray-200">
                    {parseInlineContent(cell, termsMap)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="lesson-content">
      {renderContent()}
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
