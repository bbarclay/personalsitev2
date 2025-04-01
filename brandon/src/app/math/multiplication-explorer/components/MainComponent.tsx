"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface TableCell {
  multiplicand: number;
  multiplier: number;
  product: number;
}

type TableRow = TableCell[];
type MultiplicationTable = TableRow[];

export const MultiplicationExplorer = () => {
  const [tableSize, setTableSize] = useState(10);
  const [highlightNumber, setHighlightNumber] = useState<number | null>(null);

  const getColorIntensity = (num: number) => {
    // Create a color gradient based on the product value
    const maxProduct = tableSize * tableSize;
    const intensity = Math.floor((num / maxProduct) * 255);
    return `rgb(${intensity}, ${Math.max(0, intensity - 50)}, ${Math.max(0, intensity - 100)})`;
  };

  const generateTable = (): MultiplicationTable => {
    const table: MultiplicationTable = [];
    for (let i = 1; i <= tableSize; i++) {
      const row: TableRow = [];
      for (let j = 1; j <= tableSize; j++) {
        const product = i * j;
        row.push({
          multiplicand: i,
          multiplier: j,
          product: product
        });
      }
      table.push(row);
    }
    return table;
  };

  const isHighlighted = (cell: TableCell): boolean => {
    if (!highlightNumber) return false;
    return cell.multiplicand === highlightNumber ||
      cell.multiplier === highlightNumber ||
      cell.product === highlightNumber;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Multiplication Table Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Table Size: {tableSize} x {tableSize}
            </label>
            <Slider
              value={[tableSize]}
              onValueChange={(values) => setTableSize(values[0])}
              min={1}
              max={12}
              step={1}
              className="w-full"
            />
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${tableSize + 1}, minmax(40px, 1fr))`
                  }}>
                  {/* Header row */}
                  <div className="flex items-center justify-center h-10 font-bold">×</div>
                  {Array.from({ length: tableSize }, (_, i) => (
                    <div
                      key={`header-${i + 1}`}
                      className="flex items-center justify-center h-10 font-bold"
                      onMouseEnter={() => setHighlightNumber(i + 1)}
                      onMouseLeave={() => setHighlightNumber(null)}
                    >
                      {i + 1}
                    </div>
                  ))}

                  {/* Table body */}
                  {generateTable().map((row, i) => (
                    <React.Fragment key={`row-${i}`}>
                      <div
                        className="flex items-center justify-center h-10 font-bold"
                        onMouseEnter={() => setHighlightNumber(i + 1)}
                        onMouseLeave={() => setHighlightNumber(null)}
                      >
                        {i + 1}
                      </div>
                      {row.map((cell, j) => (
                        <div
                          key={`cell-${i}-${j}`}
                          className={`flex items-center justify-center h-10 transition-all duration-200
                            ${isHighlighted(cell) ? 'scale-110 z-10 font-bold' : ''}
                          `}
                          style={{
                            backgroundColor: getColorIntensity(cell.product),
                            color: cell.product > (tableSize * tableSize) / 2 ? 'white' : 'black'
                          }}
                          onMouseEnter={() => setHighlightNumber(cell.product)}
                          onMouseLeave={() => setHighlightNumber(null)}
                        >
                          {cell.product}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50  rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Adjust the slider to change the table size</li>
              <li>Hover over numbers to highlight patterns</li>
              <li>Colors get darker as products get larger</li>
              <li>Notice how patterns form in rows, columns, and diagonals</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiplicationExplorer;
