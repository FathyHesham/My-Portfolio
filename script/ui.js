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
            toggleButton.classList.toggle("active");
            ulElement.classList.toggle("active");
        });
    });
}
/* ============================= End Activate Toggle Button ============================= */

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

    themeIconElement.addEventListener("click", () => {
        const isDark = bodyElement.classList.toggle("dark-theme");
        icon.classList.replace(
            isDark ? "bi-moon-stars" : "bi-brightness-high",
            isDark ? "bi-brightness-high" : "bi-moon-stars"
        );
        saveTheme(isDark ? "dark-theme" : "light-theme");
    });

    const savedtheme = loadedTheme();
    const isDark = savedtheme === "dark-theme";
    bodyElement.classList.toggle("dark-theme", isDark);
    icon.classList.replace(
        isDark ? "bi-moon-stars" : "bi-brightness-high",
        isDark ? "bi-brightness-high" : "bi-moon-stars"
    );
}
/* ============================= End Change Theme Dark || Light ============================= */