import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface HexGridData {
  value: number;
  position: number;
  isEven: boolean;
}

interface HexGridVisualizerProps {
  data: HexGridData[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function HexGridVisualizer({
  data,
  width = 800,
  height = 600,
  colorScheme = 'viridis'
}: HexGridVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([1, d3.max(data, d => d.value) || 100])
      .interpolator(d3[`interpolate${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`]);

    // Hexagon parameters
    const hexRadius = 25;
    const hexagonPoints = (d: { x: number; y: number }) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = 2 * Math.PI / 6 * i;
        points.push([
          d.x + hexRadius * Math.cos(angle),
          d.y + hexRadius * Math.sin(angle)
        ]);
      }
      return points;
    };

    // Calculate hex layout
    const spiralCoordinates = (n: number) => {
      // Spiral coordinates in a hexagonal grid
      // Adapted from https://www.redblobgames.com/grids/hexagons/
      let x = 0, y = 0;
      if (n === 0) return {x, y};
      
      // Calculate ring number and position
      const radius = Math.floor((Math.sqrt(12 * n - 3) - 3) / 6) + 1;
      let position = n - 3 * radius * (radius - 1);
      
      // Calculate side and position on side
      const side = Math.floor((position - 1) / radius);
      const pos = ((position - 1) % radius) + 1;
      
      // Calculate coordinates based on side and position
      switch(side) {
        case 0: x = pos; y = -radius; break;
        case 1: x = radius; y = pos - radius; break;
        case 2: x = radius - pos; y = pos; break;
        case 3: x = -pos; y = radius; break;
        case 4: x = -radius; y = radius - pos; break;
        case 5: x = -radius + pos; y = -pos; break;
      }
      
      return {x, y};
    };

    // Calculate hex positions
    const hexData = data.map((d, i) => {
      const coords = spiralCoordinates(i);
      return {
        ...d,
        x: innerWidth / 2 + coords.x * hexRadius * 1.8,
        y: innerHeight / 2 + coords.y * hexRadius * 1.6
      };
    });

    // Draw connecting lines
    const lines = g.append('g').attr('class', 'lines');

    lines.selectAll('line')
      .data(hexData.slice(1))
      .enter()
      .append('line')
      .attr('x1', (d, i) => hexData[i].x)
      .attr('y1', (d, i) => hexData[i].y)
      .attr('x2', d => d.x)
      .attr('y2', d => d.y)
      .attr('stroke', '#888')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.6)
      .attr('stroke-dasharray', (d, i) => {
        return hexData[i].isEven === d.isEven ? '0' : '3,3';
      });

    // Draw hexagons
    const hexagons = g.append('g').attr('class', 'hexagons');

    const hexGroups = hexagons.selectAll('g.hex')
      .data(hexData)
      .enter()
      .append('g')
      .attr('class', 'hex')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    hexGroups.append('polygon')
      .attr('points', d => hexagonPoints({x: 0, y: 0}).map(p => p.join(',')).join(' '))
      .attr('fill', d => colorScale(d.value))
      .attr('fill-opacity', 0.8)
      .attr('stroke', d => d.isEven ? '#4CAF50' : '#F44336')
      .attr('stroke-width', 2);

    // Add value labels
    hexGroups.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .attr('font-size', d => {
        // Adjust font size based on value length
        const digits = d.value.toString().length;
        return Math.max(8, 14 - digits);
      })
      .text(d => d.value);

    // Add step labels
    hexGroups.append('text')
      .attr('dy', hexRadius + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .attr('font-size', 10)
      .text(d => `Step ${d.position}`);

    // Add tooltips
    hexGroups.append('title')
      .text(d => `Value: ${d.value}\nStep: ${d.position}\n${d.isEven ? 'Even' : 'Odd'}`);

    // Add zoom and pan behavior
    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Add arrow indicating direction
    const arrow = g.append('g')
      .attr('class', 'arrow')
      .attr('transform', `translate(${innerWidth - 80},${innerHeight - 50})`);

    arrow.append('path')
      .attr('d', 'M0,0 L20,0 L10,20 Z')
      .attr('fill', 'currentColor')
      .attr('opacity', 0.6);

    arrow.append('text')
      .attr('x', 10)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', 'currentColor')
      .text('Sequence Direction');

    // Add legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = innerWidth - legendWidth - 20;
    const legendY = 20;

    // Value legend
    const valueLegendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY})`);

    const valueGradient = valueLegendG.append('defs')
      .append('linearGradient')
      .attr('id', 'hexgrid-value-gradient')
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
      .style('fill', 'url(#hexgrid-value-gradient)');

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

    // Even example
    parityLegendG.append('polygon')
      .attr('points', hexagonPoints({x: 10, y: 10}).map(p => p.join(',')).join(' '))
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2)
      .attr('transform', 'scale(0.5)');

    parityLegendG.append('text')
      .attr('x', 30)
      .attr('y', 10)
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'currentColor')
      .text('Even');

    // Odd example
    parityLegendG.append('polygon')
      .attr('points', hexagonPoints({x: 10, y: 35}).map(p => p.join(',')).join(' '))
      .attr('fill', 'none')
      .attr('stroke', '#F44336')
      .attr('stroke-width', 2)
      .attr('transform', 'scale(0.5)');

    parityLegendG.append('text')
      .attr('x', 30)
      .attr('y', 35)
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'currentColor')
      .text('Odd');

    // Instruction text
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('fill', 'currentColor')
      .text('Drag to pan, scroll to zoom');

  }, [data, width, height, colorScheme]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Hexagonal Grid Visualization</h4>
        <p className="text-xs text-muted-foreground">
          Arranges the Collatz sequence in a spiral hexagonal grid pattern. 
          Each hexagon represents a number in the sequence.
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