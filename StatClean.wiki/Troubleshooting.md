# Troubleshooting

## Common Issues

### ImportError
```bash
pip install --upgrade statclean
```

### Memory Issues
```python
# Process in chunks
for chunk in pd.read_csv('large_file.csv', chunksize=10000):
    cleaner = StatClean(chunk)
    # Process chunk
```

### Visualization Problems
```bash
# For headless servers
export MPLBACKEND=Agg
```

### Mahalanobis Threshold and Stability
<details>
<summary><strong>Details</strong></summary>

`chi2_threshold` can be percentile (0<val<=1) or absolute chi-square statistic. Covariance inversion uses pseudoinverse when needed; optional shrinkage via scikit-learn's Ledoit–Wolf with `use_shrinkage=True`.

```python
# Remove highly correlated variables first if instability persists
correlation_matrix = df.corr()
```

</details>

[Back to top](#troubleshooting)
