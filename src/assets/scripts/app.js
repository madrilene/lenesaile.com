// ----- Check that service workers are supported

if ('serviceWorker' in navigator) {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}

// ----- language switcher  --------------------------------

const languageNav = document.querySelector('.language-nav');
const languageNavButton = document.querySelector('.language-nav-button');
const activeLanguageItem = languageNav.querySelector('a[aria-selected="true"]');
activeLanguageItem.setAttribute('aria-selected', true);
activeLanguageItem.ariaCurrent = 'page';
const clickSound = new Audio('/assets/sounds/mouse.wav');

function toggleNavOpen(event) {
  event.preventDefault();
  languageNav.classList.toggle('active');
  const isOpen = languageNavButton.getAttribute('aria-expanded') === 'false';
  languageNavButton.setAttribute('aria-expanded', isOpen);
  clickSound.play();
}
languageNavButton.addEventListener('click', toggleNavOpen);
