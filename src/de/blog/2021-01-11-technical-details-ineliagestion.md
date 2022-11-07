---
title: 'Technische Details über die Entwicklung von ineliagestion.com'
description: 'ineliagestion.com wurde mit einer neuen Methode entwickelt, dem Jamstack. Diese Technik orientiert sich an den frühen Tagen der Webentwicklung, als alle Webseiten statisch waren.'
category: blogpost
key: 'ineliadevelopment'
date: 2021-01-11
image: './src/assets/images/blog/proyecto-inelia-gestion.png'
alt: 'Screenshot von ineliagestion.com auf Desktop und Handy'
cta:
  title: 'Interessiert an Jamstack?'
  desktop: 'Die Jamstack-Methode funktioniert unglaublich gut für Websites kleiner Unternehmen. Ich bin wirklich begeistert von dieser Entwicklungsphilosophie, ich  erzähle dir gerne alles darüber!'
  lead: 'Hast du ein Projekt im Sinn? Lass uns darüber reden! Schick mir eine E-Mail an [hola@lenesaile.com](mailto:hola@lenesaile.com).'
---

Ich habe soeben eine der Seiten, die ich im letzten Herbst erstellt habe, in den Bereich [Projekte](/de/projekte/) aufgenommen.

[Inelia Gestión](https://www.ineliagestion.com/) ist eine Steuer-, Arbeits- und Handelsberatung in Madrid.

Ziel war es, das Image und die Arbeitsphilosophie von Inelia in ihrer neuen Website widerzuspiegeln. Es handelt sich um eine Agentur mit einer sehr engen Beziehung und einer sehr direkten und klaren Kommunikationspolitik mit dem Kunden.

Es war großartig, die Fotos von Gabriel Monsalve zur Verfügung zu haben! Originale Fotos von den echten Menschen und Einrichtungen sind von unschätzbarem Wert und tragen unheimlich viel dazu bei, dass die Besucher Vertrauen fassen.

## Entwickelt mit einer relativ neuen Methode: Jamstack.

Jamstack orientiert sich an den Anfängen der Webentwicklung, als alle Webseiten statisch waren - reine HTML-Dateien, die in einer Ordnerstruktur lagen. Damals konnte man keine dynamischen Websites erstellen, und die Gestaltungsfreiheit ließ zu wünschen übrig. Wenn man etwas anpassen wollte, das sich auf andere Dateien bezog, z. B. ein neues Menüelement hinzufügen wollte, musste man es manuell in allen Dateien anpassen. Dafür waren diese Webseiten, die sich mit dem Nötigsten begnügten, unglaublich schnell und sicher.

Deshalb wollen wir uns heute nur die Vorzüge dieser klassischen Technik zunutze machen.

Zusammengefasst sind das:

1. **Sehr schnelle Ladezeiten**, da alles über ein CDN geladen wird. Exkurs: Ein CDN (Content Delivery Network) ist ein Netzwerk von Servern, die den statischen Inhalt einer Website an verschiedenen Orten auf der ganzen Welt zwischenlagern. Wenn ein Nutzer die Website besucht, wird ihm der Inhalt vom nächstgelegenen Server geliefert.

2. **Erhöhte Sicherheit**, denn ohne Datenbanken und Server gibt es keine Schwachstellen, die von Angreifern ausgenutzt werden können.

3. **Niedrige Betriebskosten**, da das Hosting statischer Dateien billig oder sogar kostenlos ist.

4. **Schnelle Entwicklung und nahtlose Änderungen**: Webentwickler können sich auf die Entwicklung konzentrieren, ohne an eine monolithische Architektur gebunden zu sein. Wir können schneller und gezielter entwickeln.

5. **Skalierbarkeit**, d.h. wenn die Website plötzlich von vielen aktiven Nutzern gleichzeitig besucht wird, gleicht das CDN dies nahtlos aus. Bei einem herkömmlichen Webhosting wäre die Website je nach vertraglichem Paket nicht mehr erreichbar, und um einen höheren Besucherstrom zu unterstützen, müsste das Paket zu erheblichen Kosten aufgerüstet werden.

## Doch wie lässt sich das Problem der unverhältnismäßig komplizierten Wartung statischer Websites lösen?

Hier helfen uns so genannte Static Site Generators, die die statische Website im Rahmen eines Build-Prozesses erstellen. Sie verwenden Datenquellen und Vorlagen, um die einzelnen HTML-Dateien zu generieren.

ineliagestion.com verwendet den Static Site Generator [Eleventy](https://www.11ty.dev/), die statischen Dateien befinden sich in einem privaten Repository auf [GitHub](https://github.com/) (ein Portal, das für das Hosting von Anwendungscode geschaffen wurde) und [Netlify](https://www.netlify.com/) (ein Hosting-Service für statische Websites) kümmert sich um das Hosting auf seinen CDNs. Änderungen werden über meinen Code-Editor direkt an GitHub und Netlify übermittelt.

Für das Design dieser Website habe ich Figma verwendet, ein Design- und Prototyping-Tool für digitale Projekte. Das mit dem Kunden vereinbarte Design habe ich mit dem CSS-Framework Tailwind umgesetzt.

Wir wollen nur das Wesentliche laden, wie bei klassischen Webseiten. Deshalb werden alle Elemente der Webseite zwischengespeichert, verkleinert und bereinigt. Alle Bilder werden verzögert und in den modernsten Bildformaten geladen, und ungenutztes CSS und JavaScript wird entfernt.

Abschließend überprüfe ich die gesamte Seite noch einmal auf Performance-Faktoren, Barrierefreiheit, sogenannte Best Practices und Suchmaschinenkompatibilität.

{% imagePlaceholder "./src/assets/images/blog/ineliagestion-lighthouse.jpg", "", "", "object-fit-cover", "Screenshot der Lighthouse-Audit-Ergebnisse für ineliagestion.com, zeigt hervorragende Ergebnisse in allen Bereichen", "Lighthouse-Audit-Ergebnisse für ineliagestion.com. Lighthouse ist ein Tool, das Informationen über die Leistung einer Seite, SEO, Benutzerfreundlichkeit und Zugänglichkeit liefert.", "60vw" %}
