/* ============================= Start Get Experience Data From JSON File "data.json" ============================= */

// Small helper: escape data before injecting into innerHTML,
// so a "&", "<", or ">" inside the JSON text can't break the markup.
function escapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Category "frontend" or "ai" -> icon class shown in the round badge
const CATEGORY_ICONS = {
    frontend: "fa-solid fa-code",
    ai: "fa-solid fa-brain"
};

export function renderExperiences(experiences) {
    const container = document.querySelector(".cards-exper");
    if (!container) return;

    container.innerHTML = experiences.map(experienceCardTemplate).join("");
}

function experienceCardTemplate(exper) {
    const category = exper.category || "frontend";
    const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS.frontend;
    const date = (exper.date || "").replace(/\s*\|\s*$/, "");

    return `
        <article class="exp-card" data-category="${category}">
            <div class="exp-card__header">
                <div class="exp-card__header-main">
                    <span class="exp-card__icon">
                        <i class="${icon}" aria-hidden="true"></i>
                    </span>
                    <div class="exp-card__title-group">
                        <h3 class="exp-card__title">${escapeHtml(exper.title || "Experience")}</h3>
                        <p class="exp-card__place">${escapeHtml(exper.place || "")}</p>
                    </div>
                </div>
                <span class="tags exp-card__badge">${escapeHtml(exper.status || "")}</span>
            </div>

            <div class="exp-card__meta">
                <i class="bi bi-calendar3" aria-hidden="true"></i>
                <time class="exp-card__date">${escapeHtml(date)}</time>
            </div>

            <p class="exp-card__desc">${escapeHtml(exper.description || "")}</p>

            ${projectsTemplate(exper.projects)}
            ${techStackTemplate(exper.techStack)}
        </article>
    `;
}

// Projects Section (rendered as inline chips to save vertical space)
function projectsTemplate(projects) {
    if (!projects || projects.length === 0) return "";

    const chips = projects.map((project) => `<span class="exp-project-chip">${escapeHtml(project)}</span>`).join("");

    return `
        <div class="exp-card__projects">
            <h4 class="exp-card__projects-title">Projects Worked On:</h4>
            <div class="exp-card__projects-list">${chips}</div>
        </div>
    `;
}

// Tech Stack Section
function techStackTemplate(techStack) {
    if (!techStack || techStack.length === 0) return "";

    const badges = techStack.map((tech) => `<span class="tech-badge">${escapeHtml(tech)}</span>`).join("");

    return `
        <div class="exp-card__tech-stack">
            <h4 class="exp-card__tech-title">Tech Stack:</h4>
            <div class="exp-card__tech-list">${badges}</div>
        </div>
    `;
}
/* ============================= End Get Experience Data From JSON File "data.json" ============================= */