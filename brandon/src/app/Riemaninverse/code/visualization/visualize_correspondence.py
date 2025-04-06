#!/usr/bin/env python3
"""
Visualization of the Structural-Spectral Correspondence
This script generates visualizations demonstrating the connection between
structural invariants and Riemann zeta zeros.
"""

import numpy as np
import matplotlib.pyplot as plt
from mpmath import mp, zetazero
from typing import List, Tuple, Dict
import time

# Set precision
mp.dps = 50

def compute_invariants(max_n: int) -> np.ndarray:
    """Compute structural invariants for range of numbers."""
    def euler_totient(n):
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
    
    invariants = []
    
    for n in range(2, max_n + 1):
        if n % 50 == 0:
            print(f"Computing invariant {n}/{max_n}")
            
        if n > 2 and n % 2 == 0:
            invariants.append(0.0)
            continue
            
        is_prime = True
        for i in range(2, int(n ** 0.5) + 1):
            if n % i == 0:
                is_prime = False
                break
        
        if not is_prime:
            invariants.append(0.0)
            continue
        
        phi_n_minus_1 = euler_totient(n - 1)
        invariants.append(float(phi_n_minus_1) / (n - 1))
    
    return np.array(invariants)

def get_zeta_zeros(num_zeros: int) -> np.ndarray:
    """Get specified number of zeta zeros."""
    zeros = []
    for n in range(1, num_zeros + 1):
        z = complex(mp.im(zetazero(n)))
        zeros.append(float(z.real))
    return np.array(zeros)

def plot_spectral_correspondence(
    max_n: int = 100,
    num_zeros: int = 20,
    output_dir: str = 'prime/floor_prime_discovery/visualizations'
):
    """Generate comprehensive visualization of spectral correspondence."""
    print("Computing structural invariants...")
    invariants = compute_invariants(max_n)
    
    print("Computing zeta zeros...")
    zeros = get_zeta_zeros(num_zeros)
    
    # Create figure with multiple subplots
    fig = plt.figure(figsize=(20, 15))
    
    # 1. Structural Invariant Pattern
    ax1 = plt.subplot(3, 2, 1)
    ax1.plot(range(2, len(invariants)+2), invariants, 'b-')
    ax1.set_title('Structural Invariant Distribution')
    ax1.set_xlabel('n')
    ax1.set_ylabel('Invariant Value')
    ax1.grid(True)
    
    # 2. Zeta Zero Spacing
    ax2 = plt.subplot(3, 2, 2)
    zero_gaps = np.diff(zeros)
    ax2.plot(range(1, len(zero_gaps)+1), zero_gaps, 'r-')
    ax2.set_title('Zeta Zero Spacing')
    ax2.set_xlabel('Index')
    ax2.set_ylabel('Gap Size')
    ax2.grid(True)
    
    # 3. Spectral Comparison
    ax3 = plt.subplot(3, 2, (3, 4))
    inv_spectrum = np.abs(np.fft.fft(invariants))
    zero_spectrum = np.abs(np.fft.fft(zero_gaps))
    
    # Normalize spectra
    inv_spectrum = inv_spectrum / np.max(inv_spectrum)
    zero_spectrum = zero_spectrum / np.max(zero_spectrum)
    
    # Compute correlation
    min_len = min(len(inv_spectrum), len(zero_spectrum))
    correlation = np.corrcoef(
        inv_spectrum[:min_len],
        zero_spectrum[:min_len]
    )[0,1]
    
    ax3.plot(inv_spectrum[:min_len], 'b-', label='Invariant Spectrum')
    ax3.plot(zero_spectrum[:min_len], 'r-', label='Zero Spectrum')
    ax3.set_title(f'Spectral Comparison (Correlation: {correlation:.6f})')
    ax3.set_xlabel('Frequency')
    ax3.set_ylabel('Normalized Magnitude')
    ax3.legend()
    ax3.grid(True)
    
    # 4. Phase Comparison
    ax4 = plt.subplot(3, 2, 5)
    inv_phases = np.angle(np.fft.fft(invariants))[:min_len]
    zero_phases = np.angle(np.fft.fft(zero_gaps))[:min_len]
    
    ax4.plot(inv_phases, 'b-', label='Invariant Phases')
    ax4.plot(zero_phases, 'r-', label='Zero Phases')
    ax4.set_title('Phase Comparison')
    ax4.set_xlabel('Frequency')
    ax4.set_ylabel('Phase')
    ax4.legend()
    ax4.grid(True)
    
    # 5. Correlation Map
    ax5 = plt.subplot(3, 2, 6)
    correlation_map = np.correlate(
        inv_spectrum[:min_len],
        zero_spectrum[:min_len],
        mode='full'
    )
    ax5.plot(correlation_map, 'g-')
    ax5.set_title('Cross-Correlation')
    ax5.set_xlabel('Lag')
    ax5.set_ylabel('Correlation')
    ax5.grid(True)
    
    # Add overall title
    plt.suptitle(
        'Structural-Spectral Correspondence\n'
        f'Sample: n={max_n}, zeros={num_zeros}, correlation={correlation:.6f}',
        fontsize=16
    )
    
    plt.tight_layout()
    plt.savefig(f'{output_dir}/spectral_correspondence.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    return correlation

def plot_correlation_evolution(
    max_range: int = 1000,
    step: int = 50,
    output_dir: str = 'prime/floor_prime_discovery/visualizations'
):
    """Plot how correlation evolves with increasing sample size."""
    ranges = list(range(step, max_range + step, step))
    correlations = []
    
    for n in ranges:
        print(f"Testing range {n}...")
        correlation = plot_spectral_correspondence(max_n=n, num_zeros=min(n//5, 100))
        correlations.append(correlation)
    
    plt.figure(figsize=(12, 6))
    plt.plot(ranges, correlations, 'b-')
    plt.title('Correlation Evolution with Sample Size')
    plt.xlabel('Sample Size (n)')
    plt.ylabel('Spectral Correlation')
    plt.grid(True)
    plt.savefig(f'{output_dir}/correlation_evolution.png', dpi=300, bbox_inches='tight')
    plt.close()

def main():
    """Generate comprehensive visualizations."""
    print("Starting visualization generation...")
    start_time = time.time()
    
    # Create initial visualization
    correlation = plot_spectral_correspondence()
    print(f"\nInitial correlation: {correlation:.6f}")
    
    # Plot correlation evolution
    print("\nAnalyzing correlation evolution...")
    plot_correlation_evolution()
    
    print(f"\nTotal visualization time: {time.time() - start_time:.2f} seconds")

if __name__ == "__main__":
    main()
