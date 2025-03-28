export default {
  lang: 'de',
  layout: 'post',
  tags: 'posts',
  permalink: '/de/blog/{{ title | slugify }}/index.html',
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};
