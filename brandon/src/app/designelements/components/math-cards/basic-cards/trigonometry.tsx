import React from 'react';

export const Trigonometry = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with wave border */}
      <div className="relative">
        {/* Main content */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 relative overflow-hidden rounded-2xl">
          {/* Background formulas */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "sin²θ + cos²θ = 1",
              "sin(α+β) = sinα·cosβ + cosα·sinβ",
              "tan θ = sin θ / cos θ",
              "cos(2θ) = cos²θ - sin²θ",
              "A = (1/2)·a·b·sinC",
              "a² = b² + c² - 2bc·cosA"
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
          
          {/* Content with buttons at bottom */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-orange-600 rounded-full text-white font-bold mb-5 shadow-lg">
              ANGLES & TRIANGLES
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Trigonometry Explorer
            </h2>
            
            <p className="text-orange-100 text-xl max-w-2xl mb-8">
              Master the relationships between angles and sides of triangles and explore periodic functions.
            </p>
            
            {/* Unit circle visualization */}
            <div className="relative h-64 w-64 mx-auto mb-8 opacity-75">
              <div className="absolute inset-0 rounded-full border-2 border-white"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-40"></div>
              <div className="absolute bottom-0 top-0 left-1/2 w-0.5 bg-white opacity-40"></div>
              
              {/* Angle line */}
              <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-orange-300 origin-left rotate-45"></div>
              
              {/* Sin and Cos projections */}
              <div className="absolute top-1/2 left-1/2 h-16 w-0.5 bg-orange-200 transform -translate-y-1/2 -translate-x-1/2" style={{left: 'calc(50% + 17px)'}}>
                <div className="text-orange-200 absolute top-0 -translate-y-6 left-1/2 -translate-x-1/2">sin θ</div>
              </div>
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-orange-200 transform -translate-y-1/2 -translate-x-1/2" style={{top: 'calc(50% + 17px)'}}>
                <div className="text-orange-200 absolute -bottom-6 left-1/2 -translate-x-1/2">cos θ</div>
              </div>
              
              {/* Angle label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-4 -translate-y-6 text-white text-lg">θ</div>
              
              {/* Point on circle */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 translate-x-[17px] translate-y-[-17px]"></div>
            </div>
            
            {/* Buttons at bottom */}
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-xl hover:bg-orange-50 transform hover:-translate-y-1 transition-all shadow-lg">
                Try Interactive Tool
              </button>
              
              <div className="flex items-center text-orange-100 bg-orange-700/50 backdrop-blur-sm px-5 py-4 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xl">Wave patterns</span>
              </div>
            </div>
            
            {/* Floating formula */}
            <div className="absolute top-5 right-6 bg-orange-700/70 backdrop-blur px-4 py-3 rounded-lg text-orange-100 shadow-lg transform rotate-2">
              <div className="text-lg font-mono">
                sin²(θ) + cos²(θ) = 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
