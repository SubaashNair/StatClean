---
title: Statistical Methods
layout: default
nav_order: 4
---

# Statistical Methods

## Overview

StatClean implements rigorous statistical methods for outlier detection and data preprocessing. This guide explains the mathematical foundations and appropriate use cases for each method.

## Detection Methods

### Interquartile Range (IQR)

**Method:** `detect_outliers_iqr()`

**Formula:**
```
Lower Bound = Q1 - (lower_factor × IQR)  
Upper Bound = Q3 + (upper_factor × IQR)
where IQR = Q3 - Q1
```

**Use Cases:**
- Non-normal distributions
- Skewed data
- Robust to extreme values
- No distributional assumptions

**Example:**
```python
# Standard IQR (1.5 × IQR)
outliers = cleaner.detect_outliers_iqr('column')

# Conservative (2.0 × IQR) 
outliers = cleaner.detect_outliers_iqr('column', lower_factor=2.0, upper_factor=2.0)
```

### Z-Score Method

**Method:** `detect_outliers_zscore()`

**Formula:**
```
Z = (x - μ) / σ
Outlier if |Z| > threshold (typically 3.0)
```

**Use Cases:**
- Normally distributed data
- When you want standardized thresholds
- Large sample sizes (n > 30)

**Assumptions:**
- Data follows normal distribution
- Sample mean and standard deviation are good population estimates

**Example:**
```python
# Standard threshold (|Z| > 3)
outliers = cleaner.detect_outliers_zscore('column')

# More sensitive (|Z| > 2.5)
outliers = cleaner.detect_outliers_zscore('column', threshold=2.5)
```

### Modified Z-Score (MAD-based)

**Method:** `detect_outliers_modified_zscore()`

**Formula:**
```
Modified Z = 0.6745 × (x - median) / MAD
where MAD = median(|x - median(x)|)
Outlier if |Modified Z| > threshold (typically 3.5)
```

**Use Cases:**
- Non-normal or skewed distributions
- Presence of extreme outliers
- When robustness is priority
- Small sample sizes

**Advantages:**
- Robust to outliers (uses median instead of mean)
- Works with non-normal data
- Less sensitive to extreme values

**Example:**
```python
# Standard MAD threshold
outliers = cleaner.detect_outliers_modified_zscore('column')

# More conservative
outliers = cleaner.detect_outliers_modified_zscore('column', threshold=4.0)
```

### Mahalanobis Distance

**Method:** `detect_outliers_mahalanobis()`

**Formula:**
```
D² = (x - μ)ᵀ Σ⁻¹ (x - μ)
where μ is mean vector, Σ is covariance matrix
Outlier if D² > χ²(p, α) threshold
```

**Use Cases:**
- Multivariate outlier detection
- Correlated variables
- When relationships between variables matter
- Detecting unusual combinations of values

**Assumptions:**
- Multivariate normality (approximately)
- Variables are correlated
- Sufficient sample size for stable covariance estimation

**Example:**
```python
# 95th percentile threshold
outliers = cleaner.detect_outliers_mahalanobis(['var1', 'var2', 'var3'])

# 99th percentile (more conservative)
outliers = cleaner.detect_outliers_mahalanobis(['var1', 'var2'], chi2_threshold=0.99)
```

## Formal Statistical Tests

### Grubbs' Test

**Method:** `grubbs_test()`

**Purpose:** Test for single outliers in univariate normal data

**Formula:**
```
G = max|x - x̄| / s
where s is sample standard deviation
```

**Hypotheses:**
- H₀: No outliers present
- H₁: One outlier present

**Use Cases:**
- Formal statistical validation
- Publication-quality analysis
- When p-values are required
- Single outlier testing

**Assumptions:**
- Data follows normal distribution
- Testing for at most one outlier
- Independent observations

**Example:**
```python
result = cleaner.grubbs_test('column', alpha=0.05)
print(f"P-value: {result['p_value']}")
print(f"Significant outlier: {result['outlier_detected']}")
```

### Dixon's Q-Test

**Method:** `dixon_q_test()`

**Purpose:** Test for outliers in small samples (n < 30)

**Formula:**
```
Q = gap / range
where gap is difference to nearest neighbor
```

**Use Cases:**
- Small sample sizes (n < 30)
- When formal statistical testing is needed
- Quality control applications
- Laboratory measurements

