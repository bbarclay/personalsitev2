import React, { useState, useEffect } from 'react';
import { generateAndAnalyzePrimes } from './RandomPrimeUtils';
import MathButton from '@/components/elements/MathButton';
import MathInput from '@/components/elements/MathInput';
import RandomPrimeReport from './RandomPrimeReport';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Summary {
  primesGenerated: number;
  primesDropped: number;
  percentageDropped: number;
  primesCountInRanges: number[];
  remainingPrimesCountInRanges: number[];
  modSums: {
    total: number;
    mod2: number;
    mod1: number;
    mod0: number;
  };
  alternationBreaks: { index: number; value: number }[];
}

const RandomPrimeAnalysis: React.FC = () => {
  const [startPrime, setStartPrime] = useState<number>(5);
  const [endLimit, setEndLimit] = useState<number>(100);
  const [dropPercentage, setDropPercentage] = useState<number>(0.3);
  const [labels, setLabels] = useState<string[]>([]);
  const [dataValues, setDataValues] = useState<number[]>([]);
  interface TableData {
    [key: string]: number;
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
  }

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [summary, setSummary] = useState<Summary>({} as Summary);
  const [removedZerosCount, setRemovedZerosCount] = useState<number>(0);
  const [originalCalculations, setOriginalCalculations] = useState<number[][]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    setHydrated(true);
  }, []);

  const handleGenerateData = () => {
    setLoading(true);
    const finalData = generateAndAnalyzePrimes(startPrime, endLimit, dropPercentage);

    const dynamicLabels = finalData.testSet.map((item: (string | number)[]) => `${item[0]}`);
    const dynamicDataValues = finalData.testSet.map((item: (string | number)[]) => Number(item[2]));
    const dynamicTableData = finalData.testSet.map((item: (string | number)[]) => ({
      0: Number(item[0]),
      1: Number(item[1]),
      2: Number(item[2]),
      3: Number(item[3]),
      4: Number(item[4]),
    }));

    setLabels(dynamicLabels);
    setDataValues(dynamicDataValues);
    setTableData(dynamicTableData);
    setSummary({
      ...finalData.summary,
      alternationBreaks: finalData.summary.alternationBreaks.map((item: (string | number)[]) => ({
        index: Number(item[0]),
        value: Number(item[1]),
      })),
    });
    setRemovedZerosCount(finalData.removedZerosCount);
    setOriginalCalculations(finalData.originalCalculations.map((arr: (string | number)[]) => arr.filter((item): item is number => typeof item === 'number')));
    setLoading(false);
  };

  const handleEnterPress = () => {
    handleGenerateData();
  };

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <MathInput
              controlId="startPrime"
              label="Start Prime"
              type="number"
              value={startPrime}
              onChange={(e) => setStartPrime(Number(e.target.value))}
              onEnterPress={handleEnterPress}
              aos="fade-in"
            />
            <MathInput
              controlId="endLimit"
              label="End Limit"
              type="number"
              value={endLimit}
              onChange={(e) => setEndLimit(Number(e.target.value))}
              onEnterPress={handleEnterPress}
              aos="fade-in"
            />
            <MathInput
              controlId="dropPercentage"
              label="Drop Percentage"
              type="number"
              step="0.1"
              value={dropPercentage}
              onChange={(e) => setDropPercentage(Number(e.target.value))}
              onEnterPress={handleEnterPress}
              aos="fade-in"
            />
            <div className="flex items-end">
              <MathButton
                onClick={handleGenerateData}
                aos="fade-up"
                className="text-black uppercase text-center border border-blue-500 py-3 px-4 text-lg w-full"
              >
                Generate Data
              </MathButton>
            </div>
          </div>
          <RandomPrimeReport
            labels={labels}
            dataValues={dataValues}
            tableData={tableData}
            summary={summary}
            removedZerosCount={removedZerosCount}
            originalCalculations={originalCalculations}
          />
        </>
      )}
    </div>
  );
};

export default RandomPrimeAnalysis;
