import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface LineGraphProps {
  sequence: number[];
  customSequence?: number[];
}

const LineGraph = ({ sequence, customSequence }: LineGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [useLogScale, setUseLogScale] = useState(true);

  // Resize observer to make chart responsive
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

  // Draw the visualization
  useEffect(() => {
    if (!svgRef.current || sequence.length === 0 || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous rendering

    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, sequence.length - 1])
      .range([0, innerWidth]);

    // Determine y-scale based on user preference
    const yScale = useLogScale
      ? d3.scaleLog()
          .domain([Math.max(1, d3.min(sequence) || 1), d3.max(sequence) || 100])
          .range([innerHeight, 0])
          .nice()
      : d3.scaleLinear()
          .domain([0, d3.max(sequence) || 100])
          .range([innerHeight, 0])
          .nice();

    // Main chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(Math.min(sequence.length, 10))
      .tickFormat(d => `${d}`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "cosmic-axis")
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => useLogScale
        ? d3.format(".1e")(d as number)
        : d3.format(",")(d as number));

    g.append("g")
      .attr("class", "cosmic-axis")
      .call(yAxis);

    // Add axis labels
    g.append("text")
      .attr("class", "cosmic-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 5)
      .text("Step");

    g.append("text")
      .attr("class", "cosmic-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left + 15)
      .text("Value");

    // Generate line for main sequence
    const line = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(Math.max(d, 1))) // Ensure positive values for log scale
      .curve(d3.curveMonotoneX);

    // Add the main sequence line
    g.append("path")
      .datum(sequence)
      .attr("class", "cosmic-line cosmic-primary-line")
      .attr("d", line);

    // Add points for main sequence
    g.selectAll(".cosmic-point")
      .data(sequence)
      .enter()
      .append("circle")
      .attr("class", "cosmic-point cosmic-primary-point")
      .attr("cx", (_, i) => xScale(i))
      .attr("cy", d => yScale(Math.max(d, 1)))
      .attr("r", 3)
      .attr("opacity", (_, i) => Math.min(1, 20 / sequence.length));

    // Add custom sequence line if available
    if (customSequence && customSequence.length > 0) {
      // Update y-scale domain to include custom sequence values
      if (useLogScale) {
        yScale.domain([
          Math.max(1, Math.min(d3.min(sequence) || 1, d3.min(customSequence) || 1)),
          Math.max(d3.max(sequence) || 100, d3.max(customSequence) || 100)
        ]).nice();
      } else {
        yScale.domain([
          0,
          Math.max(d3.max(sequence) || 100, d3.max(customSequence) || 100)
        ]).nice();
      }

      // Generate line for custom sequence
      const customLine = d3.line<number>()
        .x((_, i) => xScale(i * (sequence.length / customSequence.length)))
        .y(d => yScale(Math.max(d, 1)))
        .curve(d3.curveMonotoneX);

      // Add the custom sequence line
      g.append("path")
        .datum(customSequence)
        .attr("class", "cosmic-line cosmic-accent-line")
        .attr("d", customLine)
        .attr("stroke-dasharray", "5,5");

      // Add points for custom sequence
      g.selectAll(".cosmic-custom-point")
        .data(customSequence)
        .enter()
        .append("circle")
        .attr("class", "cosmic-point cosmic-accent-point")
        .attr("cx", (_, i) => xScale(i * (sequence.length / customSequence.length)))
        .attr("cy", d => yScale(Math.max(d, 1)))
        .attr("r", 3)
        .attr("opacity", (_, i) => Math.min(1, 20 / customSequence.length));
    }

    // Add interactive tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'cosmic-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    // Add interaction overlay
    g.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mousemove", function(event) {
        const [mouseX] = d3.pointer(event);
        const index = Math.round(xScale.invert(mouseX));

        if (index >= 0 && index < sequence.length) {
          // Show tooltip
          tooltip
            .style('visibility', 'visible')
            .html(`<strong>Step ${index}</strong><br>Value: ${sequence[index].toLocaleString()}`)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);

          // Highlight point
          svg.selectAll(".cosmic-highlight-point").remove();
          g.append("circle")
            .attr("class", "cosmic-highlight-point")
            .attr("cx", xScale(index))
            .attr("cy", yScale(Math.max(sequence[index], 1)))
            .attr("r", 6)
            .attr("fill", "none")
            .attr("stroke", "var(--cosmic-highlight-color)")
            .attr("stroke-width", 2);
        }
      })
      .on("mouseleave", function() {
        tooltip.style('visibility', 'hidden');
        svg.selectAll(".cosmic-highlight-point").remove();
      });

    // Custom overlay to show even/odd steps
    const evenOddData = sequence.map((val, i) => ({
      value: val,
      isEven: val % 2 === 0,
      index: i
    }));

    // Add background coloring for even/odd groups
    let currentType = evenOddData[0]?.isEven;
    let startIndex = 0;

    evenOddData.forEach((d, i) => {
      if (d.isEven !== currentType || i === evenOddData.length - 1) {
        // Draw background for the group
        g.append("rect")
          .attr("x", xScale(startIndex))
          .attr("y", 0)
          .attr("width", xScale(i) - xScale(startIndex))
          .attr("height", innerHeight)
          .attr("fill", currentType ? "var(--cosmic-even-color)" : "var(--cosmic-odd-color)")
          .attr("opacity", 0.1);

        currentType = d.isEven;
        startIndex = i;
      }
    });

    return () => {
      tooltip.remove();
    };
  }, [sequence, customSequence, dimensions, useLogScale]);

  return (
    <div ref={containerRef} className="cosmic-viz-container">
      <div className="cosmic-viz-controls">
        <label className="cosmic-toggle">
          <input
            type="checkbox"
            checked={useLogScale}
            onChange={() => setUseLogScale(!useLogScale)}
          />
          <span>Log Scale</span>
        </label>
      </div>
      <svg ref={svgRef} width="100%" height="100%" className="cosmic-svg" />
    </div>
  );
};

export default LineGraph;
