// Get saved theme preference
const theme = localStorage.getItem('theme');
if (theme) {
    setTheme(theme);
}

// Theme Toggle
const lightThemeToggle = document.querySelector('[data-light-theme-toggle]');
lightThemeToggle.addEventListener('click', () => setTheme('light'));
const darkThemeToggle = document.querySelector('[data-dark-theme-toggle]');
darkThemeToggle.addEventListener('click', () => setTheme('dark'));

function setTheme(theme) {
    document.body.dataset.theme = theme;
    saveThemePreference(theme);
};

function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}