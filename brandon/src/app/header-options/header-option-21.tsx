"use client";

import { useState } from 'react';

const HeaderOption21 = () => {
  const [activePart, setActivePart] = useState<number | null>(null);

  return (
    <header className="relative bg-zinc-900 mb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e40af,#000)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-24">
          <div className="relative">
            <span className="text-3xl font-black text-cyan-400">
              CYBER
              <span className="text-white">TECH</span>
            </span>
            {/* Circuit traces */}
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-cyan-400/50">
              <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>
          </div>

          <nav className="flex space-x-1">
            {["UPGRADE", "ENHANCE", "AUGMENT", "OPTIMIZE"].map((item, i) => (
              <div key={i} className="relative group">
                <button
                  className="relative px-6 py-2"
                  onMouseEnter={() => setActivePart(i)}
                  onMouseLeave={() => setActivePart(null)}
                >
                  {/* Holographic display */}
                  <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/30 rounded-sm overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div
                          key={j}
                          className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                          style={{
                            top: `${j * 50}%`,
                            transitionDelay: `${j * 200}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="relative z-10 text-lg font-mono tracking-wider text-cyan-400 group-hover:text-white transition-colors">
                    {item}
                  </span>

                  {/* Data stream effect */}
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-400 group-hover:animate-pulse"></div>
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-400 group-hover:animate-pulse"></div>
                </button>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption21;
