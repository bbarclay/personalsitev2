import React, { useState } from 'react';
import { useCollatzContext } from '../context/CollatzContext';

const SharePanel: React.FC = () => {
  const { standardSequence, customRules } = useCollatzContext();
  const [showShareSuccess, setShowShareSuccess] = useState<boolean>(false);

  const generateShareLink = (): string => {
    if (!standardSequence) return window.location.href;

    const params = new URLSearchParams();
    params.set('n', standardSequence.startNumber.toString());

    if (customRules.evenMultiplier !== 0.5 ||
        customRules.evenAdditive !== 0 ||
        customRules.oddMultiplier !== 3 ||
        customRules.oddAdditive !== 1) {
      params.set('em', customRules.evenMultiplier.toString());
      params.set('ea', customRules.evenAdditive.toString());
      params.set('om', customRules.oddMultiplier.toString());
      params.set('oa', customRules.oddAdditive.toString());
    }

    return `${window.location.href}?${params.toString()}`;
  };

  const handleCopyLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link)
      .then(() => {
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  const generateImage = (): string => {
    // In a real implementation, this would generate a visualization image
    // For now, return a placeholder
    return 'https://placekitten.com/500/300';
  };

  const handleExportImage = () => {
    const imageUrl = generateImage();
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `collatz-${standardSequence?.startNumber || 'sequence'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportData = () => {
    if (!standardSequence?.sequence) return;

    const data = {
      startingNumber: standardSequence.startNumber,
      sequence: standardSequence.sequence,
      rules: customRules,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `collatz-${standardSequence.startNumber}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cosmic-panel cosmic-share">
      <h3 className="cosmic-subtitle">Share & Export</h3>

      {!standardSequence && (
        <div className="cosmic-empty-state">
          Calculate a sequence to enable sharing
        </div>
      )}

      {standardSequence && (
        <div className="cosmic-share-options">
          <div className="cosmic-share-option">
            <h4>Share Link</h4>
            <p className="cosmic-description">
              Create a link that others can use to view this exact sequence
            </p>
            <button onClick={handleCopyLink} className="cosmic-button">
              Copy Link
            </button>
            {showShareSuccess && (
              <div className="cosmic-success-message">Link copied!</div>
            )}
          </div>

          <div className="cosmic-share-option">
            <h4>Export Visualization</h4>
            <p className="cosmic-description">
              Download the current visualization as an image
            </p>
            <button onClick={handleExportImage} className="cosmic-button">
              Export Image
            </button>
          </div>

          <div className="cosmic-share-option">
            <h4>Export Data</h4>
            <p className="cosmic-description">
              Download the sequence data as JSON for further analysis
            </p>
            <button onClick={handleExportData} className="cosmic-button">
              Export JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePanel;
