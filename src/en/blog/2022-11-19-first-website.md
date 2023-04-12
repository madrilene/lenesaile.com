---
title: 'My first website'
description: "A funny thing happened today. The very first website I made as a freelancer, in late 2008, caught up with me again. I haven't seen or heard from it in 14 years, and now it's back."
category: blogpost
key: 'firstwebsite'
date: 2022-11-19
cta:
  title: 'You want a WordPress site?'
  desktop: "I've learned a thing or two since 2008. I still make WordPress sites that are simple and long-lasting, custom made, secure and fast."
  lead: "I'm working with WordPress using the [Codeable platform](https://app.codeable.io/tasks/new?ref=ebTXq&preferredContractor=109033)."
---

A funny thing happened today. The very first website I made as a freelancer, in late 2008, caught up with me again. I haven't seen or heard from it in 14 years, and now it's back.

The reason it came back into my life was, of course, that there was an error. A "forced" update to PHP 8.1 on the server caused the website to fail, so they thought of me, the creator, to fix it.

This picture is familiar to every WordPress developer:

{% imagePlaceholder "./src/assets/images/blog/ruefetto-php-error.jpg", "", "", "", "Screenshot of many lines of PHP errors caused by a incompability with PHP 8.1", "Hello darkness my old friend." %}

Under what felt like 1 meter of PHP error messages, it then appeared, exactly as I had left it well over a decade ago.

## How it came to life

