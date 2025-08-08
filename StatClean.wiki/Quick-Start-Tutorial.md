# Quick Start Tutorial

## Basic Usage

```python
import pandas as pd
from statclean import StatClean

df = pd.DataFrame({'values': [1, 2, 3, 100, 4, 5, 6]})
cleaner = StatClean(df)

outliers = cleaner.detect_outliers_zscore('values')
print(f"Outliers detected: {outliers.sum()}")

cleaner.remove_outliers_zscore('values')
cleaned_df = cleaner.clean_df
print(f"Cleaned shape: {cleaned_df.shape}")
```

## Statistical Testing

```python
result = cleaner.grubbs_test('values', alpha=0.05)
print(f"P-value: {result['p_value']:.6f}")
print(f"Outlier detected: {result['is_outlier']}")
```

## Method Chaining

```python
result = (cleaner
          .set_thresholds(zscore_threshold=2.5)
          .winsorize_outliers_iqr('values')
          .clean_df)
```

## See Also

- [[Advanced Examples|Advanced-Examples]] - More complex use cases and real-world data
- [[Statistical Methods Guide|Statistical-Methods-Guide]] - Understanding the statistical theory
- [[API Reference|API-Reference]] - Complete method documentation
- [[Performance Tips|Performance-Tips]] - Optimizing for larger datasets
