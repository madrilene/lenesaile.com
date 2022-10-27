---
title: 'Some random personal notes on using WordPress in 2022'
description: 'Back in 2007, I discovered WordPress. It never stopped being a great solution for complex custom websites, which is why I am still using it, 15 years later.'
key: 'wordpressblog'
date: 2022-10-26
image: './src/assets/images/blog/wordpress-notes.jpg'
alt: 'The WordPress logo with some php code in the background.'
cta:
  title: 'Need help with WordPress?'
  desktop: 'I have been working with WordPress for many years. I create custom WordPress Themes that are really fast and secure.'
  lead: "Do you have a project in mind and don't know how to carry it out? Let's talk about it! Send me a mail at [hola@lenesaile.com](mailto:hola@lenesaile.com) and tell me about your ideas."
---

Back in 2017, I was looking for a CMS that I could understand so I could use it to create my own websites. After trying [Joomla](https://www.joomla.org/) and [TYPO](https://typo3.org/) (and hating it), I discovered [WordPress](https://wordpress.org/). It was a revelation. I still think that it's a great solution for complex custom websites. It's extremely powerful and customizable, and I don't feel too limited as a developer as to create whatever I have in mind. Still, some look down on the CMS, saying it is unsafe and bloated. I'd like to briefly share my thoughts on the current state of WordPress, and why I still like using it.

{% include "partials/toc.njk" %}

## What I like about WordPress

### WordPress is free, secure and fast

WordPress is free to use and if you're not messing up, it is secure and fast. The other day I read that ==WP core is responsible for only 0.5% of vulnerabilities, the other 99.5% are custom made by plugins and themes==.

WordPress is easy to optimize for SEO, has eCommerce possibilities, and thanks to the plugin "Advanced Custom fields" great flexible content fields.

The community is huge, and I have yet to encounter a problem that wasn't either already solved before or that I wasn't helped with instantly.

Also, a lot of clients have worked with the WordPress backend before and they are comfortable with it.

## What’s there to dislike?

### You have to do it their way

With WordPress, you have to do it their way. It is not like Jamstack, where everything is up to you, adding services and methods as you like. With Wordpress it is more like having to opt out of stuff you don’t want, and I feel like [Block Themes](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/) are going this way even more than classic PHP themes. I have to work with the classes that are given to me, and I also have to opt out of scripts like the <code>wp-block-navigation-view</code> (responsible for the behavior of menus) if I want to implement my own behavior.

### Site builders, no thanks

I'm not a fan of site builders (Elementor, Visual Composer...). Everything that adds an unnecessary weight to a web page is something I try to avoid. That brings me to the next thing I never really got friendly with: Themes that want to serve every possible use case, available at theme marketplaces like ThemeForest.

I have talked to a lot of people who bought a theme - they spent money and then they spent countless hours trying to configure everything. This then shall not be in vain. They want to save the broken, much too heavy theme.

Not always, but often, it is a mess. I saw a theme loading more than 100 different script files. I have not counted the stylesheets. It took the site more than 10 seconds to load on my fiber-optic internet connection.

## How I am working with WordPress

Transforming WordPress Sites to Jamstack or using WordPress as a headless CMS is what I most concentrated on recently.

When working natively with WordPress, I’m making sure it as fast as possible by using custom made vanilla JS only where necessary. Also, I’m using a build pipeline to only use optimized assets in the final theme structure.

==I try to make everything as easy and obvious as possible.== I leave clues and I instructions in the editable sections and I make introduction videos where I explain every important detail of the website.

Also, I value structure and order. I want to be able to understand my own themes in the future, but I also want subsequent developers to get along with the code I wrote.

### Plugins I usually install

[ACF Pro](https://www.advancedcustomfields.com/pro/) is on every Website I build. So is [Yoast SEO](https://yoast.com/wordpress/plugins/seo/), [WP Rocket Pro](https://wp-rocket.me/es/) and [Siteground Security](https://www.siteground.com/blog/sg-security/).

If I’m going headless it’s either [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/), or [WP GraphQL](https://www.wpgraphql.com/) in combination with WPGraphQL for Advanced Custom Fields.

For manual backups and migration between local development, staging and deployment: [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/). I use [Query Monitor](https://es.wordpress.org/plugins/query-monitor/) to visualize hooks, debug and improve performance.

## What I think about Full Site Editing

In a nutshell, FSE is the extension of the [Gutenberg Editor](https://wordpress.org/gutenberg/) to the entire website. According to this principle, the entire theme is customizable directly in the backend using blocks. It's basically a built-in site builder.

I can't say too much about it, since I have to still really dive into it. Considering it's based on JavaScript and has a component like concept, I might eventually like developing with it. Wordpress won't go back to the old ways and every new version will enforce block themes. As of version 6.1 there will be the possibility to opt in to fluid typography. That sounds great!

A template part for the <code>header.html</code> looks like that:

{% raw %}

```html
<!-- wp:group {"className":"inner splitter wrapper headarea","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group inner splitter wrapper headarea">
  <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
  <div class="wp-block-group">
    <!-- wp:site-logo /-->

    <!-- wp:site-title {"level":0} /-->
  </div>
  <!-- /wp:group -->

  <!-- wp:navigation {"ref":52,"overlayMenu":"never","style":{"spacing":{"blockGap":"0rem"}}} /-->
</div>
<!-- /wp:group -->
```

{% endraw %}

It certainly is something you have to get used to. It’s like writing code with comments.

As I said, I haven't quite gotten into it yet. But my impression after a few hours of playing around with the new system is that it rather limits me as a developer who is used to a great freedom of choice.

I also think it is too complex and fiddly for the common client who just wants to publish a blog post. It most fits the capabilities of professional web designers who until now made complete websites only in site builders, without touching code.

### So what's the right technique to build a theme nowadays?

It seems like old and new techniques are clashing together. There are a lot of ways to build with WordPress: block themes, the classic PHP driven templating or WordPress as a headless CMS feeding a JavaScript frontend via its REST API or WPGraphQL.

I wouldn't worry too much about that: ==Whatever is right for the project==. No visitor cares what the website was built with, and most customers don't care either. What really matters is the quality of the product.

## What about Gutenberg?

I think the Gutenberg editor is great for experienced content editors, and for anyone who is willing to learn a bit about it. You can do a lot of different layouts and create really interesting posts (don't overdo copying stuff from the[ WordPress pattern library](https://wordpress.org/patterns/) though, as this adds on to the page weight).

On the other hand, some clients are notoriously afraid of breaking things. There’s a lot you can do with the Gutenberg editor - it can be a little overwhelming. Some WordPress users just want the good old "Microsoft Word" editor back.

## Conclusion

For me, WordPress is one thing above all: A free, very flexible CMS that many of my customers already know. I am less interested in the fact that a theme can be replaced at any time by another theme.

I develop a website especially for the needs of the customer. It should be fast, accessible and secure, and ideally last a few years if well maintained.

This custom made website might or might not use WordPress as a CMS. That depends on the project and is something my clients and I decide together.
