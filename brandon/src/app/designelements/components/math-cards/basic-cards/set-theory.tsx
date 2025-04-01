"use client";

import React from 'react';

export const SetTheory = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 rounded-2xl overflow-hidden">
      {/* Venn Diagram Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <defs>
            <linearGradient id="venn-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            <linearGradient id="venn-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#db2777" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#be185d" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* Venn Diagram Circles */}
          <g className="animate-venn">
            <circle 
              cx="400" 
              cy="300" 
              r="200" 
              fill="url(#venn-gradient-1)" 
              opacity="0.3"
            />
            <circle 
              cx="600" 
              cy="300" 
              r="200" 
              fill="url(#venn-gradient-2)" 
              opacity="0.3"
            />
            <circle 
              cx="500" 
              cy="300" 
              r="200" 
              fill="url(#venn-gradient-1)" 
              opacity="0.2"
            />
          </g>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="inline-block px-4 py-1 bg-rose-500/20 backdrop-blur-sm rounded-full text-rose-200 text-sm font-medium mb-4 border border-rose-500/20">
            SET THEORY
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Set Operations
          </h2>
          
          <p className="text-rose-100 text-lg max-w-2xl mb-6 leading-relaxed">
            Explore the fundamental concepts of set theory, from basic operations to advanced relationships. Understand how sets form the foundation of modern mathematics.
          </p>
        </div>
        
        {/* Bottom section */}
        <div className="flex items-end justify-between">
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-rose-500/20 backdrop-blur-sm text-rose-100 rounded-xl font-semibold hover:bg-rose-500/30 transition-all duration-300 border border-rose-500/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Set Operations
            </button>
            <button className="px-6 py-3 bg-pink-500/20 backdrop-blur-sm text-pink-100 rounded-xl font-semibold hover:bg-pink-500/30 transition-all duration-300 border border-pink-500/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Venn Diagrams
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-rose-200/80 bg-rose-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-rose-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm">Set Relationships</span>
          </div>
        </div>
        
        {/* Floating formulas */}
        <div className="absolute top-8 right-8 bg-rose-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-rose-100 border border-rose-500/20 transform rotate-2">
          <div className="text-sm font-mono">
            A ∪ B = {"{x | x ∈ A ∨ x ∈ B}"}
          </div>
        </div>
        <div className="absolute bottom-24 right-8 bg-pink-500/10 backdrop-blur-sm px-4 py-2 rounded-lg text-pink-100 border border-pink-500/20 transform -rotate-1">
          <div className="text-sm font-mono">
            A ∩ B = {"{x | x ∈ A ∧ x ∈ B}"}
          </div>
        </div>
      </div>
      
      {/* Add keyframes for Venn diagram animation */}
      <style jsx>{`
        @keyframes venn {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .animate-venn {
          animation: venn 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
