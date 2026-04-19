/* ============================= Start Activate Toggle Button ============================= */
export function initMenuToggle () {
    const toggleButton = document.getElementById("menu");
    const ulElement = document.getElementById("links-list");
    const linksElement = ulElement.querySelectorAll("a");

    toggleButton.addEventListener("click", () => {
        toggleButton.classList.toggle("active");
        ulElement.classList.toggle("active");
    });

    linksElement.forEach((link) => {
        link.addEventListener("click", () => {
            if (toggleButton.classList.contains("active")) {
                toggleButton.classList.remove("active");
                ulElement.classList.remove("active");
            }
        });
    });
}
/* ============================= End Activate Toggle Button ============================= */

/* ============================= Start Active Nav Link On Scroll ============================= */
export function initActiveNavLinks () {
    const links = Array.from(document.querySelectorAll("#links-list a[href^='#']"));
    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!links.length || !sections.length) return;

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 130;
        let activeId = sections[0].id;

        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop) {
                activeId = section.id;
            }
        });

        links.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${activeId}`;
            link.classList.toggle("active", isActive);
        });
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
}
/* ============================= End Active Nav Link On Scroll ============================= */

/* ============================= Start Change Theme Dark || Light ============================= */
export function initThemeSwitcher () {
    const bodyElement = document.body;
    const themeIconElement = document.getElementById("theme-icon");
    const icon = themeIconElement.querySelector("i");

    const saveTheme = (theme) => {
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.warn("Couldn't Save Theme Preference:", error);
        }
    };

    const loadedTheme = () => {
        try {
            return localStorage.getItem("theme");
        } catch (error) {
            console.warn("Couldn't Load Theme Preference:", error);
        }
    };

    const applyTheme = (isDark) => {
        bodyElement.classList.toggle("dark-theme", isDark);
        // dark mode → show sun icon (click to go light)
        // light mode → show moon icon (click to go dark)
        if (isDark) {
            icon.className = "bi bi-sun";
        } else {
            icon.className = "bi bi-moon-stars";
        }
    };

    themeIconElement.addEventListener("click", () => {
        const isDark = !bodyElement.classList.contains("dark-theme");
        applyTheme(isDark);
        saveTheme(isDark ? "dark-theme" : "light-theme");
    });

    // Default is dark — only override if user explicitly saved light
    const savedTheme = loadedTheme();
    const isDark = savedTheme !== "light-theme";
    applyTheme(isDark);
}
/* ============================= End Change Theme Dark || Light ============================= */