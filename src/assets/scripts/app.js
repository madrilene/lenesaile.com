import {gsapHighlight} from './components/gsap';

// ----- cards redundant click, accessible whole card clickable solution by Heydon Pickering: https://inclusive-components.design/cards/

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

// ----- masonry fallback if CSS masonry not supported, solution by Ana Tudor: https://codepen.io/thebabydino/pen/yLYppjK

const supportMasonry = CSS.supports('grid-template-rows', 'masonry');

if (!supportMasonry) {
  let grids = [...document.querySelectorAll('.grid[data-rows="masonry"]')];

  if (grids.length && getComputedStyle(grids[0]).gridTemplateRows !== 'masonry') {
    grids = grids.map(grid => ({
      _el: grid,
      gap: parseFloat(getComputedStyle(grid).gridRowGap),
      items: [...grid.childNodes]
        .filter(c => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1)
        .map(c => ({_el: c})),
      ncol: 0
    }));

    function layout() {
      grids.forEach(grid => {
        /* get the post relayout number of columns */
        let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;

        /* if the number of columns has changed */
        if (grid.ncol !== ncol) {
          /* update number of columns */
          grid.ncol = ncol;

          /* revert to initial positioning, no margin */
          grid.items.forEach(c => c._el.style.removeProperty('margin-block-start'));

          /* if we have more than one column */
          if (grid.ncol > 1) {
            grid.items.slice(ncol).forEach((c, i) => {
              let prev_fin =
                  grid.items[i]._el.getBoundingClientRect()
                    .bottom /* bottom edge of item above */,
                curr_ini =
                  c._el.getBoundingClientRect().top; /* top edge of current item */

              c._el.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
            });
          }
        }
      });
    }

    addEventListener(
      'load',
      e => {
        layout(); /* initial load */
        addEventListener('resize', layout, false); /* on resize */
      },
      false
    );
  }
}

// ----- gsap marker by Ryan Mulligan: https://codepen.io/hexagoncircle/pen/gOPMwvd

gsapHighlight();

// ----- language switcher  --------------------------------

const languageNav = document.querySelector('.language-nav');
const languageNavButton = document.querySelector('.language-nav-button');
const activeLanguageItem = document.querySelector('.lang-active');
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
