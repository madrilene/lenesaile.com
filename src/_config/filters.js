import {categoryFilter} from './filters/category-filter.js';
import {base64Format} from './filters/base64-format.js';
import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {readingTime} from './filters/reading-time.js';
import {shuffleArray} from './filters/sort-random.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitStrings} from './filters/split-strings.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {slugifyString} from './filters/slugify.js';
import {
  webmentionGetForUrl,
  webmentionSize,
  webmentionByType,
  webmentionisOwn,
  webmentionSort
} from './filters/webmentions.js';

export default {
  categoryFilter,
  base64Format,
  toISOString,
  formatDate,
  markdownFormat,
  readingTime,
  splitlines,
  striptags,
  shuffleArray,
  sortAlphabetically,
  splitStrings,
  slugifyString,
  webmentionGetForUrl,
  webmentionSize,
  webmentionByType,
  webmentionisOwn,
  webmentionSort
};
