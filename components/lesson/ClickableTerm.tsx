// components/lesson/ClickableTerm.tsx
'use client';

import { useCallback, useRef } from 'react';
import { usePopupStore, useUserStore } from '@/lib/store';

interface ClickableTermProps {
  termId: string;
  children: React.ReactNode;
  className?: string;
}

export function ClickableTerm({ termId, children, className = '' }: ClickableTermProps) {
  const termRef = useRef<HTMLSpanElement>(null);
  const { openPopup } = usePopupStore();
  const { hasExplored } = useUserStore();
  
  const isExplored = hasExplored(termId);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (termRef.current) {
      const rect = termRef.current.getBoundingClientRect();
      const position = {
        x: rect.left + rect.width / 2,
        y: rect.bottom + 8,
      };
      
      // Extract term name from children
      const termName = typeof children === 'string' 
        ? children 
        : termRef.current.textContent || termId;
      
      openPopup(termId, termName, position);
    }
  }, [termId, children, openPopup]);

  return (
    <span
      ref={termRef}
      onClick={handleClick}
      className={`
        clickable-term
        ${isExplored ? 'clickable-term--explored' : ''}
        ${className}
      `}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${children}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as any);
        }
      }}
    >
      {children}
    </span>
  );
}

// ============================================
// MARKDOWN PARSER UTILITY
// ============================================

/**
 * Parse content with [term] syntax and replace with ClickableTerm components
 * 
 * Usage:
 * const content = "RAG uses [embeddings] to find [relevant chunks]"
 * const parsed = parseClickableTerms(content, termsMap)
 */

interface TermDefinition {
  id: string;
  displayText: string;
}

export function parseClickableTerms(
  content: string,
  termsMap: Record<string, TermDefinition>
): (string | React.ReactElement)[] {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    // Get the term text inside brackets
    const termText = match[1];
    const termKey = termText.toLowerCase().replace(/\s+/g, '-');
    const termDef = termsMap[termKey];

    if (termDef) {
      // Known term - make it clickable
      parts.push(
        <ClickableTerm key={`${termDef.id}-${match.index}`} termId={termDef.id}>
          {termDef.displayText || termText}
        </ClickableTerm>
      );
    } else {
      // Unknown term - still make it clickable (will be AI-generated)
      parts.push(
        <ClickableTerm key={`${termKey}-${match.index}`} termId={termKey}>
          {termText}
        </ClickableTerm>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
}

// ============================================
// REACT COMPONENT FOR RENDERING PARSED CONTENT
// ============================================

interface ParsedContentProps {
  content: string;
  terms?: Record<string, TermDefinition>;
  className?: string;
}

export function ParsedContent({ content, terms = {}, className = '' }: ParsedContentProps) {
  const parsed = parseClickableTerms(content, terms);
  
  return (
    <span className={className}>
      {parsed.map((part, index) => (
        typeof part === 'string' ? part : <span key={index}>{part}</span>
      ))}
    </span>
  );
}
