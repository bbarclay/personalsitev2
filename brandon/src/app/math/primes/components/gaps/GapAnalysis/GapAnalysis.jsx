import React, { useState, useCallback, useEffect } from 'react';
import GapCharts from './GapCharts';
import { generatePrimes } from '../RandomPrimeGeneration/RandomPrimeUtils';
import { gapAnalysis } from './GapUtils';
import { Section } from '@components/layout/Section';
import MathButton from '@components/elements/MathButton';
import MathInput from '@components/elements/MathInput';
import MathTable from '@components/elements/MathTable';

const GapAnalysis = () => {
  const [startPrime, setStartPrime] = useState(5);
  const [endLimit, setEndLimit] = useState(100);
  const [numberOfStartingPrimes, setNumberOfStartingPrimes] = useState(3);
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleGenerateData = useCallback(() => {
    setLoading(true);
    const primes = generatePrimes(startPrime, endLimit);
    const gapAnalysisResults = gapAnalysis(primes, numberOfStartingPrimes);

    const dynamicLabels = gapAnalysisResults.flatMap(results => results.map(item => `${item[0]}-${item[1]}`));
    const dynamicDataValues = gapAnalysisResults.flatMap(results => results.map(item => item[2]));
    const dynamicTableData = gapAnalysisResults.flatMap(results => results.map(item => ({
      0: item[0],
      1: item[1],
      2: item[2],
      3: item[3],
    })));

    setLabels(dynamicLabels);
    setDataValues(dynamicDataValues);
    setTableData(dynamicTableData);
    setAnalysis({ analyzed: dynamicTableData.length });
    setLoading(false);
  }, [startPrime, endLimit, numberOfStartingPrimes]);

  useEffect(() => {
    handleGenerateData();
  }, [handleGenerateData]);

  const tableColumns = React.useMemo(
    () => [
      { Header: 'Prime 1', accessor: '0' },
      { Header: 'Prime 2', accessor: '1' },
      { Header: 'Gap', accessor: '2' },
      {
        Header: 'Gap Mod 3', accessor: '3',
        Cell: ({ value }) => (
          <span className={value === 1 ? 'text-red-500' : value === 2 ? 'text-blue-500' : 'text-black'}>{value}</span>
        )
      },
    ],
    []
  );

  return (
    <Section>
      <div className="mt-4">
        <div className="mb-4" data-aos="fade-in">
          <form className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MathInput
                controlId="startPrime"
                label="Start Prime"
                type="number"
                value={startPrime}
                onChange={(e) => setStartPrime(Number(e.target.value))}
              />
              <MathInput
                controlId="endLimit"
                label="End Limit"
                type="number"
                value={endLimit}
                onChange={(e) => setEndLimit(Number(e.target.value))}
              />
              <MathInput
                controlId="numberOfStartingPrimes"
                label="Number of Starting Primes"
                type="number"
                value={numberOfStartingPrimes}
                onChange={(e) => setNumberOfStartingPrimes(Number(e.target.value))}
              />
              <div className="flex items-end">
                <MathButton variant="primary" onClick={handleGenerateData}>
                  Generate Data
                </MathButton>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-4" data-aos="fade-in">
          <h2 className="text-lg font-semibold">Analysis Report</h2>
          <p><strong>Gap Counts:</strong> {analysis.analyzed}</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <>
            <GapCharts labels={labels} dataValues={dataValues} data-aos="fade-in" />
            <MathTable columns={tableColumns} data={tableData} />
          </>
        )}
      </div>
    </Section>
  );
};

export default GapAnalysis;
