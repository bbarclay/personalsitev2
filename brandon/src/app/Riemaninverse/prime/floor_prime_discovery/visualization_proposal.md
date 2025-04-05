# Visualizing the Structural Invariant: Proposed Explorations

This document proposes several visualization approaches to better understand and communicate the patterns revealed by the Structural Invariant Primality Test. These visualizations could help uncover deeper insights about prime numbers and the relationship between primality and algebraic structure.

## 1. Basic Pattern Visualizations

### 1.1 Linear Plot of Structural Invariants

**Description:** Plot the value of the structural invariant for each integer n in a range (e.g., 2 to 1000), using different colors for prime and composite numbers.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import compute_structural_invariant

# Calculate structural invariants
max_n = 1000
numbers = range(2, max_n + 1)
invariants = [compute_structural_invariant(n) for n in numbers]
phi_ratios = [euler_totient(n-1)/(n-1) for n in numbers]
is_prime = [invariants[i-2] > 0 for i in range(2, max_n + 1)]

# Create plot
plt.figure(figsize=(15, 6))
plt.scatter([n for i, n in enumerate(numbers) if is_prime[i]], 
           [invariants[i] for i, n in enumerate(numbers) if is_prime[i]], 
           color='blue', label='Primes')
plt.scatter([n for i, n in enumerate(numbers) if not is_prime[i]], 
           [invariants[i] for i, n in enumerate(numbers) if not is_prime[i]], 
           color='red', label='Composites')

# Plot φ(n-1)/(n-1) values for reference
plt.plot(numbers, phi_ratios, 'g-', alpha=0.3, label='φ(n-1)/(n-1)')

