const fs = require('fs');
const fetch = require('node-fetch');
const unionBy = require('lodash/unionBy');
const domain = require('./meta.js').domain;

// Load .env variables with dotenv
require('dotenv').config();

// Define Cache Location and API Endpoint
const CACHE_DIR = '.cache';
const API = 'https://webmention.io/api';
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

async function fetchWebmentions(since, perPage = 10000) {
  // If we dont have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn('>>> unable to fetch webmentions: missing domain or token');
    return false;
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`; // only fetch new mentions

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const feed = await response.json();
  const webmentions = feed.children;
  let cleanedWebmentions = cleanWebmentions(webmentions);
  if (cleanedWebmentions.length === 0) {
    console.log('[Webmention] No new webmention');
    return null;
  } else {
    console.log(`[Webmention] ${cleanedWebmentions.length} new webmentions`);
    return cleanedWebmentions;
  }
}

function cleanWebmentions(webmentions) {
  // https://mxb.dev/blog/using-webmentions-on-static-sites/#h-parsing-and-filtering
  const sanitize = entry => {
    // Sanitize HTML content
    const {content} = entry;
    if (content && content['content-type'] === 'text/html') {
      let html = content.html;
      html = html
        .replace(/<a [^>]+><\/a>/gm, '')
        .trim()
        .replace(/\n/g, '<br />');
      html = sanitizeHTML(html, {
        allowedTags: [
          'b',
          'i',
          'em',
          'strong',
          'a',
          'blockquote',
          'ul',
          'ol',
          'li',
          'code',
          'pre',
          'br'
        ],
        allowedAttributes: {
          a: ['href', 'rel'],
          img: ['src', 'alt']
        },
        allowedIframeHostnames: []
      });
      content.html = html;
    }

    // Fix missing publication date
    if (!entry.published && entry['wm-received']) {
      entry.published = entry['wm-received'];
    }

    return entry;
  };

  return webmentions.map(sanitize);
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  if (b.length === 0) {
    return a;
  }
  let union = unionBy(a, b, 'wm-id');
  union.sort((a, b) => {
    let aDate = new Date(a.published || a['wm-received']);
    let bDate = new Date(b.published || b['wm-received']);
    return aDate - bDate;
  });
  return union;
}

// save combined webmentions in cache file
function writeToCache(data) {
  const filePath = `${CACHE_DIR}/webmentions.json`;
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }
  // write data to cache json file
  fs.writeFile(filePath, fileContent, err => {
    if (err) throw err;
    console.log(`>>> webmentions saved to ${filePath}`);
  });
}

// get cache contents from json file
function readFromCache() {
  const filePath = `${CACHE_DIR}/webmentions.json`;

  if (fs.existsSync(filePath)) {
    const cacheFile = fs.readFileSync(filePath);
    return JSON.parse(cacheFile);
  }

  // no cache found.
  return {
    lastFetched: null,
    children: []
  };
}

module.exports = async function () {
  const cache = readFromCache();

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`);
  }

  // Only fetch new mentions in production
  if (process.env.ELEVENTY_ENV === 'production') {
    const feed = await fetchWebmentions(cache.lastFetched);
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed)
      };

      writeToCache(webmentions);
      return webmentions;
    }
  }

  return cache;
};
