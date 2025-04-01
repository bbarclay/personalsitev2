import React, { useState } from 'react';
import { useCollatzContext } from '../context/CollatzContext';

const AnalysisPanel: React.FC = () => {
  const { standardSequence, compareSequences } = useCollatzContext();
  const [isSequenceExpanded, setIsSequenceExpanded] = useState(false);

  // Calculate metrics
  const calculateStoppingTime = () => {
    if (!standardSequence?.sequence || standardSequence.sequence.length === 0) return 0;

    const startNumber = standardSequence.startNumber;
    // Find first index where value drops below starting number
    for (let i = 1; i < standardSequence.sequence.length; i++) {
      if (standardSequence.sequence[i] < startNumber) {
        return i;
      }
    }
    return 0; // Default if no stopping time found
  };

  // Placeholder data for metrics
  const metrics = {
    totalSteps: standardSequence?.sequence ? standardSequence.sequence.length - 1 : 0,
    peakValue: standardSequence?.sequence ? Math.max(...standardSequence.sequence) : 0,
    stopTime: calculateStoppingTime(),
    totalEven: standardSequence?.sequence ?
      standardSequence.sequence.filter(n => n % 2 === 0).length : 0,
    totalOdd: standardSequence?.sequence ?
      standardSequence.sequence.filter(n => n % 2 !== 0).length : 0,
    averageStep: standardSequence?.sequence && standardSequence.sequence.length > 0 ?
      standardSequence.sequence.reduce((a, b) => a + b, 0) / standardSequence.sequence.length : 0,
  };

  // Show full numbers without any formatting
  const formatNumber = (num: number): string => {
    return num.toString();
  };

  const toggleSequenceExpanded = () => {
    setIsSequenceExpanded(!isSequenceExpanded);
  };

  // Render metrics
  const renderMetrics = () => {
    return (
      <div className="cosmic-metrics-grid">
        <div className="cosmic-metric">
          <div className="cosmic-metric-value">{metrics.totalSteps}</div>
          <div className="cosmic-metric-label">Total Steps</div>
        </div>
        <div className="cosmic-metric">
          <div className="cosmic-metric-value">{metrics.peakValue.toLocaleString()}</div>
          <div className="cosmic-metric-label">Peak Value</div>
        </div>
        <div className="cosmic-metric cosmic-tooltip-container">
          <div className="cosmic-metric-value">{metrics.stopTime}</div>
          <div className="cosmic-metric-label">
            Stopping Time
            <span className="cosmic-info-icon" title="The number of steps required for the sequence to first reach a value below the starting number">ⓘ</span>
          </div>
        </div>
        <div className="cosmic-metric">
          <div className="cosmic-metric-value">{metrics.totalEven}</div>
          <div className="cosmic-metric-label">Even Numbers</div>
        </div>
        <div className="cosmic-metric">
          <div className="cosmic-metric-value">{metrics.totalOdd}</div>
          <div className="cosmic-metric-label">Odd Numbers</div>
        </div>
        <div className="cosmic-metric">
          <div className="cosmic-metric-value">{Math.round(metrics.averageStep).toLocaleString()}</div>
          <div className="cosmic-metric-label">Average Value</div>
        </div>
      </div>
    );
  };

  return (
    <div className="cosmic-panel cosmic-analysis">
      <h3 className="cosmic-subtitle">Sequence Analysis</h3>

      {!standardSequence?.sequence && (
        <div className="cosmic-empty-state">Enter a starting number to see analysis</div>
      )}

      {standardSequence?.sequence && (
        <>
          {renderMetrics()}

          <div className="cosmic-sequence-path">
            <div className="cosmic-sequence-header">
              <h4>Sequence Path</h4>
              <button
                className="cosmic-button cosmic-button-small"
                onClick={toggleSequenceExpanded}
              >
                {isSequenceExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div
              className={`cosmic-path-container ${isSequenceExpanded ? 'cosmic-path-expanded' : ''}`}
              style={{
                maxHeight: isSequenceExpanded ? 'none' : '80px',
                overflow: isSequenceExpanded ? 'visible' : 'auto'
              }}
            >
              {standardSequence.sequence.map((num, idx) => (
                <span key={idx} className={num % 2 === 0 ? 'cosmic-even' : 'cosmic-odd'}>
                  {formatNumber(num)}{idx < standardSequence.sequence.length - 1 ? ' → ' : ''}
                </span>
              ))}
            </div>
          </div>

          {compareSequences.length > 0 && (
            <div className="cosmic-comparison-stats">
              <h4>Comparative Analysis</h4>
              <table className="cosmic-stats-table">
                <thead>
                  <tr>
                    <th>Starting Number</th>
                    <th>Steps</th>
                    <th>Peak Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{standardSequence.startNumber}</td>
                    <td>{metrics.totalSteps}</td>
                    <td>{formatNumber(metrics.peakValue)}</td>
                  </tr>
                  {compareSequences.map((seq, idx) => (
                    <tr key={idx}>
                      <td>{seq.startNumber}</td>
                      <td>{seq.sequence?.length || 0}</td>
                      <td>{seq.sequence ? formatNumber(Math.max(...seq.sequence)) : 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalysisPanel;
