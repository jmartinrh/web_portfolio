// ── Render helpers ────────────────────────────────────────────────────────────

function renderPillar(pillar) {
    return `
        <div>
            <i class="${pillar.icon}"></i>
            <h2>${pillar.title}</h2>
            <p>${pillar.description}</p>
        </div>`;
}

function renderHighlightCard(highlight) {
    if (highlight.comingSoon) {
        return `
        <div class="project-card project-card--coming-soon">
            <div class="project-card-image">
                <img src="${highlight.image}" alt="${highlight.title}" loading="lazy">
            </div>
            <div class="project-card-info">
                <p class="highlight-card-tag">${highlight.tag}</p>
                <h3>${highlight.title}</h3>
                <span class="coming-soon-badge">Coming Soon</span>
            </div>
        </div>`;
    }
    return `
        <a href="${highlight.link}" class="project-card">
            <div class="project-card-image">
                <img src="${highlight.image}" alt="${highlight.title}" loading="lazy">
            </div>
            <div class="project-card-info">
                <p class="highlight-card-tag">${highlight.tag}</p>
                <h3>${highlight.title}</h3>
            </div>
        </a>`;
}

function renderProjectCard(project) {
    const plainTitle = project.title.replace(/<[^>]+>/g, '');

    const thumbHTML = project.thumbnail
        ? `<img src="${project.thumbnail}" alt="${plainTitle}" loading="lazy">`
        : `<div class="project-card-placeholder"><i class="fa-solid fa-gamepad"></i></div>`;

    return `
        <a href="project.html?id=${project.id}" class="project-card">
            <div class="project-card-image">${thumbHTML}</div>
            <div class="project-card-info">
                <h3>${project.title}</h3>
                <p>${project.platform}</p>
            </div>
        </a>`;
}

// ── Data loading and init ─────────────────────────────────────────────────────

async function loadData() {
    const [projects, pillars, highlights] = await Promise.all([
        fetch('highlights/projects.json').then(r => r.json()),
        fetch('highlights/pillars.json').then(r => r.json()),
        fetch('highlights/highlights.json').then(r => r.json()),
    ]);
    return { projects, pillars, highlights };
}

function renderAll({ projects, pillars, highlights }) {
    document.getElementById('pillars-container').innerHTML =
        pillars.map(renderPillar).join('');

    document.getElementById('highlights-container').innerHTML = `
        <div class="portfolio-grid">
            ${highlights.map(renderHighlightCard).join('')}
        </div>`;

    document.getElementById('projects-container').innerHTML = `
        <div class="portfolio-grid">
            ${projects.filter(p => !p.hidden).map(renderProjectCard).join('')}
        </div>`;
}

loadData()
    .then(renderAll)
    .catch(err => console.error('Failed to load portfolio data:', err));