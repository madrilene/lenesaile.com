document.addEventListener('DOMContentLoaded', async () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let popBuffer = null;
  let switchBuffer = null;

  async function loadPopSound() {
    const response = await fetch('/assets/sounds/pop.wav');
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
  }

  async function loadSwitchSound() {
    const response = await fetch('/assets/sounds/light-on.mp3');
    const arrayBuffer = await response.arrayBuffer();
    switchBuffer = await audioContext.decodeAudioData(arrayBuffer);
  }

  await Promise.all([loadPopSound(), loadSwitchSound()]);

  function playPop() {
    if (!popBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.7;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0);
  }

  function playSwitch() {
    if (!switchBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = switchBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }

  document.querySelectorAll('[data-sound-pop]').forEach(button => {
    button.addEventListener('click', () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      playPop();
    });
  });

  document.querySelectorAll('[data-sound-switch]').forEach(button => {
    button.addEventListener('click', () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      playSwitch();
    });
  });
});
