'use client';
import React, { useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { BaseVisualizer, ControlPanel, VisualizationPanel, MetricsPanel, MetricCard } from '@/components/math/BaseVisualizer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Individual {
  genome: number[];
  fitness: number;
}

interface GAState {
  population: Individual[];
  generation: number;
}

const GeneticAlgorithmBiology: React.FC = () => {
  const [params, setParams] = useState({
    populationSize: 50,
    genomeLength: 10,
    mutationRate: 0.01,
    crossoverRate: 0.7,
    maxGenerations: 100
  });

  const [state, setState] = useState<GAState>({
    population: [],
    generation: 0
  });

  const initializePopulation = () => {
    const population = Array.from({ length: params.populationSize }, () => ({
      genome: Array.from({ length: params.genomeLength }, () => Math.round(Math.random())),
      fitness: 0
    }));
    setState({
      population,
      generation: 0
    });
  };

  const evaluateFitness = (individual: Individual) => {
    // Example fitness function: Maximize the number of 1s in the genome
    return individual.genome.reduce((sum, gene) => sum + gene, 0);
  };

  const runGeneration = useCallback(() => {
    try {
      const evaluatedPopulation = state.population.map(individual => ({
        ...individual,
        fitness: evaluateFitness(individual)
      }));

      // Selection (e.g., roulette wheel selection)
      const totalFitness = evaluatedPopulation.reduce((sum, ind) => sum + ind.fitness, 0);
      const probabilities = evaluatedPopulation.map(ind => ind.fitness / totalFitness);

      const newPopulation: Individual[] = [];

      while (newPopulation.length < params.populationSize) {
        // Selection
        const parent1 = selectIndividual(evaluatedPopulation, probabilities);
        const parent2 = selectIndividual(evaluatedPopulation, probabilities);

        // Crossover
        let child1Genome = parent1.genome.slice();
        let child2Genome = parent2.genome.slice();
        if (Math.random() < params.crossoverRate) {
          const crossoverPoint = Math.floor(Math.random() * params.genomeLength);
          child1Genome = parent1.genome.slice(0, crossoverPoint).concat(parent2.genome.slice(crossoverPoint));
          child2Genome = parent2.genome.slice(0, crossoverPoint).concat(parent1.genome.slice(crossoverPoint));
        }

        // Mutation
        child1Genome = mutateGenome(child1Genome);
        child2Genome = mutateGenome(child2Genome);

        newPopulation.push({ genome: child1Genome, fitness: 0 });
        if (newPopulation.length < params.populationSize) {
          newPopulation.push({ genome: child2Genome, fitness: 0 });
        }
      }

      setState(prevState => ({
        population: newPopulation,
        generation: prevState.generation + 1
      }));
    } catch (error) {
      console.error('Error running generation:', error);
      // Optionally, set an error state to inform the user
    }
  }, [state.population, params]);

  const selectIndividual = (population: Individual[], probabilities: number[]) => {
    const cumulativeProbabilities = probabilities.reduce((acc, prob, idx) => {
      acc.push((acc[idx - 1] || 0) + prob);
      return acc;
    }, [] as number[]);

    const rand = Math.random();
    for (let i = 0; i < cumulativeProbabilities.length; i++) {
      if (rand <= cumulativeProbabilities[i]) {
        return population[i];
      }
    }
    return population[population.length - 1];
  };

  const mutateGenome = (genome: number[]) => {
    return genome.map(gene => (Math.random() < params.mutationRate ? 1 - gene : gene));
  };

  useEffect(() => {
    initializePopulation();
  }, []);

  useEffect(() => {
    // ...existing code to update visualization...
  }, [state]);

  return (
    <BaseVisualizer
      title="Genetic Algorithm in Biology"
      description="Simulate evolutionary processes using genetic algorithms."
      reference="Some reference text"
    >
      <div className="space-y-4">
        <div>
          <label>Mutation Rate</label>
          <input
            type="range"
            value={params.mutationRate}
            onChange={(e) => setParams(p => ({ ...p, mutationRate: parseFloat(e.target.value) }))}
            min={0}
            max={0.1}
            step={0.001}
          />
        </div>
        <Button onClick={runGeneration}>
          Run Generation {state.generation + 1}
        </Button>
      </div>

      <div className="visualization">
        {/* Visualization code here */}
      </div>

      <div className="metrics">
        {/* Metrics display here */}
      </div>
    </BaseVisualizer>
  );
};

export default GeneticAlgorithmBiology;
