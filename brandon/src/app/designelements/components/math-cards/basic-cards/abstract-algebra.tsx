import React from 'react';

export const AbstractAlgebra = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
      {/* Animated lattice background */}
      <div className="absolute -inset-2 bg-violet-500/30 rounded-lg blur-xl opacity-75">
        <div className="w-full h-full animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 border-2 border-violet-400/30"
              style={{
                transform: `rotate(${45 * i}deg) translate(${100 + Math.sin(i) * 50}px, ${100 + Math.cos(i) * 50}px)`,
                animation: `float-${i} 4s infinite ease-in-out`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Symmetry pattern border */}
        <div className="absolute inset-0 -m-2">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="groupPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#7c3aed" className="animate-pulse" />
                <path d="M 20 20 L 40 40" stroke="#7c3aed" strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#groupPattern)" />
          </svg>
        </div>

        {/* Main content */}
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 p-8 relative overflow-hidden rounded-2xl backdrop-blur-sm">
          {/* Dynamic group theory symbols */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "G/H ≅ K",
              "(ab)⁻¹ = b⁻¹a⁻¹",
              "Z(G) = {x ∈ G | xg = gx}",
              "φ: G → H",
              "ker(φ)",
              "G ⋊ H",
              "S₃ × C₂",
              "GL(n,ℝ)",
              "PSL(2,7)"
            ].map((symbol, i) => (
              <div 
                key={i} 
                className="inline-block m-3 font-mono opacity-80" 
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.5})`,
                  animation: `float-${i % 5} ${4 + i % 3}s infinite ease-in-out`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                {symbol}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Abstract Algebra</h3>
            <div className="text-violet-50 space-y-4">
              <p className="text-lg">
                Exploring groups, rings, and fields through symmetry
              </p>
              
              {/* Cayley table visualization */}
              <div className="grid grid-cols-3 gap-1 w-fit bg-violet-600/50 p-2 rounded-lg backdrop-blur-sm">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center border border-violet-400/30 text-sm"
                  >
                    {String.fromCharCode(97 + (i % 3))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating symmetry elements */}
          <div className="absolute top-4 right-4 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
              {Array.from({ length: 6 }).map((_, i) => (
                <polygon
                  key={i}
                  points="50,10 90,40 90,80 50,110 10,80 10,40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.3"
                  transform={`rotate(${i * 60} 50 50)`}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-5deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(3deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-3deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
