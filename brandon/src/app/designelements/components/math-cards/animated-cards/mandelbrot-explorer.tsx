"use client";

import React, { useEffect, useRef, useState } from 'react';

export const MandelbrotExplorer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [colorScheme, setColorScheme] = useState('classic');
  const [maxIterations, setMaxIterations] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [centerX, setCenterX] = useState(-0.5);
  const [centerY, setCenterY] = useState(0);
  
  // Handle color scheme change
  const handleColorSchemeChange = (scheme: string) => {
    setColorScheme(scheme);
  };
  
  // Handle zoom buttons
  const handleZoomIn = () => {
    setZoom(prevZoom => prevZoom * 1.5);
  };
  
  const handleZoomOut = () => {
    setZoom(prevZoom => prevZoom / 1.5);
  };
  
  // Handle iteration adjustment
  const handleIncreaseIterations = () => {
    setMaxIterations(prev => Math.min(prev + 50, 500));
  };
  
  const handleDecreaseIterations = () => {
    setMaxIterations(prev => Math.max(prev - 50, 50));
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Parameters
    let time = 0;
    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string}[] = [];
    
    // Add background particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        color: `hsla(${Math.random() * 60 + 280}, 100%, 70%, ${Math.random() * 0.5 + 0.2})`
      });
    }
    
    // Map fractal coordinates to screen coordinates
    const mapToScreen = (x: number, y: number) => {
      const scale = Math.min(canvas.width, canvas.height) / (4 / zoom);
      return {
        screenX: (x - centerX) * scale + canvas.width / 2,
        screenY: (y - centerY) * scale + canvas.height / 2
      };
    };
    
    // Map screen coordinates to fractal coordinates
    const mapToFractal = (screenX: number, screenY: number) => {
      const scale = Math.min(canvas.width, canvas.height) / (4 / zoom);
      return {
        x: (screenX - canvas.width / 2) / scale + centerX,
        y: (screenY - canvas.height / 2) / scale + centerY
      };
    };
    
    // Get color for a given iteration count
    const getColor = (iterations: number) => {
      if (iterations === maxIterations) return 'rgb(0, 0, 0)'; // Black for points in set
      
      const normalized = iterations / maxIterations;
      const t = time * 0.1;
      
      if (colorScheme === 'classic') {
        // Classic blue-to-gold color scheme
        const hue = 240 + normalized * 120;
        const saturation = 100;
        const lightness = normalized * 60 + 20;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      } else if (colorScheme === 'psychedelic') {
        // Psychedelic rainbow
        const hue = (normalized * 360 + t * 50) % 360;
        return `hsl(${hue}, 100%, 50%)`;
      } else if (colorScheme === 'thermal') {
        // Thermal imaging style
        const r = Math.floor(255 * Math.pow(normalized, 0.5));
        const g = Math.floor(255 * Math.pow(normalized, 2));
        const b = Math.floor(255 * (1 - normalized));
        return `rgb(${r}, ${g}, ${b})`;
      } else { // monochrome
        // Monochrome with glow
        const brightness = Math.floor(normalized * 255);
        return `rgb(${brightness}, ${brightness}, ${brightness})`;
      }
    };
    
    // Calculate Mandelbrot set
    const calculateMandelbrot = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let screenY = 0; screenY < canvas.height; screenY++) {
        for (let screenX = 0; screenX < canvas.width; screenX++) {
          const {x, y} = mapToFractal(screenX, screenY);
          
          // Mandelbrot set algorithm: z_n+1 = z_n^2 + c
          let zx = 0;
          let zy = 0;
          let iteration = 0;
          
          // Optimization: check if point is in main cardioid or period-2 bulb
          const q = Math.pow(x - 0.25, 2) + y * y;
          if (q * (q + (x - 0.25)) < 0.25 * y * y || 
              Math.pow(x + 1, 2) + y * y < 0.0625) {
            iteration = maxIterations;
          } else {
            while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
              const xtemp = zx * zx - zy * zy + x;
              zy = 2 * zx * zy + y;
              zx = xtemp;
              iteration++;
            }
          }
          
          // Set pixel color
          const color = getColor(iteration);
          const pixelIndex = (screenY * canvas.width + screenX) * 4;
          
          if (color.startsWith('hsl')) {
            // Parse HSL color
            const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (match) {
              const h = parseInt(match[1]) / 360;
              const s = parseInt(match[2]) / 100;
              const l = parseInt(match[3]) / 100;
              
              // Convert HSL to RGB
              const c = (1 - Math.abs(2 * l - 1)) * s;
              const x = c * (1 - Math.abs((h * 6) % 2 - 1));
              const m = l - c / 2;
              
              let r, g, b;
              if (h < 1/6) {
                [r, g, b] = [c, x, 0];
              } else if (h < 2/6) {
                [r, g, b] = [x, c, 0];
              } else if (h < 3/6) {
                [r, g, b] = [0, c, x];
              } else if (h < 4/6) {
                [r, g, b] = [0, x, c];
              } else if (h < 5/6) {
                [r, g, b] = [x, 0, c];
              } else {
                [r, g, b] = [c, 0, x];
              }
              
              data[pixelIndex] = Math.floor((r + m) * 255);
              data[pixelIndex + 1] = Math.floor((g + m) * 255);
              data[pixelIndex + 2] = Math.floor((b + m) * 255);
              data[pixelIndex + 3] = 255;
            }
          } else if (color.startsWith('rgb')) {
            // Parse RGB color
            const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
              data[pixelIndex] = parseInt(match[1]);
              data[pixelIndex + 1] = parseInt(match[2]);
              data[pixelIndex + 2] = parseInt(match[3]);
              data[pixelIndex + 3] = 255;
            }
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
    
    // Draw overlay graphics (axes, markers, etc.)
    const drawOverlay = () => {
      // Draw coordinate axes
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      
      // Draw key fractal locations
      const points = [
        { name: "Main Cardioid", x: -0.75, y: 0 },
        { name: "Period-2 Bulb", x: -1, y: 0 },
        { name: "Mini Mandelbrot", x: -1.75, y: 0 }
      ];
      
      points.forEach(point => {
        const {screenX, screenY} = mapToScreen(point.x, point.y);
        if (screenX >= 0 && screenX < canvas.width && screenY >= 0 && screenY < canvas.height) {
          // Draw point marker
          ctx.beginPath();
          ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.stroke();
        }
      });
      
      // Draw real and imaginary axes
      const origin = mapToScreen(0, 0);
      if (origin.screenX >= 0 && origin.screenX < canvas.width && 
          origin.screenY >= 0 && origin.screenY < canvas.height) {
        
        ctx.beginPath();
        ctx.moveTo(0, origin.screenY);
        ctx.lineTo(canvas.width, origin.screenY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(origin.screenX, 0);
        ctx.lineTo(origin.screenX, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1.0;
    };
    
    // Drawing particles animation
    const drawParticles = () => {
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Add glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle position
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
    };
    
    // Main animation loop
    const animate = () => {
      time += 0.1;
      
      // Only recalculate Mandelbrot set when parameters change
      calculateMandelbrot();
      
      // Draw overlay elements
      drawOverlay();
      
      // Draw animated particles on top
      drawParticles();
      
      requestAnimationFrame(animate);
    };
    
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    
    resizeObserver.observe(container);
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [centerX, centerY, colorScheme, maxIterations, zoom]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(126,34,206,0.5)] border border-purple-800/30">
      <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full"></canvas>
      
      {/* Glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-purple-900/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm">
        <div>
          <div className="inline-block px-4 py-1 bg-purple-700/30 backdrop-blur-sm border border-purple-600/30 rounded-full text-purple-100 text-sm font-bold mb-4 animate-pulse">
            COMPLEX DYNAMICS
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-shadow-fractal">
            Mandelbrot<br/>Explorer
          </h2>
          
          <p className="text-purple-100 text-lg max-w-xl mb-6 leading-relaxed">
            Explore the infinite complexity of the Mandelbrot set, a mathematical fractal where simple rules create endless intricate patterns at every scale.
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col space-y-6">
          {/* Color scheme selector */}
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-purple-200 font-medium">COLOR SCHEME</div>
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${colorScheme === 'classic' 
                  ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                  : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
                onClick={() => handleColorSchemeChange('classic')}
              >
                Classic
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${colorScheme === 'psychedelic' 
                  ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                  : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
                onClick={() => handleColorSchemeChange('psychedelic')}
              >
                Psychedelic
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${colorScheme === 'thermal' 
                  ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                  : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
                onClick={() => handleColorSchemeChange('thermal')}
              >
                Thermal
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${colorScheme === 'monochrome' 
                  ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                  : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
                onClick={() => handleColorSchemeChange('monochrome')}
              >
                Monochrome
              </button>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex flex-wrap items-end justify-between">
            <div className="flex gap-3">
              <div className="flex items-center bg-indigo-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-600/30">
                <button 
                  className="px-4 py-2 hover:bg-indigo-700/40 text-indigo-100"
                  onClick={handleZoomIn}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <div className="px-2 text-indigo-200 font-medium">Zoom {zoom.toFixed(1)}x</div>
                <button 
                  className="px-4 py-2 hover:bg-indigo-700/40 text-indigo-100"
                  onClick={handleZoomOut}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center bg-indigo-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-600/30">
                <button 
                  className="px-4 py-2 hover:bg-indigo-700/40 text-indigo-100"
                  onClick={handleDecreaseIterations}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>
                <div className="px-2 text-indigo-200 font-medium">Iterations: {maxIterations}</div>
                <button 
                  className="px-4 py-2 hover:bg-indigo-700/40 text-indigo-100"
                  onClick={handleIncreaseIterations}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="text-indigo-200 font-mono bg-indigo-800/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-indigo-600/30">
              z = z² + c
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 bg-indigo-800/20 backdrop-blur-sm px-4 py-2 rounded-lg text-indigo-200 border border-indigo-600/30 transform rotate-6 animate-float-slow">
        <div className="text-sm font-mono">
          c = {centerX.toFixed(3)} + {centerY < 0 ? `${centerY.toFixed(3)}i` : `${centerY.toFixed(3)}i`}
        </div>
      </div>
      <div className="absolute bottom-36 right-12 bg-purple-800/20 backdrop-blur-sm px-4 py-2 rounded-lg text-purple-200 border border-purple-600/30 transform -rotate-3 animate-float-medium">
        <div className="text-sm font-mono">
          Self-similarity at every scale
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        
        .text-shadow-fractal {
          text-shadow: 0 0 10px rgba(126, 34, 206, 0.8),
                       0 0 20px rgba(126, 34, 206, 0.5),
                       0 0 30px rgba(126, 34, 206, 0.3);
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}; 