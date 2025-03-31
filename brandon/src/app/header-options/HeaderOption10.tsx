const HeaderOption10 = () => {
  return (
    <header className="bg-white border-b border-slate-200 mb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Accent */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 mr-3"></div>
            <span className="text-2xl font-bold text-slate-900">
              FIRE
            </span>
          </div>
          
          {/* Menu with Hover Cards */}
          <nav className="flex items-center space-x-6">
            {["Home", "About", "Services", "Portfolio"].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="group relative"
              >
                <div className="px-4 py-2 rounded-lg bg-white hover:bg-orange-50 transition-colors duration-300">
                  <span className="text-slate-800 group-hover:text-orange-600 font-medium">{item}</span>
                </div>
              </a>
            ))}
            
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption10;
