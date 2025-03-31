import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

// Import all components
import HeroSection from './ResumeHeroNav';
import ExperienceTimeline from './ExperienceTimeline';
import SkillsExpertise from './SkillsExpertise';
import ProjectsAchievements from './ProjectsAchievements';
import ContactSection from './ContactSection';
// import EnhancedFooter from './EnhancedFooter';

const PortfolioMain: React.FC = () => {
  // State management
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Wait for mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Update active section based on scroll position
      const sections = ['hero', 'experience', 'skills', 'projects', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progress bar component
  const ProgressBar = () => (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary"
      style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    />
  );

  // Custom cursor component
  const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
      <motion.div
        className="hidden md:block fixed w-6 h-6 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: 1,
          opacity: 0.5
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 1000, damping: 50 }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary" />
      </motion.div>
    );
  };

  return (
    mounted && (
      <div className="relative bg-background text-foreground min-h-screen">
        {/* Progress Bar */}
        <ProgressBar />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-40 hidden lg:block">
          {['hero', 'experience', 'skills', 'projects', 'contact'].map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              className={`block w-3 h-3 rounded-full transition-colors duration-200 ${activeSection === section
                ? 'bg-primary'
                : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Main Content */}
        <main className="relative">
          <section id="hero">
            <HeroSection />
          </section>

          <section id="experience">
            <ExperienceTimeline />
          </section>

          <section id="skills">
            <SkillsExpertise />
          </section>

          <section id="projects">
            <ProjectsAchievements />
          </section>

          <section id="contact">
            <ContactSection />
          </section>

          {/* <EnhancedFooter /> */}
        </main>
      </div>
    )
  );
};

export default PortfolioMain;
