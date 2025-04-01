'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Server,
  Database,
  ArrowDownToLine as Input,
  Shield,
  Cpu,
  HardDrive as Memory,
  Layers as LayersDifference,
  ArrowUpFromLine as Output,
  RefreshCw,
  BarChart2 as BarChart,
  Activity,
  CircleDot as CircleEqual
} from 'lucide-react';

const D3Chart = () => {
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Extended node positions with vertical layout
  const nodes: { [key in keyof typeof iconMap]: { x: number; y: number; label: string } } = {
    input: { x: 100, y: 150, label: 'Input Layer' },
    validation: { x: 100, y: 300, label: 'Validation' },
    preprocessing: { x: 100, y: 450, label: 'Preprocessing' },
    processing: { x: 300, y: 150, label: 'Processing Core' },
    memory: { x: 300, y: 300, label: 'Memory Store' },
    cache: { x: 300, y: 450, label: 'Cache Layer' },
    output: { x: 500, y: 150, label: 'Output Layer' },
    feedback: { x: 400, y: 50, label: 'Feedback Loop' },
    analytics: { x: 500, y: 300, label: 'Analytics' },
    monitoring: { x: 500, y: 450, label: 'Monitoring' },
    training: { x: 700, y: 150, label: 'Training Module' },
    evaluation: { x: 700, y: 300, label: 'Evaluation' },
    deployment: { x: 700, y: 450, label: 'Deployment' }
  };

  const iconMap = {
    input: { icon: Input, color: '#60A5FA' },
    validation: { icon: Shield, color: '#34D399' },
    preprocessing: { icon: LayersDifference, color: '#34D399' },
    processing: { icon: Cpu, color: '#F472B6' },
    memory: { icon: Memory, color: '#34D399' },
    cache: { icon: Database, color: '#34D399' },
    output: { icon: Output, color: '#F472B6' },
    feedback: { icon: RefreshCw, color: '#FBBF24' },
    analytics: { icon: BarChart, color: '#F472B6' },
    monitoring: { icon: Activity, color: '#F472B6' },
    training: { icon: Settings, color: '#10B981' },
    evaluation: { icon: CircleEqual, color: '#F59E0B' },
    deployment: { icon: Server, color: '#8B5CF6' }
  };

  // Extended flow paths
  const paths = [
    {
      id: 'input-processing',
      d: `M ${nodes.input.x + 60} ${nodes.input.y} L ${nodes.processing.x - 60} ${nodes.processing.y}`,
      color: '#60A5FA' // Brighter blue for dark mode
    },
    {
      id: 'validation-preprocessing',
      d: `M ${nodes.validation.x} ${nodes.validation.y + 40} L ${nodes.preprocessing.x} ${nodes.preprocessing.y - 40}`,
      color: '#34D399' // Brighter green for dark mode
    },
    {
      id: 'processing-memory',
      d: `M ${nodes.processing.x} ${nodes.processing.y + 40} L ${nodes.memory.x} ${nodes.memory.y - 40}`,
      color: '#34D399'
    },
    {
      id: 'memory-cache',
      d: `M ${nodes.memory.x} ${nodes.memory.y + 40} L ${nodes.cache.x} ${nodes.cache.y - 40}`,
      color: '#34D399'
    },
    {
      id: 'processing-output',
      d: `M ${nodes.processing.x + 60} ${nodes.processing.y} L ${nodes.output.x - 60} ${nodes.output.y}`,
      color: '#F472B6' // Brighter pink for dark mode
    },
    {
      id: 'processing-feedback',
      d: `M ${nodes.processing.x + 40} ${nodes.processing.y - 40} Q ${nodes.feedback.x} ${nodes.feedback.y} ${nodes.output.x - 40} ${nodes.output.y - 40}`,
      color: '#FBBF24' // Brighter yellow for dark mode
    },
    {
      id: 'output-analytics',
      d: `M ${nodes.output.x} ${nodes.output.y + 40} L ${nodes.analytics.x} ${nodes.analytics.y - 40}`,
      color: '#F472B6'
    },
    {
      id: 'analytics-monitoring',
      d: `M ${nodes.analytics.x} ${nodes.analytics.y + 40} L ${nodes.monitoring.x} ${nodes.monitoring.y - 40}`,
      color: '#F472B6'
    },
    {
      id: 'output-training',
      d: `M ${nodes.output.x + 60} ${nodes.output.y} L ${nodes.training.x - 60} ${nodes.training.y}`,
      color: '#10B981' // Brighter teal for dark mode
    },
    {
      id: 'training-evaluation',
      d: `M ${nodes.training.x} ${nodes.training.y + 40} L ${nodes.evaluation.x} ${nodes.evaluation.y - 40}`,
      color: '#F59E0B' // Brighter amber for dark mode
    },
    {
      id: 'evaluation-deployment',
      d: `M ${nodes.evaluation.x} ${nodes.evaluation.y + 40} L ${nodes.deployment.x} ${nodes.deployment.y - 40}`,
      color: '#8B5CF6' // Brighter purple for dark mode
    }
  ];

  return (
    <div className="mt-16 p-6 bg-gray-100/10 dark:bg-gray-900/30 rounded-xl border border-gray-200/20 dark:border-gray-800/20">
      <h2 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        AGI System Architecture
      </h2>
      <div className="space-y-4 mb-6">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          This architectural diagram illustrates the intricate components and data flows within an AGI system. At its core,
          the system processes information through multiple specialized layers, each contributing to the overall cognitive capabilities.
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          The input layer manages raw data ingestion, while validation and preprocessing ensure data quality and standardization.
          The processing core, integrated with a sophisticated memory store and cache layer, enables complex reasoning and pattern recognition.
          The feedback loop facilitates continuous learning and self-improvement, while the analytics and monitoring systems ensure
          performance optimization and system health.
        </p>
      </div>

      <div className="w-full h-[600px] bg-gray-900 rounded-lg p-4">
        <svg className="w-full h-full">
          {/* Background grid for depth */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Flow Paths with Animated Dashes */}
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

          {/* Nodes */}
          {Object.entries(nodes).map(([key, node]) => {
            const IconComponent = iconMap[key as keyof typeof iconMap].icon;
            return (
              <g key={key} transform={`translate(${node.x-40},${node.y-40})`}>
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
        </svg>
      </div>
    </div>
  );
};

export default D3Chart; 