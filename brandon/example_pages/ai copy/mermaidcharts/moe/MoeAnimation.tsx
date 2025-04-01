import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Split,
  Router,
  Network,
  Brain,
  Combine,
  MessageSquare,
  Workflow,
  Scale,
  Variable
} from 'lucide-react';

const MoEAnimation = () => {
  const [animationOffset, setAnimationOffset] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [hoveredNode, setHoveredNode] = useState<keyof typeof nodeDescriptions | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 100);
    }, animationSpeed);
    return () => clearInterval(interval);
  }, [animationSpeed]);

  const nodeDescriptions = {
    input: "Processes raw text input before tokenization",
    tokenizer: "Converts text into tokens for model processing",
    router: "Determines which experts handle specific inputs",
    expert1: "Specializes in grammar and syntax",
    expert2: "Focuses on contextual understanding",
    expert3: "Handles domain-specific knowledge",
    combiner: "Merges expert outputs into coherent response",
    output: "Final processed text output"
  };

  const nodes = {
    input: { x: 100, y: 250, label: 'Input Text' },
    tokenizer: { x: 250, y: 250, label: 'Tokenizer' },
    router: { x: 400, y: 250, label: 'Router Network' },
    expert1: { x: 550, y: 150, label: 'Expert 1' },
    expert2: { x: 550, y: 250, label: 'Expert 2' },
    expert3: { x: 550, y: 350, label: 'Expert 3' },
    combiner: { x: 700, y: 250, label: 'Combination Layer' },
    output: { x: 850, y: 250, label: 'Output Text' }
  };

  const iconMap = {
    input: { icon: MessageCircle, color: '#60A5FA' },
    tokenizer: { icon: Split, color: '#34D399' },
    router: { icon: Router, color: '#F472B6' },
    expert1: { icon: Brain, color: '#FBBF24' },
    expert2: { icon: Brain, color: '#FBBF24' },
    expert3: { icon: Brain, color: '#FBBF24' },
    combiner: { icon: Combine, color: '#8B5CF6' },
    output: { icon: MessageSquare, color: '#60A5FA' }
  };

  const paths = [
    {
      id: 'input-tokenizer',
      d: `M ${nodes.input.x + 60} ${nodes.input.y} L ${nodes.tokenizer.x - 60} ${nodes.tokenizer.y}`,
      color: '#60A5FA'
    },
    {
      id: 'tokenizer-router',
      d: `M ${nodes.tokenizer.x + 60} ${nodes.tokenizer.y} L ${nodes.router.x - 60} ${nodes.router.y}`,
      color: '#34D399'
    },
    {
      id: 'router-expert1',
      d: `M ${nodes.router.x + 40} ${nodes.router.y} L ${nodes.expert1.x - 40} ${nodes.expert1.y}`,
      color: '#F472B6'
    },
    {
      id: 'router-expert2',
      d: `M ${nodes.router.x + 40} ${nodes.router.y} L ${nodes.expert2.x - 40} ${nodes.expert2.y}`,
      color: '#F472B6'
    },
    {
      id: 'router-expert3',
      d: `M ${nodes.router.x + 40} ${nodes.router.y} L ${nodes.expert3.x - 40} ${nodes.expert3.y}`,
      color: '#F472B6'
    },
    {
      id: 'expert1-combiner',
      d: `M ${nodes.expert1.x + 40} ${nodes.expert1.y} L ${nodes.combiner.x - 40} ${nodes.combiner.y}`,
      color: '#FBBF24'
    },
    {
      id: 'expert2-combiner',
      d: `M ${nodes.expert2.x + 40} ${nodes.expert2.y} L ${nodes.combiner.x - 40} ${nodes.combiner.y}`,
      color: '#FBBF24'
    },
    {
      id: 'expert3-combiner',
      d: `M ${nodes.expert3.x + 40} ${nodes.expert3.y} L ${nodes.combiner.x - 40} ${nodes.combiner.y}`,
      color: '#FBBF24'
    },
    {
      id: 'combiner-output',
      d: `M ${nodes.combiner.x + 60} ${nodes.combiner.y} L ${nodes.output.x - 60} ${nodes.output.y}`,
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold">
        Mixture of Experts (MoE) Processing Flow
      </h2>

      <div className="flex items-center space-x-4 mb-2">
        <label className="text-sm">Animation Speed:</label>
        <input
          type="range"
          min="20"
          max="200"
          value={200 - animationSpeed}
          onChange={(e) => setAnimationSpeed(200 - parseInt(e.target.value))}
          className="w-32"
        />
      </div>

      <div className="relative w-full aspect-[16/9]">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          {/* Background grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated Flow Paths */}
          {paths.map((path) => (
            <g key={path.id}>
              <path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth="3"
                className="opacity-10"
              />
              <path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth="3"
                strokeDasharray="6,6"
                strokeDashoffset={-animationOffset}
                className="opacity-70"
              />
            </g>
          ))}

          {/* Nodes with Icons and Hover Effects */}
          {Object.entries(nodes).map(([key, node]) => {
            const IconComponent = iconMap[key as keyof typeof iconMap].icon;
            return (
              <g
                key={key}
                transform={`translate(${node.x - 40},${node.y - 40})`}
                onMouseEnter={(e) => {
                  setHoveredNode(key as keyof typeof nodeDescriptions);
                  setTooltipPos({
                    x: e.clientX,
                    y: e.clientY
                  });
                }}
                onMouseLeave={() => setHoveredNode(null)}
                className="transition-transform duration-200 hover:scale-110 cursor-pointer"
              >
                <IconComponent
                  size={80}
                  color={iconMap[key as keyof typeof iconMap].color}
                  strokeWidth={1.5}
                  className="drop-shadow-lg"
                />
                <text
                  textAnchor="middle"
                  x="40"
                  y="100"
                  className="text-sm font-semibold fill-current text-gray-200"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(20,20)">
            <text className="text-sm font-medium fill-current text-gray-300">
              Process Flow:
            </text>
            {[
              { color: '#60A5FA', label: 'Text Input/Output' },
              { color: '#34D399', label: 'Tokenization' },
              { color: '#F472B6', label: 'Router Distribution' },
              { color: '#FBBF24', label: 'Expert Processing' },
              { color: '#8B5CF6', label: 'Output Combination' }
            ].map((item, i) => (
              <g key={i} transform={`translate(0,${20 * (i + 1)})`}>
                <line
                  x1="0"
                  y1="0"
                  x2="20"
                  y2="0"
                  stroke={item.color}
                  strokeWidth="3"
                />
                <text
                  x="30"
                  y="5"
                  className="text-xs fill-current text-gray-300"
                >
                  {item.label}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Tooltip */}
        {hoveredNode && (
          <div
            className="absolute z-10 bg-gray-800 text-white p-2 rounded-lg text-sm shadow-lg"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translate(-50%, -100%)',
              maxWidth: '200px'
            }}
          >
            {nodeDescriptions[hoveredNode]}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoEAnimation;
