#!/usr/bin/env python3
"""
Structural Invariant Primality Test
Core implementation of the structural invariant primality test algorithm.
"""

from math import gcd
from typing import Tuple
import time

def compute_structural_invariant(n: int) -> float:
    """
    Compute the structural invariant for a number n.
    For primes p: returns φ(p-1)/(p-1)
    For composites: returns 0
    """
    if n <= 1:
        return 0.0

    # Find elements of maximal order
    max_order = 0
    max_order_count = 0

    for a in range(1, n):
        if gcd(a, n) == 1:
            # Calculate multiplicative order
            order = 1
            value = a % n
            while value != 1:
                value = (value * a) % n
                order += 1
                if order > n:  # Early exit for efficiency
                    break
            if order == n - 1:
                max_order_count += 1
            max_order = max(max_order, order)

    # Calculate invariant
    if max_order == n - 1:
        # Count numbers coprime to n-1
        phi_n_minus_1 = sum(1 for i in range(1, n) if gcd(i, n-1) == 1)
        if max_order_count == phi_n_minus_1:
            return float(phi_n_minus_1) / (n - 1)
    return 0.0

def is_prime_structural(n: int) -> Tuple[bool, float]:
    """
    Test if a number is prime using the structural invariant method.
    Returns (is_prime, invariant_value)
    """
    invariant = compute_structural_invariant(n)
    return invariant > 0, invariant

def verify_special_cases() -> dict:
    """Verify the test on special numbers."""
    special_cases = {
        'small_primes': [2, 3, 5, 7, 11, 13, 17, 19],
        'carmichael': [561, 1105, 1729, 2465, 2821],
        'fermat': [3, 5, 17, 257, 65537],
        'mersenne': [3, 7, 31, 127],
        'perfect_powers': [4, 8, 9, 16, 25, 27, 32]
    }
    
    results = {}
    for category, numbers in special_cases.items():
        results[category] = {}
        for n in numbers:
            is_prime, invariant = is_prime_structural(n)
            results[category][n] = {
                'is_prime': is_prime,
                'invariant': invariant,
                'expected': all(n % i != 0 for i in range(2, int(n**0.5) + 1))
            }
    
    return results

def benchmark(max_n: int = 1000) -> dict:
    """Run benchmark tests up to max_n."""
    results = {
        'timing': 0,
        'tested': 0,
        'correct': 0,
        'primes_found': 0
    }
    
    start_time = time.time()
    
    for n in range(2, max_n + 1):
        results['tested'] += 1
        
        # Structural invariant test
        is_prime, _ = is_prime_structural(n)
        
        # Standard primality test for verification
        actual_prime = all(n % i != 0 for i in range(2, int(n**0.5) + 1))
        
        if is_prime == actual_prime:
            results['correct'] += 1
        if is_prime:
            results['primes_found'] += 1
    
    results['timing'] = time.time() - start_time
    return results

def main():
    """Run comprehensive testing of the structural invariant method."""
    print("Structural Invariant Primality Test")
    print("=" * 40)
    
    # Test special cases
    print("\nTesting special cases:")
    special_results = verify_special_cases()
    for category, results in special_results.items():
        print(f"\n{category.title()}:")
        for n, data in results.items():
            mark = "✓" if data['is_prime'] == data['expected'] else "✗"
            print(f"{n}: [{mark}] {'Prime' if data['is_prime'] else 'Composite'} (invariant: {data['invariant']:.6f})")
    
    # Run benchmark
    print("\nRunning benchmark:")
    benchmark_results = benchmark()
    print(f"\nResults for n ≤ 1000:")
    print(f"Numbers tested: {benchmark_results['tested']}")
    print(f"Correct results: {benchmark_results['correct']}")
    print(f"Accuracy: {(benchmark_results['correct']/benchmark_results['tested'])*100:.2f}%")
    print(f"Primes found: {benchmark_results['primes_found']}")
    print(f"Time taken: {benchmark_results['timing']:.2f} seconds")
    
    # Test individual numbers
    test_numbers = [2, 3, 4, 5, 7, 11, 13, 561, 1105]
    print("\nTesting individual numbers:")
    for n in test_numbers:
        is_prime, invariant = is_prime_structural(n)
        print(f"n = {n}: {'Prime' if is_prime else 'Composite'} (invariant: {invariant:.6f})")

if __name__ == "__main__":
    main()