It was 2008 and I had only recently registered my freelance business with the German authorities in the southern city Freiburg im Breisgau (You may be familiar with it as the home town of the [Smashing Magazine](https://www.smashingmagazine.com/)). One evening I was visiting a jazz cellar and got into a conversation with a musician. It turned out that they were looking for a logo, a flyer and a website for their regular jazz sessions. I offered myself immediately! And this is how I landed my first job, if I remember correctly, paid with 400 euros for everything.

It became a WordPress site, because it had to be maintained regularly with pictures and news. We were somewhere between WordPress version 2.5 and 2.7 and it had very little in common with what you may know today. The WordPress menus, for example, were introduced two years later with version 3.0.

## A simple theme

Back then, everything was done with "hacks". WordPress was a pure blogging platform, and if you wanted to make some kind of CMS out of it, you had to do a lot of fiddling around.

There wasn't much semantics back then, but all those divs really were a big step up from the table layouts.

I had built the main menu like this at that time:

```php
<div id="menu">
  <ul>
    <?php
    $homeActive = true;
    foreach ($_GET as $key => $value) {
      if ($key != "") {
        $homeActive = false;
      }
    }
    ?>
    <li class="page_item<?php if (is_home()) {print(" current_page_item");} ?>"><a href="<?php echo get_option('home'); ?>" title="Home" id="subitemmenu0">Home</a></li>
    <?php wp_list_pages('title_li=&depth=1&include=51,53,18,289' ); ?>
    </ul>
</div>
```

I guess I didn't really know what I was doing. What is that `$homeActive` variable trying to achieve up there?
The WordPress function `is_home()` has been around since version 1.5.0, and in that case I apparently wanted it to add the class `current_page_item` to "Home" if active, so I could show a visual indicator of where we are. That didn't work! Surely I lost some hours trying to figure out why, until I finally gave up.

{% aside %}There are some counterintuitive quirks in WordPress which, similar to JavaScript, you can't easily fix in future versions, as this would break sites. `is_home()` doesn't actually refer inconditionally to your home page, but returns `true` if the site’s "Front page displays" Reading Settings are set to "blog posts" instead of a static page.{% endaside %}

I then hardcoded the links to the pages with IDs 51, 53, 18 and 289 into it.
Finished is the WordPress menu made in 2008!

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

Look at that! No one understands that anymore. Nobody understood that back then either.

I found some more hardcoded elements, for example in the footer. I guess I didn't know how to show this info otherwise. Did we have widgets already?

```html
<div id="footer">
  <div id="footerInnerPadding">
    Ruefetto Jazz Sessions &emsp;| &emsp; Kart&auml;userstr. 2 | Granatg&auml;&szlig;le 3
    | 79102 Freiburg | Jeden Donnerstag ab 21 Uhr &emsp;|&emsp;
    <a href="http://www.ruefettojazzsessions.de/impressum/">Impressum</a>
  </div>
</div>
```

I even explicitly wrote the HTML 4 entities for german umlauts!

All in all I made a very very simple theme. It gets by with a few lines of CSS, half of which isn't even needed, and some of which I cluelessly copied from somewhere. Not that I can really remember that, but I don't speak Swedish.

```css
#sidebar .bloggy-meddelande {
  /* Stilen på själva inlägget */
  display: block;
  border: 1px solid #e1e1e1;
  background-color: #f8f8f8;
  padding: 2px;
}
```

This is also a nice one:

```css
#menu a,
#menu a:link,
#menu a:active,
#menu a:visited,
#menu a:focus,
#menu a:hover {
  text-decoration: none;
  border: 0px;
  height: 30px;
  line-height: 30px;
  padding: 15px 15px 15px 15px;
  /*_padding:0px 15px 0px 15px;  there are some things IE doesn't understand about padding */
  white-space: nowrap;
}
```

😱... but look at that comment! 😂

JavaScript? Non-existent. I didn't know how to write it at that time, and it really wasn't necessary at all.

## We didn't need any plugins

The very best: two plugins. **Two!**

Three, if you count the _Hello Dolly_ plugin that shipped with WordPress for a long time.

There remain Akismet and TinyMCE Advanced, which apparently was heavily used until recently to change the default color of the content to `#ff0004` (websafe!!).

## What had happened in all those years?

I remember updating WordPress for free a few times in the beginning. It was exhausting, because the host required a manual entry of FTP credentials in the WordPress backend, for each and every update. Then at some point I wanted a tiny monthly flat fee for it. That didn't work out, so we, the website and I, went our seperate ways. Mine was marked by personal development, fates and upheavals, the way of the website: absolutely unmoved.

The admin of the website (who was still set as "admin"!) happily used the home page and the gallery page as a blog replacement and apparently didn't miss anything at all.

The big wave of Responsive Web Design came, and while the vast majority of sites gradually got media querys, my site didn't care. It came in handy I made the website so freaking narrow.

{% imagePlaceholder "./src/assets/images/blog/ruefetto-narrow.jpg", "", "", "", "Screenshot of the website on my screen. It only takes up about 30% of the space.", "It is quite modern! I even kept the content nicely readable between 45 to 75 characters max per line!" %}

Making websites limited to 600 to 800 pixels width was not so unusual around 2008. I could swear that it filled my monitor quite well back then.

So here it is again, 14 years of apparently error free work later. I forgot to check the exact version of WordPress running on there before deleting it, but it sure was terribly outdated. This, and _TinyMCE Advanced_, is what finally brought the site down when PHP 8.1 was activated.

I can't imagine nobody ever updated this website since 2008. Is this even possible? Were they running a compatible PHP version all that time?

Now the site has only one plugin left: Akismet. I guess it's all thanks to the simple nature of my programming back then and the absence of plugins that it had made it that far.

I have put a fresh installation of WordPress on it, replaced the docytpe-declaration with `<!DOCTYPE>` and deleted that strange `$homeActive` logic, as it did't seem to do anything but confuse. I exchanged `is_home()` with `is_front_page()` to make the current page indicator for home actually work. I deleted some redundant CSS and made it keyboard focusable again.
Everything else is as it always was. You won't believe it, but the web vitals are great.

You are welcome to visit it, but, disclaimer: Its web host makes you pay for SSL certificates with at least 2.99 euros per month. So, no SSL.

👉👉👉 www.ruefettojazzsessions.de

How many can say that their first "professional" website is still out there, in all its questionable glory? It sure was a nice encounter.
