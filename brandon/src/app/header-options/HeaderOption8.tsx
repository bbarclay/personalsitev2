const HeaderOption8 = () => {
  return (
    <header className="bg-white shadow-lg mb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with 3D Effect */}
          <div className="relative">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              CUBE
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -skew-x-12"></div>
          </div>
          
          {/* Menu with 3D Cards */}
          <nav className="flex items-center space-x-6">
            {["Home", "About", "Services", "Portfolio"].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="group relative"
              >
                <div className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <span className="text-slate-800 font-medium">{item}</span>
                </div>
              </a>
            ))}
            
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption8;
