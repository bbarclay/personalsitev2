#!/usr/bin/env python3
"""
Prime Discordance Algorithm - Implementation of Floor Discordance Theory for primality testing.

This module implements the core algorithms needed to test the revolutionary hypothesis that primality
can be characterized through specific discordance rates in cyclotomic fields.
"""

import numpy as np
import sympy
import matplotlib.pyplot as plt
from tqdm import tqdm
import time
import multiprocessing
from sympy.polys.cyclotomic import cyclotomic_poly as sympy_cyclotomic


def cyclotomic_polynomial(n):
    """
    Generate the nth cyclotomic polynomial.

    Args:
        n: A positive integer

    Returns:
        A sympy polynomial representing the nth cyclotomic polynomial
    """
    return sympy_cyclotomic(n)


def compute_numerical_roots(poly, precision=1000):
    """
    Compute numerical approximations of the roots of a polynomial.

    Args:
        poly: A sympy polynomial
        precision: The precision to use for root finding

    Returns:
        A numpy array of complex roots
    """
    # Convert to numpy polynomial for numerical root finding
    poly_coeffs = [complex(c) for c in poly.all_coeffs()]
    roots = np.roots(poly_coeffs[::-1])  # Reverse coefficients for numpy's format

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


def is_prime_discordance(n, precision=1000, trials=10000):
    """
    Determine if a number is prime using the discordance rate method.

    Args:
        n: A positive integer to test for primality
        precision: Numerical precision to use
        trials: Number of trials for measuring discordance

    Returns:
        Boolean indicating primality
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Compute cyclotomic polynomial
    poly = cyclotomic_polynomial(n)

    # Compute numerical roots
    roots = compute_numerical_roots(poly, precision)

    # Measure discordance rate
    observed_rate = measure_discordance_rate(roots, trials)

    # Expected rate for primes: (n-1)/n
    expected_rate = (n - 1) / n

    # Determine primality using adaptive threshold
    # Threshold becomes tighter for larger numbers
    threshold = 1 / (n**0.5)
    return abs(observed_rate - expected_rate) < threshold


def validate_prime_characterization(start=2, end=1000, show_progress=True):
    """
    Validate the prime characterization by testing a range of numbers.

    Args:
        start: Starting number
        end: Ending number
        show_progress: Whether to show progress bar

    Returns:
        Dictionary with results
    """
    results = {}
    iterator = tqdm(range(start, end + 1)) if show_progress else range(start, end + 1)

    for n in iterator:
        # Compute cyclotomic polynomial
        poly = cyclotomic_polynomial(n)

        # Compute numerical roots
        roots = compute_numerical_roots(poly)

        # Measure discordance rate
        observed_rate = measure_discordance_rate(roots)

        # Check actual primality
        is_prime = sympy.isprime(n)
        expected_rate = (n - 1) / n if is_prime else None

        # Store results
        results[n] = {
            "n": n,
            "is_prime": is_prime,
            "observed_rate": observed_rate,
            "expected_rate": expected_rate,
            "accurate": is_prime == is_prime_discordance(n),
        }

        if show_progress and n % 10 == 0:
            tqdm.write(
                f"n={n}, prime={is_prime}, rate={observed_rate:.6f}, expected={expected_rate:.6f if expected_rate else 'N/A'}"
            )

    return results


def analyze_results(results):
    """
    Analyze validation results and create visualizations.

    Args:
        results: Dictionary with validation results

    Returns:
        Dictionary with analysis metrics
    """
    primes = {n: data for n, data in results.items() if data["is_prime"]}
    composites = {n: data for n, data in results.items() if not data["is_prime"]}

    prime_rates = [data["observed_rate"] for data in primes.values()]
    composite_rates = [data["observed_rate"] for data in composites.values()]

    # Calculate accuracy
    correct_classifications = sum(1 for data in results.values() if data["accurate"])
    accuracy = correct_classifications / len(results)

    # Create visualization
    plt.figure(figsize=(12, 6))

    plt.subplot(1, 2, 1)
    plt.hist(prime_rates, bins=20, alpha=0.7, label="Primes")
    plt.hist(composite_rates, bins=20, alpha=0.7, label="Composites")
    plt.xlabel("Discordance Rate")
    plt.ylabel("Count")
    plt.title("Distribution of Discordance Rates")
    plt.legend()

    plt.subplot(1, 2, 2)
    prime_xs = [n for n in primes.keys()]
    prime_ys = [data["observed_rate"] for data in primes.values()]
    composite_xs = [n for n in composites.keys()]
    composite_ys = [data["observed_rate"] for data in composites.values()]

    plt.scatter(prime_xs, prime_ys, s=20, alpha=0.7, label="Primes")
    plt.scatter(composite_xs, composite_ys, s=20, alpha=0.7, label="Composites")

    # Plot theoretical curve (n-1)/n
    curve_x = np.linspace(min(results.keys()), max(results.keys()), 1000)
    curve_y = (curve_x - 1) / curve_x
    plt.plot(curve_x, curve_y, "r-", linewidth=1, label="(n-1)/n")

    plt.xlabel("Number")
    plt.ylabel("Discordance Rate")
    plt.title("Discordance Rates vs. Number")
    plt.legend()

    plt.tight_layout()
    plt.savefig("discordance_analysis.png")

    return {
        "accuracy": accuracy,
        "prime_mean_rate": np.mean(prime_rates),
        "composite_mean_rate": np.mean(composite_rates),
        "prime_std_dev": np.std(prime_rates),
        "composite_std_dev": np.std(composite_rates),
    }


def parallel_validation(start, end, num_processes=None):
    """
    Run validation in parallel using multiple processes.

    Args:
        start: Starting number
        end: Ending number
        num_processes: Number of processes to use (defaults to CPU count)

    Returns:
        Dictionary with combined results
    """
    if num_processes is None:
        num_processes = multiprocessing.cpu_count()

    # Split the range into chunks
    chunk_size = (end - start + 1) // num_processes
    chunks = []
    for i in range(num_processes):
        chunk_start = start + i * chunk_size
        chunk_end = chunk_start + chunk_size - 1 if i < num_processes - 1 else end
        chunks.append((chunk_start, chunk_end))

    # Create a pool of processes
    pool = multiprocessing.Pool(processes=num_processes)

    # Define the worker function
    def worker(chunk):
        return validate_prime_characterization(chunk[0], chunk[1], show_progress=False)

    # Map the worker function to the chunks
    chunk_results = pool.map(worker, chunks)

    # Combine the results
    combined_results = {}
    for chunk_result in chunk_results:
        combined_results.update(chunk_result)

    return combined_results


def test_critical_cases():
    """
    Test specific critical cases that might challenge the theory.

    Returns:
        Dictionary with results for critical cases
    """
    critical_cases = [
        # Carmichael numbers
        561,
        1105,
        1729,
        2465,
        2821,
        6601,
        8911,
        # Mersenne primes
        3,
        7,
        31,
        127,
        8191,
        # Mersenne non-primes
        2047,
        8388607,
        # Fermat primes
        3,
        5,
        17,
        257,
        65537,
        # Fermat non-primes
        4294967297,
    ]

    results = {}

    for n in tqdm(critical_cases):
        # Skip extremely large numbers that might take too long
        if n > 1000000:
            tqdm.write(f"Skipping large number {n} in quick test")
            continue

        # Extra precision for critical cases
        poly = cyclotomic_polynomial(n)
        roots = compute_numerical_roots(poly, precision=2000)
        observed_rate = measure_discordance_rate(roots, trials=50000)

        is_prime = sympy.isprime(n)
        expected_rate = (n - 1) / n if is_prime else None

        results[n] = {
            "n": n,
            "is_prime": is_prime,
            "observed_rate": observed_rate,
            "expected_rate": expected_rate,
            "accurate": is_prime
            == is_prime_discordance(n, precision=2000, trials=50000),
        }

        tqdm.write(
            f"Critical case n={n}, prime={is_prime}, rate={observed_rate:.6f}, expected={expected_rate:.6f if expected_rate else 'N/A'}"
        )

    return results


def main():
    """Main function to run validation tests."""
    print("Prime Discordance Theory - Validation Suite")
    print("===========================================")

    choice = input(
        "Choose test range:\n1. Quick test (2-100)\n2. Medium test (2-1000)\n3. Critical cases\n4. Parallel test\nChoice: "
    )

    start_time = time.time()

    if choice == "1":
        results = validate_prime_characterization(2, 100)
    elif choice == "2":
        results = validate_prime_characterization(2, 1000)
    elif choice == "3":
        results = test_critical_cases()
    elif choice == "4":
        start = int(input("Start number: "))
        end = int(input("End number: "))
        results = parallel_validation(start, end)
    else:
        print("Invalid choice.")
        return

    end_time = time.time()

    analysis = analyze_results(results)

    print("\nAnalysis Results:")
    print(f"Total numbers tested: {len(results)}")
    print(f"Overall accuracy: {analysis['accuracy']*100:.4f}%")
    print(f"Mean discordance rate for primes: {analysis['prime_mean_rate']:.6f}")
    print(
        f"Mean discordance rate for composites: {analysis['composite_mean_rate']:.6f}"
    )
    print(f"Standard deviation for primes: {analysis['prime_std_dev']:.6f}")
    print(f"Standard deviation for composites: {analysis['composite_std_dev']:.6f}")
    print(f"Time taken: {end_time - start_time:.2f} seconds")

    print("\nVisualization saved as 'discordance_analysis.png'")


if __name__ == "__main__":
    main()
