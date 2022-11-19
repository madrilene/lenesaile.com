---
title: 'Mi primer página web'
descripción: 'Hoy ha ocurrido algo curioso. La primera página web que hice como autónoma, a finales de 2008, me ha vuelto a atrapar. Hacía 14 años que no la veía ni sabía nada de ella, y ahora ha vuelto.'
categoría: blogpost
clave: 'firstwebsite'
fecha: 2022-11-19
youtube: false
cta:
  title: '¿Quieres una página web con WordPress?'
  desktop: 'He aprendido un par de cosas desde 2008. Sin embargo, sigo haciendo páginas web que son bastante sencillos y duraderos.'
  lead: 'Soy un (nicho) [experto en WordPress en Codeable](https://www.codeable.io/developers/lene-saile/). Si quieres una página de WordPress hecho a medida, seguro y con buen rendimiento, considera trabajar conmigo.'
---

Hoy ha ocurrido algo curioso. La primera página web que hice como autónomo, a finales de 2008, me ha vuelto a atrapar. Hacía 14 años que no la veía ni sabía nada de ella, y ahora ha vuelto.

La razón por la que volvió a mi vida fue, por supuesto, que apareció un error. Una actualización de PHP 8.1 de su servidor, ciertamente anunciada desde hace tiempo, pero estudiadamente ignorada.

La imagen es muy familiar para todos los desarrolladores de WordPress:

{% imagePlaceholder "./src/assets/images/blog/ruefetto-php-error.jpg", "", "", "", "Captura de pantalla de muchas líneas de errores PHP causados por una incompatibilidad con PHP 8.1", "Hello darkness my old friend." %}

Bajo lo que parecía un metro de mensajes de error de PHP, apareció entonces, tal y como lo había dejado hace más de una década.

## Cómo cobró vida

Corría el año 2008 y yo acababa de registrar mi negocio como autónomo ante las autoridades alemanas en la ciudad sureña de Friburgo de Brisgovia (quizá te resulte familiar por ser la ciudad de origen de la [Revista Smashing](https://www.smashingmagazine.com/)). Una noche estaba visitando una bodega de jazz y entablé conversación con un músico. Resulta que estaban buscando un logotipo, un folleto y una página web para sus sesiones regulares de jazz. Yo, por supuesto, me ofrecí inmediatamente. Y así fue como conseguí mi primer trabajo, si no recuerdo mal, pagado con 400 euros por todo.

Se convirtió en un sitio de WordPress, porque tenía que ser mantenido regularmente con fotos y noticias por personas no técnicas. Estábamos entre WordPress 2.5 y 2.7 y tenía muy poco en común con lo que se conoce hoy en día. Los menús de WordPress, por ejemplo, se introdujeron dos años después con la versión 3.0.

## Un tema sencillo

Por aquel entonces, todo se hacía con "hacks". WordPress era una plataforma de blogging pura, y si querías hacer algún tipo de CMS con él, tenías que hacer muchos chanchullos.

En aquella época había construido el menú principal así:

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

No había mucha semántica en aquel entonces, pero todos esos divs realmente eran un gran paso adelante respecto a los diseños de tabla que todavía eran omnipresentes en aquel entonces.

No sé realmente lo que estaba haciendo. ¿Qué está tratando de lograr esa variable `$homeActive` allí arriba? La función de WordPress `is_home()` existe desde la versión 1.5.0, y en ese caso parece que extrañamente me permite añadir la clase `current_page_item` al enlace activo, para poder mostrar un indicador visual de dónde estamos. Y luego codifiqué los enlaces a las páginas con IDs 51, 53, 18 y 289 en él. El menú de WordPress está terminado en 2008.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

¡Mira eso! Ya nadie entiende eso. Tampoco nadie lo entendía entonces.

Encontré algunos elementos codificados, por ejemplo en el pie de página. Obviamente no sabía cómo mostrar esta información de otra manera. ¿Ya teníamos widgets?

```html
<div id="footer">
  <div id="footerInnerPadding">
    Ruefetto Jazz Sessions &emsp;| &emsp; Kart&auml;userstr. 2 | Granatg&auml;&szlig;le 3
    | 79102 Freiburg | Jeden Donnerstag ab 21 Uhr &emsp;|&emsp;
    <a href="http://www.ruefettojazzsessions.de/impressum/">Impressum</a>
  </div>
</div>
```

En general, escribí un tema muy, muy simple. Se arregla con sólo unas pocas líneas de CSS, la mitad de las cuales estoy seguro de que ni siquiera se necesitan, y algunas de las cuales copié despistadamente de algún sitio. No es que lo recuerde, pero no hablo sueco.

```css
#sidebar .bloggy-meddelande {
  /* Stilen på själva inlägget */
  display: block;
  border: 1px solid #e1e1e1;
  background-color: #f8f8f8;
  padding: 2px;
}
```

¿JavaScript? No existe. No sabía cómo escribirlo en ese momento, y realmente no era necesario en absoluto.

## No necesitábamos ningún plugin.

Lo mejor: dos plugins. **¡Dos!**

Tres, si se cuenta el plugin _Hello Dolly_ que vino con WordPress durante mucho tiempo. Luego estaban Akismet y TinyMCE Advanced, que por lo visto se usaba mucho hasta hace poco para cambiar el color por defecto del contenido con `#ff0004` (¡seguro para la web!).

## ¿Qué había pasado todos esos años?

Recuerdo que al principio actualicé WordPress gratis unas cuantas veces. Luego, en algún momento, quise cobrar una pequeña tarifa plana mensual por ello, y eso no funcionó, así que nosotros, el sitio web y yo, tomamos caminos diferentes. El mío estuvo marcado por el desarrollo personal, los azares y las vicisitudes, el del sitio web: absolutamente impasible.

El administrador de la web (¡que por supuesto seguía siendo "admin"!) utilizaba la página de inicio y la de las fotos como sustituto del blog y aparentemente no echaba nada en falta.

Llegó la gran ola del Responsive Web Design, y mientras la gran mayoría de los sitios se fueron haciendo con los medios de comunicación, a mi sitio no le importó. Me vino muy bien que la web fuera tan jodidamente estrecha.

{% image "./src/assets/images/blog/ruefetto-narrow.jpg", "", "", "Captura de pantalla del sitio web en mi pantalla. Sólo ocupa un 30% del espacio", "lazy" %}

Hacer sitios web con 600 a 800 píxeles de ancho no era tan inusual por el año 2008. Podría jurar que llenaba bastante bien mi monitor por aquel entonces.

Así que aquí está de nuevo, 14 años de trabajo sin errores después. Fue la versión terriblemente anticuada de WordPress y _TinyMCE Advanced_ lo que finalmente hizo caer el sitio. Sólo Dios sabe desde cuándo ha sido descontinuado.

Ahora al sitio sólo le queda un plugin: Akismet. Supongo que todo es gracias a la sencillez de mi programación de entonces y a la ausencia de plugins que había llegado tan lejos.

Le he puesto una nueva instalación de WordPress, he sustituido la declaración docytpe por `<!DOCTYPE>`, todo lo demás está como siempre (no hay presupuesto para más, si te lo crees).

Eres bienvenido a visitarlo, pero, descargo de responsabilidad: Su alojamiento web te hace pagar por los certificados SSL con al menos 2,99 euros al mes. Así que no hay SSL.

👉👉👉 www.ruefettojazzsessions.de

Cuántos pueden decir que su primera web "profesional" sigue ahí, en todo su dudoso esplendor? Fue un bonito encuentro.
