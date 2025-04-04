---
title: 'Grabación, edición e integración de un sonido de evento de clic'
description: 'Los pequeños sonidos de interacción han vuelto a aparecer en los sitios web personales en los últimos años, y creo que eso es maravilloso.'
category: blogpost
key: 'audioswitch'
date: 2023-11-06
---

¿Quién recuerda los días en los que la música u otros ruidos desagradables empezaban a sonar de repente en cuanto visitabas una página web? Yo recuerdo bajar los altavoces antes de conectarme (sí, también recuerdo encender y apagar internet deliberadamente. Eso salía caro).

Durante mucho tiempo estuvo mal visto reproducir sonidos no solicitados. Los visitantes deben tener el control sobre si quieren reproducir conscientemente algo que desencadene algún tipo de sonido e imagen en movimiento. Sin embargo, en los últimos años han vuelto a aparecer pequeños sonidos de interacción en los sitios web personales, y me parece estupendo. Mi sitio web también emite un (espero) sutil sonido en dos lugares, concretamente cuando se cambia entre "claro" y "oscuro" y cuando se cambia de idioma. A continuación te explico cómo puedes integrar tú mismo un sonido que tenga como disparador un "evento de clic".

## Grabar sonido

Esto es muy sencillo. Hoy en día siempre tenemos un dispositivo de grabación con nosotros. Yo me pongo al lado de mi viejo interruptor de la luz y grabo su nítido sonido con mi móvil.

{% image "./src/assets/images/blog/wall.jpg", "Una pared blanca con un viejo interruptor pulsador", "Mi interruptor de la luz utilizado para el sonido de mi interruptor temático. Así que en cierto modo, en realidad está encendiendo y apagando mi luz. " %}

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

{% image "./src/assets/images/blog/audacity.jpg", "Interfaz de Audacity con archivo de audio cargado", "La interfaz de Audacity parece un poco desordenada, pero no necesitas la mayor parte de ella" %}

Ahora puedes seleccionar un rango para su clip de audio y luego separarlo del resto del archivo mediante "Edit" > "Clip Boundaries" > "Split".

Ahora tiene tres áreas.

{% image "./src/assets/images/blog/audacity-three-areas.jpg", "Interfaz de Audacity con el archivo de audio dividido en tres áreas, la del medio es la selección que exportaremos" %}

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
<button type="button" data-sound-switch>
  <!-- svg icon, zum Beispiel -->
</button>
```

## Con HTMLAudioElement: Audio() constructor

Como parte de un cambio de tema, la parte relevante en el JavaScript es:

```js
let switchSound;

document.addEventListener('DOMContentLoaded', () => {
  switchSound = new Audio('/assets/sounds/light-on.mp3');
  switchSound.load();
});

const onClick = () => {
  if (switchSound) {
    switchSound.play();
  }
};

window.onload = () => {
  document.querySelector('[data-sound-switch]').addEventListener('click', onClick);
};
```

La primera línea declara una variable llamada `switchSound` sin inicializarla. Al estar definida en un ámbito superior puede ser accedida por diferentes partes del código. A continuación escuchamos el evento `DOMContentLoaded`, que se dispara cuando el documento HTML ha sido completamente cargado y analizado, pero los recursos externos como las hojas de estilo y las imágenes pueden no haber sido completamente cargados todavía. Esto es para asegurarse de que la carga del sonido no bloquea ningún recurso importante.

Dentro del escuchador de eventos para `DOMContentLoaded`, creo el nuevo objeto `Audio` y lo asigno a la variable `switchSound`. La reproducción del sonido (usando el método `play()` del `HTMLMediaElement`) tiene lugar en la función `onClick`.

El evento `load` para el objeto `window` se activa cuando se carga toda la página, incluyendo estilos, imágenes y otros recursos. Está disponible a través de la propiedad `onload`.
Hago que escuche los clics en el `button` con un  `attr` de `data-sound-switch`.

## Con la Web Audio API

El código anterior funciona bien para necesidades básicas, pero la Web Audio API permite un mejor rendimiento y control.

```js
document.addEventListener('DOMContentLoaded', async () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let switchBuffer = null;

  async function loadSwitchSound() {
    const response = await fetch('/assets/sounds/light-on.mp3');
    const arrayBuffer = await response.arrayBuffer();
    switchBuffer = await audioContext.decodeAudioData(arrayBuffer);
  }

  await loadSwitchSound();

  function playSwitch() {
    if (!switchBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = switchBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }

  document.querySelector('[data-sound-switch]')?.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    playSwitch();
  });
});
```

En lugar de crear un nuevo objeto `Audio` cada vez, obtenemos y decodificamos el archivo `.mp3` una vez y almacenamos el audio decodificado en `switchBuffer`. AudioContext» nos permite controlar la reproducción de audio a nivel de muestra. Esto significa que expone el audio como datos digitales en bruto, formas de onda reales: Ahora podemos hacer cosas como fundidos, controlar el volumen, cambiar la velocidad de reproducción, etc. [Mir los mdn docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) para ver lo que es posible.

Para controlar el volumen, podemos hacer esto:

```js
const gainNode = audioContext.createGain()
gainNode.gain.value = 0.5
source.connect(gainNode).connect(audioContext.destination)
```
