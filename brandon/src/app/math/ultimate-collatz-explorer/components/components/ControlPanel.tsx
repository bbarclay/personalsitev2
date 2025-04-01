import React, { useState, useEffect } from 'react';
import { useCollatzContext } from '../context/CollatzContext';

const ControlPanel: React.FC = () => {
  const { calculateStandardSequence, standardSequence } = useCollatzContext();
  const [inputNumber, setInputNumber] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  useEffect(() => {
    if (standardSequence) {
      setHasCalculated(true);
    }
  }, [standardSequence]);

  const handleCalculate = () => {
    const num = parseInt(inputNumber);
    if (!isNaN(num) && num > 0) {
      setIsCalculating(true);

      // Adding artificial delay to simulate calculation for larger numbers
      setTimeout(() => {
        calculateStandardSequence(num);
        setIsCalculating(false);
      }, Math.min(500, Math.log(num) * 100)); // Shorter delay for smaller numbers
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handlePresetClick = (value: number) => {
    setInputNumber(value.toString());

    // Auto-calculate after selecting a preset
    setIsCalculating(true);
    setTimeout(() => {
      calculateStandardSequence(value);
      setIsCalculating(false);
    }, Math.min(500, Math.log(value) * 100));
  };

  return (
    <div className="cosmic-panel cosmic-control-panel">
      <h2 className="cosmic-title">Ultimate Collatz Explorer</h2>

      <div className="cosmic-input-container">
        <input
          type="number"
          value={inputNumber}
          onChange={e => setInputNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a positive integer"
          className="cosmic-input"
          min="1"
          step="1"
          disabled={isCalculating}
        />
        <button
          onClick={handleCalculate}
          className={`cosmic-button ${isCalculating ? 'cosmic-calculating' : ''}`}
          disabled={!inputNumber || isNaN(parseInt(inputNumber)) || parseInt(inputNumber) <= 0 || isCalculating}
        >
          {isCalculating ? (
            <span className="cosmic-spinner"></span>
          ) : (
            'Calculate'
          )}
        </button>
      </div>

      <div className="cosmic-presets">
        <h3 className="cosmic-subtitle">Interesting Numbers</h3>
        <div className="cosmic-preset-grid">
          <button
            className={`cosmic-preset-number ${standardSequence?.startNumber === 27 ? 'active' : ''}`}
            onClick={() => handlePresetClick(27)}
          >
            27
            <span className="cosmic-preset-note">111 steps</span>
          </button>
          <button
            className={`cosmic-preset-number ${standardSequence?.startNumber === 97 ? 'active' : ''}`}
            onClick={() => handlePresetClick(97)}
          >
            97
            <span className="cosmic-preset-note">118 steps</span>
          </button>
          <button
            className={`cosmic-preset-number ${standardSequence?.startNumber === 703 ? 'active' : ''}`}
            onClick={() => handlePresetClick(703)}
          >
            703
            <span className="cosmic-preset-note">170 steps</span>
          </button>
          <button
            className={`cosmic-preset-number ${standardSequence?.startNumber === 9663 ? 'active' : ''}`}
            onClick={() => handlePresetClick(9663)}
          >
            9,663
            <span className="cosmic-preset-note">224 steps</span>
          </button>
          <button
            className={`cosmic-preset-number ${standardSequence?.startNumber === 63728127 ? 'active' : ''}`}
            onClick={() => handlePresetClick(63728127)}
          >
            63,728,127
            <span className="cosmic-preset-note">949 steps</span>
          </button>
          <button
            className={`cosmic-preset-number ${standardSequence?.startNumber === 670617279 ? 'active' : ''}`}
            onClick={() => handlePresetClick(670617279)}
          >
            670,617,279
            <span className="cosmic-preset-note">986 steps</span>
          </button>
        </div>
      </div>

      {hasCalculated && standardSequence && (
        <div className="cosmic-current-stats">
          <div className="cosmic-current-number">
            <span className="cosmic-stats-label">Current Number:</span>
            <span className="cosmic-stats-value">{standardSequence.startNumber.toLocaleString()}</span>
          </div>
          <div className="cosmic-stats-row">
            <div className="cosmic-stat-item">
              <span className="cosmic-stats-label">Steps:</span>
              <span className="cosmic-stats-value">{standardSequence.sequence.length}</span>
            </div>
            <div className="cosmic-stat-item">
              <span className="cosmic-stats-label">Max Value:</span>
              <span className="cosmic-stats-value">{Math.max(...standardSequence.sequence).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="cosmic-info">
        <h3 className="cosmic-subtitle">About the Collatz Conjecture</h3>
        <p>
          For any positive integer n, apply these rules repeatedly:
        </p>
        <ul>
          <li>If n is even, divide by 2</li>
          <li>If n is odd, multiply by 3 and add 1</li>
        </ul>
        <p>
          The conjecture states that no matter which positive integer you start with,
          the sequence will always reach 1.
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
