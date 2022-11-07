const lodash = require('lodash');
const dayjs = require('dayjs');
const locale_de = require('dayjs/locale/de');
const locale_es = require('dayjs/locale/es');
const CleanCSS = require('clean-css');
const markdownLib = require('../plugins/markdown');
const site = require('../../src/_data/meta');
const {throwIfNotType} = require('../utils');
const md = require('markdown-it')();

/** Returns the first `limit` elements of the the given array. */
const limit = (array, limit) => {
  if (limit < 0) {
    throw new Error(`Negative limits are not allowed: ${limit}.`);
  }
  return array.slice(0, limit);
};

/** Returns all entries from the given array that match the specified key:value pair. */
const where = (arrayOfObjects, keyPath, value) =>
  arrayOfObjects.filter(object => lodash.get(object, keyPath) === value);

/** must include all tags in each file's `tags` array front matter. */
const every = (coll = [], propName = '', requiredProps = []) => {
  if (requiredProps.length === 0) {
    return coll;
  }
  return coll.filter(page =>
    requiredProps.every(prop => lodash.get(page, propName)?.includes(prop))
  );
};

/** can include some tags in each file's `tags` array front matter. */
const some = (coll = [], propName = '', optionalProps = []) => {
  if (optionalProps.length === 0) {
    return coll;
  }
  return coll.filter(page =>
    optionalProps.some(prop => lodash.get(page, propName)?.includes(prop))
  );
};

/** Converts the given markdown string to HTML, returning it as a string. */
const toHtml = markdownString => {
  return markdownLib.renderInline(markdownString);
};

/** Removes all tags from an HTML string. */
const stripHtml = str => {
  throwIfNotType(str, 'string');
  return str.replace(/<[^>]+>/g, '');
};

/** Formats the given string as an absolute url. */
const toAbsoluteUrl = url => {
  throwIfNotType(url, 'string');
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = site.url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = url.replace(/^\//, '');

  return `${siteUrl}/${relativeUrl}`;
};

/** Converts the given date string to ISO8610 format. */
const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format, https://day.js.org/docs/en/i18n/loading-into-nodejs */
// TODO: find a less verbose way to do this
const formatDate = (date, format) => dayjs(date).format(format);
const formatDateES = (date, format) => dayjs(date).locale(locale_es).format(format);
const formatDateDE = (date, format) => dayjs(date).locale(locale_de).format(format);

const minifyCss = code => new CleanCSS({}).minify(code).styles;

/**
 * Render content as inline markdown if single line, or full
 * markdown if multiline. for md in yaml
 * @param {string} [content]
 * @param {import('markdown-it').Options} [opts]
 * @return {string|undefined}
 */

const mdInline = (content, opts) => {
  if (!content) {
    return;
  }

  if (opts) {
    md.set(opts);
  }

  let inline = !content.includes('\n');

  // If there's quite a bit of content, we want to make sure
  // it's marked up for readability purposes
  if (inline && content.length > 200) {
    inline = false;
  }

  return inline ? md.renderInline(content) : md.render(content);
};

module.exports = {
  limit,
  where,
  every,
  some,
  toHtml,
  toISOString,
  formatDate,
  formatDateES,
  formatDateDE,
  stripHtml,
  toAbsoluteUrl,
  minifyCss,
  mdInline
};
