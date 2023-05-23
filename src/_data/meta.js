module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  domain: 'www.lenesaile.com',
  siteType: 'Person', // schema
  author: 'Lene Saile',
  authorEmail: 'hola@lenesaile.com',
  authorWebsite: 'https://www.lenesaile.com',
  authorAvatar: '/assets/images/avatar.jpg',
  themeColor: '#E54848', //  Manifest: defines the default theme color for the application
  themeBgColor: '#FFFDF5', // Manifest: defines a placeholder background color for the application page to display before
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg',
    twitterHandle: '@lenesaile',
    twitterProfile: 'https://twitter.com/lenesaile',
    mastodonProfile: 'https://front-end.social/@lene'
  },
  pagination: {
    itemsPerPage: 20
  },
  webmentions: {
    fallbackAvatar: '/assets/images/svg/avatar-fallback.svg'
  },
  address: {
    firma: 'Lene Saile',
    street: 'c/ Humilladero 25, 2C',
    city: 'Madrid',
    state: 'Madrid',
    zip: '28005',
    country: 'Spain',
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
    shortDescription: 'Frontend developer and designer based in Madrid.',
    back: 'Back',
    skipText: 'Jump to main content',
    toc: 'Table of contents',
    skipToc: 'Skip table of contents',
    blog: {
      name: 'Lene Saile - Web Development Blog',
      description:
        "I'm writing about things related to web development. Projects, approaches and observations, things I have learned or consider important.  I specialize in custom creative websites with accessibility and performance in mind.",
      url: 'https://www.lenesaile.com/en/feed.xml',
      published: 'published: ',
      edited: 'last edit: ',
      reading: 'Reading time: ',
      unit: 'min.',
      githubEdit:
        'I try to keep my articles up to date. If you see something that is not true (anymore), or something that should be mentioned, feel free to edit the article on'
    },
    webmentions: {
      formTitle: 'Have you published a response? Let me know where:',
      buttonValue: 'Send Webmention'
    },
    ariaLabels: {
      mainMenu: 'Main',
      footerMenu: 'Footer',
      socialMenu: 'Social links',
      optionsMenu: 'Select language',
      optionsButton: 'Change language'
    }
  },

  es: {
    localeCode: 'es_ES',
    long: 'Español',
    siteName: 'Lene Saile',
    siteDescription:
      'Desarrolladora Frontend en Madrid. Me gusta trabajar con Jamstack, Javascript vainilla y CSS moderno.  Es muy importante que las webs sean rápidas y accesibles.',
    back: 'Atrás',
    skipText: 'Saltar al contenido principal',
    toc: 'índice de contenidos',
    skipToc: 'Saltar el índice de contenidos',
    blog: {
      name: 'Lene Saile - Blog de desarrollo web',
      description:
        'Escribo sobre cosas relacionadas con el desarrollo web. Proyectos, enfoques y observaciones, cosas que he aprendido o que considero importantes. Me especializo en sitios web creativos a medida teniendo en cuenta especialmente la accesibilidad y el rendimiento.',
      url: 'https://www.lenesaile.com/es/feed.xml',
      published: 'publicado: ',
      edited: 'última edición: ',
      reading: 'Tiempo de lectura: ',
      unit: 'min.',
      githubEdit:
        'Intento mantener mis artículos actualizados. Si ves algo que (ya) no es correcto, o algo que debería mencionarse, no dudes en editar el artículo en'
    },
    webmentions: {
      formTitle: '¿Has publicado una respuesta? Dime dónde:',
      buttonValue: 'Enviar Webmention'
    },
    ariaLabels: {
      mainMenu: 'Principal',
      footerMenu: 'Información',
      options: 'seleccionar idioma',
      optionsButton: 'cambiar idioma'
    }
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
    skipToc: 'Inhaltsverzeichnis überspringen',
    blog: {
      name: 'Lene Saile - Web Development Blog',
      description:
        'Ich schreibe vor allem über Dinge, die mit Webentwicklung zu tun haben. Projekte, Ansätze und Beobachtungen, Dinge, die ich gelernt habe oder für wichtig halte. ch habe mich auf maßgeschneiderte, kreative Websites spezialisiert, bei denen Barrierefreiheit und Leistung im Vordergrund stehen.',
      url: 'https://www.lenesaile.com/de/feed.xml',
      published: 'veröffentlicht: ',
      edited: 'zuletzt bearbeitet: ',
      reading: 'Lesezeit: ',
      unit: 'Min.',
      githubEdit:
        'Ich versuche meine Artikel aktuell zu halten. Wenn du etwas siehst was so nicht (mehr) stimmt, oder etwas das noch erwähnt werden sollte, kannst du den Artikel gerne bearbeiten:'
    },
    webmentions: {
      formTitle: 'Hast du eine Antwort veröffentlicht? Lass mich wissen, wo:',
      buttonValue: 'Webmention senden'
    },
    ariaLabels: {
      mainMenu: 'Haupt',
      footerMenu: 'Information',
      options: 'Sprache wählen',
      optionsButton: 'Sprache ändern'
    }
  }
};