**Advantages:**
- Designed specifically for small samples
- Non-parametric approach
- Simple interpretation

**Example:**
```python
result = cleaner.dixon_q_test('column', alpha=0.05)
print(f"Q-statistic: {result['q_statistic']}")
print(f"Critical value: {result['critical_value']}")
```

## Data Transformations

### Box-Cox Transformation

**Method:** `transform_boxcox()`

**Formula:**
```
y(λ) = (x^λ - 1) / λ  if λ ≠ 0
y(λ) = ln(x)          if λ = 0
```

**Purpose:**
- Normalize skewed distributions
- Stabilize variance
- Improve linear model assumptions

**Use Cases:**
- Right-skewed data
- Heteroscedasticity issues
- Before applying normal-based methods

**Example:**
```python
# Automatic lambda estimation
result = cleaner.transform_boxcox('column')
print(f"Optimal lambda: {result['lambda']}")
```

### Logarithmic Transformation

**Method:** `transform_log()`

**Purpose:**
- Reduce right skewness
- Handle multiplicative relationships
- Stabilize variance

**Variants:**
- Natural log (ln)
- Base 10 (log₁₀)
- Base 2 (log₂)

**Use Cases:**
- Exponential growth data
- Financial data
- Count data with large ranges

### Square Root Transformation

**Method:** `transform_sqrt()`

**Purpose:**
- Moderate right skewness
- Poisson-distributed data
- Count data transformation

**Formula:**
```
y = √x
```

## Method Selection Guidelines

### Distribution-Based Selection

**Normal Distribution:**
- Primary: Z-score method
- Alternative: Grubbs' test (with p-values)

**Skewed Distribution:**
- Primary: Modified Z-score (MAD)
- Alternative: IQR method

**Unknown Distribution:**
- Primary: IQR method
- Alternative: Modified Z-score

**Small Samples (n < 30):**
- Primary: Dixon's Q-test
- Alternative: IQR method

**Multivariate:**
- Primary: Mahalanobis distance
- Consider: Multiple univariate methods

### Automatic Method Selection

**Method:** `analyze_distribution()`

StatClean automatically recommends methods based on:
- Sample size
- Skewness level
- Kurtosis
- Normality test results

```python
analysis = cleaner.analyze_distribution('column')
print(f"Recommended method: {analysis['recommended_method']}")
print(f"Reason: {analysis['recommendation_reason']}")
```

## Statistical Considerations

### Type I and Type II Errors

**Type I Error (False Positive):**
- Incorrectly identifying normal points as outliers
- Controlled by significance level (α)
- Trade-off: Lower α = fewer false positives, more missed outliers

**Type II Error (False Negative):**
- Missing actual outliers
- Influenced by effect size and sample size
- Trade-off: Higher sensitivity = more false positives

### Multiple Testing Correction

When testing multiple variables, consider:
- Bonferroni correction: α_adjusted = α / n_tests
- False Discovery Rate (FDR) control
- Sequential testing procedures

### Sample Size Considerations

**Small Samples (n < 30):**
- Use Dixon's Q-test for formal testing
- IQR method for robust detection
- Be cautious with normality assumptions

**Large Samples (n > 100):**
- Z-score method effective
- Grubbs' test reliable
- Central Limit Theorem helps with normality

### Robustness vs. Efficiency

**Robust Methods** (IQR, MAD-based):
- Less affected by outliers
- Work with various distributions
- May be less efficient with normal data

**Efficient Methods** (Z-score, Grubbs'):
- Optimal for normal distributions
- More powerful when assumptions met
- Sensitive to assumption violations

## Validation and Diagnostics

### Method Comparison

```python
comparison = cleaner.compare_methods(['column'], 
                                   methods=['iqr', 'zscore', 'modified_zscore'])
```

Use agreement between methods as validation:
- High agreement: Confident outlier identification
- Low agreement: Investigate data characteristics
- Consider multiple perspectives

### Distribution Assessment

```python
analysis = cleaner.analyze_distribution('column')
```

Key diagnostics:
- **Skewness**: |skew| < 0.5 (approximately normal)
- **Kurtosis**: Normal ≈ 3, Heavy tails > 3
- **Shapiro-Wilk test**: p > 0.05 suggests normality