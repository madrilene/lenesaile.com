---
title: 'Adopción de dimensiones de rejilla de hermanos gracias a subgrid'
description: 'Lo que quiero conseguir es la alineación vertical de los hermanos: las dimensiones dinámicas de los elementos dentro del <header> landmark deberían implementar la plantilla de columna de rejilla definida en el elemento <body>, para que los elementos hermanos puedan alinearse a ella.'
discover:
  description: 'Alineación vertical de hermanos: las dimensiones dinámicas de los elementos dentro del <header> landmark deben implementar la plantilla de columna de cuadrícula definida en el elemento <body>, de modo que los elementos hermanos puedan alinearse con ella.'
category: blogpost
key: 'subgrid-siblings'
date: 2024-01-02 11:30:00
lastEdit:
---

Subgrids utiliza las pistas de rejilla de una rejilla predecesora para alinear sus elementos de rejilla. Por ejemplo, puede crear varias columnas en el elemento `<body>` y pasarlas "hacia abajo", sin importar la profundidad. Lo más importante aquí: El sistema de rejilla que se pasa hacia abajo **debe** estar en un predecesor. Subgrid busca en el árbol DOM el elemento más cercano que defina una plantilla de columna o fila (`grid-template-columns` o `grid-template-rows`) que _no_ esté marcado como subgrid.

Así que si creo un layout en el elemento `<body>`, puedo transferirlo a los landmarks `<header>`, `<main>` y `<footer>`, que entonces afecta a sus hijos.

{% include "partials/toc.njk" %}

## ¿Podemos definir las dimensiones de la rejilla en un elemento hermano?

Lo que quiero conseguir es la alineación vertical de los hermanos: las dimensiones dinámicas de los elementos dentro del `<header>` landmark deberían implementar la plantilla de columna de rejilla definida para el elemento `<body>`. Las líneas de la cuadrícula deben "anidarse" contra el logotipo SVG y el nombre del sitio web junto a él. Los elementos dentro de `<main>` y `<footer>` deben poder participar en esta cuadrícula colocándose a lo largo de las dimensiones del logotipo y el nombre de la página.

El título debe abarcar toda la columna, y quiero que el contenido del elemento `<section>` comience a la altura del título inicial de la página. El `<nav>` en el `<footer>` debe estar exactamente donde termina el título de la página.

Grid y subgrid no son temas fáciles de entender. Por eso intento llegar al resultado en detalle y paso a paso.

El código HTML es el siguiente:

{% raw %}

```html
<body class="wrapper flow">
  <header>
    <a class="logo" href="#">
      <svg
        viewBox="0 0 100 100"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
      <span>Marzipan</span>
    </a>
    <nav class="cluster" aria-label="Main">
      <ul class="cluster" role="list">
        <li>
          <a href="#">Cake</a>
        </li>
        <li>
          <a href="#">Ice cream</a>
        </li>
        <li>
          <a href="#">Candy</a>
        </li>
      </ul>
    </nav>
  </header>

  <main class="flow">
    <h1>Cupcake cake candy chupa chups tart marzipan chocolate bar</h1>
    <section>
      <p>
        Halvah shortbread topping muffin cookie gingerbread bear claw. Cheesecake oat cake
        caramels powder powder cookie jelly-o. Bonbon bonbon chupa chups chupa chups
        croissant. Dessert marshmallow sesame snaps liquorice jelly beans powder
        marshmallow cookie. Candy shortbread wafer chocolate bar chocolate tiramisu sesame
        snaps..
      </p>
      <p>
        Shortbread sesame snaps dragée brownie pastry bear claw soufflé. Tootsie roll cake
        sugar plum candy jelly beans biscuit. Macaroon chupa chups bonbon cookie macaroon.
        Croissant croissant jelly ice cream jelly-o tootsie roll shortbread chocolate bar.
      </p>
    </section>
  </main>

  <footer>
    <p class="copyright">© 2024</p>
    <nav aria-label="Complementary">
      <ul class="cluster" role="list">
        <li>
          <a href="#">Imprint</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
      </ul>
    </nav>
  </footer>
</body>
```

{% endraw %}

## El sistema de rejilla

El sistema de rejilla se define para el elemento `<body>`. Utilizo nombres implícitos cuando configuro la rejilla para poder referirme a ellos fácilmente más tarde:

```css
body {
  display: grid;
  grid-template-columns:
    [full-start] min-content
    [logo-text-start] min-content
    [logo-text-end] 1fr
    [full-end];
  grid-template-rows:
    [header] auto
    [main] 1fr
    [footer] auto;
}
```

