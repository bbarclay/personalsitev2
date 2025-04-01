import React, { useMemo } from 'react';
import TwinPrimeCharts from './TwinPrimeCharts';
import MathTable from '@components/elements/MathTable';
import ReportCard from '@components/ReportCard';
import { ColumnDef } from '@tanstack/react-table';

type ExtendedColumn<T> = ColumnDef<T>;

interface Analysis {
  analyzed: number;
  mod0: number;
  mod1: number;
  mod2: number;
}

interface TwinPrimeReportProps {
  labels: string[];
  dataValues: number[];
  tableData: { [key: string]: number | string | boolean }[];
  analysis: Analysis;
}

const TwinPrimeReport: React.FC<TwinPrimeReportProps> = ({
  labels,
  dataValues,
  tableData,
  analysis
}) => {
  const reportData = [
    { label: 'Gap Counts', value: analysis.analyzed },
    { label: 'Mod 3 = 0 Counts', value: analysis.mod0 },
    { label: 'Mod 3 = 1 Counts', value: analysis.mod1 },
    { label: 'Mod 3 = 2 Counts', value: analysis.mod2 },
  ];

  const tableColumns = useMemo<ExtendedColumn<object>[]>(
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
      <TwinPrimeCharts labels={labels} dataValues={dataValues} />
      <MathTable columns={tableColumns} data={tableData} />
    </>
  );
};

export default TwinPrimeReport;
