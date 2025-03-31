'use client';

import React, { useEffect, useRef } from 'react';

const BioLuminescentOrbCard = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      ctxRef.current = ctx;

      const creatures = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 8,
        speed: 0.5 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        turnRate: (Math.random() - 0.5) * 0.1,
        color: `hsl(${120 + Math.random() * 60}, 100%, 70%)`,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 2,
        tentacles: Array.from({ length: 5 }, () => ({
          length: 10 + Math.random() * 20,
          angle: Math.random() * Math.PI * 2,
          waveSpeed: 0.02 + Math.random() * 0.04
        }))
      }));

      const energyFlows = Array.from({ length: 20 }, () => ({
        points: Array.from({ length: 50 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          angle: Math.random() * Math.PI * 2
        })),
        color: `hsl(${140 + Math.random() * 40}, 100%, 60%)`,
        width: 1 + Math.random() * 3,
        speed: 0.2 + Math.random() * 0.5,
        frequency: 0.02 + Math.random() * 0.03
      }));

      const sporeClusters = Array.from({ length: 10 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        spores: Array.from({ length: 20 }, () => ({
          angle: Math.random() * Math.PI * 2,
          distance: Math.random() * 50,
          size: 1 + Math.random() * 3,
          pulsePhase: Math.random() * Math.PI * 2
        })),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: `hsl(${160 + Math.random() * 40}, 100%, 70%)`
      }));

      const drawCreature = (creature: any, time: number) => {
        ctx.save();
        ctx.translate(creature.x, creature.y);
        ctx.rotate(creature.angle);

        creature.tentacles.forEach((tentacle: any) => {
          ctx.beginPath();
          for (let i = 0; i < tentacle.length; i++) {
            const segment = i / tentacle.length;
            const waveOffset = Math.sin(time * tentacle.waveSpeed + segment * Math.PI * 2) * 5;
            const x = i * 2;
            const y = waveOffset * segment;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = creature.color.replace('70%', '50%');
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        const pulseScale = 1 + Math.sin(time * 0.001 + creature.pulsePhase) * 0.2;
        ctx.beginPath();
        ctx.arc(0, 0, creature.size * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = creature.color;
        ctx.fill();

        ctx.restore();
      };

      const drawEnergyFlow = (flow: any, time: number) => {
        ctx.beginPath();
        flow.points.forEach((point: any, i: number) => {
          point.angle += flow.speed * (Math.sin(time * 0.001 + i * 0.1) * 0.5 + 0.5);
          point.x += Math.cos(point.angle) * flow.speed;
          point.y += Math.sin(point.angle) * flow.speed;

          point.x = (point.x + canvas.width) % canvas.width;
          point.y = (point.y + canvas.height) % canvas.height;

          const wave = Math.sin(time * flow.frequency + i * 0.2) * 10;
          i === 0 ? ctx.moveTo(point.x + wave, point.y) : ctx.lineTo(point.x + wave, point.y);
        });

        ctx.strokeStyle = flow.color;
        ctx.lineWidth = flow.width;
        ctx.stroke();
      };

      const drawSporeCluster = (cluster: any, time: number) => {
        ctx.save();
        ctx.translate(cluster.x, cluster.y);
        ctx.rotate(cluster.rotation + time * cluster.rotationSpeed);

        cluster.spores.forEach((spore: any) => {
          const pulse = Math.sin(time * 0.002 + spore.pulsePhase) * 0.3 + 0.7;
          const x = Math.cos(spore.angle) * spore.distance;
          const y = Math.sin(spore.angle) * spore.distance;

          ctx.beginPath();
          ctx.arc(x, y, spore.size * pulse, 0, Math.PI * 2);
          ctx.fillStyle = cluster.color;
          ctx.fill();
        });

        ctx.restore();
      };

      const animate = (time: number) => {
        ctx.fillStyle = 'rgba(0, 10, 20, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        creatures.forEach((creature: any) => {
          creature.angle += creature.turnRate;
          creature.x += Math.cos(creature.angle) * creature.speed;
          creature.y += Math.sin(creature.angle) * creature.speed;

          creature.x = (creature.x + canvas.width) % canvas.width;
          creature.y = (creature.y + canvas.height) % canvas.height;

          drawCreature(creature, time);
        });

        energyFlows.forEach((flow: any) => drawEnergyFlow(flow, time));
        sporeClusters.forEach((cluster: any) => drawSporeCluster(cluster, time));

        animationFrameId = requestAnimationFrame(animate);
      };

      animate(0);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  const handleClusterClick = () => {
    // Logic for cluster click
  };

  const handleSporeClick = () => {
    // Logic for spore click
  };

  const handleTimeWarp = (time: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const renderTimeWarpButtons = () => (
    <>
      <button onClick={() => handleTimeWarp(1)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
        Time Warp +
      </button>
      <button onClick={() => handleTimeWarp(-1)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
        Time Warp -
      </button>
      <button onClick={() => handleTimeWarp(0)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
        Reset
      </button>
    </>
  );

  return (






    <div ref={containerRef} className="relative w-full h-full min-h-[400px] overflow-hidden bg-gradient-to-br from-green-900 to-blue-900">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">




        <button className="px-8 py-4 bg-transparent border-2 border-green-400 text-green-400 rounded-full backdrop-blur-sm hover:bg-green-400/20 transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
          Harmonize
        </button>
        <div className="flex gap-4">


          <button onClick={handleClusterClick} className="px-4 py-2 bg-teal-500/20 border border-teal-400 text-teal-400 rounded-full hover:bg-teal-400/30 transition-colors">
            Nurture
          </button>


          <button onClick={handleSporeClick} className="px-4 py-2 bg-emerald-500/20 border border-emerald-400 text-emerald-400 rounded-full hover:bg-emerald-400/30 transition-colors">
            Bloom
          </button>









          {renderTimeWarpButtons()}
        </div>
      </div>
    </div>
  );

};
export default BioLuminescentOrbCard;