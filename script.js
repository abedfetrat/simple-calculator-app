/* ---------------------- Theme Toggling Logic ---------------------- */
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

const prefersColorSchemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

let theme = localStorage.getItem('theme');

if (theme) {
    updateTheme();
} else {
    theme = prefersColorSchemeDark.matches ? THEME_DARK : THEME_LIGHT;
    updateTheme();
}

prefersColorSchemeDark.addEventListener('change', e => {
    theme = e.matches ? THEME_DARK : THEME_LIGHT;
    updateTheme();
});

document.querySelector('[data-light-theme-toggle]').addEventListener('click', () => {
    theme = THEME_LIGHT;
    updateTheme();
    saveThemePreference();
});
document.querySelector('[data-dark-theme-toggle]').addEventListener('click', () => {
    theme = THEME_DARK;
    updateTheme();
    saveThemePreference();
});

function updateTheme() {
    if (theme)
        document.body.dataset.theme = theme;
}

function saveThemePreference() {
    localStorage.setItem('theme', theme);
}