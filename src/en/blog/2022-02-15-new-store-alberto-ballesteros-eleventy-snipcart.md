---
title: 'New store for albertoballesteros.com: Eleventy and Snipcart'
description: 'A fast and secure website - and a look and feel that reflects that! - is crucial for a shop. albertoballesteros.com is a static website based on the Jamstack method.'
seo:
  title: 'New shop for albertoballesteros.com: Eleventy and Snipcart'
  description: 'Snipcart is an e-commerce solution that allows us to add a shopping cart to a web page. This article describes how to do that with an Eleventy static site.'
category: blogpost
key: 'storealberto'
date: 2022-02-15
image: './src/assets/images/blog/shop.jpg'
alt: "Screenshot of albertoballesteros.com's shop."
cta:
  title: 'Need a fast shop?'
  desktop: 'Visitors to a shop are about to decide if they want a product and if they are willing to pay money for it. Loading times and concerns about store security can cause them to abandon that plan.'
  lead: "I'll make your store fast and secure with the Jamstack method! Send me an email to [hola@lenesaile.com](mailto:hola@lenesaile.com) and tell me about your project."
---

A fast and secure website - and a look and feel that reflects that! - is crucial for a shop. albertoballesteros.com is a static website based on the Jamstack method. If everything is done right, Jamstack pages are inherently very secure, reliable, flexible and, above all, fast.

{% include "partials/toc.njk" %}

## How can a store be integrated into a Jamstack website?

One of the many advantages of the Jamstack method is the wide range of applications and platforms that can be implemented. Depending on what a project needs, I can choose a provider that offers exactly that.

If I want to create a shop, I can choose from handful of providers that allow users to have a modern, personal and fast shopping experience.

