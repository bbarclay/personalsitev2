import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Real-World Applications</h2>
        
        <h3>Physics</h3>
        <ul>
          <li><strong>Projectile Motion:</strong> Calculating the trajectory of objects under gravity</li>
          <li><strong>Kinematics:</strong> Analyzing motion with constant acceleration</li>
          <li><strong>Optics:</strong> Determining focal points and image formation</li>
        </ul>

        <h3>Engineering</h3>
        <ul>
          <li><strong>Structural Analysis:</strong> Calculating maximum loads and stress points</li>
          <li><strong>Circuit Design:</strong> Analyzing electrical circuits and resonance</li>
          <li><strong>Control Systems:</strong> Modeling system responses and stability</li>
        </ul>

        <h3>Economics</h3>
        <ul>
          <li><strong>Profit Optimization:</strong> Finding maximum profit points</li>
          <li><strong>Cost Analysis:</strong> Determining break-even points</li>
          <li><strong>Market Equilibrium:</strong> Analyzing supply and demand curves</li>
        </ul>

        <h3>Computer Science</h3>
        <ul>
          <li><strong>Algorithm Analysis:</strong> Calculating time complexity</li>
          <li><strong>Graphics:</strong> Rendering curves and animations</li>
          <li><strong>Machine Learning:</strong> Optimizing model parameters</li>
        </ul>
      </div>
    </div>
  );
} 