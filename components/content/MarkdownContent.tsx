// components/content/MarkdownContent.tsx
'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ClickableTerm } from '@/components/lesson/ClickableTerm';
import { HighlightedCode } from './HighlightedCode';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown content with:
 * - GFM support (tables, strikethrough, etc.)
 * - Syntax-highlighted code blocks
 * - Clickable [term] syntax converted to ClickableTerm components
 * - Styled inline code, links, and other elements
 */
export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  // Preprocess content to convert [term] syntax to a custom marker
  // We use a placeholder that won't conflict with markdown syntax
  // Format: %%TERM:termId:termText%%
  const processedContent = useMemo(() => {
    return content.replace(/\[([^\]]+)\]/g, (_, termText) => {
      const termId = termText.toLowerCase().replace(/\s+/g, '-');
      return `%%TERM:${termId}:${termText}%%`;
    });
  }, [content]);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
              {processTermMarkers(children)}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              {processTermMarkers(children)}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              {processTermMarkers(children)}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
              {processTermMarkers(children)}
            </h4>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">
              {processTermMarkers(children)}
            </p>
          ),

          // Code blocks (handled by rehype-highlight for syntax coloring)
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto my-6 text-sm">
              {children}
            </pre>
          ),

          // Inline code
          code: ({ className, children, ...props }) => {
            // Check if this is inside a pre (code block) or inline
            const isInline = !className?.includes('language-');

            if (isInline) {
              return (
                <code className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }

            // For code blocks, let rehype-highlight handle the className
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {processTermMarkers(children)}
            </a>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="my-4 pl-6 space-y-2 list-disc marker:text-gray-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 pl-6 space-y-2 list-decimal marker:text-gray-500">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">
              {processTermMarkers(children)}
            </li>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-400 bg-primary-50 pl-4 py-3 pr-4 my-6 rounded-r-lg italic text-gray-700">
              {children}
            </blockquote>
          ),

          // Tables
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left p-3 font-semibold border-b-2 border-gray-300">
              {processTermMarkers(children)}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-b border-gray-200">
              {processTermMarkers(children)}
            </td>
          ),

          // Horizontal rule
          hr: () => <hr className="my-8 border-gray-200" />,

          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {processTermMarkers(children)}
            </strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic">{processTermMarkers(children)}</em>
          ),

          // Strikethrough (GFM)
          del: ({ children }) => (
            <del className="line-through text-gray-500">{children}</del>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Process children to find and replace %%TERM:id:text%% markers with ClickableTerm components
 */
function processTermMarkers(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return parseTermMarkers(child);
    }
    if (React.isValidElement(child) && child.props.children) {
      return React.cloneElement(child, {
        ...child.props,
        children: processTermMarkers(child.props.children),
      });
    }
    return child;
  });
}

/**
 * Parse a string and replace %%TERM:id:text%% markers with ClickableTerm components
 */
function parseTermMarkers(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /%%TERM:([^:]+):([^%]+)%%/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the marker
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const [, termId, termText] = match;
    parts.push(
      <ClickableTerm key={`${termId}-${match.index}`} termId={termId}>
        {termText}
      </ClickableTerm>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no markers found, return original text
  if (parts.length === 0) {
    return text;
  }

  return parts.length === 1 ? parts[0] : parts;
}

/**
 * Simple code block component for standalone code rendering
 * Uses highlight.js directly for reliable syntax coloring
 */
export function CodeBlock({
  code,
  language = 'javascript',
  className = '',
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  return (
    <HighlightedCode
      code={code}
      language={language}
      className={className}
    />
  );
}
