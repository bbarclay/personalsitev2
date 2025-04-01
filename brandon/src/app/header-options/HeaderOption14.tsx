const HeaderOption14 = () => {
  return (
    <header className="relative z-50 mb-12">
      {/* Crystal shards in background */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-br from-fuchsia-500/10 to-purple-500/5"
            style={{
              clipPath: `polygon(${Math.random() * 20 + 40}% 0%, 100% ${Math.random() * 40 + 30}%, ${Math.random() * 30 + 35}% 100%, 0% ${Math.random() * 40 + 30}%)`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-gray-900/90 p-8 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-fuchsia-500/20">
          <div className="flex items-center justify-between">
            {/* Crystal Logo */}
            <div className="relative group">
              <span className="text-4xl font-black text-fuchsia-300">
                CRYSTAL
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-500"></div>
              <div className="absolute -inset-4 rounded-full bg-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Crystal Navigation */}
            <nav className="flex items-center space-x-8">
              {["Prism", "Refract", "Shine", "Fragment", "Gleam"].map((item, i) => (
                <div key={i} className="relative group perspective-1000">
                  {/* Crystal container - rotating on hover */}
                  <div className="relative transform transition-all duration-700 group-hover:rotate-y-180 preserve-3d">
                    {/* Front face */}
                    <div className="relative backface-hidden">
                      <div className="relative px-6 py-3 bg-gradient-to-br from-fuchsia-900/60 to-purple-900/60 backdrop-blur-sm rounded-md border border-white/20 shadow-lg overflow-hidden">
                        {/* Shimmering effect */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-fuchsia-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                        </div>
                        
                        {/* Button text */}
                        <span className="relative font-bold text-fuchsia-100 text-lg">
                          {item}
                        </span>
                        
                        {/* Crystal corner accents */}
                        <span className="absolute top-0 left-0 border-t-2 border-l-2 border-fuchsia-400/50 w-3 h-3"></span>
                        <span className="absolute top-0 right-0 border-t-2 border-r-2 border-fuchsia-400/50 w-3 h-3"></span>
                        <span className="absolute bottom-0 left-0 border-b-2 border-l-2 border-fuchsia-400/50 w-3 h-3"></span>
                        <span className="absolute bottom-0 right-0 border-b-2 border-r-2 border-fuchsia-400/50 w-3 h-3"></span>
                      </div>
                    </div>
                    
                    {/* Back face */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className="w-full h-full px-6 py-3 bg-gradient-to-br from-violet-900/60 to-indigo-900/60 backdrop-blur-sm rounded-md border border-white/20 shadow-lg flex items-center justify-center">
                        <span className="text-white/80 text-lg">Activate</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glowing reflection */}
                  <div className="absolute -bottom-4 left-0 w-full h-4 bg-gradient-to-b from-fuchsia-500/30 to-transparent blur-sm transform scale-x-50 opacity-50 group-hover:scale-x-100 group-hover:opacity-80 transition-all duration-300"></div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption14;
