#!/usr/bin/env python3
"""
Deep Spectral Analysis of Structural-Riemann Correspondence
This script performs high-precision analysis of the spectral relationships
between structural invariants and zeta zeros.
"""

import numpy as np
from scipy import special
from mpmath import mp, zetazero
import matplotlib.pyplot as plt
from typing import List, Dict, Tuple
import time

# Set high precision
mp.dps = 100  # 100 digits of precision

def compute_structural_invariant_spectrum(max_n: int) -> np.ndarray:
    """Compute the spectral decomposition of structural invariants."""
    invariants = []
    for n in range(2, max_n + 1):
        # Compute structural invariant
        max_order = 0
        max_order_count = 0
        
        for a in range(1, n):
            if np.gcd(a, n) == 1:
                # Calculate multiplicative order
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
        
        # Calculate invariant
        if max_order == n - 1:
            phi_n_minus_1 = sum(1 for i in range(1, n) if np.gcd(i, n-1) == 1)
            if max_order_count == phi_n_minus_1:
                invariants.append(float(phi_n_minus_1) / (n - 1))
            else:
                invariants.append(0.0)
        else:
            invariants.append(0.0)
    
    # Compute FFT
    spectrum = np.fft.fft(invariants)
    return np.abs(spectrum)

def compute_zeta_zero_spectrum(num_zeros: int) -> np.ndarray:
    """Compute spectral decomposition of zeta zeros."""
    # Get precise zeta zeros
    zeros = [complex(mp.im(zetazero(n))) for n in range(1, num_zeros + 1)]
    
    # Compute spacings
    spacings = np.diff([float(z.real) for z in zeros])
    
    # Compute FFT
    spectrum = np.fft.fft(spacings)
    return np.abs(spectrum)

def analyze_spectral_correlation(
    max_n: int = 10000,
    num_zeros: int = 100
) -> Dict:
    """Analyze correlation between structural and zeta spectra."""
    print("Computing structural invariant spectrum...")
    inv_spectrum = compute_structural_invariant_spectrum(max_n)
    
    print("Computing zeta zero spectrum...")
    zero_spectrum = compute_zeta_zero_spectrum(num_zeros)
    
    # Normalize spectra to same length for comparison
    min_len = min(len(inv_spectrum), len(zero_spectrum))
    inv_spectrum = inv_spectrum[:min_len]
    zero_spectrum = zero_spectrum[:min_len]
    
    # Normalize amplitudes
    inv_spectrum = inv_spectrum / np.max(np.abs(inv_spectrum))
    zero_spectrum = zero_spectrum / np.max(np.abs(zero_spectrum))
    
    # Compute correlations
    correlation = np.corrcoef(inv_spectrum, zero_spectrum)[0,1]
    
    # Find peaks and compare their positions
    inv_peaks = find_spectral_peaks(inv_spectrum)
    zero_peaks = find_spectral_peaks(zero_spectrum)
    
    return {
        'correlation': correlation,
        'invariant_peaks': inv_peaks,
        'zero_peaks': zero_peaks,
        'spectra': {
            'invariant': inv_spectrum,
            'zeros': zero_spectrum
        }
    }

def find_spectral_peaks(spectrum: np.ndarray, threshold: float = 0.1) -> List[int]:
    """Find significant peaks in spectrum."""
    peaks = []
    for i in range(1, len(spectrum)-1):
        if (spectrum[i] > spectrum[i-1] and 
            spectrum[i] > spectrum[i+1] and 
            spectrum[i] > threshold):
            peaks.append(i)
    return peaks

def analyze_phase_relationships(
    inv_spectrum: np.ndarray,
    zero_spectrum: np.ndarray
) -> Dict:
    """Analyze phase relationships between spectra."""
    # Get phases
    inv_phases = np.angle(inv_spectrum)
    zero_phases = np.angle(zero_spectrum)
    
    # Compute phase differences
    phase_diff = np.abs(inv_phases - zero_phases) % (2 * np.pi)
    
    return {
        'mean_phase_diff': float(np.mean(phase_diff)),
        'phase_correlation': float(np.corrcoef(inv_phases, zero_phases)[0,1]),
        'phase_coherence': float(np.mean(np.exp(1j * phase_diff)))
    }

def plot_spectral_analysis(results: Dict, output_file: str):
    """Generate visualization of spectral analysis."""
    fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(15, 12))
    
    # Plot 1: Spectra Comparison
    x = np.arange(len(results['spectra']['invariant']))
    ax1.plot(x, results['spectra']['invariant'], 'b-', label='Structural Spectrum')
    ax1.plot(x, results['spectra']['zeros'], 'r-', label='Zeta Zero Spectrum')
    ax1.set_title('Spectral Comparison')
    ax1.set_xlabel('Frequency')
    ax1.set_ylabel('Magnitude')
    ax1.legend()
    ax1.grid(True)
    
    # Plot 2: Peak Alignment
    ax2.vlines(results['invariant_peaks'], 0, 1, color='b', label='Structural Peaks')
    ax2.vlines(results['zero_peaks'], 0, 0.8, color='r', label='Zeta Peaks')
    ax2.set_title('Peak Alignment')
    ax2.set_xlabel('Frequency')
    ax2.legend()
    ax2.grid(True)
    
    # Plot 3: Correlation Analysis
    correlation = np.correlate(
        results['spectra']['invariant'],
        results['spectra']['zeros'],
        mode='full'
    )
    ax3.plot(correlation, 'g-')
    ax3.set_title('Cross-Correlation')
    ax3.set_xlabel('Lag')
    ax3.set_ylabel('Correlation')
    ax3.grid(True)
    
    plt.tight_layout()
    plt.savefig(output_file)
    plt.close()

def main():
    """Run deep spectral analysis."""
    print("Starting deep spectral analysis...")
    
    start_time = time.time()
    
    # Parameters
    max_n = 10000  # Range for structural invariants
    num_zeros = 100  # Number of zeta zeros to analyze
    
    # Run analysis
    results = analyze_spectral_correlation(max_n, num_zeros)
    
    # Phase analysis
    phase_results = analyze_phase_relationships(
        results['spectra']['invariant'],
        results['spectra']['zeros']
    )
    
    # Generate plots
    plot_spectral_analysis(results, 'prime/floor_prime_discovery/deep_spectral_analysis.png')
    
    # Print results
    print("\nSpectral Analysis Results:")
    print("=" * 50)
    print(f"Spectral correlation: {results['correlation']:.6f}")
    print(f"\nPhase Analysis:")
    print(f"Mean phase difference: {phase_results['mean_phase_diff']:.6f} rad")
    print(f"Phase correlation: {phase_results['phase_correlation']:.6f}")
    print(f"Phase coherence: {abs(phase_results['phase_coherence']):.6f}")
    
    print(f"\nPeak Analysis:")
    print(f"Number of structural peaks: {len(results['invariant_peaks'])}")
    print(f"Number of zeta peaks: {len(results['zero_peaks'])}")
    
    print(f"\nTotal analysis time: {time.time() - start_time:.2f} seconds")
    print("\nVisualization saved as 'deep_spectral_analysis.png'")

if __name__ == "__main__":
    main()
