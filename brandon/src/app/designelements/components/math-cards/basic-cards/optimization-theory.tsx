import React from 'react';

export const OptimizationTheory = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-amber-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with gradient border */}
      <div className="relative">
        {/* Main content */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 relative overflow-hidden">
          {/* Background formulas */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "∇f(x*) = 0",
              "min f(x)",
              "s.t. g(x) ≤ 0",
              "h(x) = 0",
              "L(x,λ,μ)",
              "KKT conditions",
              "∇²f(x*) ≻ 0",
              "x* = argmin f(x)"
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
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Optimization Theory</h2>
            <p className="text-amber-100 text-xl max-w-2xl mb-8">
              Find the best solutions through mathematical programming and constraint optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};