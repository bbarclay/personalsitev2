import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useCollatzContext } from '../../context/CollatzContext';

interface GridViewProps {
  data?: any;
}

const GridView: React.FC<GridViewProps> = () => {
  const { standardSequence, compareSequences } = useCollatzContext();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  // Grid view controls
  const [cellSize, setCellSize] = useState(20);
  const [showLabels, setShowLabels] = useState(true);
  const [sortBy, setSortBy] = useState<'natural' | 'evenOdd' | 'stopTime' | 'maxValue'>('natural');
  const [gridLayout, setGridLayout] = useState<'square' | 'linear' | 'circular'>('square');
  const [highlightPattern, setHighlightPattern] = useState<'none' | 'powers' | 'clusters'>('none');
  const [colorScale, setColorScale] = useState<'stopTime' | 'parity' | 'maxValue'>('parity');
  const [expanded, setExpanded] = useState(false);

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

  // Generate grid data when sequence changes
  useEffect(() => {
    if (!svgRef.current || !standardSequence?.sequence || dimensions.width === 0) return;

    drawGrid();
  }, [standardSequence, dimensions, cellSize, sortBy, gridLayout, highlightPattern, colorScale, showLabels]);

  // Draw the grid visualization
  const drawGrid = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous rendering

    const { width, height } = dimensions;
    const margin = { top: 40, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create main drawing group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Example sequence data (normally from standardSequence)
    const sequenceData = standardSequence.sequence;
    const startNumber = standardSequence.startNumber;

    // Generate grid data - sample numbers around the current number
    const range = 100; // Range of numbers to display
    const gridData = [];

    for (let i = Math.max(1, startNumber - range/2); i < startNumber + range/2; i++) {
      // Simulate Collatz sequence for each number
      let n = i;
      let steps = 0;
      let maxVal = n;
      let stoppingTime = 0;
      let firstLowerFound = false;

      while (n > 1 && steps < 1000) {
        if (n % 2 === 0) {
          n = n / 2;
        } else {
          n = 3 * n + 1;
        }
        steps++;

        if (n > maxVal) maxVal = n;
        if (!firstLowerFound && n < i) {
          stoppingTime = steps;
          firstLowerFound = true;
        }
      }

      gridData.push({
        number: i,
        steps,
        maxValue: maxVal,
        stoppingTime: stoppingTime || steps,
        parity: i % 2 === 0 ? 'even' : 'odd',
        isPowerOfTwo: (Math.log2(i) % 1 === 0),
        isPowerOfThree: (Math.log(i) / Math.log(3) % 1 < 0.01)
      });
    }

    // Sort data based on selection
    let sortedData = [...gridData];
    if (sortBy === 'evenOdd') {
      sortedData.sort((a, b) => a.parity === b.parity ? a.number - b.number : a.parity === 'even' ? -1 : 1);
    } else if (sortBy === 'stopTime') {
      sortedData.sort((a, b) => b.stoppingTime - a.stoppingTime);
    } else if (sortBy === 'maxValue') {
      sortedData.sort((a, b) => b.maxValue - a.maxValue);
    }

    // Calculate grid dimensions
    const cellsPerRow = Math.floor(innerWidth / cellSize);
    const rows = Math.ceil(sortedData.length / cellsPerRow);

    // Create background grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cellsPerRow; col++) {
        const index = row * cellsPerRow + col;
        if (index >= sortedData.length) continue;

        const item = sortedData[index];

        // Determine cell position based on layout
        let x, y;
        if (gridLayout === 'square') {
          x = col * cellSize;
          y = row * cellSize;
        } else if (gridLayout === 'linear') {
          x = index * cellSize;
          y = innerHeight / 2 - cellSize / 2;
        } else { // circular
          const angle = (index / sortedData.length) * Math.PI * 2;
          const radius = Math.min(innerWidth, innerHeight) / 2 - cellSize;
          x = innerWidth/2 + Math.cos(angle) * radius - cellSize/2;
          y = innerHeight/2 + Math.sin(angle) * radius - cellSize/2;
        }

        // Determine cell color
        let cellColor;
        if (colorScale === 'parity') {
          cellColor = item.parity === 'even' ? 'rgba(3, 218, 198, 0.8)' : 'rgba(255, 64, 129, 0.8)';
        } else if (colorScale === 'stopTime') {
          // Color from blue to red based on stopping time
          const maxStopTime = Math.max(...sortedData.map(d => d.stoppingTime));
          const normalized = item.stoppingTime / maxStopTime;
          cellColor = d3.interpolateViridis(normalized);
        } else { // maxValue
          // Color based on max value reached
          const logMaxValues = sortedData.map(d => Math.log10(d.maxValue));
          const maxLogValue = Math.max(...logMaxValues);
          const normalizedLog = Math.log10(item.maxValue) / maxLogValue;
          cellColor = d3.interpolatePlasma(normalizedLog);
        }

        // Apply pattern highlighting
        let strokeWidth = 1;
        let strokeColor = 'rgba(255, 255, 255, 0.2)';

        if (highlightPattern === 'powers') {
          if (item.isPowerOfTwo || item.isPowerOfThree) {
            strokeWidth = 3;
            strokeColor = item.isPowerOfTwo ? 'gold' : 'lime';
          }
        } else if (highlightPattern === 'clusters') {
          // Highlight numbers with similar stopping times
          const avgStopTime = d3.mean(gridData, d => d.stoppingTime);
          if (Math.abs(item.stoppingTime - avgStopTime) < avgStopTime * 0.1) {
            strokeWidth = 3;
            strokeColor = 'white';
          }
        }

        // Draw cell rectangle
        g.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", cellSize - 2)
          .attr("height", cellSize - 2)
          .attr("fill", cellColor)
          .attr("stroke", strokeColor)
          .attr("stroke-width", strokeWidth)
          .attr("rx", 2)
          .attr("ry", 2)
          .style("cursor", "pointer")
          .on("mouseover", (event) => {
            const tooltip = {
              show: true,
              x: event.pageX,
              y: event.pageY,
              content: `
                Number: ${item.number}<br>
                Steps to 1: ${item.steps}<br>
                Stopping Time: ${item.stoppingTime}<br>
                Max Value: ${item.maxValue.toLocaleString()}<br>
                Parity: ${item.parity}
              `
            };
            setTooltip(tooltip);
          })
          .on("mouseout", () => {
            setTooltip({ ...tooltip, show: false });
          });

        // Add labels if enabled and cell is large enough
        if (showLabels && cellSize >= 20) {
          g.append("text")
            .attr("x", x + cellSize/2 - 1)
            .attr("y", y + cellSize/2 + 3)
            .attr("text-anchor", "middle")
            .attr("font-size", Math.min(12, cellSize/2))
            .attr("fill", "white")
            .text(item.number);
        }
      }
    }

    // Add a color legend based on current color mode
    const legendWidth = 200;
    const legendHeight = 30;
    const legendX = innerWidth - legendWidth;
    const legendY = innerHeight + 10;

    if (colorScale === 'stopTime' || colorScale === 'maxValue') {
      const gradient = g.append("defs")
        .append("linearGradient")
        .attr("id", "color-gradient")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      // Create gradient stops
      const colorRange = colorScale === 'stopTime' ? d3.interpolateViridis : d3.interpolatePlasma;
      for (let i = 0; i <= 10; i++) {
        gradient.append("stop")
          .attr("offset", `${i*10}%`)
          .attr("stop-color", colorRange(i/10));
      }

      // Draw gradient rectangle
      g.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#color-gradient)");

      // Add labels
      g.append("text")
        .attr("x", legendX)
        .attr("y", legendY + legendHeight + 15)
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(colorScale === 'stopTime' ? "Lower stopping time" : "Lower max value");

      g.append("text")
        .attr("x", legendX + legendWidth)
        .attr("y", legendY + legendHeight + 15)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(colorScale === 'stopTime' ? "Higher stopping time" : "Higher max value");
    } else {
      // Add discrete legend for parity
      g.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "rgba(3, 218, 198, 0.8)");

      g.append("text")
        .attr("x", legendX + 25)
        .attr("y", legendY + 15)
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text("Even numbers");

      g.append("rect")
        .attr("x", legendX + 110)
        .attr("y", legendY)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "rgba(255, 64, 129, 0.8)");

      g.append("text")
        .attr("x", legendX + 135)
        .attr("y", legendY + 15)
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text("Odd numbers");
    }

    // Add title
    svg.append("text")
      .attr("x", width/2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text("Grid View: Collatz Patterns");
  };

  // Handle zoom in/out for cell size
  const handleZoomIn = () => {
    setCellSize(prev => Math.min(prev + 5, 50));
  };

  const handleZoomOut = () => {
    setCellSize(prev => Math.max(prev - 5, 10));
  };

  // Toggle expansion
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="cosmic-viz-container">
      <div className="cosmic-viz-header">
        <h3 className="cosmic-viz-title">Grid View</h3>
        <div className="cosmic-viz-controls-horizontal">
          {/* Sort controls */}
          <select
            className="cosmic-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="natural">Natural Order</option>
            <option value="evenOdd">Even/Odd</option>
            <option value="stopTime">Stop Time</option>
            <option value="maxValue">Max Value</option>
          </select>

          {/* Layout controls */}
          <select
            className="cosmic-select"
            value={gridLayout}
            onChange={(e) => setGridLayout(e.target.value as any)}
          >
            <option value="square">Square Grid</option>
            <option value="linear">Linear Strip</option>
            <option value="circular">Circular</option>
          </select>

          {/* Color controls */}
          <select
            className="cosmic-select"
            value={colorScale}
            onChange={(e) => setColorScale(e.target.value as any)}
          >
            <option value="parity">Color by Parity</option>
            <option value="stopTime">Color by Stop Time</option>
            <option value="maxValue">Color by Max Value</option>
          </select>

          {/* Pattern highlighting */}
          <select
            className="cosmic-select"
            value={highlightPattern}
            onChange={(e) => setHighlightPattern(e.target.value as any)}
          >
            <option value="none">No Highlight</option>
            <option value="powers">Powers of 2 & 3</option>
            <option value="clusters">Similar Stop Times</option>
          </select>

          {/* Zoom controls */}
          <div className="cosmic-control-group">
            <button
              className="cosmic-control-button-small"
              onClick={handleZoomOut}
              disabled={cellSize <= 10}
            >
              -
            </button>
            <span className="cosmic-zoom-display">{cellSize}px</span>
            <button
              className="cosmic-control-button-small"
              onClick={handleZoomIn}
              disabled={cellSize >= 50}
            >
              +
            </button>
          </div>

          {/* Label toggle */}
          <div className="cosmic-control-group">
            <input
              type="checkbox"
              id="showLabels"
              checked={showLabels}
              onChange={() => setShowLabels(!showLabels)}
              className="cosmic-checkbox"
            />
            <label htmlFor="showLabels" className="cosmic-control-label">
              Labels
            </label>
          </div>

          {/* Expand button */}
          <button
            className="cosmic-control-button-small"
            onClick={toggleExpand}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      <div className="cosmic-chart-area">
        <div
          id="grid-view-container"
          className={`cosmic-chart-container ${expanded ? 'expanded' : ''}`}
          ref={containerRef}
          style={expanded ? {
            position: 'fixed',
            top: '5%',
            left: '5%',
            width: '90%',
            height: '85%',
            zIndex: 1000,
            background: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            padding: '20px'
          } : {}}
        >
          <svg
            ref={svgRef}
            width="100%"
            height={expanded ? '95%' : '100%'}
            className="cosmic-svg"
          />

          {expanded && (
            <button
              className="cosmic-close-button"
              onClick={toggleExpand}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(100, 100, 100, 0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="cosmic-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            maxWidth: '200px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};

export default GridView;
