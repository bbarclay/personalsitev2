const HeaderOption23 = () => {
  return (
    <header className="relative z-50 mb-12 overflow-hidden">
      {/* DNA strands floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-20"
            style={{
              top: `${Math.random() * 70 + 15}%`,
              left: `${Math.random() * 70 + 15}%`,
              transform: `rotate(${Math.random() * 90}deg)`,
            }}
          >
            <div className="relative w-32 h-16">
              {/* DNA backbone */}
              <div className="absolute top-0 w-full h-0.5 bg-teal-500/50 rounded-full"></div>
              <div className="absolute bottom-0 w-full h-0.5 bg-teal-500/50 rounded-full"></div>
              
              {/* DNA rungs */}
              {[...Array(8)].map((_, j) => (
                <div 
                  key={j}
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-8 bg-teal-500/30"
                  style={{
                    left: `${j * 14}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div 
        className="relative bg-gradient-to-br from-emerald-900/80 to-teal-900/80 p-8 overflow-hidden backdrop-blur-sm"
        style={{
          clipPath: "path('M50,0 C70,0 90,20 90,40 C110,40 120,60 105,80 C120,100 110,120 90,120 C90,140 70,160 50,160 C30,160 10,140 10,120 C-10,120 -20,100 -5,80 C-20,60 -10,40 10,40 C10,20 30,0 50,0 Z')",
          transform: 'scale(0.9)'
        }}
      >
        {/* Cell-like texture */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <filter id="bio-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="5" />
              <feDisplacementMap in="SourceGraphic" scale="50" />
            </filter>
            <rect width="100%" height="100%" filter="url(#bio-noise)" />
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                backgroundColor: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, ${Math.random() * 55 + 200}, 0.4)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-cell ${Math.random() * 20 + 10}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          {/* Organic logo */}
          <div className="relative">
            <div className="text-3xl font-black text-teal-300 tracking-wider">BIO_TECH</div>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
            {/* Pulsing membrane around logo */}
            <div className="absolute -inset-3 rounded-full bg-teal-400/10 animate-pulse-slow"></div>
          </div>
          
          <div className="flex items-center space-x-6">
            {['Evolve', 'Adapt', 'Grow', 'Mutate', 'Thrive'].map((item, i) => (
              <div key={i} className="relative group">
                {/* Organic button */}
                <div className="relative">
                  {/* Pulsing membrane background */}
                  <div className="absolute -inset-3 rounded-full bg-teal-400/10 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Cell membrane */}
                  <button className="relative px-4 py-2 bg-gradient-to-br from-teal-700/90 to-emerald-900/90 rounded-full border border-teal-400/30 shadow-lg overflow-hidden group-hover:border-teal-400/70 transition-colors duration-300">
                    {/* Cell nucleus */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-teal-400/40 group-hover:w-full group-hover:h-full transition-all duration-500 ease-out"></div>
                    
                    {/* Cytoplasm swirls */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></div>
                    </div>
                    
                    {/* Text with organic glow */}
                    <span className="relative z-10 font-medium text-teal-100 group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </button>
                  
                  {/* Tendrils that extend on hover */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="relative w-px h-4 bg-teal-400/50 mt-1">
                      <div className="absolute top-full left-0 w-3 h-px bg-teal-400/50 transform rotate-45"></div>
                      <div className="absolute top-full left-0 w-3 h-px bg-teal-400/50 transform -rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float-cell {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </header>
  );
};

export default HeaderOption23;
