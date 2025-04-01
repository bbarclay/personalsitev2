import React from 'react';

interface SummaryData {
    primesGenerated: number;
    primesDropped: number;
    percentageDropped: number;
    primesCountInRanges: number[];
    remainingPrimesCountInRanges: number[];
    modSums: {
        mod0: number;
        mod1: number;
        mod2: number;
    };
    alternationBreaks: { start: number; end: number }[];
}

const RandomPrimeSummaryTable: React.FC<{ summary: SummaryData }> = ({ summary }) => {
    return (
        <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Primes Generated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primes Dropped</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage Dropped</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primes Count in Ranges</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Primes Count in Ranges</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mod 0 Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mod 1 Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mod 2 Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alternation Breaks</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">{summary.primesGenerated}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary.primesDropped}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.percentageDropped ? summary.percentageDropped.toFixed(2) : ''}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.primesCountInRanges ? summary.primesCountInRanges.join(', ') : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.remainingPrimesCountInRanges ? summary.remainingPrimesCountInRanges.join(', ') : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.modSums ? summary.modSums.mod0 : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.modSums ? summary.modSums.mod1 : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.modSums ? summary.modSums.mod2 : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{summary && summary.alternationBreaks ? summary.alternationBreaks.length : ''}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RandomPrimeSummaryTable;
