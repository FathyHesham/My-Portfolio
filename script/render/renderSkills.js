/* ============================= Start Get Skills Data From JSON File "data.json" ============================= */
export function renderSkills (skills) {
    const skillsSection = document.querySelector(".skills-section");
    if (!skillsSection) return;

    // Group skills by category
    const groups = skills.reduce((acc, s) => {
        const key = s.category || 'other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(s);
        return acc;
    }, {});

    // Order we want to display
    const order = ['frontend', 'ai', 'tools', 'other'];

    const container = document.createElement('div');
    container.classList.add('skills-groups');

    order.forEach((cat) => {
        if (!groups[cat] || groups[cat].length === 0) return;

        const groupEl = document.createElement('section');
        groupEl.classList.add('skills-group');

        const h = document.createElement('h4');
        h.classList.add('skills-group__title');
        // Friendly labels
        const labels = { frontend: 'Software & Web', ai: 'AI / Data', tools: 'Tools & Platforms', other: 'Other' };
        h.textContent = labels[cat] || cat;

        const grid = document.createElement('div');
        grid.classList.add('skills-grid');

        groups[cat].forEach(skill => {
            const card = document.createElement('div');
            card.classList.add('skill-card');

            let iconEl;
            if (typeof skill.skill_icon === 'string' && skill.skill_icon.startsWith('img:')) {
                const src = skill.skill_icon.replace(/^img:/, '');
                iconEl = document.createElement('img');
                iconEl.src = src;
                iconEl.alt = skill.alt || skill.skill_name || '';
                iconEl.width = 40;
                iconEl.height = 40;
                iconEl.loading = 'lazy';
            } else {
                iconEl = document.createElement('i');
                iconEl.className = skill.skill_icon;
                iconEl.setAttribute('aria-hidden', 'true');
                if (skill.color) iconEl.style.color = skill.color;
            }

            const name = document.createElement('div');
            name.classList.add('skill-name');
            name.textContent = skill.skill_name;

            card.append(iconEl, name);
            grid.appendChild(card);
        });

        groupEl.append(h, grid);
        container.appendChild(groupEl);
    });

    skillsSection.appendChild(container);
}
/* ============================= End Get Skills Data From JSON File "data.json" ============================= */