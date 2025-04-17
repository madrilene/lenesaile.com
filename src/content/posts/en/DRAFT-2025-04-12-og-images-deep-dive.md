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

I can't really say why I enjoy creating custom Open Graph images so much, as I don't write many blog posts and rarely share my website. I am all but a marketing person, but it is nice to have this space for your personal recognizable brand.

{% include "partials/toc.njk" %}

OG images are visual previews shown when your link is shared, on social media platforms like Mastodon or Bluesky, or within RSS readers. They're defined with:

```html
<meta property="og:image" content="https://example.com/image.jpg">
```

The standard dimensions are 1200 X 630 pixels, and leaving a generous bleed especially to the left and right is recommended to not cut off contents.

In the past, I usually built one dedicated side-wide OG image to fall back on, with a design tool.

But: You can build them dynamically, using your colors, shapes and photos, template strings like titles and description, and make the images automatically adapt as you change go and those values. Let's see how we can do that.

## With Canvas

This is a technique I explored years ago a bit, but it didn't stick with me. I just want to mention that it exists, in case it resonates with you. Basically, you use a  HTML `<canvas>`  to draw graphics. I am sure there are some articles about that technique out there.

## Template --> SVG --> raster graphic

My approach is heavily based on [an article by Bernard Nijenhuis](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/). I am going to repeat some things the article mentiones, because of slight changes I made and other thngs that became deprecated in Eleventy in the meantime.

You'll need at least one template, a splitlines filter to support multiple lines of text in SVG, and [an `eleventy.after` event](https://www.11ty.dev/docs/events/#eleventy-after).

### The event

Eleventy Events run at different times during the build process.
The `eleventy.after` event is triggered after the build process is finished. Add to your Eleventy config file:

```js
import {promises as fsPromises, existsSync} from 'node:fs';
import path from 'node:path';
import Image from '@11ty/eleventy-img';

  export default function(eleventyConfig) {
    eleventyConfig.on('eleventy.after', async () => {
    const ogImageOutput = 'dist/assets/og-images/';
    const files = await fsPromises.readdir(ogImageOutput);

    if (files.length === 0) {
      return;
    }

    for (const filename of files) {
      if (!filename.endsWith('.svg')) continue;
      const outputFilename = filename.slice(0, -4); // removes '.svg'
      const outputPath = path.join(ogImageOutput, `${outputFilename}.jpeg`);

      if (existsSync(outputPath)) continue;

      const imageUrl = path.join(ogImageOutput, filename);

      await Image(imageUrl, {
        formats: ['jpeg'],
        outputDir: ogImageOutput,
        filenameFormat: (id, src, width, format) => `${outputFilename}.${format}`
      });
    }
  });
};
```

The script looks into the dir where we sent the SVG images via the Nunjucks template. It checks if a  corresponding `.jpeg` already exists for the same file name, and if yes, skips. Otherwise it creates the JPEG version using _Eleventy Image_.

## The font-face problem

Sophies question on Mastodon: https://front-end.social/@sophie@social.lol/113373291207231296

### Failed solutions

I tried a lot here. I went as fat as embedding the text as base64.

### Solution: Add font to the build container

Some platforms allow you modify the build container, so you can copy over your custom font. If you are on CloudCannon, you can extend the build process with hooks: `/.cloudcannon/prebuild` runs after the install scripts and before any build commands. You can place your `ttf` in the same directory, `/.cloudcannon/custom-font.ttf`, and use a bash script to copy it over to the system-wide fonts folder inside the CloudCannon build container:

```bash
cp .cloudcannon/custom-font.ttf /usr/local/share/fonts
fc-cache -fv # fontconfig cache updater
```

The font file gets installed into the container’s OS font system, thus it becomes available just like a font installed on your local machine in development.

Other platforms like Neocities allow you to hook into the build container with GitHub Actions:

```yaml
# part of a bigger workflow
- name: Install custom font
  run: |
    cp custom-font.ttf /usr/share/fonts/
    fc-cache -fv
```

### Solution: Prebuild the images in development

If you are not using a CMS and write all your contents on your local machine with your custom font installed, you can just prebuild the images and use [Passthrough File Copy](https://www.11ty.dev/docs/copy/) to copy them to the output folder in production.

The `svgToJpeg` slightly changes:

```js
import {promises as fsPromises, existsSync} from 'node:fs';
import path from 'node:path';
import Image from '@11ty/eleventy-img';

  export default function(eleventyConfig) {
    eleventyConfig.on('eleventy.after', async () => {
    const ogImageOutput = 'dist/assets/og-images/';
    const files = await fsPromises.readdir(ogImageOutput);

    if (files.length === 0) {
      return;
    }

    for (const filename of files) {
      if (!filename.endsWith('.svg')) continue;
      const outputFilename = filename.slice(0, -4); // removes '.svg'
      const outputPath = path.join(ogImageSrc, `${outputFilename}.jpeg`);

      if (existsSync(outputPath)) continue;

      const imageUrl = path.join(ogImageOutput, filename);

      await Image(imageUrl, {
        formats: ['jpeg'],
        outputDir: ogImageSrc,
        filenameFormat: (id, src, width, format) => `${outputFilename}.${format}`
      });
    }
  });
};
```

In the `eleventy.config.js` you can wrap the event in an [Eleventy-specific environment variable](https://www.11ty.dev/docs/environment-vars/#eleventy-supplied): `process.env.ELEVENTY_RUN_MODE === 'serve'` only runs in development. We don't need to add extra production build time fpr the OG image creation:

```js
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }
```

Tell Eleventy to copy the images to the output folder (keeping the same path):

```js
// Copy `src/assets/og-images` to `dist/assets/og-images`
  eleventyConfig.addPassthroughCopy("src/assets/og-images");
```

The template now still creates the SVG files though. If you want to prevent this, you can add `draft: true` to the front matter, after registering this functionality in the Eleventy config:

```js
// https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L11-L16
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});
```

## OG image ideas

### Random backgrounds

...

### Reusing layout / template colors or themes

### Using actual images

base64 filter




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

