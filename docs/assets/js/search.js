// Lightweight client-side search for StatClean docs
(() => {
  const index = [
    { title: 'Home', url: 'index.html', keywords: 'statclean overview quick start features methods api examples' },
    { title: 'Installation', url: 'installation.html', keywords: 'install pip requirements development verification compatibility docker ide setup' },
    { title: 'Examples', url: 'examples.html', keywords: 'examples quick start statistical testing multivariate transformations method chaining visualization real dataset advanced' },
    { title: 'Methods', url: 'statistical-methods.html', keywords: 'statistical methods iqr z-score modified z-score mahalanobis grubbs dixon transformation selection' },
    { title: 'API Reference', url: 'api-reference.html', keywords: 'api class detection removal winsorize analysis transformation utils visualization' }
  ]

  function createResultItem(entry, query) {
    const div = document.createElement('div')
    div.className = 'search-result-item'
    div.innerHTML = `<strong>${entry.title}</strong><div class="small text-muted">${entry.url.replace('.html','')}</div>`
    div.addEventListener('mousedown', (e) => { // mousedown so blur doesn't fire first
      e.preventDefault()
      window.location.href = entry.url + (query ? `#${encodeURIComponent(query)}` : '')
    })
    return div
  }

  function searchDocs(query) {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return index
      .map(e => ({
        entry: e,
        score: (e.title.toLowerCase().includes(q) ? 2 : 0) + (e.keywords.includes(q) ? 1 : 0)
      }))
      .filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 8)
      .map(x => x.entry)
  }

  function wireSearch(inputId = 'docSearch', resultsId = 'searchResults') {
    const input = document.getElementById(inputId)
    const results = document.getElementById(resultsId)
    if (!input || !results) return

    function render() {
      const hits = searchDocs(input.value)
      results.innerHTML = ''
      if (hits.length === 0) { results.style.display = 'none'; return }
      hits.forEach(h => results.appendChild(createResultItem(h, input.value)))
      results.style.display = 'block'
    }

    input.addEventListener('input', render)
    input.addEventListener('focus', render)
    input.addEventListener('blur', () => setTimeout(() => (results.style.display = 'none'), 150))
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = results.querySelector('.search-result-item')
        if (first) first.dispatchEvent(new Event('mousedown'))
      }
      if (e.key === 'Escape') { results.style.display = 'none' }
    })
  }

  document.addEventListener('DOMContentLoaded', () => wireSearch())
})()


