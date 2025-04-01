"use client";

import React from 'react';

// 1. COSMIC HEADER - Space/Galaxy themed header with particle effects
export const CosmicHeader = () => {
  return (
    <header className="relative overflow-hidden min-h-[40vh] bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 5 + 2}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Nebula effect */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-500 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{animationDuration: '8s'}}></div>
      
      {/* Shooting star */}
      <div className="absolute top-1/4 left-1/4 w-0.5 h-[150px] bg-white animate-[meteor_5s_ease-in-out_infinite]" 
        style={{
          transform: 'rotate(-45deg)',
          boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.7)',
        }}>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-6 tracking-tight">
            Explore The Universe
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-8">
            Journey through the cosmic wonders of our galactic neighborhood.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transform hover:-translate-y-1 transition-all">
              Begin Journey
            </button>
            <button className="px-8 py-3 bg-transparent border border-white/30 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Planet */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 opacity-60"></div>
      <div className="absolute -bottom-28 -right-28 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-800 to-purple-900 opacity-60"></div>
    </header>
  );
};

// 2. CYBER HEADER - Digital/Tech themed with circuit patterns
export const CyberHeader = () => {
  return (
    <header className="relative overflow-hidden min-h-[40vh] bg-black">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50,0 L50,25 L75,25 L75,50 L100,50" stroke="#00ff00" strokeWidth="1" fill="none" />
            <path d="M0,50 L25,50 L25,75 L50,75 L50,100" stroke="#00ff00" strokeWidth="1" fill="none" />
            <path d="M25,0 L25,25 L0,25" stroke="#00ff00" strokeWidth="1" fill="none" />
            <path d="M75,100 L75,75 L100,75" stroke="#00ff00" strokeWidth="1" fill="none" />
            <circle cx="25" cy="25" r="3" fill="#00ff00" />
            <circle cx="50" cy="75" r="3" fill="#00ff00" />
            <circle cx="75" cy="50" r="3" fill="#00ff00" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      {/* Glowing effects */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500 rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[150px] opacity-10 animate-pulse" style={{animationDuration: '7s'}}></div>
      
      {/* Binary effect */}
      <div className="absolute inset-0 overflow-hidden select-none opacity-5">
        {Array.from({ length: 200 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-green-400 font-mono"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 12 + 8}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <div className="glitch-container mb-6" data-text="CYBERSECURITY">
            <h1 className="text-5xl md:text-7xl font-black text-white relative">
              <span className="relative after:content-[''] after:absolute after:h-[5px] after:w-full after:bg-cyan-400 after:left-0 after:-bottom-2">
                CYBERSECURITY
              </span>
            </h1>
          </div>
          <p className="text-cyan-300 text-xl mb-8 font-mono">
            &gt; Defending digital frontiers against emerging threats
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-950 rounded-sm font-mono transform transition-all relative group overflow-hidden">
              <span className="relative z-10">INITIATE_SCAN</span>
              <span className="absolute inset-0 bg-cyan-500 transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-950 rounded-sm font-mono transform transition-all">
              GET_ACCESS
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative UI elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border border-cyan-500 rounded-sm opacity-70 flex items-center justify-center">
        <div className="animate-spin w-24 h-24 border-t-2 border-cyan-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-10 left-10 w-40 h-10 border border-green-500 rounded-sm opacity-70 overflow-hidden">
        <div className="h-full bg-green-500 animate-[loading_4s_ease-in-out_infinite]" style={{width: '60%'}}></div>
      </div>
    </header>
  );
};

// 3. ORGANIC HEADER - Nature inspired with flowing elements
export const OrganicHeader = () => {
  return (
    <header className="relative overflow-hidden min-h-[40vh] bg-gradient-to-b from-emerald-900 to-teal-800">
      {/* Leaf patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60,0 Q90,30 60,60 Q30,30 60,0 Z" fill="#4ade80" />
            <path d="M30,30 Q45,60 30,90 Q15,60 30,30 Z" fill="#10b981" />
            <path d="M90,30 Q105,60 90,90 Q75,60 90,30 Z" fill="#10b981" />
            <path d="M60,60 Q90,90 60,120 Q30,90 60,60 Z" fill="#4ade80" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf)" />
        </svg>
      </div>
      
      {/* Flowing water effect */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-500/30 to-transparent">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0 C300,60 600,0 900,60 C1200,120 1500,60 1800,0 V120 H0 Z" 
            className="fill-blue-400/30 animate-[wave_15s_ease-in-out_infinite]"
          />
          <path 
            d="M0,30 C300,90 600,30 900,90 C1200,150 1500,90 1800,30 V120 H0 Z"
            className="fill-blue-300/30 animate-[wave_25s_ease-in-out_infinite]"
          />
        </svg>
      </div>
      
      {/* Floating particles (pollen/seeds) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: `${Math.random() * 10 + 10}s`,
            transform: `scale(${Math.random() * 2 + 0.5})`,
          }}
        />
      ))}
      
      {/* Sun/light source */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            Natural Harmony
          </h1>
          <p className="text-emerald-100 text-xl mb-8">
            Reconnect with the rhythms of the earth and discover the wisdom of natural systems.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transform hover:-translate-y-1 transition-all shadow-lg">
              Explore Ecosystems
            </button>
            <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all">
              Join Conservation
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-20 right-20">
        <svg width="120" height="120" viewBox="0 0 100 100" className="text-emerald-400 opacity-60">
          <path d="M50,0 Q100,50 50,100 Q0,50 50,0 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-40 left-20 transform rotate-45">
        <svg width="80" height="80" viewBox="0 0 100 100" className="text-teal-400 opacity-40">
          <path d="M50,0 Q100,50 50,100 Q0,50 50,0 Z" fill="currentColor" />
        </svg>
      </div>
    </header>
  );
};

// 4. GEOMETRIC HEADER - Abstract shapes and patterns
export const GeometricHeader = () => {
  return (
    <header className="relative overflow-hidden min-h-[40vh] bg-slate-900">
      {/* Grid background */}
      <div className="absolute inset-0 bg-slate-800 opacity-30">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100, 116, 139, 0.3)" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Animated geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500 rounded-lg opacity-20 animate-spin-slow transform rotate-45"></div>
      <div className="absolute top-1/3 right-1/3 w-60 h-60 border-4 border-pink-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-500 opacity-20 animate-bounce" style={{animationDuration: '6s'}}></div>
      <div className="absolute bottom-1/3 left-20 w-24 h-24 bg-green-500 transform rotate-45 opacity-20 animate-ping" style={{animationDuration: '7s'}}></div>
      
      {/* 3D perspective effect lines */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-10">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 mb-1">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white rounded-sm"></div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-1 ml-6">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white rounded-sm"></div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {Array(7).fill(0).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white rounded-sm"></div>
              ))}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Design Systems
          </h1>
          <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto">
            Building blocks for digital experiences. Crafting interfaces with geometric precision.
          </p>
          <div className="flex justify-center gap-4">
            <button className="relative px-8 py-3 bg-transparent border-2 border-white text-white font-medium group overflow-hidden">
              <span className="relative z-10 group-hover:text-slate-900 transition-colors">Explore System</span>
              <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
            </button>
            <button className="px-8 py-3 bg-white text-slate-900 font-medium transform hover:scale-105 transition-transform">
              Documentation
            </button>
          </div>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 border-t-4 border-l-4 border-white opacity-20"></div>
      <div className="absolute top-0 right-0 w-40 h-40 border-t-4 border-r-4 border-white opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 border-b-4 border-l-4 border-white opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 border-b-4 border-r-4 border-white opacity-20"></div>
    </header>
  );
};

// 5. ARTISTIC HEADER - Creative and artistic style
export const ArtisticHeader = () => {
  return (
    <header className="relative overflow-hidden min-h-[40vh] bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900">
      {/* Paint splatter effects */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-30 mix-blend-multiply"></div>
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl opacity-30 mix-blend-multiply"></div>
      <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl opacity-20 mix-blend-multiply"></div>
      
      {/* Brush strokes */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1000 600" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,100 Q250,180 500,100 T1000,100 V600 H0 Z" 
          fill="rgb(167, 139, 250)" 
          opacity="0.3"
        />
        <path 
          d="M0,200 Q250,280 500,200 T1000,200 V600 H0 Z" 
          fill="rgb(196, 181, 253)" 
          opacity="0.3"
        />
        <path 
          d="M0,300 Q250,380 500,300 T1000,300 V600 H0 Z" 
          fill="rgb(221, 214, 254)" 
          opacity="0.2"
        />
      </svg>
      
      {/* Creative patterns */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              border: `${Math.random() * 10 + 1}px solid rgba(255, 255, 255, 0.3)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <div className="mb-4 flex">
            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Creative <span className="italic text-pink-300">Expression</span> Through Design
          </h1>
          <p className="text-violet-200 text-xl mb-8 max-w-xl">
            Where art meets technology. Blend imagination with innovation.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium shadow-lg shadow-pink-500/30 transform hover:-translate-y-1 transition-all">
              View Gallery
            </button>
            <button className="px-8 py-3 bg-transparent border border-white/50 backdrop-blur-sm text-white rounded-md font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all">
              Our Process
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 opacity-70">
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg transform rotate-45 animate-pulse"></div>
          <div className="absolute inset-8 bg-gradient-to-tr from-indigo-400 to-purple-600 rounded-lg transform -rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* Artistic signature */}
      <div className="absolute bottom-10 right-10 opacity-70">
        <svg width="120" height="40" viewBox="0 0 120 40">
          <path d="M10,30 C20,10 30,40 40,20 C50,0 60,30 70,10 C80,25 90,5 110,20" 
            stroke="white" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </header>
  );
};

// Add global styles needed for animations
export const HeaderStyles = () => {
  return (
    <style jsx global>{`
      @keyframes wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes meteor {
        0% { transform: translateY(-100%) translateX(-100%) rotate(-45deg); opacity: 1; }
        70% { opacity: 1; }
        100% { transform: translateY(200%) translateX(200%) rotate(-45deg); opacity: 0; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  );
};
