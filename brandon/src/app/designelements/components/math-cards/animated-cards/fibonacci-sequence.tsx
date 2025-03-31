"use client";

import React, { useEffect, useRef } from 'react';

export const FibonacciSequence = () => {
  const spiralRef = useRef<SVGSVGElement>(null);
  
  // Dynamic spiral animation
  useEffect(() => {
    if (!spiralRef.current) return;
    
    const spiral = spiralRef.current;
    const spiralPath = spiral.querySelector('.golden-spiral') as SVGPathElement;
    const circles = spiral.querySelectorAll('.fib-circle');
    const squares = spiral.querySelectorAll('.fib-square');
    
    if (!spiralPath || !circles.length || !squares.length) return;
    
    const animateSpiral = () => {
      const time = Date.now() / 1000;
      
      // Animate the spiral path stroke-dashoffset for drawing effect
      const pathLength = spiralPath.getTotalLength();
      const dashOffset = (Math.sin(time * 0.2) * 0.5 + 0.5) * pathLength;
      spiralPath.style.strokeDashoffset = dashOffset.toString();
      
      // Animate the circles with pulsing effect
      circles.forEach((circle, i) => {
        const scale = 1 + Math.sin(time * 0.5 + i * 0.2) * 0.2;
        (circle as SVGElement).style.transform = `scale(${scale})`;
      });
      
      // Rotate the squares slightly
      squares.forEach((square, i) => {
        const angle = Math.sin(time * 0.3 + i * 0.1) * 5;
        (square as SVGElement).style.transform = `rotate(${angle}deg)`;
      });
      
      requestAnimationFrame(animateSpiral);
    };
    
    const animationId = requestAnimationFrame(animateSpiral);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]">
      {/* Background glow effects */}
      <div className="absolute -inset-4 bg-amber-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
      
      {/* Main card with spiral border */}
      <div className="relative z-10">
        {/* Top spiral edge */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="spiral-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706">
                  <animate attributeName="stop-color" values="#d97706; #f59e0b; #d97706" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#f59e0b">
                  <animate attributeName="stop-color" values="#f59e0b; #d97706; #f59e0b" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#d97706">
                  <animate attributeName="stop-color" values="#d97706; #f59e0b; #d97706" dur="7s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Spiral pattern for top */}
            <path 
              d="M0,48 C50,15 150,35 200,48 C250,35 350,15 400,48 C450,35 550,15 600,48 C650,35 750,15 800,48 C850,35 950,15 1000,48 C1050,35 1150,15 1200,48 L1200,48 L0,48 Z" 
              fill="url(#spiral-gradient-top)"
            >
              <animate 
                attributeName="d" 
                values="M0,48 C50,15 150,35 200,48 C250,35 350,15 400,48 C450,35 550,15 600,48 C650,35 750,15 800,48 C850,35 950,15 1000,48 C1050,35 1150,15 1200,48 L1200,48 L0,48 Z;
                        M0,48 C50,25 150,15 200,48 C250,25 350,15 400,48 C450,25 550,15 600,48 C650,25 750,15 800,48 C850,25 950,15 1000,48 C1050,25 1150,15 1200,48 L1200,48 L0,48 Z;
                        M0,48 C50,15 150,35 200,48 C250,35 350,15 400,48 C450,35 550,15 600,48 C650,35 750,15 800,48 C850,35 950,15 1000,48 C1050,35 1150,15 1200,48 L1200,48 L0,48 Z" 
                dur="15s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-yellow-900 p-8 relative overflow-hidden">
          {/* Animated spiral background */}
          <div className="absolute inset-0 opacity-20">
            <svg ref={spiralRef} viewBox="0 0 800 600" className="w-full h-full">
              <defs>
                <filter id="glow-fibonacci" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Fibonacci squares */}
              <rect x="400" y="300" width="1" height="1" className="fib-square" fill="white" opacity="0.3" />
              <rect x="399" y="300" width="1" height="1" className="fib-square" fill="white" opacity="0.3" />
              <rect x="399" y="299" width="2" height="2" className="fib-square" fill="white" opacity="0.3" />
              <rect x="397" y="299" width="3" height="3" className="fib-square" fill="white" opacity="0.3" />
              <rect x="397" y="294" width="5" height="5" className="fib-square" fill="white" opacity="0.3" />
              <rect x="389" y="294" width="8" height="8" className="fib-square" fill="white" opacity="0.3" />
              <rect x="389" y="281" width="13" height="13" className="fib-square" fill="white" opacity="0.3" />
              <rect x="368" y="281" width="21" height="21" className="fib-square" fill="white" opacity="0.3" />
              <rect x="368" y="247" width="34" height="34" className="fib-square" fill="white" opacity="0.3" />
              <rect x="315" y="247" width="55" height="55" className="fib-square" fill="white" opacity="0.3" />
              <rect x="315" y="158" width="89" height="89" className="fib-square" fill="white" opacity="0.3" />
              <rect x="172" y="158" width="144" height="144" className="fib-square" fill="white" opacity="0.3" />
              <rect x="172" y="-76" width="233" height="233" className="fib-square" fill="white" opacity="0.3" />
              
              {/* Fibonacci numbers along the spiral */}
              <circle cx="400.5" cy="300.5" r="3" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="399.5" cy="300.5" r="3" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="400" cy="298.5" r="3" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="397.5" cy="297.5" r="4" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="397.5" cy="294.5" r="5" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="389.5" cy="294.5" r="6" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="389.5" cy="281.5" r="7" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="368.5" cy="281.5" r="8" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="368.5" cy="247.5" r="9" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="315.5" cy="247.5" r="10" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="315.5" cy="158.5" r="11" className="fib-circle" fill="white" opacity="0.5" />
              <circle cx="172.5" cy="158.5" r="12" className="fib-circle" fill="white" opacity="0.5" />
              
              {/* Golden spiral path */}
              <path 
                className="golden-spiral"
                d="M400.5,300.5 Q400,300 399.5,300.5 Q399,301 400,298.5 Q401,296 397.5,297.5 Q394,299 397.5,294.5 Q401,290 389.5,294.5 Q378,299 389.5,281.5 Q401,264 368.5,281.5 Q336,299 368.5,247.5 Q401,196 315.5,247.5 Q230,299 315.5,158.5 Q401,18 172.5,158.5 Q-56,299 172.5,-76.5"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                filter="url(#glow-fibonacci)"
                strokeDasharray="2000"
                strokeDashoffset="0"
              />
              
              {/* Fibonacci numbers */}
              <text x="401" y="306" fill="white" fontSize="8" textAnchor="middle">1</text>
              <text x="395" y="306" fill="white" fontSize="8" textAnchor="middle">1</text>
              <text x="396" y="296" fill="white" fontSize="10" textAnchor="middle">2</text>
              <text x="391" y="290" fill="white" fontSize="12" textAnchor="middle">3</text>
              <text x="385" y="285" fill="white" fontSize="14" textAnchor="middle">5</text>
              <text x="375" y="275" fill="white" fontSize="16" textAnchor="middle">8</text>
              <text x="358" y="255" fill="white" fontSize="18" textAnchor="middle">13</text>
              <text x="335" y="230" fill="white" fontSize="20" textAnchor="middle">21</text>
              <text x="300" y="190" fill="white" fontSize="22" textAnchor="middle">34</text>
              <text x="250" y="150" fill="white" fontSize="24" textAnchor="middle">55</text>
              <text x="180" y="100" fill="white" fontSize="26" textAnchor="middle">89</text>
            </svg>
          </div>
          
          {/* Mathematical symbol background */}
          <div className="absolute inset-0 opacity-5 text-white overflow-hidden select-none">
            {["φ", "1.618", "√5", "F(n)", "φ^n", "F(n+1)/F(n)", "a/b", "(a+b)/a", "tau", "Φ"].map((symbol, i) => (
              <div 
                key={i} 
                className="inline-block mx-3 my-2 text-4xl opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.5})`,
                  animation: `spiral-float-${i % 5} ${4 + i % 5}s infinite ease-in-out`
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-amber-900 rounded-full text-white font-bold mb-5 shadow-lg">
              NUMBER THEORY
            </div>
            
            <h2 className="text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-yellow-200">
              Fibonacci Sequence Explorer
            </h2>
            
            <p className="text-amber-100 text-xl max-w-2xl mb-8">
              Discover the golden ratio and its occurrence in nature, art, and mathematics through the famous Fibonacci sequence.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-amber-700 rounded-xl font-bold text-xl hover:bg-amber-50 transform hover:-translate-y-1 transition-all shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Try Now</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-amber-100 to-white group-hover:w-full transition-all duration-500"></span>
              </button>
              
              <div className="flex items-center text-amber-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xl">Patterns in nature</span>
              </div>
            </div>
            
            {/* Floating formula examples */}
            <div className="absolute top-6 right-10 bg-amber-900/60 backdrop-blur px-4 py-3 rounded-lg text-amber-100 shadow-lg transform rotate-3">
              <div className="text-lg font-mono">
                φ = (1 + √5)/2 ≈ 1.618
              </div>
            </div>
            <div className="absolute bottom-12 right-14 bg-yellow-900/60 backdrop-blur px-4 py-3 rounded-lg text-amber-100 shadow-lg transform -rotate-2">
              <div className="text-lg font-mono">
                F(n) = F(n-1) + F(n-2)
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom spiral edge */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full rotate-180">
            <defs>
              <linearGradient id="spiral-gradient-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706">
                  <animate attributeName="stop-color" values="#d97706; #f59e0b; #d97706" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#f59e0b">
                  <animate attributeName="stop-color" values="#f59e0b; #d97706; #f59e0b" dur="7s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#d97706">
                  <animate attributeName="stop-color" values="#d97706; #f59e0b; #d97706" dur="7s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Spiral pattern for bottom (upside down) */}
            <path 
              d="M0,48 C50,15 150,35 200,48 C250,35 350,15 400,48 C450,35 550,15 600,48 C650,35 750,15 800,48 C850,35 950,15 1000,48 C1050,35 1150,15 1200,48 L1200,48 L0,48 Z" 
              fill="url(#spiral-gradient-bottom)"
            >
              <animate 
                attributeName="d" 
                values="M0,48 C50,15 150,35 200,48 C250,35 350,15 400,48 C450,35 550,15 600,48 C650,35 750,15 800,48 C850,35 950,15 1000,48 C1050,35 1150,15 1200,48 L1200,48 L0,48 Z;
                        M0,48 C50,25 150,15 200,48 C250,25 350,15 400,48 C450,25 550,15 600,48 C650,25 750,15 800,48 C850,25 950,15 1000,48 C1050,25 1150,15 1200,48 L1200,48 L0,48 Z;
                        M0,48 C50,15 150,35 200,48 C250,35 350,15 400,48 C450,35 550,15 600,48 C650,35 750,15 800,48 C850,35 950,15 1000,48 C1050,35 1150,15 1200,48 L1200,48 L0,48 Z" 
                dur="15s" 
                repeatCount="indefinite" 
              />
            </path>
          </svg>
        </div>
      </div>
      
      {/* Decorative spiral elements */}
      <div className="absolute -bottom-6 -left-6 w-16 h-16 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M50,5 A45,45 0 0,1 95,50 A45,45 0 0,1 50,95 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5 Z" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2"
            className="animate-spin"
            style={{animationDuration: '20s'}}
          />
          <path 
            d="M50,15 A35,35 0 0,1 85,50 A35,35 0 0,1 50,85 A35,35 0 0,1 15,50 A35,35 0 0,1 50,15 Z" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="1.5"
            className="animate-spin"
            style={{animationDuration: '15s', animationDirection: 'reverse'}}
          />
        </svg>
      </div>
      
      <div className="absolute -top-8 right-12 w-20 h-20 opacity-60">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M50,20 C60,20 80,30 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 C20,40 35,35 40,40 C45,45 45,50 50,50" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-pulse"
            style={{animationDuration: '5s'}}
          />
          <circle cx="50" cy="50" r="3" fill="#f59e0b" className="animate-ping" style={{animationDuration: '3s'}} />
        </svg>
      </div>
    </div>
  );
};

const styles = `
  @keyframes spiral-float-0 {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-10px) rotate(-2deg); }
  }
  @keyframes spiral-float-1 {
    0%, 100% { transform: translateY(0) rotate(4deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
  }
  @keyframes spiral-float-2 {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-12px) rotate(-1deg); }
  }
  @keyframes spiral-float-3 {
    0%, 100% { transform: translateY(0) rotate(6deg); }
    50% { transform: translateY(-9px) rotate(3deg); }
  }
  @keyframes spiral-float-4 {
    0%, 100% { transform: translateY(0) rotate(-7deg); }
    50% { transform: translateY(-7px) rotate(-3deg); }
  }
`; 