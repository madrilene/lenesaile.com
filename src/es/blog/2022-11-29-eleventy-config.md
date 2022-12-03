---
title: 'Estructuración del archivo de configuración de Eleventy'
description: 'Me gusta mucho la organización, el orden y la claridad, y la mayoría de mis proyectos son bastante grandes. También tengo preferencias personales a las que quiero amoldar Eleventy. ¡Vamos a hacerlo!'
category: blogpost
key: 'eleventyconfig'
date: 2022-11-29
---

[Eleventy](https://www.11ty.dev/) viene con algunos valores básicos por defecto. Por ejemplo, la carpeta de salida por defecto es `_site`, y Eleventy busca tus archivos fuente en el directorio raíz.

Esto está bien para proyectos muy pequeños. Un archivo de configuración adicional no es necesario para trabajar con Eleventy. Sin embargo, soy un gran fan de la estructura, la organización y la claridad, y la mayoría de mis proyectos son bastante grandes. También tengo preferencias personales a las que quiero amoldar Eleventy. ¡Hagámoslo!

## Crear un archivo de configuración eleventy.js

Añade un nuevo archivo en el directorio raíz llamado `.eleventy.js` (a partir de Eleventy 2.0 también puede llamarse `eleventy.config.js.`).

Hagamos primero un pequeño ajuste en la estructura de carpetas.

```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
```

Nuestra carpeta de salida es ahora `dist`, y todos nuestros archivos fuente van a la carpeta `src`.
También, debido a mi preferencia personal, saco la carpeta `layouts` fuera de la carpeta `_includes`, donde normalmente vive y me aseguro de que estén uno al lado del otro.

Esto deja nuestra raíz para todos los archivos que absolutamente tienen que estar allí - como `package.json` y `README.md`, así como los archivos de configuración de otros módulos que utilizas en tu proyecto.

## Estructurar la carpeta de entrada

Crea una carpeta llamada `src` en tu directorio raíz.
Aunque no vamos a tocar la mayoría de las carpetas, este es el aspecto que podría tener tu proyecto web habitual:

{% raw %}

```md
│
└──src
│ │
│ └──_data
│ └──_includes
│ └──_layouts
│ └──assets
│ └──pages
│ └──posts
│ └──projects
```

{% endraw %}

`pages` es para tus páginas estáticas como `index.md`, `about.md`, etc., `posts` contiene los artículos de tu blog, y `projects` es sólo otra carpeta de colección que creamos para que valga la pena sacar la lógica de `eleventy.js`.

... Porque _puedes_ configurar todas tus _collections_, _shortcodes_ y _filters_ ahí mismo. El [starter oficial de Eleventy](https://github.com/11ty/eleventy-base-blog/blob/main/.eleventy.js) es bastante sencillo y lo hace así.

{% aside %}Si aún no lo has hecho, deberías dirigirte a la [documentación de Eleventy](https://www.11ty.dev/docs/config/) para familiarizarte con todas las opciones de configuración disponibles.{% endaside %}

Quiero que mis proyectos crezcan libremente sin preocuparme de que mi archivo de configuración se vuelva demasiado abarrotado. Así que me ocupo de las personalizaciones en otro lugar e importo sólo el valor de retorno de mis funciones.

## Externalización de las configuraciones

Mi preferencia es crear una nueva carpeta en el directorio raíz, llamada `config`.

Otra gran idea es añadir una carpeta a `src` con el nombre de `_11ty`. Encontré esto en el _starter_ de [Nicolas Hoizeys](https://nicolas-hoizey.com/) [pack11ty](https://github.com/nhoizey/pack11ty/tree/master/src). Puedes nombrar la carpeta como quieras y ponerla donde quieras.
En este caso, seguiré fingiendo que has creado una carpeta llamada `config` en tu directorio raíz.

No necesitamos avisar a Eleventy sobre la existencia de esta carpeta. Simplemente la usamos para exportar nuestros valores de retorno e importarlos a `.eleventy.js`.

Introduzco dos buenas maneras de manejar esto, usando [collections](https://www.11ty.dev/docs/collections/) como ejemplo.

## Método 1: Importar el archivo y hacer un bucle sobre los nombres de las _collections_

Crea un archivo llamado `collections.js` en tu carpeta `config`.
Ahora define todas las _collections_ que quieras usar:

```js
module.exports = {
  posts: function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md');
  },
  projects: function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/projects/**/*.md');
  }
};
```

{% aside %}`/**/*.md` coincide con cualquier número de directorios entre `/src/posts/` y `*.md`. De esta manera podemos asegurarnos de que Eleventy encuentra todos los archivos markdown por muy anidados que estén, y podemos seguir ordenando los contenidos por año, luego por mes, etc.
{% endaside %}

Tu `eleventy.js` ahora se ve así:

```js
const collections = require('./config/collections.js');

module.exports = eleventyConfig => {
  // Collections
  Object.keys(collections).forEach(collectionName => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
```

Hacemos un "loop" sobre todas las _collections_ definidas en `collections.js` y las importamos a nuestro archivo de configuración. Ahora harías exactamente lo mismo para tus _collections_, _shortcodes_, _filters_, etc.
Si quieres ver este método en acción, visita el [repositorio público](https://github.com/hexagoncircle/ryan-mulligan-dev/blob/main/.eleventy.js) del [sitio personal de Ryan Mulligan](https://ryanmulligan.dev/).

**¡Muy ordenado!**

Sin embargo, hay algo que no me gusta de este método.
Hemos introducido la estructura, pero también quiero una buena visión de conjunto. Quiero poder ver directamente en mi archivo de configuración qué _collections_ estoy usando, qué _filters_, qué _transforms_ y demás. ¡Así que aquí viene el método dos!

## Método 2: importaciones nombradas

En lugar de `collections.js` crea otra carpeta dentro de `config` llamada `collections`, y en ella pon un archivo llamado `index.js`:

```js
// blog posts
const getPosts = collection => {
  return collection.getFilteredByGlob('src/posts/**/*.md');
};

// projects
const getProjects = collection => {
  return collection.getFilteredByGlob('src/projects/**/*.md');
};

module.exports = {
  getPosts,
  getProjects
};
```

Y dentro de tu `eleventy.js`:

```js
const {getPosts, getProjects} = require('./config/collections/index.js');

module.exports = eleventyConfig => {
  // Collections
  eleventyConfig.addCollection('posts', getPosts);
  eleventyConfig.addCollection('projects', getProjects);

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
```

**¡Hecho!**

Todo está ordenado y puedo ver de un vistazo lo que estoy importando para este proyecto.

Así es como actualmente estoy estructurando mis proyectos (hasta que encuentre un método que me guste aún más).

Puedes ver esto aplicado en mi starter [eleventy-excellent](https://github.com/madrilene/eleventy-excellent/blob/main/.eleventy.js).

Me gustaría entrar en mucho más detalle y desglosar otras carpetas importantes como `assets` y `_includes`. Pero eso iría más allá del alcance de lo que quería enfocar aquí. ¿Quizás haré una continuación?

En general, siempre es una gran idea bucear en los repositorios de los _[starters](https://www.11ty.dev/docs/starter/)_ o en los sitios personales de otras desarrolladoras.

¡Hay tantas ideas geniales por ahí!
