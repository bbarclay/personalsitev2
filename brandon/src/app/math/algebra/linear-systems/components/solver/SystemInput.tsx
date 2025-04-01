"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface SystemInputProps {
  value: string;
  onChange: (value: string) => void;
  onSolve: () => void;
}

export function SystemInput({ value, onChange, onSolve }: SystemInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Linear System</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your system of linear equations, one per line. Example:
2x + 3y = 5
4x - y = 7"
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono"
        />
        <Button onClick={onSolve} className="w-full">
          Solve System
        </Button>
      </CardContent>
    </Card>
  );
} 