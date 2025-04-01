import React, { useState } from 'react';
import { Polynomial } from '../types';

interface PolynomialInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PolynomialInput: React.FC<PolynomialInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Enter a polynomial (e.g., x^2 + 3x - 4)" 
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default PolynomialInput;
