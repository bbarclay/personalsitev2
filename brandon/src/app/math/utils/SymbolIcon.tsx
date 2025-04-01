'use client';

import React from 'react';
import { symbols } from './symbols';

interface SymbolIconProps {
  symbolId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SymbolIcon: React.FC<SymbolIconProps> = ({ 
  symbolId, 
  size = 'md', 
  className = '' 
}) => {
  const symbol = symbols.find(s => s.id === symbolId);
  
  if (!symbol) return null;
  
  const sizeClass = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-base'
  }[size];
  
  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full ${sizeClass} ${className}`}
      style={{ backgroundColor: symbol.color }}
    >
      <span className="font-bold text-white">{symbol.name.charAt(0)}</span>
    </div>
  );
};

export default SymbolIcon; 