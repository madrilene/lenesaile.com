---
title: 'Organisierung der Eleventy config-Datei'
description: 'Ich bin ein großer Fan von Organisation, Ordnung und Klarheit. Die meisten meiner Projekte werden recht umfangreich, deshalb strukturiere ich meine Eleventy Konfigurationsdatei zukunftssicher!'
category: blogpost
key: 'eleventyconfig'
date: 2022-11-29
---

[Eleventy](https://www.11ty.dev/) wird mit einigen Voreinstellungen installiert. Zum Beispiel ist der Ausgabeordner standardmäßig `_site`, und Eleventy sucht nach deinen Quelldateien im Stammverzeichnis.

Das ist für sehr kleine Projekte in Ordnung. Eine zusätzliche config-Datei ist nicht notwendig, um mit Eleventy zu arbeiten. Allerdings bin ich ein großer Fan von Struktur, Organisation und Übersichtlichkeit, und die meisten meiner Projekte werden recht groß. Ich habe auch persönliche Vorlieben, an die ich Eleventy anpassen möchte. Lass uns das tun!

## eleventy.js Konfigurationsdatei erstellen

Füge eine neue Datei im Hauptverzeichnis mit dem Namen `.eleventy.js` hinzu (ab Eleventy 2.0 kann sie auch `eleventy.config.js.` heißen).

Zuerst passen wir die Ordnerstruktur etwas an.

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

Unser Ausgabeordner ist jetzt `dist`, und alle unsere Quelldateien kommen in den Ordner `src`.
Außerdem ziehe ich aufgrund meiner persönlichen Vorliebe den `layouts`-Ordner aus dem `_includes`-Ordner heraus, wo er normalerweise liegt, und stelle sicher, dass sie nebeneinander liegen.

Das Root-Verzeichnis bleibt all den Dateien vorbehalten, die unbedingt dort liegen müssen - wie `package.json` und `README.md`, oder die Konfigurationsdateien anderer Module, die du in deinem Projekt verwendest.

## Strukturierung des Eingabeordners

Erstelle einen Ordner namens `src` im Stammverzeichnis.
Obwohl wir die meisten Ordner nicht weiter besprechen, sieht ein Website-Projekt oftmals so aus:

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

`pages` ist für deine statischen Seiten wie `index.md`, `about.md`, usw., `posts` enthält deine Blog-Artikel, und `projects` ist nur ein weiterer collections-Ordner, damit es sich überhaupt lohnt, diese Logik aus `eleventy.js` herauszuholen.

... Denn dort _kannst_ du alle deine _collections_, _shortcodes_ und _filters_ konfigurieren. Der [offizielle Eleventy-Starter](https://github.com/11ty/eleventy-base-blog/blob/main/.eleventy.js) ist sehr einfach gestaltet und macht es genau so.

{% aside %}Du solltest dir unbedingt die [Eleventy-Dokumentation](https://www.11ty.dev/docs/config/) durchlesen, um dich mit allen Konfigurationsmöglichkeiten vertraut zu machen.{% endaside %}

Ich möchte, dass meine Projekte frei wachsen können, ohne dass ich mir Sorgen machen muss, dass meine Konfigurationsdatei zu unübersichtlich wird. Deshalb kümmere ich mich an anderer Stelle um Anpassungen und importiere nur den `return`-Wert meiner Funktionen.

## Konfigurationen auslagern

Üblicherweise lege ich einen neuen Ordner im Stammverzeichnis mit dem Namen `config` an.

Auch sehr gut ist die Lösung einen Ordner mit dem Namen `_11ty` in `src` zu legen. Ich habe das in [Nicolas Hoizeys](https://nicolas-hoizey.com/) Starter [pack11ty](https://github.com/nhoizey/pack11ty/tree/master/src) gesehen. Du kannst den Ordner nennen wie du willst und ihn an einem beliebigem Ort im Verzeichnis ablegen.
In diesem Fall gehe ich davon aus, dass du einen Ordner namens `config` in deinem Stammverzeichnis abgelegt hast.

Wir brauchen Eleventy nicht über die Existenz dieses Ordners zu informieren. Wir benutzen ihn einfach, um unsere `return`-Werte zu exportieren und sie in `.eleventy.js` zu importieren.

Ich stelle zwei Möglichkeiten vor, dies zu handhaben, am Beispiel von [collections](https://www.11ty.dev/docs/collections/).

## Methode 1: Datei importieren und über die _collections_ "loopen"

Erstelle eine Datei namens `collections.js` in deinem `config` Ordner.
Definiere nun alle _collections_, die du verwenden möchtest:

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

{% aside %}`/**/*.md` überprüft eine beliebige Anzahl von Verzeichnissen zwischen `/src/posts/` und `*.md`. Auf diese Weise können wir sicherstellen, dass Eleventy alle Markdown-Dateien findet, egal wie tief sie verschachtelt sind, so dass wir die Inhalte weiter nach Jahr, dann nach Monat usw. ordnen können.
{% endaside %}

Deine `eleventy.js` sieht jetzt so aus:

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

Wir "loopen" (wie sagt man das auf Deutsch?) über alle _collections_, die in `collections.js` definiert sind, und importieren sie in unsere Konfigurationsdatei. Genau dasselbe machen wir jetzt für _filter_, _transforms_, _shortcodes_ usw.

Wenn du diese Methode in Aktion sehen willst, besuche das [öffentliche Repo](https://github.com/hexagoncircle/ryan-mulligan-dev/blob/main/.eleventy.js) von [Ryan Mulligans Website](https://ryanmulligan.dev/).

**Sehr aufgeräumt!**

Es gibt allerdings etwas, das mir an dieser Methode nicht gefällt.
Wir haben zwar Struktur reingebracht, aber ich möchte auch einen guten Überblick haben. Ich möchte direkt in meiner Konfigurationsdatei sehen können, welche _collections_ ich verwende, welche _filter_, welche _transforms_ und so weiter. Hier kommt also Methode zwei!

## Methode 2: named imports

Anstelle von `collections.js` erstellen wir einen weiteren Ordner innerhalb von `config` mit dem Namen `collections`, und dort legen wir eine Datei namens `index.js` ab:

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

Und in der `eleventy.js`:

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

**Erledigt!**

Alles ist übersichtlich und ich kann auf einen Blick sehen, was ich für dieses Projekt importiere.

So strukturiere ich derzeit meine Projekte (bis ich eine Methode finde, die mir noch besser gefällt).
Du kannst das in meinem Starter [eleventy-excellent] (https://github.com/madrilene/eleventy-excellent/blob/main/.eleventy.js) sehen.

Ich würde gerne noch viel mehr ins Detail gehen und andere wichtige Ordner wie `assets` und `_includes` aufschlüsseln. Aber das würde den Rahmen sprengen. Vielleicht schreibe ich eine Fortsetzung?

Generell ist es immer eine gute Idee, tief in die Repos von [Starterprojekten](https://www.11ty.dev/docs/starter/) oder Webseiten anderer EntwicklerInnen einzutauchen.

Es gibt so viele tolle Ansätze!
