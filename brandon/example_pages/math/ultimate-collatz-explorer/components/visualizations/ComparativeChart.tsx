import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CollatzSequence } from '../../context/CollatzContext';

interface ComparativeChartProps {
  sequences: CollatzSequence[];
}

const ComparativeChart = ({ sequences }: ComparativeChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [viewType, setViewType] = useState<'growth' | 'steps' | 'distribution'>('growth');

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
    if (!svgRef.current || !sequences.length || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous rendering

    const { width, height } = dimensions;
    const margin = { top: 40, right: 80, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Main chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Color scale for sequences
    const colorScale = d3.scaleOrdinal<string>()
      .domain(sequences.map(s => s.startingNumber.toString()))
      .range(d3.schemeCategory10);

    // Visualization logic based on the view type
    if (viewType === 'growth') {
      // Line chart showing sequence growth over time

      // Process data for all sequences
      const allPoints = sequences.map(seq => {
        return seq.sequence.map((value, index) => ({
          step: index,
          value,
          startingNumber: seq.startingNumber
        }));
      });

      // Find maximum values for scales
      const maxStep = d3.max(allPoints, points => d3.max(points, d => d.step)) || 0;
      const maxValue = d3.max(allPoints, points => d3.max(points, d => d.value)) || 0;

      // Create scales
      const xScale = d3.scaleLinear()
        .domain([0, maxStep])
        .range([0, innerWidth])
        .nice();

      const yScale = d3.scaleLog() // Log scale for better visualization of large variations
        .domain([1, maxValue])
        .range([innerHeight, 0])
        .nice();

      // Add the axes
      const xAxis = d3.axisBottom(xScale)
        .ticks(Math.min(10, maxStep));

      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .attr("class", "cosmic-axis")
        .call(xAxis)
        .append("text")
        .attr("class", "cosmic-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Step");

      const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => d3.format(".1e")(d as number));

      g.append("g")
        .attr("class", "cosmic-axis")
        .call(yAxis)
        .append("text")
        .attr("class", "cosmic-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .text("Value (log scale)");

      // Generate lines for each sequence
      const line = d3.line<{step: number, value: number}>()
        .x(d => xScale(d.step))
        .y(d => yScale(Math.max(d.value, 1)))  // Ensure positive values for log scale
        .curve(d3.curveMonotoneX);

      // Add the lines
      allPoints.forEach((points, i) => {
        const color = colorScale(points[0].startingNumber.toString());

        g.append("path")
          .datum(points)
          .attr("class", "cosmic-line")
          .attr("stroke", color)
          .attr("d", line)
          .attr("data-starting", points[0].startingNumber);
      });

      // Add legend
      const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);

      sequences.forEach((seq, i) => {
        const color = colorScale(seq.startingNumber.toString());

        const legendItem = legend.append("g")
          .attr("transform", `translate(0, ${i * 25})`)
          .attr("class", "cosmic-legend-item");

        legendItem.append("rect")
          .attr("width", 15)
          .attr("height", 3)
          .attr("fill", color);

        legendItem.append("text")
          .attr("x", 20)
          .attr("y", 4)
          .attr("class", "cosmic-legend-text")
          .style("fill", "var(--cosmic-text-color)")
          .style("font-size", "0.75rem")
          .text(`Start: ${seq.startingNumber}`);
      });

    } else if (viewType === 'steps') {
      // Bar chart comparing total steps for each sequence

      // Prepare data
      const data = sequences.map(seq => ({
        startingNumber: seq.startingNumber,
        steps: seq.steps
      }));

      // Sort by steps descending
      data.sort((a, b) => b.steps - a.steps);

      // Create scales
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.startingNumber.toString()))
        .range([0, innerWidth])
        .padding(0.2);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.steps) || 0])
        .range([innerHeight, 0])
        .nice();

      // Add the axes
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .attr("class", "cosmic-axis")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("class", "cosmic-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Starting Number");

      g.append("g")
        .attr("class", "cosmic-axis")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("class", "cosmic-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .text("Steps to Reach 1");

      // Add the bars
      g.selectAll(".cosmic-bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "cosmic-bar")
        .attr("x", d => xScale(d.startingNumber.toString()) || 0)
        .attr("y", d => yScale(d.steps))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.steps))
        .attr("fill", d => colorScale(d.startingNumber.toString()))
        .attr("rx", 3)
        .attr("ry", 3);

      // Add value labels on top of bars
      g.selectAll(".cosmic-bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "cosmic-bar-label")
        .attr("x", d => (xScale(d.startingNumber.toString()) || 0) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.steps) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.steps);

    } else if (viewType === 'distribution') {
      // Box plot showing distribution of values in each sequence

      // Prepare data - calculate quartiles and outliers for each sequence
      const boxPlotData = sequences.map(seq => {
        const values = seq.sequence.slice().sort((a, b) => a - b);
        const q1 = d3.quantile(values, 0.25) || 0;
        const median = d3.quantile(values, 0.5) || 0;
        const q3 = d3.quantile(values, 0.75) || 0;
        const iqr = q3 - q1;
        const min = Math.max(values[0], q1 - 1.5 * iqr);
        const max = Math.min(values[values.length - 1], q3 + 1.5 * iqr);

        // Find outliers
        const outliers = values.filter(v => v < min || v > max);

        return {
          startingNumber: seq.startingNumber,
          min,
          q1,
          median,
          q3,
          max,
          outliers
        };
      });

      // Create scales
      const xScale = d3.scaleBand()
        .domain(boxPlotData.map(d => d.startingNumber.toString()))
        .range([0, innerWidth])
        .padding(0.2);

      // Find max value across all sequences
      const allValues = sequences.flatMap(seq => seq.sequence);
      const yMax = d3.max(allValues) || 0;

      const yScale = d3.scaleLog()
        .domain([1, yMax])
        .range([innerHeight, 0])
        .nice();

      // Add the axes
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .attr("class", "cosmic-axis")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("class", "cosmic-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Starting Number");

      g.append("g")
        .attr("class", "cosmic-axis")
        .call(d3.axisLeft(yScale).tickFormat(d => d3.format(".1e")(d as number)))
        .append("text")
        .attr("class", "cosmic-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .text("Value Distribution (log scale)");

      // Draw the box plots
      boxPlotData.forEach(d => {
        const x = (xScale(d.startingNumber.toString()) || 0) + xScale.bandwidth() / 2;
        const color = colorScale(d.startingNumber.toString());

        // Draw center line (min to max)
        g.append("line")
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", yScale(Math.max(d.min, 1)))
          .attr("y2", yScale(Math.max(d.max, 1)))
          .attr("stroke", color)
          .attr("stroke-width", 1);

        // Draw box (q1 to q3)
        g.append("rect")
          .attr("x", x - 15)
          .attr("y", yScale(Math.max(d.q3, 1)))
          .attr("width", 30)
          .attr("height", yScale(Math.max(d.q1, 1)) - yScale(Math.max(d.q3, 1)))
          .attr("fill", color)
          .attr("fill-opacity", 0.3)
          .attr("stroke", color)
          .attr("stroke-width", 1);

        // Draw median line
        g.append("line")
          .attr("x1", x - 15)
          .attr("x2", x + 15)
          .attr("y1", yScale(Math.max(d.median, 1)))
          .attr("y2", yScale(Math.max(d.median, 1)))
          .attr("stroke", color)
          .attr("stroke-width", 2);

        // Draw whiskers
        g.append("line")
          .attr("x1", x - 10)
          .attr("x2", x + 10)
          .attr("y1", yScale(Math.max(d.min, 1)))
          .attr("y2", yScale(Math.max(d.min, 1)))
          .attr("stroke", color)
          .attr("stroke-width", 1);

        g.append("line")
          .attr("x1", x - 10)
          .attr("x2", x + 10)
          .attr("y1", yScale(Math.max(d.max, 1)))
          .attr("y2", yScale(Math.max(d.max, 1)))
          .attr("stroke", color)
          .attr("stroke-width", 1);

        // Draw outliers if any
        d.outliers.forEach(outlier => {
          g.append("circle")
            .attr("cx", x + (Math.random() * 10 - 5)) // Jitter for better visibility
            .attr("cy", yScale(Math.max(outlier, 1)))
            .attr("r", 3)
            .attr("fill", color)
            .attr("opacity", 0.7);
        });
      });
    }

    // Add interactive tooltips
    const tooltip = d3.select('body').append('div')
      .attr('class', 'cosmic-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    // Custom event handlers based on view type
    if (viewType === 'growth') {
      svg.selectAll(".cosmic-line")
        .on("mouseover", function() {
          d3.select(this)
            .attr("stroke-width", 4)
            .attr("opacity", 1);

          const startingNumber = d3.select(this).attr("data-starting");
          const sequence = sequences.find(s => s.startingNumber.toString() === startingNumber);

          if (sequence) {
            tooltip
              .style('visibility', 'visible')
              .html(`
                <strong>Starting: ${sequence.startingNumber}</strong><br>
                Steps: ${sequence.steps}<br>
                Max Value: ${sequence.maxValue.toLocaleString()}<br>
                Max/Start Ratio: ${(sequence.maxValue / sequence.startingNumber).toFixed(1)}x
              `);
          }
        })
        .on("mousemove", function(event) {
          tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);
        })
        .on("mouseout", function() {
          d3.select(this)
            .attr("stroke-width", 2)
            .attr("opacity", 0.8);

          tooltip.style('visibility', 'hidden');
        });
    } else if (viewType === 'steps') {
      svg.selectAll(".cosmic-bar")
        .on("mouseover", function(event, d) {
          d3.select(this)
            .attr("opacity", 0.8)
            .attr("stroke", "var(--cosmic-highlight-color)")
            .attr("stroke-width", 2);

          tooltip
            .style('visibility', 'visible')
            .html(`
              <strong>Starting: ${d.startingNumber}</strong><br>
              Steps to Reach 1: ${d.steps}
            `)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);
        })
        .on("mouseout", function() {
          d3.select(this)
            .attr("opacity", 1)
            .attr("stroke", "none");

          tooltip.style('visibility', 'hidden');
        });
    }

    return () => {
      tooltip.remove();
    };
  }, [sequences, dimensions, viewType]);

  return (
    <div ref={containerRef} className="cosmic-viz-container">
      <div className="cosmic-viz-controls">
        <label className="cosmic-radio-group">
          <span>View Type:</span>
          <div className="cosmic-radio-options">
            <label className="cosmic-radio">
              <input
                type="radio"
                name="viewType"
                value="growth"
                checked={viewType === 'growth'}
                onChange={() => setViewType('growth')}
              />
              <span>Growth Curves</span>
            </label>
            <label className="cosmic-radio">
              <input
                type="radio"
                name="viewType"
                value="steps"
                checked={viewType === 'steps'}
                onChange={() => setViewType('steps')}
              />
              <span>Step Comparison</span>
            </label>
            <label className="cosmic-radio">
              <input
                type="radio"
                name="viewType"
                value="distribution"
                checked={viewType === 'distribution'}
                onChange={() => setViewType('distribution')}
              />
              <span>Value Distribution</span>
            </label>
          </div>
        </label>
      </div>
      <svg ref={svgRef} width="100%" height="100%" className="cosmic-svg" />
      <div className="cosmic-chart-explanation">
        <p>
          {viewType === 'growth'
            ? 'This chart shows how each sequence evolves over time, allowing you to compare growth patterns.'
            : viewType === 'steps'
            ? 'This chart compares the number of steps each starting value takes to reach 1.'
            : 'This box plot shows the distribution of values in each sequence, with quartiles and outliers.'}
        </p>
      </div>
    </div>
  );
};

export default ComparativeChart;
