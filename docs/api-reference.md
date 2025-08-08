---
title: API Reference
layout: default
nav_order: 5
---

# API Reference

## StatClean Class

### Initialization

```python
StatClean(df=None, preserve_index=True)
```

**Parameters:**
- `df` (pandas.DataFrame, optional): The DataFrame to clean
- `preserve_index` (bool, default=True): Whether to preserve original index

### Detection Methods

#### `detect_outliers_iqr(column, lower_factor=1.5, upper_factor=1.5)`
Detect outliers using the Interquartile Range method.

**Parameters:**
- `column` (str): Column name to analyze
- `lower_factor` (float): Lower bound multiplier for IQR
- `upper_factor` (float): Upper bound multiplier for IQR

**Returns:**
- `pandas.Series`: Boolean mask indicating outliers

#### `detect_outliers_zscore(column, threshold=3.0)`
Detect outliers using Z-score method.

**Parameters:**
- `column` (str): Column name to analyze  
- `threshold` (float): Z-score threshold for outlier detection

**Returns:**
- `pandas.Series`: Boolean mask indicating outliers

#### `detect_outliers_modified_zscore(column, threshold=3.5)`
Detect outliers using Modified Z-score (MAD-based) method.

**Parameters:**
- `column` (str): Column name to analyze
- `threshold` (float): Modified Z-score threshold

**Returns:**
- `pandas.Series`: Boolean mask indicating outliers

#### `detect_outliers_mahalanobis(columns, chi2_threshold=None, use_shrinkage=False)`
Detect multivariate outliers using Mahalanobis distance.

**Parameters:**
- `columns` (list): List of column names for multivariate analysis
- `chi2_threshold` (float): If `None`, defaults to 97.5th percentile; if `0 < value <= 1`, treated as percentile; otherwise treated as absolute chi-square threshold
- `use_shrinkage` (bool): Use Ledoit–Wolf shrinkage covariance estimator when available (requires scikit-learn); falls back to sample covariance otherwise

**Returns:**
- `pandas.Series`: Boolean mask indicating outliers

### Treatment Methods

#### `remove_outliers_iqr(column, lower_factor=1.5, upper_factor=1.5)`
Remove outliers using IQR method.

**Returns:**
- `StatClean`: Self (enables method chaining)

#### `remove_outliers_zscore(column, threshold=3.0)`
Remove outliers using Z-score method.

**Returns:**
- `StatClean`: Self (enables method chaining)

#### `winsorize_outliers_iqr(column, lower_factor=1.5, upper_factor=1.5)`
Cap outliers at IQR bounds instead of removing.

**Returns:**
- `StatClean`: Self (enables method chaining)

### Statistical Testing

#### `grubbs_test(column, alpha=0.05, two_sided=True)`
Perform Grubbs' test for outliers with statistical significance.

**Parameters:**
- `column` (str): Column name to test
- `alpha` (float): Significance level
- `two_sided` (bool): Whether to perform two-sided test

**Returns:**
- `dict`: Test results including `statistic`, `p_value`, `critical_value`, `is_outlier`, `outlier_value`, `outlier_index`

#### `dixon_q_test(column, alpha=0.05)`
Perform Dixon's Q-test for small samples (n < 30).

**Parameters:**
- `column` (str): Column name to test
- `alpha` (float): Significance level

**Returns:**
- `dict`: Test results including `statistic`, `critical_value`, `p_value`, `is_outlier`

### Data Transformations

#### `transform_boxcox(column, lambda_param=None)`
Apply Box-Cox transformation with automatic lambda estimation.

**Parameters:**
- `column` (str): Column name to transform
- `lambda_param` (float, optional): Transformation parameter

**Returns:**
- `dict`: Transformation results including optimal lambda

#### `recommend_transformation(column)`
Automatically recommend best transformation based on distribution.

**Parameters:**
- `column` (str): Column name to analyze

**Returns:**
- `dict`: Recommendations including best transformation and improvement metrics

### Analysis Methods

#### `analyze_distribution(column)`
Comprehensive distribution analysis with statistical tests.

**Parameters:**
- `column` (str): Column name to analyze

**Returns:**
- `dict`: Distribution analysis including skewness, kurtosis, normality test

#### `compare_methods(columns, methods=['iqr', 'zscore', 'modified_zscore'])`
Compare agreement between different detection methods.

**Parameters:**
- `columns` (list): Column names to compare
- `methods` (list): Detection methods to compare

**Returns:**
- `dict`: Method comparison results and agreement statistics

### Visualization

#### `plot_outlier_analysis(columns=None, figsize=(15, 5))`
Generate comprehensive outlier analysis plots.

**Parameters:**
- `columns` (list, optional): Columns to plot (defaults to all numeric)
- `figsize` (tuple): Base figure size for each subplot

**Returns:**
- `dict`: Dictionary of matplotlib figures keyed by column names

### Utility Methods

#### `get_outlier_stats(columns=None, include_indices=False)`
Get comprehensive outlier statistics without removing data.

**Parameters:**
- `columns` (list, optional): Columns to analyze
- `include_indices` (bool): Whether to include outlier indices

**Returns:**
- `pandas.DataFrame`: Statistics for each column and method

#### `set_thresholds(**kwargs)`
Configure default thresholds for detection methods.

**Parameters:**
- `iqr_lower_factor` (float): IQR lower bound multiplier
- `iqr_upper_factor` (float): IQR upper bound multiplier  
- `zscore_threshold` (float): Z-score threshold
- `modified_zscore_threshold` (float): Modified Z-score threshold

**Returns:**
- `StatClean`: Self (enables method chaining)

## Utility Functions

### `plot_outliers(data, outliers, title="Outlier Analysis", figsize=(10, 6))`
Create scatter plot highlighting outliers.

### `plot_distribution(data, outliers, title="Distribution Analysis", figsize=(10, 6))`
Plot KDE distribution with outlier separation.

### `plot_boxplot(data, outliers, title="Box Plot Analysis", figsize=(10, 6))`
Enhanced box plot with outlier overlay.

### `plot_qq(data, outliers, title="Q-Q Plot", figsize=(10, 6))`
Q-Q plot for normality assessment.

### `plot_outlier_analysis(data, outliers, title="Comprehensive Analysis", figsize=(12, 10))`
2x2 comprehensive analysis dashboard.