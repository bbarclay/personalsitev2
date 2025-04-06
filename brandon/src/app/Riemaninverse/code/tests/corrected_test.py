#!/usr/bin/env python3
"""
Corrected test script for validating the Floor Discordance Theory of primality.
This script uses a direct approach with roots of unity to verify the claim
that a number n is prime if and only if its discordance rate is (n-1)/n.
"""

import numpy as np
import sympy
import time
import math
from tabulate import tabulate as tabulate_func


def compute_primitive_roots(n):
    """
    Compute the primitive nth roots of unity.

    Args:
        n: A positive integer

    Returns:
        A numpy array of primitive nth roots of unity
    """
    # For n, find all k such that gcd(k, n) = 1
    totatives = [k for k in range(1, n) if math.gcd(k, n) == 1]

    # Compute e^(2πik/n) for each k in totatives
    k_values = 2 * math.pi / n
    roots = np.array(
        [complex(math.cos(k_values * k), math.sin(k_values * k)) for k in totatives]
    )

    return roots


def measure_discordance_rate(roots, trials=5000, seed=42):
    """
    Measure the floor discordance rate using Jacobi-Perron algorithm.

    Args:
        roots: Complex roots in the cyclotomic field
        trials: Number of random trials to perform
        seed: Random seed for reproducibility

    Returns:
        The measured discordance rate as a float between 0 and 1
    """
    np.random.seed(seed)

    discordance_count = 0

    for _ in range(trials):
        # Generate random coefficients to create a field element
        # Include random phases to explore complex field properly
        coeffs = np.array(
            [
                complex(np.random.uniform(-1, 1), np.random.uniform(-1, 1))
                for _ in range(len(roots))
            ]
        )

        # Create a linear combination of roots
        z = np.sum(coeffs * roots)

        # Apply Jacobi-Perron algorithm step
        floor_z = np.floor(z.real)

        # Avoid division by zero or near-zero
        denominator = z - floor_z
        if abs(denominator) < 1e-10:
            discordance_count += 1
            continue

        try:
            next_z = 1 / denominator

            # Check for discordance
            if np.isinf(next_z) or np.isnan(next_z.real) or np.isnan(next_z.imag):
                discordance_count += 1
                continue

            # Test if we can recover original structure
            recovered_z = floor_z + 1 / next_z

            # Check if structure was preserved (concordance) or lost (discordance)
            if not np.isclose(recovered_z, z, rtol=1e-6, atol=1e-6):
                discordance_count += 1
        except:
            # Any exception during calculation indicates discordance
            discordance_count += 1

    return discordance_count / trials


def test_number(n, trials=5000):
    """Test a single number and return its discordance rate and expected rate."""
    start_time = time.time()

    try:
        # Compute the primitive roots of unity
        roots = compute_primitive_roots(n)

        # Print debug info about roots
        print(f"  Number of primitive roots: {len(roots)}")

        # Measure discordance rate
        observed_rate = measure_discordance_rate(roots, trials)

        # Check actual primality
        is_prime = sympy.isprime(n)
        expected_rate = (n - 1) / n if is_prime else None

        # Compute error metrics
        absolute_error = abs(observed_rate - expected_rate) if expected_rate else None
        relative_error = (absolute_error / expected_rate) if expected_rate else None

        time_taken = time.time() - start_time

        return {
            "n": n,
            "is_prime": is_prime,
            "phi_n": len(roots),  # Euler's totient function φ(n)
            "observed_rate": observed_rate,
            "expected_rate": expected_rate,
            "absolute_error": absolute_error,
            "relative_error": relative_error,
            "time_taken": time_taken,
        }
    except Exception as e:
        print(f"Error testing n={n}: {str(e)}")
        time_taken = time.time() - start_time
        return {
            "n": n,
            "is_prime": sympy.isprime(n),
            "phi_n": None,
            "observed_rate": None,
            "expected_rate": (n - 1) / n if sympy.isprime(n) else None,
            "absolute_error": None,
            "relative_error": None,
            "time_taken": time_taken,
            "error": str(e),
        }


def main():
    """Run validation tests on a set of prime and composite numbers."""
    print("Floor Discordance Theory Validation Test")
    print("========================================")

    # Test cases - focusing on smaller numbers for quicker testing
    test_numbers = [
        # Small primes
        2,
        3,
        5,
        7,
        11,
        13,
        # Small composites
        4,
        6,
        8,
        9,
        10,
        12,
        # A few more numbers
        15,
        17,
        19,
        21,
        23,
    ]

    # Store results
    results = []

    try:
        for n in test_numbers:
            print(f"Testing n={n}...")
            result = test_number(n, trials=10000)
            results.append(result)

            # Print summary for this number
            print(f"  Prime: {result['is_prime']}")
            if result["phi_n"] is not None:
                print(f"  φ(n): {result['phi_n']}")
            print(
                f"  Observed rate: {result['observed_rate']:.6f}"
                if result["observed_rate"] is not None
                else "  Observed rate: Error"
            )
            if result["expected_rate"]:
                print(f"  Expected rate: {result['expected_rate']:.6f}")
                if result["relative_error"]:
                    print(f"  Relative error: {result['relative_error']:.6f}")
            print(f"  Time: {result['time_taken']:.2f} seconds")
            print()

    except KeyboardInterrupt:
        print("\nTest interrupted. Showing partial results.\n")

    # Filter out results with errors
    valid_results = [r for r in results if r["observed_rate"] is not None]

    if not valid_results:
        print("No valid results to display.")
        return

    # Prepare table data
    table_data = []
    for r in valid_results:
        table_data.append(
            [
                r["n"],
                "Yes" if r["is_prime"] else "No",
                r["phi_n"],
                f"{r['observed_rate']:.6f}",
                f"{r['expected_rate']:.6f}" if r["expected_rate"] else "N/A",
                f"{r['absolute_error']:.6f}" if r["absolute_error"] else "N/A",
                f"{r['relative_error']:.6f}" if r["relative_error"] else "N/A",
            ]
        )

    # Print table
    headers = [
        "Number",
        "Prime?",
        "φ(n)",
        "Observed Rate",
        "Expected Rate",
        "Absolute Error",
        "Relative Error",
    ]
    print(tabulate_func(table_data, headers=headers, tablefmt="grid"))

    # Analyze accuracy
    prime_errors = [
        r["relative_error"]
        for r in valid_results
        if r["is_prime"] and r["relative_error"] is not None
    ]
    if prime_errors:
        avg_prime_error = np.mean(prime_errors)
        print(f"\nAverage relative error for primes: {avg_prime_error:.6f}")

    # Analyze composite rates
    composite_rates = [
        (r["n"], r["observed_rate"]) for r in valid_results if not r["is_prime"]
    ]
    if composite_rates:
        print("\nComposite number rates:")
        for n, rate in composite_rates:
            expected_if_prime = (n - 1) / n
            difference = abs(rate - expected_if_prime)
            print(f"  n={n}: {rate:.6f} (vs {expected_if_prime:.6f} if prime)")
            print(f"      Difference from prime rate: {difference:.6f}")


if __name__ == "__main__":
    main()
