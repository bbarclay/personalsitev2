#!/usr/bin/env python3
"""
Test script for validating the Floor Discordance Theory of primality.
This script tests a focused set of prime and composite numbers to verify the claim
that a number n is prime if and only if its discordance rate is (n-1)/n.
"""

import numpy as np
import sympy
import time
from tabulate import tabulate
import math


def gcd(a, b):
    """Compute the greatest common divisor of a and b."""
    while b:
        a, b = b, a % b
    return a


def mobius(n):
    """Compute the Möbius function μ(n)."""
    if n == 1:
        return 1

    # Check if n is divisible by a square
    p_factors = sympy.factorint(n)
    for p, exp in p_factors.items():
        if exp > 1:
            return 0

    # n is square-free, so μ(n) = (-1)^k where k is the number of prime factors
    return (-1) ** len(p_factors)


def cyclotomic_polynomial(n):
    """
    Generate the nth cyclotomic polynomial.

    Args:
        n: A positive integer

    Returns:
        A numpy polynomial representing the nth cyclotomic polynomial
    """
    # Special cases for small n
    if n == 1:
        return np.array([1, -1])  # Φ₁(x) = x - 1

    # For other n, use the formula Φ_n(x) = ∏_d|n (x^(n/d) - 1)^μ(d)
    # We'll build it directly in factored form to avoid numerical issues

    # Construct the polynomial
    x = sympy.Symbol("x")
    phi = 1

    for d in range(1, n + 1):
        if n % d == 0:
            phi *= (x ** (n // d) - 1) ** mobius(d)

    # Convert the sympy polynomial to numpy poly1d for our computation
    phi_expanded = sympy.expand(phi)
    phi_coeffs = []

    # Get the degree
    degree = sympy.degree(phi_expanded, x)

    # Extract the coefficients
    for i in range(degree, -1, -1):
        coef = phi_expanded.coeff(x, i)
        if coef is None:
            coef = 0
        phi_coeffs.append(float(coef))

    return np.array(phi_coeffs)


def compute_numerical_roots(poly, precision=1000):
    """
    Compute numerical approximations of the roots of a polynomial.

    Args:
        poly: A numpy array of polynomial coefficients
        precision: The precision to use for root finding

    Returns:
        A numpy array of complex roots
    """
    # Use numpy's root finding
    roots = np.roots(poly)

    # Filter out roots that are numerical artifacts
    # Keep roots with magnitude approximately 1 (roots of unity)
    roots = roots[np.isclose(np.abs(roots), 1.0, rtol=1e-5)]

    return roots


def measure_discordance_rate(roots, trials=10000, seed=None):
    """
    Measure the floor discordance rate using Jacobi-Perron algorithm.

    Args:
        roots: Complex roots in the cyclotomic field
        trials: Number of random trials to perform
        seed: Random seed for reproducibility

    Returns:
        The measured discordance rate as a float between 0 and 1
    """
    if seed is not None:
        np.random.seed(seed)

    discordance_count = 0

    for _ in range(trials):
        # Generate random coefficients to create a field element
        coeffs = np.random.uniform(-1, 1, len(roots))

        # Create a linear combination of roots
        z = np.sum(coeffs * roots)

        # Apply Jacobi-Perron algorithm step
        floor_z = np.floor(z.real)
        next_z = 1 / (z - floor_z) if abs(z - floor_z) > 1e-10 else float("inf")

        # Check for discordance
        # Discordance occurs when the floor operation results in information loss
        # that prevents returning to the original value
        if np.isinf(next_z) or np.isnan(next_z.real) or np.isnan(next_z.imag):
            discordance_count += 1
            continue

        # Test if we can recover original structure
        recovered_z = floor_z + 1 / next_z

        # Check if structure was preserved (concordance) or lost (discordance)
        if not np.isclose(recovered_z, z, rtol=1e-6, atol=1e-6):
            discordance_count += 1

    return discordance_count / trials


def test_number(n, trials=20000, precision=1000):
    """Test a single number and return its discordance rate and expected rate."""
    start_time = time.time()

    try:
        # Computing cyclotomic polynomial directly using primitive roots of unity
        # which gives us a more efficient approach for small values
        if n <= 20:
            # For small values, directly compute e^(2πi/n) roots
            k = 2 * math.pi / n
            roots = np.array(
                [
                    complex(math.cos(k * i), math.sin(k * i))
                    for i in range(1, n)
                    if gcd(i, n) == 1
                ]
            )
        else:
            # For larger values, compute the polynomial then find roots
            poly = cyclotomic_polynomial(n)
            roots = compute_numerical_roots(poly, precision)

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
        17,
        # Small composites
        4,
        6,
        8,
        9,
        10,
        12,
        15,
        # Medium primes and composites
        19,
        23,
        25,
        27,
        29,
        31,
        33,
    ]

    # Reduce trials for quicker testing
    trials = 5000

    # Store results
    results = []

    try:
        for n in test_numbers:
            print(f"Testing n={n}...")
            result = test_number(n, trials=trials)
            results.append(result)

            # Print summary for this number
            print(f"  Prime: {result['is_prime']}")
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
        "Observed Rate",
        "Expected Rate",
        "Absolute Error",
        "Relative Error",
    ]
    print(tabulate(table_data, headers=headers, tablefmt="grid"))

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
            print(f"  n={n}: {rate:.6f} (vs {expected_if_prime:.6f} if prime)")
            print(
                f"      Difference from prime rate: {abs(rate - expected_if_prime):.6f}"
            )


if __name__ == "__main__":
    try:
        import tabulate
    except ImportError:
        print("Installing tabulate package...")
        import subprocess

        subprocess.check_call(["pip", "install", "tabulate"])
        import tabulate

    main()
