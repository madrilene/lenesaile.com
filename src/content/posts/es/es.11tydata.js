export default {
  lang: 'es',
  layout: 'post',
  tags: 'posts',
  permalink: '/es/blog/{{ title | slugify }}/index.html',
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};
