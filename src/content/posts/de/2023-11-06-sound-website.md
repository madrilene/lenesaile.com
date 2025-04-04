---
title: 'Aufnehmen, Bearbeiten und Einbauen eines Sounds'
description: 'Kleine Interaktionssounds haben in den letzten Jahren wieder Einzug in persönliche Websites gehalten, und das finde ich wunderbar.'
category: blogpost
key: 'audioswitch'
date: 2023-11-06
---

Wer erinnert sich noch an die Zeiten, in denen plötzlich Musik oder andere unangenehme Geräusche zu spielen begannen, sobald man eine Website besuchte? Ich erinnere mich noch daran, dass ich die Lautsprecher runterdrehte, bevor ich online ging (ja, ich erinnere mich auch daran, wie ich das Internet bewusst ein- und ausschaltete. Das war teuer).

Lange Zeit war es verpönt, irgendwelche unaufgefordert Töne abzuspielen. Besucher sollen zu Recht die Kontrolle darüber haben, ob sie bewusst etwas abspielen wollen, das irgendeine Art von Ton und bewegtem Bild auslöst. Nichtsdestotrotz haben kleine Interaktionssounds in den letzten Jahren wieder Einzug in persönliche Websites gehalten, und das finde ich wunderbar. Auch meine Website gibt an zwei Stellen einen (hoffentlich) subtilen Ton von sich, nämlich wenn du zwischen "light" und "dark" wechselst und wenn du die Sprache änderst. Im Folgenden erkläre ich, wie du selbst einen Sound integrieren kannst, der eien `click event` als Auslöser hat.

## Ton aufnehmen

Das ist ganz einfach! Heutzutage haben wir immer ein Aufnahmegerät dabei. Ich stelle mich neben meinen alten Lichtschalter und nehme sein knarzendes Geräusch mit meinem Handy auf.

{% image "./src/assets/images/blog/wall.jpg", "Eine weiße Wand mit einem alten Druckknopfschalter", "Mein Lichtschalter, der für den Sound meines Theme-Umschalters verwendet wurde (Ja, ich hab mich da hingestellt und hab das aufgenommen). In gewisser Weise schaltest du also tatsächlich mein Licht an und aus." %}

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

{% image "./src/assets/images/blog/audacity.jpg", "Audacity-Oberfläche mit geladener Audiodatei", "Die Audacity-Oberfläche sieht etwas unübersichtlich aus, aber das meiste braucht man nicht" %}

Jetzt kannst du einen Bereich für deinen Audioclip auswählen und ihn dann über "Edit" > "Clip Boundaries" > "Split" vom Rest der Datei trennen.

Du hast nun drei Bereiche.

{% image "./src/assets/images/blog/audacity-three-areas.jpg", "Audacity-Schnittstelle mit der in drei Bereiche aufgeteilten Audiodatei, der mittlere ist die Auswahl, die wir exportieren werden" %}

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

In deinem HTML musst du den Bereich definieren, der auf den Klick "hören" soll. In meinem Fall ist das ein `button`.

```html
<button type="button" data-sound-switch>
  <!-- svg icon, zum Beispiel -->
</button>
```

## Mit HTMLAudioElement: Audio() constructor

Als Teil eines Theme-Umschalters ist der relevante Teil im JavaScript:

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

Die erste Zeile deklariert eine Variable namens `switchSound`, ohne sie zu initialisieren. Da sie in einem höheren "scope" definiert ist, kann ich darauf von verschiedenen Bereichen des Codes zugegreifen. Dann warten wir auf den event `DOMContentLoaded`, der ausgelöst wird, wenn das HTML-Dokument vollständig geladen und geparst wurde, externe Ressourcen wie Stylesheets und Bilder aber möglicherweise noch nicht vollständig geladen wurden. Damit soll sichergestellt werden, dass das Laden des Tons keine wichtigen Ressourcen blockiert.

Innerhalb des Event-Listeners für `DOMContentLoaded` erstelle ich das neue `Audio`-Objekt und weise es der Variablen `switchSound` zu. Das eigentliche Abspielen des Sounds (unter Verwendung der `HTMLMediaElement` `play()` Methode) - findet im Funktionsausdruck `onClick` statt.

Der `load`-event für das `window`-Objekt wird ausgelöst, wenn die gesamte Seite, einschließlich CSS, Bilder und anderer Ressourcen, geladen wurde. Es ist über die _property_ `onload` verfügbar.

## Mit der Web Audio API

Der obige Code funktioniert gut für grundlegende Bedürfnisse - die Web Audio API ermöglicht eine bessere Leistung und Kontrolle.

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
Statt ein neues `Audio`-Objekt jedes Mal zu erstellen, holen wir uns die `.mp3`-Datei einmal und dekodieren sie und speichern den dekodierten Ton in `switchBuffer`. `AudioContext` gibt uns eine Steuerung auf Sample-Ebene über die Audiowiedergabe. Das bedeutet, dass es Audio als rohe digitale Daten, tatsächliche Wellenformen, bereitstellt: Jetzt können wir Dinge wie Ein- und Ausblenden, Lautstärkeregelung, Änderung der Wiedergabegeschwindigkeit usw. tun. [Sieh dir die mdn-Dokumentation an](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), um zu sehen, was möglich ist. Um die Lautstärke zu steuern, können wir z.B. Folgendes tun:

```js
const gainNode = audioContext.createGain()
gainNode.gain.value = 0.5
source.connect(gainNode).connect(audioContext.destination)
```