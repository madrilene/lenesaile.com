---
title: 'Algunas notas personales sobre WordPress en 2022'
description: 'En 2007, descubrí WordPress. Nunca dejó de ser una gran solución para páginas web complejas y personalizadas, por lo que todavía lo estoy usando, 15 años después.'
category: blogpost
key: 'wordpressblog'
date: 2022-10-26
lastEdit: 2023-02-21
image: './src/assets/images/blog/wordpress-notes.jpg'
alt: 'El logo de WordPress con algo de código php en el fondo.'
youtube: true
cta:
  title: '¿Quieres una página web con WordPress?'
  desktop: 'Llevo muchos años trabajando con WordPress. Sin embargo, no podré (no quiero 😇) ayudar con temas premium, constructores de páginas o problemas de plugins.'
  lead: 'Trabajo con WordPress utilizando la plataforma [Codeable](https://app.codeable.io/tasks/new?ref=ebTXq&preferredContractor=109033).'
---

En 2007 buscaba un CMS que tuviera sentido para mí. Tras probar [Joomla](https://www.joomla.org/) y [TYPO3](https://typo3.org/) (y odiarlo), descubrí [WordPress](https://wordpress.org/). Fue una revelación.

Sigo pensando que es una gran solución para páginas web complejas. Es extremadamente potente y personalizable, y no me siento demasiado limitada como desarrolladora para crear cualquier cosa que tenga en mente. Sin embargo, algunos desprecian el CMS, diciendo que es inseguro e hinchado. Me gustaría compartir brevemente mis pensamientos personales sobre el estado actual de WordPress, y por qué todavía me gusta usarlo.

{% include "partials/toc.njk" %}

## Lo que me gusta de WordPress

### WordPress es gratuito, seguro y rápido

WordPress es de uso completamente gratuito y, si no la lías, es seguro y rápido. El otro día leí que ==El núcleo de WordPress es responsable de sólo el 0,6% de las vulnerabilidades, el otro 99,4% son hechas por plugins y temas==. [^1]

Las páginas web hechas con WordPress pueden ser hackeados. Eso es un hecho. Pero, también pueden ser hackeados páginas que usaon otros sístemas. Podemos decir igualmente que páginas web pueden ser hackeados. Lo que ocurre es que muchísimas páginas web utilizan WordPress. Los hackers conocen el sistema y las posibles vulnerabilidades. Y estas vulnerabilidades las solemos crear nosotros, y no el núcleo de WordPress.

Lo que podemos hacer eficientemente contra los intentos de hackeo es una entrada de blog por sí misma, pero aquí va uno de los consejos más importantes: busca una buena plataforma de alojamiento. ¡Vale la pena gastar un poco más de dinero aquí! Un buen hosting también tiene un buen equipo de servicio que te ayudará rápidamente si hay un problema. Todo lo demás está, como he dicho, fuera del alcance de lo que quiero escribir aquí. Pero tienes que saber: Si lo haces bien, es muy difícil que los hackers lleguen a tus datos o exploten tu sitio web.

En relación a la velocidad, recomiendo este vídeo un poco enfadado realizado por Alex Young. Lo dice todo.

{% youtube 'rhWhBi7W14A', 'How To Make A SLOW WordPress Site' %}

Además, WordPress es fácil de optimizar para SEO, tiene posibilidades de eCommerce, y gracias al plugin "Advanced Custom fields" campos de contenido flexibles.

La comunidad es enorme, y todavía no me he encontrado con un problema que no estuviera ya resuelto antes o con el que no me ayudaran al instante.

Por último, un punto muy importante: WordPress existe desde hace mucho tiempo, muchos de mis clientes ya han trabajado con el backend de WordPress y están familiarizados con él.

## ¿Qué es lo que no me gusta?

Las siguientes reflexiones se refieren al trabajo con WordPress en el back-end y el front-end, es decir, no a una solución como CMS sin cabeza.

### Tienes que hacerlo a su manera

Con WordPress, tienes que hacerlo a su manera. No es como Jamstack, donde todo depende de ti, añadiendo servicios, utilizando lenguajes de programación y métodos a tu gusto. Con WordPress, estás en un ecosistema cerrado, el "sistema monolítico" que les gusta mencionar a los defensores de Jamstack. Me gusta la definición no técnica: "formado por un gran bloque de piedra". 😂

En términos de WordPress, esto significa que sirve como una solución "única" para el front-end y el back-end de un sitio web. Esta arquitectura monolítica limita las posibilidades de construir una página web y nos restringe a las opciones que soporta WordPress.

En lugar de añadir elementos de forma selectiva, a veces hay que excluir activamente lo que no se necesita. Y tengo la sensación, que los nuevos [Temas de bloque](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/) van por este camino incluso más que los temas clásicos de PHP. Hay que trabajar con las clases CSS que se generan, y también tengo que desactivar los scripts como `wp-block-navigation-view` (responsable del comportamiento de los menús) si quiero implementar mi propia solución (sin cargar scripts adicionales innecesarios. Cada kilobyte cuenta). Más adelante hablo con más detalle de mis primeras impresiones con este nuevo modelo.

### Page builders y temas hinchados

Estoy segura de que los page builders (Elementor, Visual Composer...) tienen mucho sentido en algunos contextos y, sobre todo, permiten a muchos entrar en el mundo del desarrollo web por su cuenta, siguiendo el principio de "no code". Sin embargo, como desarrolladora con un enfoque particular en el rendimiento, no uso page builders.

Todo lo que añade un peso innecesario a una página web es algo que intento evitar. Eso me lleva a la siguiente cosa con la que nunca me he hecho amigo: Los temas que quieren servir a todos los casos de uso posibles.

He hablado con muchas personas que compraron un tema y luego pasaron incontables horas tratando de configurar todo.

No siempre, pero a menudo, es un desastre. No porque no lo hayan hecho bien. Sino porque algunos temas tratan de resolver todos los problemas, de servir a todos los sectores. He visto una combinación de tema/plugins que cargaba más de 100 archivos de script diferentes. No he contado las hojas de estilo. La página tardó más de 10 segundos en cargarse en mi conexión de internet de fibra. Por supuesto, se puede sacar mucho más rendimiento a estas páginas utilizando un CDN, optimizando los imagenes, activando la caché y demás, pero es mucho mejor tener un tema personalizado que sólo incluya lo que realmente necesitas.

Aquí, por supuesto, hay que ser justos: ni los page builders de terceros ni los temas de terceros son responsabilidad de WordPress.

## Cómo estoy trabajando con WordPress

Transformar sitios de WordPress a Jamstack o usar WordPress como un CMS sin cabeza es en lo que más me he hecho últimamente.

Al trabajar de forma nativa con WordPress, me estoy asegurando de que sea lo más rápido posible mediante el uso de JavaSCript sólo cuando sea necesario - se necesita JavaScript por ejemplo para garantizar la accesibilidad. Además, estoy trabajando con un "build pipeline" para utilizar sólo archivos optimizados en la estructura final del tema.

==Trato de hacer todo lo más fácil y obvio posible.== Dejo pistas e instrucciones en las secciones editables y, dependiendo del alcance del proyecto, también creo videos de introducción donde explico cada detalle importante de la página.

Valoro la estructura y el orden. Quiero ser capaz de entender mis propios temas en el futuro, pero también quiero que los desarrolladores posteriores entiendan el código que escribí.

### Plugins que suelo instalar

[ACF Pro](https://www.advancedcustomfields.com/pro/) está en cada página web que construyo. También [Yoast SEO](https://yoast.com/wordpress/plugins/seo/), [WP Rocket Pro](https://wp-rocket.me/es/) y [Siteground Security](https://www.siteground.com/blog/sg-security/).

Si convierto WordPress en un headless CMS es [ACF a REST API](https://wordpress.org/plugins/acf-to-rest-api/), o [WP GraphQL](https://www.wpgraphql.com/) en combinación con WPGraphQL para Advanced Custom Fields.

Uso [Query Monitor](https://es.wordpress.org/plugins/query-monitor/) para visualizar los hooks, depurar y mejorar el rendimiento.

## Lo que pienso sobre Full Site Editing

En pocas palabras, FSE es la extensión del [Editor Gutenberg](https://wordpress.org/gutenberg/) a todo la página web. Según este principio, todo el tema es personalizable directamente en el backend utilizando bloques. Es básicamente un constructor de sitios incorporado.

No puedo decir demasiado sobre esto, ya que todavía tengo que sumergirme realmente en el tema. Teniendo en cuenta que se basa en JavaScript y tiene un concepto similar al de los componentes, puede que al final me guste desarrollar con él. WordPress no volverá a las andadas y cada nueva versión reforzará los temas de bloque.

Un "template part" para el `header.html` se ve así:

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

Sin duda es algo a lo que hay que acostumbrarse. Es como escribir código a base de comentarios.

Como he dicho, todavía no me he acostumbrado. Mi primera impresión es que me limita un poco como desarrolladora.

Sin embargo, me he propuesto aprenderlo, aunque sólo sea para entenderlo de verdad, y no para criticarlo sin justificación. El hecho de que no quiera trabajar profesionalmente con temas de bloque en este momento refleja simplemente mi nivel actual de conocimientos: no puedo en conciencia ofrecer servicios en un área que no controlo completamente.

## ¿Qué pasa con Gutenberg?

Creo que el editor Gutenberg es genial para los editores de contenido con experiencia, y para todos aquellos que quieran invertir algo de tiempo en aprenderlo. Puedes hacer un montón de diseños diferentes y crear entradas realmente interesantes (aunque no te excedas copiando cosas de la [biblioteca de patrones de WordPress](https://wordpress.org/patterns/), ya que esto añade peso a la página).

Por otro lado, algunos clientes tienen mucho miedo de romper cosas. Se puede hacer muchísimo con Gutenberg - y eso puede ser un poco abrumador. Algunos usuarios de WordPress sólo quieren el viejo editor de "Microsoft Word" de vuelta. Y tengo que decir que puedo entenderlo (por cierto, también hay maravillosos CMS en el mundo de Jamstack que tienen una experiencia de edición muy simple - estaré encantada de contarte más sobre ellos).

## Entonces, ¿cuál es la técnica correcta para construir un tema hoy en día?

Parece que las técnicas antiguas y las nuevas chocan entre sí. Hay muchas maneras de construir con WordPress: Temas de bloque, la clásica plantilla impulsada por PHP o WordPress como CMS sin cabeza alimentando un front-end que elegimos a través de su REST API o WPGraphQL.

Yo no me preocuparía demasiado por eso: ==Lo que sea adecuado para el proyecto.== A ningún usuario le importa con qué se construyó el sitio web, y a la mayoría de los clientes tampoco les importa. Por supuesto, comunico exactamente lo que recomiendo y por qué creo que es la mejor solución para el cliente según mi experiencia.
Pero al final, lo que realmente importa es la calidad del producto.

## Conclusión

Cuando descubrí WordPress, me ofreció una idea de lo que iba a significar la "experiencia del desarrollador" en el futuro. Hoy en día, más del 40% de todos las páginas web dependen de WordPress[^2].

Es enorme y tiene mucha responsabilidad. No puede hacer todo de manera diferente y mejor en la próxima versión, al igual que los meta-frameworks modernos como [Astro](https://astro.build/). Y como WordPress tiene que moverse tan lentamente, una pequeña fracción apenas está llegando al mundo de JavaScript y React que conocemos (y rechazamos 😛).

### ¿Qué es WordPress para mí?

Para mí, WordPress es una cosa por encima de todo: Un CMS gratuito y muy flexible que muchos de mis clientes ya conocen. Me interesa menos el hecho de que un tema pueda ser sustituido en cualquier momento por otro.

Desarrollo un sitio web especialmente para las necesidades del cliente. Debe ser rápido, accesible y seguro, e idealmente durar unos cuantos años si se mantiene bien.

Esta página web a medida puede o no utilizar WordPress como CMS. Eso depende del proyecto y es algo que mis clientes y yo decidimos juntos.

[^1]: https://patchstack.com/whitepaper/the-state-of-wordpress-security-in-2021/
[^2]: https://w3techs.com/technologies/details/cm-wordpress
