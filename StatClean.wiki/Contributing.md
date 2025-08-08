# Contributing

## Development Setup

```bash
git clone https://github.com/SubaashNair/StatClean.git
cd StatClean
pip install -e .
pip install pytest
```

## Running Tests (Headless)

```bash
export MPLBACKEND=Agg
pytest -q
```

## Code Style
- Follow PEP 8
- Use type hints
- Add docstrings to all functions
- No Claude references in commits

## Pull Request Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes with tests
4. Run test suite: `pytest`
5. Submit pull request

## Areas for Contribution
- Additional statistical tests
- Performance optimizations
- New visualization methods
- Documentation improvements
- Bug fixes
