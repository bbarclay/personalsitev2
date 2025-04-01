"use client";

import React, { useState, useMemo } from 'react';
import {
  parseData,
  calculateStatistics,
  createHistogramBins,
  prepareBoxPlotData,
  StatisticsResult,
  HistogramBin,
  BoxPlotData
} from '../utils/statistics-utils';

export function StatisticsAnalyzer() {
  const [inputText, setInputText] = useState<string>('');
  const [numBins, setNumBins] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'summary' | 'histogram' | 'boxplot'>('summary');

  // Parse data and calculate statistics
  const data = useMemo(() => parseData(inputText), [inputText]);
  const statistics = useMemo(() => calculateStatistics(data), [data]);
  const histogramBins = useMemo(() => createHistogramBins(data, numBins), [data, numBins]);
  const boxPlotData = useMemo(() => prepareBoxPlotData(data), [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleBinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumBins(value);
    }
  };

  const sampleDatasets = [
    { name: 'Normal Distribution', data: '68, 72, 75, 69, 71, 74, 73, 77, 70, 69, 65, 79, 80, 72, 76, 71' },
    { name: 'Bimodal Distribution', data: '12, 15, 17, 14, 13, 16, 45, 47, 48, 46, 43, 49, 44, 50' },
    { name: 'Skewed Distribution', data: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59' }
  ];

  const loadSampleData = (data: string) => {
    setInputText(data);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Statistics Analyzer</h2>
      
      <div className="mb-6">
        <label htmlFor="data-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Enter data (comma, space, or line separated):
        </label>
        <textarea
          id="data-input"
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          rows={5}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your data here (e.g., 1, 2, 3, 4, 5)"
        />
        
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sample datasets:</span>
          {sampleDatasets.map((dataset, index) => (
            <button
              key={index}
              onClick={() => loadSampleData(dataset.data)}
              className="text-sm px-2 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              {dataset.name}
            </button>
          ))}
        </div>
      </div>
      
      {data.length > 0 && (
        <>
          <div className="mb-6 flex border-b dark:border-gray-700">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'summary' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'histogram' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('histogram')}
            >
              Histogram
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'boxplot' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('boxplot')}
            >
              Box Plot
            </button>
          </div>
          
          {activeTab === 'summary' && (
            <StatisticsSummary statistics={statistics} />
          )}
          
          {activeTab === 'histogram' && (
            <HistogramView bins={histogramBins} numBins={numBins} onBinsChange={handleBinsChange} />
          )}
          
          {activeTab === 'boxplot' && (
            <BoxPlotView data={boxPlotData} />
          )}
        </>
      )}
      
      {data.length === 0 && inputText.trim() !== '' && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-md">
          No valid numeric data found. Please enter numeric values separated by commas, spaces, or new lines.
        </div>
      )}
    </div>
  );
}

interface StatisticsSummaryProps {
  statistics: StatisticsResult;
}

function StatisticsSummary({ statistics }: StatisticsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Basic Statistics</h3>
        <dl className="grid grid-cols-2 gap-y-2">
          <dt className="text-gray-600 dark:text-gray-400">Count:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.count}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Sum:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.sum.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Minimum:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.min.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Maximum:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.max.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Range:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.range.toFixed(2)}</dd>
        </dl>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Central Tendency</h3>
        <dl className="grid grid-cols-2 gap-y-2">
          <dt className="text-gray-600 dark:text-gray-400">Mean:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.mean.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Median:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.median.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Mode:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">
            {statistics.mode.length > 0 
              ? statistics.mode.map(m => m.toFixed(2)).join(', ') 
              : 'No mode'}
          </dd>
        </dl>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Dispersion</h3>
        <dl className="grid grid-cols-2 gap-y-2">
          <dt className="text-gray-600 dark:text-gray-400">Variance:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.variance.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Standard Deviation:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.standardDeviation.toFixed(2)}</dd>
        </dl>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Quartiles</h3>
        <dl className="grid grid-cols-2 gap-y-2">
          <dt className="text-gray-600 dark:text-gray-400">Q1 (25%):</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.quartiles.q1.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Q2 (50%):</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.quartiles.q2.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Q3 (75%):</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.quartiles.q3.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">IQR:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">{statistics.iqr.toFixed(2)}</dd>
          
          <dt className="text-gray-600 dark:text-gray-400">Outliers:</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-200">
            {statistics.outliers.length > 0 
              ? statistics.outliers.map(o => o.toFixed(2)).join(', ') 
              : 'None'}
          </dd>
        </dl>
      </div>
    </div>
  );
}

