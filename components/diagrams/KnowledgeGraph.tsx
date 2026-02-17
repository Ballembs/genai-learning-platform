// components/diagrams/KnowledgeGraph.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface KnowledgeGraphProps {
  nodes: Array<{
    id: string;
    label: string;
    type: 'lesson' | 'term';
    explored: boolean;
    quizScore?: number;
  }>;
  edges: Array<{
    from: string;
    to: string;
    type: 'contains' | 'related';
  }>;
  width?: number;
  height?: number;
  onNodeClick?: (nodeId: string, nodeType: 'lesson' | 'term') => void;
}

interface NodePosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function KnowledgeGraph({
  nodes,
  edges,
  width = 400,
  height = 280,
  onNodeClick,
}: KnowledgeGraphProps) {
  const [positions, setPositions] = useState<Map<string, NodePosition>>(new Map());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const positionsRef = useRef<Map<string, NodePosition>>(new Map());
  const frameRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // Initialize positions
  useEffect(() => {
    if (nodes.length === 0) return;

    const newPositions = new Map<string, NodePosition>();
    const lessonNodes = nodes.filter(n => n.type === 'lesson');
    const termNodes = nodes.filter(n => n.type === 'term');

    // Position lessons across the top
    lessonNodes.forEach((node, i) => {
      const spacing = width / (lessonNodes.length + 1);
      newPositions.set(node.id, {
        x: spacing * (i + 1),
        y: 50,
        vx: 0,
        vy: 0,
      });
    });

    // Position terms scattered below
    termNodes.forEach((node, i) => {
      const angle = (i / termNodes.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.25;
      newPositions.set(node.id, {
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + 30 + Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 30,
        vx: 0,
        vy: 0,
      });
    });

    positionsRef.current = newPositions;
    setPositions(new Map(newPositions));

    // Start simulation if we have enough nodes
    if (nodes.length > 3) {
      setIsSimulating(true);
      frameCountRef.current = 0;
    }
  }, [nodes, width, height]);

  // Force simulation
  useEffect(() => {
    if (!isSimulating || nodes.length <= 3) return;

    const repulsionStrength = nodes.length > 50 ? 2000 : 1000;
    const attractionStrength = 0.03;
    const centeringStrength = 0.005;
    const damping = 0.85;
    const maxFrames = 200;
    const minEnergy = 0.1;

    const simulate = () => {
      frameCountRef.current++;
      const pos = positionsRef.current;
      let totalEnergy = 0;

      // Create array for iteration
      const nodeArray = Array.from(pos.entries());

      // Apply forces
      nodeArray.forEach(([id, p]) => {
        let fx = 0;
        let fy = 0;

        // Repulsion from all other nodes
        nodeArray.forEach(([otherId, otherP]) => {
          if (id === otherId) return;
          const dx = p.x - otherP.x;
          const dy = p.y - otherP.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 50;
          if (dist < minDist * 3) {
            const force = repulsionStrength / (dist * dist);
            fx += (dx / dist) * Math.min(force, 50);
            fy += (dy / dist) * Math.min(force, 50);
          }
        });

        // Attraction to connected nodes
        edges.forEach(edge => {
          let otherId: string | null = null;
          if (edge.from === id) otherId = edge.to;
          else if (edge.to === id) otherId = edge.from;
          
          if (otherId && pos.has(otherId)) {
            const otherP = pos.get(otherId)!;
            const dx = otherP.x - p.x;
            const dy = otherP.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const idealDist = 80;
            const force = (dist - idealDist) * attractionStrength;
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          }
        });

        // Centering force
        fx += (width / 2 - p.x) * centeringStrength;
        fy += (height / 2 - p.y) * centeringStrength;

        // Update velocity with damping
        p.vx = (p.vx + fx) * damping;
        p.vy = (p.vy + fy) * damping;

        totalEnergy += p.vx * p.vx + p.vy * p.vy;
      });

      // Update positions
      nodeArray.forEach(([id, p]) => {
        const node = nodes.find(n => n.id === id);
        const radius = node?.type === 'lesson' ? 24 : 16;

        p.x = Math.max(radius + 10, Math.min(width - radius - 10, p.x + p.vx));
        p.y = Math.max(radius + 10, Math.min(height - radius - 10, p.y + p.vy));
      });

      // Update state every 3 frames for performance
      if (frameCountRef.current % 3 === 0) {
        setPositions(new Map(pos));
      }

      // Continue or stop simulation
      if (frameCountRef.current < maxFrames && totalEnergy > minEnergy) {
        frameRef.current = requestAnimationFrame(simulate);
      } else {
        setIsSimulating(false);
        setPositions(new Map(pos));
      }
    };

    frameRef.current = requestAnimationFrame(simulate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isSimulating, nodes, edges, width, height]);

  const getNodeRadius = (type: 'lesson' | 'term') => type === 'lesson' ? 24 : 16;

  const getNodeFill = (node: typeof nodes[0]) => {
    if (node.type === 'lesson') {
      return 'url(#lessonGradient)';
    }
    if (node.explored) {
      return 'url(#termExploredGradient)';
    }
    return '#475569'; // slate-600
  };

  const truncateLabel = (label: string, maxLen = 10) => {
    return label.length > maxLen ? label.slice(0, maxLen - 1) + '…' : label;
  };

  // Empty state
  if (nodes.length === 0) {
    return (
      <div 
        className="flex items-center justify-center text-slate-500 text-sm"
        style={{ width, height }}
      >
        <div className="text-center">
          <p>Explore terms to build your knowledge map</p>
        </div>
      </div>
    );
  }

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <defs>
        {/* Lesson node gradient */}
        <linearGradient id="lessonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        
        {/* Explored term gradient */}
        <linearGradient id="termExploredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        
        {/* Glow filter for explored terms */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Quiz passed ring */}
        <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((edge, i) => {
        const fromPos = positions.get(edge.from);
        const toPos = positions.get(edge.to);
        if (!fromPos || !toPos) return null;

        const isContains = edge.type === 'contains';
        
        return (
          <line
            key={`edge-${i}`}
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            stroke={isContains ? '#0e7490' : '#7c3aed'}
            strokeWidth={1}
            strokeOpacity={0.4}
            strokeDasharray={isContains ? undefined : '4 4'}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map(node => {
        const pos = positions.get(node.id);
        if (!pos) return null;

        const radius = getNodeRadius(node.type);
        const isHovered = hoveredNode === node.id;
        const scale = isHovered ? 1.15 : 1;
        const quizPassed = node.quizScore !== undefined && node.quizScore >= 70;

        return (
          <g
            key={node.id}
            transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}
            style={{ cursor: 'pointer', transition: 'transform 0.15s ease-out' }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeClick?.(node.id, node.type)}
          >
            {/* Quiz passed ring */}
            {quizPassed && (
              <circle
                r={radius + 4}
                fill="none"
                stroke="#22c55e"
                strokeWidth={2}
                filter="url(#greenGlow)"
              />
            )}
            
            {/* Main node circle */}
            <circle
              r={radius}
              fill={getNodeFill(node)}
              stroke={node.explored || node.type === 'lesson' ? 'none' : '#64748b'}
              strokeWidth={node.explored ? 0 : 1}
              strokeDasharray={node.explored ? undefined : '3 3'}
              filter={node.explored && node.type === 'term' ? 'url(#glow)' : undefined}
            />
            
            {/* Node label inside (for lessons) */}
            {node.type === 'lesson' && (
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize={10}
                fontWeight={600}
              >
                {node.label.slice(0, 2)}
              </text>
            )}

            {/* Label below node */}
            <text
              y={radius + 12}
              textAnchor="middle"
              fill={isHovered ? '#e2e8f0' : '#94a3b8'}
              fontSize={isHovered ? 11 : 9}
              fontWeight={isHovered ? 500 : 400}
            >
              {isHovered ? node.label : truncateLabel(node.label)}
            </text>
          </g>
        );
      })}

      {/* Tooltip for hovered node */}
      {hoveredNode && (() => {
        const node = nodes.find(n => n.id === hoveredNode);
        const pos = positions.get(hoveredNode);
        if (!node || !pos) return null;

        const tooltipWidth = 120;
        const tooltipX = Math.max(tooltipWidth/2, Math.min(width - tooltipWidth/2, pos.x));
        const tooltipY = pos.y - getNodeRadius(node.type) - 30;

        return (
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect
              x={-tooltipWidth/2}
              y={-12}
              width={tooltipWidth}
              height={24}
              rx={4}
              fill="#1e293b"
              stroke="#334155"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={10}
            >
              {node.type === 'lesson' ? '📚 ' : '✨ '}{node.label.slice(0, 15)}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
