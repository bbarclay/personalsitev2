import React from 'react';

export const TaylorSeriesBasic = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-indigo-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with staggered steps border */}
      <div className="relative">
        {/* Stepped top */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 120 12" preserveAspectRatio="none" className="h-full w-full">
            <pattern id="stepsPattern" patternUnits="userSpaceOnUse" width="20" height="12" patternTransform="scale(6)">
              <path d="M0,12 L0,8 L5,8 L5,4 L10,4 L10,0 L20,0 L20,12 Z" fill="#4f46e5" />
            </pattern>
            <rect width="120" height="12" fill="url(#stepsPattern)" />
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-indigo-600 p-8 relative overflow-hidden">
          {/* Background calculations */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "f(x) ≈ f(a) + f'(a)(x-a) + f''(a)(x-a)²/2!...",
              "sin(x) ≈ x - x³/3! + x⁵/5! - x⁷/7!...",
              "e^x ≈ 1 + x + x²/2! + x³/3! + x⁴/4!...",
              "∫ f(x) dx ≈ f(a)(x-a) + f'(a)(x-a)²/2!...",
              "cos(x) ≈ 1 - x²/2! + x⁴/4! - x⁶/6!..."
            ].map((formula, i) => (
              <div 
                key={i} 
                className="inline-block m-3 font-mono opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.8 + Math.random() * 0.4})`,
                  fontSize: `${16 + Math.random() * 4}px`
                }}
              >
                {formula}
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-indigo-700 rounded-full text-white font-bold mb-5 shadow-lg">
              POLYNOMIAL FUNCTIONS
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Taylor Series Expansion
            </h2>
            
            <p className="text-indigo-100 text-xl max-w-2xl mb-8">
              Approximate complex functions around a point using polynomial series with increasing accuracy.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-xl hover:bg-indigo-50 transform hover:-translate-y-1 transition-all shadow-lg">
                Try Now
              </button>
              
              <div className="flex items-center text-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-xl">Advanced topic</span>
              </div>
            </div>
            
            {/* Floating equation */}
            <div className="absolute top-5 right-8 bg-indigo-800/70 backdrop-blur px-4 py-3 rounded-lg text-indigo-100 shadow-lg transform rotate-1">
              <div className="text-lg font-mono">
                f(x) ≈ Σ f(n)(a)(x-a)^n/n!
              </div>
            </div>

            {/* Animated representation of Taylor approximation */}
            <div className="absolute right-32 top-24 w-32 h-32 opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Actual function (sine wave) */}
                <path d="M0,50 C10,30 20,20 30,30 C40,40 50,70 60,60 C70,50 80,20 90,30 C100,40 110,50 120,50" 
                      stroke="white" strokeWidth="1.5" fill="none" />
                      
                {/* First order approximation */}
                <path d="M0,50 L120,50" 
                      stroke="white" strokeWidth="0.8" strokeDasharray="3,2" fill="none" />
                      
                {/* Second order approximation */}
                <path d="M0,50 Q60,80 120,50" 
                      stroke="white" strokeWidth="0.8" strokeDasharray="2,1" fill="none" />
                      
                {/* Point of expansion */}
                <circle cx="60" cy="60" r="1.5" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Stepped bottom */}
        <div className="w-full h-12 overflow-hidden">
          <svg viewBox="0 0 120 12" preserveAspectRatio="none" className="h-full w-full rotate-180">
            <pattern id="stepsPatternBottom" patternUnits="userSpaceOnUse" width="20" height="12" patternTransform="scale(6)">
              <path d="M0,12 L0,8 L5,8 L5,4 L10,4 L10,0 L20,0 L20,12 Z" fill="#4f46e5" />
            </pattern>
            <rect width="120" height="12" fill="url(#stepsPatternBottom)" />
          </svg>
        </div>
      </div>
    </div>
  );
}; 