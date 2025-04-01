'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';

const Timeline = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#4338ca',
        primaryTextColor: '#fff',
        primaryBorderColor: '#6366f1',
        lineColor: '#6366f1',
        textColor: '#fff',
        fontSize: '16px'
      },
      securityLevel: 'loose',
    });
  }, []);

  const timelineContent = `timeline
    title Evolution Towards AGI
    section Early AI
      1950 : Turing Test Proposed
      1956 : Dartmouth Conference
      1960s : Expert Systems
    section Machine Learning Era
      1980s : Neural Networks
      1990s : Support Vector Machines
      2000s : Deep Learning Emergence
    section Modern AI
      2010s : Deep Learning Revolution
      2017 : Transformer Architecture
      2020 : GPT-3 & Foundation Models
    section Future Milestones
      2025 : Advanced Multimodal AI
      2030 : Strong Narrow AI
      ???? : AGI Achievement`;

  return (
    <div className="mt-16 p-6 bg-gray-900 backdrop-blur-lg rounded-xl border border-gray-800/40">
      <h2 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        The Path to AGI
      </h2>
      <p className="leading-relaxed mb-6 text-gray-300">
        The journey towards AGI has been marked by significant milestones and breakthroughs.
        This timeline illustrates key developments in AI history and projects potential future achievements.
      </p>
      <div className="pre-mermaid overflow-x-auto">
        <pre className="mermaid text-white">
          {timelineContent}
        </pre>
      </div>
    </div>
  );
};

export default Timeline; 