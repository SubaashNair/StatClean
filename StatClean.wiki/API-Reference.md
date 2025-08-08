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

## See Also

- [[Statistical Methods Guide|Statistical-Methods-Guide]] - Theory behind the methods
- [[Quick Start Tutorial|Quick-Start-Tutorial]] - Step-by-step usage guide
- [[Advanced Examples|Advanced-Examples]] - Complex real-world scenarios
- [[Troubleshooting|Troubleshooting]] - Common issues and solutions

[Back to top](#api-reference)
