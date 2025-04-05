"use client";

import React, { createContext, useContext, useState, MouseEvent, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ResizableContextType {
  onResize: (index: number, delta: number) => void;
}

const ResizableContext = createContext<ResizableContextType>({
  onResize: () => {},
});

interface ResizablePanelGroupProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function ResizablePanelGroup({ 
  children, 
  direction = 'horizontal', 
  className,
}: ResizablePanelGroupProps) {
  const [sizes, setSizes] = useState<number[]>([]);
  const groupRef = useRef<HTMLDivElement>(null);

  const handleResize = (index: number, delta: number) => {
    setSizes(prevSizes => {
      const newSizes = [...prevSizes];
      
      // Update the size of the current panel and the next one
      if (index < newSizes.length - 1) {
        newSizes[index] += delta;
        newSizes[index + 1] -= delta;
      }
      
      return newSizes;
    });
  };

  // Initialize panel sizes based on children count
  useEffect(() => {
    const panelCount = React.Children.count(children.filter(
      (child: any) => child?.type?.name === 'ResizablePanel'
    ));
    
    if (panelCount > 0) {
      setSizes(Array(panelCount).fill(100 / panelCount));
    }
  }, [children]);

  return (
    <ResizableContext.Provider value={{ onResize: handleResize }}>
      <div 
        ref={groupRef}
        className={cn(
          "flex", 
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              size: sizes[index] || 0,
              index,
            });
          }
          return child;
        })}
      </div>
    </ResizableContext.Provider>
  );
}

interface ResizablePanelProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  index?: number;
  minSize?: number;
  defaultSize?: number;
}

export function ResizablePanel({
  children,
  className,
  size,
  minSize = 10,
  ...props
}: ResizablePanelProps) {
  return (
    <div
      className={cn("relative flex grow", className)}
      style={{ flexBasis: `${size}%` }}
      {...props}
    >
      {children}
    </div>
  );
}

interface ResizableHandleProps {
  withHandle?: boolean;
  className?: string;
}

export function ResizableHandle({ 
  withHandle = false,
  className 
}: ResizableHandleProps) {
  const { onResize } = useContext(ResizableContext);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef(0);
  const handleIndex = useRef<number | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = e.clientX;
    
    // Find the index by looking at previous sibling
    const handle = e.currentTarget as HTMLDivElement;
    const panel = handle.previousElementSibling as HTMLDivElement;
    if (panel && panel.parentElement) {
      const children = Array.from(panel.parentElement.children);
      const panelIndex = children.indexOf(panel);
      handleIndex.current = Math.floor(panelIndex / 2);
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isDragging && handleIndex.current !== null) {
      const delta = e.clientX - startPosRef.current;
      onResize(handleIndex.current, delta * 0.5);
      startPosRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleIndex.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={cn(
        "relative flex w-1.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-col-resize z-10 transition-colors",
        isDragging && "bg-gray-300 dark:bg-gray-700",
        className
      )}
      onMouseDown={handleMouseDown}
    >
      {withHandle && (
        <div className="absolute top-1/2 left-1/2 h-8 w-1 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-300 dark:bg-gray-600" />
      )}
    </div>
  );
} 