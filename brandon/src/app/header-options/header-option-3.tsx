const HeaderOption3 = () => (
  <header className="bg-slate-50 border-b border-slate-200 mb-12">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="font-extrabold text-xl text-slate-900">
          MINIMAL
        </div>
        
        {/* Menu */}
        <nav className="flex space-x-8">
          {["Home", "About", "Services", "Contact"].map((item, index) => (
            <a 
              key={index}
              href="#" 
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
            >
              {item}
            </a>
          ))}
          
          <button className="bg-slate-900 text-white px-4 py-1.5 rounded-md text-sm font-medium">
            Get Started
          </button>
        </nav>
      </div>
    </div>
  </header>
);

export default HeaderOption3;
