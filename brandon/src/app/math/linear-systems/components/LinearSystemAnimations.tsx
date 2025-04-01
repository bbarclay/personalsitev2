'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedMatrixProps {
  matrix: number[][];
  constants: number[];
  isAnimating?: boolean;
}

const AnimatedMatrix: React.FC<AnimatedMatrixProps> = ({ matrix, constants, isAnimating = true }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Left bracket */}
      <motion.div 
        className="text-4xl text-blue-400 font-mono"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        [
      </motion.div>
      
      {/* Matrix entries */}
      <div className="grid gap-3" style={{ gridTemplateRows: `repeat(${matrix.length}, 1fr)` }}>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-3">
            {row.map((value, colIndex) => (
              <motion.div 
                key={`${rowIndex}-${colIndex}`}
                className="w-12 h-12 flex items-center justify-center bg-blue-500/10 backdrop-blur-sm rounded-lg text-lg font-medium border border-blue-500/20 text-blue-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: isAnimating && colIndex === rowIndex ? [1, 1.1, 1] : 1,
                  backgroundColor: isAnimating && colIndex === rowIndex ? ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.1)'] : 'rgba(59, 130, 246, 0.1)'
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * (rowIndex + colIndex),
                  repeat: isAnimating ? Infinity : 0,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
              >
                {value}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Right bracket */}
      <motion.div 
        className="text-4xl text-blue-400 font-mono"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        ]
      </motion.div>
      
      {/* Equality sign */}
      <motion.div 
        className="text-2xl text-blue-400 font-mono mx-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        =
      </motion.div>
      
      {/* Constants vector */}
      <div className="flex flex-col">
        <motion.div 
          className="text-4xl text-blue-400 font-mono"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          [
        </motion.div>
        <div className="py-2">
          {constants.map((value, index) => (
            <motion.div 
              key={index}
              className="w-12 h-12 mb-3 flex items-center justify-center bg-violet-500/10 backdrop-blur-sm rounded-lg text-lg font-medium border border-violet-500/20 text-violet-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isAnimating ? [1, 1.1, 1] : 1,
                backgroundColor: isAnimating ? ['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.1)'] : 'rgba(139, 92, 246, 0.1)'
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 * index + 0.3,
                repeat: isAnimating ? Infinity : 0,
                repeatType: "reverse",
                repeatDelay: 2.5
              }}
            >
              {value}
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-4xl text-blue-400 font-mono"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          ]
        </motion.div>
      </div>
    </div>
  );
};

interface WaveFunctionProps {
  equation: string;
  color?: string;
}

const WaveFunction: React.FC<WaveFunctionProps> = ({ equation, color = '#3b82f6' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make the canvas responsive
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Extract a, b, c from ax + by = c
    const parseEquation = (eq: string) => {
      try {
        // Remove all spaces
        const cleanEq = eq.replace(/\s+/g, '');
        
        // Split by '='
        const [leftSide, rightSide] = cleanEq.split('=');
        const c = parseFloat(rightSide.trim());
        
        // Parse coefficients
        let a = 0;
        let b = 0;
        
        // Handle terms on the left side
        const terms = leftSide.split(/(?=[\+\-])/);
        
        for (const term of terms) {
          if (term.includes('x')) {
            const coefficient = term.replace('x', '');
            a = coefficient === '' || coefficient === '+' ? 1 : 
                coefficient === '-' ? -1 : parseFloat(coefficient);
          } else if (term.includes('y')) {
            const coefficient = term.replace('y', '');
            b = coefficient === '' || coefficient === '+' ? 1 : 
                coefficient === '-' ? -1 : parseFloat(coefficient);
          }
        }
        
        return { a, b, c };
      } catch (error) {
        console.error('Error parsing equation:', error);
        return { a: 1, b: 1, c: 0 };
      }
    };
    
    const { a, b, c } = parseEquation(equation);
    
    // Animation variables
    let time = 0;
    const centerY = canvas.height / 2;
    
    const animate = () => {
      time += 0.03;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height);
      
      // Draw line representing the equation ax + by = c
      // If by = 0, we have a vertical line at x = c/a
      if (Math.abs(b) < 0.001) {
        const x = c / a;
        drawVerticalLine(ctx, x, color);
      } else {
        // Otherwise, y = (c - ax) / b
        drawLine(ctx, a, b, c, color, time);
      }
      
      // Add flowing particles along the line
      drawParticles(ctx, a, b, c, color, time);
      
      requestAnimationFrame(animate);
    };
    
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y <= height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      
      // x-axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      
      // y-axis
      const centerX = width / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();
    };
    
    const drawLine = (ctx: CanvasRenderingContext2D, a: number, b: number, c: number, color: string, time: number) => {
      const calcY = (x: number) => {
        // Transform canvas coordinates to mathematical coordinates
        const mathX = (x - canvas.width / 2) / 40; // 40 pixels per unit
        return canvas.height / 2 - ((c - a * mathX) / b) * 40; // 40 pixels per unit
      };
      
      // Create gradient for line
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, shiftColor(color, 30));
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x++) {
        const y = calcY(x);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Add glow effect
      ctx.save();
      ctx.filter = 'blur(5px)';
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();
      
      // Draw equation label
      ctx.save();
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(equation, canvas.width / 2, 30);
      ctx.restore();
    };
    
    const drawVerticalLine = (ctx: CanvasRenderingContext2D, x: number, color: string) => {
      // Transform mathematical x to canvas x
      const canvasX = canvas.width / 2 + x * 40; // 40 pixels per unit
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, canvas.height);
      ctx.stroke();
      
      // Add glow effect
      ctx.save();
      ctx.filter = 'blur(5px)';
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();
      
      // Draw equation label
      ctx.save();
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(equation, canvas.width / 2, 30);
      ctx.restore();
    };
    
    const drawParticles = (ctx: CanvasRenderingContext2D, a: number, b: number, c: number, color: string, time: number) => {
      // For a vertical line
      if (Math.abs(b) < 0.001) {
        const canvasX = canvas.width / 2 + (c / a) * 40; // 40 pixels per unit
        
        for (let i = 0; i < 10; i++) {
          const t = (time + i * 0.1) % 1;
          const y = t * canvas.height;
          
          const particleSize = 4 + Math.sin(time * 3 + i) * 2;
          
          ctx.beginPath();
          ctx.arc(canvasX, y, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          
          // Add glow
          ctx.beginPath();
          ctx.arc(canvasX, y, particleSize * 2, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(canvasX, y, particleSize, canvasX, y, particleSize * 2);
          glow.addColorStop(0, color);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }
      } else {
        // For a regular line
        const calcY = (x: number) => {
          // Transform canvas coordinates to mathematical coordinates
          const mathX = (x - canvas.width / 2) / 40; // 40 pixels per unit
          return canvas.height / 2 - ((c - a * mathX) / b) * 40; // 40 pixels per unit
        };
        
        for (let i = 0; i < 15; i++) {
          const t = (time * 0.5 + i * 0.07) % 1;
          const x = t * canvas.width;
          const y = calcY(x);
          
          const particleSize = 3 + Math.sin(time * 3 + i) * 1.5;
          
          ctx.beginPath();
          ctx.arc(x, y, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          
          // Add glow
          ctx.beginPath();
          ctx.arc(x, y, particleSize * 2, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(x, y, particleSize, x, y, particleSize * 2);
          glow.addColorStop(0, color);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }
    };
    
    // Helper function to shift color hue
    const shiftColor = (hex: string, amount: number) => {
      // Convert hex to RGB
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      
      // Convert RGB to HSL
      r /= 255;
      g /= 255;
      b /= 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        
        h /= 6;
      }
      
      // Shift hue and convert back
      h = (h * 360 + amount) % 360 / 360;
      
      // Convert HSL back to RGB
      let r1, g1, b1;
      
      if (s === 0) {
        r1 = g1 = b1 = l; // achromatic
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r1 = hue2rgb(p, q, h + 1/3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1/3);
      }
      
      // Convert RGB back to hex
      const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [equation, color]);
  
  return (
    <div className="w-full h-full min-h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

interface IntersectionPointProps {
  point: { x: number; y: number; z?: number };
}

const IntersectionPoint: React.FC<IntersectionPointProps> = ({ point }) => {
  return (
    <motion.div 
      className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-10 shadow-lg flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.2, 1],
        opacity: 1,
      }}
      transition={{ 
        duration: 1.5,
        ease: "easeOut"
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-30"
        animate={{ 
          scale: [1, 1.5, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="text-center text-white font-bold">
        <div className="text-xl mb-1">Solution</div>
        <div className="text-lg">
          {Object.entries(point).map(([key, value]) => (
            <div key={key} className="flex justify-center items-center">
              <span className="text-purple-200 mr-2">{key} =</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {typeof value === 'number' ? value.toFixed(2) : value}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const LinearSystemAnimations = {
  AnimatedMatrix,
  WaveFunction,
  IntersectionPoint,
}; 