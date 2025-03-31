import React from 'react';

export const MandelbrotSet = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto transform rotate-1">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-teal-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Card with fractal border */}
      <div className="relative">
        {/* Main content with clipped corners */}
        <div 
          className="bg-teal-600 p-8 relative overflow-hidden"
          style={{
            clipPath: "polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px))"
          }}
        >
          {/* Background with fractal patterns */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
              {/* Simplified Mandelbrot Set outline */}
              <path
                d="M400,100 C250,100 200,250 250,400 C270,500 350,520 400,450 C450,520 530,500 550,400 C600,250 550,100 400,100 Z"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.3"
              />
              
              {/* Julia set-like curves */}
              <path
                d="M200,300 C250,200 350,250 400,200 C450,250 550,200 600,300 C550,400 450,350 400,400 C350,350 250,400 200,300 Z"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.2"
              />
              
              {/* Fractal spiral */}
              <path
                d="M400,300 L430,270 L420,240 L390,230 L370,250 L380,280 L410,290 L430,270"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.4"
              />
              
              {/* Self-similarity nodes */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const distance = 100 + (i % 3) * 40;
                const x = 400 + distance * Math.cos(angle);
                const y = 300 + distance * Math.sin(angle);
                return (
                  <circle 
                    key={i}
                    cx={x}
                    cy={y}
                    r={5 - (i % 3)}
                    fill="white"
                    opacity={0.2 + (i % 3) * 0.1}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-teal-700 rounded-full text-white font-bold mb-5 shadow-lg">
              COMPLEX ANALYSIS
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Mandelbrot Set Explorer
            </h2>
            
            <p className="text-teal-100 text-xl max-w-2xl mb-8">
              Visualize and explore the fascinating world of fractal mathematics and chaos theory.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="px-8 py-4 bg-white text-teal-700 rounded-xl font-bold text-xl hover:bg-teal-50 transform hover:-translate-y-1 transition-all shadow-lg">
                Try Now
              </button>
              
              <div className="flex items-center text-teal-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xl">Endless exploration</span>
              </div>
            </div>
            
            {/* Floating equation */}
            <div className="absolute top-6 right-8 bg-teal-800/60 backdrop-blur px-4 py-3 rounded-lg text-teal-100 shadow-lg transform rotate-2">
              <div className="text-lg font-mono">
                z(n+1) = z(n)² + c
              </div>
            </div>
            
            {/* Mini fractal animation */}
            <div className="absolute bottom-8 right-8 w-32 h-32 opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Main cardioid */}
                <path 
                  d="M50,20 C20,20 10,50 30,70 C50,90 80,70 80,40 C80,25 65,20 50,20 Z" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="0.8" 
                />
                
                {/* Period bulb */}
                <circle cx="30" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.8" />
                
                {/* Mini bulbs */}
                <circle cx="60" cy="30" r="5" fill="none" stroke="white" strokeWidth="0.6" />
                <circle cx="70" cy="50" r="4" fill="none" stroke="white" strokeWidth="0.6" />
                <circle cx="45" cy="70" r="6" fill="none" stroke="white" strokeWidth="0.6" />
                
                {/* Filaments */}
                <path d="M20,50 C15,40 25,30 30,40" fill="none" stroke="white" strokeWidth="0.4" />
                <path d="M40,75 C35,85 25,80 30,70" fill="none" stroke="white" strokeWidth="0.4" />
                <path d="M75,45 C85,40 80,30 70,35" fill="none" stroke="white" strokeWidth="0.4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fractal background decorations */}
      <div className="absolute -top-4 -right-4 w-16 h-16 opacity-80">
        <svg viewBox="0 0 100 100">
          <path 
            d="M0,50 L25,25 L50,50 L75,25 L100,50 L75,75 L50,50 L25,75 Z" 
            fill="none" 
            stroke="teal" 
            strokeWidth="3"
            className="animate-spin"
            style={{animationDuration: '20s'}}
          />
        </svg>
      </div>
      
      <div className="absolute -bottom-4 -left-4 w-16 h-16 opacity-80">
        <svg viewBox="0 0 100 100">
          <path 
            d="M50,0 L60,40 L100,50 L60,60 L50,100 L40,60 L0,50 L40,40 Z" 
            fill="none" 
            stroke="teal" 
            strokeWidth="3"
            className="animate-spin"
            style={{animationDuration: '15s', animationDirection: 'reverse'}}
          />
        </svg>
      </div>
    </div>
  );
}; 