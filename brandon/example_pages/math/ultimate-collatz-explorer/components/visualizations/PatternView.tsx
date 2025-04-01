import React, { useEffect, useRef, useState } from 'react';
import { useCollatzContext } from '../../context/CollatzContext';

const PatternView: React.FC = () => {
  const { standardSequence } = useCollatzContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<'cyclic' | 'parity' | 'modular'>('parity');

  // Define styles
  const styles = {
    container: {
      backgroundColor: 'rgba(18, 18, 18, 0.3)',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      height: '100%'
    },
    header: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      padding: '10px 15px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      marginBottom: '1rem'
    },
    titleRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    title: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600,
      color: 'white'
    },
    chartArea: {
      position: 'relative' as const,
      width: '100%',
      height: '500px',
      backgroundColor: 'rgba(18, 18, 18, 0.3)',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    canvas: {
      width: '100%',
      height: '100%',
      display: 'block',
      backgroundColor: 'rgba(18, 18, 18, 0.3)',
      borderRadius: '8px'
    },
    placeholder: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'rgba(255, 255, 255, 0.5)'
    },
    placeholderIcon: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    placeholderText: {
      fontSize: '1.125rem',
      marginBottom: '0.5rem'
    },
    placeholderDesc: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.3)'
    },
    orbitalInfo: {
      position: 'absolute' as const,
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.9)',
      zIndex: 5,
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '280px'
    },
    infoBasic: {
      marginBottom: '0.5rem',
      color: 'white'
    },
    viewControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      width: '100%'
    },
    viewHeading: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.7)',
      whiteSpace: 'nowrap' as const
    },
    viewModes: {
      display: 'flex',
      gap: '0.5rem',
      flex: 1
    },
    viewButton: (isActive: boolean) => ({
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      backgroundColor: isActive ? 'rgba(124, 77, 255, 0.8)' : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      flex: 1
    }),
    viewDescription: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'right' as const,
      minWidth: '200px'
    },
    tip: {
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)',
      fontStyle: 'italic',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '0.5rem'
    }
  };

  useEffect(() => {
    if (!standardSequence?.sequence || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Set canvas CSS dimensions
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Clear canvas
    ctx.fillStyle = 'rgba(18, 18, 18, 0.3)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Get sequence data
    const sequence = standardSequence.sequence;

    if (viewMode === 'parity') {
      drawParityPattern(ctx, sequence, rect.width, rect.height);
    } else if (viewMode === 'cyclic') {
      drawCyclicPattern(ctx, sequence, rect.width, rect.height);
    } else if (viewMode === 'modular') {
      drawModularPattern(ctx, sequence, rect.width, rect.height);
    }

  }, [standardSequence, viewMode]);

  const drawParityPattern = (
    ctx: CanvasRenderingContext2D,
    sequence: number[],
    width: number,
    height: number
  ) => {
    const paritySequence = sequence.map(n => n % 2 === 0 ? 0 : 1);  // 0 for even, 1 for odd

    const cellSize = Math.min(width, height) / Math.ceil(Math.sqrt(sequence.length));
    const cols = Math.floor(width / cellSize);

    paritySequence.forEach((parity, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const x = col * cellSize;
      const y = row * cellSize;

      ctx.fillStyle = parity === 0 ? 'rgba(3, 218, 198, 0.8)' : 'rgba(255, 64, 129, 0.8)';
      ctx.fillRect(x, y, cellSize, cellSize);
    });

    // Add a subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;

    paritySequence.forEach((_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const x = col * cellSize;
      const y = row * cellSize;

      ctx.strokeRect(x, y, cellSize, cellSize);
    });
  };

  const drawCyclicPattern = (
    ctx: CanvasRenderingContext2D,
    sequence: number[],
    width: number,
    height: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Connect sequence points in circular pattern
    if (sequence.length > 0) {
      ctx.beginPath();

      // Find the max value to normalize
      const maxVal = Math.max(...sequence);

      sequence.forEach((value, index) => {
        // Calculate angle based on position in sequence
        const angle = (index / sequence.length) * Math.PI * 2;

        // Calculate distance from center based on value
        const normalizedValue = value / maxVal;
        const distance = radius * (0.1 + normalizedValue * 0.9);

        // Calculate coordinates
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        // Draw points
        ctx.fillStyle = value % 2 === 0 ? 'rgba(3, 218, 198, 0.8)' : 'rgba(255, 64, 129, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect the path
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const drawModularPattern = (
    ctx: CanvasRenderingContext2D,
    sequence: number[],
    width: number,
    height: number
  ) => {
    const modulo = 5; // Use modulo 5 for interesting patterns
    const results = sequence.map(n => n % modulo);

    const cellSize = 20;
    const cols = Math.floor(width / cellSize);

    // Create a color map for modular values
    const colorMap = [
      'rgba(3, 218, 198, 0.8)', // 0
      'rgba(255, 64, 129, 0.8)',  // 1
      'rgba(124, 77, 255, 0.8)', // 2
      'rgba(255, 193, 7, 0.8)', // 3
      'rgba(0, 176, 255, 0.8)' // 4
    ];

    results.forEach((value, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const x = col * cellSize;
      const y = row * cellSize;

      ctx.fillStyle = colorMap[value];
      ctx.fillRect(x, y, cellSize, cellSize);

      // Add light grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, cellSize, cellSize);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <h3 style={styles.title}>Pattern Visualization</h3>
        </div>
        <div style={styles.viewControls}>
          <div style={styles.viewHeading}>View Mode:</div>
          <div style={styles.viewModes}>
            <button
              style={styles.viewButton(viewMode === 'parity')}
              onClick={() => setViewMode('parity')}
            >
              Parity Grid
            </button>
            <button
              style={styles.viewButton(viewMode === 'cyclic')}
              onClick={() => setViewMode('cyclic')}
            >
              Cyclic View
            </button>
            <button
              style={styles.viewButton(viewMode === 'modular')}
              onClick={() => setViewMode('modular')}
            >
              Modular Map
            </button>
          </div>
          <div style={styles.viewDescription}>
            {viewMode === 'parity' && 'Shows even/odd patterns as a grid'}
            {viewMode === 'cyclic' && 'Displays sequence as a circular pattern'}
            {viewMode === 'modular' && 'Shows remainder patterns modulo 5'}
          </div>
        </div>
      </div>

      <div style={styles.chartArea}>
        {!standardSequence ? (
          <div style={styles.placeholder}>
            <div style={styles.placeholderIcon}>🔍</div>
            <div style={styles.placeholderText}>Calculate a sequence to view patterns</div>
            <div style={styles.placeholderDesc}>This visualization shows patterns in the Collatz sequence</div>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} style={styles.canvas} />
            <div style={styles.orbitalInfo}>
              <div style={styles.infoBasic}>
                Visualizing patterns for starting number: <strong>{standardSequence.startNumber}</strong>
              </div>
              <div style={styles.tip}>
                Tip: Look for repeating patterns in different visualizations to discover properties of Collatz sequences.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatternView;
