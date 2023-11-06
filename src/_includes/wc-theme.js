class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.STORAGE_KEY = 'user-color-scheme';
    this.COLOR_MODE_KEY = '--color-mode';
  }
  connectedCallback() {
    this.toggleSwitch = this.querySelector('[role="switch"]');
    if (this.toggleSwitch) {
      this.toggleSwitch.addEventListener('change', () => {
        const setting = this.toggleSwitch.checked ? 'dark' : 'light';
        this.applySetting(setting);
        localStorage.setItem(this.STORAGE_KEY, setting);
      });
      this.applySetting();
    }
  }
  applySetting(passedSetting) {
    const currentSetting = passedSetting || localStorage.getItem(this.STORAGE_KEY);
    if (currentSetting) {
      this.setToggleSwitchStatus(currentSetting);
      window.applyThemeSetting(currentSetting);
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setToggleSwitchStatus('dark');
      }
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', evt => {
          this.setToggleSwitchStatus(evt.matches ? 'dark' : 'light');
        });
    }
  }
  // Sets the correct aria checked role and checked state
  setToggleSwitchStatus(currentSetting) {
    const isDarkMode = currentSetting === 'dark';
    this.toggleSwitch.setAttribute('aria-checked', isDarkMode ? 'true' : 'false');
    this.toggleSwitch.checked = isDarkMode;
  }
}
if ('customElements' in window) {
  customElements.define('theme-toggle', ThemeToggle);
}
export default ThemeToggle;
