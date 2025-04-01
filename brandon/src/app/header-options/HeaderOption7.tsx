"use client";

import { useState } from "react";

const HeaderOption7 = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 mb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Animated Logo */}
          <div className="relative">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              NEON
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-violet-500"></div>
          </div>
          
          {/* Menu with Hover Effects */}
          <nav className="flex items-center space-x-8">
            {["Home", "About", "Services", "Portfolio", "Contact"].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                  {item}
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </a>
            ))}
            
            <button className="relative px-6 py-2 text-sm font-medium text-white overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption7;
