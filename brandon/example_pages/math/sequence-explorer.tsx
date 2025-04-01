"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SequenceExplorer = () => {
    const [sequenceType, setSequenceType] = useState('arithmetic');
    const [start, setStart] = useState('1');
    const [difference, setDifference] = useState('2');
    const [terms, setTerms] = useState('10');
    interface SequenceResult {
        sequence: { index: number; value: number; }[];
        description: string;
    }
    const [result, setResult] = useState<SequenceResult | null>(null);
    const [error, setError] = useState('');

    const generateArithmeticSequence = (a1: number, d: number, n: number) => {
        return Array.from({ length: n }, (_, i) => ({
            index: i,
            value: a1 + i * d
        }));
    };

    const generateGeometricSequence = (a1: number, r: number, n: number) => {
        return Array.from({ length: n }, (_, i) => ({
            index: i,
            value: a1 * Math.pow(r, i)
        }));
    };

    const generateFibonacciSequence = (n: number) => {
        const sequence = [1, 1];
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence.map((value, index) => ({
            index,
            value
        }));
    };

    const calculateSequence = () => {
        try {
            const n = parseInt(terms);
            if (isNaN(n) || n <= 0) {
                throw new Error('Number of terms must be a positive integer');
            }

            let sequence: { index: number; value: number; }[] = [];
            let description = '';

            switch (sequenceType) {
                case 'arithmetic': {
                    const a1 = parseInt(start);
                    const d = parseInt(difference);
                    if (isNaN(a1) || isNaN(d)) {
                        throw new Error('Invalid parameters for arithmetic sequence');
                    }
                    sequence = generateArithmeticSequence(a1, d, n);
                    description = `Arithmetic sequence with first term ${a1} and common difference ${d}`;
                    break;
                }
                case 'geometric': {
                    const a1 = parseInt(start);
                    const r = parseInt(difference);
                    if (isNaN(a1) || isNaN(r)) {
                        throw new Error('Invalid parameters for geometric sequence');
                    }
                    sequence = generateGeometricSequence(a1, r, n);
                    description = `Geometric sequence with first term ${a1} and common ratio ${r}`;
                    break;
                }
                case 'fibonacci': {
                    sequence = generateFibonacciSequence(n);
                    description = 'Fibonacci sequence';
                    break;
                }
            }

            setResult({ sequence, description });
            setError('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setResult(null);
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
                <h2 className="text-xl font-semibold mb-4">Sequence Explorer</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Sequence Type</label>
                        <select
                            value={sequenceType}
                            onChange={(e) => setSequenceType(e.target.value)}
                            className="w-full px-3 py-2 border rounded bg-white "
                        >
                            <option value="arithmetic">Arithmetic</option>
                            <option value="geometric">Geometric</option>
                            <option value="fibonacci">Fibonacci</option>
                        </select>
                    </div>

                    {sequenceType !== 'fibonacci' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">First Term</label>
                                <input
                                    type="number"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    className="w-full px-3 py-2 border rounded bg-white "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {sequenceType === 'arithmetic' ? 'Common Difference' : 'Common Ratio'}
                                </label>
                                <input
                                    type="number"
                                    value={difference}
                                    onChange={(e) => setDifference(e.target.value)}
                                    className="w-full px-3 py-2 border rounded bg-white "
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Number of Terms</label>
                        <input
                            type="number"
                            value={terms}
                            onChange={(e) => setTerms(e.target.value)}
                            className="w-full px-3 py-2 border rounded bg-white "
                        />
                    </div>

                    <button
                        onClick={calculateSequence}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Generate Sequence
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-white  rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">{result.description}</h3>

                    <div className="h-[300px] mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={result.sequence}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="index" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="max-h-40 overflow-y-auto p-4 bg-gray-50  rounded-md">
                        {result.sequence.map((item, index) => (
                            <span key={index} className="mr-2 font-mono">
                                {item.value}{index < result.sequence.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
