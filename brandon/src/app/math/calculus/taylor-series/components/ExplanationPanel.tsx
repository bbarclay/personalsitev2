"use client";

import React from 'react';

export default function ExplanationPanel() {
  return (
    <div className="prose dark:prose-invert max-w-none space-y-6">
      <h2 className="text-2xl font-bold">Understanding Taylor Series</h2>
      
      <section>
        <h3>What is a Taylor Series?</h3>
        <p>
          A Taylor series is a way to represent a function as an infinite sum of terms calculated from the values 
          of the function's derivatives at a single point. It allows us to approximate complicated functions 
          using polynomials, which are easier to work with.
        </p>
      </section>
      
      <section>
        <h3>Definition</h3>
        <p>
          The Taylor series of a function f(x) centered at x = a is:
        </p>
        <p className="font-mono">
          f(x) = f(a) + f'(a)(x-a)/1! + f''(a)(x-a)²/2! + f'''(a)(x-a)³/3! + ...
        </p>
        <p>
          Or more formally:
        </p>
        <p className="font-mono">
          f(x) = ∑(n=0 to ∞) [f<sup>(n)</sup>(a)/n!](x-a)<sup>n</sup>
        </p>
        <p>
          When a = 0, this is called a Maclaurin series.
        </p>
      </section>
      
      <section>
        <h3>Conditions for Convergence</h3>
        <p>
          A Taylor series doesn't always converge to the original function for all values of x. 
          The series converges to f(x) within a certain radius of convergence around the center point a.
        </p>
      </section>
      
      <section>
        <h3>Common Taylor Series Expansions</h3>
        <ul>
          <li><strong>e<sup>x</sup>:</strong> 1 + x + x²/2! + x³/3! + x⁴/4! + ...</li>
          <li><strong>sin(x):</strong> x - x³/3! + x⁵/5! - x⁷/7! + ...</li>
          <li><strong>cos(x):</strong> 1 - x²/2! + x⁴/4! - x⁶/6! + ...</li>
          <li><strong>ln(1+x):</strong> x - x²/2 + x³/3 - x⁴/4 + ... (for |x| &lt; 1)</li>
        </ul>
      </section>
      
      <section>
        <h3>Remainder Term</h3>
        <p>
          When we truncate a Taylor series to n terms, we get a polynomial approximation. 
          The error in this approximation can be bounded using the remainder term (Lagrange form):
        </p>
        <p className="font-mono">
          R<sub>n</sub>(x) = f<sup>(n+1)</sup>(ξ)(x-a)<sup>n+1</sup>/(n+1)!
        </p>
        <p>
          Where ξ is some point between a and x.
        </p>
      </section>
    </div>
  );
} 