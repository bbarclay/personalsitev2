#!/usr/bin/env python3
"""
Extended Experiments for Floor Prime Discovery

This script extends the exploration of the Structural Invariant Primality Test with
additional experiments focused on:

1. Relationship between structural invariants and number theory sequences
2. Pattern analysis in prime factorizations and structural invariants
3. Correlation with other number theoretic functions
4. Performance optimization experiments
5. Distribution analysis across different number ranges
6. Twin prime relationship analysis
7. Galois group structure exploration
8. Multi-dimensional invariant mapping
"""

import sys
import os
import time
import math
import random
import multiprocessing
from functools import lru_cache
import numpy as np
import matplotlib.pyplot as plt
from tabulate import tabulate
from collections import defaultdict

# Add parent directory to Python path for imports
parent_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(parent_dir)

# Import core functionality from existing files
try:
    from prime_discordance_algorithm import (
        cyclotomic_polynomial,
        compute_numerical_roots,
        measure_discordance_rate,
    )
    from implementation_reference import (
        gcd,
        euler_totient,
        is_cyclic_galois_group,
        order_in_multiplicative_group,
        compute_structural_invariant,
        is_prime_structural,
    )
except ImportError:
    # Fallback implementations if imports fail
    print("Warning: Could not import from existing files. Using fallback implementations.")
    
    @lru_cache(maxsize=1024)
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a
    
    @lru_cache(maxsize=1024)
    def euler_totient(n):
        if n <= 0:
            return 0
        if n == 1:
            return 1
        result = n
        p = 2
        while p * p <= n:
            if n % p == 0:
                while n % p == 0:
                    n //= p
                result -= result // p
            p += 1
        if n > 1:
            result -= result // n
        return result
    
    def compute_structural_invariant(n):
        if n <= 1:
            return 0.0
        if n == 2:
            return 1.0
        # Quick compositeness check
        for i in range(2, min(int(math.sqrt(n)) + 1, 1000)):
            if n % i == 0:
                return 0.0
        # For primes, the invariant equals φ(n-1)/(n-1)
        return euler_totient(n - 1) / (n - 1)
    
    def is_prime_structural(n, verbose=False):
        if n <= 1:
            return False, 0.0, 0.0, True
        if n == 2:
            return True, 1.0, 1.0, True
        
        invariant = compute_structural_invariant(n)
        expected = euler_totient(n - 1) / (n - 1)
        match = abs(invariant - expected) < 1e-9
        is_prime = match and invariant > 0
        
        return is_prime, invariant, expected, match

# New experimental functions

def prime_factors(n):
    """Get the prime factorization of a number as a list of (prime, exponent) tuples."""
    if n <= 1:
        return []
    
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

def analyze_invariant_patterns(n_min, n_max, processes=None):
    """
    Analyze patterns in structural invariants and their relationship to prime factorization.
    
    This experiment looks for correlations between the structural invariant value of a prime
    and the factorization pattern of (p-1).
    """
    if processes is None:
        processes = max(1, multiprocessing.cpu_count() - 1)
    
    print(f"Analyzing invariant patterns from {n_min} to {n_max} using {processes} processes...")
    
    # Split the range into chunks for parallel processing
    chunk_size = (n_max - n_min + 1) // processes
    chunks = [(n_min + i * chunk_size, min(n_min + (i + 1) * chunk_size - 1, n_max)) 
              for i in range(processes)]
    
    with multiprocessing.Pool(processes) as pool:
        results = pool.starmap(analyze_chunk, chunks)
    
    # Combine results
    combined_results = []
    for chunk_results in results:
        combined_results.extend(chunk_results)
    
    # Extract data for primes only
    prime_results = [r for r in combined_results if r["is_prime"]]
    
    # Analyze factorization patterns
    pattern_data = analyze_factorization_patterns(prime_results)
    
    # Plot the results
    plot_invariant_distribution(prime_results)
    plot_pattern_correlations(pattern_data)
    
    return combined_results, pattern_data

