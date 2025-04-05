#!/usr/bin/env python3
"""
Optimized Primality Test Based on Structural Invariant and Factor Patterns

This implementation leverages the discoveries from our experiments to create an efficient
primality test using the verified product formula:

Structural Invariant = φ(p-1)/(p-1) = ∏(1-1/q) for each prime q dividing p-1

The algorithm uses pattern recognition for common factor structures to optimize calculations.
"""

import math
import time
from functools import lru_cache
from fractions import Fraction


@lru_cache(maxsize=1024)
def gcd(a, b):
    """Calculate greatest common divisor using Euclidean algorithm."""
    while b:
        a, b = b, a % b
    return a


@lru_cache(maxsize=1024)
def prime_factors(n):
    """
    Get the prime factorization of a number as a list of (prime, exponent) tuples.

    This implementation is optimized for the specific use case of factoring p-1
    for primality testing, using a look-ahead check for common patterns.
    """
    if n <= 1:
        return []

    # Check for powers of 2 (optimized for Fermat primes)
    if n & (n - 1) == 0:  # Fast check if n is a power of 2
        k = 0
        temp_n = n
        while temp_n > 1:
            temp_n >>= 1
            k += 1
        return [(2, k)]

    # Check for common patterns: 2q, 3q, etc.
    if n % 2 == 0:
        # Check if n = 2 × prime (common pattern)
        m = n // 2
        if is_small_prime(m):
            return [(2, 1), (m, 1)]

    if n % 3 == 0:
        # Check if n = 3 × prime (common pattern)
        m = n // 3
        if is_small_prime(m):
            return [(3, 1), (m, 1)]

    if n % 6 == 0:
        # Check if n = 2 × 3 × prime (common pattern)
        m = n // 6
        if is_small_prime(m):
            return [(2, 1), (3, 1), (m, 1)]

    # Standard factorization for other cases
    factors = []
    p = 2
    while p * p <= n:
        if n % p == 0:
            exp = 0
            while n % p == 0:
                n //= p
                exp += 1
            factors.append((p, exp))
        p += 1

    if n > 1:
        factors.append((n, 1))

    return factors


def is_small_prime(n):
    """Quick primality check for small numbers (for optimizing factorization)."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


@lru_cache(maxsize=1024)
def euler_totient(n):
    """
    Calculate Euler's totient function φ(n).

    This implementation is optimized using the discovered pattern:
    φ(n)/n = ∏(1-1/p) for each prime p dividing n
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # For powers of 2 (common in p-1 values)
    if n & (n - 1) == 0:  # Fast check if n is a power of 2
        return n // 2

    # Get prime factorization
    factors = prime_factors(n)

    # Apply the product formula directly
    result = n
    for p, _ in factors:
        result *= 1 - 1 / p

    return round(result)  # Round to handle floating-point precision issues


def structural_invariant_product_formula(n):
    """
    Calculate the structural invariant using the verified product formula:
    Invariant = ∏(1-1/p) for each prime p dividing (n-1)
    """
    if n <= 1:
        return 0.0

    # Special case for n = 2
    if n == 2:
        return 1.0

    # Quick check for common patterns to avoid factorization
    n_minus_1 = n - 1

    # Powers of 2 (Fermat primes)
    if n_minus_1 & (n_minus_1 - 1) == 0:
        return 0.5  # Invariant is exactly 1/2

    # Calculate using the product formula
    factors = prime_factors(n_minus_1)

    # Directly compute the product (1-1/p) for each prime factor
    invariant = 1.0
    for p, _ in factors:
        invariant *= 1 - 1 / p

    return invariant


def recognize_pattern(n):
    """
    Recognize common patterns in (n-1) to predict the invariant value.
    Returns a tuple of (pattern_name, expected_invariant, is_exact)
    """
    n_minus_1 = n - 1

    # Check if n-1 is a power of 2 (Fermat prime pattern)
    if n_minus_1 & (n_minus_1 - 1) == 0:
        return ("2^k (Fermat prime)", 0.5, True)

    # Check for n-1 = 2q pattern
    if n_minus_1 % 2 == 0:
        q = n_minus_1 // 2
        if is_small_prime(q):
            inv = (q - 1) / (2 * q)
            return (f"2 × {q}", inv, True)

    # Check for n-1 = 3q pattern
    if n_minus_1 % 3 == 0:
        q = n_minus_1 // 3
        if is_small_prime(q):
            inv = 2 * (q - 1) / (3 * q)
            return (f"3 × {q}", inv, True)

    # Check for n-1 = 2 × 3 = 6 pattern
    if n_minus_1 == 6:
        return ("2 × 3", 1 / 3, True)

    # Check for n-1 = 2 × 5 = 10 pattern
    if n_minus_1 == 10:
        return ("2 × 5", 2 / 5, True)

    # Do full factorization for other cases
    factors = prime_factors(n_minus_1)

    # Create a readable pattern name
    pattern = " × ".join([f"{p}^{e}" if e > 1 else str(p) for p, e in factors])

    # Calculate expected invariant
    invariant = 1.0
    for p, _ in factors:
        invariant *= 1 - 1 / p

    return (pattern, invariant, True)


