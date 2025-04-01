"use client";

import React from 'react';

export default function ExplanationPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Understanding Integrals</h2>
      
      <section>
        <h3>What are Integrals?</h3>
        <p>
          An integral represents the accumulated value of a function over an interval. There are two main types:
        </p>
        <ul>
          <li><strong>Indefinite Integrals:</strong> Find the family of functions (antiderivatives) whose derivative is the integrand</li>
          <li><strong>Definite Integrals:</strong> Calculate the net accumulated value over a specific interval</li>
        </ul>
      </section>
      
      <section>
        <h3>Basic Integration Rules</h3>
        <ul>
          <li><strong>Power Rule:</strong> ∫x^n dx = x^(n+1)/(n+1) + C (for n ≠ -1)</li>
          <li><strong>Constant Multiple Rule:</strong> ∫kf(x) dx = k∫f(x) dx</li>
          <li><strong>Sum Rule:</strong> ∫(f(x) + g(x)) dx = ∫f(x) dx + ∫g(x) dx</li>
          <li><strong>Integration by Parts:</strong> ∫u(x)v'(x) dx = u(x)v(x) - ∫v(x)u'(x) dx</li>
          <li><strong>Substitution:</strong> ∫f(g(x))g'(x) dx = ∫f(u) du (where u = g(x))</li>
        </ul>
      </section>
      
      <section>
        <h3>Common Integrals</h3>
        <ul>
          <li>∫sin(x) dx = -cos(x) + C</li>
          <li>∫cos(x) dx = sin(x) + C</li>
          <li>∫e^x dx = e^x + C</li>
          <li>∫1/x dx = ln|x| + C</li>
          <li>∫sec²(x) dx = tan(x) + C</li>
        </ul>
      </section>
      
      <section>
        <h3>Fundamental Theorem of Calculus</h3>
        <p>
          The Fundamental Theorem of Calculus establishes the connection between differentiation and integration:
        </p>
        <ul>
          <li><strong>Part 1:</strong> If F(x) is an antiderivative of f(x), then ∫<sub>a</sub><sup>b</sup>f(x)dx = F(b) - F(a)</li>
          <li><strong>Part 2:</strong> The derivative of a definite integral with a variable upper limit equals the integrand evaluated at that limit</li>
        </ul>
      </section>
    </div>
  );
} 