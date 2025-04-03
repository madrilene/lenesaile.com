export const webmentionGetForUrl = (webmentions, url) => {
  return webmentions.children.filter(entry => entry['wm-target'] === url);
};

export const webmentionSize = mentions => {
  return !mentions ? 0 : mentions.length;
};

export const webmentionByType = (mentions, mentionType) => {
  return mentions.filter(entry => !!entry[mentionType]);
};

export const webmentionisOwn = webmention => {
  const urls = [
    'https://www.lenesaile.com',
    'https://bsky.app/profile/lenesaile.com',
    'https://front-end.social/@lene'
  ];
  const authorUrl = webmention.author ? webmention.author.url : false;
  return authorUrl && urls.includes(authorUrl);
};

export const webmentionSort = mentions => {
  return mentions.sort((a, b) => {
    if (a['published'] < b['published']) {
      return -1;
    }
    if (a['published'] > b['published']) {
      return 1;
    }
    return 0;
  });
};
