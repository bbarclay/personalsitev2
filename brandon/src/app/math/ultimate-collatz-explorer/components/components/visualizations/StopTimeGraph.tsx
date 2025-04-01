import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useCollatzContext } from '../../context/CollatzContext';

interface StopTimeData {
  start: number;
  steps: number;
  maxValue: number;
}

interface StopTimeGraphProps {
  data?: StopTimeData[] | null;
  currentNumber?: number;
  onRangeChange?: (multiplier: number) => void;
}

const StopTimeGraph = ({ data: propData, currentNumber: propCurrentNumber, onRangeChange }: StopTimeGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [viewMode, setViewMode] = useState<'steps' | 'maxValue'>('steps');
  const [rangeMultiplier, setRangeMultiplier] = useState<number>(1);
  const [patternHighlight, setPatternHighlight] = useState<'none' | 'powerOfTwo' | 'powerOfThree'>('none');
  const { standardSequence, updateStandardSequence } = useCollatzContext();
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [showMaxValues, setShowMaxValues] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);
  const [zoomRange, setZoomRange] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [helpVisible, setHelpVisible] = useState(false);

  // Use context data if props are not provided
  const data = propData || [];
  const currentNumber = propCurrentNumber || standardSequence?.startNumber || 0;

  // Resize observer to make chart responsive
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]) return;

      const { width, height } = entries[0].contentRect;
      setDimensions({
        width: Math.max(width, 200),
        height: Math.max(height, 300) // Increased minimum height
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Generate stop time data if not provided
  useEffect(() => {
    if (propData || !standardSequence?.startNumber) return;

    setIsLoading(true);
    setError(null);

    // Simulate API call or heavy computation with delay
    const timer = setTimeout(() => {
      try {
        const generatedData = generateStopTimeData(standardSequence.startNumber, zoomRange);
        setIsLoading(false);
      } catch (err) {
        setError("Error generating stop time data");
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [standardSequence?.startNumber, zoomRange, propData]);

  // Generate sample data for visualization
  const generateStopTimeData = (startNum: number, rangeMultiplier: number): StopTimeData[] => {
    const range = 40 * rangeMultiplier;
    const start = Math.max(1, startNum - range / 2);
    const end = startNum + range / 2;
    const result = [];

    for (let i = start; i <= end; i++) {
      let current = i;
      let sequence = [current];
      let steps = 0;
      let stoppingTime = null;

      while (current !== 1 && steps < 1000) {
        current = current % 2 === 0 ? current / 2 : 3 * current + 1;
        sequence.push(current);
        steps++;

        if (stoppingTime === null && current < i) {
          stoppingTime = steps;
        }
      }

      result.push({
        start: i,
        steps: stoppingTime !== null ? stoppingTime : steps,
        maxValue: Math.max(...sequence)
      });
    }

    return result;
  };

  // Draw the visualization
  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0 || dimensions.width === 0) return;

    drawChart(dimensions.width, dimensions.height);
  }, [data, dimensions, viewMode, currentNumber, patternHighlight, showMaxValues, showPatterns, zoomRange]);

  // Main chart drawing function
  const drawChart = (width: number, height: number) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous rendering

    const margin = { top: 40, right: 40, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add a subtle grid pattern
    svg.append("defs")
      .append("pattern")
      .attr("id", "grid-pattern")
      .attr("width", 20)
      .attr("height", 20)
      .attr("patternUnits", "userSpaceOnUse")
      .append("path")
      .attr("d", "M 20 0 L 0 0 0 20")
      .attr("fill", "none")
      .attr("stroke", "rgba(255, 255, 255, 0.05)")
      .attr("stroke-width", 1);

    // Add grid background with animation
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#grid-pattern)")
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .attr("opacity", 1);

    // Main chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales with better domain padding
    const xDomain = [
      d3.min(data, d => d.start) || 0,
      d3.max(data, d => d.start) || 0
    ];
    const xDomainPadding = (xDomain[1] - xDomain[0]) * 0.05;

    const xScale = d3.scaleLinear()
      .domain([xDomain[0] - xDomainPadding, xDomain[1] + xDomainPadding])
      .range([0, innerWidth]);

    // Determine y-scale based on view mode with better padding
    const metricAccessor = viewMode === 'steps'
      ? (d: StopTimeData) => d.steps
      : (d: StopTimeData) => Math.log10(Math.max(1, d.maxValue));

    const yMax = d3.max(data, metricAccessor) || 0;
    const yPadding = yMax * 0.15; // 15% padding at the top

    const yScale = d3.scaleLinear()
      .domain([0, yMax + yPadding])
      .range([innerHeight, 0]);

    // Add the axes with smooth transition and styling
    const xAxis = g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "cosmic-axis x-axis");

    // Create x-axis with appropriate number of ticks
    const xTickCount = Math.min(10, Math.floor(innerWidth / 60));
    xAxis.call(
      d3.axisBottom(xScale)
        .ticks(xTickCount)
        .tickFormat(d => d.toString())
    );

    // Add x-axis label with animation
    xAxis.append("text")
      .attr("class", "cosmic-axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("Starting Number")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    // Add subtle grid lines with animation
    g.append("g")
      .attr("class", "cosmic-grid-lines")
      .selectAll("line")
      .data(yScale.ticks(5))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .attr("stroke", "rgba(255, 255, 255, 0.1)")
      .attr("stroke-dasharray", "2,2")
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // Dynamic y-axis based on view mode
    const yAxis = g.append("g")
      .attr("class", "cosmic-axis y-axis");

    if (viewMode === 'maxValue') {
      // For max value log scale, create custom ticks with formatted values
      const maxValue = Math.pow(10, d3.max(data, metricAccessor) || 0);
      const logTicks = d3.range(0, Math.log10(maxValue) + 1, 1)
        .filter(tick => tick !== 0); // Remove zero tick

      yAxis.call(
        d3.axisLeft(yScale)
          .tickValues(logTicks)
          .tickFormat(d => {
            const value = Math.pow(10, d);
            if (value >= 1e9) return `${(value/1e9).toFixed(0)}B`;
            if (value >= 1e6) return `${(value/1e6).toFixed(0)}M`;
            if (value >= 1e3) return `${(value/1e3).toFixed(0)}K`;
            return value.toFixed(0);
          })
      );
    } else {
      // For steps view, use appropriate tick spacing
      const maxSteps = d3.max(data, d => d.steps) || 0;
      const tickCount = 5; // Fixed number of ticks for cleaner look
      const stepSize = Math.ceil(maxSteps / tickCount);

      // Generate ticks at nice intervals
      const tickValues = d3.range(0, maxSteps + stepSize, stepSize)
        .filter(tick => tick <= maxSteps + yPadding);

      yAxis.call(
        d3.axisLeft(yScale)
          .tickValues(tickValues)
          .tickFormat(d => Math.round(d).toString())
      );
    }

    // Improve y-axis label spacing and animation
    yAxis.selectAll(".tick text")
      .attr("x", -8)
      .style("text-anchor", "end");

    yAxis.append("text")
      .attr("class", "cosmic-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text(viewMode === 'steps' ? "Stopping Time (steps)" : "Maximum Value Reached")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    // Add area under the curve with beautiful gradient fill
    const gradientId = "area-gradient";
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "var(--cosmic-primary-color)")
      .attr("stop-opacity", 0.7);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "var(--cosmic-primary-color)")
      .attr("stop-opacity", 0.1);

    // Add the area with animation
    g.append("path")
      .datum(data)
      .attr("class", "cosmic-area")
      .attr("fill", `url(#${gradientId})`)
      .attr("d", d3.area<StopTimeData>()
        .x(d => xScale(d.start))
        .y0(innerHeight)
        .y1(innerHeight) // Start from the bottom for animation
        .curve(d3.curveMonotoneX) // Smoother curve
      )
      .transition()
      .duration(1500)
      .attr("d", d3.area<StopTimeData>()
        .x(d => xScale(d.start))
        .y0(innerHeight)
        .y1(d => yScale(metricAccessor(d)))
        .curve(d3.curveMonotoneX)
      );

    // Add data line with animated drawing
    const line = d3.line<StopTimeData>()
      .x(d => xScale(d.start))
      .y(d => yScale(metricAccessor(d)))
      .curve(d3.curveMonotoneX);

    const path = g.append("path")
      .datum(data)
      .attr("class", "cosmic-line cosmic-primary-line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "var(--cosmic-primary-color)")
      .attr("stroke-width", 2.5)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    // Animate the line drawing
    const pathLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(2000)
      .ease(d3.easeQuadOut)
      .attr("stroke-dashoffset", 0);

    // Create separate layer for interactive elements
    const interactiveLayer = g.append("g")
      .attr("class", "interactive-layer");

    // Add vertical line for current number with animation
    const currentX = xScale(currentNumber);
    interactiveLayer.append("line")
      .attr("class", "cosmic-highlight-line")
      .attr("x1", currentX)
      .attr("x2", currentX)
      .attr("y1", innerHeight)
      .attr("y2", innerHeight) // Start at bottom for animation
      .attr("stroke", "var(--cosmic-highlight-color)")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,4")
      .transition()
      .duration(1000)
      .delay(1500)
      .attr("y2", 0);

    // Add interactive tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'cosmic-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.5)')
      .style('z-index', '1000')
      .style('pointer-events', 'none')
      .style('transition', 'opacity 0.3s ease');

    // Find and highlight local maxima with annotations
    if (showMaxValues) {
      const localMaxima = [];
      for (let i = 1; i < data.length - 1; i++) {
        if (data[i].steps > data[i-1].steps && data[i].steps > data[i+1].steps) {
          localMaxima.push(data[i]);
        }
      }

      // Sort and take top peaks
      const topPeaks = localMaxima
        .sort((a, b) => b.steps - a.steps)
        .slice(0, 3);

      // Add annotation for each peak
      topPeaks.forEach((peak, idx) => {
        const peakX = xScale(peak.start);
        const peakY = yScale(metricAccessor(peak));

        // Create highlight circle with pulse animation
        const peakPoint = interactiveLayer.append("circle")
          .attr("cx", peakX)
          .attr("cy", peakY)
          .attr("r", 6)
          .attr("fill", "var(--cosmic-accent-color)")
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          .style("opacity", 0)
          .transition()
          .duration(500)
          .delay(2000 + idx * 200)
          .style("opacity", 1);

        // Add label for the peak
        const labelX = peakX + (idx % 2 === 0 ? 10 : -10);
        const labelAnchor = idx % 2 === 0 ? "start" : "end";

        interactiveLayer.append("text")
          .attr("x", labelX)
          .attr("y", peakY - 15)
          .attr("text-anchor", labelAnchor)
          .attr("fill", "var(--cosmic-accent-color)")
          .attr("font-size", "12px")
          .style("opacity", 0)
          .text(`Local peak: ${peak.steps} steps`)
          .transition()
          .duration(500)
          .delay(2200 + idx * 200)
          .style("opacity", 1);

        // Add connecting line
        interactiveLayer.append("line")
          .attr("x1", peakX)
          .attr("y1", peakY)
          .attr("x2", peakX)
          .attr("y2", peakY)
          .attr("stroke", "var(--cosmic-accent-color)")
          .attr("stroke-width", 1.5)
          .style("opacity", 0)
          .transition()
          .duration(500)
          .delay(2100 + idx * 200)
          .style("opacity", 1)
          .attr("x2", labelX)
          .attr("y2", peakY - 10);
      });
    }

    // Pattern highlighting for powers of 2 and powers of 3
    if (showPatterns) {
      // Find points that match pattern criteria
      const patternPoints = data.filter(d => {
        const logBase2 = Math.log2(d.start);
        const logBase3 = Math.log(d.start) / Math.log(3);

        // Points that are powers of 2 or powers of 3 (with small margin for error)
        return Math.abs(logBase2 - Math.round(logBase2)) < 0.001 ||
               Math.abs(logBase3 - Math.round(logBase3)) < 0.001;
      });

      // Add special markers with animation
      patternPoints.forEach((point, i) => {
        const isPowerOf2 = Math.abs(Math.log2(point.start) - Math.round(Math.log2(point.start))) < 0.001;

        interactiveLayer.append("circle")
          .attr("cx", xScale(point.start))
          .attr("cy", yScale(metricAccessor(point)))
          .attr("r", 0) // Start small for animation
          .attr("fill", "none")
          .attr("stroke", isPowerOf2 ? "#FFD700" : "#7FFF00") // Gold for powers of 2, lime for powers of 3
          .attr("stroke-width", 2)
          .style("opacity", 0)
          .transition()
          .duration(400)
          .delay(1500 + i * 50)
          .attr("r", 8)
          .style("opacity", 0.8);

        // Add a small label to indicate the power
        const power = isPowerOf2
          ? `2^${Math.round(Math.log2(point.start))}`
          : `3^${Math.round(Math.log(point.start) / Math.log(3))}`;

        interactiveLayer.append("text")
          .attr("x", xScale(point.start))
          .attr("y", yScale(metricAccessor(point)) - 12)
          .attr("text-anchor", "middle")
          .attr("font-size", "9px")
          .attr("fill", isPowerOf2 ? "#FFD700" : "#7FFF00")
          .text(power)
          .style("opacity", 0)
          .transition()
          .duration(400)
          .delay(1700 + i * 50)
          .style("opacity", 0.8);
      });
    }

    // Add interactive data points
    const points = interactiveLayer.selectAll(".cosmic-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "cosmic-point")
      .attr("cx", d => xScale(d.start))
      .attr("cy", d => yScale(metricAccessor(d)))
      .attr("r", d => d.start === currentNumber ? 8 : 4)
      .attr("fill", d => d.start === currentNumber
        ? "var(--cosmic-highlight-color)"
        : d.start % 2 === 0 ? "rgba(3, 218, 198, 0.8)" : "rgba(255, 64, 129, 0.8)")
      .attr("stroke", d => d.start === currentNumber ? "white" : "none")
      .attr("stroke-width", d => d.start === currentNumber ? 2 : 0)
      .style("cursor", "pointer")
      .style("opacity", 0)
      .transition()
      .duration(1500)
      .delay((d, i) => 2000 + i * 5)
      .style("opacity", 1);

    // Enhanced hover effects
    points.each(function(d) {
      const point = d3.select(this);
      const node = point.node();

      if (!node) return;

      // Add mouseover event
      node.addEventListener('mouseover', function(event) {
        // Enlarge point on hover
        point
          .transition()
          .duration(150)
          .attr("r", d.start === currentNumber ? 10 : 7)
          .attr("stroke", "white")
          .attr("stroke-width", 2);

        // Show tooltip with animated fade
        tooltip
          .style('visibility', 'visible')
          .style('opacity', '0')
          .transition()
          .duration(200)
          .style('opacity', '1');

        // Format tooltip content with more details
        const tooltipContent = `
          <div style="font-weight: bold; margin-bottom: 5px; color: ${d.start === currentNumber ? 'var(--cosmic-highlight-color)' : 'white'}">
            Starting Number: ${d.start}
          </div>
          <div style="margin-bottom: 8px">
            <span style="font-weight: bold">Stopping Time:</span> ${d.steps} steps
            <div style="font-size: 10px; color: rgba(255,255,255,0.8); margin-top: 3px; line-height: 1.4">
              (Steps until ${getFirstValueLessThanStart(d.start)} is reached, the first value < ${d.start})
            </div>
          </div>
          <div style="margin-bottom: 3px">
            <span style="font-weight: bold">Max Value:</span> ${d.maxValue.toLocaleString()}
          </div>
          ${d.start === currentNumber
            ? '<div style="color:var(--cosmic-highlight-color); margin-top: 5px">Current Number</div>'
            : '<div style="font-size: 10px; margin-top: 5px; font-style: italic">Click to set as current</div>'}
        `;

        tooltip
          .html(tooltipContent)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 15}px`);

        // Add guide line to x-axis
        interactiveLayer.append("line")
          .attr("class", "guide-line")
          .attr("x1", xScale(d.start))
          .attr("x2", xScale(d.start))
          .attr("y1", yScale(metricAccessor(d)))
          .attr("y2", innerHeight)
          .attr("stroke", "rgba(255, 255, 255, 0.3)")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
      });

      // Add mouseout event
      node.addEventListener('mouseout', function() {
        // Reset point size on mouseout
        point
          .transition()
          .duration(150)
          .attr("r", d.start === currentNumber ? 8 : 4)
          .attr("stroke", d.start === currentNumber ? "white" : "none")
          .attr("stroke-width", d.start === currentNumber ? 2 : 0);

        // Hide tooltip with fade
        tooltip
          .transition()
          .duration(200)
          .style('opacity', '0')
          .end().then(() => {
            tooltip.style('visibility', 'hidden');
          });

        // Remove guide line
        interactiveLayer.selectAll(".guide-line").remove();
      });

      // Add click event
      node.addEventListener('click', function() {
        if (updateStandardSequence) {
          updateStandardSequence(d.start);
        }
      });
    });

    // Create a stopping time explanation in the top right
    const legendBoxWidth = 280; // Increased width to fit more text
    const legendBoxHeight = 90; // Increased height for more content
    const expandButtonOffset = 50; // Space for expand button

    const legendBox = svg.append("g")
      .attr("transform", `translate(${width - legendBoxWidth - expandButtonOffset}, 15)`)
      .style("opacity", 0);

    // Legend background with sleek design
    legendBox.append("rect")
      .attr("width", legendBoxWidth)
      .attr("height", legendBoxHeight)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", "rgba(0, 0, 0, 0.6)")
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-width", 1);

    // Title with improved styling (removing duplicated "Stopping Time:" text)
    legendBox.append("text")
      .attr("x", 12)
      .attr("y", 24)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("font-size", "13px")
      .text("Stopping Time:");

    // More detailed explanation text with better spacing
    legendBox.append("text")
      .attr("x", 12)
      .attr("y", 44)
      .attr("fill", "rgba(255, 255, 255, 0.9)")
      .attr("font-size", "11px")
      .text("Number of steps until a sequence reaches");

    legendBox.append("text")
      .attr("x", 12)
      .attr("y", 60)
      .attr("fill", "rgba(255, 255, 255, 0.9)")
      .attr("font-size", "11px")
      .text("its first value lower than the starting number");

    legendBox.append("text")
      .attr("x", 12)
      .attr("y", 76)
      .attr("fill", "rgba(255, 255, 255, 0.7)")
      .attr("font-size", "11px")
      .attr("font-style", "italic")
      .text("Example: For 27, it takes 111 steps to reach 23");

    // Apply transition to the legend box separately
    legendBox
      .transition()
      .duration(500)
      .delay(2500)
      .style("opacity", 1);

    // Hide the overlay text since it duplicates what's in the legend box
    d3.select('.cosmic-stopping-time-overlay').style('display', 'none');

    // Add expand button in the top right corner with better spacing
    const expandButton = svg.append("g")
      .attr("class", "expand-button")
      .attr("transform", `translate(${width - 35}, 15)`)
      .style("cursor", "pointer")
      .style("opacity", 0);

    // Add click event using event listener
    expandButton.node()?.addEventListener('click', function() {
      toggleExpand();
    });

    // Button background with sleek design
    expandButton.append("rect")
      .attr("width", 30)
      .attr("height", 30)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "rgba(40, 40, 40, 0.7)")
      .attr("stroke", "rgba(255, 255, 255, 0.3)")
      .attr("stroke-width", 1);

    // Expand icon with better visual
    expandButton.append("path")
      .attr("d", "M10,10 L20,10 L20,20 M20,10 L10,20")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    // Apply transition to the expand button separately
    expandButton
      .transition()
      .duration(500)
      .delay(2700)
      .style("opacity", 1);

    return () => {
      tooltip.remove();
    };
  };

  // Toggle between expanded and normal view
  const toggleExpand = () => {
    const isExpanded = d3.select(svgRef.current).classed('expanded');
    const chartContainer = d3.select('#stop-time-chart-container');

    if (!isExpanded) {
      // Save original dimensions
      d3.select(svgRef.current).attr('data-original-width', dimensions.width);
      d3.select(svgRef.current).attr('data-original-height', dimensions.height);

      // Set expanded dimensions
      const newWidth = window.innerWidth * 0.9;
      const newHeight = window.innerHeight * 0.8;

      // Update chart container
      chartContainer
        .style('position', 'fixed')
        .style('top', '5%')
        .style('left', '5%')
        .style('width', '90%')
        .style('height', '80%')
        .style('z-index', 1000)
        .style('background', 'rgba(20, 20, 20, 0.95)')
        .style('border', '1px solid rgba(255, 255, 255, 0.2)')
        .style('border-radius', '8px')
        .style('box-shadow', '0 0 20px rgba(0, 0, 0, 0.5)');

      // Redraw chart with new dimensions
      d3.select(svgRef.current).remove();
      const newSvg = chartContainer.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class', 'cosmic-svg');

      svgRef.current = newSvg.node();
      drawChart(newWidth, newHeight);

      // Add close button
      const closeButton = chartContainer.append('div')
        .style('position', 'absolute')
        .style('top', '10px')
        .style('right', '10px')
        .style('cursor', 'pointer')
        .style('color', 'white')
        .style('font-size', '20px')
        .style('width', '32px')
        .style('height', '32px')
        .style('background', 'rgba(60, 60, 60, 0.7)')
        .style('border-radius', '50%')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('box-shadow', '0 2px 8px rgba(0, 0, 0, 0.3)')
        .text('×')
        .each(function() {
          const node = this;
          node.addEventListener('click', function() {
            toggleExpand();
          });
        });
    } else {
      // Restore original dimensions
      const originalWidth = +d3.select(svgRef.current).attr('data-original-width');
      const originalHeight = +d3.select(svgRef.current).attr('data-original-height');

      // Reset chart container
      chartContainer
        .style('position', 'relative')
        .style('top', null)
        .style('left', null)
        .style('width', '100%')
        .style('height', null)
        .style('z-index', null)
        .style('background', null)
        .style('border', null)
        .style('border-radius', null)
        .style('box-shadow', null);

      // Remove close button
      chartContainer.selectAll('div').remove();

      // Redraw chart with original dimensions
      d3.select(svgRef.current).remove();
      const newSvg = chartContainer.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class', 'cosmic-svg');

      svgRef.current = newSvg.node();
      drawChart(originalWidth, originalHeight);
    }

    d3.select(svgRef.current).classed('expanded', !isExpanded);
  };

  // Toggle help tooltip visibility
  const toggleHelp = () => {
    setHelpVisible(!helpVisible);
  };

  // Zoom in function
  const zoomIn = () => {
    if (zoomRange < 10) {
      setZoomRange(prev => prev + 1);
      if (onRangeChange) {
        onRangeChange(zoomRange + 1);
      }
    }
  };

  // Zoom out function
  const zoomOut = () => {
    if (zoomRange > 1) {
      setZoomRange(prev => prev - 1);
      if (onRangeChange) {
        onRangeChange(zoomRange - 1);
      }
    }
  };

  // Add helper function to find the first value less than start for the tooltip
  const getFirstValueLessThanStart = (start: number): number => {
    let current = start;
    let firstLower = null;

    // Handle special cases
    if (start === 1) return 1;
    if (start === 2) return 1;
    if (start === 4) return 2;

    // Calculate sequence until we find first value < start
    while (firstLower === null && current !== 1) {
      current = current % 2 === 0 ? current / 2 : 3 * current + 1;
      if (current < start) {
        firstLower = current;
      }
    }

    return firstLower || 1;
  };

  if (!data || data.length === 0) {
    return (
      <div className="cosmic-viz-container">
        <div className="cosmic-viz-header">
          <h3 className="cosmic-viz-title">Stop Time Analysis</h3>
        </div>
        <div className="cosmic-chart-area">
          <div id="stop-time-chart-container" className="cosmic-chart-container" ref={containerRef}>
            {isLoading && (
              <div className="cosmic-loading">
                <div className="cosmic-spinner"></div>
                <p>Computing sequences...</p>
              </div>
            )}
            {error && (
              <div className="cosmic-error">
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && (
              <div className="cosmic-empty-state">
                <p>No data available for stop time analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cosmic-viz-container">
      <div className="cosmic-viz-header">
        <h3 className="cosmic-viz-title">Stop Time Analysis</h3>
        <div className="cosmic-viz-controls-horizontal">
          <div className="cosmic-control-group">
            <input
              type="checkbox"
              id="showMaxValues"
              checked={showMaxValues}
              onChange={() => setShowMaxValues(!showMaxValues)}
              className="cosmic-checkbox"
            />
            <label htmlFor="showMaxValues" className="cosmic-checkbox-label">
              Show Max Values
            </label>
          </div>
          <button
            className={`cosmic-control-button-small ${showPatterns ? 'active' : ''}`}
            onClick={() => setShowPatterns(!showPatterns)}
          >
            Show Patterns
          </button>
          <div className="cosmic-control-group">
            <span className="cosmic-range-label">Range: {zoomRange}x</span>
            <button
              className="cosmic-control-button-small"
              onClick={zoomOut}
              disabled={zoomRange === 1}
            >
              -
            </button>
            <button
              className="cosmic-control-button-small"
              onClick={zoomIn}
              disabled={zoomRange === 10}
            >
              +
            </button>
          </div>
          <button
            className="cosmic-control-button-small cosmic-help-button"
            onClick={toggleHelp}
          >
            ?
          </button>
        </div>
      </div>

      <div className="cosmic-chart-area">
        <div id="stop-time-chart-container" className="cosmic-chart-container" ref={containerRef}>
          <svg ref={svgRef} width="100%" height="100%" className="cosmic-svg" />

          {isLoading && (
            <div className="cosmic-loading">
              <div className="cosmic-spinner"></div>
              <p>Computing sequences...</p>
            </div>
          )}
          {error && (
            <div className="cosmic-error">
              <p>{error}</p>
            </div>
          )}
        </div>

        {helpVisible && (
          <div className="cosmic-help-panel">
            <div className="cosmic-help-content">
              <h4>About Stop Time Analysis</h4>
              <p>
                The stop time for a Collatz sequence is the number of steps required
                to reach a value lower than the starting number.
              </p>
              <p>
                This graph shows the stop time for various starting numbers, helping
                visualize patterns in how quickly sequences decrease.
              </p>
              <ul>
                <li>
                  <strong>X-axis:</strong> Starting numbers in the Collatz sequence
                </li>
                <li>
                  <strong>Y-axis:</strong> Number of steps until the sequence reaches a value lower than the starting number
                </li>
                <li>
                  <strong>Peaks:</strong> Starting numbers that take an unusually long time to decrease
                </li>
              </ul>
              <button
                className="cosmic-button cosmic-button-small"
                onClick={toggleHelp}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopTimeGraph;
