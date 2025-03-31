"use client";

import React, { useEffect, useRef } from 'react';

export const TopologyExplorer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    let perspective = 0;
    let rotation = 0;
    
    const animate = () => {
      perspective += 0.002;
      rotation += 0.001;
      
      // Update 3D transforms
      container.style.setProperty('--perspective', `${perspective}rad`);
      container.style.setProperty('--rotation', `${rotation}rad`);
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* 3D Card Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-emerald-900/90 via-emerald-900/80 to-teal-900/90 rounded-2xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 perspective-1000">
          {/* Rotating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/20 rounded-full transform-gpu rotate-3d animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-500/20 rounded-lg transform-gpu rotate-3d-reverse animate-float-medium"></div>
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-cyan-500/20 rounded-full transform-gpu rotate-3d animate-float"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative h-full p-8 flex flex-col justify-between">
          {/* 3D Visualization */}
          <div className="absolute inset-0 opacity-40">
            <svg viewBox="0 0 800 600" className="w-full h-full">
              <defs>
                <filter id="glow-topology">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <linearGradient id="shape-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6">
                    <animate attributeName="stopOpacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6">
                    <animate attributeName="stopOpacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
              
              {/* Topological shapes */}
              <g className="transform-gpu rotate-3d">
                {/* Torus */}
                <path 
                  d="M300,200 a100,50 0 1,1 200,0 a100,50 0 1,1 -200,0"
                  fill="none"
                  stroke="url(#shape-gradient)"
                  strokeWidth="2"
                  filter="url(#glow-topology)"
                />
                <path 
                  d="M300,200 a100,50 0 1,1 200,0 a100,50 0 1,1 -200,0"
                  fill="none"
                  stroke="url(#shape-gradient)"
                  strokeWidth="2"
                  filter="url(#glow-topology)"
                  transform="translate(0,100)"
                />
                
                {/* Möbius strip */}
                <path 
                  d="M400,300 Q450,350 400,400 Q350,350 400,300"
                  fill="none"
                  stroke="url(#shape-gradient)"
                  strokeWidth="2"
                  filter="url(#glow-topology)"
                />
              </g>
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block px-4 py-1 bg-emerald-500/20 backdrop-blur-sm rounded-full text-emerald-200 text-sm font-medium mb-4 border border-emerald-500/20">
              TOPOLOGICAL SPACES
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Topology Explorer
            </h2>
            
            <p className="text-emerald-100 text-lg max-w-2xl mb-6 leading-relaxed">
              Journey through the fascinating world of topological spaces. From the Möbius strip to the Klein bottle, discover how topology studies properties preserved through continuous deformations.
            </p>
          </div>
          
          {/* Bottom section with buttons and info */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-emerald-500/20 backdrop-blur-sm text-emerald-100 rounded-xl font-semibold hover:bg-emerald-500/30 transition-all duration-300 border border-emerald-500/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Explore Spaces
              </button>
              <button className="px-6 py-3 bg-teal-500/20 backdrop-blur-sm text-teal-100 rounded-xl font-semibold hover:bg-teal-500/30 transition-all duration-300 border border-teal-500/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Interactive Demo
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-emerald-200/80 bg-emerald-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Continuous Maps</span>
            </div>
          </div>
          
          {/* Floating formulas/concepts */}
          <div className="absolute top-8 right-8 bg-emerald-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-emerald-100 border border-emerald-500/20 transform rotate-2">
            <div className="text-sm font-mono">
              τ ⊆ P(X)
            </div>
          </div>
          <div className="absolute bottom-24 right-8 bg-teal-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-teal-100 border border-teal-500/20 transform -rotate-1">
            <div className="text-sm font-mono">
              ∀U ∈ τ, f⁻¹(U) ∈ τ'
            </div>
          </div>
        </div>
      </div>
      
      {/* Add keyframes for animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-3d {
          transform: rotateX(var(--perspective)) rotateY(var(--rotation));
        }
        
        .rotate-3d-reverse {
          transform: rotateX(calc(-1 * var(--perspective))) rotateY(calc(-1 * var(--rotation)));
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate3d(1, 1, 1, 0deg); }
          50% { transform: translateY(-20px) rotate3d(1, 1, 1, 180deg); }
        }
        
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        
        .animate-float-medium {
          animation: float 8s infinite ease-in-out;
          animation-delay: 1s;
        }
        
        .animate-float-slow {
          animation: float 10s infinite ease-in-out;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}; 