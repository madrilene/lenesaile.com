---
title: 'Organizing the Eleventy config file'
description: "I'm a big fan of organization, order and clarity, and most of my projects get quite large. I also have personal preferences that I want to mold Eleventy into. Let's do that!"
category: blogpost
key: 'eleventyconfig'
date: 2022-11-29
redirectFrom: ['/en/blog/structuring-the-eleventyjs-config-file/']
---

Eleventy comes with basic defaults set up for you. For example, the output folder defaults to `_site`, and Eleventy looks for your source files in the root directory.

This is okay for very small projects. An additional config file is not necessary to work with Eleventy. However, I'm a big fan of structure, organization and clarity, and most of my projects get quite large. I also have personal preferences that I want to mold Eleventy into. Let's do that!

## Create a eleventy.js config file

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

Our output folder is now `dist`, and all our source files go into the folder `src`.
Also, due to my personal preference, I pull the `layouts` folder out of the `_includes` folder, where it usually lives and make sure they lay side by side.

This leaves our root to all the files that absolutely have to be there - like `package.json` and `README.md` as well as config files of other modules you use in your project.

## Structuring the input folder

Create a folder called `src` in your root directory.
Though we are not going to touch most of the folders, this is what your usual website-project might look like:

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

`pages` is for your static pages like `index.md`, `about.md`, etc., `posts` contains your blog articles, and `projects` is just another collection folder we create to make it worthwhile to get the logic out of eleventy.js.

... Because you _can_ configure all your collections, shortcodes and filters right there. The [official Eleventy starter](https://github.com/11ty/eleventy-base-blog/blob/main/.eleventy.js) is pretty simple and does it like that.

{% aside %}If you haven't already, you should head over to the [Eleventy documentation](https://www.11ty.dev/docs/config/) to get aquainted with all the configuration options available.{% endaside %}

I want my projects to grow freely without worrying that my config file is getting too cluttered. So I deal with customizations elsewhere and import only the return value of my functions.

## Outsourcing configurations

My preference is to create a new folder in the root directory, called `config`.

Another great idea is adding a folder to `src` called `_11ty`. I found this in [Nicolas Hoizeys](https://nicolas-hoizey.com/)' starter [pack11ty](https://github.com/nhoizey/pack11ty/tree/master/src). You can name the folder whatever you want and put it wherever you like.
In this case, I will go on pretending you made a folder called `config` in your root directory.

We don't need to tell Eleventy about the existence of this folder. We just use it export our return values and import them into `.eleventy.js`.

I introduce two nice ways to handle this, using [collections](https://www.11ty.dev/docs/collections/) as an example.

## Method 1: Import file and loop over the collection names

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

{% aside %}`/**/*.md` matches any number of directories between `/src/posts/` and `*.md`. This way we can ensure that Eleventy finds all markdown files however deep nested, so we can further arrange the contents by year, then by month, etc.
{% endaside %}

Your `eleventy.js` now looks like this:

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

We loop over all the collections that are defined in `collections.js` and import them into our config file. You'd now do exactly the same for your filters, transforms, shortcodes, etc.
If you want to see this method in action, visit the [public repository](https://github.com/hexagoncircle/ryan-mulligan-dev/blob/main/.eleventy.js) of [Ryan Mulligan's personal site](https://ryanmulligan.dev/).

**Very tidy!**

There is something I don't like about this method though.
We have brought structure into it, but I also want a good overview. I want to be able to see directly in my config file which collections I'm using, which filters, which transforms and so on. So here comes method two!

## Method 2: named imports

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

And inside your `eleventy.js`:

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

**Done!**

Everything is neat and I can see at a glance what I am importing for this project.

This is how I'm currenlty structuring my projects (until I find a method that I like even better).

You can see this being applied in my starter [eleventy-excellent](https://github.com/madrilene/eleventy-excellent/blob/main/.eleventy.js).

I would love go into much more detail and break down other important folders like `assets` and `_includes`. But that would go beyond the scope of what I wanted to focus on here. Maybe I will make a follow-up.

Generally, it is always a great idea to to dive deeply into the repositories of [starter projects](https://www.11ty.dev/docs/starter/) or personal sites of other developers.
There are so many great ideas out there!
