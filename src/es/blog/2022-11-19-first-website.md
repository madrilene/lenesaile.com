---
title: 'Mi primera página web'
description: 'Hoy ha ocurrido algo curioso. La primera página web que hice como autónoma, a finales de 2008, me ha vuelto a atrapar. Hacía 14 años que no la veía ni sabía nada de ella, y ahora ha vuelto.'
category: blogpost
key: 'firstwebsite'
date: 2022-11-19
fecha: 2022-11-19
cta:
  title: '¿Quieres una página web con WordPress?'
  desktop: 'He aprendido un par de cosas desde 2008. Sin embargo, sigo haciendo páginas web que son sencillas y duraderas.'
  lead: 'Trabajo con WordPress utilizando [la plataforma Codeable](https://app.codeable.io/tasks/new?ref=ebTXq&preferredContractor=109033). '
redirectFrom: ['/es/blog/mi-primer-pagina-web/']
---

Hoy ha ocurrido algo curioso. La primera página web que hice como autónoma, a finales de 2008, me ha vuelto a atrapar. Hacía 14 años que no la veía ni sabía nada de ella, y ahora ha vuelto.

La razón por la que volvió a mi vida fue, por supuesto, que apareció un error. Una actualización "forzada" a PHP 8.1 en el servidor hizo que el sitio web fallara, así que pensaron en mí, la creadora, para arreglarlo.

La imagen es familiar para todos los desarrolladores de WordPress:

{% imagePlaceholder "./src/assets/images/blog/ruefetto-php-error.jpg", "", "", "", "Captura de pantalla de muchas líneas de errores PHP causados por una incompatibilidad con PHP 8.1", "Hello darkness my old friend." %}

Debajo de lo que parecía un metro de mensajes de error de PHP, apareció entonces la página web, tal y como lo había dejado hace más de una década.

## Cómo nació la página web

