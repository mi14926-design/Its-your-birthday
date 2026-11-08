/**
 * Web Audio API Music Box & Sound Effects Synthesizer
 * Provides gentle, sweet acoustic music box tunes for the birthday experience
 * without relying on external MP3 URLs that can break or fail.
 */

class MusicBoxSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private masterGain: GainNode | null = null;
  private stepTimeout: number | null = null;
  private currentNoteIndex: number = 0;
  private stateListeners: Array<(isPlaying: boolean, volume: number, isMuted: boolean) => void> = [];

  // "Happy Birthday to You" notes (frequencies in Hz) and relative durations
  private melody: Array<{ freq: number; duration: number; rest: number }> = [
    // Hap-py Birth-day to you
    { freq: 261.63, duration: 0.35, rest: 0.4 }, // C4
    { freq: 261.63, duration: 0.25, rest: 0.3 }, // C4
    { freq: 293.66, duration: 0.6, rest: 0.65 }, // D4
    { freq: 261.63, duration: 0.6, rest: 0.65 }, // C4
    { freq: 349.23, duration: 0.6, rest: 0.65 }, // F4
    { freq: 329.63, duration: 1.1, rest: 1.2 },  // E4

    // Hap-py Birth-day to you
    { freq: 261.63, duration: 0.35, rest: 0.4 }, // C4
    { freq: 261.63, duration: 0.25, rest: 0.3 }, // C4
    { freq: 293.66, duration: 0.6, rest: 0.65 }, // D4
    { freq: 261.63, duration: 0.6, rest: 0.65 }, // C4
    { freq: 392.00, duration: 0.6, rest: 0.65 }, // G4
    { freq: 349.23, duration: 1.1, rest: 1.2 },  // F4

    // Hap-py Birth-day dear friend
    { freq: 261.63, duration: 0.35, rest: 0.4 }, // C4
    { freq: 261.63, duration: 0.25, rest: 0.3 }, // C4
    { freq: 523.25, duration: 0.6, rest: 0.65 }, // C5
    { freq: 440.00, duration: 0.6, rest: 0.65 }, // A4
    { freq: 349.23, duration: 0.6, rest: 0.65 }, // F4
    { freq: 329.63, duration: 0.6, rest: 0.65 }, // E4
    { freq: 293.66, duration: 1.0, rest: 1.1 },  // D4

    // Hap-py Birth-day to you
    { freq: 466.16, duration: 0.35, rest: 0.4 }, // Bb4
    { freq: 466.16, duration: 0.25, rest: 0.3 }, // Bb4
    { freq: 440.00, duration: 0.6, rest: 0.65 }, // A4
    { freq: 349.23, duration: 0.6, rest: 0.65 }, // F4
    { freq: 392.00, duration: 0.6, rest: 0.65 }, // G4
    { freq: 349.23, duration: 1.3, rest: 1.5 },  // F4

    // Gentle musical box interlude (sparkling arpeggio)
    { freq: 523.25, duration: 0.4, rest: 0.4 },  // C5
    { freq: 659.25, duration: 0.4, rest: 0.4 },  // E5
    { freq: 783.99, duration: 0.4, rest: 0.4 },  // G5
    { freq: 1046.50, duration: 0.8, rest: 0.9 }, // C6
    { freq: 880.00, duration: 0.5, rest: 0.5 },  // A5
    { freq: 659.25, duration: 0.5, rest: 0.6 },  // E5
    { freq: 587.33, duration: 0.5, rest: 0.6 },  // D5
    { freq: 523.25, duration: 1.2, rest: 1.8 }   // C5
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private initMasterGain() {
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Play a single chiming music-box style note with crystalline harmonics
  public playMusicBoxNote(freq: number, duration: number = 0.8, gainScale: number = 0.28) {
    try {
      const ctx = this.getContext();
      this.initMasterGain();
      if (!this.masterGain) return;

      const now = ctx.currentTime;

      // Primary bell tone (sine)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Bell chime overtone (triangle)
      const oscOvertone = ctx.createOscillator();
      oscOvertone.type = 'triangle';
      oscOvertone.frequency.setValueAtTime(freq * 2.76, now); // Metallic harmonic ratio

      // Note gain envelope (pluck with exponential decay)
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(gainScale, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(gainScale * 0.2, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.45));

      osc.connect(noteGain);
      oscOvertone.connect(overtoneGain);
      noteGain.connect(this.masterGain);
      overtoneGain.connect(this.masterGain);

      osc.start(now);
      oscOvertone.start(now);
      osc.stop(now + duration);
      oscOvertone.stop(now + duration);
    } catch {
      // Audio not permitted or supported
    }
  }

  public startMelody() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.getContext();
    this.notifyState();
    this.playNextStep();
  }

  public pauseMelody() {
    this.isPlaying = false;
    if (this.stepTimeout) {
      clearTimeout(this.stepTimeout);
      this.stepTimeout = null;
    }
    this.notifyState();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pauseMelody();
    } else {
      this.startMelody();
    }
  }

  private playNextStep() {
    if (!this.isPlaying) return;

    const note = this.melody[this.currentNoteIndex];
    if (note) {
      this.playMusicBoxNote(note.freq, note.duration, 0.25);
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      this.stepTimeout = window.setTimeout(() => {
        this.playNextStep();
      }, note.rest * 1000);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notifyState();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notifyState();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(listener: (isPlaying: boolean, volume: number, isMuted: boolean) => void): () => void {
    this.stateListeners.push(listener);
    listener(this.isPlaying, this.volume, this.isMuted);
    return () => {
      this.stateListeners = this.stateListeners.filter(l => l !== listener);
    };
  }

  private notifyState() {
    this.stateListeners.forEach(listener => listener(this.isPlaying, this.volume, this.isMuted));
  }

  // --- Sound Effects ---

  // Candle blowing sound: gentle breath noise + magic twinkle chime
  public playCandleBlowSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Soft breath / whoosh filter
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.55);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.6);

      // Magic fairy chime sparkles after blowing
      const sparkleFreqs = [783.99, 987.77, 1174.66, 1567.98];
      sparkleFreqs.forEach((freq, idx) => {
        setTimeout(() => {
          this.playMusicBoxNote(freq, 0.7, 0.18);
        }, 300 + idx * 80);
      });
    } catch {
      // Audio fallback
    }
  }

  // Gift opening magical chime glissando
  public playGiftOpenSound() {
    try {
      const freqs = [392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51];
      freqs.forEach((freq, idx) => {
        setTimeout(() => {
          this.playMusicBoxNote(freq, 0.8, 0.22);
        }, idx * 70);
      });
    } catch {
      // Audio fallback
    }
  }

  // Confetti pop sound
  public playConfettiPopSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);

      // Little chime
      setTimeout(() => {
        this.playMusicBoxNote(880, 0.5, 0.15);
      }, 100);
    } catch {
      // Audio fallback
    }
  }
}

export const musicBox = new MusicBoxSynthesizer();
