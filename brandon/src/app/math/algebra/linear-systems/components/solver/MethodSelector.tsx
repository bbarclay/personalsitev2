"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface MethodSelectorProps {
  value: string;
  onChange: (method: string) => void;
}

export function MethodSelector({ value, onChange }: MethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solution Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="elimination" id="elimination" />
            <Label htmlFor="elimination">Gaussian Elimination</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="substitution" id="substitution" />
            <Label htmlFor="substitution">Substitution</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cramer" id="cramer" />
            <Label htmlFor="cramer">Cramer's Rule</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
} 