const languageNav = document.querySelector('[data-lang-switcher]');
const languageNavButton = document.querySelector('[data-lang-switcher] button');
const activeLanguageItem = languageNav.querySelector('a[aria-selected="true"]');
activeLanguageItem.setAttribute('aria-selected', true);
activeLanguageItem.ariaCurrent = 'page';
let clickSound;

document.addEventListener('DOMContentLoaded', () => {
  clickSound = new Audio('/assets/sounds/mouse.mp3');
});

function toggleNavOpen(event) {
  event.preventDefault();
  languageNav.classList.toggle('active');
  const isOpen = languageNavButton.getAttribute('aria-expanded') === 'false';
  languageNavButton.setAttribute('aria-expanded', isOpen);
  if (clickSound) {
    clickSound.play();
  }
}
languageNavButton.addEventListener('click', toggleNavOpen);
