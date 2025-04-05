# Floor Prime Discovery

This directory contains files related to the Structural Invariant Primality Test discovery, a novel approach to understanding primality through group-theoretic properties.

## Key Concept

The Structural Invariant Primality Theorem states that a positive integer n > 1 is prime if and only if its Galois structure invariant equals φ(n-1)/(n-1), where φ is Euler's totient function.

This establishes a profound connection between primality and the multiplicative group structure of integers modulo n.

## Directory Contents

### Documentation
- `structural_invariant_paper.md` - Comprehensive paper on the theory
- `structural_invariant_proof.md` - Formal proof of the theorem
- `key_insights_simplified.md` - Simplified explanation of key insights
- `theoretical_connections.md` - Connections to other areas of mathematics
- `new_prime_insights.md` - Novel insights about prime numbers
- `reproduction_guide.md` - Guide for reproducing the results

### Implementations
- `primality_test.py` - Core implementation of the test
- `extended_validation.py` - Extended validation on larger numbers
- `performance_benchmark.py` - Performance comparison with other primality tests

### Analysis
- `fraction_analysis.md` - Analysis of fraction patterns in invariant values
- `zero_analysis.md` - Analysis of the zero invariant for composite numbers
- `case_analysis.md` - Detailed analysis of specific test cases

### Visualizations
- `visualization_proposal.md` - Proposals for visualizing the results
- `accuracy_comparison.png` - Accuracy comparison with other tests
- `time_comparison.png` - Time comparison with other tests

### Reference
- `reference/` - Contains reference implementations and documentation

## Significance

This discovery offers a new perspective on primality, viewing it through the lens of group-theoretic structure rather than traditional divisibility properties. While not computationally competitive with modern primality tests, it provides deep theoretical insights into the nature of prime numbers.

The perfect binary classification (non-zero invariant for primes, zero for composites) demonstrates that primality is fundamentally a structural property that manifests in the architecture of the multiplicative group. 