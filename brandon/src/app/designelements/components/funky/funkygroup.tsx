import React, { useEffect, useRef } from 'react';

const SuperFunkyGroupCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Group elements as particles
    interface Element {
      value: number;
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      connections: Array<any>;
      pulsePhase: number;
      shape: number;
    }
    
    interface Operation {
      name: string;
      x: number;
      y: number;
      color: string;
    }
    
    const elements: Element[] = [];
    for (let i = 0; i < 12; i++) {
      elements.push({
        value: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 25,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: `hsl(${(i * 30) % 360}, 80%, 60%)`,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        shape: i % 4 // 0: circle, 1: square, 2: triangle, 3: pentagon
      });
    }
    
    // Cayley table connections
    const operations: Operation[] = [
      { name: '⊕', x: canvas.width * 0.2, y: canvas.height * 0.8, color: '#ff6b6b' },
      { name: '⊗', x: canvas.width * 0.5, y: canvas.height * 0.8, color: '#4ecdc4' },
      { name: '⊙', x: canvas.width * 0.8, y: canvas.height * 0.8, color: '#ffe66d' }
    ];
    
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cosmic background
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width
      );
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw orbital paths
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const radius = 100 + i * 50;
        ctx.ellipse(
          canvas.width/2, canvas.height/2,
          radius, radius * 0.6,
          time * 0.0003 + i * Math.PI/3,
          0, Math.PI * 2
        );
        ctx.stroke();
      }
      
      // Update and draw elements
      elements.forEach((element, i) => {
        // Update position with orbital motion
        element.x += element.vx;
        element.y += element.vy;
        
        // Boundary check with smooth wrapping
        if (element.x < -50) element.x = canvas.width + 50;
        if (element.x > canvas.width + 50) element.x = -50;
        if (element.y < -50) element.y = canvas.height + 50;
        if (element.y > canvas.height + 50) element.y = -50;
        
        // Draw connection lines for group operations
        operations.forEach(op => {
          const dx = element.x - op.x;
          const dy = element.y - op.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `${op.color}${Math.floor((1 - distance/150) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 2;
            ctx.moveTo(element.x, element.y);
            
            // Bezier curve connection
            const midX = (element.x + op.x) / 2;
            const midY = (element.y + op.y) / 2;
            const offset = 50 * Math.sin(time * 0.001 + i);
            
            ctx.quadraticCurveTo(
              midX + offset, midY - offset,
              op.x, op.y
            );
            ctx.stroke();
          }
        });
        
        // Draw element
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(element.rotation);
        
        // Glow effect
        ctx.shadowColor = element.color;
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = element.color;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
        // Draw different shapes based on element.shape
        switch(element.shape) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, element.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
            
          case 1: // Square
            ctx.beginPath();
            ctx.rect(-element.radius, -element.radius, 
                    element.radius * 2, element.radius * 2);
            ctx.fill();
            ctx.stroke();
            break;
            
          case 2: // Triangle
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
              const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
              const x = Math.cos(angle) * element.radius;
              const y = Math.sin(angle) * element.radius;
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 3: // Pentagon
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
              const x = Math.cos(angle) * element.radius;
              const y = Math.sin(angle) * element.radius;
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
        }
        
        // Draw element value
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '16px monospace';
        ctx.fillText(element.value.toString(), 0, 0);
        
        ctx.restore();
        
        // Update rotation
        element.rotation += element.rotationSpeed;
      });
      
      // Draw operation nodes
      operations.forEach(op => {
        ctx.beginPath();
        ctx.fillStyle = op.color;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.arc(op.x, op.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = 'white';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(op.name, op.x, op.y);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-4xl mx-auto shadow-2xl overflow-hidden"
      style={{
        borderRadius: '24px',
        boxShadow: '0 0 50px -12px rgba(0, 255, 255, 0.5)'
      }}
    >
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="w-full block bg-slate-900"
      />
    </div>
  );
};

export default SuperFunkyGroupCard;