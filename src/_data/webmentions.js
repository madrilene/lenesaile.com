import fs from 'node:fs';
import path from 'node:path';
import EleventyFetch from '@11ty/eleventy-fetch';
import dotenv from 'dotenv';
import {webmentionDomain} from './meta.js';

dotenv.config();

const CACHE_DIR = '.cache';
const CACHE_FILE = path.join(CACHE_DIR, 'webmentions.json');
const API = 'https://webmention.io/api';
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

async function fetchWebmentions(since, perPage = 10000) {
  if (!webmentionDomain) {
    console.warn('>>> unable to fetch webmentions: no domain name specified');
    return false;
  }
  if (!TOKEN) {
    console.warn('>>> unable to fetch webmentions: no access token specified');
    return false;
  }

  let url = `${API}/mentions.jf2?domain=${webmentionDomain}&token=${TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`;

  const feed = await EleventyFetch(url, {
    duration: '0s',
    type: 'json'
  });

  console.log(`>>> ${feed.children.length} new webmentions fetched`);
  return feed;
}

function mergeWebmentions(a, b) {
  const map = new Map();
  [...(a.children || []), ...(b.children || [])].forEach(entry => map.set(entry['wm-id'], entry));
  return [...map.values()];
}

function writeToCache(data) {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  console.log(`>>> webmentions saved to ${CACHE_FILE}`);
}

function readFromCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  }
  return {lastFetched: null, children: []};
}

export default async function () {
  const cache = readFromCache();

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`);
  }

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
}
