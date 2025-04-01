'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';

const CodeTyper = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const tabs = [
    {
      name: 'Python',
      icon: '🐍',
      code: `  # Machine Learning Data Analysis
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def analyze_data(dataset):
    """
    Analyzes input dataset using ML
    """
    # Load and preprocess
    df = pd.DataFrame(dataset)

    # Calculate statistics
    stats = {
        'mean': np.mean(df.values),
        'std': np.std(df.values)
    }

    # Train model
    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    return {
        'model': model,
        'accuracy': 0.95,
        'stats': stats
    }`
    },
    {
      name: 'TypeScript',
      icon: '📘',
      code: ` interface DataPoint {
  id: string;
  value: number;
  timestamp: Date;
}

interface Analysis {
  total: number;
  average: number;
}

class DataAnalyzer {
  private dataset: DataPoint[];

  constructor(data: DataPoint[]) {
    this.dataset = data;
  }

  public async processData(): Promise<void> {
    const results = await this.analyze();
    this.visualize(results);
  }

  private analyze(): Analysis {
    return {
      total: this.calculateTotal(),
      average: this.calculateMean()
    };
  }
}`
    },
    {
      name: 'SQL',
      icon: '🗃️',
      code: ` WITH UserMetrics AS (
  SELECT
    user_id,
    COUNT(*) as total_actions,
    DATE_TRUNC('month', created_at) as month
  FROM user_events
  WHERE event_type = 'purchase'
  GROUP BY user_id, month
)

SELECT
  month,
  COUNT(DISTINCT user_id) as active_users,
  AVG(total_actions) as avg_actions,
  PERCENTILE_CONT(0.5)
    WITHIN GROUP (ORDER BY total_actions) as median_actions
FROM UserMetrics
GROUP BY month
ORDER BY month DESC
LIMIT 12;`
    },
    {
      name: 'JSON',
      icon: '📋',
      code: `{
  "apiVersion": "2.0",
  "metadata": {
    "generated": "2024-03-15T10:30:00Z",
    "provider": "DataService"
  },
  "data": {
    "metrics": [
      {
        "id": "user_engagement",
        "value": 0.85,
        "confidence": 0.95,
        "segments": {
          "mobile": 0.82,
          "desktop": 0.87,
          "tablet": 0.83
        }
      }
    ],
    "dimensions": {
      "timeRange": "30d",
      "granularity": "daily"
    }
  }
}`
    }
  ];

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      setText('');
      currentIndex = 0;

      typingInterval = setInterval(() => {
        if (currentIndex < tabs[activeTab].code.length) {
          setText(prev => prev + tabs[activeTab].code[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          if (autoPlay) {
            setTimeout(() => {
              setActiveTab((prev) => (prev + 1) % tabs.length);
            }, 3000);
          }
        }
      }, 25);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
    };
  }, [activeTab, autoPlay]);

  useEffect(() => {
    // Highlight after each render
    Prism.highlightAll();
  }, [text]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setAutoPlay(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
      {/* Tab Bar */}
      <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(index)}
              className={`flex items-center px-4 py-2 rounded-lg mr-2 transition-transform transform hover:scale-105 ${activeTab === index
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-3 py-1 rounded text-sm transition-colors duration-300 ${autoPlay
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30'
            }`}
        >
          {autoPlay ? 'Auto' : 'Manual'}
        </button>
      </div>

      {/* Code Display */}
      <div className="p-6 h-96 overflow-auto bg-card dark:bg-[#1E1E2E]"> {/* Keep special dark color for code but allow light theme */}
        <pre className="font-mono text-sm">
          <code className={`language-${tabs[activeTab].name.toLowerCase()}`}>
            {text}
          </code>
          {isTyping && (
            <span className="inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse">
              &nbsp;
            </span>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeTyper;
