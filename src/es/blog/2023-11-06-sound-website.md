---
title: 'Grabación, edición e integración de un sonido de evento de clic'
description: 'Los pequeños sonidos de interacción han vuelto a aparecer en los sitios web personales en los últimos años, y creo que eso es maravilloso. A continuación te explico cómo puedes incorporar un sonido a tu sitio web que tenga como disparador un evento de clic.'
Categoría: Blogpost
Clave: 'eleventyi18n'
Fecha: 2023-11-06
youtube: false
---

¿Quién recuerda los días en los que la música u otros ruidos desagradables empezaban a sonar de repente en cuanto visitabas una página web? Yo recuerdo bajar los altavoces antes de conectarme (sí, también recuerdo encender y apagar internet deliberadamente. Eso salía caro).

Durante mucho tiempo estuvo mal visto reproducir sonidos no solicitados. Los visitantes deben tener el control sobre si quieren reproducir conscientemente algo que desencadene algún tipo de sonido e imagen en movimiento. Sin embargo, en los últimos años han vuelto a aparecer pequeños sonidos de interacción en los sitios web personales, y me parece estupendo. Mi sitio web también emite un (espero) sutil sonido en dos lugares, concretamente cuando se cambia entre "claro" y "oscuro" y cuando se cambia de idioma. A continuación te explico cómo puedes integrar tú mismo un sonido que tenga como disparador un "evento de clic".

## Grabar sonido

Esto es muy sencillo. Hoy en día siempre tenemos un dispositivo de grabación con nosotros. Yo me pongo al lado de mi viejo interruptor de la luz y grabo su nítido sonido.

{% imagePlaceholder "./src/assets/images/blog/wall.jpg", "", "", "", "Una pared blanca con un viejo interruptor pulsador", "Mi interruptor de la luz utilizado para el sonido de mi interruptor temático. Así que en cierto modo, en realidad está encendiendo y apagando mi luz. " %}

Ahora envía el sonido a tu ordenador. Aquí todavía tenemos que cortarlo. Una herramienta gratuita y fácil de usar para esto es _Audacity_.

## Instalar y usar Audacity

Mi sistema funciona bajo Ubuntu, he instalado _Audacity_ a través de la Snap Store:

```bash
sudo apt update
sudo apt install snapd
sudo snap install audacity
```

Puedes encontrar las descargas para todos los sistemas operativos en la página web: https://www.audacityteam.org/download/

Una vez que hayas iniciado Audacity, arrastra tu archivo de audio a la ventana de edición. En mi caso, tengo un archivo `.ogg' de mi teléfono móvil.

{% imagePlaceholder "./src/assets/images/blog/audacity.jpg", "", "", "", "Interfaz de Audacity con archivo de audio cargado", "La interfaz de Audacity parece un poco desordenada, pero no necesitas la mayor parte de ella" %}

Ahora puedes seleccionar un rango para su clip de audio y luego separarlo del resto del archivo mediante "Edit" > "Clip Boundaries" > "Split".

Ahora tiene tres áreas.

{% imagePlaceholder "./src/assets/images/blog/audacity-three-areas.jpg", "", "", "", "Interfaz de Audacity con el archivo de audio dividido en tres áreas, la del medio es la selección que exportaremos" %}

Puedes seleccionar y borrar las secciones que no quieras. Asegúrese de que el sonido comienza bastante rápido, ya que un retraso audible después del "evento clic" no parece natural.

Puedes ajustar el volumen en la parte izquierda del área de edición. Mi sonido original es un poco demasiado alto e intenso para mi gusto, sobre todo porque probablemente nadie espera que la acción haga un ruido audible. Baja un poco el volumen hasta que suene cómodo en relación con el volumen normal de reproducción de música (hoy en día la gente no baja el volumen de los altavoces).

Hay otros efectos que puedes probar, pero ahora estoy contento con mi grabación.

Puedes guardar tu sonido a través de "File" > "Export" y "Export as mp3". Se te pedirá la ubicación de almacenamiento y podrás añadir metadatos.

Mi archivo tiene un tamaño de 3,9kb.

## Integra el sonido en tu web

Para que esto funcione, no necesitas un _generador de sitios web estáticos_ (una herramienta que crea sitios web por adelantado, lo que los hace más rápidos y seguros ya que no dependen del procesamiento del lado del servidor), simplemente puedes poner tu sonido en una carpeta de tu elección.

En mi proyecto, añado `light-on.mp3` a una carpeta situada en `src/assets/sounds`.

Construí este sitio web con [Eleventy](https://www.11ty.dev/) y necesito un llamado _build-step_ que transfiera todo desde mi carpeta de entrada a la carpeta de salida.

Uso [Passthrough File Copy](https://www.11ty.dev/docs/copy/) en mi [archivo de configuración de Eleventy](/es/blog/estructuracion-del-archivo-de-configuracion-de-eleventy/) para asegurar que la carpeta y su contenido son copiados.

```js
eleventyConfig.addPassthroughCopy('src/activos/sonidos/');
```

En tu HTML tienes que definir el área que debe "escuchar" el click. En mi caso se trata de un "botón" junto a mi nombre y el elemento de navegación.

```html
<button type="button" id="theme-toggle">
  <!-- svg icon, zum Beispiel -->
</button>
```

Yo incrusto mi sonido como parte de un conmutador de tema con algunos otros ajustes, pero la parte relevante en mi JavaScript es esta:

```js
const onClick = () => {
  const switchSound = new Audio('/assets/sounds/light-on.mp3');
  switchSound.play();
};

window.onload = () => {
  document.querySelector('#theme-toggle').addEventListener('click', onClick);
};
```

Todas las acciones - la declaración de la variable `switchSound`, la posterior carga del archivo y la reproducción real del sonido (utilizando el método `play()` de `HTMLMediaElement`) - tienen lugar en la "expresión de función" `onClick`.

El evento de carga para el objeto ventana se activa cuando se ha cargado toda la página, incluidos los archivos CSS, las imágenes y otros recursos. Está disponible a través de la propiedad `onload`.
Hago que espere después de hacer clic en el botón con el ID `#theme-toggle`.

Para un conmutador de temas válido tienen que pasar más cosas, puedes echar un vistazo al [conmutador de temas de esta página web en GitHub](https://github.com/madrilene/lenesaile.com/blob/main/src/assets/scripts/theme-toggle.js).