Corría el año 2008 y yo acababa de registrar mi negocio como autónoma ante las autoridades alemanas en la ciudad sureña de Friburgo de Brisgovia (quizá os resulte familiar por ser la ciudad de origen de [Smashing Magazine](https://www.smashingmagazine.com/)). Una noche estaba visitando una bodega de jazz y entablé conversación con un músico. Resulta que estaban buscando un logotipo, un folleto y una página web para sus sesiones regulares de jazz. Yo, por supuesto, me ofrecí inmediatamente. Y así fue como conseguí mi primer trabajo, si no recuerdo mal, pagado con 400 euros por todo.

Se convirtió en una página web con WordPress, porque tenía que ser mantenido regularmente con fotos y noticias. Estábamos entre WordPress 2.5 y 2.7 y tenía muy poco en común con lo que se conoce hoy en día. Los menús de WordPress, por ejemplo, se introdujeron dos años después con la versión 3.0.

## Un tema sencillo

Por aquel entonces, todo se hacía con "hacks". WordPress era una plataforma de blogging pura, y si querías hacer algún tipo de CMS con él, tenías que hacer un montón de trucos.

No había mucha semántica en aquel entonces, pero todos esos divs eran realmente un gran paso adelante con respecto a las tablas que todavía eran omnipresentes en aquel entonces.

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

No sé realmente lo que estaba haciendo. ¿Qué es lo que intenta conseguir esa variable `$homeActive` ahí arriba? La función de WordPress `is_home()` existe desde la versión 1.5.0, y en ese caso obviamente quería que añadiera la clase `current_page_item` a "Home" si estaba activa, para poder mostrar un indicador visual de dónde estamos. ¡Eso no funcionó! Seguramente perdí algunas horas tratando de averiguar por qué, hasta que finalmente me rendí.

{% aside %}Hay algunas peculiaridades contraintuitivas en WordPress que, al igual que en JavaScript, no se pueden arreglar fácilmente en futuras versiones, ya que esto rompería incontables páginas web. La función `is_home()` no se refiere incondicionalmente a tu página de inicio, sino que devuelve `true` si la configuración de lectura en el backend de WordPress está configurada como "blog posts" en lugar de una página estática.{% endaside %}

Luego codifiqué los enlaces a las páginas con los IDs 51, 53, 18 y 289 directamente en el template.
¡Terminado es el menú de WordPress hecho en 2008!

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

¡Mira eso! Ya nadie entiende eso. Tampoco nadie lo entendía entonces.

Encontré algunos elementos codificados más, por ejemplo en el pie de página. Obviamente no sabía cómo mostrar esta información de otra manera. ¿Ya teníamos widgets?

```html
<div id="footer">
  <div id="footerInnerPadding">
    Ruefetto Jazz Sessions &emsp;| &emsp; Kart&auml;userstr. 2 | Granatg&auml;&szlig;le 3
    | 79102 Freiburg | Jeden Donnerstag ab 21 Uhr &emsp;|&emsp;
    <a href="http://www.ruefettojazzsessions.de/impressum/">Impressum</a>
  </div>
</div>
```

¡Incluso escribí explícitamente las entidades HTML 4 para las diéresis alemanas!

En general, escribí un tema muy, muy simple. Se arregla con sólo unas pocas líneas de CSS, la mitad de las cuales ni siquiera se necesitan, y algunas de las cuales copié despistadamente de algún página web. No es que lo recuerde, pero no hablo sueco.

```css
#sidebar .bloggy-meddelande {
  /* Stilen på själva inlägget */
  display: block;
  border: 1px solid #e1e1e1;
  background-color: #f8f8f8;
  padding: 2px;
}
```

Este también es bonito:

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

😱...
¡pero mira ese comentario! 😂

¿JavaScript? No existe. No sabía cómo escribirlo en ese momento, y realmente no era necesario en absoluto.

## No necesitábamos ningún plugin.

Lo mejor: dos plugins. **¡Dos!**

Tres, si se cuenta el plugin _Hello Dolly_ que vino con WordPress durante mucho tiempo. Luego había Akismet y TinyMCE Advanced, que por lo visto se usaba mucho hasta hace poco para cambiar el color por defecto del contenido con `#ff0004` (¡seguro para la web!).

## ¿Qué había pasado todos esos años?

Recuerdo que al principio actualicé WordPress gratis unas cuantas veces. Era agotador, porque el Hosting requería una entrada manual de credenciales FTP en el backend de WordPress, para todas las actualizaciones. Luego, en algún momento, quise cobrar una pequeña tarifa plana mensual por ello, y eso no funcionó, así que nosotros, el sitio web y yo, tomamos caminos distintos. El mío estuvo marcado por el desarrollo personal, golpes de suerte y de destino, el de la página web: absolutamente impasible.

El administrador de la web (¡que por supuesto seguía siendo "admin"!) utilizaba la página de inicio y la de la galería como sustituto del blog y aparentemente no echaba nada en falta.

Llegó la gran ola del "Responsive Web Design", y mientras la gran mayoría de los sitios se fueron haciendo con los "media querys", a mi página no la importó. Vino muy bien que la web fuera tan jodidamente estrecha.

{% imagePlaceholder "./src/assets/images/blog/ruefetto-narrow.jpg", "", "", "", "Captura de pantalla del sitio web en mi pantalla. Sólo ocupa un 30% del espacio", "¡Es bastante moderna! Incluso mantuve el contenido legible a un máximo de 45 a 75 caracteres por línea." %}

Hacer páginas web con 600 a 800 píxeles de ancho no era tan inusual por el año 2008. Podría jurar que llenaba bastante bien mi monitor por aquel entonces.

Así que aquí está de nuevo, 14 años de trabajo sin errores después. Me olvidé de comprobar la versión exacta de WordPress que se ejecutaba allí antes de borrarlo, pero seguro que estaba terriblemente anticuado. Esto, y TinyMCE Advanced, es lo que finalmente hizo caer el sitio cuando se activó PHP 8.1.
No puedo imaginar que nadie haya actualizado este sitio web desde 2008. ¿Es esto posible? ¿Estaban ejecutando una versión de PHP compatible todo ese tiempo?

Ahora sólo queda un plugin: Akismet. Supongo que es todo gracias a la naturaleza simple de mi programación en ese entonces y la ausencia de plugins que había dejado que pudiera llegar tan lejos.

He puesto una nueva instalación de WordPress, he sustituido la declaración docytpe antígua por `<!DOCTYPE>` y he eliminado esa extraña lógica `$homeActive`, ya que no parecía hacer nada más que confundir. He cambiado `is_home()` por `is_front_page()` para que el indicador de página actual para "home" funcione realmente. Luego he quitado algo del CSS que sobraba y lo hize enfocable por el teclado de nuevo.
Todo lo demás está como siempre. No te lo vas a creer, pero los web vitals son geniales.

Os invito a visitarla, pero, "disclaimer": Su Hosting te hace pagar por certificados SSL con al menos 2,99 euros al mes. Así que, no hay SSL.

👉👉👉 www.ruefettojazzsessions.de

Cuántos pueden decir que su primera web "profesional" sigue ahí, en todo su dudoso esplendor? Fue un bonito encuentro desde luego.
