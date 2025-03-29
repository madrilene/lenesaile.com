---
title: Blog
permalink: '/{{ lang }}/blog/{% if pagination.pageNumber >=1 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
key: 'blog'
description: 'Escribo sobre cosas relacionadas con el desarrollo web. Proyectos, enfoques y observaciones, cosas que he aprendido o que considero importantes.'
layout: blog
pagination:
  data: collections.blog_es
  size: 6
---
