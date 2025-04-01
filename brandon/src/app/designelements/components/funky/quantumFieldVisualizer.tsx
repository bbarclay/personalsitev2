import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface FieldFluctuation {
  vertices: Point[];
  color: string;
  rotation: number;
}

interface ProbabilityCloud {
  waveFunction: Point[];
  color: string;
  amplitude: number;
}

interface Point {
  x: number;
  y: number;
}

export const QuantumFieldVisualizerCard = () => {
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
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        size: 2 + Math.random() * 3
      });
    }

    // Initialize field fluctuations
    const fluctuations: FieldFluctuation[] = [];
    for (let i = 0; i < 3; i++) {
      const vertices: Point[] = [];
      for (let j = 0; j < 6; j++) {
        const angle = (j / 6) * Math.PI * 2;
        vertices.push({
          x: Math.cos(angle) * 50,
          y: Math.sin(angle) * 50
        });
      }
      fluctuations.push({
        vertices,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`,
        rotation: Math.random() * Math.PI * 2
      });
    }

    // Initialize probability clouds
    const clouds: ProbabilityCloud[] = [];
    for (let i = 0; i < 2; i++) {
      const waveFunction: Point[] = [];
      for (let j = 0; j < 100; j++) {
        const t = j / 100;
        waveFunction.push({
          x: t * 200 - 100,
          y: Math.sin(t * Math.PI * 4) * 50
        });
      }
      clouds.push({
        waveFunction,
        color: `hsla(${Math.random() * 360}, 70%, 50%, 0.2)`,
        amplitude: 50 + Math.random() * 50
      });
    }

    const drawQuantumParticle = (particle: Particle, time: number) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Draw quantum trail
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(
        particle.x - particle.vx * 10,
        particle.y - particle.vy * 10
      );
      ctx.strokeStyle = `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`;
      ctx.stroke();
    };

    const drawFieldFluctuation = (fluctuation: FieldFluctuation, time: number) => {
      if (!ctx) return;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(fluctuation.rotation + time * 0.001);

      ctx.beginPath();
      ctx.moveTo(fluctuation.vertices[0].x, fluctuation.vertices[0].y);
      fluctuation.vertices.forEach((vertex, i) => {
        if (i === 0) return;
        ctx.lineTo(vertex.x, vertex.y);
      });
      ctx.closePath();
      ctx.strokeStyle = fluctuation.color;
      ctx.stroke();

      ctx.restore();
    };

    const drawProbabilityCloud = (cloud: ProbabilityCloud, time: number) => {
      if (!ctx || !canvas) return;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      ctx.beginPath();
      cloud.waveFunction.forEach((point, i) => {
        const y = point.y * Math.sin(time * 0.001 + i * 0.1) * cloud.amplitude / 50;
        i === 0 ? ctx.moveTo(point.x, y) : ctx.lineTo(point.x, y);
      });
      ctx.strokeStyle = cloud.color;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        particle.x = (particle.x + canvas.width) % canvas.width;
        particle.y = (particle.y + canvas.height) % canvas.height;

        drawQuantumParticle(particle, time);
      });

      // Draw field fluctuations
      fluctuations.forEach((fluctuation, i) => {
        drawFieldFluctuation(fluctuation, time + i * 1000);
      });

      // Draw probability clouds
      clouds.forEach((cloud, i) => {
        drawProbabilityCloud(cloud, time + i * 2000);
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};