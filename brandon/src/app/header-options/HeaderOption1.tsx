const HeaderOption1 = () => (
  <header className="relative z-50 mb-12 bg-slate-900">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-400">
            ENTERPRISE
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            {["Home", "About", "Services", "Portfolio"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="px-4 py-2 block text-slate-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Contact Button */}
        <button className="px-4 py-2 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700">
          Contact
        </button>
      </div>
    </div>
  </header>
);

export default HeaderOption1;
