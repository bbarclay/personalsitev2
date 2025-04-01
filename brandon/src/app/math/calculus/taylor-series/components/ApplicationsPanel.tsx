"use client";

import React from 'react';

export default function ApplicationsPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Applications of Taylor Series</h2>
      
      <section>
        <h3>Numerical Computation</h3>
        <p>Taylor series are essential in numerical methods for:</p>
        <ul>
          <li>Approximating complex functions with simpler polynomials</li>
          <li>Evaluating integrals that have no elementary anti-derivatives</li>
          <li>Solving differential equations numerically</li>
          <li>Error analysis in numerical methods</li>
        </ul>
      </section>
      
      <section>
        <h3>Physics</h3>
        <p>Applications in physics include:</p>
        <ul>
          <li>Approximating solutions to wave equations</li>
          <li>Analyzing small oscillations in mechanical systems</li>
          <li>Perturbation theory in quantum mechanics</li>
          <li>Calculating field expansions in electromagnetism</li>
          <li>Fluid dynamics and Navier-Stokes equations</li>
        </ul>
      </section>
      
      <section>
        <h3>Engineering</h3>
        <p>Engineers use Taylor series for:</p>
        <ul>
          <li>Control systems analysis and linearization</li>
          <li>Signal processing and filtering</li>
          <li>Heat transfer equations</li>
          <li>Structural analysis for small deformations</li>
          <li>Digital filter design</li>
        </ul>
      </section>
      
      <section>
        <h3>Computer Science</h3>
        <p>Applications include:</p>
        <ul>
          <li>Fast computation of transcendental functions (sin, cos, exp)</li>
          <li>Computer graphics rendering</li>
          <li>Machine learning algorithms (e.g., Taylor expansion of activation functions)</li>
          <li>Approximation algorithms</li>
        </ul>
      </section>
      
      <section>
        <h3>Economics and Finance</h3>
        <p>Uses in financial mathematics:</p>
        <ul>
          <li>Option pricing models</li>
          <li>Risk analysis and Taylor expansion of utility functions</li>
          <li>Economic growth models</li>
          <li>Approximating complex financial derivatives</li>
        </ul>
      </section>
    </div>
  );
} 