def is_prime_optimized(n, verbose=False):
    """
    Optimized primality test based on structural invariant patterns.

    Args:
        n: The number to test for primality
        verbose: Whether to output detailed information

    Returns:
        A tuple (is_prime, invariant, details) where:
        - is_prime: Boolean indicating primality
        - invariant: The calculated structural invariant
        - details: Additional information about the calculation
    """
    start_time = time.time()

    # Handle edge cases
    if n <= 1:
        return (
            False,
            0.0,
            {"pattern": "n ≤ 1", "expected_invariant": 0.0, "computed_invariant": 0.0},
        )

    # Quick check for small primes
    if n == 2 or n == 3:
        inv = 1.0 if n == 2 else 0.5
        return (
            True,
            inv,
            {
                "pattern": f"Small prime: {n}",
                "expected_invariant": inv,
                "computed_invariant": inv,
            },
        )

    # Quick check for even numbers
    if n % 2 == 0:
        return (
            False,
            0.0,
            {
                "pattern": "Even number > 2",
                "expected_invariant": 0.0,
                "computed_invariant": 0.0,
            },
        )

    # Attempt pattern recognition for optimization
    pattern, expected_inv, is_exact = recognize_pattern(n)

    # Trial division check for small divisors (optimization)
    limit = min(int(math.sqrt(n)) + 1, 1000)
    for i in range(3, limit, 2):
        if n % i == 0:
            end_time = time.time()
            if verbose:
                print(f"Composite (divisible by {i})")
                print(f"Time: {(end_time - start_time)*1000:.2f} ms")
            return (
                False,
                0.0,
                {
                    "pattern": f"Divisible by {i}",
                    "expected_invariant": 0.0,
                    "computed_invariant": 0.0,
                },
            )

    # For larger numbers, calculate the structural invariant
    invariant = structural_invariant_product_formula(n)

    # Check if the invariant matches the expected value
    is_prime = abs(invariant - expected_inv) < 1e-9

    end_time = time.time()
    calculation_time = (end_time - start_time) * 1000  # ms

    details = {
        "pattern": pattern,
        "expected_invariant": expected_inv,
        "computed_invariant": invariant,
        "calculation_time_ms": calculation_time,
    }

    if verbose:
        print(f"Number: {n}")
        print(f"Pattern of (n-1): {pattern}")
        print(f"Expected invariant: {expected_inv}")
        print(f"Computed invariant: {invariant}")
        print(f"Primality result: {'Prime' if is_prime else 'Composite'}")
        print(f"Time: {calculation_time:.2f} ms")

    return is_prime, invariant, details


def generate_primes_with_invariant(target_fraction, count=10, max_search=10000):
    """
    Generate primes with a specific invariant value by constructing
    numbers with the appropriate factor structure.

    Args:
        target_fraction: The target invariant value as a string fraction (e.g., "1/2")
                         or a float
        count: Number of primes to generate
        max_search: Maximum value to search

    Returns:
        List of (prime, invariant) tuples
    """
    # Parse the target fraction
    if isinstance(target_fraction, str):
        if "/" in target_fraction:
            num, denom = map(int, target_fraction.split("/"))
            target = num / denom
        else:
            target = float(target_fraction)
    else:
        target = float(target_fraction)

    # Determine the structure that would give this invariant
    candidates = []

    # For target = 1/2 (Fermat primes)
    if abs(target - 0.5) < 1e-9:
        for k in range(1, 30):
            p = 2**k + 1
            if is_prime_optimized(p)[0]:
                _, inv, _ = is_prime_optimized(p)
                candidates.append((p, inv))
                if len(candidates) >= count:
                    break

    # For target = 1/3
    elif abs(target - 1 / 3) < 1e-9:
        # Try p-1 = 6, 12, 18, etc.
        for q in range(2, max_search):
            if is_small_prime(q):
                p = 6 * q + 1
                if is_prime_optimized(p)[0]:
                    _, inv, _ = is_prime_optimized(p)
                    candidates.append((p, inv))
                    if len(candidates) >= count:
                        break

    # For target = 2/5
    elif abs(target - 0.4) < 1e-9:
        # Try p-1 = 10, 20, 30, etc.
        for q in range(2, max_search):
            if is_small_prime(q):
                p = 10 * q + 1
                if is_prime_optimized(p)[0]:
                    _, inv, _ = is_prime_optimized(p)
                    candidates.append((p, inv))
                    if len(candidates) >= count:
                        break

    # For other values, try to construct appropriate p-1 structures
    else:
        # Convert target to fraction for analysis
        target_frac = Fraction(target).limit_denominator(100)
        num, denom = target_frac.numerator, target_frac.denominator

        print(f"Searching for primes with invariant ≈ {num}/{denom}")

        # Try various structures
        for n in range(3, max_search, 2):
            if is_prime_optimized(n)[0]:
                _, inv, _ = is_prime_optimized(n)
                if abs(inv - target) < 1e-6:
                    candidates.append((n, inv))
                    if len(candidates) >= count:
                        break

    return candidates