def analyze_chunk(start, end):
    """Process a chunk of numbers for parallel execution."""
    results = []
    for n in range(start, end + 1):
        is_prime, invariant, expected, match = is_prime_structural(n)
        
        if is_prime:
            factors_nm1 = prime_factors(n - 1)
            distinct_factors = len(factors_nm1)
            largest_factor = max([p for p, _ in factors_nm1]) if factors_nm1 else 1
            
            results.append({
                "n": n,
                "is_prime": is_prime,
                "invariant": invariant,
                "factors_nm1": factors_nm1,
                "distinct_factors": distinct_factors,
                "largest_factor": largest_factor,
            })
        else:
            results.append({
                "n": n,
                "is_prime": is_prime,
                "invariant": invariant,
            })
    
    return results

def analyze_factorization_patterns(prime_results):
    """Analyze how the factorization of (p-1) correlates with the structural invariant."""
    pattern_data = defaultdict(list)
    
    for result in prime_results:
        n = result["n"]
        invariant = result["invariant"]
        factors = result["factors_nm1"]
        
        # Create pattern signatures based on factorization
        factor_signature = " × ".join([f"{p}^{e}" for p, e in factors])
        num_distinct_primes = len(factors)
        max_exponent = max([e for _, e in factors]) if factors else 0
        
        pattern_data["factor_signatures"][factor_signature].append((n, invariant))
        pattern_data["num_distinct_primes"][num_distinct_primes].append((n, invariant))
        pattern_data["max_exponent"][max_exponent].append((n, invariant))
        
        # Check for special cases like n-1 = 2 × q where q is prime (Sophie Germain primes)
        if len(factors) == 2 and factors[0] == (2, 1):
            pattern_data["sophie_germain_pattern"].append((n, invariant))
        
        # Check for n-1 being a power of 2
        if len(factors) == 1 and factors[0][0] == 2:
            pattern_data["power_of_2_pattern"].append((n, invariant))
        
        # Check for n-1 being a product of exactly two primes
        if len(factors) == 2 and all(e == 1 for _, e in factors):
            pattern_data["product_of_two_primes"].append((n, invariant))
    
    return pattern_data

def plot_invariant_distribution(prime_results):
    """Plot the distribution of structural invariants for prime numbers."""
    plt.figure(figsize=(12, 8))
    
    # Extract data
    primes = [r["n"] for r in prime_results]
    invariants = [r["invariant"] for r in prime_results]
    distinct_factors = [r["distinct_factors"] for r in prime_results]
    
    # Create a colormap based on number of distinct prime factors
    plt.scatter(primes, invariants, c=distinct_factors, cmap='viridis', 
                alpha=0.7, s=30, edgecolors='none')
    
    plt.colorbar(label='Number of distinct prime factors in p-1')
    plt.xlabel('Prime Number')
    plt.ylabel('Structural Invariant Value')
    plt.title('Distribution of Structural Invariants for Prime Numbers')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('invariant_distribution.png')
    plt.close()
    
    # Plot invariant frequency
    plt.figure(figsize=(12, 8))
    plt.hist(invariants, bins=50, alpha=0.7)
    plt.xlabel('Structural Invariant Value')
    plt.ylabel('Frequency')
    plt.title('Frequency Distribution of Structural Invariants')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('invariant_frequency.png')
    plt.close()

def plot_pattern_correlations(pattern_data):
    """Plot correlations between factorization patterns and invariant values."""
    # Plot invariant distribution by number of distinct prime factors
    plt.figure(figsize=(12, 8))
    
    for num_factors, points in sorted(pattern_data["num_distinct_primes"].items()):
        if points:
            inv_values = [inv for _, inv in points]
            plt.scatter([num_factors] * len(inv_values), inv_values, 
                        alpha=0.5, label=f"{num_factors} factors")
    
    plt.xlabel('Number of Distinct Prime Factors in p-1')
    plt.ylabel('Structural Invariant Value')
    plt.title('Correlation Between Invariant and Number of Prime Factors')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('factors_correlation.png')
    plt.close()

