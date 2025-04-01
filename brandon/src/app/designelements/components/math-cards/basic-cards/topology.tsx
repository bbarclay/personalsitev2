import React from 'react';

export const Topology = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform -rotate-1">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with continuous curve border */}
      <div className="relative">
        {/* Top curved edge */}
        <div className="w-full h-16 overflow-hidden">
          <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,40 C50,0 150,80 250,0 C350,80 450,0 500,40 L500,40 L0,40 Z"
              fill="#a855f7"
            />
          </svg>
        </div>
        
        {/* Main content */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 relative overflow-hidden">
          {/* Background topological figures */}
          <div className="absolute inset-0 opacity-10 text-white overflow-hidden select-none">
            {[
              "H₁(X) = Ker(∂₁)/Im(∂₂)",
              "f: X → Y",
              "χ(S) = 2 - 2g",
              "X ≃ Y",
              "π₁(S¹) = ℤ",
              "X × Y",
              "Hausdorff space",
              "Genus g",
              "Betti numbers",
              "Manifold"
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
          
          {/* Top buttons */}
          <div className="relative z-10">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="inline-block px-6 py-2 bg-purple-700 rounded-full text-white font-bold shadow-lg">
                SPACES & TRANSFORMATIONS
              </div>
              
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-50 transform hover:-translate-y-1 transition-all shadow-lg">
                  Explore Spaces
                </button>
                
                <button className="px-6 py-3 bg-purple-800 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transform hover:-translate-y-1 transition-all shadow-lg">
                  Homeomorphisms
                </button>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Topology
            </h2>
            
            <p className="text-purple-100 text-xl max-w-2xl mb-8">
              Study mathematical spaces and properties preserved under continuous deformations like stretching and bending.
            </p>
            
            {/* Topological shapes */}
            <div className="grid grid-cols-3 gap-6 mb-4">
              {/* Sphere */}
              <div className="bg-purple-700/40 backdrop-blur rounded-xl p-4 text-center">
                <div className="w-20 h-20 mx-auto bg-purple-300/50 rounded-full border-2 border-purple-200/70 flex items-center justify-center text-purple-100 text-sm">
                  Genus = 0
                </div>
                <p className="text-purple-100 mt-2">Sphere</p>
              </div>
              
              {/* Torus */}
              <div className="bg-purple-700/40 backdrop-blur rounded-xl p-4 text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <div className="absolute inset-0 bg-purple-300/50 rounded-full border-2 border-purple-200/70"></div>
                  <div className="absolute inset-2 bg-purple-700/40 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-purple-100 text-sm">
                    Genus = 1
                  </div>
                </div>
                <p className="text-purple-100 mt-2">Torus</p>
              </div>
              
              {/* Möbius strip */}
              <div className="bg-purple-700/40 backdrop-blur rounded-xl p-4 text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M30,60 C10,70 10,30 30,40 C50,50 70,20 90,30 C70,40 50,70 30,60 Z" fill="none" stroke="#e9d5ff" strokeWidth="2" />
                    <path d="M30,60 C50,50 70,20 90,30" fill="none" stroke="#e9d5ff" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-purple-100 text-sm">
                    Non-orientable
                  </div>
                </div>
                <p className="text-purple-100 mt-2">Möbius Strip</p>
              </div>
            </div>
            
            {/* Feature button */}
            <div className="flex items-center text-purple-100 w-fit bg-purple-700/50 backdrop-blur px-5 py-3 rounded-xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xl">Beyond Euclidean geometry</span>
            </div>
            
            {/* Floating Euler characteristic formula */}
            <div className="absolute top-20 right-8 bg-purple-800/70 backdrop-blur px-4 py-3 rounded-lg text-purple-100 shadow-lg transform rotate-3">
              <div className="text-lg font-mono">
                χ = V - E + F
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom curved edge */}
        <div className="w-full h-16 overflow-hidden">
          <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="h-full w-full rotate-180">
            <path
              d="M0,40 C50,0 150,80 250,0 C350,80 450,0 500,40 L500,40 L0,40 Z"
              fill="#a855f7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
