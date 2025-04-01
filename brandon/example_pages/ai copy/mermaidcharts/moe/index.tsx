'use client';

import React from 'react';
import MoeAnimation from './MoeAnimation';
import Header from './Header';
import Footer from './Footer';
import VisualDemo from './VisualDemo';

const AGIMindmap: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <MoeAnimation />
      <VisualDemo />
      <Footer />
    </div>
  );
};

export default AGIMindmap;
