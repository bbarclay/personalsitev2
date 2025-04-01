import React from 'react';
import { Line } from 'react-chartjs-2';

const Visualization = ({ a, b }: { a: number; b: number }) => {
    const data = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                label: 'Triangle Sides',
                data: [a, b, Math.sqrt(a * a + b * b)],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Triangle Visualization</h2>
            <Line data={data} />
        </div>
    );
};

export default Visualization;
