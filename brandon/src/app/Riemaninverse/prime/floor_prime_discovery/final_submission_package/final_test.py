#!/usr/bin/env python3
"""
Final test script for validating the Floor Discordance Theory of primality.
This script focuses on the mathematical definition of discordance in cyclotomic fields
and tests the claim that a number n is prime if and only if its discordance rate is (n-1)/n.
"""

import numpy as np
import sympy
import time
import math
from tabulate import tabulate


def euler_totient(n):
    """Calculate Euler's totient function φ(n)."""
    if n == 1:
        return 1
    result = n  # Initialize result as n

    # Consider all prime factors of n and subtract their multiples
    p = 2
    while p * p <= n:
        # Check if p is a prime factor
        if n % p == 0:
            # If yes, then update n and result
            while n % p == 0:
                n //= p
            result -= result // p
        p += 1

    # If n has a prime factor greater than sqrt(n)
    # (There can be at most one such prime factor)
    if n > 1:
        result -= result // n

    return result


def primitive_roots_of_unity(n):
    """
    Compute the primitive nth roots of unity.

    Args:
        n: A positive integer

    Returns:
        A list of complex numbers representing primitive nth roots of unity
    """
    phi = euler_totient(n)

    # Create array to hold primitive roots
    roots = []

    # For each k coprime to n, e^(2πik/n) is a primitive nth root of unity
    for k in range(1, n):
        if math.gcd(k, n) == 1:
            angle = 2 * math.pi * k / n
            root = complex(math.cos(angle), math.sin(angle))
            roots.append(root)

    # Verify we have φ(n) roots
    assert len(roots) == phi, f"Expected {phi} roots, but found {len(roots)}"

    return roots


def generate_field_element(roots):
    """
    Generate a random element in the cyclotomic field by taking a random
    linear combination of primitive roots of unity with rational coefficients.
    """
    # Generate random rational coefficients
    coeffs = [np.random.uniform(-10, 10) for _ in range(len(roots))]

    # Compute linear combination
    z = sum(c * root for c, root in zip(coeffs, roots))

    return z


def is_discordant(z):
    """
    Determine if a complex number exhibits discordance under the Jacobi-Perron algorithm.

    Discordance occurs when the floor operation causes information loss that prevents
    recovering the original value through the inverse operation.
    """
    # Apply floor operation
    floor_z = math.floor(z.real)

    # Calculate fractional part
    frac_z = z - floor_z

    # Check for near-zero denominator
    if abs(frac_z) < 1e-10:
        return True

    try:
        # Calculate next step in Jacobi-Perron algorithm
        next_z = 1 / frac_z

        # Try to recover original z
        recovered_z = floor_z + 1 / next_z

        # If recovery fails, we have discordance
        return not np.isclose(recovered_z, z, rtol=1e-8, atol=1e-8)

    except:
        # Any exception indicates discordance
        return True


def measure_discordance_rate(roots, trials=10000, seed=42):
    """
    Measure the floor discordance rate in a cyclotomic field.

    Args:
        roots: List of primitive roots of unity
        trials: Number of random trials to perform
        seed: Random seed for reproducibility

    Returns:
        The measured discordance rate as a float between 0 and 1
    """
    np.random.seed(seed)

    discordance_count = 0

    for _ in range(trials):
        # Generate random field element
        z = generate_field_element(roots)

        # Test for discordance
        if is_discordant(z):
            discordance_count += 1

    return discordance_count / trials


