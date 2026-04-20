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

function renderBullets(bullets) {
    return bullets.map(b => `<li>${b}</li>`).join('');
}

function renderExperience(exp) {
    return `
        <div class="work">
            <img src="${exp.image}" alt="${exp.imageAlt}" loading="lazy">
            <div class="layer">
                <h2>${exp.title}</h2>
                <h3>${exp.role}</h3>
                <ul>${renderBullets(exp.bullets)}</ul>
                <a href="${exp.link}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-link"></i>
                </a>
            </div>
        </div>`;
}

// ── Data loading and init ─────────────────────────────────────────────────────

async function loadData() {
    const [pillars, highlights, experiences] = await Promise.all([
        fetch('highlights/production-pillars.json').then(r => r.json()),
        fetch('highlights/production-highlights.json').then(r => r.json()),
        fetch('highlights/experiences.json').then(r => r.json()),
    ]);
    return { pillars, highlights, experiences };
}

function renderAll({ pillars, highlights, experiences }) {
    document.getElementById('pillars-container').innerHTML =
        pillars.map(renderPillar).join('');

    document.getElementById('highlights-container').innerHTML = `
        <div class="portfolio-grid">
            ${highlights.map(renderHighlightCard).join('')}
        </div>`;

    document.getElementById('experiences-container').innerHTML =
        experiences.map(renderExperience).join('');
}

loadData()
    .then(renderAll)
    .catch(err => console.error('Failed to load production data:', err));
