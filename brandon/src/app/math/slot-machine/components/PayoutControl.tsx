import React, { useState, useEffect } from 'react';
import { useGameState } from './GameState';
import { SymbolIcon } from './SymbolIcon';
import { symbols } from './utils';
import styles from './PayoutControl.module.css';
import type { GameConfig } from './types';

export const PayoutControl: React.FC = () => {
  const { gameConfig, setGameConfig } = useGameState();
  const [isOpen, setIsOpen] = useState(false);

  // Ensure gameConfig is properly initialized
  useEffect(() => {
    if (!gameConfig.symbolWeights || !gameConfig.freeSpinConfig) {
      setGameConfig({
        symbolWeights: [1, 2, 3, 4, 5, 6, 2],
        freeSpinConfig: {
          threeScatters: 3,
          fourScatters: 5,
          fiveScatters: 10
        },
        volatility: 'medium',
        payoutMultiplier: 1.0
      });
    }
  }, [gameConfig.freeSpinConfig, gameConfig.symbolWeights, setGameConfig]);

  const handleVolatilityChange = (volatility: 'low' | 'medium' | 'high') => {
    const volatilitySettings: Record<string, Partial<GameConfig>> = {
      low: {
        payoutMultiplier: 0.8,
        symbolWeights: [1, 3, 4, 5, 6, 7, 2], // More common symbols
        freeSpinConfig: {
          threeScatters: 2,
          fourScatters: 3,
          fiveScatters: 5
        }
      },
      medium: {
        payoutMultiplier: 1.0,
        symbolWeights: [1, 2, 3, 4, 5, 6, 2], // Balanced
        freeSpinConfig: {
          threeScatters: 3,
          fourScatters: 5,
          fiveScatters: 10
        }
      },
      high: {
        payoutMultiplier: 1.5,
        symbolWeights: [2, 2, 2, 2, 2, 2, 1], // More rare symbols
        freeSpinConfig: {
          threeScatters: 5,
          fourScatters: 10,
          fiveScatters: 20
        }
      }
    };

    setGameConfig({
      ...volatilitySettings[volatility],
      volatility
    });
  };

  const handleSymbolWeightChange = (symbolId: number, change: number) => {
    const newWeights = [...gameConfig.symbolWeights];
    const newWeight = Math.max(1, Math.min(10, newWeights[symbolId] + change));
    newWeights[symbolId] = newWeight;
    setGameConfig({ symbolWeights: newWeights });
  };

  const handleFreeSpinConfigChange = (
    type: 'threeScatters' | 'fourScatters' | 'fiveScatters',
    value: number
  ) => {
    setGameConfig({
      freeSpinConfig: {
        ...gameConfig.freeSpinConfig,
        [type]: value
      }
    });
  };

  if (!isOpen) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Payout Settings</h3>
          <button 
            className={styles.button}
            onClick={() => setIsOpen(true)}
          >
            Configure
          </button>
        </div>
        <div className="text-sm">
          Current Multiplier: {gameConfig.payoutMultiplier.toFixed(2)}x
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.drawer} ${styles.drawerOpen}`}>
      <div className={styles.header}>
        <h2>Game Configuration</h2>
        <button 
          className={styles.button}
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>

      <div className={styles.content}>
        {/* Global Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Global Settings</h3>
          <div className={styles.grid}>
            <div>
              <label className={styles.label}>
                Payout Multiplier: {gameConfig.payoutMultiplier.toFixed(2)}x
              </label>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={gameConfig.payoutMultiplier}
                onChange={(e) => setGameConfig({ payoutMultiplier: parseFloat(e.target.value) })}
                className={styles.slider}
              />
            </div>
          </div>
        </div>

        {/* Volatility Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Volatility Settings</h3>
          <div className={styles.grid}>
            <button
              className={`${styles.button} ${gameConfig.volatility === 'low' ? styles.primaryButton : ''}`}
              onClick={() => handleVolatilityChange('low')}
            >
              Low Volatility
            </button>
            <button
              className={`${styles.button} ${gameConfig.volatility === 'medium' ? styles.primaryButton : ''}`}
              onClick={() => handleVolatilityChange('medium')}
            >
              Medium Volatility
            </button>
            <button
              className={`${styles.button} ${gameConfig.volatility === 'high' ? styles.primaryButton : ''}`}
              onClick={() => handleVolatilityChange('high')}
            >
              High Volatility
            </button>
          </div>
        </div>

        {/* Symbol Weights */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Symbol Weights</h3>
          <div className="space-y-2">
            {symbols.map((symbol, index) => (
              <div key={symbol.id} className={styles.symbolRow}>
                <SymbolIcon symbolId={symbol.id} size={24} />
                <div className={styles.symbolInfo}>
                  <div className="font-medium">{symbol.name}</div>
                  <div className="text-sm text-gray-500">
                    Weight: {gameConfig.symbolWeights[index]}
                  </div>
                </div>
                <div className={styles.weightControl}>
                  <button
                    className={styles.button}
                    onClick={() => handleSymbolWeightChange(index, -1)}
                    disabled={gameConfig.symbolWeights[index] <= 1}
                  >
                    -
                  </button>
                  <span className={styles.value}>{gameConfig.symbolWeights[index]}</span>
                  <button
                    className={styles.button}
                    onClick={() => handleSymbolWeightChange(index, 1)}
                    disabled={gameConfig.symbolWeights[index] >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Spins Configuration */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Free Spins Configuration</h3>
          <div className={styles.grid}>
            <div>
              <label className={styles.label}>
                3 Scatters: {gameConfig.freeSpinConfig.threeScatters} Free Spins
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={gameConfig.freeSpinConfig.threeScatters}
                onChange={(e) => handleFreeSpinConfigChange('threeScatters', parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
            <div>
              <label className={styles.label}>
                4 Scatters: {gameConfig.freeSpinConfig.fourScatters} Free Spins
              </label>
              <input
                type="range"
                min="2"
                max="15"
                value={gameConfig.freeSpinConfig.fourScatters}
                onChange={(e) => handleFreeSpinConfigChange('fourScatters', parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
            <div>
              <label className={styles.label}>
                5 Scatters: {gameConfig.freeSpinConfig.fiveScatters} Free Spins
              </label>
              <input
                type="range"
                min="5"
                max="25"
                value={gameConfig.freeSpinConfig.fiveScatters}
                onChange={(e) => handleFreeSpinConfigChange('fiveScatters', parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Theoretical Statistics</h3>
          <div className={styles.grid}>
            <div>
              <p className="text-gray-500">Theoretical RTP</p>
              <p className="font-medium">
                {(gameConfig.payoutMultiplier * 96).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">House Edge</p>
              <p className="font-medium">
                {(100 - gameConfig.payoutMultiplier * 96).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
