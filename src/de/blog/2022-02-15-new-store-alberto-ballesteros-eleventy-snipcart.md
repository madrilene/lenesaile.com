---
title: 'Neuer Shop für albertoballesteros.com: Eleventy und Snipcart'
description: 'Eine schnelle und sichere Website - und ein Look and Feel, das dies widerspiegelt - ist entscheidend für einen Shop.'
key: 'storealberto'
date: 2022-02-15
image: './src/assets/images/blog/shop.jpg'
alt: 'Screenshot vom Shop auf albertoballesteros.com.'
cta:
  title: 'Brauchst du einen Shop?'
  desktop: ''
  lead: 'Hast du eine Idee für ein Projekt und weißt nicht, wie du es umsetzen sollst? Lassen uns darüber reden! Schick mir eine Mail an [hola@lenesaile.com](mailto:hola@lenesaile.com).'
---

Die Besucher eines Shops sind dabei zu entscheiden, ob sie ein Produkt wollen und ob sie bereit sind, dafür Geld zu bezahlen. Ladezeiten und Bedenken über die Sicherheit des Ladens können dazu führen, dass sie diesen Plan aufgeben.

Versetze dich in die Lage deiner Kunden: Würdest du persönliche Daten und Zahlungsinformationen an eine dubios aussehende Website weitergeben? Einer Website, die nicht rundum Vertrauen ausstrahlt? Wahrscheinlich nicht.

