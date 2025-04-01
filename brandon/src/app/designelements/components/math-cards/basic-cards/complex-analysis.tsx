import React from 'react';

export const ComplexAnalysis = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
      {/* Animated glow effect */}
      <div className="absolute -inset-2 bg-cyan-500/30 rounded-lg blur-xl opacity-75 animate-pulse"></div>
      
      {/* Card with spiral border */}
      <div className="relative">
        {/* Spiral border animation */}
        <div className="absolute inset-0 -m-2">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
            <defs>
              <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Generate spiral path */}
            {Array.from({ length: 50 }).map((_, i) => {
              const angle = i * 0.2 * Math.PI;
              const radius = 150 + i * 2;
              const x = 200 + radius * Math.cos(angle);
              const y = 200 + radius * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="url(#spiralGradient)"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              );
            })}
          </svg>
        </div>

        {/* Main content */}
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-8 relative overflow-hidden rounded-2xl backdrop-blur-sm">
          {/* Dynamic background formulas */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "∮ f(z)dz = 2πi∑Res(f,ak)",
              "f'(z) = lim[h→0] (f(z+h)-f(z))/h",
              "w = u + iv",
              "∂u/∂x = ∂v/∂y",
              "z = re^(iθ)",
              "f(z) = Σ an(z-z₀)ⁿ",
              "∮γ f(z)dz = 0",
              "Res(f,a) = lim[z→a](z-a)f(z)"
            ].map((formula, i) => (
              <div 
                key={i} 
                className="inline-block m-3 font-mono opacity-80 animate-float" 
                style={{
                  transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.8 + Math.random() * 0.4})`,
                  fontSize: `${16 + Math.random() * 4}px`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                {formula}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Complex Analysis</h3>
            <div className="text-cyan-50 space-y-4">
              <p className="text-lg">
                Exploring the beautiful world of complex functions and their properties
              </p>
              <div className="flex space-x-4">
                <div className="bg-cyan-600/50 rounded-lg p-4 backdrop-blur-sm">
                  <p className="font-mono">z = x + yi</p>
                </div>
                <div className="bg-cyan-600/50 rounded-lg p-4 backdrop-blur-sm">
                  <p className="font-mono">|z| = √(x² + y²)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating complex plane visualization */}
          <div className="absolute bottom-4 right-4 w-32 h-32 opacity-50">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
              <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M 50 50 L 80 30" stroke="white" strokeWidth="1" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>

      {/* Add required keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
