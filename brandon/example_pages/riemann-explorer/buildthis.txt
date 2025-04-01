import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// --- Constants & Configuration ---
const TICK_RATE_MS = 50; // Faster updates for smoother interaction/animation
const INITIAL_T_RANGE = { min: 0, max: 50 }; // Initial range for the imaginary axis (t)
const INITIAL_SIGMA_RANGE = { min: -1, max: 2 }; // Range for the real axis (sigma) display
const CRITICAL_LINE_SIGMA = 0.5;
const ZOOM_FACTOR = 1.3;
const MAX_PLOT_POINTS = 500; // Resolution for the |Zeta| plot

// --- Known Non-Trivial Zeroes (Approximate t values where Re(s)=1/2) ---
// Source: OEIS A002410 / Wikipedia / MathWorld (accuracy sufficient for visualization)
const KNOWN_ZERO_T_VALUES = [
  14.134725, 21.022040, 25.010858, 30.424876, 32.935062,
  37.586178, 40.918719, 43.327073, 48.005151, 49.773832,
  52.970321, 56.446248, 59.347044, 60.831779, 65.112544,
  67.079811, 69.546402, 72.067157, 75.704691, 77.144840,
  // Add more for extended exploration if desired
];

// --- TypeScript Interfaces ---
interface ComplexNumber {
  re: number; // Real part (sigma)
  im: number; // Imaginary part (t)
}

