const storageKey = 'theme-preference';
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedPreference = localStorage.getItem(storageKey) || 'auto';

const getEffectiveTheme = () => {
  return savedPreference === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : savedPreference;
};

// Prevent flash
const effectiveTheme = getEffectiveTheme();
document.querySelector('meta[name="color-scheme"]').content = effectiveTheme;
document.documentElement.setAttribute('data-theme', effectiveTheme);

window.onload = () => {
  const colorScheme = document.querySelector('meta[name="color-scheme"]');
  const switcher = document.querySelector('[data-theme-switcher]');

  if (!switcher || !colorScheme) {
    return;
  }

  const switchButton = switcher.querySelector('button');

  switchButton.setAttribute('aria-pressed', switchButton.value === savedPreference);

  switchButton.addEventListener('click', () => {
    const selectedTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem(storageKey, selectedTheme);

    const newTheme =
      selectedTheme === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : selectedTheme;

    colorScheme.content = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);

    switchButton.setAttribute('aria-pressed', selectedTheme === 'light');
  });
};
