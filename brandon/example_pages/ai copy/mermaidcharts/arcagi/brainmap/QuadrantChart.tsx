'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';

const QuadrantChart = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
    });
  }, []);

  const quadrantContent = `quadrantChart
    title AI Systems Capability Matrix
    x-axis Low Complexity --> High Complexity
    y-axis Low Intelligence --> High Intelligence
    quadrant-1 Advanced AI Systems
    quadrant-2 Specialized Tools
    quadrant-3 Basic Automation
    quadrant-4 Emerging Technologies
    ChatGPT: [0.8, 0.7]
    Image Generation: [0.6, 0.5]
    Robotics: [0.7, 0.4]
    Expert Systems: [0.3, 0.4]
    Game AI: [0.5, 0.6]
    Recommendation Systems: [0.4, 0.3]
    Voice Assistants: [0.5, 0.4]
    AGI: [0.9, 0.9]`;

  return (
    <div className="mt-16 tech-card p-6">
      <h2 className="text-xl font-orbitron font-semibold mb-3 gradient-text">Current AI Landscape</h2>
      <p className="leading-relaxed mb-6">
        This matrix illustrates the current state of AI technologies, mapping their complexity against intelligence levels.
        While many AI systems excel in specific domains, AGI remains at the frontier, demanding both highest complexity and
        intelligence levels.
      </p>
      <div className="pre-mermaid" style={{ minWidth: '800px', minHeight: '400px' }}>
        <pre className="mermaid">
          {quadrantContent}
        </pre>
      </div>
    </div>
  );
};

export default QuadrantChart;
