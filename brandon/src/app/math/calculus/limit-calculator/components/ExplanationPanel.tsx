"use client";

import React from 'react';

export default function ExplanationPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Understanding Limits</h2>
      
      <section>
        <h3>What is a Limit?</h3>
        <p>
          A limit describes the behavior of a function as its input approaches a particular value. 
          Formally, the limit of a function f(x) as x approaches a value c is the value that f(x) gets arbitrarily close to as x gets arbitrarily close to c.
        </p>
        <p>We write this as: lim<sub>x→c</sub> f(x) = L</p>
      </section>
      
      <section>
        <h3>Types of Limits</h3>
        <ul>
          <li><strong>One-sided Limits:</strong> Approaching from only one direction (left or right)</li>
          <li><strong>Two-sided Limits:</strong> Approaching from both directions</li>
          <li><strong>Limits at Infinity:</strong> Behavior as x approaches ∞ or -∞</li>
          <li><strong>Infinite Limits:</strong> When the function value approaches ∞ or -∞</li>
        </ul>
      </section>
      
      <section>
        <h3>Limit Evaluation Techniques</h3>
        <ul>
          <li><strong>Direct Substitution:</strong> Simply plug in the value when the function is continuous at that point</li>
          <li><strong>Factoring:</strong> For expressions with removable discontinuities</li>
          <li><strong>Rationalization:</strong> For limits involving square roots or other radicals</li>
          <li><strong>Using Special Limits:</strong> Such as lim<sub>x→0</sub> sin(x)/x = 1</li>
          <li><strong>L'Hôpital's Rule:</strong> For indeterminate forms like 0/0 or ∞/∞</li>
        </ul>
      </section>
      
      <section>
        <h3>Important Limit Properties</h3>
        <ul>
          <li>Limit of a sum equals the sum of the limits</li>
          <li>Limit of a product equals the product of the limits</li>
          <li>Limit of a quotient equals the quotient of the limits (if denominator limit ≠ 0)</li>
          <li>Limit of a composition: If lim<sub>x→c</sub> g(x) = L and f is continuous at L, then lim<sub>x→c</sub> f(g(x)) = f(L)</li>
        </ul>
      </section>
      
      <section>
        <h3>Limits and Continuity</h3>
        <p>
          A function f is continuous at a point c if and only if:
        </p>
        <ol>
          <li>f(c) is defined (the function value exists)</li>
          <li>lim<sub>x→c</sub> f(x) exists (the limit exists)</li>
          <li>lim<sub>x→c</sub> f(x) = f(c) (the limit equals the function value)</li>
        </ol>
      </section>
    </div>
  );
} 