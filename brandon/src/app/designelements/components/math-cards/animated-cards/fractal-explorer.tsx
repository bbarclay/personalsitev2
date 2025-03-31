"use client";

import React, { useEffect, useRef, useState } from 'react';

export const FractalExplorer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [colorMode, setColorMode] = useState<'psychedelic'|'fire'|'ocean'|'rainbow'>('psychedelic');

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    if (!ctx) return;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    let time = 0;
    let centerX = -0.5;
    let centerY = 0;
    
    const getColor = (iterations: number, maxIterations: number) => {
      const normalized = iterations / maxIterations;
      
      switch(colorMode) {
        case 'fire':
          return `hsl(${normalized * 60}, 100%, ${50 + normalized * 50}%)`;
        case 'ocean':
          return `hsl(${180 + normalized * 60}, 100%, ${30 + normalized * 40}%)`;
        case 'rainbow':
          return `hsl(${normalized * 360}, 100%, 50%)`;
        default: // psychedelic
          return `hsl(${(normalized * 360 + time * 50) % 360}, 100%, 50%)`;
      }
    };

    const calculateMandelbrot = (x0: number, y0: number, maxIterations: number) => {
      let x = 0;
      let y = 0;
      let iteration = 0;
      
      while (x*x + y*y <= 4 && iteration < maxIterations) {
        const xTemp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = xTemp;
        iteration++;
      }
      
      return iteration;
    };

    const animate = () => {
      time += 0.01;
      
      const maxIterations = 100;
      const scale = Math.pow(2, zoomLevel);
      
      for (let px = 0; px < canvas.width; px++) {
        for (let py = 0; py < canvas.height; py++) {
          const x0 = (px - canvas.width/2) / (canvas.width/4) / scale + centerX;
          const y0 = (py - canvas.height/2) / (canvas.height/4) / scale + centerY;
          
          const iterations = calculateMandelbrot(x0, y0, maxIterations);
          
          if (iterations === maxIterations) {
            ctx.fillStyle = 'black';
          } else {
            ctx.fillStyle = getColor(iterations, maxIterations);
          }
          
          ctx.fillRect(px, py, 1, 1);
        }
      }
      
      // Add floating particles
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${time * 100 % 360}, 100%, 70%, 0.5)`;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [zoomLevel, colorMode]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(236,72,153,0.5)] border border-pink-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      
      {/* Fractal controls overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/30 via-transparent to-pink-900/30"></div>
      
      <div className="relative z-10 h-full flex flex-col p-8 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block px-4 py-1 bg-pink-600/30 border border-pink-500/30 rounded-full text-pink-100 text-sm font-bold mb-4">
              FRACTAL DYNAMICS
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Mandelbrot<br/>Explorer
            </h2>
          </div>
          
          {/* Color mode selectors */}
          <div className="flex gap-3">
            {(['psychedelic', 'fire', 'ocean', 'rainbow'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setColorMode(mode)}
                className={`w-12 h-12 rounded-lg transition-all duration-300 transform hover:scale-110
                  ${colorMode === mode ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
                style={{
                  background: mode === 'psychedelic' ? 'linear-gradient(45deg, #ff00ff, #00ffff)' :
                            mode === 'fire' ? 'linear-gradient(45deg, #ff4400, #ffcc00)' :
                            mode === 'ocean' ? 'linear-gradient(45deg, #0066ff, #00ffcc)' :
                            'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-6">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-64 h-2 bg-pink-600/30 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-pink-200 text-sm">
              <span>1x</span>
              <span>{Math.pow(2, zoomLevel).toFixed(1)}x</span>
            </div>
          </div>
        </div>

        {/* Bottom tools */}
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-pink-600/30 text-pink-100 rounded-xl font-medium hover:bg-pink-500/50 transition-all duration-300 border border-pink-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Reset View
            </button>
            <button className="px-6 py-3 bg-fuchsia-600/30 text-fuchsia-100 rounded-xl font-medium hover:bg-fuchsia-500/50 transition-all duration-300 border border-fuchsia-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Capture
            </button>
          </div>
          
          <div className="text-pink-200 font-mono bg-pink-600/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-pink-500/30">
            z → z² + c
          </div>
        </div>
      </div>
    </div>
  );
};
