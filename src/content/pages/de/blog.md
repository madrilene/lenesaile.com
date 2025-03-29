---
title: Blog
permalink: '/{{ lang }}/blog/{% if pagination.pageNumber >=1 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
key: 'blog'
description: 'Ich schreibe vor allem über Dinge, die mit Webentwicklung zu tun haben. Projekte, Ansätze und Beobachtungen, Dinge, die ich gelernt habe oder für wichtig halte.'
layout: blog
pagination:
  data: collections.blog_de
  size: 6
---
