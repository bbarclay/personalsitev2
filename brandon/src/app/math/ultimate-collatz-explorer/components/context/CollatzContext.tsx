import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define interfaces for our data structures
export interface CollatzSequence {
  startingNumber: number;
  sequence: number[];
  steps: number;
  maxValue: number;
  oddCount: number;
  evenCount: number;
}

export interface CustomCollatzRules {
  evenMultiplier: number;
  evenAdditive: number;
  oddMultiplier: number;
  oddAdditive: number;
  divideBy?: number;
  addAfterDivide?: number;
  multiplyBy?: number;
  addAfterMultiply?: number;
}

export type VisualizationType = 'lineGraph' | 'heatmap' | 'trajectory' | 'barChart' | 'comparative' | 'stopTime' | 'glitchySequence';

// Define the context interface
interface CollatzContextType {
  standardSequence: CollatzSequence | null;
  customSequence: CollatzSequence | null;
  compareSequences: CollatzSequence[];
  customRules: CustomCollatzRules;
  calculateStandardSequence: (startNumber: number) => void;
  calculateCustomSequence: (startNumber: number) => void;
  addCompareSequence: (startNumber: number) => void;
  removeCompareSequence: (startNumber: number) => void;
  updateCustomRules: (rules: CustomCollatzRules) => void;
}

// Create context with default values
const CollatzContext = createContext<CollatzContextType>({
  standardSequence: null,
  customSequence: null,
  compareSequences: [],
  customRules: {
    evenMultiplier: 0.5, // divide by 2
    evenAdditive: 0,
    oddMultiplier: 3, // multiply by 3
    oddAdditive: 1 // add 1
  },
  calculateStandardSequence: () => {},
  calculateCustomSequence: () => {},
  addCompareSequence: () => {},
  removeCompareSequence: () => {},
  updateCustomRules: () => {}
});

// Create the provider component
export const CollatzContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // State for sequences
  const [standardSequence, setStandardSequence] = useState<CollatzSequence | null>(null);
  const [customSequence, setCustomSequence] = useState<CollatzSequence | null>(null);
  const [compareSequences, setCompareSequences] = useState<CollatzSequence[]>([]);

  // State for custom rules
  const [customRules, setCustomRules] = useState<CustomCollatzRules>({
    evenMultiplier: 0.5,
    evenAdditive: 0,
    oddMultiplier: 3,
    oddAdditive: 1
  });

  // Calculate standard Collatz sequence
  const calculateStandardSequence = (startingNumber: number) => {
    if (startingNumber <= 0) return;

    const sequence: number[] = [];
    let current = startingNumber;
    let oddCount = 0;
    let evenCount = 0;
    let maxValue = startingNumber;

    // Generate sequence
    while (current !== 1 && sequence.length < 1000) {
      sequence.push(current);
      maxValue = Math.max(maxValue, current);

      if (current % 2 === 0) {
        // Even number: divide by 2
        current = current / 2;
        evenCount++;
      } else {
        // Odd number: 3n + 1
        current = 3 * current + 1;
        oddCount++;
      }
    }

    // Add the final 1
    if (sequence.length < 1000) {
      sequence.push(1);
    }

    setStandardSequence({
      startingNumber,
      sequence,
      steps: sequence.length - 1,
      maxValue,
      oddCount,
      evenCount
    });
  };

  // Calculate sequence with custom rules
  const calculateCustomSequence = (startingNumber: number) => {
    if (startingNumber <= 0) return;

    const sequence: number[] = [];
    let current = startingNumber;
    let oddCount = 0;
    let evenCount = 0;
    let maxValue = startingNumber;

    // Generate sequence with custom rules
    while (current !== 1 && sequence.length < 1000 && current > 0) {
      sequence.push(current);
      maxValue = Math.max(maxValue, current);

      if (current % 2 === 0) {
        // Even number: apply custom rule
        current = customRules.evenMultiplier * current + customRules.evenAdditive;
        evenCount++;
      } else {
        // Odd number: apply custom rule
        current = customRules.oddMultiplier * current + customRules.oddAdditive;
        oddCount++;
      }

      // Round to avoid floating point issues
      current = Math.round(current * 1000) / 1000;
    }

    // Add the final value if it's 1
    if (current === 1 && sequence.length < 1000) {
      sequence.push(1);
    }

    setCustomSequence({
      startingNumber,
      sequence,
      steps: sequence.length - 1,
      maxValue,
      oddCount,
      evenCount
    });
  };

  // Add a sequence to the comparison list
  const addCompareSequence = (startingNumber: number) => {
    if (startingNumber <= 0) return;

    // Check if already in list
    if (compareSequences.some(seq => seq.startingNumber === startingNumber)) {
      return;
    }

    const sequence: number[] = [];
    let current = startingNumber;
    let oddCount = 0;
    let evenCount = 0;
    let maxValue = startingNumber;

    // Generate sequence
    while (current !== 1 && sequence.length < 1000) {
      sequence.push(current);
      maxValue = Math.max(maxValue, current);

      if (current % 2 === 0) {
        current = current / 2;
        evenCount++;
      } else {
        current = 3 * current + 1;
        oddCount++;
      }
    }

    // Add the final 1
    if (sequence.length < 1000) {
      sequence.push(1);
    }

    setCompareSequences(prev => [...prev, {
      startingNumber,
      sequence,
      steps: sequence.length - 1,
      maxValue,
      oddCount,
      evenCount
    }]);
  };

  // Remove a sequence from comparison
  const removeCompareSequence = (startingNumber: number) => {
    setCompareSequences(prev =>
      prev.filter(seq => seq.startingNumber !== startingNumber)
    );
  };

  // Update custom rules
  const updateCustomRules = (rules: CustomCollatzRules) => {
    setCustomRules(rules);
  };

  // Calculate initial sequence when the component mounts
  useEffect(() => {
    calculateStandardSequence(27); // Start with 27 as a demo
  }, []);

  // Create the context value object
  const contextValue: CollatzContextType = {
    standardSequence,
    customSequence,
    compareSequences,
    customRules,
    calculateStandardSequence,
    calculateCustomSequence,
    addCompareSequence,
    removeCompareSequence,
    updateCustomRules
  };

  return (
    <CollatzContext.Provider value={contextValue}>
      {children}
    </CollatzContext.Provider>
  );
};

// Custom hook for using the context
export const useCollatzContext = () => useContext(CollatzContext);
