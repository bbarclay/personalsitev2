const HeaderOption5 = () => (
  <header className="bg-black mb-12">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-500 mr-3"></div>
          <span className="font-bold text-xl text-white">MODULAR</span>
        </div>
        
        {/* Menu */}
        <nav className="flex items-center space-x-8">
          {["Home", "Products", "About", "Contact"].map((item, index) => (
            <a 
              key={index}
              href="#" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {item}
            </a>
          ))}
          
          <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors px-4 py-2 rounded-md text-sm">
            Sign Up
          </button>
        </nav>
      </div>
    </div>
  </header>
);

export default HeaderOption5;
