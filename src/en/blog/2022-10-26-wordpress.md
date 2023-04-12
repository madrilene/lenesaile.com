---
title: 'Some random personal notes on using WordPress in 2022'
description: 'Back in 2007, I discovered WordPress. It never stopped being a great solution for complex custom websites, which is why I am still using it, 15 years later.'
category: blogpost
key: 'wordpressblog'
date: 2022-10-26
lastEdit: 2023-02-21
image: './src/assets/images/blog/wordpress-notes.jpg'
alt: 'The WordPress logo with some php code in the background.'
youtube: true
cta:
  title: 'You want a WordPress site?'
  desktop: "I have been working with WordPress for many years. I probably won't be able to (don't want to 😶) help with premium themes, page builders or plugin issues."
  lead: "I'm working with WordPress using the [Codeable platform](https://app.codeable.io/tasks/new?ref=ebTXq&preferredContractor=109033)."
---

Back in 2007, I was looking for a CMS that I could understand so I could use it to create my own websites. After trying [Joomla](https://www.joomla.org/) and [TYPO3](https://typo3.org/) (and hating it), I discovered [WordPress](https://wordpress.org/). It was a revelation.

I still think that it's a great solution for complex custom websites. It's extremely powerful and customizable, and I don't feel too limited as a developer as to create whatever I have in mind. Some look down on the CMS, saying it is unsafe and bloated. I'd like to briefly share my thoughts on the current state of WordPress, and why I'm still using it.

{% include "partials/toc.njk" %}

## What I like about WordPress

### WordPress is free, secure and fast

WordPress is completely free to use and if you're not messing up, it is secure and fast. The other day I read that ==WP core is responsible for only 0.6% of vulnerabilities, the other 99.4% are custom made by plugins and themes==. [^1]

WordPress sites get hacked. That's a fact. But, so do other sites on the internet, we can as well say _websites_ get hacked.
Very _very_ many websites use WordPress. Hackers know the system and possible vulnerabilities. And these vulnerabilities we usually create ourselves, and not WordPress core.

What we can do efficiently against hacking attempts is a separate blog post, but here is one of the most important tips: look for a good hosting platform. It's worth spending a little more money here! A good hosting also has a good service team that will help you quickly if there is a problem. Everything else is, as I said, outside the scope of what I want to write here. But know: if you do it right, it is very hard for hackers to get to your data or to exploit your website.

When it comes to speed, I recommend this slightly angry video made by Alex Young. It pretty much says it all.

{% youtube 'rhWhBi7W14A', 'How To Make A SLOW WordPress Site' %}

Also, WordPress is easy to optimize for SEO, has eCommerce possibilities, and thanks to the plugin "Advanced Custom fields" great flexible content fields.

The community is huge, and I have yet to encounter a problem that wasn't either already solved before or that I wasn't helped with instantly.

Finally, a very important point: WordPress has been around for a long time, many have already worked with the WordPress backend and are familiar with it.

## What’s there to dislike?

The following thoughts refer to working with WordPress in the back-end _and_ front-end, not to a solution as headless CMS.

### You have to do it their way

With WordPress, you have to do it their way. It is not like Jamstack, where everything is up to you, adding services, using programming languages and methods as you like. With WordPress, you're in a closed ecosystem, the "monolithic system", that Jamstack supporters often refer to. I rather like the non-technical definition: "formed from a single large block of stone". 😂

In terms of WordPress, this means that it serves as a "one-size-fits-all" solution for the front-end and back-end of a website. This monolithic architecture limits the options for building a website and restricts us to the options that WordPress supports.

Instead of selectively adding elements, sometimes you have to actively exclude things you don't need. And I feel like [Block Themes](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/) are going this way even more than classic PHP themes. I have to work with the classes that are being generated, and I also have to opt out of scripts like the `wp-block-navigation-view` (responsible for the behavior of menus) if I want to implement my own behavior (without unnecessary extra scripts being loaded. Every kilobyte counts). I talk in more detail later in the text about my first impressions with this new model of WordPress.

### Page builders and bloated themes

I'm sure page builders (Elementor, Visual Composer...) make a lot of sense in some contexts, and most importantly, they allow many to enter the world of web development on their own, following the principle of "no code". However, as a developer with a particular focus on performance, I am not using them.

Everything that adds an unnecessary weight to a web page is something I try to avoid. That brings me to the next thing I never really got friendly with: Themes that want to serve every possible use case.

I have talked to a lot of people who bought a theme and then they spent countless hours trying to configure everything.

Not always, but often, it is a mess. Not because they haven't done it right. But because some themes try to solve every problem, to serve every industry. I have seen a theme/plugins combination that loaded more than 100 different script files. I didn't count the stylesheets. The page took more than 10 seconds to load on my fibre internet connection.
You can get a lot out of these pages using a CDN, optimizing assets, enabling caching and so on, but it's much better to have a customized theme that only includes what you really need.

Here, of course, you have to be fair: neither third-party page builders nor third-party themes are the responsibility of WordPress.

## How I am working with WordPress

Transforming WordPress Sites to Jamstack or using WordPress as a headless CMS is what I most concentrated on recently.

When working natively with WordPress, I’m making sure it is as fast as possible by writing vanilla JS only where necessary - JavaScript is often required to guarantee accessibility. Also, I’m using a build pipeline to only push optimized assets to production.

==I try to make everything as easy and obvious as possible.== I leave clues and instructions in the editable sections and, depending on the scope of the project, I also create introduction videos where I explain every important detail of the website.

I value structure and order. I want to be able to understand my own themes in the future, but I also want subsequent developers to get along with the code I wrote.

### Plugins I usually install

I only install plugins from large, secure companies that provide reliable and immediate patches as soon as a security vulnerability or an incompatibility with the latest WordPress version appears. Everything else I prefer to regulate myself, directly in the theme or as a custom made plugin. Basically, the website should get by with as few plugins as possible.

[ACF Pro](https://www.advancedcustomfields.com/pro/) is on every Website I build. So is [Yoast SEO](https://yoast.com/wordpress/plugins/seo/), [WP Rocket Pro](https://wp-rocket.me/es/) and [Siteground Security](https://www.siteground.com/blog/sg-security/).

If I’m going headless it’s either [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/), or [WP GraphQL](https://www.wpgraphql.com/) in combination with WPGraphQL for Advanced Custom Fields.

I use [Query Monitor](https://es.wordpress.org/plugins/query-monitor/) to visualize hooks, debug and improve performance.

## What I think about Full Site Editing

In a nutshell, FSE is the extension of the [Gutenberg Editor](https://wordpress.org/gutenberg/) to the entire website. According to this principle, the entire theme is customizable directly in the backend using blocks. It's basically a built-in site builder.

I can't say too much about it, since I still have to really dive into it. Considering it's based on JavaScript and has a component like concept, I might eventually like developing with it. WordPress won't go back to the old ways and every new version will enforce block themes. As of version 6.1 there is the possibility to opt in to fluid typography. That sounds great!

A template part for the `header.html` looks like that:

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

As I mentioned, I haven't really got to grips with it yet. My first impression is that it rather limits me as a developer.

Nevertheless - I have made up my mind to learn it, if only to really understand it, and not to criticize it without justification. The fact that I don't want to work with it at the moment reflects my current level of knowledge - I can't in good conscience offer services in an area that I don't completely control.

## What about Gutenberg?

I think the Gutenberg editor is great for experienced content editors, and for anyone who is willing to learn a bit about it. You can do a lot of different layouts and create really interesting posts (don't overdo copying stuff from the [WordPress pattern library](https://wordpress.org/patterns/) though, as this adds on to the page weight).

On the other hand, some clients are notoriously afraid of breaking things. There’s a lot you can do with the Gutenberg editor - it can be a little overwhelming. Some WordPress users want the good old "Microsoft Word" editor back. And I have to say, I can understand that (by the way, there are also wonderful CMS in the Jamstack world that have a very simple editing experience - I'd be happy to tell you more about them).

## So what's the right technique to build a theme nowadays?

It seems like old and new techniques are clashing together. There are a lot of ways to build with WordPress: block themes, the classic PHP driven templating or WordPress as a headless CMS feeding a front-end of our choice via its REST API or WPGraphQL.

I wouldn't worry too much about that: ==Whatever is right for the project==. No visitor cares what the website was built with, and most customers don't care either. I always communicate exactly what I plan to do and recommend, and why I think this is the best solution.
In the end, what really matters is the quality of the product.

## Conclusion

Back when I discovered WordPress, it offered me an idea of what Developer Experience would mean in the future. Today, more than 40% of all websites depend on WordPress[^2].

It's a huge construct with a lot of responsibility that can't do everything differently and better in the next version, like modern meta-frameworks such as [Astro](https://astro.build/). And because WordPress has to move so slowly, a small fraction of it is only just arriving in the JavaScript and React world we know (and loathe 😛) today.

### What is WordPress to me?

To me, WordPress is one thing above all: A free, very flexible CMS that many of the people I work with already know. I am less interested in the fact that a theme can be replaced at any time by another theme.

I develop a website especially for the needs of the customer. It should be fast, accessible and secure, and ideally last a few years if well maintained.

This custom made website might or might not use WordPress as a CMS. That depends on the project and is something my clients and I decide together.

[^1]: https://patchstack.com/whitepaper/the-state-of-wordpress-security-in-2021
[^2]: https://w3techs.com/technologies/details/cm-wordpress
