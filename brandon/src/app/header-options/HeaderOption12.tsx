const HeaderOption12 = () => {
  return (
    <header className="relative z-50 mb-12">
      {/* Circuit board background */}
      <div className="absolute inset-0 bg-black">
        <svg width="100%" height="100%" className="text-green-500/10">
          <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M0,0 L10,0 L10,10 L20,10 L20,20 L30,20 L30,30 L50,30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M0,50 L20,50 L20,40 L40,40 L40,20 L50,20" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M50,0 L40,0 L40,10 L30,10 L30,40 L10,40 L10,50" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative bg-black/80 p-8 rounded-lg shadow-2xl overflow-hidden border border-green-500/30">
          <div className="flex items-center justify-between">
            {/* Tech Logo */}
            <div className="relative group">
              <span className="text-4xl font-black text-green-400 tracking-widest">
                CYBER
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <div className="absolute -inset-4 rounded-full bg-green-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Tech Navigation */}
            <nav className="flex items-center space-x-8">
              {["BOOT", "DEBUG", "CONFIG", "SCAN", "EXIT"].map((item, i) => (
                <div key={i} className="relative group">
                  {/* Button frame with animated border */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-md"></div>
                    <div className="absolute inset-0 bg-green-500/10 rounded-md border border-green-400/30 overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-green-400/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    
                    {/* Tech-style corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-400"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-400"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-400"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-400"></div>
                    
                    {/* Main button */}
                    <button className="relative px-6 py-3 bg-black rounded-md text-green-400 font-mono group-hover:text-green-300 transition-all shadow-lg shadow-green-900/20 group-hover:shadow-green-500/40">
                      <span className="relative z-10 tracking-widest text-lg">{item}</span>
                      
                      {/* Connection dots */}
                      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-green-500 group-hover:animate-pulse-fast"></div>
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-green-500 group-hover:animate-pulse-fast"></div>
                    </button>
                  </div>
                  
                  {/* Data stream when hovered */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-green-500 opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden whitespace-nowrap">
                    <div className="animate-typewriter inline-block">
                      {Array.from('01' + i + '1011').map((char, j) => (
                        <span key={j} style={{ animationDelay: `${j * 0.05}s` }}>{char}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption12;
