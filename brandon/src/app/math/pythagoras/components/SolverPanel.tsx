"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolverPanel() {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [sideC, setSideC] = useState(5);
  const [activeSide, setActiveSide] = useState('c');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showProof, setShowProof] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Calculate the missing side based on the active side
  useEffect(() => {
    if (activeSide === 'a') {
      setSideA(Math.sqrt(Math.pow(sideC, 2) - Math.pow(sideB, 2)));
    } else if (activeSide === 'b') {
      setSideB(Math.sqrt(Math.pow(sideC, 2) - Math.pow(sideA, 2)));
    } else if (activeSide === 'c') {
      setSideC(Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2)));
    }
    
    drawTriangle();
  }, [sideA, sideB, sideC, activeSide]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Draw the triangle and squares visualization
  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set scale factor to fit everything (keeping proportions)
    const scale = Math.min(canvas.width, canvas.height) / (sideA + sideB + sideC) / 1.5;
    
    // Center of canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw triangle
    ctx.beginPath();
    
    // Start at bottom left corner
    const startX = centerX - sideB * scale / 2;
    const startY = centerY + sideA * scale / 2;
    
    // Move to bottom right
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + sideB * scale, startY);
    
    // Move to top
    ctx.lineTo(startX + sideB * scale, startY - sideA * scale);
    
    // Close triangle
    ctx.lineTo(startX, startY);
    
    // Set style and fill
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fill();
    
    // Draw squares on each side if we're not animating
    if (!isAnimating) {
      // Square on side A - in green
      ctx.beginPath();
      ctx.rect(startX, startY - sideA * scale, -sideA * scale, sideA * scale);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.lineWidth = activeSide === 'a' ? 3 : 2;
      ctx.stroke();
      ctx.fill();
      
      // Label A²
      ctx.font = '16px Arial';
      ctx.fillStyle = '#166534';
      ctx.fillText(`a² = ${(sideA * sideA).toFixed(2)}`, startX - sideA * scale / 2 - 50, startY - sideA * scale / 2);
      
      // Square on side B - in purple
      ctx.beginPath();
      ctx.rect(startX, startY, sideB * scale, sideB * scale);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.lineWidth = activeSide === 'b' ? 3 : 2;
      ctx.stroke();
      ctx.fill();
      
      // Label B²
      ctx.font = '16px Arial';
      ctx.fillStyle = '#6b21a8';
      ctx.fillText(`b² = ${(sideB * sideB).toFixed(2)}`, startX + sideB * scale / 2 - 40, startY + sideB * scale / 2 + 20);
      
      // Square on hypotenuse (side C) - in orange
      const hypotenuseX = startX + sideB * scale;
      const hypotenuseY = startY - sideA * scale;
      
      ctx.save();
      ctx.translate(hypotenuseX, hypotenuseY);
      ctx.rotate(-Math.atan2(sideA, sideB) - Math.PI / 2);
      
      ctx.beginPath();
      ctx.rect(0, 0, sideC * scale, sideC * scale);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.8)';
      ctx.lineWidth = activeSide === 'c' ? 3 : 2;
      ctx.stroke();
      ctx.fill();
      
      ctx.restore();
      
      // Label C²
      const hypotCenterX = hypotenuseX - sideC * scale / 2 * Math.sin(Math.atan2(sideA, sideB));
      const hypotCenterY = hypotenuseY + sideC * scale / 2 * Math.cos(Math.atan2(sideA, sideB));
      
      ctx.font = '16px Arial';
      ctx.fillStyle = '#9a3412';
      ctx.fillText(`c² = ${(sideC * sideC).toFixed(2)}`, hypotCenterX - 40, hypotCenterY - 10);
    } else {
      // If animating, draw the animated proof
      drawAnimatedProof(ctx, startX, startY, scale, animationFrame);
    }
    
    // Label sides
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#000';
    
    // Label side A
    ctx.fillStyle = activeSide === 'a' ? '#166534' : '#000';
    ctx.fillText(`a = ${sideA.toFixed(2)}`, startX - 35, startY - sideA * scale / 2);
    
    // Label side B
    ctx.fillStyle = activeSide === 'b' ? '#6b21a8' : '#000';
    ctx.fillText(`b = ${sideB.toFixed(2)}`, startX + sideB * scale / 2, startY + 20);
    
    // Label hypotenuse (side C)
    ctx.fillStyle = activeSide === 'c' ? '#9a3412' : '#000';
    const hypotTextX = startX + sideB * scale / 2 - 20;
    const hypotTextY = startY - sideA * scale / 2 - 10;
    ctx.fillText(`c = ${sideC.toFixed(2)}`, hypotTextX, hypotTextY);
    
    // Draw the right angle symbol
    ctx.beginPath();
    ctx.moveTo(startX + 20, startY);
    ctx.lineTo(startX + 20, startY - 20);
    ctx.lineTo(startX, startY - 20);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Draw the animated theorem proof
  const drawAnimatedProof = (ctx, startX, startY, scale, frame) => {
    // Animation has 100 frames total
    const progress = frame / 100;
    
    // Get triangle measurements
    const squareA = sideA * sideA;
    const squareB = sideB * sideB;
    const squareC = sideC * sideC;
    
    // Draw square A (it stays static)
    ctx.beginPath();
    ctx.rect(startX, startY - sideA * scale, -sideA * scale, sideA * scale);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.stroke();
    ctx.fill();
    
    // Draw square B (it stays static)
    ctx.beginPath();
    ctx.rect(startX, startY, sideB * scale, sideB * scale);
    ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
    ctx.stroke();
    ctx.fill();
    
    // Draw breaking up of square C
    const hypotenuseX = startX + sideB * scale;
    const hypotenuseY = startY - sideA * scale;
    
    if (progress < 0.5) {
      // Phase 1: Rotate the C square
      const rotateProgress = progress * 2; // 0 to 1 during first half
      
      ctx.save();
      ctx.translate(hypotenuseX, hypotenuseY);
      
      // Initial rotation for the hypotenuse square
      const initialRotation = -Math.atan2(sideA, sideB) - Math.PI / 2;
      
      // Gradually rotate to horizontal
      const currentRotation = initialRotation * (1 - rotateProgress);
      ctx.rotate(currentRotation);
      
      // Draw the square
      ctx.beginPath();
      ctx.rect(0, 0, sideC * scale, sideC * scale);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.8)';
      ctx.stroke();
      ctx.fill();
      
      ctx.restore();
    } else {
      // Phase 2: Split the square C into two rectangles that move to A and B
      const splitProgress = (progress - 0.5) * 2; // 0 to 1 during second half
      
      // Calculate how much of square C corresponds to square A and B
      const areaRatioA = squareA / squareC;
      const splitPoint = sideC * scale * areaRatioA;
      
      // First rectangle (moving toward square A)
      ctx.save();
      ctx.beginPath();
      
      // Start position is part of square C
      const startPosX = hypotenuseX - splitProgress * (hypotenuseX - (startX - sideA * scale / 2));
      const startPosY = hypotenuseY - splitProgress * (hypotenuseY - (startY - sideA * scale / 2));
      
      ctx.rect(startPosX, startPosY, splitPoint, sideC * scale);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.stroke();
      ctx.fill();
      ctx.restore();
      
      // Second rectangle (moving toward square B)
      ctx.save();
      ctx.beginPath();
      
      // Start position is the other part of square C
      const startPosX2 = hypotenuseX + splitPoint - splitProgress * (hypotenuseX + splitPoint - (startX + sideB * scale / 2));
      const startPosY2 = hypotenuseY - splitProgress * (hypotenuseY - (startY + sideB * scale / 2));
      
      ctx.rect(startPosX2, startPosY2, sideC * scale - splitPoint, sideC * scale);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.stroke();
      ctx.fill();
      ctx.restore();
      
      // Show equation at the end
      if (splitProgress > 0.9) {
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(`${squareA.toFixed(2)} + ${squareB.toFixed(2)} = ${squareC.toFixed(2)}`, centerX - 80, centerY - 100);
      }
    }
  };
  
  const handleAnimate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationFrame(0);
    
    const animate = () => {
      setAnimationFrame(prev => {
        if (prev >= 100) {
          setIsAnimating(false);
          return 0;
        }
        return prev + 1;
      });
      
      if (animationFrame < 100) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  return (
    <div className="panel-container bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Interactive Pythagorean Theorem
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                <span className="inline-block w-6 h-6 rounded-full bg-green-500 mr-2"></span>
                Side a
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="activeSide"
                  checked={activeSide === 'a'}
                  onChange={() => setActiveSide('a')}
                  className="text-green-500 focus:ring-green-500"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">Calculate</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={sideA}
                onChange={(e) => setSideA(parseFloat(e.target.value))}
                disabled={activeSide === 'a'}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  activeSide === 'a' ? 'bg-gray-300' : 'bg-green-200'
                }`}
              />
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10" 
                  step="0.1"
                  value={sideA}
                  onChange={(e) => setSideA(parseFloat(e.target.value))}
                  disabled={activeSide === 'a'}
                  className={`w-20 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-center
                    ${activeSide === 'a' ? 'text-gray-500' : 'text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'}
                  `}
                />
                {activeSide === 'a' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                <span className="inline-block w-6 h-6 rounded-full bg-purple-500 mr-2"></span>
                Side b
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="activeSide"
                  checked={activeSide === 'b'}
                  onChange={() => setActiveSide('b')}
                  className="text-purple-500 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">Calculate</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={sideB}
                onChange={(e) => setSideB(parseFloat(e.target.value))}
                disabled={activeSide === 'b'}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  activeSide === 'b' ? 'bg-gray-300' : 'bg-purple-200'
                }`}
              />
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10" 
                  step="0.1"
                  value={sideB}
                  onChange={(e) => setSideB(parseFloat(e.target.value))}
                  disabled={activeSide === 'b'}
                  className={`w-20 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-center
                    ${activeSide === 'b' ? 'text-gray-500' : 'text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'}
                  `}
                />
                {activeSide === 'b' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                <span className="inline-block w-6 h-6 rounded-full bg-orange-500 mr-2"></span>
                Hypotenuse (c)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="activeSide"
                  checked={activeSide === 'c'}
                  onChange={() => setActiveSide('c')}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">Calculate</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={sideC}
                onChange={(e) => setSideC(parseFloat(e.target.value))}
                disabled={activeSide === 'c'}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  activeSide === 'c' ? 'bg-gray-300' : 'bg-orange-200'
                }`}
              />
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="15" 
                  step="0.1"
                  value={sideC}
                  onChange={(e) => setSideC(parseFloat(e.target.value))}
                  disabled={activeSide === 'c'}
                  className={`w-20 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-center
                    ${activeSide === 'c' ? 'text-gray-500' : 'text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-700'}
                  `}
                />
                {activeSide === 'c' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                )}
              </div>
            </div>
          </div>
          
          <div className="py-4 px-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Pythagorean Equation</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 text-lg">
              <div className="flex items-center">
                <span className={`font-medium ${activeSide === 'a' ? 'text-green-600 dark:text-green-400' : ''}`}>a²</span>
                <span className="px-1 text-gray-500 dark:text-gray-400">{sideA.toFixed(2)}² = {(sideA * sideA).toFixed(2)}</span>
              </div>
              <span>+</span>
              <div className="flex items-center">
                <span className={`font-medium ${activeSide === 'b' ? 'text-purple-600 dark:text-purple-400' : ''}`}>b²</span>
                <span className="px-1 text-gray-500 dark:text-gray-400">{sideB.toFixed(2)}² = {(sideB * sideB).toFixed(2)}</span>
              </div>
              <span>=</span>
              <div className="flex items-center">
                <span className={`font-medium ${activeSide === 'c' ? 'text-orange-600 dark:text-orange-400' : ''}`}>c²</span>
                <span className="px-1 text-gray-500 dark:text-gray-400">{sideC.toFixed(2)}² = {(sideC * sideC).toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-2 text-center text-gray-600 dark:text-gray-400 text-sm">
              {Math.abs((sideA * sideA) + (sideB * sideB) - (sideC * sideC)) < 0.01 ? (
                <span className="text-green-600 dark:text-green-400">✓ The equation is balanced!</span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400">Try adjusting values to balance the equation</span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAnimate}
              className={`py-3 px-4 rounded-md text-white font-medium transition-colors
                bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                flex items-center justify-center gap-2
              `}
              disabled={isAnimating}
            >
              {isAnimating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Animating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Animate Theorem
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowProof(!showProof)}
              className={`py-3 px-4 rounded-md font-medium transition-colors
                flex items-center justify-center gap-2
                ${showProof 
                  ? 'bg-indigo-100 border-2 border-indigo-300 text-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-700 dark:text-indigo-300' 
                  : 'bg-gray-100 border-2 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                }
                hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-700
                dark:hover:bg-indigo-900/40 dark:hover:border-indigo-700 dark:hover:text-indigo-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
              </svg>
              {showProof ? '2D View' : '3D View'}
            </motion.button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-inner">
          <AnimatePresence mode="wait">
            {!showProof ? (
              <motion.div
                key="2d-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <canvas 
                  ref={canvasRef} 
                  width={500} 
                  height={500} 
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg w-full h-full"
                />
              </motion.div>
            ) : (
              <motion.div
                key="3d-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <div className="p-4 relative w-full h-full min-h-[400px]">
                  <div className="cube" style={{ 
                    width: `${sideA * 25}px`, 
                    height: `${sideA * 25}px`, 
                    left: '10%', 
                    top: '50%', 
                    background: 'rgba(34, 197, 94, 0.3)', 
                    border: '2px solid rgba(34, 197, 94, 0.8)' 
                  }}>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face front">
                      <span className="text-center">{(sideA * sideA).toFixed(1)}</span>
                    </div>
                    <div className="face back"></div>
                  </div>
                  
                  <div className="cube" style={{ 
                    width: `${sideB * 25}px`, 
                    height: `${sideB * 25}px`, 
                    right: '10%', 
                    top: '50%', 
                    background: 'rgba(168, 85, 247, 0.3)', 
                    border: '2px solid rgba(168, 85, 247, 0.8)' 
                  }}>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face front">
                      <span className="text-center">{(sideB * sideB).toFixed(1)}</span>
                    </div>
                    <div className="face back"></div>
                  </div>
                  
                  <div className="cube" style={{ 
                    width: `${sideC * 20}px`, 
                    height: `${sideC * 20}px`, 
                    left: '50%', 
                    top: '20%', 
                    background: 'rgba(249, 115, 22, 0.3)', 
                    border: '2px solid rgba(249, 115, 22, 0.8)' 
                  }}>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face front">
                      <span className="text-center">{(sideC * sideC).toFixed(1)}</span>
                    </div>
                    <div className="face back"></div>
                  </div>
                  
                  <div className="absolute top-2 left-2 text-gray-700 dark:text-gray-300 text-sm">
                    Drag to rotate
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <style jsx>{`
        .cube {
          position: absolute;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(-30deg);
          animation: rotate 15s infinite linear;
          transition: all 0.3s ease;
        }
        
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.6);
        }
        
        .front { transform: translateZ(25px); }
        .back { transform: translateZ(-25px) rotateY(180deg); }
        .left { transform: translateX(-50%) rotateY(-90deg); width: 50px; }
        .right { transform: translateX(100%) rotateY(90deg); width: 50px; }
        .top { transform: translateY(-50%) rotateX(90deg); height: 50px; }
        .bottom { transform: translateY(100%) rotateX(-90deg); height: 50px; }
        
        @keyframes rotate {
          from { transform: rotateX(-20deg) rotateY(0); }
          to { transform: rotateX(-20deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
