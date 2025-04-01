"use client";

import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Applications of Derivatives</h2>
      
      <section>
        <h3>Physics</h3>
        <p>Derivatives are essential in physics for describing rates of change:</p>
        <ul>
          <li>Velocity is the derivative of position with respect to time</li>
          <li>Acceleration is the derivative of velocity (second derivative of position)</li>
          <li>Force can be expressed as the derivative of momentum</li>
          <li>Electromagnetic field relationships involve derivatives</li>
        </ul>
      </section>
      
      <section>
        <h3>Engineering</h3>
        <p>Engineers use derivatives for:</p>
        <ul>
          <li>Optimizing designs and minimizing costs</li>
          <li>Analyzing heat transfer and fluid flow</li>
          <li>Determining stress and strain in structures</li>
          <li>Controlling systems (PID controllers involve derivatives)</li>
        </ul>
      </section>
      
      <section>
        <h3>Economics</h3>
        <p>In economics, derivatives help in:</p>
        <ul>
          <li>Marginal analysis (cost, revenue, profit)</li>
          <li>Elasticity calculations</li>
          <li>Growth models and rate of change</li>
          <li>Optimization problems</li>
        </ul>
      </section>
      
      <section>
        <h3>Computer Graphics</h3>
        <p>Derivatives are used in:</p>
        <ul>
          <li>Calculating surface normals</li>
          <li>Rendering smooth curves and surfaces</li>
          <li>Physics-based animation</li>
          <li>Path finding and trajectory optimization</li>
        </ul>
      </section>
      
      <section>
        <h3>Medicine and Biology</h3>
        <p>Applications include:</p>
        <ul>
          <li>Analyzing growth rates of organisms or populations</li>
          <li>Modeling the spread of diseases</li>
          <li>Studying drug absorption and metabolism rates</li>
          <li>Neural signal processing</li>
        </ul>
      </section>
    </div>
  );
} 