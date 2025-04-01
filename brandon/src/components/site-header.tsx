"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  {
    name: "Home",
    href: "/",
    hasDropdown: false
  },
  {
    name: "About",
    href: "/about",
    hasDropdown: false
  },
  {
    name: "Services",
    href: "/services",
    hasDropdown: false
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    hasDropdown: false
  },
  {
    name: "Math",
    href: "/math",
    hasDropdown: false
  },
  {
    name: "Math Cards",
    href: "/ai",
    hasDropdown: false
  },
  {
    name: "Contact",
    href: "/contact",
    hasDropdown: false
  }
];

const mathSymbols = [
  "∫", "∑", "∏", "√", "∞", "≈", "≡", "≠", "⊂", "∈"
];

export function SiteHeader() {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [renderedSymbols, setRenderedSymbols] = useState<React.ReactNode[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient) {
      const symbols = generateMathSymbols();
      setRenderedSymbols(symbols);
    }
  }, [isClient]);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Random placement for math symbols in the header background
  const generateMathSymbols = () => {
    return mathSymbols.map((symbol, index) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = (Math.random() * 0.07) + 0.03;
      const size = Math.floor(Math.random() * 15) + 10;
      
      return (
        <div 
          key={index}
          className="absolute text-blue-600 dark:text-blue-400 pointer-events-none select-none"
          style={{ 
            top: `${top}%`, 
            left: `${left}%`,
            opacity,
            fontSize: `${size}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {symbol}
        </div>
      );
    });
  };

  // Geometric shape for the header background
  const GeometricBackground = () => (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {isClient && renderedSymbols}
      <div className="absolute top-0 -right-20 h-40 w-80 rounded-bl-full bg-blue-600/10 blur-xl"></div>
      <div className="absolute -top-10 left-1/4 h-20 w-20 rounded-full bg-blue-600/10 blur-lg"></div>
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-full bg-blue-600/5 blur-xl"></div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg shadow-md border-b bg-white/80 dark:bg-gray-950/80">
      <div className="relative container h-16 flex items-center px-4">
        <GeometricBackground />
        
        {/* Logo and mobile menu */}
        <div className="flex items-center mr-4 sm:mr-6">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Browse through the site sections
                </SheetDescription>
              </SheetHeader>
              <Link href="/" className="flex items-center mt-4">
                <Logo width={32} height={32} />
                <span className="ml-2 text-xl font-bold">Brandon's Site</span>
              </Link>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <Link 
                        href={item.href}
                        className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleDropdown(item.name)}
                        >
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform", 
                            activeDropdown === item.name && "rotate-180"
                          )} />
                        </Button>
                      )}
                    </div>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="hidden sm:flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Logo width={32} height={32} />
            </motion.div>
            <span className="text-xl font-bold">Brandon's Site</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>
                
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Right side elements: animated decorative element and theme toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <motion.div 
              className="w-12 h-8 relative"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-0.5 h-full bg-blue-600 dark:bg-blue-400 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-600 dark:bg-blue-400 transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 right-0 w-0.5 h-full bg-blue-600 dark:bg-blue-400 transform translate-y-1/2"></div>
              <div className="absolute bottom-0 right-1/4 w-3/4 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
            </motion.div>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
