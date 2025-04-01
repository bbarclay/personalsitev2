"use client";

import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Applications of Integrals</h2>
      
      <section>
        <h3>Physics</h3>
        <p>Integrals are essential in physics for:</p>
        <ul>
          <li>Finding displacement from velocity (integration of velocity)</li>
          <li>Calculating work done by a variable force</li>
          <li>Determining center of mass and moments of inertia</li>
          <li>Computing electric and magnetic fields (Maxwell's equations)</li>
          <li>Quantum mechanics (probability amplitudes)</li>
        </ul>
      </section>
      
      <section>
        <h3>Engineering</h3>
        <p>Engineers apply integration to:</p>
        <ul>
          <li>Calculate volumes, masses, and moments of complex shapes</li>
          <li>Analyze signal processing and filtering</li>
          <li>Determine total heat or energy transfer</li>
          <li>Compute fluid flow rates and pressure distributions</li>
          <li>Structural analysis (beam deflection, stress distribution)</li>
        </ul>
      </section>
      
      <section>
        <h3>Probability and Statistics</h3>
        <p>Integrals are fundamental in:</p>
        <ul>
          <li>Calculating probabilities from probability density functions</li>
          <li>Finding expected values and moments</li>
          <li>Computing cumulative distribution functions</li>
          <li>Statistical inference and hypothesis testing</li>
        </ul>
      </section>
      
      <section>
        <h3>Economics and Finance</h3>
        <p>Applications include:</p>
        <ul>
          <li>Computing total consumer and producer surplus</li>
          <li>Calculating present and future values of continuous cash flows</li>
          <li>Risk assessment and portfolio analysis</li>
          <li>Economic growth models</li>
        </ul>
      </section>
      
      <section>
        <h3>Computer Graphics</h3>
        <p>Integrals are used for:</p>
        <ul>
          <li>Path tracing and global illumination algorithms</li>
          <li>Volume rendering and density visualization</li>
          <li>Computing surface areas and textures</li>
          <li>Physically-based rendering</li>
        </ul>
      </section>
    </div>
  );
} 