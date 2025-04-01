import React, { useState } from 'react';
import './styles.css'; // Importing styles for the tool

const PythagoreanTool = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
const [c, setC] = useState<number | null>(null);

    const calculateHypotenuse = () => {
        const hypotenuse = Math.sqrt(a * a + b * b);
setC(hypotenuse);
        // Reset the input fields after calculation
        setA(0);
        setB(0);
    };

    return (
<div className="pythagorean-tool p-4 text-center">
            <h1>Pythagorean Theorem Calculator</h1>
            <div>
                <label>Side A:</label>
                <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
            </div>
            <div>
                <label>Side B:</label>
                <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
            </div>
            <button onClick={calculateHypotenuse}>Calculate Hypotenuse</button>
            {c !== null && <h2>Hypotenuse: {c}</h2>}
        </div>
    );
};

export default PythagoreanTool;
