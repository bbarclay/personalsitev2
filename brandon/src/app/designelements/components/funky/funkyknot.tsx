import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  energy?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  targetPoint: number;
}

interface Arc {
  start: number;
  end: number;
  intensity: number;
  segments: Point[];
}

interface Rune {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  symbol: string;
}

const FunkyKnot: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number>(0);
  const knotPointsRef = useRef<Point[]>([]);
  const quantumParticlesRef = useRef<Particle[]>([]);
  const holoRunesRef = useRef<Rune[]>([]);
  const lightningArcsRef = useRef<Arc[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let knotPoints: Point[];
    let quantumParticles: Particle[];
    let holoRunes: Rune[];
    let lightningArcs: Arc[];

    const initKnot = () => {
      knotPoints = [];
      for (let i = 0; i < 5; i++) {
        knotPoints.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
      }
      knotPointsRef.current = knotPoints;
    };

    const initQuantumParticles = () => {
      quantumParticles = [];
      for (let i = 0; i < 3; i++) {
        quantumParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 5 + Math.random() * 5,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          targetPoint: Math.floor(Math.random() * 5),
        });
      }
      quantumParticlesRef.current = quantumParticles;
    };

    const initHoloRunes = () => {
      holoRunes = [];
      const symbols = ['λ', 'Ψ', 'Ω', 'Ϟ'];
      for (let i = 0; i < 4; i++) {
        holoRunes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          rotation: Math.random() * Math.PI * 2,
          scale: 0.5 + Math.random() * 0.5,
          symbol: symbols[i % symbols.length],
        });
      }
      holoRunesRef.current = holoRunes;
    };

    const generateArcSegments = (): Point[] => {
      const segments: Point[] = [];
      return segments;
    };

    const initLightningArcs = () => {
      lightningArcs = [];
      for (let i = 0; i < 2; i++) {
        const segments: Point[] = [];
        for (let j = 0; j < 5; j++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          segments.push({ x, y });
        }
        lightningArcs.push({
          start: Math.floor(Math.random() * 5),
          end: Math.floor(Math.random() * 5),
          intensity: Math.random(),
          segments: segments,
        });
      }
      lightningArcsRef.current = lightningArcs;
    };

    initKnot();
    initQuantumParticles();
    initHoloRunes();
    initLightningArcs();

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, '#111');
      gradient.addColorStop(1, '#000');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsating circles
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${(time * 0.02 + i * 120) % 360}, 70%, 60%, 0.1)`;
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        const x = canvas.width / 2 + Math.cos(time * 0.001 + i) * 100;
        const y = canvas.height / 2 + Math.sin(time * 0.001 + i) * 100;
        ctx.arc(x, y, 80 + Math.sin(time * 0.002 + i) * 20, 0, Math.PI * 2);
        ctx.fill();
      }

      quantumParticlesRef.current.forEach(particle => {
        const targetPoint = knotPointsRef.current[particle.targetPoint];
        const dx = targetPoint.x - particle.x;
        const dy = targetPoint.y - particle.y;
        const angle = Math.atan2(dy, dx);
        const speed = 2;
        particle.x += Math.cos(angle) * speed;
        particle.y += Math.sin(angle) * speed;

        const x = particle.x;
        const y = particle.y;

        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      knotPointsRef.current.forEach((point, i) => {
        point.energy = Math.sin(time * 0.005 + i) * 0.5 + 0.5;
        const nextPoint = knotPointsRef.current[(i + 1) % knotPointsRef.current.length];

        // Draw lines connecting knot points
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
        gradient.addColorStop(0, `hsl(${(time * 0.01 + i * 60) % 360}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${(time * 0.01 + i * 60 + 60) % 360}, 100%, 50%)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8 + point.energy * 4;
        ctx.shadowColor = 'white'; // gradient; // This line was causing an error
        ctx.shadowBlur = 20 * point.energy;

        const cp1x = point.x + Math.cos(time * 0.003 + i) * 50;
        const cp1y = point.y + Math.sin(time * 0.003 + i) * 50;
        const cp2x = nextPoint.x - Math.cos(time * 0.003 + i) * 50;
        const cp2y = nextPoint.y - Math.sin(time * 0.003 + i) * 50;

        ctx.moveTo(point.x, point.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.x, nextPoint.y);
        ctx.stroke();
      });

      lightningArcsRef.current.forEach(arc => {
        const start = knotPointsRef.current[arc.start];
        const end = knotPointsRef.current[arc.end];

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${arc.intensity * 0.8})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10;

        arc.segments.forEach((point: Point, i: number) => {
          i === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      });

      holoRunesRef.current.forEach(rune => {
        ctx.save();
        ctx.translate(rune.x, rune.y);
        ctx.rotate(rune.rotation + time * 0.001);
        ctx.scale(rune.scale, rune.scale);

        const glowIntensity = Math.sin(time * 0.005) * 0.5 + 0.5;
        const floatOffset = Math.sin(time * 0.002) * 10;

        ctx.font = '20px Arial';
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + glowIntensity * 0.7})`;
        ctx.shadowColor = 'cyan';
        ctx.shadowBlur = 10 + glowIntensity * 10;
        ctx.fillText(rune.symbol, 0, floatOffset);

        ctx.restore();
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full"
    />
  );
};

export default FunkyKnot;