Deshalb ist eine schnelle und sichere Website - und ein Look and Feel, das dies widerspiegelt! - von entscheidender Bedeutung für einen Shop. [albertoballesteros.com] (https://www.albertoballesteros.com/shop) ist eine statische Website, die auf der Jamstack-Methode basiert. Wenn alles richtig gemacht wird, sind Jamstack-Seiten von Natur aus sehr sicher, zuverlässig, flexibel und vor allem schnell.

## Wie kann ein Shop in eine Jamstack-Website integriert werden?

Einer der vielen Vorteile der Jamstack-Methode ist die breite Palette von Anwendungen und Plattformen, die implementiert werden können. Je nachdem, was ein Projekt braucht, kann ich einen Anbieter wählen, der genau das bietet.

Im Falle eines Online-Shops kann ich aus vielen Anbietern wählen, die den Benutzern ein modernes, persönliches und schnelles Einkaufserlebnis bieten.

Einer der beliebtesten Anbieter ist [Shopify](https://www.shopify.com/). Man zahlt eine geringe monatliche Gebühr für die Nutzung. Im Gegenzug erhält man ein sicheres und einfach zu bedienendes Shopsystem mit einfachen Anbindungen an gängige Zahlungsanbieter, Marketingtools und modularer Skalierbarkeit. Allen ähnlichen Anbietern gemeinsam ist der Administrationsbereich, in dem wir Unternehmensdaten eingeben, Produkte hinzufügen und Bestellungen abwickeln können.

Für albertoballesteros.com ist Shopify zu mächtig. Wir haben eine überschaubare Anzahl von Produkten, und der Shop ist eher ein Add-on zur Website.

Bisher haben wir für eine Shop-Funktion eine direkte Verbindung zu Stripe unterhalten. [Stripe Checkout] (https://stripe.com/es/payments/checkout) ist eine sichere und unmittelbare Methode, um z.B. einmalige Käufe oder Abonnements abzuschließen. Wenn wir davon ausgehen können, dass unser Besucher nur ein Produkt kauft (z.B. weil keine weiteren Produkte verfügbar sind oder weil er sich für ein bestimmtes kostenpflichtiges Abonnement entscheidet), ist Stripe Checkout ideal. Stripe behält etwa 3 % pro abgeschlossenem Kauf und bietet im Gegenzug eine Vielzahl von Währungen, Rechnungsunterstützung, Datensicherheit und Verschlüsselung usw., ähnlich wie Shopify.

In unserem Fall werden wir jedoch die Produktpalette etwas erweitern, und ein Kunde möchte vielleicht mehr als einen Artikel auf einmal kaufen. Und so kommt ein dritter Anbieter ins Spiel: [Snipcart](https://snipcart.com/).

## Technische Integration von Snipcart mit Eleventy

Snipcart ist eine E-Commerce-Lösung, die es uns ermöglicht, einen Warenkorb zu einer Webseite hinzuzufügen und diese in einen Shop zu verwandeln. Snipcart bietet einen vollständig anpassbaren Einkaufswagen, Webhooks und APIs sowie ein intuitives Administrationspanel. Sie behalten 2% pro Transaktion + Gebühren für das Zahlungsgateway.

{% imagePlaceholder "./src/assets/images/blog/snipcart-dashboard.jpg", "", "", "", "Snipcart admin panel screenshot", "Snipcart hat ein attraktives und übersichtliches Adminpanel. Hier finde ich unter anderem nützliche Informationen über das Phänomen der abgebrochenen Warenkörbe." %}

Für Snipcart spielt es keine Rolle, auf welcher Plattform die Website aufgebaut ist. Es funktioniert jedoch besonders gut mit einer Jamstack-Website. [albertoballesteros.com](https://www.albertoballesteros.com/shop) ist eine Jamstack-Seite, die mit dem [Eleventy](https://www.11ty.dev/) Static Web Generator erstellt wurde.

Das Beste daran ist, dass die Konfiguration der Produkte direkt im Code des Webs erfolgt.
Dazu müssen wir zunächst eine Javascript-Datei und eine CSS-Datei einfügen.

In meinem Projektordner habe ich die folgende Struktur (vereinfacht):

{% raw %}

```md
proyecto
│
└───src
│ │
│ └───_data
│ │ │ shop.json
│ │ │ ...
│ │
│ └───_includes
│ │ │
│ │ └───layouts
│ │ │ base.njk
│ │ │ ...
│ │
│ │ shop.njk
│ │ ...
│ ...
```

{% endraw %}

Um zu verhindern, dass JavaScript und CSS unnötigerweise von anderen Unterseiten geladen werden, lege ich in meinem base template fest, dass sie nur auf der Shop-Seite eingebunden werden:

_base.njk:_

{% raw %}

```html
{% if snipcart %}
<link
  rel="stylesheet"
  href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
/>
<script async src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"></script>
<div hidden id="snipcart" data-api-key="YOUR_PUBLIC_API_KEY"></div>
{% endif %}
```

{% endraw %}

Der Shop benötigt keine Unterseiten für die Produkte, sondern listet die Artikel direkt mit einer kurzen Beschreibung auf.

Daher aktiviere ich die Integration nur in meiner <code>Nunjucks</code>-Datei für den Shop:

_shop.njk:_
{% raw %}

```html
---
title: Shop
snipcart: true
---
```

{% endraw %}

Wir erhalten die Produkte und ihre Eigenschaften mit Hilfe einer <code>json</code> Datei:

_shop.json:_

```json
{
  "products": [
    {
      "name": "Libro El verano más largo",
      "type": "Libro",
      "description": "Los textos de los que se compone este libro los escribí entre los meses de septiembre y noviembre. Lo mío es escribir canciones, grabar discos y hacer conciertos. El verano más largo son apuntes con forma de poemas que me apetecía compartir",
      "id": "libro-verano",
      "price": "12.00",
      "image": "/assets/images/shop/libro-verano.jpg"
    },
    {
      // ...
    }
  ]
}
```

Snipcart benötigt einige Daten, um die Produkte zu erstellen und den Kauf zu bearbeiten.
Wir holen diese Daten aus unserer <code>shop.json</code> Datei mit Hilfe eines loops:

{% raw %}

```html
{% for product in shop.products %}
<button
  class="snipcart-add-item"
  id="{{ product.id }}"
  data-item-id="{{ product.id }}"
  data-item-price="{{ product.price }}"
  data-item-url="/shop/"
  data-item-description="{{ product.description }}"
  data-item-image="{{ product.image }}"
  data-item-name="{{ product.name }}"
>
  add to cart
</button>
{% endfor %}
```

{% endraw %}

Dieser <code>button</code> reicht aus, um Snipcart zu aktivieren. Snipcart benötigt den Produktnamen, eine eindeutige Produkt-ID, den Produktpreis, die Produkt-URL (wo sich der <code>button</code> "In den Warenkorb" befindet, die von deinem Tracker bei der Überprüfung der Vollständigkeit der Bestellung verwendet wird), die Produktbeschreibung und die URL des Produktbildes.

Die CSS-Klasse <code>snipcart-add-item</code> ist ebenfalls erforderlich.
Innerhalb des loops verwende ich diese Daten, um die Produkte auf der Benutzeroberfläche anzuzeigen.

Für den Warenkorb-Toggle haben wir den folgenden Code:

```html
<button class="snipcart-checkout">see cart</button>
```

So können wir den Status unseres Warenkorbs überprüfen, ohne ihm etwas Neues hinzuzufügen.

Außerdem bieten wir den Besuchern in der Produktübersicht einen kompakten Überblick über den Warenkorb:

```html
Selected products: <span class="snipcart-items-count"></span> Total:
<span class="snipcart-total-price"></span>
```

Hier kannst du sehen, wie viele Produkte sich im Warenkorb befinden und wie hoch der Gesamtpreis ist. Dies funktioniert mit einer Javascript-Injektion.

Snipcart sucht auch nach unserem Sprachattribut im HTML, um die angezeigte Sprache automatisch anzupassen:

```html
<html lang="es"></html>
```

Um die größtmögliche Sicherheit unserer Websites zu gewährleisten, richten wir HTTP-Antwort-Header ein. Die Kopfzeile "Content Security Policy" (CSP) ist eine zusätzliche Sicherheitsebene, die dazu beiträgt, bestimmte Arten von Angriffen wie Cross-Site-Scripting (XSS) und Data-Injection-Angriffe zu erkennen und zu entschärfen. Wir tun dies, indem wir genau festlegen, welche Ressourcen der Browser laden kann.

Damit Snipcart funktioniert, müssen wir den Skriptabruf durch Snipcart in der Kopfzeile der Inhaltssicherheitsrichtlinie aktivieren.

Da wir unseren ersten Verkauf getätigt haben, wird der Artikel automatisch im Abschnitt Produkte aufgeführt. Der Käufer wird im Kundenbereich aufgeführt und im Bestellbereich erscheint die Transaktion mit den Kundendaten.

{% imagePlaceholder "./src/assets/images/blog/snipcart-ventas.jpg", "", "", "", "Pantallazo del panel de administración de Snipcart", "Wir haben das erste Exemplar des Buches über die Website verkauft! Das Produkt erscheint nun im Snipcart-Verwaltungspanel." %}

## Schlussfolgerung und Empfehlungen: Wie wählt man die beste Lösung für einen Online-Shop?

In Fall von albertoballesteros.com übernehme ich direkt die Erstellung der Produkte in der json-Datei. Für meine Kunden wäre dies jedoch recht mühsam. Stattdessen können sie die Produkte und ihre Eigenschaften in ein Google-Sheet (Excel) eingeben und ich konvertiere dieses Format dann in eine json-Datei, die ich direkt verwenden kann.

Jeder Kunde hat individuelle Bedürfnisse. Shopify ist für viele die erste Wahl, weil es flexibel und einfach zu bedienen ist und ein gutes Preis-Leistungs-Verhältnis bietet. Auch einige große Unternehmen nutzen Shopify.

Für Jamstack-Websites, bei denen der Shop eher ein Add-on ist, ist Snipcart mit seiner Kombination aus einfacher Einrichtung und tiefer Anpassung eine perfekte Lösung.

Für eine Wordpress-Website ist das CMS-eigene Woocommerce-Plugin ein Klassiker. Es ist auch möglich, Wordpress mit anderen Shop-Lösungen zu kombinieren.

**Bei der Entscheidungsfindung müssen folgende Fragen beantwortet werden:**

- Wie viel willst dufür eine Shop-Lösung bezahlen? Entwicklungskosten und laufende Kosten (z.B. der monatliche Beitrag von Shopify) sollten einbezogen werden.
- Was sind die technischen Fähigkeiten deines Teams: Wie viel willst und kannst du selbst einrichten?
- Welche Vorstellungen hast du von der Funktionalität und Benutzerfreundlichkeit des Shops?
- Wie groß ist oder wird dein Shop sein? Das musst du im Hinblick auf die Skalierbarkeit und Anpassungsfähigkeit der Plattform berücksichtigen.

Letztendlich lohnt sich die Arbeit und das Geld, das in eine schnelle, attraktive und sichere Shop-Website investiert wird, immer.
Es wird sich in den Verkäufen widerspiegeln, und die zu Beginn angefallenen Kosten werden sich bald wieder bezahlt machen.
