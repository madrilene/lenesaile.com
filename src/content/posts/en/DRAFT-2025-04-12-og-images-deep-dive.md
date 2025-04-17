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

You'll need at least one template, a splitlines filter to support multiple lines of text in SVG, and [an `eleventy.after` event](https://www.11ty.dev/docs/events/#eleventy-after). The only dependency we have to add is Eleventy Image: `npm install @11ty/eleventy-img`.

### The template

To create an SVG in the ourput image in Eleventy, you can build this with the templating language of your choice, in my case that's Nunjucks. Let's call it `simple.njk` and place it somewhere in your input folder.

{% raw %}

```jinja2
---
hardCodedString: 'I am a text!'
backgroundColor: 'goldenrod'
pagination:
  data: collections.allPosts
  size: 1
  alias: ogPosts
permalink: '/assets/og-images/{{ ogPosts.fileSlug }}-preview.svg'
eleventyExcludeFromCollections: true
---

<svg width="1200" height="630" viewBox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="{{ backgroundColor }}" />
  <text x="400" y="580">
    {{ hardCodedString }}
  </text>
</svg>
```

{% endraw %}

This creates a solid yellow-orange SVG with a hard coded 16px tall text in Times New Roman, more or less in the middle (starting at 400 on the x coordinate, 580 on the y coordinate). Note that SVG paints one layer after the other: every element gets painted on top of the previous, so the text must come after the solid background, or it will be invisible.

{% image "./src/assets/images/blog/ogimage-simple.jpeg", "a solid yellow-orange rectangle with 'I am a text!' in small letters" %}

We also select a collection that this template acts upon. In my case that's a custom collection, that match the filesystem pattern `'./src/posts/**/*.md'`. One file per collection item is created (`size: 1`), and the `alias` serves as a reference to a single item, which we will rely on more often later on (See also _The alias trap_).

{% asideInfo %}[Collections](https://www.11ty.dev/docs/collections/) is a core concept in Eleventy, and not an easy one to understand. They are generally created by assigning a string value to the `tags` key in the front matter. They are not equal to keyword labels for blogging, though you can eventually use them for that purpose. The [Collections API](https://www.11ty.dev/docs/collections-api/) allows for very fine-tuned collections. I prefer creating them like that.{% endasideInfo %}

The permalink acts upon all files of the selected collection, and creates a unique path for all of them, using the file slug. If you get an error that indicates a duplicate permalink, then you are probably using the same file slug for multiple files. This is why creating controlled collections come in handy.

Since we don't need these images to be part of collection, we set the `eleventyExcludeFromCollections` option to true.

### The event

If everything went well, we now have a folder full of SVG files in `dist/assets/og-images/`, that sadly all look the same and are not very creative, but we'll get to that later. For now we need to solve the issue that we cannot use SVG files as Open Graph images. We need Eleventy to pick those SVG files up and convert them to raster images, JPEG or PNG.

[Eleventy Events](https://www.11ty.dev/docs/events/) run at different times during the build process.
The `eleventy.after` event is triggered after the build process is finished, so we know that our SVG files are ready in the output folder.

We have to add this to our `eleventy.config.js` file:

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

The script looks into the directory where we sent the SVG images, checks if a  corresponding `.jpeg` already exists for the same file name, and if yes, skips. Otherwise it creates the JPEG version using _Eleventy Image_.

Done! We have a predictable path for our images, so we can reference in our metadata:

{% raw %}
```html
<meta
  property="og:image"
  content="{{- meta.url -}}/assets/og-images/{{ page.fileSlug }}-preview.jpeg"
/>
```
{% endraw %}

At this point we have no access to our custom collection alias, we are using the `page` variable instead that holds information about the current page, among other things, the fileSlug. If you created your collection wide enough to serve all pages, you can leave it like that, but if you only target blog posts for example, it makes sense to have something to fall back upon.

`meta.url` is the base URL of the site, which I set as globally available data `src/_data/meta.js`. OG images expect absolute urls, so we need to add the domain name.

## So much we can do with SVG

Let's take care of the text first. `<text>` in SVG is an element that draws a text.
You can set some attributes directly on that element, just like w  did with the x and y coordinates.

```
  <text x="100" y="300"
  font-family="Arial, sans-serif"
  font-size="200"
  font-weight="500"
  font-variant="small-caps"
  fill="white"
  letter-spacing="-5">
    {{ hardCodedString }}
  </text>
```

## The font-face problem

Sophies question on Mastodon: https://front-end.social/@sophie@social.lol/113373291207231296


apply via css: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Using_fonts

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

