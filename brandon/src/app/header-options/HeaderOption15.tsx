"use client";

import { useState } from "react";

const HeaderOption15 = () => {
  const [activeItem, setActiveItem] = useState('home');
  
  return (
    <header className="relative z-50 mb-12">
      {/* Animated background with floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.3)',
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out alternate`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-blue-900/80 p-8 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/10">
          {/* Cosmic portal center effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl animate-pulse-slow pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            {/* Animated Logo */}
            <div className="relative group">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                PORTAL
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Epic Navigation */}
            <nav className="flex items-center space-x-8">
              {["Home", "Planets", "Galaxies", "Black Holes", "Quasars"].map((item, i) => (
                <div key={i} className="relative group perspective-1000">
                  {/* Orbital ring animation */}
                  <div className="absolute inset-0 -m-2 rounded-full border-2 border-cyan-500/30 group-hover:border-cyan-400/70 transition-colors duration-500 animate-orbit"></div>
                  
                  {/* The actual button */}
                  <button 
                    onClick={() => setActiveItem(item.toLowerCase())}
                    className="relative z-10 px-6 py-3 bg-gradient-to-br from-indigo-800 to-purple-900 rounded-xl group-hover:from-indigo-600 group-hover:to-purple-700 shadow-lg shadow-purple-900/50 group-hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Glowing core */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-1 h-1 rounded-full bg-white animate-pulse-glow"></div>
                    </div>
                    
                    {/* Button text with glow effect */}
                    <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 group-hover:from-white group-hover:to-cyan-200 transition-colors duration-300 text-lg">
                      {item}
                    </span>
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption15;
