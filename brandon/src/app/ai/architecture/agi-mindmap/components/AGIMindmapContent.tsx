'use client';

import React from 'react';
import MindMap from './MindMap';
import QuadrantChart from './QuadrantChart';
import Timeline from './Timeline';
import D3Chart from './D3Chart';

const AGIMindmapContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          AGI System Architecture Mindmap
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center">
          A comprehensive visualization of Artificial General Intelligence (AGI) system architecture components and their relationships.
        </p>
      </div>

      <div className="mt-16 tech-card p-6 backdrop-blur-lg bg-gray-100/10 dark:bg-gray-900/30 rounded-xl border border-gray-200/20 dark:border-gray-800/20">
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Why is Artificial General Intelligence so challenging?
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Achieving Artificial General Intelligence (AGI) represents one of the most complex challenges in computer science.
          Unlike narrow AI systems that excel at specific tasks, AGI requires the integration of multiple sophisticated
          cognitive capabilities - from perception and reasoning to learning and self-awareness - all working in harmony.
          The challenge lies not just in replicating individual human mental capabilities, but in creating a unified system
          that can seamlessly combine these functions while maintaining flexibility, adaptability, and general problem-solving abilities
          across any domain.
        </p>
      </div>

      <MindMap />
      <QuadrantChart />
      <D3Chart />
      <Timeline />

      <div className="mt-16 tech-card p-6 bg-gray-100/10 dark:bg-gray-900/30 rounded-xl border border-gray-200/20 dark:border-gray-800/20">
        <h2 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          References & Further Reading
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <a
              href="https://arxiv.org/abs/2303.12712"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              A Survey of Artificial General Intelligence: Concepts, Approaches, and Challenges
            </a>
          </li>
          <li>
            <a
              href="https://plato.stanford.edu/entries/artificial-intelligence/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanford Encyclopedia of Philosophy: Artificial Intelligence
            </a>
          </li>
          <li>
            <a
              href="https://www.deepmind.com/blog/building-safe-and-robust-systems"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              DeepMind: Building Safe and Robust AI Systems
            </a>
          </li>
          <li>
            <a
              href="https://openai.com/research/overview"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Research Overview
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AGIMindmapContent; 