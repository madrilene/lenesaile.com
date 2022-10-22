const markdownLib = require('../../plugins/markdown');
const outdent = require('outdent');

const breakout = children => {
  if (!children) {
    throw new Error('You must provide a non-empty string for a breakout.');
  }
  const content = markdownLib.renderInline(children);
  return `<section class="breakout">${outdent`${content}`}</section>`;
};

module.exports = breakout;
