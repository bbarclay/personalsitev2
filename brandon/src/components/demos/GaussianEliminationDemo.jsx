import React, { useState, useEffect } from 'react';

const GaussianEliminationDemo = () => {
    const [matrixSize, setMatrixSize] = useState(3);
    const [matrixA, setMatrixA] = useState([]);
    const [vectorB, setVectorB] = useState([]);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [solution, setSolution] = useState(null);
    const [error, setError] = useState(null);

    // Initialize matrices
    useEffect(() => {
        resetMatrix();
    }, [matrixSize]);

    const resetMatrix = () => {
        // Create a random matrix and vector
        const newA = Array(matrixSize).fill().map(() =>
            Array(matrixSize).fill().map(() => Math.floor(Math.random() * 10) - 3)
        );
        const newB = Array(matrixSize).fill().map(() => Math.floor(Math.random() * 10) - 3);

        setMatrixA(newA);
        setVectorB(newB);
        setSteps([]);
        setCurrentStep(0);
        setSolution(null);
        setError(null);
    };

    const handleMatrixChange = (i, j, value) => {
        const newMatrix = [...matrixA];
        newMatrix[i][j] = value === '' ? '' : Number(value);
        setMatrixA(newMatrix);
    };

    const handleVectorChange = (i, value) => {
        const newVector = [...vectorB];
        newVector[i] = value === '' ? '' : Number(value);
        setVectorB(newVector);
    };

    const solveSystem = () => {
        try {
            // Create deep copies to avoid modifying the original
            const A = matrixA.map(row => [...row]);
            const b = [...vectorB];
            const n = A.length;

            // Initialize the steps array with the starting state
            const newSteps = [{
                A: A.map(row => [...row]),
                b: [...b],
                description: "Initial augmented matrix"
            }];

            // Forward elimination
            for (let k = 0; k < n - 1; k++) {
                // Find pivot (simplified, without partial pivoting)
                if (Math.abs(A[k][k]) < 1e-10) {
                    throw new Error("Zero pivot encountered. Try a different matrix.");
                }

                for (let i = k + 1; i < n; i++) {
                    const factor = A[i][k] / A[k][k];

                    // Update the row
                    for (let j = k; j < n; j++) {
                        A[i][j] -= factor * A[k][j];
                    }
                    b[i] -= factor * b[k];

                    // Add this step to our steps array
                    newSteps.push({
                        A: A.map(row => [...row]),
                        b: [...b],
                        description: `Eliminated element at position (${i + 1},${k + 1})`
                    });
                }
            }

            // Back substitution
            const x = new Array(n).fill(0);
            for (let i = n - 1; i >= 0; i--) {
                let sum = 0;
                for (let j = i + 1; j < n; j++) {
                    sum += A[i][j] * x[j];
                }
                x[i] = (b[i] - sum) / A[i][i];
            }

            // Add final step with solution
            newSteps.push({
                A: A.map(row => [...row]),
                b: [...b],
                description: "Upper triangular form - ready for back substitution",
                solution: [...x]
            });

            setSteps(newSteps);
            setCurrentStep(0);
            setSolution(x);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const displayAugmentedMatrix = (A, b) => {
        return (
            <table className="border-collapse mx-auto my-4">
                <tbody>
                    {A.map((row, i) => (
                        <tr key={i}>
                            {row.map((val, j) => (
                                <td key={j} className="border px-2 py-1 text-center">
                                    {val.toFixed(2)}
                                </td>
                            ))}
                            <td className="px-2 py-1 text-center">|</td>
                            <td className="border px-2 py-1 text-center">
                                {b[i].toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Gaussian Elimination Demonstration</h2>

            <div className="mb-4">
                <label className="block mb-2">Matrix Size:</label>
                <select
                    value={matrixSize}
                    onChange={(e) => setMatrixSize(Number(e.target.value))}
                    className="p-2 border rounded"
                >
                    {[2, 3, 4].map(size => (
                        <option key={size} value={size}>{size}×{size}</option>
                    ))}
                </select>
                <button
                    onClick={resetMatrix}
                    className="ml-2 px-3 py-1 bg-gray-200 rounded"
                >
                    Reset
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <h3 className="font-medium mb-2">Matrix A:</h3>
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
                                                className="w-12 p-1 border text-center"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                            className="w-12 p-1 border text-center"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-4 text-center">
                <button
                    onClick={solveSystem}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Solve
                </button>
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {steps.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-medium mb-2">Step {currentStep + 1} of {steps.length}:</h3>
                    <p className="mb-2">{steps[currentStep].description}</p>
                    {displayAugmentedMatrix(steps[currentStep].A, steps[currentStep].b)}

                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`px-3 py-1 rounded ${currentStep === 0 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={currentStep === steps.length - 1}
                            className={`px-3 py-1 rounded ${currentStep === steps.length - 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {solution && currentStep === steps.length - 1 && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
                    <h3 className="font-medium mb-2">Solution:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {solution.map((val, i) => (
                            <div key={i} className="text-center">
                                x<sub>{i + 1}</sub> = {val.toFixed(4)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaussianEliminationDemo;
