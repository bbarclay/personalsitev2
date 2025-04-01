"use client";

import React, { useState, useEffect } from 'react';
import { TriangleChallenge } from '../types';

interface TriangleVisualProps {
  challenge: TriangleChallenge;
}

const TriangleVisual: React.FC<TriangleVisualProps> = ({ challenge }) => {
  const [animate, setAnimate] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Animation effect when challenge changes
  useEffect(() => {
    setAnimate(false);
    setPulseEffect(false);
    
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // Add subtle pulsing effect to draw attention to the missing angle
    const pulseTimer = setTimeout(() => {
      setPulseEffect(true);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, [challenge.id]);
  
  // Define points for different triangle types
  const getTrianglePoints = (): [number, number][] => {
    const visual = challenge.visual || 'default';
    
    switch (challenge.correctType) {
      case 'Equilateral':
        return [[150, 0], [0, 260], [300, 260]];
      
      case 'Isosceles':
        if (visual === 'beam' || visual === 'obelisk') {
          return [[150, 0], [50, 260], [250, 260]];
        }
        return [[150, 0], [0, 200], [300, 200]];
      
      case 'Right':
        if (visual === 'tool') {
          return [[0, 0], [0, 260], [260, 260]];
        }
        return [[0, 0], [0, 200], [300, 200]];
      
      case 'Scalene':
      default:
        return [[100, 0], [0, 200], [300, 160]];
    }
  };

  const points = getTrianglePoints();
  
  // Calculate angle label positions
  const getAngleLabelPositions = (): [number, number][] => {
    const [top, left, right] = points;
    
    // Top angle (A)
    const topPos: [number, number] = [top[0], top[1] - 20];
    
    // Left angle (B)
    const leftPos: [number, number] = [left[0] - 25, left[1]];
    
    // Right angle (C)
    const rightPos: [number, number] = [right[0] + 25, right[1]];
    
    return [topPos, leftPos, rightPos];
  };

  const angleLabelPositions = getAngleLabelPositions();

  // Calculate the center of the triangle for placing decorations
  const getTriangleCenter = (): [number, number] => {
    const [top, left, right] = points;
    const x = (top[0] + left[0] + right[0]) / 3;
    const y = (top[1] + left[1] + right[1]) / 3;
    return [x, y];
  };

  const center = getTriangleCenter();

  // Calculate angle arcs for visual representation
  const getAngleArcs = (): string[] => {
    const [top, left, right] = points;
    
    // Top angle arc
    const topArc = `M ${top[0] - 20},${top[1]} A 20,20 0 0,1 ${top[0]},${top[1] - 20}`;
    
    // Left angle arc
    const leftArc = `M ${left[0]},${left[1] - 20} A 20,20 0 0,1 ${left[0] + 20},${left[1]}`;
    
    // Right angle arc
    const rightArc = `M ${right[0] - 20},${right[1]} A 20,20 0 0,1 ${right[0]},${right[1] - 20}`;
    
    return [topArc, leftArc, rightArc];
  };

  const angleArcs = getAngleArcs();

  // Decorative elements based on the challenge type
  const getDecorations = () => {
    const visual = challenge.visual || 'default';
    
    switch (visual) {
      case 'base':
        return (
          <g>
            <rect 
              x="0" y="250" width="300" height="10" 
              className="fill-amber-900/30" 
            />
            <rect 
              x="0" y="260" width="300" height="5" 
              className="fill-amber-800/20" 
            />
          </g>
        );
      case 'tool':
        return (
          <g>
            <circle 
              cx={center[0]} cy={center[1]} r="5" 
              className="fill-amber-800 dark:fill-amber-400" 
            />
            <line 
              x1={center[0]} y1={center[1]} x2={center[0] + 40} y2={center[1] - 40} 
              className="stroke-amber-800 dark:stroke-amber-400 stroke-2"
              strokeDasharray="4 2" 
            />
          </g>
        );
      case 'capstone':
        return (
          <g>
            <polygon 
              points="140,0 160,0 165,10 135,10" 
              className="fill-amber-600 dark:fill-amber-500" 
            />
            <polygon 
              points="135,10 165,10 175,25 125,25" 
              className="fill-amber-700/40 dark:fill-amber-600/40" 
            />
          </g>
        );
      case 'arch':
        return (
          <path 
            d={`M 110,260 Q ${center[0]},${center[1] + 20} 190,260`} 
            className="fill-none stroke-amber-800 dark:stroke-amber-400 stroke-2" 
            strokeLinecap="round" 
          />
        );
      case 'temple':
        return (
          <g>
            <rect 
              x={points[0][0] - 30} y={points[0][1] - 20} width="60" height="20" 
              className="fill-amber-600/30 dark:fill-amber-500/30" 
            />
            <rect 
              x={points[0][0] - 25} y={points[0][1] - 30} width="50" height="10" 
              className="fill-amber-700/30 dark:fill-amber-600/30" 
            />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-[300px] h-[260px]">
      <svg 
        width="300" 
        height="260" 
        viewBox="0 0 300 260" 
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Background gradient for visual interest */}
        <defs>
          <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color-amber-300 dark:stop-color-amber-600" stopOpacity="0.7" />
            <stop offset="100%" className="stop-color-amber-500 dark:stop-color-amber-400" stopOpacity="0.7" />
          </linearGradient>
          
          {/* Filter for glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Triangle Shadow */}
        <polygon 
          points={points.map(p => `${p[0]},${p[1] + 5}`).join(' ')} 
          className={`fill-black/10 dark:fill-black/20 blur-sm transition-all duration-700 ease-in-out ${
            animate ? 'opacity-70' : 'opacity-0'
          }`}
        />
        
        {/* Triangle Shape with animation */}
        <polygon 
          points={points.map(p => p.join(',')).join(' ')} 
          className={`fill-[url(#triangleGradient)] stroke-amber-600 dark:stroke-amber-700 stroke-2 transition-all duration-700 ease-in-out transform ${
            animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        />
        
        {/* Angle Arcs */}
        {challenge.givenAngles.map((angle, i) => (
          angle !== null && (
            <path 
              key={`arc-${i}`}
              d={angleArcs[i]} 
              className={`fill-none stroke-amber-600/70 dark:stroke-amber-400/70 stroke-[1.5] transition-all duration-700 ease-in-out ${
                animate ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${800 + i * 100}ms` }}
            />
          )
        ))}
        
        {/* Right angle marker if applicable */}
        {challenge.correctType === 'Right' && (
          <path 
            d={challenge.visual === 'tool' 
              ? `M 30,260 L 30,230 L 60,230` 
              : `M 30,200 L 30,170 L 60,170`} 
            className={`fill-none stroke-amber-800 dark:stroke-amber-300 stroke-2 transition-all duration-700 ease-in-out ${
              animate ? 'opacity-100' : 'opacity-0'
            }`}
            strokeLinecap="round"
          />
        )}
        
        {/* Challenge-specific decorative elements */}
        <g className={`transition-all duration-700 ease-in-out ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}>
          {getDecorations()}
        </g>
        
        {/* Grid pattern for mathematical feel (subtle) */}
        <path 
          d="M 0,130 H 300 M 150,0 V 260" 
          className="stroke-amber-200 dark:stroke-amber-900 stroke-[0.5] opacity-30" 
          strokeDasharray="2 6" 
        />
        
        {/* Draw lines for each side of the triangle with animation */}
        <line 
          x1={points[0][0]} y1={points[0][1]} 
          x2={points[1][0]} y2={points[1][1]} 
          className="stroke-transparent" 
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line 
          x1={points[1][0]} y1={points[1][1]} 
          x2={points[2][0]} y2={points[2][1]} 
          className="stroke-transparent" 
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line 
          x1={points[2][0]} y1={points[2][1]} 
          x2={points[0][0]} y2={points[0][1]} 
          className="stroke-transparent" 
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Angle Labels */}
      {challenge.givenAngles.map((angle, i) => (
        angle !== null && (
          <div 
            key={i}
            className={`absolute font-mono text-sm font-bold bg-white/80 dark:bg-gray-800/80 px-1.5 py-0.5 rounded shadow-sm border border-amber-200 dark:border-amber-700 transition-all duration-700 transform ${
              animate 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              left: `${angleLabelPositions[i][0]}px`, 
              top: `${angleLabelPositions[i][1]}px`,
              transform: 'translate(-50%, -50%)',
              transitionDelay: `${i * 150}ms`
            }}
          >
            {angle}°
          </div>
        )
      ))}
      
      {/* Missing Angle Label with pulsing effect */}
      {challenge.givenAngles.map((angle, i) => (
        angle === null && (
          <div 
            key={i}
            className={`absolute font-mono text-lg font-bold text-amber-600 dark:text-amber-400 bg-white/80 dark:bg-gray-800/80 px-2.5 py-1 rounded-full border-2 border-amber-400 dark:border-amber-500 transition-all duration-500 transform ${
              animate 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-75 rotate-45'
            } ${
              pulseEffect ? 'animate-pulse shadow-md shadow-amber-300/30 dark:shadow-amber-400/30' : ''
            }`}
            style={{ 
              left: `${angleLabelPositions[i][0]}px`, 
              top: `${angleLabelPositions[i][1]}px`,
              transform: 'translate(-50%, -50%)',
              transitionDelay: '300ms'
            }}
          >
            ?
          </div>
        )
      ))}
      
      {/* Level indicator */}
      <div 
        className={`absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transition-all duration-500 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        {challenge.level}
      </div>
      
      {/* Challenge type indicator */}
      <div 
        className={`absolute -bottom-2 -left-2 bg-amber-100 dark:bg-amber-900/70 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full px-2 py-1 flex items-center justify-center transition-all duration-500 border border-amber-300 dark:border-amber-700 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        {challenge.correctType === 'Equilateral' && '🔺'}
        {challenge.correctType === 'Isosceles' && '📐'}
        {challenge.correctType === 'Right' && '∟'}
        {challenge.correctType === 'Scalene' && '📏'}
      </div>
    </div>
  );
};

export default TriangleVisual; 