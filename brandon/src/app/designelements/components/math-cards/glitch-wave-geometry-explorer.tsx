import React from 'react';

const GlitchWaveGeometryExplorer = () => {
  return (
    <div className="min-h-screen bg-zinc-900 p-6 flex items-center justify-center overflow-hidden">
      {/* Video static overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-50">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      {/* Background elements */}
      <div className="absolute w-full h-full opacity-30">
        {/* Horizontal scan lines */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-teal-300 w-full"
            style={{ 
              top: `${i * 2.5}%`,
              opacity: i % 2 === 0 ? 0.8 : 0.3
            }}
          ></div>
        ))}
      </div>
      
      {/* Main card with glitch effects */}
      <div className="relative">
        {/* Glitch duplicate layers */}
        <div 
          className="absolute -inset-1 bg-rose-600 opacity-50"
          style={{
            clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
            filter: "blur(10px)",
            animation: "glitchRed 4s infinite"
          }}
        ></div>
        
        <div 
          className="absolute -inset-1 bg-teal-400 opacity-50"
          style={{
            clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 90%)",
            filter: "blur(10px)",
            animation: "glitchCyan 4s infinite"
          }}
        ></div>
        
        {/* Main content card */}
        <div className="relative z-10">
          {/* Diagonal stripes background */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px)",
            }}
          ></div>
          
          {/* Card with split diagonal design */}
          <div 
            className="relative overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(135deg, #2d2d74 0%, #4f1d51 100%)",
              clipPath: "polygon(0 5%, 5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%)"
            }}
          >
            {/* Diagonal divider */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(45deg, transparent 49.5%, rgba(255,255,255,0.5) 49.5%, rgba(255,255,255,0.5) 50.5%, transparent 50.5%)"
              }}
            ></div>
            
            {/* Glitch lines */}
            <div 
              className="absolute inset-y-0 w-2 bg-rose-500 right-1/3"
              style={{
                opacity: 0.7,
                animation: "glitchLine 2s infinite"
              }}
            ></div>
            
            <div 
              className="absolute inset-x-0 h-2 bg-teal-400 top-2/3"
              style={{
                opacity: 0.7,
                animation: "glitchLine 3s infinite"
              }}
            ></div>
            
            {/* Content container */}
            <div className="relative z-10 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <div 
                    className="inline-block px-4 py-1 mb-2 font-bold tracking-widest text-sm"
                    style={{
                      background: "linear-gradient(90deg, #ff1f8f, #00fff9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 0 5px rgba(255,31,143,0.5), 0 0 10px rgba(0,255,249,0.5)",
                      animation: "textFlicker 3s infinite"
                    }}
                  >
                    COMPUTATIONAL ENGINE
                  </div>
                  
                  <h2 className="text-5xl font-bold mb-2 relative" style={{
                    color: "white",
                    textShadow: "3px 3px 0 #ff1f8f, -3px -3px 0 #00fff9",
                  }}>
                    GEOMETRY EXPLORER
                    <span 
                      className="absolute -inset-1 opacity-50"
                      style={{
                        color: "#ff1f8f",
                        clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
                        animation: "glitchText 5s infinite"
                      }}
                    >GEOMETRY EXPLORER</span>
                    <span 
                      className="absolute -inset-1 opacity-50"
                      style={{
                        color: "#00fff9",
                        clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)",
                        animation: "glitchText2 5s infinite"
                      }}
                    >GEOMETRY EXPLORER</span>
                  </h2>
                  
                  <p className="text-gray-300 max-w-xl mt-4">
                    Visualize complex geometric transformations in real-time with advanced 3D rendering capabilities.
                  </p>
                </div>
                
                {/* Right-side geometric shape */}
                <div 
                  className="mt-6 md:mt-0 w-24 h-24 relative"
                  style={{
                    animation: "rotateGeometry 10s infinite linear"
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      border: "2px solid #ff1f8f",
                      transform: "rotate(0deg)",
                      boxShadow: "0 0 15px rgba(255,31,143,0.7)"
                    }}
                  ></div>
                  <div 
                    className="absolute inset-0"
                    style={{
                      border: "2px solid #00fff9",
                      transform: "rotate(45deg)",
                      boxShadow: "0 0 15px rgba(0,255,249,0.7)"
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full" style={{
                      background: "radial-gradient(circle, #ff1f8f, #00fff9)",
                      boxShadow: "0 0 10px white",
                      animation: "pulse 2s infinite"
                    }}></div>
                  </div>
                </div>
              </div>
              
              {/* Equation scrolling bar */}
              <div 
                className="w-full h-12 bg-black bg-opacity-50 mb-8 overflow-hidden relative"
                style={{
                  boxShadow: "0 0 10px rgba(0,255,249,0.3), 0 0 20px rgba(255,31,143,0.3)"
                }}
              >
                <div className="absolute whitespace-nowrap" style={{
                  animation: "scrollEquations 20s linear infinite",
                  fontSize: "20px",
                  color: "white",
                  textShadow: "1px 1px 2px black"
                }}>
                  {/* Equations */}
                  <span className="mx-4">∇⋅E = ρ/ε₀</span>
                  <span className="mx-4">∇⋅B = 0</span>
                  <span className="mx-4">∇×E = -∂B/∂t</span>
                  <span className="mx-4">∇×B = μ₀J + μ₀ε₀ ∂E/∂t</span>
                  <span className="mx-4">iħ ∂ψ/∂t = Hψ</span>
                  <span className="mx-4">E=mc²</span>
                  <span className="mx-4">∇⋅E = ρ/ε₀</span>
                  <span className="mx-4">∇⋅B = 0</span>
                  <span className="mx-4">∇×E = -∂B/∂t</span>
                  <span className="mx-4">∇×B = μ₀J + μ₀ε₀ ∂E/∂t</span>
                  <span className="mx-4">iħ ∂ψ/∂t = Hψ</span>
                  <span className="mx-4">E=mc²</span>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition-colors duration-300">
                  Explore
                </button>
                <button className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-cyan-400 hover:to-teal-400 text-zinc-900 font-bold py-2 px-6 rounded-full shadow-md transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlitchWaveGeometryExplorer;
