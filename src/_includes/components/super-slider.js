class superSlider extends HTMLElement {
  connectedCallback() {
    let targetEl = document.querySelector(this.getAttribute('target'));
    let unit = this.getAttribute('unit');
    let slider = this.querySelector('input[type="range"]');
    slider.addEventListener('input', e => {
      targetEl.style.setProperty('font-size', slider.value + unit);
    });
    let reset = slider.getAttribute('value');
    let resetter = document.createElement('button');
    resetter.textContent = '↺';
    resetter.setAttribute('title', reset + unit);
    resetter.addEventListener('click', e => {
      slider.value = reset;
      slider.dispatchEvent(new MouseEvent('input', {view: window, bubbles: false}));
    });
    slider.after(resetter);
  }
}

customElements.define('super-slider', superSlider);
