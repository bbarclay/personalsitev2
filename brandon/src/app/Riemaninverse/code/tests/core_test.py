#!/usr/bin/env python3
"""
Core test for the Floor Discordance Theory of primality.
This script implements the essential mathematical components from the proof
to test if prime numbers exhibit (n-1)/n discordance rates.
"""

import numpy as np
import sympy
import cmath
import math
import time


def compute_discordance_rate(n, trials=10000, seed=42):
    """
    Compute the discordance rate for a number n by sampling from its cyclotomic field.

    This directly implements the mathematical definition from the proof.
    """
    np.random.seed(seed)

    # Get primitive nth roots of unity
    roots = []
    for k in range(1, n):
        if math.gcd(k, n) == 1:
            # e^(2πik/n)
            root = cmath.exp(2j * math.pi * k / n)
            roots.append(root)

    # Total trials
    discordance_count = 0

    for _ in range(trials):
        # Generate random coefficients
        coeffs = np.random.uniform(-1, 1, size=len(roots)) + 1j * np.random.uniform(
            -1, 1, size=len(roots)
        )

        # Generate a random element in the field
        z = np.sum(coeffs * roots)

        # Apply floor operation
        floor_z = math.floor(z.real)

        # Compute fractional part
        frac_z = z - floor_z

        # Apply Jacobi-Perron step
        try:
            # Check if fractional part is too close to zero
            if abs(frac_z) < 1e-10:
                discordance_count += 1
                continue

            # Compute next iterate
            next_z = 1 / frac_z

            # Check if we can recover z from floor_z and next_z
            recovered_z = floor_z + 1 / next_z

            # If recovery fails, we have discordance
            if abs(recovered_z - z) > 1e-8:
                discordance_count += 1

        except:
            # Any exception indicates discordance
            discordance_count += 1

    # Return observed discordance rate
    return discordance_count / trials


def test_prime_discordance(limit=20, trials=10000):
    """Test the prime discordance theory up to a certain limit."""
    results = []

    for n in range(2, limit + 1):
        print(f"Testing n={n}...")
        start_time = time.time()

        # Compute discordance rate
        rate = compute_discordance_rate(n, trials)

        # Check primality
        is_prime = sympy.isprime(n)

        # Calculate expected rate for primes
        expected = (n - 1) / n if is_prime else None

        # Calculate error metrics
        abs_error = abs(rate - expected) if expected else None
        rel_error = abs_error / expected if expected else None

        # Calculate the discrepancy from expected rate for composites
        prime_like_rate = (n - 1) / n
        discrepancy = abs(rate - prime_like_rate)

        end_time = time.time()

        # Print individual result
        print(f"  Prime: {is_prime}")
        print(f"  Observed rate: {rate:.6f}")
        if expected:
            print(f"  Expected rate: {expected:.6f}")
            print(f"  Error: {abs_error:.6f} ({rel_error:.2%})")
        else:
            print(f"  Discrepancy from (n-1)/n: {discrepancy:.6f}")
        print(f"  Time: {end_time - start_time:.2f} seconds")
        print()

        # Store result
        results.append(
            {
                "n": n,
                "prime": is_prime,
                "rate": rate,
                "expected": expected,
                "abs_error": abs_error,
                "rel_error": rel_error,
                "discrepancy": discrepancy,
            }
        )

    return results


def analyze_results(results):
    """Analyze and print summary of results."""
    primes = [r for r in results if r["prime"]]
    composites = [r for r in results if not r["prime"]]

    print("SUMMARY OF RESULTS")
    print("=================")

    # Print table of results
    print("Number | Prime? | Observed Rate | Expected/(n-1)/n | Error/Discrepancy")
    print("-------|--------|---------------|-----------------|------------------")

    for r in results:
        prime_str = "Yes" if r["prime"] else "No "
        rate_str = f"{r['rate']:.6f}"

        if r["prime"]:
            expected_str = f"{r['expected']:.6f}"
            error_str = f"{r['abs_error']:.6f} ({r['rel_error']:.2%})"
        else:
            expected_str = f"{(r['n']-1)/r['n']:.6f}"
            error_str = f"{r['discrepancy']:.6f}"

        print(
            f"{r['n']:6d} | {prime_str}  | {rate_str}    | {expected_str}      | {error_str}"
        )

    # Analyze prime results
    if primes:
        avg_prime_error = sum(r["rel_error"] for r in primes) / len(primes)
        print(f"\nAverage relative error for primes: {avg_prime_error:.2%}")

        # Check if all primes have low error
        threshold = 0.1  # 10% error threshold
        all_primes_match = all(r["rel_error"] < threshold for r in primes)

        if all_primes_match:
            print("✓ All primes exhibit discordance rates close to (n-1)/n")
        else:
            print("✗ Some primes do not exhibit the expected discordance rate")

    # Analyze composite results
    if composites:
        # Check if all composites have high discrepancy
        threshold = 0.1  # 10% discrepancy threshold
        all_composites_differ = all(r["discrepancy"] > threshold for r in composites)

        if all_composites_differ:
            print("✓ All composites exhibit discordance rates different from (n-1)/n")
        else:
            print("✗ Some composites exhibit discordance rates close to (n-1)/n")

    # Overall conclusion
    if primes and composites:
        if all_primes_match and all_composites_differ:
            print(
                "\nCONCLUSION: The empirical results SUPPORT the Floor Discordance Theory"
            )
        else:
            print(
                "\nCONCLUSION: The empirical results DO NOT support the Floor Discordance Theory"
            )


if __name__ == "__main__":
    print("Core Test of Floor Discordance Theory")
    print("=====================================")

    # Test up to n=20 with 10,000 trials per number
    results = test_prime_discordance(limit=20, trials=10000)

    # Analyze and print results
    analyze_results(results)
