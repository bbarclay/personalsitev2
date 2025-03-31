"use client";

import React, { useEffect, useRef } from 'react';

export const TaylorSeries = () => {
  const graphRef = useRef<SVGSVGElement>(null);
  
  // Dynamic function approximation animation
  useEffect(() => {
    const animateGraph = () => {
      if (!graphRef.current) return;
      
      const time = Date.now() / 1000;
      const paths = graphRef.current.querySelectorAll('path');
      
      // Animate the approximation curves
      paths.forEach((path, index) => {
        const pathData = [];
        
        // Different approximation levels
        for (let x = -100; x <= 100; x += 5) {
          const xPos = x + 400;
          
          // Base function: sin(x)
          let yValue = Math.sin((x + time * 10) / 30) * 50;
          
          // Each path represents a different taylor approximation level
          if (index > 0) {
            // Intentionally make approximations imperfect with subtle variance
            const approximationLevel = index;
            const errorFactor = Math.cos(time * 0.5 + index) * 5;
            
            if (approximationLevel === 1) {
              // First order approximation (just the slope)
              yValue = Math.sin(time / 3) * x / 2 + errorFactor;
            } else if (approximationLevel === 2) {
              // Third order approximation
              yValue = Math.sin(time / 3) * x / 2 - Math.sin(time / 4) * Math.pow(x, 3) / 200 + errorFactor;
            }
          }
          
          const y = 300 - yValue;
          pathData.push(x === -100 ? `M${xPos},${y}` : `L${xPos},${y}`);
        }
        
        path.setAttribute('d', pathData.join(' '));
      });
      
      requestAnimationFrame(animateGraph);
    };
    
    const animationId = requestAnimationFrame(animateGraph);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]">
      {/* Background glow effects */}
      <div className="absolute -inset-4 bg-indigo-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-violet-500 rounded-full blur-3xl opacity-20"></div>
      
      {/* Main card with crystalline border */}
      <div className="relative z-10">
        {/* Crystalline top */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="crystal-gradient-taylor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5">
                  <animate attributeName="stop-color" values="#4f46e5; #818cf8; #4f46e5" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#818cf8">
                  <animate attributeName="stop-color" values="#818cf8; #4f46e5; #818cf8" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#4f46e5">
                  <animate attributeName="stop-color" values="#4f46e5; #818cf8; #4f46e5" dur="7s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              
              <filter id="crystal-shimmer-taylor" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#fff">
                  <fePointLight x="50" y="75" z="200">
                    <animate attributeName="x" values="50;150;50" dur="10s" repeatCount="indefinite" />
                  </fePointLight>
                </feSpecularLighting>
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
              </filter>
            </defs>
            {/* Crystal pattern for top */}
            <path 
              d="M0,48 L100,20 L150,48 L250,10 L300,48 L400,15 L450,48 L550,5 L600,48 L700,18 L750,48 L850,8 L900,48 L1000,12 L1050,48 L1150,15 L1200,48 L1200,48 L0,48 Z" 
              fill="url(#crystal-gradient-taylor)"
              filter="url(#crystal-shimmer-taylor)"
            >
              <animate 
                attributeName="d" 
                values="M0,48 L100,20 L150,48 L250,10 L300,48 L400,15 L450,48 L550,5 L600,48 L700,18 L750,48 L850,8 L900,48 L1000,12 L1050,48 L1150,15 L1200,48 L1200,48 L0,48 Z;
                        M0,48 L100,15 L150,48 L250,15 L300,48 L400,10 L450,48 L550,10 L600,48 L700,15 L750,48 L850,15 L900,48 L1000,8 L1050,48 L1150,20 L1200,48 L1200,48 L0,48 Z;
                        M0,48 L100,20 L150,48 L250,10 L300,48 L400,15 L450,48 L550,5 L600,48 L700,18 L750,48 L850,8 L900,48 L1000,12 L1050,48 L1150,15 L1200,48 L1200,48 L0,48 Z" 
                dur="12s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 p-8 relative overflow-hidden">
          {/* Animated crystal background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)] animate-crystal-shimmer"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)] animate-crystal-shimmer-reverse"></div>
          </div>
          
          {/* Function graph visualization */}
          <div className="absolute inset-0 opacity-30">
            <svg ref={graphRef} viewBox="0 0 800 600" className="w-full h-full">
              {/* Coordinate axes */}
              <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="1" opacity="0.5" />
              <line x1="400" y1="100" x2="400" y2="500" stroke="white" strokeWidth="1" opacity="0.5" />
              
              {/* Taylor series approximations */}
              <path className="original-function" d="" stroke="white" strokeWidth="3" fill="none" />
              <path className="first-approx" d="" stroke="#a5b4fc" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              <path className="second-approx" d="" stroke="#818cf8" strokeWidth="2" fill="none" strokeDasharray="3,3" />
              
              {/* Point markers */}
              <circle cx="400" cy="300" r="4" fill="white" />
              <circle cx="500" cy="300" r="3" fill="white" opacity="0.7" />
              <circle cx="300" cy="300" r="3" fill="white" opacity="0.7" />
            </svg>
          </div>
          
          {/* Mathematical symbol background */}
          <div className="absolute inset-0 opacity-5 text-white overflow-hidden select-none">
            {["∑", "∫", "∂", "∞", "dx", "f'", "f''", "lim", "n!", "→"].map((symbol, i) => (
              <div 
                key={i} 
                className="inline-block mx-3 my-2 text-4xl opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.5})`,
                  animation: `crystal-float-${i % 5} ${4 + i % 5}s infinite ease-in-out`
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-indigo-900 rounded-full text-white font-bold mb-5 shadow-lg animate-pulse-subtle-indigo">
              POLYNOMIAL FUNCTIONS
            </div>
            
            <h2 className="text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-blue-200">
              Taylor Series Expansion
            </h2>
            
            <p className="text-indigo-100 text-xl max-w-2xl mb-8">
              Approximate complex functions around a point using polynomial series with increasing accuracy.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-xl hover:bg-indigo-50 transform hover:-translate-y-1 transition-all shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Try Now</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-indigo-100 to-white group-hover:w-full transition-all duration-500"></span>
              </button>
              
              <div className="flex items-center text-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 animate-crystal-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-xl">Advanced topic</span>
              </div>
            </div>
            
            {/* Floating formula examples */}
            <div className="absolute top-6 right-10 bg-indigo-900/50 backdrop-blur px-4 py-3 rounded-lg text-indigo-100 transform rotate-2 shadow-lg animate-crystal-float-slow">
              <div className="text-lg font-mono">
                f(x) ≈ Σ f(n)(a)(x-a)^n/n!
              </div>
            </div>
            <div className="absolute bottom-12 right-14 bg-purple-900/50 backdrop-blur px-4 py-3 rounded-lg text-indigo-100 transform -rotate-2 shadow-lg animate-crystal-float-medium" style={{animationDelay: '0.5s'}}>
              <div className="text-lg font-mono">
                e^x = 1 + x + x²/2! + x³/3! + ...
              </div>
            </div>
          </div>
        </div>
        
        {/* Crystalline bottom */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="crystal-gradient-bottom-taylor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5">
                  <animate attributeName="stop-color" values="#4f46e5; #818cf8; #4f46e5" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#818cf8">
                  <animate attributeName="stop-color" values="#818cf8; #4f46e5; #818cf8" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#4f46e5">
                  <animate attributeName="stop-color" values="#4f46e5; #818cf8; #4f46e5" dur="7s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Crystal pattern for bottom (upside down) */}
            <path 
              d="M0,0 L100,28 L150,0 L250,38 L300,0 L400,33 L450,0 L550,43 L600,0 L700,30 L750,0 L850,40 L900,0 L1000,36 L1050,0 L1150,33 L1200,0 L1200,0 L0,0 Z" 
              fill="url(#crystal-gradient-bottom-taylor)"
              filter="url(#crystal-shimmer-taylor)"
            >
              <animate 
                attributeName="d" 
                values="M0,0 L100,28 L150,0 L250,38 L300,0 L400,33 L450,0 L550,43 L600,0 L700,30 L750,0 L850,40 L900,0 L1000,36 L1050,0 L1150,33 L1200,0 L1200,0 L0,0 Z;
                        M0,0 L100,35 L150,0 L250,33 L300,0 L400,38 L450,0 L550,35 L600,0 L700,35 L750,0 L850,33 L900,0 L1000,40 L1050,0 L1150,28 L1200,0 L1200,0 L0,0 Z;
                        M0,0 L100,28 L150,0 L250,38 L300,0 L400,33 L450,0 L550,43 L600,0 L700,30 L750,0 L850,40 L900,0 L1000,36 L1050,0 L1150,33 L1200,0 L1200,0 L0,0 Z" 
                dur="12s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
        
        {/* Left crystalline edge */}
        <div className="absolute left-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
          <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="crystal-gradient-left-taylor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5">
                  <animate attributeName="stop-color" values="#4f46e5; #818cf8; #4f46e5" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#818cf8">
                  <animate attributeName="stop-color" values="#818cf8; #4f46e5; #818cf8" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Crystal pattern for left side */}
            <path 
              d="M32,0 L12,50 L32,100 L8,150 L32,200 L15,250 L32,300 L5,350 L32,400 L10,450 L32,500 L15,550 L32,600 L0,600 L0,0 Z" 
              fill="url(#crystal-gradient-left-taylor)"
              filter="url(#crystal-shimmer-taylor)"
            >
              <animate 
                attributeName="d" 
                values="M32,0 L12,50 L32,100 L8,150 L32,200 L15,250 L32,300 L5,350 L32,400 L10,450 L32,500 L15,550 L32,600 L0,600 L0,0 Z;
                        M32,0 L8,50 L32,100 L12,150 L32,200 L8,250 L32,300 L12,350 L32,400 L8,450 L32,500 L12,550 L32,600 L0,600 L0,0 Z;
                        M32,0 L12,50 L32,100 L8,150 L32,200 L15,250 L32,300 L5,350 L32,400 L10,450 L32,500 L15,550 L32,600 L0,600 L0,0 Z" 
                dur="15s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
        
        {/* Right crystalline edge */}
        <div className="absolute right-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
          <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="crystal-gradient-right-taylor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8">
                  <animate attributeName="stop-color" values="#818cf8; #4f46e5; #818cf8" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#4f46e5">
                  <animate attributeName="stop-color" values="#4f46e5; #818cf8; #4f46e5" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Crystal pattern for right side */}
            <path 
              d="M0,0 L20,50 L0,100 L25,150 L0,200 L18,250 L0,300 L22,350 L0,400 L15,450 L0,500 L20,550 L0,600 L32,600 L32,0 Z" 
              fill="url(#crystal-gradient-right-taylor)"
              filter="url(#crystal-shimmer-taylor)"
            >
              <animate 
                attributeName="d" 
                values="M0,0 L20,50 L0,100 L25,150 L0,200 L18,250 L0,300 L22,350 L0,400 L15,450 L0,500 L20,550 L0,600 L32,600 L32,0 Z;
                        M0,0 L25,50 L0,100 L20,150 L0,200 L25,250 L0,300 L18,350 L0,400 L25,450 L0,500 L18,550 L0,600 L32,600 L32,0 Z;
                        M0,0 L20,50 L0,100 L25,150 L0,200 L18,250 L0,300 L22,350 L0,400 L15,450 L0,500 L20,550 L0,600 L32,600 L32,0 Z" 
                dur="18s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
      </div>
      
      {/* Extra decorative elements */}
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full transform rotate-45 animate-crystal-pulse"></div>
      <div className="absolute -top-5 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl transform animate-crystal-spin"></div>
      
      {/* Crystal shard decorations */}
      <div className="absolute top-1/4 -right-8 w-6 h-16 bg-indigo-400 rounded-sm transform rotate-45 animate-crystal-pulse-slow" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute bottom-1/4 -left-8 w-6 h-16 bg-blue-400 rounded-sm transform -rotate-45 animate-crystal-pulse-slow" style={{animationDelay: '0.7s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-10 bg-purple-400/50 rounded-sm transform rotate-15 animate-crystal-float" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute bottom-2/3 left-1/4 w-4 h-10 bg-indigo-400/50 rounded-sm transform -rotate-15 animate-crystal-float" style={{animationDelay: '1.2s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
    </div>
  );
};

const styles = `
  @keyframes crystal-float-0 {
    0%, 100% { transform: translateY(0) rotate(-10deg); }
    50% { transform: translateY(-12px) rotate(-5deg); }
  }
  @keyframes crystal-float-1 {
    0%, 100% { transform: translateY(0) rotate(8deg); }
    50% { transform: translateY(-8px) rotate(4deg); }
  }
  @keyframes crystal-float-2 {
    0%, 100% { transform: translateY(0) rotate(-6deg); }
    50% { transform: translateY(-15px) rotate(-3deg); }
  }
  @keyframes crystal-float-3 {
    0%, 100% { transform: translateY(0) rotate(12deg); }
    50% { transform: translateY(-10px) rotate(6deg); }
  }
  @keyframes crystal-float-4 {
    0%, 100% { transform: translateY(0) rotate(-14deg); }
    50% { transform: translateY(-8px) rotate(-7deg); }
  }

  .animate-crystal-shimmer {
    animation: pulse 8s infinite ease-in-out;
  }
  .animate-crystal-shimmer-reverse {
    animation: pulse 8s infinite ease-in-out reverse;
  }
  .animate-crystal-float {
    animation: bounce 7s infinite ease-in-out;
  }
  .animate-crystal-float-slow {
    animation: bounce 10s infinite ease-in-out;
  }
  .animate-crystal-float-medium {
    animation: bounce 8s infinite ease-in-out;
  }
  .animate-crystal-pulse {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-crystal-pulse-slow {
    animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-pulse-subtle-indigo {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-crystal-spin {
    animation: spin 12s linear infinite;
  }
`; 