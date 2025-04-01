import React, { useState, useEffect, useRef } from 'react';

const ConjugateGradientDemo = () => {
    const [matrixSize, setMatrixSize] = useState(3);
    const [matrixA, setMatrixA] = useState([]);
    const [vectorB, setVectorB] = useState([]);
    const [iterations, setIterations] = useState([]);
    const [currentIteration, setCurrentIteration] = useState(0);
    const [tolerance, setTolerance] = useState(1e-6);
    const [maxIterations, setMaxIterations] = useState(100);
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(500);
    const timerRef = useRef(null);

    // Initialize matrices
    useEffect(() => {
        resetMatrix();
    }, [matrixSize]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const resetMatrix = () => {
        // Create a random symmetric positive-definite matrix
        const newA = Array(matrixSize).fill().map(() =>
            Array(matrixSize).fill(0)
        );

        // Fill with random values and ensure symmetry
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j <= i; j++) {
                const value = Math.floor(Math.random() * 10);
                newA[i][j] = value;
                newA[j][i] = value;
            }
            // Add to diagonal to ensure positive-definiteness
            newA[i][i] += matrixSize;
        }

        const newB = Array(matrixSize).fill().map(() => Math.floor(Math.random() * 10));

        setMatrixA(newA);
        setVectorB(newB);
        setIterations([]);
        setCurrentIteration(0);
        setError(null);

        if (timerRef.current) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const handleMatrixChange = (i, j, value) => {
        const newMatrix = [...matrixA];
        const numValue = value === '' ? '' : Number(value);
        newMatrix[i][j] = numValue;

        // Ensure symmetry
        if (i !== j) {
            newMatrix[j][i] = numValue;
        }

        setMatrixA(newMatrix);
    };

    const handleVectorChange = (i, value) => {
        const newVector = [...vectorB];
        newVector[i] = value === '' ? '' : Number(value);
        setVectorB(newVector);
    };

    const vectorDot = (a, b) => {
        return a.reduce((sum, val, idx) => sum + val * b[idx], 0);
    };

    const matrixVectorMultiply = (A, x) => {
        return A.map(row => vectorDot(row, x));
    };

    const vectorSubtract = (a, b) => {
        return a.map((val, idx) => val - b[idx]);
    };

    const vectorAdd = (a, b) => {
        return a.map((val, idx) => val + b[idx]);
    };

    const vectorScale = (a, scalar) => {
        return a.map(val => val * scalar);
    };

    const vectorNorm = (v) => {
        return Math.sqrt(vectorDot(v, v));
    };

    const runConjugateGradient = () => {
        try {
            // Check if matrix is symmetric
            for (let i = 0; i < matrixSize; i++) {
                for (let j = 0; j < matrixSize; j++) {
                    if (Math.abs(matrixA[i][j] - matrixA[j][i]) > 1e-10) {
                        throw new Error("Matrix must be symmetric for Conjugate Gradient method.");
                    }
                }
            }

            // Initial values
            const x = Array(matrixSize).fill(0);
            const r = [...vectorB]; // Initial residual = b - A*x0, but x0 = 0
            const p = [...r]; // Initial search direction
            const rNormSq = vectorDot(r, r);

            // Collection of iterations
            const newIterations = [{
                iteration: 0,
                x: [...x],
                r: [...r],
                p: [...p],
                rNorm: Math.sqrt(rNormSq),
                description: "Initial state with x = 0"
            }];

            // Run the algorithm
            let k = 0;
            let rNormSqOld = rNormSq;
            let xCurrent = [...x];
            let rCurrent = [...r];
            let pCurrent = [...p];

            while (k < maxIterations) {
                // Step 1: Compute A*p
                const Ap = matrixVectorMultiply(matrixA, pCurrent);

                // Step 2: Compute step length alpha
                const pAp = vectorDot(pCurrent, Ap);
                if (Math.abs(pAp) < 1e-14) {
                    throw new Error("Division by near-zero value detected.");
                }
                const alpha = rNormSqOld / pAp;

                // Step 3: Update x
                const xNew = vectorAdd(xCurrent, vectorScale(pCurrent, alpha));

                // Step 4: Update residual
                const rNew = vectorSubtract(rCurrent, vectorScale(Ap, alpha));

                // Step 5: Compute new residual norm
                const rNormSqNew = vectorDot(rNew, rNew);
                const rNormNew = Math.sqrt(rNormSqNew);

                // Add this iteration to our list
                k++;
                newIterations.push({
                    iteration: k,
                    x: [...xNew],
                    r: [...rNew],
                    p: [...pCurrent],
                    alpha,
                    rNorm: rNormNew,
                    description: `Iteration ${k}`
                });

                // Check for convergence
                if (rNormNew < tolerance) {
                    newIterations[newIterations.length - 1].description += " (Converged)";
                    break;
                }

                // Compute beta
                const beta = rNormSqNew / rNormSqOld;

                // Update search direction
                const pNew = vectorAdd(rNew, vectorScale(pCurrent, beta));

                // Update for next iteration
                xCurrent = xNew;
                rCurrent = rNew;
                pCurrent = pNew;
                rNormSqOld = rNormSqNew;

                // Add beta and new search direction to current iteration
                newIterations[newIterations.length - 1].beta = beta;
                newIterations[newIterations.length - 1].nextP = [...pNew];
            }

            setIterations(newIterations);
            setCurrentIteration(0);
            setError(null);

        } catch (err) {
            setError(err.message);
        }
    };

    const startAnimation = () => {
        if (iterations.length > 0 && currentIteration < iterations.length - 1) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setCurrentIteration(prev => {
                    if (prev >= iterations.length - 1) {
                        clearInterval(timerRef.current);
                        setIsRunning(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
        }
    };

    const stopAnimation = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const nextIteration = () => {
        if (currentIteration < iterations.length - 1) {
            setCurrentIteration(currentIteration + 1);
        }
    };

    const prevIteration = () => {
        if (currentIteration > 0) {
            setCurrentIteration(currentIteration - 1);
        }
    };

    const formatVector = (vector) => {
        if (!vector) return "";
        return "[" + vector.map(v => v.toFixed(4)).join(", ") + "]";
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Conjugate Gradient Method Demonstration</h2>

            <div className="mb-4">
                <label className="block mb-2">Matrix Size:</label>
                <select
                    value={matrixSize}
                    onChange={(e) => setMatrixSize(Number(e.target.value))}
                    className="p-2 border rounded dark:bg-gray-700"
                >
                    {[2, 3, 4].map(size => (
                        <option key={size} value={size}>{size}×{size}</option>
                    ))}
                </select>
                <button
                    onClick={resetMatrix}
                    className="ml-2 px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded"
                >
                    Reset
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <h3 className="font-medium mb-2">Matrix A (Symmetric):</h3>
                    <table className="border-collapse mx-auto">
                        <tbody>
                            {matrixA.map((row, i) => (
                                <tr key={i}>
                                    {row.map((val, j) => (
                                        <td key={j} className="p-1">
                                            <input
                                                type="number"
                                                value={val}
                                                onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                                                className="w-12 p-1 border text-center dark:bg-gray-700"
                                                disabled={i < j} // Only allow editing the lower triangle
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-center mt-1">Note: Only lower triangle is editable (symmetry is enforced)</p>
                </div>

                <div>
                    <h3 className="font-medium mb-2">Vector b:</h3>
                    <table className="border-collapse mx-auto">
                        <tbody>
                            {vectorB.map((val, i) => (
                                <tr key={i}>
                                    <td className="p-1">
                                        <input
                                            type="number"
                                            value={val}
                                            onChange={(e) => handleVectorChange(i, e.target.value)}
                                            className="w-12 p-1 border text-center dark:bg-gray-700"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Convergence Settings:</label>
                <div className="flex flex-wrap gap-4">
                    <div>
                        <span className="text-sm">Tolerance:</span>
                        <input
                            type="number"
                            value={tolerance}
                            onChange={(e) => setTolerance(Number(e.target.value))}
                            className="ml-2 w-24 p-1 border dark:bg-gray-700"
                            step="0.000001"
                            min="0.000001"
                            max="0.1"
                        />
                    </div>
                    <div>
                        <span className="text-sm">Max Iterations:</span>
                        <input
                            type="number"
                            value={maxIterations}
                            onChange={(e) => setMaxIterations(Number(e.target.value))}
                            className="ml-2 w-16 p-1 border dark:bg-gray-700"
                            min="1"
                            max="1000"
                        />
                    </div>
                    <div>
                        <span className="text-sm">Animation Speed (ms):</span>
                        <input
                            type="number"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="ml-2 w-16 p-1 border dark:bg-gray-700"
                            min="100"
                            max="2000"
                            step="100"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4 text-center">
                <button
                    onClick={runConjugateGradient}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                    Run Algorithm
                </button>
                {iterations.length > 0 && (
                    <>
                        <button
                            onClick={isRunning ? stopAnimation : startAnimation}
                            className={`px-4 py-2 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded`}
                        >
                            {isRunning ? 'Stop' : 'Animate'}
                        </button>
                    </>
                )}
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {iterations.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-medium mb-2">Iteration {currentIteration} of {iterations.length - 1}:</h3>
                    <p className="mb-2">{iterations[currentIteration].description}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div className="border p-3 rounded">
                            <h4 className="font-medium">Current Solution x:</h4>
                            <p className="my-2 font-mono">{formatVector(iterations[currentIteration].x)}</p>

                            <h4 className="font-medium mt-3">Residual r = b - Ax:</h4>
                            <p className="my-2 font-mono">{formatVector(iterations[currentIteration].r)}</p>
                            <p className="text-sm">Residual Norm: {iterations[currentIteration].rNorm.toFixed(6)}</p>
                        </div>

                        <div className="border p-3 rounded">
                            <h4 className="font-medium">Search Direction p:</h4>
                            <p className="my-2 font-mono">{formatVector(iterations[currentIteration].p)}</p>

                            {currentIteration > 0 && (
                                <>
                                    <h4 className="font-medium mt-3">Step Length α:</h4>
                                    <p className="my-1">{iterations[currentIteration].alpha.toFixed(6)}</p>

                                    {iterations[currentIteration].beta !== undefined && (
                                        <>
                                            <h4 className="font-medium mt-3">Direction Update β:</h4>
                                            <p className="my-1">{iterations[currentIteration].beta.toFixed(6)}</p>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            onClick={prevIteration}
                            disabled={currentIteration === 0}
                            className={`px-3 py-1 rounded ${currentIteration === 0 ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextIteration}
                            disabled={currentIteration === iterations.length - 1}
                            className={`px-3 py-1 rounded ${currentIteration === iterations.length - 1 ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {iterations.length > 0 && currentIteration === iterations.length - 1 && iterations[currentIteration].description.includes("Converged") && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    <h3 className="font-medium mb-2">Algorithm Converged!</h3>
                    <p>Final solution after {iterations.length - 1} iterations:</p>
                    <div className="font-mono mt-2">
                        x = {formatVector(iterations[currentIteration].x)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConjugateGradientDemo;
