"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatisticsResults {
    data: { index: number; value: number }[];
    stats: {
        count: number;
        sum: number;
        mean: number;
        median: number;
        stdDev: number;
        min: number;
        max: number;
    };
}

export const StatisticsAnalyzer = () => {
    const [numbers, setNumbers] = useState('');
    const [results, setResults] = useState<StatisticsResults | null>(null);
    const [error, setError] = useState('');

    const calculateStats = () => {
        try {
            const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

            if (numArray.length === 0) {
                setError('Please enter valid numbers separated by commas');
                return;
            }

            const sum = numArray.reduce((a, b) => a + b, 0);
            const mean = sum / numArray.length;
            const sortedNums = [...numArray].sort((a, b) => a - b);
            const median = sortedNums.length % 2 === 0
                ? (sortedNums[sortedNums.length/2 - 1] + sortedNums[sortedNums.length/2]) / 2
                : sortedNums[Math.floor(sortedNums.length/2)];

            const variance = numArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numArray.length;
            const stdDev = Math.sqrt(variance);

            const data = numArray.map((value, index) => ({
                index,
                value
            }));

            setResults({
                data,
                stats: {
                    count: numArray.length,
                    sum,
                    mean,
                    median,
                    stdDev,
                    min: Math.min(...numArray),
                    max: Math.max(...numArray)
                }
            });
            setError('');
        } catch {  // Remove unused err parameter
            setError('Error calculating statistics');
        }
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="bg-white  rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Statistics Analyzer</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={numbers}
                        onChange={(e) => setNumbers(e.target.value)}
                        placeholder="Enter numbers separated by commas (e.g., 1, 2, 3, 4)"
                        className="w-full px-3 py-2 border rounded"
                    />
                    <button
                        onClick={calculateStats}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Calculate Statistics
                    </button>
                </div>
            </div>

            {results && (
                <div className="bg-white  rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Results</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <p><span className="font-medium">Count:</span> {results.stats.count}</p>
                            <p><span className="font-medium">Sum:</span> {results.stats.sum}</p>
                            <p><span className="font-medium">Mean:</span> {results.stats.mean.toFixed(2)}</p>
                            <p><span className="font-medium">Median:</span> {results.stats.median.toFixed(2)}</p>
                            <p><span className="font-medium">Standard Deviation:</span> {results.stats.stdDev.toFixed(2)}</p>
                            <p><span className="font-medium">Minimum:</span> {results.stats.min}</p>
                            <p><span className="font-medium">Maximum:</span> {results.stats.max}</p>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={results.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="index" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default StatisticsAnalyzer;
