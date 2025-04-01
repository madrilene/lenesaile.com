---
title: 'One color for all'
description: ''
discover:
  description: ''
category: blogpost
key: 'color-all'
date: 2024-06-26 11:30:00
lastEdit:
codepen: false
draft: true
---

In letzter Zeit genieße ich es sehr mit den Möglichkeiten zu spielen, die uns modernes CSS für Farben bietet. Dank der wunderbaren property `accent-color` und der `color-mix()` functional notation können wir nun eine konsistente Farbgebung für unsere Website mit nur einer Farbe erstellen.

## Setup a project

Wenn ihr alles selbst ausprobieren wollt, erkläre ich euch im folgenden wie ich das mache. Wenn ihr nur die verschiedenen Möglichkeiten kennen lernen wollt, spring direkt zum nächsten Kapitel.

I’ll install a minimum starter for Eleventy, this gives us a dev server and templating. I created a very very minimal one which I am going to use: https://github.com/madrilene/eleventy-esm-minimal

There is already a small HTML boiplerplate and a basic CSS file with a reset and some layouts from Every Layout.

First I want to set the color that is going to be used for everything else. I will set it as global data in `_data/meta.js`, so I can use it everywhere in the Eleventy project. I am choosing a nice sky blue color, but you can use any color you like.

```js
export const color = '#0094B4';
```

in index.njk, in the `<head>`, register this color as custom property:

```css
    <style>
      :root {
      	--color: {{ meta.color }};
      }
    </style>
```

The CSS of the starter is already referencing this variable, but the newly set one is overriden by the one set in the `:root` rule in `style.css`:

```css
--color: deeppink;
```

Delete this declaration and we are ready to go.

(Aside: why does the inline style not have more specificity?)

Inline styles that are added directly to an element (e.g., <div style="color: red;">) have a specificity score of `1-0-0-0`, which overrules pretty much everything else. It's a litte more complicated than that, so if you want to know more, read this [primer on the cascade and specificity](https://piccalil.li/blog/a-primer-on-the-cascade-and-specificity/).

In your scenario though, both the inline <style> tag and the external style.css stylesheet use the :root pseudo-class. Here’s why the inline style doesn’t gain more specificity in this case:

The `:root` pseudo-class represents the highest-level parent element in the document tree (the <html> element for HTML documents), has the specificity of a pseudo-class.
Because both our inline style and the external stylesheet use the `:root` pseudo-class with no other selectors added, their specificity scores are identical. The decision on which rule applies now comes down to the **order of appearance** in the HTML (cascading).

(aside end)

## Tint control elements with the `accent-color` property

`accent-color` is in all major browsers since 2022. As of now, it tints four elements: checkbox, radio, range and progress. As there is a default browser style for all elements, this is a progressive enhancement, that does not break older browsers.

```css
body {
  accent-color: var(--color);
}
```
