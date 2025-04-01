import React from 'react';

export const GameTheory = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform rotate-1">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-red-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with diamond pattern border */}
      <div className="relative">
        {/* Top edge */}
        <div className="w-full h-8 overflow-hidden">
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-full w-full">
            <pattern id="diamondPatternRed" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="scale(10 1)">
              <path d="M0,0 L5,10 L10,0 Z" fill="#dc2626" />
            </pattern>
            <rect width="100" height="10" fill="url(#diamondPatternRed)" />
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-red-600 p-8 relative overflow-hidden">
          {/* Background payoff matrices */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "| 3,3 | 0,5 |",
              "| 5,0 | 1,1 |",
              "Nash Equilibrium",
              "Pareto Optimal",
              "Min-Max Strategy",
              "Zero-sum Game"
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
          
          {/* Split layout with buttons in middle */}
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-5/12">
              <div className="inline-block px-6 py-2 bg-red-700 rounded-full text-white font-bold mb-5 shadow-lg">
                STRATEGIC DECISION MAKING
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Game Theory
              </h2>
              
              <p className="text-red-100 text-xl mb-4">
                Study mathematical models of strategic interaction between rational decision-makers.
              </p>
            </div>
            
            <div className="md:w-2/12 flex flex-col items-center justify-center gap-4">
              <button className="px-6 py-4 bg-white text-red-700 rounded-xl font-bold text-lg hover:bg-red-50 transform hover:-translate-y-1 transition-all shadow-lg w-full text-center">
                Play Now
              </button>
              
              <button className="px-6 py-4 bg-red-800 text-white rounded-xl font-bold text-lg hover:bg-red-900 transform hover:-translate-y-1 transition-all shadow-lg w-full text-center">
                Learn
              </button>
            </div>
            
            <div className="md:w-5/12">
              {/* Payoff matrix visualization */}
              <div className="bg-red-700/60 backdrop-blur p-4 rounded-xl shadow-lg">
                <h3 className="text-white text-center text-lg mb-2">Prisoner's Dilemma</h3>
                <div className="grid grid-cols-3 grid-rows-3 gap-1 text-center">
                  <div className="bg-transparent"></div>
                  <div className="bg-red-800/50 p-2 text-white">Cooperate</div>
                  <div className="bg-red-800/50 p-2 text-white">Defect</div>
                  
                  <div className="bg-red-800/50 p-2 text-white">Cooperate</div>
                  <div className="bg-white/90 p-2 text-red-800">3,3</div>
                  <div className="bg-white/90 p-2 text-red-800">0,5</div>
                  
                  <div className="bg-red-800/50 p-2 text-white">Defect</div>
                  <div className="bg-white/90 p-2 text-red-800">5,0</div>
                  <div className="bg-white/90 p-2 text-red-800">1,1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom edge */}
        <div className="w-full h-8 overflow-hidden">
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-full w-full rotate-180">
            <pattern id="diamondPatternRedBottom" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="scale(10 1)">
              <path d="M0,0 L5,10 L10,0 Z" fill="#dc2626" />
            </pattern>
            <rect width="100" height="10" fill="url(#diamondPatternRedBottom)" />
          </svg>
        </div>
      </div>
    </div>
  );
};
