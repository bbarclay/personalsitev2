import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BubbleData {
  value: number;
  size: number;
  step: number;
  isEven: boolean;
}

interface BubbleVisualizerProps {
  data: BubbleData[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function BubbleVisualizer({
  data,
  width = 800,
  height = 600,
  colorScheme = 'viridis'
}: BubbleVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(data, d => d.value) || 1])
      .interpolator(d3[`interpolate${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}`]);

    // Create simulation
    const simulation = d3.forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => (d as BubbleData).size))
      .on('tick', ticked);

    // Create bubble groups
    const bubbles = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${width/2},${height/2})`);

    // Add circles to groups
    bubbles.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => colorScale(d.value))
      .attr('opacity', 0.7)
      .attr('stroke', d => d.isEven ? '#ffffff' : '#000000')
      .attr('stroke-width', 1);

    // Add value labels
    bubbles.append('text')
      .text(d => d.value)
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', '#ffffff')
      .attr('font-size', d => Math.min(2 * d.size, 24))
      .style('pointer-events', 'none');

    function ticked() {
      bubbles.attr('transform', d => {
        const x = (d as any).x;
        const y = (d as any).y;
        return `translate(${x},${y})`;
      });
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data, width, height, colorScheme]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/5 rounded-lg">
      <svg ref={svgRef} />
    </div>
  );
} 
