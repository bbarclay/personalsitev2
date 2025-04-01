import React from 'react';
import { Polynomial } from '../types';

interface RootFinderProps {
  polynomial: Polynomial;
}

export const RootFinder: React.FC<RootFinderProps> = ({ polynomial }) => {
  return (
    <div className="root-finder">
      <h3>Root Finder</h3>
      <div className="roots-container">
        {/* Root finding implementation would go here */}
        <p>Roots of the polynomial will be calculated and displayed here</p>
      </div>
    </div>
  );
};

export default RootFinder;
