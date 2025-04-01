import React, { useEffect, useRef } from 'react';

export const HermitesProblem = () => {
  const latticeRef = useRef<SVGSVGElement>(null);
  
  // Dynamic lattice animation
  useEffect(() => {
    const animateLattice = () => {
      if (!latticeRef.current) return;
      
      const time = Date.now() / 1000;
      const points = latticeRef.current.querySelectorAll('circle:not(.highlight)');
      const lines = latticeRef.current.querySelectorAll('line:not(.highlight)');
      
      // Subtle wave motion through lattice points
      points.forEach((point, index) => {
        const i = Math.floor(index / 10);
        const j = index % 10;
        const waveX = Math.sin(time * 0.5 + i * 0.2 + j * 0.3) * 3;
        const waveY = Math.cos(time * 0.4 + i * 0.3 + j * 0.2) * 3;
        
        const cx = 100 + i * 60 + waveX;
        const cy = 50 + j * 60 + waveY;
        
        point.setAttribute('cx', cx.toString());
        point.setAttribute('cy', cy.toString());
      });
      
      // Update connecting lines
      lines.forEach((line, index) => {
        const sourceIndex = Math.floor(index / 2);
        const i = Math.floor(sourceIndex / 10);
        const j = sourceIndex % 10;
        
        const sourcePoint = points[sourceIndex] as SVGCircleElement;
        if (!sourcePoint) return;
        
        const sx = parseFloat(sourcePoint.getAttribute('cx') || '0');
        const sy = parseFloat(sourcePoint.getAttribute('cy') || '0');
        
        if (index % 2 === 0 && i < 9) {
          // Horizontal line
          const targetPoint = points[sourceIndex + 10] as SVGCircleElement;
          if (!targetPoint) return;
          
          const tx = parseFloat(targetPoint.getAttribute('cx') || '0');
          const ty = parseFloat(targetPoint.getAttribute('cy') || '0');
          
          line.setAttribute('x1', sx.toString());
          line.setAttribute('y1', sy.toString());
          line.setAttribute('x2', tx.toString());
          line.setAttribute('y2', ty.toString());
        } else if (j < 9) {
          // Vertical line
          const targetPoint = points[sourceIndex + 1] as SVGCircleElement;
          if (!targetPoint) return;
          
          const tx = parseFloat(targetPoint.getAttribute('cx') || '0');
          const ty = parseFloat(targetPoint.getAttribute('cy') || '0');
          
          line.setAttribute('x1', sx.toString());
          line.setAttribute('y1', sy.toString());
          line.setAttribute('x2', tx.toString());
          line.setAttribute('y2', ty.toString());
        }
      });
      
      requestAnimationFrame(animateLattice);
    };
    
    const animationId = requestAnimationFrame(animateLattice);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(190,24,93,0.4)]">
      {/* Background glow effects */}
      <div className="absolute -inset-4 bg-rose-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-fuchsia-500 rounded-full blur-3xl opacity-20"></div>
      
      {/* Main card with crystalline border */}
      <div className="relative z-10">
        {/* Crystalline top */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="crystal-gradient-herm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#be185d">
                  <animate attributeName="stop-color" values="#be185d; #ec4899; #be185d" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#ec4899">
                  <animate attributeName="stop-color" values="#ec4899; #be185d; #ec4899" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#be185d">
                  <animate attributeName="stop-color" values="#be185d; #ec4899; #be185d" dur="7s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              
              <filter id="crystal-shimmer" x="-20%" y="-20%" width="140%" height="140%">
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
              fill="url(#crystal-gradient-herm)"
              filter="url(#crystal-shimmer)"
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
        <div className="bg-gradient-to-br from-rose-700 via-rose-800 to-pink-900 p-8 relative overflow-hidden">
          {/* Animated crystal background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)] animate-crystal-shimmer"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)] animate-crystal-shimmer-reverse"></div>
          </div>
          
          {/* Lattice visualization */}
          <div className="absolute inset-0 opacity-10">
            <svg ref={latticeRef} viewBox="0 0 800 600" className="w-full h-full">
              {/* Grid of points representing lattice */}
              {Array.from({ length: 10 }).map((_, i) => (
                Array.from({ length: 10 }).map((_, j) => (
                  <React.Fragment key={`${i}-${j}`}>
                    <circle 
                      cx={100 + i * 60} 
                      cy={50 + j * 60} 
                      r={3} 
                      fill="white" 
                    />
                    {/* Connecting lines */}
                    {i < 9 && (
                      <line 
                        x1={100 + i * 60} 
                        y1={50 + j * 60} 
                        x2={100 + (i+1) * 60} 
                        y2={50 + j * 60} 
                        stroke="white" 
                        strokeWidth="1" 
                        opacity="0.3"
                      />
                    )}
                    {j < 9 && (
                      <line 
                        x1={100 + i * 60} 
                        y1={50 + j * 60} 
                        x2={100 + i * 60} 
                        y2={50 + (j+1) * 60} 
                        stroke="white" 
                        strokeWidth="1" 
                        opacity="0.3"
                      />
                    )}
                  </React.Fragment>
                ))
              ))}
              
              {/* Highlighted points showing approximation */}
              <circle className="highlight" cx="280" cy="170" r="8" fill="white">
                <animate attributeName="r" values="8;10;8" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle className="highlight" cx="340" cy="290" r="8" fill="white">
                <animate attributeName="r" values="8;10;8" dur="4.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.7;1" dur="4.5s" repeatCount="indefinite" />
              </circle>
              <circle className="highlight" cx="460" cy="230" r="8" fill="white">
                <animate attributeName="r" values="8;10;8" dur="5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.7;1" dur="5s" repeatCount="indefinite" />
              </circle>
              
              {/* Connecting lines forming a simplex */}
              <line className="highlight" x1="280" y1="170" x2="340" y2="290" stroke="white" strokeWidth="2">
                <animate attributeName="stroke-dasharray" from="0,500" to="500,500" dur="2s" begin="0.5s" fill="freeze" />
              </line>
              <line className="highlight" x1="340" y1="290" x2="460" y2="230" stroke="white" strokeWidth="2">
                <animate attributeName="stroke-dasharray" from="0,500" to="500,500" dur="2s" begin="1s" fill="freeze" />
              </line>
              <line className="highlight" x1="460" y1="230" x2="280" y2="170" stroke="white" strokeWidth="2">
                <animate attributeName="stroke-dasharray" from="0,500" to="500,500" dur="2s" begin="1.5s" fill="freeze" />
              </line>
              
              {/* Vector rotation animation */}
              <g>
                <line x1="280" y1="170" x2="380" y2="220" stroke="white" strokeWidth="1" strokeDasharray="4,4">
                  <animate attributeName="x2" values="380;370;390;380" dur="10s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="220;210;230;220" dur="10s" repeatCount="indefinite" />
                </line>
                <line x1="340" y1="290" x2="420" y2="250" stroke="white" strokeWidth="1" strokeDasharray="4,4">
                  <animate attributeName="x2" values="420;430;410;420" dur="12s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="250;240;260;250" dur="12s" repeatCount="indefinite" />
                </line>
              </g>
            </svg>
          </div>
          
          {/* Crystal structure background pattern */}
          <div className="absolute inset-0 opacity-5 text-white overflow-hidden select-none">
            {["α", "β", "γ", "δ", "ε", "ℝ", "ℤ", "√", "∫", "≈", "∞"].map((symbol, i) => (
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
            <div className="inline-block px-6 py-2 bg-rose-900 rounded-full text-white font-bold mb-5 shadow-lg animate-pulse-subtle-rose">
              NUMBER THEORY CHALLENGE
            </div>
            
            <h2 className="text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-100 to-pink-200">
              Hermite's Problem
            </h2>
            
            <p className="text-rose-100 text-xl max-w-2xl mb-8">
              Delve into a fascinating problem of Diophantine approximation: finding simultaneous rational approximations to real numbers with bounds on the denominator.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-rose-700 rounded-xl font-bold text-xl hover:bg-rose-50 transform hover:-translate-y-1 transition-all shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Approximate</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-rose-100 to-white group-hover:w-full transition-all duration-500"></span>
              </button>
              
              <div className="flex items-center text-rose-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 animate-crystal-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-xl">Matrix Solutions</span>
              </div>
            </div>
            
            {/* Floating formula examples */}
            <div className="absolute top-6 right-10 bg-rose-900/50 backdrop-blur px-4 py-2 rounded-lg text-rose-100 transform rotate-3 shadow-lg animate-crystal-float-slow">
              |α - p/q| &lt; c/q²
            </div>
            <div className="absolute bottom-12 right-14 bg-pink-900/50 backdrop-blur px-4 py-2 rounded-lg text-rose-100 transform -rotate-2 shadow-lg animate-crystal-float-medium" style={{animationDelay: '0.5s'}}>
              max(|α₁ - p₁/q|, ..., |αₙ - pₙ/q|)
            </div>
          </div>
        </div>
        
        {/* Crystalline bottom */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="crystal-gradient-bottom-herm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#be185d">
                  <animate attributeName="stop-color" values="#be185d; #ec4899; #be185d" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#ec4899">
                  <animate attributeName="stop-color" values="#ec4899; #be185d; #ec4899" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#be185d">
                  <animate attributeName="stop-color" values="#be185d; #ec4899; #be185d" dur="7s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Crystal pattern for bottom (upside down) */}
            <path 
              d="M0,0 L100,28 L150,0 L250,38 L300,0 L400,33 L450,0 L550,43 L600,0 L700,30 L750,0 L850,40 L900,0 L1000,36 L1050,0 L1150,33 L1200,0 L1200,0 L0,0 Z" 
              fill="url(#crystal-gradient-bottom-herm)"
              filter="url(#crystal-shimmer)"
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
              <linearGradient id="crystal-gradient-left-herm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#be185d">
                  <animate attributeName="stop-color" values="#be185d; #ec4899; #be185d" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#ec4899">
                  <animate attributeName="stop-color" values="#ec4899; #be185d; #ec4899" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Crystal pattern for left side */}
            <path 
              d="M32,0 L12,50 L32,100 L8,150 L32,200 L15,250 L32,300 L5,350 L32,400 L10,450 L32,500 L15,550 L32,600 L0,600 L0,0 Z" 
              fill="url(#crystal-gradient-left-herm)"
              filter="url(#crystal-shimmer)"
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
              <linearGradient id="crystal-gradient-right-herm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899">
                  <animate attributeName="stop-color" values="#ec4899; #be185d; #ec4899" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#be185d">
                  <animate attributeName="stop-color" values="#be185d; #ec4899; #be185d" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Crystal pattern for right side */}
            <path 
              d="M0,0 L20,50 L0,100 L25,150 L0,200 L18,250 L0,300 L22,350 L0,400 L15,450 L0,500 L20,550 L0,600 L32,600 L32,0 Z" 
              fill="url(#crystal-gradient-right-herm)"
              filter="url(#crystal-shimmer)"
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
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full transform rotate-45 animate-crystal-pulse"></div>
      <div className="absolute -top-5 right-20 w-12 h-12 bg-gradient-to-br from-pink-400 to-fuchsia-600 rounded-xl transform animate-crystal-spin"></div>
      
      {/* Crystal shard decorations */}
      <div className="absolute top-1/4 -right-8 w-6 h-16 bg-rose-400 rounded-sm transform rotate-45 animate-crystal-pulse-slow" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute bottom-1/4 -left-8 w-6 h-16 bg-pink-400 rounded-sm transform -rotate-45 animate-crystal-pulse-slow" style={{animationDelay: '0.7s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-10 bg-fuchsia-400/50 rounded-sm transform rotate-15 animate-crystal-float" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute bottom-2/3 left-1/4 w-4 h-10 bg-rose-400/50 rounded-sm transform -rotate-15 animate-crystal-float" style={{animationDelay: '1.2s', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
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
  .animate-pulse-subtle-rose {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-crystal-spin {
    animation: spin 12s linear infinite;
  }
`;
