const HeaderOption2 = () => (
  <header className="bg-white border-b border-slate-200 mb-12">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="relative">
          <span className="font-bold text-2xl text-blue-600">
            GLASS DESIGN
          </span>
          <div className="absolute -bottom-1 left-0 w-12 h-1 bg-blue-600"></div>
        </div>
        
        {/* Menu */}
        <nav className="flex space-x-8">
          {["Home", "About", "Services", "Portfolio", "Contact"].map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-slate-800 hover:text-blue-600 transition-colors font-medium relative py-2"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </header>
);

export default HeaderOption2;
