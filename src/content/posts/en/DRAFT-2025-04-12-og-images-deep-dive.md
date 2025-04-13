---
title: 'Creative OG images with Eleventy'
description: ''
discover:
  description: ''
category: blogpost
key: 'ogimages'
date: 2025-04-12
lastEdit:
codepen: false
draft: true
---

I can't really say why I enjoy creating custom Open Graph images so much, as I don't write many blog posts and rarely share my website.
OG images are visual previews shown when your link is shared. They're defined with:

```html
<meta property="og:image" content="https://example.com/image.jpg">
```

Classically, they show up on social media like Mastodon or Bluesky, also on WhatsApp, Slack or Discord. Also, some RSS readers use those previews. You can build OG images in design tools like Penpot or Figma manually, or you can fall back to a featured image of your blog post. Or, you can build them dynamically, using your colors, shapes and photos, template strings like titles and description, and make the OG images automatically adapt as you change those values. This is all I need to hear really, to be on board. You could also argue with more engagement, total control to how your content looks when it is shared. As I said, I just enjoy creating them. So let's see how we can do that.

## Technique 1: Canvas

This is a technique I explored years ago a bit, but it didn't stick with me. I just want to mention that it exists, in case it resonates with you. Basically, you use a  HTML `<canvas>`  to draw graphics. Here is an article that explains how to do that: https://freedium.cfd/@Choco23/how-to-create-dynamic-open-graphic-images-3c49f4fc287

## Technique 2: Template --> SVG --> raster graphic

My approach is heavily based on [an article by Bernard Nijenhuis](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/).



## OG image ideas

### Random backgrounds

...

### Reusing layout / template colors or themes

### Using actual images

base64 filter



## The almost unsolvable font-face problem

Sophies question on Mastodon: https://front-end.social/@sophie@social.lol/113373291207231296

## Technique 2: Using the Eleventy Screenshot API

https://github.com/11ty/api-screenshot/
https://www.zachleat.com/web/automatic-opengraph/




## The alias trap

if you create more than one template for og images, don’t make the mistake I did (more than once! Lolsing hours of time trying to figure out what's going on. So this is probably above all, a reminder to myself).

```yaml
---
pagination:
  data: collections.pages
  size: 1
  alias: page
permalink: '/assets/og-images/page-{{ page.data.lang }}-{{ page.fileSlug | slugify }}.html'
---
```

See the problem? It's the alias. Now I am messing with Eleventy, probably with the global page object. You’ll get the weird issue where there is a duplicate permalink:

```bash
[11ty] Output conflict: multiple input files are writing to `./dist/assets/og-images/page-en-about.html`. Use distinct `permalink` values to resolve this conflict.
[11ty]   1. ./src/content/pages/en/about.md
[11ty]   2. ./src/common/og-images/pages.njk (via DuplicatePermalinkOutputError)
```

So always go the safe route and use keys that almost certainly not reserved.

