import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface Pattern {
  points: Point[];
  color: string;
}

interface Point {
  x: number;
  y: number;
}

const PsychedelicPortalCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        size: 2 + Math.random() * 3
      });
    }
    
    // Initialize patterns
    const patterns: Pattern[] = [];
    for (let i = 0; i < 5; i++) {
      const points: Point[] = [];
      for (let j = 0; j < 8; j++) {
        const angle = (j / 8) * Math.PI * 2;
        points.push({
          x: Math.cos(angle) * 50,
          y: Math.sin(angle) * 50
        });
      }
      patterns.push({
        points,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`
      });
    }
    
    const drawVortex = (time: number, centerX: number, centerY: number) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.001;
        const radius = 50 + Math.sin(time * 0.002 + i) * 20;
        
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsl(${(i * 30 + time * 50) % 360}, 70%, 50%)`;
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    const drawFractalPattern = (pattern: Pattern, time: number) => {
      if (!ctx || !canvas) return;
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      const drawRecursive = (depth: number, scale: number) => {
        if (depth <= 0) return;
        
        ctx.save();
        ctx.scale(scale, scale);
        
        pattern.points.forEach((point, i) => {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = pattern.color;
          ctx.stroke();
          
          ctx.translate(point.x, point.y);
          drawRecursive(depth - 1, scale * 0.5);
          ctx.translate(-point.x, -point.y);
        });
        
        ctx.restore();
      };
      
      drawRecursive(4, 1);
      ctx.restore();
    };
    
    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw vortex
      drawVortex(time, canvas.width / 2, canvas.height / 2);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw patterns
      patterns.forEach((pattern, i) => {
        drawFractalPattern(pattern, time + i * 1000);
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: '#000' }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      flex flex-col items-center gap-4 z-10">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-full
                         transform hover:scale-110 transition-transform
                         shadow-[0_0_20px_rgba(147,51,234,0.5)]">
          Enter Portal
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg
                         transform hover:scale-105 transition-transform
                         shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          Stabilize Reality
        </button>
      </div>
    </div>
  );
};

export default PsychedelicPortalCard;