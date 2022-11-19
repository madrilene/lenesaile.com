---
title: 'Meine erste Website'
description: 'Heute ist etwas Lustiges passiert. Die allererste Website, die ich Ende 2008 als Freiberufler erstellt habe, hat mich wieder eingeholt. Ich habe 14 Jahre lang nichts mehr von ihr gesehen oder gehört, und jetzt ist sie wieder da.'
Kategorie: Blogpost
Stichwort: 'firstwebsite'
Datum: 2022-11-19
youtube: falsch
cta:
  title: 'Willst du eine WordPress-Seite?'
  desktop: 'Ich habe seit 2008 einiges dazugelernt. Ich mache allerings immer noch WordPress-Seiten die recht simpel und langlebig sind.'
  lead: 'Ich bin [WordPress-Expertin bei Codeable](https://www.codeable.io/developers/lene-saile/). Wenn du eine handgemachte, sichere und sehr schnelle WordPress-Website möchtest, kannst du mich jederzeit anschreiben!'
---

Heute ist etwas Lustiges passiert. Die allererste Website, die ich Ende 2008 als Selbstständige erstellt habe, hat mich wieder eingeholt. Seit 14 Jahren habe ich nichts mehr von ihr gesehen oder gehört, und nun ist sie wieder da.

Der Grund, warum sie wieder in mein Leben getreten ist, war natürlich, dass ein Fehler aufgetreten ist. Ein sicherlich lange angekündigtes, aber geflissentlich ignoriertes, Update auf PHP 8.1 ihres Servers.

Das Bild kennt jeder WordPress-Develeoper:

{% imagePlaceholder "./src/assets/images/blog/ruefetto-php-error.jpg", "", "", "", "Screenshot von vielen PHP-Fehlerzeilen, verursacht durch eine Inkompatibilität mit PHP 8.1", "Hello darkness my old friend." %}

Unter einem gefühlten Meter PHP-Fehlermeldungen erschien sie dann, genau so wie ich sie vor weit über einem Jahrzehnt hinterlassen hatte.

## Wie sie entstand

Es war 2008, und ich hatte gerade meine freiberufliche Tätigkeit bei den deutschen Behörden in Freiburg im Breisgau angemeldet. Eines Abends besuchte ich einen Jazzkeller und kam mit einem Musiker ins Gespräch. Es stellte sich heraus, dass sie auf der Suche nach einem Logo, einem Flyer und einer Website für ihre regelmäßigen Jazz-Sessions waren. Da habe ich mich natürlich sofort angeboten! Und so kam ich zu meinem ersten Auftrag, für den ich, wenn ich mich recht erinnere, 400 Euro für alles bekam.

Es wurde eine WordPress-Seite, denn sie musste regelmäßig mit Bildern und Neuigkeiten gepflegt werden. Wir befanden uns irgendwo zwischen WordPress 2.5 und 2.7 und es hatte nur wenig mit dem gemein, was man heute kennt. Die WordPress-Menüs zum Beispiel wurden erst zwei Jahre später mit der Version 3.0 eingeführt.

## Ein einfaches theme

Damals machte man alles mit "hacks". WordPress war eine reine Blogging-Plattform, und wenn du eine Art CMS daraus machen wolltest, dann musstest du viel herumtricksen.

Das Menü hatte ich damals so gebaut:

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

Es gab damals noch nicht viel Semantik, aber all die divs waren schon ein großer Fortschritt zu den Tabellenlayouts die damals noch allgegenwärtig waren.

So richtig weiß ich nicht was ich mir dabei gedacht habe. Was macht diese $homeActive-Variable da oben? Das andere ist schon eindeutiger. Die WordPress-Funktion `is_home()` gibt es schon seit Version 1.5.0 und lässt mich in dem Fall die Klasse "current_page_item" zum Link hinzufügen. Für einen visuellen Indikator, wo wir uns befinden. Und dann hardcode ich die Links zu den Seiten mit den IDs 51, 53, 18 und 289 hinein. Fertig ist das WordPress-Menü made in 2008!

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

