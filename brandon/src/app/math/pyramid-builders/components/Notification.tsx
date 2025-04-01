"use client";

import React, { useEffect, useState } from 'react';
import { GameState } from '../types';

interface NotificationProps {
  message: string;
  type: GameState['feedbackType'];
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setIsVisible(true);
    
    // Fade out after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 font-medium text-white transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      } ${
        type === 'success' 
          ? 'bg-green-500' 
          : type === 'error' 
            ? 'bg-red-500' 
            : 'bg-blue-500'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification; 