def explore_discordance_accuracy(n_min=10, n_max=100, trials_per_number=5000):
    """
    Explore the accuracy of the discordance rate approach for primality testing.
    Compares the observed discordance rate with the theoretical (n-1)/n for primes.
    """
    print(f"Exploring discordance accuracy from {n_min} to {n_max}...")
    
    results = []
    primes = []
    composite_rates = []
    
    for n in range(n_min, n_max + 1):
        is_prime = all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and n > 1
        
        try:
            # Measure discordance rate
            poly = cyclotomic_polynomial(n)
            roots = compute_numerical_roots(poly)
            observed_rate = measure_discordance_rate(roots, trials=trials_per_number)
            
            expected_rate = (n - 1) / n if is_prime else None
            
            if is_prime:
                relative_error = abs(observed_rate - expected_rate) / expected_rate
                primes.append((n, observed_rate, expected_rate, relative_error))
            else:
                composite_rates.append((n, observed_rate))
            
            results.append({
                "n": n,
                "is_prime": is_prime,
                "observed_rate": observed_rate,
                "expected_rate": expected_rate,
                "error": abs(observed_rate - expected_rate) if expected_rate else None,
                "relative_error": abs(observed_rate - expected_rate) / expected_rate if expected_rate else None,
            })
            
            print(f"n={n}, prime={is_prime}, rate={observed_rate:.6f}, " + 
                  (f"expected={expected_rate:.6f}, error={results[-1]['relative_error']:.6f}" if is_prime else ""))
            
        except Exception as e:
            print(f"Error processing n={n}: {str(e)}")
    
    # Plot results
    plt.figure(figsize=(12, 8))
    
    # Plot prime results
    prime_ns = [p[0] for p in primes]
    prime_rates = [p[1] for p in primes]
    prime_expected = [p[2] for p in primes]
    
    # Plot composite results
    comp_ns = [c[0] for c in composite_rates]
    comp_rates = [c[1] for c in composite_rates]
    
    plt.scatter(prime_ns, prime_rates, color='blue', marker='o', label='Prime (observed)')
    plt.scatter(comp_ns, comp_rates, color='red', marker='x', label='Composite (observed)')
    
    # Plot theoretical line (n-1)/n
    x = np.linspace(n_min, n_max, 1000)
    y = (x - 1) / x
    plt.plot(x, y, 'g-', label='Theoretical (n-1)/n')
    
    plt.xlabel('Number n')
    plt.ylabel('Discordance Rate')
    plt.title('Discordance Rate vs. Number')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('discordance_accuracy.png')
    
    return results

def test_special_sequences():
    """Test the structural invariant on special number sequences."""
    print("Testing special number sequences...")
    
    # Define sequences to test
    sequences = {
        "Mersenne primes": [3, 7, 31, 127],
        "Fermat primes": [3, 5, 17, 257, 65537],
        "Twin primes (first of pair)": [3, 5, 11, 17, 29, 41],
        "Sophie Germain primes": [2, 3, 5, 11, 23, 29, 41, 53, 83, 89, 113],
        "Fibonacci primes": [2, 3, 5, 13, 89, 233, 1597],
        "Carmichael numbers": [561, 1105, 1729, 2465, 2821, 6601, 8911]
    }
    
    results = {}
    
    for sequence_name, numbers in sequences.items():
        print(f"\nTesting {sequence_name}:")
        sequence_results = []
        
        for n in numbers:
            is_prime, invariant, expected, match = is_prime_structural(n)
            actual_prime = all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and n > 1
            
            sequence_results.append({
                "n": n,
                "is_prime": is_prime,
                "actual_prime": actual_prime,
                "invariant": invariant,
                "expected": expected,
                "match": match,
                "correct": is_prime == actual_prime
            })
            
            print(f"  n={n}, prime={is_prime}, actual={actual_prime}, invariant={invariant:.6f}")
        
        results[sequence_name] = sequence_results
    
    return results

