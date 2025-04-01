import React from 'react';
import { Metadata } from 'next';
import meta from './meta.json';

export const metadata: Metadata = {
  title: `${meta.title} | Math Tools`,
  description: meta.description,
};

export default function RiemannLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 