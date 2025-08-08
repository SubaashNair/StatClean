# Advanced Examples

## California Housing End-to-End
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

## Financial Data Preprocessing
```python
import pandas as pd
import numpy as np
from statclean import StatClean

# Simulate financial returns data
np.random.seed(42)
returns = np.random.normal(0.001, 0.02, 1000)  # Daily returns
prices = 100 * np.cumprod(1 + returns)
volumes = np.random.lognormal(15, 1, 1000)

# Add some outliers (market crashes/spikes)
returns[250] = -0.15  # Market crash
returns[500] = 0.08   # Large gain
volumes[100] = volumes[100] * 50  # Volume spike

df = pd.DataFrame({
    'returns': returns,
    'prices': prices,
    'volume': volumes,
    'volatility': pd.Series(returns).rolling(20).std()
})

cleaner = StatClean(df.dropna(), preserve_index=True)

# Financial outlier detection with domain-specific thresholds
financial_features = ['returns', 'volume', 'volatility']

# Statistical significance testing for returns
grubbs_results = {}
for feature in financial_features:
    result = cleaner.grubbs_test(feature, alpha=0.01)  # Stricter alpha for finance
    grubbs_results[feature] = result
    print(f"{feature}: Outlier detected = {result['is_outlier']}, p-value = {result['p_value']:.6f}")

# Conservative cleaning with winsorization (preserve extreme but valid movements)
cleaner.winsorize_outliers_percentile('volume', lower_percentile=1, upper_percentile=99)
cleaner.winsorize_outliers_percentile('volatility', lower_percentile=5, upper_percentile=95)

# More aggressive cleaning for returns (likely data errors)
cleaner.remove_outliers_modified_zscore('returns', threshold=4.0)  # Conservative threshold

cleaned_df = cleaner.clean_df
print(f"Original shape: {df.shape}, Cleaned shape: {cleaned_df.shape}")
```

## Time Series Sensor Data
```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from statclean import StatClean

# Simulate IoT sensor data
np.random.seed(123)
dates = pd.date_range(start='2024-01-01', periods=2000, freq='H')
base_temp = 20 + 10 * np.sin(2 * np.pi * np.arange(2000) / 24)  # Daily cycle
noise = np.random.normal(0, 2, 2000)
temperatures = base_temp + noise

# Add sensor malfunctions and anomalies
temperatures[500:510] = -999  # Sensor error (impossible temperature)
temperatures[1000] = 150      # Sensor spike
temperatures[1500:1505] = np.nan  # Missing readings

humidity = np.clip(50 + 30 * np.sin(2 * np.pi * np.arange(2000) / 24) + np.random.normal(0, 5, 2000), 0, 100)
pressure = 1013 + np.random.normal(0, 15, 2000)

df = pd.DataFrame({
    'timestamp': dates,
    'temperature': temperatures,
    'humidity': humidity,
    'pressure': pressure
})

# Handle time series specific preprocessing
df = df[df['temperature'] > -50]  # Remove impossible sensor readings first
cleaner = StatClean(df, preserve_index=True)

# Time series outlier detection with domain knowledge
sensor_features = ['temperature', 'humidity', 'pressure']

# Distribution analysis for each sensor
for feature in sensor_features:
    analysis = cleaner.analyze_distribution(feature)
    print(f"\n{feature} Analysis:")
    print(f"  Skewness: {analysis['skewness']:.3f}")
    print(f"  Recommended method: {analysis['recommended_method']}")
    
    # Apply recommended transformation if highly skewed
    if abs(analysis['skewness']) > 2:
        cleaner.transform_boxcox(feature)

# Gentle cleaning for sensor data (preserve natural variation)
cleaned_df, info = cleaner.clean_columns(
    sensor_features, 
    method='modified_zscore',  # Robust to occasional spikes
    show_progress=True
)

# Time series specific visualization
for feature in sensor_features:
    print(f"\n{feature} Cleaning Results:")
    print(f"  Method used: {info[feature]['method_used']}")
    print(f"  Outliers removed: {info[feature]['outliers_removed']}")

# Generate comprehensive plots for time series data
figs = cleaner.plot_outlier_analysis(sensor_features)
```

## Modified Z-score Visualization
```python
outliers = cleaner.detect_outliers_modified_zscore('PRICE')
cleaner.remove_outliers_modified_zscore('PRICE')
cleaner.visualize_outliers('PRICE')
```

## Method Comparison for Research Data
```python
import pandas as pd
from statclean import StatClean

# Simulate experimental research data
np.random.seed(456)
df = pd.DataFrame({
    'reaction_time': np.random.gamma(2, 0.15, 500),  # Skewed distribution
    'accuracy': np.random.beta(8, 2, 500) * 100,     # Bounded data
    'confidence': np.random.normal(7, 1.5, 500)      # Normal-ish data
})

# Add some experimental outliers
df.loc[50:52, 'reaction_time'] *= 5  # Participant distraction
df.loc[100, 'accuracy'] = 30         # Data entry error
df.loc[200:205, 'confidence'] = np.nan  # Missing responses

cleaner = StatClean(df.dropna(), preserve_index=True)

# Compare detection methods for research validity
research_features = ['reaction_time', 'accuracy', 'confidence']
comparison = cleaner.compare_methods(
    research_features, 
    methods=['iqr', 'zscore', 'modified_zscore', 'grubbs']
)

# Statistical reporting for publication
print("Method Agreement Analysis for Research Data:")
for feature in research_features:
    print(f"\n{feature}:")
    print(f"  {comparison[feature]['summary']}")
    
    # Formal statistical tests
    grubbs_result = cleaner.grubbs_test(feature, alpha=0.05)
    dixon_result = cleaner.dixon_q_test(feature, alpha=0.05)
    
    print(f"  Grubbs test: p = {grubbs_result['p_value']:.6f}")
    print(f"  Dixon Q test: p = {dixon_result['p_value']:.6f}")

# Generate publication-quality report
summary_report = cleaner.get_summary_report()
print("\nPublication Summary:")
print(summary_report)
```

[Back to top](#advanced-examples)
