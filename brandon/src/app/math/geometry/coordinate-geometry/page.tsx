import { CoordinateGeometryTool } from './components/CoordinateGeometryTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coordinate Geometry Explorer',
  description: 'Interactive tool for exploring and solving coordinate geometry problems'
};

export default function Page() {
  return <CoordinateGeometryTool />;
}