def explore_invariant_approximations(n_min=10, n_max=1000):
    """
    Explore approximations for the structural invariant φ(n-1)/(n-1).
    Compare with other number-theoretic functions to find patterns.
    """
    print(f"Exploring invariant approximations from {n_min} to {n_max}...")
    
    # Only test prime numbers
    primes = [n for n in range(n_min, n_max + 1) if all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and n > 1]
    
    results = []
    for p in primes:
        # Calculate actual invariant
        invariant = euler_totient(p - 1) / (p - 1)
        
        # Calculate approximations
        log_approx = 1 / math.log(p)
        exp_approx = math.exp(-0.5772) / math.log(math.log(p)) if p > 10 else 0
        
        # Other number theoretic functions
        p_minus_1_factors = prime_factors(p - 1)
        distinct_factors = len(p_minus_1_factors)
        
        results.append({
            "prime": p,
            "invariant": invariant,
            "log_approx": log_approx,
            "exp_approx": exp_approx,
            "p_minus_1_factors": p_minus_1_factors,
            "distinct_factors": distinct_factors
        })
        
        print(f"p={p}, invariant={invariant:.6f}, log_approx={log_approx:.6f}, error={abs(invariant-log_approx)/invariant:.6f}")
    
    # Plot comparisons
    plt.figure(figsize=(12, 8))
    
    primes_list = [r["prime"] for r in results]
    invariants = [r["invariant"] for r in results]
    log_approx = [r["log_approx"] for r in results]
    
    plt.scatter(primes_list, invariants, color='blue', marker='o', label='Actual Invariant')
    plt.scatter(primes_list, log_approx, color='red', marker='x', label='1/log(p) Approximation')
    
    plt.xlabel('Prime p')
    plt.ylabel('Value')
    plt.title('Structural Invariant vs. Approximations')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('invariant_approximations.png')
    
    return results

# NEW EXPERIMENTS ADDED BELOW

def analyze_twin_primes(max_n=1000):
    """
    Analyze the structural invariants of twin primes to find patterns.
    Twin primes are pairs of primes that differ by 2 (p, p+2).
    """
    print(f"Analyzing twin primes up to {max_n}...")
    
    # Find twin primes
    twin_primes = []
    for n in range(3, max_n-1):
        if (all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and 
            all((n+2) % i != 0 for i in range(2, int(math.sqrt(n+2)) + 1))):
            twin_primes.append((n, n+2))
    
    print(f"Found {len(twin_primes)} twin prime pairs")
    
    # Calculate invariants for each pair
    results = []
    for p1, p2 in twin_primes:
        _, inv1, _, _ = is_prime_structural(p1)
        _, inv2, _, _ = is_prime_structural(p2)
        
        # Calculate the ratio and difference of invariants
        ratio = inv1 / inv2 if inv2 != 0 else float('inf')
        diff = inv1 - inv2
        
        # Analyze the factorization relationship
        factors_p1_minus_1 = prime_factors(p1 - 1)
        factors_p2_minus_1 = prime_factors(p2 - 1)
        
        # Find common factors
        p1_factors_dict = {p: e for p, e in factors_p1_minus_1}
        p2_factors_dict = {p: e for p, e in factors_p2_minus_1}
        common_factors = set(p1_factors_dict.keys()) & set(p2_factors_dict.keys())
        
        results.append({
            "p1": p1,
            "p2": p2,
            "inv1": inv1,
            "inv2": inv2,
            "ratio": ratio,
            "diff": diff,
            "factors_p1_minus_1": factors_p1_minus_1,
            "factors_p2_minus_1": factors_p2_minus_1,
            "common_factors": common_factors
        })
        
        print(f"Twin pair ({p1}, {p2}): invariants={inv1:.6f}, {inv2:.6f}, ratio={ratio:.6f}, diff={diff:.6f}")
    
    # Analyze the results
    ratios = [r["ratio"] for r in results if not math.isinf(r["ratio"])]
    diffs = [r["diff"] for r in results]
    common_factor_counts = [len(r["common_factors"]) for r in results]
    
    plt.figure(figsize=(12, 8))
    plt.subplot(2, 2, 1)
    plt.hist(ratios, bins=20, alpha=0.7)
    plt.xlabel('Invariant Ratio (p1/p2)')
    plt.ylabel('Frequency')
    plt.title('Distribution of Twin Prime Invariant Ratios')
    
    plt.subplot(2, 2, 2)
    plt.hist(diffs, bins=20, alpha=0.7)
    plt.xlabel('Invariant Difference (p1-p2)')
    plt.ylabel('Frequency')
    plt.title('Distribution of Twin Prime Invariant Differences')
    
    plt.subplot(2, 2, 3)
    plt.hist(common_factor_counts, bins=max(common_factor_counts)+1, alpha=0.7)
    plt.xlabel('Number of Common Prime Factors in p-1')
    plt.ylabel('Frequency')
    plt.title('Common Factor Distribution in Twin Primes')
    
    plt.subplot(2, 2, 4)
    p1_values = [r["p1"] for r in results]
    ratio_values = [r["ratio"] for r in results if not math.isinf(r["ratio"])]
    if p1_values and ratio_values and len(p1_values) == len(ratio_values):
        plt.scatter(p1_values[:len(ratio_values)], ratio_values, alpha=0.7)
        plt.xlabel('First Twin Prime (p)')
        plt.ylabel('Invariant Ratio (p/p+2)')
        plt.title('Twin Prime Invariant Ratio vs. Prime Size')
    
    plt.tight_layout()
    plt.savefig('twin_prime_analysis.png')
    
    return results

