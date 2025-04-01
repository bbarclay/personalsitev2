import { useState, useMemo } from 'react';
import { CalculationResult } from '../types';
import {
  CHART_COLORS,
  DEFAULT_CHECKBOXES,
  TRANSFORMATIONS
} from '../constants';

export interface ChartColors {
  standard: string;
  custom: string;
  grid: string;
}

export const useChartTransformations = (
  standardResults: CalculationResult | null,
  customResults: CalculationResult | null
) => {
  const [checkboxes, setCheckboxes] = useState(DEFAULT_CHECKBOXES);

  // Define transformation functions for each option
  const transformations = useMemo(() => ({
    [TRANSFORMATIONS.ORIGINAL]: (v: number) => v,
    [TRANSFORMATIONS.LOGARITHMIC]: (v: number) => v, // No transformation, use log scale on Y-axis
    [TRANSFORMATIONS.DOUBLE]: (v: number) => v * 2,
    [TRANSFORMATIONS.SQUARE]: (v: number) => v ** 2,
    [TRANSFORMATIONS.ADD_10]: (v: number) => v + 10,
    [TRANSFORMATIONS.SUBTRACT_1]: (v: number) => v - 1,
    [TRANSFORMATIONS.INVERSE]: (v: number) => 1 / v,
  }), []);

  // Colors for Standard and Custom sequences
  const colors: ChartColors = {
    standard: CHART_COLORS.STANDARD,
    custom: CHART_COLORS.CUSTOM,
    grid: CHART_COLORS.GRID,
  };

  // Function to prepare chart data based on transformation
  const prepareChartData = (transformation: string) => {
    const dataMap: {
      [key: number]: { step: number; [key: string]: number | undefined };
    } = {};

    const addSequenceToData = (
      sequence: { step: number; value: number }[],
      key: string,
      transform: (value: number) => number
    ) => {
      sequence.forEach((item) => {
        if (!dataMap[item.step]) {
          dataMap[item.step] = { step: item.step };
        }
        const transformedValue = transform(item.value);
        // Ensure that for logarithmic scale, transformedValue > 0
        if (transformation === TRANSFORMATIONS.LOGARITHMIC && transformedValue <= 0) {
          // Skip or handle the value appropriately
          dataMap[item.step][key] = undefined;
        } else {
          dataMap[item.step][key] = transformedValue;
        }
      });
    };

    // Apply transformation to Standard sequence
    if (standardResults) {
      addSequenceToData(
        standardResults.sequence,
        'standard',
        transformations[transformation as keyof typeof transformations]
      );
    }

    // Apply transformation to Custom sequence
    if (customResults) {
      addSequenceToData(
        customResults.sequence,
        'custom',
        transformations[transformation as keyof typeof transformations]
      );
    }

    // Convert the dataMap to an array sorted by step
    return Object.values(dataMap).sort((a, b) => a.step - b.step);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Generate a list of selected transformations
  const selectedTransformations = Object.keys(checkboxes).filter(
    (key) => checkboxes[key as keyof typeof checkboxes]
  );

  return {
    checkboxes,
    handleCheckboxChange,
    colors,
    prepareChartData,
    selectedTransformations,
    transformations,
  };
};
