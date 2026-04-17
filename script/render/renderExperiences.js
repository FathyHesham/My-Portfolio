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

        header.append(title, badge);

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

        experCard.append(header, meta, desc);
        fragment.appendChild(experCard);
    });
    card.appendChild(fragment);
}
/* ============================= End Get Experience Data From JSON File "data.json" ============================= */
