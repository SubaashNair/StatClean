# Welcome to StatClean

Data preprocessing & outlier detection with formal statistical methods and publication-quality reporting.

[![PyPI](https://img.shields.io/pypi/v/statclean.svg)](https://pypi.org/project/statclean/)
[![Build](https://github.com/SubaashNair/StatClean/actions/workflows/pages.yml/badge.svg)](https://github.com/SubaashNair/StatClean/actions)
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

```mermaid
flowchart LR
  A[DataFrame] --> B[Analyze Distribution]
  B --> C{Recommend Method}
  C --> D[IQR / Z / Modified Z]
  C --> E[Mahalanobis]
  D --> F[Remove / Winsorize]
  E --> F
  F --> G[Report & Plots]
```

## Navigation

- [Installation Guide](installation.md)
- [Quick Start Examples](examples.md)
- [Statistical Methods](statistical-methods.md)
- [API Reference](api-reference.md)

## Links

- [GitHub Repository](https://github.com/SubaashNair/StatClean)
- [PyPI Package](https://pypi.org/project/statclean/)
- [Issue Tracker](https://github.com/SubaashNair/StatClean/issues)