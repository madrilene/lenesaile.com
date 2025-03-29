---
title: Blog
permalink: '/{{ lang }}/blog/{% if pagination.pageNumber >=1 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
key: 'blog'
description: "I'm writing about things related to web development. Projects, approaches and observations, things I have learned or consider important."
layout: blog
pagination:
  data: collections.blog_en
  size: 6
---
