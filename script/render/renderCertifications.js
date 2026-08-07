/* ============================= Start Get Certifications Data From JSON File "data.json" ============================= */

function escapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

let allCertifications = [];

export function renderCertifications(certifications) {
    allCertifications = certifications || [];
    const container = document.querySelector(".cert-card");
    if (!container) return;

    container.innerHTML = allCertifications.map(certCardTemplate).join("");
    setupCertFilterButtons();
}

function certCardTemplate(cert) {
    const category = cert.category || "general";

    return `
        <article class="cert-content" data-category="${escapeHtml(category)}">
            <div class="cert-img">
                <img src="${escapeHtml(cert.image)}" alt="${escapeHtml(cert.alt || cert.title)}" loading="lazy" />
            </div>
            <h3>${escapeHtml(cert.title)}</h3>
            <p>${escapeHtml(cert.from)} - ${escapeHtml(cert.date)}</p>
            <a href="${escapeHtml(cert.show_certificate)}" target="_blank" rel="noopener noreferrer" class="cert-btn">
                Show Certificate
            </a>
        </article>
    `;
}
/* ============================= End Get Certifications Data From JSON File "data.json" ============================= */

/* ============================= Start Certifications Filter ============================= */
function setupCertFilterButtons() {
    const filterButtons = document.querySelectorAll(".certifications .filter-button");
    if (!filterButtons.length) return;

    const counts = { all: allCertifications.length, frontend: 0, artificial_intelligence: 0, general: 0 };
    allCertifications.forEach((cert) => {
        const category = cert.category || "general";
        if (counts[category] !== undefined) counts[category] += 1;
    });

    filterButtons.forEach((button) => {
        const filterValue = button.dataset.filter;
        const countSpan = button.querySelector(".lenth-cert");
        if (countSpan && counts[filterValue] !== undefined) {
            countSpan.textContent = counts[filterValue];
        }

        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            filterCertifications(filterValue);
        });
    });
}

function filterCertifications(category) {
    const cards = document.querySelectorAll(".certifications .cert-content");
    cards.forEach((card) => {
        const shouldShow = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !shouldShow);
    });
}
/* ============================= End Certifications Filter ============================= */