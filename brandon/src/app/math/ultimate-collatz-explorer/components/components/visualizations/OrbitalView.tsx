import React, { useEffect, useRef, useState } from 'react';
import { useCollatzContext } from '../../context/CollatzContext';

interface Particle {
  id: number;
  value: number;
  angle: number;
  distance: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  trail: Array<{ x: number, y: number }>;
}

const OrbitalView: React.FC = () => {
  const { standardSequence } = useCollatzContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);  // Start paused for better comprehension
  const [rotationSpeed, setRotationSpeed] = useState(0.5);  // Slower default speed
  const [showTrails, setShowTrails] = useState(false);  // Trails off by default for clarity
  const [highlightPeaks, setHighlightPeaks] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'step' | 'odd-even' | 'magnitude'>('step');
  const [showLabels, setShowLabels] = useState(true);
  const [hoveredParticle, setHoveredParticle] = useState<Particle | null>(null);

  // Use refs for animation state to avoid re-renders
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<{ x: number, y: number } | null>(null);
  const peaksRef = useRef<number[]>([]);

  // Set up resize observer to make the visualization responsive
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Helper function to find peaks in the sequence
  const findPeaks = (sequence: number[]): number[] => {
    if (sequence.length < 3) return [];

    const peaks: number[] = [];
    for (let i = 1; i < sequence.length - 1; i++) {
      if (sequence[i] > sequence[i - 1] && sequence[i] > sequence[i + 1]) {
        // Only include significant peaks (at least 1.5x higher than neighboring points)
        if (sequence[i] > sequence[i - 1] * 1.5 && sequence[i] > sequence[i + 1] * 1.5) {
          peaks.push(i);
        }
      }
    }

    return peaks.sort((a, b) => sequence[b] - sequence[a]).slice(0, 7);
  };

  // Generate particles when sequence changes
  useEffect(() => {
    if (!standardSequence?.sequence) {
      particlesRef.current = [];
      return;
    }

    // Create particles from sequence
    const sequence = standardSequence.sequence;
    const maxValue = Math.max(...sequence);
    const peaks = findPeaks(sequence);
    peaksRef.current = peaks.map(i => sequence[i]);

    const newParticles: Particle[] = sequence.map((value, index) => {
      // Determine particle properties based on value
      const normalizedValue = value / maxValue;

      // Base distance depends on view mode
      let distance: number;
      let angle: number;

      // Calculate basic position - use fixed positions to prevent jumbling
      if (viewMode === 'step') {
        // Arrange in a perfect circle with equal spacing
        angle = (index / sequence.length) * Math.PI * 2;
        distance = 120; // Fixed distance for all particles
      } else if (viewMode === 'odd-even') {
        // Two perfect rings - one for odd, one for even
        angle = (index / sequence.length) * Math.PI * 2;
        distance = value % 2 === 0 ? 80 : 140; // Even inside, odd outside
      } else { // magnitude mode
        // Organize by value but in a more orderly fashion
        angle = (index / sequence.length) * Math.PI * 2;
        distance = 60 + (normalizedValue * 100); // More controlled range
      }

      // Size based on value but more consistent
      const size = 5 + (normalizedValue * 5);

      // All particles same speed for smoothness
      const speed = 0.001;

      // Different colors for even/odd
      const isEven = value % 2 === 0;
      const color = isEven
        ? 'rgb(3, 218, 198)'  // Cyan for even
        : 'rgb(255, 64, 129)'; // Pink for odd

      // Fully opaque particles
      const opacity = 1.0;

      return {
        id: index,
        value,
        angle,
        distance,
        size,
        speed,
        color,
        opacity,
        trail: [], // Will store recent positions for trail effect
      };
    });

    particlesRef.current = newParticles;

    // Start animation if needed
    if (isPlaying && !animationRef.current) {
      startAnimation();
    }
  }, [standardSequence, viewMode]);

  // Function to handle mouse interaction
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !particlesRef.current.length) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Find particle near mouse position
    let closestParticle: Particle | null = null;
    let minDistance = 25; // Slightly larger detection distance

    particlesRef.current.forEach(p => {
      const x = centerX + Math.cos(p.angle) * p.distance * zoom;
      const y = centerY + Math.sin(p.angle) * p.distance * zoom;

      const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));

      if (distance < minDistance) {
        minDistance = distance;
        closestParticle = p;
      }
    });

    setHoveredParticle(closestParticle);
    lastMousePos.current = { x: mouseX, y: mouseY };
  };

  const handleCanvasMouseLeave = () => {
    setHoveredParticle(null);
    lastMousePos.current = null;
  };

  // Function to start animation
  const startAnimation = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set up canvas dimensions
    canvas.width = dimensions.width || canvas.clientWidth;
    canvas.height = dimensions.height || canvas.clientHeight;

    // Store the last draw time to control frame rate
    let lastDrawTime = performance.now();
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;

    // Create animation frame function
    const animate = () => {
      const now = performance.now();
      const elapsed = now - lastDrawTime;

      // Limit frame rate for better performance
      if (elapsed > frameInterval) {
        lastDrawTime = now - (elapsed % frameInterval);

        // Draw frame
        drawFrame(ctx, canvas.width, canvas.height);
      }

      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);
  };

  // Function to draw a single frame
  const drawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const peaks = peaksRef.current;

    // Clear canvas with solid background
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, width, height);

    if (showTrails) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw background grid/rings with thicker lines for visibility
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';

    if (viewMode === 'odd-even') {
      // Draw two rings for odd/even
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80 * zoom, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 140 * zoom, 0, Math.PI * 2);
      ctx.stroke();

      // Label the rings
      ctx.font = '12px Arial';
      ctx.fillStyle = 'rgba(3, 218, 198, 0.9)';
      ctx.textAlign = 'center';
      ctx.fillText('EVEN NUMBERS', centerX, centerY - 85 * zoom);

      ctx.fillStyle = 'rgba(255, 64, 129, 0.9)';
      ctx.fillText('ODD NUMBERS', centerX, centerY - 145 * zoom);
    } else {
      // Draw concentric circles
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60 * i * zoom, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Draw clear starting point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw explanation for center point
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('START', centerX, centerY + 24);

    // Draw sequence path - simpler and cleaner
    if (viewMode === 'step') {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;

      const particles = particlesRef.current;
      if (particles.length > 0) {
        let startX = centerX + Math.cos(particles[0].angle) * particles[0].distance * zoom;
        let startY = centerY + Math.sin(particles[0].angle) * particles[0].distance * zoom;

        ctx.moveTo(startX, startY);

        for (let i = 1; i < particles.length; i++) {
          const p = particles[i];
          const x = centerX + Math.cos(p.angle) * p.distance * zoom;
          const y = centerY + Math.sin(p.angle) * p.distance * zoom;

          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }
    }

    // Draw particles with improved organization
    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];

      // Update angle for orbit based on rotation speed
      if (isPlaying) {
        p.angle += rotationSpeed * 0.003;
      }

      // Calculate position
      const x = centerX + Math.cos(p.angle) * p.distance * zoom;
      const y = centerY + Math.sin(p.angle) * p.distance * zoom;

      // Update trail
      if (showTrails) {
        p.trail.push({ x, y });
        if (p.trail.length > 10) p.trail.shift();
      } else if (p.trail.length > 0) {
        p.trail = [];
      }

      // Draw trails
      if (showTrails && p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);

        for (let j = 1; j < p.trail.length; j++) {
          ctx.lineTo(p.trail[j].x, p.trail[j].y);
        }

        ctx.strokeStyle = `${p.color}80`;
        ctx.lineWidth = p.size / 3;
        ctx.stroke();
      }

      // Only draw connecting lines in step mode and reduce visual clutter
      if (viewMode === 'step' && i > 0 && i % 5 === 0) {
        const prev = particlesRef.current[i-1];
        const prevX = centerX + Math.cos(prev.angle) * prev.distance * zoom;
        const prevY = centerY + Math.sin(prev.angle) * prev.distance * zoom;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw particle with clearer visual
      const isHovered = hoveredParticle && hoveredParticle.id === p.id;
      const isPeak = peaks.includes(p.value);

      ctx.beginPath();
      ctx.arc(x, y, p.size * zoom * (isHovered ? 1.5 : 1), 0, Math.PI * 2);

      ctx.fillStyle = p.color;
      ctx.shadowBlur = 0; // No blur effects
      ctx.fill();

      // Draw strong white border for visibility
      if (isHovered || isPeak || i === 0 || i === particlesRef.current.length - 1) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Simplified labels - only show every 10th point or important points
      if (showLabels && (i % 20 === 0 || isPeak || i === 0 || i === particlesRef.current.length - 1 || isHovered)) {
        // Draw clean label background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(x - 25, y - p.size - 24, 50, 18);

        // Simple label text
        ctx.fillStyle = 'white';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${i}: ${p.value}`, x, y - p.size - 12);
      }

      // Draw hover tooltip with better position and clarity
      if (isHovered) {
        // Fixed position tooltip in top left
        const tooltipX = 120;
        const tooltipY = 120;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.roundRect(tooltipX - 70, tooltipY - 45, 140, 90, 8);
        ctx.fill();

        // White border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = '13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Step: ${p.id}`, tooltipX, tooltipY - 25);
        ctx.fillText(`Value: ${p.value.toLocaleString()}`, tooltipX, tooltipY);
        ctx.fillText(`${p.value % 2 === 0 ? 'Even' : 'Odd'} number`, tooltipX, tooltipY + 25);

        // Draw connecting line from tooltip to particle
        ctx.beginPath();
        ctx.moveTo(tooltipX, tooltipY + 35);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 3]); // Dashed line
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash
      }
    }

    // Draw explanation box with clearer formatting
    const explanationText = getExplanationText();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(10, height - 70, 240, 60);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, height - 70, 240, 60);

    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(explanationText.line1, 20, height - 50);
    ctx.fillText(explanationText.line2, 20, height - 35);
    ctx.fillText(explanationText.line3, 20, height - 20);
  };

  // Helper function to get explanation text
  const getExplanationText = () => {
    let line1 = '';
    let line2 = '';
    let line3 = '';

    if (viewMode === 'step') {
      line1 = 'Step View: Visualizing sequence progression';
      line2 = 'Each point represents one calculation step';
      line3 = 'Connected in order from starting number to 1';
    } else if (viewMode === 'odd-even') {
      line1 = 'Parity View: Showing even/odd patterns';
      line2 = 'Blue = even numbers (divide by 2)';
      line3 = 'Pink = odd numbers (multiply by 3, add 1)';
    } else {
      line1 = 'Magnitude View: Particle distance = value size';
      line2 = 'Larger values orbit further from center';
      line3 = 'Shows how values change throughout sequence';
    }

    return { line1, line2, line3 };
  };

  // Set up animation when parameters change
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    if (!animationRef.current && particlesRef.current.length > 0) {
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, dimensions, rotationSpeed, showTrails, highlightPeaks, zoom, showLabels]);

  // Toggle animation
  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle speed change
  const handleSpeedChange = (speed: number) => {
    setRotationSpeed(speed);
  };

  // Handle zoom change
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'step' | 'odd-even' | 'magnitude') => {
    setViewMode(mode);
  };

  return (
    <div className="cosmic-viz-container">
      <div className="cosmic-viz-header">
        <h3 className="cosmic-viz-title">Orbital View: Collatz Sequence Patterns</h3>
        <div className="cosmic-viz-controls-horizontal">
          <button
            className={`cosmic-control-button-small ${isPlaying ? 'active' : ''}`}
            onClick={toggleAnimation}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            className={`cosmic-control-button-small ${showLabels ? 'active' : ''}`}
            onClick={() => setShowLabels(!showLabels)}
          >
            Labels
          </button>

          <button
            className={`cosmic-control-button-small ${showTrails ? 'active' : ''}`}
            onClick={() => setShowTrails(!showTrails)}
          >
            Trails
          </button>
        </div>
      </div>

      <div ref={containerRef} className="cosmic-chart-area">
        {!standardSequence?.sequence ? (
          <div className="cosmic-empty-state">
            <p>Calculate a sequence to visualize patterns</p>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                background: 'transparent',
                width: '100%',
                height: '100%',
                cursor: 'crosshair'
              }}
              onClick={toggleAnimation}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
            />

            <div className="cosmic-orbital-info">
              <div className="cosmic-info-basic">
                <div>Starting number: {standardSequence.startNumber.toLocaleString()}</div>
                <div>Sequence length: {standardSequence.sequence.length - 1} steps</div>
              </div>

              <div className="cosmic-view-mode-controls">
                <div className="cosmic-view-heading">Visualization Mode:</div>
                <div className="cosmic-view-modes">
                  <button
                    className={`cosmic-view-mode-button ${viewMode === 'step' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('step')}
                  >
                    Step Sequence
                  </button>
                  <button
                    className={`cosmic-view-mode-button ${viewMode === 'odd-even' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('odd-even')}
                  >
                    Even/Odd
                  </button>
                  <button
                    className={`cosmic-view-mode-button ${viewMode === 'magnitude' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('magnitude')}
                  >
                    Value Size
                  </button>
                </div>
              </div>

              <div className="cosmic-orbital-controls">
                <div className="cosmic-control-group">
                  <label>Rotation:</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                    className="cosmic-slider"
                  />
                </div>

                <div className="cosmic-control-group">
                  <label>Zoom:</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                    className="cosmic-slider"
                  />
                </div>
              </div>

              <div className="cosmic-tip">
                • Blue dots = even numbers (÷2)<br />
                • Pink dots = odd numbers (×3+1)<br />
                • Hover to see details
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrbitalView;
