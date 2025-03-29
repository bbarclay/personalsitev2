"use client";

import React from 'react';
import { useTheme } from 'next-themes';

export function Logo({ className = '', width = 40, height = 40 }: { className?: string; width?: number; height?: number }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill={isDark ? '#1e293b' : '#e2e8f0'} 
      />
      
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke={isDark ? '#60a5fa' : '#3b82f6'}
        strokeWidth="4"
        fill="none"
      />
      
      {/* Inner designs - abstract B shape */}
      <path
        d="M37 30C37 30 37 45 37 50C37 55 40 60 50 60C60 60 63 55 63 50C63 45 60 40 50 40C40 40 37 45 37 50C37 55 40 70 50 70C60 70 63 65 63 50"
        stroke={isDark ? '#60a5fa' : '#3b82f6'}
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Abstract decorative elements */}
      <circle 
        cx="50" 
        cy="25" 
        r="5" 
        fill={isDark ? '#f472b6' : '#ec4899'} 
      />
      <circle 
        cx="50" 
        cy="75" 
        r="5" 
        fill={isDark ? '#a78bfa' : '#8b5cf6'} 
      />
    </svg>
  );
} 