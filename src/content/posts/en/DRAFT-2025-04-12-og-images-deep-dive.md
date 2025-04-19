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

To create an SVG in the ourput image in Eleventy, you can build this with the templating language of your choice, in my case that's Nunjucks. Place it somewhere in your input folder.

{% raw %}

```jinja2
---
hardCodedString: 'I am a text!'
backgroundColor: 'aliceblue'
pagination:
  data: collections.allPosts
  size: 1
  alias: ogPost
permalink: '/assets/og-images/{{ ogPost.fileSlug }}-preview.svg'
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

This creates a solid light gray SVG with a hard coded 16px tall text in Times New Roman, starting at 400 on the x coordinate, 580 on the y coordinate. Note that SVG paints one layer after the other: every element gets painted on top of the previous, so the text must come after the solid background, or it will be invisible.

{% image "./src/assets/images/blog/ogimage-simple.jpeg", "a solid light gray rectangle with 'I am a text!' in small letters" %}

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

If you are working in your OG images, it makes sense to comment `      if (existsSync(outputPath)) continue;` out, so both the JPEG and the SVG change on every build cycle - always check the final raster image, as they don't look always the same.

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

## Use post specific data

Using a hard coded string works fine if you want to generate just one global fallback image, but we are creating a dedicated image per post. Let's show the post title instead.

You can't tell SVG to break lines of text if they don't fit, so we need a filter that receives a string and a maximum character per lines value.
The filter is from [Stefan Baumgartner](https://fettblog.eu/11ty-automatic-twitter-cards/#creating-an-svg)'s article.

Add this filter to your Eleventy config file:

```js
export default async function (eleventyConfig) {
  eleventyConfig.addFilter('splitLines', (input, maxCharLength) => {
    const parts = input.split(' ');
    const lines = parts.reduce(function (acc, cur) {
      if (!acc.length) {
        return [cur];
      }
      let lastOne = acc[acc.length - 1];
      if (lastOne.length + cur.length > maxCharLength) {
        return [...acc, cur];
      }
      acc[acc.length - 1] = lastOne + ' ' + cur;
      return acc;
    }, []);
    return lines;
  });
}
```

We split the input into an array of words. We assume that the words are separated by an empty space. If the combined length of the current line and next word exceeds `maxCharLength`, start a new line. Otherwise, we append the current part to the last line.

```bash
console.log(splitLines("This string will split into two lines.", 20));
// ["This string will","split into two lines."]
```

Modify the template:

{% raw %}
```jinja2
---
width: 1200
height: 630
offsetX: 120
fontSizeBig: 90
leadingFine: 1.2
titleCharsPerLine: 20
backgroundColor: 'aliceblue'
textColor: 'navy'
pagination:
  data: collections.allPosts
  size: 1
  alias: ogPost
permalink: '/assets/og-images/{{ ogPost.fileSlug }}-preview.svg'
eleventyExcludeFromCollections: true
---

<svg
  width="{{ width }}"
  height="{{ height }}"
  viewBox="0 0 {{ width }} {{ height }}"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="{{ backgroundColor }}" />

  {% set titleInLines = ogPost.data.title | splitLines(titleCharsPerLine) %}
  {% set numberOfLines = titleInLines.length %}
  {% set titleLeading = fontSizeBig * leadingFine %}
  {% set totalHeight = (numberOfLines - 1) * titleLeading %}
  {% set offsetY_title = ((height / 2) + (fontSizeBig * 0.3)) - totalHeight / 2 %}

  {% for line in titleInLines %}
    <text
      x="{{ offsetX }}"
      y="{{ offsetY_title + loop.index0 * titleLeading }}"
      font-size="{{ fontSizeBig }}"
      fill="{{ textColor }}"
    >
      {{ line }}
    </text>
  {% endfor %}
</svg>
```
{% endraw %}

I get the posts's title and split it into a new line whenever it exceeds 20 characters. I determine the line height by multiplying the font size with a leading factor. The `offsetY_title` is calculated by taking the height of the SVG and subtracting the total height of all lines divided by 2, so that the text is centered vertically, independent of the number of lines.

To perfectly position the text in the vertical center, it would be great if we could the [`dominant-baseline` attribute ](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/dominant-baseline), but it seems this is not supported by `librsvg`. So it wiöl look great in the SVG, but get lost as soon as the raster image is created. Instead we'll shift the text up by shift text up by ~30% of the font size: `{% set offsetY_title = ((height / 2) + (fontSizeBig * 0.3)) - totalHeight / 2 %}` centers the whole group slightly higher.

Phew! Good thing we don't have to figure this out again in the future, cause this allows for a flexible base, that we can reuse for strings of display and body text. I also set _all_ variables in the front matter, so I can reuse them, and keep organized as the template grows.

{% asideInfo %} Tip: Work directly in the browser with the SVG in the output folder to see how your settings turn out.{% endasideInfo %}

{% image "./src/assets/images/blog/ogimage-lines.jpeg", "April tree covered with delicate white blossoms in Madrid in big letters centered on a light blue background", "What this looks like now for every post" %}


## Add the featured image

The `<image>` SVG element lets you embed bitmap images inside an SVG. To make this work, you'll need to add the `xmlns:xlink` namespace declaration to the `<svg>` element: `xmlns:xlink="http://www.w3.org/1999/xlink"`. An image is referenced like this: `<image xlink:href="/image.jpg" width="50%" height="50%" x="0" y="0" />`

Long story short, this won't work, because Eleventy Image uses Sharp, which itself uses `libvips`/`librsvg`, that needs a base URL to resolve relative image references. When loading an SVG from a buffer (how Eleventy Image reads SVGs)), no base URL is set. So any `<image>` using a relative or absolute path fails because `librsvg` won't know where to load the image from.

But there is a solution to that: Base64 inlining is self-contained.

### Base64 filter

Add this new filter to the Eleventy config file:

```js
import fs from 'node:fs';

