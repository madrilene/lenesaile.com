const {partytownSnippet} = require('@builder.io/partytown/integration');
const {copyLibFiles} = require('@builder.io/partytown/utils');
const esbuild = require('esbuild');

copyLibFiles('dist/~partytown');

const snippetText = partytownSnippet();
const minifiedSnippedText = esbuild.transformSync(snippetText, {
  minify: true
}).code;

module.exports = function partytown(config) {
  return `<script>${config}</script><script >${minifiedSnippedText}</script>`;
};
