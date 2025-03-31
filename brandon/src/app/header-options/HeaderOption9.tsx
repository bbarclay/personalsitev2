const HeaderOption9 = () => {
  return (
    <header className="bg-slate-900 mb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Glowing Logo */}
          <div className="relative">
            <span className="text-3xl font-black text-white">
              CYBER
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          </div>
          
          {/* Menu with Glowing Effects */}
          <nav className="flex items-center space-x-8">
            {["Home", "About", "Services", "Portfolio"].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="group relative"
              >
                <span className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">
                  {item}
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              </a>
            ))}
            
            <button className="px-6 py-2 bg-cyan-500 text-slate-900 rounded-md text-sm font-medium hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption9;
