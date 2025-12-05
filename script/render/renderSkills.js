/* ============================= Start Get Skills Data From JSON File "data.json" ============================= */
export function renderSkills (skills) {
    const skillsSection = document.querySelector(".skills-section");
    const fragment = document.createDocumentFragment();

    skills.forEach((skill) => {
        const skillsContent = document.createElement("div");
        skillsContent.classList.add("skills-content");

        const img = document.createElement("img");
        img.src = skill.skill_icon;
        img.alt = skill.alt;
        img.loading = 'lazy';

        const p = document.createElement("p");
        p.textContent = skill.skill_name;

        skillsContent.append(img, p);
        fragment.appendChild(skillsContent);
    });

    skillsSection.appendChild(fragment);
}
/* ============================= End Get Skills Data From JSON File "data.json" ============================= */