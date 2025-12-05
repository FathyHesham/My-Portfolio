/* ============================= Start Import Differences Features ============================= */
import { initMenuToggle, initThemeSwitcher } from "./ui.js";
import { getData } from "./api.js";
import { renderExperiences } from "./render/renderExperiences.js";
import { renderSkills } from "./render/renderSkills.js";
import { renderProjects } from "./render/renderProjects.js";
import { renderCertifications } from "./render/renderCertifications.js";
/* ============================= End Import Differences Features ============================= */

document.addEventListener("DOMContentLoaded", () => {
    initMenuToggle();
    initThemeSwitcher();
});


(
    async function initApplication () {
        const data = await getData("data/data.json");
        if (!data) {
            console.error("Couldn't Initialize Application");
            return;
        }
        const { experiences, skills, projects, certifications } = data;
        renderExperiences(experiences);
        renderSkills(skills);
        renderProjects(projects);
        renderCertifications(certifications);
    }
)();