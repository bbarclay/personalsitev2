"use client";

import React, { useEffect, useRef, useState } from 'react';
import { calculateZetaFunction } from '../utils/zetaUtils';

// Enhanced visualization for the Riemann zeta function
const RiemannVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<'real' | 'imaginary' | 'absolute' | '3d'>('absolute');
  const [params, setParams] = useState({
    sigmaMin: 0,
    sigmaMax: 1,
    tMin: 0,
    tMax: 30,
    resolution: 50,
    colorScheme: 'heat', // 'heat', 'rainbow', 'ocean'
    showZeros: true,
    animateZeros: false,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  // More comprehensive list of non-trivial zeros
  const knownZeros = [
    14.134725, 21.022040, 25.010858, 30.424876, 32.935062,
    37.586178, 40.918719, 43.327073, 48.005151, 49.773832
  ];

  const colorSchemes = {
    heat: (value: number) => {
      // Heat map: blue (low) to red (high) through purple
      const r = Math.floor(value * 255);
      const g = Math.floor(value * value * 255);
      const b = Math.floor((1 - value) * 255);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;
    },
    rainbow: (value: number) => {
      // Rainbow scheme: blue -> cyan -> green -> yellow -> red
      const h = (1 - value) * 240; // 240° (blue) to 0° (red)
      const s = 100;
      const l = 50;
      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    ocean: (value: number) => {
      // Ocean: dark blue (deep) to light blue/cyan (shallow)
      const r = Math.floor(value * 100);
      const g = Math.floor(100 + value * 155);
      const b = Math.floor(180 + value * 75);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;
    }
  };

  const renderCanvas = (time = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Map function to transform sigma, t coordinates to canvas x, y coordinates
    const mapX = (sigma: number) => 
      ((sigma - params.sigmaMin) / (params.sigmaMax - params.sigmaMin)) * width;
    const mapY = (t: number) => 
      height - ((t - params.tMin) / (params.tMax - params.tMin)) * height;

    // Draw grid lines with better styling
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 0.5;

    // Vertical grid lines (sigma = constant)
    for (let sigma = params.sigmaMin; sigma <= params.sigmaMax; sigma += 0.1) {
      ctx.moveTo(mapX(sigma), 0);
      ctx.lineTo(mapX(sigma), height);
    }

    // Horizontal grid lines (t = constant)
    for (let t = params.tMin; t <= params.tMax; t += 5) {
      ctx.moveTo(0, mapY(t));
      ctx.lineTo(width, mapY(t));
    }
    
    ctx.stroke();

    // Draw critical line at sigma = 1/2
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 50, 50, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.moveTo(mapX(0.5), 0);
    ctx.lineTo(mapX(0.5), height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw real axis at t = 0
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(50, 100, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.moveTo(0, mapY(0));
    ctx.lineTo(width, mapY(0));
    ctx.stroke();

    // Draw color map for zeta function values
    const sigmaStep = (params.sigmaMax - params.sigmaMin) / params.resolution;
    const tStep = (params.tMax - params.tMin) / params.resolution;

    // Create a gradient for better visualization
    for (let i = 0; i < params.resolution; i++) {
      for (let j = 0; j < params.resolution; j++) {
        const sigma = params.sigmaMin + i * sigmaStep;
        const t = params.tMin + j * tStep;
        
        const zetaValue = calculateZetaFunction(sigma, t);
        
        let value: number;
        switch (viewMode) {
          case 'real':
            value = zetaValue.real;
            break;
          case 'imaginary':
            value = zetaValue.imaginary;
            break;
          case 'absolute':
          default:
            value = Math.sqrt(zetaValue.real**2 + zetaValue.imaginary**2);
            break;
        }
        
        // Normalize and clamp value for color mapping - better scaling
        value = Math.max(0, Math.min(1, Math.log(1 + Math.abs(value)) / 4));
        
        // Use the selected color scheme
        ctx.fillStyle = colorSchemes[params.colorScheme as keyof typeof colorSchemes](value);
        
        const x = mapX(sigma);
        const y = mapY(t);
        const cellWidth = width / params.resolution;
        const cellHeight = height / params.resolution;
        
        ctx.fillRect(x, y - cellHeight, cellWidth, cellHeight);
      }
    }

    // Draw zeros on the critical line with animation if enabled
    if (params.showZeros) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 2;

      for (const zero of knownZeros) {
        if (zero >= params.tMin && zero <= params.tMax) {
          const x = mapX(0.5);
          const y = mapY(zero);
          
          ctx.beginPath();
          
          // If animating, make the zeros "pulse"
          const radius = params.animateZeros 
            ? 4 + Math.sin(time / 300 + zero) * 2 
            : 4;
            
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Add a glow effect for zeros
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
          gradient.addColorStop(0, 'rgba(255, 0, 255, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Continue animation if enabled
    if (params.animateZeros && isAnimating) {
      animationRef.current = requestAnimationFrame(renderCanvas);
    }
  };

  useEffect(() => {
    renderCanvas();
    
    // Set up animation if enabled
    if (params.animateZeros && !isAnimating) {
      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(renderCanvas);
    } else if (!params.animateZeros && isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setIsAnimating(false);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [viewMode, params, isAnimating]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Riemann Zeta Function Visualization
      </h3>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This interactive visualization shows the behavior of the Riemann zeta function ζ(σ + it) in the complex plane.
          The Riemann Hypothesis states that all non-trivial zeros (shown as purple dots) lie on the critical
          line σ = 1/2 (shown in red).
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            View Mode
          </label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="absolute">Absolute Value</option>
            <option value="real">Real Part</option>
            <option value="imaginary">Imaginary Part</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Color Scheme
          </label>
          <select
            value={params.colorScheme}
            onChange={(e) => setParams({...params, colorScheme: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="heat">Heat Map</option>
            <option value="rainbow">Rainbow</option>
            <option value="ocean">Ocean</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resolution
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="10"
              max="100"
              value={params.resolution}
              onChange={(e) => setParams({...params, resolution: +e.target.value})}
              className="w-full"
            />
            <span className="ml-2 text-sm text-gray-500">{params.resolution}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            t Range: [{params.tMin}, {params.tMax}]
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={params.tMin}
              onChange={(e) => setParams({...params, tMin: +e.target.value})}
              className="w-20 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="self-center">to</span>
            <input
              type="number"
              value={params.tMax}
              onChange={(e) => setParams({...params, tMax: +e.target.value})}
              className="w-20 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            σ Range: [{params.sigmaMin}, {params.sigmaMax}]
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={params.sigmaMin}
              onChange={(e) => setParams({...params, sigmaMin: +e.target.value})}
              className="w-20 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
              step="0.1"
            />
            <span className="self-center">to</span>
            <input
              type="number"
              value={params.sigmaMax}
              onChange={(e) => setParams({...params, sigmaMax: +e.target.value})}
              className="w-20 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showZeros"
              checked={params.showZeros}
              onChange={(e) => setParams({...params, showZeros: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showZeros" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Show Zeros
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="animateZeros"
              checked={params.animateZeros}
              onChange={(e) => setParams({...params, animateZeros: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="animateZeros" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Animate Zeros
            </label>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600}
          className="w-full h-[500px] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-2">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 mr-2 bg-red-500 rounded-full"></span>
          <span>Critical Line (σ = 1/2)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 mr-2 bg-blue-500 rounded-full"></span>
          <span>Real Axis (t = 0)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 mr-2 bg-purple-500 rounded-full"></span>
          <span>Non-trivial Zeros</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-8 h-3 mr-2 bg-gradient-to-r from-blue-500 to-red-500 rounded"></span>
          <span>{viewMode === 'real' ? 'Real Part' : viewMode === 'imaginary' ? 'Imaginary Part' : 'Absolute Value'}</span>
        </div>
      </div>
      
      <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h4 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">Did you know?</h4>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          The Riemann Hypothesis is one of the most important unsolved problems in mathematics, with a $1,000,000 prize 
          for its solution. It states that all non-trivial zeros of the zeta function have real part exactly 1/2, which 
          would have profound implications for the distribution of prime numbers.
        </p>
      </div>
    </div>
  );
};

export default RiemannVisualization;
