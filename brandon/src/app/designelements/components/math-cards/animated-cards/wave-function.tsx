"use client";

import React, { useEffect, useRef, useState } from 'react';

export const WaveFunction = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [waveType, setWaveType] = useState('superposition');

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Parameters
    let time = 0;
    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string, amplitude: number, frequency: number, phase: number}[] = [];
    const waves: {amplitude: number, frequency: number, phase: number, color: string}[] = [];
    
    // Add waves
    waves.push({ amplitude: 50, frequency: 0.02, phase: 0, color: 'rgba(147, 51, 234, 0.8)' });  // Purple
    waves.push({ amplitude: 30, frequency: 0.04, phase: Math.PI/4, color: 'rgba(236, 72, 153, 0.8)' });  // Pink
    waves.push({ amplitude: 20, frequency: 0.06, phase: Math.PI/2, color: 'rgba(59, 130, 246, 0.8)' });  // Blue
    
    // Add quantum particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        color: `hsla(${Math.random() * 60 + 240}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`,
        amplitude: Math.random() * 10 + 5,
        frequency: Math.random() * 0.01 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // Wave function calculations
    const calculateStandingWave = (x: number, time: number) => {
      return 100 * Math.sin(0.02 * x) * Math.cos(2 * time);
    };
    
    const calculateTravelingWave = (x: number, time: number) => {
      return 80 * Math.sin(0.02 * x - 2 * time);
    };
    
    const calculateSuperposition = (x: number, time: number) => {
      let result = 0;
      waves.forEach(wave => {
        result += wave.amplitude * Math.sin(wave.frequency * x + wave.phase + time);
      });
      return result;
    };
    
    const calculateWavePacket = (x: number, time: number) => {
      const center = canvas.width / 2;
      const spread = 200;
      const envelope = Math.exp(-Math.pow(x - center - time * 50, 2) / (2 * spread * spread));
      return 100 * envelope * Math.sin(0.05 * x - 3 * time);
    };
    
    // Main animation loop
    const animate = () => {
      time += 0.05;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');  // Dark blue
      gradient.addColorStop(1, 'rgba(30, 41, 59, 1)');  // Slightly lighter blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = 0; x <= canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y <= canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw particles following wave patterns
      particles.forEach(p => {
        // Update particle position based on wave type
        const centerY = canvas.height / 2;
        let waveY = 0;
        
        if (waveType === 'standing') {
          waveY = calculateStandingWave(p.x, time);
        } else if (waveType === 'traveling') {
          waveY = calculateTravelingWave(p.x, time);
        } else if (waveType === 'superposition') {
          waveY = calculateSuperposition(p.x, time);
        } else if (waveType === 'packet') {
          waveY = calculateWavePacket(p.x, time);
        }
        
        // Attract particles toward the wave
        const targetY = centerY + waveY;
        p.vy += (targetY - p.y) * 0.01;
        
        // Apply some randomness for quantum uncertainty
        p.vx += (Math.random() - 0.5) * 0.2;
        p.vy += (Math.random() - 0.5) * 0.2;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Add damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Add glow
        const glowSize = p.size * 3;
        const glow = ctx.createRadialGradient(p.x, p.y, p.size, p.x, p.y, glowSize);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw the wave function
      ctx.beginPath();
      ctx.lineWidth = 3;
      
      const centerY = canvas.height / 2;
      
      for (let x = 0; x < canvas.width; x++) {
        let y = 0;
        
        if (waveType === 'standing') {
          y = calculateStandingWave(x, time);
        } else if (waveType === 'traveling') {
          y = calculateTravelingWave(x, time);
        } else if (waveType === 'superposition') {
          y = calculateSuperposition(x, time);
        } else if (waveType === 'packet') {
          y = calculateWavePacket(x, time);
        }
        
        if (x === 0) {
          ctx.moveTo(x, centerY + y);
        } else {
          ctx.lineTo(x, centerY + y);
        }
      }
      
      // Create gradient for wave
      const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      waveGradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)');  // Purple
      waveGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.8)'); // Pink
      waveGradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');  // Blue
      
      ctx.strokeStyle = waveGradient;
      ctx.stroke();
      
      // Add glow effect to wave
      ctx.save();
      ctx.filter = 'blur(8px)';
      ctx.strokeStyle = waveGradient;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();
      
      // Draw secondary waves if superposition
      if (waveType === 'superposition') {
        waves.forEach(wave => {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = wave.color;
          
          for (let x = 0; x < canvas.width; x++) {
            const y = wave.amplitude * Math.sin(wave.frequency * x + wave.phase + time);
            
            if (x === 0) {
              ctx.moveTo(x, centerY + y);
            } else {
              ctx.lineTo(x, centerY + y);
            }
          }
          
          ctx.stroke();
        });
      }
      
      // Add interference pattern in background for quantum effect
      if (waveType === 'superposition' || waveType === 'packet') {
        ctx.save();
        ctx.globalAlpha = 0.1;
        
        for (let x = 0; x < canvas.width; x += 20) {
          for (let y = 0; y < canvas.height; y += 20) {
            const distance = Math.sqrt(
              Math.pow(x - canvas.width / 2, 2) + 
              Math.pow(y - canvas.height / 2, 2)
            );
            
            const intensity = Math.sin(distance * 0.05 + time) * 0.5 + 0.5;
            
            ctx.fillStyle = `rgba(147, 51, 234, ${intensity * 0.2})`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        ctx.restore();
      }
      
      requestAnimationFrame(animate);
    };
    
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    
    resizeObserver.observe(container);
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [waveType]);

  const handleWaveTypeChange = (newType: string) => {
    setWaveType(newType);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(139,92,246,0.5)] border border-purple-500/30">
      <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full"></canvas>
      
      {/* Particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-purple-900/30"></div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="quantum-flash absolute opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              height: `${Math.random() * 60 + 20}px`,
              width: `${Math.random() * 60 + 20}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0) 70%)',
              animation: `quantum-flash ${3 + Math.random() * 4}s ${i * 0.7}s infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm">
        <div>
          <div className="inline-block px-4 py-1 bg-purple-600/30 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-100 text-sm font-bold mb-4 animate-pulse">
            QUANTUM MECHANICS
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-shadow-quantum">
            Wave<br/>Function
          </h2>
          
          <p className="text-purple-100 text-lg max-w-xl mb-6 leading-relaxed">
            Explore the fundamental wave-particle duality of quantum mechanics. Visualize how probability waves describe the behavior of particles in various quantum states and interference patterns.
          </p>
        </div>
        
        {/* Wave type selector */}
        <div className="flex flex-col space-y-2 mb-8">
          <div className="flex flex-wrap gap-3">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${waveType === 'superposition' 
                ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
              onClick={() => handleWaveTypeChange('superposition')}
            >
              Superposition
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${waveType === 'packet' 
                ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
              onClick={() => handleWaveTypeChange('packet')}
            >
              Wave Packet
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${waveType === 'standing' 
                ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
              onClick={() => handleWaveTypeChange('standing')}
            >
              Standing Wave
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${waveType === 'traveling' 
                ? 'bg-purple-500/50 text-white border border-purple-400/70' 
                : 'bg-purple-800/30 text-purple-200 border border-purple-600/30'}`}
              onClick={() => handleWaveTypeChange('traveling')}
            >
              Traveling Wave
            </button>
          </div>
        </div>
        
        {/* Interactive controls */}
        <div className="flex items-end justify-between">
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-purple-600/30 text-purple-100 rounded-xl font-medium hover:bg-purple-500/50 transition-all duration-300 border border-purple-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
              Probability Density
            </button>
            <button className="px-6 py-3 bg-indigo-600/30 text-indigo-100 rounded-xl font-medium hover:bg-indigo-500/50 transition-all duration-300 border border-indigo-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Collapse Function
            </button>
          </div>
          
          <div className="text-purple-200 font-mono bg-purple-600/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-purple-500/30">
            ψ(x,t) = Ae^i(kx-ωt)
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 bg-purple-600/20 backdrop-blur-sm px-4 py-2 rounded-lg text-purple-200 border border-purple-500/30 transform rotate-6 animate-float-slow">
        <div className="text-sm font-mono">
          ∂²ψ/∂x² = (1/v²)∂²ψ/∂t²
        </div>
      </div>
      <div className="absolute bottom-36 right-12 bg-indigo-600/20 backdrop-blur-sm px-4 py-2 rounded-lg text-indigo-200 border border-indigo-500/30 transform -rotate-3 animate-float-medium">
        <div className="text-sm font-mono">
          Heisenberg: ΔxΔp ≥ ħ/2
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes quantum-flash {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        
        .text-shadow-quantum {
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.8),
                       0 0 20px rgba(139, 92, 246, 0.5),
                       0 0 30px rgba(139, 92, 246, 0.3);
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}; 