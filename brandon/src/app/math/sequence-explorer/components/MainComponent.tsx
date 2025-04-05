"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, RotateCcw, XCircle, Download, Sigma, Calculator } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MAX_TERMS = 100; // Limit number of terms for performance
const LARGE_NUMBER_THRESHOLD = 1e12;

export const SequenceExplorer = () => {
    const [sequenceType, setSequenceType] = useState('arithmetic');
    const [start, setStart] = useState('1');
    const [difference, setDifference] = useState('2');
    const [terms, setTerms] = useState('10');
    const [fibonacciStartZero, setFibonacciStartZero] = useState(true);
    const [nthTermToFind, setNthTermToFind] = useState('');
    const [nthTermResult, setNthTermResult] = useState<string | null>(null);
    const chartRef = useRef<HTMLDivElement>(null);

    interface SequenceResult {
        sequence: { index: number; value: number; displayValue: string; }[];
        description: string;
        formula: string;
    }
    const [result, setResult] = useState<SequenceResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        setResult(null);
        setNthTermResult(null);
    }, [sequenceType, start, difference, terms, fibonacciStartZero]);

    const formatDisplayValue = (value: number): string => {
        if (Math.abs(value) > LARGE_NUMBER_THRESHOLD) {
            return value.toExponential(3);
        }
        return String(value);
    }

    const validateAndParse = (value: string, fieldName: string, isInteger = true, isPositive = false, maxValue?: number) => {
        if (value === '' || value === '-' || value === '.' || value === '-.') {
            throw new Error(`Invalid input for ${fieldName}.`);
        }
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error(`${fieldName} must be a valid number.`);
        }
        if (isInteger && !Number.isInteger(num)) {
            throw new Error(`${fieldName} must be an integer.`);
        }
        if (isPositive && num <= 0) {
            throw new Error(`${fieldName} must be positive.`);
        }
        if (maxValue !== undefined && num > maxValue) {
            throw new Error(`${fieldName} cannot be greater than ${maxValue}.`);
        }
        return num;
    }

    const generateArithmeticSequence = (a1: number, d: number, n: number) => {
        return Array.from({ length: n }, (_, i) => {
             const value = a1 + i * d;
             return { index: i, value, displayValue: formatDisplayValue(value) };
        });
    };

    const generateGeometricSequence = (a1: number, r: number, n: number) => {
         if (a1 === 0) {
             return Array.from({ length: n }, (_, i) => ({ index: i, value: 0, displayValue: '0' }));
         }
         const lastTermEstimate = a1 * Math.pow(r, n - 1);
         if (Math.abs(lastTermEstimate) > 1e18) {
             throw new Error('Geometric sequence results in excessively large numbers. Please adjust parameters.');
         }
        return Array.from({ length: n }, (_, i) => {
            const value = a1 * Math.pow(r, i);
            return { index: i, value, displayValue: formatDisplayValue(value) };
        });
    };

    const generateFibonacciSequence = (n: number, startWithZero: boolean) => {
        if (n > 90) {
            throw new Error('Number of terms for Fibonacci sequence is too large (max 90).'); 
         }
        let sequence: number[] = [];
        if (startWithZero) {
            if (n >= 1) sequence.push(0);
            if (n >= 2) sequence.push(1);
        } else {
            if (n >= 1) sequence.push(1);
            if (n >= 2) sequence.push(1);
        }
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence.map((value, index) => ({ index, value, displayValue: formatDisplayValue(value) }));
    };

    const getSequenceFormula = (type: string, a1?: number, d?: number): string => {
        switch (type) {
            case 'arithmetic':
                return a1 !== undefined && d !== undefined 
                    ? `a_n = ${a1} + (n-1) × ${d}`
                    : 'a_n = a₁ + (n-1)d';
            case 'geometric':
                return a1 !== undefined && d !== undefined
                    ? `a_n = ${a1} × (${d})^{n-1}`
                    : 'a_n = a₁ × r^{n-1}';
            case 'fibonacci':
                return fibonacciStartZero
                    ? 'a_n = a_{n-1} + a_{n-2}, with a_1 = 0, a_2 = 1'
                    : 'a_n = a_{n-1} + a_{n-2}, with a_1 = 1, a_2 = 1';
            default:
                return '';
        }
    };

    const findNthTerm = () => {
        if (!result) return;
        try {
            const n = validateAndParse(nthTermToFind, 'Term Position', true, true);
            if (n > 1000) {
                setError('Term position too large (max 1000)');
                return;
            }
            
            let termValue: number;
            
            switch (sequenceType) {
                case 'arithmetic': {
                    const a1 = Number(start);
                    const d = Number(difference);
                    termValue = a1 + (n - 1) * d;
                    break;
                }
                case 'geometric': {
                    const a1 = Number(start);
                    const r = Number(difference);
                    termValue = a1 * Math.pow(r, n - 1);
                    break;
                }
                case 'fibonacci': {
                    // For large n, use dynamic programming
                    const seq = [fibonacciStartZero ? 0 : 1, 1];
                    if (n <= 2) {
                        termValue = seq[n - 1];
                    } else {
                        for (let i = 2; i < n; i++) {
                            // Handle large numbers with limit
                            if (seq[i-1] + seq[i-2] > 1e308) {
                                throw new Error('Term value is too large to compute.');
                            }
                            seq.push(seq[i-1] + seq[i-2]);
                        }
                        termValue = seq[n - 1];
                    }
                    break;
                }
                default:
                    throw new Error('Unknown sequence type');
            }
            
            setNthTermResult(formatDisplayValue(termValue));
            setError(null);
            
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error calculating term');
            }
            setNthTermResult(null);
        }
    };

    const calculateSequence = () => {
        setError(null);
        setResult(null);
        setNthTermResult(null);
        try {
            const n = validateAndParse(terms, 'Number of Terms', true, true, MAX_TERMS);
            let a1: number | undefined;
            let dOrR: number | undefined;
            let isValid = true;

            if (sequenceType !== 'fibonacci') {
                try { a1 = validateAndParse(start, 'First Term', false); } catch { isValid = false; setError('First Term must be a valid number.'); }
                try { dOrR = validateAndParse(difference, sequenceType === 'arithmetic' ? 'Common Difference' : 'Common Ratio', false); } catch { isValid = false; setError('Common Difference/Ratio must be a valid number.'); }
            } else {
                 try { validateAndParse(terms, 'Number of Terms', true, true, MAX_TERMS); } catch (err) { isValid = false; if (err instanceof Error) setError(err.message); }
            }
            
            if (!isValid || a1 === undefined || dOrR === undefined) {
                if (!error && sequenceType !== 'fibonacci') setError("Please provide valid inputs for all parameters.");
                return;
            } 

            let sequenceData: { index: number; value: number; displayValue: string; }[] = [];
            let description = '';
            let formula = '';

            switch (sequenceType) {
                case 'arithmetic': {
                    sequenceData = generateArithmeticSequence(a1, dOrR, n);
                    description = `Arithmetic sequence: a₁ = ${a1}, d = ${dOrR}`; 
                    formula = getSequenceFormula('arithmetic', a1, dOrR);
                    break;
                }
                case 'geometric': {
                    sequenceData = generateGeometricSequence(a1, dOrR, n);
                    description = `Geometric sequence: a₁ = ${a1}, r = ${dOrR}`;
                    formula = getSequenceFormula('geometric', a1, dOrR);
                    break;
                }
                case 'fibonacci': {
                    sequenceData = generateFibonacciSequence(n, fibonacciStartZero);
                    description = `Fibonacci sequence (starting with ${fibonacciStartZero ? '0, 1' : '1, 1'})`;
                    formula = getSequenceFormula('fibonacci');
                    break;
                }
            }

            setResult({ sequence: sequenceData, description, formula });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred during calculation.');
            }
        }
    };
    
    const clearResult = () => {
        setResult(null);
        setError(null);
        setNthTermResult(null);
    }
    
    const exportSequence = (format: 'csv' | 'json') => {
        if (!result?.sequence) return;
        
        let content = '';
        let filename = `sequence_${sequenceType}_${new Date().getTime()}`;
        let type = '';
        
        if (format === 'csv') {
            content = 'Index,Value\n';
            content += result.sequence.map(item => `${item.index + 1},${item.value}`).join('\n');
            filename += '.csv';
            type = 'text/csv';
        } else {
            const data = {
                type: sequenceType,
                parameters: {
                    firstTerm: sequenceType !== 'fibonacci' ? start : (fibonacciStartZero ? "0" : "1"),
                    commonDifference: sequenceType === 'arithmetic' ? difference : undefined,
                    commonRatio: sequenceType === 'geometric' ? difference : undefined,
                    terms: terms
                },
                formula: result.formula,
                sequence: result.sequence.map(item => ({ index: item.index + 1, value: item.value }))
            };
            content = JSON.stringify(data, null, 2);
            filename += '.json';
            type = 'application/json';
        }
        
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const numTerms = Number(terms);
    const numStart = Number(start);
    const numDiff = Number(difference);
    let canGenerate = !isNaN(numTerms) && numTerms > 0 && numTerms <= MAX_TERMS;
    if (sequenceType !== 'fibonacci') {
        canGenerate = canGenerate && !isNaN(numStart) && !isNaN(numDiff);
    }

    return (
        <div className="space-y-6">
            {error && (
                 <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Input Error</AlertTitle>
                    <AlertDescription>
                       {error}
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Sequence Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="sequenceType">Sequence Type</Label>
                             <Select value={sequenceType} onValueChange={setSequenceType}>
                                <SelectTrigger id="sequenceType">
                                    <SelectValue placeholder="Select sequence type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="arithmetic">Arithmetic</SelectItem>
                                    <SelectItem value="geometric">Geometric</SelectItem>
                                    <SelectItem value="fibonacci">Fibonacci</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={sequenceType === 'fibonacci' ? 'md:col-span-2' : ''}>
                            <Label htmlFor="terms">Number of Terms (1-{MAX_TERMS})</Label>
                            <Input
                                id="terms"
                                type="number"
                                value={terms}
                                onChange={(e) => setTerms(e.target.value)}
                                placeholder={`e.g., 10 (max ${MAX_TERMS})`}
                                min="1"
                                max={MAX_TERMS}
                                step="1"
                            />
                        </div>
                       
                        {sequenceType === 'fibonacci' && (
                            <div className="flex items-center space-x-2 pt-6 md:pt-0 md:justify-end">
                                <Checkbox 
                                    id="fibStartZero"
                                    checked={fibonacciStartZero}
                                    onCheckedChange={(checked) => setFibonacciStartZero(Boolean(checked))}
                                />
                                <Label htmlFor="fibStartZero" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Start with 0, 1 (vs 1, 1)
                                </Label>
                            </div>
                        )}
                     </div>

                    {sequenceType !== 'fibonacci' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="start">First Term (a₁)</Label>
                                <Input
                                    id="start"
                                    type="number"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    placeholder="e.g., 1 or 1.5"
                                    step="any"
                                />
                            </div>
                            <div>
                                <Label htmlFor="difference">
                                    {sequenceType === 'arithmetic' ? 'Common Difference (d)' : 'Common Ratio (r)'}
                                </Label>
                                <Input
                                    id="difference"
                                    type="number"
                                    value={difference}
                                    onChange={(e) => setDifference(e.target.value)}
                                    placeholder={sequenceType === 'arithmetic' ? 'e.g., 2 or -1.5' : 'e.g., 2 or 0.5'}
                                    step="any"
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button onClick={calculateSequence} className="flex-grow" disabled={!canGenerate}>
                            Generate Sequence
                        </Button>
                        <TooltipProvider delayDuration={100}>
                            <UITooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" onClick={clearResult} disabled={!result && !error} aria-label="Clear results">
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Clear Results & Errors</p>
                                </TooltipContent>
                            </UITooltip>
                        </TooltipProvider>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div>
                            <CardTitle>Generated Sequence</CardTitle>
                            <CardDescription className="mt-1.5">{result.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Export
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48" align="end">
                                    <div className="flex flex-col space-y-2">
                                        <Button onClick={() => exportSequence('csv')} variant="ghost" className="justify-start">
                                            CSV Format
                                        </Button>
                                        <Button onClick={() => exportSequence('json')} variant="ghost" className="justify-start">
                                            JSON Format
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        <Tabs defaultValue="visualization" className="mt-2">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="visualization">Chart</TabsTrigger>
                                <TabsTrigger value="formula">Formula</TabsTrigger>
                                <TabsTrigger value="findterm">Find Term</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="visualization" className="space-y-4">
                                <div className="h-[350px] mb-6 bg-muted/20 p-4 rounded-md border" ref={chartRef}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={result.sequence} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))"/>
                                            <XAxis 
                                                dataKey="index" 
                                                label={{ value: 'Term Index (n)', position: 'insideBottom', dy: 15 }} 
                                                stroke="hsl(var(--muted-foreground))"
                                                tick={{ fontSize: 12 }}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis 
                                                label={{ value: 'Value', angle: -90, position: 'insideLeft', dx: -10 }} 
                                                stroke="hsl(var(--muted-foreground))"
                                                tick={{ fontSize: 12 }}
                                                tickFormatter={(value) => formatDisplayValue(value)}
                                            />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} 
                                                labelStyle={{ color: 'hsl(var(--foreground))' }} 
                                                formatter={(value) => formatDisplayValue(Number(value))}
                                                labelFormatter={(label) => `Index: ${label}`}
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="value" 
                                                stroke="hsl(var(--primary))" 
                                                strokeWidth={2} 
                                                dot={result.sequence.length < 50} 
                                                activeDot={{ r: 6 }} 
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <h4 className="text-md font-medium mb-2">Sequence Terms:</h4>
                                <div className="max-h-48 overflow-y-auto p-3 bg-muted/50 rounded-md font-mono text-sm border">
                                    {result.sequence.map((item, index) => (
                                        <span key={index}>
                                            {item.displayValue}{index < result.sequence.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                    {result.sequence.length === 0 && <span className="text-muted-foreground italic">No terms generated.</span>}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="formula">
                                <div className="bg-muted/20 p-6 rounded-md border">
                                    <div className="flex items-center mb-4">
                                        <Sigma className="h-5 w-5 mr-2 text-primary" />
                                        <h3 className="text-lg font-medium">Sequence Formula</h3>
                                    </div>
                                    
                                    <div className="flex flex-col space-y-4">
                                        <div className="p-4 bg-background rounded-md border text-center">
                                            <div className="text-lg font-mono">{result.formula}</div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <h4 className="font-medium">General Formula Explanation:</h4>
                                            {sequenceType === 'arithmetic' && (
                                                <p className="text-sm text-muted-foreground">
                                                    In an arithmetic sequence, each term differs from the previous term by a constant value (d).
                                                    The formula to find the nth term is: a<sub>n</sub> = a<sub>1</sub> + (n-1)d, where a<sub>1</sub> is the first term and d is the common difference.
                                                </p>
                                            )}
                                            {sequenceType === 'geometric' && (
                                                <p className="text-sm text-muted-foreground">
                                                    In a geometric sequence, each term is found by multiplying the previous term by a constant (r).
                                                    The formula to find the nth term is: a<sub>n</sub> = a<sub>1</sub> × r<sup>n-1</sup>, where a<sub>1</sub> is the first term and r is the common ratio.
                                                </p>
                                            )}
                                            {sequenceType === 'fibonacci' && (
                                                <p className="text-sm text-muted-foreground">
                                                    In the Fibonacci sequence, each term is the sum of the two preceding terms.
                                                    The recursive formula is: a<sub>n</sub> = a<sub>n-1</sub> + a<sub>n-2</sub> with starting values specified.
                                                    There is also a closed-form formula (Binet's formula) for larger calculations.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="findterm">
                                <div className="bg-muted/20 p-6 rounded-md border">
                                    <div className="flex items-center mb-4">
                                        <Calculator className="h-5 w-5 mr-2 text-primary" />
                                        <h3 className="text-lg font-medium">Find Specific Term</h3>
                                    </div>
                                    
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex flex-row space-x-3">
                                            <div className="flex-grow">
                                                <Label htmlFor="nthTerm">Which term to find? (n)</Label>
                                                <Input
                                                    id="nthTerm"
                                                    type="number"
                                                    value={nthTermToFind}
                                                    onChange={(e) => setNthTermToFind(e.target.value)}
                                                    placeholder="e.g., 50"
                                                    min="1"
                                                    max="1000"
                                                    step="1"
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button 
                                                    onClick={findNthTerm} 
                                                    disabled={!nthTermToFind || isNaN(Number(nthTermToFind)) || Number(nthTermToFind) <= 0}
                                                >
                                                    Calculate
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {nthTermResult && (
                                            <div className="p-4 bg-background rounded-md border">
                                                <div className="text-sm font-medium mb-1">Term #{nthTermToFind}:</div>
                                                <div className="text-lg font-mono font-semibold">{nthTermResult}</div>
                                            </div>
                                        )}
                                        
                                        <p className="text-xs text-muted-foreground">
                                            Note: For large term positions, calculations are done using the general formula rather than iterating through the sequence.
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SequenceExplorer;
