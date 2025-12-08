// Eleventy
import {EleventyI18nPlugin, EleventyRenderPlugin} from '@11ty/eleventy';
import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';
import dirOutputPlugin from '@11ty/eleventy-plugin-directory-output';
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import webc from '@11ty/eleventy-plugin-webc';

// custom
import {drafts} from './plugins/drafts.js';
import {markdownLib} from './plugins/markdown.js';

// Custom transforms
import {htmlConfig} from './plugins/html-config.js';

export default {
  EleventyRenderPlugin,
  rss,
  syntaxHighlight,
  webc,
  eleventyImageTransformPlugin,
  EleventyI18nPlugin,
  dirOutputPlugin,
  markdownLib,
  drafts,
  htmlConfig
};
