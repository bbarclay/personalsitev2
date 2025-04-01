import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface FractalData {
  value: number;
  depth: number;
  isEven: boolean;
}

interface FractalVisualizerProps {
  data: FractalData[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function FractalVisualizer({
  data,
  width = 800,
  height = 800,
  colorScheme = 'viridis'
}: FractalVisualizerProps) {
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
      .attr('transform', `translate(${margin.left + innerWidth / 2},${margin.top + innerHeight / 2})`);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([1, d3.max(data, d => d.value) || 100])
      .interpolator(d3[`interpolate${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`]);

    // Parameters for the fractal
    const startRadius = Math.min(innerWidth, innerHeight) * 0.4;
    const startAngle = 0;
    const angleStep = Math.PI * 1.618033988749895; // Golden angle
    const radiusDecay = 0.92;

    // Draw connecting lines
    const lines = g.append('g').attr('class', 'lines');

    lines.selectAll('line')
      .data(data.slice(1))
      .enter()
      .append('line')
      .attr('x1', (d, i) => {
        const prevNode = data[i];
        const r = startRadius * Math.pow(radiusDecay, prevNode.depth);
        const angle = startAngle + angleStep * prevNode.depth;
        return r * Math.cos(angle);
      })
      .attr('y1', (d, i) => {
        const prevNode = data[i];
        const r = startRadius * Math.pow(radiusDecay, prevNode.depth);
        const angle = startAngle + angleStep * prevNode.depth;
        return r * Math.sin(angle);
      })
      .attr('x2', (d, i) => {
        const currentNode = data[i+1] || data[i];
        const r = startRadius * Math.pow(radiusDecay, currentNode.depth);
        const angle = startAngle + angleStep * currentNode.depth;
        return r * Math.cos(angle);
      })
      .attr('y2', (d, i) => {
        const currentNode = data[i+1] || data[i];
        const r = startRadius * Math.pow(radiusDecay, currentNode.depth);
        const angle = startAngle + angleStep * currentNode.depth;
        return r * Math.sin(angle);
      })
      .attr('stroke', (d, i) => {
        const prevValue = data[i].value;
        const gradient = svg.append('defs')
          .append('linearGradient')
          .attr('id', `line-gradient-${i}`)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', (d) => {
            const prevNode = data[i];
            const r = startRadius * Math.pow(radiusDecay, prevNode.depth);
            const angle = startAngle + angleStep * prevNode.depth;
            return r * Math.cos(angle) + innerWidth / 2 + margin.left;
          })
          .attr('y1', (d) => {
            const prevNode = data[i];
            const r = startRadius * Math.pow(radiusDecay, prevNode.depth);
            const angle = startAngle + angleStep * prevNode.depth;
            return r * Math.sin(angle) + innerHeight / 2 + margin.top;
          })
          .attr('x2', (d) => {
            const currentNode = data[i+1] || data[i];
            const r = startRadius * Math.pow(radiusDecay, currentNode.depth);
            const angle = startAngle + angleStep * currentNode.depth;
            return r * Math.cos(angle) + innerWidth / 2 + margin.left;
          })
          .attr('y2', (d) => {
            const currentNode = data[i+1] || data[i];
            const r = startRadius * Math.pow(radiusDecay, currentNode.depth);
            const angle = startAngle + angleStep * currentNode.depth;
            return r * Math.sin(angle) + innerHeight / 2 + margin.top;
          });

        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', colorScale(prevValue));

        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', colorScale(data[i+1]?.value || prevValue));

        return `url(#line-gradient-${i})`;
      })
      .attr('stroke-width', (d, i) => {
        // Thicker lines for larger value changes
        const prevValue = data[i].value;
        const currentValue = data[i+1]?.value || prevValue; // Safely access the next value
        const change = Math.abs(currentValue - prevValue);
        return 1 + Math.min(5, change / 50);
      })
      .attr('opacity', 0.7);

    // Draw nodes
    const nodes = g.append('g').attr('class', 'nodes');

    nodes.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        const r = startRadius * Math.pow(radiusDecay, d.depth);
        const angle = startAngle + angleStep * d.depth;
        return r * Math.cos(angle);
      })
      .attr('cy', (d) => {
        const r = startRadius * Math.pow(radiusDecay, d.depth);
        const angle = startAngle + angleStep * d.depth;
        return r * Math.sin(angle);
      })
      .attr('r', (d) => {
        // Vary the radius based on the value and depth
        const baseRadius = 5;
        const valueScale = Math.sqrt(d.value) / 10;
        const depthScale = 1 - d.depth / (data.length * 2);
        return baseRadius * valueScale * depthScale;
      })
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', d => d.isEven ? '#4CAF50' : '#F44336')
      .attr('stroke-width', 2);

    // Add node labels for the first few and key points
    nodes.selectAll('text')
      .data(data.filter((d, i) => i === 0 || i === data.length - 1 || i % Math.max(1, Math.floor(data.length / 5)) === 0))
      .enter()
      .append('text')
      .attr('x', (d) => {
        const r = startRadius * Math.pow(radiusDecay, d.depth);
        const angle = startAngle + angleStep * d.depth;
        return r * Math.cos(angle);
      })
      .attr('y', (d) => {
        const r = startRadius * Math.pow(radiusDecay, d.depth);
        const angle = startAngle + angleStep * d.depth;
        return r * Math.sin(angle) - 10;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .attr('font-size', 10)
      .text(d => d.value);

    // Add tooltips
    nodes.selectAll('title')
      .data(data)
      .enter()
      .append('title')
      .text(d => `Value: ${d.value}\nStep: ${d.depth}\n${d.isEven ? 'Even' : 'Odd'}`);

    // Add some decorative elements
    // Orbit circles
    const orbits = g.append('g').attr('class', 'orbits');
    
    orbits.selectAll('circle')
      .data(d3.range(1, 6))
      .enter()
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => startRadius * Math.pow(radiusDecay, d * 5))
      .attr('fill', 'none')
      .attr('stroke', 'currentColor')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '3,3')
      .attr('opacity', 0.3);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 5])
      .on('zoom', (event) => {
        g.attr('transform', `translate(${event.transform.x + innerWidth / 2 * event.transform.k},${event.transform.y + innerHeight / 2 * event.transform.k}) scale(${event.transform.k})`);
      });

    svg.call(zoom);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', 16)
      .attr('font-weight', 'bold')
      .attr('fill', 'currentColor')
      .text('Collatz Fractal Spiral');

    // Add legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = innerWidth / 2 + margin.left / 2;
    const legendY = margin.top / 2;

    // Value legend
    const valueLegendG = svg.append('g')
      .attr('transform', `translate(${legendX},${legendY})`);

    const valueGradient = valueLegendG.append('defs')
      .append('linearGradient')
      .attr('id', 'fractal-value-gradient')
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
      .style('fill', 'url(#fractal-value-gradient)');

    valueLegendG.append('text')
      .attr('x', -5)
      .attr('y', legendHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', 'currentColor')
      .text('Value:');

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
        <h4 className="text-sm font-medium">Fractal Visualization</h4>
        <p className="text-xs text-muted-foreground">
          Visualizes the Collatz sequence as a spiral fractal pattern.
          Each point represents a number in the sequence, with color indicating value.
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