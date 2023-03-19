---
title: 'Organizing the Eleventy config file'
description: 'Eleventy lets you create a file called eleventy.js to configure the SSG to your own project’s needs. This article is all about organizing your config file!'
category: blogpost
key: 'eleventyconfig'
date: 2022-11-29
lastEdit: 2023-03-19
redirectFrom: ['/en/blog/structuring-the-eleventyjs-config-file/']
youtube: true
---

[Eleventy](https://www.11ty.dev/) comes with basic defaults already set up for you. That means you don't have to do anything to start working: the output folder defaults to `_site`, and Eleventy looks for your source files in the root directory.

This is okay for very small projects. However, most of my projects get quite large, and they need customizations and dependencies. I also have personal preferences, and Eleventy is quite open about that - you can arrange your input files and folders as you wish and call them whatever you like. Of course, Eleventy must be made aware of these settings.

This article is all about organizing your Eleventy configuration file.

Let's begin!

{% include "partials/toc.njk" %}

## Create an eleventy.js config file

Add a new file in the root directory called `.eleventy.js` (as of Eleventy 2.0 it may also be called `eleventy.config.js.`).

Let's make a small adjustment in the folder structure first.

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

Our output folder is now `dist`, and all our source files go into `src`.
Also, due to my personal preference, I pull the `layouts` out of `_includes`, where they usually live, and make sure that the directories are now next to each other.

This leaves our root to all the files that absolutely have to be there - like `package.json` and `README.md` as well as config files of other modules you use in your project.

## Structuring the input folder

Create a folder called `src` in your root directory.

Though we are not going to touch most of the folders, this is what your usual website-project might look like:

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

`pages` is for your static pages like `index.md`, `about.md`, etc., `posts` contains your blog articles, and `projects` is just another collection folder we create to make it worthwhile to get the logic out of eleventy.js.

... Because you _can_ configure all your collections, shortcodes and filters right there.

{% aside %}If you haven't already, you should head over to the [Eleventy documentation](https://www.11ty.dev/docs/config/) to get aquainted with all the configuration options available.{% endaside %}

## Outsourcing customizations

I want my projects to grow freely without worrying that my config file is getting too cluttered. So I deal with customizations elsewhere and import only the return value of my functions.

My preference is to create a new folder in the root directory, called `config`.

Another common approach is adding a folder to `src` called `_11ty`. I found this in [Nicolas Hoizeys](https://nicolas-hoizey.com/)' starter [pack11ty](https://github.com/nhoizey/pack11ty/tree/master/src). You can name the folder whatever you want and put it wherever you like. In this case, I will go on pretending you made a folder called `config` in your root directory.

We don't need to tell Eleventy about the existence of this folder. We just use it export our return values and import them into `.eleventy.js`.

I introduce two ways to handle this, using [collections](https://www.11ty.dev/docs/collections/) as an example.

### Method 1: Import file and loop over the collection keys

Create a file named `collections.js` in your `config` folder.
Now define all the collections you want to use:

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

{% aside %}`**/*` matches any number of directories between `/src/posts/` and your `.md` files. This way we can ensure that Eleventy finds all markdown files however deep nested, so we can further arrange the contents by year, then by month, etc. **Organize all the things!**
{% endaside %}

Your `eleventy.js` now looks like this:

```js
// Importing from config
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

We loop through all the collections that are defined in `collections.js` and import them into our config file. You'd now do exactly the same for your filters, transforms, shortcodes, etc.

If you want to see this method in action, visit the [public repository](https://github.com/hexagoncircle/ryan-mulligan-dev/blob/main/.eleventy.js) of [Ryan Mulligan's personal site](https://ryanmulligan.dev/).

**Very tidy!**

This approach has the advantage of producing a really compact config file. There is something I don't like about this method though.

We have brought structure into it, but I also want to see what's being used in my project, right there, in my config file. I want to see which collections I'm defining, which filters, and so on. So here comes method two!

### Method 2: named exports

Instead of `collections.js` create another folder inside `config` called `collections`, and in there you put a file called `index.js`:

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

Named exports can be exported individually, or batched together and exported at the bottom of the module. Exporting everything at the bottom, like in the example here, is so much cleaner, so I naturally favor this method.

And inside your `eleventy.js`:

```js
// Importing from config
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

**Done!**

Everything is neat and I can see at a glance what I am importing for this project.

If there are too many filters, collections or shortcodes, I subdivide them further into their own folders, for example only the filters for handling the date in a common place. Larger blocks like the ones for the [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) shortcodes get their very own folder.
The exported values are then imported into the parent `index.js`, and then exported all together again for the `eleventy.js` file. 🤪

### Method 3: adding another config file as a plugin

After I shared this article on Mastodon, [Zach pointed out](https://front-end.social/@eleventy@fosstodon.org/109501433721579265) that there is yet another way to outsource my config components:

```js
eleventyConfig.addPlugin(require('other-config-file.js'));
```

Not only is this the most compact notation, as I don't have to import my return values first, but I also don't have to remodel any code, as these outsourced config-files work just the same as `eleventy.js`, returning a callback function. _And_ I can see what I am importing!

I illustrate this with the example of an html minification using Eleventy's built-in `addTransform`.

In your `eleventy.js`:

```js
// nothing to import! :)

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

Your `html-config.js`:

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

**Excellent!**

Next up: [Passthrough File Copy](https://www.11ty.dev/docs/copy/).

## Structuring your Passthrough File Copies

Sometimes we just want to copy files over to our output folder, without subjecting them to further transformation processes. Exactly as they are. This is how Passthrough File Copies come into play.

### Keep directory structure intact

Let's say you have stored your local fonts in `src/assets/fonts`.

If you want to keep the same nesting structure, you add the following to `eleventy.js`:

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

Now your fonts will be copied over with the same directory structure, in `dist/assets/fonts/`.

I usually have more than one folder in `assets` that I want to deal with in the same way.
There is a concise way for this too!

```js
['src/assets/fonts/', 'src/assets/images/', 'src/assets/pdf/'].forEach(path =>
  eleventyConfig.addPassthroughCopy(path)
);
```

We put all directories into an array and apply the `forEach()` method to execute the passthrough once for each array element.

### Copy the files to another directory

Maybe you want to copy your files to _another_ directory. For me, this makes especially sense for my favicon variants. You _can_ tell the browser to look for them inside a folder, but my experience has been that they're best put in the root directory of the web page. However, I don't want to see them in my project root (too much noise!), so I usually put them all in `src/assets/images/favicon/`.

To copy a single file over to the `dist` root directory, use this snippet:

```js
eleventyConfig.addPassthroughCopy({
  'src/assets/images/favicon/apple-touch-icon.png': 'apple-touch-icon.png'
});
```

Now you could do this for every favicon file, but that would be a lot of unnecessary repetition. Instead, you can select all the files in the favicon directory with the \* (asterisk) wildcard:

```js
eleventyConfig.addPassthroughCopy({
  'src/assets/images/favicon/*': '/'
});
```

By the way, regarding favicons, I recommend reading [Andrey Sitnik's article](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) about which variants you really need.

## Wrap up

This is how I'm currenlty structuring my projects. You can see this being applied in my starter [eleventy-excellent](https://github.com/madrilene/eleventy-excellent/blob/main/.eleventy.js). A wonderful example of a tidy Eleventy config file can be found in the [repository of Miriam Suzanne's personal website](https://github.com/mirisuzanne/mia/blob/main/.eleventy.js).

A look at the [official Eleventy starter](https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js) is always worthwhile, because there you can find cutting edge ideas from Zach, the creator of Eleventy.

Generally, it is always a great idea to dive deeply into the repositories of [starter projects](https://www.11ty.dev/docs/starter/) or personal sites of other developers.

There are so many great ideas out there!

## Eleventy Meetup

I attended Eleventy Meetup Ep. 12 on March 16, 2023 and gave a short talk based on this article!

{% youtube 'nlaN-mifrWk', 'How to keep your Eleventy config file organized ' %}
