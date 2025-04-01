import React from 'react';

interface ViewControlsProps {
  activePanels: {
    analysis: boolean;
    theorems: boolean;
    comparison: boolean;
    customRules: boolean;
    share: boolean;
  };
  togglePanel: (panel: string) => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({ activePanels, togglePanel }) => {
  return (
    <div className="cosmic-controls-grid">
      <button
        className={`cosmic-control-button ${activePanels.analysis ? 'active' : ''}`}
        onClick={() => togglePanel('analysis')}
      >
        <div className="cosmic-control-icon">📊</div>
        <div className="cosmic-control-label">Analysis</div>
      </button>

      <button
        className={`cosmic-control-button ${activePanels.theorems ? 'active' : ''}`}
        onClick={() => togglePanel('theorems')}
      >
        <div className="cosmic-control-icon">🧮</div>
        <div className="cosmic-control-label">Theorems</div>
      </button>

      <button
        className={`cosmic-control-button ${activePanels.comparison ? 'active' : ''}`}
        onClick={() => togglePanel('comparison')}
      >
        <div className="cosmic-control-icon">⚖️</div>
        <div className="cosmic-control-label">Compare</div>
      </button>

      <button
        className={`cosmic-control-button ${activePanels.customRules ? 'active' : ''}`}
        onClick={() => togglePanel('customRules')}
      >
        <div className="cosmic-control-icon">🔧</div>
        <div className="cosmic-control-label">Custom Rules</div>
      </button>

      <button
        className={`cosmic-control-button ${activePanels.share ? 'active' : ''}`}
        onClick={() => togglePanel('share')}
      >
        <div className="cosmic-control-icon">📤</div>
        <div className="cosmic-control-label">Share</div>
      </button>
    </div>
  );
};

export default ViewControls;
