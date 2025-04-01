import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  value: number;
  color: string;
}

interface Branch {
  start: Point;
  end: Point;
  color: string;
}

const SuperFunkyCollatzCard = () => {
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
    
    // Hailstone particles
    const hailstones: Point[] = [];
    for (let i = 0; i < 15; i++) {
      hailstones.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        value: Math.floor(Math.random() * 50) * 2 + 5,
        color: `hsl(${Math.random() * 30 + 10}, 100%, 60%)`
      });
    }
    
    // Bumper locations
    const bumpers: Point[] = [
      { x: canvas.width * 0.3, y: canvas.height * 0.35, value: 0, color: '#ff5900' },
      { x: canvas.width * 0.7, y: canvas.height * 0.4, value: 0, color: '#ff3d00' },
      { x: canvas.width * 0.5, y: canvas.height * 0.25, value: 0, color: '#ffb300' },
      { x: canvas.width * 0.2, y: canvas.height * 0.6, value: 0, color: '#ffb300' },
      { x: canvas.width * 0.75, y: canvas.height * 0.65, value: 0, color: '#ffb300' }
    ];
    
    // Funky jagged borders
    const drawJaggedBorder = () => {
      const time = Date.now() / 1000;
      
      // Top border
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x < canvas.width; x += 30) {
        const heightVariation = Math.sin(x / 50 + time) * 15 + 20;
        ctx.lineTo(x, heightVariation);
      }
      ctx.lineTo(canvas.width, 0);
      ctx.closePath();
      
      const topGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      topGradient.addColorStop(0, '#ff9500');
      topGradient.addColorStop(0.5, '#ff5500');
      topGradient.addColorStop(1, '#ff9500');
      ctx.fillStyle = topGradient;
      ctx.fill();
      
      // Left border
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let y = 0; y < canvas.height; y += 30) {
        const widthVariation = Math.sin(y / 40 + time + 1) * 15 + 20;
        ctx.lineTo(widthVariation, y);
      }
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      const leftGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      leftGradient.addColorStop(0, '#ff5500');
      leftGradient.addColorStop(0.5, '#ff7800');
      leftGradient.addColorStop(1, '#ff5500');
      ctx.fillStyle = leftGradient;
      ctx.fill();
      
      // Bottom border
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x < canvas.width; x += 30) {
        const heightVariation = canvas.height - (Math.sin(x / 50 + time + 2) * 15 + 20);
        ctx.lineTo(x, heightVariation);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      
      const bottomGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      bottomGradient.addColorStop(0, '#ff9500');
      bottomGradient.addColorStop(0.5, '#ff5500');
      bottomGradient.addColorStop(1, '#ff9500');
      ctx.fillStyle = bottomGradient;
      ctx.fill();
      
      // Right border
      ctx.beginPath();
      ctx.moveTo(canvas.width, 0);
      for (let y = 0; y < canvas.height; y += 30) {
        const widthVariation = canvas.width - (Math.sin(y / 40 + time + 3) * 15 + 20);
        ctx.lineTo(widthVariation, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      
      const rightGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      rightGradient.addColorStop(0, '#ff5500');
      rightGradient.addColorStop(0.5, '#ff7800');
      rightGradient.addColorStop(1, '#ff5500');
      ctx.fillStyle = rightGradient;
      ctx.fill();
    };
    
    // Draw special shapes
    const drawShape = (x: number, y: number, radius: number, shape: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      switch(shape) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 1: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -radius);
          ctx.lineTo(radius * Math.cos(Math.PI/6), radius * Math.sin(Math.PI/6));
          ctx.lineTo(-radius * Math.cos(Math.PI/6), radius * Math.sin(Math.PI/6));
          ctx.closePath();
          ctx.fill();
          break;
          
        case 2: // Square with rounded corners
          ctx.beginPath();
          ctx.roundRect(-radius * 0.7, -radius * 0.7, radius * 1.4, radius * 1.4, radius * 0.3);
          ctx.fill();
          break;
          
        case 3: // Star
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = radius;
          const innerRadius = radius * 0.4;
          
          for (let i = 0; i < spikes * 2; i++) {
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / spikes;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          
          ctx.closePath();
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };
    
    // Draw a funky "number machine" at the bottom
    const drawNumberMachine = () => {
      const machineWidth = canvas.width * 0.8;
      const machineHeight = 70;
      const machineX = (canvas.width - machineWidth) / 2;
      const machineY = canvas.height - 100;
      
      // Machine body with zig-zag top
      ctx.beginPath();
      ctx.moveTo(machineX, machineY);
      
      // Zig-zag top
      for (let x = 0; x < machineWidth; x += 20) {
        const pointX = machineX + x;
        const pointY = x % 40 === 0 ? machineY - 10 : machineY;
        ctx.lineTo(pointX, pointY);
      }
      
      ctx.lineTo(machineX + machineWidth, machineY);
      ctx.lineTo(machineX + machineWidth, machineY + machineHeight);
      ctx.lineTo(machineX, machineY + machineHeight);
      ctx.closePath();
      
      // Create metallic gradient
      const metalGradient = ctx.createLinearGradient(
        machineX, machineY, 
        machineX, machineY + machineHeight
      );
      metalGradient.addColorStop(0, '#444');
      metalGradient.addColorStop(0.5, '#777');
      metalGradient.addColorStop(1, '#333');
      
      ctx.fillStyle = metalGradient;
      ctx.fill();
      
      // Draw controls and indicators
      // Green light for even
      ctx.beginPath();
      ctx.arc(machineX + machineWidth * 0.25, machineY + 35, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#4caf50';
      ctx.shadowColor = '#4caf50';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Label
      ctx.fillStyle = 'white';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText("÷2", machineX + machineWidth * 0.25, machineY + 40);
      
      // Red light for odd
      ctx.beginPath();
      ctx.arc(machineX + machineWidth * 0.75, machineY + 35, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#f44336';
      ctx.shadowColor = '#f44336';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Label
      ctx.fillStyle = 'white';
      ctx.fillText("×3+1", machineX + machineWidth * 0.75, machineY + 40);
      
      // Center display
      ctx.fillStyle = '#222';
      ctx.fillRect(machineX + machineWidth * 0.4, machineY + 15, machineWidth * 0.2, 40);
      
      // Display text
      ctx.fillStyle = '#00ff00';
      ctx.font = '20px "Press Start 2P", monospace';
      ctx.fillText("COLLATZ", machineX + machineWidth * 0.5, machineY + 40);
      
      return {
        x: machineX,
        y: machineY,
        width: machineWidth,
        height: machineHeight,
        evenX: machineX + machineWidth * 0.25,
        evenY: machineY,
        oddX: machineX + machineWidth * 0.75,
        oddY: machineY
      };
    };
    
    // Animate everything
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw swirling background
      const time = Date.now() / 1000;
      
      // Background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width
      );
      bgGradient.addColorStop(0, '#ff9500');
      bgGradient.addColorStop(1, '#ff3d00');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw spiral patterns
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 8; angle += 0.1) {
          const radius = 10 * angle;
          const wobble = Math.sin(angle * 3 + time) * 5;
          const x = canvas.width / 2 + Math.cos(angle + time * 0.2) * (radius + wobble);
          const y = canvas.height / 2 + Math.sin(angle + time * 0.2) * (radius + wobble);
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      // Draw jagged borders
      drawJaggedBorder();
      
      // Draw the machine
      const machine = drawNumberMachine();
      
      // Draw bumpers
      bumpers.forEach(bumper => {
        // Bumper glow
        ctx.beginPath();
        const glowGradient = ctx.createRadialGradient(
          bumper.x, bumper.y, 0,
          bumper.x, bumper.y, 45
        );
        glowGradient.addColorStop(0, '#ff9500');
        glowGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.arc(bumper.x, bumper.y, 45, 0, Math.PI * 2);
        ctx.fill();
        
        // Bumper body
        ctx.fillStyle = '#ff5900';
        
        // Draw the shape
        drawShape(bumper.x, bumper.y, 40, Math.floor(Math.random() * 4), Math.random() * Math.PI);
      });
      
      // Update and draw hailstones
      hailstones.forEach((stone, index) => {
        // Apply gravity
        stone.y += 0.1;
        
        // Collision with walls
        if (stone.y < 15 || stone.y > canvas.height - 15) {
          stone.y = Math.max(15, Math.min(canvas.height - 15, stone.y));
          stone.x = Math.random() * canvas.width;
          stone.value = Math.floor(Math.random() * 50) * 2 + 5;
        }
        
        // Collision with bumpers
        bumpers.forEach(bumper => {
          const dx = stone.x - bumper.x;
          const dy = stone.y - bumper.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 40) {
            // Bounce off in the right direction
            const angle = Math.atan2(dy, dx);
            const force = 5;
            
            // Apply the bumper's effect
            stone.value = stone.value * 3 + 1;
            stone.color = `hsl(${10 + Math.random() * 20}, 100%, 50%)`;
            stone.x = bumper.x + Math.cos(angle) * force;
            stone.y = bumper.y + Math.sin(angle) * force - 3; // Extra upward boost
          }
        });
        
        // Collision with machine
        if (stone.y + 40 > machine.y && 
            stone.x > machine.x && 
            stone.x < machine.x + machine.width) {
          
          // Process the number
          if (stone.value % 2 === 0) {
            // Even - divide by 2
            stone.value = stone.value / 2;
            stone.x = machine.evenX;
            stone.y = machine.y - 40;
          } else {
            // Odd - multiply by 3 and add 1
            stone.value = stone.value * 3 + 1;
            stone.x = machine.oddX;
            stone.y = machine.y - 40;
          }
          
          // Adjust size based on value
          stone.value = Math.min(100, Math.max(5, 5 + Math.log(stone.value) * 3));
        }
        
        // Draw the hailstone
        ctx.fillStyle = stone.color;
        
        drawShape(stone.x, stone.y, stone.value, Math.floor(Math.random() * 4), Math.random() * Math.PI);
        
        // Draw the value
        ctx.fillStyle = 'white';
        ctx.font = `${Math.max(10, Math.min(14, stone.value/2))}px bold monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(stone.value.toString(), stone.x, stone.y);
      });
      
      // Draw funky title
      ctx.save();
      ctx.translate(canvas.width / 2, 40);
      ctx.rotate(Math.sin(time * 0.5) * 0.05);
      
      // Glow effect
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 15;
      
      ctx.font = '36px "Comic Sans MS", cursive';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Multi-color fill
      const gradient = ctx.createLinearGradient(-150, 0, 150, 0);
      gradient.addColorStop(0, '#ffeb3b');
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, '#ffeb3b');
      
      ctx.fillStyle = gradient;
      ctx.fillText('COLLATZ CONJECTURE', 0, 0);
      
      // Subtitle
      ctx.font = '18px Arial';
      ctx.fillText('The Mathematical Pinball Machine', 0, 35);
      
      ctx.restore();
      
      // Draw bouncy button
      const buttonX = canvas.width / 2;
      const buttonY = 100;
      const buttonWidth = 120;
      const buttonHeight = 40;
      const buttonBounce = Math.sin(time * 3) * 5;
      
      // Button shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(buttonX, buttonY + 25 + buttonBounce/2, buttonWidth/2, buttonHeight/4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Button body
      const buttonGradient = ctx.createLinearGradient(
        buttonX - buttonWidth/2, buttonY - buttonHeight/2,
        buttonX + buttonWidth/2, buttonY + buttonHeight/2
      );
      buttonGradient.addColorStop(0, '#ff9800');
      buttonGradient.addColorStop(1, '#f44336');
      
      ctx.fillStyle = buttonGradient;
      ctx.beginPath();
      ctx.roundRect(
        buttonX - buttonWidth/2, 
        buttonY - buttonHeight/2 + buttonBounce, 
        buttonWidth, 
        buttonHeight, 
        buttonHeight/2
      );
      ctx.fill();
      
      // Button text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PLAY!', buttonX, buttonY + buttonBounce);
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-4xl mx-auto shadow-2xl overflow-hidden"
      style={{
        borderRadius: '24px',
        boxShadow: '0 0 50px -12px rgba(255, 102, 0, 0.8)'
      }}
    >
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="w-full block bg-orange-600"
      />
    </div>
  );
};

export default SuperFunkyCollatzCard;