Las propiedades `grid-template-columns` y `grid-template-rows` crean vías de cuadrícula explícitas: las columnas de la cuadrícula deben envolver firmemente el logotipo SVG y luego alinearse con el título del sitio web. La propiedad `min-content` lo hace por nosotros: [representa la anchura mínima real del contenido](https://developer.mozilla.org/en-US/docs/Web/CSS/min-content).
Esta pista de cuadrícula será tan pequeña como el elemento de contenido más ancho de esta columna. Así que tenemos que asegurarnos de que sólo el SVG y el título de la página hacen esto.

El resto del espacio disponible se reserva para el menú, que queda asegurado por la unidad `fr`.

Las líneas explícitas especifican que el encabezado y el pie de página deben tener una altura determinada por su contenido, mientras que la parte principal debe ocupar el espacio restante. Esto sitúa el `<footer>` en la parte inferior de la ventana gráfica. Para evitar que los elementos de `<main>` se dividan de forma extraña cuando hay poco contenido, también establecí la regla `main {place-content: start;}`.

Sin un subgrid, los `landmarks` ahora se atascan en las pistas que tienen asignadas.

{% set slug = "LYapGMy" %}
{% set caption = "Herencia de pistas de rejilla de un hermano - 1" %}
{% include "partials/codepen.njk" %}

Podemos contrarrestar esto haciendo que ocupen todo el ancho de la columna:

```css
body > * {
  grid-column: 1/-1;
}
```

Pero en lugar de utilizar la notación `1/-1` para toda la anchura, también podemos utilizar nuestro mecanismo de nomenclatura.
Las líneas con nombre crearon un área con nombre, que ahora puedo referenciar como `full`.

```css
body > * {
  grid-column: full;
}
```

Las columnas de la plantilla de rejilla que se definieron en el elemento `<body>` deben ser adoptadas ahora por los tres hijos del elemento `<body>`.

```css
body > * {
  grid-column: full;
  display: grid;
  grid-template-columns: subgrid;
}
```

Ya no son los propios landmarks los que se colocan en la cuadrícula, sino _sus hijos_, como si el diseño de la columna de la cuadrícula estuviera definido en los propios landmarks. No se trata simplemente de una copia del valor, sino que los tres elementos utilizan literalmente las pistas de cuadrícula del cuerpo.

Ahora los hijos de los tres landmarks definen las dimensiones de la rejilla, pero es el elemento equivocado el que define la anchura: según `min-content`, la palabra más larga del elemento "heading" dentro de `<main>` define ahora las dimensiones de la primera zona de la rejilla.

{% set slug = "LYapGaL" %}
{% set caption = "Herencia de trazas de cuadrícula de un hermano - 2" %}
{% include "partials/codepen.njk" %}

Los tres landmarks tienen sólo dos hijos, por lo que la tercera columna está vacía.

Liberemos primero a los hijos del elemento `<main>` de la tarea de determinar las dimensiones de la rejilla. Deben extenderse por todo el ancho disponible de la envoltura, lo que en nuestro caso sólo afecta al elemento H1, ya que todo lo que hay en el elemento `<section>` debe alinearse donde comienza el título del sitio web.

```css
main > * {
  grid-column: full;
}

main > section {
  grid-column: logo-text-start / full-end;
}
```

{% set slug = "YzgywMY" %}
{% set caption = "Herencia de trazas de cuadrícula de un hermano - 3" %}
{% include "partials/codepen.njk" %}

**¡Casi!**

Todavía falta un último paso, a saber, `.logo` con sus dos hijos también debe heredar las columnas de la rejilla de planos.

Sin embargo, debe extenderse desde `full-start` hasta `logo-text-end`.

```css
.logo {
  grid-column: full-start / logo-text-end;
  display: grid;
  grid-template-columns: subgrid;
}
```

Saltamos varios niveles, por así decirlo, hasta que finalmente permitimos a los hijos de `.logo` definir las dimensiones, que ahora podemos pasar a los hermanos de `<header>` y sus hijos.

## Colocaciones finales en la rejilla

He establecido un punto de ruptura para el elemento `<nav>` en el `<header>` de forma que en pantallas pequeñas quede alineado con el nombre de la página en la segunda línea y en pantallas más anchas ocupe el área entre el final del nombre de la página y el final de la envoltura:

```css
header > nav {
  grid-column: logo-text-start / full-end;
}

@media (min-width: 30em) {
  header > nav {
    grid-column: logo-text-end / full-end;
  }
}
```

Por último, el párrafo del `<footer>` debe abarcar el ancho del nombre del sitio. Esto se consigue con otra área denominada `logo-text`.
Esto hace que el siguiente `<nav>` ocupe el espacio restante:

```css
footer > p {
  grid-column: logo-text;
}
```

{% set slug = "RwdWrap" %}
{% set caption = "Herencia de trazas de cuadrícula de un hermano - final" %}
{% include "partials/codepen.njk" %}

Ahora tenemos un layout en el que la rejilla está definida en el `<body>`, pero sólo está realmente implementada por los hijos del `<header>`.

## Notas

Más abajo en el CSS encontrarás todos los pequeños ajustes que he hecho, las clases `.cluster` y `.flow` vienen de las primitivas de layout de [every-layout.dev](https://every-layout.dev/), el tipo de fluido y las escalas de espacio fueron calculadas con la ayuda de [utopia.fyi](https://utopia.fyi/).

Cathy Dutton ya tuvo la idea de utilizar una columna de rejilla padre flexible para la alineación vertical entre hermanos en un artículo publicado en [css-tricks.com](https://css-tricks.com/achieving-vertical-alignment-thanks-subgrid/#aa-can-grid-help-us) en 2020.

Gracias a la [referencia de Bob Monsour](https://indieweb.social/@bobmonsour/111686716289873152) al artículo de Ryan Mulligan <span lang="en">"[Horizontal Scrolling in a Centered Max-Width Container](https://ryanmulligan.dev/blog/x-scrolling-centered-max-width-container/)"</span>, he encontrado un [artículo de Anna Monus](https://www.annalytic.com/css-subgrid-vs-nested-grid.html) que explica las diferencias entre las subcuadrículas y las cuadrículas anidadas (`grid-template-columns: subgrid;` y `grid-template-columns: inherit;`).
Merece la pena leerlo en este contexto.
