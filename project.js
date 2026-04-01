// ── Render helpers (mirrors main.js) ─────────────────────────────────────────

function renderBullets(bullets) {
    return bullets.map(b => `<li>${b}</li>`).join('');
}

function renderMedia(media) {
    if (!media) return '';

    if (media.type === 'video') {
        const poster = media.poster ? `poster="${media.poster}"` : '';
        return `
            <div class="portfolio-video">
                <video controls ${poster}>
                    <source src="${media.src}" type="video/mp4" />
                </video>
            </div>`;
    }

    if (media.type === 'iframe') {
        return `
            <div class="portfolio-video">
                <iframe src="${media.src}" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>`;
    }

    return '';
}

function renderCarousel(carousel) {
    if (!carousel || carousel.images.length === 0) return '';

    const prevBtn = carousel.buttons ? `<button class="carousel-btn prev">&#8249;</button>` : '';
    const nextBtn = carousel.buttons ? `<button class="carousel-btn next">&#8250;</button>` : '';

    const images = carousel.images.map(src => `
            <a href="${src}" data-lightbox="${carousel.lightboxGroup}" data-title="">
                <img class="example-image-link" src="${src}" alt="" loading="lazy" /></a>`).join('');

    return `
        <div class="portfolio-carousel">
            ${prevBtn}
            <div class="${carousel.track}">${images}
            </div>
            ${nextBtn}
        </div>`;
}

function renderDashboard(stats) {
    if (!stats) return '';

    const headlineHTML = stats.headline.map(s => `
        <div class="dash-stat">
            <i class="${s.icon}"></i>
            <span class="dash-stat-value">${s.value}</span>
            <span class="dash-stat-label">${s.label}</span>
        </div>`).join('');

    const retentionHTML = stats.retention.metrics.map(m => {
        const startW = Math.round((m.start / stats.retention.scale) * 100);
        const endW   = Math.round((m.end   / stats.retention.scale) * 100);
        return `
        <div class="retention-row">
            <span class="retention-name">${m.name}</span>
            <div class="retention-bars">
                <div class="retention-bar retention-bar-before" style="width: ${startW}%"></div>
                <div class="retention-bar retention-bar-after"  style="width: ${endW}%"></div>
            </div>
            <span class="retention-values">${m.start}${m.unit} → ${m.end}${m.unit}</span>
        </div>`;
    }).join('');

    const diffColorClass = { teal: 'diff-bar--teal', neutral: 'diff-bar--neutral', dim: 'diff-bar--dim' };
    const difficultyHTML = stats.satisfaction.difficulty.map(d => `
        <div class="diff-row">
            <span class="diff-label">${d.label}</span>
            <div class="diff-bar-wrap">
                <div class="diff-bar ${diffColorClass[d.color] || ''}" style="width: ${d.value}%"></div>
            </div>
            <span class="diff-pct">${d.value}%</span>
        </div>`).join('');

    const r = stats.satisfaction.rating;

    return `
        <div class="project-dashboard">
            <div class="dashboard-header">
                <span class="dashboard-title"><i class="fa-solid fa-chart-line"></i> Live Analytics</span>
                <span class="dashboard-period">${stats.period}</span>
            </div>
            <div class="dashboard-stats">
                ${headlineHTML}
            </div>
            <div class="dashboard-charts">
                <div class="dash-chart-card">
                    <h4>${stats.retention.label}</h4>
                    ${retentionHTML}
                    <div class="retention-legend">
                        <span class="legend-before">At launch</span>
                        <span class="legend-after">After ${stats.retention.updates} updates</span>
                    </div>
                </div>
                <div class="dash-chart-card">
                    <h4>${stats.satisfaction.label}</h4>
                    ${difficultyHTML}
                    <p class="satisfaction-note">
                        <strong>${r.avg}/10</strong> avg rating &middot; <strong>${r.perfect}</strong> ${r.label}
                    </p>
                </div>
                <div class="dash-chart-card dash-highlight-card">
                    <i class="fa-solid fa-clock"></i>
                    <span class="dash-highlight-value">${stats.sessions.value}</span>
                    <p>${stats.sessions.detail}</p>
                </div>
            </div>
        </div>`;
}

function renderChallenge(paragraphs) {
    if (!paragraphs || paragraphs.length === 0) return '';

    const content = paragraphs.map(p => `<p>${p}</p>`).join('');

    return `
        <div class="portfolio-challenge">
            <div class="challenge-content">
                <h2><i class="fa-solid fa-triangle-exclamation"></i> Core Challenges</h2>
                ${content}
            </div>
        </div>`;
}

function renderProject(project) {
    const titleHTML = project.externalLink
        ? `<a href="${project.externalLink}" target="_blank" rel="noopener noreferrer">
                        <h2>${project.title}</h2></a>`
        : `<h2>${project.title}</h2>`;

    const peakPlayersHTML = project.peakPlayers
        ? `<p><strong>Peak Players:</strong> ${project.peakPlayers.toLocaleString()}</p>`
        : '';

    const downloadHTML = project.downloadLink
        ? `<a href="${project.downloadLink.href}" download class="btn">${project.downloadLink.label}</a>`
        : '';

    const challengeHTML = renderChallenge(project.challengeParagraphs);
    const mediaHTML     = renderMedia(project.media);

    const rightColHTML        = mediaHTML ? `<div class="portfolio-right">${challengeHTML}${mediaHTML}</div>` : '';
    const bottomChallengeHTML = mediaHTML ? '' : challengeHTML;

    return `
        <section class="portfolio-showcase">
            <div class="portfolio-content">
                <div class="portfolio-text">
                    ${titleHTML}
                    <p><strong>Platform:</strong> ${project.platform}</p>
                    <p><strong>Roles:</strong> ${project.roles}</p>
                    <div class="portfolio-details">
                        <p><br>${project.description}</p>
                        ${downloadHTML}
                        <ul>${renderBullets(project.bullets)}</ul>
                    </div>
                    ${peakPlayersHTML}
                </div>
                ${rightColHTML}
            </div>
            ${bottomChallengeHTML}
            ${renderDashboard(project.stats)}
            ${renderCarousel(project.carousel)}
        </section>`;
}

// ── Carousel init ─────────────────────────────────────────────────────────────

function initCarousels() {
    document.querySelectorAll('.portfolio-carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track, .carousel-track-2');
        const prev  = carousel.querySelector('.carousel-btn.prev');
        const next  = carousel.querySelector('.carousel-btn.next');
        if (!track || (!prev && !next)) return;

        const scroll = (dir) => {
            const item = track.querySelector('a');
            const amount = item ? item.offsetWidth + 16 : 270;
            track.scrollBy({ left: dir * amount, behavior: 'smooth' });
        };

        if (prev) prev.addEventListener('click', () => scroll(-1));
        if (next) next.addEventListener('click', () => scroll(1));
    });
}

// ── Load and render the requested project ─────────────────────────────────────

async function loadProject() {
    const params  = new URLSearchParams(window.location.search);
    const id      = params.get('id');
    const container = document.getElementById('project-container');

    if (!id) {
        container.innerHTML = '<p>No project specified.</p>';
        return;
    }

    const projects = await fetch('data/projects.json').then(r => r.json());
    const project  = projects.find(p => p.id === id);

    if (!project) {
        container.innerHTML = '<p>Project not found.</p>';
        return;
    }

    document.title = `${project.title.replace(/<[^>]+>/g, '')} — Martín Rodríguez`;
    container.innerHTML = renderProject(project);
    initCarousels();
}

loadProject().catch(err => console.error('Failed to load project:', err));
