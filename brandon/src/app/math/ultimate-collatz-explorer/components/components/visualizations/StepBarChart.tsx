import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CollatzSequence } from '../../context/CollatzContext';

interface StepBarChartProps {
  sequence: CollatzSequence;
}

const StepBarChart = ({ sequence }: StepBarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [chartType, setChartType] = useState<'stepSize' | 'oddEven'>('stepSize');

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
    if (!svgRef.current || !sequence || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous rendering

    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Main chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare data based on chart type
    let data: { label: string; value: number; color: string }[] = [];

    if (chartType === 'stepSize') {
      // Calculate step sizes (increases or decreases between consecutive terms)
      const stepSizes = [];
      for (let i = 1; i < sequence.sequence.length; i++) {
        const prev = sequence.sequence[i - 1];
        const curr = sequence.sequence[i];
        const change = curr - prev;
        stepSizes.push(change);
      }

      // Count frequencies of different step sizes
      const stepCounts: Record<string, number> = {};
      stepSizes.forEach(step => {
        const key = step.toString();
        stepCounts[key] = (stepCounts[key] || 0) + 1;
      });

      // Convert to array format for visualization
      data = Object.entries(stepCounts)
        .map(([step, count]) => {
          const stepValue = parseInt(step);
          return {
            label: step,
            value: count,
            color: stepValue < 0 ? 'var(--cosmic-decrease-color)' :
                  stepValue > 0 ? 'var(--cosmic-increase-color)' :
                  'var(--cosmic-neutral-color)'
          };
        })
        .sort((a, b) => parseInt(a.label) - parseInt(b.label));

    } else if (chartType === 'oddEven') {
      // Count odd and even numbers in the sequence
      const oddCount = sequence.sequence.filter(n => n % 2 !== 0).length;
      const evenCount = sequence.sequence.filter(n => n % 2 === 0).length;

      data = [
        { label: 'Odd', value: oddCount, color: 'var(--cosmic-odd-color)' },
        { label: 'Even', value: evenCount, color: 'var(--cosmic-even-color)' }
      ];
    }

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([innerHeight, 0])
      .nice();

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "cosmic-axis")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("class", "cosmic-axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .text(chartType === 'stepSize' ? 'Step Size (Change in Value)' : 'Number Type');

    // Add y-axis
    g.append("g")
      .attr("class", "cosmic-axis")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("class", "cosmic-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -35)
      .attr("text-anchor", "middle")
      .text("Frequency");

    // Add bars
    g.selectAll(".cosmic-bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "cosmic-bar")
      .attr("x", d => xScale(d.label) || 0)
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.value))
      .attr("fill", d => d.color)
      .attr("rx", 3)
      .attr("ry", 3);

    // Add value labels on top of bars
    g.selectAll(".cosmic-bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "cosmic-bar-label")
      .attr("x", d => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .text(d => d.value);

    // Add interactive tooltips
    const tooltip = d3.select('body').append('div')
      .attr('class', 'cosmic-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    g.selectAll(".cosmic-bar")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("opacity", 0.8)
          .attr("stroke", "var(--cosmic-highlight-color)")
          .attr("stroke-width", 2);

        let tooltipContent = '';
        if (chartType === 'stepSize') {
          const change = parseInt(d.label);
          tooltipContent = `
            <strong>Step Size: ${d.label}</strong><br>
            Frequency: ${d.value} (${(d.value / (sequence.sequence.length - 1) * 100).toFixed(1)}%)<br>
            ${change < 0 ? 'Value decreased' : change > 0 ? 'Value increased' : 'No change'}
          `;
        } else {
          tooltipContent = `
            <strong>${d.label} Numbers</strong><br>
            Count: ${d.value} (${(d.value / sequence.sequence.length * 100).toFixed(1)}%)
          `;
        }

        tooltip
          .style('visibility', 'visible')
          .html(tooltipContent)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("opacity", 1)
          .attr("stroke", "none");

        tooltip.style('visibility', 'hidden');
      });

    return () => {
      tooltip.remove();
    };
  }, [sequence, dimensions, chartType]);

  return (
    <div ref={containerRef} className="cosmic-viz-container">
      <div className="cosmic-viz-controls">
        <label className="cosmic-radio-group">
          <span>Chart Type:</span>
          <div className="cosmic-radio-options">
            <label className="cosmic-radio">
              <input
                type="radio"
                name="chartType"
                value="stepSize"
                checked={chartType === 'stepSize'}
                onChange={() => setChartType('stepSize')}
              />
              <span>Step Sizes</span>
            </label>
            <label className="cosmic-radio">
              <input
                type="radio"
                name="chartType"
                value="oddEven"
                checked={chartType === 'oddEven'}
                onChange={() => setChartType('oddEven')}
              />
              <span>Odd vs Even</span>
            </label>
          </div>
        </label>
      </div>
      <svg ref={svgRef} width="100%" height="100%" className="cosmic-svg" />
      <div className="cosmic-chart-explanation">
        <p>
          {chartType === 'stepSize'
            ? 'This chart shows how frequently the sequence increases or decreases by different amounts in each step.'
            : 'This chart compares the distribution of odd and even numbers in the sequence.'}
        </p>
      </div>
    </div>
  );
};

export default StepBarChart;
