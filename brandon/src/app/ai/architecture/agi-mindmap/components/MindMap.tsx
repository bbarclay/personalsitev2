'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';

const MindMap = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
    mermaid.contentLoaded();
  }, []);

  const mindmapContent = `mindmap
    root((AGI))
        Perception
            Sensory Processing
                Multi-Modal Integration
                Sensory Calibration
            Pattern Recognition
                Deep Learning Models
                Bayesian Inference
            Feature Extraction
                Saliency Mapping
                Semantic Analysis
        Cognition
            Reasoning Engine
                Logical Processing
                Causal Inference
            Planning System
                Goal Formulation
                Strategic Planning
            Learning System
                Supervised Learning
                Unsupervised Learning
                Reinforcement Learning
        Memory
            Working Memory
                Attention Focus
                Temporal Buffer
            Long-term Memory
                Semantic Networks
                Procedural Memory
            Episodic Memory
                Experience Storage
                Contextual Retrieval
        Action
            Decision Making
                Utility Maximization
                Risk Assessment
            Behavior Generation
                Action Sequencing
                Motion Planning
            Output Execution
                Effector Control
                Feedback Loops
        Meta-Cognitive[Meta-Cognitive System]
            Self-Monitoring
                Performance Evaluation
                Error Detection
            Adaptive Control
                Resource Allocation
                Strategy Adjustment
            Learning Optimization
                Meta-Learning
                Curriculum Design`;

  return (
    <div className="w-full overflow-x-auto mt-10 p-6 bg-gray-100/10 dark:bg-gray-900/30 rounded-xl border border-gray-200/20 dark:border-gray-800/20">
      <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        AGI Component Mindmap
      </h2>
      <div className="pre-mermaid">
        <pre className="mermaid">
          {mindmapContent}
        </pre>
      </div>
    </div>
  );
};

export default MindMap; 