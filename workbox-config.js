module.exports = {
  cacheId: 'lenesaile',
  globDirectory: 'dist/',
  globPatterns: ['**/*.{css,js,json}'],
  swDest: 'dist/sw.js',

  runtimeCaching: [
    {
      urlPattern: /(?:\/)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'html',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7 // 2 weeks
        }
      }
    },
    {
      urlPattern: /\.(?:woff|woff2)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7 // 2 weeks
        }
      }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          maxEntries: 30
        }
      }
    }
  ]
};
