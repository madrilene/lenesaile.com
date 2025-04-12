/**
 * Most adjustments must be made in `./src/_config/*`
 */

/**
 * Configures Eleventy with various settings, collections, plugins, filters, shortcodes, and more.
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

//  config import
import {postsByLang, showInSitemap, tagList} from './src/_config/collections.js';
import events from './src/_config/events.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  // --------------------- layout aliases
  eleventyConfig.addLayoutAlias('base', 'base/base.njk');
  eleventyConfig.addLayoutAlias('page', 'base/page.njk');
  eleventyConfig.addLayoutAlias('post', 'base/post.njk');
  eleventyConfig.addLayoutAlias('tags', 'base/tags.njk');
  eleventyConfig.addLayoutAlias('error', 'base/error.njk');

  eleventyConfig.addLayoutAlias('home', 'pages/home.njk');
  eleventyConfig.addLayoutAlias('about', 'pages/about.njk');
  eleventyConfig.addLayoutAlias('services', 'pages/services.njk');
  eleventyConfig.addLayoutAlias('projects', 'pages/projects.njk');
  eleventyConfig.addLayoutAlias('blog', 'pages/blog.njk');

  //	---------------------  Collections
  eleventyConfig.addCollection('blog_en', collectionApi => postsByLang(collectionApi, 'en'));
  eleventyConfig.addCollection('blog_es', collectionApi => postsByLang(collectionApi, 'es'));
  eleventyConfig.addCollection('blog_de', collectionApi => postsByLang(collectionApi, 'de'));
  eleventyConfig.addCollection('showInSitemap', showInSitemap);
  eleventyConfig.addCollection('tagList', tagList);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);
  eleventyConfig.addPlugin(plugins.drafts);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/*.webc'],
    useTransform: true
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg'],
    widths: ['auto'],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
        sizes: 'auto'
      },
      pictureAttributes: {}
    },
    cacheOptions: {
      duration: '1d',
      directory: '.cache',
      removeUrlQueryParams: false
    }
  });

  eleventyConfig.addPlugin(plugins.EleventyI18nPlugin, {defaultLanguage: 'en', errorMode: 'allow-fallback'});

  // ---------------------  bundle
  eleventyConfig.addBundle('css', {hoist: true});

  // 	--------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // --------------------- Filters
  eleventyConfig.addFilter('base64Format', filters.base64Format);
  eleventyConfig.addFilter('categoryFilter', filters.categoryFilter);
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('readingTime', filters.readingTime);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffleArray);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('split', filters.splitStrings);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('webmentionGetForUrl', filters.webmentionGetForUrl);
  eleventyConfig.addFilter('webmentionSize', filters.webmentionSize);
  eleventyConfig.addFilter('webmentionByType', filters.webmentionByType);
  eleventyConfig.addFilter('webmentionisOwn', filters.webmentionisOwn);
  eleventyConfig.addFilter('webmentionSort', filters.webmentionSort);

  // --------------------- Shortcodes
  eleventyConfig.addPairedShortcode('asideInfo', shortcodes.asideInfo);
  eleventyConfig.addPairedShortcode('asideReadmore', shortcodes.asideReadmore);
  eleventyConfig.addShortcode('svg', shortcodes.svg);
  eleventyConfig.addShortcode('image', shortcodes.image);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  eleventyConfig.on('eleventy.after', events.tableSawWrapper);

  // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/sounds', 'src/assets/images/template', 'src/assets/og-images'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    // -- to root
    'src/assets/images/favicon/*': '/',

    // -- node_modules
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/components/`,
    'node_modules/@zachleat/table-saw/table-saw.js': `assets/components/table-saw.js`
  });

  // --------------------- Build Settings
  eleventyConfig.setDataDeepMerge(true);

  // --------------------- general config
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}
