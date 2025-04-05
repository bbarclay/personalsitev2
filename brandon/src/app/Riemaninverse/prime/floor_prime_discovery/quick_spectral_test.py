#!/usr/bin/env python3
"""
Quick Spectral Analysis of Structural-Riemann Correspondence
Optimized version for faster initial results
"""

import numpy as np
from scipy import special
from mpmath import mp, zetazero
import matplotlib.pyplot as plt
from typing import List, Dict, Tuple
import time

# Set precision
mp.dps = 50  # Reduced precision for speed

def compute_structural_invariant_spectrum(max_n: int) -> np.ndarray:
    """Compute spectral decomposition of structural invariants."""
    invariants = []
    
    # Pre-compute GCDs for optimization
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
    
    for n in range(2, max_n + 1):
        if n % 100 == 0:  # Progress indicator
            print(f"Processing n = {n}")
            
        # Quick primality test first
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
        
        # For prime numbers, compute the actual invariant
        phi_n_minus_1 = euler_totient(n - 1)
        invariants.append(float(phi_n_minus_1) / (n - 1))
    
    # Compute FFT
    spectrum = np.fft.fft(invariants)
    return np.abs(spectrum)

def compute_zeta_zero_spectrum(num_zeros: int) -> np.ndarray:
    """Compute spectral decomposition of zeta zeros."""
    zeros = []
    for n in range(1, num_zeros + 1):
        try:
            z = complex(mp.im(zetazero(n)))
            zeros.append(z)
        except:
            print(f"Warning: Could not compute zero #{n}")
            continue
    
    # Compute spacings
    spacings = np.diff([float(z.real) for z in zeros])
    
    # Compute FFT
    spectrum = np.fft.fft(spacings)
    return np.abs(spectrum)

def analyze_spectral_correlation(
    max_n: int = 100,  # Reduced for quick analysis
    num_zeros: int = 20  # Reduced number of zeros
) -> Dict:
    """Analyze correlation between structural and zeta spectra."""
    print("Computing structural invariant spectrum...")
    inv_spectrum = compute_structural_invariant_spectrum(max_n)
    
    print("Computing zeta zero spectrum...")
    zero_spectrum = compute_zeta_zero_spectrum(num_zeros)
    
    # Normalize and align spectra
    min_len = min(len(inv_spectrum), len(zero_spectrum))
    inv_spectrum = inv_spectrum[:min_len]
    zero_spectrum = zero_spectrum[:min_len]
    
    # Normalize amplitudes
    inv_spectrum = inv_spectrum / np.max(np.abs(inv_spectrum))
    zero_spectrum = zero_spectrum / np.max(np.abs(zero_spectrum))
    
    # Compute correlation
    correlation = np.corrcoef(inv_spectrum, zero_spectrum)[0,1]
    
    return {
        'correlation': correlation,
        'spectra': {
            'invariant': inv_spectrum,
            'zeros': zero_spectrum
        }
    }

def plot_quick_analysis(results: Dict):
    """Generate simple visualization of results."""
    plt.figure(figsize=(12, 6))
    
    # Plot spectra comparison
    plt.plot(results['spectra']['invariant'], 'b-', label='Structural Spectrum')
    plt.plot(results['spectra']['zeros'], 'r-', label='Zeta Zero Spectrum')
    plt.title(f'Spectral Comparison (Correlation: {results["correlation"]:.4f})')
    plt.xlabel('Frequency')
    plt.ylabel('Magnitude')
    plt.grid(True)
    plt.legend()
    
    plt.savefig('prime/floor_prime_discovery/quick_spectral_analysis.png')
    plt.close()

def main():
    """Run quick spectral analysis."""
    print("Starting quick spectral analysis...")
    start_time = time.time()
    
    # Run analysis with reduced parameters
    results = analyze_spectral_correlation()
    
    # Generate plot
    plot_quick_analysis(results)
    
    # Print results
    print("\nQuick Analysis Results:")
    print("=" * 40)
    print(f"Spectral correlation: {results['correlation']:.6f}")
    print(f"\nTotal analysis time: {time.time() - start_time:.2f} seconds")
    print("\nVisualization saved as 'quick_spectral_analysis.png'")

if __name__ == "__main__":
    main()
