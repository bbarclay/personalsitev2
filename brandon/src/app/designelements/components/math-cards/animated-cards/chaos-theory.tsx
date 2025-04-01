"use client";

import React, { useEffect, useRef, useState } from 'react';

export const ChaosTheory = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [attractor, setAttractor] = useState('lorenz');

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
    const points: {x: number, y: number, z: number, color: string}[] = [];
    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string}[] = [];
    
    // Add initial point
    points.push({
      x: 0.1,
      y: 0,
      z: 0,
      color: `hsla(${Math.random() * 360}, 100%, 70%, 0.8)`
    });
    
    // Add background particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsla(${Math.random() * 60 + 180}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`
      });
    }
    
    // Lorenz attractor parameters
    const lorenzParams = {
      sigma: 10,
      rho: 28,
      beta: 8/3,
      dt: 0.005
    };
    
    // Rossler attractor parameters
    const rosslerParams = {
      a: 0.2,
      b: 0.2,
      c: 5.7,
      dt: 0.01
    };
    
    // Chaos simulation step functions
    const lorenzStep = (x: number, y: number, z: number) => {
      const dx = lorenzParams.sigma * (y - x) * lorenzParams.dt;
      const dy = (x * (lorenzParams.rho - z) - y) * lorenzParams.dt;
      const dz = (x * y - lorenzParams.beta * z) * lorenzParams.dt;
      
      return {
        x: x + dx,
        y: y + dy,
        z: z + dz,
        color: ''
      };
    };
    
    const rosslerStep = (x: number, y: number, z: number) => {
      const dx = (-y - z) * rosslerParams.dt;
      const dy = (x + rosslerParams.a * y) * rosslerParams.dt;
      const dz = (rosslerParams.b + z * (x - rosslerParams.c)) * rosslerParams.dt;
      
      return {
        x: x + dx,
        y: y + dy,
        z: z + dz,
        color: ''
      };
    };
    
    // Main animation loop
    const animate = () => {
      time += 0.01;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.vx * (Math.sin(time) * 0.5 + 0.5);
        p.y += p.vy * (Math.cos(time) * 0.5 + 0.5);
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      
      // Add new point based on the selected attractor
      if (points.length > 0) {
        const lastPoint = points[points.length - 1];
        let newPoint;
        
        if (attractor === 'lorenz') {
          newPoint = lorenzStep(lastPoint.x, lastPoint.y, lastPoint.z);
        } else {
          newPoint = rosslerStep(lastPoint.x, lastPoint.y, lastPoint.z);
        }
        
        // Add color variation based on z coordinate
        const hue = (time * 10) % 360;
        newPoint.color = `hsla(${hue}, 100%, 70%, 0.8)`;
        
        points.push(newPoint);
        
        // Limit number of points
        if (points.length > 5000) {
          points.shift();
        }
      }
      
      // Draw attractor
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Scale and rotate for dynamic view
      const scale = 10 + Math.sin(time * 0.2) * 3;
      ctx.scale(scale, scale);
      ctx.rotate(time * 0.1);
      
      // Draw points with trail effect
      points.forEach((point, index) => {
        const prevPoint = index > 0 ? points[index - 1] : point;
        
        // Draw line between points
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = point.color;
        ctx.lineWidth = 0.08;
        ctx.globalAlpha = index / points.length;
        ctx.stroke();
        
        // Draw point
        if (index % 20 === 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 0.1, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
        }
      });
      
      ctx.restore();
      
      // Add glow effect
      ctx.save();
      ctx.filter = 'blur(8px)';
      ctx.globalAlpha = 0.3;
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
      
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
  }, [attractor]);

  const handleAttractorChange = (newAttractor: string) => {
    setAttractor(newAttractor);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] border border-cyan-500/30">
      <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full"></canvas>
      
      {/* Lightning effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/30 via-transparent to-cyan-900/30"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="lightning absolute opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: '0',
              height: '100%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, cyan, transparent)',
              animation: `lightning ${3 + i}s ${i * 1.3}s infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm">
        <div>
          <div className="inline-block px-4 py-1 bg-cyan-600/30 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-100 text-sm font-bold mb-4 animate-pulse">
            DETERMINISTIC CHAOS
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-shadow-electric">
            Chaos<br/>Theory
          </h2>
          
          <p className="text-cyan-100 text-lg max-w-xl mb-6 leading-relaxed">
            Witness the unpredictable yet deterministic behavior of chaotic systems. Small changes in initial conditions lead to drastically different outcomes—the essence of the butterfly effect.
          </p>
        </div>
        
        {/* Attractor selector */}
        <div className="flex flex-col space-y-2 mb-8">
          <div className="flex gap-3">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${attractor === 'lorenz' 
                ? 'bg-cyan-500/50 text-white border border-cyan-400/70' 
                : 'bg-cyan-800/30 text-cyan-200 border border-cyan-600/30'}`}
              onClick={() => handleAttractorChange('lorenz')}
            >
              Lorenz Attractor
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${attractor === 'rossler' 
                ? 'bg-cyan-500/50 text-white border border-cyan-400/70' 
                : 'bg-cyan-800/30 text-cyan-200 border border-cyan-600/30'}`}
              onClick={() => handleAttractorChange('rossler')}
            >
              Rössler Attractor
            </button>
          </div>
        </div>
        
        {/* Interactive controls */}
        <div className="flex items-end justify-between">
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-cyan-600/30 text-cyan-100 rounded-xl font-medium hover:bg-cyan-500/50 transition-all duration-300 border border-cyan-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Butterfly Effect
            </button>
            <button className="px-6 py-3 bg-sky-600/30 text-sky-100 rounded-xl font-medium hover:bg-sky-500/50 transition-all duration-300 border border-sky-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Visualize Bifurcations
            </button>
          </div>
          
          <div className="text-cyan-200 font-mono bg-cyan-600/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-cyan-500/30">
            {attractor === 'lorenz' ? 'σ = 10, ρ = 28, β = 8/3' : 'a = 0.2, b = 0.2, c = 5.7'}
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 bg-cyan-600/20 backdrop-blur-sm px-4 py-2 rounded-lg text-cyan-200 border border-cyan-500/30 transform rotate-6 animate-float-slow">
        <div className="text-sm font-mono">
          dx/dt = σ(y-x)
        </div>
      </div>
      <div className="absolute bottom-36 right-12 bg-sky-600/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sky-200 border border-sky-500/30 transform -rotate-3 animate-float-medium">
        <div className="text-sm font-mono">
          Initial conditions
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes lightning {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        
        .text-shadow-electric {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.8),
                       0 0 20px rgba(6, 182, 212, 0.5),
                       0 0 30px rgba(6, 182, 212, 0.3);
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
