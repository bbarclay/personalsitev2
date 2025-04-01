import { Polynomial, Term } from '../types';

export class PolynomialOperations {
    static add(p1: Polynomial, p2: Polynomial): Polynomial {
        return new Polynomial([...p1.terms, ...p2.terms]);
    }

    static subtract(p1: Polynomial, p2: Polynomial): Polynomial {
        const negatedTerms = p2.terms.map(term => ({
            ...term,
            coefficient: -term.coefficient
        }));
        return new Polynomial([...p1.terms, ...negatedTerms]);
    }

    static multiply(p1: Polynomial, p2: Polynomial): Polynomial {
        const terms: Term[] = [];
        for (const t1 of p1.terms) {
            for (const t2 of p2.terms) {
                terms.push({
                    coefficient: t1.coefficient * t2.coefficient,
                    exponent: t1.exponent + t2.exponent
                });
            }
        }
        return new Polynomial(terms);
    }

    static derivative(p: Polynomial): Polynomial {
        const terms = p.terms.map(term => ({
            coefficient: term.coefficient * term.exponent,
            exponent: Math.max(0, term.exponent - 1)
        })).filter(term => term.coefficient !== 0);
        return new Polynomial(terms);
    }

    static integral(p: Polynomial): Polynomial {
        const terms = p.terms.map(term => ({
            coefficient: term.coefficient / (term.exponent + 1),
            exponent: term.exponent + 1
        }));
        return new Polynomial(terms);
    }
}