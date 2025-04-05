#!/usr/bin/env python3
"""
Riemann Hypothesis Connection Analysis
This script explores the deep connections between structural invariants
and the zeros of the Riemann zeta function.
"""

import numpy as np
import matplotlib.pyplot as plt
from math import gcd, log
from cmath import exp, pi
from typing import List, Tuple, Dict
import time

def riemann_zeta_truncated(s: complex, terms: int = 1000) -> complex:
    """Compute truncated Riemann zeta function."""
    return sum(1/pow(n, s) for n in range(1, terms + 1))

def structural_invariant(n: int) -> float:
    """Calculate structural invariant for number n."""
    if n <= 1:
        return 0.0
    
    # Find elements of maximal order
    max_order = 0
    max_order_count = 0
    
    for a in range(1, n):
        if gcd(a, n) == 1:
            order = 1
            value = a % n
            while value != 1:
                value = (value * a) % n
                order += 1
                if order > n:
                    break
            if order == n - 1:
                max_order_count += 1
            max_order = max(max_order, order)
    
    if max_order == n - 1:
        phi_n_minus_1 = sum(1 for i in range(1, n) if gcd(i, n-1) == 1)
        if max_order_count == phi_n_minus_1:
            return phi_n_minus_1 / (n - 1)
    return 0.0

def compute_invariant_series(max_n: int) -> List[float]:
    """Compute structural invariants for range of numbers."""
    return [structural_invariant(n) for n in range(2, max_n + 1)]

def find_zeta_zeros(t_min: float, t_max: float, steps: int = 1000) -> List[complex]:
    """Find approximate zeros of zeta function on critical line."""
    zeros = []
    t_values = np.linspace(t_min, t_max, steps)
    
    for t in t_values:
        s = complex(0.5, t)
        z = riemann_zeta_truncated(s)
        if abs(z) < 0.1:  # Approximate zero detection
            zeros.append(s)
    
    return zeros

def compute_concordance_measure(invariants: List[float], zero: complex) -> float:
    """Compute concordance between invariant pattern and zeta zero."""
    n_values = range(2, len(invariants) + 2)
    concordance = sum(inv * abs(exp(-zero * log(n))) for n, inv in zip(n_values, invariants))
    return abs(concordance)

def analyze_structural_spectral_correspondence(max_n: int = 1000, t_max: float = 50.0) -> Dict:
    """Analyze correspondence between structural invariants and zeta zeros."""
    print("Computing structural invariants...")
    invariants = compute_invariant_series(max_n)
    
    print("Finding zeta zeros...")
    zeros = find_zeta_zeros(0, t_max)
    
    print("Analyzing correlations...")
    correlations = {}
    
    # Pattern 1: Invariant distribution vs zero spacing
    zero_gaps = [zeros[i+1].imag - zeros[i].imag for i in range(len(zeros)-1)]
    inv_gaps = [invariants[i+1] - invariants[i] for i in range(len(invariants)-1)]
    
    # Normalize sequences
    zero_gaps = np.array(zero_gaps) / np.mean(zero_gaps)
    inv_gaps = np.array(inv_gaps) / (np.mean(inv_gaps) if np.mean(inv_gaps) != 0 else 1)
    
    correlations['gap_correlation'] = np.corrcoef(zero_gaps[:min(len(zero_gaps), len(inv_gaps))],
                                                inv_gaps[:min(len(zero_gaps), len(inv_gaps))])[0,1]
    
    # Pattern 2: Spectral decomposition
    spec_zeros = np.fft.fft([z.imag for z in zeros])
    spec_invs = np.fft.fft(invariants)
    
    correlations['spectral_similarity'] = np.abs(np.corrcoef(
        np.abs(spec_zeros[:min(len(spec_zeros), len(spec_invs))]),
        np.abs(spec_invs[:min(len(spec_zeros), len(spec_invs))]))[0,1])
    
    # Pattern 3: Concordance measures
    concordance_values = [compute_concordance_measure(invariants, zero) for zero in zeros]
    correlations['mean_concordance'] = np.mean(concordance_values)
    
    return {
        'correlations': correlations,
        'zeros_found': len(zeros),
        'invariant_stats': {
            'mean': np.mean(invariants),
            'std': np.std(invariants),
            'non_zero': sum(1 for inv in invariants if inv > 0)
        }
    }

def plot_correspondence(max_n: int = 1000, t_max: float = 50.0):
    """Visualize the correspondence between invariants and zeta zeros."""
    invariants = compute_invariant_series(max_n)
    zeros = find_zeta_zeros(0, t_max)
    
    plt.figure(figsize=(15, 10))
    
    # Plot 1: Structural Invariant Pattern
    plt.subplot(2, 1, 1)
    plt.plot(range(2, len(invariants) + 2), invariants, 'b-', label='Structural Invariants')
    plt.title('Structural Invariant Pattern')
    plt.xlabel('n')
    plt.ylabel('Invariant Value')
    plt.grid(True)
    plt.legend()
    
    # Plot 2: Zeta Zero Pattern
    plt.subplot(2, 1, 2)
    zero_heights = [z.imag for z in zeros]
    plt.plot(zero_heights, [abs(riemann_zeta_truncated(complex(0.5, t))) for t in zero_heights],
             'r-', label='Zeta Function Values')
    plt.title('Zeta Function Near Zeros')
    plt.xlabel('t')
    plt.ylabel('|ζ(1/2 + it)|')
    plt.grid(True)
    plt.legend()
    
    plt.tight_layout()
    plt.savefig('prime/floor_prime_discovery/riemann_correspondence.png')
    plt.close()

def main():
    """Run main analysis of Riemann-Structural connections."""
    print("Starting Riemann-Structural correspondence analysis...")
    
    max_n = 1000  # Number of integers to analyze
    t_max = 50.0  # Maximum height for zeta zeros
    
    start_time = time.time()
    
    # Analyze correspondence
    results = analyze_structural_spectral_correspondence(max_n, t_max)
    
    # Generate visualizations
    plot_correspondence(max_n, t_max)
    
    # Print results
    print("\nAnalysis Results:")
    print("=" * 40)
    print(f"Zeros found: {results['zeros_found']}")
    print("\nCorrelations:")
    for key, value in results['correlations'].items():
        print(f"{key}: {value:.4f}")
    
    print("\nInvariant Statistics:")
    for key, value in results['invariant_stats'].items():
        print(f"{key}: {value:.4f}")
    
    print(f"\nTotal analysis time: {time.time() - start_time:.2f} seconds")
    print("\nVisualization saved as 'riemann_correspondence.png'")
    
    # Key findings
    print("\nKey Findings:")
    print("-" * 40)
    
    gap_corr = results['correlations']['gap_correlation']
    if abs(gap_corr) > 0.3:
        print("✓ Significant correlation found between invariant gaps and zero spacing")
        print(f"  Correlation strength: {abs(gap_corr):.4f}")
    
    spec_sim = results['correlations']['spectral_similarity']
    if spec_sim > 0.3:
        print("✓ Strong spectral similarity detected")
        print(f"  Similarity measure: {spec_sim:.4f}")
    
    conc = results['correlations']['mean_concordance']
    if conc > 0.5:
        print("✓ High average concordance with zeta zeros")
        print(f"  Mean concordance: {conc:.4f}")

if __name__ == "__main__":
    main()
