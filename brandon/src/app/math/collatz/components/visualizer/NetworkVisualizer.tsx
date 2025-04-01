import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface NetworkNode {
  id: string;
  value: number;
  connections: string[];
  isEven: boolean;
}

interface NetworkVisualizerProps {
  data: NetworkNode[];
  width?: number;
  height?: number;
  colorScheme?: 'viridis' | 'plasma' | 'inferno' | 'magma';
}

export function NetworkVisualizer({
  data,
  width = 800,
  height = 600,
  colorScheme = 'viridis'
}: NetworkVisualizerProps) {
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

    // Create a size scale for nodes
    const sizeScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 100])
      .range([5, 20]);

    // Prepare links data
    const links = data.flatMap(node => 
      node.connections.map(targetId => ({
        source: node.id,
        target: targetId
      }))
    );

    // Create force simulation
    const simulation = d3.forceSimulation(data)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(innerWidth / 2, innerHeight / 2))
      .force('collision', d3.forceCollide().radius((d: any) => sizeScale(d.value) + 5));

    // Create links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Create node groups
    const nodeGroup = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Add circles for nodes
    nodeGroup.append('circle')
      .attr('r', d => sizeScale(d.value))
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', d => d.isEven ? '#4CAF50' : '#F44336')
      .attr('stroke-width', 2);

    // Add labels
    nodeGroup.append('text')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', d => Math.min(sizeScale(d.value), 14))
      .text(d => d.value);

    // Add tooltips
    nodeGroup.append('title')
      .text(d => `Value: ${d.value}\nStep: ${d.id}\n${d.isEven ? 'Even' : 'Odd'}`);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeGroup.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

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
      .attr('id', 'network-value-gradient')
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
      .style('fill', 'url(#network-value-gradient)');

    valueLegendG.append('text')
      .attr('x', -10)
      .attr('y', legendHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', 'currentColor')
      .text('Value:');

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
      .attr('y', 14)
      .attr('dominant-baseline', 'middle')
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
      .attr('y', 34)
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'currentColor')
      .text('Odd');

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data, width, height, colorScheme]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Network Visualization</h4>
        <p className="text-xs text-muted-foreground">Drag nodes to rearrange. Hover for details.</p>
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