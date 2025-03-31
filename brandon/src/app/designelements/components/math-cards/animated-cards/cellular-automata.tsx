"use client";

import React, { useEffect, useRef, useState } from 'react';

export const CellularAutomata = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rule, setRule] = useState(30);
  const [cellSize, setCellSize] = useState(6);
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [randomizeStart, setRandomizeStart] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Game of Life parameters
    let grid: number[][] = [];
    let nextGrid: number[][] = [];
    let currentRow = 0;
    let time = 0;
    
    // Initialize grid for Elementary Cellular Automata
    const initializeGrid = () => {
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);
      
      grid = Array(rows).fill(0).map(() => Array(cols).fill(0));
      nextGrid = Array(rows).fill(0).map(() => Array(cols).fill(0));
      
      // Initialize first row
      if (randomizeStart) {
        // Random initialization
        for (let i = 0; i < cols; i++) {
          grid[0][i] = Math.random() > 0.5 ? 1 : 0;
        }
      } else {
        // Single cell in the middle
        const middle = Math.floor(cols / 2);
        grid[0][middle] = 1;
      }
      
      currentRow = 1;
    };
    
    // Apply elementary cellular automaton rule
    const applyRule = (left: number, center: number, right: number) => {
      const ruleIndex = 7 - (left * 4 + center * 2 + right);
      return (rule & (1 << ruleIndex)) > 0 ? 1 : 0;
    };
    
    // Update grid based on elementary cellular automaton rules
    const updateGrid = () => {
      if (currentRow >= grid.length) return;
      
      const cols = grid[0].length;
      
      for (let x = 0; x < cols; x++) {
        const left = grid[currentRow - 1][(x - 1 + cols) % cols];
        const center = grid[currentRow - 1][x];
        const right = grid[currentRow - 1][(x + 1) % cols];
        
        grid[currentRow][x] = applyRule(left, center, right);
      }
      
      currentRow++;
      
      // If we reach the bottom of the grid, start again
      if (currentRow >= grid.length) {
        initializeGrid();
      }
    };
    
    // Draw the grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(20, 30, 48, 1)');    // Dark blue
      gradient.addColorStop(1, 'rgba(30, 41, 59, 1)');    // Slightly lighter blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw cells
      const rows = grid.length;
      const cols = grid[0].length;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y][x] === 1) {
            // Create dynamic coloring based on position and time
            const hue = (y * 2 + time * 5) % 360;
            ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.9)`;
            
            // Draw cell with slight glow
            ctx.beginPath();
            ctx.rect(
              x * cellSize, 
              y * cellSize, 
              cellSize, 
              cellSize
            );
            ctx.fill();
            
            // Add glow effect
            ctx.save();
            ctx.filter = 'blur(4px)';
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.rect(
              x * cellSize - 2, 
              y * cellSize - 2, 
              cellSize + 4, 
              cellSize + 4
            );
            ctx.fill();
            ctx.restore();
          }
        }
      }
      
      // Draw rule binary representation
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px monospace';
      const binaryRule = rule.toString(2).padStart(8, '0');
      
      // Draw rule patterns
      const patternSize = 10;
      const startX = canvas.width - 250;
      const startY = 50;
      
      for (let i = 0; i < 8; i++) {
        const y = startY + i * (patternSize * 3 + 10);
        
        // Draw pattern combination (3 cells showing 111, 110, etc.)
        for (let j = 0; j < 3; j++) {
          const state = (i >> (2 - j)) & 1;
          ctx.fillStyle = state ? 'rgba(236, 72, 153, 0.8)' : 'rgba(203, 213, 225, 0.3)';
          ctx.beginPath();
          ctx.rect(startX + j * patternSize, y, patternSize, patternSize);
          ctx.fill();
        }
        
        // Draw arrow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(startX + 40, y + patternSize / 2);
        ctx.lineTo(startX + 50, y + patternSize / 2);
        ctx.lineTo(startX + 45, y + patternSize);
        ctx.closePath();
        ctx.fill();
        
        // Draw result
        const result = (rule >> i) & 1;
        ctx.fillStyle = result ? 'rgba(236, 72, 153, 0.8)' : 'rgba(203, 213, 225, 0.3)';
        ctx.beginPath();
        ctx.rect(startX + 60, y, patternSize, patternSize);
        ctx.fill();
      }
    };
    
    // Main animation loop
    const animate = () => {
      if (!paused) {
        time += 0.1;
        
        // Update grid based on speed
        for (let i = 0; i < speed; i++) {
          updateGrid();
        }
      }
      
      // Draw the current state
      drawGrid();
      
      requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initializeGrid();
    const animationId = requestAnimationFrame(animate);
    
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initializeGrid();
    });
    
    resizeObserver.observe(container);
    
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [rule, cellSize, speed, paused, randomizeStart]);
  
  // Handle rule change
  const handleRuleChange = (newRule: number) => {
    setRule(newRule);
  };
  
  // Handle cell size change
  const handleCellSizeChange = (newSize: number) => {
    setCellSize(newSize);
  };
  
  // Handle speed change
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };
  
  // Toggle pause/play
  const togglePause = () => {
    setPaused(!paused);
  };
  
  // Toggle random start
  const toggleRandomStart = () => {
    setRandomizeStart(!randomizeStart);
  };

  // Popular cellular automata rules
  const popularRules = [
    { rule: 30, name: "Rule 30" },
    { rule: 90, name: "Rule 90" },
    { rule: 110, name: "Rule 110" },
    { rule: 184, name: "Rule 184" },
    { rule: 54, name: "Rule 54" }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_0_50px_rgba(236,72,153,0.5)] border border-pink-500/30">
      <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full"></canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 backdrop-blur-sm">
        <div>
          <div className="inline-block px-4 py-1 bg-pink-600/30 backdrop-blur-sm border border-pink-500/30 rounded-full text-pink-100 text-sm font-bold mb-4 animate-pulse">
            EMERGENT COMPLEXITY
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight text-shadow-automata">
            Cellular<br/>Automata
          </h2>
          
          <p className="text-pink-100 text-lg max-w-xl mb-6 leading-relaxed">
            Witness the emergence of complex patterns from simple rules. Each cell evolves based on its neighbors' states, creating intricate behaviors from elementary instructions.
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col space-y-4">
          {/* Rule selector */}
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-pink-200 font-medium">AUTOMATA RULE</div>
            <div className="flex flex-wrap gap-3">
              {popularRules.map(item => (
                <button 
                  key={item.rule}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${rule === item.rule 
                    ? 'bg-pink-500/50 text-white border border-pink-400/70' 
                    : 'bg-pink-800/30 text-pink-200 border border-pink-600/30'}`}
                  onClick={() => handleRuleChange(item.rule)}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center bg-pink-700/30 rounded-lg overflow-hidden border border-pink-600/30">
                <button 
                  className="px-3 py-2 hover:bg-pink-700/50 text-pink-100"
                  onClick={() => handleRuleChange(Math.max(0, rule - 1))}
                >
                  -
                </button>
                <div className="px-3 py-2 text-pink-100 font-mono bg-pink-800/30">
                  {rule}
                </div>
                <button 
                  className="px-3 py-2 hover:bg-pink-700/50 text-pink-100"
                  onClick={() => handleRuleChange(Math.min(255, rule + 1))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          {/* Parameter controls */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {/* Cell Size control */}
              <div className="flex items-center bg-pink-700/30 backdrop-blur-sm rounded-lg overflow-hidden border border-pink-600/30">
                <button 
                  className="px-3 py-2 hover:bg-pink-700/50 text-pink-100"
                  onClick={() => handleCellSizeChange(Math.max(2, cellSize - 1))}
                >
                  -
                </button>
                <div className="px-3 text-pink-100">
                  Cell Size: {cellSize}
                </div>
                <button 
                  className="px-3 py-2 hover:bg-pink-700/50 text-pink-100"
                  onClick={() => handleCellSizeChange(Math.min(20, cellSize + 1))}
                >
                  +
                </button>
              </div>
              
              {/* Speed control */}
              <div className="flex items-center bg-pink-700/30 backdrop-blur-sm rounded-lg overflow-hidden border border-pink-600/30">
                <button 
                  className="px-3 py-2 hover:bg-pink-700/50 text-pink-100"
                  onClick={() => handleSpeedChange(Math.max(1, speed - 1))}
                >
                  -
                </button>
                <div className="px-3 text-pink-100">
                  Speed: {speed}
                </div>
                <button 
                  className="px-3 py-2 hover:bg-pink-700/50 text-pink-100"
                  onClick={() => handleSpeedChange(Math.min(10, speed + 1))}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              {/* Play/Pause button */}
              <button 
                className="px-6 py-3 bg-pink-600/30 text-pink-100 rounded-xl font-medium hover:bg-pink-500/50 transition-all duration-300 border border-pink-500/30 backdrop-blur-sm hover:scale-105 flex items-center gap-2"
                onClick={togglePause}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {paused ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  )}
                </svg>
                {paused ? 'Play' : 'Pause'}
              </button>
              
              {/* Random Start toggle */}
              <button 
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border backdrop-blur-sm hover:scale-105 flex items-center gap-2 ${
                  randomizeStart 
                    ? 'bg-pink-500/50 text-white border-pink-400/70' 
                    : 'bg-pink-600/30 text-pink-100 border-pink-500/30'
                }`}
                onClick={toggleRandomStart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Random Start
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 bg-pink-700/20 backdrop-blur-sm px-4 py-2 rounded-lg text-pink-200 border border-pink-500/30 transform rotate-6 animate-float-slow">
        <div className="text-sm font-mono">
          Rule {rule} = {rule.toString(2).padStart(8, '0')}
        </div>
      </div>
      <div className="absolute bottom-36 right-12 bg-pink-700/20 backdrop-blur-sm px-4 py-2 rounded-lg text-pink-200 border border-pink-500/30 transform -rotate-3 animate-float-medium">
        <div className="text-sm font-mono">
          Simple rules, complex behavior
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
        
        .text-shadow-automata {
          text-shadow: 0 0 10px rgba(236, 72, 153, 0.8),
                       0 0 20px rgba(236, 72, 153, 0.5),
                       0 0 30px rgba(236, 72, 153, 0.3);
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