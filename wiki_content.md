# GitHub Wiki Content for StatClean (v0.1.3)

## Home Page (Home.md)

# Welcome to StatClean

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

---

## Statistical Methods Guide (Statistical-Methods-Guide.md)

# Statistical Methods Guide

## Univariate Methods
- IQR: robust to non-normal data; configure lower/upper factors.
- Z-score: assumes approximate normality; configurable threshold.
- Modified Z-score: robust via MAD; default threshold 3.5.

## Multivariate Methods
- Mahalanobis distance: detects multivariate outliers using covariance structure.
  - `chi2_threshold`: percentile in (0,1] or absolute chi-square statistic.
  - `use_shrinkage=True` to enable Ledoit–Wolf covariance if scikit-learn available.

## Formal Tests
- Grubbs' test: single outlier detection with p-value and critical value.
- Dixon's Q-test: for small n (<30); approximate p-value reported.

## Transformations
- Box-Cox (positive data): optimal lambda estimated; preserves NaNs.
- Log (natural, base 10, base 2): shifts applied for non-positive values.
- Square-root: shifts applied for negatives.

Best practices: drop NaNs before tests where needed; sample large data for Shapiro.

---

## API Reference (API-Reference.md)

# API Reference

## Core Class
- `StatClean(df: DataFrame, preserve_index: bool = True)`
  - `set_data`, `set_thresholds`, `get_thresholds`, `reset`, `get_summary_report`

## Detection (non-destructive)
- `detect_outliers_iqr(column, lower_factor=None, upper_factor=None)` → Series
- `detect_outliers_zscore(column, threshold=None)` → Series
- `detect_outliers_modified_zscore(column, threshold=None)` → Series
- `detect_outliers_mahalanobis(columns=None, chi2_threshold=None, use_shrinkage=False)` → Series

## Removal / Winsorizing (chained)
- `remove_outliers_iqr(column, ...)` → self
- `remove_outliers_zscore(column, threshold=None)` → self
- `remove_outliers_modified_zscore(column, threshold=None)` → self
- `remove_outliers_mahalanobis(columns=None, chi2_threshold=None, use_shrinkage=False)` → self
- `winsorize_outliers_iqr(column, ...)` → self
- `winsorize_outliers_zscore(column, threshold=None)` → self
- `winsorize_outliers_percentile(column, lower_percentile=5, upper_percentile=95)` → self

## Analysis & Utilities
- `analyze_distribution(column)` → dict (skewness, kurtosis, normality, recommendation)
- `compare_methods(columns=None, methods=None, ...)` → dict summary
- `get_outlier_stats(columns=None, methods=['iqr','zscore'], ...)` → DataFrame
- `plot_outlier_analysis(columns=None, methods=None, figsize=(15,5))` → dict[str, Figure]
- `visualize_outliers(column)` → None

## Transformations
- `transform_boxcox(column, lambda_param=None)` → (self, info)
- `transform_log(column, base='natural')` → (self, info)
- `transform_sqrt(column)` → (self, info)
- `recommend_transformation(column)` → dict

## Utils (module `statclean.utils`)
- `plot_outliers(series, outliers_mask, title=None)`
- `plot_distribution(series, outliers_mask=None, title=None)`
- `plot_boxplot(series, title=None)`
- `plot_qq(series, outliers_mask=None, title=None)`
- `plot_outlier_analysis(data, outliers=None)`

Notes:
- Remover methods return `self` for chaining; access data via `cleaner.clean_df`.
- Mahalanobis supports percentile thresholds and shrinkage covariance.

---

## Advanced Examples (Advanced-Examples.md)

# Advanced Examples

### California Housing End-to-End
```python
import pandas as pd
from sklearn.datasets import fetch_california_housing
from statclean import StatClean

housing = fetch_california_housing()
df = pd.DataFrame(housing.data, columns=housing.feature_names)
df['PRICE'] = housing.target

cleaner = StatClean(df, preserve_index=True)

# Analyze & clean selected features
features = ['MedInc', 'AveRooms', 'PRICE']
cleaned_df, info = cleaner.clean_columns(features, method='auto', show_progress=True)

# Multivariate check
mv_outliers = cleaner.detect_outliers_mahalanobis(['MedInc', 'AveRooms', 'PRICE'], chi2_threshold=0.975)
print('Multivariate outliers:', mv_outliers.sum())

# Visualization grid
figs = cleaner.plot_outlier_analysis(features)
```

### Modified Z-score Visualization
```python
outliers = cleaner.detect_outliers_modified_zscore('PRICE')
cleaner.remove_outliers_modified_zscore('PRICE')
cleaner.visualize_outliers('PRICE')
```