export default async function (eleventyConfig) {
 export const base64Format = async imagePath => {
   try {
     const mimeTypes = {
       jpg: 'image/jpeg',
       jpeg: 'image/jpeg',
       png: 'image/png',
       webp: 'image/webp'
     };

     const ext = imagePath.split('.').pop().toLowerCase();

     if (!mimeTypes[ext]) {
       console.error('Unsupported image format:', ext);
       return null;
     }

     const image = fs.readFileSync(imagePath);
     const base64 = Buffer.from(image).toString('base64');

     return `data:${mimeTypes[ext]};base64,${base64}`;
   } catch (error) {
     console.error('Error encoding image:', error);
     return null;
   }
 };
}
```

This filter takes a path to an image, reads it, and returns a base64 encoded string. To use it in the template (before the text element):

{% raw %}
```jinja2
  {% set base64Image = ogPost.data.image | base64Format %}

  <image
    x="0"
    y="0"
    width="100%"
    height="100%"
    href="{{ base64Image }}"
    preserveAspectRatio="xMidYMid slice"
  />
```
{% endraw %}

To make the image preserve its aspect ration while also covering the SVG's viewBox, I use the [`preserveAspectRatio` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/preserveAspectRatio). While `xMidYMid` (think of `object-position: center`) is the default value, `slice` behaves similar to `object-fit: cover` in CSS.

To make the `<text>` element stand out better, you can add some background rectangles behind it:

{% raw %}
```jinja2
{% for line in titleInLines %}
  <rect
    x="{{ offsetX }}"
    y="{{ offsetY_title + loop.index0 * titleLeading - (fontSizeBig * 0.8) }}"
    width="{{ width - offsetX }}"
    height="{{ fontSizeBig }}"
    fill="{{ backgroundColor }}"
    opacity="0.8"
  />
  <text
    font-size="{{ fontSizeBig }}"
    fill="{{ textColor }}"
    x="{{ offsetX }}"
    y="{{ offsetY_title + loop.index0 * titleLeading }}"
  >
    {{ line }}
  </text>
{% endfor %}
```
{% endraw %}

{% image "./src/assets/images/blog/ogimage-image.jpeg", "April tree covered with delicate white blossoms in Madrid in big letters centered on a photo of delicate white blossoms on thin branches. There are slightly transparent boxes behind the text to make it readable", "Aligning boxes with some magic numbers until I am happy with it" %}

## The font-face problem

Ebough now with Times new Roman, let's get a custom font! You can add your font stack in the front matter:

```yaml
---
fontFamily: 'Arial, Helvetica, sans-serif'
---
```
and add it to your `<text>` element: `font-family="{{ fontFamily }}"`. But Arial might not be your font of choice. Of course, you can use the `<style>` attribute in SVG!


  <style>

    @font-face {
  font-family: "Martian Mono";
  src: url("https://github.com/evilmartians/mono/blob/main/fonts/otf/MartianMono-Regular.otf");
}
  .text {
        font: 28px "Martian Mono", Arial, sans-serif;
      }
  </style>

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

## Some more OG image ideas

### Random backgrounds

...

### Image in shape, get color from image

...

### Reusing layout / template colors or themes




## Technique 2: Using the Eleventy Screenshot API

What, after all that, another technique?

As we have seen, my favourite methods, as much as I like it, has its limits. There is a worry-free solution, ...

https://github.com/11ty/api-screenshot/
https://www.zachleat.com/web/automatic-opengraph/




## The alias trap

As create templates for OG images, don’t make the mistake I did (more than once.

```yaml
---
pagination:
  data: collections.pages
  size: 1
  alias: page
permalink: '/assets/og-images/page-{{ page.fileSlug | slugify }}.html'
---
```

See the problem? It's the alias. Now I am messing with Eleventy's `page` variable. You’ll get the weird issue where there is a duplicate permalink:

```bash
[11ty] Output conflict: multiple input files are writing to `./dist/assets/og-images/page-about.html`. Use distinct `permalink` values to resolve this conflict.
[11ty]   1. ./src/content/pages/en/about.md
[11ty]   2. ./src/common/og-images/pages.njk (via DuplicatePermalinkOutputError)
```

So always go the safe route and use an alias that is almost certainly not reserved, like `ogPage`.