Seht euch das an! Versteht heute kein Mensch mehr. Damals auch nicht.

Ich fand einige hartkodierten Elemente, etwa im Footer.

I found some hardcoded elements, for example in the footer. Ich wusste offensichtlich nicht, wie ich diese Informationen sonst anzeigen sollte. Hatten wir schon Widgets?

```html
<div id="footer">
  <div id="footerInnerPadding">
    Ruefetto Jazz Sessions &emsp;| &emsp; Kart&auml;userstr. 2 | Granatg&auml;&szlig;le 3
    | 79102 Freiburg | Jeden Donnerstag ab 21 Uhr &emsp;|&emsp;
    <a href="http://www.ruefettojazzsessions.de/impressum/">Impressum</a>
  </div>
</div>
```

Alles in allem habe ich ein sehr sehr simples theme geschrieben. Es kommt mit wenigen Zeilen CSS aus, von denen mit Sicherheit die Hälfte gar nicht gebraucht wird, und das ich teilweise ahnungslos irgendwo kopiert habe. Nicht dass ich mich daran noch erinnern könnte, aber ich spreche kein Schwedisch.

```css
#sidebar .bloggy-meddelande {
  /* Stilen på själva inlägget */
  display: block;
  border: 1px solid #e1e1e1;
  background-color: #f8f8f8;
  padding: 2px;
}
```

JavaScript? Nicht existent. Konnte ich damals kein Stück, und wurde ja auch gar nicht gebraucht!

## Wir brauchten keine Plugins

Das allerbeste: zwei Plugins. **Zwei!**

Drei, wenn man das Hello Dolly Plugin mitzählt, das lange Zeit mit WordPress ausgeliefert wurde.
Akismet und TinyMCE Advanced, welches offensichtlich noch bis vor kurzem genutzt wurde, um bestimmte Texte in mit der Farbe `#ff0004` (websafe!) zu hinterlegen.

## Was war in all diesen Jahren geschehen?

Ich erinnere mich daran, dass ich zu Beginn noch ein paar Mal kostenlos WordPress aktualisert habe. Dann wollte ich dafür irgendwann eine winzige monatliche Pauschale, und das hat nicht geklappt, und so sind wir, die Webseite und ich, unserer unterschiedlicher Wege gegangen. Meiner von persönlicher Entwicklung, Schicksälen und Umbrüchen gezeichnet, der Weg der Webseite: absolut unbewegt. Der admin der Seite (der natürlich auch noch "admin" hieß!) hat die Startseite und die Seite für Fotos als Blogersatz genutzt und offenbar nichts vermisst.

Es kam die große Welle des Responsive Webdesign, und während die allermeisten Seiten nach und nach media querys bekamen, scherte sich meine Seite nicht darum. Es war hilfreich, dass ich die Website so verdammt schmal gemacht habe!

{% image "./src/assets/images/blog/ruefetto-narrow.jpg", "", "", "Screenshot der Website auf meinem Bildschirm. Sie nimmt nur etwa 30 % des Platzes ein.", "lazy" %}

Webseiten mit 600 bis 800 Pixel Breite war damals gar nicht so außergewöhnlich. Ich könnte schwören dass sie meinen Monitor damals ganz gut ausgefüllt hatte.

Da ist sie also wieder. Es war die furchtbar veraltete WordPress-Version und _TinyMCE Advanced_, die die Seite schließlich zu Fall brachten. Weiß der Himmel seit wann das Plugin schon nicht mehr weiterentwicklet wurde.

Nun hat die Seite nur noch ein einziges Plugin: Akismet. Ich habe die docytpe-declaration durch `<!DOCTYPE> ersetzt, alles andere ist wie eh und je.

Ihr könnt sie gerne besuchen, allerdings, _disclaimer_: Der Webhost lässt sich SSL-Zertifikate mit mindestens 2,99 Euro im Monat bezahlen. Also, kein SSL.

👉👉👉 www.ruefettojazzsessions.de

Wie viele können sagen, dass ihre erste "professionelle" Website immer noch existiert, in all ihrer fragwürdigen Pracht?
