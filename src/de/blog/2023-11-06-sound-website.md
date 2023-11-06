---
title: 'Aufnehmen, Bearbeiten und Integrieren eines click event Sounds'
description: 'Kleine Interaktionssounds haben in den letzten Jahren wieder Einzug in persönliche Websites gehalten, und das finde ich wunderbar. Im Folgenden erkläre ich, wie du einen Sound in deine Website einbauen kannst, der einen click event als Auslöser hat.'
Kategorie: Blogpost
Schlüssel: 'eleventyi18n'
Datum: 2023-11-06
youtube: false
---

Wer erinnert sich noch an die Zeiten, in denen plötzlich Musik oder andere unangenehme Geräusche zu spielen begannen, sobald man eine Website besuchte? Ich erinnere mich noch daran, dass ich die Lautsprecher runterdrehte, bevor ich online ging (ja, ich erinnere mich auch daran, wie ich das Internet bewusst ein- und ausschaltete. Das war teuer).

Lange Zeit war es verpönt, irgendwelche unaufgefordert Töne abzuspielen. Besucher sollen zu Recht die Kontrolle darüber haben, ob sie bewusst etwas abspielen wollen, das irgendeine Art von Ton und bewegtem Bild auslöst. Nichtsdestotrotz haben kleine Interaktionssounds in den letzten Jahren wieder Einzug in persönliche Websites gehalten, und das finde ich wunderbar. Auch meine Website gibt an zwei Stellen einen (hoffentlich) subtilen Ton von sich, nämlich wenn du zwischen "light" und "dark" wechselst und wenn du die Sprache änderst. Im Folgenden erkläre ich, wie du selbst einen Sound integrieren kannst, der eien `click event` als Auslöser hat.

## Ton aufnehmen

Das ist ganz einfach! Heutzutage haben wir immer ein Aufnahmegerät dabei. Ich stelle mich neben meinen alten Lichtschalter und nehme sein knackiges Geräusch auf.

{% imagePlaceholder "./src/assets/images/blog/wall.jpg", "", "", "", "Eine weiße Wand mit einem alten Druckknopfschalter", "Mein Lichtschalter, der für den Sound meines Theme-Umschalters verwendet wurde. In gewisser Weise schaltest du also tatsächlich mein Licht an und aus. " %}

Schicke nun den Ton an deinen Computer. Hier müssen wir ihn noch zuschneiden. Ein kostenloses und einfach zu benutzendes Tool dafür ist _Audacity_.

## Audacity installieren und benutzen

Mein System läuft unter Ubuntu, ich habe _Audacity_ über den Snap Store installiert:

```bash
sudo apt update
sudo apt install snapd
sudo snap install audacity
```

Du findest die Downloads für alle Betriebssysteme auf der Website: https://www.audacityteam.org/download/

Sobald du Audacity gestartet hast, ziehe deine Audiodatei in das Bearbeitungsfenster. In meinem Fall habe ich eine `.ogg'-Datei von meinem Handy bekommen.

{% imagePlaceholder "./src/assets/images/blog/audacity.jpg", "", "", "", "Audacity-Oberfläche mit geladener Audiodatei", "Die Audacity-Oberfläche sieht etwas unübersichtlich aus, aber das meiste braucht man nicht" %}

Jetzt kannst du einen Bereich für deinen Audioclip auswählen und ihn dann über "Edit" > "Clip Boundaries" > "Split" vom Rest der Datei trennen.

Du hast nun drei Bereiche.

{% imagePlaceholder "./src/assets/images/blog/audacity-three-areas.jpg", "", "", "", "Audacity-Schnittstelle mit der in drei Bereiche aufgeteilten Audiodatei, der mittlere ist die Auswahl, die wir exportieren werden" %}

Du kannst die Bereiche, die du nicht willst, markieren und löschen. Achte darauf, dass der Ton recht schnell beginnt, da eine hörbare Verzögerung nach dem `click event` nicht natürlich wirkt.

Auf der linken Seite des Schnittbereichs kannst du die Lautstärke einstellen. Mein Originalsound ist für meinen Geschmack etwas zu laut und intensiv, zumal wahrscheinlich niemand erwartet, dass die Aktion ein hörbares Geräusch auslöst. Stelle die Lautstärke ein wenig herunter, bis sie im Verhältnis zu deiner normalen Lautstärke bei der Musikwiedergabe angenehm klingt (heutzutage drehen die Leute ihre Lautsprecher nicht mehr herunter).

Es gibt noch weitere Effekte, die du ausprobieren kannst, aber ich bin jetzt mit meiner Aufnahme zufrieden.

Über "File" > "Export" und "Export as mp3" kannst du deinen Ton speichern. Du wirs nach dem Speicherort gefragt und kannst Metadaten hinzufügen.

Meine Datei ist 3,9kb groß.

## Baue den Sound in deine Website ein

Damit dies funktioniert, brauchst du keinen _statischen Website-Generator_ (ein Tool, das Webseiten im Voraus erstellt, was sie schneller und sicherer macht, da sie nicht auf serverseitige Verarbeitung angewiesen sind), du kannst deinen Sound einfach in einem Ordner deiner Wahl ablegen.

In meinem Projekt füge ich `light-on.mp3` zu einem Ordner hinzu, der sich in `src/assets/sounds` befindet.

Ich habe diese Website mit [Eleventy](https://www.11ty.dev/) gebaut und brauche einen sogenannten _Build-Step_, der alles von meinem Eingabeordner in den Ausgabeordner überträgt.

Ich verwende [Passthrough File Copy](https://www.11ty.dev/docs/copy/) in meiner [Eleventy config-Datei](/de/blog/organisierung-der-eleventy-config-datei/), um sicherzustellen, dass der Ordner und sein Inhalt kopiert werden.

```js
eleventyConfig.addPassthroughCopy('src/assets/sounds/');
```

In deinem HTML musst du den Bereich definieren, der auf den Klick "hören" soll. In meinem Fall ist das ein `button` neben meinem Namen und dem Navigationselement.

```html
<button type="button" id="theme-toggle">
  <!-- svg icon, zum Beispiel -->
</button>
```

Ich bette meinen Sound als Teil eines Themenumschalters mit einigen weiteren Einstellungen ein, aber der relevante Teil in meinem JavaScript ist dieser:

```js
const onClick = () => {
  const switchSound = new Audio('/assets/sounds/light-on.mp3');
  switchSound.play();
};

window.onload = () => {
  document.querySelector('#theme-toggle').addEventListener('click', onClick);
};
```

Alle Aktionen - die Deklaration der Variablen `switchSound`, das anschließende Laden der Datei und das eigentliche Abspielen des Sounds (mittels der `HTMLMediaElement` `play()` Methode) - finden in der "function expression" `onClick` statt.

Das Ladeereignis für das Window-Objekt wird ausgelöst, wenn die gesamte Seite, einschließlich der CSS-Dateien, Bilder und anderer Ressourcen, geladen wurde. Es ist verfügbar über die `onload`-property.
Ich lasse es nach Klicks auf den `button` mit der ID `#theme-toggle` warten.

Für einen gültigen Theme-Switcher müssen noch mehr Dinge passieren, du kannst dir den kompletten [Theme-Switcher von dieser Website auf GitHub](https://github.com/madrilene/lenesaile.com/blob/main/src/assets/scripts/theme-toggle.js) ansehen.
