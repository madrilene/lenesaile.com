---
title: 'Übernahme von Grid-Abmessungen von Geschwistern dank subgrid'
description: 'Was ich erreichen möchte, ist die vertikale Ausrichtung von Geschwistern: die dynamischen Dimensionen von Elementen innerhalb des <header> landmark sollen das Grid-Spalten-Template implementieren, das auf dem <body>-Element definiert ist, so dass Geschwister-Elemente sich daran ausrichten können.'
discover:
  description: 'Vertikale Ausrichtung von Geschwistern: die dynamischen Dimensionen von Elementen innerhalb des <header> landmark sollen das Grid-Spalten-Template implementieren, das auf dem <body>-Element definiert ist, so dass Geschwister-Elemente sich daran ausrichten können.'
category: blogpost
key: 'subgrid-siblings'
date: 2024-01-02 11:30:00
lastEdit:
---

Subgrids verwenden die Gitterspuren eines Vorgänger-Grids, um ihre Grid-Elemente auszurichten. Zum Beispiel kann man mehrere Spalten auf dem Element `<body>` erstellen und sie "nach unten" weitergeben, egal wie tief. Das Wichtigste dabei: Das Rastersystem, das nach unten weitergegeben wird, **muss** sich auf einem Vorgänger befinden. Subgrid sucht im DOM-Baum nach dem nächstgelegenen Element, das eine Spalten- oder Zeilenvorlage (`grid-template columns` oder `grid-template-rows`) definiert, die _nicht_ als Subgrid markiert ist.

Wenn ich also ein Layout auf dem `<body>` Element erstelle, kann ich es auf die landmarks `<header>`, `<main>` und `<footer>` übertragen, was sich dann auf deren Kinder auswirkt.

{% include "partials/toc.njk" %}

## Können wir die Abmessungen des Grids auf einem Geschwister-Element definieren?

Was ich erreichen möchte, ist die vertikale Ausrichtung der Geschwister: Die dynamischen Abmessungen der Elemente innerhalb der `<header>` landmark sollen die Gitterspaltenvorlage implementieren, die für das Element `<body>` definiert wurde. Die Rasterlinien sollten sich an das SVG-Logo und den Website-Namen daneben "anschmiegen". Elemente innerhalb von `<main>` und `<footer>` sollten in der Lage sein, an diesem Raster teilzunehmen, indem sie sich entlang der Dimensionen des Logos und des Seitennamens platzieren.

Der Titel soll sich über die gesamte Spalte erstrecken, und ich möchte, dass der Inhalt innerhalb des Elements `<section>` in der Höhe des beginnenden Seitentitels beginnt. Das `<nav>` im `<footer>` sollte sich genau dort befinden, wo der Seitentitel endet.

Grid und subgrid sind keine Themen die leicht zu verstehen sind. Ich versuche deshalb detailiert und Schritt für Schritt zum Ergebnis kommen.

Der HTML-Code sieht folgendermaßen aus:

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

## Das Grid-System

Das Grid-System wird für das Element `<body>` definiert. Ich verwende implizite Namen bei der Einrichtung des Rasters, damit ich später leicht auf sie verweisen kann:

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

