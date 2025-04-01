"use client";

import React, { useState } from 'react';

export const FactorialCalculator = () => {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState('');

    const calculateFactorial = (n: number): number => {
        return n <= 1 ? 1 : n * calculateFactorial(n - 1);
    };

    const handleCalculate = () => {
        const num = parseInt(number);
        if (isNaN(num) || num < 0) {
            setError('Please enter a valid non-negative integer');
            return;
        }
        setResult(calculateFactorial(num));
        setError('');
    };

    return (
        <div className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-xl font-semibold">Factorial Calculator</h2>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a non-negative integer"
                className="border rounded p-2"
            />
            <button
                onClick={handleCalculate}
                className="bg-blue-500 text-white rounded p-2"
            >
                Calculate
            </button>
            {result !== null && <p>Factorial: {result}</p>}
        </div>
    );
};
