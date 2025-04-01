import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface SpiralData {
  value: number;
  angle: number;
  radius: number;
  isEven: boolean;
}

interface SpiralVisualizerProps {
  data: SpiralData[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function SpiralVisualizer({
  data,
  width = 800,
  height = 800,
  colorScheme = 'viridis'
}: SpiralVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left + innerWidth / 2},${margin.top + innerHeight / 2})`);

    // Create scales
    const angleScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.radius) || 1])
      .range([0, radius]);

    const colorScale = d3.scaleSequential()
      .domain([1, d3.max(data, d => d.value) || 100])
      .interpolator(d3[`interpolate${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`]);

    // Create spiral path
    const spiral = d3.line<SpiralData>()
      .x(d => radiusScale(d.radius) * Math.cos(angleScale(data.indexOf(d)))
        - radiusScale(d.radius) * Math.sin(angleScale(data.indexOf(d))))
      .y(d => radiusScale(d.radius) * Math.sin(angleScale(data.indexOf(d)))
        + radiusScale(d.radius) * Math.cos(angleScale(data.indexOf(d))));

    // Draw spiral path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('d', spiral);

    // Create node groups
    const nodeGroups = g.selectAll('g.node')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${
        radiusScale(d.radius) * Math.cos(angleScale(data.indexOf(d)))
        - radiusScale(d.radius) * Math.sin(angleScale(data.indexOf(d)))
      },${
        radiusScale(d.radius) * Math.sin(angleScale(data.indexOf(d)))
        + radiusScale(d.radius) * Math.cos(angleScale(data.indexOf(d)))
      })`);

    // Add circles for nodes
    nodeGroups.append('circle')
      .attr('r', 6)
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', d => d.isEven ? '#4CAF50' : '#F44336')
      .attr('stroke-width', 2);

    // Add labels
    nodeGroups.append('text')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(d => d.value);

    // Add tooltips
    nodeGroups.append('title')
      .text(d => `Value: ${d.value}\n${d.isEven ? 'Even' : 'Odd'}`);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Add legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = radius - legendWidth - 10;
    const legendY = -radius - 40;

    // Value legend
    const valueLegendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY})`);

    const valueGradient = valueLegendG.append('defs')
      .append('linearGradient')
      .attr('id', 'value-gradient')
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
      .style('fill', 'url(#value-gradient)');

    valueLegendG.append('text')
      .attr('x', -10)
      .attr('y', legendHeight / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'currentColor')
      .text('Node Value');

    // Add parity legend
    const parityLegendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY + 30})`);

    parityLegendG.append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 6)
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2);

    parityLegendG.append('text')
      .attr('x', 30)
      .attr('y', 15)
      .attr('fill', 'currentColor')
      .text('Even');

    parityLegendG.append('circle')
      .attr('cx', 10)
      .attr('cy', 30)
      .attr('r', 6)
      .attr('fill', 'none')
      .attr('stroke', '#F44336')
      .attr('stroke-width', 2);

    parityLegendG.append('text')
      .attr('x', 30)
      .attr('y', 35)
      .attr('fill', 'currentColor')
      .text('Odd');

  }, [data, width, height, colorScheme]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Sequence Spiral</h4>
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