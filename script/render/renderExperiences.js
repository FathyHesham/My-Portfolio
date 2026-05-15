/* ============================= Start Get Experience Data From JSON File "data.json" ============================= */
export function renderExperiences (experiences) {
    const card = document.querySelector(".cards-exper");
    if (!card) return;
    const fragment = document.createDocumentFragment();

    experiences.forEach((exper) => {
        const experCard = document.createElement("article");
        experCard.classList.add("exp-card");

        const header = document.createElement("div");
        header.classList.add("exp-card__header");

        const title = document.createElement("h3");
        title.classList.add("exp-card__title");
        title.textContent = exper.title || "Experience";

        const badge = document.createElement("span");
        badge.classList.add("tags", "exp-card__badge");
        badge.textContent = exper.status || "";

        const titleGroup = document.createElement("div");
        titleGroup.classList.add("exp-card__title-group");
        titleGroup.append(title, badge);

        header.append(titleGroup);

        const meta = document.createElement("div");
        meta.classList.add("exp-card__meta");

        const metaIcon = document.createElement("i");
        metaIcon.classList.add("bi", "bi-calendar3");
        metaIcon.setAttribute("aria-hidden", "true");

        const date = document.createElement("time");
        date.classList.add("exp-card__date");
        const rawDate = (exper.date || "").replace(/\s*\|\s*$/, "");
        date.textContent = rawDate;

        meta.append(metaIcon, date);

        const desc = document.createElement("p");
        desc.classList.add("exp-card__desc");
        desc.textContent = exper.description || "";

        // Projects Section (render as inline chips to save vertical space)
        let projectsHtml = "";
        if (exper.projects && exper.projects.length > 0) {
            projectsHtml = `
                <div class="exp-card__projects">
                    <h4 class="exp-card__projects-title">Projects Worked On:</h4>
                    <div class="exp-card__projects-list">
                        ${exper.projects.map(project => `<span class="exp-project-chip">${project}</span>`).join("")}
                    </div>
                </div>
            `;
        }

        // Tech Stack Section
        let techStackHtml = "";
        if (exper.techStack && exper.techStack.length > 0) {
            techStackHtml = `
                <div class="exp-card__tech-stack">
                    <h4 class="exp-card__tech-title">Tech Stack:</h4>
                    <div class="exp-card__tech-list">
                        ${exper.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join("")}
                    </div>
                </div>
            `;
        }

        experCard.append(header, meta, desc);

        if (projectsHtml) {
            const projectsContainer = document.createElement("div");
            projectsContainer.innerHTML = projectsHtml;
            experCard.appendChild(projectsContainer.firstElementChild);
        }

        if (techStackHtml) {
            const techContainer = document.createElement("div");
            techContainer.innerHTML = techStackHtml;
            experCard.appendChild(techContainer.firstElementChild);
        }

        fragment.appendChild(experCard);
    });
    card.appendChild(fragment);
}
/* ============================= End Get Experience Data From JSON File "data.json" ============================= */