import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface TreeNode {
  value: number;
  children: TreeNode[];
  depth: number;
  isEven: boolean;
}

interface TreeVisualizerProps {
  data: TreeNode;
  width?: number;
  height?: number;
  maxDepth?: number;
}

export function TreeVisualizer({
  data,
  width = 800,
  height = 600,
  maxDepth = 5
}: TreeVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create tree layout
    const treeLayout = d3.tree<TreeNode>()
      .size([innerHeight, innerWidth])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2));

    // Create root node
    const root = d3.hierarchy(data);
    const treeData = treeLayout(root);

    // Create scales for node positioning
    const xScale = d3.scaleLinear()
      .domain([0, innerWidth])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, innerHeight])
      .range([0, innerHeight]);

    // Create color scales
    const valueColorScale = d3.scaleSequential()
      .domain([1, d3.max(treeData.descendants(), d => d.data.value) || 100])
      .interpolator(d3.interpolateViridis);

    const depthColorScale = d3.scaleSequential()
      .domain([0, maxDepth])
      .interpolator(d3.interpolateBlues);

    // Draw links
    g.selectAll('path.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => xScale(d.y))
        .y(d => yScale(d.x)))
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

    // Create node groups
    const nodeGroups = g.selectAll('g.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${xScale(d.y)},${yScale(d.x)})`);

    // Add circles for nodes
    nodeGroups.append('circle')
      .attr('r', 6)
      .attr('fill', d => valueColorScale(d.data.value))
      .attr('stroke', d => depthColorScale(d.depth))
      .attr('stroke-width', 2);

    // Add labels
    nodeGroups.append('text')
      .attr('dy', 4)
      .attr('x', d => d.children ? -8 : 8)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .attr('fill', 'currentColor')
      .text(d => d.data.value);

    // Add tooltips
    nodeGroups.append('title')
      .text(d => `Value: ${d.data.value}\nDepth: ${d.depth}\n${d.data.isEven ? 'Even' : 'Odd'}`);

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
    const legendX = innerWidth - legendWidth - 10;
    const legendY = -30;

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
      .attr('stop-color', d => valueColorScale(d * 100));

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

    // Depth legend
    const depthLegendG = g.append('g')
      .attr('transform', `translate(${legendX},${legendY + 30})`);

    const depthGradient = depthLegendG.append('defs')
      .append('linearGradient')
      .attr('id', 'depth-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    depthGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => depthColorScale(d * maxDepth));

    depthLegendG.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#depth-gradient)');

    depthLegendG.append('text')
      .attr('x', -10)
      .attr('y', legendHeight / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'currentColor')
      .text('Tree Depth');

  }, [data, width, height, maxDepth]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Sequence Tree</h4>
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