const lodash = require('lodash');
const dayjs = require('dayjs');
const locale_de = require('dayjs/locale/de');
const locale_es = require('dayjs/locale/es');
const CleanCSS = require('clean-css');
const markdownLib = require('../plugins/markdown');
const site = require('../../src/_data/meta');
const {throwIfNotType} = require('../utils');
const md = require('markdown-it')();
const {minify} = require('terser');

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

/** truncate */
const truncate = text => (text.length > 300 ? `${text.substring(0, 300)}...` : text);

/** filter by category. */
const categoryFilter = (collection, category) => {
  if (!category) return collection;
  const filtered = collection.filter(item => item.data.category == category);
  return filtered;
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

const readingTime = text => {
  let content = new String(text);
  const speed = 230; // reading speed in words per minute

  // remove all html elements
  let re = /(&lt;.*?&gt;)|(<.*?>)/gi;
  let plain = content.replace(re, '');

  // replace all newlines and 's with spaces
  plain = plain.replace(/\n+|'s/g, ' ');

  // create array of all the words in the post & count them
  let words = plain.split(' ');
  let count = words.length;

  // calculate the reading time
  const calculatedReadingTime = Math.round(count / speed);
  return calculatedReadingTime;
};

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

const minifyJs = async (code, callback) => {
  try {
    const minified = await minify(code);
    callback(null, minified.code);
  } catch (err) {
    console.error('Terser error: ', err);
    // Fail gracefully.
    callback(null, code);
  }
};

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

// originally from https://github.com/bnijenhuis/bnijenhuis-nl/blob/main/.eleventy.js
const splitlines = (input, maxCharLength) => {
  const parts = input.split(' ');
  const lines = parts.reduce(function (acc, cur) {
    if (!acc.length) {
      return [cur];
    }

    let lastOne = acc[acc.length - 1];

    if (lastOne.length + cur.length > maxCharLength) {
      return [...acc, cur];
    }

    acc[acc.length - 1] = lastOne + ' ' + cur;

    return acc;
  }, []);

  return lines;
};

const getWebmentionsForUrl = (webmentions, url) => {
  return webmentions.children.filter(entry => entry['wm-target'] === url);
};

const webmentionSize = mentions => {
  return !mentions ? 0 : mentions.length;
};

const webmentionsByType = (mentions, mentionType) => {
  return mentions.filter(entry => !!entry[mentionType]);
};

const isOwnWebmention = webmention => {
  const urls = [
    'https://www.lenesaile.com',
    'https://twitter.com/lenesaile',
    'https://front-end.social/@lene'
  ];
  const authorUrl = webmention.author ? webmention.author.url : false;
  // check if a given URL is part of this site.
  return authorUrl && urls.includes(authorUrl);
};

const sortWebmentions = mentions => {
  return mentions.sort((a, b) => {
    if (a['published'] < b['published']) {
      return -1;
    }
    if (a['published'] > b['published']) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
};

module.exports = {
  limit,
  where,
  every,
  some,
  truncate,
  categoryFilter,
  toHtml,
  toAbsoluteUrl,
  stripHtml,
  toISOString,
  readingTime,
  formatDate,
  formatDateES,
  formatDateDE,
  minifyCss,
  minifyJs,
  mdInline,
  splitlines,
  getWebmentionsForUrl,
  webmentionSize,
  webmentionsByType,
  isOwnWebmention,
  sortWebmentions
};
