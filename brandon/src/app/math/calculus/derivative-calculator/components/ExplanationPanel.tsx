"use client";

import React from 'react';

export default function ExplanationPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Understanding Derivatives</h2>
      
      <section>
        <h3>What is a Derivative?</h3>
        <p>
          A derivative measures the rate at which a function changes at a particular point. 
          Geometrically, it represents the slope of the tangent line to the function's graph at that point.
        </p>
      </section>
      
      <section>
        <h3>Basic Derivative Rules</h3>
        <ul>
          <li><strong>Constant Rule:</strong> The derivative of a constant is 0: d/dx(c) = 0</li>
          <li><strong>Power Rule:</strong> d/dx(x^n) = n·x^(n-1)</li>
          <li><strong>Sum Rule:</strong> d/dx(f(x) + g(x)) = f'(x) + g'(x)</li>
          <li><strong>Product Rule:</strong> d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)</li>
          <li><strong>Quotient Rule:</strong> d/dx(f(x)/g(x)) = (f'(x)·g(x) - f(x)·g'(x))/g(x)²</li>
          <li><strong>Chain Rule:</strong> d/dx(f(g(x))) = f'(g(x))·g'(x)</li>
        </ul>
      </section>
      
      <section>
        <h3>Common Derivatives</h3>
        <ul>
          <li>d/dx(sin(x)) = cos(x)</li>
          <li>d/dx(cos(x)) = -sin(x)</li>
          <li>d/dx(e^x) = e^x</li>
          <li>d/dx(ln(x)) = 1/x</li>
          <li>d/dx(tan(x)) = sec²(x)</li>
        </ul>
      </section>
      
      <section>
        <h3>Higher-Order Derivatives</h3>
        <p>
          The second derivative (f''(x)) represents the rate of change of the first derivative.
          It can indicate the concavity of a function - whether it curves upward (f''(x) {'>'} 0) or downward (f''(x) {'<'} 0).
        </p>
      </section>
    </div>
  );
} 