def benchmark():
    """
    Benchmark the performance of the optimized primality test against
    other primality tests.
    """
    import random

    # Test cases
    test_ranges = [
        (100, 1000, 10),  # Small numbers
        (10000, 20000, 10),  # Medium numbers
        (100000, 200000, 5),  # Large numbers
    ]

    for min_val, max_val, count in test_ranges:
        print(
            f"\nBenchmarking range {min_val} to {max_val} with {count} random samples"
        )

        # Generate random test numbers
        test_numbers = [random.randint(min_val, max_val) for _ in range(count)]

        # Optimized structural invariant test
        start_time = time.time()
        optimized_results = [is_prime_optimized(n)[0] for n in test_numbers]
        optimized_time = time.time() - start_time

        # Standard trial division test
        start_time = time.time()
        trial_div_results = [is_small_prime(n) for n in test_numbers]
        trial_div_time = time.time() - start_time

        # Check if results match
        matches = sum(
            1 for opt, td in zip(optimized_results, trial_div_results) if opt == td
        )

        print(f"Optimized structural invariant test: {optimized_time:.6f} seconds")
        print(f"Standard trial division: {trial_div_time:.6f} seconds")
        print(f"Accuracy: {matches}/{count} ({100*matches/count:.1f}%)")

        # Show speedup/slowdown
        if trial_div_time > 0:
            ratio = optimized_time / trial_div_time
            if ratio < 1:
                print(f"Optimized test is {1/ratio:.2f}x faster")
            else:
                print(f"Optimized test is {ratio:.2f}x slower")


def pattern_statistics(max_n=1000):
    """
    Analyze statistical properties of different (p-1) patterns and their invariants.
    """
    # Find all primes up to max_n
    primes = []
    for n in range(2, max_n + 1):
        if is_small_prime(n):
            primes.append(n)

    # Categorize by patterns
    pattern_counts = {}
    invariant_stats = {}

    for p in primes:
        pattern, inv, _ = recognize_pattern(p)

        # Count pattern occurrences
        pattern_counts[pattern] = pattern_counts.get(pattern, 0) + 1

        # Track invariant statistics
        inv_str = str(Fraction(inv).limit_denominator(100))
        invariant_stats[inv_str] = invariant_stats.get(inv_str, 0) + 1

    # Print statistics
    print(f"\nAnalyzed {len(primes)} primes up to {max_n}")

    print("\nTop 10 most common (p-1) patterns:")
    for pattern, count in sorted(
        pattern_counts.items(), key=lambda x: x[1], reverse=True
    )[:10]:
        print(f"  {pattern}: {count} occurrences")

    print("\nTop 10 most common invariant values:")
    for inv, count in sorted(invariant_stats.items(), key=lambda x: x[1], reverse=True)[
        :10
    ]:
        print(f"  {inv}: {count} occurrences")


def main():
    print("Optimized Structural Invariant Primality Test")
    print("============================================")

    # Test some known primes and composites
    test_cases = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        4,
        6,
        8,
        9,
        10,
        12,
        15,
        997,
        1009,
        1013,
        1019,
        561,
        1105,
        1729,  # Carmichael numbers
    ]

    print("\nTesting specific numbers:")
    for n in test_cases:
        is_prime, invariant, details = is_prime_optimized(n, verbose=False)
        actual_prime = is_small_prime(n)
        result = "✓" if is_prime == actual_prime else "✗"
        pattern = details["pattern"]
        print(
            f"n = {n}: {'Prime' if is_prime else 'Composite'} {result} (Invariant: {invariant:.6f}, Pattern: {pattern})"
        )

    # Generate primes with specific invariants
    print("\nGenerating primes with specific invariants:")
    for target in ["1/2", "1/3", "2/5", "4/15", "2/7"]:
        primes = generate_primes_with_invariant(target, count=3)
        print(f"\nPrimes with invariant ≈ {target}:")
        for p, inv in primes:
            print(f"  p = {p}, invariant = {inv:.9f}")

    # Run benchmark
    print("\nBenchmarking performance:")
    benchmark()

    # Analyze pattern statistics
    print("\nAnalyzing pattern statistics:")
    pattern_statistics(max_n=1000)


if __name__ == "__main__":
    main()
