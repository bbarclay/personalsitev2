import React, { useState, useEffect } from 'react';
import { useCollatzContext } from '../../context/CollatzContext';

interface HeatMapDataItem {
  value: number;
  frequency: number;
}

const GridView: React.FC = () => {
  const { standardSequence } = useCollatzContext();
  const [heatmapData, setHeatmapData] = useState<HeatMapDataItem[]>([]);
  const [sortBy, setSortBy] = useState<'value' | 'frequency'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

    // Sort data based on current sort settings
    sortData(data, sortBy, sortOrder);

    setHeatmapData(data);
  }, [standardSequence, sortBy, sortOrder]);

  const sortData = (data: HeatMapDataItem[], by: 'value' | 'frequency', order: 'asc' | 'desc') => {
    data.sort((a, b) => {
      const comparison = by === 'value'
        ? a.value - b.value
        : a.frequency - b.frequency;

      return order === 'asc' ? comparison : -comparison;
    });
  };

  const handleSort = (by: 'value' | 'frequency') => {
    if (sortBy === by) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(by);
      setSortOrder('asc');
    }
  };

  if (!standardSequence?.sequence) {
    return (
      <div className="cosmic-viz-container">
        <div className="cosmic-viz-header">
          <h3 className="cosmic-viz-title">Value Frequency Grid View</h3>
        </div>
        <div className="cosmic-chart-area">
          <div className="cosmic-placeholder">
            <div className="cosmic-placeholder-icon">🌡️</div>
            <div className="cosmic-placeholder-text">Calculate a sequence to view frequency patterns</div>
            <div className="cosmic-placeholder-desc">This visualization shows how often each value appears in the sequence</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cosmic-viz-container">
      <div className="cosmic-viz-header">
        <h3 className="cosmic-viz-title">Value Frequency Grid View</h3>
        <div className="cosmic-viz-subtitle">
          Displaying frequency of each value in the sequence
        </div>
      </div>

      <div className="cosmic-viz-controls-horizontal" style={{ padding: '8px 15px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="cosmic-control-group">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sort by:</span>
            <button
            className={`cosmic-control-button-small ${sortBy === 'value' ? 'active' : ''}`}
            onClick={() => handleSort('value')}
            >
            Value {sortBy === 'value' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          <button
            className={`cosmic-control-button-small ${sortBy === 'frequency' ? 'active' : ''}`}
            onClick={() => handleSort('frequency')}
          >
            Frequency {sortBy === 'frequency' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="cosmic-chart-area" style={{ overflowY: 'auto', padding: '15px' }}>
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

export default GridView;
