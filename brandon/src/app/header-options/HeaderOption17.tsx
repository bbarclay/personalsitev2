const HeaderOption17 = () => {
  return (
    <header className="relative z-50 mb-12">
      {/* Lava bubble animations */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-yellow-500/40 to-red-500/40"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(20px)',
              animation: `float-bubble ${Math.random() * 10 + 10}s infinite ease-in-out`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-red-900/80 via-red-800/80 to-orange-900/80 p-8 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-orange-500/30">
          <div className="flex items-center justify-between">
            {/* Molten Logo */}
            <div className="relative group">
              <span className="text-4xl font-black text-orange-300">
                MOLTEN
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 to-red-500"></div>
              <div className="absolute -inset-4 rounded-full bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Molten Navigation */}
            <nav className="flex items-center space-x-8">
              {["Forge", "Melt", "Cast", "Hammer", "Temper"].map((item, i) => (
                <div key={i} className="relative group perspective-500">
                  {/* Molten effect beneath */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 rounded-lg blur opacity-40 group-hover:opacity-80 transition-opacity duration-300 group-hover:animate-pulse-slow"></div>
                  
                  {/* Hot metal button */}
                  <button className="relative px-6 py-3 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 overflow-hidden">
                    {/* Glowing cracks */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-1/4 w-px h-full bg-orange-500/60 group-hover:animate-crack-glow"></div>
                      <div className="absolute top-1/3 right-1/3 w-full h-px bg-yellow-500/60 group-hover:animate-crack-glow" style={{ animationDelay: '0.2s' }}></div>
                      <div className="absolute bottom-1/4 left-1/2 w-px h-1/2 bg-red-500/60 group-hover:animate-crack-glow" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    
                    {/* Button text */}
                    <span className="relative font-bold text-gray-300 group-hover:text-orange-300 transition-colors duration-300 text-lg uppercase tracking-widest">
                      {item}
                    </span>
                    
                    {/* Heat distortion effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-500/10 to-transparent animate-heat-distort"></div>
                    </div>
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption17;
