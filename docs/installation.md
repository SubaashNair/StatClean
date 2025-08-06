# Installation Guide

## Installation

### From PyPI (Recommended)

```bash
pip install statclean
```

### Development Installation

```bash
# Clone repository
git clone https://github.com/SubaashNair/StatClean.git
cd StatClean

# Install in development mode
pip install -e .

# Install development dependencies
pip install -r requirements.txt
```

## Requirements

StatClean requires Python 3.7 or higher and the following packages:

- **numpy** >= 1.19.0
- **pandas** >= 1.2.0  
- **matplotlib** >= 3.3.0
- **seaborn** >= 0.11.0
- **scipy** >= 1.6.0 (for statistical tests)
- **tqdm** >= 4.60.0 (for progress bars)

### Optional Dependencies

- **scikit-learn** >= 0.24.0 (for example datasets)

## Verification

Test your installation:

```python
import statclean
from statclean import StatClean
import pandas as pd

# Quick test
df = pd.DataFrame({'test': [1, 2, 3, 100, 4]})
cleaner = StatClean(df)
print("StatClean installed successfully!")
```

## Platform Compatibility

StatClean is tested and supported on:

- **Windows** (10+)
- **macOS** (10.14+)
- **Linux** (Ubuntu 18.04+, CentOS 7+)

## Python Version Support

- **Python 3.7** ✓
- **Python 3.8** ✓  
- **Python 3.9** ✓
- **Python 3.10** ✓
- **Python 3.11** ✓
- **Python 3.12** ✓

## Troubleshooting

### Common Issues

#### ImportError: No module named 'statclean'
```bash
# Make sure you installed the package
pip install statclean

# Check if it's installed
pip show statclean
```

#### Dependency Conflicts
```bash
# Create a fresh virtual environment
python -m venv statclean_env
source statclean_env/bin/activate  # On Windows: statclean_env\Scripts\activate
pip install statclean
```

#### Visualization Issues
```bash
# For headless servers, set matplotlib backend
export MPLBACKEND=Agg
```

### Performance Tips

For large datasets:
```bash
# Install with performance optimizations
pip install statclean[performance]

# Or install optimized numerical libraries
pip install numpy[mkl] pandas[performance]
```

## Docker Installation

```dockerfile
FROM python:3.9-slim

RUN pip install statclean

WORKDIR /app
COPY . .

CMD ["python", "your_script.py"]
```

## Conda Installation

StatClean will be available on conda-forge soon:

```bash
# Coming soon
conda install -c conda-forge statclean
```

## IDE Setup

### VS Code
Install the Python extension and StatClean will provide full IntelliSense support with type hints.

### PyCharm
StatClean includes comprehensive type annotations for excellent PyCharm integration.

### Jupyter
```bash
pip install jupyter
jupyter notebook
```

Then import StatClean in your notebooks:
```python
from statclean import StatClean
```