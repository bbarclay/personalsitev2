"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number;
}

export const QuantumMechanics = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    const colors = ['#8b5cf6', '#6366f1', '#a855f7', '#d946ef'];
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2
    }));
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.02;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw wave function
        ctx.beginPath();
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        for (let i = 0; i < 50; i++) {
          const x = particle.x + i * 2;
          const y = particle.y + Math.sin(i * 0.1 + particle.phase) * 10;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      {/* Card Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-purple-900/90 via-indigo-900/80 to-violet-900/90 rounded-2xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]">
        {/* Particle Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
        />
        
        {/* Content Container */}
        <div className="relative h-full p-8 flex flex-col justify-between">
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block px-4 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-200 text-sm font-medium mb-4 border border-purple-500/20">
              QUANTUM MECHANICS
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Wave-Particle Duality
            </h2>
            
            <p className="text-purple-100 text-lg max-w-2xl mb-6 leading-relaxed">
              Explore the fascinating world of quantum mechanics, where particles exhibit both wave and particle-like behavior. Witness the probabilistic nature of quantum states through interactive visualizations.
            </p>
          </div>
          
          {/* Bottom section with buttons and info */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-purple-500/20 backdrop-blur-sm text-purple-100 rounded-xl font-semibold hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Wave Function
              </button>
              <button className="px-6 py-3 bg-indigo-500/20 backdrop-blur-sm text-indigo-100 rounded-xl font-semibold hover:bg-indigo-500/30 transition-all duration-300 border border-indigo-500/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Schrödinger's Equation
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-purple-200/80 bg-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Superposition</span>
            </div>
          </div>
          
          {/* Floating formulas/concepts */}
          <div className="absolute top-8 right-8 bg-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-purple-100 border border-purple-500/20 transform rotate-2">
            <div className="text-sm font-mono">
              iℏ∂ψ/∂t = Ĥψ
            </div>
          </div>
          <div className="absolute bottom-24 right-8 bg-indigo-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-indigo-100 border border-indigo-500/20 transform -rotate-1">
            <div className="text-sm font-mono">
              |ψ⟩ = α|0⟩ + β|1⟩
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
