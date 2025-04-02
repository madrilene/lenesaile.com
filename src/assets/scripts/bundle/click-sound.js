document.addEventListener('DOMContentLoaded', async () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let soundBuffer = null;

  async function loadSound() {
    try {
      const response = await fetch('/assets/sounds/mouse.mp3');
      const arrayBuffer = await response.arrayBuffer();
      soundBuffer = await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  }

  await loadSound();

  function playSound() {
    if (!soundBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = soundBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0);
  }

  const clickableButtons = document.querySelectorAll('[data-click-sound]');

  clickableButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      playSound();
    });
  });
});
