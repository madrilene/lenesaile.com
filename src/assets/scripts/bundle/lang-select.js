const languageNav = document.querySelector('[data-lang-switcher]');
const languageNavButton = languageNav.querySelector('button');
const activeLanguageItem = languageNav.querySelector('a[aria-selected="true"]');
activeLanguageItem.setAttribute('aria-selected', true);
activeLanguageItem.ariaCurrent = 'page';

function toggleNavOpen(event) {
  event.preventDefault();
  const isOpen = languageNavButton.getAttribute('aria-expanded') === 'false';
  languageNavButton.setAttribute('aria-expanded', isOpen);
}
languageNavButton.addEventListener('click', toggleNavOpen);
