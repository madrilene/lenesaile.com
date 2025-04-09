document.addEventListener('DOMContentLoaded', async () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let popBuffer = null;
  let switchBuffer = null;

  document.addEventListener(
    'click',
    () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    },
    {once: true}
  );

  async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  }

  [popBuffer, switchBuffer] = await Promise.all([
    loadSound('/assets/sounds/pop.wav'),
    loadSound('/assets/sounds/light-on.mp3')
  ]);

  function playBuffer(buffer) {
    if (!buffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    source.onended = () => source.disconnect();
  }

  document.querySelectorAll('[data-sound-pop]').forEach(button => {
    button.addEventListener('click', () => playBuffer(popBuffer));
  });

  document.querySelectorAll('[data-sound-switch]').forEach(button => {
    button.addEventListener('click', () => playBuffer(switchBuffer));
  });
});
