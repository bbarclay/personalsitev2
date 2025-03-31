"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';

const Header = () => {
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && (theme === 'dark' || (!theme && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches));

  // Initialize nodes state
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  // Generate random positions after mount
  useEffect(() => {
    if (!mounted) return;

    const newNodes = Array.from({ length: 20 }).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      return (
        <circle 
          key={`node-${i}`} 
          cx={`${x}%`} 
          cy={`${y}%`} 
          r="4"
          fill="#6366f1"
          filter="url(#glow)"
          className="transition-all duration-300"
        />
      );
    });
    setNodes(newNodes);

    const newLines = Array.from({ length: 40 }).map((_, i) => {
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const x2 = Math.random() * 100;
      const y2 = Math.random() * 100;
      return (
        <line 
          key={`line-${i}`} 
          x1={`${x1}%`} 
          y1={`${y1}%`} 
          x2={`${x2}%`} 
          y2={`${y2}%`} 
          stroke={hoverItem ? "#60a5fa" : "#6366f1"} 
          strokeWidth={hoverItem ? "1.5" : "1"} 
          strokeOpacity={hoverItem ? "0.7" : "0.5"} 
          className="transition-all duration-300 dark:stroke-indigo-400 dark:stroke-opacity-50"
        />
      );
    });
    setLines(newLines);
  }, [mounted, hoverItem]);

  return (
    <div className="relative">
      {/* Main header with neural network background */}
      <div className={`relative bg-slate-800 dark:bg-gray-950 overflow-hidden transition-colors duration-300`}>
        {/* Neural network nodes and connections background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              {/* Lightning effect */}
              <linearGradient id="lightning" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Render nodes and lines */}
            {nodes}
            {lines}
            
            {/* Tesla coil effect when menu items are hovered */}
            {hoverItem && (
              Array.from({ length: 5 }).map((_, i) => {
                const startX = 70 + (i * 5); // Position near the nav items
                const startY = 30;
                const midX = 60 + (Math.random() * 20);
                const midY = 30 + (Math.random() * 40);
                const endX = 40 + (Math.random() * 40);
                const endY = 50 + (Math.random() * 30);
                
                return (
                  <g key={`tesla-${i}`} className="tesla-effect">
                    <path 
                      d={`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`}
                      stroke="url(#lightning)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      strokeLinecap="round"
                      className="animate-pulse opacity-80"
                    />
                    <circle 
                      cx={endX} 
                      cy={endY} 
                      r="3" 
                      fill="#818cf8" 
                      filter="url(#glow)"
                      className="animate-ping" 
                    />
                  </g>
                );
              })
            )}
          </svg>
        </div>
      
        <div className="container mx-auto p-4 z-10 relative">
          <div className="flex justify-between items-center">
            {/* Logo and site name */}
            <div className="flex items-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                <span className="text-white transition-colors duration-300">BRANDON</span>
                <span className="text-indigo-400">BARCLAY</span>
              </div>
            </div>
            
            {/* Header navigation with dark mode toggle */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Replace with ThemeToggle component */}
              <div className="flex items-center mr-6">
                <ThemeToggle />
              </div>
              
              {/* Main navigation items */}
              {["TRAIN", "PROCESS", "ANALYZE", "PREDICT", "MATH"].map((item) => (
                <div 
                  key={item} 
                  className={`relative px-5 py-2 text-white font-bold transition-all duration-300 group`}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {/* Text background for better visibility */}
                  <span className={`absolute inset-0 ${hoverItem === item ? 'bg-indigo-600/80' : 'bg-indigo-900/50'} transition-all duration-300 -skew-x-12 rounded`}></span>
                  
                  {/* Glow effect on hover */}
                  <span className={`absolute inset-0 rounded ${hoverItem === item ? 'shadow-[0_0_15px_3px_rgba(99,102,241,0.6)]' : ''} transition-all duration-300 -skew-x-12`}></span>
                  
                  {/* Bottom border that animates on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  
                  <span className="relative z-10">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation bar with gradient */}
      <div className={`bg-gradient-to-r from-slate-700 via-indigo-800 to-slate-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transform -skew-y-1 py-6 shadow-lg transition-colors duration-300`}>
        <div className="container mx-auto transform skew-y-1">
          <div className="flex justify-center md:justify-between items-center flex-wrap gap-3 px-4">
            {[
              {name: "Home", path: ""},
              {name: "About", path: "about"},
              {name: "Services", path: "services"},
              {name: "Portfolio", path: "portfolio"},
              {name: "Math", path: "math"},
              {name: "Math Cards", path: "designelements/components/math-cards"},
              {name: "Contact", path: "contact"}
            ].map((item) => (
              <Link 
                href={`/${item.path}`} 
                key={item.name}
                className={`relative px-6 py-2 bg-black text-white hover:bg-indigo-900 dark:hover:bg-gray-800 border-indigo-400 dark:border-indigo-500/20 rounded-lg transition-all duration-300 backdrop-blur-sm border shadow-lg group`}
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
              >
                {/* Lightning effect on hover */}
                {hoverItem === item.name && (
                  <span className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-blue-400 opacity-70 animate-pulse`}></span>
                )}
                
                {/* Yellow dot indicator */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"></span>
                
                {/* Hover effect */}
                <span className={`absolute inset-x-0 -bottom-1 h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg`}></span>
                
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes spark {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .tesla-effect {
          animation: spark 1.5s infinite;
          animation-delay: calc(var(--delay) * 0.2s);
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;
