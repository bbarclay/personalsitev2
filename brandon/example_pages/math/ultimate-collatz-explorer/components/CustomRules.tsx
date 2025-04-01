import React, { useState, useEffect } from 'react';
import { useCollatzContext } from '../context/CollatzContext';

const CustomRules: React.FC = () => {
  const { customRules, updateCustomRules, calculateCustomSequence, customSequence } = useCollatzContext();

  const [evenMultiplier, setEvenMultiplier] = useState<string>(customRules.evenMultiplier.toString());
  const [evenAdditive, setEvenAdditive] = useState<string>(customRules.evenAdditive.toString());
  const [oddMultiplier, setOddMultiplier] = useState<string>(customRules.oddMultiplier.toString());
  const [oddAdditive, setOddAdditive] = useState<string>(customRules.oddAdditive.toString());
  const [customStartingNumber, setCustomStartingNumber] = useState<string>('27');
  const [rulePreset, setRulePreset] = useState<string>('standard');
  const [calculating, setCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEvenMultiplier(customRules.evenMultiplier.toString());
    setEvenAdditive(customRules.evenAdditive.toString());
    setOddMultiplier(customRules.oddMultiplier.toString());
    setOddAdditive(customRules.oddAdditive.toString());
  }, [customRules]);

  const handleApplyRules = () => {
    setError(null);

    try {
      // Validate inputs
      const evenMultValue = parseFloat(evenMultiplier);
      const evenAddValue = parseFloat(evenAdditive);
      const oddMultValue = parseFloat(oddMultiplier);
      const oddAddValue = parseFloat(oddAdditive);

      if (isNaN(evenMultValue) || isNaN(evenAddValue) || isNaN(oddMultValue) || isNaN(oddAddValue)) {
        setError("Please enter valid numbers for all fields");
        return;
      }

      const startNum = parseInt(customStartingNumber);
      if (isNaN(startNum) || startNum <= 0) {
        setError("Please enter a positive integer for the starting number");
        return;
      }

      // Update rules
    const rules = {
        evenMultiplier: evenMultValue,
        evenAdditive: evenAddValue,
        oddMultiplier: oddMultValue,
        oddAdditive: oddAddValue
    };

      setCalculating(true);

      // Apply the rules after a short delay to allow UI to update
      setTimeout(() => {
    updateCustomRules(rules);
      calculateCustomSequence(startNum);
        setCalculating(false);
      }, 100);
    } catch (err) {
      setError("An error occurred while applying rules");
      setCalculating(false);
    }
  };

  const applyPreset = (preset: string) => {
    setRulePreset(preset);
    setError(null);

    switch(preset) {
      case 'standard':
        setEvenMultiplier('0.5');
        setEvenAdditive('0');
        setOddMultiplier('3');
        setOddAdditive('1');
        break;
      case 'reverse':
        setEvenMultiplier('2');
        setEvenAdditive('0');
        setOddMultiplier('0.33333');
        setOddAdditive('-0.33333');
        break;
      case 'fibonacci':
        setEvenMultiplier('0.5');
        setEvenAdditive('1');
        setOddMultiplier('1.5');
        setOddAdditive('0.5');
        break;
      case 'quadratic':
        setEvenMultiplier('0.25');
        setEvenAdditive('0');
        setOddMultiplier('2');
        setOddAdditive('1');
        break;
      case 'experimental':
        setEvenMultiplier('0.75');
        setEvenAdditive('-1');
        setOddMultiplier('2');
        setOddAdditive('3');
        break;
    }
  };

  return (
    <div className="cosmic-panel cosmic-custom-rules">
      <h3 className="cosmic-subtitle">Custom Collatz Rules</h3>

      {error && (
        <div style={{
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          padding: '8px 12px',
          borderRadius: 'var(--border-radius)',
          marginBottom: '12px',
          color: '#ff6b6b'
        }}>
          {error}
        </div>
      )}

      <div className="cosmic-presets" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <span>Presets:</span>
        <div className="cosmic-preset-buttons" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <button
            className={`cosmic-preset-button ${rulePreset === 'standard' ? 'active' : ''}`}
            onClick={() => applyPreset('standard')}
            style={{
              backgroundColor: rulePreset === 'standard' ? 'var(--primary-color)' : 'var(--elevated-dark)',
              color: rulePreset === 'standard' ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${rulePreset === 'standard' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              borderRadius: 'var(--border-radius)',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'var(--transition-standard)',
              flex: '1',
              minWidth: '80px'
            }}
          >
            Standard
          </button>
          <button
            className={`cosmic-preset-button ${rulePreset === 'reverse' ? 'active' : ''}`}
            onClick={() => applyPreset('reverse')}
            style={{
              backgroundColor: rulePreset === 'reverse' ? 'var(--primary-color)' : 'var(--elevated-dark)',
              color: rulePreset === 'reverse' ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${rulePreset === 'reverse' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              borderRadius: 'var(--border-radius)',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'var(--transition-standard)',
              flex: '1',
              minWidth: '80px'
            }}
          >
            Reverse
          </button>
          <button
            className={`cosmic-preset-button ${rulePreset === 'fibonacci' ? 'active' : ''}`}
            onClick={() => applyPreset('fibonacci')}
            style={{
              backgroundColor: rulePreset === 'fibonacci' ? 'var(--primary-color)' : 'var(--elevated-dark)',
              color: rulePreset === 'fibonacci' ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${rulePreset === 'fibonacci' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              borderRadius: 'var(--border-radius)',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'var(--transition-standard)',
              flex: '1',
              minWidth: '80px'
            }}
          >
            Fibonacci
          </button>
          <button
            className={`cosmic-preset-button ${rulePreset === 'quadratic' ? 'active' : ''}`}
            onClick={() => applyPreset('quadratic')}
            style={{
              backgroundColor: rulePreset === 'quadratic' ? 'var(--primary-color)' : 'var(--elevated-dark)',
              color: rulePreset === 'quadratic' ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${rulePreset === 'quadratic' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              borderRadius: 'var(--border-radius)',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'var(--transition-standard)',
              flex: '1',
              minWidth: '80px'
            }}
          >
            Quadratic
          </button>
          <button
            className={`cosmic-preset-button ${rulePreset === 'experimental' ? 'active' : ''}`}
            onClick={() => applyPreset('experimental')}
            style={{
              backgroundColor: rulePreset === 'experimental' ? 'var(--primary-color)' : 'var(--elevated-dark)',
              color: rulePreset === 'experimental' ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${rulePreset === 'experimental' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
              borderRadius: 'var(--border-radius)',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'var(--transition-standard)',
              flex: '1',
              minWidth: '80px'
            }}
          >
            Experimental
          </button>
        </div>
      </div>

      <div className="cosmic-rule-form">
        <div className="cosmic-rule-section">
          <h4>Even Numbers (n):</h4>
          <div className="cosmic-rule-formula">
            <span className="cosmic-formula-text">n →</span>
            <input
              type="number"
              value={evenMultiplier}
              onChange={(e) => setEvenMultiplier(e.target.value)}
              className="cosmic-input cosmic-small-input"
              step="0.1"
            />
            <span className="cosmic-formula-text">× n</span>
            <span className="cosmic-formula-text">+</span>
            <input
              type="number"
              value={evenAdditive}
              onChange={(e) => setEvenAdditive(e.target.value)}
              className="cosmic-input cosmic-small-input"
              step="1"
            />
          </div>
        </div>

        <div className="cosmic-rule-section">
          <h4>Odd Numbers (n):</h4>
          <div className="cosmic-rule-formula">
            <span className="cosmic-formula-text">n →</span>
            <input
              type="number"
              value={oddMultiplier}
              onChange={(e) => setOddMultiplier(e.target.value)}
              className="cosmic-input cosmic-small-input"
              step="0.1"
            />
            <span className="cosmic-formula-text">× n</span>
            <span className="cosmic-formula-text">+</span>
            <input
              type="number"
              value={oddAdditive}
              onChange={(e) => setOddAdditive(e.target.value)}
              className="cosmic-input cosmic-small-input"
              step="1"
            />
          </div>
        </div>

        <div className="cosmic-rule-section">
          <h4>Starting Number:</h4>
          <input
            type="number"
            value={customStartingNumber}
            onChange={(e) => setCustomStartingNumber(e.target.value)}
            className="cosmic-input"
            min="1"
            step="1"
          />
        </div>

        <button
          onClick={handleApplyRules}
          className={`cosmic-button cosmic-full-width ${calculating ? 'cosmic-calculating' : ''}`}
          disabled={calculating}
        >
          {calculating ? "Calculating..." : "Calculate with Custom Rules"}
        </button>

        {customSequence && (
          <div style={{
            marginTop: '12px',
            backgroundColor: 'rgba(3, 218, 198, 0.1)',
            border: '1px solid rgba(3, 218, 198, 0.3)',
            padding: '8px 12px',
            borderRadius: 'var(--border-radius)',
            color: 'var(--secondary-color)'
          }}>
            Custom sequence calculated for {customSequence.startNumber} with length: {customSequence.sequence.length}
          </div>
        )}
      </div>

      <div className="cosmic-rules-info">
        <h4>About Custom Rules</h4>
        <p>
          Modify the standard Collatz conjecture by changing how even and odd numbers transform.
          The standard rules are: even numbers → n/2, odd numbers → 3n+1.
        </p>
        <p>
          Experiment with different rules to discover new patterns and behaviors!
        </p>
      </div>
    </div>
  );
};

export default CustomRules;
