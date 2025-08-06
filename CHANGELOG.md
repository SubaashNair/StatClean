# Changelog

All notable changes to StatClean will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-08-06

### 🎉 Initial Release of StatClean

This marks the initial public release of StatClean, a comprehensive statistical data preprocessing and outlier detection library. The project has been completely rebranded from OutlierCleaner to StatClean with expanded statistical capabilities.

### Added

#### **Formal Statistical Testing**
- **Grubbs' Test**: Single outlier detection with p-values and critical values
- **Dixon's Q-Test**: Outlier detection for small samples (n < 30) with statistical significance
- **Distribution Analysis**: Automatic normality testing using Shapiro-Wilk test
- **Statistical Validation**: P-values, confidence intervals, and critical value calculations

#### **Detection Methods**
- **Univariate Methods**: 
  - IQR (Interquartile Range) with configurable factors
  - Z-score method with customizable thresholds
  - Modified Z-score using MAD (robust to non-normal distributions)
- **Multivariate Methods**: 
  - Mahalanobis distance outlier detection with chi-square thresholds
- **Batch Detection**: Multi-column outlier detection with progress tracking

#### **Treatment Options**
- **Outlier Removal**: Remove detected outliers with statistical validation
- **Winsorizing**: Cap outliers at specified bounds instead of removal
  - IQR-based winsorizing
  - Z-score based winsorizing  
  - Percentile-based winsorizing
- **Data Transformations**:
  - Box-Cox transformation with automatic lambda estimation
  - Logarithmic transformations (natural, base 10, base 2)
  - Square root transformation
  - Automatic transformation recommendation based on distribution analysis

#### **Advanced Visualization**
- **Comprehensive Analysis Plots**: 3-in-1 analysis dashboard (boxplot, distribution, Q-Q plot)
- **Standalone Plotting Functions**: 
  - `plot_outliers()`: Scatter plots with outlier highlighting
  - `plot_distribution()`: KDE distribution plots with outlier separation
  - `plot_boxplot()`: Enhanced box plots with outlier overlay
  - `plot_qq()`: Q-Q plots for normality assessment
  - `plot_outlier_analysis()`: 2x2 comprehensive analysis grid
- **Publication-Ready Figures**: Professional styling with customizable parameters

#### **Developer Experience Features**
- **Method Chaining**: Fluent API enabling streamlined workflows
- **Type Safety**: Comprehensive type hints for enhanced IDE support and error detection
- **Progress Tracking**: Built-in progress bars using tqdm for batch operations
- **Flexible Configuration**: Customizable thresholds and statistical parameters
- **Memory Efficiency**: Statistics caching and lazy evaluation for performance

#### **Analysis and Reporting**
- **Distribution Analysis**: Comprehensive statistical analysis including:
  - Skewness and kurtosis calculation
  - Automatic method recommendation based on distribution characteristics
  - Normality testing with statistical significance
- **Method Comparison**: Statistical agreement analysis between different detection methods
- **Batch Processing**: Multi-column processing with detailed reporting and progress tracking
- **Summary Reports**: Publication-quality statistical summaries

#### **Utility Features**
- **Index Preservation**: Configurable index handling during data cleaning
- **Missing Value Handling**: Robust handling of NaN values and edge cases
- **Data Validation**: Automatic data type validation and error handling
- **Statistics Caching**: Efficient caching for repeated statistical operations

### Technical

#### **Core Architecture**
- **StatClean Class**: Main class with 40+ methods for comprehensive statistical preprocessing
- **Modular Design**: Separate utils module for standalone visualization functions
- **Robust Error Handling**: Comprehensive edge case handling for statistical computations
- **Performance Optimization**: Lazy evaluation and efficient memory usage

#### **Dependencies**
- **Core**: numpy, pandas, matplotlib, seaborn, scipy
- **Statistical**: scipy for advanced statistical tests and distributions
- **Progress**: tqdm for user-friendly progress tracking
- **Development**: Complete type annotations for static analysis

#### **API Design**
- **Intuitive Interface**: Clear method naming and consistent parameter patterns
- **Flexible Parameters**: Configurable thresholds and statistical significance levels
- **Return Types**: Comprehensive return dictionaries with statistical metadata
- **Documentation**: Extensive docstrings with mathematical explanations

### Package Information

- **Package Name**: `statclean` (renamed from `outlier-cleaner`)
- **Main Class**: `StatClean` (renamed from `OutlierCleaner`)
- **Backward Compatibility**: Alias maintained for transition (`OutlierCleaner = StatClean`)
- **Version**: 0.1.0 (semantic versioning reset for new package)
- **Python Support**: ≥3.7
- **Development Status**: Production/Stable

### Migration Notes

For users migrating from OutlierCleaner:

#### **Package Installation**
```bash
# Old
pip install outlier-cleaner

# New  
pip install statclean
```

#### **Import Changes**
```python
# Old
from outlier_cleaner import OutlierCleaner

# New (recommended)
from statclean import StatClean

# Backward compatible (temporary)
from statclean import OutlierCleaner  # Will be deprecated
```

#### **Enhanced Capabilities**
- All existing functionality preserved and enhanced
- New statistical testing methods available
- Improved visualization with more plot types
- Method chaining support for complex workflows
- Enhanced error handling and edge case management

### Future Roadmap

Planned features for upcoming releases:

- **Additional Statistical Tests**: Anderson-Darling, Kolmogorov-Smirnov
- **Advanced Multivariate Methods**: Isolation Forest, Local Outlier Factor
- **Performance Optimizations**: Parallel processing for large datasets
- **Interactive Visualizations**: Plotly integration for interactive analysis
- **Export Capabilities**: Statistical reports in multiple formats (PDF, HTML, LaTeX)

---

*This changelog follows the principles of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) for clear communication of changes to users and developers.*