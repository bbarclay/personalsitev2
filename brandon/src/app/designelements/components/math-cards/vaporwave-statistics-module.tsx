import React from 'react';

const VaporwaveStatisticsModule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-6 flex items-center justify-center">
      <div className="relative w-full max-w-4xl">
        {/* Background grid effect */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hotpink" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Marble block frame */}
        <div className="relative">
          {/* Main frame with marble texture */}
          <div 
            className="relative rounded-lg overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(135deg, #f0f0f0, #d8d8d8, #f0f0f0)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          >
            {/* Chrome frame */}
            <div className="absolute inset-0 rounded-lg opacity-30" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
              border: "2px solid rgba(255,255,255,0.5)"
            }}></div>
            
            {/* Colored frame with glitchy edges */}
            <div className="p-1">
              {/* Rainbow gradient border */}
              <div 
                className="w-full h-full"
                style={{
                  background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)",
                  animation: "shifting 3s linear infinite"
                }}
              >
                {/* Inner content area */}
                <div 
                  className="p-8 relative"
                  style={{
                    background: "rgba(0, 0, 30, 0.8)",
                    clipPath: "polygon(0 0, 100% 0, 98% 2%, 100% 4%, 100% 100%, 0 100%, 2% 98%, 0 96%)"
                  }}
                >
                  {/* Diagonal lines */}
                  <div className="absolute inset-0 overflow-hidden opacity-10">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-px bg-cyan-400"
                        style={{
                          top: `${i * 8}%`,
                          transform: "rotate(45deg) scale(2)",
                          transformOrigin: "center center"
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Palm tree decoration */}
                  <div className="absolute bottom-6 right-6 opacity-30 w-24 h-32">
                    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 150 L55 110 L45 110 Z" fill="#ff00ff" />
                      <path d="M50 110 C30 80, 10 40, 5 10 C20 30, 35 40, 50 30" fill="none" stroke="#00ffff" strokeWidth="2" />
                      <path d="M50 110 C70 80, 90 40, 95 10 C80 30, 65 40, 50 30" fill="none" stroke="#ff00ff" strokeWidth="2" />
                      <path d="M50 110 C60 70, 80 50, 100 40 C70 40, 60 30, 50 10" fill="none" stroke="#00ffff" strokeWidth="2" />
                      <path d="M50 110 C40 70, 20 50, 0 40 C30 40, 40 30, 50 10" fill="none" stroke="#ff00ff" strokeWidth="2" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div 
                      className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-widest text-black"
                      style={{
                        backgroundColor: "#ff00ff",
                        boxShadow: "3px 3px 0 #00ffff",
                        animation: "glitchShift 5s infinite"
                      }}
                    >
                      アエステティック
                    </div>
                    
                    <h2 className="text-5xl font-bold mb-4" style={{
                      color: "white",
                      textShadow: "3px 3px 0 #ff00ff, 6px 6px 0 #00ffff",
                      fontFamily: "'Arial', sans-serif"
                    }}>
                      STATISTICS MODULE
                    </h2>
                    
                    <p className="text-white text-lg mb-8 opacity-80 max-w-xl">
                      Analyze your data with nostalgic '80s flair. Comprehensive statistical tools for modern day analysis.
                    </p>
                    
                    {/* Centered buttons with checkered patterns */}
                    <div className="flex flex-col items-center md:items-start gap-4 mb-6">
                      <button 
                        className="relative w-64 h-12 overflow-hidden group"
                      >
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-cyan-500"
                          style={{
                            backgroundImage: "repeating-conic-gradient(#00ffff 0% 25%, transparent 0% 50%)",
                            backgroundSize: "20px 20px",
                            animation: "slideBackground 20s linear infinite"
                          }}
                        ></div>
                        <span className="relative z-10 font-bold text-xl text-black">ANALYZE DATA</span>
                      </button>
                      
                      <div className="flex gap-4">
                        <button 
                          className="px-6 py-2 font-bold relative z-10"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            border: "1px solid #ff00ff",
                            boxShadow: "3px 3px 0 #00ffff",
                            color: "#ff00ff",
                            transform: "skew(-5deg)"
                          }}
                        >
                          IMPORT
                        </button>
                        
                        <button 
                          className="px-6 py-2 font-bold relative z-10"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            border: "1px solid #00ffff",
                            boxShadow: "3px 3px 0 #ff00ff",
                            color: "#00ffff",
                            transform: "skew(-5deg)"
                          }}
                        >
                          EXPORT
                        </button>
                      </div>
                    </div>
                    
                    {/* Stats in synthwave blocks */}
                    <div 
                      className="absolute top-10 right-10 w-32 h-32 flex items-center justify-center"
                      style={{
                        perspective: "500px",
                        animation: "float 4s ease-in-out infinite"
                      }}
                    >
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #ff00ff, #00ffff)",
                          transform: "rotateY(30deg)",
                          boxShadow: "0 0 20px rgba(255,0,255,0.5)"
                        }}
                      >
                        <div 
                          className="text-3xl font-bold"
                          style={{
                            color: "black",
                            textShadow: "1px 1px 0 white"
                          }}
                        >
                          ∑x²
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="absolute bottom-20 right-24 px-3 py-1 transform rotate-3"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.7)",
                        border: "1px solid rgba(255,0,255,0.5)",
                        boxShadow: "2px 2px 0 #00ffff"
                      }}
                    >
                      <div className="text-sm font-mono" style={{ color: "#ff00ff" }}>
                        μ = Σx / n
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative sun graphic */}
        <div 
          className="absolute -bottom-8 -left-8 w-32 h-16"
          style={{
            background: "linear-gradient(180deg, #ff00ff, #ff8b8b)",
            clipPath: "ellipse(50% 100% at 50% 100%)",
            animation: "sunrise 10s linear infinite",
            boxShadow: "0 0 20px rgba(255,0,255,0.5)"
          }}
        ></div>
        
        {/* Decorative star */}
        <div 
          className="absolute -top-4 -right-4 w-12 h-12"
          style={{
            background: "#00ffff",
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            animation: "spin 10s linear infinite",
            boxShadow: "0 0 10px rgba(0,255,255,0.7)"
          }}
        ></div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes shifting {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes glitchShift {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 2px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes sunrise {
          0% { transform: translateY(100%); }
          30% { transform: translateY(0%); }
          70% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slideBackground {
          from { background-position: 0 0; }
          to { background-position: 100% 0; }
        }
      `}</style>
    </div>
  );
};

export default VaporwaveStatisticsModule;
