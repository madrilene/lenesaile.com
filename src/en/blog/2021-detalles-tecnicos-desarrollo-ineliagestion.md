---
title: 'Detalles técnicos sobre el desarrollo de ineliagestion.com'
description: 'ineliagestion.com fue desarrollado con un nuevo método, el JAMstack. Esta técnica está orientado a los inicios del desarrollo de la web, cuando todas las páginas web eran estáticas.'
date: 2021-01-27
featured_image: ineliagestion-jamstack.jpg
tags:
  - Proyecto
  - Jamstack
# dump_photos: true
---

ineliagestion.com fue desarrollado con un nuevo método, el Jamstack.

Jamstack está orientado a los inicios del desarrollo de la web, cuando todas las páginas web eran estáticas - puros archivos HTML que se encuentran en una estructura de carpetas. En el pasado, no se podían crear sitios web dinámicos, y la libertad de diseño dejaba mucho que desear. Si querías ajustar algo que se refería a los otros archivos, por ejemplo añadir un nuevo elemento de menú, tenías que ajustarlo manualmente en todos los archivos. Sin embargo, estas páginas web, que se arreglaban con lo más esencial, eran increíblemente rápidas y seguras.

Así que hoy en día sólo queremos aprovechar de las ventajas de esta técnica clásica.

En resumen el cliente tiene las siguientes ventajas:

1. **Tiempos de carga muy rápidos**, porque todo se carga a través de una CDN. Excurso: Una CDN (Content Delivery Network) es una red de servidores que almacenan cachés de contenido estático de un sitio web en varios lugares del mundo. Cuando un usuario visita el sitio web, el contenido se le entrega desde el servidor más cercano.

2. **Más seguridad**, porque sin bases de datos y servidores no hay vulnerabilidades que puedan ser explotadas por los atacantes.

3. **Bajos costos de funcionamiento**, ya que el alojamiento de archivos estáticos es barato o incluso gratuito.

4. **Desarrollo rápido y cambios sin complicaciones**: Los desarrolladores web podemos centrarnos en el desarrollo sin estar atados a una arquitectura monolítica. Podemos desarrollar más rápido y centrado.

5. **Escalabilidad**, significa que si el sitio web es visitado repentinamente por muchos usuarios activos al mismo tiempo, el CDN compensa esto sin problemas. En caso de un alojamiento web tradicional, dependiente del paquete contratado el sitio web ya no sería accesible, y para soportar una mayor afluencia de visitantes habría que actualizar el paquete a un considerable costo.

## Pero, ¿cómo resolver el problema del mantenimiento desproporcionadamente complicado de los sitios web estáticos?

Nos ayudan los llamados generadores de sitios estáticos, que crean el sitio web estático como parte de un llamado proceso de construcción. Utilizan fuentes de datos y plantillas para generar los archivos HTML individuales.

ineliagestion.com utiliza el generador de sitios estáticos Eleventy, los archivos estáticos están en un repositorio privado en GitHub (un portal creado para alojar código de aplicaciones) y Netlify (un servicio de hosting para sitios estáticos) se encarga del alojamiento en sus CDN. Los cambios se envían directamente a GitHub y Netlify a través de mi editor de código.

Para el diseño de este sitio web, utilicé Figma, una herramienta de diseño y prototipado para proyectos digitales. Implementé el diseño acordado con el cliente usando el framework CSS Tailwind.

Queremos cargar sólo lo más esencial, como las páginas web clásicas. Por lo tanto, todos los elementos de la página web se almacenan en caché, se reducen y se limpian. Todas las imágenes se cargan con retraso y por los formatos de imagen más modernos, y se eliminan el CSS y el Javascript no utilizado.

Por último, vuelvo a comprobar todo el sitio en cuanto a los factores de rendimiento, accesibilidad, las denominadas mejores prácticas y la compatibilidad con los motores de búsqueda.

{% imagePlaceholder "./src/assets/images/blog/ineliagestion-lighthouse.jpg", "catptionstyle", "picturestyle", "object-fit-cover", "Resultados de la auditoría Lighthouse para ineliagestion.com", "Resultados de la auditoría Lighthouse para ineliagestion.com, una herramienta que proporciona información sobre el rendimiento, el SEO, la usabilidad y la accesibilidad de una página.", "60vw" %}

**El método JAMstack funciona muy bien para los sitios web de pequeñas empresas.**

[¡Estaremos encantados de contaros más sobre ello!](/contacto)
