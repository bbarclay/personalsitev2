"use client";

import React from 'react';

export const DifferentialEquations = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl overflow-hidden">
      {/* Wave Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* Multiple wave paths */}
          <path 
            d="M0,300 Q300,200 600,300 T1200,300" 
            fill="none" 
            stroke="url(#wave-gradient)" 
            strokeWidth="2"
            className="animate-wave"
          />
          <path 
            d="M0,400 Q300,300 600,400 T1200,400" 
            fill="none" 
            stroke="url(#wave-gradient)" 
            strokeWidth="2"
            className="animate-wave"
            style={{ animationDelay: '0.5s' }}
          />
          <path 
            d="M0,500 Q300,400 600,500 T1200,500" 
            fill="none" 
            stroke="url(#wave-gradient)" 
            strokeWidth="2"
            className="animate-wave"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="inline-block px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium mb-4 border border-blue-500/20">
            DIFFERENTIAL EQUATIONS
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Wave Equations
          </h2>
          
          <p className="text-blue-100 text-lg max-w-2xl mb-6 leading-relaxed">
            Explore the mathematical foundations of wave propagation and oscillation through differential equations. From simple harmonic motion to complex wave patterns.
          </p>
        </div>
        
        {/* Bottom section */}
        <div className="flex items-end justify-between">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-500/20 backdrop-blur-sm text-blue-100 rounded-xl font-semibold hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Solve Equations
            </button>
            <button className="px-6 py-3 bg-indigo-500/20 backdrop-blur-sm text-indigo-100 rounded-xl font-semibold hover:bg-indigo-500/30 transition-all duration-300 border border-indigo-500/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Visualize Solutions
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-blue-200/80 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm">Wave Propagation</span>
          </div>
        </div>
        
        {/* Floating formulas */}
        <div className="absolute top-8 right-8 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-blue-100 border border-blue-500/20 transform rotate-2">
          <div className="text-sm font-mono">
            ∂²u/∂t² = c²∇²u
          </div>
        </div>
        <div className="absolute bottom-24 right-8 bg-indigo-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-indigo-100 border border-indigo-500/20 transform -rotate-1">
          <div className="text-sm font-mono">
            d²x/dt² + ω²x = 0
          </div>
        </div>
      </div>
      
      {/* Add keyframes for wave animation */}
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-wave {
          animation: wave 10s linear infinite;
        }
      `}</style>
    </div>
  );
};
