import React, { useMemo } from 'react';
import RandomPrimeCharts from './RandomPrimeCharts';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import MathTable from '@/components/elements/MathTable';
import ReportCard from '@components/ReportCard';
import { ColumnDef } from '@tanstack/react-table';

interface ModSums {
  mod0: number;
  mod1: number;
  mod2: number;
}

interface Summary {
  primesGenerated: number;
  primesDropped: number;
  percentageDropped: number;
  modSums?: ModSums;
  alternationBreaks?: unknown[];
}

interface ReportData {
  label: string;
  value: number | string;
  highlight?: boolean;
  color?: string;
}

interface TableData {
  0: number;
  1: number;
  2: number;
  3: number;
  4: boolean;
}

interface RandomPrimeReportProps {
  labels: string[];
  dataValues: number[];
  tableData: Record<string, number | string | boolean>[];
  summary: Summary;
  removedZerosCount: number;
  originalCalculations: Array<Array<number | string | boolean>>;
}

const RandomPrimeReport: React.FC<RandomPrimeReportProps> = ({
  labels,
  dataValues,
  tableData,
  summary,
  removedZerosCount,
  originalCalculations
}) => {
  const reportData: ReportData[] = [
    { label: 'Total Primes Generated', value: summary.primesGenerated },
    { label: 'Primes Dropped', value: summary.primesDropped },
    { label: 'Mod 0 Count', value: summary.modSums?.mod0 ?? 'N/A' },
    { label: 'Mod 1 Count', value: summary.modSums?.mod1 ?? 'N/A' },
    { label: 'Mod 2 Count', value: summary.modSums?.mod2 ?? 'N/A' },
    { label: 'Alternation Breaks', value: summary.alternationBreaks?.length ?? 'N/A' },
    { label: 'Zeros Removed', value: removedZerosCount, highlight: true, color: 'red' }
  ];

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: '0', header: 'Prime' },
      {
        accessorKey: '1',
        header: 'Prime Mod 3',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return <span style={{ color: value === 1 ? 'red' : value === 2 ? 'blue' : 'black' }}>{value}</span>;
        }
      },
      { accessorKey: '2', header: 'Gap' },
      {
        accessorKey: '3',
        header: 'Gap Mod 3',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return <span style={{ color: value === 1 ? 'red' : value === 2 ? 'blue' : 'black' }}>{value}</span>;
        }
      },
      { accessorKey: '4', header: 'Is Alternating' },
    ],
    []
  );

  return (
    <>
      <ReportCard title="Analysis Report" data={reportData} />
      <RandomPrimeCharts labels={labels} dataValues={dataValues} modSums={summary.modSums} />
      <MathTable columns={tableColumns} data={tableData} />
      <h3>Original Prime Calculations (Including Zeros)</h3>
      <MathTable columns={tableColumns} data={originalCalculations} />
      <MathJaxContext>
        <MathJax>
          {`\\[
            \\text{Total Primes Generated: } ${summary.primesGenerated} \\\\
            \\text{Primes Dropped: } ${summary.primesDropped} \\\\
            \\text{Percentage Dropped: } ${summary.percentageDropped.toFixed(2)}\\% \\\\
            \\text{Mod 0 Count: } ${summary.modSums ? summary.modSums.mod0 : 'N/A'} \\\\
            \\text{Mod 1 Count: } ${summary.modSums ? summary.modSums.mod1 : 'N/A'} \\\\
            \\text{Mod 2 Count: } ${summary.modSums ? summary.modSums.mod2 : 'N/A'} \\\\
            \\text{Alternation Breaks: } ${summary.alternationBreaks ? summary.alternationBreaks.length : 'N/A'} \\\\
            \\text{Zeros Removed: } ${removedZerosCount}
          \\]`}
        </MathJax>
      </MathJaxContext>
    </>
  );
};

export default RandomPrimeReport;
