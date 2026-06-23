/* ── Smooth page navigation ───────────────────────────── */
function navigateWithTransition(href) {
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = href; }, 220);
}

/* ── Resolve asset paths relative to current page depth ── */
function resolveIconPath(iconPath) {
    // If we're inside a subdirectory (e.g. categories/), prefix with '../'
    const depth = window.location.pathname.split('/').length - 2;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
    return prefix + iconPath;
}

function setupSmoothLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Only intercept internal links (not external, not anchors, not mailto etc.)
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
        link.addEventListener('click', e => {
            e.preventDefault();
            navigateWithTransition(link.href);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderTrending();
    renderRecentlyAdded();
    adjustCarouselCardWidths();   // set exact 3-per-row sizing
    setupCarouselArrows();
    setupSearch();
    setupSmoothLinks(); // run after all cards are rendered
});

// Re-adjust on resize so 3-card layout stays correct at any window size
window.addEventListener('resize', adjustCarouselCardWidths);


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
    const iconHtml = model.icon
        ? `<img src="${model.icon}" alt="${model.name} logo" class="model-icon" onerror="this.style.display='none'">`
        : '';
    return `
        <div class="model-card">
            <div class="model-card-header">
                ${iconHtml}
                <div>
                    ${model.tags.map(tag => `<span class="model-badge">${tag}</span>`).join(' ')}
                </div>
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
    const row1 = document.getElementById('trending-grid-1');
    const row2 = document.getElementById('trending-grid-2');
    if (!row1 || !row2) return;

    const trending = modelsData.models.filter(m => m.trending);
    // Split: odd indexes → row1, even indexes → row2
    const half1 = trending.filter((_, i) => i % 2 === 0);
    const half2 = trending.filter((_, i) => i % 2 === 1);

    row1.innerHTML = half1.map(createModelCard).join('');
    row2.innerHTML = half2.map(createModelCard).join('');
}

function renderRecentlyAdded() {
    const row1 = document.getElementById('recent-grid-1');
    const row2 = document.getElementById('recent-grid-2');
    if (!row1 || !row2) return;

    const recent = modelsData.models.filter(m => m.recent);
    const half1 = recent.filter((_, i) => i % 2 === 0);
    const half2 = recent.filter((_, i) => i % 2 === 1);

    row1.innerHTML = half1.map(createModelCard).join('');
    row2.innerHTML = half2.map(createModelCard).join('');
}

/* ── Fit exactly 3 cards in each scroll row ─────────────── */
function adjustCarouselCardWidths() {
    const GAP = 18;          // matches CSS gap on .model-row
    const CARDS_VISIBLE = 3;

    document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
        const wrapperWidth = wrapper.clientWidth;
        if (wrapperWidth === 0) return; // not yet painted
        const cardWidth = Math.floor(
            (wrapperWidth - GAP * (CARDS_VISIBLE - 1)) / CARDS_VISIBLE
        );
        wrapper.querySelectorAll('.model-card').forEach(card => {
            card.style.width    = cardWidth + 'px';
            card.style.minWidth = cardWidth + 'px';
            card.style.maxWidth = cardWidth + 'px';
        });
        // Store card width on wrapper for arrow scroll amount
        wrapper.dataset.cardWidth = cardWidth;
    });
}

/* ── Arrow button wiring ──────────────────────────────── */
function setupCarouselArrows() {
    document.querySelectorAll('.carousel-arrow').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const wrapper = document.getElementById(targetId);
            if (!wrapper) return;
            // Use computed card width + gap for one-card scroll step
            const cardWidth = parseInt(wrapper.dataset.cardWidth) || 290;
            const scrollAmount = cardWidth + 18; // card + gap
            if (btn.classList.contains('carousel-arrow--left')) {
                wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('model-search');
    if (!searchInput) return;

    const searchSection  = document.getElementById('search-results-section');
    const searchLabel    = document.getElementById('search-results-label');
    const searchGrid     = document.getElementById('search-results-grid');

    const otherSections = [
        document.getElementById('category-section'),
        document.getElementById('trending-section'),
        document.getElementById('recently-added-section'),
    ].filter(Boolean);

    function showSearch() {
        otherSections.forEach(s => s.style.display = 'none');
        searchSection.style.display = 'block';
    }

    function hideSearch() {
        searchSection.style.display = 'none';
        otherSections.forEach(s => s.style.display = 'block');
        // Restore carousel card widths after sections are visible again
        adjustCarouselCardWidths();
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            hideSearch();
            return;
        }

        const results = modelsData.models.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.developer.toLowerCase().includes(query)
        );

        searchLabel.textContent = `Search Results (${results.length})`;

        if (results.length > 0) {
            searchGrid.innerHTML = results.map(createModelCard).join('');
        } else {
            searchGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:60px 0; color:var(--text-muted);">No models found matching your search.</p>';
        }

        showSearch();
    });
}
