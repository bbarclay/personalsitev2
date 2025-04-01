import { useState, useCallback, useRef, useEffect } from 'react';
import _ from 'lodash';
import { DataPoint, TrainingPhase } from '../types';
import { generateData, predict } from '../utils';

interface TrainingState {
  iteration: number;
  data: DataPoint[];
  weights: number[];
  loss: number[];
  isTraining: boolean;
  trainingPhase: TrainingPhase;
  error: string | null;
}

interface TrainingActions {
  handlePlayPause: () => void;
  handleReset: () => void;
}

const UPDATE_INTERVAL = 100; // ms between updates

export function useTraining(): [TrainingState, TrainingActions] {
  const [iteration, setIteration] = useState<number>(0);
  const [data, setData] = useState<DataPoint[]>([]);
  const [weights, setWeights] = useState<number[]>([0, 0, 0]);
  const [loss, setLoss] = useState<number[]>([]);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingPhase, setTrainingPhase] = useState<TrainingPhase>('starting');
  const [error, setError] = useState<string | null>(null);

  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  const initializeTraining = useCallback(() => {
    try {
      const initialData = generateData();
      setData(initialData);
      setWeights([
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.2 - 0.1,
      ]);
      setIteration(0);
      setLoss([]);
      setTrainingPhase('starting');
      setError(null);
      setIsTraining(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize training');
      setIsTraining(false);
    }
  }, []);

  const performTrainingStep = useCallback(() => {
    try {
      if (iteration >= 100) {
        setIsTraining(false);
        setTrainingPhase('complete');
        return;
      }

      // Update training phase messages
      if (iteration < 20) setTrainingPhase('exploring');
      else if (iteration < 50) setTrainingPhase('learning');
      else if (iteration < 80) setTrainingPhase('refining');
      else setTrainingPhase('finalizing');

      setWeights((prevWeights) => {
        const learningRate = 0.1;
        const newWeights = [...prevWeights];
        const batch = _.sampleSize(data, 10);
        const gradients = [0, 0, 0];

        batch.forEach((point) => {
          const prediction = predict(point, prevWeights);
          const error = prediction - point.label;
          gradients[0] += error;
          gradients[1] += error * point.x;
          gradients[2] += error * point.y;
        });

        for (let i = 0; i < newWeights.length; i++) {
          newWeights[i] -= (learningRate * gradients[i]) / batch.length;
        }

        const totalLoss = _.sumBy(data, (point) => {
          const pred = predict(point, newWeights);
          return (
            -point.label * Math.log(pred + 1e-10) -
            (1 - point.label) * Math.log(1 - pred + 1e-10)
          );
        }) / data.length;

        setLoss((prev) => [...prev, totalLoss]);
        return newWeights;
      });

      setIteration((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error during training step');
      setIsTraining(false);
    }
  }, [iteration, data]);

  const animate = useCallback((timestamp: number) => {
    if (!isTraining) return;

    if (timestamp - lastUpdateTimeRef.current >= UPDATE_INTERVAL) {
      performTrainingStep();
      lastUpdateTimeRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isTraining, performTrainingStep]);

  useEffect(() => {
    initializeTraining();
  }, [initializeTraining]);

  useEffect(() => {
    if (isTraining && data.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTraining, data, animate]);

  const handlePlayPause = useCallback(() => {
    setIsTraining(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    initializeTraining();
  }, [initializeTraining]);

  return [
    { iteration, data, weights, loss, isTraining, trainingPhase, error },
    { handlePlayPause, handleReset }
  ];
}