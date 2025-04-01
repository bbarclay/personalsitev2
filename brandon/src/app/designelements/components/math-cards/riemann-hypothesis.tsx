"use client";

import React from 'react';

export const RiemannHypothesis = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      {/* Card with wave edges */}
      <div className="relative w-full max-w-4xl">
        {/* Background glow effects */}
        <div className="absolute -inset-4 bg-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        
        {/* Main card with wavy border */}
        <div className="relative z-10">
          {/* Wavy top */}
          <div className="w-full h-10 overflow-hidden">
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M0,0 C50,20 150,40 200,20 C250,0 350,0 400,20 C450,40 550,40 600,20 C650,0 750,0 800,20 C850,40 950,40 1000,20 C1050,0 1150,0 1200,20 L1200,40 L0,40 Z" 
                fill="#7e22ce"
              />
            </svg>
          </div>
          
          {/* Main content */}
          <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 p-8 relative overflow-hidden">
            {/* Complex plane visualization */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 800 600" className="w-full h-full">
                {/* Coordinate axes */}
                <line x1="400" y1="0" x2="400" y2="600" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Critical line */}
                <line x1="500" y1="0" x2="500" y2="600" stroke="white" strokeWidth="2" />
                
                {/* Zeta zeros */}
                <circle cx="500" cy="150" r="4" fill="white" />
                <circle cx="500" cy="210" r="4" fill="white" />
                <circle cx="500" cy="270" r="4" fill="white" />
                <circle cx="500" cy="330" r="4" fill="white" />
                <circle cx="500" cy="390" r="4" fill="white" />
                <circle cx="500" cy="450" r="4" fill="white" />
                
                {/* Wave patterns */}
                <path d="M100,300 C150,250 250,350 300,300 C350,250 450,350 500,300 C550,250 650,350 700,300" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M100,330 C150,280 250,380 300,330 C350,280 450,380 500,330 C550,280 650,380 700,330" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
                <path d="M100,270 C150,220 250,320 300,270 C350,220 450,320 500,270 C550,220 650,320 700,270" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
              </svg>
            </div>
            
            {/* Decorative prime number pattern */}
            <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
              {[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].map((num, i) => (
                <div key={i} className="inline-block m-2 opacity-80" style={{transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.7 + Math.random() * 0.6})`, fontSize: `${num % 10 + 10}px`}}>
                  {num}
                </div>
              ))}
            </div>
            
            {/* Content wrapper */}
            <div className="relative z-10">
              <div className="inline-block px-6 py-2 bg-purple-900 rounded-full text-white font-bold mb-5 shadow-lg">
                MILLION DOLLAR PROBLEM
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                Riemann Hypothesis
              </h2>
              
              <p className="text-purple-100 text-xl max-w-2xl mb-8">
                Discover the most important unsolved problem in mathematics: All non-trivial zeros of the Riemann zeta function have a real part equal to 1/2.
              </p>
              
              <div className="flex items-center gap-6">
                <button className="px-8 py-4 bg-white text-purple-800 rounded-xl font-bold text-xl hover:bg-purple-50 transform hover:-translate-y-1 transition-all shadow-lg">
                  Explore
                </button>
                
                <div className="flex items-center text-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xl">Clay Institute Prize</span>
                </div>
              </div>
              
              {/* Floating formula examples */}
              <div className="absolute top-6 right-10 bg-purple-900/50 backdrop-blur px-4 py-2 rounded-lg text-purple-100 transform rotate-3 animate-bounce shadow-lg" style={{animationDuration: '6s'}}>
                ζ(s) = ∑ 1/n^s
              </div>
              <div className="absolute bottom-12 right-16 bg-indigo-900/50 backdrop-blur px-4 py-2 rounded-lg text-purple-100 transform -rotate-2 animate-bounce shadow-lg" style={{animationDuration: '8s', animationDelay: '1s'}}>
                s = 1/2 + it
              </div>
            </div>
          </div>
          
          {/* Wavy bottom */}
          <div className="w-full h-10 overflow-hidden rotate-180">
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M0,0 C50,20 150,40 200,20 C250,0 350,0 400,20 C450,40 550,40 600,20 C650,0 750,0 800,20 C850,40 950,40 1000,20 C1050,0 1150,0 1200,20 L1200,40 L0,40 Z" 
                fill="#7e22ce"
              />
            </svg>
          </div>
          
          {/* Left undulating edge */}
          <div className="absolute left-0 top-10 h-calc(100%-20px) w-10 overflow-hidden" style={{ height: 'calc(100% - 20px)' }}>
            <svg viewBox="0 0 40 600" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M40,0 C20,50 0,100 20,150 C40,200 40,250 20,300 C0,350 0,400 20,450 C40,500 40,550 20,600 L0,600 L0,0 Z" 
                fill="#7e22ce"
              />
            </svg>
          </div>
          
          {/* Right undulating edge */}
          <div className="absolute right-0 top-10 h-calc(100%-20px) w-10 overflow-hidden" style={{ height: 'calc(100% - 20px)' }}>
            <svg viewBox="0 0 40 600" preserveAspectRatio="none" className="h-full w-full">
              <path 
                d="M0,0 C20,50 40,100 20,150 C0,200 0,250 20,300 C40,350 40,400 20,450 C0,500 0,550 20,600 L40,600 L40,0 Z" 
                fill="#7e22ce"
              />
            </svg>
          </div>
        </div>
        
        {/* Extra decorative elements */}
        <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full opacity-80 blur-sm animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute -top-6 right-24 w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full transform animate-bounce" style={{animationDuration: '5s', opacity: '0.8'}}></div>
        <div className="absolute top-1/3 -right-10 w-8 h-8 border-4 border-purple-400 rounded-full transform rotate-45 animate-ping" style={{animationDuration: '4s', opacity: '0.5'}}></div>
      </div>
    </div>
  );
};
