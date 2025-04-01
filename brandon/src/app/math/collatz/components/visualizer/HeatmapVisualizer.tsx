import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface HeatmapData {
  startNumber: number;
  steps: number;
  maxValue: number;
  convergenceRate: number;
}

interface HeatmapVisualizerProps {
  data: HeatmapData[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function HeatmapVisualizer({
  data,
  width = 800,
  height = 400,
  colorScheme = 'viridis'
}: HeatmapVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.steps) || 0])
      .range([innerHeight, 0]);

    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(data, d => d.convergenceRate) || 1])
      .interpolator(d3[`interpolate${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`]);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d => data[Number(d)]?.startNumber.toString() || '');

    const yAxis = d3.axisLeft(yScale)
      .ticks(5);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Starting Number');

    g.append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Steps to Reach 1');

    // Create heatmap cells
    const cellWidth = innerWidth / data.length;
    const cellHeight = innerHeight / (d3.max(data, d => d.steps) || 1);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d.steps))
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('fill', d => colorScale(d.convergenceRate))
      .attr('stroke', 'none')
      .append('title')
      .text(d => `Start: ${d.startNumber}\nSteps: ${d.steps}\nMax Value: ${d.maxValue}\nConvergence: ${(d.convergenceRate * 100).toFixed(2)}%`);

    // Add legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = innerWidth - legendWidth - 10;
    const legendY = -30;

    const legendScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5)
      .tickFormat(d => `${(Number(d) * 100).toFixed(0)}%`);

    const legendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY})`);

    const gradient = legendG.append('defs')
      .append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    gradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => colorScale(d));

    legendG.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)');

    legendG.append('g')
      .attr('transform', `translate(0,${legendHeight})`)
      .call(legendAxis);

    legendG.append('text')
      .attr('x', -10)
      .attr('y', legendHeight / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'currentColor')
      .text('Convergence Rate');

  }, [data, width, height, colorScheme]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Sequence Heatmap</h4>
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