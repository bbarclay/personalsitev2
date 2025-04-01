"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface Digit {
  x: number;
  y: number;
  value: number;
  rotation: number;
  size: number;
  color: string;
  expansion: number[];
}

interface Bubble {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  rotation: number;
}

interface Formula {
  text: string;
  x: number;
  y: number;
}

interface FloatingNumber {
  x: number;
  y: number;
  value: number;
  rotation: number;
  size: number;
  color: string;
  expansion: number[];
}

const SuperFunkyPAdicCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const [selectedBase, setSelectedBase] = useState(3);
  const [spaceFolded, setSpaceFolded] = useState(false);
  const [particleMode, setParticleMode] = useState<'digits' | 'bubbles'>('digits'); // 'digits' or 'bubbles'
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [pixelSize, setPixelSize] = useState(8);
  let floatingDigits: { x: number; y: number; value: number }[] = [];
  let bubbles: { x: number; y: number; radius: number; alpha: number }[] = [];
  
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
    
    let animationFrameId: number;
    
    // P-adic digits for some numbers using the selected base
    const generatePAdicExpansion = (num: number, base: number, digits: number = 6): number[] => {
      const result = [];
      let current = num;
      
      for (let i = 0; i < digits; i++) {
        const digit = ((current % base) + base) % base; // Ensure positive remainder
        result.push(digit);
        current = (current - digit) / base;
      }
      
      return result;
    };
    
    // Generate a collection of important numbers
    const numberSet = [-10, -5, -3, -2, -1, 0, 1, 2, 3, 5, 7, 10];
    
    // Generate p-adic expansions
    const pAdicNumbers = numberSet.map(num => ({
      value: num,
      expansion: generatePAdicExpansion(num, selectedBase),
      x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
      y: Math.random() * canvas.height * 0.4 + canvas.height * 0.5,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: `hsl(${(num + 20) * 25 % 360}, 90%, 60%)`,
      size: 20 + Math.abs(num) * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      shape: Math.floor(Math.random() * 4), // 0: circle, 1: polygon, 2: star, 3: custom
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 1 + Math.random()
    }));
    
    // Create floating digits - these are individual p-adic digits that float around
    const floatingDigits: {
      value: number; x: number; y: number; z: number; // For 3D effect
      vx: number; vy: number; vz: number; // Z velocity
      size: number; color: string; opacity: number; rotation: number; rotationSpeed: number;
    }[] = [];
    for (let i = 0; i < 50; i++) {
      const digit = Math.floor(Math.random() * selectedBase);
      
      floatingDigits.push({
        value: digit,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500, // For 3D effect
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        vz: (Math.random() - 0.5) * 3, // Z velocity
        size: 10 + Math.random() * 20,
        color: `hsl(${digit * (360 / selectedBase)}, 90%, 60%)`,
        opacity: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
    }
    
    // Create bubbles - these are organic bubble-like shapes
    const bubbles: { x: number; y: number; radius: number; initialRadius: number; vx: number; vy: number; color: string; pulsePhase: number; pulseSpeed: number; pulseAmount: number; wobblyPoints: number; wobblyAmount: number; }[] = [];
    for (let i = 0; i < 30; i++) {
      const radius = 20 + Math.random() * 40;
      
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        initialRadius: radius,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: `hsl(${Math.random() * 60 + 140}, ${70 + Math.random() * 30}%, ${40 + Math.random() * 30}%)`,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseAmount: 0.2 + Math.random() * 0.3,
        wobblyPoints: 5 + Math.floor(Math.random() * 5),
        wobblyAmount: 0.1 + Math.random() * 0.3
      });
    }
    
    // Create a p-adic tree visualization
    const drawPAdicTree = (
      x: number,
      y: number,
      depth: number,
      maxDepth: number,
      base: number,
      angle: number = -Math.PI/2,
      phase: number = 0,
      time: number
    ) => {
      if (depth >= maxDepth) return;
      
      const len = 100 / (depth + 2);
      const angleDelta = Math.PI / base;
      const startAngle = angle - (Math.PI - angleDelta) / 2;
      
      for (let i = 0; i < base; i++) {
        const branchAngle = startAngle + i * angleDelta;
        const endX = x + Math.cos(branchAngle) * len;
        const endY = y + Math.sin(branchAngle) * len;
        
        // Add some wave to the branches
        const waveX = Math.sin(time * 0.7 + depth + i + phase) * (5 / (depth + 1));
        const waveY = Math.cos(time * 0.5 + depth + i + phase) * (5 / (depth + 1));
        
        const hue = (i * (360 / base) + time * 10) % 360;
        const brightness = 50 + (depth * 5);
        
        // Create gradient for branch
        const gradient = ctx.createLinearGradient(x, y, endX + waveX, endY + waveY);
        gradient.addColorStop(0, `hsla(${hue}, 100%, ${brightness}%, ${1 - depth/maxDepth})`);
        gradient.addColorStop(1, `hsla(${(hue + 30) % 360}, 100%, ${brightness + 20}%, ${0.7 - depth/maxDepth})`);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create curvy branch
        const controlX1 = x + (endX - x) * 0.3 + Math.sin(time + i) * 10;
        const controlY1 = y + (endY - y) * 0.3 + Math.cos(time + i) * 10;
        const controlX2 = x + (endX - x) * 0.7 + Math.sin(time + i + 2) * 10;
        const controlY2 = y + (endY - y) * 0.7 + Math.cos(time + i + 2) * 10;
        
        ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX + waveX, endY + waveY);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 10 / (depth + 1);
        ctx.lineCap = 'round';
        ctx.shadowColor = `hsla(${hue}, 100%, ${brightness + 20}%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Draw node at the end
        ctx.fillStyle = `hsla(${hue}, 100%, ${brightness + 10}%, 0.9)`;
        ctx.beginPath();
        ctx.arc(endX + waveX, endY + waveY, 5 / (depth + 1), 0, Math.PI * 2);
        ctx.fill();
        
        // Add digit label to the node
        if (depth <= 2) {
          ctx.fillStyle = 'white';
          ctx.font = `${14 / (depth + 1)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(i.toString(), endX + waveX, endY + waveY);
        }
        
        // Recurse to next level
        if (depth < maxDepth - 1) {
          drawPAdicTree(endX + waveX, endY + waveY, depth + 1, maxDepth, base, branchAngle, phase + i, time);
        }
      }
    };
    
    // Draw wobble shape
    const drawWobbleShape = (
      x: number,
      y: number,
      radius: number,
      points: number,
      wobbleAmount: number,
      time: number,
      color: string
    ) => {
      ctx.beginPath();
      
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wobble = 1 + Math.sin(angle * 3 + time) * wobbleAmount;
        const px = x + Math.cos(angle) * radius * wobble;
        const py = y + Math.sin(angle) * radius * wobble;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };
    
    // Draw star shape
    const drawStar = (
      x: number,
      y: number,
      radius: number,
      points: number,
      time: number,
      color: string
    ) => {
      ctx.beginPath();
      
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const r = i % 2 === 0 ? radius : radius * 0.5;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };
    
    // Draw polygon shape
    const drawPolygon = (
      x: number,
      y: number,
      radius: number,
      sides: number,
      rotation: number,
      color: string
    ) => {
      ctx.beginPath();
      
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i / sides) * Math.PI * 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };
    
    // Draw funky borders
    const drawFunkyBorders = (time: number) => {
      // Top edge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      for (let x = 0; x <= canvas.width; x += 10) {
        const spikeHeight = 15 + Math.sin(x / 30 + time) * 10;
        ctx.lineTo(x, x % 20 === 0 ? spikeHeight : 0);
      }
      
      ctx.lineTo(canvas.width, 0);
      ctx.closePath();
      
      const topGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      topGradient.addColorStop(0, '#0d9488');
      topGradient.addColorStop(0.5, '#0891b2');
      topGradient.addColorStop(1, '#0d9488');
      
      ctx.fillStyle = topGradient;
      ctx.fill();
      
      // Bottom edge
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let x = 0; x <= canvas.width; x += 10) {
        const spikeHeight = 15 + Math.cos(x / 40 + time) * 10;
        ctx.lineTo(x, canvas.height - (x % 20 === 0 ? spikeHeight : 0));
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      
      const bottomGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      bottomGradient.addColorStop(0, '#0d9488');
      bottomGradient.addColorStop(0.5, '#0891b2');
      bottomGradient.addColorStop(1, '#0d9488');
      
      ctx.fillStyle = bottomGradient;
      ctx.fill();
      
      // Left edge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      for (let y = 0; y <= canvas.height; y += 10) {
        const spikeWidth = 15 + Math.sin(y / 20 + time) * 10;
        ctx.lineTo(y % 20 === 0 ? spikeWidth : 0, y);
      }
      
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      const leftGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      leftGradient.addColorStop(0, '#0d9488');
      leftGradient.addColorStop(0.5, '#0f766e');
      leftGradient.addColorStop(1, '#0d9488');
      
      ctx.fillStyle = leftGradient;
      ctx.fill();
      
      // Right edge
      ctx.beginPath();
      ctx.moveTo(canvas.width, 0);
      
      for (let y = 0; y <= canvas.height; y += 10) {
        const spikeWidth = 15 + Math.cos(y / 30 + time) * 10;
        ctx.lineTo(canvas.width - (y % 20 === 0 ? spikeWidth : 0), y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      
      const rightGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      rightGradient.addColorStop(0, '#0d9488');
      rightGradient.addColorStop(0.5, '#0f766e');
      rightGradient.addColorStop(1, '#0d9488');
      
      ctx.fillStyle = rightGradient;
      ctx.fill();
    };
    
    // Draw title with glitch effect
    const drawTitle = (time: number) => {
      const title = "P-ADIC NUMBERS";
      const subtitle = "Where Distance Is Measured By Divisibility";
      
      // Position
      const titleX = canvas.width / 2;
      const titleY = 60;
      
      // Title background with flowing border
      ctx.beginPath();
      
      const titleWidth = 400;
      const titleHeight = 100;
      const titleLeft = titleX - titleWidth / 2;
      const titleTop = titleY - 35;
      
      // Top edge with waves
      for (let x = 0; x < titleWidth; x += 10) {
        const wave = Math.sin(x / 20 + time * 2) * 5;
        ctx.lineTo(titleLeft + x, titleTop + wave);
      }
      
      // Right edge with waves
      for (let y = 0; y < titleHeight; y += 10) {
        const wave = Math.sin(y / 20 + time * 2 + Math.PI/2) * 5;
        ctx.lineTo(titleLeft + titleWidth + wave, titleTop + y);
      }
      
      // Bottom edge with waves
      for (let x = titleWidth; x > 0; x -= 10) {
        const wave = Math.sin(x / 20 + time * 2 + Math.PI) * 5;
        ctx.lineTo(titleLeft + x, titleTop + titleHeight + wave);
      }
      
      // Left edge with waves
      for (let y = titleHeight; y > 0; y -= 10) {
        const wave = Math.sin(y / 20 + time * 2 + Math.PI * 3/2) * 5;
        ctx.lineTo(titleLeft + wave, titleTop + y);
      }
      
      ctx.closePath();
      
      // Title background gradient
      const titleGradient = ctx.createLinearGradient(
        titleLeft, titleTop,
        titleLeft + titleWidth, titleTop + titleHeight
      );
      titleGradient.addColorStop(0, 'rgba(13, 148, 136, 0.2)');
      titleGradient.addColorStop(0.5, 'rgba(20, 184, 166, 0.3)');
      titleGradient.addColorStop(1, 'rgba(13, 148, 136, 0.2)');
      
      ctx.fillStyle = titleGradient;
      ctx.shadowColor = '#14b8a6';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Main title with glitch effect
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Glitch effect - randomly offset channels
      const glitchAmount = Math.sin(time * 3) * 3;
      
      if (Math.random() > 0.7) {
        // Red channel
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillText(title, titleX + glitchAmount, titleY);
        
        // Green channel
        ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
        ctx.fillText(title, titleX, titleY);
        
        // Blue channel
        ctx.fillStyle = 'rgba(0, 0, 255, 0.8)';
        ctx.fillText(title, titleX - glitchAmount, titleY);
      } else {
        // Normal text
        ctx.fillStyle = '#14b8a6';
        ctx.fillText(title, titleX, titleY);
      }
      
      // Subtitle
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#99f6e4';
      ctx.fillText(subtitle, titleX, titleY + 40);
    };
    
    // Draw base selector buttons
    const drawBaseSelectors = (time: number) => {
      const buttonY = canvas.height - 60;
      const buttonWidth = 100;
      const buttonHeight = 40;
      const spacing = 20;
      const bases = [2, 3, 5, 7];
      
      // Calculate starting position to center all buttons
      const totalWidth = buttonWidth * bases.length + spacing * (bases.length - 1);
      const startX = (canvas.width - totalWidth) / 2;
      
      bases.forEach((base, index) => {
        const buttonX = startX + index * (buttonWidth + spacing);
        
        // Button glow for active base
        if (base === selectedBase) {
          ctx.beginPath();
          ctx.roundRect(
            buttonX - 5, 
            buttonY - 5, 
            buttonWidth + 10, 
            buttonHeight + 10, 
            20
          );
          
          const glowGradient = ctx.createRadialGradient(
            buttonX + buttonWidth/2, buttonY + buttonHeight/2, 0,
            buttonX + buttonWidth/2, buttonY + buttonHeight/2, buttonWidth
          );
          glowGradient.addColorStop(0, 'rgba(20, 184, 166, 0.7)');
          glowGradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
        
        // Button shape with wavy border
        ctx.beginPath();
        
        // Top edge
        for (let x = 0; x < buttonWidth; x += 5) {
          const wave = Math.sin(x / 10 + time * 2) * 2;
          ctx.lineTo(buttonX + x, buttonY + wave);
        }
        
        // Right edge
        for (let y = 0; y < buttonHeight; y += 5) {
          const wave = Math.sin(y / 10 + time * 2 + Math.PI/2) * 2;
          ctx.lineTo(buttonX + buttonWidth + wave, buttonY + y);
        }
        
        // Bottom edge
        for (let x = buttonWidth; x > 0; x -= 5) {
          const wave = Math.sin(x / 10 + time * 2 + Math.PI) * 2;
          ctx.lineTo(buttonX + x, buttonY + buttonHeight + wave);
        }
        
        // Left edge
        for (let y = buttonHeight; y > 0; y -= 5) {
          const wave = Math.sin(y / 10 + time * 2 + Math.PI * 3/2) * 2;
          ctx.lineTo(buttonX + wave, buttonY + y);
        }
        
        ctx.closePath();
        
        // Button gradient
        const buttonGradient = ctx.createLinearGradient(
          buttonX, buttonY,
          buttonX + buttonWidth, buttonY + buttonHeight
        );
        
        if (base === selectedBase) {
          buttonGradient.addColorStop(0, '#0f766e');
          buttonGradient.addColorStop(1, '#0d9488');
        } else {
          buttonGradient.addColorStop(0, '#134e4a');
          buttonGradient.addColorStop(1, '#115e59');
        }
        
        ctx.fillStyle = buttonGradient;
        ctx.shadowColor = base === selectedBase ? '#14b8a6' : 'transparent';
        ctx.shadowBlur = base === selectedBase ? 10 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Button text
        ctx.font = 'bold 16px monospace';
        ctx.fillStyle = base === selectedBase ? '#fff' : '#99f6e4';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${base}-adic`, buttonX + buttonWidth/2, buttonY + buttonHeight/2);
      });
    };
    
    // Draw fold space button
    const drawFoldSpaceButton = (time: number) => {
      const buttonX = canvas.width - 160;
      const buttonY = 100;
      const buttonWidth = 140;
      const buttonHeight = 40;
      
      // Button glow if active
      if (spaceFolded) {
        ctx.beginPath();
        ctx.roundRect(
          buttonX - 5, 
          buttonY - 5, 
          buttonWidth + 10, 
          buttonHeight + 10, 
          20
        );
        
        const glowGradient = ctx.createRadialGradient(
          buttonX + buttonWidth/2, buttonY + buttonHeight/2, 0,
          buttonX + buttonWidth/2, buttonY + buttonHeight/2, buttonWidth
        );
        glowGradient.addColorStop(0, 'rgba(20, 184, 166, 0.7)');
        glowGradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }
      
      // Button with techno border
      ctx.beginPath();
      
      // Make angular technological shape
      ctx.moveTo(buttonX, buttonY + buttonHeight * 0.3);
      ctx.lineTo(buttonX + buttonWidth * 0.1, buttonY);
      ctx.lineTo(buttonX + buttonWidth * 0.9, buttonY);
      ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight * 0.3);
      ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight * 0.7);
      ctx.lineTo(buttonX + buttonWidth * 0.9, buttonY + buttonHeight);
      ctx.lineTo(buttonX + buttonWidth * 0.1, buttonY + buttonHeight);
      ctx.lineTo(buttonX, buttonY + buttonHeight * 0.7);
      ctx.closePath();
      
      // Button gradient with animated color
      const hue1 = (time * 20) % 360;
      const hue2 = (hue1 + 60) % 360;
      
      const buttonGradient = ctx.createLinearGradient(
        buttonX, buttonY,
        buttonX + buttonWidth, buttonY + buttonHeight
      );
      
      if (spaceFolded) {
        buttonGradient.addColorStop(0, `hsla(${hue1}, 70%, 40%, 1)`);
        buttonGradient.addColorStop(1, `hsla(${hue2}, 70%, 40%, 1)`);
      } else {
        buttonGradient.addColorStop(0, '#134e4a');
        buttonGradient.addColorStop(1, '#115e59');
      }
      
      ctx.fillStyle = buttonGradient;
      ctx.shadowColor = spaceFolded ? `hsla(${hue1}, 70%, 60%, 1)` : 'transparent';
      ctx.shadowBlur = spaceFolded ? 10 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Button border
      ctx.strokeStyle = spaceFolded ? '#14b8a6' : '#0f766e';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Button text with techno font
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = spaceFolded ? '#fff' : '#99f6e4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('FOLD SPACE', buttonX + buttonWidth/2, buttonY + buttonHeight/2);
      
      // Tech decoration
      if (spaceFolded) {
        // Add blinking lights
        const lightPositions = [
          { x: buttonX + 10, y: buttonY + 5 },
          { x: buttonX + buttonWidth - 10, y: buttonY + 5 },
          { x: buttonX + 10, y: buttonY + buttonHeight - 5 },
          { x: buttonX + buttonWidth - 10, y: buttonY + buttonHeight - 5 }
        ];
        
        lightPositions.forEach((pos, i) => {
          const blink = Math.sin(time * 5 + i) > 0;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = blink ? '#14b8a6' : '#0f766e';
          ctx.fill();
        });
      }
    };
    
    // Draw toggle particles button
    const drawToggleParticlesButton = (time: number) => {
      const buttonX = 20;
      const buttonY = 100;
      const buttonWidth = 140;
      const buttonHeight = 40;
      
      // Button with organic shape
      ctx.beginPath();
      
      // Wibbly wobbly button shape
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        const wobble = 1 + Math.sin(angle * 5 + time * 2) * 0.1;
        const radius = buttonWidth / 3 * wobble;
        const x = buttonX + buttonWidth/2 + Math.cos(angle) * radius;
        const y = buttonY + buttonHeight/2 + Math.sin(angle) * radius;
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      
      // Button gradient
      const buttonGradient = ctx.createRadialGradient(
        buttonX + buttonWidth/2, buttonY + buttonHeight/2, 0,
        buttonX + buttonWidth/2, buttonY + buttonHeight/2, buttonWidth/2
      );
      
      if (particleMode === 'bubbles') {
        buttonGradient.addColorStop(0, '#0d9488');
        buttonGradient.addColorStop(1, '#0f766e');
      } else {
        buttonGradient.addColorStop(0, '#134e4a');
        buttonGradient.addColorStop(1, '#115e59');
      }
      
      ctx.fillStyle = buttonGradient;
      ctx.shadowColor = particleMode === 'bubbles' ? '#14b8a6' : 'transparent';
      ctx.shadowBlur = particleMode === 'bubbles' ? 10 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Button text
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = particleMode === 'bubbles' ? '#fff' : '#99f6e4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BUBBLES', buttonX + buttonWidth/2, buttonY + buttonHeight/2);
    };
    
    // Draw 3D perspective guides for space folding effect
    const drawSpaceFolding = (time: number) => {
      if (!spaceFolded) return;
      
      // Draw perspective lines
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const perspectiveDepth = 300;
      
      for (let i = 1; i <= 5; i++) {
        const z = i * (perspectiveDepth / 5);
        const scale = 1 - z / (perspectiveDepth * 2);
        
        // Draw perspective frame
        ctx.beginPath();
        ctx.rect(
          centerX - (canvas.width/2) * scale,
          centerY - (canvas.height/2) * scale,
          canvas.width * scale,
          canvas.height * scale
        );
        
        ctx.strokeStyle = `rgba(20, 184, 166, ${0.7 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw some abstract p-adic symbols on each layer
        const symbolsPerLayer = 3;
        for (let j = 0; j < symbolsPerLayer; j++) {
          const angle = (j / symbolsPerLayer) * Math.PI * 2 + time * 0.2;
          const radius = (canvas.width / 4) * scale;
          const symbolX = centerX + Math.cos(angle) * radius;
          const symbolY = centerY + Math.sin(angle) * radius;
          
          // Draw p-adic symbol
          ctx.save();
          ctx.translate(symbolX, symbolY);
          ctx.rotate(angle + time * 0.5);
          
          ctx.font = `${40 * scale}px monospace`;
          ctx.fillStyle = `rgba(20, 184, 166, ${0.4 - i * 0.05})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Different p-adic notations
          const symbols = [`Z${selectedBase}`, `|·|${selectedBase}`, `Q${selectedBase}`, `Φ${selectedBase}`];
          ctx.fillText(symbols[j % symbols.length], 0, 0);
          
          ctx.restore();
        }
      }
    };
    
    // Draw floating mathematical formulas
    const drawFloatingFormulas = (time: number) => {
      const formulas = [
        { text: `|x|${selectedBase} = ${selectedBase}⁻ᵒʳᵈₚ⁽ˣ⁾`, x: canvas.width * 0.8, y: canvas.height * 0.3 },
        { text: `Z${selectedBase} = {..., -1, 0, 1, ...}`, x: canvas.width * 0.2, y: canvas.height * 0.7 },
        { text: `Q${selectedBase} ⊃ Z${selectedBase}`, x: canvas.width * 0.7, y: canvas.height * 0.6 }
      ];
      
      formulas.forEach((formula, i) => {
        const x = formula.x + Math.sin(time + i) * 20;
        const y = formula.y + Math.cos(time * 0.7 + i) * 10;
        
        // Draw glowing card
        ctx.beginPath();
        
        // Card with wobbly edges
        const cardWidth = formula.text.length * 10 + 20;
        const cardHeight = 40;
        
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const aspectRatio = cardWidth / cardHeight;
          const wobble = 1 + Math.sin(angle * 8 + time * 2 + i) * 0.1;
          
          const radiusX = cardWidth / 2 * wobble;
          const radiusY = cardHeight / 2 * wobble;
          
          const px = x + Math.cos(angle) * radiusX;
          const py = y + Math.sin(angle) * radiusY;
          
          if (angle === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        
        ctx.closePath();
        
        // Card gradient
        const cardGradient = ctx.createLinearGradient(
          x - cardWidth/2, y - cardHeight/2,
          x + cardWidth/2, y + cardHeight/2
        );
        cardGradient.addColorStop(0, 'rgba(19, 78, 74, 0.7)');
        cardGradient.addColorStop(1, 'rgba(15, 118, 110, 0.7)');
        
        ctx.fillStyle = cardGradient;
        ctx.shadowColor = '#14b8a6';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Formula text
        ctx.font = '16px monospace';
        ctx.fillStyle = '#99f6e4';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(formula.text, x, y);
      });
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() / 1000;
      
      // Background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width
      );
      bgGradient.addColorStop(0, '#0f766e');
      bgGradient.addColorStop(1, '#042f2e');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Perspective grid that moves with time
      const perspectiveX = canvas.width/2;
      const perspectiveY = canvas.height/2;
      const gridSize = 50 + Math.sin(time * 0.2) * 10;
      
      if (spaceFolded) {
        // 3D perspective grid
        for (let i = -20; i <= 20; i++) {
          const lineWidth = 1 - Math.abs(i / 20) * 0.5;
          ctx.lineWidth = lineWidth;
          
          // Horizontal lines with perspective
          ctx.beginPath();
          ctx.moveTo(0, perspectiveY + i * gridSize);
          ctx.lineTo(canvas.width, perspectiveY + i * gridSize);
          ctx.stroke();
          
          // Vertical lines with perspective
          ctx.beginPath();
          ctx.moveTo(perspectiveX + i * gridSize, 0);
          ctx.lineTo(perspectiveX + i * gridSize, canvas.height);
          ctx.stroke();
        }
      } else {
        // Regular grid
        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
      
      // Draw funky borders
      drawFunkyBorders(time);
      
      // Draw space folding effect
      drawSpaceFolding(time);
      
      // Draw p-adic tree
      const treeX = canvas.width/2;
      const treeY = canvas.height * 0.3;
      const treeDepth = 4;
      
      // Apply 3D transformation if space is folded
      if (spaceFolded) {
        // Scale the tree when space is folded
        const pulseScale = 0.8 + Math.sin(time * 0.5) * 0.1;
        
        ctx.save();
        ctx.translate(treeX, treeY);
        ctx.scale(pulseScale, pulseScale);
        ctx.rotate(Math.sin(time * 0.1) * 0.2);
        ctx.translate(-treeX, -treeY);
        
        drawPAdicTree(treeX, treeY, 0, treeDepth, selectedBase, -Math.PI/2, 0, time);
        
        ctx.restore();
      } else {
        // Normal tree
        drawPAdicTree(treeX, treeY, 0, treeDepth, selectedBase, -Math.PI/2, 0, time);
      }
      
      // Update and draw particles
      if (particleMode === 'digits') {
        // Update floating digits
        floatingDigits.forEach(digit => {
          // Update position
          digit.x += digit.vx;
          digit.y += digit.vy;
          
          // Update z position for 3D effect
          if (spaceFolded) {
            digit.z += digit.vz;
            
            // Reset if too far or too close
            if (digit.z < 0 || digit.z > 1000) {
              digit.z = Math.random() * 500;
              digit.vz = (Math.random() - 0.5) * 3;
            }
          }
          
          // Bounce off walls
          if (digit.x < 0 || digit.x > canvas.width) {
            digit.vx *= -1;
            digit.x = Math.max(0, Math.min(canvas.width, digit.x));
          }
          
          if (digit.y < 0 || digit.y > canvas.height) {
            digit.vy *= -1;
            digit.y = Math.max(0, Math.min(canvas.height, digit.y));
          }
          
          // Update rotation
          digit.rotation += digit.rotationSpeed;
          
          // Scale based on z position if space is folded
          let scale = 1;
          if (spaceFolded) {
            scale = 0.5 + (1000 - digit.z) / 1000;
          }
          
          // Draw the digit
          ctx.save();
          ctx.translate(digit.x, digit.y);
          ctx.rotate(digit.rotation);
          ctx.scale(scale, scale);
          
          // Digit glow
          ctx.shadowColor = digit.color;
          ctx.shadowBlur = 10;
          
          // Background for digit
          ctx.beginPath();
          ctx.arc(0, 0, digit.size, 0, Math.PI * 2);
          ctx.fillStyle = adjustColor(digit.color, -30);
          ctx.fill();
          
          // Digit text
          ctx.font = `bold ${digit.size}px monospace`;
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(digit.value.toString(), 0, 0);
          
          ctx.restore();
        });
      } else {
        // Update bubble particles
        bubbles.forEach(bubble => {
          // Update position
          bubble.x += bubble.vx;
          bubble.y += bubble.vy;
          
          // Bounce off edges
          if (bubble.x < bubble.radius || bubble.x > canvas.width - bubble.radius) {
            bubble.vx *= -1;
            bubble.x = Math.max(bubble.radius, Math.min(canvas.width - bubble.radius, bubble.x));
          }
          
          if (bubble.y < bubble.radius || bubble.y > canvas.height - bubble.radius) {
            bubble.vy *= -1;
            bubble.y = Math.max(bubble.radius, Math.min(canvas.height - bubble.radius, bubble.y));
          }
          
          // Calculate pulsing radius
          bubble.radius = bubble.initialRadius * (1 + Math.sin(time * bubble.pulseSpeed + bubble.pulsePhase) * bubble.pulseAmount);
          
          // Draw the bubble
          ctx.globalAlpha = 0.7;
          ctx.shadowColor = bubble.color;
          ctx.shadowBlur = 15;
          
          drawWobbleShape(
            bubble.x, 
            bubble.y, 
            bubble.radius, 
            bubble.wobblyPoints, 
            bubble.wobblyAmount, 
            time * bubble.pulseSpeed + bubble.pulsePhase,
            bubble.color
          );
          
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        });
      }
      
      // Update and draw p-adic numbers
      pAdicNumbers.forEach(num => {
        // Update position
        num.x += num.vx;
        num.y += num.vy;
        
        // Bounce off walls with some padding
        const padding = num.size;
        if (num.x < padding || num.x > canvas.width - padding) {
          num.vx *= -1;
          num.x = Math.max(padding, Math.min(canvas.width - padding, num.x));
        }
        
        if (num.y < padding || num.y > canvas.height - padding) {
          num.vy *= -1;
          num.y = Math.max(padding, Math.min(canvas.height - padding, num.y));
        }
        
        // Update rotation
        num.rotation += num.rotationSpeed;
        
        // Calculate pulsing effect
        const pulse = 1 + Math.sin(time * num.pulseSpeed + num.pulsePhase) * 0.2;
        
        // Draw the shape based on type
        ctx.save();
        ctx.translate(num.x, num.y);
        ctx.rotate(num.rotation);
        ctx.scale(pulse, pulse);
        
        ctx.shadowColor = num.color;
        ctx.shadowBlur = 15;
        
        switch (num.shape) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, num.size, 0, Math.PI * 2);
            ctx.fillStyle = num.color;
            ctx.fill();
            break;
            
          case 1: // Polygon
            const sides = num.expansion.reduce((sum, digit) => sum + digit, 0) + 3;
            drawPolygon(0, 0, num.size, sides, 0, num.color);
            break;
            
          case 2: // Star
            const points = Math.abs(num.value % 7) + 3;
            drawStar(0, 0, num.size, points, time, num.color);
            break;
            
          case 3: // Custom shape based on p-adic expansion
            ctx.beginPath();
            
            // Create a shape based on p-adic expansion
            for (let i = 0; i <= num.expansion.length; i++) {
              const angle = (i / num.expansion.length) * Math.PI * 2;
              const digit = i < num.expansion.length ? num.expansion[i] : num.expansion[0];
              const radius = num.size * (0.5 + digit / (selectedBase * 2));
              
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            
            ctx.closePath();
            ctx.fillStyle = num.color;
            ctx.fill();
            break;
        }
        
        // Draw the number
        ctx.font = `bold ${num.size * 0.8}px monospace`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(num.value.toString(), 0, 0);
        
        // Draw p-adic expansion
        ctx.font = `${num.size * 0.3}px monospace`;
        ctx.fillStyle = 'white';
        ctx.fillText(`[${num.expansion.join(',')}]${selectedBase}`, 0, num.size * 0.8);
        
        ctx.restore();
      });
      
      // Draw floating formulas
      drawFloatingFormulas(time);
      
      // Draw title
      drawTitle(time);
      
      // Draw base selectors
      drawBaseSelectors(time);
      
      // Draw fold space button
      drawFoldSpaceButton(time);
      
      // Draw particle toggle button
      drawToggleParticlesButton(time);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Function to adjust color brightness
    function adjustColor(color: string, amount: number): string {
      // For HSL colors
      if (color.startsWith('hsl')) {
        const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%/);
        if (hslMatch) {
          const h = parseInt(hslMatch[1]);
          const s = parseInt(hslMatch[2]);
          const l = Math.max(0, Math.min(100, parseInt(hslMatch[3]) + amount));
          return `hsl(${h}, ${s}%, ${l}%)`;
        }
      }
      return color;
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedBase, spaceFolded, particleMode]);
  
  // Handle button clicks
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    // Check base selector buttons
    const buttonY = canvas.height - 60;
    const buttonWidth = 100;
    const buttonHeight = 40;
    const spacing = 20;
    const bases = [2, 3, 5, 7];
    
    const totalWidth = buttonWidth * bases.length + spacing * (bases.length - 1);
    const startX = (canvas.width - totalWidth) / 2;
    
    for (let i = 0; i < bases.length; i++) {
      const buttonX = startX + i * (buttonWidth + spacing);
      
      if (x >= buttonX && x <= buttonX + buttonWidth &&
          y >= buttonY && y <= buttonY + buttonHeight) {
        setSelectedBase(bases[i]);
        return;
      }
    }
    
    // Check fold space button
    const foldButtonX = canvas.width - 160;
    const foldButtonY = 100;
    const foldButtonWidth = 140;
    const foldButtonHeight = 40;
    
    if (x >= foldButtonX && x <= foldButtonX + foldButtonWidth &&
        y >= foldButtonY && y <= foldButtonY + foldButtonHeight) {
      setSpaceFolded(!spaceFolded);
      return;
    }
    
    // Check particle toggle button
    const particleButtonX = 20;
    const particleButtonY = 100;
    const particleButtonWidth = 140;
    const particleButtonHeight = 40;
    
    if (x >= particleButtonX - particleButtonWidth/2 && x <= particleButtonX + particleButtonWidth/2 &&
        y >= particleButtonY - particleButtonHeight/2 && y <= particleButtonY + particleButtonHeight/2) {
      setParticleMode(particleMode === 'digits' ? 'bubbles' : 'digits');
      return;
    }

    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const textX = rect.left - canvasRef.current!.offsetLeft;
      const textY = rect.top - canvasRef.current!.offsetTop;
      const textWidth = rect.width;
      const textHeight = rect.height;

      if (x >= textX && x <= textX + textWidth && y >= textY && y <= textY + textHeight) {
        const digit = Math.floor(Math.random() * 10);
        floatingDigits.push({ x: textX + textWidth / 2, y: textY + textHeight / 2, value: digit });
      }
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-4xl mx-auto"
    >
      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        style={{
          boxShadow: '0 0 50px -12px rgba(20,184,166,0.7)'
        }}
      >
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600} 
          className="w-full block bg-teal-900"
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
};

export default SuperFunkyPAdicCard;
