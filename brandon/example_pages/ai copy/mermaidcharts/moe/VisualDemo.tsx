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

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'input' | 'process' | 'route' | 'output' | 'detail';
}

interface FinalAnalysis {
  summary: string;
  expertise: {
    grammar: {
      contribution: string;
      confidence: number;
    };
    medical: {
      contribution: string;
      confidence: number;
    };
    technical: {
      contribution: string;
      confidence: number;
    };
  };
  conclusion: string;
  reliability: number;
}

const MoEDetailedDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [processPhase, setProcessPhase] = useState<'input' | 'tokenize' | 'route' | 'process' | 'combine'>('input'); // input, tokenize, route, process, combine
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [routingScores, setRoutingScores] = useState<{ [key in 'grammar' | 'medical' | 'technical']?: number }>({});
  const [expertOutput, setExpertOutput] = useState<{ [key in 'grammar' | 'medical' | 'technical']?: string }>({});
  const [combinedOutput, setCombinedOutput] = useState<string>('');

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

  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [totalTimelineSteps, setTotalTimelineSteps] = useState<number>(demoTokens.length * 5); // 5 phases per token
  const [timelinePosition, setTimelinePosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showConclusion, setShowConclusion] = useState<boolean>(true);

  const speedOptions = [0.5, 1, 1.5, 2];

  const logEndRef = useRef<HTMLDivElement>(null);

  // Add log entry with timestamp
  const addLogEntry = (message: string, type: LogEntry['type'] = 'detail') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogEntries(prev => [...prev, { timestamp, message, type }]);
  };

  // Update log based on phase changes
  useEffect(() => {
    if (!isPlaying) return;

    switch (processPhase) {
      case 'input':
        addLogEntry('📥 Receiving input text: "' + demoSentence + '"', 'input');
        break;
      case 'tokenize':
        addLogEntry('✂️ Tokenizing input text...', 'process');
        demoTokens.forEach((token, idx) => {
          addLogEntry(`   Token ${idx + 1}: "${token.text}"`, 'detail');
        });
        break;
      case 'route':
        if (currentStep < demoTokens.length) {
          const token = demoTokens[currentStep];
          addLogEntry(`🔄 Routing token "${token.text}"...`, 'route');
          Object.entries(token.routingScores).forEach(([expert, score]) => {
            addLogEntry(`   ${experts[expert as keyof typeof experts].name}: ${(score * 100).toFixed(1)}% confidence`, 'detail');
          });
        }
        break;
      case 'process':
        if (currentStep < demoTokens.length) {
          const token = demoTokens[currentStep];
          addLogEntry(`⚡ Processing "${token.text}" with experts...`, 'process');
          Object.entries(token.expertAnalysis).forEach(([expert, analysis]) => {
            addLogEntry(`   ${experts[expert as keyof typeof experts].name}: ${analysis}`, 'detail');
          });
        }
        break;
      case 'combine':
        if (currentStep < demoTokens.length) {
          addLogEntry(`✨ Combined output for "${demoTokens[currentStep].text}"`, 'output');
        }
        break;
    }
  }, [processPhase, currentStep, isPlaying]);

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logEndRef.current) {
      const logContainer = logEndRef.current.parentElement;
      if (logContainer) {
        logContainer.scrollTo({
          top: logContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [logEntries]);

  // Clear log on reset
  useEffect(() => {
    if (processPhase === 'input' && currentStep === 0) {
      setLogEntries([]);
    }
  }, [processPhase, currentStep]);

  // Update timeline position based on current progress
  useEffect(() => {
    if (!isDragging) {
      setTimelinePosition((currentStep * 5 + phaseSequence.indexOf(processPhase) + 1));
    }
  }, [currentStep, processPhase, isDragging]);

  // Handle timeline scrubbing
  const handleTimelineChange = (newPosition: number) => {
    setTimelinePosition(newPosition);
    const newStep = Math.floor(newPosition / 5);
    const newPhase = phaseSequence[newPosition % 5];
    setCurrentStep(newStep);
    setProcessPhase(newPhase);
  };

  // Final analysis summary
  const finalAnalysis: FinalAnalysis = {
    summary: "Patient Temperature Report",
    expertise: {
      grammar: {
        contribution: "Ensured proper sentence structure with definite article and linking verb",
        confidence: 0.92
      },
      medical: {
        contribution: "Identified patient context and vital sign measurement",
        confidence: 0.85
      },
      technical: {
        contribution: "Validated temperature measurement and units",
        confidence: 0.95
      }
    },
    conclusion: "Valid medical temperature reading with proper grammatical structure and technical accuracy",
    reliability: 0.91
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isPlaying) {
      if (processPhase === 'input') {
        timer = setTimeout(() => {
          setProcessPhase('tokenize');
        }, phaseDuration / playbackSpeed);
      } else if (processPhase === 'tokenize') {
        timer = setTimeout(() => {
          setProcessPhase('route');
        }, phaseDuration / playbackSpeed);
      } else if (processPhase === 'route' && currentStep < demoTokens.length) {
        setRoutingScores(demoTokens[currentStep].routingScores);
        timer = setTimeout(() => {
          setProcessPhase('process');
        }, phaseDuration / playbackSpeed);
      } else if (processPhase === 'process') {
        setExpertOutput(demoTokens[currentStep].expertAnalysis);
        timer = setTimeout(() => {
          setProcessPhase('combine');
        }, phaseDuration / playbackSpeed);
      } else if (processPhase === 'combine') {
        setCombinedOutput(demoTokens[currentStep].text);
        timer = setTimeout(() => {
          if (currentStep < demoTokens.length - 1) {
            setCurrentStep(prev => prev + 1);
            setProcessPhase('route');
          } else {
            setIsPlaying(false);
          }
        }, phaseDuration / playbackSpeed);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, processPhase, currentStep, playbackSpeed]);

  const resetDemo = () => {
    setCurrentStep(0);
    setProcessPhase('input');
    setRoutingScores({});
    setExpertOutput({});
    setCombinedOutput('');
    setLogEntries([]);
    setIsPlaying(false);
  };

  const getPhaseOpacity = (phase: 'input' | 'tokenize' | 'route' | 'process' | 'combine'): string => {
    if (processPhase === phase) return "opacity-100";
    return "opacity-30";
  };

  return (
    <div className="space-y-8 p-6 bg-gray-900 rounded-lg">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Mixture of Experts: Detailed Process Flow</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isPlaying ? (
              <><Pause className="w-4 h-4 mr-2" /> Pause</>
            ) : (
              <><Play className="w-4 h-4 mr-2" /> Start Demo</>
            )}
          </button>
          <button
            onClick={resetDemo}
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Process Flow Visualization */}
      <div className="grid grid-cols-5 gap-4">
        {/* Input Phase */}
        <div className={`p-4 rounded-lg border border-blue-500 ${getPhaseOpacity('input')}`}>
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <span className="text-white font-medium">Input</span>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-gray-300">{demoSentence}</p>
          </div>
        </div>

        {/* Tokenization Phase */}
        <div className={`p-4 rounded-lg border border-purple-500 ${getPhaseOpacity('tokenize')}`}>
          <div className="flex items-center space-x-2 mb-4">
            <Split className="w-6 h-6 text-purple-500" />
            <span className="text-white font-medium">Tokenize</span>
          </div>
          <div className="space-y-2">
            {demoTokens.map((token, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 rounded bg-gray-800 text-gray-300 ${processPhase === 'tokenize' ? 'animate-pulse' : ''
                  }`}
              >
                {token.text}
              </div>
            ))}
          </div>
        </div>

        {/* Router Phase */}
        <div className={`p-4 rounded-lg border border-pink-500 ${getPhaseOpacity('route')}`}>
          <div className="flex items-center space-x-2 mb-4">
            <Router className="w-6 h-6 text-pink-500" />
            <span className="text-white font-medium">Route</span>
          </div>
          {processPhase === 'route' && (
            <div className="space-y-3">
              {Object.entries(routingScores).map(([expert, score]) => (
                <div key={expert} className="flex items-center space-x-2">
                  <div className="w-24 text-gray-400 text-sm">{experts[expert as keyof typeof experts].name}</div>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(score ?? 0) * 100}%`,
                        backgroundColor: experts[expert as keyof typeof experts].color
                      }}
                    />
                  </div>
                  <div className="w-12 text-right text-gray-400 text-sm">
                    {score !== undefined ? `${(score * 100).toFixed(0)}%` : '0%'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Processing Phase */}
        <div className={`p-4 rounded-lg border border-yellow-500 ${getPhaseOpacity('process')}`}>
          <div className="flex items-center space-x-2 mb-4">
            <Network className="w-6 h-6 text-yellow-500" />
            <span className="text-white font-medium">Process</span>
          </div>
          {processPhase === 'process' && (
            <div className="space-y-3">
              {Object.entries(expertOutput).map(([expert, analysis]) => (
                <div
                  key={expert}
                  className="p-2 rounded bg-gray-800"
                  style={{ borderLeft: `4px solid ${experts[expert as keyof typeof experts].color}` }}
                >
                  <div className="text-sm font-medium" style={{ color: experts[expert as keyof typeof experts].color }}>
                    {experts[expert as keyof typeof experts].name}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {analysis}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Combination Phase */}
        <div className={`p-4 rounded-lg border border-green-500 ${getPhaseOpacity('combine')}`}>
          <div className="flex items-center space-x-2 mb-4">
            <Combine className="w-6 h-6 text-green-500" />
            <span className="text-white font-medium">Combine</span>
          </div>
          <div className="space-y-2">
            {combinedOutput && (
              <div className="p-3 bg-gray-800 rounded text-white">
                {combinedOutput}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Description */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white font-medium mb-2">Current Process:</h3>
        <p className="text-gray-300">
          {processPhase === 'input' && "Initial text input received, preparing for processing..."}
          {processPhase === 'tokenize' && "Breaking down input text into individual tokens for analysis..."}
          {processPhase === 'route' && "Router evaluating token characteristics to assign expert processing..."}
          {processPhase === 'process' && "Experts analyzing token based on their specializations..."}
          {processPhase === 'combine' && "Combining expert analyses into final output..."}
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm">
          Token {currentStep + 1} of {demoTokens.length}
        </div>
        <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep * 5 + phaseSequence.indexOf(processPhase) + 1) / (demoTokens.length * 5)) * 100}%`
            }}
          />
        </div>
        <div className="text-gray-400 text-sm">
          Phase: {processPhase.charAt(0).toUpperCase() + processPhase.slice(1)}
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          {/* Playback Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isPlaying ? (
                <><Pause className="w-4 h-4 mr-2" /> Pause</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Play</>
              )}
            </button>

            {/* Speed Control */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
              >
                {speedOptions.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}x
                  </option>
                ))}
              </select>
            </div>

            {/* Current Position */}
            <div className="text-gray-400 text-sm">
              Step {timelinePosition} of {totalTimelineSteps}
            </div>
          </div>

          {/* Reset */}
          <div className="flex items-center space-x-4">
            <button
              onClick={resetDemo}
              className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={totalTimelineSteps}
            value={timelinePosition}
            onChange={(e) => handleTimelineChange(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="w-full"
          />
          {/* Timeline Markers */}
          <div className="flex justify-between text-xs text-gray-400">
            {demoTokens.map((token, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-px h-2 bg-gray-700" />
                <span>{token.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Log */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        {/* Process Log Header */}
        <div className="bg-gray-800 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <h3 className="text-white font-medium">Process Log</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">{logEntries.length} entries</span>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setLogEntries([])}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Process Log Details */}
        <div className="max-h-64 overflow-y-auto bg-gray-900 p-4 scroll-smooth">
          <div className="space-y-2">
            {logEntries.map((entry, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 text-sm font-mono ${entry.type === 'detail' ? 'text-gray-400' : 'text-white'
                  }`}
              >
                <span className="text-gray-500 flex-shrink-0">{entry.timestamp}</span>
                <span className="flex-1" style={{
                  color: {
                    input: '#60A5FA',
                    process: '#34D399',
                    route: '#F472B6',
                    output: '#FBBF24',
                    detail: '#9CA3AF'
                  }[entry.type]
                }}>
                  {entry.message}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Final Analysis Panel */}
      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
          {finalAnalysis.summary}
        </h3>

        <div className="grid grid-cols-3 gap-6">
          {Object.entries(finalAnalysis.expertise).map(([expert, analysis]) => (
            <div
              key={expert}
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${experts[expert as keyof typeof experts].color}15` }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="w-5 h-5" style={{ color: experts[expert as keyof typeof experts].color }} />
                <h4 className="font-medium text-white">{experts[expert as keyof typeof experts].name}</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">{analysis.contribution}</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${analysis.confidence * 100}%`,
                      backgroundColor: experts[expert as keyof typeof experts].color
                    }}
                  />
                </div>
                <span className="text-sm text-gray-400">
                  {(analysis.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-white">{finalAnalysis.conclusion}</p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Overall Reliability:</span>
              <span className="text-green-400 font-medium">
                {(finalAnalysis.reliability * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoEDetailedDemo;
