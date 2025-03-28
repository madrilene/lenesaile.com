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

  const switchButtons = switcher.querySelectorAll('button');

  switchButtons.forEach(button => {
    button.setAttribute('aria-pressed', button.value === savedPreference);
  });

  switchButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedTheme = button.value;
      localStorage.setItem(storageKey, selectedTheme);

      const newTheme =
        selectedTheme === 'auto'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : selectedTheme;

      colorScheme.content = newTheme;
      document.documentElement.setAttribute('data-theme', newTheme);

      switchButtons.forEach(btn => btn.setAttribute('aria-pressed', btn === button));
    });
  });
};
