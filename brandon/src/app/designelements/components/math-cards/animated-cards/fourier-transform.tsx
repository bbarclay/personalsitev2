"use client";

import React, { useEffect, useRef, useState } from 'react';

export const FourierTransform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [complexity, setComplexity] = useState(5);
  const [waveType, setWaveType] = useState('combined');
  const [isDrawing, setIsDrawing] = useState(false);
  const [userPath, setUserPath] = useState<{x: number, y: number}[]>([]);

  // Animation variables
  const [time, setTime] = useState(0);
  
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
    let animationTime = time;
    const waves: {amplitude: number, frequency: number, phase: number}[] = [];
    const epicycles: {amplitude: number, frequency: number, phase: number}[] = [];
    const transformPoints: {x: number, y: number}[] = [];
    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string}[] = [];
    
    // Generate wave parameters
    for (let i = 1; i <= complexity; i++) {
      const isOdd = i % 2 === 1;
      if (isOdd || waveType === 'combined') {
        waves.push({
          amplitude: 50 * (1 / i), // Decreasing amplitude for higher harmonics
          frequency: i,
          phase: Math.PI / (Math.random() * 4 + 1) // Random phase
        });
      }
      
      // Epicycles for the path drawing
      epicycles.push({
        amplitude: 50 / (i * 1.5),
        frequency: i,
        phase: Math.PI / (i * 0.7)
      });
    }
    
    // Add background particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        color: `hsla(${Math.random() * 60 + 45}, 100%, 70%, ${Math.random() * 0.5 + 0.2})`
      });
    }
    
    // Calculate Fourier series
    const calculateFourierSeries = (x: number) => {
      let result = 0;
      for (const wave of waves) {
        result += wave.amplitude * Math.sin(wave.frequency * x + wave.phase + animationTime);
      }
      return result;
    };
    
    // Calculate epicycle position
    const calculateEpicycle = (x: number, y: number, time: number) => {
      let resultX = x;
      let resultY = y;
      
      for (const epicycle of epicycles) {
        resultX += epicycle.amplitude * Math.cos(epicycle.frequency * time + epicycle.phase);
        resultY += epicycle.amplitude * Math.sin(epicycle.frequency * time + epicycle.phase);
        
        time += Math.PI / 6; // Phase offset for interesting patterns
      }
      
      return { x: resultX, y: resultY };
    };
    
    // Draw wave form
    const drawWaveForm = () => {
      const centerY = canvas.height / 2;
      const startX = 100;
      const width = canvas.width - 200;
      
      // Draw individual wave components
      if (waveType === 'separate') {
        waves.forEach((wave, index) => {
          const offsetY = 30 * index;
          
          ctx.beginPath();
          ctx.moveTo(startX, centerY + offsetY);
          
          for (let i = 0; i <= width; i++) {
            const x = startX + i;
            const normalizedX = (i / width) * Math.PI * 4;
            const y = centerY + offsetY + wave.amplitude * Math.sin(wave.frequency * normalizedX + wave.phase + animationTime);
            
            ctx.lineTo(x, y);
          }
          
          const hue = (index * 30 + animationTime * 10) % 360;
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.6)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }
      
      // Draw the combined wave
      ctx.beginPath();
      ctx.moveTo(startX, centerY);
      
      for (let i = 0; i <= width; i++) {
        const x = startX + i;
        const normalizedX = (i / width) * Math.PI * 4;
        const y = centerY + calculateFourierSeries(normalizedX);
        
        ctx.lineTo(x, y);
        
        // Collect points for transform visualization
        if (i % 10 === 0) {
          transformPoints.push({ x, y });
        }
      }
      
      // Create gradient for the main wave
      const gradient = ctx.createLinearGradient(startX, 0, startX + width, 0);
      gradient.addColorStop(0, 'rgba(234, 179, 8, 0.8)');     // Yellow
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.8)');  // Amber
      gradient.addColorStop(1, 'rgba(249, 115, 22, 0.8)');    // Orange
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Add glow effect
      ctx.save();
      ctx.filter = 'blur(8px)';
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.restore();
    };
    
    // Draw frequency domain (spectrum)
    const drawFrequencyDomain = () => {
      const startX = 100;
      const width = canvas.width - 200;
      const bottomY = canvas.height - 100;
      const barHeight = 120;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(startX, bottomY - barHeight, width, barHeight);
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(startX, bottomY - barHeight, width, barHeight);
      
      // Draw axis labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '14px monospace';
      ctx.fillText('Frequency Domain', startX, bottomY - barHeight - 10);
      ctx.fillText('Amplitude', startX - 80, bottomY - barHeight / 2);
      ctx.fillText('Frequency', startX + width / 2, bottomY + 30);
      
      // Draw frequency bars
      const barWidth = width / (complexity * 2);
      
      for (const wave of waves) {
        const x = startX + (wave.frequency - 1) * barWidth * 2;
        const height = wave.amplitude * 1.5;
        const hue = (wave.frequency * 30 + animationTime * 10) % 360;
        
        // Draw bar
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.8)`;
        ctx.fillRect(
          x, 
          bottomY - height, 
          barWidth, 
          height
        );
        
        // Add glow
        ctx.save();
        ctx.filter = 'blur(4px)';
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.5)`;
        ctx.fillRect(
          x - 2, 
          bottomY - height - 2, 
          barWidth + 4, 
          height + 4
        );
        ctx.restore();
        
        // Draw frequency number
        ctx.fillStyle = 'white';
        ctx.font = '12px monospace';
        ctx.fillText(`${wave.frequency}`, x + barWidth / 2 - 5, bottomY + 15);
      }
    };
    
    // Draw epicycles for circular motion representation
    const drawEpicycles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const path: {x: number, y: number}[] = [];
      
      let prevX = centerX - 300;
      let prevY = centerY;
      
      // Draw the main circle
      ctx.beginPath();
      ctx.arc(prevX, prevY, 60, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw each epicycle
      for (let i = 0; i < epicycles.length; i++) {
        const epicycle = epicycles[i];
        
        // Calculate the position of this epicycle
        const angle = epicycle.frequency * animationTime + epicycle.phase;
        const x = prevX + epicycle.amplitude * Math.cos(angle);
        const y = prevY + epicycle.amplitude * Math.sin(angle);
        
        // Draw circle for this epicycle
        ctx.beginPath();
        ctx.arc(prevX, prevY, epicycle.amplitude, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 - i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw line connecting to the next point
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw point at the epicycle position
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        const hue = (i * 30 + animationTime * 10) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.8)`;
        ctx.fill();
        
        // Update for next epicycle
        prevX = x;
        prevY = y;
      }
      
      // Add the current point to the path
      path.push({ x: prevX, y: prevY });
      
      // Draw horizontal line to the wave form
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(prevX + 250, prevY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();
      
      // Draw vertical line to the wave form
      for (let i = 0; i < transformPoints.length; i++) {
        const point = transformPoints[i];
        if (Math.abs(point.x - (prevX + 250)) < 5) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x, prevY);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.stroke();
          break;
        }
      }
      
      return path;
    };
    
    // Draw user-defined path if available
    const drawUserPath = () => {
      if (userPath.length === 0) return;
      
      ctx.beginPath();
      ctx.moveTo(userPath[0].x, userPath[0].y);
      
      for (let i = 1; i < userPath.length; i++) {
        ctx.lineTo(userPath[i].x, userPath[i].y);
      }
      
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add glow effect
      ctx.save();
      ctx.filter = 'blur(5px)';
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.restore();
    };
    
    // Update and draw particles
    const updateParticles = () => {
      particles.forEach(p => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
    };
    
    // Main draw function
    const draw = () => {
      // Clear canvas with dark gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgba(20, 20, 30, 1)');
      bgGradient.addColorStop(1, 'rgba(30, 30, 50, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      updateParticles();
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Vertical grid
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal grid
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw main components
      drawWaveForm();
      drawFrequencyDomain();
      
      // Draw epicycles or user path
      if (userPath.length > 0) {
        drawUserPath();
      } else {
        drawEpicycles();
      }
      
      // Update animation time
      animationTime += 0.02;
      setTime(animationTime);
    };
    
    // Animation loop
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    
    resizeObserver.observe(container);
    const animationId = requestAnimationFrame(animate);
    
    // Set up drawing handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (!isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Start a new path
        setUserPath([{ x, y }]);
        setIsDrawing(true);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add point to path
        setUserPath(prev => [...prev, { x, y }]);
      }
    };
    
    const handleMouseUp = () => {
      setIsDrawing(false);
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      
      // Clean up event listeners
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [complexity, waveType, isDrawing, userPath, time]);
  
  // Clear the user-drawn path
  const clearPath = () => {
    setUserPath([]);
  };
  
  // Handle complexity change
  const handleComplexityChange = (value: number) => {
    setComplexity(Math.max(1, Math.min(20, value)));
  };
  
  // Handle wave type change
  const handleWaveTypeChange = (type: string) => {
    setWaveType(type);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.5)] border border-yellow-500/30">
      <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full"></canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-transparent to-amber-900/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm">
        <div>
          <div className="inline-block px-4 py-1 bg-amber-600/30 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-100 text-sm font-bold mb-4 animate-pulse">
            SIGNAL PROCESSING
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-shadow-fourier">
            Fourier<br/>Transform
          </h2>
          
          <p className="text-amber-100 text-lg max-w-xl mb-6 leading-relaxed">
            Visualize how complex waves can be broken down into simple sine waves. The Fourier transform reveals the frequency components hidden within any signal or pattern.
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col space-y-4">
          {/* Wave type selector */}
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-amber-200 font-medium">VISUALIZATION TYPE</div>
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${waveType === 'combined' 
                  ? 'bg-amber-500/50 text-white border border-amber-400/70' 
                  : 'bg-amber-800/30 text-amber-200 border border-amber-600/30'}`}
                onClick={() => handleWaveTypeChange('combined')}
              >
                Combined Wave
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${waveType === 'separate' 
                  ? 'bg-amber-500/50 text-white border border-amber-400/70' 
                  : 'bg-amber-800/30 text-amber-200 border border-amber-600/30'}`}
                onClick={() => handleWaveTypeChange('separate')}
              >
                Individual Harmonics
              </button>
            </div>
          </div>
          
          {/* Complexity slider */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-amber-200 font-medium">HARMONICS: {complexity}</div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="w-8 h-8 flex items-center justify-center bg-amber-600/30 text-amber-100 rounded-lg hover:bg-amber-500/50 transition-all duration-300 border border-amber-500/30"
                onClick={() => handleComplexityChange(complexity - 1)}
              >
                -
              </button>
              <div className="flex-1 h-2 bg-amber-800/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                  style={{ width: `${(complexity / 20) * 100}%` }}
                ></div>
              </div>
              <button 
                className="w-8 h-8 flex items-center justify-center bg-amber-600/30 text-amber-100 rounded-lg hover:bg-amber-500/50 transition-all duration-300 border border-amber-500/30"
                onClick={() => handleComplexityChange(complexity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Drawing tools */}
          <div className="flex flex-wrap items-end justify-between">
            <button 
              className="px-6 py-3 bg-amber-600/30 text-amber-100 rounded-xl font-medium hover:bg-amber-500/50 transition-all duration-300 border border-amber-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2"
              onClick={clearPath}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Drawing
            </button>
            
            <div className="text-amber-200 font-mono bg-amber-700/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-amber-500/30">
              f(t) = Σ a<sub>n</sub> sin(nωt + φ<sub>n</sub>)
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 bg-amber-600/20 backdrop-blur-sm px-4 py-2 rounded-lg text-amber-200 border border-amber-500/30 transform rotate-6 animate-float-slow">
        <div className="text-sm font-mono">
          Draw your own waveform!
        </div>
      </div>
      <div className="absolute bottom-36 right-12 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-lg text-yellow-200 border border-yellow-500/30 transform -rotate-3 animate-float-medium">
        <div className="text-sm font-mono">
          Time ↔ Frequency domains
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        
        .text-shadow-fourier {
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.8),
                       0 0 20px rgba(234, 179, 8, 0.5),
                       0 0 30px rgba(234, 179, 8, 0.3);
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