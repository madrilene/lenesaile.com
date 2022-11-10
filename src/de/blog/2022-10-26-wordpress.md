---
title: 'Einige Gedanken zu WordPress im Jahr 2022'
description: '2007 entdeckte ich WordPress. Es war immer eine großartige Lösung für komplexe benutzerdefinierte Websites, weshalb ich es auch 15 Jahre später immer noch nutze.'
category: blogpost
key: 'wordpressblog'
date: 2022-10-26
image: './src/assets/images/blog/wordpress-notes.jpg'
alt: 'Das WordPress-Logo mit etwas php-Code im Hintergrund'
cta:
  title: 'Brauchst du Hilfe mit WordPress?'
  desktop: 'Ich arbeite schon seit vielen Jahren mit WordPress. Ich erstelle individuelle WordPress-Themes, die wirklich schnell und sicher sind. '
  lead: 'Hast du eine Idee für ein Projekt und weißt nicht, wie du es umsetzen kannst? Lass uns darüber reden! Schick mir eine Mail an [hola@lenesaile.com](mailto:hola@lenesaile.com) und erzähle mir mehr davon.'
---

2007 war ich auf der Suche nach einem CMS, das ich verstehen konnte, um mit ihm eigene Webseiten zu erstellen. Nachdem ich [Joomla](https://www.joomla.org/) und [TYPO3](https://typo3.org/) ausprobiert hatte (und es hasste), entdeckte ich [WordPress](https://wordpress.org/). Es war eine Offenbarung. Ich denke immer noch, dass es eine großartige Lösung für komplexe benutzerdefinierte Websites ist. Es ist extrem leistungsfähig und anpassbar, und ich fühle mich als Entwickler nicht zu sehr eingeschränkt, um das zu schaffen, was mir vorschwebt. Dennoch gibt es einige, die auf das CMS herabschauen und sagen, es sei unsicher und aufgebläht. Ich möchte kurz meine Gedanken zum aktuellen Stand von WordPress darlegen und erklären, warum ich es immer noch gerne benutze.

{% include "partials/toc.njk" %}

## Was ich an WordPress mag

## WordPress ist kostenlos, sicher und schnell

WordPress ist kostenlos, und wenn man keinen Mist baut, ist es sicher und schnell. Neulich habe ich gelesen, dass ==WP core für nur 0,6% der Sicherheitslücken verantwortlich ist, die anderen 99,4% werden von Plugins und Themes verursacht==. [^1]

WordPress ist leicht für SEO zu optimieren, hat eCommerce-Möglichkeiten und dank des Plugins "Advanced Custom Fields" flexible Inhaltsfelder.

Die Community ist riesig, und mir ist noch kein Problem begegnet, das nicht entweder schon gelöst war oder bei dem mir nicht sofort geholfen wurde.

Außerdem haben viele Kunden bereits mit dem WordPress-Backend gearbeitet und sind damit vertraut.

## Was mir nicht an WordPress gefällt

Die folgenden Überlegungen beziehen sich auf das Arbeiten mit WordPress im Backend _und_ Frontend, also nicht auf eine Lösung als headless CMS.

### Man muss sich anpassen

Bei WordPress muss man sich anpassen. Es ist nicht wie bei Jamstack, wo man alles selbst in die Hand nehmen kann und Dienste und Methoden nach Belieben hinzufügen kann. Bei WordPress ist es eher so, dass man Dinge aktiv ausklammern muss, die man nicht will, und ich habe das Gefühl, dass [Block Themes](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/) noch mehr in diese Richtung gehen als klassische PHP-Themes. Ich muss mit den CSS Klassen arbeiten, die generiert werden, und ich muss mich auch Skripte wie `wp-block-navigation-view` (für das Verhalten von Menüs zuständig) gezielt deaktivieren, wenn ich meine eigene Lösung implementieren will. Ich spreche später im Text noch etwas ausführlicher über meine ersten Eindrücke mit diesem neuen Modell.

### Ich nutze keine Page-Builder

Ich bin sicher, Page-Builder (Elementor, Visual Composer...) sind in einigen Zusammenhängen sehr sinnvoll und vor allem ermöglichen sie vielen den eigenständigen Zugang zur Welt der Webentwicklung, nach dem Prinzip "no code". Als Entwicklerin mit besonderem Augenmerk auf Performance vermeide ich sie allerdings.

Alles, was einer Webseite unnötiges Gewicht verleiht, versuche ich zu vermeiden. Das bringt mich zur nächsten Sache, mit der ich mich nie wirklich anfreunden konnte: Themes, die jeden möglichen Anwendungsfall bedienen wollen.

Ich habe mit vielen Leuten gesprochen, die ein Theme gekauft haben und dann unzählige Stunden damit verbracht haben, alles zu konfigurieren.

Nicht immer, aber ziemlich oft, ist es ein Desaster. Nicht, weil sie es nicht richtig gemacht haben. Sondern weil manche Themes einfach versuchen jedes Problem zu lösen, jede Branche zu bedienen. Ich habe ein Theme gesehen, das mehr als 100 verschiedene Skriptdateien geladen hat. Die Stylesheets habe ich nicht mitgezählt. Die Seite brauchte mehr als 10 Sekunden, um auf meiner Glasfaser-Internetverbindung zu laden. Natürlich kann man mit viel nachträglicher Arbeit auch aus diesen Seiten einiges rausholen, aber viel besser ist ein zugeschnittenes Theme, das von sich aus nur das mitbringt was wirklich benötigt wird.

## Wie ich mit WordPress arbeite

Die Übertragung von WordPress-Sites in Jamstack oder die Verwendung von WordPress als Headless CMS ist das, worauf ich mich in letzter Zeit am meisten konzentriert habe.

Wenn ich nativ mit WordPress arbeite, sorge ich dafür, dass es so schnell wie möglich ist, indem ich maßgeschneidertes Javascript nur dort einsetze, wo es nötig ist. Außerdem verwende ich eine "Build-Pipeline", um nur optimierte Assets in der endgültigen Theme-Struktur zu verwenden.

==Ich versuche, alles so einfach und offensichtlich wie möglich zu machen.== Ich hinterlasse Hinweise und Anleitungen in den bearbeitbaren Bereichen und mache Einführungsvideos, in denen ich jedes wichtige Detail der Website erkläre.

Außerdem lege ich Wert auf Struktur und Ordnung. Ich möchte, dass Themes für mich selbst in Zukunft nachvollziehbar sind, aber ich möchte auch, dass nachfolgende Entwickler mit dem von mir geschriebenen Code zurechtkommen.

### Plugins, die ich normalerweise installiere

[ACF Pro](https://www.advancedcustomfields.com/pro/) ist auf jeder Website, die ich erstelle. Ebenso [Yoast SEO](https://yoast.com/wordpress/plugins/seo/), [WP Rocket Pro](https://wp-rocket.me/es/) und [Siteground Security](https://www.siteground.com/blog/sg-security/).

Wenn ich "headless" arbeite, ist es entweder [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/), oder [WP GraphQL](https://www.wpgraphql.com/) in Kombination mit WPGraphQL für Advanced Custom Fields.

Für manuelle Backups und Migration zwischen lokaler Entwicklung, Staging und Deployment: [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/). Ich verwende [Query Monitor](https://es.wordpress.org/plugins/query-monitor/), um Hooks zu visualisieren, zu debuggen und die Leistung zu verbessern.

## Was ich über Full Site Editing denke

Kurz gesagt, ist FSE die Erweiterung des [Gutenberg Editor](https://wordpress.org/gutenberg/) auf die gesamte Website. Nach diesem Prinzip ist das gesamte Theme direkt im Backend mit "blocks" anpassbar. Es ist im Grunde ein eingebauter Site-Builder.

Ich kann nicht allzu viel darüber sagen, da ich mich erst noch richtig einarbeiten muss. In Anbetracht der Tatsache, dass es auf JavaScript basiert und ein komponentenähnliches Konzept hat, wird es mir vielleicht irgendwann gefallen, damit zu entwickeln. WordPress wird nicht zu den alten PHP-templates zurückkehren und jede neue Version wird das Nutzen von block themes weiter vorantreiben.

Ein template part für die Datei `header.html` sieht so aus:

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

Daran muss man sich erst einmal gewöhnen.

Wie ich bereits erwähnte, habe ich mich noch nicht wirklich eingearbeitet. Mein erster Eindruck ist, dass es mich als Entwicklerin etwas einschränkt.

Nichtsdestotrotz - ich habe mir vorgenommen das zu lernen, und sei es nur um es wirklich zu verstehen, und nicht unberechtigt zu kritisieren. Dass ich im Moment noch nicht damit arbeiten möchte spiegelt einfach nur meinen derzeitigen Kenntnisstand wider - ich kann nicht guten Gewissens Leistungen in einem Bereich anbieten, den ich nicht komplett kontrolliere.

## Was ist die richtige Technik, um heutzutage ein WordPress Theme zu erstellen?

Es scheint, als würden alte und neue Techniken aufeinanderprallen. Es gibt viele Möglichkeiten, etwas mit WordPress zu bauen: Block-Themes, das klassische PHP-gesteuerte Templating oder WordPress als Headless-CMS, das ein JavaScript-Frontend über seine REST-API oder WPGraphQL speist.

Ich würde mir darüber nicht allzu viele Gedanken machen: ==Was auch immer für das Projekt das Richtige ist==. Kein Besucher interessiert sich dafür, womit die Website erstellt wurde, und den meisten Kunden ist es auch egal. Natürlich kommuniziere ich genau was ich empfehle und wieso ich denke dass dies meiner Erfahrung nach die beste Lösung für den Kunden ist.
Was am Ende aber wirklich zählt, ist die Qualität des Produkts.

## Was ist mit Gutenberg?

Ich denke, der Gutenberg-Editor ist großartig für erfahrene Content-Redakteure und für jeden, der bereit ist, ein wenig darüber zu lernen. Man kann viele verschiedene Layouts erstellen und wirklich interessante Beiträge verfassen (übertreibe es allerdings nicht mit dem Kopieren von Layouts aus der [[WordPress-Pattern-Bibliothek]](https://wordpress.org/patterns/), da das die Seite ziemlich langsam machen kann).

Andererseits haben manche Kunden notorische Angst, etwas kaputt zu machen. Mit dem Gutenberg-Editor kann man eine Menge machen - er kann aber auch ein wenig überwältigend sein. Manche WordPress-Nutzer wünschen sich einfach den guten alten "Microsoft Word"-Editor zurück. Und ich muss sagen, dass ich das verstehen kann (übrigens gibt es in der Jamstack-Welt auch wunderbare CMS, die eine sehr einfache Benutzeroberfläche haben - ich erzähle dir gerne mehr darüber).

## Fazit

Damals, als ich WordPress entdeckte, bot es mir eine Idee davon, was Developer Experience zukünftig bedeuten würde. Heute hängen mehr als 40% aller Webseiten von WordPress ab[^2].

Es ist ein riesiges Konstrukt mit großer Verantwortung, das nicht wie moderne meta-frameworks wie [Astro](https://astro.build/) in der nächsten Version einfach alles nochmal anders und besser machen kann. Und weil WordPress sich so langsam bewegen muss, ist ein kleiner Teil davon gerade erst in der JavaScript- und React-Welt angekommen, die wir heute kennen.

### Was ist WordPress für mich?

Für mich ist WordPress vor allem eines: Ein kostenloses, sehr flexibles CMS, das viele meiner Kunden bereits kennen. Es geht mir weniger darum, dass ein Theme jederzeit durch ein anderes Theme ersetzt werden kann.

Ich entwickle eine Website speziell für die Bedürfnisse des Kunden. Sie soll schnell, barrierefrei und sicher sein und am besten bei guter Pflege ein paar Jahre halten.

Diese maßgeschneiderte Website kann WordPress als CMS verwenden, muss es aber nicht. Das hängt vom Projekt ab und ist etwas, was meine Kunden und ich gemeinsam entscheiden.

[^1]: https://patchstack.com/whitepaper/the-state-of-wordpress-security-in-2021/
[^2]: https://w3techs.com/technologies/details/cm-wordpress
