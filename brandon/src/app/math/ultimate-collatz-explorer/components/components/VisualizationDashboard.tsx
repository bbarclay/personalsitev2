import React, { useState, useEffect } from 'react';
import { useCollatzContext } from '../context/CollatzContext';
import SequenceGraph from './visualizations/SequenceGraph';
import OrbitalView from './visualizations/OrbitalView';
import StopTimeGraph from './visualizations/StopTimeGraph';
import PatternView from './visualizations/PatternView';
import GridView from './visualizations/GridView';

interface HeatMapProps {
  data?: { value: number; frequency: number }[];
}

// Actual Heatmap visualization
const HeatMap = ({ data }: HeatMapProps) => {
  const { standardSequence } = useCollatzContext();
  const [heatmapData, setHeatmapData] = useState<{value: number; frequency: number}[]>([]);

  // Generate heatmap data when sequence changes
  useEffect(() => {
    if (!standardSequence?.sequence) {
      setHeatmapData([]);
      return;
    }

    // Count frequency of each value in the sequence
    const frequencyMap: Record<number, number> = {};
    standardSequence.sequence.forEach(value => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    // Convert to array of objects for visualization
    const data = Object.entries(frequencyMap).map(([value, frequency]) => ({
      value: parseInt(value),
      frequency
    }));

    // Sort by value for better visualization
    data.sort((a, b) => a.value - b.value);

    setHeatmapData(data);
  }, [standardSequence]);

  if (!standardSequence?.sequence) {
    return (
      <div className="cosmic-viz-container">
        <div className="cosmic-viz-header">
          <h3 className="cosmic-viz-title">Value Frequency Heatmap</h3>
        </div>
        <div className="cosmic-chart-area">
          <div className="cosmic-empty-state">
            <div className="cosmic-placeholder-icon">🌡️</div>
            <p>Calculate a sequence to view frequency patterns</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cosmic-viz-container">
      <div className="cosmic-viz-header">
        <h3 className="cosmic-viz-title">Value Frequency Heatmap</h3>
        <div className="cosmic-viz-subtitle">
          Displaying frequency of each value in the sequence
        </div>
      </div>
      <div className="cosmic-chart-area">
        <div className="cosmic-heatmap-grid">
          {heatmapData.map(item => {
            // Calculate opacity based on frequency (logarithmic scale for better visualization)
            const maxFreq = Math.max(...heatmapData.map(d => d.frequency));
            const opacity = Math.max(0.2, Math.log(item.frequency) / Math.log(maxFreq));

            // Determine color based on value parity
            const baseColor = item.value % 2 === 0
              ? 'var(--cosmic-even-color)'
              : 'var(--cosmic-odd-color)';

            return (
              <div
                key={item.value}
                className="cosmic-heatmap-cell"
                style={{
                  backgroundColor: baseColor,
                  opacity: opacity,
                }}
                title={`Value: ${item.value}\nFrequency: ${item.frequency} times`}
              >
                <div className="cosmic-heatmap-cell-value">{item.value}</div>
                <div className="cosmic-heatmap-cell-freq">{item.frequency}x</div>
              </div>
            );
          })}
        </div>

        <div className="cosmic-heatmap-legend">
          <div className="cosmic-legend-item">
            <div className="cosmic-legend-color even"></div>
            <span>Even numbers</span>
          </div>
          <div className="cosmic-legend-item">
            <div className="cosmic-legend-color odd"></div>
            <span>Odd numbers</span>
          </div>
          <div className="cosmic-legend-scale">
            <div className="cosmic-scale-label">Lower frequency</div>
            <div className="cosmic-scale-gradient"></div>
            <div className="cosmic-scale-label">Higher frequency</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons for visualization types
const icons = {
  sequence: '📈',
  orbital: '🌌',
  stopTime: '⏱️',
  heatMap: '🔥',
  pattern: '🔄'
};

type VisualizationType = 'sequence' | 'orbital' | 'stopTime' | 'heatMap' | 'pattern';

const VisualizationDashboard: React.FC = () => {
  const { standardSequence, compareSequences, customSequence } = useCollatzContext();
  const [activeViz, setActiveViz] = useState<VisualizationType>('sequence');
  const [stopTimeData, setStopTimeData] = useState<Array<{start: number; steps: number; maxValue: number}> | null>(null);
  const [dataRange, setDataRange] = useState<number>(20);

  // Generate stop time data for numbers around the current number
  useEffect(() => {
    if (!standardSequence?.startNumber) {
      setStopTimeData(null);
      return;
    }

    const startNumber = standardSequence.startNumber;
    // Generate data for numbers before and after the current number
    const range = dataRange;
    const start = Math.max(1, startNumber - range);
    const end = startNumber + range;

    // Show calculating state while generating data
    setStopTimeData(null);

    // Use requestAnimationFrame to avoid blocking the UI
    requestAnimationFrame(() => {
      const data = [];

      for (let i = start; i <= end; i++) {
        // Calculate sequence for each number
        let current = i;
        let sequence = [current];
        let steps = 0;
        let stoppingTime = null;

        while (current !== 1 && steps < 1000) { // Limit to prevent infinite loops
          current = current % 2 === 0 ? current / 2 : 3 * current + 1;
          sequence.push(current);
          steps++;

          // Check for stopping time (first time sequence goes below starting number)
          if (stoppingTime === null && current < i) {
            stoppingTime = steps;
          }
        }

        data.push({
          start: i,
          steps: stoppingTime !== null ? stoppingTime : steps,
          maxValue: Math.max(...sequence)
        });
      }

      setStopTimeData(data);
    });
  }, [standardSequence?.startNumber, dataRange]);

  // Handle range multiplier changes from StopTimeGraph
  const handleRangeChange = (multiplier: number) => {
    setDataRange(20 * multiplier);
  };

  // Define visualization options
  const visualizationOptions: Array<{id: VisualizationType; label: string; description: string}> = [
    {
      id: 'sequence',
      label: 'Sequence Path',
      description: 'Visualize the Collatz sequence path as a line graph'
    },
    {
      id: 'orbital',
      label: 'Orbital View',
      description: 'See the sequence as an orbital pattern'
    },
    {
      id: 'stopTime',
      label: 'Stop Time',
      description: 'Analyze stopping times for various starting numbers'
    },
    {
      id: 'heatMap',
      label: 'Heatmap',
      description: 'Value frequency visualization'
    },
    {
      id: 'pattern',
      label: 'Pattern View',
      description: 'Discover patterns in the sequence'
    }
  ];

  return (
    <div className="cosmic-visualization-container">
      {/* New top visualization selector with smaller boxes */}
      <div className="cosmic-viz-controls-horizontal" style={{ padding: '10px 15px', background: 'var(--elevated-dark)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {visualizationOptions.map(option => (
          <button
            key={option.id}
            className={`cosmic-control-button-small ${activeViz === option.id ? 'active' : ''}`}
            onClick={() => setActiveViz(option.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              padding: '10px 15px',
              backgroundColor: activeViz === option.id ? 'var(--primary-color)' : 'var(--elevated-dark)',
              color: activeViz === option.id ? 'white' : 'var(--text-secondary)',
              borderRadius: 'var(--border-radius)',
              border: `1px solid ${activeViz === option.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              transition: 'var(--transition-standard)',
              flex: '1',
              maxWidth: '120px',
              minWidth: '80px'
            }}
            title={option.description}
          >
            <span style={{ fontSize: '1.2rem' }}>{icons[option.id]}</span>
            <span style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{option.label}</span>
          </button>
        ))}
      </div>

      <div className="cosmic-viz-content">
        {activeViz === 'sequence' && <SequenceGraph />}
        {activeViz === 'orbital' && <OrbitalView />}
        {activeViz === 'stopTime' && (
          <StopTimeGraph
            data={stopTimeData}
            currentNumber={standardSequence?.startNumber || 0}
            onRangeChange={handleRangeChange}
          />
        )}
        {activeViz === 'heatMap' && <GridView />}
        {activeViz === 'pattern' && <PatternView />}
      </div>

      <div className="cosmic-viz-legend">
        <div className="cosmic-legend-item">
          <div className="cosmic-legend-color primary"></div>
          <span>Current Sequence</span>
        </div>
        {compareSequences.length > 0 && compareSequences.map((seq, index) => (
          <div key={index} className="cosmic-legend-item">
            <div className={`cosmic-legend-color compare-${index % 5}`}></div>
            <span>Compare: {seq.startNumber}</span>
          </div>
        ))}
        {customSequence && (
          <div className="cosmic-legend-item">
            <div className="cosmic-legend-color" style={{ backgroundColor: 'var(--accent-color)' }}></div>
            <span>Custom Rule: {customSequence.startNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationDashboard;
