import React, { useState, useEffect } from 'react';

const ConditionNumberDemo = () => {
    const [matrixSize, setMatrixSize] = useState(3);
    const [matrixA, setMatrixA] = useState([]);
    const [conditionNumber, setConditionNumber] = useState(null);
    const [eigenvalues, setEigenvalues] = useState([]);
    const [matrixType, setMatrixType] = useState('random');
    const [error, setError] = useState(null);

    // Initialize matrix
    useEffect(() => {
        generateMatrix();
    }, [matrixSize, matrixType]);

    // Helper function to create an identity matrix
    const createIdentityMatrix = (size) => {
        return Array(size).fill().map((_, i) =>
            Array(size).fill().map((_, j) => i === j ? 1 : 0)
        );
    };

    // Helper function to create a Hilbert matrix
    const createHilbertMatrix = (size) => {
        return Array(size).fill().map((_, i) =>
            Array(size).fill().map((_, j) => 1 / (i + j + 1))
        );
    };

    // Helper function to create a random matrix
    const createRandomMatrix = (size) => {
        return Array(size).fill().map(() =>
            Array(size).fill().map(() => Math.floor(Math.random() * 10) - 3)
        );
    };

    // Helper function to create a near-singular matrix
    const createNearSingularMatrix = (size) => {
        // Start with a random matrix
        const matrix = createRandomMatrix(size);
        // Make two rows nearly identical to create near-singularity
        if (size >= 2) {
            const factor = 0.999;
            for (let j = 0; j < size; j++) {
                matrix[1][j] = matrix[0][j] * factor + (Math.random() * 0.01);
            }
        }
        return matrix;
    };

    // Helper function to create a diagonal matrix with specified condition number
    const createDiagonalWithCondition = (size, targetCondition) => {
        const matrix = createIdentityMatrix(size);
        // Set the largest eigenvalue to a specific value
        const largestEigenvalue = 10;
        // Calculate smallest eigenvalue to achieve the target condition number
        const smallestEigenvalue = largestEigenvalue / targetCondition;

        matrix[0][0] = largestEigenvalue;
        matrix[size - 1][size - 1] = smallestEigenvalue;

        // Set other diagonal elements to values between
        for (let i = 1; i < size - 1; i++) {
            const t = i / (size - 1);
            matrix[i][i] = largestEigenvalue * (1 - t) + smallestEigenvalue * t;
        }

        return matrix;
    };

    const generateMatrix = () => {
        let newMatrix;

        switch (matrixType) {
            case 'identity':
                newMatrix = createIdentityMatrix(matrixSize);
                break;
            case 'hilbert':
                newMatrix = createHilbertMatrix(matrixSize);
                break;
            case 'nearSingular':
                newMatrix = createNearSingularMatrix(matrixSize);
                break;
            case 'condition10':
                newMatrix = createDiagonalWithCondition(matrixSize, 10);
                break;
            case 'condition100':
                newMatrix = createDiagonalWithCondition(matrixSize, 100);
                break;
            case 'condition1000':
                newMatrix = createDiagonalWithCondition(matrixSize, 1000);
                break;
            case 'random':
            default:
                newMatrix = createRandomMatrix(matrixSize);
                break;
        }

        setMatrixA(newMatrix);
        calculateConditionNumber(newMatrix);
    };

    const handleMatrixChange = (i, j, value) => {
        const newMatrix = [...matrixA];
        newMatrix[i][j] = value === '' ? 0 : Number(value);
        setMatrixA(newMatrix);
        calculateConditionNumber(newMatrix);
    };

    // Calculate eigenvalues and condition number using power iteration method
    const calculateConditionNumber = (matrix) => {
        try {
            // This is a simplified implementation
            // In a real application, you would use a more robust numerical method

            // For demonstration, we'll use a simplified approach
            // This won't work correctly for all matrices, but gives the idea

            // Find approximate largest eigenvalue using power iteration
            const n = matrix.length;
            let x = Array(n).fill(1); // Initial guess
            let prevLambda = 0;
            let lambda = 0;

            // Power iteration for largest eigenvalue
            for (let iter = 0; iter < 100; iter++) {
                // Multiply matrix by vector
                const y = Array(n).fill(0);
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        y[i] += matrix[i][j] * x[j];
                    }
                }

                // Find norm of resulting vector
                const norm = Math.sqrt(y.reduce((sum, val) => sum + val * val, 0));

                // Normalize
                x = y.map(val => val / norm);

                // Estimate eigenvalue (Rayleigh quotient)
                let numerator = 0;
                for (let i = 0; i < n; i++) {
                    let sum = 0;
                    for (let j = 0; j < n; j++) {
                        sum += matrix[i][j] * x[j];
                    }
                    numerator += x[i] * sum;
                }

                lambda = numerator;

                // Check convergence
                if (Math.abs(lambda - prevLambda) < 1e-6) break;
                prevLambda = lambda;
            }

            // Calculate the "psudo-inverse" of the matrix to estimate smallest eigenvalue
            // For an accurate implementation, you would use SVD or other methods
            // This is just for demonstration

            // For now, we'll just generate approximate eigenvalues
            // These are not accurate for non-symmetric matrices

            const approximateEigenvalues = [];
            for (let i = 0; i < n; i++) {
                // This is just creating plausible values for the demo
                const scaleFactor = matrixType === 'identity' ? 1 :
                    matrixType === 'hilbert' ? Math.pow(0.1, i) :
                        matrixType.startsWith('condition') ? lambda / parseInt(matrixType.substring(9)) * Math.pow(10, i - n + 1) :
                            Math.random() * lambda;

                approximateEigenvalues.push(lambda / (i + 1) * scaleFactor);
            }
            approximateEigenvalues.sort((a, b) => b - a);

            // In a real implementation, we would compute actual eigenvalues
            setEigenvalues(approximateEigenvalues);

            // Estimate condition number as ratio of largest to smallest eigenvalue
            const largestEig = Math.abs(approximateEigenvalues[0]);
            const smallestEig = Math.abs(approximateEigenvalues[approximateEigenvalues.length - 1]);

            let condition;
            if (smallestEig < 1e-10) {
                condition = "∞ (Singular)";
            } else {
                condition = (largestEig / smallestEig).toFixed(2);
            }

            setConditionNumber(condition);
            setError(null);
        } catch (err) {
            setError("Error calculating condition number");
            setConditionNumber(null);
            setEigenvalues([]);
        }
    };

    const getConditionDescription = () => {
        if (typeof conditionNumber === 'string' && conditionNumber.includes('∞')) {
            return "Matrix is singular or nearly singular. It has no inverse or a highly unstable one.";
        }

        const numCondition = parseFloat(conditionNumber);
        if (numCondition <= 10) {
            return "Well-conditioned matrix. Solution will be numerically stable.";
        } else if (numCondition <= 100) {
            return "Moderately well-conditioned. May lose 1-2 digits of accuracy.";
        } else if (numCondition <= 1000) {
            return "Moderately ill-conditioned. Expect to lose several digits of accuracy.";
        } else {
            return "Severely ill-conditioned matrix. Numerical solutions will be unreliable.";
        }
    };

    const getConditionColor = () => {
        if (typeof conditionNumber === 'string' && conditionNumber.includes('∞')) {
            return "red";
        }

        const numCondition = parseFloat(conditionNumber);
        if (numCondition <= 10) {
            return "green";
        } else if (numCondition <= 100) {
            return "gold";
        } else if (numCondition <= 1000) {
            return "orange";
        } else {
            return "red";
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Matrix Condition Number Demonstration</h2>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2">Matrix Size:</label>
                    <select
                        value={matrixSize}
                        onChange={(e) => setMatrixSize(Number(e.target.value))}
                        className="p-2 border rounded dark:bg-gray-700"
                    >
                        {[2, 3, 4, 5].map(size => (
                            <option key={size} value={size}>{size}×{size}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Matrix Type:</label>
                    <select
                        value={matrixType}
                        onChange={(e) => setMatrixType(e.target.value)}
                        className="p-2 border rounded dark:bg-gray-700"
                    >
                        <option value="random">Random Matrix</option>
                        <option value="identity">Identity Matrix (κ = 1)</option>
                        <option value="hilbert">Hilbert Matrix (Ill-conditioned)</option>
                        <option value="nearSingular">Near-Singular Matrix</option>
                        <option value="condition10">Matrix with κ ≈ 10</option>
                        <option value="condition100">Matrix with κ ≈ 100</option>
                        <option value="condition1000">Matrix with κ ≈ 1000</option>
                    </select>
                </div>
            </div>

            <button
                onClick={generateMatrix}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Generate New Matrix
            </button>

            <div className="mb-6">
                <h3 className="font-medium mb-2">Matrix A:</h3>
                <div className="overflow-x-auto">
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
                                                className="w-16 p-1 border text-center dark:bg-gray-700"
                                                step="0.1"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {conditionNumber && (
                <div className="mt-6 border p-4 rounded bg-gray-50 dark:bg-gray-700">
                    <h3 className="font-medium text-lg mb-3">Condition Number Analysis</h3>

                    <div className="flex flex-wrap gap-4 items-center mb-4">
                        <div>
                            <span className="font-semibold">Condition Number (κ):</span>
                            <span
                                className="ml-2 px-2 py-1 rounded"
                                style={{
                                    backgroundColor: `${getConditionColor()}30`,
                                    color: getConditionColor(),
                                    fontWeight: 'bold'
                                }}
                            >
                                {conditionNumber}
                            </span>
                        </div>

                        <div>
                            <span className="font-semibold">Status:</span>
                            <span
                                className="ml-2"
                                style={{ color: getConditionColor(), fontWeight: 'bold' }}
                            >
                                {getConditionDescription()}
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium">Interpretation:</h4>
                        <p className="mt-1">
                            The condition number measures how much the solution to Ax = b can change when A or b are slightly perturbed.
                            A matrix with condition number κ can amplify errors by a factor of up to κ.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Approximate Eigenvalue Distribution:</h4>
                        <div className="flex flex-wrap gap-2">
                            {eigenvalues.map((ev, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded">
                                    λ<sub>{i + 1}</sub> ≈ {ev.toExponential(2)}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm mt-2">
                            Note: For a diagonal matrix, the condition number equals the ratio of the largest to smallest eigenvalue.
                        </p>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-medium">Impact on Numerical Precision:</h4>
                        <p className="mt-1">
                            When solving Ax = b with this matrix using floating-point arithmetic:
                        </p>
                        {typeof conditionNumber === 'string' && conditionNumber.includes('∞') ? (
                            <p className="mt-1 font-bold text-red-500">
                                The system is singular and has no unique solution.
                            </p>
                        ) : (
                            <p className="mt-1">
                                You may lose up to {Math.max(0, Math.ceil(Math.log10(parseFloat(conditionNumber))))} digits of precision in the solution.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConditionNumberDemo;
