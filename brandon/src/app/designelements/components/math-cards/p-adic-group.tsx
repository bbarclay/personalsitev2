import React from 'react';

export const PAdicGroup = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      {/* Card with branching tree-like edges */}
      <div className="relative w-full max-w-4xl">
        {/* Background glow effects */}
        <div className="absolute -inset-4 bg-indigo-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        
        {/* Main card with tree-like border */}
        <div className="relative z-10">
          {/* Tree-like top */}
          <div className="w-full h-12 overflow-hidden">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="tree-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4338ca" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
              </defs>
              {/* Branching pattern for top */}
              <path 
                d="M0,48 L0,20 C0,20 50,48 100,20 C150,0 200,30 250,20 C300,10 350,30 400,20 C450,10 500,30 550,20 C600,10 650,30 700,20 C750,10 800,30 850,20 C900,10 950,30 1000,20 C1050,10 1100,30 1150,20 C1175,15 1200,20 1200,20 L1200,48 Z" 
                fill="url(#tree-gradient)"
              />
            </svg>
          </div>
          
          {/* Main content */}
          <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 p-8 relative overflow-hidden">
            {/* p-adic tree visualization */}
            <div className="absolute inset-0 opacity-15">
              <svg viewBox="0 0 800 600" className="w-full h-full">
                {/* Trunk */}
                <line x1="400" y1="600" x2="400" y2="500" stroke="white" strokeWidth="3" />
                
                {/* First branching level */}
                <line x1="400" y1="500" x2="300" y2="450" stroke="white" strokeWidth="2.5" />
                <line x1="400" y1="500" x2="500" y2="450" stroke="white" strokeWidth="2.5" />
                
                {/* Second branching level */}
                <line x1="300" y1="450" x2="250" y2="400" stroke="white" strokeWidth="2" />
                <line x1="300" y1="450" x2="350" y2="400" stroke="white" strokeWidth="2" />
                <line x1="500" y1="450" x2="450" y2="400" stroke="white" strokeWidth="2" />
                <line x1="500" y1="450" x2="550" y2="400" stroke="white" strokeWidth="2" />
                
                {/* Third branching level */}
                <line x1="250" y1="400" x2="225" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="250" y1="400" x2="275" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="350" y1="400" x2="325" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="350" y1="400" x2="375" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="450" y1="400" x2="425" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="450" y1="400" x2="475" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="550" y1="400" x2="525" y2="350" stroke="white" strokeWidth="1.5" />
                <line x1="550" y1="400" x2="575" y2="350" stroke="white" strokeWidth="1.5" />
                
                {/* Fourth branching level (partial, for performance) */}
                <line x1="225" y1="350" x2="212" y2="300" stroke="white" strokeWidth="1" />
                <line x1="225" y1="350" x2="238" y2="300" stroke="white" strokeWidth="1" />
                <line x1="275" y1="350" x2="262" y2="300" stroke="white" strokeWidth="1" />
                <line x1="275" y1="350" x2="288" y2="300" stroke="white" strokeWidth="1" />
                
                <line x1="525" y1="350" x2="512" y2="300" stroke="white" strokeWidth="1" />
                <line x1="525" y1="350" x2="538" y2="300" stroke="white" strokeWidth="1" />
                <line x1="575" y1="350" x2="562" y2="300" stroke="white" strokeWidth="1" />
                <line x1="575" y1="350" x2="588" y2="300" stroke="white" strokeWidth="1" />
                
                {/* Nodes */}
                <circle cx="400" cy="500" r="6" fill="white" />
                
                <circle cx="300" cy="450" r="5" fill="white" />
                <circle cx="500" cy="450" r="5" fill="white" />
                
                <circle cx="250" cy="400" r="4" fill="white" />
                <circle cx="350" cy="400" r="4" fill="white" />
                <circle cx="450" cy="400" r="4" fill="white" />
                <circle cx="550" cy="400" r="4" fill="white" />
                
                <circle cx="225" cy="350" r="3" fill="white" />
                <circle cx="275" cy="350" r="3" fill="white" />
                <circle cx="325" cy="350" r="3" fill="white" />
                <circle cx="375" cy="350" r="3" fill="white" />
                <circle cx="425" cy="350" r="3" fill="white" />
                <circle cx="475" cy="350" r="3" fill="white" />
                <circle cx="525" cy="350" r="3" fill="white" />
                <circle cx="575" cy="350" r="3" fill="white" />
                
                <circle cx="212" cy="300" r="2" fill="white" />
                <circle cx="238" cy="300" r="2" fill="white" />
                <circle cx="262" cy="300" r="2" fill="white" />
                <circle cx="288" cy="300" r="2" fill="white" />
                <circle cx="512" cy="300" r="2" fill="white" />
                <circle cx="538" cy="300" r="2" fill="white" />
                <circle cx="562" cy="300" r="2" fill="white" />
                <circle cx="588" cy="300" r="2" fill="white" />
              </svg>
            </div>
            
            {/* p-adic digits background pattern */}
            <div className="absolute inset-0 opacity-5 text-white overflow-hidden select-none">
              {["...3201", "...0122", "...1021", "...2110", "2", "3", "5", "7", "ℚₚ", "ℤₚ", "||·||ₚ"].map((symbol, i) => (
                <div key={i} className="inline-block mx-3 my-2 text-2xl opacity-80" style={{transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.8 + Math.random() * 0.5})`}}>
                  {symbol}
                </div>
              ))}
            </div>
            
            {/* Content wrapper */}
            <div className="relative z-10">
              <div className="inline-block px-6 py-2 bg-indigo-900 rounded-full text-white font-bold mb-5 shadow-lg">
                ABSTRACT ALGEBRA
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                p-Adic Number Groups
              </h2>
              
              <p className="text-indigo-100 text-xl max-w-2xl mb-8">
                Explore the fascinating world of p-adic numbers where distance gets smaller as you divide by p repeatedly, creating a completely different notion of proximity.
              </p>
              
              <div className="flex items-center gap-6">
                <button className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-xl hover:bg-indigo-50 transform hover:-translate-y-1 transition-all shadow-lg">
                  Discover
                </button>
                
                <div className="flex items-center text-indigo-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <span className="text-xl">Non-Archimedean</span>
                </div>
              </div>
              
              {/* Floating formula examples */}
              <div className="absolute top-6 right-10 bg-indigo-900/50 backdrop-blur px-4 py-2 rounded-lg text-indigo-100 transform rotate-2 animate-bounce shadow-lg" style={{animationDuration: '6s'}}>
                |x|ₚ = p⁻ᵛₚ⁽ˣ⁾
              </div>
              <div className="absolute bottom-10 right-12 bg-purple-900/50 backdrop-blur px-4 py-2 rounded-lg text-indigo-100 transform -rotate-2 animate-bounce shadow-lg" style={{animationDuration: '7s', animationDelay: '0.5s'}}>
                ∑ aₙp^n, 0 ≤ aₙ &lt; p
              </div>
            </div>
          </div>
          
          {/* Tree-like bottom */}
          <div className="w-full h-12 overflow-hidden rotate-180">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="tree-gradient-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4338ca" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
              </defs>
              {/* Branching pattern for bottom (inverted) */}
              <path 
                d="M0,48 L0,20 C0,20 50,48 100,20 C150,0 200,30 250,20 C300,10 350,30 400,20 C450,10 500,30 550,20 C600,10 650,30 700,20 C750,10 800,30 850,20 C900,10 950,30 1000,20 C1050,10 1100,30 1150,20 C1175,15 1200,20 1200,20 L1200,48 Z" 
                fill="url(#tree-gradient-bottom)"
              />
            </svg>
          </div>
          
          {/* Left tree-like edge */}
          <div className="absolute left-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
            <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="tree-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4338ca" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              {/* Branching pattern for left side */}
              <path 
                d="M32,0 C20,50 0,100 10,150 C20,200 5,250 15,300 C25,350 0,400 10,450 C20,500 0,550 10,600 L0,600 L0,0 Z" 
                fill="url(#tree-gradient-left)"
              />
            </svg>
          </div>
          
          {/* Right tree-like edge */}
          <div className="absolute right-0 top-12 h-calc(100%-24px) w-8 overflow-hidden" style={{ height: 'calc(100% - 24px)' }}>
            <svg viewBox="0 0 32 600" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="tree-gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
              </defs>
              {/* Branching pattern for right side */}
              <path 
                d="M0,0 C12,50 32,100 22,150 C12,200 27,250 17,300 C7,350 32,400 22,450 C12,500 32,550 22,600 L32,600 L32,0 Z" 
                fill="url(#tree-gradient-right)"
              />
            </svg>
          </div>
        </div>
        
        {/* Extra decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-80 animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute -top-8 left-24 w-12 h-12 bg-gradient-to-br from-violet-400 to-indigo-600 rounded-full transform animate-bounce" style={{animationDuration: '5s'}}></div>
        
        {/* Branch decorations */}
        <div className="absolute top-1/3 -right-8 w-2 h-20 bg-indigo-400 transform -rotate-45 animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 -left-8 w-2 h-20 bg-violet-400 transform rotate-45 animate-ping" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
};
