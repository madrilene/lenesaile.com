import {categoryFilter} from './filters/category-filter.js';
import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {readingTime} from './filters/reading-time.js';
import {shuffleArray} from './filters/sort-random.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {slugifyString} from './filters/slugify.js';

export default {
  categoryFilter,
  toISOString,
  formatDate,
  markdownFormat,
  readingTime,
  splitlines,
  striptags,
  shuffleArray,
  sortAlphabetically,
  slugifyString
};
