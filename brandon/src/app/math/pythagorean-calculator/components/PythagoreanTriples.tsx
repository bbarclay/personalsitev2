"use client";

import React, { useState, useEffect } from 'react';

interface Triple {
  a: number;
  b: number;
  c: number;
  formula?: string;
  isHighlighted?: boolean;
}

const PythagoreanTriples = () => {
  const [maxValue, setMaxValue] = useState<number>(100);
  const [triples, setTriples] = useState<Triple[]>([]);
  const [selectedTriple, setSelectedTriple] = useState<Triple | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [filterPrimitive, setFilterPrimitive] = useState<boolean>(false);
  
  // Generate Pythagorean triples
  useEffect(() => {
    generateTriples(maxValue);
  }, [maxValue, filterPrimitive]);
  
  const generateTriples = (max: number) => {
    const newTriples: Triple[] = [];
    
    // Method 1: Euclid's formula
    // For integers m > n > 0:
    // a = m² - n², b = 2mn, c = m² + n²
    for (let m = 2; m < Math.sqrt(max); m++) {
      for (let n = 1; n < m; n++) {
        if ((m - n) % 2 === 1 && gcd(m, n) === 1) { // For primitive triples
          const a = m * m - n * n;
          const b = 2 * m * n;
          const c = m * m + n * n;
          
          if (a > max || b > max || c > max) continue;
          
          // Generate primitive triple
          const primitive: Triple = {
            a: Math.min(a, b),
            b: Math.max(a, b),
            c,
            formula: `m=${m}, n=${n}`,
            isHighlighted: true
          };
          
          if (primitive.a <= max && primitive.b <= max && primitive.c <= max) {
            newTriples.push(primitive);
          }
          
          // Generate multiples of primitive triple if not filtering
          if (!filterPrimitive) {
            for (let k = 2; k <= max / c; k++) {
              const multiple: Triple = {
                a: k * Math.min(a, b),
                b: k * Math.max(a, b),
                c: k * c,
                formula: `${k}×(${m},${n})`,
                isHighlighted: false
              };
              
              if (multiple.a <= max && multiple.b <= max && multiple.c <= max) {
                newTriples.push(multiple);
              }
            }
          }
        }
      }
    }
    
    // Sort by c (hypotenuse) value
    newTriples.sort((a, b) => a.c - b.c);
    setTriples(newTriples);
  };
  
  const gcd = (a: number, b: number): number => {
    if (!b) return a;
    return gcd(b, a % b);
  };
  
  const isPrimitive = (a: number, b: number, c: number): boolean => {
    return gcd(gcd(a, b), c) === 1;
  };
  
  const filteredTriples = triples.filter(triple => {
    if (searchValue === '') return true;
    
    const searchNum = parseInt(searchValue);
    if (isNaN(searchNum)) return true;
    
    return triple.a === searchNum || triple.b === searchNum || triple.c === searchNum;
  });
  
  const commonTriplesExamples = [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 },
    { a: 9, b: 40, c: 41 },
    { a: 11, b: 60, c: 61 },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pythagorean Triples Explorer</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">What are Pythagorean Triples?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pythagorean triples are sets of three positive integers (a, b, c) that satisfy the Pythagorean theorem: a² + b² = c².
              These represent the sides of right triangles with whole number lengths.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Common Examples</h4>
              <div className="grid grid-cols-2 gap-4">
                {commonTriplesExamples.map((triple, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-blue-800 dark:text-blue-200">
                      ({triple.a}, {triple.b}, {triple.c})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Discover Triples</h3>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 mr-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maximum Value
                </label>
                <select
                  value={maxValue}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value={50}>Up to 50</option>
                  <option value={100}>Up to 100</option>
                  <option value={150}>Up to 150</option>
                  <option value={200}>Up to 200</option>
                  <option value={500}>Up to 500</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search by Number
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter a, b, or c"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center mb-4"
            >
              {filtersVisible ? 'Hide Filters' : 'Show Filters'}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={filtersVisible ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
            
            {filtersVisible && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="primitive"
                    checked={filterPrimitive}
                    onChange={() => setFilterPrimitive(!filterPrimitive)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="primitive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show only primitive triples
                  </label>
                  <div className="ml-2 group relative cursor-help">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-md text-xs text-gray-700 dark:text-gray-300 left-0 bottom-full mb-2">
                      Primitive triples have no common factors among the three numbers. For example, (3,4,5) is primitive, but (6,8,10) is not (it's 2×(3,4,5)).
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Triple List {searchValue && `(Filtered by "${searchValue}")`}
            </h3>
            
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Found {filteredTriples.length} triples {filterPrimitive ? '(primitive only)' : ''}
            </div>
            
            <div className="h-[400px] overflow-y-auto pr-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Side a</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Side b</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hypotenuse c</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredTriples.map((triple, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                        selectedTriple && triple.a === selectedTriple.a && triple.b === selectedTriple.b && triple.c === selectedTriple.c
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : ''
                      } ${triple.isHighlighted ? 'font-medium' : ''}`}
                      onClick={() => setSelectedTriple(triple)}
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{triple.a}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{triple.b}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{triple.c}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {isPrimitive(triple.a, triple.b, triple.c)
                          ? <span className="text-green-600 dark:text-green-400">Primitive</span>
                          : <span className="text-gray-500 dark:text-gray-400">Derived</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {selectedTriple && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Selected Triple: ({selectedTriple.a}, {selectedTriple.b}, {selectedTriple.c})</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-800 dark:text-blue-200">a² = {selectedTriple.a}² = {selectedTriple.a * selectedTriple.a}</p>
                  <p className="text-blue-800 dark:text-blue-200">b² = {selectedTriple.b}² = {selectedTriple.b * selectedTriple.b}</p>
                  <p className="text-blue-800 dark:text-blue-200">a² + b² = {selectedTriple.a * selectedTriple.a + selectedTriple.b * selectedTriple.b}</p>
                </div>
                <div>
                  <p className="text-blue-800 dark:text-blue-200">c² = {selectedTriple.c}² = {selectedTriple.c * selectedTriple.c}</p>
                  <p className="text-blue-800 dark:text-blue-200 font-bold">
                    Verification: {selectedTriple.a * selectedTriple.a + selectedTriple.b * selectedTriple.b} = {selectedTriple.c * selectedTriple.c}
                  </p>
                </div>
              </div>
              {selectedTriple.formula && (
                <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">Generated using: {selectedTriple.formula}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PythagoreanTriples; 