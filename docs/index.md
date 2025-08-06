# StatClean Documentation

Welcome to StatClean - A comprehensive statistical data preprocessing and outlier detection library.

## Quick Start

```python
pip install statclean
```

```python
from statclean import StatClean
import pandas as pd

# Your data
df = pd.DataFrame({'values': [1, 2, 3, 100, 4, 5]})

# Initialize StatClean
cleaner = StatClean(df)

# Detect and remove outliers
cleaner.remove_outliers_zscore('values')
cleaned_data = cleaner.clean_df
```

## Features

- **Formal Statistical Testing**: Grubbs' test, Dixon's Q-test with p-values
- **Multivariate Analysis**: Mahalanobis distance outlier detection
- **Data Transformations**: Box-Cox, logarithmic, square-root transformations
- **Method Chaining**: Fluent API for streamlined workflows
- **Publication-Quality Reporting**: Statistical significance testing

## Navigation

- [API Reference](api-reference.md)
- [Statistical Methods](statistical-methods.md)
- [Examples](examples.md)
- [Installation Guide](installation.md)

## Links

- [GitHub Repository](https://github.com/SubaashNair/StatClean)
- [PyPI Package](https://pypi.org/project/statclean/)
- [Issue Tracker](https://github.com/SubaashNair/StatClean/issues)