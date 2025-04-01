'use client';

import React from 'react';
import MindMap from './MindMap';
import QuadrantChart from './QuadrantChart';
import Timeline from './Timeline';
import D3Chart from './D3Chart';

const AGIMindmap: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mt-16 tech-card p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-orbitron font-semibold mb-4 gradient-text">
          Why is Artificial General Intelligence so challenging?
        </h2>
        <p className="leading-relaxed">
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

      <div className="mt-16 tech-card p-6">
        <h2 className="text-xl font-orbitron font-semibold mb-3 gradient-text">References & Further Reading</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="https://arxiv.org/abs/2303.12712"
              className="hover:text-primary transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              A Survey of Artificial General Intelligence: Concepts, Approaches, and Challenges
            </a>
          </li>
          <li>
            <a
              href="https://plato.stanford.edu/entries/artificial-intelligence/"
              className="hover:text-primary transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanford Encyclopedia of Philosophy: Artificial Intelligence
            </a>
          </li>
          <li>
            <a
              href="https://www.deepmind.com/blog/building-safe-and-robust-systems"
              className="hover:text-primary transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              DeepMind: Building Safe and Robust AI Systems
            </a>
          </li>
          <li>
            <a
              href="https://openai.com/research/overview"
              className="hover:text-primary transition-colors duration-200"
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

export default AGIMindmap;
