import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    neon: string;
  };
}

const defaultColors = {
  light: {
    primary: '#4A90E2',
    secondary: '#50E3C2',
    accent: '#FF6B6B',
    background: '#F8F9FA',
    text: '#2C3E50',
    neon: '#FF1493',
  },
  dark: {
    primary: '#00F5FF',
    secondary: '#7B42F6',
    accent: '#FF36AB',
    background: '#0A1929',
    text: '#E0E0E0',
    neon: '#0FF',
  },
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = defaultColors[theme];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 