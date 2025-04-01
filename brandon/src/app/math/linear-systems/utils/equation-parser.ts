import { LinearEquation } from '../types';

interface ParsedTerm {
  coefficient: number;
  variable: string | null;
}

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}

function parseTerm(term: string): ParsedTerm {
  // Handle empty terms
  if (!term) {
    return { coefficient: 0, variable: null };
  }

  // Remove leading + if present
  term = term.replace(/^\+/, '');

  // Special case for standalone variables (x, -x, +x)
  if (term.match(/^[+-]?[a-z]$/i)) {
    return {
      coefficient: term.startsWith('-') ? -1 : 1,
      variable: term.replace(/[+-]/g, '').toLowerCase()
    };
  }

  // Handle pure numbers
  if (term.match(/^[+-]?\d*\.?\d*$/)) {
    return {
      coefficient: parseFloat(term) || 0,
      variable: null
    };
  }

  // Handle coefficients with variables
  const match = term.match(/^([+-]?\d*\.?\d*)?([a-z])$/i);
  if (match) {
    const [, coeff, variable] = match;
    return {
      coefficient: coeff === '' || coeff === '+' ? 1 :
                  coeff === '-' ? -1 :
                  parseFloat(coeff),
      variable: variable.toLowerCase()
    };
  }

  throw new ParseError(`Invalid term: ${term}`);
}

export function parseEquation(equation: string, variables: string[]): LinearEquation {
  try {
    // Normalize the equation
    equation = equation
      .replace(/\s+/g, '') // Remove whitespace
      .replace(/(\d)([a-z])/gi, '$1*$2') // Add implicit multiplication
      .replace(/\*+/g, '*') // Normalize multiple multiplication signs
      .toLowerCase();

    // Split by equals sign
    const parts = equation.split('=');
    if (parts.length !== 2) {
      throw new ParseError('Equation must contain exactly one equals sign');
    }

    const [leftSide, rightSide] = parts;
    if (!leftSide || !rightSide) {
      throw new ParseError('Both sides of the equation must be non-empty');
    }

    // Initialize coefficients array with zeros
    const coefficients = new Array(variables.length).fill(0);
    let constant = 0;

    // Process right side first (moving everything to the left)
    rightSide.split(/(?=[-+])/).forEach(term => {
      const parsed = parseTerm(term);
      if (parsed.variable) {
        const varIndex = variables.indexOf(parsed.variable);
        if (varIndex === -1) {
          throw new ParseError(`Unknown variable: ${parsed.variable}`);
        }
        coefficients[varIndex] -= parsed.coefficient;
      } else {
        constant += parsed.coefficient;
      }
    });

    // Process left side
    leftSide.split(/(?=[-+])/).forEach(term => {
      const parsed = parseTerm(term);
      if (parsed.variable) {
        const varIndex = variables.indexOf(parsed.variable);
        if (varIndex === -1) {
          throw new ParseError(`Unknown variable: ${parsed.variable}`);
        }
        coefficients[varIndex] += parsed.coefficient;
      } else {
        constant -= parsed.coefficient;
      }
    });

    // Validate the equation
    if (coefficients.every(c => Math.abs(c) < 1e-10)) {
      throw new ParseError('Equation must contain at least one variable term');
    }

    return { coefficients, constant };

  } catch (error) {
    if (error instanceof ParseError) {
      throw error;
    }
    throw new ParseError(`Failed to parse equation: ${equation}`);
  }
}

export function formatEquation(equation: LinearEquation, variables: string[]): string {
  const terms: string[] = [];

  equation.coefficients.forEach((coeff, index) => {
    if (Math.abs(coeff) < 1e-10) return;

    const term = coeff === 1 ? variables[index] :
                coeff === -1 ? `-${variables[index]}` :
                `${coeff}${variables[index]}`;
    terms.push(term);
  });

  if (equation.constant !== 0) {
    terms.push(equation.constant.toString());
  }

  if (terms.length === 0) return '0 = 0';

  return terms
    .map((term, i) => {
      if (i === 0) return term;
      return term.startsWith('-') ? term : `+${term}`;
    })
    .join(' ') + ' = 0';
}

export function validateVariables(variables: string[]): void {
  if (!variables.length) {
    throw new ParseError('At least one variable must be specified');
  }

  const seen = new Set<string>();
  for (const variable of variables) {
    if (!variable.match(/^[a-z]$/i)) {
      throw new ParseError('Variables must be single letters');
    }
    
    const normalized = variable.toLowerCase();
    if (seen.has(normalized)) {
      throw new ParseError(`Duplicate variable: ${variable}`);
    }
    seen.add(normalized);
  }
}
