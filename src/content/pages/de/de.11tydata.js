export default {
  lang: 'de',
  layout: 'page',
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};
