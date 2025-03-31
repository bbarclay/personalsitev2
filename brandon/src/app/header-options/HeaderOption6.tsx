"use client";

import { useState } from "react";
import Link from "next/link";

const HeaderOption6 = () => {
  const [activeItem, setActiveItem] = useState('home');
  
  const menuItems = [
    { 
      id: 'home', 
      name: 'Home', 
      icon: '🏠', 
      color: '#3b82f6', 
      shadowColor: '#60a5fa',
      href: '/'
    },
    { 
      id: 'about', 
      name: 'About', 
      icon: 'ℹ️', 
      color: '#4c1d95', 
      shadowColor: '#8b5cf6',
      href: '#'
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: '🛠️', 
      color: '#065f46', 
      shadowColor: '#34d399',
      href: '#'
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio', 
      icon: '🖼️', 
      color: '#5b21b6', 
      shadowColor: '#a78bfa',
      href: '#'
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      icon: '📞', 
      color: '#881337', 
      shadowColor: '#fb7185',
      href: '#'
    },
  ];
  
  return (
    <header className="mb-12 relative z-50">
      <div className="container mx-auto px-4">
        <div className="py-4 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6 text-center">
            <span className="text-2xl font-bold text-white tracking-wider">
              COSMIC NAV
            </span>
          </div>
          
          {/* Epic Menu */}
          <div className="flex justify-center items-center gap-3">
            {menuItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === '#') e.preventDefault();
                    setActiveItem(item.id);
                  }}
                  className="relative group transition-transform duration-300 hover:scale-110 focus:outline-none"
                >
                  {/* Card Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative overflow-hidden rounded-lg">
                    {/* Glow Effect */}
                    <div 
                      className={`absolute inset-0 opacity-70 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}
                      style={{
                        background: item.color,
                        boxShadow: isActive 
                          ? `0 0 20px 5px ${item.shadowColor}, 0 0 40px 5px ${item.shadowColor}` 
                          : `0 0 10px 2px ${item.shadowColor}`,
                      }}
                    ></div>
                    
                    {/* Button Background with Overlay Pattern */}
                    <div className="absolute inset-0 bg-opacity-90" style={{ backgroundColor: item.color }}>
                      {/* Circuitry Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id={`circuit-${item.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                              <path d="M0,15 L30,15 M15,0 L15,30" stroke="white" strokeWidth="0.5" fill="none" />
                              <circle cx="15" cy="15" r="2" fill="white" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#circuit-${item.id})`} />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                      {/* Icon */}
                      <div 
                        className={`text-xl mb-1 transform transition-all duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}
                        style={{
                          textShadow: `0 0 10px white, 0 0 20px ${item.shadowColor}`,
                        }}
                      >
                        {item.icon}
                      </div>
                      
                      {/* Name */}
                      <div 
                        className="text-xs font-medium tracking-wide"
                        style={{
                          textShadow: `0 0 5px ${item.shadowColor}`,
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    
                    {/* Active indicator - pulsing border */}
                    <div 
                      className={`absolute inset-0 rounded-lg transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <div className="absolute inset-0 border-2 border-white rounded-lg animate-pulse"></div>
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/70"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/70"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/70"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/70"></div>
                  </div>
                  
                  {/* Power indicator below for active item */}
                  {isActive && (
                    <div className="absolute -bottom-1 inset-x-0 flex justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" 
                        style={{boxShadow: `0 0 10px 2px ${item.shadowColor}`}}></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Background Effects */}
          <style jsx>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    </header>
  );
};

export default HeaderOption6;
