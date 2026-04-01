// ── Render helpers ────────────────────────────────────────────────────────────

function renderPillar(pillar) {
    return `
        <div>
            <i class="${pillar.icon}"></i>
            <h2>${pillar.title}</h2>
            <p>${pillar.description}</p>
        </div>`;
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
    const [projects, pillars] = await Promise.all([
        fetch('data/projects.json').then(r => r.json()),
        fetch('data/pillars.json').then(r => r.json()),
    ]);
    return { projects, pillars };
}

function renderAll({ projects, pillars }) {
    document.getElementById('pillars-container').innerHTML =
        pillars.map(renderPillar).join('');

    document.getElementById('projects-container').innerHTML = `
        <div class="portfolio-grid">
            ${projects.filter(p => !p.hidden).map(renderProjectCard).join('')}
        </div>`;
}

loadData()
    .then(renderAll)
    .catch(err => console.error('Failed to load portfolio data:', err));
