import React, { useState } from 'react';
import AnimatedTriangle from './AnimatedTriangle';
import '../styles.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AlertCircle, RotateCcw, Maximize2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEFAULT_A = 3;
const DEFAULT_B = 4;

const PythagoreanToolComponent = () => {
    const [a, setA] = useState<number | string>(DEFAULT_A);
    const [b, setB] = useState<number | string>(DEFAULT_B);
    const [c, setC] = useState<number | null>(Math.sqrt(DEFAULT_A*DEFAULT_A + DEFAULT_B*DEFAULT_B));
    const [error, setError] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState(true);

    const handleInputChange = (value: string, setter: React.Dispatch<React.SetStateAction<number | string>>) => {
        setError(null);
        if (value === '' || value === '-' || value === '.' || value === '-.') {
            setter(value);
            setC(null);
        } else {
            const num = Number(value);
            // Allow inputting numbers like "3." temporarily
            if (!isNaN(num) || /^-?\d*\.?\d*$/.test(value)) {
                 setter(value);
                 // Try to calculate immediately if both inputs are valid numbers
                 const otherVal = setter === setA ? b : a;
                 const otherNum = Number(otherVal);
                 if (!isNaN(num) && num > 0 && !isNaN(otherNum) && otherNum > 0) {
                     const numA = setter === setA ? num : otherNum;
                     const numB = setter === setB ? num : otherNum;
                     const hypotenuse = Math.sqrt(numA * numA + numB * numB);
                     setC(hypotenuse); 
                 } else {
                     setC(null); // Clear if current input makes calculation invalid
                 }
            } 
            // else: ignore invalid characters entirely
        }
    };

     const validateAndCalculate = () => {
        const numA = Number(a);
        const numB = Number(b);

        if (isNaN(numA) || isNaN(numB) || numA <= 0 || numB <= 0) {
            setError('Please enter positive numbers for both sides A and B.');
            setC(null);
            return false;
        }
        setError(null);
        const hypotenuse = Math.sqrt(numA * numA + numB * numB);
        setC(hypotenuse);
        return true;
    };
    
    const handleCalculateClick = () => {
        validateAndCalculate();
    }

    const resetValues = () => {
        setError(null);
        setA(DEFAULT_A);
        setB(DEFAULT_B);
        setC(Math.sqrt(DEFAULT_A*DEFAULT_A + DEFAULT_B*DEFAULT_B));
    }

    const numA = Number(a);
    const numB = Number(b);
    const isInputValid = !isNaN(numA) && !isNaN(numB) && numA > 0 && numB > 0;
    
    // Calculate additional properties
    const area = isInputValid ? (numA * numB) / 2 : null;
    const perimeter = isInputValid && c !== null ? numA + numB + c : null;
    const angleC = isInputValid ? Math.atan(numA / numB) * (180 / Math.PI) : null;
    const angleB = isInputValid ? Math.atan(numA / (c || 1)) * (180 / Math.PI) : null;
    const angleA = isInputValid ? 90 - (angleB || 0) : null;

    // Calculate exact value demonstration
    const exactEquation = isInputValid ? 
        `${numA}² + ${numB}² = ${numA * numA} + ${numB * numB} = ${numA * numA + numB * numB} = ${c !== null ? c*c : '?'}` : 
        null;

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Pythagorean Theorem Calculator</CardTitle>
                    <CardDescription>Calculate the hypotenuse (c) of a right triangle given sides a and b using the formula: a² + b² = c²</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="sideA">Side A:</Label>
                                <Input 
                                    id="sideA"
                                    type="number" 
                                    value={a} 
                                    onChange={(e) => handleInputChange(e.target.value, setA)}
                                    placeholder="Enter positive length"
                                    className={`${error && (isNaN(numA) || numA <= 0) ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    step="any" // Allow decimals
                                    min="0.000001" // Enforce positivity slightly
                                />
                            </div>
                            <div>
                                <Label htmlFor="sideB">Side B:</Label>
                                <Input 
                                    id="sideB"
                                    type="number" 
                                    value={b} 
                                    onChange={(e) => handleInputChange(e.target.value, setB)}
                                    placeholder="Enter positive length"
                                    className={`${error && (isNaN(numB) || numB <= 0) ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    step="any"
                                    min="0.000001"
                                />
                            </div>
                        </div>

                        {error && (
                             <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Input Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {c !== null && error === null && isInputValid && (
                            <Tabs defaultValue="hypotenuse" className="mt-4">
                                <TabsList className="mb-2">
                                    <TabsTrigger value="hypotenuse">Hypotenuse</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="equation">Equation</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="hypotenuse">
                                    <Alert variant="default" className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <AlertTitle className="mb-1 text-green-800 dark:text-green-200">Result</AlertTitle>
                                                <AlertDescription className="text-lg text-green-700 dark:text-green-300">
                                                    Hypotenuse (c) = <strong className="font-semibold">{c.toFixed(4)}</strong>
                                                </AlertDescription>
                                            </div>
                                        </div>
                                    </Alert>
                                </TabsContent>
                                
                                <TabsContent value="details">
                                    <div className="space-y-2 bg-muted/20 p-3 rounded-md border">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Area:</span> 
                                                <span>{area?.toFixed(3)} square units</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Perimeter:</span> 
                                                <span>{perimeter?.toFixed(3)} units</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Angle A:</span> 
                                                <span>{angleA?.toFixed(2)}°</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Angle B:</span> 
                                                <span>{angleB?.toFixed(2)}°</span>
                                            </div>
                                            <div className="flex justify-between col-span-2">
                                                <span className="font-medium">Angle C:</span> 
                                                <span>90° (Right angle)</span>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="equation">
                                    <div className="bg-muted/20 p-3 rounded-md border">
                                        <div className="text-center font-medium mb-1">Pythagorean Equation</div>
                                        <div className="text-center text-sm font-mono p-1">
                                            a² + b² = c²
                                        </div>
                                        {exactEquation && (
                                            <div className="text-center text-sm font-mono bg-muted/30 p-1 mt-2 rounded">
                                                {exactEquation}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                        
                        <div className="flex space-x-2 pt-2">
                            <Button 
                                onClick={handleCalculateClick}
                                className="flex-grow"
                                disabled={!isInputValid}
                            >
                                Calculate Hypotenuse
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={resetValues} 
                                aria-label="Reset values"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                
                    <div className="bg-muted/50 p-6 rounded-lg flex items-center justify-center min-h-[280px] border">
                        {isInputValid ? (
                            <AnimatedTriangle a={numA} b={numB} /> 
                        ) : (
                           <p className="text-center text-muted-foreground italic px-4">Enter valid positive lengths for A and B to see the visualization.</p> 
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PythagoreanToolComponent; 