interface PlotPoint {
  t: number;
  magnitude: number; // |zeta(sigma + it)|
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GameState {
  theme: 'dark' | 'light';
  viewBox: ViewBox; // Controls zoom/pan of the complex plane
  selectedSigma: number; // The real part (sigma) selected by the user
  tRange: { min: number; max: number }; // Current range of imaginary axis (t) being plotted/viewed
  zetaPlotData: PlotPoint[]; // Calculated/simulated data for |zeta(selectedSigma + it)|
  hoverInfo: { point: ComplexNumber | null; zetaValue: string | null }; // Info for tooltip
  isPanning: boolean;
  lastPanPoint: { x: number; y: number } | null;
  showHelp: boolean;
}

// --- Utility Functions ---
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

// **MOCKED/SIMULATED Zeta Function Magnitude Calculation**
// This is the core simplification. It generates dips near known zero T values
// *only* when sigma is very close to 0.5.
const calculateMockZetaMagnitude = (sigma: number, t: number): number => {
  // Base "noise" or general shape - prevent it being zero everywhere else
  // This could be a more complex function resembling general |Zeta| shape if needed
  let baseMagnitude = 0.8 + Math.log1p(Math.abs(t) / 10) * 0.3 + Math.sin(t / 5) * 0.1;
  baseMagnitude = Math.max(0.1, baseMagnitude); // Ensure it doesn't go below a threshold

  // If sigma is very close to the critical line, introduce dips near known zeroes
  const sigmaCloseness = Math.max(0, 1 - Math.abs(sigma - CRITICAL_LINE_SIGMA) / 0.1); // Sharp falloff beyond ~0.1 distance

  if (sigmaCloseness > 0) {
    for (const zeroT of KNOWN_ZERO_T_VALUES) {
      const distToZeroT = Math.abs(t - zeroT);
      // Create a sharp dip near the zero, scaled by sigmaCloseness
      // The 'width' of the dip (e.g., 0.1) determines how precise sigma needs to be
      const dipFactor = Math.exp(-Math.pow(distToZeroT / 0.05, 2)) * sigmaCloseness; // Gaussian dip
      baseMagnitude *= (1 - dipFactor * 0.95); // Reduce magnitude, almost to zero at the peak
    }
  }

  // Add some general dampening further away from critical line for visual effect
   baseMagnitude *= (1 - Math.min(0.5, Math.abs(sigma - CRITICAL_LINE_SIGMA) * 0.5));


  return Math.max(0.01, baseMagnitude); // Clamp minimum magnitude
};

// --- Riemann Explorer Component ---

const RiemannExplorer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false); // Ensure runs client-side for SVG refs etc.

  const [state, setState] = useState<GameState>({
    theme: 'dark',
    viewBox: { x: -1.5, y: INITIAL_T_RANGE.min, width: 3, height: INITIAL_T_RANGE.max - INITIAL_T_RANGE.min },
    selectedSigma: CRITICAL_LINE_SIGMA,
    tRange: { min: INITIAL_T_RANGE.min, max: INITIAL_T_RANGE.max },
    zetaPlotData: [],
    hoverInfo: { point: null, zetaValue: null },
    isPanning: false,
    lastPanPoint: null,
    showHelp: true, // Show help initially
  });

   // Effect to run only on client
  useEffect(() => {
      setIsClient(true);
      // Detect preferred color scheme
       const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
       setState(prev => ({ ...prev, theme: prefersDark ? 'dark' : 'light' }));
  }, []);


  // --- State Updates and Calculations ---

  // Recalculate Zeta plot data when sigma or tRange changes
  useEffect(() => {
    if (!isClient) return; // Ensure calculations run client-side

    const { selectedSigma, tRange } = state;
    const plotData: PlotPoint[] = [];
    const step = (tRange.max - tRange.min) / (MAX_PLOT_POINTS - 1);

    for (let i = 0; i < MAX_PLOT_POINTS; i++) {
      const t = tRange.min + i * step;
      const magnitude = calculateMockZetaMagnitude(selectedSigma, t);
      plotData.push({ t, magnitude });
    }

    setState(prev => ({ ...prev, zetaPlotData: plotData }));

  }, [state.selectedSigma, state.tRange, isClient]);

  // --- Interaction Handlers ---

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const handleSigmaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSigma = parseFloat(event.target.value);
    setState(prev => ({ ...prev, selectedSigma: newSigma }));
  };

    const getSVGPoint = (clientX: number, clientY: number): DOMPoint | null => {
        if (!svgRef.current) return null;
        const svg = svgRef.current;
        const screenCTM = svg.getScreenCTM();
        if (!screenCTM) return null;

        let point = svg.createSVGPoint();
        point.x = clientX;
        point.y = clientY;
        return point.matrixTransform(screenCTM.inverse());
    };

   const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
        event.preventDefault();
        if (!isClient || !svgRef.current) return;

        const svgPoint = getSVGPoint(event.clientX, event.clientY);
        if (!svgPoint) return;

        const zoomFactor = event.deltaY < 0 ? 1 / ZOOM_FACTOR : ZOOM_FACTOR; // Zoom in or out
        const { x: mouseX, y: mouseY } = svgPoint;

        setState(prev => {
            const { x, y, width, height } = prev.viewBox;

            // Calculate new dimensions centered around mouse position
            const newWidth = width * zoomFactor;
            const newHeight = height * zoomFactor;

            // Adjust origin (x, y) to keep mouse position stable during zoom
            const newX = mouseX - (mouseX - x) * zoomFactor;
            const newY = mouseY - (mouseY - y) * zoomFactor;

             // Update tRange based on new viewBox height and y
            const newTRangeMin = newY;
            const newTRangeMax = newY + newHeight;

            return {
                ...prev,
                viewBox: { x: newX, y: newY, width: newWidth, height: newHeight },
                tRange: { min: newTRangeMin, max: newTRangeMax }
            };
        });
   };

    const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
         if (!isClient || event.button !== 0) return; // Only left click
         const svgPoint = getSVGPoint(event.clientX, event.clientY);
         if (!svgPoint) return;
         setState(prev => ({
             ...prev,
             isPanning: true,
             lastPanPoint: { x: svgPoint.x, y: svgPoint.y }
         }));
         svgRef.current?.style.setProperty('cursor', 'grabbing');
    };

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
         if (!isClient) return;
         const svgPoint = getSVGPoint(event.clientX, event.clientY);
         if (!svgPoint) return;

         // Update Hover Info
         const sigma = svgPoint.x;
         const t = svgPoint.y;
         const magnitude = calculateMockZetaMagnitude(sigma, t);
         setState(prev => ({
             ...prev,
             hoverInfo: {
                 point: { re: sigma, im: t },
                 zetaValue: `|ζ(${sigma.toFixed(3)} + ${t.toFixed(3)}i)| ≈ ${magnitude.toFixed(4)}`
             }
         }));

         // Handle Panning
        if (state.isPanning && state.lastPanPoint && svgRef.current) {
            const dx = svgPoint.x - state.lastPanPoint.x;
            const dy = svgPoint.y - state.lastPanPoint.y;

            setState(prev => {
                 const newX = prev.viewBox.x - dx;
                 const newY = prev.viewBox.y - dy;
                 // Update tRange based on new viewBox y
                 const newTRangeMin = newY;
                 const newTRangeMax = newY + prev.viewBox.height;

                return {
                     ...prev,
                     viewBox: { ...prev.viewBox, x: newX, y: newY },
                     lastPanPoint: { x: svgPoint.x, y: svgPoint.y }, // Update last point for continuous pan
                     tRange: {min: newTRangeMin, max: newTRangeMax}
                };
            });
        }
    };

    const handleMouseUpOrLeave = (event: React.MouseEvent<SVGSVGElement>) => {
         if (!isClient || !state.isPanning) return;
         setState(prev => ({
             ...prev,
             isPanning: false,
             lastPanPoint: null
         }));
         if (svgRef.current) {
             svgRef.current.style.removeProperty('cursor');
         }
    };

    const handleMouseLeave = (event: React.MouseEvent<SVGSVGElement>) => {
        setState(prev => ({ ...prev, hoverInfo: { point: null, zetaValue: null }})); // Clear hover info
        handleMouseUpOrLeave(event); // Also stop panning if mouse leaves
    }

  // --- Memoized Plot Path ---
  const plotPathData = useMemo(() => {
    if (state.zetaPlotData.length === 0) return "";

    // Scale plot magnitude for visual representation within the SVG's x-range
    const maxMagnitudeInData = Math.max(...state.zetaPlotData.map(p => p.magnitude), 1); // Avoid division by zero
    const plotWidthScale = state.viewBox.width * 0.4; // How much of the view width the plot uses visually
    const plotOffsetSigma = state.selectedSigma; // Center the plot on the selected sigma line

    const points = state.zetaPlotData.map(p => {
      // Scale magnitude: Map magnitude to an offset from selectedSigma.
      // Example: magnitude 1 = offset 0, magnitude 0 = offset +/- plotWidthScale/2 ? Needs adjustment.
      // Let's plot sigma +/- magnitude variation around the selectedSigma line.
      // Mapping magnitude (e.g., 0 to 2) to a horizontal offset (e.g., -0.5 to 0.5 width units)
       const scaledMagnitudeOffset = lerp(0, plotWidthScale / 2, Math.min(p.magnitude, 2) / 2); // Map mag 0-2 to offset 0 - width/2

       // Plotting 'magnitude' horizontally from the selected sigma line
        const x = plotOffsetSigma + scaledMagnitudeOffset; // Or maybe just plot magnitude directly on y axis?
        // Let's try plotting t on Y, and magnitude mapped to X offset from sigma line.
        const y = p.t;
        return `${x.toFixed(4)},${y.toFixed(4)}`;
    });

      // Correct approach: Plot `t` on the Y axis and the *value* (magnitude) on an X axis relative to the selected sigma line.
      // We need to transform the magnitude data into X coordinates relative to `selectedSigma`.
      // Let's map the magnitude range (e.g., 0 to ~2) to a horizontal range (e.g., `selectedSigma` to `selectedSigma + 0.5`).
      const plotXScale = 0.5 / (maxMagnitudeInData || 1); // Map max magnitude to a 0.5 unit width on SVG

       const pathPoints = state.zetaPlotData.map(p => {
            const x = state.selectedSigma + p.magnitude * plotXScale;
            const y = p.t;
            return `${x.toFixed(4)} ${y.toFixed(4)}`;
       });


    return `M ${pathPoints[0]} L ${pathPoints.slice(1).join(' ')}`;
  }, [state.zetaPlotData, state.selectedSigma, state.viewBox.width]);


  // --- Main Render ---
  if (!isClient) {
    // Avoid rendering server-side or before hydration if dependencies aren't ready
    return <div className="riemann-loading">Initializing Reality Matrix...</div>;
  }

  return (
    <div className={`riemann-explorer theme-${state.theme}`}>
      {/* Dynamic Styles */}
      <style>{`
        /* Import Fonts (Example) */
        /* @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400&display=swap'); */

        :root {
          --font-main: 'Roboto', sans-serif;
          --font-display: 'Orbitron', sans-serif;
          --transition-speed: 0.2s;
        }

        .riemann-explorer {
          font-family: var(--font-main);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: background-color 0.5s, color 0.5s;
        }

        /* Theme Variables */
        .theme-dark {
          --bg-primary: #0a0a1a;
          --bg-secondary: #1a1a2a;
          --bg-overlay: rgba(10, 10, 26, 0.8);
          --text-primary: #e0e0f0;
          --text-secondary: #a0a0c0;
          --accent-primary: #00ffff; /* Cyan */
          --accent-secondary: #ff00ff; /* Magenta */
          --zero-color: #ffff00; /* Yellow */
          --critical-line-color: var(--accent-primary);
          --plot-line-color: #ff00ff; /* Magenta */
          --border-color: rgba(255, 255, 255, 0.15);
          --shadow-color: rgba(0, 255, 255, 0.3);
          --bg-gradient: linear-gradient(145deg, #0a0a1a 0%, #1a1a2a 50%, #2a1a3a 100%);
        }
        .theme-light {
          --bg-primary: #f0f4f8;
          --bg-secondary: #ffffff;
          --bg-overlay: rgba(255, 255, 255, 0.8);
          --text-primary: #1a202c;
          --text-secondary: #4a5568;
          --accent-primary: #007acc; /* Blue */
          --accent-secondary: #e60073; /* Pink */
          --zero-color: #ffcc00; /* Orange-Yellow */
          --critical-line-color: var(--accent-primary);
          --plot-line-color: #e60073; /* Pink */
          --border-color: #e2e8f0;
          --shadow-color: rgba(0, 122, 204, 0.3);
           --bg-gradient: linear-gradient(145deg, #e0e8f0 0%, #ffffff 50%, #f0e8f0 100%);
        }

        /* Layout */
        .riemann-explorer { background: var(--bg-gradient); color: var(--text-primary); }
        .riemann-header {
            width: 100%;
            padding: 0.75rem 1.5rem; /* px-6 py-3 */
            background: var(--bg-overlay);
            backdrop-filter: blur(8px); /* backdrop-blur-md */
            border-bottom: 1px solid var(--border-color);
            display: flex; /* flex */
            justify-content: space-between; /* justify-between */
            align-items: center; /* items-center */
            position: sticky; top: 0; z-index: 50; /* sticky top-0 z-50 */
        }
        .riemann-header-title { font-family: var(--font-display); font-size: 1.5rem; color: var(--accent-primary); text-shadow: 0 0 6px var(--shadow-color); } /* text-2xl */
        .riemann-controls { display: flex; align-items: center; gap: 1rem; } /* flex items-center gap-4 */
        .riemann-slider-group { display: flex; align-items: center; gap: 0.5rem; } /* flex items-center gap-2 */
        .riemann-slider-group label { font-size: 0.8rem; color: var(--text-secondary); } /* text-xs */
        .riemann-slider { width: 150px; cursor: pointer; accent-color: var(--accent-primary); } /* w-36 */
        .riemann-slider-value { font-size: 0.9rem; font-weight: bold; color: var(--accent-primary); min-width: 50px; text-align: right; } /* text-sm font-bold w-12 text-right */
        .riemann-button {
             background: rgba(255, 255, 255, 0.1); border: 1px solid var(--border-color); color: var(--text-secondary);
             padding: 0.4rem 0.8rem; /* px-3 py-1.5 */ border-radius: 0.375rem; /* rounded-md */ font-size: 0.8rem; /* text-xs */
             cursor: pointer; transition: all var(--transition-speed);
         }
         .riemann-button:hover { color: var(--accent-primary); border-color: var(--accent-primary); background: rgba(var(--accent-primary-rgb, 0, 255, 255), 0.1); }
         /* Need RGB versions for rgba */
         .theme-dark { --accent-primary-rgb: 0, 255, 255; }
         .theme-light { --accent-primary-rgb: 0, 122, 204; }


        .riemann-main {
            flex-grow: 1; /* flex-grow */
            display: flex; /* flex */
            position: relative; /* relative */
            overflow: hidden; /* overflow-hidden */
        }

        .riemann-plane-container {
            flex-grow: 1; /* flex-grow */
            position: relative; /* relative */
            cursor: grab;
             background-image: radial-gradient(var(--border-color) 0.5px, transparent 0.5px); /* Subtle grid */
             background-size: 15px 15px;
        }
         .riemann-plane-container:active { cursor: grabbing; }
        .riemann-svg {
            display: block; /* block */
            width: 100%; height: 100%; /* w-full h-full */
            overflow: visible; /* Allow elements outside viewBox temporarily if needed */
            transition: transform 0.1s ease-out; /* Smooth pan/zoom slightly */
        }

         /* SVG Elements Styling */
        .riemann-axis { stroke: var(--text-secondary); stroke-width: 1; opacity: 0.5; vector-effect: non-scaling-stroke; }
        .riemann-grid-line { stroke: var(--border-color); stroke-width: 0.5; opacity: 0.5; vector-effect: non-scaling-stroke; }
        .riemann-critical-line { stroke: var(--critical-line-color); stroke-width: 2; stroke-dasharray: 4 2; animation: glow 2s infinite alternate; vector-effect: non-scaling-stroke; }
         @keyframes glow { from { filter: drop-shadow(0 0 2px var(--critical-line-color)); } to { filter: drop-shadow(0 0 5px var(--critical-line-color)); } }
        .riemann-critical-strip { fill: var(--critical-line-color); opacity: 0.05; }
        .riemann-selected-sigma-line { stroke: var(--plot-line-color); stroke-width: 1.5; opacity: 0.8; vector-effect: non-scaling-stroke; }
        .riemann-plot-line { stroke: var(--plot-line-color); stroke-width: 2; fill: none; filter: drop-shadow(0 0 3px var(--plot-line-color)); vector-effect: non-scaling-stroke; transition: d 0.1s linear; }
         .riemann-zero-marker { fill: var(--zero-color); r: 4; /* Radius */ opacity: 0.9; filter: drop-shadow(0 0 4px var(--zero-color)); transition: r 0.1s; }
         .riemann-zero-marker:hover { r: 6; }


        /* Info Panel */
        .riemann-info-panel {
            width: 280px; /* w-72 */
            background: var(--bg-overlay);
            backdrop-filter: blur(8px);
            border-left: 1px solid var(--border-color);
            padding: 1rem; /* p-4 */
            display: flex; flex-direction: column; gap: 1rem; /* flex flex-col gap-4 */
            font-size: 0.85rem; /* text-sm */
            color: var(--text-secondary);
            overflow-y: auto; /* Allow scrolling */
        }
        .riemann-info-panel h3 { font-family: var(--font-display); font-size: 1.1rem; color: var(--accent-secondary); margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3rem;} /* text-lg mb-2 pb-1 */
        .riemann-info-panel p, .riemann-info-panel ul { margin-bottom: 0.75rem; line-height: 1.5; } /* mb-3 leading-relaxed */
        .riemann-info-panel ul { list-style: disc; padding-left: 1.2rem; } /* list-disc pl-5 */
        .riemann-info-panel strong { color: var(--text-primary); font-weight: bold; }
        .riemann-info-panel code { background: var(--bg-secondary); padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-family: monospace; color: var(--accent-primary); font-size: 0.8rem; } /* bg-gray-700 p-1 rounded text-xs */
        .riemann-hover-info { min-height: 5em; background: var(--bg-secondary); padding: 0.5rem; border-radius: 0.25rem; border: 1px solid var(--border-color); font-family: monospace; font-size: 0.75rem; } /* h-20 text-xs */

        /* Help Modal */
        .riemann-help-modal-overlay {
             position: fixed; inset: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(5px); z-index: 100;
             display: flex; justify-content: center; align-items: center;
             animation: fade-in 0.3s ease-out;
        }
         @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .riemann-help-modal {
            background: var(--bg-secondary); color: var(--text-primary);
            padding: 2rem; border-radius: 0.75rem; /* rounded-xl */ border: 1px solid var(--border-color);
            max-width: 700px; max-height: 80vh; overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
         .riemann-help-modal h2 { font-family: var(--font-display); color: var(--accent-primary); margin-bottom: 1rem; }
         .riemann-help-modal p { margin-bottom: 0.75rem; line-height: 1.6; color: var(--text-secondary); }
         .riemann-help-modal strong { color: var(--text-primary); }
         .riemann-help-modal code { /* same as info panel */ }
         .riemann-help-modal button { float: right; margin-top: 1rem; }


        /* Loading Placeholder */
        .riemann-loading { padding: 3rem; text-align: center; font-size: 1.5rem; color: var(--accent-primary); }
      `}</style>

      {/* Header */}
      <header className="riemann-header">
        <div className="riemann-header-title">Riemann Explorer</div>
        <div className="riemann-controls">
          <div className="riemann-slider-group">
            <label htmlFor="sigma-slider">σ (Real):</label>
            <input
              type="range"
              id="sigma-slider"
              className="riemann-slider"
              min={INITIAL_SIGMA_RANGE.min}
              max={INITIAL_SIGMA_RANGE.max}
              step="0.005" // Fine control near 1/2
              value={state.selectedSigma}
              onChange={handleSigmaChange}
            />
            <span className="riemann-slider-value">{state.selectedSigma.toFixed(3)}</span>
          </div>
          <button className="riemann-button" onClick={() => setState(prev => ({ ...prev, showHelp: true }))}>Help</button>
          <button className="riemann-button" onClick={toggleTheme} title="Toggle Theme">
            {state.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="riemann-main">
        <div className="riemann-plane-container"
             onWheel={handleWheel}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUpOrLeave}
             onMouseLeave={handleMouseLeave}
            >
          <svg ref={svgRef} className="riemann-svg" viewBox={`${state.viewBox.x} ${state.viewBox.y} ${state.viewBox.width} ${state.viewBox.height}`} preserveAspectRatio="xMidYMid meet">
            {/* Definitions for patterns or gradients if needed */}
            <defs>
                {/* Could define markers or filters here */}
            </defs>

            {/* Background Elements */}
            <rect x={state.viewBox.x} y={state.viewBox.y} width={state.viewBox.width} height={state.viewBox.height} fill="transparent" />

            {/* Critical Strip */}
            <rect className="riemann-critical-strip" x="0" y={state.viewBox.y} width="1" height={state.viewBox.height} />

            {/* Grid Lines (Optional, can clutter) */}
             {/* Add logic to draw grid lines based on viewBox if desired */}

            {/* Axes */}
            <line className="riemann-axis" x1={state.viewBox.x} y1="0" x2={state.viewBox.x + state.viewBox.width} y2="0" /> {/* Real Axis (t=0) */}
            <line className="riemann-axis" x1="0" y1={state.viewBox.y} x2="0" y2={state.viewBox.y + state.viewBox.height} /> {/* Imaginary Axis (sigma=0) */}

            {/* Critical Line */}
            <line className="riemann-critical-line" x1={CRITICAL_LINE_SIGMA} y1={state.viewBox.y} x2={CRITICAL_LINE_SIGMA} y2={state.viewBox.y + state.viewBox.height} />

            {/* Selected Sigma Line */}
            <line className="riemann-selected-sigma-line" x1={state.selectedSigma} y1={state.viewBox.y} x2={state.selectedSigma} y2={state.viewBox.y + state.viewBox.height} />

            {/* Zeta Magnitude Plot */}
            <path className="riemann-plot-line" d={plotPathData} />

            {/* Known Zero Markers (Only on critical line) */}
            {KNOWN_ZERO_T_VALUES.map(t => {
                // Only render if zero is within current tRange
                if (t >= state.tRange.min && t <= state.tRange.max) {
                    return (
                         <circle
                            key={`zero-${t}`}
                            className="riemann-zero-marker"
                            cx={CRITICAL_LINE_SIGMA}
                            cy={t}
                            r={3 / Math.sqrt(state.viewBox.width)} /* Scale radius slightly with zoom */
                            style={{ vectorEffect: 'non-scaling-stroke' }} /* Keep marker size consistent visually */
                            />
                    );
                }
                return null;
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <aside className="riemann-info-panel">
          <h3>Riemann Explorer</h3>
          <p>Visualize the behavior of the Riemann Zeta function ζ(s) in the complex plane (s = σ + it).</p>
          <p>The <strong style={{color: 'var(--critical-line-color)'}}>Critical Line</strong> is where σ = 1/2.</p>
          <p>The <strong style={{color: 'var(--critical-line-color)', opacity: 0.5}}>Critical Strip</strong> is 0 {'<'} σ {'<'} 1.</p>

          <h3>Riemann Hypothesis</h3>
          <p>States that all non-trivial zeroes of ζ(s) lie <strong style={{color: 'var(--critical-line-color)'}}>exactly</strong> on the critical line.</p>
          <p>Use the slider to change σ. Notice how the dips in the <strong style={{color: 'var(--plot-line-color)'}}>magnitude plot |ζ(s)|</strong> (reaching zero) align with known zeroes (<strong style={{color: 'var(--zero-color)'}}>🟡</strong>) almost exclusively when <strong>σ ≈ 0.5</strong>.</p>
          <p><strong>Note:</strong> Zeta calculation is complex; this is a <strong style={{color: 'var(--accent-secondary)'}}>visual simulation</strong> demonstrating the hypothesis.</p>

          <h3>Controls</h3>
          <ul>
            <li><strong>Slider:</strong> Selects σ (Real part).</li>
            <li><strong>Mouse Wheel:</strong> Zoom in/out on the plane.</li>
            <li><strong>Click & Drag:</strong> Pan the view.</li>
          </ul>

          <h3>Hover Info</h3>
          <div className="riemann-hover-info">
            {state.hoverInfo.point ? (
              <>
                <div>σ (Re): {state.hoverInfo.point.re.toFixed(4)}</div>
                <div>t (Im): {state.hoverInfo.point.im.toFixed(4)}</div>
                <div>{state.hoverInfo.zetaValue}</div>
              </>
            ) : (
              <div>Hover over the plane...</div>
            )}
          </div>
        </aside>
      </main>

      {/* Help Modal */}
      {state.showHelp && (
         <div className="riemann-help-modal-overlay" onClick={() => setState(prev => ({ ...prev, showHelp: false }))}>
             <div className="riemann-help-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Welcome to Riemann Explorer!</h2>
                <p>This tool helps visualize concepts related to the famous Riemann Hypothesis, one of the biggest unsolved problems in mathematics.</p>
                <strong>What is the Riemann Zeta Function?</strong>
                <p>It's a function <code>ζ(s)</code> that takes a complex number <code>s</code> (where <code>s = σ + it</code>) as input. For <code>σ > 1</code>, it's defined as the infinite sum <code>1 + 1/2ˢ + 1/3ˢ + 1/4ˢ + ...</code>. For other values of <code>s</code>, it's defined through a process called analytic continuation.</p>
                <strong>What are Zeroes?</strong>
                <p>Zeroes are the input values <code>s</code> for which the function's output is zero: <code>ζ(s) = 0</code>. There are "trivial" zeroes at negative even integers (-2, -4, ...), but the interesting "non-trivial" zeroes lie in the <strong>Critical Strip</strong> (where the real part <code>σ</code> is between 0 and 1).</p>
                <strong>The Hypothesis:</strong>
                <p>The Riemann Hypothesis conjectures that <strong style={{color: 'var(--critical-line-color)'}}>ALL non-trivial zeroes lie EXACTLY on the Critical Line</strong>, where <code>σ = 1/2</code>.</p>
                <strong>How to Use This Tool:</strong>
                <ul>
                    <li>The main view shows the complex plane (<code>σ</code> horizontal, <code>t</code> vertical).</li>
                    <li>The <strong style={{color: 'var(--critical-line-color)'}}>Cyan Line</strong> is the Critical Line (σ=0.5).</li>
                    <li>The slider at the top selects a specific <code>σ</code> value. The <strong style={{color: 'var(--plot-line-color)'}}>Magenta Line</strong> shows this selected value.</li>
                    <li>The <strong style={{color: 'var(--plot-line-color)'}}>Magenta Plot</strong> shows the *magnitude* `|ζ(s)|` calculated along your selected sigma line (plotted horizontally from that line). Zeroes occur where this plot touches the selected sigma line (magnitude = 0).</li>
                    <li><strong style={{color: 'var(--zero-color)'}}>Yellow Dots (🟡)</strong> mark the known locations of non-trivial zeroes on the critical line.</li>
                    <li><strong>Experiment:</strong> Move the sigma slider. Notice how the magnitude plot only shows consistent dips near the yellow dots when sigma is very close to 0.5!</li>
                    <li><strong>Zoom/Pan:</strong> Use the mouse wheel and click-drag to explore different regions.</li>
                </ul>
                <p><strong>Remember:</strong> This visualization <strong style={{color: 'var(--accent-secondary)'}}>simulates</strong> the Zeta function's behavior around zeroes to clearly illustrate the hypothesis, as precise real-time calculation is extremely difficult.</p>
                <button className="riemann-button" onClick={() => setState(prev => ({ ...prev, showHelp: false }))}>Close</button>
             </div>
         </div>
      )}
    </div>
  );
};

export default RiemannExplorer;