import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  pulse: number;
}

export const CyberneticPulseCard = () => {
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
    const particles: Point[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.5)`,
        size: 2 + Math.random() * 3,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const updateParticle = (particle: Point, time: number) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update pulse
      particle.pulse += 0.02;
      if (particle.pulse > Math.PI * 2) {
        particle.pulse = 0;
      }

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const drawParticle = (particle: Point, time: number) => {
      if (!ctx) return;

      const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;
      const pulseOpacity = 0.5 + Math.sin(particle.pulse) * 0.5;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('0.5', pulseOpacity.toString());
      ctx.fill();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        updateParticle(particle, time);
        drawParticle(particle, time);
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
    <div ref={containerRef} className="w-full h-full relative">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
      />
    </div>
  );
};