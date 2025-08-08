---
title: Home
layout: default
nav_order: 1
---

# Welcome to StatClean

Data preprocessing & outlier detection with formal statistical methods and publication-quality reporting.

[![PyPI](https://img.shields.io/pypi/v/statclean.svg)](https://pypi.org/project/statclean/)
[![Build](https://github.com/SubaashNair/StatClean/actions/workflows/publish.yml/badge.svg)](https://github.com/SubaashNair/StatClean/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

> Note: Remover methods return `self`. Access cleaned data via `cleaner.clean_df` and details via `cleaner.outlier_info`.

## Quick Start

```bash
pip install statclean
```

```python
from statclean import StatClean
import pandas as pd

df = pd.DataFrame({'values': [1, 2, 3, 100, 4, 5]})
cleaner = StatClean(df)
cleaner.remove_outliers_zscore('values')
cleaned_df = cleaner.clean_df
```

## Feature Overview

| Feature | Univariate | Multivariate | Formal Test |
|---|---:|---:|---:|
| IQR | ✅ |  |  |
| Z-score | ✅ |  |  |
| Modified Z-score | ✅ |  |  |
| Mahalanobis |  | ✅ |  |
| Grubbs | ✅ |  | ✅ |
| Dixon Q | ✅ |  | ✅ |

## How It Flows

<div class="mermaid">
flowchart LR
  A[DataFrame] --> B[Analyze Distribution]
  B --> C{Recommend Method}
  C --> D[IQR / Z / Modified Z]
  C --> E[Mahalanobis]
  D --> F[Remove / Winsorize]
  E --> F
  F --> G[Report & Plots]
</div>

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({ startOnLoad: true });
</script>

## Navigation

- [Installation Guide](installation.md)
- [Quick Start Examples](examples.md)
- [Statistical Methods](statistical-methods.md)
- [API Reference](api-reference.md)

## Key Features

### 🔬 **Statistical Testing & Analysis**
- **Formal Statistical Tests**: Grubbs' test and Dixon's Q-test with p-values
- **Distribution Analysis**: Automatic normality testing and method recommendations
- **Method Comparison**: Statistical agreement analysis between detection methods
- **Publication-Quality Reporting**: P-values, confidence intervals, and effect sizes

### 📊 **Detection Methods**
- **Univariate**: IQR, Z-score, Modified Z-score (MAD-based)
- **Multivariate**: Mahalanobis distance with chi-square thresholds
- **Batch Processing**: Multi-column detection with progress tracking
- **Automatic Selection**: Based on distribution characteristics

### 🛠️ **Treatment Options**
- **Removal**: Statistical validation with significance testing
- **Winsorizing**: Cap outliers at bounds instead of removal
- **Transformations**: Box-Cox, logarithmic, square-root with recommendations
- **Method Chaining**: Fluent API for streamlined workflows

## Advanced Usage

```python
# Formal statistical testing
result = cleaner.grubbs_test('income', alpha=0.05)
print(f"P-value: {result['p_value']:.6f}")

# Multivariate outlier detection
outliers = cleaner.detect_outliers_mahalanobis(['income', 'age'])

# Method chaining with transformations
cleaned = (cleaner
           .transform_boxcox('income')
           .remove_outliers_modified_zscore('income')
           .clean_df)
```

## Links

- [GitHub Repository](https://github.com/SubaashNair/StatClean)
- [PyPI Package](https://pypi.org/project/statclean/)
- [Issue Tracker](https://github.com/SubaashNair/StatClean/issues)