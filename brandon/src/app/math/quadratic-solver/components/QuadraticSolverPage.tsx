'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QuadraticSolver } from './QuadraticSolver';
import meta from '../meta.json';

export default function QuadraticSolverPage() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [solution, setSolution] = useState<{
    type: 'real' | 'repeated' | 'complex';
    x1?: number;
    x2?: number;
    x?: number;
    realPart?: number;
    imaginaryPart?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = () => {
    try {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      const numC = parseFloat(c);

      if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
        setError('Please enter valid numbers for all coefficients');
        setSolution(null);
        return;
      }
      
      if (numA === 0) {
        setError('The coefficient "a" cannot be zero as this would not be a quadratic equation');
        setSolution(null);
        return;
      }
      
      // Calculate discriminant
      const discriminant = numB * numB - 4 * numA * numC;
      
      // Calculate solutions
      let solutions;
      if (discriminant > 0) {
        const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
        const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
        solutions = { type: 'real' as const, x1, x2 };
      } else if (discriminant === 0) {
        const x = -numB / (2 * numA);
        solutions = { type: 'repeated' as const, x };
      } else {
        const realPart = -numB / (2 * numA);
        const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * numA);
        solutions = { type: 'complex' as const, realPart, imaginaryPart };
      }
      
      setSolution(solutions);
      setError(null);
    } catch (err) {
      setError('An error occurred while solving the equation');
      setSolution(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/math" 
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          ← Back to Math Tools
        </Link>
      </div>
      
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{meta.icon}</span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{meta.title}</h1>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {meta.category}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {meta.level}
        </span>
      </div>
      
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        {meta.description}
      </p>
      
      <div className="mb-10">
        <QuadraticSolver />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About Quadratic Equations</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            A quadratic equation is a second-degree polynomial equation in a single variable x:
          </p>
          <p className="text-center font-medium my-4">
            ax² + bx + c = 0
          </p>
          <p>
            where a, b, and c are constants, and a ≠ 0 (otherwise, the equation becomes linear).
          </p>
          <h3>The Quadratic Formula</h3>
          <p>
            The standard solution for a quadratic equation uses the quadratic formula:
          </p>
          <p className="text-center font-medium my-4">
            x = (-b ± √(b² - 4ac)) / 2a
          </p>
          <p>
            The term b² - 4ac is called the <strong>discriminant</strong>. It determines the nature of the roots:
          </p>
          <ul>
            <li>If the discriminant is positive, the equation has two distinct real roots.</li>
            <li>If the discriminant is zero, the equation has exactly one real root (a repeated root).</li>
            <li>If the discriminant is negative, the equation has two complex conjugate roots.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Related Math Tools</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li>
            <Link href="/math/pythagorean-calculator" className="block p-4 bg-white dark:bg-gray-800 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📐</span>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Pythagorean Theorem Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Calculate triangle sides using the Pythagorean theorem</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/math" className="block p-4 bg-white dark:bg-gray-800 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🧮</span>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">More Tools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Explore more math tools and calculators</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
