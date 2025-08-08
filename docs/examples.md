# Examples

## Quick Start Example

```python
import pandas as pd
from statclean import StatClean

# Sample data with outliers
df = pd.DataFrame({
    'income': [25000, 30000, 35000, 40000, 500000, 45000, 50000],
    'age': [25, 30, 35, 40, 35, 45, 50]
})

# Initialize StatClean
cleaner = StatClean(df)

# Basic outlier removal
cleaner.remove_outliers_zscore('income')
cleaned_df = cleaner.clean_df

print(f"Original shape: {df.shape}")
print(f"Cleaned shape: {cleaned_df.shape}")
```

## Statistical Testing Example

```python
# Formal statistical testing
grubbs_result = cleaner.grubbs_test('income', alpha=0.05)
print(f"P-value: {grubbs_result['p_value']:.6f}")
print(f"Outlier detected: {grubbs_result['is_outlier']}")

# Dixon's Q-test for small samples
dixon_result = cleaner.dixon_q_test('age', alpha=0.05)
print(f"Statistic: {dixon_result['statistic']:.3f}")
```

## Multivariate Analysis Example

```python
# Mahalanobis distance for multivariate outliers
outliers = cleaner.detect_outliers_mahalanobis(['income', 'age'])
print(f"Multivariate outliers detected: {outliers.sum()}")

# Remove multivariate outliers
cleaner.remove_outliers_mahalanobis(['income', 'age'])
```

## Data Transformation Example

```python
# Automatic transformation recommendation
recommendation = cleaner.recommend_transformation('income')
print(f"Best transformation: {recommendation['recommended_method']}")

# Apply Box-Cox transformation
_, info = cleaner.transform_boxcox('income')
print(f"Optimal lambda: {info['lambda']:.3f}")
```

## Method Chaining Example

```python
# Fluent API with method chaining
result = (cleaner
          .set_thresholds(zscore_threshold=2.5)
          .add_zscore_columns(['income'])
          .winsorize_outliers_iqr('income')
          .clean_df)
```

## Comprehensive Analysis Example

```python
# Distribution analysis
analysis = cleaner.analyze_distribution('income')
print(f"Skewness: {analysis['skewness']:.3f}")
print(f"Recommended method: {analysis['recommended_method']}")

# Compare detection methods
comparison = cleaner.compare_methods(['income'])
print("Method Comparison Summary:")
print(comparison['income']['summary'])
```

## Visualization Example

```python
import matplotlib.pyplot as plt

# Comprehensive analysis plots
figures = cleaner.plot_outlier_analysis(['income', 'age'])

# Individual visualization components
from statclean.utils import plot_outliers, plot_distribution

outliers = cleaner.detect_outliers_zscore('income')
plot_outliers(df['income'], outliers, title='Income Analysis')
plot_distribution(df['income'], outliers, title='Income Distribution')

plt.show()
```

## Real Dataset Example

```python
from sklearn.datasets import fetch_california_housing
import pandas as pd
from statclean import StatClean

# Load California Housing dataset
housing = fetch_california_housing()
df = pd.DataFrame(housing.data, columns=housing.feature_names)
df['PRICE'] = housing.target

print(f"Dataset shape: {df.shape}")

# Initialize with index preservation
cleaner = StatClean(df, preserve_index=True)

# Analyze key features
features = ['MedInc', 'AveRooms', 'PRICE']
for feature in features:
    analysis = cleaner.analyze_distribution(feature)
    print(f"\n{feature} Analysis:")
    print(f"  Skewness: {analysis['skewness']:.3f}")
    print(f"  Recommended method: {analysis['recommended_method']}")

# Comprehensive cleaning
cleaned_df, info = cleaner.clean_columns(
    columns=features,
    method='auto',
    show_progress=True
)

print(f"\nResults:")
print(f"Original: {df.shape}")
print(f"Cleaned: {cleaned_df.shape}")
```

## Advanced Statistical Example

```python
# Batch processing with detailed reporting
columns_to_clean = ['MedInc', 'AveRooms', 'Population', 'PRICE']

# Get outlier statistics without removal
stats = cleaner.get_outlier_stats(columns_to_clean, include_indices=True)
print(stats)

# Apply custom cleaning strategy
strategy = {
    'MedInc': {'method': 'modified_zscore', 'threshold': 3.0},
    'AveRooms': {'method': 'iqr', 'lower_factor': 2.0, 'upper_factor': 2.0},
    'Population': {'method': 'zscore', 'threshold': 2.5},
    'PRICE': {'method': 'auto'}
}

cleaned_df = cleaner.apply_cleaning_strategy(strategy)

# Generate summary report
report = cleaner.get_summary_report()
print(report)
```