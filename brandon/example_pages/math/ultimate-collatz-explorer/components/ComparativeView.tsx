import React from 'react';
import { useCollatzContext } from '../context/CollatzContext';

const ComparativeView: React.FC = () => {
  const { standardSequence, compareSequences, addCompareSequence, removeCompareSequence } = useCollatzContext();
  const [compareNumber, setCompareNumber] = React.useState<string>('');

  const handleAddCompare = () => {
    const num = parseInt(compareNumber);
    if (!isNaN(num) && num > 0) {
      addCompareSequence(num);
      setCompareNumber('');
    }
  };

  return (
    <div className="cosmic-panel cosmic-comparative">
      <h3 className="cosmic-subtitle">Compare Sequences</h3>

      <div className="cosmic-compare-form">
        <input
          type="number"
          value={compareNumber}
          onChange={(e) => setCompareNumber(e.target.value)}
          placeholder="Enter number to compare"
          className="cosmic-input"
          min="1"
        />
        <button
          onClick={handleAddCompare}
          className="cosmic-button"
          disabled={!compareNumber || isNaN(parseInt(compareNumber)) || parseInt(compareNumber) <= 0}
        >
          Add
        </button>
      </div>

      {compareSequences.length === 0 && (
        <div className="cosmic-empty-state">
          Add numbers to compare with the current sequence
        </div>
      )}

      {compareSequences.length > 0 && (
        <div className="cosmic-compare-list">
          <div className="cosmic-compare-item cosmic-current">
            <div className="cosmic-compare-color primary"></div>
            <div className="cosmic-compare-number">{standardSequence?.startNumber || '?'}</div>
            <div className="cosmic-compare-steps">{standardSequence?.sequence?.length || 0} steps</div>
            <div className="cosmic-compare-max">
              Max: {standardSequence?.sequence
                ? Math.max(...standardSequence.sequence).toLocaleString()
                : '0'}
            </div>
            <div className="cosmic-compare-actions">
              <span className="cosmic-current-label">Current</span>
            </div>
          </div>

          {compareSequences.map((seq, idx) => (
            <div className="cosmic-compare-item" key={idx}>
              <div className={`cosmic-compare-color compare-${idx % 5}`}></div>
              <div className="cosmic-compare-number">{seq.startNumber}</div>
              <div className="cosmic-compare-steps">{seq.sequence?.length || 0} steps</div>
              <div className="cosmic-compare-max">
                Max: {seq.sequence
                  ? Math.max(...seq.sequence).toLocaleString()
                  : '0'}
              </div>
              <div className="cosmic-compare-actions">
                <button
                  onClick={() => removeCompareSequence(seq.startNumber)}
                  className="cosmic-button cosmic-button-small"
                  aria-label="Remove comparison"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {compareSequences.length > 0 && (
        <div className="cosmic-compare-insights">
          <h4>Observations</h4>
          <ul className="cosmic-insights-list">
            <li>
              Starting numbers that are powers of 2 (2, 4, 8, 16...) resolve in fewer steps
            </li>
            <li>
              Odd starting numbers typically produce longer sequences
            </li>
            <li>
              Sequences with similar starting numbers can diverge significantly
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComparativeView;