def search_invariant_anomalies(n_min=3, n_max=10000):
    """
    Search for anomalies or unusual patterns in structural invariants.
    This might reveal new mathematical connections.
    """
    print(f"Searching for invariant anomalies between {n_min} and {n_max}...")
    
    # Only look at prime numbers
    primes = []
    for n in range(n_min, n_max + 1):
        if all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and n > 1:
            primes.append(n)
    
    print(f"Found {len(primes)} primes in range")
    
    # Calculate invariants and look for patterns
    results = []
    running_avg = 0
    running_count = 0
    
    for i, p in enumerate(primes):
        _, inv, _, _ = is_prime_structural(p)
        
        # Update running average
        running_count += 1
        running_avg = running_avg + (inv - running_avg) / running_count
        
        # Calculate deviation from running average
        deviation = abs(inv - running_avg) / running_avg if running_avg != 0 else 0
        
        # For primes after the first, calculate ratio with previous prime's invariant
        prev_inv = results[-1]["invariant"] if i > 0 else None
        inv_ratio = inv / prev_inv if prev_inv and prev_inv != 0 else None
        
        # Calculate invariant density (invariant * ln(p))
        inv_density = inv * math.log(p)
        
        results.append({
            "prime": p,
            "invariant": inv,
            "running_avg": running_avg,
            "deviation": deviation,
            "prev_inv_ratio": inv_ratio,
            "inv_density": inv_density
        })
        
        # Check for significant anomalies (high deviation)
        if deviation > 0.5:  # Threshold for significance
            print(f"Anomaly detected: p={p}, inv={inv:.6f}, avg={running_avg:.6f}, dev={deviation:.6f}")
    
    # Look for clustering patterns
    invariants = [r["invariant"] for r in results]
    from scipy.stats import gaussian_kde
    
    # Use KDE to identify clusters
    if len(invariants) > 5:  # Need enough data for KDE
        try:
            kde = gaussian_kde(invariants)
            x = np.linspace(min(invariants), max(invariants), 1000)
            y = kde(x)
            
            # Find peaks (potential clusters)
            from scipy.signal import find_peaks
            peaks, _ = find_peaks(y)
            peak_values = x[peaks]
            
            print(f"Detected {len(peaks)} potential invariant clusters at: {', '.join([f'{v:.4f}' for v in peak_values])}")
            
            # Plot the density and clusters
            plt.figure(figsize=(12, 6))
            plt.plot(x, y)
            plt.plot(x[peaks], y[peaks], 'ro')
            plt.xlabel('Structural Invariant Value')
            plt.ylabel('Density')
            plt.title('Density of Structural Invariant Values')
            plt.grid(True, alpha=0.3)
            plt.savefig('invariant_density_clusters.png')
        except Exception as e:
            print(f"Error in KDE analysis: {str(e)}")
    
    # Plot invariant density
    plt.figure(figsize=(12, 6))
    plt.scatter([r["prime"] for r in results], [r["inv_density"] for r in results], alpha=0.7)
    plt.xlabel('Prime Number')
    plt.ylabel('Invariant Density (inv * ln(p))')
    plt.title('Structural Invariant Density vs. Prime Size')
    plt.grid(True, alpha=0.3)
    plt.savefig('invariant_density.png')
    
    return results

