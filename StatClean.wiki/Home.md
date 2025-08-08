# StatClean

Data preprocessing & outlier detection with formal statistical methods and publication-quality reporting.

[![PyPI](https://img.shields.io/pypi/v/statclean.svg)](https://pypi.org/project/statclean/)
[![Build](https://github.com/SubaashNair/StatClean/actions/workflows/publish.yml/badge.svg)](https://github.com/SubaashNair/StatClean/actions)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://subaashnair.github.io/StatClean/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SubaashNair/StatClean/blob/main/LICENSE)

> Note: Remover methods return `self`. Access cleaned data via `cleaner.clean_df` and details via `cleaner.outlier_info`.

## Quick Links

| Getting Started | Learn |
|---|---|
| [[Installation Guide|Installation-Guide]] | [[Statistical Methods|Statistical-Methods-Guide]] |
| [[Quick Start Tutorial|Quick-Start-Tutorial]] | [[API Reference|API-Reference]] |
| [[Advanced Examples|Advanced-Examples]] | [[Performance Tips|Performance-Tips]] |
| [[Troubleshooting|Troubleshooting]] | [[Contributing|Contributing]] |

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

[Back to top](#statclean)