interface HistogramViewProps {
  bins: HistogramBin[];
  numBins: number;
  onBinsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function HistogramView({ bins, numBins, onBinsChange }: HistogramViewProps) {
  if (bins.length === 0) return null;
  
  const maxCount = Math.max(...bins.map(bin => bin.count));
  
  return (
    <div>
      <div className="mb-4 flex items-center">
        <label htmlFor="num-bins" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of bins:
        </label>
        <input
          id="num-bins"
          type="number"
          min="2"
          max="50"
          value={numBins}
          onChange={onBinsChange}
          className="w-20 p-1 border rounded text-center"
        />
      </div>
      
      <div className="h-60 flex items-end space-x-1">
        {bins.map((bin, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center"
            style={{ height: '100%' }}
          >
            <div 
              className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
              style={{ 
                height: `${(bin.count / maxCount) * 100}%`,
                minHeight: bin.count > 0 ? '4px' : '0'
              }}
            />
            {numBins <= 20 && (
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 rotate-45 origin-left">
                {bin.min.toFixed(1)}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Bin Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Bin Range</th>
                <th className="px-4 py-2 text-left">Count</th>
                <th className="px-4 py-2 text-left">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {bins.map((bin, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{`${bin.min.toFixed(2)} - ${bin.max.toFixed(2)}`}</td>
                  <td className="px-4 py-2">{bin.count}</td>
                  <td className="px-4 py-2">{(bin.frequency * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface BoxPlotViewProps {
  data: BoxPlotData;
}

function BoxPlotView({ data }: BoxPlotViewProps) {
  const min = data.min;
  const max = data.max;
  const range = max - min;
  
  // Prevent division by zero
  const scaleValue = (value: number) => {
    return range === 0 ? 50 : ((value - min) / range) * 100;
  };
  
  const q1Position = scaleValue(data.q1);
  const medianPosition = scaleValue(data.median);
  const q3Position = scaleValue(data.q3);
  const minPosition = scaleValue(data.min);
  const maxPosition = scaleValue(data.max);
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Box Plot</h3>
      
      <div className="mb-8 relative h-20">
        {/* Box and whiskers */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600" />
        
        {/* Min whisker */}
        <div 
          className="absolute top-1/4 bottom-1/4 w-0.5 bg-gray-500 dark:bg-gray-400" 
          style={{ left: `${minPosition}%` }}
        />
        
        {/* Box */}
        <div 
          className="absolute top-1/4 bottom-1/4 bg-blue-100 dark:bg-blue-900/50 border border-blue-500 dark:border-blue-700" 
          style={{ 
            left: `${q1Position}%`, 
            width: `${q3Position - q1Position}%` 
          }}
        />
        
        {/* Median line */}
        <div 
          className="absolute top-1/4 bottom-1/4 w-0.5 bg-blue-600 dark:bg-blue-400 z-10" 
          style={{ left: `${medianPosition}%` }}
        />
        
        {/* Max whisker */}
        <div 
          className="absolute top-1/4 bottom-1/4 w-0.5 bg-gray-500 dark:bg-gray-400" 
          style={{ left: `${maxPosition}%` }}
        />
        
        {/* Horizontal line from min to max */}
        <div 
          className="absolute top-1/2 h-0.5 bg-gray-500 dark:bg-gray-400" 
          style={{ 
            left: `${minPosition}%`, 
            width: `${maxPosition - minPosition}%` 
          }}
        />
        
        {/* Labels */}
        <div className="absolute top-full mt-2 text-xs text-gray-600 dark:text-gray-400" style={{ left: `${minPosition}%`, transform: 'translateX(-50%)' }}>
          {data.min.toFixed(2)}
        </div>
        <div className="absolute top-full mt-2 text-xs text-gray-600 dark:text-gray-400" style={{ left: `${q1Position}%`, transform: 'translateX(-50%)' }}>
          {data.q1.toFixed(2)}
        </div>
        <div className="absolute top-full mt-2 text-xs text-gray-600 dark:text-gray-400" style={{ left: `${medianPosition}%`, transform: 'translateX(-50%)' }}>
          {data.median.toFixed(2)}
        </div>
        <div className="absolute top-full mt-2 text-xs text-gray-600 dark:text-gray-400" style={{ left: `${q3Position}%`, transform: 'translateX(-50%)' }}>
          {data.q3.toFixed(2)}
        </div>
        <div className="absolute top-full mt-2 text-xs text-gray-600 dark:text-gray-400" style={{ left: `${maxPosition}%`, transform: 'translateX(-50%)' }}>
          {data.max.toFixed(2)}
        </div>
        
        {/* Outliers */}
        {data.outliers.map((outlier, index) => {
          const position = scaleValue(outlier);
          return (
            <div 
              key={index}
              className="absolute top-1/2 w-2 h-2 rounded-full bg-red-500 dark:bg-red-400" 
              style={{ 
                left: `${position}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
            />
          );
        })}
      </div>
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Box Plot Values</h3>
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <dt className="text-gray-600 dark:text-gray-400 text-sm">Minimum</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">{data.min.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-gray-600 dark:text-gray-400 text-sm">Q1 (25%)</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">{data.q1.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-gray-600 dark:text-gray-400 text-sm">Median</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">{data.median.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-gray-600 dark:text-gray-400 text-sm">Q3 (75%)</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">{data.q3.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-gray-600 dark:text-gray-400 text-sm">Maximum</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200">{data.max.toFixed(2)}</dd>
          </div>
        </dl>
        {data.outliers.length > 0 && (
          <div className="mt-3">
            <dt className="text-gray-600 dark:text-gray-400 text-sm">Outliers</dt>
            <dd className="font-medium text-gray-800 dark:text-gray-200 mt-1">
              {data.outliers.map(o => o.toFixed(2)).join(', ')}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
} 