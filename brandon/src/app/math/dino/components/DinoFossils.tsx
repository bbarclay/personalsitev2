'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EraId, ERAS } from '../utils/era-utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getCanvasContext } from '../hooks/useCanvas';

interface DinoFossilsProps {
  currentEra: EraId;
  darkMode: boolean;
  onFossilFound: (value: number) => void;
}

interface Fossil {
  id: string;
  x: number;
  y: number;
  size: number;
  discovered: boolean;
  type: 'bone' | 'skull' | 'footprint' | 'tooth' | 'egg';
  value: number;
}

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
}

export function DinoFossils({ currentEra, darkMode, onFossilFound }: DinoFossilsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fossils, setFossils] = useState<Fossil[]>([]);
  const [digProgress, setDigProgress] = useState(0);
  const [selectedTile, setSelectedTile] = useState<{ x: number, y: number } | null>(null);
  const [showMathProblem, setShowMathProblem] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [discoveredFossils, setDiscoveredFossils] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isDigging, setIsDigging] = useState(false);
  
  const gridSize = 5; // 5x5 grid
  const tileSize = 80; // 80px tiles
  
  // Initialize the dig site with hidden fossils
  useEffect(() => {
    if (!canvasRef.current) return;
    
    generateFossils();
    drawDigSite();
    
    // Add click handler
    const handleCanvasClick = (e: MouseEvent) => {
      if (!canvasRef.current || isDigging) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / tileSize);
      const y = Math.floor((e.clientY - rect.top) / tileSize);
      
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        setSelectedTile({ x, y });
        startDigging(x, y);
      }
    };
    
    canvasRef.current.addEventListener('click', handleCanvasClick);
    
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleCanvasClick);
      }
    };
  }, [currentEra, isDigging, darkMode]);
  
  // Generate random fossils based on the current era
  const generateFossils = () => {
    const newFossils: Fossil[] = [];
    const eraInfo = ERAS[currentEra];
    const fossilCount = Math.floor(Math.random() * 3) + 3; // 3-5 fossils
    
    for (let i = 0; i < fossilCount; i++) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      const fossilType = ['bone', 'skull', 'footprint', 'tooth', 'egg'][Math.floor(Math.random() * 5)] as Fossil['type'];
      
      // Ensure no duplicate positions
      if (!newFossils.some(f => f.x === x && f.y === y)) {
        newFossils.push({
          id: `fossil-${Date.now()}-${i}`,
          x,
          y,
          size: 30 + Math.random() * 20,
          discovered: false,
          type: fossilType,
          value: 10 + (eraInfo.difficulty * 5) + (fossilType === 'skull' ? 15 : 0)
        });
      } else {
        i--; // Try again if position is already taken
      }
    }
    
    setFossils(newFossils);
    setDiscoveredFossils(0);
  };
  
  // Draw the dig site on the canvas
  const drawDigSite = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = getCanvasContext(canvas);
    const width = gridSize * tileSize;
    const height = gridSize * tileSize;
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Draw background
    ctx.fillStyle = darkMode ? '#2d3748' : '#f7fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = darkMode ? '#4a5568' : '#e2e8f0';
    ctx.lineWidth = 2;
    
    for (let x = 0; x <= gridSize; x++) {
      ctx.beginPath();
      ctx.moveTo(x * tileSize, 0);
      ctx.lineTo(x * tileSize, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= gridSize; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * tileSize);
      ctx.lineTo(width, y * tileSize);
      ctx.stroke();
    }
    
    // Draw soil texture on undiscovered tiles
    const soilColor = darkMode ? '#4a5568' : '#d69e2e';
    const textureColor = darkMode ? '#2d3748' : '#f6e05e';
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Check if there's a fossil here
        const fossil = fossils.find(f => f.x === x && f.y === y);
        
        if (!fossil || !fossil.discovered) {
          // Draw soil
          ctx.fillStyle = soilColor;
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          
          // Add soil texture
          ctx.fillStyle = textureColor;
          for (let i = 0; i < 20; i++) {
            const dotX = x * tileSize + Math.random() * tileSize;
            const dotY = y * tileSize + Math.random() * tileSize;
            const dotSize = 1 + Math.random() * 2;
            ctx.beginPath();
            ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // If this is the selected tile and digging, show dig progress
          if (selectedTile && selectedTile.x === x && selectedTile.y === y && isDigging) {
            const progressWidth = (digProgress / 100) * tileSize;
            ctx.fillStyle = '#4c1d95';
            ctx.fillRect(x * tileSize, y * tileSize + (tileSize / 2) - 5, progressWidth, 10);
          }
        } else if (fossil && fossil.discovered) {
          // Draw discovered fossil
          ctx.fillStyle = darkMode ? '#f7fafc' : '#ffffff';
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          
          // Draw fossil icon
          drawFossilIcon(ctx, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, fossil.type, fossil.size);
        }
      }
    }
  };
  
  // Draw a fossil icon
  const drawFossilIcon = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    type: Fossil['type'],
    size: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Bone color
    ctx.fillStyle = '#a1a1aa';
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 2;
    
    switch (type) {
      case 'bone':
        // Draw a simple bone shape
        ctx.beginPath();
        ctx.ellipse(-size/2, -size/4, size/4, size/6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(size/2, size/4, size/4, size/6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-size/3, -size/6);
        ctx.lineTo(size/3, size/6);
        ctx.lineWidth = size/5;
        ctx.stroke();
        break;
        
      case 'skull':
        // Draw a simple dinosaur skull shape
        ctx.beginPath();
        ctx.ellipse(0, 0, size/2, size/3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Draw eye sockets
        ctx.fillStyle = '#27272a';
        ctx.beginPath();
        ctx.ellipse(-size/6, -size/8, size/12, size/10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw snout
        ctx.fillStyle = '#a1a1aa';
        ctx.beginPath();
        ctx.moveTo(size/4, 0);
        ctx.lineTo(size/2, -size/8);
        ctx.lineTo(size/2, size/8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'footprint':
        // Draw a dinosaur footprint
        ctx.beginPath();
        ctx.ellipse(0, 0, size/3, size/2, 0, 0, Math.PI * 2);
        
        // Add toe impressions
        ctx.moveTo(0, -size/2);
        ctx.lineTo(0, -size * 0.7);
        
        ctx.moveTo(-size/4, -size/3);
        ctx.lineTo(-size/3, -size * 0.6);
        
        ctx.moveTo(size/4, -size/3);
        ctx.lineTo(size/3, -size * 0.6);
        
        ctx.lineWidth = size/10;
        ctx.stroke();
        break;
        
      case 'tooth':
        // Draw a dinosaur tooth
        ctx.beginPath();
        ctx.moveTo(-size/6, -size/2);
        ctx.lineTo(size/6, -size/2);
        ctx.lineTo(0, size/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'egg':
        // Draw a dinosaur egg
        ctx.beginPath();
        ctx.ellipse(0, 0, size/3, size/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add some texture to the egg
        ctx.strokeStyle = '#52525b';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(
            0, 
            0, 
            (size/3) * (0.6 + i * 0.1), 
            (size/2) * (0.6 + i * 0.1), 
            0, 
            0, 
            Math.PI * 2
          );
          ctx.stroke();
        }
        break;
    }
    
    ctx.restore();
  };
  
  // Start the digging animation and process
  const startDigging = (x: number, y: number) => {
    setIsDigging(true);
    setDigProgress(0);
    
    // Check if there's a fossil here
    const fossilIndex = fossils.findIndex(f => f.x === x && f.y === y);
    
    // Show math problem if there's a fossil
    if (fossilIndex !== -1 && !fossils[fossilIndex].discovered) {
      generateMathProblem();
    } else {
      // No fossil here, just dig
      const digInterval = setInterval(() => {
        setDigProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(digInterval);
            setIsDigging(false);
            setSelectedTile(null);
            setMessage("No fossil found here. Try another spot!");
            setTimeout(() => setMessage(null), 3000);
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }
  };
  
  // Generate a math problem based on the current era
  const generateMathProblem = () => {
    const eraInfo = ERAS[currentEra];
    let question = '';
    let answer = 0;
    let options: number[] = [];
    
    // Create a problem based on era difficulty
    switch (eraInfo.difficulty) {
      case 1: // Triassic - Simple addition/subtraction
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const isAddition = Math.random() > 0.5;
        
        if (isAddition) {
          question = `${num1} + ${num2} = ?`;
          answer = num1 + num2;
        } else {
          // Ensure subtraction result is positive
          const [larger, smaller] = num1 > num2 ? [num1, num2] : [num2, num1];
          question = `${larger} - ${smaller} = ?`;
          answer = larger - smaller;
        }
        break;
        
      case 2: // Jurassic - Multiplication/division
        const factor1 = Math.floor(Math.random() * 10) + 1;
        const factor2 = Math.floor(Math.random() * 5) + 1;
        const isMultiplication = Math.random() > 0.3;
        
        if (isMultiplication) {
          question = `${factor1} × ${factor2} = ?`;
          answer = factor1 * factor2;
        } else {
          const product = factor1 * factor2;
          question = `${product} ÷ ${factor1} = ?`;
          answer = factor2;
        }
        break;
        
      case 3: // Cretaceous - More complex problems
        const operation = Math.floor(Math.random() * 4);
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        
        switch (operation) {
          case 0: // Addition
            question = `${a} + ${b} = ?`;
            answer = a + b;
            break;
          case 1: // Subtraction
            question = `${a + b} - ${b} = ?`;
            answer = a;
            break;
          case 2: // Multiplication
            question = `${a} × ${b} = ?`;
            answer = a * b;
            break;
          case 3: // Division
            const product = a * b;
            question = `${product} ÷ ${b} = ?`;
            answer = a;
            break;
        }
        break;
    }
    
    // Generate options (including correct answer)
    options = [answer];
    
    while (options.length < 4) {
      // Generate a wrong answer that's close to the right one
      const wrongAnswer = answer + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      
      // Ensure it's positive and not a duplicate
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    setCurrentProblem({ question, answer, options });
    setDigProgress(50); // Set progress to 50% when problem appears
    
    // Show the math problem after a short delay
    setTimeout(() => {
      setShowMathProblem(true);
    }, 1000);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (selectedAnswer: number) => {
    if (!currentProblem || !selectedTile) return;
    
    const isCorrect = selectedAnswer === currentProblem.answer;
    
    if (isCorrect) {
      // Find the fossil at the selected tile
      const fossilIndex = fossils.findIndex(f => f.x === selectedTile.x && f.y === selectedTile.y);
      
      if (fossilIndex !== -1) {
        // Update the fossil as discovered
        const updatedFossils = [...fossils];
        updatedFossils[fossilIndex] = {
          ...updatedFossils[fossilIndex],
          discovered: true
        };
        
        setFossils(updatedFossils);
        setDiscoveredFossils(prev => prev + 1);
        
        // Award points
        onFossilFound(updatedFossils[fossilIndex].value);
        
        // Show success message
        setMessage(`You found a ${updatedFossils[fossilIndex].type}! +${updatedFossils[fossilIndex].value} points`);
        setTimeout(() => setMessage(null), 3000);
      }
    } else {
      // Show failure message
      setMessage("Incorrect answer. Try again with another dig spot!");
      setTimeout(() => setMessage(null), 3000);
    }
    
    // Reset state
    setShowMathProblem(false);
    setCurrentProblem(null);
    setSelectedTile(null);
    setIsDigging(false);
    setDigProgress(0);
    
    // Redraw dig site
    drawDigSite();
  };
  
  // Reset the dig site with new fossils
  const resetDigSite = () => {
    generateFossils();
    drawDigSite();
    setMessage("New fossils have been hidden!");
    setTimeout(() => setMessage(null), 3000);
  };
  
  // Update dig site when needed
  useEffect(() => {
    drawDigSite();
  }, [fossils, selectedTile, digProgress, isDigging, darkMode]);
  
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Card className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Dino Fossil Dig</h3>
          <div className="text-sm">
            Fossils found: {discoveredFossils}/{fossils.length}
          </div>
        </div>
        
        <div className="relative">
          <canvas 
            ref={canvasRef} 
            className="mx-auto border rounded-md shadow-md"
          />
          
          {/* Dig progress indicator */}
          {isDigging && !showMathProblem && (
            <div className="absolute top-2 left-0 right-0 mx-auto w-2/3 text-center">
              <p className="text-sm mb-1">Digging...</p>
              <Progress value={digProgress} className="h-2" />
            </div>
          )}
          
          {/* Status message */}
          {message && (
            <div className={`
              absolute bottom-4 left-0 right-0 mx-auto
              bg-opacity-90 p-3 rounded-lg text-center max-w-xs
              transform transition-all duration-300 ease-in-out
              ${darkMode 
                ? 'bg-gray-700 text-white' 
                : 'bg-amber-100 text-amber-900'
              }
            `}>
              {message}
            </div>
          )}
          
          {/* Math problem overlay */}
          {showMathProblem && currentProblem && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className={`
                p-4 shadow-lg w-80
                ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}
              `}>
                <h4 className="text-lg font-bold mb-3 text-center">
                  Solve to dig!
                </h4>
                
                <p className="text-xl text-center mb-4 font-mono">
                  {currentProblem.question}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {currentProblem.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={darkMode ? 'hover:bg-gray-600' : ''}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
        
        {/* Control buttons */}
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            className={`mx-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
            onClick={resetDigSite}
            disabled={isDigging || showMathProblem}
          >
            New Dig Site
          </Button>
          
          {discoveredFossils === fossils.length && fossils.length > 0 && (
            <Button
              variant="default"
              className="mx-2"
              onClick={resetDigSite}
            >
              All Fossils Found! Dig Again
            </Button>
          )}
        </div>
      </Card>
      
      <div className="text-sm text-center opacity-80">
        <p>Click on a spot to dig. Solve math problems to uncover fossils!</p>
        <p>Different fossil types are worth different point values.</p>
      </div>
    </div>
  );
} 