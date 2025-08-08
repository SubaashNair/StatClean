# GitHub Wiki Content for StatClean (v0.1.3)

## Home Page (Home.md)


StatClean is a comprehensive statistical data preprocessing and outlier detection library with formal statistical testing and publication-quality reporting.
As of v0.1.3, remover methods return the cleaner instance for chaining; access results via `cleaner.clean_df` and `cleaner.outlier_info`.

## Quick Navigation

- [Installation Guide](Installation-Guide)
- [Quick Start Tutorial](Quick-Start-Tutorial)  
- [Statistical Methods Guide](Statistical-Methods-Guide)
- [API Reference](API-Reference)
- [Advanced Examples](Advanced-Examples)
- [Performance Tips](Performance-Tips)
- [Troubleshooting](Troubleshooting)
- [Contributing](Contributing)

## Key Features

- **Formal Statistical Testing**: Grubbs' test, Dixon's Q-test with p-values
- **Multivariate Analysis**: Mahalanobis distance outlier detection
- **Data Transformations**: Box-Cox, logarithmic, square-root transformations
- **Method Chaining**: Fluent API for streamlined workflows
- **Publication-Quality Reporting**: Statistical significance testing

## Links

- [GitHub Repository](https://github.com/SubaashNair/StatClean)
- [PyPI Package](https://pypi.org/project/statclean/)
- [Documentation](https://subaashnair.github.io/StatClean/)

---

## Installation Guide (Installation-Guide.md)

# Installation Guide

## Quick Install

```bash
pip install statclean
```

## Requirements

- Python 3.7+
- numpy >= 1.19.0
- pandas >= 1.2.0
- matplotlib >= 3.3.0
- seaborn >= 0.11.0
- scipy >= 1.6.0
- tqdm >= 4.60.0

## Development Install

```bash
git clone https://github.com/SubaashNair/StatClean.git
cd StatClean
pip install -e .
```

## Verification

```python
from statclean import StatClean
print("Installation successful!")
```

---

## Quick Start Tutorial (Quick-Start-Tutorial.md)

# Quick Start Tutorial

## Basic Usage

```python
import pandas as pd
from statclean import StatClean

# Sample data
df = pd.DataFrame({
    'values': [1, 2, 3, 100, 4, 5, 6]  # 100 is an outlier
})

# Initialize StatClean
cleaner = StatClean(df)

# Detect outliers
outliers = cleaner.detect_outliers_zscore('values')
print(f"Outliers detected: {outliers.sum()}")

# Remove outliers
cleaner.remove_outliers_zscore('values')
cleaned_df = cleaner.clean_df
print(f"Cleaned shape: {cleaned_df.shape}")
```

## Statistical Testing

```python
# Formal statistical test
result = cleaner.grubbs_test('values', alpha=0.05)
print(f"P-value: {result['p_value']:.6f}")
print(f"Outlier detected: {result['is_outlier']}")
```

## Method Chaining

```python
# Fluent API
result = (cleaner
          .set_thresholds(zscore_threshold=2.5)
          .winsorize_outliers_iqr('values')
          .clean_df)
```

---

## Performance Tips (Performance-Tips.md)

# Performance Tips

## Large Datasets

For datasets with >100k rows:

```python
# Use batch processing
cleaner.clean_columns(columns, show_progress=True)

# Cache statistics for repeated operations
cleaner.add_zscore_columns(columns, cache_stats=True)
```

## Memory Optimization

```python
# Process columns individually for memory efficiency
for col in large_columns:
    cleaner.remove_outliers_zscore(col)
    
# Use in-place operations when possible
cleaner = StatClean(df, preserve_index=False)
```

## Multivariate Performance

```python
# For many variables, consider dimensionality reduction first
from sklearn.decomposition import PCA
pca_data = PCA(n_components=5).fit_transform(df)
```

---

## Troubleshooting (Troubleshooting.md)

# Troubleshooting

## Common Issues

### ImportError
```bash
pip install --upgrade statclean
```

### Memory Issues
```python
# Process in chunks
for chunk in pd.read_csv('large_file.csv', chunksize=10000):
    cleaner = StatClean(chunk)
    # Process chunk
```

### Visualization Problems
```bash
# For headless servers
export MPLBACKEND=Agg
```

### Mahalanobis Threshold and Stability
`chi2_threshold` can be percentile (0<val<=1) or absolute chi-square statistic. Covariance inversion uses pseudoinverse when needed; optional shrinkage via scikit-learn's Ledoit–Wolf with `use_shrinkage=True`.
```python
# Remove highly correlated variables first if instability persists
correlation_matrix = df.corr()
```

## Getting Help

- Check [GitHub Issues](https://github.com/SubaashNair/StatClean/issues)
- Read [Documentation](https://subaashnair.github.io/StatClean/)
- Review [Examples](https://subaashnair.github.io/StatClean/examples)

---

## Contributing (Contributing.md)

# Contributing to StatClean

## Development Setup

```bash
git clone https://github.com/SubaashNair/StatClean.git
cd StatClean
pip install -e .
pip install pytest
```

## Running Tests (Headless)

```bash
export MPLBACKEND=Agg
pytest -q
```

## Code Style

- Follow PEP 8
- Use type hints
- Add docstrings to all functions
- No Claude references in commits

## Pull Request Process

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes with tests
4. Run test suite: `pytest`
5. Submit pull request

## Areas for Contribution

- Additional statistical tests
- Performance optimizations
- New visualization methods
- Documentation improvements
- Bug fixes

---

Instructions for setting up GitHub Wiki:

1. Go to your GitHub repository: https://github.com/SubaashNair/StatClean
2. Click on "Wiki" tab
3. Click "Create the first page"
4. Copy the content above for each page
5. Create pages with the exact names shown in parentheses
6. Set "Home" as the main wiki page