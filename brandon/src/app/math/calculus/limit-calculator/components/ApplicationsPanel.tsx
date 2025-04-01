"use client";

import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Applications of Limits</h2>
      
      <section>
        <h3>Calculus Foundations</h3>
        <p>Limits form the foundation of calculus and are used to define:</p>
        <ul>
          <li><strong>Derivatives:</strong> The limit of the difference quotient as h approaches 0</li>
          <li><strong>Integrals:</strong> The limit of Riemann sums</li>
          <li><strong>Sequences and Series:</strong> The limit of partial sums</li>
          <li><strong>Continuity:</strong> A function is continuous when its limits equal its values</li>
        </ul>
      </section>
      
      <section>
        <h3>Physics</h3>
        <p>Limits help describe physical phenomena:</p>
        <ul>
          <li>Instantaneous velocity and acceleration</li>
          <li>Quantum mechanics (wave functions)</li>
          <li>Thermodynamic limits and phase transitions</li>
          <li>Approximations near singularities (black holes)</li>
        </ul>
      </section>
      
      <section>
        <h3>Engineering</h3>
        <p>Engineers use limits for:</p>
        <ul>
          <li>Analyzing stability of systems</li>
          <li>Signal processing (Fourier analysis)</li>
          <li>Control systems (feedback loops)</li>
          <li>Numerical approximations</li>
        </ul>
      </section>
      
      <section>
        <h3>Economics</h3>
        <p>Limits are applied in:</p>
        <ul>
          <li>Marginal analysis (cost, revenue, profit)</li>
          <li>Optimizing production and consumption</li>
          <li>Long-term growth models</li>
          <li>Asymptotic behavior of economic systems</li>
        </ul>
      </section>
      
      <section>
        <h3>Computer Science</h3>
        <p>Applications include:</p>
        <ul>
          <li>Algorithm analysis (asymptotic complexity)</li>
          <li>Numerical methods and approximations</li>
          <li>Machine learning convergence</li>
          <li>Computer graphics (ray tracing, lighting)</li>
        </ul>
      </section>
    </div>
  );
} 