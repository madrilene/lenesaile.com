---
title: 'Meine erste Website'
description: 'Heute ist etwas Lustiges passiert. Die allererste Website, die ich Ende 2008 als Selbstständige erstellt habe, hat mich wieder eingeholt. Seit 14 Jahren habe ich nichts mehr von ihr gesehen oder gehört, und nun ist sie wieder da.'
category: Blogpost
key: 'firstwebsite'
date: 2022-11-19
cta:
  title: 'Willst du eine WordPress-Seite?'
  desktop: 'Ich habe seit 2008 einiges dazugelernt. Ich mache immer noch WordPress-Seiten die simpel und langlebig, handgemacht, sicher und schnell sind.'
  lead: Ich arbeite mir WordPress über die [Codeable](https://app.codeable.io/tasks/new?ref=ebTXq&preferredContractor=109033) Plattform. '
---

Heute ist etwas Lustiges passiert. Die allererste Website, die ich Ende 2008 als Selbstständige erstellt habe, hat mich wieder eingeholt. Seit 14 Jahren habe ich nichts mehr von ihr gesehen oder gehört, und nun ist sie wieder da.

Der Grund, warum sie wieder in mein Leben trat, war natürlich, dass ein Fehler auftrat. Ein "erzwungenes" Update auf PHP 8.1 auf dem Server führte dazu, dass die Website nicht mehr funktionierte, so dass man sich wieder an mich erinnerte.

Das Bild kennt jeder WordPress-Entwickler:

{% imagePlaceholder "./src/assets/images/blog/ruefetto-php-error.jpg", "", "", "", "Screenshot von vielen PHP-Fehlerzeilen, verursacht durch eine Inkompatibilität mit PHP 8.1", "Hello darkness my old friend." %}

Unter einem gefühlten Meter PHP-Fehlermeldungen erschien sie dann, genau so wie ich sie vor weit über einem Jahrzehnt hinterlassen hatte.

## Wie sie entstand

Es war 2008, und ich hatte gerade meine freiberufliche Tätigkeit bei den deutschen Behörden in Freiburg im Breisgau angemeldet. Eines Abends besuchte ich einen Jazzkeller und kam mit einem Musiker ins Gespräch. Es stellte sich heraus, dass sie auf der Suche nach einem Logo, einem Flyer und einer Website für ihre regelmäßigen Jazz-Sessions waren. Da habe ich mich natürlich sofort angeboten! Und so kam ich zu meinem ersten Auftrag, für den ich, wenn ich mich recht erinnere, 400 Euro für alles bekam.

Es wurde eine WordPress-Seite, denn sie musste regelmäßig mit Bildern und Neuigkeiten gepflegt werden. Wir befanden uns irgendwo zwischen WordPress 2.5 und 2.7 und es hatte nur wenig mit dem gemein, was man heute kennt. Die WordPress-Menüs zum Beispiel wurden erst zwei Jahre später mit der Version 3.0 eingeführt.

## Ein einfaches theme

Damals machte man alles mit "hacks". WordPress war eine reine Blogging-Plattform, und wenn du eine Art CMS daraus machen wolltest, dann musstest du viel herumtricksen.

Es gab damals noch nicht viel Semantik, aber all die divs waren schon ein großer Fortschritt zu den Tabellenlayouts die damals noch allgegenwärtig waren.

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

So richtig weiß ich nicht was ich mir dabei gedacht habe. Was macht diese $homeActive-Variable da oben? Die WordPress-Funktion is_home() gibt es seit Version 1.5.0. In diesem Fall wollte ich, dass sie die Klasse `current_page_item` zu "Home" hinzufügt, wenn diese Seite aktiv ist. Das ruft einen visuellen Indikator auf, der anzeigt, wo wir uns befinden. Das hat nicht funktioniert! Sicherlich habe ich einige Stunden damit verbracht, herauszufinden, warum das so ist, bis ich schließlich aufgegeben habe.

{% aside %}Es gibt einige nicht intuitive Eigenarten in WordPress, die man, ähnlich wie bei JavaScript, nicht einfach in zukünftigen Versionen beheben kann, da das Fehler bei Websites hervorrufen würde, die die Funktion nutzen. `is_home()` bezieht sich nicht bedingungslos auf deine Startseite, sondern gibt `true` zurück, wenn die Leseeinstellungen im WordPress backend auf "blog posts" statt auf eine statische Seite gesetzt sind.{% endaside %}

Dann habe ich die Links zu den Seiten mit den IDs 51, 53, 18 und 289 fest einprogrammiert.
Fertig ist das WordPress-Menü made in 2008!

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

Seht euch das an! Versteht heute kein Mensch mehr. Damals auch nicht.

Ich fand einige weitere hartkodierte Elemente, etwa im Footer. Ich wusste offensichtlich nicht, wie ich diese Informationen sonst anzeigen sollte. Hatten wir schon Widgets?

```html
<div id="footer">
  <div id="footerInnerPadding">
    Ruefetto Jazz Sessions &emsp;| &emsp; Kart&auml;userstr. 2 | Granatg&auml;&szlig;le 3
    | 79102 Freiburg | Jeden Donnerstag ab 21 Uhr &emsp;|&emsp;
    <a href="http://www.ruefettojazzsessions.de/impressum/">Impressum</a>
  </div>
</div>
```

Ich habe sogar explizit die HTML 4-Entities für deutsche Umlaute genutzt!

Alles in allem habe ich ein sehr simples theme geschrieben. Es kommt mit wenigen Zeilen CSS aus, von denen die Hälfte gar nicht gebraucht wird, und das ich teilweise ahnungslos irgendwo kopiert habe. Nicht dass ich mich daran noch erinnern könnte, aber ich spreche kein Schwedisch.

```css
#sidebar .bloggy-meddelande {
  /* Stilen på själva inlägget */
  display: block;
  border: 1px solid #e1e1e1;
  background-color: #f8f8f8;
  padding: 2px;
}
```

Der ist auch gut:

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

😱
... aber schau dir den Kommentar an! 😂

JavaScript? Nicht existent. Konnte ich damals kein Stück, und wurde ja auch gar nicht gebraucht!

## Wir brauchten keine Plugins

Das allerbeste: zwei Plugins. **Zwei!**

Drei, wenn man das Hello Dolly Plugin mitzählt, das lange Zeit mit WordPress ausgeliefert wurde.

VEs verbleiben Akismet und TinyMCE Advanced, welches offensichtlich noch bis vor kurzem dazu genutzt wurde, bestimmte Texte mit der Farbe `#ff0004` (websafe!) zu hinterlegen.

## Was war in all diesen Jahren geschehen?

Ich erinnere mich daran, dass ich zu Beginn noch ein paar Mal kostenlos WordPress aktualisert habe. Es war mühsam, denn der Host verlangte für jede Aktualisierung eine manuelle Eingabe der FTP-Zugangsdaten im WordPress-Backend. Dann wollte ich dafür irgendwann eine winzige monatliche Pauschale. Das hat nicht geklappt, und so sind wir, die Webseite und ich, unserer unterschiedlicher Wege gegangen. Meiner von persönlicher Entwicklung, Schicksälen und Umbrüchen gezeichnet, der Weg der Webseite: absolut unbewegt. Der admin der Seite (der natürlich auch noch "admin" hieß!) hat die Startseite und die Seite für Fotos als Blogersatz genutzt und offenbar nichts vermisst.

Es kam die große Welle des Responsive Webdesign, und während die allermeisten Seiten nach und nach media querys bekamen, scherte sich meine Seite nicht darum. Es war hilfreich, dass ich die Website so verdammt schmal gemacht habe!

{% imagePlaceholder "./src/assets/images/blog/ruefetto-narrow.jpg", "", "", "", "Screenshot der Website auf meinem Bildschirm. Sie nimmt nur etwa 30 % des Platzes ein.", "Es ist ziemlich modern! Ich habe sogar den Inhalt gut lesbar auf maximal 45 bis 75 Zeichen pro Zeile gehalten!" %}

Webseiten mit 600 bis 800 Pixel Breite war damals gar nicht so außergewöhnlich. Ich könnte schwören, dass sie meinen Monitor damals ganz gut ausgefüllt hat.

Da ist sie also wieder. Ich habe vergessen, die genaue Version von WordPress zu überprüfen, bevor ich sie gelöscht habe, aber sie war mit Sicherheit furchtbar veraltet. Das alte WordPress und _TinyMCE Advanced_ haben die Seite schließlich zum Absturz gebracht, als PHP 8.1 aktiviert wurde.
Ich kann mir nicht vorstellen, dass niemand diese Website seit 2008 aktualisiert hat. Ist das überhaupt möglich? Wurde die ganze Zeit eine kompatible PHP-Version verwendet?

Nun hat die Seite nur noch ein einziges Plugin: Akismet. Ich schätze es ist der Einfältigkeit meiner damaligen Programmierung und dem Fehlen von Plugins zu verdanken, dass sie so weit gekommen ist.

Ich habe eine neue WordPress-Installation aufgesetzt, die alte docytpe-Deklaration durch `<!DOCTYPE>` ersetzt und die seltsame `$homeActive`-Logik gelöscht, da sie anscheinend nur für Verwirrung sorgte. Ich habe `is_home()` mit `is_front_page()` ersetzt, damit die visuelle Anzeige für "Home" nun tatsächlich funktioniert. Ich habe einiges überflüssiges CSS gelöscht und die Seite wieder fokussierbar gemacht.
Alles andere ist so, wie es immer war. Du wirst es mir nicht glauben, aber die Web Vitals sind super.

Du kannst sie gerne besuchen, allerdings, _disclaimer_: Der Webhost lässt sich SSL-Zertifikate mit mindestens 2,99 Euro im Monat bezahlen. Also, kein SSL.

👉👉👉 www.ruefettojazzsessions.de

Wie viele können sagen, dass ihre erste "professionelle" Website immer noch existiert, in all ihrer fragwürdigen Pracht? Es war wirklich eine schöne Begegnung.
