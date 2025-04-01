"use client";

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';
import { HeroSection } from '../components/HeroSection';
import { ExpertiseSection } from '../components/ExpertiseSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { MathematicalBridgeSection } from '../components/MathematicalBridgeSection';
import FeaturedWork from '../components/home/FeaturedWork';
import TechnologiesSection from '../components/home/TechnologiesSection';
import CodeTyperSection from '../components/home/CodeTyperSection';

// ScrollReveal component for animating elements as they enter the viewport
interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
}

const ScrollReveal = ({ children, threshold = 0.1 }: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Parallax component that moves at a different speed while scrolling
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
}

const Parallax = ({ children, speed = 0.5 }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

// Progress indicator that shows scroll progress
const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

// Fancy background that changes as you scroll
const ScrollingBackground = () => {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["rgba(0, 0, 0, 0)", "rgba(25, 25, 112, 0.05)", "rgba(75, 0, 130, 0.05)", "rgba(139, 0, 139, 0.05)", "rgba(0, 0, 128, 0.05)", "rgba(0, 0, 0, 0)"]
  );

  return (
    <motion.div 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor }}
    />
  );
};

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const mainRef = useRef(null);
  
  // Move useTransform hooks to the top level
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Handle mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <motion.div
      ref={mainRef}
      className={`relative ${currentTheme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgressIndicator />
      <ScrollingBackground />
      
      <motion.div
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
      >
        <HeroSection />
      </motion.div>

      <ScrollReveal threshold={0.2}>
        <ExpertiseSection />
      </ScrollReveal>

      <Parallax speed={-0.2}>
        <ScrollReveal>
          <PortfolioSection />
        </ScrollReveal>
      </Parallax>

      <ScrollReveal>
        <motion.div
          whileInView={{
            rotateX: [0, 5, 0],
            transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <MathematicalBridgeSection />
        </motion.div>
      </ScrollReveal>

      <Parallax speed={0.3}>
        <ScrollReveal>
          <FeaturedWork />
        </ScrollReveal>
      </Parallax>

      <ScrollReveal>
        <CodeTyperSection />
      </ScrollReveal>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
      >
        <TechnologiesSection />
      </motion.div>
    </motion.div>
  );
}
