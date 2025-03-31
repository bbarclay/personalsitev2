import React, { useEffect, useRef } from 'react';

export const QuadraticSolver = () => {
  const parabola1Ref = useRef<SVGPathElement>(null);
  const parabola2Ref = useRef<SVGPathElement>(null);
  const parabola3Ref = useRef<SVGPathElement>(null);
  
  // Animation for parabolas
  useEffect(() => {
    const animateParabolas = () => {
      const time = Date.now() / 1000;
      
      if (parabola1Ref.current) {
        const shift = Math.sin(time * 0.5) * 30;
        parabola1Ref.current.setAttribute('d', `M150,${500 + shift} Q400,${100 - shift} 650,${500 + shift}`);
      }
      
      if (parabola2Ref.current) {
        const shift = Math.sin(time * 0.3 + 1) * 20;
        parabola2Ref.current.setAttribute('d', `M200,${450 + shift} Q400,${150 - shift} 600,${450 + shift}`);
      }
      
      if (parabola3Ref.current) {
        const shift = Math.sin(time * 0.4 + 2) * 15;
        parabola3Ref.current.setAttribute('d', `M250,${400 + shift} Q400,${200 - shift} 550,${400 + shift}`);
      }
      
      requestAnimationFrame(animateParabolas);
    };
    
    const animationId = requestAnimationFrame(animateParabolas);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
      {/* Background glow effects */}
      <div className="absolute -inset-4 bg-emerald-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
      
      {/* Main card with parabolic border */}
      <div className="relative z-10">
        {/* Parabolic top */}
        <div className="w-full h-10 overflow-hidden">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="parabola-gradient-quad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669">
                  <animate attributeName="stop-color" values="#059669; #10b981; #059669" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#10b981">
                  <animate attributeName="stop-color" values="#10b981; #059669; #10b981" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#059669">
                  <animate attributeName="stop-color" values="#059669; #10b981; #059669" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path 
              d="M0,40 L0,30 C300,0 900,0 1200,30 L1200,40 Z" 
              fill="url(#parabola-gradient-quad)"
            >
              <animate attributeName="d" 
                values="M0,40 L0,30 C300,0 900,0 1200,30 L1200,40 Z; 
                        M0,40 L0,28 C300,8 900,-8 1200,28 L1200,40 Z; 
                        M0,40 L0,30 C300,0 900,0 1200,30 L1200,40 Z" 
                dur="15s" 
                repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 p-8 relative overflow-hidden">
          {/* Coordinate plane with parabolas */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 600" className="w-full h-full">
              {/* Grid lines */}
              <path d="M0,300 L800,300" stroke="white" strokeWidth="1" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M400,0 L400,600" stroke="white" strokeWidth="1" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="5s" repeatCount="indefinite" />
              </path>
              
              {/* Multiple parabolas */}
              <path 
                ref={parabola1Ref}
                d="M150,500 Q400,100 650,500" 
                stroke="white" 
                strokeWidth="2" 
                fill="none" 
              />
              <path 
                ref={parabola2Ref}
                d="M200,450 Q400,150 600,450" 
                stroke="white" 
                strokeWidth="1.5" 
                fill="none" 
                opacity="0.7" 
              />
              <path 
                ref={parabola3Ref}
                d="M250,400 Q400,200 550,400" 
                stroke="white" 
                strokeWidth="1" 
                fill="none" 
                opacity="0.5" 
              />
              
              {/* Critical points */}
              <circle cx="400" cy="100" r="5" fill="white">
                <animate attributeName="r" values="5;6;5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="150" r="4" fill="white" opacity="0.7">
                <animate attributeName="r" values="4;5;4" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.5;0.7" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="200" r="3" fill="white" opacity="0.5">
                <animate attributeName="r" values="3;4;3" dur="5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.3;0.5" dur="5s" repeatCount="indefinite" />
              </circle>
              
              {/* Roots */}
              <circle cx="150" cy="500" r="5" fill="white">
                <animate attributeName="cy" values="500;505;500" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="500" r="5" fill="white">
                <animate attributeName="cy" values="500;505;500" dur="6s" repeatCount="indefinite" />
              </circle>
              
              {/* Coefficient dynamic points */}
              <g>
                <circle cx="250" cy="200" r="3" fill="white" opacity="0.3">
                  <animate attributeName="cx" values="250;260;250" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="200;190;200" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="550" cy="200" r="3" fill="white" opacity="0.3">
                  <animate attributeName="cx" values="550;540;550" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="200;190;200" dur="8s" repeatCount="indefinite" />
                </circle>
                <path d="M250,200 Q400,100 550,200" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3">
                  <animate attributeName="d" 
                    values="M250,200 Q400,100 550,200; M260,190 Q400,90 540,190; M250,200 Q400,100 550,200" 
                    dur="8s" repeatCount="indefinite" />
                </path>
              </g>
            </svg>
          </div>
          
          {/* Coefficient background pattern */}
          <div className="absolute inset-0 opacity-5 text-white overflow-hidden select-none">
            {["a", "b", "c", "x²", "+", "=", "0", "Δ", "±", "√", "2a"].map((symbol, i) => (
              <div 
                key={i} 
                className="inline-block mx-3 my-2 text-3xl opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.5})`,
                  animation: `float-${i % 5} ${3 + i % 4}s infinite ease-in-out`
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-emerald-800 rounded-full text-white font-bold mb-5 shadow-lg animate-pulse-subtle">
              ALGEBRAIC FUNDAMENTALS
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-green-300">
              Quadratic Equation Solver
            </h2>
            
            <p className="text-emerald-100 text-xl max-w-2xl mb-8">
              Master the classic tool of algebra: solve any second-degree polynomial equation with beautifully visualized step-by-step solutions and interactive graphs.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold text-xl hover:bg-emerald-50 transform hover:-translate-y-1 transition-all shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Solve</span>
                <span className="absolute w-0 h-full bg-emerald-100 left-0 top-0 transition-all duration-300 group-hover:w-full -z-0"></span>
              </button>
              
              <div className="flex items-center text-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xl">Graphical Explorer</span>
              </div>
            </div>
            
            {/* Floating formula examples */}
            <div className="absolute top-6 right-10 bg-emerald-800/50 backdrop-blur px-4 py-2 rounded-lg text-emerald-100 transform rotate-2 shadow-lg animate-float-slow">
              x² + 5x + 6 = 0
            </div>
            <div className="absolute bottom-16 right-14 bg-green-900/50 backdrop-blur px-4 py-2 rounded-lg text-emerald-100 transform -rotate-1 shadow-lg animate-float-medium">
              x = (-b ± √(b² - 4ac))/2a
            </div>
          </div>
        </div>
        
        {/* Parabolic bottom */}
        <div className="w-full h-10 overflow-hidden">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="parabola-gradient-bottom-quad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669">
                  <animate attributeName="stop-color" values="#059669; #10b981; #059669" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#10b981">
                  <animate attributeName="stop-color" values="#10b981; #059669; #10b981" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#059669">
                  <animate attributeName="stop-color" values="#059669; #10b981; #059669" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path 
              d="M0,0 L0,10 C300,40 900,40 1200,10 L1200,0 Z" 
              fill="url(#parabola-gradient-bottom-quad)"
            >
              <animate attributeName="d" 
                values="M0,0 L0,10 C300,40 900,40 1200,10 L1200,0 Z; 
                        M0,0 L0,12 C300,32 900,52 1200,12 L1200,0 Z; 
                        M0,0 L0,10 C300,40 900,40 1200,10 L1200,0 Z" 
                dur="15s" 
                repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        {/* Left curvy edge */}
        <div className="absolute left-0 top-10 h-calc(100%-20px) w-8 overflow-hidden" style={{ height: 'calc(100% - 20px)' }}>
          <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="edge-gradient-left-quad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669">
                  <animate attributeName="stop-color" values="#059669; #10b981; #059669" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#10b981">
                  <animate attributeName="stop-color" values="#10b981; #059669; #10b981" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path 
              d="M32,0 C20,150 0,300 20,450 C32,600 32,600 32,600 L0,600 L0,0 Z" 
              fill="url(#edge-gradient-left-quad)"
            >
              <animate attributeName="d" 
                values="M32,0 C20,150 0,300 20,450 C32,600 32,600 32,600 L0,600 L0,0 Z; 
                        M32,0 C15,150 5,300 25,450 C30,600 32,600 32,600 L0,600 L0,0 Z; 
                        M32,0 C20,150 0,300 20,450 C32,600 32,600 32,600 L0,600 L0,0 Z" 
                dur="20s" 
                repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        {/* Right curvy edge */}
        <div className="absolute right-0 top-10 h-calc(100%-20px) w-8 overflow-hidden" style={{ height: 'calc(100% - 20px)' }}>
          <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="edge-gradient-right-quad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981">
                  <animate attributeName="stop-color" values="#10b981; #059669; #10b981" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#059669">
                  <animate attributeName="stop-color" values="#059669; #10b981; #059669" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path 
              d="M0,0 C12,150 32,300 12,450 C0,600 0,600 0,600 L32,600 L32,0 Z" 
              fill="url(#edge-gradient-right-quad)"
            >
              <animate attributeName="d" 
                values="M0,0 C12,150 32,300 12,450 C0,600 0,600 0,600 L32,600 L32,0 Z; 
                        M0,0 C17,150 27,300 7,450 C2,600 0,600 0,600 L32,600 L32,0 Z; 
                        M0,0 C12,150 32,300 12,450 C0,600 0,600 0,600 L32,600 L32,0 Z" 
                dur="20s" 
                repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>
      
      {/* Extra decorative elements */}
      <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full opacity-70 blur-sm animate-pulse-slow"></div>
      <div className="absolute -top-6 left-20 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full transform animate-spin-slow"></div>
      
      {/* Axis decorations */}
      <div className="absolute bottom-1/3 -left-6 w-3 h-12 bg-emerald-400 rounded-full transform rotate-45 animate-ping-slow"></div>
      <div className="absolute top-1/3 -right-6 w-3 h-12 bg-green-400 rounded-full transform -rotate-45 animate-ping-slow" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

// Add to your global styles or in-component styles
const styles = `
  @keyframes float-0 {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-10px) rotate(-2deg); }
  }
  @keyframes float-1 {
    0%, 100% { transform: translateY(0) rotate(5deg); }
    50% { transform: translateY(-7px) rotate(2deg); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-12px) rotate(0deg); }
  }
  @keyframes float-3 {
    0%, 100% { transform: translateY(0) rotate(7deg); }
    50% { transform: translateY(-6px) rotate(3deg); }
  }
  @keyframes float-4 {
    0%, 100% { transform: translateY(0) rotate(-8deg); }
    50% { transform: translateY(-15px) rotate(-4deg); }
  }

  .animate-float-slow {
    animation: bounce 6s infinite ease-in-out;
  }
  .animate-float-medium {
    animation: bounce 8s infinite ease-in-out;
    animation-delay: 1s;
  }
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-pulse-subtle {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-spin-slow {
    animation: spin 15s linear infinite;
  }
  .animate-ping-slow {
    animation: ping 5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;
