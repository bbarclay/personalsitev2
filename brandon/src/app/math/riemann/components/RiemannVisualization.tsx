"use client";

import React, { useEffect, useRef, useState } from 'react';
import { calculateZetaFunction } from '../utils/zetaUtils';

// Note: This is a placeholder for a real 3D visualization
// In a real implementation, you'd use a library like Three.js or Plotly
const RiemannVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<'real' | 'imaginary' | 'absolute'>('absolute');
  const [params, setParams] = useState({
    sigmaMin: 0,
    sigmaMax: 1,
    tMin: 0,
    tMax: 30,
    resolution: 50
  });

  useEffect(() => {
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

    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
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
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1.5;
    ctx.moveTo(mapX(0.5), 0);
    ctx.lineTo(mapX(0.5), height);
    ctx.stroke();

    // Draw real axis at t = 0
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1.5;
    ctx.moveTo(0, mapY(0));
    ctx.lineTo(width, mapY(0));
    ctx.stroke();

    // Draw zeros on the critical line
    const knownZeros = [
      14.134725, 21.022040, 25.010858, 30.424876
    ];

    ctx.fillStyle = 'purple';
    for (const zero of knownZeros) {
      if (zero >= params.tMin && zero <= params.tMax) {
        ctx.beginPath();
        ctx.arc(mapX(0.5), mapY(zero), 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw color map for zeta function values
    const sigmaStep = (params.sigmaMax - params.sigmaMin) / params.resolution;
    const tStep = (params.tMax - params.tMin) / params.resolution;

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
        
        // Normalize and clamp value for color mapping
        value = Math.max(0, Math.min(1, Math.log(1 + Math.abs(value)) / 5));
        
        // Create a color gradient: blue (low) to red (high)
        const r = Math.floor(value * 255);
        const g = 0;
        const b = Math.floor((1 - value) * 255);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
        
        const x = mapX(sigma);
        const y = mapY(t);
        const cellWidth = width / params.resolution;
        const cellHeight = height / params.resolution;
        
        ctx.fillRect(x, y - cellHeight, cellWidth, cellHeight);
      }
    }

  }, [viewMode, params]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Riemann Zeta Function Visualization
      </h3>
      
      <div className="flex flex-wrap gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            View Mode
          </label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="real">Real Part</option>
            <option value="imaginary">Imaginary Part</option>
            <option value="absolute">Absolute Value</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resolution
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={params.resolution}
            onChange={(e) => setParams({...params, resolution: +e.target.value})}
            className="w-32"
          />
        </div>
      </div>
      
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600}
          className="w-full h-[500px] bg-white dark:bg-gray-900"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-red-500">■</span> Critical Line (σ = 1/2)
        </div>
        <div>
          <span className="text-blue-500">■</span> Real Axis (t = 0)
        </div>
        <div>
          <span className="text-purple-500">●</span> Non-trivial Zeros
        </div>
        <div>
          <span className="bg-gradient-to-r from-blue-500 to-red-500 px-2">■</span> {
            viewMode === 'real' ? 'Real Part Value' : 
            viewMode === 'imaginary' ? 'Imaginary Part Value' : 'Absolute Value'
          }
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This visualization shows the behavior of the Riemann zeta function ζ(σ + it) in the complex plane.
          The Riemann Hypothesis states that all non-trivial zeros (shown as purple dots) lie on the critical
          line σ = 1/2 (shown in red).
        </p>
      </div>
    </div>
  );
};

export default RiemannVisualization;
