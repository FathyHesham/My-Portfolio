/* ============================= Start Get Projects Data From JSON File "data.json" ============================= */
let otherProjects = [];

export function renderProjects(projectsData) {
    if (!projectsData) return;

    renderCaseStudies(projectsData.case_studies || []);
    renderEvaluationProject(projectsData.evaluation_project || null);
    renderOtherProjects(projectsData.other_projects || []);
    setupFilterButtons();
    setupCaseStudyModal();
}

function renderCaseStudies(caseStudies) {
    const container = document.querySelector(".case-study-grid");
    if (!container) return;

    const fragment = document.createDocumentFragment();
    caseStudies.forEach((study) => {
        const card = document.createElement("article");
        card.classList.add("project-card");

        const figure = createProjectImage(study);
        const content = document.createElement("div");
        content.classList.add("project-card-content");

        const title = document.createElement("h2");
        title.textContent = study.title;

        const desc = document.createElement("p");
        desc.textContent = study.description;

        const actionRow = document.createElement("div");
        actionRow.classList.add("case-actions-row");

        const githubLink = document.createElement("a");
        githubLink.href = study.github_link;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.classList.add("project-link", "project-link--github");
        githubLink.innerHTML = '<i class="bi bi-github"></i><span class="link-text">GitHub</span>';

        const detailsButton = document.createElement("button");
        detailsButton.type = "button";
        detailsButton.classList.add("case-details-btn");
        detailsButton.textContent = "View Model";
        detailsButton.dataset.caseStudy = JSON.stringify(study);
        detailsButton.innerHTML = '<i class="bi bi-eye"></i><span>View Model</span>';

        actionRow.append(githubLink, detailsButton);
        content.append(title, desc, actionRow);
        card.append(figure, content);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

function renderEvaluationProject(evaluationProject) {
    const container = document.querySelector(".evaluation-versions");
    if (!container || !evaluationProject) return;

    const title = document.querySelector(".evaluation-summary h3");
    const summary = document.querySelector(".evaluation-summary p");
    if (title) title.textContent = evaluationProject.title || "Project Evolution";
    if (summary) summary.textContent = evaluationProject.summary || "";

    const fragment = document.createDocumentFragment();
    (evaluationProject.versions || []).forEach((version) => {
        const card = document.createElement("article");
        card.classList.add("version-card");

        const figure = document.createElement("figure");
        figure.classList.add("version-image");
        const img = document.createElement("img");
        img.src = version.image || "assets/images/img-projects/to-do-list-application.png";
        img.alt = `${version.version} preview`;
        img.loading = "lazy";
        figure.appendChild(img);

        const heading = document.createElement("h4");
        heading.textContent = version.version;

        const label = document.createElement("span");
        label.classList.add("version-label");
        label.textContent = version.label;

        const description = document.createElement("p");
        description.textContent = version.description;

        const list = document.createElement("ul");
        list.classList.add("version-highlights");
        (version.highlights || []).forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="bi bi-check2-circle"></i><span>${item}</span>`;
            list.appendChild(li);
        });

        const actions = document.createElement("div");
        actions.classList.add("version-actions");

        const repo = document.createElement("a");
        repo.href = version.github_link;
        repo.target = "_blank";
        repo.rel = "noopener noreferrer";
        repo.classList.add("project-link", "project-link--github");
        repo.innerHTML = '<i class="bi bi-github"></i><span class="link-text">GitHub Repo</span>';

        const demo = document.createElement("a");
        demo.href = version.live_demo || "#";
        demo.target = "_blank";
        demo.rel = "noopener noreferrer";
        demo.classList.add("project-link", "project-link--demo");
        demo.innerHTML = '<i class="bi bi-box-arrow-up-right"></i><span class="link-text">Live Demo</span>';

        actions.append(repo, demo);
        card.append(figure, heading, label, description, list, actions);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

function renderOtherProjects(projects) {
    const container = document.querySelector(".cards-project");
    if (!container) return;
    otherProjects = projects;

    const fragment = document.createDocumentFragment();
    projects.forEach((proj) => {
        const card = createOtherProjectCard(proj);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

function createOtherProjectCard(proj) {
    const card = document.createElement("article");
    card.classList.add("project-card");
    card.dataset.category = proj.category || "all";

    const figure = createProjectImage(proj);
    const cardContent = document.createElement("div");
    cardContent.classList.add("project-card-content");

    const title = document.createElement("h2");
    title.textContent = proj.title;

    const desc = document.createElement("p");
    desc.textContent = proj.description;

    const tags = document.createElement("div");
    tags.classList.add("skills-proj");
    (proj.tags || []).forEach((tag) => {
        const span = document.createElement("span");
        span.classList.add("tags");
        span.textContent = tag;
        tags.appendChild(span);
    });

    const links = createProjectLinks(proj);
    cardContent.append(title, desc, tags, links);
    card.append(figure, cardContent);
    return card;
}

function createProjectImage(project) {
    const figure = document.createElement("figure");
    figure.classList.add("image");

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.alt || project.title;
    img.loading = "lazy";

    figure.appendChild(img);
    return figure;
}

function createProjectLinks(project) {
    const links = document.createElement("div");
    links.classList.add("links");

    if (project.live_demo) {
        const demo = document.createElement("a");
        demo.href = project.live_demo;
        demo.target = "_blank";
        demo.rel = "noopener noreferrer";
        demo.classList.add("project-link", "project-link--demo");
        demo.innerHTML = '<i class="bi bi-box-arrow-up-right"></i><span class="link-text">Live Demo</span>';
        links.appendChild(demo);
    }

    if (project.github_link) {
        const github = document.createElement("a");
        github.href = project.github_link;
        github.target = "_blank";
        github.rel = "noopener noreferrer";
        github.classList.add("project-link", "project-link--github");
        github.innerHTML = '<i class="bi bi-github"></i><span class="link-text">GitHub</span>';
        links.appendChild(github);
    }

    return links;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button");
    if (!filterButtons.length) return;

    const counts = {
        all: otherProjects.length,
        web_developer: 0,
        artificial_intelligence: 0,
        data_analysis: 0
    };

    otherProjects.forEach((proj) => {
        const category = proj.category || "all";
        if (counts[category] !== undefined) counts[category] += 1;
    });

    filterButtons.forEach((button) => {
        const filterValue = button.dataset.filter;
        const countSpan = button.querySelector(".lenth-project");
        if (countSpan && counts[filterValue] !== undefined) {
            countSpan.textContent = counts[filterValue];
        }

        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            filterOtherProjects(filterValue);
        });
    });
}

function filterOtherProjects(category) {
    const cards = document.querySelectorAll(".cards-project .project-card");
    cards.forEach((card) => {
        const shouldShow = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !shouldShow);
    });
}

function setupCaseStudyModal() {
    const modal = document.getElementById("case-study-modal");
    if (!modal) return;

    const closeButton = modal.querySelector(".close-modal-btn");
    const detailsButtons = document.querySelectorAll(".case-details-btn");

    const closeModal = () => modal.classList.remove("active");

    detailsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const caseStudy = JSON.parse(button.dataset.caseStudy || "{}");
            fillModal(caseStudy);
            modal.classList.add("active");
        });
    });

    if (closeButton) closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });
}

function fillModal(caseStudy) {
    const title = document.getElementById("modal-case-title");
    const image = document.getElementById("modal-case-image");
    const overview = document.getElementById("modal-case-overview");
    const problem = document.getElementById("modal-case-problem");
    const solution = document.getElementById("modal-case-solution");
    const results = document.getElementById("modal-case-results");
    const challenges = document.getElementById("modal-case-challenges");
    const stack = document.getElementById("modal-case-stack");
    const repoLink = document.getElementById("modal-case-repo");

    if (title) title.textContent = caseStudy.title || "";
    if (image) {
        image.src = caseStudy.image || "";
        image.alt = caseStudy.alt || caseStudy.title || "Case study image";
    }
    if (overview) overview.textContent = caseStudy.details?.overview || "";
    if (problem) problem.textContent = caseStudy.details?.problem || "";
    if (solution) solution.textContent = caseStudy.details?.solution || "";
    if (results) results.textContent = caseStudy.details?.results || "";
    if (challenges) challenges.textContent = caseStudy.details?.challenges || "";

    if (stack) {
        stack.innerHTML = "";
        (caseStudy.details?.tech_stack || []).forEach((tech) => {
            const li = document.createElement("li");
            li.classList.add("modal-tech-chip");
            li.textContent = tech;
            stack.appendChild(li);
        });
    }

    if (repoLink) {
        repoLink.href = caseStudy.github_link || "#";
        repoLink.classList.add("project-link--github");
    }
}
/* ============================= End Get Projects Data From JSON File "data.json" ============================= */