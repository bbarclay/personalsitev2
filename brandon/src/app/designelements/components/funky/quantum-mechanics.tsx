import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface QuantumParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  phase: number;
}

interface WaveFunction {
  x: number;
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
}

export const QuantumMechanicsCard = () => {
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

    // Initialize quantum particles
    const particles: QuantumParticle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.5)`,
        size: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Initialize wave functions
    const waveFunctions: WaveFunction[] = [];
    for (let i = 0; i < 3; i++) {
      waveFunctions.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        amplitude: 20 + Math.random() * 30,
        frequency: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`
      });
    }

    const updateParticle = (particle: QuantumParticle, time: number) => {
      // Update position with quantum uncertainty
      particle.x += particle.vx + Math.sin(time * 0.001 + particle.phase) * 0.5;
      particle.y += particle.vy + Math.cos(time * 0.001 + particle.phase) * 0.5;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const drawWaveFunction = (wave: WaveFunction, time: number) => {
      if (!ctx || !canvas) return;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = wave.y + Math.sin(x * wave.frequency + time * 0.001 + wave.phase) * wave.amplitude;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawParticle = (particle: QuantumParticle, time: number) => {
      if (!ctx) return;

      const pulse = 1 + Math.sin(time * 0.001 + particle.phase) * 0.2;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw wave functions
      waveFunctions.forEach(wave => {
        drawWaveFunction(wave, time);
      });

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