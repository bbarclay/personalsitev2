import { Term, Polynomial } from '../types';

export class PolynomialParser {
    private static termRegex = /([+-]?\s*\d*\.?\d*)?(?:x(?:\^(\d+))?)?/g;

    static parse(input: string): Polynomial {
        // Clean and normalize input
        input = input.replace(/\s+/g, '')
                    .replace(/-/g, '+-')
                    .replace(/^\+/, '');
        
        if (!input) return new Polynomial();

        const terms: Term[] = [];
        const matches = input.split('+').filter(Boolean);

        for (const match of matches) {
            const term = this.parseTerm(match);
            if (term) terms.push(term);
        }

        return new Polynomial(terms);
    }

    private static parseTerm(input: string): Term | null {
        if (!input) return null;

        let coefficient = 1;
        let exponent = 0;

        // Handle special cases
        if (input === 'x') return { coefficient: 1, exponent: 1 };
        if (input === '-x') return { coefficient: -1, exponent: 1 };

        const parts = input.split('x');
        
        // Handle coefficient
        if (parts[0]) {
            coefficient = parseFloat(parts[0]);
            if (isNaN(coefficient)) return null;
        }

        // Handle exponent
        if (parts.length > 1) {
            exponent = parts[1].startsWith('^') ? 
                parseInt(parts[1].substring(1)) : 1;
            if (isNaN(exponent)) return null;
        }

        return { coefficient, exponent };
    }

    static validate(input: string): boolean {
        try {
            this.parse(input);
            return true;
        } catch {
            return false;
        }
    }
}