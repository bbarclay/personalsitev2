import React, { useEffect, useRef } from 'react';

export const JacobiPerron = () => {
  const fractionRef = useRef<SVGSVGElement>(null);
  
  // Animate continued fractions visualization
  useEffect(() => {
    if (!fractionRef.current) return;
    
    const animateFractions = () => {
      const time = Date.now() / 1000;
      const circles = fractionRef.current?.querySelectorAll('circle:not(.static)');
      const lines = fractionRef.current?.querySelectorAll('line');
      
      // Animate circles in a flowing pattern
      circles?.forEach((circle, i) => {
        const phase = i * 0.3;
        const x = parseFloat(circle.getAttribute('cx') || '0');
        const y = parseFloat(circle.getAttribute('cy') || '0');
        
        const newX = x + Math.sin(time + phase) * 3;
        const newY = y + Math.cos(time * 1.2 + phase) * 2;
        
        circle.setAttribute('cx', newX.toString());
        circle.setAttribute('cy', newY.toString());
        
        // Pulse effect
        const baseSize = 4 + (i % 3);
        const size = baseSize + Math.sin(time * 1.5 + i * 0.4) * 1.5;
        circle.setAttribute('r', size.toString());
      });
      
      // Update connecting lines
      lines?.forEach((line, i) => {
        if (i % 2 === 0 && i < lines.length - 1) {
          const circle1 = circles?.[Math.floor(i/2)];
          const circle2 = circles?.[Math.floor(i/2) + 1];
          
          if (circle1 && circle2) {
            const x1 = parseFloat(circle1.getAttribute('cx') || '0');
            const y1 = parseFloat(circle1.getAttribute('cy') || '0');
            const x2 = parseFloat(circle2.getAttribute('cx') || '0');
            const y2 = parseFloat(circle2.getAttribute('cy') || '0');
            
            line.setAttribute('x1', x1.toString());
            line.setAttribute('y1', y1.toString());
            line.setAttribute('x2', x2.toString());
            line.setAttribute('y2', y2.toString());
          }
        }
      });
      
      requestAnimationFrame(animateFractions);
    };
    
    const animationId = requestAnimationFrame(animateFractions);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
      {/* Background glow effects */}
      <div className="absolute -inset-2 bg-cyan-600 rounded-full blur-xl opacity-30 animate-jp-pulse"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      
      {/* Main card with cascading border */}
      <div className="relative z-10">
        {/* Top cascading border */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="cascade-gradient-jp" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9">
                  <animate attributeName="stop-color" values="#0ea5e9; #38bdf8; #0ea5e9" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#38bdf8">
                  <animate attributeName="stop-color" values="#38bdf8; #0ea5e9; #38bdf8" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#0ea5e9">
                  <animate attributeName="stop-color" values="#0ea5e9; #7dd3fc; #0ea5e9" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="wave-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            {/* Wave pattern with animation */}
            <path
              d="M0,48 C100,20 150,40 250,20 C350,0 400,30 500,15 C600,0 650,20 750,25 C850,30 900,5 1000,20 C1100,35 1150,10 1200,25 L1200,48 L0,48 Z"
              fill="url(#cascade-gradient-jp)"
              filter="url(#wave-blur)"
            >
              <animate
                attributeName="d"
                values="M0,48 C100,20 150,40 250,20 C350,0 400,30 500,15 C600,0 650,20 750,25 C850,30 900,5 1000,20 C1100,35 1150,10 1200,25 L1200,48 L0,48 Z;
                        M0,48 C100,25 150,30 250,25 C350,20 400,15 500,25 C600,35 650,10 750,15 C850,20 900,25 1000,10 C1100,25 1150,20 1200,15 L1200,48 L0,48 Z;
                        M0,48 C100,20 150,40 250,20 C350,0 400,30 500,15 C600,0 650,20 750,25 C850,30 900,5 1000,20 C1100,35 1150,10 1200,25 L1200,48 L0,48 Z"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-cyan-900 p-8 relative overflow-hidden">
          {/* Animated background shimmer */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(186,230,253,0.1),transparent_70%)] animate-jp-shimmer"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.05),transparent_50%)] animate-jp-shimmer-reverse"></div>
          </div>
          
          {/* Continued fraction visualization */}
          <div className="absolute inset-0 opacity-10">
            <svg ref={fractionRef} viewBox="0 0 800 600" className="w-full h-full">
              {/* Fraction circles and connecting lines */}
              <g>
                {/* Static root node */}
                <circle 
                  className="static" 
                  cx="400" 
                  cy="100" 
                  r="12" 
                  fill="#38bdf8"
                  opacity="0.8"
                >
                  <animate attributeName="r" values="12;14;12" dur="4s" repeatCount="indefinite" />
                </circle>
                
                {/* First level nodes */}
                {[300, 400, 500].map((x, i) => (
                  <React.Fragment key={`level1-${i}`}>
                    <circle 
                      cx={x} 
                      cy="200" 
                      r={6} 
                      fill="#38bdf8"
                      opacity="0.7"
                    />
                    <line 
                      x1="400" 
                      y1="100" 
                      x2={x} 
                      y2="200" 
                      stroke="#38bdf8" 
                      strokeWidth="2" 
                      opacity="0.3"
                      strokeDasharray="5,3"
                    >
                      <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
                    </line>
                  </React.Fragment>
                ))}
                
                {/* Second level nodes */}
                {[250, 300, 350, 400, 450, 500, 550].map((x, i) => (
                  <React.Fragment key={`level2-${i}`}>
                    <circle 
                      cx={x} 
                      cy="300" 
                      r={5} 
                      fill="#38bdf8"
                      opacity="0.6"
                    />
                    <line 
                      x1={300 + (i > 2 ? 100 : 0) + (i > 5 ? 100 : 0)} 
                      y1="200" 
                      x2={x} 
                      y2="300" 
                      stroke="#38bdf8" 
                      strokeWidth="1.5" 
                      opacity="0.3"
                      strokeDasharray="4,3"
                    >
                      <animate attributeName="stroke-dashoffset" values="0;14" dur="3s" repeatCount="indefinite" />
                    </line>
                  </React.Fragment>
                ))}
                
                {/* Third level nodes (more spread out) */}
                {Array.from({ length: 15 }, (_, i) => (
                  <React.Fragment key={`level3-${i}`}>
                    <circle 
                      cx={200 + i * 30} 
                      cy="400" 
                      r={4} 
                      fill="#38bdf8"
                      opacity="0.5"
                    />
                    <line 
                      x1={250 + Math.floor(i/2) * 50} 
                      y1="300" 
                      x2={200 + i * 30} 
                      y2="400" 
                      stroke="#38bdf8" 
                      strokeWidth="1" 
                      opacity="0.2"
                      strokeDasharray="3,3"
                    >
                      <animate attributeName="stroke-dashoffset" values="0;12" dur="4s" repeatCount="indefinite" />
                    </line>
                  </React.Fragment>
                ))}
              </g>
            </svg>
          </div>
          
          {/* Fraction background */}
          <div className="absolute inset-0 opacity-5 text-white overflow-hidden select-none">
            {["[", "]", "1", "2", "3", "5", "8", "13", "21", "34", "⟨", "⟩", "⌊", "⌋", "…"].map((symbol, i) => (
              <div 
                key={i} 
                className="inline-block mx-3 my-2 text-4xl opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.5})`,
                  animation: `jp-float-${i % 5} ${4 + i % 5}s infinite ease-in-out`
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-sky-900 rounded-full text-white font-bold mb-5 shadow-lg animate-jp-pulse-subtle">
              ALGORITHMIC NUMBER THEORY
            </div>
            
            <h2 className="text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-100 to-cyan-200">
              Jacobi-Perron Algorithm
            </h2>
            
            <p className="text-sky-100 text-xl max-w-2xl mb-8">
              Explore a multidimensional continued fraction algorithm that generates sequences 
              of integer vectors to approximate vectors of real numbers.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-sky-700 rounded-xl font-bold text-xl hover:bg-sky-50 transform hover:-translate-y-1 transition-all shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Generate Sequence</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-sky-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-sky-100 to-white group-hover:w-full transition-all duration-500"></span>
              </button>
              
              <div className="flex items-center text-sky-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 animate-jp-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xl">Explore Convergents</span>
              </div>
            </div>
            
            {/* Floating formula examples */}
            <div className="absolute top-10 right-14 bg-cyan-900/50 backdrop-blur px-4 py-2 rounded-lg text-sky-100 transform rotate-3 shadow-lg animate-jp-float-slow">
              a<sub>n</sub> = ⌊α<sub>n</sub>⌋
            </div>
            <div className="absolute bottom-16 right-10 bg-sky-900/50 backdrop-blur px-4 py-2 rounded-lg text-sky-100 transform -rotate-2 shadow-lg animate-jp-float-medium" style={{animationDelay: '0.8s'}}>
              (α<sub>1</sub>, α<sub>2</sub>, ..., α<sub>d</sub>)
            </div>
            
            {/* Animated sequence examples */}
            <div className="absolute top-1/3 left-12 opacity-70 animate-jp-sequence-1">
              <div className="flex items-center bg-sky-800/30 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                {[1, 3, 7, 2, 9].map((num, i) => (
                  <span key={i} className="mx-1 animate-jp-number" style={{ animationDelay: `${i * 0.2}s` }}>
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute bottom-1/3 right-20 opacity-70 animate-jp-sequence-2">
              <div className="flex items-center bg-cyan-800/30 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                {[2, 5, 8, 13, 21].map((num, i) => (
                  <span key={i} className="mx-1 animate-jp-number" style={{ animationDelay: `${i * 0.2}s` }}>
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom cascading border */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="cascade-gradient-bottom-jp" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9">
                  <animate attributeName="stop-color" values="#0ea5e9; #38bdf8; #0ea5e9" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#38bdf8">
                  <animate attributeName="stop-color" values="#38bdf8; #0ea5e9; #38bdf8" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#0ea5e9">
                  <animate attributeName="stop-color" values="#0ea5e9; #7dd3fc; #0ea5e9" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Wave pattern upside down */}
            <path
              d="M0,0 C100,28 150,8 250,28 C350,48 400,18 500,33 C600,48 650,28 750,23 C850,18 900,43 1000,28 C1100,13 1150,38 1200,23 L1200,0 L0,0 Z"
              fill="url(#cascade-gradient-bottom-jp)"
              filter="url(#wave-blur)"
            >
              <animate
                attributeName="d"
                values="M0,0 C100,28 150,8 250,28 C350,48 400,18 500,33 C600,48 650,28 750,23 C850,18 900,43 1000,28 C1100,13 1150,38 1200,23 L1200,0 L0,0 Z;
                        M0,0 C100,23 150,18 250,23 C350,28 400,33 500,23 C600,13 650,38 750,33 C850,28 900,23 1000,38 C1100,23 1150,28 1200,33 L1200,0 L0,0 Z;
                        M0,0 C100,28 150,8 250,28 C350,48 400,18 500,33 C600,48 650,28 750,23 C850,18 900,43 1000,28 C1100,13 1150,38 1200,23 L1200,0 L0,0 Z"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        
        {/* Left cascading edge */}
        <div className="absolute left-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
          <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="cascade-gradient-left-jp" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9">
                  <animate attributeName="stop-color" values="#0ea5e9; #38bdf8; #0ea5e9" dur="9s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#38bdf8">
                  <animate attributeName="stop-color" values="#38bdf8; #0ea5e9; #38bdf8" dur="9s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Wave pattern for left edge */}
            <path
              d="M32,0 C20,100 30,150 15,250 C0,350 25,400 10,500 C0,550 25,580 32,600 L0,600 L0,0 Z"
              fill="url(#cascade-gradient-left-jp)"
              filter="url(#wave-blur)"
            >
              <animate
                attributeName="d"
                values="M32,0 C20,100 30,150 15,250 C0,350 25,400 10,500 C0,550 25,580 32,600 L0,600 L0,0 Z;
                        M32,0 C25,100 15,150 25,250 C10,350 20,400 15,500 C5,550 20,580 32,600 L0,600 L0,0 Z;
                        M32,0 C20,100 30,150 15,250 C0,350 25,400 10,500 C0,550 25,580 32,600 L0,600 L0,0 Z"
                dur="16s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        
        {/* Right cascading edge */}
        <div className="absolute right-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
          <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="cascade-gradient-right-jp" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8">
                  <animate attributeName="stop-color" values="#38bdf8; #0ea5e9; #38bdf8" dur="9s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#0ea5e9">
                  <animate attributeName="stop-color" values="#0ea5e9; #38bdf8; #0ea5e9" dur="9s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Wave pattern for right edge */}
            <path
              d="M0,0 C12,100 2,150 17,250 C32,350 7,400 22,500 C32,550 7,580 0,600 L32,600 L32,0 Z"
              fill="url(#cascade-gradient-right-jp)"
              filter="url(#wave-blur)"
            >
              <animate
                attributeName="d"
                values="M0,0 C12,100 2,150 17,250 C32,350 7,400 22,500 C32,550 7,580 0,600 L32,600 L32,0 Z;
                        M0,0 C7,100 17,150 7,250 C22,350 12,400 17,500 C27,550 12,580 0,600 L32,600 L32,0 Z;
                        M0,0 C12,100 2,150 17,250 C32,350 7,400 22,500 C32,550 7,580 0,600 L32,600 L32,0 Z"
                dur="16s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
      
      {/* Extra decorative elements */}
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-600 rounded-full transform rotate-45 animate-jp-pulse"></div>
      <div className="absolute -top-5 right-20 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl transform animate-jp-spin"></div>
      
      {/* Fraction bracket decorations */}
      <div className="absolute top-1/4 -right-6 w-4 h-20 bg-sky-400/70 rounded-sm transform rotate-15 animate-jp-pulse-slow" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
      <div className="absolute bottom-1/4 -left-6 w-4 h-20 bg-cyan-400/70 rounded-sm transform -rotate-15 animate-jp-pulse-slow" style={{ animationDelay: '0.7s', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
      
      {/* Floating 'bubble' elements */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-6 h-6 rounded-full bg-sky-500/10"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animation: `jp-bubble ${6 + i * 3}s infinite ease-in-out ${i}s`,
            opacity: 0.2 + Math.random() * 0.3
          }}
        />
      ))}
    </div>
  );
};

const styles = `
  @keyframes jp-float-0 {
    0%, 100% { transform: translateY(0) rotate(-8deg); }
    50% { transform: translateY(-15px) rotate(-3deg); }
  }
  @keyframes jp-float-1 {
    0%, 100% { transform: translateY(0) rotate(6deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
  }
  @keyframes jp-float-2 {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-12px) rotate(-2deg); }
  }
  @keyframes jp-float-3 {
    0%, 100% { transform: translateY(0) rotate(10deg); }
    50% { transform: translateY(-8px) rotate(5deg); }
  }
  @keyframes jp-float-4 {
    0%, 100% { transform: translateY(0) rotate(-12deg); }
    50% { transform: translateY(-10px) rotate(-6deg); }
  }
  
  @keyframes jp-sequence-1 {
    0%, 100% { transform: translateX(0); opacity: 0.7; }
    50% { transform: translateX(30px); opacity: 0.9; }
  }
  
  @keyframes jp-sequence-2 {
    0%, 100% { transform: translateX(0); opacity: 0.7; }
    50% { transform: translateX(-30px); opacity: 0.9; }
  }
  
  @keyframes jp-number {
    0% { transform: translateY(0); color: rgba(255,255,255,0.6); }
    50% { transform: translateY(-4px); color: rgba(255,255,255,1); }
    100% { transform: translateY(0); color: rgba(255,255,255,0.6); }
  }
  
  @keyframes jp-bubble {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
    50% { transform: translateY(-100px) scale(1.5); opacity: 0.4; }
  }

  .animate-jp-shimmer {
    animation: pulse 8s infinite ease-in-out;
  }
  .animate-jp-shimmer-reverse {
    animation: pulse 8s infinite ease-in-out reverse;
  }
  .animate-jp-float-slow {
    animation: bounce 10s infinite ease-in-out;
  }
  .animate-jp-float-medium {
    animation: bounce 8s infinite ease-in-out;
  }
  .animate-jp-pulse {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-jp-pulse-slow {
    animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-jp-pulse-subtle {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-jp-spin {
    animation: spin 12s linear infinite;
  }
`;
