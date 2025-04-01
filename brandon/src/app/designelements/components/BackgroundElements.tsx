"use client";

import React, { useEffect, useState, useRef } from 'react';
import { seededRandom, randomInRange } from '@/app/utils/deterministicRandom';

// Generate fixed positions for particles
interface Particle {
  cx: string;
  cy: string;
  r: number;
  fill: string;
  className: string;
}

const generateParticles = (count: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      cx: `${randomInRange(5, 95)}%`,
      cy: `${randomInRange(5, 95)}%`,
      r: 4,
      fill: "#6366f1",
      className: "transition-all duration-300",
    });
  }
  return particles;
};





interface Line {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
  className: string;
}

const generateLines = (particles: Particle[], lineCount: number): Line[] => {
  const lines: Line[] = [];
  for (let i = 0; i < lineCount; i++) {
    const startIdx = Math.floor(seededRandom() * particles.length);
    const endIdx = Math.floor(seededRandom() * particles.length);
    
    lines.push({
      x1: particles[startIdx].cx,
      y1: particles[startIdx].cy,
      x2: particles[endIdx].cx,
      y2: particles[endIdx].cy,
      stroke: "#6366f1",
      strokeWidth: 1,
      strokeOpacity: 0.5,
      className: "transition-all duration-300",
    });
  }
  return lines;
};




interface Lightning {
  left: string;
  animationDuration: string;
  animationDelay: string;
}

const generateLightning = (count: number): Lightning[] => {
  const lightning: Lightning[] = [];
  for (let i = 0; i < count; i++) {
    const lightningElement: Lightning = {
      left: `${randomInRange(1, 99)}%`,
      animationDuration: `${3 + i}s`,
      animationDelay: `${i * 1.3}s`,
    };
    lightning.push(lightningElement);
  }
  return lightning;
};

// Generate colorful number patterns with additional properties
interface NumberElement {
  x: number;
  y: number;
  fontSize: number;
  baseOpacity: number;
  color: string;
  value: string;
  scrollOffset: { x: number; y: number };
  distanceFromCenter: number;
}

const generateNumbers = (count: number): NumberElement[] => {
  const numbers: NumberElement[] = [];

  // Define color palette for numbers (tailwind-inspired colors)
  const colorPalette: string[] = [
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#6366F1",
    "#F97316",
    "#8D4FEC",
  ];

  for (let i = 0; i < count; i++) {
    // Use deterministic random for consistent rendering
    const x = randomInRange(5, 95);
    const y = randomInRange(5, 95);

    // Calculate distance from center (50,50) for fading effect
    const distanceFromCenter = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
    const maxDistance = Math.sqrt(50 * 50 + 50 * 50); // maximum possible distance

    // Normalize distance (0 = center, 1 = farthest corner)
    const normalizedDistance = distanceFromCenter / maxDistance;

    // Select color deterministically from palette
    const colorIndex = Math.floor(seededRandom() * colorPalette.length);
    const color = colorPalette[colorIndex];

    // Use distance for opacity calculation (fade towards center)
    // Higher opacity for elements farther from center
    const baseOpacity = normalizedDistance * 0.8 + 0.2;

    // Generate random offset for scroll animation
    const scrollOffset: { x: number; y: number } = {
      x: (seededRandom() - 0.5) * 20,
      y: (seededRandom() - 0.5) * 20,
    };

    // Fixed numbers to display
    const numberValues: string[] = ["1", "2", "3", "44", "67", "93", "11", "68", "86", "79"];

    const numberElement: NumberElement = {
      x: x,
      y: y,
      fontSize: randomInRange(2, 6),
      baseOpacity: baseOpacity,
      color: color,
      value: numberValues[i % numberValues.length],
      scrollOffset,
      distanceFromCenter: normalizedDistance,
    };
    numbers.push(numberElement);
  }
  return numbers;
};

// Pre-calculate all the random elements
const PARTICLE_COUNT = 20;
const LINE_COUNT = 40;
const LIGHTNING_COUNT = 5;
const NUMBER_COUNT = 20;

const fixedParticles: Particle[] = generateParticles(PARTICLE_COUNT);
const fixedLines: Line[] = generateLines(fixedParticles, LINE_COUNT);
const fixedLightning: Lightning[] = generateLightning(LIGHTNING_COUNT);
const fixedNumbers: NumberElement[] = generateNumbers(NUMBER_COUNT);

