export default {
  lang: 'en',
  layout: 'post',
  tags: 'posts',
  permalink: '/en/blog/{{ title | slugify }}/index.html',
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};
