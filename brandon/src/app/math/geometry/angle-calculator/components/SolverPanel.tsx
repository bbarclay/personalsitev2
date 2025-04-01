"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { 
  Compass, 
  Ruler, 
  Maximize2, 
  MinusCircle, 
  PlusCircle, 
  RotateCcw, 
  RotateCw,
  Download,
  Camera,
  Palette,
  Grid3X3
} from 'lucide-react';

interface Point { x: number; y: number; }

type AngleMode = 'triangle' | 'polygon' | 'circle' | 'parallel';

export default function SolverPanel() {
  // Core state
  const [mode, setMode] = useState<AngleMode>('triangle');
  const [angles, setAngles] = useState<number[]>([60, 60, 60]);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#4F46E5');
  const [history, setHistory] = useState<string[]>([]);
  const [snapshots, setSnapshots] = useState<string[]>([]);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const modes = [
    { id: 'triangle', label: 'Triangles', icon: '📐' },
    { id: 'polygon', label: 'Polygons', icon: '⬡' },
    { id: 'circle', label: 'Circles', icon: '⭕' },
    { id: 'parallel', label: 'Parallel Lines', icon: '∥' }
  ];

  // Enhanced presets with animations
  const presetTriangles = [
    { 
      name: 'Equilateral', 
      angles: [60, 60, 60],
      animation: { scale: [1, 1.2, 1], rotate: [0, 360, 0] }
    },
    { 
      name: 'Right', 
      angles: [90, 45, 45],
      animation: { scale: [1, 1.1, 1], rotate: [0, 90, 0] }
    },
    { 
      name: 'Golden', 
      angles: [72, 72, 36],
      animation: { scale: [1, 1.15, 1], rotate: [0, 144, 0] }
    },
    { 
      name: 'Custom', 
      angles: [120, 30, 30],
      animation: { scale: [1, 1.05, 1], rotate: [0, 180, 0] }
    }
  ];

  useEffect(() => {
    drawShape();
  }, [angles, rotation, mode]);

  const drawShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and setup
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(scale, scale);

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx);
    }

    // Apply global styles
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw shape with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Draw based on mode
    switch (mode) {
      case 'triangle':
        drawTriangle(ctx);
        break;
      case 'polygon':
        drawPolygon(ctx);
        break;
      case 'circle':
        drawCircle(ctx);
        break;
      case 'parallel':
        drawParallelLines(ctx);
        break;
    }

    // Draw measurements if enabled
    if (showMeasurements) {
      drawMeasurements(ctx);
    }

    ctx.restore();
  };

  const drawTriangle = (ctx: CanvasRenderingContext2D) => {
    const radius = 100;
    const points = calculateTrianglePoints(angles, radius);
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw angle arcs
    points.forEach((point, i) => {
      drawAngleArc(ctx, point, angles[i], '#4F46E5');
    });
  };

  const calculateTrianglePoints = (angles: number[], radius: number) => {
    // Convert angles to radians and calculate points
    const points = [];
    let currentAngle = 0;
    
    for (let i = 0; i < 3; i++) {
      points.push({
        x: radius * Math.cos(currentAngle),
        y: radius * Math.sin(currentAngle)
      });
      currentAngle += angles[i] * Math.PI / 180;
    }
    
    return points;
  };

  const drawAngleArc = (ctx: CanvasRenderingContext2D, point: {x: number, y: number}, angle: number, color: string) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 20, 0, angle * Math.PI / 180);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D) => {
    const radius = 100;
    const sides = angles.length || 5; // Use the length of angles array or default to 5
    const angleStep = (2 * Math.PI) / sides;
    
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const x = radius * Math.cos(i * angleStep);
      const y = radius * Math.sin(i * angleStep);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    
    // Draw interior angles if measurements are enabled
    if (showMeasurements) {
      const interiorAngle = ((sides - 2) * 180) / sides;
      
      for (let i = 0; i < sides; i++) {
        const x = radius * Math.cos(i * angleStep);
        const y = radius * Math.sin(i * angleStep);
        
        // Draw angle arc at each vertex
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, interiorAngle * Math.PI / 180);
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };
  
  const drawCircle = (ctx: CanvasRenderingContext2D) => {
    const radius = 100;
    
    // Draw main circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw diameter
    ctx.beginPath();
    ctx.moveTo(-radius, 0);
    ctx.lineTo(radius, 0);
    ctx.stroke();
    
    // Draw radius
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius);
    ctx.stroke();
    
    // Draw angle measurement if enabled
    if (showMeasurements) {
      // Draw 90° angle at center
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI / 2);
      ctx.strokeStyle = selectedColor;
      ctx.stroke();
      
      // Label center angle
      ctx.font = '14px Arial';
      ctx.fillStyle = selectedColor;
      ctx.textAlign = 'center';
      ctx.fillText('90°', 15, -15);
      
      // Label radius
      ctx.fillText('r', 10, -radius/2);
      
      // Label diameter
      ctx.fillText('2r', 0, 15);
    }
  };

  const handleAngleChange = (index: number, value: number) => {
    const newAngles = [...angles];
    newAngles[index] = value;
    setAngles(newAngles);
  };

  const handleRotation = (amount: number) => {
    setRotation(prev => (prev + amount) % 360);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x < width; x += gridSize) {
      ctx.moveTo(x - width/2, -height/2);
      ctx.lineTo(x - width/2, height/2);
    }

    // Draw horizontal lines
    for (let y = 0; y < height; y += gridSize) {
      ctx.moveTo(-width/2, y - height/2);
      ctx.lineTo(width/2, y - height/2);
    }

    ctx.stroke();
  };

  const drawParallelLines = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const lineSpacing = 40;
    const lineAngle = rotation * Math.PI / 180;
    
    // Calculate parallel line coordinates using the angle
    const lines = [];
    const numberOfLines = 5;
    const centerOffset = (numberOfLines - 1) * lineSpacing / 2;
    
    for (let i = 0; i < numberOfLines; i++) {
      const offset = i * lineSpacing - centerOffset;
      
      // Calculate perpendicular direction to draw parallel lines
      const perpX = Math.cos(lineAngle + Math.PI/2);
      const perpY = Math.sin(lineAngle + Math.PI/2);
      
      // Calculate start and end points for each line
      const lineLength = 200;
      const startX = perpX * offset - Math.cos(lineAngle) * lineLength;
      const startY = perpY * offset - Math.sin(lineAngle) * lineLength;
      const endX = perpX * offset + Math.cos(lineAngle) * lineLength;
      const endY = perpY * offset + Math.sin(lineAngle) * lineLength;
      
      lines.push({ startX, startY, endX, endY });
    }
    
    // Draw each parallel line
    lines.forEach((line, i) => {
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add angle indicator between lines if needed
      if (i < lines.length - 1 && showMeasurements) {
        const midX = (line.startX + line.endX) / 2;
        const midY = (line.startY + line.endY) / 2;
        
        ctx.font = '14px Arial';
        ctx.fillStyle = selectedColor;
        ctx.textAlign = 'center';
        ctx.fillText('0°', midX, midY + 20);
      }
    });
  };

  // Enhanced measurement drawing
  const drawMeasurements = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '14px Arial';
    ctx.fillStyle = selectedColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    angles.forEach((angle, i) => {
      // Calculate position for angle label
      const radius = 130;
      const angleInRadians = (i * 120) * Math.PI / 180;
      const x = radius * Math.cos(angleInRadians);
      const y = radius * Math.sin(angleInRadians);

      // Draw angle value with background
      const text = `${angle}°`;
      const metrics = ctx.measureText(text);
      const padding = 4;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(
        x - metrics.width/2 - padding,
        y - 10 - padding,
        metrics.width + padding * 2,
        20 + padding * 2
      );

      ctx.fillStyle = selectedColor;
      ctx.fillText(text, x, y);
    });
  };

  // Utility functions
  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    setSnapshots(prev => [...prev, dataUrl]);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `angle-calculator-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Animation and interaction handlers
  const handlePresetClick = (preset: typeof presetTriangles[0]) => {
    setIsAnimating(true);
    setAngles(preset.angles);
    
    // Trigger animation sequence
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAnimating(false);
    };
    sequence();
  };

  return (
    <div className="flex flex-col space-y-6" ref={containerRef}>
      {/* Enhanced Mode Selection */}
      <div className="flex space-x-4 justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
        {modes.map(({ id, label, icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg flex items-center space-x-3 
              ${mode === id ? 'bg-white text-blue-500' : 'bg-transparent text-white'}`}
            onClick={() => setMode(id as AngleMode)}
          >
            <span className="text-2xl">{icon}</span>
            <span className="font-semibold">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Interactive Canvas with Tools */}
      <div className="relative">
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-lg"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid3X3 size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-lg"
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
          >
            <Palette size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-lg"
            onClick={saveSnapshot}
          >
            <Camera size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-lg"
            onClick={downloadCanvas}
          >
            <Download size={20} />
          </motion.button>
        </div>

        <AnimatePresence>
          {colorPickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 right-4 z-20"
            >
              <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
            </motion.div>
          )}
        </AnimatePresence>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-[600px] border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-xl"
          onMouseDown={(e) => {
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              const dx = e.clientX - dragStart.x;
              handleRotation(dx * 0.5);
              setDragStart({ x: e.clientX, y: e.clientY });
            }
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onWheel={(e) => {
            e.preventDefault();
            const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
            setScale(Math.max(0.5, Math.min(2, newScale)));
          }}
        />

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-lg"
            onClick={() => setScale(Math.min(2, scale + 0.1))}
          >
            <PlusCircle size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-lg"
            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
          >
            <MinusCircle size={20} />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Controls */}
      {mode === 'triangle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-center space-x-4">
            {presetTriangles.map((preset) => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={isAnimating ? preset.animation : {}}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white rounded-lg shadow-lg font-semibold"
                onClick={() => handlePresetClick(preset)}
              >
                {preset.name}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {angles.map((angle, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Angle {i + 1}
                </label>
                <input
                  type="range"
                  min="1"
                  max="178"
                  value={angle}
                  onChange={(e) => handleAngleChange(i, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAngleChange(i, Math.max(1, angle - 1))}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-blue-500">{angle}°</span>
                  <button
                    onClick={() => handleAngleChange(i, Math.min(178, angle + 1))}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Snapshots Gallery */}
      {snapshots.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Saved Snapshots</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {snapshots.map((snapshot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <img
                  src={snapshot}
                  alt={`Snapshot ${i + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                  onClick={() => setSnapshots(prev => prev.filter((_, index) => index !== i))}
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
