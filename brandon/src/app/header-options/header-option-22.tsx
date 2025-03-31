"use client";

import { useState } from 'react';

const HeaderOption22 = () => {
  const [activeElement, setActiveElement] = useState<number | null>(null);

  return (
    <header className="relative bg-black mb-12 overflow-hidden">
      {/* Mystical atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#4c1d95,#000)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-24">
          <div className="relative group">
            <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500">
              ARCANE
            </span>
            {/* Magical runes */}
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500"></div>
          </div>

          <nav className="flex space-x-8">
            {["TRANSMUTE", "CONJURE", "ENCHANT", "INVOKE"].map((item, i) => (
              <button
                key={i}
                className="group relative"
                onMouseEnter={() => setActiveElement(i)}
                onMouseLeave={() => setActiveElement(null)}
              >
                <div className="relative px-6 py-2 overflow-hidden">
                  {/* Magical energy effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div
                        key={j}
                        className="absolute w-1 h-1 rounded-full bg-purple-400"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animation: `float-particle ${2 + Math.random() * 2}s infinite`,
                        }}
                      />
                    ))}
                  </div>

                  <span className="relative z-10 text-lg font-semibold tracking-wider text-purple-300 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>

                {/* Magical glyph underline */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 transition-transform duration-500 ${
                    activeElement === i ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{
                    width: '100%',
                    transformOrigin: 'left',
                  }}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption22;