Die Eigenschaften "grid-template-columns" und "grid-template-rows" erzeugen explizite Rasterspuren: die Rasterspalten sollten sich eng um das SVG-Logo wickeln und sich dann am Titel der Website ausrichten. Die Eigenschaft `min-content` erledigt das für uns: sie [stellt die eigentliche Mindestbreite des Inhalts dar](https://developer.mozilla.org/en-US/docs/Web/CSS/min-content).
Diese Grid-Spur wird genauso klein wie das breiteste Inhaltselement, das sich in dieser Spalte befindet. Wir müssen also dafür sorgen, dass nur die SVG und der Seitentitel dies tun.

Der restliche verfügbare Platz ist für das Menü reserviert, dafür sorgt die Unit `fr`.

Die expliziten Zeilen legen fest, dass die Kopf- und Fußzeile eine Höhe haben sollen, die durch ihren Inhalt bestimmt wird, während der Hauptteil den restlichen Platz einnehmen soll. Dies platziert den `<footer>` an den unteren Rand des Viewports. Um zu verhindern, dass die Elemente in `<main>` seltsam aufgespalten werden, wenn es wenig Inhalt gibt, habe ich auch die Regel `main {place-content: start;}` gesetzt.

Ohne Subgrid klemmen sich die `Landmarken` nun in den ihnen zugewiesenen Spuren ein.

{% set slug = "LYapGMy" %}
{% set caption = "Vererbung von Gitterspuren von einem Geschwisterkind - 1" %}
{% include "partials/codepen.njk" %}

Wir können dem entgegenwirken, indem wir sie die gesamte Spaltenbreite einnehmen lassen:

```css
body > * {
  grid-column: 1/-1;
}
```

Aber anstatt die Notation `1/-1` für die gesamte Breite zu verwenden, können wir auch unseren Namensmechanismus benutzen.
Durch die benannten Zeilen wurde ein benannter Bereich geschaffen, den ich nun mit `full` ansprechen kann:

```css
body > * {
  grid-column: full;
}
```

Die Spalten des Grid-Templates, die im `<body>`-Element festgelegt wurden, sollen nun von den drei Kindern des `<body>`-Elements übernommen werden.

```css
body > * {
  grid-column: full;
  display: grid;
  grid-template-columns: subgrid;
}
```

Es sind nicht mehr die landmarks selbst, die im Raster platziert werden, sondern _ihre Kinder_, als ob der Rasterspaltenentwurf in den landmarks selbst definiert wäre. Es handelt sich nicht nur um eine Kopie des Wertes, sondern die drei Elemente verwenden buchstäblich die Rasterspuren des Körpers.

Jetzt bestimmen die Kinder der drei landmarks die Dimensionen des Gitters, aber es ist das falsche Element, das die Breite definiert: laut "min-content" definiert das längste Wort des "Heading"-Elements innerhalb von `<main>` nun die Dimensionen des ersten Gitterbereichs.

{% set slug = "LYapGaL" %}
{% set caption = "Vererbung von Gitterspuren von einem Geschwisterkind - 2" %}
{% include "partials/codepen.njk" %}

Alle drei landmarks haben nur zwei Kinder, so dass die dritte Spalte leer ist.

Lasst uns zunächst die Kinder des Elements `<main>` von der Aufgabe befreien, die Abmessungen des Rasters zu bestimmen. Sie sollen sich über die gesamte verfügbare Breite des Wrappers erstrecken, was in unserem Fall nur das H1-Element betrifft, da alles im Element `<section>` dort ausgerichtet werden soll, wo der Titel der Website beginnt.

```css
main > * {
  grid-column: full;
}

main > section {
  grid-column: logo-text-start / full-end;
}
```

{% set slug = "YzgywMY" %}
{% set caption = "Vererbung von Gitterspuren von einem Geschwisterkind - 3" %}
{% include "partials/codepen.njk" %}

**Fast!**

Es fehlt noch ein letzter Schritt, nämlich `.logo` mit seinen beiden Kindern muss auch die Spalten des Blueprint-Grids erben.

Allerdings sollte es sich von `full-start` bis `logo-text-end` erstrecken.

```css
.logo {
  grid-column: full-start / logo-text-end;
  display: grid;
  grid-template-columns: subgrid;
}
```

Wir haben sozusagen mehrere Ebenen übersprungen, bis wir schließlich den Kindern von `.logo` erlaubt haben, die Abmessungen zu definieren, die wir nun an die Geschwister von `<header>` und deren Kinder weitergeben können.

## Endgültige Platzierungen im Raster

Ich habe einen Haltepunkt für das `<nav>`-Element im `<header>` gesetzt, so dass es bei kleinen Bildschirmen in der zweiten Zeile am Seitennamen ausgerichtet ist und bei breiteren Bildschirmen den Bereich zwischen dem Ende des Seitennamens und dem Ende des Wrappers einnimmt:

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

Schließlich sollte der Absatz im `<footer>` die Breite des Seitennamens umfassen. Das erreichen wir mit einem weiteren benannten Bereich: `logo-text`.
Dadurch nimmt das folgende `<nav>` Element den restlichen Platz ein:

```css
footer > p {
  grid-column: logo-text;
}
```

{% set slug = "RwdWrap" %}
{% set caption = "Vererbung von Gitterspuren von einem Geschwisterkind - final" %}
{% include "partials/codepen.njk" %}

Jetzt haben wir ein Layout, in dem das Raster auf dem `<body>` definiert ist, aber nur von den Kindern des `<header>` wirklich implementiert wird.

## Hinweise

Weiter unten im CSS findest du all die kleinen Einstellungen, die ich sonst noch vorgenommen habe, die Klassen `.cluster` und `.flow` stammen aus den Layout-Primitiven von [every-layout.dev](https://every-layout.dev/), der Fluidtyp und die Raumskalen wurden mit Hilfe von [utopia.fyi](https://utopia.fyi/) berechnet.

Cathy Dutton hatte bereits 2020 in einem auf [css-tricks.com](https://css-tricks.com/achieving-vertical-alignment-thanks-subgrid/#aa-can-grid-help-us) veröffentlichten Artikel die Idee, eine flexible übergeordnete Gitterspalte für die vertikale Ausrichtung unter Geschwistern zu verwenden.

Dank Bob [Bob Monsours Hinweis](https://indieweb.social/@bobmonsour/111686716289873152) auf Ryan Mulligans Artikel <span lang="en">"[Horizontal Scrolling in a Centered Max-Width Container](https://ryanmulligan.dev/blog/x-scrolling-centered-max-width-container/)"</span> bin ich auf einen [Artikel von Anna Monus](https://www.annalytic.com/css-subgrid-vs-nested-grid.html) gestoßen, der die Unterschiede zwischen Subgrids und verschachtelten Grids (`grid-template-columns: subgrid;` und `grid-template-columns: inherit;`) erklärt.
Das ist in diesem Zusammenhang sehr lesenswert.
