const package = require('../../package.json');

module.exports = {
  siteType: 'Person', // schema
  siteURL: 'https://www.lenesaile.com',
  author: 'Lene Saile',
  authorEmail: 'hola@lenesaile.com',
  authorWebsite: 'https://www.lenesaile.com',
  meta_data: {
    twitterSite: '@lenesaile',
    twitterCreator: '@lenesaile',
    opengraph_default: '/assets/images/opengraph-default.jpg'
  },
  pagination: {
    itemsPerPage: 20
  },
  address: {
    firma: 'Lene Saile',
    street: 'c/ Humilladero 25, 2C',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28005',
    mobileDisplay: '+34 644 959496',
    mobileCall: ' +34644959496',
    email: 'hola@lenesaile.com',
    cif: ''
  },

  languages: [
    {
      label: 'EN',
      code: 'en',
      long: 'English',
      localeCode: 'en_EN'
    },
    {
      label: 'ES',
      code: 'es',
      long: 'Español',
      localeCode: 'es_ES'
    },
    {
      label: 'DE',
      code: 'de',
      long: 'Deutsch',
      localeCode: 'de_DE'
    }
  ],

  en: {
    localeCode: 'en_EN',
    long: 'English',
    siteName: 'Lene Saile',
    siteDescription:
      'Frontend developer based in Madrid. I enjoy working with Jamstack, vanilla Javascript and modern CSS. I do my very best to improve in terms of accessibility and performance.',
    back: 'Back',
    skipText: 'Jump to main content',
    toc: 'Table of contents'
  },

  es: {
    localeCode: 'es_ES',
    long: 'Español',
    siteName: 'Lene Saile',
    siteDescription:
      'Desarrolladora Frontend en Madrid. Me gusta trabajar con Jamstack, Javascript vainilla y CSS moderno.  Es muy importante que las webs sean rápidas y accesibles.',
    back: 'Atrás',
    skipText: 'Saltar al contenido principal',
    toc: 'Saltar el índice de contenidos'
  },
  de: {
    localeCode: 'de_DE',
    long: 'Deutsch',
    siteName: 'Lene Saile',
    siteDescription:
      'Frontend-Developer in Madrid. Ich arbeite gerne mit Jamstack, Vanilla Javascript und modernem CSS. Ich tue alles, um die Barrierefreiheit und Leistung zu optimieren.',
    back: 'Zurück',
    skipText: 'Zum Hauptinhalt springen',
    toc: 'Inhaltsverzeichnis',
    skipToc: 'Inhaltsverzeichnis überspringen'
  },

  env: process.env.ELEVENTY_ENV === 'production',
  pkv: package.version || 'v1'
};
