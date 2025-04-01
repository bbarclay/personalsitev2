import React, { useEffect, useRef } from 'react';

interface ShapeCanvasProps {
  selectedShape: string;
  shapeProperties: {
    size: number;
    width?: number;
    height?: number;
    rotation: number;
    color: string;
  };
  transformations: {
    translateX: number;
    translateY: number;
    scale: number;
    rotate: number;
  };
}

const ShapeCanvas: React.FC<ShapeCanvasProps> = ({
  selectedShape,
  shapeProperties,
  transformations,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const initialRender = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Set high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const renderShape = () => {
      // Clear canvas with a grid background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height);

      // Draw coordinates axes
      drawCoordinateAxes(ctx, canvas.width, canvas.height);

      // Save context state
      ctx.save();

      // Apply transformations
      ctx.translate(canvas.width / 2 + transformations.translateX, canvas.height / 2 + transformations.translateY);
      ctx.scale(transformations.scale, transformations.scale);
      ctx.rotate((transformations.rotate * Math.PI) / 180);

      // Set shape styles
      ctx.fillStyle = shapeProperties.color;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;

      // Shadow for 3D effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      // Draw selected shape
      switch (selectedShape) {
        case 'circle':
          drawCircle(ctx, shapeProperties.size);
          break;

        case 'square':
          drawSquare(ctx, shapeProperties.size);
          break;

        case 'triangle':
          drawTriangle(ctx, shapeProperties.size);
          break;

        case 'rectangle':
          drawRectangle(ctx, shapeProperties.width || 100, shapeProperties.height || 60);
          break;

        case 'pentagon':
          drawRegularPolygon(ctx, shapeProperties.size, 5);
          break;

        case 'hexagon':
          drawRegularPolygon(ctx, shapeProperties.size, 6);
          break;
      }

      // Add shape label
      addShapeLabel(ctx, selectedShape);

      // Restore context state
      ctx.restore();

      // Display shape properties
      displayShapeProperties(ctx, canvas.width, canvas.height, selectedShape, shapeProperties);
    };

    // Initial render
    if (initialRender.current) {
      renderShape();
      initialRender.current = false;
    } else {
      // Animate changes for better UX
      let startTime: number | null = null;
      const duration = 300; // ms

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        renderShape();

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      };

      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [selectedShape, shapeProperties, transformations]);

  // Helper function to draw a grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 20;

    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  // Helper function to draw coordinate axes
  const drawCoordinateAxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
    ctx.lineWidth = 1;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
    ctx.fill();
  };

  // Helper function to draw a circle
  const drawCircle = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  // Helper function to draw a square
  const drawSquare = (ctx: CanvasRenderingContext2D, size: number) => {
    const halfSize = size / 2;
    ctx.beginPath();
    ctx.rect(-halfSize, -halfSize, size, size);
    ctx.fill();
    ctx.stroke();
  };

  // Helper function to draw a triangle
  const drawTriangle = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.lineTo(-size / 2, size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // Helper function to draw a rectangle
  const drawRectangle = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath();
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.fill();
    ctx.stroke();
  };

  // Helper function to draw a regular polygon
  const drawRegularPolygon = (ctx: CanvasRenderingContext2D, size: number, sides: number) => {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = size * Math.cos(angle);
      const y = size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // Helper function to add a shape label
  const addShapeLabel = (ctx: CanvasRenderingContext2D, shapeName: string) => {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(shapeName.charAt(0).toUpperCase() + shapeName.slice(1), 0, 0);
  };

  // Helper function to display shape properties
  const displayShapeProperties = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    shapeName: string,
    properties: ShapeCanvasProps['shapeProperties']
  ) => {
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Calculate properties to display
    let area = 0;
    let perimeter = 0;

    switch (shapeName) {
      case 'circle':
        area = Math.PI * Math.pow(properties.size, 2);
        perimeter = 2 * Math.PI * properties.size;
        break;
      case 'square':
        area = Math.pow(properties.size, 2);
        perimeter = 4 * properties.size;
        break;
      case 'rectangle':
        area = (properties.width || 100) * (properties.height || 60);
        perimeter = 2 * ((properties.width || 100) + (properties.height || 60));
        break;
      case 'triangle':
        // Equilateral triangle
        area = (Math.sqrt(3) / 4) * Math.pow(properties.size, 2);
        perimeter = 3 * properties.size;
        break;
      case 'pentagon':
        area = (1/4) * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(properties.size, 2);
        perimeter = 5 * properties.size;
        break;
      case 'hexagon':
        area = (3 * Math.sqrt(3) / 2) * Math.pow(properties.size, 2);
        perimeter = 6 * properties.size;
        break;
    }

    // Display properties
    ctx.fillText(`Shape: ${shapeName.charAt(0).toUpperCase() + shapeName.slice(1)}`, 10, 10);
    ctx.fillText(`Area: ${area.toFixed(2)} sq units`, 10, 30);
    ctx.fillText(`Perimeter: ${perimeter.toFixed(2)} units`, 10, 50);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border border-foreground/10 rounded-lg shadow-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div className="mt-4 text-sm text-foreground/60">
        Drag the shape controls to transform the {selectedShape}
      </div>
    </div>
  );
};

export default ShapeCanvas;
