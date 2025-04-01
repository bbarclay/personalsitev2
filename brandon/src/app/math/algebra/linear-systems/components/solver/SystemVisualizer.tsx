"use client";

import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Step {
  system: string;
  operation?: string;
  solution?: {
    x: number;
    y: number;
  };
}

interface SystemVisualizerProps {
  step?: Step;
  system: string;
}

export function SystemVisualizer({ step, system }: SystemVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const width = canvas.width;
    const height = canvas.height;
    const scale = 30;
    const offsetX = width / 2;
    const offsetY = height / 2;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Draw horizontal grid lines
    for (let y = -10; y <= 10; y++) {
      ctx.beginPath();
      ctx.moveTo(0, offsetY + y * scale);
      ctx.lineTo(width, offsetY + y * scale);
      ctx.stroke();
    }

    // Draw vertical grid lines
    for (let x = -10; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(offsetX + x * scale, 0);
      ctx.lineTo(offsetX + x * scale, height);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(width, offsetY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, height);
    ctx.stroke();

    // Draw the solution point if available
    if (step?.solution) {
      const { x, y } = step.solution;
      ctx.fillStyle = '#4f46e5';
      ctx.beginPath();
      ctx.arc(offsetX + x * scale, offsetY - y * scale, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.fillText(`(${x}, ${y})`, offsetX + x * scale + 10, offsetY - y * scale - 10);
    }

  }, [step, system]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Visualization</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="border border-gray-200 dark:border-gray-700"
        />
      </CardContent>
    </Card>
  );
} 