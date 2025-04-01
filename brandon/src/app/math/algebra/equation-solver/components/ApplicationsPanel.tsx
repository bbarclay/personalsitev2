"use client";

import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Real-World Applications</h2>
      
      <section>
        <h3>Physics</h3>
        <p>Equations are fundamental in physics for describing relationships between physical quantities:</p>
        <ul>
          <li>Newton's Second Law: F = ma</li>
          <li>Einstein's Mass-Energy Equivalence: E = mc²</li>
          <li>Projectile motion equations</li>
          <li>Wave equations</li>
        </ul>
      </section>
      
      <section>
        <h3>Engineering</h3>
        <p>Engineers use equations to:</p>
        <ul>
          <li>Calculate structural loads and stresses</li>
          <li>Design electrical circuits</li>
          <li>Optimize manufacturing processes</li>
          <li>Model fluid dynamics</li>
        </ul>
      </section>
      
      <section>
        <h3>Finance and Economics</h3>
        <p>Equations help in:</p>
        <ul>
          <li>Compound interest calculations</li>
          <li>Investment return models</li>
          <li>Supply and demand equilibrium</li>
          <li>Economic growth projections</li>
        </ul>
      </section>
      
      <section>
        <h3>Computer Science</h3>
        <p>Equations are used in:</p>
        <ul>
          <li>Algorithm complexity analysis</li>
          <li>Data compression techniques</li>
          <li>Machine learning models</li>
          <li>Computer graphics transformations</li>
        </ul>
      </section>
    </div>
  );
} 