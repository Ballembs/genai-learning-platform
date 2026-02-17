// components/diagrams/MermaidDiagram.tsx
'use client';

import { useEffect, useId, useState, useCallback } from 'react';
import { AlertTriangle, Code } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Track if mermaid has been initialized globally
let mermaidInitialized = false;

function MermaidDiagramInner({ chart, className = '' }: MermaidDiagramProps) {
  const uniqueId = useId();
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRawCode, setShowRawCode] = useState(false);

  // Clean the chart string - remove leading/trailing whitespace
  const cleanChart = chart.trim();

  // Create a stable, valid HTML ID from the React useId
  const diagramId = `mermaid-${uniqueId.replace(/:/g, '-')}`;

  const renderDiagram = useCallback(async () => {
    if (!cleanChart) {
      setError('No diagram code provided');
      setIsLoading(false);
      return;
    }

    try {
      // Dynamic import mermaid
      const mermaid = (await import('mermaid')).default;

      // Initialize mermaid only once
      if (!mermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 20,
          },
          themeVariables: {
            primaryColor: '#0ea5e9',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#0284c7',
            lineColor: '#64748b',
            secondaryColor: '#f0f9ff',
            tertiaryColor: '#f8fafc',
            background: '#ffffff',
            mainBkg: '#ffffff',
            nodeBorder: '#0284c7',
            clusterBkg: '#f8fafc',
            titleColor: '#1e293b',
            edgeLabelBackground: '#ffffff',
          },
        });
        mermaidInitialized = true;
      }

      // Generate a unique element ID for this render
      const elementId = `diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Render the diagram
      const { svg: renderedSvg } = await mermaid.render(elementId, cleanChart);

      setSvg(renderedSvg);
      setError(null);
    } catch (err) {
      console.error('Mermaid rendering error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to render diagram';
      setError(errorMessage);
      setSvg('');
    } finally {
      setIsLoading(false);
    }
  }, [cleanChart]);

  useEffect(() => {
    // Reset state when chart changes
    setIsLoading(true);
    setError(null);
    setSvg('');
    setShowRawCode(false);

    renderDiagram();
  }, [renderDiagram]);

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${className}`}
        style={{ minHeight: '200px' }}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-500">Rendering diagram...</p>
        </div>
      </div>
    );
  }

  // Error state - show raw code as fallback
  if (error) {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-xl overflow-hidden ${className}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-200 bg-amber-100/50">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Diagram rendering failed</span>
          </div>
          <button
            onClick={() => setShowRawCode(!showRawCode)}
            className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-800 transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
            {showRawCode ? 'Hide' : 'Show'} code
          </button>
        </div>

        {showRawCode && (
          <div className="p-4">
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{cleanChart}</code>
            </pre>
          </div>
        )}

        <div className="px-4 py-3 text-xs text-amber-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  // Success - render the SVG
  return (
    <div
      id={diagramId}
      className={`diagram-container bg-white border border-gray-100 rounded-xl p-4 overflow-x-auto ${className}`}
      style={{ minHeight: '100px' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// Export a wrapper that only renders on client
// This prevents any SSR issues with mermaid
export function MermaidDiagram(props: MermaidDiagramProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // SSR placeholder
    return (
      <div
        className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${props.className || ''}`}
        style={{ minHeight: '200px' }}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mb-3" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return <MermaidDiagramInner {...props} />;
}
