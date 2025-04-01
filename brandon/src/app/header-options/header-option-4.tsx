const HeaderOption4 = () => (
  <header className="bg-purple-700 mb-12">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="font-black text-2xl text-white tracking-tight">
          VIBRANT
        </div>
        
        {/* Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {["Home", "Features", "Pricing", "About"].map((item, index) => (
            <a 
              key={index}
              href="#" 
              className="text-white opacity-80 hover:opacity-100 font-medium text-sm transition-colors px-2 py-1"
            >
              {item}
            </a>
          ))}
          
          <button className="bg-white text-purple-700 px-5 py-2 rounded-full text-sm font-semibold">
            Try Now
          </button>
        </nav>
      </div>
    </div>
  </header>
);

export default HeaderOption4;