One of the most popular providers is [Shopify](https://www.shopify.com/). You pay a small monthly fee to use it. In return, you receive a secure and easy-to-use store system with easy connections to common payment providers, marketing tools and modular scalability. The administration area where you can enter company data, add products and process orders, is something that all similar providers have in common.

For albertoballesteros.com, Shopify is too powerful. We have a manageable number of products, and the store is more of an add-on to the website.

So far, we have maintained a direct connection to Stripe for a shop function.

[Stripe Checkout](https://stripe.com/es/payments/checkout) is a secure and immediate method for completing one-off purchases or subscriptions. If we can assume that our visitor will only buy one product (for example, because there are no more products available or because she chooses a specific paid subscription), Stripe Checkout is ideal. Stripe keeps about 3% per completed purchase and offers in return a variety of currencies, invoice support, data security and encryption, etc., similar to Shopify.

On our end, however, we're going to expand the product range a bit and a shopper may want to buy more than one item at a time. And so a third vendor comes into play: [Snipcart](https://snipcart.com/).

{% aside %}**Disclaimer:** We have returned to the Stripe solution a few months after publishing this text. Not because Snipcart is not good, on the contrary. It's a great solution, especially for stores with reliable monthly sales. But if you only sell a product once in a while, [it's not really worth it](https://snipcart.com/faq#Pricing): If you sell more than $500 a month, Snipcart keeps 2% commission. If you sell less than $500 per month, Snipcart charges a flat fee of $10 per month. This also applies if you don't sell anything at all. I will also describe the Stripe integration soon on the blog.{% endaside %}

## Technical integration of Snipcart with Eleventy

Snipcart is an e-commerce solution that allows us to add a shopping cart to a web page and turn it into a store. Snipcart offers a fully customizable shopping cart, webhooks and APIs, and an intuitive administration panel.

{% imagePlaceholder "./src/assets/images/blog/snipcart-dashboard.jpg", "", "", "", "Snipcart admin panel screenshot", "Snipcart has an attractive and clear admin panel. Among other things, I can find useful information about the phenomenon of abandoned shopping carts." %}

For Snipcart, it doesn't matter what platform the website is built on. However, it works especially well with a Jamstack website. [albertoballesteros.com](https://www.albertoballesteros.com/shop) is a Jamstack page, built with the [Eleventy](https://www.11ty.dev/) static web generator.

The best thing is that the configuration of the products is done directly in the code of the web.
To do this, we first have to include a Javascript file and a CSS file.

In my project folder I have the following structure (simplified):

{% raw %}

```md
│
└───src
│ │
│ └───_data
│ │ │ shop.json
│ │ │ ...
│ │
│ └───_includes
│ │ │
│ │ └───layouts
│ │ │ base.njk
│ │ │ ...
│ │
│ │ shop.njk
│ │ ...
│ ...
```

{% endraw %}

To prevent JavaScript and CSS from being unnecessarily loaded by other pages, I specify in my base layout that it will only be included on the store page:

_base.njk:_

{% raw %}

```html
{% if snipcart %}
<link
  rel="stylesheet"
  href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
/>
<script async src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"></script>
<div hidden id="snipcart" data-api-key="YOUR_PUBLIC_API_KEY"></div>
{% endif %}
```

{% endraw %}

The store does not need product sub-pages, but lists the items directly with a short description.

Therefore, I only activate the integration in my `Nunjucks`-file for the store:

_shop.njk:_
{% raw %}

```yaml
---
title: Shop
snipcart: true
---
```

{% endraw %}

We obtain the products and their properties by means of a `json` file:

_shop.json:_

```json
{
  "products": [
    {
      "name": "Libro El verano más largo",
      "type": "Libro",
      "description": "Los textos de los que se compone este libro los escribí entre los meses de septiembre y noviembre. Lo mío es escribir canciones, grabar discos y hacer conciertos. El verano más largo son apuntes con forma de poemas que me apetecía compartir",
      "id": "libro-verano",
      "price": "12.00",
      "image": "/assets/images/shop/libro-verano.jpg"
    },
    {
      // ...
    }
  ]
}
```

Snipcart needs some data to create the products and process the purchase.
We get this data from our `shop.json` file using a loop:

{% raw %}

```html
{% for product in shop.products %}
<button
  class="snipcart-add-item"
  id="{{ product.id }}"
  data-item-id="{{ product.id }}"
  data-item-price="{{ product.price }}"
  data-item-url="/shop/"
  data-item-description="{{ product.description }}"
  data-item-image="{{ product.image }}"
  data-item-name="{{ product.name }}"
>
  add to cart
</button>
{% endfor %}
```

{% endraw %}

This `button` is enough to activate Snipcart. It requires the product name, a unique product ID, the product price, the product URL (where the "add to cart" `button`, used by your tracker when checking order completeness, is located), the product description and the product image URL.

The CSS class `snipcart-add-item` is also required for this to work.
Inside the loop I use this data to display the products in the user interface.

For the shopping cart toggle we have the following code:

```html
<button class="snipcart-checkout">see cart</button>
```

This allows us to check the status of our shopping cart without adding anything new to it.

We also provide visitors with a concise overview of the shopping cart in the product overview:

```html
Selected products: <span class="snipcart-items-count"></span> Total:
<span class="snipcart-total-price"></span>
```

Here you can always see how many products are in the basket and what the total price would be at the moment. This works with a Javascript injection.

Snipcart also looks for our language attribute in the HTML to automatically adjust the displayed language:

```html
<html lang="es"></html>
```

For the highest possible security of our websites, we set up `HTTP response header`. The Content Security Policy (CSP) header is an additional layer of security that helps detect and mitigate certain types of attacks such as cross-site scripting (XSS) and data injection attacks. We do this by specifying exactly which resources the browser can load.

For Snipcart to work, we have to enable script retrieval through Snipcart in the Content Security Policy header.

## Successful sale!

When we have achieve our first sale, the item is listed automatically within the products section. The buyer details are stored in the customer section and in the order section the transaction appears with the customer details.

{% imagePlaceholder "./src/assets/images/blog/snipcart-ventas.jpg", "", "", "", "Pantallazo del panel de administración de Snipcart", "We have sold the first copy of the book through the website! The product now appears in the Snipcart administration panel." %}

## Conclusion and recommendations

In case of albertoballesteros.com, I directly handle the creation of the products in the `json` file. However, for my clients, this would be quite cumbersome. Instead, they can enter the products and their properties in a Google sheet (Excel) and then I convert this format into a `json` file that Eleventy can process.

Each customer has individual needs. Shopify is the first choice for many because of its flexibility, ease of use and good value for money. Some large companies also use Shopify.

For Jamstack websites where the store is more of an add-on, Snipcart and Stripe are great solutions with their combination of easy setup and deep customization.

For a WordPress site, the CMS's own Woocommerce plugin is a classic. It is also possible to combine WordPress with the other store solutions.

## What is the best solution for an online store?

When making a decision, the following questions need to be answered:

- How much do you want to pay for a shop solution? Development costs and running costs (such as Shopify's monthly contribution) should be included.
- What are your technical skills and those of your team: how much do you want and can you set up yourself?
- What do you envision for the functionality and usability of the store?
- How big is or will your store be? You have to consider that for the scalability and adaptability of the platform.

Put yourself in your customers' shoes: Would you give personal data and payment information to a dubious-looking website? To a website that doesn't exude trust all around?

In the end, the work and money invested in a fast, attractive and secure store website is always worth it.
It will be reflected in sales, and the costs incurred at the beginning will soon be recovered.
