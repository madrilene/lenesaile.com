import {markdownLib} from '../plugins/markdown.js';

export const asideReadmore = children => {
  if (!children) {
    throw new Error('You must provide a non-empty string for an aside.');
  }
  const content = markdownLib.render(children);
  return `<aside class="readmore">${content}</aside>`;
};
