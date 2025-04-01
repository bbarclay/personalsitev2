"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PlayControl } from '@/components/math-shared/PlayControl';

interface PythagoreanResult {
  a: number | null;
  b: number | null;
  c: number | null;
  steps: string[];
  solvedFor: 'a' | 'b' | 'c' | null;
}

export function PythagoreanCalculator() {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [result, setResult] = useState<PythagoreanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms between steps
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationFrame, setAnimationFrame] = useState<number>(0);
  
  // Handle playback
  useEffect(() => {
    if (!isPlaying || !result || currentStep >= result.steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, playbackSpeed);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, result, playbackSpeed]);
  
  // Handle canvas animation
  useEffect(() => {
    if (!showAnimation || !canvasRef.current || !result) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const a = result.a || 0;
    const b = result.b || 0;
    const c = result.c || 0;
    
    // Scale factor to fit triangle in canvas
    const maxSide = Math.max(a, b, c);
    const scale = Math.min(240, 240) / (maxSide * 1.2);
    
    // Animation frame counter
    let frameCount = 0;
    let animationFrameId: number;
    
    // Animation function
    const render = () => {
      frameCount++;
      setAnimationFrame(frameCount % 100); // For subtle animation effects
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      
      // Center the triangle
      const centerX = canvasRef.current!.width / 2 - (a * scale) / 2;
      const centerY = canvasRef.current!.height / 2 + (b * scale) / 2;
      
      // Draw background grid
      drawGrid(ctx, canvasRef.current!.width, canvasRef.current!.height);
      
      // Draw the triangle
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + a * scale, centerY);
      ctx.lineTo(centerX, centerY - b * scale);
      ctx.closePath();
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Fill with a subtle color
      ctx.fillStyle = 'rgba(79, 70, 229, 0.1)';
      ctx.fill();
      
      // Draw the right angle marker
      ctx.beginPath();
      ctx.moveTo(centerX + 15, centerY);
      ctx.lineTo(centerX + 15, centerY - 15);
      ctx.lineTo(centerX, centerY - 15);
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw the labels with a subtle breathing animation effect
      const breathingEffect = Math.sin(frameCount * 0.05) * 0.5 + 1; // Value between 0.5 and 1.5
      
      // Side a
      ctx.fillStyle = '#3B82F6';
      ctx.font = '16px Arial';
      ctx.fillText(`a = ${a}`, centerX + a * scale / 2 - 20, centerY + 25);
      
      // Side b
      ctx.fillText(`b = ${b}`, centerX - 40, centerY - b * scale / 2);
      
      // Hypotenuse c
      const hypotenuseTextX = centerX + a * scale / 3;
      const hypotenuseTextY = centerY - b * scale / 3;
      ctx.fillStyle = '#EC4899';
      ctx.font = `${16 * breathingEffect}px Arial`;
      ctx.fillText(`c = ${c.toFixed(c % 1 === 0 ? 0 : 4)}`, hypotenuseTextX, hypotenuseTextY);
      
      // Draw squares on each side (Pythagorean visualization)
      if (currentStep >= 2) {
        // Square on side a (scaled with animation progress)
        const aSquareProgress = currentStep >= 2 ? Math.min(1, (currentStep - 2 + animationFrame / 100) / 1) : 0;
        ctx.fillStyle = 'rgba(219, 39, 119, 0.2)';
        ctx.fillRect(
          centerX,
          centerY,
          a * scale * aSquareProgress,
          a * scale * aSquareProgress
        );
        
        // Square on side b
        const bSquareProgress = currentStep >= 3 ? Math.min(1, (currentStep - 3 + animationFrame / 100) / 1) : 0;
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fillRect(
          centerX - b * scale * bSquareProgress,
          centerY - b * scale,
          b * scale * bSquareProgress,
          b * scale
        );
        
        // Square on hypotenuse c
        if (currentStep >= 4) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(-Math.PI / 4);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
          ctx.fillRect(0, 0, c * scale * 0.7, c * scale * 0.7);
          ctx.restore();
          
          // Show equation
          ctx.fillStyle = '#111827';
          ctx.font = '18px Arial';
          ctx.fillText(`a² + b² = c²`, centerX + 60, centerY - 80);
          ctx.fillText(`${a}² + ${b}² = ${c.toFixed(c % 1 === 0 ? 0 : 2)}²`, centerX + 60, centerY - 50);
          ctx.fillText(`${a * a} + ${b * b} = ${(c * c).toFixed(c % 1 === 0 ? 0 : 2)}`, centerX + 60, centerY - 20);
        }
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [showAnimation, result, currentStep, animationFrame]);
  
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const spacing = 20;
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(229, 231, 235, 0.5)';
    ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    ctx.stroke();
  };
  
  const handleNext = () => {
    if (result && currentStep < result.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handlePlay = () => {
    if (result) {
      if (currentStep >= result.steps.length - 1) {
        setCurrentStep(0);
      }
      setIsPlaying(true);
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const calculateSide = () => {
    setError(null);
    
    // Count how many sides are provided
    const sides = [sideA, sideB, sideC];
    const providedSides = sides.filter(side => side.trim() !== '').length;
    
    if (providedSides !== 2) {
      setError("Please provide exactly two sides to calculate the third side.");
      return;
    }
    
    // Parse input values
    const a = sideA.trim() !== '' ? parseFloat(sideA) : null;
    const b = sideB.trim() !== '' ? parseFloat(sideB) : null;
    const c = sideC.trim() !== '' ? parseFloat(sideC) : null;
    
    // Validate input
    if ((a !== null && isNaN(a)) || (b !== null && isNaN(b)) || (c !== null && isNaN(c))) {
      setError("Please enter valid numbers for the sides.");
      return;
    }
    
    if ((a !== null && a <= 0) || (b !== null && b <= 0) || (c !== null && c <= 0)) {
      setError("Side lengths must be positive numbers.");
      return;
    }
    
    const steps: string[] = [];
    let solvedFor: 'a' | 'b' | 'c' | null = null;
    let calculatedA = a;
    let calculatedB = b;
    let calculatedC = c;
    
    steps.push("Using the Pythagorean theorem: a² + b² = c²");
    steps.push("Where 'a' and 'b' are the legs of the right triangle, and 'c' is the hypotenuse");
    
    // Solve for the missing side
    if (a === null) {
      if (c === null || b === null) {
        setError("Cannot calculate. Please provide valid values for two sides.");
        return;
      }
      
      if (c <= b) {
        setError("The hypotenuse must be greater than either leg of the triangle.");
        return;
      }
      
      solvedFor = 'a';
      calculatedA = Math.sqrt(c * c - b * b);
      steps.push(`Step 1: Solve for 'a' using the formula: a² = c² - b²`);
      steps.push(`Step 2: a² = ${c.toFixed(2)}² - ${b.toFixed(2)}² = ${(c * c).toFixed(4)} - ${(b * b).toFixed(4)} = ${(c * c - b * b).toFixed(4)}`);
      steps.push(`Step 3: a = √${(c * c - b * b).toFixed(4)} = ${calculatedA.toFixed(4)}`);
    } else if (b === null) {
      if (c === null || a === null) {
        setError("Cannot calculate. Please provide valid values for two sides.");
        return;
      }
      
      if (c <= a) {
        setError("The hypotenuse must be greater than either leg of the triangle.");
        return;
      }
      
      solvedFor = 'b';
      calculatedB = Math.sqrt(c * c - a * a);
      steps.push(`Step 1: Solve for 'b' using the formula: b² = c² - a²`);
      steps.push(`Step 2: b² = ${c.toFixed(2)}² - ${a.toFixed(2)}² = ${(c * c).toFixed(4)} - ${(a * a).toFixed(4)} = ${(c * c - a * a).toFixed(4)}`);
      steps.push(`Step 3: b = √${(c * c - a * a).toFixed(4)} = ${calculatedB.toFixed(4)}`);
    } else if (c === null) {
      if (a === null || b === null) {
        setError("Cannot calculate. Please provide valid values for two sides.");
        return;
      }
      
      solvedFor = 'c';
      calculatedC = Math.sqrt(a * a + b * b);
      steps.push(`Step 1: Solve for 'c' using the formula: c² = a² + b²`);
      steps.push(`Step 2: c² = ${a.toFixed(2)}² + ${b.toFixed(2)}² = ${(a * a).toFixed(4)} + ${(b * b).toFixed(4)} = ${(a * a + b * b).toFixed(4)}`);
      steps.push(`Step 3: c = √${(a * a + b * b).toFixed(4)} = ${calculatedC.toFixed(4)}`);
    }
    
    setResult({
      a: calculatedA,
      b: calculatedB,
      c: calculatedC,
      steps,
      solvedFor
    });
    
    setCurrentStep(0);
    setShowAnimation(true);
  };
  
  const handleExampleClick = (example: { a: number; b: number; c: number; solve: 'a' | 'b' | 'c' }) => {
    setSideA(example.solve === 'a' ? '' : example.a.toString());
    setSideB(example.solve === 'b' ? '' : example.b.toString());
    setSideC(example.solve === 'c' ? '' : example.c.toString());
  };
  
  const examples = [
    { a: 3, b: 4, c: 5, solve: 'c' as const, label: "3-4-5 Triangle" },
    { a: 5, b: 12, c: 13, solve: 'c' as const, label: "5-12-13 Triangle" },
    { a: 8, b: 15, c: 17, solve: 'c' as const, label: "8-15-17 Triangle" },
    { a: 7, b: 24, c: 25, solve: 'a' as const, label: "Find leg a" },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pythagorean Theorem Calculator</h2>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/2">
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Enter the values of two sides to calculate the third side of the right triangle:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Side a</label>
                <input
                  type="text"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  placeholder="Length of a"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Side b</label>
                <input
                  type="text"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  placeholder="Length of b"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hypotenuse c
                </label>
                <input
                  type="text"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                  placeholder="Length of c"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Quick examples:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={calculateSide}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Calculate
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
        </div>
        
        <div className="lg:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 relative">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Right Triangle Visualization</h3>
            </div>
            
            {showAnimation && result ? (
              <div className="flex justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={300} 
                  height={300}
                  className="border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                ></canvas>
              </div>
            ) : (
              <div className="flex justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" className="text-gray-700 dark:text-gray-300">
                  {/* Right triangle */}
                  <polygon 
                    points="20,180 180,180 20,20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                  />
                  
                  {/* Right angle marker */}
                  <polyline 
                    points="40,180 40,160 60,160" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                  />
                  
                  {/* Side labels */}
                  <text x="100" y="190" textAnchor="middle" fill="currentColor">Side b</text>
                  <text x="10" y="100" textAnchor="middle" fill="currentColor">Side a</text>
                  <text x="110" y="90" textAnchor="middle" fill="currentColor" transform="rotate(45, 110, 90)">
                    Hypotenuse c
                  </text>
                </svg>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-300 font-medium">
              The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (c) equals the sum of squares of the other two sides (a and b):
            </p>
            <p className="text-center text-blue-900 dark:text-blue-200 font-bold mt-2">
              a² + b² = c²
            </p>
          </div>
        </div>
      </div>
      
      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Results</h3>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Side a:</span>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.a !== null ? result.a.toFixed(4) : '?'}
                  {result.solvedFor === 'a' && <span className="text-green-600 dark:text-green-400 text-sm ml-1">(calculated)</span>}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Side b:</span>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.b !== null ? result.b.toFixed(4) : '?'}
                  {result.solvedFor === 'b' && <span className="text-green-600 dark:text-green-400 text-sm ml-1">(calculated)</span>}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Hypotenuse c:</span>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.c !== null ? result.c.toFixed(4) : '?'}
                  {result.solvedFor === 'c' && <span className="text-green-600 dark:text-green-400 text-sm ml-1">(calculated)</span>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {result.steps.length > 0 && currentStep < result.steps.length
                  ? `Step ${currentStep + 1} of ${result.steps.length}`
                  : 'No solution steps available'}
              </p>
            </div>
            
            <div className="flex gap-4 items-center">
              <PlayControl
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onReset={handleReset}
                onStep={handleNext}
                disabled={result.steps.length === 0}
              />
              
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
              </div>
              
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={2000}>Slow</option>
                <option value={1000}>Normal</option>
                <option value={500}>Fast</option>
              </select>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Step-by-Step Solution</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            {result.steps.length > 0 && currentStep < result.steps.length ? (
              <div className="text-gray-800 dark:text-gray-200 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
                {result.steps[currentStep]}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No steps to display.
              </p>
            )}
            
            <div className="mt-6 space-y-3">
              {result.steps.map((step, index) => (
                <p key={index} className={`text-gray-800 dark:text-gray-200 ${index === currentStep ? 'font-bold' : ''}`}>{step}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 