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

async function loadData() {
    const experiences = await fetch('data/experiences.json').then(r => r.json());
    return experiences;
}

function renderAll(experiences) {
    document.getElementById('experiences-container').innerHTML =
        experiences.map(renderExperience).join('');
}

loadData()
    .then(renderAll)
    .catch(err => console.error('Failed to load production data:', err));
