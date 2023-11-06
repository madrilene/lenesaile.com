---
title: 'Recording, editing and integrating a sound for a click event'
description: "Whimsical interaction sounds have found their back into personal websites in recent years, and I think that's wonderful. I explain below how you can implement a sound in your website that has a click event as a trigger."
category: blogpost
key: 'eleventyi18n'
date: 2023-11-06
youtube: false
---

Who remembers the times when music or other nasty sounds randomly started playing as soon as you visited a website? I remember making sure to turn the speakers down before I went online (yes, I also remember consciously switching the internet on and off. That was expensive).

For a long time it was frowned upon to play any unsolicited sounds. The user rightfully should be in control to consciously play anything that triggers any kind of sound and moving image. Nevertheless, whimsical interaction sounds have found their back into personal websites in recent years, and I think that's wonderful. My site also makes a (hopefully) subtle sound in two places, namely when you switch between light and dark theme, and when you change the language. I'll explain below how you can implement a sound yourself that has a click event as a trigger.

## Record your sound

That's easy! Nowadays we always have a sound recorder with us. So I stand next to my old light switch and record its crackling sound with my phone.

{% imagePlaceholder "./src/assets/images/blog/wall.jpg", "", "", "", "A white wall with an old push-button switch", "My light switch, which was used for my theme switcher sound. So in a way, you actually switch my light on and off. " %}

Now send the sound to your computer, and here we have to cut it up. A free and easy-to-use tool is _Audacity_.

## Install and use Audacity

My system runs on Ubuntu, I installed it via snap store:

```bash
sudo apt update
sudo apt install snapd
sudo snap install audacity
```

You can find the downloads for all operating systems on their website: https://www.audacityteam.org/download/

Once you have Audacity running, drag your audio file into the editing window. In my case I got an `.ogg` file from my mobile phone.

{% imagePlaceholder "./src/assets/images/blog/audacity.jpg", "", "", "", "Audacity interface with the sound file loaded", "The Audacity interface looks a bit busy, but you don't need most of the stuff" %}

Now you can select an area for your audio clip and then separate it from the rest of the file via "Edit" > "Clip Boundaries" > "Split".

You now have three areas.

{% imagePlaceholder "./src/assets/images/blog/audacity-three-areas.jpg", "", "", "", "Audacity interface with the audio file split into three areas, the middle one is the selection we will export" %}

You can mark and delete the areas you don't want. Make sure that the sound starts quite quickly, as an audible delay after the click event does not seem natural.

On the left side of the cutting area you can adjust the volume. My original sound is a bit too loud and intense for my taste, especially as you probably don't expect the action to trigger an audible sound. Adjust it down a bit until it sounds pleasant in relation to your normal volume for music playback (people don't turn down their speakers nowadays).

You have some more effects available you can try, but I'm happy with my recording now.

Go to "File" > "Export" and select "Export as mp3". You will be asked for the save location and can add metadata.

My file is 3.9kb in size.

## Add the sound to your site

For this to work you don't need a static site generator (a tool that creates web pages in advance, making them faster and more secure, as they don't rely on server-side processing), you can just put your sound in a folder of your choice.

In my project I add `light-on.mp3` to a folder located in `src/assets/sounds`.

I built this website with [Eleventy](https://www.11ty.dev/), and I need a build step that transfers everything from my input folder to the output folder.

I use [Passthrough File Copy](https://www.11ty.dev/docs/copy/) in my [Eleventy config file](/en/blog/organizing-the-eleventy-config-file/) to ensure that the folder and its contents are copied.

```js
eleventyConfig.addPassthroughCopy('src/assets/sounds/');
```

In your HTML you must define the area to listen for the click. In my case, that's a `button` next to my name and navigation.

```html
<button type="button" id="theme-toggle">
  <!-- svg icon, for example -->
</button>
```

I embed my sound as part of a theme switcher with a few more settings, but the relevant part in my JavaScript is this one:

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
  document.querySelector('#theme-toggle').addEventListener('click', onClick);
};
```

The first line declares a variable called `switchSound` without initializing it. Being defined at a higher scope it can be accessed by different parts of the code. We then listen for the `DOMContentLoaded` event, which is fired when the HTML document has been completely loaded and parsed, but external resources like stylesheets and images may not have been fully loaded yet. This is to make sure that the loading of the sound does not block any important assets.

Within the event listener for `DOMContentLoaded`, I create the new `Audio` object and assign it to the `switchSound` variable. The actual playing of the sound (using the `HTMLMediaElement` `play()` method) - takes place in the function expression `onClick`.

The `load` event for the `window` object is triggered when the entire page, including styles, images and other resources, is loaded. It is available via the `onload` property.
I make it listen for clicks on the `button` with an ID of `#theme-toggle`.

For a valid theme switcher more things have to happen, you can have a look at the [theme switcher on this page on GitHub](https://github.com/madrilene/lenesaile.com/blob/main/src/assets/scripts/theme-toggle.js).
