import React from 'react';
// import RandomPrimeTable from './RandomPrimeTable';
// import RandomPrimeCharts from './RandomPrimeCharts';
import RandomPrimeExplanation from './RandomPrimeExplanation';
import './RandomPrimeGeneration.css';

const RandomPrimeGeneration = () => {
    return (
        <div className="random-prime-generation">
            <RandomPrimeExplanation />
            {/* <RandomPrimeTable /> */}
            {/* <RandomPrimeCharts /> */}
        </div>
    );
}

export default RandomPrimeGeneration;