export const BackgroundElements = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [contentRegions, setContentRegions] = useState<DOMRect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  
  // Only enable animations after component is mounted and find content regions
  useEffect(() => {
    setIsClient(true);
    
    // Find content regions by looking for headings and paragraphs
    if (containerRef.current) {
      const contentElements = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .content-region');
      const regions: DOMRect[] = [];
      
      contentElements.forEach(el => {
        regions.push(el.getBoundingClientRect());
      });
      
      setContentRegions(regions);
    }
    
    // Handle scroll with requestAnimationFrame for performance
    const handleScroll = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      requestRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        
        // Update content regions on scroll
        if (containerRef.current) {
          const contentElements = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .content-region');
          const regions: DOMRect[] = [];
          
          contentElements.forEach(el => {
            regions.push(el.getBoundingClientRect());
          });
          
          setContentRegions(regions);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for content regions
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Calculate current scroll percentage (0 to 1)
  const scrollPercent = typeof document !== 'undefined' 
    ? Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1) 
    : 0;
  
  // Function to calculate opacity based on proximity to content regions
  const calculateProximityOpacity = (x: number, y: number, baseOpacity: number) => {
    if (!isClient || !containerRef.current || contentRegions.length === 0) {
      return baseOpacity;
    }
    
    // Convert SVG coordinates (0-100) to viewport coordinates
    const containerRect = containerRef.current.getBoundingClientRect();
    const pixelX = (x / 100) * containerRect.width + containerRect.left;
    const pixelY = (y / 100) * containerRect.height + containerRect.top;
    
    // Check distance to each content region
    let closestDistance = Number.MAX_VALUE;
    
    contentRegions.forEach(region => {
      // Calculate distance to region edges
      const distX = Math.max(region.left - pixelX, 0, pixelX - region.right);
      const distY = Math.max(region.top - pixelY, 0, pixelY - region.bottom);
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      // Find minimum distance
      closestDistance = Math.min(closestDistance, distance);
    });
    
    // Define fade distance in pixels
    const fadeDistance = 100; // start fading when 100px away from content
    
    // Calculate proximity factor (0 = on top of content, 1 = far from content)
    const proximityFactor = Math.min(closestDistance / fadeDistance, 1);
    
    // Apply proximity to base opacity
    return baseOpacity * proximityFactor;
  };
  
  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {fixedParticles.map((particle, i) => (
              <circle
                key={`particle-${i}`}
                {...particle}
                style={isClient ? {
                  transform: `translate(${Math.sin(i) * 10}px, ${Math.cos(i) * 10}px)`,
                  transition: 'transform 8s ease-in-out'
                } : {}}
              />
            ))}
            
            {fixedLines.map((line, i) => (
              <line
                key={`line-${i}`}
                {...line}
              />
            ))}
          </svg>
        </div>

        <div className="relative pointer-events-none">
          {fixedLightning.map((item, i) => (
            <div
              key={`lightning-${i}`}
              className="lightning absolute opacity-0 pointer-events-none"
              style={{
                left: item.left,
                top: 0,
                height: '100%',
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, cyan, transparent)',
                animation: isClient ? `lightning ${item.animationDuration} ${item.animationDelay} infinite` : 'none'
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="glow-text" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="transparent" />
            
            {fixedNumbers.map((number, i) => {
              const offsetX = isClient ? number.scrollOffset.x * scrollPercent : 0;
              const offsetY = isClient ? number.scrollOffset.y * scrollPercent : 0;
              
              const currentX = number.x + (isClient ? offsetX : 0);
              const currentY = number.y + (isClient ? offsetY : 0);
              
              const scrollFactor = 1 + (scrollPercent * 0.5);
              const proximityOpacity = calculateProximityOpacity(
                currentX, 
                currentY, 
                number.baseOpacity * scrollFactor
              );
              
              const finalOpacity = Math.min(Math.max(proximityOpacity, 0), 1);
              
              return (
                <text
                  key={i}
                  x={number.x}
                  y={number.y}
                  dx={isClient ? offsetX : 0}
                  dy={isClient ? offsetY : 0}
                  fill={number.color}
                  fontSize={number.fontSize}
                  opacity={finalOpacity}
                  filter="url(#glow-text)"
                  style={{
                    transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                    pointerEvents: "none"
                  }}
                  className="select-none"
                >
                  {number.value}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="relative">
        {children}
      </div>
      
      <style jsx>{`
        .lightning {
          animation: lightning-animation 8s infinite;
        }

        @keyframes lightning-animation {
          0% { opacity: 0; }
          100% { opacity: 0; }
          50% { opacity: 0.5; }
          51% { opacity: 0.7; }
          52% { opacity: 0.5; }
          53% { opacity: 0.6; }
          54% { opacity: 0.3; }
          55% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
