'use client';

import React from 'react';
import MoeAnimation from './MoeAnimation';
import VisualDemo from './VisualDemo';

const MoeContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Understanding Mixture of Experts in Large Language Models
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center">
          An interactive visualization of how Mixture of Experts (MoE) architecture works in modern language models, 
          showing the flow from input through expert networks to final output.
        </p>
      </div>
      
      <div className="mb-16">
        <MoeAnimation />
      </div>
      
      <div className="mb-16">
        <VisualDemo />
      </div>
      
      <div className="max-w-3xl mx-auto prose dark:prose-invert mb-16">
        <h2>About Mixture of Experts (MoE)</h2>
        <p>
          Mixture of Experts (MoE) is an architectural approach used in modern large language models that enables 
          efficient scaling by selectively activating only parts of the network for each input. This allows models 
          to effectively grow in capacity without proportional increases in computation.
        </p>
        <h3>Key Benefits</h3>
        <ul>
          <li><strong>Computational Efficiency:</strong> Only activates relevant parts of the network</li>
          <li><strong>Specialized Processing:</strong> Different experts handle different types of inputs</li>
          <li><strong>Increased Model Capacity:</strong> Can scale to larger sizes with better efficiency</li>
          <li><strong>Improved Performance:</strong> Often results in better results on complex tasks</li>
        </ul>
        <h3>Applications</h3>
        <p>
          MoE architecture is used in models like Google's GLaM, Switch Transformers, and Anthropic's Claude models. 
          It has become a key design pattern in the most advanced AI systems, enabling larger and more capable models.
        </p>
      </div>
    </div>
  );
};

export default MoeContent; 