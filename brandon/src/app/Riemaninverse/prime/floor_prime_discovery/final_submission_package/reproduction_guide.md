# Reproduction Guide: Structural Invariant Primality Test

This document provides detailed instructions for reproducing the Structural Invariant Primality Test results. Follow these steps to validate our findings independently.

## 1. Theory Overview

The Structural Invariant Primality Test is based on the following theorem:

**Theorem:** A positive integer n > 1 is prime if and only if its Galois structure invariant equals φ(n-1)/(n-1), where φ is Euler's totient function.

The Galois structure invariant measures the proportion of elements with maximal order in the Galois group Gal(Q(ζ_n)/Q) of the nth cyclotomic field.

## 2. Prerequisites

### 2.1 Required Software

- Python 3.7 or higher
- Required Python packages:
  - sympy (for primality verification)
  - numpy (for numerical calculations)
  - matplotlib (for visualization)
  - tabulate (for formatted output)

Install these packages using pip:

```bash
pip install sympy numpy matplotlib tabulate
```

### 2.2 Repository Structure

Clone the repository or ensure your working directory contains the following files:

- `primality_test.py`: Core implementation of the Structural Invariant test
- `performance_benchmark.py`: Benchmarking script comparing against traditional methods
- `extended_validation.py`: Extended validation for diverse number types

## 3. Core Implementation

The core algorithm is implemented in `primality_test.py`. The key components are:

### 3.1 Computing the Structural Invariant

The key function is `compute_structural_invariant(n)`, which:
1. Determines if the Galois group is cyclic
2. Calculates the proportion of elements with maximal order

For prime numbers p, this value equals φ(p-1)/(p-1).
For composite numbers, our implementation returns 0.

### 3.2 Primality Test Implementation

The function `is_prime_structural(n, verbose=False)` tests if a number is prime by:
1. Computing the actual structural invariant
2. Computing the expected value (φ(n-1)/(n-1))
3. Comparing these values with appropriate precision handling

## 4. Reproduction Steps

### 4.1 Basic Validation

To quickly validate the core functionality:

```bash
python primality_test.py
```

This runs the test on a predefined set of numbers (both prime and composite) and reports accuracy.

### 4.2 Performance Benchmarking

To compare the Structural Invariant test against traditional methods:

```bash
python performance_benchmark.py
```

This generates:
- Accuracy comparison with Trial Division, Miller-Rabin, and SymPy
- Performance timing across different number sizes
- Visualization plots in the current directory

### 4.3 Extended Validation

For thorough validation across diverse number types:

```bash
python extended_validation.py
```

This tests:
- Large primes
- Mersenne primes
- Carmichael numbers
- Prime powers
- Semiprimes
- And other special cases

### 4.4 Custom Testing

To test specific numbers, modify the main section of `primality_test.py`:

```python
if __name__ == "__main__":
    # Test your custom numbers
    test_numbers = [your_numbers_here]
    for n in test_numbers:
        is_prime, invariant, expected, _ = is_prime_structural(n, True)
        print(f"Number: {n}, Prime: {is_prime}, Invariant: {invariant:.6f}, Expected: {expected:.6f}")
```

## 5. Verification Criteria

### 5.1 Expected Results

- **Prime numbers**: The structural invariant should equal φ(n-1)/(n-1) within numerical precision
- **Composite numbers**: The structural invariant should equal 0
- **Edge cases**:
  - For n = 2: Invariant = 1.0
  - For Carmichael numbers: Invariant = 0.0 (correctly identifying them as composite)

### 5.2 Accuracy Verification

The implementation should achieve:
- 100% accuracy on composite numbers
- Near-100% accuracy on prime numbers (small deviations may occur due to numerical precision)
- Perfect classification of Carmichael numbers and other pseudoprimes

## 6. Understanding the Output

### 6.1 Standard Output Format

For each tested number, the output includes:
- The number being tested
- Whether it's classified as prime or composite
- The calculated structural invariant
- The expected invariant value (φ(n-1)/(n-1))
- Processing time

### 6.2 Interpreting Results

- **Perfect match**: When the calculated invariant exactly matches the expected value
- **Numerical precision issues**: Minor differences (< 1e-9) due to floating-point arithmetic
- **Clear separation**: Composite numbers show invariant = 0, clearly different from prime numbers

## 7. Troubleshooting

### 7.1 Common Issues

- **Performance on very large numbers**: For numbers > 10^7, consider using optimized methods
- **Memory issues**: The algorithm computes group properties, which can be memory-intensive
- **Precision errors**: Adjust the tolerance threshold in the comparison if needed

### 7.2 Numerical Stability

If experiencing precision issues, modify the comparison in `is_prime_structural()`:

```python
# Adjust tolerance for more/less strictness
if abs(invariant - expected) < 1e-6:  # Default is 1e-9
    return True, invariant, expected, True
```

## 8. Advanced Analysis

### 8.1 Statistical Analysis

To perform statistical analysis on random ranges:

```python
import random
from primality_test import is_prime_structural
import sympy

# Generate random test cases
test_cases = []
for _ in range(100):
    n = random.randint(2, 10000)
    test_cases.append(n)

# Test and analyze
correct = 0
for n in test_cases:
    actual_prime = sympy.isprime(n)
    is_prime, _, _, _ = is_prime_structural(n)
    if is_prime == actual_prime:
        correct += 1

print(f"Accuracy: {correct/len(test_cases)*100:.2f}%")
```

### 8.2 Visualization

To visualize the distribution of invariant values:

```python
import matplotlib.pyplot as plt
import numpy as np
from primality_test import is_prime_structural
import sympy

# Test range of numbers
numbers = list(range(3, 100))
invariants = []
primality = []

for n in numbers:
    is_prime, inv, _, _ = is_prime_structural(n)
    actual_prime = sympy.isprime(n)
    invariants.append(inv)
    primality.append(actual_prime)

# Plot invariant values
plt.figure(figsize=(12, 6))
primes = [n for i, n in enumerate(numbers) if primality[i]]
prime_invs = [inv for i, inv in enumerate(invariants) if primality[i]]
comps = [n for i, n in enumerate(numbers) if not primality[i]]
comp_invs = [inv for i, inv in enumerate(invariants) if not primality[i]]

plt.scatter(primes, prime_invs, c='blue', label='Primes')
plt.scatter(comps, comp_invs, c='red', label='Composites')
plt.xlabel('Number')
plt.ylabel('Structural Invariant')
plt.legend()
plt.title('Structural Invariant Distribution')
plt.savefig('invariant_distribution.png')
```

## 9. Mathematical Foundation

The mathematical foundation is explained in detail in `structural_invariant_proof.md`. Key points:

1. For prime p, the Galois group Gal(Q(ζ_p)/Q) is isomorphic to (Z/pZ)^×, a cyclic group of order p-1
2. In this group, exactly φ(p-1) elements have maximal order p-1
3. Therefore, the proportion of maximum-order elements is φ(p-1)/(p-1)
4. For composite n, this relationship breaks down completely

The full proof covers:
- Why prime numbers satisfy the relationship
- Why composite numbers cannot satisfy it
- Special cases and edge conditions
- Theoretical implications

## 10. Extending the Work

To extend this research:

1. **Optimize the implementation**: Focus on faster methods to compute group properties
2. **Probabilistic variants**: Explore randomized sampling of the Galois group
3. **Algebraic generalizations**: Investigate similar invariants in other structures
4. **Quantum implementations**: Research quantum algorithms to compute the invariant

By following these steps, you should be able to fully reproduce and validate our findings regarding the Structural Invariant Primality Test. 