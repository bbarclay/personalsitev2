import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Attractor {
  x: number;
  y: number;
  strength: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export const ChaosTheoryCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

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

    // Initialize attractors
    const attractors: Attractor[] = [];
    for (let i = 0; i < 3; i++) {
      attractors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        strength: 0.5 + Math.random() * 0.5,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.5)`,
        size: 2 + Math.random() * 3
      });
    }

    const updateParticle = (particle: Particle, time: number) => {
      // Apply attractor forces
      attractors.forEach(attractor => {
        const dx = attractor.x - particle.x;
        const dy = attractor.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = attractor.strength / (distance * distance);
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      });

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const drawAttractor = (attractor: Attractor, time: number) => {
      if (!ctx) return;

      const pulse = 1 + Math.sin(time * 0.001) * 0.2;
      ctx.beginPath();
      ctx.arc(attractor.x, attractor.y, 10 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = attractor.color;
      ctx.fill();
    };

    const drawParticle = (particle: Particle) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw attractors
      attractors.forEach(attractor => {
        attractor.x += Math.sin(time * 0.001) * 2;
        attractor.y += Math.cos(time * 0.001) * 2;
        drawAttractor(attractor, time);
      });

      // Update and draw particles
      particles.forEach(particle => {
        updateParticle(particle, time);
        drawParticle(particle);
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
