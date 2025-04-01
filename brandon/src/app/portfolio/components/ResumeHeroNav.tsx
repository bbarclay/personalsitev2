import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';

const HeroSection = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Wait for client-side rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getThemeIcon = () => {
    if (!mounted) return null;
    
    const currentTheme = resolvedTheme || theme;
    
    if (currentTheme === 'dark') return <Moon className="w-5 h-5 text-indigo-300" />;
    if (currentTheme === 'light') return <Sun className="w-5 h-5 text-amber-500" />;
    return <Monitor className="w-5 h-5 text-sky-500" />;
  };

  const displayTheme = () => {
    if (!mounted) return '';
    return (theme === 'system' ? 'System' : theme);
  };

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      {mounted && (
        <div className="fixed top-4 right-4 z-50">
          <motion.div
            ref={dropdownRef}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-sm border border-border shadow-lg hover:border-primary/50 transition-all"
              style={{
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              aria-label="Toggle theme"
            >
              <span className="text-foreground flex items-center gap-2">
                {getThemeIcon()}
                <span className="text-sm font-medium capitalize hidden sm:inline">
                  {displayTheme()}
                </span>
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-background/90 dark:bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="py-1">
                    {['light', 'dark', 'system'].map((themeOption) => (
                      <button
                        key={themeOption}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-muted flex items-center space-x-3 transition-colors ${
                          theme === themeOption ? 'text-primary font-medium bg-muted/50' : 'text-foreground'
                        }`}
                        onClick={() => {
                          setTheme(themeOption);
                          setIsOpen(false);
                        }}
                      >
                        <span className="flex items-center justify-center w-6 h-6">
                          {themeOption === 'light' && <Sun className={`w-4 h-4 ${theme === themeOption ? 'text-amber-500' : ''}`} />}
                          {themeOption === 'dark' && <Moon className={`w-4 h-4 ${theme === themeOption ? 'text-indigo-400' : ''}`} />}
                          {themeOption === 'system' && <Monitor className={`w-4 h-4 ${theme === themeOption ? 'text-sky-500' : ''}`} />}
                        </span>
                        <span className="capitalize">{themeOption}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[calc(50%-4rem)] top-10 h-[28rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
              <svg
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width="200"
                    height="200"
                    x="50%"
                    y="0"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="relative mx-auto max-w-7xl px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            >
              AI/ML Engineer &{' '}
              <span className="text-primary">
                Technology Leader
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Specialized in NLP, LLMs, and AI-powered automation. Building scalable AI
              systems that transform complex data into actionable insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#experience"
                className="text-base font-semibold leading-6 text-foreground"
              >
                View Experience <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Removed mobile navigation menu */}
    </div>
  );
};

export default HeroSection;
