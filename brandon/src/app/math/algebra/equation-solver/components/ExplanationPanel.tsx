"use client";

import React from 'react';

export default function ExplanationPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Understanding Equation Solving</h2>
      
      <section>
        <h3>What is an Equation?</h3>
        <p>An equation is a mathematical statement that asserts the equality of two expressions. It consists of two expressions connected by an equals sign (=).</p>
      </section>
      
      <section>
        <h3>Types of Equations</h3>
        <ul>
          <li><strong>Linear Equations:</strong> Equations where the variable has a power of 1 (e.g., 2x + 3 = 7)</li>
          <li><strong>Quadratic Equations:</strong> Equations where the highest power of the variable is 2 (e.g., x² + 5x + 6 = 0)</li>
          <li><strong>Polynomial Equations:</strong> Equations with variables raised to different powers (e.g., x³ - 2x² + 4x - 7 = 0)</li>
          <li><strong>Exponential Equations:</strong> Equations where the variable appears in the exponent (e.g., 2ˣ = 8)</li>
          <li><strong>Logarithmic Equations:</strong> Equations involving logarithms (e.g., log(x) + log(x+1) = 1)</li>
        </ul>
      </section>
      
      <section>
        <h3>Basic Principles of Equation Solving</h3>
        <p>The fundamental principle of equation solving is to perform the same operation on both sides of the equation to maintain equality. Common operations include:</p>
        <ul>
          <li>Addition and subtraction</li>
          <li>Multiplication and division</li>
          <li>Exponentiation and taking roots</li>
          <li>Applying functions (like logarithms)</li>
        </ul>
      </section>
    </div>
  );
} 