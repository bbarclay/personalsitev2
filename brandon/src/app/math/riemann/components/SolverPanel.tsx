"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function SolverPanel() {
  const [expression, setExpression] = useState('x^2');
  const [lowerBound, setLowerBound] = useState('0');
  const [upperBound, setUpperBound] = useState('1');
  const [numRectangles, setNumRectangles] = useState('10');
  const [method, setMethod] = useState('left');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [exactResult, setExactResult] = useState<number | null>(null);
  const [showExact, setShowExact] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  
  // Canvas reference for visualization
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Function to evaluate mathematical expressions
  const evaluateExpression = (expr: string, x: number): number => {
    try {
      // Replace common mathematical terms
      const sanitizedExpr = expr
        .replace(/\^/g, '**')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log(')
        .replace(/exp\(/g, 'Math.exp(')
        .replace(/pi/g, 'Math.PI')
        .replace(/e(?![a-zA-Z])/g, 'Math.E');
        
      // eslint-disable-next-line no-new-func
      return Function('x', `return ${sanitizedExpr}`)(x);
    } catch (err) {
      throw new Error('Invalid expression');
    }
  };

  // Calculate exact result for certain common functions
  const calculateExactIntegral = () => {
    try {
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      let result: number | null = null;
      
      // Handle some common cases
      if (expression === 'x^2') {
        result = (b**3 - a**3) / 3;
      } else if (expression === 'x') {
        result = (b**2 - a**2) / 2;
      } else if (expression === 'sin(x)') {
        result = -Math.cos(b) + Math.cos(a);
      } else if (expression === 'cos(x)') {
        result = Math.sin(b) - Math.sin(a);
      } else if (expression === 'e^x') {
        result = Math.exp(b) - Math.exp(a);
      } else if (expression === '1/x' && a > 0 && b > 0) {
        result = Math.log(b) - Math.log(a);
      } else if (expression.match(/^x\^[0-9]+$/)) {
        const power = parseInt(expression.split('^')[1]);
        if (!isNaN(power) && power !== -1) {
          result = (b**(power+1) - a**(power+1)) / (power+1);
        }
      }
      
      setExactResult(result);
      setShowExact(result !== null);
    } catch (err) {
      setExactResult(null);
      setShowExact(false);
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
      calculateExactIntegral();
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
      setExactResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRiemannSum();
  };
  
  // Draw the function and Riemann sum visualization
  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    try {
      // Parse bounds
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      const n = parseInt(numRectangles);
      
      if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0 || a >= b) {
        return;
      }
      
      // Calculate function values to determine y-axis scaling
      const samples = 100;
      const sampleStep = (b - a) / samples;
      let minY = Infinity;
      let maxY = -Infinity;
      const sampleValues = [];
      
      for (let i = 0; i <= samples; i++) {
        const x = a + i * sampleStep;
        try {
          const y = evaluateExpression(expression, x);
          if (isFinite(y)) {
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
            sampleValues.push({ x, y });
          }
        } catch (e) {
          // Skip invalid values
        }
      }
      
      // Ensure we have a visible range, add padding to y-axis
      if (minY === maxY) {
        minY -= 1;
        maxY += 1;
      } else {
        const yPadding = (maxY - minY) * 0.1;
        minY -= yPadding;
        maxY += yPadding;
      }
      
      // Mapping functions from mathematical to canvas coordinates
      const mapX = (x: number) => padding + ((x - a) / (b - a)) * (width - 2 * padding);
      const mapY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
      
      // Draw axes
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // X-axis
      ctx.moveTo(padding, mapY(0));
      ctx.lineTo(width - padding, mapY(0));
      
      // Y-axis
      ctx.moveTo(mapX(0), height - padding);
      ctx.lineTo(mapX(0), padding);
      
      ctx.stroke();
      
      // Draw grid
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      
      // Draw x grid lines and labels
      const xStep = (b - a) / 5;
      for (let x = a; x <= b; x += xStep) {
        ctx.moveTo(mapX(x), height - padding);
        ctx.lineTo(mapX(x), padding);
        
        // Add labels
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText(x.toFixed(1), mapX(x), height - padding / 2);
      }
      
      // Draw y grid lines and labels
      const yStep = (maxY - minY) / 5;
      for (let y = minY; y <= maxY; y += yStep) {
        ctx.moveTo(padding, mapY(y));
        ctx.lineTo(width - padding, mapY(y));
        
        // Add labels
        ctx.fillStyle = '#666';
        ctx.textAlign = 'right';
        ctx.fillText(y.toFixed(1), padding - 5, mapY(y) + 5);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Calculate Riemann sum rectangles
      const dx = (b - a) / n;
      const rectangles = [];
      
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
        
        try {
          const y = evaluateExpression(expression, x);
          if (isFinite(y)) {
            rectangles.push({
              x1: a + i * dx,
              x2: a + (i + 1) * dx,
              y
            });
          }
        } catch (e) {
          // Skip invalid values
        }
      }
      
      // Draw Riemann sum rectangles
      ctx.fillStyle = 'rgba(173, 216, 230, 0.5)';
      ctx.strokeStyle = 'rgba(70, 130, 180, 0.8)';
      ctx.lineWidth = 1;
      
      for (const rect of rectangles) {
        const x1 = mapX(rect.x1);
        const x2 = mapX(rect.x2);
        const y = mapY(rect.y);
        const zeroY = mapY(0);
        
        ctx.fillRect(x1, Math.min(y, zeroY), x2 - x1, Math.abs(zeroY - y));
        ctx.strokeRect(x1, Math.min(y, zeroY), x2 - x1, Math.abs(zeroY - y));
      }
      
      // Draw function curve
      ctx.strokeStyle = '#e33';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      let first = true;
      for (const point of sampleValues) {
        if (first) {
          ctx.moveTo(mapX(point.x), mapY(point.y));
          first = false;
        } else {
          ctx.lineTo(mapX(point.x), mapY(point.y));
        }
      }
      
      ctx.stroke();
      
      // Add labels for axes
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText('x', width - padding / 2, mapY(0) + 20);
      ctx.fillText('f(x)', mapX(0) - 20, padding / 2);
      
      // Add title
      ctx.fillStyle = '#333';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`f(x) = ${expression}`, width / 2, padding / 2);
      
    } catch (err) {
      // Handle drawing errors silently
    }
  };
  
  // Effect to update the visualization when parameters change
  useEffect(() => {
    if (autoUpdate) {
      calculateRiemannSum();
    }
    drawVisualization();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression, lowerBound, upperBound, numRectangles, method, autoUpdate]);

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Riemann Sum Calculator</h2>
        <p>
          Calculate the definite integral using Riemann sums with left, right, or midpoint approximation methods.
          The calculator visualizes how the approximation works by showing the rectangles used.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
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
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                    type="range"
                    id="numRectangles"
                    min="1"
                    max="100"
                    value={numRectangles}
                    onChange={(e) => setNumRectangles(e.target.value)}
                    className="block w-full"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <div className="text-center text-sm font-medium mt-1">
                    {numRectangles}
                  </div>
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
            
            <div className="flex items-center">
              <input
                id="autoUpdate"
                name="autoUpdate"
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoUpdate" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Update automatically
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate
            </button>
          </form>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result !== null && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Result</h3>
              <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                ∫<sub>{lowerBound}</sub><sup>{upperBound}</sup> {expression} dx ≈ {result.toFixed(6)}
              </div>
              
              {showExact && exactResult !== null && (
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                  <div className="font-medium">Exact value: {exactResult.toFixed(6)}</div>
                  <div className="mt-1">
                    Error: {Math.abs(result - exactResult).toFixed(6)} ({(Math.abs(result - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Visualization</h3>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <span className="h-3 w-6 bg-red-500 inline-block mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">Function f(x)</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-6 bg-blue-200 border border-blue-500 inline-block mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">{method === 'left' ? 'Left' : method === 'right' ? 'Right' : 'Midpoint'} Rectangles</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Riemann sums approximate the area under a curve by dividing it into rectangles.
              The {method === 'left' ? 'left' : method === 'right' ? 'right' : 'midpoint'} Riemann sum uses 
              the function value at the {method === 'left' ? 'left' : method === 'right' ? 'right' : 'midpoint'} of each interval to determine the height of each rectangle.
              As the number of rectangles increases, the approximation gets closer to the exact value of the definite integral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 