import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  // Center blast
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#f472b6', '#fb7185', '#c084fc', '#fde047', '#67e8f9', '#ffffff']
  });

  // Left and right bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ec4899', '#a855f7', '#fbbf24', '#f43f5e']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ec4899', '#a855f7', '#fbbf24', '#f43f5e']
    });
  }, 250);
}

export function fireGentleHeartConfetti() {
  const end = Date.now() + 1500;
  const colors = ['#f472b6', '#fda4af', '#f43f5e', '#fbcfe8'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireCakeBlowConfetti() {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#fbbf24', '#f59e0b', '#ec4899', '#a855f7', '#38bdf8', '#ffffff'],
    scalar: 1.2
  });
}
