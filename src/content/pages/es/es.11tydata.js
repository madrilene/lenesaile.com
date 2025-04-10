export default {
  lang: 'es',
  layout: 'page',
  tags: 'pages',
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};
