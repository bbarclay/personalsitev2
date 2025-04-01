import React from 'react';
import metaJson from './meta.json';

// Layout component with the metadata from meta.json
export const metadata = {
  title: metaJson.title,
  description: metaJson.description
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pyramid-builders-layout">
      {children}
    </div>
  );
} 