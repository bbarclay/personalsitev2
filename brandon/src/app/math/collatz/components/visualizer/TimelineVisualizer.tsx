import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface TimelineData {
  value: number;
  step: number;
  isEven: boolean;
}

interface TimelineVisualizerProps {
  data: TimelineData[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function TimelineVisualizer({
  data,
  width = 800,
  height = 500,
  colorScheme = 'viridis'
}: TimelineVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([1, d3.max(data, d => d.value) || 100])
      .interpolator(d3[`interpolate${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`]);

    // Create x and y scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1 || 100])
      .range([innerHeight, 0]);

    // Create the line
    const line = d3.line<TimelineData>()
      .x(d => xScale(d.step))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add the timeline path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add data points
    const points = g.selectAll('.point')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'point')
      .attr('transform', d => `translate(${xScale(d.step)},${yScale(d.value)})`);

    points.append('circle')
      .attr('r', 5)
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', d => d.isEven ? '#4CAF50' : '#F44336')
      .attr('stroke-width', 2);

    // Add value labels to selected points
    points.filter((d, i) => i % Math.max(1, Math.floor(data.length / 10)) === 0 || i === data.length - 1)
      .append('text')
      .attr('x', 0)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .attr('font-size', 10)
      .text(d => d.value);

    // Add tooltips
    points.append('title')
      .text(d => `Value: ${d.value}\nStep: ${d.step}\n${d.isEven ? 'Even' : 'Odd'}`);

    // Add x-axis
    const xAxis = d3.axisBottom(xScale)
      .ticks(Math.min(data.length, 10))
      .tickFormat(d => `${d}`);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .append('text')
      .attr('fill', 'currentColor')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .text('Step');

    // Add y-axis
    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    g.append('g')
      .call(yAxis)
      .append('text')
      .attr('fill', 'currentColor')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -innerHeight / 2)
      .attr('text-anchor', 'middle')
      .text('Value');

    // Add even/odd regions
    const parityRegions = [];
    let currentParity = data[0].isEven;
    let startIdx = 0;

    for (let i = 1; i < data.length; i++) {
      if (data[i].isEven !== currentParity) {
        parityRegions.push({
          start: startIdx,
          end: i - 1,
          isEven: currentParity
        });
        currentParity = data[i].isEven;
        startIdx = i;
      }
    }

    // Add the final region
    parityRegions.push({
      start: startIdx,
      end: data.length - 1,
      isEven: currentParity
    });

    // Draw parity regions
    g.selectAll('.parity-region')
      .data(parityRegions)
      .enter()
      .append('rect')
      .attr('class', 'parity-region')
      .attr('x', d => xScale(d.start))
      .attr('y', 0)
      .attr('width', d => xScale(d.end) - xScale(d.start))
      .attr('height', innerHeight)
      .attr('fill', d => d.isEven ? '#4CAF50' : '#F44336')
      .attr('opacity', 0.05);

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(10)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
      )
      .attr('stroke-opacity', 0.1);

    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .ticks(10)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .attr('stroke-opacity', 0.1);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 10])
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Add title
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .attr('fill', 'currentColor')
      .text('Collatz Sequence Timeline');

    // Add legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = innerWidth - legendWidth;
    const legendY = 0;

    // Value legend
    const valueLegendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY})`);

    const valueGradient = valueLegendG.append('defs')
      .append('linearGradient')
      .attr('id', 'timeline-value-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    valueGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => colorScale(d * 100));

    valueLegendG.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#timeline-value-gradient)');

    valueLegendG.append('text')
      .attr('x', -5)
      .attr('y', legendHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', 'currentColor')
      .text('Value:');

    // Add parity legend
    const parityLegendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY + 30})`);

    parityLegendG.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', '#4CAF50')
      .attr('opacity', 0.2);

    parityLegendG.append('text')
      .attr('x', 30)
      .attr('y', 10)
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'currentColor')
      .text('Even regions');

    parityLegendG.append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', '#F44336')
      .attr('opacity', 0.2);

    parityLegendG.append('text')
      .attr('x', 30)
      .attr('y', 28)
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'currentColor')
      .text('Odd regions');

  }, [data, width, height, colorScheme]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Timeline Visualization</h4>
        <p className="text-xs text-muted-foreground">
          Shows the sequence values over time with even/odd regions highlighted. 
          Pan and zoom for a closer look.
        </p>
        <div className="overflow-x-auto">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="mx-auto"
          />
        </div>
      </div>
    </Card>
  );
} 