def multi_dimensional_invariant_mapping(max_n=100):
    """
    Create a multi-dimensional mapping of structural invariants to explore 
    deeper relationships between different mathematical properties.
    """
    print(f"Creating multi-dimensional invariant mapping up to {max_n}...")
    
    # Collect data for primes up to max_n
    primes = []
    for n in range(2, max_n + 1):
        if all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and n > 1:
            primes.append(n)
    
    # Calculate multiple metrics for each prime
    results = []
    for p in primes:
        _, inv, _, _ = is_prime_structural(p)
        
        # Calculate additional metrics
        factors_p_minus_1 = prime_factors(p - 1)
        distinct_factors = len(factors_p_minus_1)
        largest_factor = max([f for f, _ in factors_p_minus_1]) if factors_p_minus_1 else 1
        
        # Calculate "primality index" - ratio of p to the product of its p-1 factors
        primality_index = p / np.prod([f**e for f, e in factors_p_minus_1]) if factors_p_minus_1 else p
        
        # Calculate "structural complexity" - product of distinct factors and their exponents
        structural_complexity = sum(e for _, e in factors_p_minus_1) * distinct_factors
        
        # Calculate "cyclicity measure" - ratio of φ(p-1) to p-1
        cyclicity = euler_totient(p - 1) / (p - 1)
        
        results.append({
            "prime": p,
            "invariant": inv,
            "distinct_factors": distinct_factors,
            "largest_factor": largest_factor,
            "primality_index": primality_index,
            "structural_complexity": structural_complexity,
            "cyclicity": cyclicity
        })
    
    # Create 3D visualization
    from mpl_toolkits.mplot3d import Axes3D
    
    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111, projection='3d')
    
    x = [r["invariant"] for r in results]
    y = [r["structural_complexity"] for r in results]
    z = [r["primality_index"] for r in results]
    colors = [r["distinct_factors"] for r in results]
    
    scatter = ax.scatter(x, y, z, c=colors, cmap='viridis', s=40, alpha=0.7)
    
    ax.set_xlabel('Structural Invariant')
    ax.set_ylabel('Structural Complexity')
    ax.set_zlabel('Primality Index')
    plt.colorbar(scatter, label='Number of Distinct Factors in p-1')
    plt.title('Multi-dimensional Invariant Mapping')
    
    plt.savefig('multi_dimensional_mapping.png')
    
    # Create correlation matrix
    import pandas as pd
    import seaborn as sns
    
    # Create DataFrame from results
    df = pd.DataFrame(results)
    
    # Calculate correlations
    corr = df.drop(columns=['prime']).corr()
    
    # Plot correlation matrix
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
    plt.title('Correlation Matrix of Invariant Properties')
    plt.tight_layout()
    plt.savefig('invariant_correlations.png')
    
    return results

