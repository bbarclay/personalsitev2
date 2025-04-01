"use client";

import { useState } from 'react';

const HeaderOption19 = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="relative z-50 mb-12">
      {/* Angular background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/40 to-fuchsia-900/40 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/5"
            style={{
              clipPath: `polygon(${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="relative p-8 overflow-hidden backdrop-blur-xl"
             style={{clipPath: "polygon(0 0, 100% 15%, 92% 100%, 8% 85%, 15% 35%)"}}>
          {/* Glowing borders */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-fuchsia-900/90 to-indigo-900/90 border border-fuchsia-500/50"
               style={{clipPath: "polygon(0 0, 100% 15%, 92% 100%, 8% 85%, 15% 35%)"}}></div>
          
          <div className="flex items-center justify-between h-24">
            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
              QUANTUM
            </div>

            <nav className="flex space-x-8">
              {["ENTANGLE", "SUPERPOSE", "COLLAPSE", "OBSERVE"].map((item, i) => (
                <button
                  key={i}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative px-6 py-2 overflow-hidden">
                    {/* Quantum uncertainty effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div
                          key={j}
                          className="absolute bg-blue-500/30 blur-sm"
                          style={{
                            width: `${Math.random() * 100}%`,
                            height: '2px',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: 'rotate(${Math.random() * 360}deg)',
                            animation: 'quantum-flicker 2s infinite',
                          }}
                        />
                      ))}
                    </div>
                    
                    <span className="relative z-10 text-lg font-bold tracking-wider text-blue-400 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>

                  {/* Probability wave */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-transform duration-300 ${
                      hoveredIndex === i ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{
                      width: '100%',
                      transform: `scaleX(${hoveredIndex === i ? 1 : 0})`,
                      transformOrigin: hoveredIndex === i ? 'left' : 'right',
                    }}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption19;
