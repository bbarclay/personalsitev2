import React from 'react';

export interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Understanding the Riemann Zeta Function</h2>
      <p className="text-gray-700 dark:text-gray-300">
        {explanation || "The Riemann zeta function is a fundamental function in number theory that extends the concept of summing series to complex numbers. It has deep connections to prime numbers and the distribution of primes."}
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Definition</h3>
        <p className="text-gray-700 dark:text-gray-300">
          The Riemann zeta function ζ(s) is defined for complex numbers s with real part greater than 1 by:
        </p>
        <div className="my-4 flex justify-center">
          <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
            <span className="text-xl">ζ(s) = ∑<sub>n=1</sub><sup>∞</sup> 1/n<sup>s</sup></span>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          It can be analytically continued to the entire complex plane except for a simple pole at s=1.
        </p>
      </div>
    </div>
  );
}
