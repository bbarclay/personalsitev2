"use client";

import React from 'react';

export const LinearAlgebra = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 rounded-2xl overflow-hidden">
      {/* Matrix Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <defs>
            <pattern id="matrix-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
                className="text-cyan-500/50"
              />
              <text 
                x="20" 
                y="25" 
                textAnchor="middle" 
                className="text-cyan-500/30 text-sm font-mono"
              >
                {Math.floor(Math.random() * 2)}
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-grid)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="inline-block px-4 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full text-cyan-200 text-sm font-medium mb-4 border border-cyan-500/20">
            LINEAR ALGEBRA
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Matrix Operations
          </h2>
          
          <p className="text-cyan-100 text-lg max-w-2xl mb-6 leading-relaxed">
            Master the fundamentals of linear algebra through matrix operations, vector spaces, and transformations. From basic arithmetic to advanced eigenvalue computations.
          </p>
        </div>
        
        {/* Bottom section */}
        <div className="flex items-end justify-between">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-cyan-500/20 backdrop-blur-sm text-cyan-100 rounded-xl font-semibold hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-500/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Matrix Operations
            </button>
            <button className="px-6 py-3 bg-blue-500/20 backdrop-blur-sm text-blue-100 rounded-xl font-semibold hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Eigenvalues
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-cyan-200/80 bg-cyan-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm">Vector Spaces</span>
          </div>
        </div>
        
        {/* Floating formulas */}
        <div className="absolute top-8 right-8 bg-cyan-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-cyan-100 border border-cyan-500/20 transform rotate-2">
          <div className="text-sm font-mono">
            Ax = λx
          </div>
        </div>
        <div className="absolute bottom-24 right-8 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-blue-100 border border-blue-500/20 transform -rotate-1">
          <div className="text-sm font-mono">
            det(A - λI) = 0
          </div>
        </div>
      </div>
      
      {/* Add keyframes for matrix animation */}
      <style jsx>{`
        @keyframes matrix-shift {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        
        #matrix-grid {
          animation: matrix-shift 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