def test_number(n, trials=10000):
    """Test a single number and return its discordance rate and expected rate."""
    print(f"Testing n={n}...")

    start_time = time.time()

    try:
        # Compute primitive roots of unity
        roots = primitive_roots_of_unity(n)
        phi_n = len(roots)
        print(f"  φ({n}) = {phi_n}")

        # Measure discordance rate
        observed_rate = measure_discordance_rate(roots, trials)

        # Check primality
        is_prime = sympy.isprime(n)
        expected_rate = (n - 1) / n if is_prime else None

        # Calculate errors
        absolute_error = abs(observed_rate - expected_rate) if expected_rate else None
        relative_error = (absolute_error / expected_rate) if expected_rate else None

        time_taken = time.time() - start_time

        # Print individual result
        print(f"  Prime: {is_prime}")
        print(f"  Observed rate: {observed_rate:.6f}")
        if expected_rate:
            print(f"  Expected rate: {expected_rate:.6f}")
            print(f"  Absolute error: {absolute_error:.6f}")
            print(f"  Relative error: {relative_error:.6f}")
        print(f"  Time: {time_taken:.2f} seconds")
        print()

        return {
            "n": n,
            "is_prime": is_prime,
            "phi_n": phi_n,
            "observed_rate": observed_rate,
            "expected_rate": expected_rate,
            "absolute_error": absolute_error,
            "relative_error": relative_error,
            "time_taken": time_taken,
        }

    except Exception as e:
        time_taken = time.time() - start_time
        print(f"  Error: {str(e)}")
        print(f"  Time: {time_taken:.2f} seconds")
        print()

        return {
            "n": n,
            "is_prime": sympy.isprime(n),
            "phi_n": euler_totient(n),
            "observed_rate": None,
            "expected_rate": (n - 1) / n if sympy.isprime(n) else None,
            "absolute_error": None,
            "relative_error": None,
            "time_taken": time_taken,
            "error": str(e),
        }


def main():
    """Run validation tests for the Floor Discordance Theory."""
    print("Floor Discordance Theory Validation")
    print("===================================")

    # Test cases
    test_numbers = [
        # Small primes
        2,
        3,
        5,
        7,
        11,
        # Small composites
        4,
        6,
        9,
        # Additional interesting numbers
        8,
        10,
        12,
        13,
        15,
        17,
        19,
    ]

    results = []

    try:
        for n in test_numbers:
            result = test_number(n, trials=10000)
            results.append(result)

    except KeyboardInterrupt:
        print("\nTest interrupted. Showing partial results.\n")

    # Filter out results with errors
    valid_results = [r for r in results if r["observed_rate"] is not None]

    if not valid_results:
        print("No valid results to display.")
        return

    # Analyze the results
    prime_results = [r for r in valid_results if r["is_prime"]]
    composite_results = [r for r in valid_results if not r["is_prime"]]

    # Prepare table data
    table_data = []
    for r in valid_results:
        row = [
            r["n"],
            "Yes" if r["is_prime"] else "No",
            r["phi_n"],
            f"{r['observed_rate']:.6f}",
            f"{r['expected_rate']:.6f}" if r["expected_rate"] else "N/A",
        ]

        if r["expected_rate"]:
            row.append(f"{r['absolute_error']:.6f}")
            row.append(f"{r['relative_error']:.6f}")
        else:
            expected_if_prime = (r["n"] - 1) / r["n"]
            diff = abs(r["observed_rate"] - expected_if_prime)
            row.append(f"{diff:.6f}")
            row.append("N/A")

        table_data.append(row)

    # Print summary table
    headers = [
        "Number",
        "Prime?",
        "φ(n)",
        "Observed Rate",
        "Expected Rate",
        "Error/Diff",
        "Rel Error",
    ]
    print()
    print("RESULTS SUMMARY")
    print(tabulate(table_data, headers=headers, tablefmt="grid"))

    # Analyze prime number results
    if prime_results:
        avg_prime_error = np.mean([r["relative_error"] for r in prime_results])
        print(f"\nAverage relative error for primes: {avg_prime_error:.6f}")

    # Analyze composite number results
    if composite_results:
        print("\nComposite numbers vs (n-1)/n rate:")
        for r in composite_results:
            n = r["n"]
            rate = r["observed_rate"]
            prime_rate = (n - 1) / n
            diff = abs(rate - prime_rate)
            print(f"  n={n}: {rate:.6f} vs {prime_rate:.6f} (diff: {diff:.6f})")

    # Overall conclusion
    print("\nCONCLUSION:")
    if prime_results and composite_results:
        prime_match = all(abs(r["relative_error"]) < 0.1 for r in prime_results)
        composite_diff = all(
            abs(r["observed_rate"] - (r["n"] - 1) / r["n"]) > 0.1
            for r in composite_results
        )

        if prime_match and composite_diff:
            print(
                "✓ The empirical results SUPPORT the Floor Discordance Theory of primality."
            )
        else:
            print(
                "✗ The empirical results DO NOT support the Floor Discordance Theory of primality."
            )

            if not prime_match:
                print(
                    "  - Prime numbers do not consistently exhibit the expected (n-1)/n discordance rate."
                )

            if not composite_diff:
                print(
                    "  - Some composite numbers exhibit discordance rates too close to (n-1)/n."
                )


if __name__ == "__main__":
    main()
