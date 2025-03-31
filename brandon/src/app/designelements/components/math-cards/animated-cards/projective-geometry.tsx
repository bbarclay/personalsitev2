"use client";

import React, { useEffect, useRef, useState } from 'react';

export const ProjectiveGeometry = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let angle = 0;
    let amplitude = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      if (!cardRef.current) return;
      
      angle += 0.01;
      amplitude = Math.sin(angle * 0.5) * 10;
      
      // Dramatic 3D transformations
      cardRef.current.style.perspective = '1500px';
      cardRef.current.style.transform = `
        rotateY(${angle * 0.2 + mousePosition.x * 10}deg) 
        rotateX(${mousePosition.y * 10}deg)
        scale(${1 + Math.sin(angle * 0.5) * 0.05})
      `;
      
      // Pulse effect on elements
      const gridElements = cardRef.current.querySelectorAll('.grid-line');
      gridElements.forEach((el, i) => {
        (el as HTMLElement).style.opacity = `${0.5 + Math.sin(angle + i * 0.2) * 0.5}`;
        (el as HTMLElement).style.transform = `translateZ(${Math.sin(angle + i * 0.5) * 20}px)`;
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={cardRef} className="relative w-full h-full bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.6)] transition-all duration-700 border border-indigo-500/30">
      {/* 3D Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="grid-line absolute w-full h-[1px] bg-indigo-500/30"
            style={{ 
              transform: `rotateX(90deg) translateZ(${i * 20 - 200}px)`,
              boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)'
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="grid-line absolute h-full w-[1px] bg-indigo-500/30"
            style={{ 
              transform: `rotateY(90deg) translateZ(${i * 20 - 200}px)`,
              boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-indigo-400/50 animate-spin-slow" 
          style={{ transformStyle: 'preserve-3d', animation: 'spin 15s linear infinite' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border-2 border-purple-400/50 rotate-45 animate-bounce-slow"
          style={{ transformStyle: 'preserve-3d', animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full backdrop-blur-sm animate-pulse"
          style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>
      </div>

      {/* Projective Geometry SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <svg viewBox="0 0 500 500" width="100%" height="100%" className="max-w-xl">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8">
                <animate attributeName="stopOpacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8">
                <animate attributeName="stopOpacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Projective Plane */}
          <g filter="url(#glow)">
            {Array.from({ length: 8 }).map((_, i) => (
              <line 
                key={i}
                x1="250" 
                y1="250" 
                x2={250 + 200 * Math.cos(i * Math.PI / 4)} 
                y2={250 + 200 * Math.sin(i * Math.PI / 4)} 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                className="origin-center animate-pulse-slow"
              >
                <animate attributeName="strokeWidth" values="1;3;1" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
              </line>
            ))}
            
            {Array.from({ length: 5 }).map((_, i) => (
              <ellipse 
                key={i}
                cx="250" 
                cy="250" 
                rx={50 + i * 30} 
                ry={30 + i * 15} 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="1.5" 
                className="origin-center"
                strokeDasharray="5,5"
              >
                <animate attributeName="rx" values={`${50 + i * 30};${60 + i * 30};${50 + i * 30}`} dur={`${7 + i}s`} repeatCount="indefinite" />
                <animate attributeName="ry" values={`${30 + i * 15};${40 + i * 15};${30 + i * 15}`} dur={`${8 + i}s`} repeatCount="indefinite" />
                <animate attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur={`${20 + i * 5}s`} repeatCount="indefinite" />
              </ellipse>
            ))}
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative h-full z-10 p-8 flex flex-col justify-between backdrop-blur-sm">
        <div>
          <div className="inline-block px-4 py-1 bg-indigo-600/30 border border-indigo-500/30 rounded-full text-indigo-200 text-sm font-semibold mb-4 backdrop-blur-md animate-pulse">
            PROJECTIVE SPACES
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-shadow-glow">
            Projective <br/>Geometry
          </h2>
          
          <p className="text-indigo-100 text-lg max-w-xl mb-6 leading-relaxed">
            Explore the mathematics where parallel lines meet at infinity and transformations preserve collinearity. Discover the bridge between Euclidean and non-Euclidean geometries.
          </p>
        </div>
        
        {/* Interactive elements */}
        <div className="flex items-end justify-between">
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-indigo-600/30 text-indigo-100 rounded-xl font-medium hover:bg-indigo-500/50 transition-all duration-300 border border-indigo-500/30 backdrop-blur-md hover:scale-105">
              Explore Projective Planes
            </button>
            <button className="px-6 py-3 bg-purple-600/30 text-purple-100 rounded-xl font-medium hover:bg-purple-500/50 transition-all duration-300 border border-purple-500/30 backdrop-blur-md hover:scale-105">
              Interactive Demo
            </button>
          </div>
          
          <div className="text-indigo-200 text-lg font-mono bg-indigo-500/20 px-4 py-2 rounded-lg backdrop-blur-md border border-indigo-500/30">
            P²(ℝ)
          </div>
        </div>
        
        {/* Floating formula */}
        <div className="absolute top-16 right-10 text-indigo-200 font-mono bg-indigo-600/20 px-4 py-2 rounded-lg backdrop-blur-md border border-indigo-500/30 rotate-6 animate-float-slow">
          [x:y:z]
        </div>
      </div>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to { transform: rotateY(360deg) rotateX(180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(-6deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(79, 70, 229, 0.8);
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};