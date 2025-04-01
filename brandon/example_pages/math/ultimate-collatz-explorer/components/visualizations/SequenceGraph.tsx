import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useCollatzContext } from '../../context/CollatzContext';

const SequenceGraph: React.FC = () => {
  const { standardSequence, compareSequences } = useCollatzContext();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  // Set up resize observer to make the chart responsive
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Draw visualization when data or dimensions change
  useEffect(() => {
    if (!svgRef.current || !dimensions.width || !standardSequence) return;

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    // Create chart group with margins
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Determine data boundaries
    const allSequences = [standardSequence, ...compareSequences].filter(seq => seq?.sequence);
    if (allSequences.length === 0) return;

    const maxIndex = d3.max(allSequences, seq => seq.sequence.length) || 0;
    const maxValue = d3.max(allSequences, seq => d3.max(seq.sequence) || 0) || 0;

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, maxIndex - 1])
      .range([0, width]);

    const yScale = d3
      .scaleLog()  // Using log scale for better visualization of large values
      .domain([1, maxValue * 1.1])  // Start from 1 to avoid log(0)
      .range([height, 0])
      .nice();

    // Add X and Y axes
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(width > 500 ? 10 : 5))
      .call(g => g.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.2)'))
      .call(g => g.selectAll('.tick line').attr('stroke', 'rgba(255, 255, 255, 0.1)'))
      .call(g => g.selectAll('.tick text').attr('fill', 'rgba(255, 255, 255, 0.7)'));

    g.append('g')
      .attr('class', 'y-axis')
      .call(
        d3.axisLeft(yScale)
          .tickValues(createLogTickValues(1, maxValue))
          .tickFormat(d => {
            // Format y-axis labels to be more readable
            const value = +d;
            if (value >= 1000) return d3.format('.1s')(value);
            return value.toString();
          })
      )
      .call(g => g.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.2)'))
      .call(g => g.selectAll('.tick line').attr('stroke', 'rgba(255, 255, 255, 0.1)'))
      .call(g => g.selectAll('.tick text')
        .attr('fill', 'rgba(255, 255, 255, 0.7)')
        .attr('x', -10)  // Move labels slightly away from axis
        .style('text-anchor', 'end')  // Right-align labels
      );

    // Add X and Y axis labels
    g.append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.7)')
      .text('Steps');

    g.append('text')
      .attr('class', 'axis-label')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.7)')
      .text('Value');

    // Create line generator
    const line = d3
      .line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(Math.max(1, d)))  // Ensure we don't go below 1 for log scale
      .curve(d3.curveMonotoneX);  // Use monotone curve for smoother lines

    // Draw primary sequence
    if (standardSequence?.sequence) {
      // Draw area under the curve
      const area = d3
        .area<number>()
        .x((_, i) => xScale(i))
        .y0(height)
        .y1(d => yScale(Math.max(1, d)))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(standardSequence.sequence)
        .attr('class', 'sequence-area')
        .attr('fill', 'rgba(124, 77, 255, 0.1)')
        .attr('d', area);

      // Draw line
      g.append('path')
        .datum(standardSequence.sequence)
        .attr('class', 'sequence-line')
        .attr('fill', 'none')
        .attr('stroke', 'var(--primary-color)')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Draw dots for odd/even
      g.selectAll('.sequence-point')
        .data(standardSequence.sequence)
        .enter()
        .append('circle')
        .attr('class', 'sequence-point')
        .attr('cx', (_, i) => xScale(i))
        .attr('cy', d => yScale(Math.max(1, d)))
        .attr('r', 3)
        .attr('fill', d => d % 2 === 0 ? 'var(--secondary-color)' : 'var(--accent-color)')
        .on('mouseenter', (event, d) => {
          const i = standardSequence.sequence.indexOf(d);
          setTooltip({
            show: true,
            x: event.clientX,
            y: event.clientY,
            content: `Step ${i}: ${d.toLocaleString()}`
          });
        })
        .on('mouseleave', () => {
          setTooltip({ show: false, x: 0, y: 0, content: '' });
        });
    }

    // Draw comparison sequences
    compareSequences.forEach((seq, index) => {
      if (!seq.sequence) return;

      const colorIndex = index % 5;
      const colors = [
        'var(--secondary-color)',
        'var(--accent-color)',
        '#ffb300',
        '#64dd17',
        '#00b0ff'
      ];

      g.append('path')
        .datum(seq.sequence)
        .attr('class', `compare-line compare-${colorIndex}`)
        .attr('fill', 'none')
        .attr('stroke', colors[colorIndex])
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '4,2')
        .attr('d', line);
    });

    // Add sparklines for special patterns
    if (standardSequence?.sequence) {
      const peaks = findPeaks(standardSequence.sequence);

      // Mark peaks with annotations
      peaks.forEach(peakIndex => {
        const peakValue = standardSequence.sequence[peakIndex];

        g.append('circle')
          .attr('cx', xScale(peakIndex))
          .attr('cy', yScale(peakValue))
          .attr('r', 5)
          .attr('fill', 'rgba(255, 64, 129, 0.8)')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1);

        g.append('line')
          .attr('x1', xScale(peakIndex))
          .attr('y1', yScale(peakValue) - 7)
          .attr('x2', xScale(peakIndex))
          .attr('y2', yScale(peakValue) - 25)
          .attr('stroke', 'rgba(255, 64, 129, 0.6)')
          .attr('stroke-width', 1);

        g.append('text')
          .attr('x', xScale(peakIndex))
          .attr('y', yScale(peakValue) - 30)
          .attr('text-anchor', 'middle')
          .attr('fill', 'rgba(255, 255, 255, 0.9)')
          .attr('font-size', '10px')
          .text(peakValue.toLocaleString());
      });
    }

  }, [standardSequence, compareSequences, dimensions]);

  // Helper function to find peaks in the sequence
  const findPeaks = (sequence: number[]): number[] => {
    if (sequence.length < 3) return [];

    const peaks: number[] = [];
    for (let i = 1; i < sequence.length - 1; i++) {
      if (sequence[i] > sequence[i - 1] && sequence[i] > sequence[i + 1]) {
        // Only include significant peaks (at least 1.5x higher than neighboring points)
        if (sequence[i] > sequence[i - 1] * 1.5 && sequence[i] > sequence[i + 1] * 1.5) {
          peaks.push(i);
        }
      }
    }

    // Limit to 5 most significant peaks to avoid clutter
    return peaks
      .sort((a, b) => sequence[b] - sequence[a])
      .slice(0, 5);
  };

  // Helper function to create appropriate log scale tick values
  const createLogTickValues = (min: number, max: number): number[] => {
    const ticks: number[] = [];

    // Start with powers of 10
    let power = Math.floor(Math.log10(min));
    const maxPower = Math.ceil(Math.log10(max));

    while (power <= maxPower) {
      const base = Math.pow(10, power);

      // For smaller ranges, add intermediate values
      if (max <= 1000) {
        for (let i = 1; i <= 9; i++) {
          const value = i * base;
          if (value >= min && value <= max) {
            ticks.push(value);
          }
        }
      } else if (max <= 10000) {
        // For medium ranges, use 1, 2, 5 pattern
        [1, 2, 5].forEach(i => {
          const value = i * base;
          if (value >= min && value <= max) {
            ticks.push(value);
          }
        });
      } else {
        // For large ranges, just use powers of 10
        if (base >= min && base <= max) {
          ticks.push(base);
        }
      }

      power++;
    }

    // Limit to a reasonable number of ticks
    if (ticks.length > 12) {
      const filtered: number[] = [];
      const step = Math.ceil(ticks.length / 12);
      for (let i = 0; i < ticks.length; i += step) {
        filtered.push(ticks[i]);
      }
      return filtered;
    }

    return ticks;
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!standardSequence && (
        <div className="cosmic-empty-state">
          Calculate a sequence to visualize
        </div>
      )}

      {standardSequence && (
        <>
          <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />

          {tooltip.show && (
            <div
              className="cosmic-tooltip"
              style={{
                position: 'fixed',
                left: tooltip.x + 10,
                top: tooltip.y - 25,
                background: 'rgba(20, 20, 20, 0.9)',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                pointerEvents: 'none',
                zIndex: 1000,
                color: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {tooltip.content}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SequenceGraph;
