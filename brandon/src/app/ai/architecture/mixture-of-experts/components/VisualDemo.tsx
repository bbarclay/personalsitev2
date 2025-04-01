'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  MessageCircle,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  Router,
  Split,
  Combine,
  Network,
  Search,
} from 'lucide-react';

interface Token {
  text: string;
  type: 'grammar' | 'medical' | 'technical';
  routingScores: {
    grammar: number;
    medical: number;
    technical: number;
  };
  expertAnalysis: {
    grammar: string;
    medical: string;
    technical: string;
  };
}

interface Expert {
  name: string;
  color: string;
  description: string;
  expertise: string;
  confidenceThreshold: number;
}

const VisualDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [processPhase, setProcessPhase] = useState<'input' | 'tokenize' | 'route' | 'process' | 'combine'>('input');
  const [currentToken, setCurrentToken] = useState(0);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Preset demonstration example
  const demoSentence = "The patient's temperature is 102°F";
  const demoTokens: Token[] = [
    {
      text: "The",
      type: "grammar",
      routingScores: {
        grammar: 0.9,
        medical: 0.1,
        technical: 0.1
      },
      expertAnalysis: {
        grammar: "Article (definite)",
        medical: "Not medical term",
        technical: "No technical content"
      }
    },
    {
      text: "patient's",
      type: "medical",
      routingScores: {
        grammar: 0.3,
        medical: 0.9,
        technical: 0.1
      },
      expertAnalysis: {
        grammar: "Possessive noun",
        medical: "Subject identifier",
        technical: "No measurements"
      }
    },
    {
      text: "temperature",
      type: "medical",
      routingScores: {
        grammar: 0.2,
        medical: 0.8,
        technical: 0.7
      },
      expertAnalysis: {
        grammar: "Common noun",
        medical: "Vital sign indicator",
        technical: "Measurement type"
      }
    },
    {
      text: "is",
      type: "grammar",
      routingScores: {
        grammar: 0.95,
        medical: 0.1,
        technical: 0.1
      },
      expertAnalysis: {
        grammar: "Linking verb",
        medical: "Not medical term",
        technical: "No technical content"
      }
    },
    {
      text: "102°F",
      type: "technical",
      routingScores: {
        grammar: 0.1,
        medical: 0.6,
        technical: 0.95
      },
      expertAnalysis: {
        grammar: "Numerical expression",
        medical: "Vital sign value",
        technical: "Temperature measurement"
      }
    }
  ];

  const experts: Record<'grammar' | 'medical' | 'technical', Expert> = {
    grammar: {
      name: "Language Expert",
      color: "#FBBF24",
      description: "Analyzes grammatical structure and language patterns",
      expertise: "Articles, verbs, syntax",
      confidenceThreshold: 0.7
    },
    medical: {
      name: "Medical Expert",
      color: "#34D399",
      description: "Processes medical terminology and health concepts",
      expertise: "Medical terms, conditions, symptoms",
      confidenceThreshold: 0.7
    },
    technical: {
      name: "Technical Expert",
      color: "#F472B6",
      description: "Handles measurements and technical data",
      expertise: "Numbers, units, technical terms",
      confidenceThreshold: 0.7
    }
  };

  // Process phases timing
  const phaseSequence: Array<'input' | 'tokenize' | 'route' | 'process' | 'combine'> = ['input', 'tokenize', 'route', 'process', 'combine'];
  const phaseDuration = 2000; // ms per phase

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProcessPhase(prev => {
        const currentIndex = phaseSequence.indexOf(prev);
        const nextIndex = (currentIndex + 1) % phaseSequence.length;
        
        // If we've completed a cycle, move to the next token
        if (nextIndex === 0) {
          setCurrentToken(prevToken => (prevToken + 1) % demoTokens.length);
        }
        
        return phaseSequence[nextIndex];
      });
    }, phaseDuration);

    return () => clearInterval(interval);
  }, [isPlaying, demoTokens.length]);

  const resetDemo = () => {
    setIsPlaying(false);
    setProcessPhase('input');
    setCurrentToken(0);
  };

  const getTokenColor = (token: Token): string => {
    if (token.type === 'grammar') return experts.grammar.color;
    if (token.type === 'medical') return experts.medical.color;
    if (token.type === 'technical') return experts.technical.color;
    return '#888888';
  };

  const getPhaseOpacity = (phase: 'input' | 'tokenize' | 'route' | 'process' | 'combine'): string => {
    return processPhase === phase ? 'opacity-100' : 'opacity-30';
  };

  return (
    <div className="w-full bg-gray-900 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-100">Mixture of Experts: Token Processing</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={resetDemo}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Input Sentence */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <div className="mb-2 text-gray-400 text-sm">Input Text:</div>
        <div className="font-mono text-lg text-gray-200">
          {demoSentence.split(' ').map((word, idx) => (
            <span 
              key={idx} 
              className={`inline-block mx-1 px-2 py-1 rounded ${currentToken === idx ? 'bg-blue-900 text-blue-100' : ''}`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Processing Pipeline Visualization */}
      <div className="flex justify-between items-center w-full h-24 relative mb-8">
        {/* Pipeline Phases */}
        <div className={`flex flex-col items-center ${getPhaseOpacity('input')}`}>
          <div className="w-16 h-16 flex items-center justify-center bg-blue-800 rounded-full mb-2">
            <MessageCircle size={24} className="text-blue-200" />
          </div>
          <div className="text-xs text-gray-400">Input</div>
        </div>
        
        <ArrowRight className="text-gray-600" />
        
        <div className={`flex flex-col items-center ${getPhaseOpacity('tokenize')}`}>
          <div className="w-16 h-16 flex items-center justify-center bg-green-800 rounded-full mb-2">
            <Split size={24} className="text-green-200" />
          </div>
          <div className="text-xs text-gray-400">Tokenize</div>
        </div>
        
        <ArrowRight className="text-gray-600" />
        
        <div className={`flex flex-col items-center ${getPhaseOpacity('route')}`}>
          <div className="w-16 h-16 flex items-center justify-center bg-purple-800 rounded-full mb-2">
            <Router size={24} className="text-purple-200" />
          </div>
          <div className="text-xs text-gray-400">Route</div>
        </div>
        
        <ArrowRight className="text-gray-600" />
        
        <div className={`flex flex-col items-center ${getPhaseOpacity('process')}`}>
          <div className="w-16 h-16 flex items-center justify-center bg-yellow-800 rounded-full mb-2">
            <Brain size={24} className="text-yellow-200" />
          </div>
          <div className="text-xs text-gray-400">Process</div>
        </div>
        
        <ArrowRight className="text-gray-600" />
        
        <div className={`flex flex-col items-center ${getPhaseOpacity('combine')}`}>
          <div className="w-16 h-16 flex items-center justify-center bg-pink-800 rounded-full mb-2">
            <Combine size={24} className="text-pink-200" />
          </div>
          <div className="text-xs text-gray-400">Combine</div>
        </div>
      </div>

      {/* Current Token and Experts */}
      {currentToken < demoTokens.length && (
        <div className="p-4 bg-gray-800 rounded-lg mb-6">
          <div className="text-sm text-gray-400 mb-2">Current Token:</div>
          <div className="flex justify-between items-center mb-4">
            <div 
              className="text-xl font-mono px-3 py-2 rounded-lg" 
              style={{ backgroundColor: `${getTokenColor(demoTokens[currentToken])}30`, color: getTokenColor(demoTokens[currentToken]) }}
            >
              {demoTokens[currentToken].text}
            </div>
            <div className="text-sm text-gray-400">
              Routed to: <span className="font-semibold" style={{ color: getTokenColor(demoTokens[currentToken]) }}>
                {experts[demoTokens[currentToken].type].name}
              </span>
            </div>
          </div>
          
          {/* Expert Analysis (shown during process phase) */}
          {processPhase === 'process' && (
            <div className="mt-4">
              <div className="text-sm text-gray-400 mb-2">Expert Analysis:</div>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(experts) as Array<'grammar' | 'medical' | 'technical'>).map(expertKey => (
                  <div 
                    key={expertKey}
                    className={`p-3 rounded-lg border ${
                      expertKey === demoTokens[currentToken].type 
                        ? 'border-2 opacity-100' 
                        : 'border opacity-50'
                    }`}
                    style={{ borderColor: experts[expertKey].color }}
                  >
                    <div className="text-sm font-semibold mb-1" style={{ color: experts[expertKey].color }}>
                      {experts[expertKey].name}
                    </div>
                    <div className="text-xs text-gray-300">
                      {demoTokens[currentToken].expertAnalysis[expertKey]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Routing Scores (shown during route phase) */}
      {processPhase === 'route' && currentToken < demoTokens.length && (
        <div className="p-4 bg-gray-800 rounded-lg mb-6">
          <div className="text-sm text-gray-400 mb-3">Routing Scores:</div>
          {(Object.keys(experts) as Array<'grammar' | 'medical' | 'technical'>).map(expertKey => (
            <div key={expertKey} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: experts[expertKey].color }}>{experts[expertKey].name}</span>
                <span className="text-gray-300">{Math.round(demoTokens[currentToken].routingScores[expertKey] * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{
                    width: `${demoTokens[currentToken].routingScores[expertKey] * 100}%`,
                    backgroundColor: experts[expertKey].color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualDemo; 