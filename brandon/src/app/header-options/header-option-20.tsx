"use client";

import { useState } from 'react';

const HeaderOption20 = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <header className="relative bg-gray-950 mb-12 overflow-hidden">
      <div className="absolute inset-0">
        {/* Neural network background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 20px 2px rgba(147, 51, 234, 0.2)',
            }}
          >
            {/* Synaptic connections */}
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="absolute h-px bg-gradient-to-r from-purple-500/50 to-transparent"
                style={{
                  width: `${100 + Math.random() * 150}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  transformOrigin: '0 0',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-24">
          <div className="text-3xl font-black text-white">
            NEURAL<span className="text-purple-500">.AI</span>
          </div>

          <nav className="flex space-x-6">
            {["TRAIN", "PROCESS", "ANALYZE", "PREDICT"].map((item, i) => (
              <button
                key={i}
                className="group relative"
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative px-6 py-2">
                  {/* Neural activation effect */}
                  <div
                    className={`absolute inset-0 bg-purple-500/20 rounded-lg transition-opacity duration-300 ${
                      activeNode === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute inset-0 animate-pulse-fast">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="absolute w-1 h-1 rounded-full bg-purple-400"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="relative z-10 text-lg font-semibold text-purple-300 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption20;
