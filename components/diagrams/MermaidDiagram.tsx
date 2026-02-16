// components/diagrams/MermaidDiagram.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart || !containerRef.current) return;

      try {
        // Dynamic import to avoid SSR issues
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#0ea5e9',
            primaryTextColor: '#fff',
            primaryBorderColor: '#0284c7',
            lineColor: '#94a3b8',
            secondaryColor: '#f0f9ff',
            tertiaryColor: '#f8fafc',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
          },
        });

        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm ${className}`}>
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 animate-pulse ${className}`}>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`diagram-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
