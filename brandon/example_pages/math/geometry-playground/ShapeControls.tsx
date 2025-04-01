import React from 'react';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';

interface ShapeControlsProps {
  selectedShape: string;
  shapeProperties: {
    size: number;
    width?: number;
    height?: number;
    rotation: number;
    color: string;
  };
  setShapeProperties: (properties: any) => void;
  transformations: {
    translateX: number;
    translateY: number;
    scale: number;
    rotate: number;
  };
  setTransformations: (transformations: any) => void;
  handleTransform: (type: string) => void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({
  selectedShape,
  shapeProperties,
  setShapeProperties,
  transformations,
  setTransformations,
  handleTransform,
}) => {
  const handlePropertyChange = (property: string, value: number | string) => {
    setShapeProperties({
      ...shapeProperties,
      [property]: value,
    });
  };

  const handleTransformationChange = (property: string, value: number) => {
    setTransformations({
      ...transformations,
      [property]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Size Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size</h3>
        {selectedShape === 'circle' && (
          <div className="space-y-2">
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              type="number"
              value={shapeProperties.size}
              onChange={(e) => handlePropertyChange('size', Number(e.target.value))}
              min={10}
              max={200}
              className="glass-input"
            />
          </div>
        )}
        {selectedShape === 'rectangle' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={shapeProperties.width}
                onChange={(e) => handlePropertyChange('width', Number(e.target.value))}
                min={20}
                max={400}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                value={shapeProperties.height}
                onChange={(e) => handlePropertyChange('height', Number(e.target.value))}
                min={20}
                max={400}
                className="glass-input"
              />
            </div>
          </>
        )}
        {['square', 'triangle', 'pentagon', 'hexagon'].includes(selectedShape) && (
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              type="number"
              value={shapeProperties.size}
              onChange={(e) => handlePropertyChange('size', Number(e.target.value))}
              min={20}
              max={400}
              className="glass-input"
            />
          </div>
        )}
      </div>

      {/* Color Control */}
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="color"
          value={shapeProperties.color}
          onChange={(e) => handlePropertyChange('color', e.target.value)}
          className="glass-input h-10"
        />
      </div>

      {/* Transformations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transformations</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="translateX">Move X</Label>
            <Input
              id="translateX"
              type="number"
              value={transformations.translateX}
              onChange={(e) => handleTransformationChange('translateX', Number(e.target.value))}
              min={-200}
              max={200}
              className="glass-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="translateY">Move Y</Label>
            <Input
              id="translateY"
              type="number"
              value={transformations.translateY}
              onChange={(e) => handleTransformationChange('translateY', Number(e.target.value))}
              min={-200}
              max={200}
              className="glass-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scale">Scale</Label>
            <Input
              id="scale"
              type="number"
              value={transformations.scale}
              onChange={(e) => handleTransformationChange('scale', Number(e.target.value))}
              min={0.1}
              max={3}
              step={0.1}
              className="glass-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rotate">Rotate</Label>
            <Input
              id="rotate"
              type="number"
              value={transformations.rotate}
              onChange={(e) => handleTransformationChange('rotate', Number(e.target.value))}
              min={-180}
              max={180}
              className="glass-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleTransform('reset')}
            variant="outline"
            className="glass-button"
          >
            Reset
          </Button>
          <Button
            onClick={() => handleTransform('apply')}
            className="glass-button"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShapeControls;
