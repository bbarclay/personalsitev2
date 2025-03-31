"use client";

import React from 'react';

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
}

interface MathTableProps<T> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  emptyMessage?: string;
}

export function MathTable<T>({
  data,
  columns,
  caption,
  emptyMessage = "No data available"
}: MathTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {caption && (
          <caption className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-left">
            {caption}
          </caption>
        )}
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-750">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {column.cell 
                    ? column.cell(row[column.accessorKey], row)
                    : row[column.accessorKey] as React.ReactNode
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 