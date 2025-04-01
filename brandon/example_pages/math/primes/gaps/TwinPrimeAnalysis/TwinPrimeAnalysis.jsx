import React, { useState, useEffect } from 'react';
import { findTwinPrimes, analyzeTwinPrimes } from './TwinPrimeUtils';
import MathButton from '@components/elements/MathButton';
import MathInput from '@components/elements/MathInput';
import TwinPrimeReport from './TwinPrimeReport';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TwinPrimeAnalysis = () => {
  const [startPrime, setStartPrime] = useState(5);
  const [endLimit, setEndLimit] = useState(100);
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [analysis, setAnalysis] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    setHydrated(true);
  }, []);

  const handleGenerateData = () => {
    setLoading(true);
    const twinPrimes = findTwinPrimes(startPrime, endLimit);
    const twinPrimeAnalysis = analyzeTwinPrimes(twinPrimes);

    const dynamicLabels = twinPrimeAnalysis.result.map(item => `${item[0]}`);
    const dynamicDataValues = twinPrimeAnalysis.result.map(item => item[2]);
    const dynamicTableData = twinPrimeAnalysis.result.map(item => ({
      0: item[0],
      1: item[1],
      2: item[2],
      3: item[3],
      4: item[4],
    }));

    setLabels(dynamicLabels);
    setDataValues(dynamicDataValues);
    setTableData(dynamicTableData);
    setAnalysis(twinPrimeAnalysis.totals);
    setLoading(false);
  };

  const handleEnterPress = () => {
    handleGenerateData();
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="container mx-auto mt-4">
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <MathInput
                controlId="startPrime"
                label="Start Prime"
                type="number"
                value={startPrime}
                onChange={(e) => setStartPrime(Number(e.target.value))}
                onEnterPress={handleEnterPress}
                aos="fade-in"
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <MathInput
                controlId="endLimit"
                label="End Limit"
                type="number"
                value={endLimit}
                onChange={(e) => setEndLimit(Number(e.target.value))}
                onEnterPress={handleEnterPress}
                aos="fade-in"
              />
            </div>
            <div className="w-full md:w-1/3 px-2 flex items-end">
              <MathButton
                onClick={handleGenerateData}
                aos="fade-up"
                className="w-full bg-blue-500 text-white uppercase text-center border border-blue-500 py-3 text-lg"
              >
                Generate Data
              </MathButton>
            </div>
          </div>
          <TwinPrimeReport
            labels={labels}
            dataValues={dataValues}
            tableData={tableData}
            analysis={analysis}
          />
        </>
      )}
    </div>
  );
};

export default TwinPrimeAnalysis;
