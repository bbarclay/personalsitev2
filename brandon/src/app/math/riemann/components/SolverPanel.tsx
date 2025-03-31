import React, { useState } from 'react';

export default function SolverPanel() {
  const [expression, setExpression] = useState('x^2');
  const [lowerBound, setLowerBound] = useState('0');
  const [upperBound, setUpperBound] = useState('1');
  const [numRectangles, setNumRectangles] = useState('10');
  const [method, setMethod] = useState('mid');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const evaluateExpression = (expr: string, x: number): number => {
    try {
      // Replace x^2 with x**2 for JavaScript
      const jsExpr = expr.replace(/x\^(\d+)/g, 'Math.pow(x, $1)');
      
      // Replace common math functions
      const jsExprWithFns = jsExpr
        .replace(/sin\(([^)]+)\)/g, 'Math.sin($1)')
        .replace(/cos\(([^)]+)\)/g, 'Math.cos($1)')
        .replace(/tan\(([^)]+)\)/g, 'Math.tan($1)')
        .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
        .replace(/log\(([^)]+)\)/g, 'Math.log($1)')
        .replace(/exp\(([^)]+)\)/g, 'Math.exp($1)')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      // Simple x replacement (must be last)
      const finalExpr = jsExprWithFns.replace(/x/g, String(x));
      
      // Use Function constructor to safely evaluate expression
      // eslint-disable-next-line no-new-func
      return Function(`"use strict"; return (${finalExpr})`)();
    } catch (err) {
      throw new Error(`Error evaluating expression: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const calculateRiemannSum = () => {
    try {
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      const n = parseInt(numRectangles);
      
      if (isNaN(a) || isNaN(b) || isNaN(n)) {
        throw new Error('Please enter valid numbers for all fields');
      }
      
      if (n <= 0) {
        throw new Error('Number of rectangles must be positive');
      }
      
      if (a >= b) {
        throw new Error('Upper bound must be greater than lower bound');
      }
      
      const dx = (b - a) / n;
      let sum = 0;
      
      for (let i = 0; i < n; i++) {
        let x;
        
        switch (method) {
          case 'left':
            x = a + i * dx;
            break;
          case 'right':
            x = a + (i + 1) * dx;
            break;
          case 'mid':
            x = a + (i + 0.5) * dx;
            break;
          default:
            x = a + i * dx;
        }
        
        const fX = evaluateExpression(expression, x);
        sum += fX * dx;
      }
      
      setResult(sum);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRiemannSum();
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Riemann Sum Calculator</h2>
        <p>
          Calculate the definite integral using Riemann sums with left, right, or midpoint approximation methods.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="expression" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Function f(x)
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="expression"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g., x^2, sin(x), e^x"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Supported: +, -, *, /, ^, sin(), cos(), tan(), sqrt(), log(), exp(), pi, e
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lowerBound" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Lower Bound (a)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="lowerBound"
                value={lowerBound}
                onChange={(e) => setLowerBound(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="upperBound" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Upper Bound (b)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="upperBound"
                value={upperBound}
                onChange={(e) => setUpperBound(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="numRectangles" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Rectangles (n)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="numRectangles"
                value={numRectangles}
                onChange={(e) => setNumRectangles(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Method
            </label>
            <div className="mt-1">
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="left">Left Riemann Sum</option>
                <option value="right">Right Riemann Sum</option>
                <option value="mid">Midpoint Riemann Sum</option>
              </select>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
          <div className="flex">
            <div className="text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Result</h3>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
            <p className="text-lg font-mono text-blue-600 dark:text-blue-400">
              ∫<sub>{lowerBound}</sub><sup>{upperBound}</sup> {expression} dx ≈ {result.toFixed(6)}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Using {method === 'left' ? 'left' : method === 'right' ? 'right' : 'midpoint'} Riemann sum with {numRectangles} rectangles
          </p>
        </div>
      )}
    </div>
  );
} 