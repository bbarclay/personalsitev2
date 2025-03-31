"use client";

import React from 'react';
import { motion } from 'framer-motion';

type MathCardProps = {
  title: string;
  description: string;
  mainColor: string;
  equation1?: string;
  equation2?: string;
  animationDelay?: number;
};

export const MathCard: React.FC<MathCardProps> = ({
  title,
  description,
  mainColor,
  equation1,
  equation2,
  animationDelay = 0,
}) => {
  const colorMap: Record<string, { 
    bg: string; 
    bgLight: string; 
    bgDark: string; 
    text: string; 
    zigzag: string;
    hover: string;
  }> = {
    blue: {
      bg: 'bg-blue-600',
      bgLight: 'bg-blue-500/30',
      bgDark: 'bg-blue-700',
      text: 'text-blue-100',
      zigzag: '#2563eb',
      hover: 'hover:bg-blue-50',
    },
    purple: {
      bg: 'bg-purple-600',
      bgLight: 'bg-purple-500/30',
      bgDark: 'bg-purple-700',
      text: 'text-purple-100',
      zigzag: '#9333ea',
      hover: 'hover:bg-purple-50',
    },
    green: {
      bg: 'bg-emerald-600',
      bgLight: 'bg-emerald-500/30',
      bgDark: 'bg-emerald-700',
      text: 'text-emerald-100',
      zigzag: '#059669',
      hover: 'hover:bg-emerald-50',
    },
    amber: {
      bg: 'bg-amber-600',
      bgLight: 'bg-amber-500/30',
      bgDark: 'bg-amber-700',
      text: 'text-amber-100',
      zigzag: '#d97706',
      hover: 'hover:bg-amber-50',
    },
    rose: {
      bg: 'bg-rose-600',
      bgLight: 'bg-rose-500/30',
      bgDark: 'bg-rose-700',
      text: 'text-rose-100',
      zigzag: '#e11d48',
      hover: 'hover:bg-rose-50',
    },
  };

  const colors = colorMap[mainColor] || colorMap.blue;

  return (
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + animationDelay * 0.1 }}
    >
      {/* Background glow */}
      <div className={`absolute -inset-1 rounded-lg ${colors.bgLight} blur-md`}></div>
      
      {/* Main card with zigzag border */}
      <div className="relative z-10">
        {/* Zigzag top */}
        <div className="w-full h-6 overflow-hidden">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
            <path 
              d="M0,0 L40,20 L80,0 L120,20 L160,0 L200,20 L240,0 L280,20 L320,0 L360,20 L400,0 L440,20 L480,0 L520,20 L560,0 L600,20 L640,0 L680,20 L720,0 L760,20 L800,0 L840,20 L880,0 L920,20 L960,0 L1000,20 L1040,0 L1080,20 L1120,0 L1160,20 L1200,0 L1200,40 L0,40 Z" 
              fill={colors.zigzag}
            />
          </svg>
        </div>
        
        {/* Main content */}
        <div className={`${colors.bg} p-6 relative overflow-hidden`}>
          {/* Math symbols background pattern */}
          <div className="absolute inset-0 opacity-10 text-3xl text-white font-bold overflow-hidden select-none flex flex-wrap">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="p-3 transform rotate-45">
                {["x²", "+", "=", "√", "Δ"][i % 5]}
              </div>
            ))}
          </div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className={`inline-block px-4 py-1 ${colors.bgDark} rounded-full text-white font-bold mb-3 text-sm`}>
              MATHEMATICAL TOPIC
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
              {title}
            </h2>
            
            <p className={`${colors.text} mb-6`}>
              {description}
            </p>
            
            <button className={`px-5 py-2 bg-white ${colors.bg.replace('bg-', 'text-')} rounded-lg font-bold ${colors.hover} transform hover:-translate-y-1 transition-all shadow-md`}>
              Explore
            </button>
            
            {/* Floating equation examples */}
            {equation1 && (
              <div className={`absolute top-4 right-6 bg-black/20 backdrop-blur px-3 py-1 rounded-lg ${colors.text} transform rotate-3 animate-bounce shadow-md text-sm`} style={{animationDuration: '6s'}}>
                {equation1}
              </div>
            )}
            {equation2 && (
              <div className={`absolute bottom-8 right-12 bg-black/30 backdrop-blur px-3 py-1 rounded-lg ${colors.text} transform -rotate-6 animate-bounce shadow-md text-sm`} style={{animationDuration: '8s', animationDelay: '1s'}}>
                {equation2}
              </div>
            )}
          </div>
        </div>
        
        {/* Zigzag bottom */}
        <div className="w-full h-6 overflow-hidden">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
            <path 
              d="M0,40 L40,20 L80,40 L120,20 L160,40 L200,20 L240,40 L280,20 L320,40 L360,20 L400,40 L440,20 L480,40 L520,20 L560,40 L600,20 L640,40 L680,20 L720,40 L760,20 L800,40 L840,20 L880,40 L920,20 L960,40 L1000,20 L1040,40 L1080,20 L1120,40 L1160,20 L1200,40 L1200,0 L0,0 Z" 
              fill={colors.zigzag}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
