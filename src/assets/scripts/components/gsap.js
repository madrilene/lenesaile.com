import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const gsapHighlight = () => {
  const marks = document.querySelectorAll('mark');
  marks.forEach(element => {
    element.classList.add('gsap-highlight');
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.gsap-highlight').forEach(highlight => {
    ScrollTrigger.create({
      trigger: highlight,
      start: '-100px center',
      onEnter: () => highlight.classList.add('active')
    });
  });
};
