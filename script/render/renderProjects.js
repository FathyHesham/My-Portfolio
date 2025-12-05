/* ============================= Start Get Projects Data From JSON File "data.json" ============================= */
let allProjects = [];
export function renderProjects (projects) {
    const cards = document.querySelector(".cards-project");
    const fragment = document.createDocumentFragment();

    allProjects = projects;
    projects.forEach((proj) => {
        const card = createProjectCard(proj);
        fragment.append(card);
    });
    cards.appendChild(fragment);
    setupFilterButtons();
}

function createProjectCard (proj) {
    const card = document.createElement("article");
    card.classList.add("project-card");
    card.dataset.category = proj.category || "all";

    const figure = document.createElement("figure");
    figure.classList.add("image");
    const img = document.createElement("img");
    img.src = proj.image;
    img.alt = proj.alt || proj.title;
    img.loading = "lazy";
    figure.appendChild(img);

    const cardContent = document.createElement("div");
    cardContent.classList.add("project-card-content");

    const h2 = document.createElement("h2");
    h2.textContent = proj.title;

    const p = document.createElement("p");
    p.textContent = proj.description;

    const skillsProj = document.createElement("div");
    skillsProj.classList.add("skills-proj");
    (proj.tags || []).forEach(tag => {
        const span = document.createElement("span");
        span.classList.add("tags");
        span.textContent = tag;
        skillsProj.appendChild(span);
    });

    const links = document.createElement("div");
    links.classList.add("links");

    const githubLink = document.createElement("a");
    githubLink.href = proj.github_link;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.classList.add("project-link");
    const githubIcon = document.createElement("i");
    githubIcon.classList.add("bi", "bi-github");
    githubLink.appendChild(githubIcon);
    const githubText = document.createElement("span");
    githubText.textContent = "GitHub";
    githubText.classList.add("link-text");
    githubLink.append(githubIcon, githubText);

    if (proj.live_demo) {
        const demoLink = document.createElement("a");
        const demoIcon = document.createElement("i");
        demoLink.href = proj.live_demo;
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
        demoLink.classList.add("project-link");
        demoIcon.classList.add("bi", "bi-box-arrow-up-right");
        const demoText = document.createElement("span");
        demoText.textContent = "Live Demo";
        demoText.classList.add("link-text");
        demoLink.append(demoIcon, demoText);
        links.appendChild(demoLink);
    }

    links.append(githubLink);

    cardContent.append(h2, p, skillsProj, links);
    card.append(figure, cardContent);

    return card;
}

function filterProjects (category) {
    const cardsContainer = document.querySelector(".cards-project");
    const cards = cardsContainer.querySelectorAll(".project-card");
    cards.forEach(card => {
        card.classList.add('fade-out');
    });

    setTimeout(() => {
        cards.forEach((card) => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === "all" || cardCategory === category;

            if (shouldShow) {
                card.classList.remove('hidden', 'fade-out');
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-out');
            }
        });
    }, 300);
}

function countProjectsByCategory () {
    const counts = {
        all: allProjects.length,
        web_developer: 0,
        artificial_intelligence: 0,
        data_analysis: 0
    };
    allProjects.forEach(proj => {
        const cat = proj.category || "all";
        if (counts.hasOwnProperty(cat)) {
            counts[cat]++;
        }
    });

    return counts;
}

function setupFilterButtons () {
    const filterButtons = document.querySelectorAll(".filter-button");
    const counts = countProjectsByCategory();

    filterButtons.forEach((button) => {
        const filterValue = button.dataset.filter;
        const countSpan = button.querySelector(".lenth-project");
        if (countSpan && counts[filterValue] !== undefined) {
            countSpan.textContent = `${counts[filterValue]}`;
        }
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            const filterValue = button.dataset.filter;
            filterProjects(filterValue);
        });
    });
}
/* ============================= End Get Projects Data From JSON File "data.json" ============================= */