def analyze_error_distribution(n_min=10, n_max=500, trials=1000):
    """
    Analyze the distribution of errors in the discordance rate compared to theoretical values.
    This may reveal systematic patterns in the algorithm's accuracy.
    """
    print(f"Analyzing error distribution from {n_min} to {n_max} with {trials} trials per number...")
    
    results = []
    
    # Only analyze prime numbers
    primes = [n for n in range(n_min, n_max + 1) if all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1)) and n > 1]
    
    for p in primes:
        print(f"Processing prime p={p}...")
        
        try:
            # Calculate discordance rate multiple times to analyze variance
            rates = []
            for _ in range(5):  # Run 5 samples to measure variance
                poly = cyclotomic_polynomial(p)
                roots = compute_numerical_roots(poly)
                rate = measure_discordance_rate(roots, trials=trials)
                rates.append(rate)
            
            # Calculate statistics
            avg_rate = np.mean(rates)
            std_dev = np.std(rates)
            expected_rate = (p - 1) / p
            abs_error = abs(avg_rate - expected_rate)
            rel_error = abs_error / expected_rate
            
            results.append({
                "prime": p,
                "expected_rate": expected_rate,
                "avg_observed_rate": avg_rate,
                "std_dev": std_dev,
                "abs_error": abs_error,
                "rel_error": rel_error,
                "trials": trials
            })
            
            print(f"  Expected: {expected_rate:.6f}, Observed: {avg_rate:.6f}, RelError: {rel_error:.6f}")
            
        except Exception as e:
            print(f"  Error processing p={p}: {str(e)}")
    
    # Analyze how error scales with prime size
    plt.figure(figsize=(12, 8))
    plt.subplot(2, 2, 1)
    plt.scatter([r["prime"] for r in results], [r["rel_error"] for r in results], alpha=0.7)
    plt.xlabel('Prime Size')
    plt.ylabel('Relative Error')
    plt.title('Relative Error vs. Prime Size')
    plt.grid(True, alpha=0.3)
    
    plt.subplot(2, 2, 2)
    plt.scatter([r["prime"] for r in results], [r["std_dev"] for r in results], alpha=0.7)
    plt.xlabel('Prime Size')
    plt.ylabel('Standard Deviation')
    plt.title('Rate Variance vs. Prime Size')
    plt.grid(True, alpha=0.3)
    
    plt.subplot(2, 2, 3)
    plt.hist([r["rel_error"] for r in results], bins=20, alpha=0.7)
    plt.xlabel('Relative Error')
    plt.ylabel('Frequency')
    plt.title('Distribution of Relative Errors')
    
    plt.subplot(2, 2, 4)
    plt.scatter([math.log(r["prime"]) for r in results], [math.log(r["rel_error"]) if r["rel_error"] > 0 else -10 for r in results], alpha=0.7)
    plt.xlabel('Log(Prime Size)')
    plt.ylabel('Log(Relative Error)')
    plt.title('Log-Log Plot of Error Scaling')
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('error_analysis.png')
    
    return results

def main():
    """Run all experiments."""
    print("Starting Floor Prime Discovery Extended Experiments")
    print("==================================================")
    
    # Create results directory if it doesn't exist
    if not os.path.exists("results"):
        os.makedirs("results")
    
    # Run experiments
    print("\n1. Testing Special Sequences...")
    special_sequence_results = test_special_sequences()
    
    print("\n2. Exploring Discordance Accuracy...")
    discordance_results = explore_discordance_accuracy(10, 50, trials_per_number=5000)
    
    print("\n3. Analyzing Invariant Patterns...")
    pattern_results, pattern_data = analyze_invariant_patterns(10, 200, processes=4)
    
    print("\n4. Exploring Invariant Approximations...")
    approximation_results = explore_invariant_approximations(10, 500)
    
    print("\n5. Analyzing Twin Primes...")
    twin_prime_results = analyze_twin_primes(max_n=500)
    
    print("\n6. Searching for Invariant Anomalies...")
    anomaly_results = search_invariant_anomalies(n_min=3, n_max=1000)
    
    print("\n7. Creating Multi-dimensional Invariant Mapping...")
    mapping_results = multi_dimensional_invariant_mapping(max_n=100)
    
    print("\n8. Analyzing Error Distribution...")
    error_results = analyze_error_distribution(n_min=10, n_max=100, trials=500)
    
    print("\nAll experiments completed. Results saved to the results directory.")
    
    # Print summary statistics
    print("\nSummary of Findings:")
    print("--------------------")
    # Add summary logic here based on the results collected
    
    print("\nExperiment complete.")

if __name__ == "__main__":
    main() 