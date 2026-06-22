document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderTrending();
    renderRecentlyAdded();
    setupSearch();
});

function renderCategories() {
    const grid = document.getElementById('category-grid');
    if (!grid) return;

    modelsData.categories.forEach(cat => {
        const card = document.createElement('a');
        card.href = `categories/category.html?id=${cat.id}`;
        card.className = 'category-card';
        card.innerHTML = `
            <i class="${cat.icon}"></i>
            <h3>${cat.name}</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">${cat.description}</p>
        `;
        grid.appendChild(card);
    });
}

function createModelCard(model) {
    return `
        <div class="model-card">
            <div>
                ${model.tags.map(tag => `<span class="model-badge">${tag}</span>`).join(' ')}
            </div>
            <h3 class="model-title">${model.name}</h3>
            <p class="model-dev">By ${model.developer}</p>
            <p class="model-desc">${model.description}</p>
            <div class="model-footer">
                <span class="model-badge" style="background: #f1f5f9; color: #475569;">${model.category.toUpperCase()}</span>
                <a href="${model.link}" target="_blank" class="btn-view">View Model</a>
            </div>
        </div>
    `;
}

function renderTrending() {
    const grid = document.getElementById('trending-grid');
    if (!grid) return;

    const trending = modelsData.models.filter(m => m.trending);
    grid.innerHTML = trending.map(createModelCard).join('');
}

function renderRecentlyAdded() {
    const grid = document.getElementById('recent-grid');
    if (!grid) return;

    const recent = modelsData.models.filter(m => m.recent);
    grid.innerHTML = recent.map(createModelCard).join('');
}

function setupSearch() {
    const searchInput = document.getElementById('model-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            // Reset to default views if search is cleared
            renderTrending();
            renderRecentlyAdded();
            document.querySelectorAll('section').forEach(s => s.style.display = 'block');
            return;
        }

        const results = modelsData.models.filter(m => 
            m.name.toLowerCase().includes(query) || 
            m.description.toLowerCase().includes(query) ||
            m.developer.toLowerCase().includes(query)
        );

        // Hide other sections and show search results in trending grid
        document.getElementById('category-section').style.display = 'none';
        document.getElementById('recent-section').style.display = 'none';
        
        const trendingSection = document.getElementById('trending-section');
        trendingSection.querySelector('h2').textContent = `Search Results (${results.length})`;
        
        const grid = document.getElementById('trending-grid');
        if (results.length > 0) {
            grid.innerHTML = results.map(createModelCard).join('');
        } else {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No models found matching your search.</p>';
        }
    });
}
