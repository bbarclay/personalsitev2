import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Trajectory3DProps {
  data: Point3D[] | null;
}

const Trajectory3D = ({ data }: Trajectory3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.5, z: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [showPoints, setShowPoints] = useState(true);
  const animationRef = useRef<number>(0);

  // Resize observer to make visualization responsive
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]) return;

      const { width, height } = entries[0].contentRect;
      setDimensions({
        width: Math.max(width, 200),
        height: Math.max(height, 200)
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!autoRotate) return;

    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      // Update rotation
      setRotation(prev => ({
        x: prev.x,
        y: prev.y + deltaTime * 0.0001, // Slow rotation around y-axis
        z: prev.z
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [autoRotate]);

  // Draw the 3D trajectory
  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0 || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear the canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Scale factor
    const scale = Math.min(canvas.width, canvas.height) * 0.005;

    // Find data range for scaling
    const range = {
      x: Math.max(...data.map(p => Math.abs(p.x))),
      y: Math.max(...data.map(p => Math.abs(p.y))),
      z: Math.max(...data.map(p => Math.abs(p.z)))
    };

    const maxRange = Math.max(range.x, range.y, range.z);
    const scaleFactor = scale * 30 / maxRange;

    // Transform 3D point to 2D with rotation
    const transform = (point: Point3D) => {
      // Apply rotation
      const cosX = Math.cos(rotation.x * Math.PI * 2);
      const sinX = Math.sin(rotation.x * Math.PI * 2);
      const cosY = Math.cos(rotation.y * Math.PI * 2);
      const sinY = Math.sin(rotation.y * Math.PI * 2);
      const cosZ = Math.cos(rotation.z * Math.PI * 2);
      const sinZ = Math.sin(rotation.z * Math.PI * 2);

      // Rotate around X-axis
      let x1 = point.x;
      let y1 = point.y * cosX - point.z * sinX;
      let z1 = point.y * sinX + point.z * cosX;

      // Rotate around Y-axis
      let x2 = x1 * cosY + z1 * sinY;
      let y2 = y1;
      let z2 = -x1 * sinY + z1 * cosY;

      // Rotate around Z-axis
      let x3 = x2 * cosZ - y2 * sinZ;
      let y3 = x2 * sinZ + y2 * cosZ;

      // Apply scale and return 2D point
      return {
        x: centerX + x3 * scaleFactor,
        y: centerY + y3 * scaleFactor,
        z: z2  // Needed for depth sorting
      };
    };

    // Sort points by z-coordinate for basic depth sorting
    const sortedData = [...data].sort((a, b) => {
      const aZ = transform(a).z;
      const bZ = transform(b).z;
      return aZ - bZ;
    });

    // Draw the trajectory
    ctx.strokeStyle = 'var(--cosmic-primary-color)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const points2D = sortedData.map(transform);

    // Start with the first point
    ctx.moveTo(points2D[0].x, points2D[0].y);

    // Connect the points
    for (let i = 1; i < points2D.length; i++) {
      ctx.lineTo(points2D[i].x, points2D[i].y);
    }

    ctx.stroke();

    // Draw points if enabled
    if (showPoints) {
      for (let i = 0; i < points2D.length; i++) {
        const point = points2D[i];

        // Calculate color based on data value (higher = brighter)
        const normalizedValue = Math.min(1, data[i].y / range.y);
        const hue = 220 + normalizedValue * 140; // Blue to purple
        const saturation = 80 + normalizedValue * 20; // More saturated for higher values
        const lightness = 40 + normalizedValue * 50; // Brighter for higher values

        // Draw point with color
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Size based on z position
        const pointSize = 2 + normalizedValue * 3;

        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw axes for reference
    const axisLength = 50;

    // X-axis (red)
    ctx.strokeStyle = 'rgba(255, 50, 50, 0.5)';
    ctx.beginPath();
    const xStart = transform({ x: -axisLength, y: 0, z: 0 });
    const xEnd = transform({ x: axisLength, y: 0, z: 0 });
    ctx.moveTo(xStart.x, xStart.y);
    ctx.lineTo(xEnd.x, xEnd.y);
    ctx.stroke();

    // Y-axis (green)
    ctx.strokeStyle = 'rgba(50, 255, 50, 0.5)';
    ctx.beginPath();
    const yStart = transform({ x: 0, y: -axisLength, z: 0 });
    const yEnd = transform({ x: 0, y: axisLength, z: 0 });
    ctx.moveTo(yStart.x, yStart.y);
    ctx.lineTo(yEnd.x, yEnd.y);
    ctx.stroke();

    // Z-axis (blue)
    ctx.strokeStyle = 'rgba(50, 50, 255, 0.5)';
    ctx.beginPath();
    const zStart = transform({ x: 0, y: 0, z: -axisLength });
    const zEnd = transform({ x: 0, y: 0, z: axisLength });
    ctx.moveTo(zStart.x, zStart.y);
    ctx.lineTo(zEnd.x, zEnd.y);
    ctx.stroke();

  }, [data, dimensions, rotation, showPoints]);

  // Mouse drag to rotate
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      setAutoRotate(false); // Stop auto-rotation when user interacts
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;

      setRotation(prev => ({
        x: prev.x + deltaY * 0.005,
        y: prev.y + deltaX * 0.005,
        z: prev.z
      }));

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!data) {
    return (
      <div className="cosmic-empty-state">
        <p>No data available for 3D visualization</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="cosmic-viz-container cosmic-3d-container">
      <div className="cosmic-viz-controls">
        <label className="cosmic-toggle">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={() => setAutoRotate(!autoRotate)}
          />
          <span>Auto-rotate</span>
        </label>
        <label className="cosmic-toggle">
          <input
            type="checkbox"
            checked={showPoints}
            onChange={() => setShowPoints(!showPoints)}
          />
          <span>Show Points</span>
        </label>
      </div>
      <canvas ref={canvasRef} className="cosmic-3d-canvas" />
      <div className="cosmic-viz-instructions">
        <p>Drag to rotate the visualization. Toggle auto-rotate or points display with the controls above.</p>
      </div>
    </div>
  );
};

export default Trajectory3D;
