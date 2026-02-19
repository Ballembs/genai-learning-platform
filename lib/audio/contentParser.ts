// lib/audio/contentParser.ts
// Converts lesson markdown into audio-ready segments

export interface AudioSegment {
  /** Index matching the rendered block's data-audio-index attribute */
  index: number;
  /** Clean text for the speech engine to read */
  text: string;
  /** Type of content block */
  type: 'heading' | 'paragraph' | 'blockquote' | 'list' | 'code-skip' | 'diagram-skip' | 'table-skip';
  /** Original raw markdown (for debugging) */
  raw: string;
}

/**
 * Parse lesson markdown content into audio segments.
 *
 * Rules:
 * - Code blocks → "There's a code example on screen."
 * - Mermaid diagrams → "There's a diagram on screen."
 * - Tables → "There's a table on screen."
 * - [bracketed terms] → read the term name (strip brackets)
 * - **bold** / *italic* → read the text (strip markers)
 * - `inline code` → read the text (strip backticks)
 * - Headers → read as text
 * - Blockquotes → read as text (strip > prefix)
 * - Lists → read items naturally with "First,", "Next,", "Also,"
 */
export function parseContentForAudio(markdown: string): AudioSegment[] {
  const segments: AudioSegment[] = [];
  let index = 0;

  // Split by sections first (## headers), same way LessonContent.tsx does
  const sections = markdown.split(/(?=^## )/gm);

  for (const section of sections) {
    // Check for mermaid diagrams within sections
    const diagramMatch = section.match(/```mermaid\n[\s\S]*?\n```/);

    if (diagramMatch) {
      const beforeDiagram = section.slice(0, section.indexOf(diagramMatch[0]));
      const afterDiagram = section.slice(
        section.indexOf(diagramMatch[0]) + diagramMatch[0].length
      );

      if (beforeDiagram.trim()) {
        index = parseBlocks(beforeDiagram, segments, index);
      }

      // The diagram itself
      segments.push({
        index: index++,
        text: "There's a diagram on screen showing how this works.",
        type: 'diagram-skip',
        raw: diagramMatch[0],
      });

      if (afterDiagram.trim()) {
        index = parseBlocks(afterDiagram, segments, index);
      }
    } else {
      index = parseBlocks(section, segments, index);
    }
  }

  return segments;
}

function parseBlocks(text: string, segments: AudioSegment[], startIndex: number): number {
  let index = startIndex;
  const blocks = text.split(/\n\n+/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Header
    if (trimmed.startsWith('## ')) {
      segments.push({
        index: index++,
        text: cleanForSpeech(trimmed.slice(3)),
        type: 'heading',
        raw: trimmed,
      });
      continue;
    }

    if (trimmed.startsWith('### ')) {
      segments.push({
        index: index++,
        text: cleanForSpeech(trimmed.slice(4)),
        type: 'heading',
        raw: trimmed,
      });
      continue;
    }

    // Code block
    if (trimmed.startsWith('```')) {
      segments.push({
        index: index++,
        text: "There's a code example on screen.",
        type: 'code-skip',
        raw: trimmed,
      });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed
        .split('\n')
        .map((line) => line.replace(/^>\s?/, ''))
        .join(' ');
      segments.push({
        index: index++,
        text: cleanForSpeech(quoteText),
        type: 'blockquote',
        raw: trimmed,
      });
      continue;
    }

    // Unordered list
    if (trimmed.match(/^[-*] /m)) {
      const items = trimmed
        .split('\n')
        .filter((line) => line.match(/^[-*] /))
        .map((line) => cleanForSpeech(line.slice(2)));

      const spoken = items
        .map((item, i) => {
          if (i === 0) return item;
          if (i === items.length - 1) return `And finally, ${item}`;
          return item;
        })
        .join('. ');

      segments.push({
        index: index++,
        text: spoken,
        type: 'list',
        raw: trimmed,
      });
      continue;
    }

    // Ordered list
    if (trimmed.match(/^\d+\. /m)) {
      const items = trimmed
        .split('\n')
        .filter((line) => line.match(/^\d+\. /))
        .map((line) => cleanForSpeech(line.replace(/^\d+\.\s*/, '')));

      const prefixes = ['First,', 'Then,', 'Next,', 'Then,', 'Finally,'];
      const spoken = items
        .map((item, i) => `${prefixes[Math.min(i, prefixes.length - 1)]} ${item}`)
        .join('. ');

      segments.push({
        index: index++,
        text: spoken,
        type: 'list',
        raw: trimmed,
      });
      continue;
    }

    // Table
    if (trimmed.includes('|') && trimmed.includes('\n')) {
      segments.push({
        index: index++,
        text: "There's a table on screen with more details.",
        type: 'table-skip',
        raw: trimmed,
      });
      continue;
    }

    // Regular paragraph
    if (trimmed) {
      segments.push({
        index: index++,
        text: cleanForSpeech(trimmed),
        type: 'paragraph',
        raw: trimmed,
      });
    }
  }

  return index;
}

/**
 * Clean markdown syntax from text for natural speech.
 */
function cleanForSpeech(text: string): string {
  return (
    text
      // [bracketed terms] → just the term name
      .replace(/\[([^\]]+)\]/g, '$1')
      // **bold** → just the text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      // *italic* → just the text
      .replace(/\*([^*]+)\*/g, '$1')
      // `inline code` → just the text
      .replace(/`([^`]+)`/g, '$1')
      // Clean up extra whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}
