/* ============================= Start Get Experience Data From JSON File "data.json" ============================= */
export function renderExperiences (experiences) {
    const card = document.querySelector(".cards-exper");
    const fragment = document.createDocumentFragment();
    experiences.forEach((exper) => {
        const experCard = document.createElement("div");
        experCard.classList.add("exp-card");
        const h2 = document.createElement("h2");
        h2.textContent = exper.title;
        const date = document.createElement("time");
        date.textContent = exper.date;
        const tag = document.createElement("span");
        tag.classList.add("tags");
        tag.textContent = exper.status;
        date.appendChild(tag);
        const desc = document.createElement("ul");
        const descText = document.createElement("li");
        descText.textContent = exper.description;
        desc.appendChild(descText);
        experCard.append(h2, date, desc);
        fragment.appendChild(experCard);
    });
    card.appendChild(fragment);
}
/* ============================= End Get Experience Data From JSON File "data.json" ============================= */