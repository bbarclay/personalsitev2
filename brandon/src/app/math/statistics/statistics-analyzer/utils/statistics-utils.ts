// Statistics utility types
export interface StatisticsResult {
  count: number;
  sum: number;
  min: number;
  max: number;
  range: number;
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  standardDeviation: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
  };
  iqr: number;
  outliers: number[];
}

export interface HistogramBin {
  min: number;
  max: number;
  count: number;
  frequency: number;
}

export interface BoxPlotData {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers: number[];
}

// This file will contain the implementation of statistical functions
// TODO: Implement all functions below

export function parseData(input: string): number[] {
  // Split the input string by commas, spaces, and newlines
  const values = input.split(/[\s,\n]+/).filter(Boolean);
  
  // Convert strings to numbers and filter out invalid values
  return values
    .map(value => parseFloat(value.trim()))
    .filter(value => !isNaN(value));
}

export function calculateMean(data: number[]): number {
  if (data.length === 0) return 0;
  return data.reduce((sum, value) => sum + value, 0) / data.length;
}

export function calculateMedian(data: number[]): number {
  if (data.length === 0) return 0;
  
  const sortedData = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sortedData.length / 2);
  
  if (sortedData.length % 2 === 0) {
    return (sortedData[mid - 1] + sortedData[mid]) / 2;
  } else {
    return sortedData[mid];
  }
}

export function calculateMode(data: number[]): number[] {
  if (data.length === 0) return [];
  
  // Count frequency of each value
  const frequency: Record<number, number> = {};
  data.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  
  // Find the maximum frequency
  let maxFrequency = 0;
  Object.values(frequency).forEach(count => {
    maxFrequency = Math.max(maxFrequency, count);
  });
  
  // Find all values with the maximum frequency
  const modes: number[] = [];
  Object.entries(frequency).forEach(([value, count]) => {
    if (count === maxFrequency && maxFrequency > 1) {
      modes.push(parseFloat(value));
    }
  });
  
  return modes.sort((a, b) => a - b);
}

export function calculateQuartiles(data: number[]): { q1: number; q2: number; q3: number } {
  if (data.length === 0) return { q1: 0, q2: 0, q3: 0 };
  
  const sortedData = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sortedData.length / 2);
  
  // Median (Q2)
  const q2 = calculateMedian(sortedData);
  
  // First quartile (Q1)
  const lowerHalf = sortedData.length % 2 === 0 
    ? sortedData.slice(0, mid) 
    : sortedData.slice(0, mid);
  const q1 = calculateMedian(lowerHalf);
  
  // Third quartile (Q3)
  const upperHalf = sortedData.length % 2 === 0 
    ? sortedData.slice(mid) 
    : sortedData.slice(mid + 1);
  const q3 = calculateMedian(upperHalf);
  
  return { q1, q2, q3 };
}

export function findOutliers(data: number[], q1: number, q3: number, iqr: number): number[] {
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  return data.filter(value => value < lowerBound || value > upperBound);
}

export function calculateStatistics(data: number[]): StatisticsResult {
  if (data.length === 0) {
    return {
      count: 0,
      sum: 0,
      min: 0,
      max: 0,
      range: 0,
      mean: 0,
      median: 0,
      mode: [],
      variance: 0,
      standardDeviation: 0,
      quartiles: { q1: 0, q2: 0, q3: 0 },
      iqr: 0,
      outliers: []
    };
  }
  
  const sortedData = [...data].sort((a, b) => a - b);
  const count = data.length;
  const sum = data.reduce((total, value) => total + value, 0);
  const min = sortedData[0];
  const max = sortedData[count - 1];
  const range = max - min;
  const mean = sum / count;
  
  // Calculate median and quartiles
  const median = calculateMedian(sortedData);
  const quartiles = calculateQuartiles(sortedData);
  const iqr = quartiles.q3 - quartiles.q1;
  
  // Calculate mode
  const mode = calculateMode(data);
  
  // Calculate variance and standard deviation
  const variance = data.reduce((total, value) => {
    return total + Math.pow(value - mean, 2);
  }, 0) / count;
  const standardDeviation = Math.sqrt(variance);
  
  // Find outliers
  const outliers = findOutliers(sortedData, quartiles.q1, quartiles.q3, iqr);
  
  return {
    count,
    sum,
    min,
    max,
    range,
    mean,
    median,
    mode,
    variance,
    standardDeviation,
    quartiles,
    iqr,
    outliers
  };
}

export function createHistogramBins(data: number[], numBins: number = 10): HistogramBin[] {
  if (data.length === 0) return [];
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const binWidth = range / numBins;
  
  // Create empty bins
  const bins: HistogramBin[] = [];
  for (let i = 0; i < numBins; i++) {
    const binMin = min + i * binWidth;
    const binMax = binMin + binWidth;
    bins.push({
      min: binMin,
      max: binMax,
      count: 0,
      frequency: 0
    });
  }
  
  // Count values in each bin
  data.forEach(value => {
    // Edge case: max value should be included in the last bin
    if (value === max) {
      bins[bins.length - 1].count++;
    } else {
      const binIndex = Math.floor((value - min) / binWidth);
      bins[binIndex].count++;
    }
  });
  
  // Calculate frequencies
  bins.forEach(bin => {
    bin.frequency = bin.count / data.length;
  });
  
  return bins;
}

export function prepareBoxPlotData(data: number[]): BoxPlotData {
  if (data.length === 0) {
    return {
      min: 0,
      q1: 0,
      median: 0,
      q3: 0,
      max: 0,
      outliers: []
    };
  }
  
  const sortedData = [...data].sort((a, b) => a - b);
  const quartiles = calculateQuartiles(sortedData);
  const iqr = quartiles.q3 - quartiles.q1;
  const outliers = findOutliers(sortedData, quartiles.q1, quartiles.q3, iqr);
  
  // Filter out outliers to find whisker ends
  const filteredData = sortedData.filter(value => 
    !outliers.includes(value)
  );
  
  return {
    min: filteredData.length > 0 ? filteredData[0] : sortedData[0],
    q1: quartiles.q1,
    median: quartiles.q2,
    q3: quartiles.q3,
    max: filteredData.length > 0 ? filteredData[filteredData.length - 1] : sortedData[sortedData.length - 1],
    outliers
  };
} 