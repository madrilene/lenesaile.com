---
title: 'Technical details about the development of ineliagestion.com'
description: 'ineliagestion.com was developed with a new method, the Jamstack. This technique is oriented to the early days of web development, when all web pages were static.'
category: blogpost
key: 'ineliadevelopment'
date: 2021-01-11
image: './src/assets/images/blog/proyecto-inelia-gestion.png'
alt: 'Screenshot of ineliagestion.com on desktop and mobile'
cta:
  title: 'Interested in Jamstack?'
  desktop: "The Jamstack method works incredibly well for small business websites. I am really passionate about this development philosophy, so I'm happy to tell you all about it!"
  lead: "Do you have a project in mind? Let's talk about it! Send me a mail at [hola@lenesaile.com](mailto:hola@lenesaile.com)."
tags:
  - notes
---

I have added to the [projects section](/en/projects/) one of the pages I made last fall.

[Inelia Gestión](https://www.ineliagestion.com/) is a tax, labor and commercial consultancy in Madrid.

The objective was to reflect Inelia's image and work philosophy in their new website. They are an agency with a very close relationship and a very direct and clear communication policy with the client.

It was great to have Gabriel Monsalve's photos available! Original photos of the real people and facilities are invaluable and do an incredible amount to instill confidence in visitors.

## Developed with a relatively new method: Jamstack.

Jamstack is geared towards the early days of web development, when all web pages were static - pure HTML files sitting in a folder structure. In the past, you couldn't create dynamic websites, and design freedom left a lot to be desired. If you wanted to adjust something that referred to the other files, for example adding a new menu item, you had to adjust it manually in all files. However, these web pages, which made do with the bare essentials, were incredibly fast and secure.

We want to take advantage of the benefits of this classic technique!

In summary the customer has the following benefits:

1. **Very fast loading times**, because everything is loaded via a CDN. Excurso: A CDN (Content Delivery Network) is a network of servers that store caches of static content of a website in various locations around the world. When a user visits the website, the content is delivered to them from the nearest server.

2. **Increased security**, because without databases and servers there are no vulnerabilities that can be exploited by attackers.

3. **Low operating costs**, because static file hosting is cheap or even free.

4. **Fast development and seamless changes**: Web developers can focus on development without being tied to a monolithic architecture. We can develop faster and more focused.

5. **Scalability**, means that if the website is suddenly visited by many active users at the same time, the CDN compensates for this smoothly. In case of a traditional web hosting, depending on the contracted package the website would no longer be accessible, and to support a higher influx of visitors the package would have to be upgraded at a considerable cost.

## But how to solve the problem of disproportionately complicated maintenance of static websites?

We are helped by static site generators, which create the static Web site as part of a build process. They use data sources and templates to generate the individual HTML files.

ineliagestion.com uses the static site generator [Eleventy](https://www.11ty.dev/), the static files are in a private repository on [GitHub](https://github.com/) (a portal created for hosting application code) and Netlify (a hosting service for static sites) takes care of the hosting on their CDNs. Changes are submitted directly to GitHub and [Netlify](https://www.netlify.com/) through my code editor.

For the design of this website, I used Figma, a design and prototyping tool for digital projects. I implemented the design agreed with the client using the CSS framework Tailwind.

We want to load only the most essential, like classic web pages. Therefore, all elements of the web page are cached, scaled down and cleaned. All images are loaded with delay and by the most modern image formats, and unused CSS and JavaScript are removed.

Finally, I recheck the entire site for performance factors, accessibility issues, so-called best practices and search engine compatibility.

{% imagePlaceholder "./src/assets/images/blog/ineliagestion-lighthouse.jpg", "", "", "object-fit-cover", "Screenshot of Lighthouse audit results for ineliagestion.com, showing great results in all areas", "Lighthouse audit results for ineliagestion.com. Lighthouseis a tool that provides information about a page's performance, SEO, usability and accessibility.", "60vw" %}
