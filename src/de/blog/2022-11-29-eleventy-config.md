---
title: 'Organisierung der Eleventy config-Datei'
description: 'Eleventy lässt dich eine Datei namens eleveny.js anlegen, um alles nach den Bedürfnissen deines Projekts zu konfigurieren. In diesem Artikel geht es um die Organisation dieser Konfigurationsdatei!'
category: blogpost
key: 'eleventyconfig'
date: 2022-11-29
lastEdit: 2022-12-13
---

[Eleventy](https://www.11ty.dev/) kommt mit grundlegenden Voreinstellungen. Das bedeutet, dass du nichts tun musst, um mit der Arbeit zu beginnen: der Ausgabeordner ist standardmäßig `_site`, und Eleventy sucht deine Quelldateien im Stammverzeichnis.

Das ist für sehr kleine Projekte auch vollkommen in Ordnung. Die meisten meiner Projekte werden jedoch ziemlich groß, und ich muss Dinge Anpassen und _dependencies_ importieren. Ich habe auch persönliche Vorlieben, und Eleventy ist da ziemlich offen - du kannst alles so anlegen und nennen wie du möchtest. Um alle deine Wünsche zu erfüllen, gibt dir Eleventy die Möglichkeit eine Datei namens `eleveny.js` zu erstellen. In diesem Artikel geht es um die Organisation dieser Eleventy-Konfigurationsdatei.

Lass uns anfangen!

{% include "partials/toc.njk" %}

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
Außerdem ziehe ich aufgrund meiner persönlichen Vorliebe den `layouts`-Ordner aus dem `_includes`-Ordner heraus, wo er normalerweise liegt, und stelle sicher, dass die Verzeichnisse nebeneinander liegen.

Das Root-Verzeichnis bleibt all den Dateien vorbehalten, die unbedingt dort liegen müssen - wie `package.json` und `README.md`, oder die Konfigurationsdateien anderer Module, die du in deinem Projekt verwendest.

## Strukturierung des Eingabeordners

Erstelle einen Ordner namens `src` im Stammverzeichnis.

Obwohl wir die meisten Ordner nicht weiter besprechen, sieht ein Website-Projekt oftmals so aus:

{% raw %}

<!-- prettier-ignore -->
```md
│
├── src
│  │
│  ├── _data
│  ├── _includes
│  ├── _layouts
│  ├── assets
│  ├── pages
│  ├── posts
│  ├── projects
│
```

{% endraw %}

`pages` ist für deine statischen Seiten wie `index.md`, `about.md`, usw., `posts` enthält deine Blog-Artikel, und `projects` ist nur ein weiterer collections-Ordner, damit es sich überhaupt lohnt, diese Logik aus `eleventy.js` herauszuholen.

... Denn dort _kannst_ du alle deine _collections_, _shortcodes_ und _filters_ direkt konfigurieren.

{% aside %}Du solltest dir unbedingt die [Eleventy-Dokumentation](https://www.11ty.dev/docs/config/) durchlesen, um dich mit allen Konfigurationsmöglichkeiten vertraut zu machen.{% endaside %}

## Auslagerung der helper methods von Eleventy

Ich möchte, dass meine Projekte frei wachsen können, ohne dass ich mir Sorgen machen muss, dass meine Konfigurationsdatei zu unübersichtlich wird. Deshalb kümmere ich mich an anderer Stelle um Anpassungen und importiere nur den `return`-Wert meiner Funktionen.

Üblicherweise lege ich einen neuen Ordner im Stammverzeichnis mit dem Namen `config` an.

Auch sehr gut ist die Lösung einen Ordner mit dem Namen `_11ty` in `src` zu legen. Ich habe das in [Nicolas Hoizeys](https://nicolas-hoizey.com/) Starter [pack11ty](https://github.com/nhoizey/pack11ty/tree/master/src) gesehen. Du kannst den Ordner nennen wie du willst und ihn an einem beliebigem Ort im Verzeichnis ablegen.
In diesem Fall gehe ich davon aus, dass du einen Ordner namens `config` in deinem Stammverzeichnis abgelegt hast.

Wir brauchen Eleventy nicht über die Existenz dieses Ordners zu informieren. Wir benutzen ihn einfach, um unsere `return`-Werte zu exportieren und sie in `.eleventy.js` zu importieren.

Ich stelle zwei Möglichkeiten vor, dies zu handhaben, am Beispiel von [collections](https://www.11ty.dev/docs/collections/).

### Methode 1: Datei importieren und über die _collections_ "loopen"

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

{% aside %}`/**/*` überprüft eine beliebige Anzahl von Verzeichnissen zwischen `/src/posts/` und deinen `.md`-Dateien. Auf diese Weise können wir sicherstellen, dass Eleventy alle Markdown-Dateien findet, egal wie tief sie verschachtelt sind, so dass wir die Inhalte weiter nach Jahr, dann nach Monat usw. ordnen können. **Organize all the things!**
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

Dieser Ansatz erzeugt eine sehr kompakte Konfigurationsdatei. Es gibt allerdings etwas, das mir an dieser Methode nicht gefällt.

Wir haben zwar Struktur reingebracht, aber ich möchte auch einen guten Überblick haben. Ich möchte direkt in meiner Konfigurationsdatei sehen können, welche _collections_ ich verwende, welche _filter_, welche _transforms_ und so weiter. Hier kommt also Methode zwei!

Wir haben zwar Struktur reingebracht, aber ich möchte sehen, was in mein Projekt importiert wird, und zwar genau dort, in meiner Konfigurationsdatei. Ich möchte wissen, welche _collections_ ich verwende, welche _filter_, welche _transforms_ und so weiter. Hier kommt also Methode zwei!

### Methode 2: named exports

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

_Named exports_ können einzeln oder unten gruppiert exportiert werden. Wenn man wie im Beispiel hier alles am Ende des Moduls exportiert, ist es viel übersichtlicher, daher bevorzuge ich natürlich diese Methode.

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

Wenn es zu viele _filter_, _collections_ oder _shortcodes_ werden, unterteile ich sie weiter in eigene Ordner, zum Beispiel nur die Filter für die Ausgabe des Datums an einem gemeinsamen Ort. Größere Blöcke wie die für die [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) _shortcodes_ bekommen einen eigenen Ordner.
Die exportierten _values_ werden dann erst in die übergeordnete `index.js` importiert und dann für die Datei`eleventy.js` wieder zusammen exportiert. 🤪

### Methode 3: Weitere Konfigurationsdateien als Plugin

Nachdem ich diesen Artikel auf Mastodon geteilt hatte, wies mich [Zach darauf hin](https://front-end.social/@eleventy@fosstodon.org/109501433721579265), dass es noch eine weitere Möglichkeit gibt, meine Konfigurationskomponenten auszulagern:

```js
eleventyConfig.addPlugin(require('other-config-file.js'));
```

Das ist nicht nur die kompakteste Schreibweise, da ich meine _return values_ nicht erst importieren muss, sondern ich muss auch keinen Code umschreiben: Die ausgelagerten Konfigurationsdateien funktionieren genauso wie "elventy.js" selbst, indem sie eine _callback function_ zurückgeben. _Und_ ich kann sehen, was ich importiere!

Ich illustriere dies am Beispiel einer html-Minifizierung mit Eleventys eingebautem `addTransform`.

In deiner `eleventy.js`:

```js
// nichts zu importieren! :)

module.exports = eleventyConfig => {
  // Transforms
  eleventyConfig.addPlugin(require('./config/transforms/html-config.js'));

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

Deine `html-config.js`:

```js
const htmlmin = require('html-minifier-terser');
const isProduction = process.env.ELEVENTY_ENV === 'production';

module.exports = eleventyConfig => {
  eleventyConfig.addTransform('html-minify', (content, path) => {
    if (path && path.endsWith('.html') && isProduction) {
      return htmlmin.minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        includeAutoGeneratedTags: false,
        removeComments: true
      });
    }

    return content;
  });
};
```

**Exzellent!**

Als Nächstes: [Passthrough File Copy](https://www.11ty.dev/docs/copy/).

## Strukturierung der Passthrough File Copies

Manchmal möchten wir Dateien einfach in unseren Ausgabeordner kopieren, ohne sie weiteren Transformationsprozessen zu unterziehen. Und zwar genau so, wie sie sind. Hier kommen _Passthrough File Copies_ ins Spiel.

### Die Verzeichnisstruktur intakt halten

Nehmen wir an, du hast deine lokalen Schriftarten in `src/assets/fonts` gespeichert.

Wenn du diese Struktur beibehalten willst, fügst du folgendes zu `eleventy.js` hinzu:

```js
module.exports = eleventyConfig => {
  // Passthrough Copy
  eleventyConfig.addPassthroughCopy('src/assets/fonts/');

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

Nun werden deine Schriftarten mit der gleichen Verzeichnisstruktur kopiert, in `dist/assets/fonts/`.

Normalerweise habe ich mehr als nur einen Ordner in `assets`, mit denen ich gleichermaßen verfahren möchte.
Auch dafür gibt es eine kompakte Lösung!

```js
['src/assets/fonts/', 'src/assets/images/', 'src/assets/pdf/'].forEach(path =>
  eleventyConfig.addPassthroughCopy(path)
);
```

Wir packen alle Verzeichnisse in ein Array und wenden die Methode "forEach()" an, um den passthrough-Befehl für jedes Arrayelement einmal auszuführen.

### Dateien in ein anderes Verzeichnis kopieren

Manchmal möchtest du deine Dateien in ein _anderes_ Verzeichnis kopieren. Für mich macht das vor allem bei meinen Favicon-Varianten Sinn. Man _kann_ dem Browser sagen, dass er sie in einem Ordner suchen soll, aber meine Erfahrung ist, dass sie am besten in das Stammverzeichnis der Webseite gelegt werden. Ich möchte sie jedoch nicht im root meinees Projekts sehen (zu viel Lärm!), also lege ich sie normalerweise alle in `src/assets/images/favicon/` ab.

Um eine einzelne Datei in das Stammverzeichnis von `dist` zu kopieren, verwende ich diesen Befehl:

```js
eleventyConfig.addPassthroughCopy({
  'src/assets/images/favicon/apple-touch-icon.png': 'apple-touch-icon.png'
});
```

Jetzt könntest du das für jede Favicon-Datei tun, aber das wäre eine Menge unnötiger Wiederholungen. Stattdessen kannst du alle Dateien im Favicon-Verzeichnis mit dem Platzhalter \* (asterisk) selektieren:

```js
eleventyConfig.addPassthroughCopy({
  'src/assets/images/favicon/*': '/'
});
```

Übrigens, was Favicons angeht, empfehle ich [Andrey Sitniks Artikel](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs).

## Wrap up

So strukturiere ich derzeit meine Projekte. Du kannst die Methoden angewandt in meinem Starter [eleventy-excellent](https://github.com/madrilene/eleventy-excellent/blob/main/.eleventy.js) sehen. Ein wunderbares Beispiel für eine aufgeräumte Eleventy Konfigurationsdatei findet ihr im [Repository von Miriam Suzannes Website](https://github.com/mirisuzanne/mia/blob/main/.eleventy.js).

Ein Blick in den [offiziellen Eleventy-Starter](https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js) lohnt sich immer, denn dort sind Sicherheit _cutting edge_ Ideen zu finden.

Generell ist es immer eine gute Idee, tief in die Repos von [Starterprojekten](https://www.11ty.dev/docs/starter/) oder Webseiten anderer EntwicklerInnen einzutauchen.

Es gibt so viele großartige Ideen!
