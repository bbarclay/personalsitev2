import React from 'react';

export const CollatzConjecture = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      {/* Card with fractal-like edges */}
      <div className="relative w-full max-w-4xl">
        {/* Background glow effects */}
        <div className="absolute -inset-4 bg-orange-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
        
        {/* Main card with fractal border */}
        <div className="relative z-10">
          {/* Triangular top */}
          <div className="w-full h-12 overflow-hidden">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M0,48 L100,0 L200,48 L300,0 L400,48 L500,0 L600,48 L700,0 L800,48 L900,0 L1000,48 L1100,0 L1200,48 L1200,48 L0,48 Z" 
                fill="#ea580c"
              />
            </svg>
          </div>
          
          {/* Main content */}
          <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 relative overflow-hidden">
            {/* Decorative numbers showing the Collatz sequence */}
            <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
              {[27, 82, 41, 124, 62, 31, 94, 47, 142, 71, 214, 107, 322, 161, 484, 242, 121, 364, 182, 91, 274, 137, 412, 206, 103, 310, 155, 466, 233, 700, 350, 175, 526, 263, 790, 395, 1186, 593, 1780, 890, 445, 1336, 668, 334, 167, 502, 251, 754, 377, 1132, 566, 283, 850, 425, 1276, 638, 319, 958, 479, 1438, 719, 2158, 1079, 3238, 1619, 4858, 2429, 7288, 3644, 1822, 911, 2734, 1367, 4102, 2051, 6154, 3077, 9232, 4616, 2308, 1154, 577, 1732, 866, 433, 1300, 650, 325, 976, 488, 244, 122, 61, 184, 92, 46, 23, 70, 35, 106, 53, 160, 80, 40, 20, 10, 5, 16, 8, 4, 2, 1, 4, 2, 1].map((num, i) => (
                <div key={i} className="inline-block mx-1 my-1 opacity-80" style={{transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.5})`}}>
                  {num}
                </div>
              ))}
            </div>
            
            {/* Branching paths visualization (Collatz tree) */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 800 600" className="w-full h-full">
                {/* Simplified Collatz tree visualization */}
                <path d="M400,50 L300,150 L250,250 L200,350 L150,450" stroke="white" strokeWidth="2" fill="none" />
                <path d="M400,50 L500,150 L550,250 L600,350 L650,450" stroke="white" strokeWidth="2" fill="none" />
                <path d="M300,150 L350,250 L400,350 L450,450" stroke="white" strokeWidth="2" fill="none" />
                <path d="M250,250 L275,350 L300,450" stroke="white" strokeWidth="2" fill="none" />
                <path d="M500,150 L450,250 L400,350" stroke="white" strokeWidth="2" fill="none" />
                <path d="M550,250 L525,350 L500,450" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            
            {/* Content wrapper */}
            <div className="relative z-10">
              <div className="inline-block px-6 py-2 bg-orange-800 rounded-full text-white font-bold mb-5 shadow-lg">
                MATHEMATICAL MYSTERY
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                Collatz Conjecture
              </h2>
              
              <p className="text-orange-100 text-xl max-w-2xl mb-8">
                Explore the famous unsolved problem: start with any positive integer, if even divide by 2, if odd multiply by 3 and add 1. Does this sequence always reach 1?
              </p>
              
              <div className="flex items-center gap-6">
                <button className="px-8 py-4 bg-white text-orange-700 rounded-xl font-bold text-xl hover:bg-orange-50 transform hover:-translate-y-1 transition-all shadow-lg">
                  Investigate
                </button>
                
                <div className="flex items-center text-orange-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xl">3n+1 Problem</span>
                </div>
              </div>
              
              {/* Floating formula examples */}
              <div className="absolute top-8 right-12 bg-orange-800/50 backdrop-blur px-4 py-2 rounded-lg text-orange-100 transform rotate-6 animate-bounce shadow-lg" style={{animationDuration: '5s'}}>
                n → n/2 (n even)
              </div>
              <div className="absolute bottom-16 right-20 bg-red-900/50 backdrop-blur px-4 py-2 rounded-lg text-orange-100 transform -rotate-3 animate-bounce shadow-lg" style={{animationDuration: '7s', animationDelay: '0.5s'}}>
                n → 3n+1 (n odd)
              </div>
            </div>
          </div>
          
          {/* Triangular bottom */}
          <div className="w-full h-12 overflow-hidden">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full rotate-180">
              <path 
                d="M0,48 L100,0 L200,48 L300,0 L400,48 L500,0 L600,48 L700,0 L800,48 L900,0 L1000,48 L1100,0 L1200,48 L1200,48 L0,48 Z" 
                fill="#ea580c"
              />
            </svg>
          </div>
          
          {/* Left decorative edge */}
          <div className="absolute left-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
            <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M32,0 C24,50 8,100 32,150 C24,200 8,250 32,300 C24,350 8,400 32,450 C24,500 8,550 32,600 L0,600 L0,0 Z" 
                fill="#ea580c"
              />
            </svg>
          </div>
          
          {/* Right decorative edge */}
          <div className="absolute right-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
            <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M0,0 C8,50 24,100 0,150 C8,200 24,250 0,300 C8,350 24,400 0,450 C8,500 24,550 0,600 L32,600 L32,0 Z" 
                fill="#ea580c"
              />
            </svg>
          </div>
        </div>
        
        {/* Extra decorative elements */}
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg transform rotate-45 animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute -top-5 right-24 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full transform animate-bounce" style={{animationDuration: '3.5s'}}></div>
        <div className="absolute top-24 -left-8 w-10 h-10 border-4 border-orange-400 rounded-full transform animate-spin" style={{animationDuration: '12s'}}></div>
      </div>
    </div>
  );
};