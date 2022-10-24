import {gsapHighlight} from './components/gsap';

// ------------------- cards redundant click, accessible whole card clickable solution by Heydon Pickering

const cards = [...document.querySelectorAll('.clickable-card')];
cards.forEach(card => {
  card.style.cursor = 'pointer';
  let down,
    up,
    link = card.querySelector('a');
  card.onmousedown = () => (down = +new Date());
  card.onmouseup = () => {
    up = +new Date();
    if (up - down < 200) {
      link.click();
    }
  };
});

document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.removeAttribute('data-is-loading');
    return;
  }
  img.addEventListener('load', () => img.removeAttribute('data-is-loading'));
});

// ------------------- gsap marker

gsapHighlight();

// ----- exploding  --------------------------------

const languageNav = document.querySelector('.language-nav');
const languageNavButton = document.querySelector('.language-nav-button');
const clickSound = new Audio('/assets/sounds/mouse.wav');

function toggleNavOpen(event) {
  event.preventDefault();
  languageNav.classList.toggle('active');
  clickSound.play();
}
languageNavButton.addEventListener('click', toggleNavOpen);
