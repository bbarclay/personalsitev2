"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Slider } from "@components/ui/slider";

type BaseDigit = {
  value: string;
  position: number;
  placeValue: number;
};

export const NumberBaseConverter = () => {
  const [decimalNumber, setDecimalNumber] = useState(42);
  const [selectedBase, setSelectedBase] = useState(2);
  const [digits, setDigits] = useState<BaseDigit[]>([]);

  const convertToBase = (num: number, base: number): BaseDigit[] => {
    const result: BaseDigit[] = [];
    let quotient = num;
    let position = 0;

    while (quotient > 0) {
      const remainder = quotient % base;
      const digit = remainder < 10 ? remainder.toString() :
        String.fromCharCode(65 + remainder - 10);
      const placeValue = Math.pow(base, position);

      result.unshift({
        value: digit,
        position,
        placeValue: remainder * placeValue
      });

      quotient = Math.floor(quotient / base);
      position++;
    }

    return result;
  };

  useEffect(() => {
    const newDigits = convertToBase(decimalNumber, selectedBase);
    setDigits(newDigits);
  }, [decimalNumber, selectedBase]);

  const getColorForPosition = (position: number): string => {
    const hue = (position * 30) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Number Base Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Decimal Number: {decimalNumber}
              </label>
              <Slider
                value={[decimalNumber]}
                onValueChange={(values) => setDecimalNumber(values[0])}
                min={1}
                max={255}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Convert to Base: {selectedBase}
              </label>
              <Slider
                value={[selectedBase]}
                onValueChange={(values) => setSelectedBase(values[0])}
                min={2}
                max={16}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="p-6 bg-gray-50  rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-center">
              {decimalNumber}<sub>10</sub> = {digits.map(d => d.value).join('')}<sub>{selectedBase}</sub>
            </h3>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {digits.map((digit, index) => (
                <div
                  key={index}
                  className="relative group"
                  style={{ width: '60px' }}
                >
                  <div
                    className="text-2xl font-bold text-center p-2 rounded-lg transition-transform transform hover:scale-110"
                    style={{ backgroundColor: getColorForPosition(digits.length - index - 1) }}
                  >
                    {digit.value}
                  </div>
                  <div className="text-xs text-center mt-1">
                    {selectedBase}<sup>{digits.length - index - 1}</sup>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                                opacity-0 group-hover:opacity-100 transition-opacity bg-black
                                text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {digit.value} × {selectedBase}<sup>{digits.length - index - 1}</sup> = {digit.placeValue}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-lg">
              = {digits.map((digit, index) => (
                <span key={index} className="mx-1">
                  {digit.placeValue}
                  {index < digits.length - 1 ? ' + ' : ''}
                </span>
              ))}
              {' = '}{decimalNumber}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="font-bold mb-2">Binary (Base 2)</div>
              <div>{convertToBase(decimalNumber, 2).map(d => d.value).join('')}</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="font-bold mb-2">Octal (Base 8)</div>
              <div>{convertToBase(decimalNumber, 8).map(d => d.value).join('')}</div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <div className="font-bold mb-2">Decimal (Base 10)</div>
              <div>{decimalNumber}</div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <div className="font-bold mb-2">Hexadecimal (Base 16)</div>
              <div>{convertToBase(decimalNumber, 16).map(d => d.value).join('')}</div>
            </div>
          </div>

          <div className="p-4 bg-gray-50  rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Adjust the decimal number using the slider</li>
              <li>Choose a target base (2-16) to convert to</li>
              <li>Hover over digits to see their place values</li>
              <li>Common bases are shown below for comparison</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NumberBaseConverter;
