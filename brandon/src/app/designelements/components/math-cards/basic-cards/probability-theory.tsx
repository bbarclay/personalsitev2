import React from 'react';

export const ProbabilityTheory = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform -rotate-1">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-emerald-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with dotted border */}
      <div className="relative border-4 border-dotted border-emerald-500 rounded-2xl">
        {/* Main content */}
        <div className="bg-emerald-600 p-8 relative overflow-hidden rounded-xl">
          {/* Background probability symbols */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "P(A∩B) = P(A)P(B|A)",
              "P(A∪B) = P(A) + P(B) - P(A∩B)",
              "E[X] = ∑x·P(X=x)",
              "Var(X) = E[(X-μ)²]",
              "f(x) = (1/σ√2π)e^(-(x-μ)²/2σ²)",
              "P(A|B) = P(A∩B)/P(B)"
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
          
          {/* Top-right buttons */}
          <div className="relative z-10">
            <div className="flex justify-end mb-4">
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-emerald-700 rounded-xl font-bold text-lg hover:bg-emerald-50 transform hover:-translate-y-1 transition-all shadow-lg">
                  Try Simulation
                </button>
                
                <div className="flex items-center text-emerald-100 bg-emerald-700/50 backdrop-blur px-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-lg">Statistics view</span>
                </div>
              </div>
            </div>
            
            <div className="inline-block px-6 py-2 bg-emerald-700 rounded-full text-white font-bold mb-5 shadow-lg">
              UNCERTAINTY & CHANCE
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Probability Theory
            </h2>
            
            <p className="text-emerald-100 text-xl max-w-2xl mb-8">
              Explore random phenomena through mathematical frameworks, from basic coin flips to complex Bayesian networks.
            </p>
            
            {/* Dice and card visualization */}
            <div className="absolute right-8 bottom-8 opacity-60">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg transform rotate-12 flex items-center justify-center text-4xl font-bold text-emerald-600">
                  4
                </div>
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg absolute -top-6 -left-6 transform -rotate-6 flex items-center justify-center text-4xl font-bold text-emerald-600">
                  6
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-16 bg-white rounded-lg shadow-lg transform rotate-45">
                  <div className="absolute inset-1 rounded-sm bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 text-2xl">A♠</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Probability distribution curve */}
            <div className="absolute left-8 top-1/2 opacity-40">
              <svg width="120" height="80" viewBox="0 0 120 80">
                <path d="M10,70 C30,70 40,10 60,10 C80,10 90,70 110,70" fill="none" stroke="white" strokeWidth="2" />
                <line x1="10" y1="70" x2="110" y2="70" stroke="white" strokeWidth="1" />
                <line x1="60" y1="10" x2="60" y2="70" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
