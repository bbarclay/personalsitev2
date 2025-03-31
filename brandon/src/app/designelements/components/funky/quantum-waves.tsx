import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Wave {
  x: number;
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
  speed: number;
}

interface InterferencePattern {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export const QuantumWavesCard = () => {
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

    // Initialize waves
    const waves: Wave[] = [];
    for (let i = 0; i < 3; i++) {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        amplitude: 20 + Math.random() * 30,
        frequency: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`,
        speed: 0.5 + Math.random() * 0.5
      });
    }

    // Initialize interference patterns
    const patterns: InterferencePattern[] = [];
    for (let i = 0; i < 5; i++) {
      patterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 50 + Math.random() * 100,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.2)`,
        rotation: Math.random() * Math.PI * 2
      });
    }

    const drawWave = (wave: Wave, time: number) => {
      if (!ctx || !canvas) return;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawInterferencePattern = (pattern: InterferencePattern, time: number) => {
      if (!ctx) return;

      ctx.save();
      ctx.translate(pattern.x, pattern.y);
      ctx.rotate(pattern.rotation + time * 0.001);

      const pulse = 1 + Math.sin(time * 0.001) * 0.2;
      const size = pattern.size * pulse;

      // Draw concentric circles
      for (let i = 0; i < 5; i++) {
        const radius = size * (i + 1) / 5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = pattern.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw interference lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(angle) * size,
          Math.sin(angle) * size
        );
        ctx.strokeStyle = pattern.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw interference patterns
      patterns.forEach(pattern => {
        drawInterferencePattern(pattern, time);
      });

      // Draw waves
      waves.forEach(wave => {
        drawWave(wave, time);
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