plt.xlabel('n')
plt.ylabel('Structural Invariant')
plt.title('Structural Invariant Values (2 to 1000)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('structural_invariant_linear.png')
```

**Expected Insights:** This basic visualization would clearly show the binary distinction between primes (where invariant = φ(n-1)/(n-1)) and composites (where invariant = 0). It would also reveal any patterns in the distribution of φ(n-1)/(n-1) values.

### 1.2 Heatmap of Invariant Values

**Description:** Create a 2D heatmap where position (x,y) represents the number n = 10x + y, colored according to its structural invariant value.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import compute_structural_invariant
import matplotlib.colors as colors

# Calculate structural invariants
max_n = 1000
invariants = [compute_structural_invariant(n) for n in range(2, max_n + 1)]

# Reshape for heatmap (assuming max_n is divisible by 10)
rows = max_n // 10
cols = 10
heatmap_data = np.zeros((rows, cols))

for i in range(2, max_n + 1):
    row = (i - 2) // 10
    col = (i - 2) % 10
    if row < rows and col < cols:
        heatmap_data[row, col] = invariants[i-2]

# Create custom colormap (white for 0, blue gradient for positive values)
cmap = colors.LinearSegmentedColormap.from_list(
    'custom', [(1,1,1), (0,0,1)], N=256)
cmap.set_under('white')  # Color for values below vmin

# Create plot
plt.figure(figsize=(12, 8))
plt.imshow(heatmap_data, cmap=cmap, norm=colors.Normalize(vmin=0.00001, vmax=1))
plt.colorbar(label='Structural Invariant')
plt.title('Structural Invariant Heatmap (2 to 1000)')
plt.xlabel('Last Digit')
plt.ylabel('First Digits')
plt.savefig('structural_invariant_heatmap.png')
```

**Expected Insights:** This visualization would reveal patterns related to the last digits of numbers, potentially showing periodic structures in the distribution of primes and their structural invariants.

## 2. Distribution Analysis

### 2.1 Histogram of φ(n-1)/(n-1) Values

**Description:** Create a histogram showing the distribution of φ(n-1)/(n-1) values for prime numbers, helping us understand if certain values are more common than others.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import is_prime_structural, compute_structural_invariant

# Calculate φ(n-1)/(n-1) values for primes
max_n = 10000
phi_ratios_primes = []

for n in range(2, max_n + 1):
    is_prime, _, _, _ = is_prime_structural(n)
    if is_prime:
        phi_ratio = euler_totient(n-1) / (n-1)
        phi_ratios_primes.append(phi_ratio)

# Create histogram
plt.figure(figsize=(12, 6))
plt.hist(phi_ratios_primes, bins=50, alpha=0.7, color='blue')
plt.xlabel('φ(n-1)/(n-1) Value')
plt.ylabel('Frequency')
plt.title('Distribution of φ(n-1)/(n-1) Values for Primes')
plt.grid(True, alpha=0.3)
plt.savefig('phi_ratio_distribution.png')
```

**Expected Insights:** This would show whether certain φ(n-1)/(n-1) values are more common among primes, potentially revealing patterns related to the structure of prime numbers.

### 2.2 Correlation with Number Density

**Description:** Plot the relationship between the structural invariant and prime density in different ranges, helping to understand how the structural perspective relates to prime distribution.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import is_prime_structural

# Define ranges to analyze
ranges = [(2, 100), (101, 1000), (1001, 10000)]
results = []

for start, end in ranges:
    # Count primes in range
    prime_count = 0
    invariant_sum = 0
    
    for n in range(start, end + 1):
        is_prime, invariant, _, _ = is_prime_structural(n)
        if is_prime:
            prime_count += 1
            invariant_sum += invariant
    
    # Calculate metrics
    range_size = end - start + 1
    prime_density = prime_count / range_size
    avg_invariant = invariant_sum / prime_count if prime_count > 0 else 0
    
    results.append((start, end, prime_density, avg_invariant))

# Plot results
fig, ax1 = plt.subplots(figsize=(12, 6))

x = [f"{r[0]}-{r[1]}" for r in results]
y1 = [r[2] for r in results]
ax1.set_xlabel('Number Range')
ax1.set_ylabel('Prime Density', color='blue')
ax1.bar(x, y1, alpha=0.7, color='blue')
ax1.tick_params(axis='y', labelcolor='blue')

ax2 = ax1.twinx()
y2 = [r[3] for r in results]
ax2.set_ylabel('Average Invariant Value for Primes', color='red')
ax2.plot(x, y2, 'ro-')
ax2.tick_params(axis='y', labelcolor='red')

plt.title('Prime Density vs. Average Structural Invariant')
plt.savefig('density_invariant_correlation.png')
```

**Expected Insights:** This would reveal any correlation between the density of primes and the values of the structural invariant, potentially providing insights into prime distribution patterns.

## 3. Pattern Exploration Visualizations

### 3.1 Structural Invariant vs. Prime Gap

**Description:** Visualize the relationship between the structural invariant and prime gaps (the difference between consecutive primes).

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import is_prime_structural

# Find primes and their gaps
max_n = 10000
primes = []
invariants = []

for n in range(2, max_n + 1):
    is_prime, invariant, _, _ = is_prime_structural(n)
    if is_prime:
        primes.append(n)
        invariants.append(invariant)

# Calculate prime gaps
gaps = [primes[i+1] - primes[i] for i in range(len(primes)-1)]
invariant_diffs = [invariants[i+1] - invariants[i] for i in range(len(invariants)-1)]

# Create scatter plot
plt.figure(figsize=(12, 8))
plt.scatter(gaps, invariant_diffs, alpha=0.7)
plt.xlabel('Prime Gap')
plt.ylabel('Change in Structural Invariant')
plt.title('Relationship Between Prime Gaps and Structural Invariant Changes')
plt.grid(True, alpha=0.3)
plt.savefig('gap_invariant_relationship.png')
```

**Expected Insights:** This visualization might reveal whether prime gaps correlate with changes in the structural invariant, potentially providing a new perspective on the distribution of prime gaps.

### 3.2 Twin Prime Visualization

**Description:** Create a specialized visualization for twin primes, examining how their structural invariants relate.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import is_prime_structural

# Find twin primes
max_n = 10000
twin_primes = []
twin_invariants = []

for n in range(3, max_n - 1):
    is_prime1, invariant1, _, _ = is_prime_structural(n)
    is_prime2, invariant2, _, _ = is_prime_structural(n+2)
    
    if is_prime1 and is_prime2:
        twin_primes.append((n, n+2))
        twin_invariants.append((invariant1, invariant2))

# Create visualization
plt.figure(figsize=(12, 8))
plt.scatter([p[0] for p in twin_primes], 
           [i[0] for i in twin_invariants], 
           color='blue', label='p')
plt.scatter([p[1] for p in twin_primes], 
           [i[1] for i in twin_invariants], 
           color='red', label='p+2')

# Connect twin pairs with lines
for i in range(len(twin_primes)):
    plt.plot([twin_primes[i][0], twin_primes[i][1]], 
             [twin_invariants[i][0], twin_invariants[i][1]], 
             'k-', alpha=0.3)

plt.xlabel('Prime Number')
plt.ylabel('Structural Invariant')
plt.title('Structural Invariants of Twin Primes')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('twin_prime_invariants.png')
```

**Expected Insights:** This would reveal any patterns in how the structural invariants of twin primes relate to each other, potentially offering insights into twin prime properties.

## 4. Advanced Visualizations

### 4.1 3D Surface Plot of Invariant Structure

**Description:** Create a 3D surface plot where x and y are coordinates in the number plane, and z represents the structural invariant.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from primality_test import compute_structural_invariant

# Calculate structural invariants for a grid of numbers
x_range = range(2, 102)
y_range = range(2, 102)
Z = np.zeros((len(x_range), len(y_range)))

for i, x in enumerate(x_range):
    for j, y in enumerate(y_range):
        n = x * y  # visualization based on factorization
        Z[i, j] = compute_structural_invariant(n)

X, Y = np.meshgrid(x_range, y_range)

# Create 3D surface plot
fig = plt.figure(figsize=(15, 12))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(X, Y, Z.T, cmap='viridis', edgecolor='none', alpha=0.8)

ax.set_xlabel('Factor 1')
ax.set_ylabel('Factor 2')
ax.set_zlabel('Structural Invariant')
ax.set_title('3D Visualization of Structural Invariant Based on Factorization')
fig.colorbar(surf, ax=ax, shrink=0.5, aspect=5)
plt.savefig('structural_invariant_3d.png')
```

**Expected Insights:** This would visualize how the structural invariant relates to the factorization structure of numbers, potentially revealing deeper patterns in how primality manifests in the structural invariant.

### 4.2 Animated Time Series of Invariant Evolution

**Description:** Create an animated visualization showing how the structural invariant "evolves" as n increases.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from primality_test import compute_structural_invariant

# Calculate data
max_n = 1000
numbers = list(range(2, max_n + 1))
invariants = [compute_structural_invariant(n) for n in numbers]
phi_ratios = [euler_totient(n-1)/(n-1) for n in numbers]

# Create animation function
fig, ax = plt.subplots(figsize=(12, 6))

def animate(i):
    ax.clear()
    end_idx = min(i*10 + 10, len(numbers))
    
    ax.scatter(numbers[:end_idx], invariants[:end_idx], 
               c=['blue' if inv > 0 else 'red' for inv in invariants[:end_idx]])
    ax.plot(numbers[:end_idx], phi_ratios[:end_idx], 'g-', alpha=0.3)
    
    ax.set_xlim(2, max_n)
    ax.set_ylim(0, 1)
    ax.set_xlabel('n')
    ax.set_ylabel('Structural Invariant')
    ax.set_title(f'Evolution of Structural Invariant (2 to {numbers[end_idx-1]})')
    ax.grid(True, alpha=0.3)

# Create animation
ani = animation.FuncAnimation(fig, animate, frames=len(numbers)//10, interval=200)
ani.save('structural_invariant_evolution.mp4', writer='ffmpeg')
```

**Expected Insights:** This animation would help visualize how the pattern of structural invariants evolves as we explore larger numbers, potentially revealing large-scale patterns that aren't obvious in static visualizations.

### 4.3 Network Visualization of Structural Relationships

**Description:** Create a network visualization where nodes are numbers and edges connect numbers with related structural properties.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
from primality_test import is_prime_structural, compute_structural_invariant

# Calculate structural invariants
max_n = 100
invariants = []
primes = []

for n in range(2, max_n + 1):
    is_prime, invariant, _, _ = is_prime_structural(n)
    invariants.append(invariant)
    if is_prime:
        primes.append(n)

# Create graph
G = nx.Graph()

# Add nodes
for n in range(2, max_n + 1):
    is_prime = n in primes
    G.add_node(n, prime=is_prime)

# Add edges between numbers with similar invariants
for i in range(2, max_n + 1):
    for j in range(i+1, max_n + 1):
        inv_i = invariants[i-2]
        inv_j = invariants[j-2]
        
        # Connect primes with similar φ(n-1)/(n-1) values
        if inv_i > 0 and inv_j > 0:
            if abs(inv_i - inv_j) < 0.05:  # Threshold for similarity
                G.add_edge(i, j, weight=1/abs(inv_i - inv_j))

# Visualize
plt.figure(figsize=(15, 15))
pos = nx.spring_layout(G, seed=42)  # positions for all nodes

# Draw nodes
nx.draw_networkx_nodes(G, pos, 
                      nodelist=[n for n in G.nodes if G.nodes[n]['prime']],
                      node_color='blue', node_size=100, alpha=0.8)
nx.draw_networkx_nodes(G, pos, 
                      nodelist=[n for n in G.nodes if not G.nodes[n]['prime']],
                      node_color='red', node_size=50, alpha=0.5)

# Draw edges
nx.draw_networkx_edges(G, pos, width=0.5, alpha=0.5)

# Add labels
nx.draw_networkx_labels(G, pos, font_size=8)

plt.title("Network of Numbers with Similar Structural Invariants")
plt.axis('off')
plt.savefig('structural_invariant_network.png', dpi=300)
```

**Expected Insights:** This network visualization would reveal clusters of numbers with similar structural invariant properties, potentially uncovering hidden patterns or relationships between different primes.

## 5. Multidimensional Analysis

### 5.1 Comparison Across Multiple Number-Theoretic Functions

**Description:** Create a parallel coordinates plot comparing the structural invariant with other number-theoretic functions.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import compute_structural_invariant
import pandas as pd
from pandas.plotting import parallel_coordinates

# Calculate various number-theoretic functions
max_n = 100
data = []

for n in range(2, max_n + 1):
    # Calculate various metrics
    invariant = compute_structural_invariant(n)
    phi_ratio = euler_totient(n-1) / (n-1)
    liouville = (-1) ** sum(1 for i in range(2, int(np.sqrt(n)) + 1) if n % i == 0)
    mobius = calculate_mobius(n)  # Would need implementation
    
    # Add to data
    data.append([n, invariant, phi_ratio, liouville, mobius, 'Prime' if invariant > 0 else 'Composite'])

# Create dataframe
df = pd.DataFrame(data, columns=['n', 'Invariant', 'PhiRatio', 'Liouville', 'Mobius', 'Type'])

# Create parallel coordinates plot
plt.figure(figsize=(15, 8))
parallel_coordinates(df.drop('n', axis=1), 'Type', colormap='viridis')
plt.title('Parallel Coordinates Plot of Number-Theoretic Functions')
plt.savefig('multidimensional_comparison.png')
```

**Expected Insights:** This visualization would show how the structural invariant relates to other number-theoretic functions, potentially revealing correlations or distinctive patterns that characterize primality across multiple dimensions.

### 5.2 Principal Component Analysis of Number Features

**Description:** Apply PCA to a set of number-theoretic features including the structural invariant to see how primality manifests in reduced dimensions.

**Implementation:**
```python
import numpy as np
import matplotlib.pyplot as plt
from primality_test import compute_structural_invariant
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# Calculate features for each number
max_n = 1000
features = []
labels = []

for n in range(2, max_n + 1):
    # Calculate features
    invariant = compute_structural_invariant(n)
    phi_ratio = euler_totient(n-1) / (n-1)
    
    # Add more features as needed
    sqrt_dist = min(abs(n - i**2) for i in range(int(np.sqrt(n))-5, int(np.sqrt(n))+5))
    digit_sum = sum(int(d) for d in str(n))
    
    features.append([invariant, phi_ratio, sqrt_dist, digit_sum])
    labels.append('Prime' if invariant > 0 else 'Composite')

# Apply PCA
X = StandardScaler().fit_transform(features)
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Create visualization
plt.figure(figsize=(12, 10))
for label, color in [('Prime', 'blue'), ('Composite', 'red')]:
    mask = np.array(labels) == label
    plt.scatter(X_pca[mask, 0], X_pca[mask, 1], c=color, label=label, alpha=0.7)

plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%} variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%} variance)')
plt.title('PCA of Number-Theoretic Features')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('pca_number_features.png')
```

**Expected Insights:** This would reveal how well primality can be separated in a lower-dimensional space using features including the structural invariant, potentially uncovering latent dimensions that characterize primality in ways not immediately obvious.

## 6. Implementation Plan

To implement these visualizations effectively, we recommend:

1. **Starting with the basic visualizations** (1.1, 1.2) to establish a foundation for understanding the structural invariant pattern.

2. **Following up with the distribution analyses** (2.1, 2.2) to better understand the statistical properties of the structural invariant.

3. **Exploring specific patterns** (3.1, 3.2) to investigate connections to known number-theoretic phenomena like prime gaps and twin primes.

4. **Developing advanced visualizations** (4.1-4.3) if the initial analyses reveal interesting patterns worth exploring further.

5. **Concluding with multidimensional analyses** (5.1, 5.2) to place the structural invariant in the broader context of number theory.

## Conclusion

These visualizations would help us understand the patterns and implications of the Structural Invariant Primality Test from multiple perspectives. By exploring these visual representations, we may uncover new insights about the relationship between algebraic structure and primality, potentially leading to deeper theoretical advances in number theory and related fields.

The visual analyses would serve not only to communicate our findings but also as exploratory tools to generate new hypotheses and directions for further mathematical investigation.

---

*This visualization proposal outlines approaches that would require implementation and refinement based on initial results. The goal is to provide both explanatory visualizations for communicating the concept and exploratory visualizations for uncovering new patterns.* 