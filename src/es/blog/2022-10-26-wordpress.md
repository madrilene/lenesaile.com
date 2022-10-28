---
title: 'Algunas notas personales sobre WordPress en 2022'
description: 'En 2007, descubrí WordPress. Nunca dejó de ser una gran solución para páginas web complejas y personalizadas, por lo que todavía lo estoy usando, 15 años después.'
key: 'wordpressblog'
date: 2022-10-26
image: './src/assets/images/blog/wordpress-notes.jpg'
alt: 'El logo de WordPress con algo de código php en el fondo.'
cta:
  title: '¿Necesitas ayuda con WordPress?'
  desktop: 'He estado trabajando con WordPress durante muchos años. Creo temas de WordPress personalizados que son realmente rápidos y seguros.'
  lead: '¿Tienes un proyecto en mente y no sabes cómo llevarlo a cabo? ¡Hablemos de ello! Envíame un correo a [hola@lenesaile.com](mailto:hola@lenesaile.com) y cuéntame tus ideas'
---

En 2007 buscaba un CMS que tuviera sentido para mí. Tras probar [Joomla](https://www.joomla.org/) y [TYPO](https://typo3.org/) (y odiarlo), descubrí [WordPress](https://wordpress.org/). Fue una revelación. Sigo pensando que es una gran solución para páginas web complejas. Es extremadamente potente y personalizable, y no me siento demasiado limitada como desarrolladora para crear cualquier cosa que tenga en mente. Sin embargo, algunos desprecian el CMS, diciendo que es inseguro e hinchado. Me gustaría compartir brevemente mis pensamientos personales sobre el estado actual de WordPress, y por qué todavía me gusta usarlo.

{% include "partials/toc.njk" %}

## Lo que me gusta de WordPress

### WordPress es gratuito, seguro y rápido

WordPress es de uso gratuito y, si no la lías, es seguro y rápido. El otro día leí que ==El núcleo de WordPress es responsable de sólo el 0,6% de las vulnerabilidades, el otro 99,4% son hechas por plugins y temas==. [^1]

WordPress es fácil de optimizar para SEO, tiene posibilidades de eCommerce, y gracias al plugin "Advanced Custom fields" campos de contenido flexibles.

La comunidad es enorme, y todavía no me he encontrado con un problema que no estuviera ya resuelto antes o con el que no me ayudaran al instante.

Además, muchos clientes han trabajado antes con el backend de WordPress y se sienten cómodos con él.

## ¿Qué es lo que no me gusta?

Las siguientes reflexiones se refieren al trabajo con Wordpress en el backend y el frontend, es decir, no a una solución como CMS sin cabeza.

### Tienes que hacerlo a su manera

Con WordPress, tienes que hacerlo a su manera. No es como Jamstack, donde todo depende de ti, añadiendo servicios y métodos a tu gusto. Con Wordpress es más como tener desactivar cosas que no quieres, y siento que [Block Themes](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/) van por este camino incluso más que los temas clásicos de PHP. Tengo que trabajar con las clases CSS que me dan, y también tengo que eliminar los scripts como <code>wp-block-navigation-view</code> (responsable del comportamiento de los menús) si quiero implementar mi propia solución.

### Site builders, no thanks

No soy fan de los constructores de sitios (Elementor, Visual Composer...). Todo lo que añade un peso innecesario a una página web es algo que intento evitar. Eso me lleva a la siguiente cosa con la que nunca me he hecho amiga: Los temas que quieren servir para todos los casos de uso posibles, disponibles en los mercados de temas como ThemeForest.

He hablado con muchas personas que compraron un tema - gastaron dinero y luego pasaron incontables horas tratando de configurar todo.

No siempre, pero a menudo, es un desastre. He visto un tema que carga más de 100 archivos de script diferentes. No he contado las hojas de estilo CSS. La web tardó más de 10 segundos en cargar en mi conexión de internet de fibra óptica.

## Cómo estoy trabajando con WordPress

Transformar sitios de WordPress a Jamstack o usar WordPress como un CMS sin cabeza es en lo que más me he hecho últimamente.

Al trabajar de forma nativa con WordPress, me estoy asegurando de que sea lo más rápido posible mediante el uso de JS hecho a medida y sólo cuando sea necesario. Además, estoy trabajando con un "build pipeline" para utilizar sólo archivos optimizados en la estructura final del tema.

==Trato de hacer todo lo más fácil y obvio posible.== Dejo pistas e instrucciones en las secciones editables y hago videos de introducción donde explico cada detalle importante de la página.

Además, valoro la estructura y el orden. Quiero ser capaz de entender mis propios temas en el futuro, pero también quiero que los desarrolladores posteriores entiendan el código que escribí.

### Plugins que suelo instalar

[ACF Pro](https://www.advancedcustomfields.com/pro/) está en cada página web que construyo. También [Yoast SEO](https://yoast.com/wordpress/plugins/seo/), [WP Rocket Pro](https://wp-rocket.me/es/) y [Siteground Security](https://www.siteground.com/blog/sg-security/).

Si convierto WordPress en un headless CMS es [ACF a REST API](https://wordpress.org/plugins/acf-to-rest-api/), o [WP GraphQL](https://www.wpgraphql.com/) en combinación con WPGraphQL para Advanced Custom Fields.

Para las copias de seguridad manuales y la migración entre el desarrollo local, entorno de staging y el entorno de producción: [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/). Uso [Query Monitor](https://es.wordpress.org/plugins/query-monitor/) para visualizar los hooks, depurar y mejorar el rendimiento.

## Lo que pienso sobre Full Site Editing

En pocas palabras, FSE es la extensión del [Editor Gutenberg](https://wordpress.org/gutenberg/) a todo la página web. Según este principio, todo el tema es personalizable directamente en el backend utilizando bloques. Es básicamente un constructor de sitios incorporado.

No puedo decir demasiado sobre esto, ya que todavía tengo que sumergirme realmente en el tema. Teniendo en cuenta que se basa en JavaScript y tiene un concepto similar al de los componentes, puede que al final me guste desarrollar con él. WordPress no volverá a las andadas y cada nueva versión reforzará los temas de bloque.

Un "template part" para el <code>header.html</code> se ve así:

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

Como he dicho, todavía no me he acostumbrado. Pero mi impresión después de unas horas jugando con el nuevo sistema es que me limita bastante como desarrolladora acostumbrada a una gran libertad de elección.

También creo que es todavía demasiado complejo y engorroso para el cliente común que sólo quiere publicar una entrada de blog. Se ajusta más a las capacidades de los diseñadores web profesionales que hasta ahora hacían sitios web completos sólo en constructores de sitios, sin tocar el código.

### Entonces, ¿cuál es la técnica correcta para construir un tema hoy en día?

Parece que las técnicas antiguas y las nuevas chocan entre sí. Hay muchas maneras de construir con WordPress: temas en bloque, la clásica plantilla impulsada por PHP o WordPress como un CMS sin cabeza que alimenta un frontend de JavaScript a través de su REST API o WPGraphQL.

Yo no me preocuparía demasiado por eso: ==Lo que sea adecuado para el proyecto.== A ningún usuario le importa con qué se construyó el sitio web, y a la mayoría de los clientes tampoco les importa. Lo que realmente importa es la calidad del producto.

## ¿Qué pasa con Gutenberg?

Creo que el editor Gutenberg es genial para los editores de contenido con experiencia, y para todos aquellos que quieran invertir algo de tiempo en aprenderlo. Puedes hacer un montón de diseños diferentes y crear entradas realmente interesantes (aunque no te excedas copiando cosas de la [biblioteca de patrones de WordPress](https://wordpress.org/patterns/), ya que esto añade peso a la página).

Por otro lado, algunos clientes tienen mucho miedo de romper cosas. Hay mucho que puedes hacer con el editor Gutenberg - puede ser un poco abrumador. Algunos usuarios de WordPress sólo quieren el viejo editor de "Microsoft Word" de vuelta.

## Conclusión

Para mí, WordPress es una cosa por encima de todo: Un CMS gratuito y muy flexible que muchos de mis clientes ya conocen. Me interesa menos el hecho de que un tema pueda ser sustituido en cualquier momento por otro.

Desarrollo un sitio web especialmente para las necesidades del cliente. Debe ser rápido, accesible y seguro, e idealmente durar unos cuantos años si se mantiene bien.

Esta página web a medida puede o no utilizar WordPress como CMS. Eso depende del proyecto y es algo que mis clientes y yo decidimos juntos.

[^1]: https://patchstack.com/whitepaper/the-state-of-wordpress-security-in-2021/
