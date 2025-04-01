'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, Minus, Trash2, MoveHorizontal, Circle as CircleIcon, Square, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { randomColor } from '../utils/colors';

interface GeometryPlotterProps {
  points: {id: string, x: number, y: number, color: string}[];
  lines: {id: string, start: [number, number], end: [number, number], equation: string, color: string}[];
  circles: {id: string, center: [number, number], radius: number, equation: string, color: string}[];
  onPointsChange: (points: {id: string, x: number, y: number, color: string}[]) => void;
  onLinesChange: (lines: {id: string, start: [number, number], end: [number, number], equation: string, color: string}[]) => void;
  onCirclesChange: (circles: {id: string, center: [number, number], radius: number, equation: string, color: string}[]) => void;
}

export const GeometryPlotter: React.FC<GeometryPlotterProps> = ({
  points, lines, circles, onPointsChange, onLinesChange, onCirclesChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'point' | 'line' | 'circle' | 'pan'>('point');
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [dragStart, setDragStart] = useState<[number, number] | null>(null);
  const [lineStart, setLineStart] = useState<[number, number] | null>(null);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  
  // Draw the coordinate system and all geometry objects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate grid parameters
    const gridSize = 50 * zoom;
    const xOffset = offset[0] % gridSize;
    const yOffset = offset[1] % gridSize;
    
    // Draw grid
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = xOffset; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    // Horizontal grid lines
    for (let y = yOffset; y < height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    
    // Draw axes
    const xAxis = height / 2 + offset[1];
    const yAxis = width / 2 + offset[0];
    
    ctx.beginPath();
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    
    // x-axis
    ctx.moveTo(0, xAxis);
    ctx.lineTo(width, xAxis);
    
    // y-axis
    ctx.moveTo(yAxis, 0);
    ctx.lineTo(yAxis, height);
    ctx.stroke();
    
    // Draw coordinates
    drawCoordinates(ctx, width, height, gridSize, offset, zoom);
    
    // Draw all geometry objects
    drawCircles(ctx, circles, width, height, offset, zoom);
    drawLines(ctx, lines, width, height, offset, zoom);
    drawPoints(ctx, points, width, height, offset, zoom);
    
  }, [points, lines, circles, zoom, offset, mode]);
  
  // Helper function to convert canvas coordinates to mathematical coordinates
  const canvasToMath = (x: number, y: number): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    
    const { width, height } = canvas;
    const mathX = ((x - width / 2) / zoom - offset[0]) / 50;
    const mathY = ((height / 2 - y) / zoom - offset[1]) / 50;
    
    return [mathX, mathY];
  };
  
  // Helper function to convert mathematical coordinates to canvas coordinates
  const mathToCanvas = (x: number, y: number): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    
    const { width, height } = canvas;
    const canvasX = width / 2 + (x * 50 + offset[0]) * zoom;
    const canvasY = height / 2 - (y * 50 + offset[1]) * zoom;
    
    return [canvasX, canvasY];
  };
  
  // Draw points
  const drawPoints = (
    ctx: CanvasRenderingContext2D, 
    points: {id: string, x: number, y: number, color: string}[],
    width: number,
    height: number,
    offset: [number, number],
    zoom: number
  ) => {
    points.forEach(point => {
      const [canvasX, canvasY] = mathToCanvas(point.x, point.y);
      
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 6, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      
      // Draw label
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#4b5563';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, canvasX + 10, canvasY - 10);
      
      // Highlight selected point
      if (point.id === selectedPointId) {
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 10, 0, Math.PI * 2);
        ctx.strokeStyle = point.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };
  
  // Draw lines
  const drawLines = (
    ctx: CanvasRenderingContext2D,
    lines: {id: string, start: [number, number], end: [number, number], equation: string, color: string}[],
    width: number,
    height: number,
    offset: [number, number],
    zoom: number
  ) => {
    lines.forEach(line => {
      const [startX, startY] = mathToCanvas(line.start[0], line.start[1]);
      const [endX, endY] = mathToCanvas(line.end[0], line.end[1]);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw equation
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#4b5563';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(line.equation, midX, midY - 10);
    });
  };
  
  // Draw circles
  const drawCircles = (
    ctx: CanvasRenderingContext2D,
    circles: {id: string, center: [number, number], radius: number, equation: string, color: string}[],
    width: number,
    height: number,
    offset: [number, number],
    zoom: number
  ) => {
    circles.forEach(circle => {
      const [centerX, centerY] = mathToCanvas(circle.center[0], circle.center[1]);
      const radius = circle.radius * 50 * zoom;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = circle.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw equation
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#4b5563';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(circle.equation, centerX, centerY - radius - 10);
    });
  };
  
  // Draw coordinates
  const drawCoordinates = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    gridSize: number,
    offset: [number, number],
    zoom: number
  ) => {
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const xAxis = height / 2 + offset[1];
    const yAxis = width / 2 + offset[0];
    
    // x-axis coordinates
    for (let x = yAxis % gridSize; x < width; x += gridSize) {
      const mathX = Math.round(((x - width / 2) / zoom - offset[0]) / 50);
      if (mathX !== 0) { // Skip zero to avoid overlap with y-axis
        ctx.fillText(mathX.toString(), x, xAxis + 15);
      }
    }
    
    // y-axis coordinates
    for (let y = xAxis % gridSize; y < height; y += gridSize) {
      const mathY = Math.round(((height / 2 - y) / zoom - offset[1]) / 50);
      if (mathY !== 0) { // Skip zero to avoid overlap with x-axis
        ctx.fillText(mathY.toString(), yAxis - 15, y);
      }
    }
    
    // Origin (0,0)
    ctx.fillText('0', yAxis - 15, xAxis + 15);
  };
  
  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mode === 'pan') {
      setDragStart([x, y]);
    } else if (mode === 'point') {
      // Check if clicked on an existing point
      const [mathX, mathY] = canvasToMath(x, y);
      const clickedPoint = points.find(p => {
        const [canvasX, canvasY] = mathToCanvas(p.x, p.y);
        const distance = Math.sqrt(Math.pow(canvasX - x, 2) + Math.pow(canvasY - y, 2));
        return distance < 10;
      });
      
      if (clickedPoint) {
        // Select the point
        setSelectedPointId(clickedPoint.id);
      } else {
        // Add a new point
        const roundedX = Math.round(mathX * 10) / 10;
        const roundedY = Math.round(mathY * 10) / 10;
        const newPoint = {
          id: `point-${Date.now()}`,
          x: roundedX,
          y: roundedY,
          color: randomColor()
        };
        onPointsChange([...points, newPoint]);
      }
    } else if (mode === 'line') {
      const [mathX, mathY] = canvasToMath(x, y);
      
      if (!lineStart) {
        setLineStart([mathX, mathY]);
      } else {
        // Create a new line
        const newLine = {
          id: `line-${Date.now()}`,
          start: lineStart,
          end: [mathX, mathY],
          equation: `Line from (${lineStart[0].toFixed(1)}, ${lineStart[1].toFixed(1)}) to (${mathX.toFixed(1)}, ${mathY.toFixed(1)})`,
          color: randomColor()
        };
        onLinesChange([...lines, newLine]);
        setLineStart(null);
      }
    } else if (mode === 'circle') {
      const [mathX, mathY] = canvasToMath(x, y);
      
      if (!lineStart) {
        setLineStart([mathX, mathY]);
      } else {
        // Calculate radius
        const radius = Math.sqrt(
          Math.pow(mathX - lineStart[0], 2) + 
          Math.pow(mathY - lineStart[1], 2)
        );
        
        // Create a new circle
        const newCircle = {
          id: `circle-${Date.now()}`,
          center: lineStart,
          radius,
          equation: `(x - ${lineStart[0].toFixed(1)})² + (y - ${lineStart[1].toFixed(1)})² = ${(radius * radius).toFixed(1)}`,
          color: randomColor()
        };
        onCirclesChange([...circles, newCircle]);
        setLineStart(null);
      }
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mode === 'pan' && dragStart) {
      const dx = (x - dragStart[0]) / zoom;
      const dy = (y - dragStart[1]) / zoom;
      setOffset([offset[0] + dx, offset[1] - dy]);
      setDragStart([x, y]);
    }
  };
  
  const handleMouseUp = () => {
    setDragStart(null);
  };
  
  const clearAll = () => {
    onPointsChange([]);
    onLinesChange([]);
    onCirclesChange([]);
    setSelectedPointId(null);
    setLineStart(null);
  };
  
  const resetView = () => {
    setZoom(1);
    setOffset([0, 0]);
  };
  
  const deleteSelected = () => {
    if (selectedPointId) {
      onPointsChange(points.filter(p => p.id !== selectedPointId));
      setSelectedPointId(null);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted p-2 flex items-center justify-between">
        <div className="space-x-1">
          <Button 
            variant={mode === 'point' ? "default" : "outline"} 
            size="sm"
            onClick={() => setMode('point')}
            title="Add Points"
          >
            <Plus className="h-4 w-4 mr-1" />
            Point
          </Button>
          <Button 
            variant={mode === 'line' ? "default" : "outline"} 
            size="sm"
            onClick={() => setMode('line')}
            title="Draw Lines"
          >
            <Square className="h-4 w-4 mr-1" />
            Line
          </Button>
          <Button 
            variant={mode === 'circle' ? "default" : "outline"} 
            size="sm"
            onClick={() => setMode('circle')}
            title="Draw Circles"
          >
            <CircleIcon className="h-4 w-4 mr-1" />
            Circle
          </Button>
          <Button 
            variant={mode === 'pan' ? "default" : "outline"} 
            size="sm"
            onClick={() => setMode('pan')}
            title="Pan View"
          >
            <MoveHorizontal className="h-4 w-4 mr-1" />
            Pan
          </Button>
        </div>
        <div className="space-x-1">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setZoom(zoom * 1.2)}
            title="Zoom In"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setZoom(Math.max(0.1, zoom / 1.2))}
            title="Zoom Out"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetView}
            title="Reset View"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={deleteSelected}
            disabled={!selectedPointId}
            title="Delete Selected"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearAll}
            title="Clear All"
          >
            Clear
          </Button>
        </div>
      </div>
      <CardContent className="p-0">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full border-t"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </motion.div>
        {lineStart && (mode === 'line' || mode === 'circle') && (
          <div className="text-center text-sm mt-2 p-2 bg-muted">
            {mode === 'line' 
              ? 'Click to set the endpoint of the line'
              : 'Click to set the radius of the circle'
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};
