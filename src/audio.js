// Web Audio API Procedural Sound Synthesizer
// Generates instant, zero-latency, high-dopamine sound effects without external audio files.

class SoundFX {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.gemPitchIndex = 0;
    this.lastGemTime = 0;

    // SFX Settings
    const savedSfxMuted = localStorage.getItem('dopamine_sfx_muted') === 'true';
    this.sfxEnabled = !savedSfxMuted;
    this.sfxVolume = localStorage.getItem('dopamine_sfx_volume') !== null
      ? Number(localStorage.getItem('dopamine_sfx_volume'))
      : 80;

    // Music BGM Settings
    const savedMusicMuted = localStorage.getItem('dopamine_music_muted') === 'true';
    this.musicEnabled = !savedMusicMuted;
    this.musicVolume = localStorage.getItem('dopamine_music_volume') !== null
      ? Number(localStorage.getItem('dopamine_music_volume'))
      : 70;

    // Backward compatibility
    this.enabled = this.sfxEnabled;

    // Music Sequencer State
    this.initMusic();

    // Pentatonic scale frequencies for euphoric gem collection (C4 to C7)
    this.pentatonicScale = [
      261.63, 293.66, 329.63, 392.00, 440.00, // C4 - A4
      523.25, 587.33, 659.25, 783.99, 880.00, // C5 - A5
      1046.50, 1174.66, 1318.51, 1567.98, 1760.00, // C6 - A6
      2093.00, 2349.32, 2637.02, 3135.96 // C7+
    ];
  }

  // SFX Controls
  setSfxEnabled(enabled) {
    this.sfxEnabled = !!enabled;
    this.enabled = this.sfxEnabled;
    localStorage.setItem('dopamine_sfx_muted', this.sfxEnabled ? 'false' : 'true');
    this.updateGains();
  }

  toggleSfx() {
    this.setSfxEnabled(!this.sfxEnabled);
    return this.sfxEnabled;
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(100, Number(vol) || 0));
    localStorage.setItem('dopamine_sfx_volume', String(this.sfxVolume));
    this.updateGains();
  }

  // Music Controls
  setMusicEnabled(enabled) {
    this.musicEnabled = !!enabled;
    localStorage.setItem('dopamine_music_muted', this.musicEnabled ? 'false' : 'true');
    this.updateGains();
    if (!this.musicEnabled) {
      this.pauseMusic();
    } else if (this.isPlayingMusic) {
      this.resumeMusic();
    }
  }

  toggleMusic() {
    this.setMusicEnabled(!this.musicEnabled);
    return this.musicEnabled;
  }

  setMusicVolume(vol) {
    this.musicVolume = Math.max(0, Math.min(100, Number(vol) || 0));
    localStorage.setItem('dopamine_music_volume', String(this.musicVolume));
    this.updateGains();
  }

  updateGains() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.sfxGain) {
      const sfxVol = this.sfxEnabled ? (this.sfxVolume / 100) * 0.45 : 0;
      this.sfxGain.gain.setValueAtTime(sfxVol, now);
    }
    if (this.musicGain) {
      const musVol = this.musicEnabled ? (this.musicVolume / 100) * 0.28 : 0;
      this.musicGain.gain.setValueAtTime(musVol, now);
    }
  }

  // Backward compatibility methods
  setMuted(muted) {
    this.setSfxEnabled(!muted);
  }

  toggleMute() {
    return !this.toggleSfx();
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.destinationGain = this.ctx.createGain();
    this.destinationGain.gain.value = 1.0;
    this.destinationGain.connect(this.ctx.destination);

    // masterGain serves as SFX bus so all existing 18 SFX methods route directly
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.destinationGain);
    this.sfxGain = this.masterGain;

    this.musicGain = this.ctx.createGain();
    this.musicGain.connect(this.destinationGain);

    this.updateGains();
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pitch-escalating gem pickup sound (Dopamine trigger #1)
  playGemPickup() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Reset streak if gap > 1.2s
    if (now - this.lastGemTime > 1.2) {
      this.gemPitchIndex = 0;
    } else {
      this.gemPitchIndex = Math.min(this.gemPitchIndex + 1, this.pentatonicScale.length - 1);
    }
    this.lastGemTime = now;

    const freq = this.pentatonicScale[this.gemPitchIndex];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    // Slight pitch bend upwards for crisp chime
    osc.frequency.exponentialRampToValueAtTime(freq * 1.04, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.13);

    // If reaching high tier streak, trigger harmonic sparkle overtone
    if (this.gemPitchIndex >= 8) {
      const harmOsc = this.ctx.createOscillator();
      const harmGain = this.ctx.createGain();
      harmOsc.type = 'triangle';
      harmOsc.frequency.setValueAtTime(freq * 2, now);
      harmGain.gain.setValueAtTime(0.12, now);
      harmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      harmOsc.connect(harmGain);
      harmGain.connect(this.masterGain);
      harmOsc.start(now);
      harmOsc.stop(now + 0.19);
    }
  }

  // Blaster Pew Pew
  playShoot(type = 'blaster') {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'blaster') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.09);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    } else if (type === 'lightning') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Enemy Hit Pop
  playHit() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Critical Hit Heavy Crunch
  playCrit() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.14);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Level Up Glorious Chime Fanfare
  playLevelUp() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const notes = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // E4, G4, C5, E5, G5, C6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = startTime + idx * 0.07;

      osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      const duration = idx === notes.length - 1 ? 0.6 : 0.2;
      gain.gain.setValueAtTime(0.28, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + duration + 0.02);
    });
  }

  // Card select click
  playCardSelect() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Horde Alert Siren
  playHordeSiren() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.3);
    osc.frequency.linearRampToValueAtTime(400, now + 0.6);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.66);
  }

  // Explosion Boom
  playExplosion() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Sub-bass sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.4);
  }

    // Frenzy Mode activation sound
  playFrenzy() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.04;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.16);
    });
  }

  // Slot machine reel tick
  playSlotTick() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Slot Machine Mega Jackpot Fanfare
  playJackpot() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const chordNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    const now = this.ctx.currentTime;

    chordNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.08;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.52);
    });
  }

  // Hyperspace Warp Jump sci-fi sweep and heavy entry boom
  playWarpJump() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // 1. Ascending hyper-drive charge
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(90, now);
    osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.55);
    gain1.gain.setValueAtTime(0.01, now);
    gain1.gain.linearRampToValueAtTime(0.25, now + 0.45);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(now);
    osc1.stop(now + 0.7);

    // 2. Heavy sub-bass entry boom
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(240, now + 0.5);
    osc2.frequency.exponentialRampToValueAtTime(32, now + 1.4);
    gain2.gain.setValueAtTime(0.45, now + 0.5);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.45);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(now + 0.5);
    osc2.stop(now + 1.5);
  }

  // EMP Shockwave Heavy Sub-Bass Boom
  playEmpShockwave() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.68);
  }

  // Micro-missile launch whoosh
  playMissileLaunch() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(950, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Combo Milestone Stinger
  playComboMilestone() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [659.25, 880.00, 1318.51].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.06;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.22);
    });
  }

  // Red Mythic Card Epic Appearance Fanfare
  playMythicFanfare() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const dramaticChords = [130.81, 164.81, 196.00, 261.63, 523.25, 1046.50];
    dramaticChords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.05;

      osc.type = idx < 3 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.92);
    });
  }

  // =========================================================================
  // DYNAMIC PROCEDURAL BACKGROUND MUSIC (BGM) ENGINE - SECTORS 1, 2, 3
  // =========================================================================
  initMusic() {
    this.musicTimer = null;
    this.musicStep = 0;
    this.musicBar = 0;
    this.musicSector = 1;
    this.isPlayingMusic = false;
    this.noiseBuffer = null;
  }

  getNoiseBuffer() {
    if (!this.noiseBuffer && this.ctx) {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.2);
      this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return this.noiseBuffer;
  }

  startMusic(sector = 1) {
    this.musicSector = Number(sector) || 1;
    this.isPlayingMusic = true;
    this.resume();
    if (!this.ctx || !this.musicEnabled) return;
    if (this.musicTimer) return;

    this.musicStep = 0;
    this.musicBar = 0;
    this.stepMusic();
  }

  setMusicSector(sector) {
    this.musicSector = Number(sector) || 1;
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  pauseMusic() {
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  resumeMusic() {
    if (this.isPlayingMusic && this.musicEnabled && !this.musicTimer) {
      this.stepMusic();
    }
  }

  stepMusic() {
    if (!this.isPlayingMusic || !this.musicEnabled || !this.ctx) return;

    const sector = this.musicSector;
    // Tempos: Sector 1 = 110 BPM, Sector 2 = 128 BPM, Sector 3 = 144 BPM
    const bpm = sector === 3 ? 144 : (sector === 2 ? 128 : 110);
    const stepDuration = 60 / bpm / 4; // 16th note in seconds

    const now = this.ctx.currentTime;
    this.playMusicStep(now, sector, this.musicStep, this.musicBar);

    this.musicStep = (this.musicStep + 1) % 16;
    if (this.musicStep === 0) {
      this.musicBar = (this.musicBar + 1) % 4;
    }

    this.musicTimer = setTimeout(() => {
      this.stepMusic();
    }, stepDuration * 1000);
  }

  playMusicStep(now, sector, step, bar) {
    if (!this.musicGain || !this.ctx) return;

    if (sector === 1) {
      // SECTOR 1: VỰC SÂU NGÂN HÀ (Deep Cosmic Galaxy - Am/F/C/G Ambient Starlight)
      const bassFreqs = [55.00, 43.65, 65.41, 49.00]; // A1, F1, C2, G1
      const arpFreqs = [440.00, 523.25, 659.25, 783.99, 880.00, 1046.50, 783.99, 659.25];

      // Deep gentle sub bass on steps 0, 8
      if (step === 0 || step === 8) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(bassFreqs[bar % 4], now);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (step === 0 ? 0.9 : 0.45));
        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(now);
        osc.stop(now + 0.95);
      }

      // Shimmering starlight melody arp on even steps
      if (step % 2 === 0) {
        const noteIdx = (step / 2 + bar * 2) % arpFreqs.length;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(arpFreqs[noteIdx], now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(now);
        osc.stop(now + 0.24);
      }

      // Soft cosmic chord pad on bar start (step 0)
      if (step === 0) {
        const padChord = [
          [220.00, 261.63, 329.63], // Am
          [174.61, 220.00, 261.63], // F
          [130.81, 164.81, 196.00], // C
          [196.00, 246.94, 293.66]  // G
        ][bar % 4];

        padChord.forEach(f => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.05, now + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
          osc.connect(gain);
          gain.connect(this.musicGain);
          osc.start(now);
          osc.stop(now + 1.85);
        });
      }
    } else if (sector === 2) {
      // SECTOR 2: CHIẾN TRƯỜNG HÀNH TINH (Planetary Warzone - Dm/Bb/C/Am Combat Pulse)
      const bassNotes = [73.42, 58.27, 65.41, 55.00]; // D2, Bb1, C2, A1
      const leadNotes = [293.66, 349.23, 440.00, 587.33, 523.25, 440.00, 349.23, 392.00, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 349.23, 329.63];

      // 1. Kick on 4-on-the-floor
      if (step % 4 === 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(42, now + 0.08);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(now);
        osc.stop(now + 0.13);
      }

      // 2. Snare / Cyber Clap on steps 4, 12
      if (step === 4 || step === 12) {
        const noise = this.getNoiseBuffer();
        if (noise) {
          const src = this.ctx.createBufferSource();
          src.buffer = noise;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1200, now);
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(this.musicGain);
          src.start(now);
          src.stop(now + 0.13);
        }
      }

      // 3. Hi-Hat ticking on steps 2, 6, 10, 14
      if (step % 4 === 2) {
        const noise = this.getNoiseBuffer();
        if (noise) {
          const src = this.ctx.createBufferSource();
          src.buffer = noise;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(7500, now);
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.10, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(this.musicGain);
          src.start(now);
          src.stop(now + 0.045);
        }
      }

      // 4. Rolling Synth Bass (16th notes)
      const bFreq = bassNotes[bar % 4];
      const bOsc = this.ctx.createOscillator();
      const bFilter = this.ctx.createBiquadFilter();
      const bGain = this.ctx.createGain();
      bOsc.type = 'sawtooth';
      bOsc.frequency.setValueAtTime(bFreq, now);
      bFilter.type = 'lowpass';
      bFilter.frequency.setValueAtTime(step % 4 === 0 ? 1100 : 650, now);
      bGain.gain.setValueAtTime(step % 4 === 0 ? 0.35 : 0.22, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(this.musicGain);
      bOsc.start(now);
      bOsc.stop(now + 0.115);

      // 5. Combat Lead Arp (square wave)
      const lOsc = this.ctx.createOscillator();
      const lGain = this.ctx.createGain();
      lOsc.type = 'square';
      lOsc.frequency.setValueAtTime(leadNotes[step], now);
      lGain.gain.setValueAtTime(0.08, now);
      lGain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
      lOsc.connect(lGain);
      lGain.connect(this.musicGain);
      lOsc.start(now);
      lOsc.stop(now + 0.105);

    } else if (sector === 3) {
      // SECTOR 3: BÃO LỬA MẶT TRỜI & HỐ ĐEN (Solar Inferno Climax - Em/C/D/B7 144 BPM)
      const bassNotes = [41.20, 32.70, 36.71, 30.87]; // E1, C1, D1, B0
      const leadNotes = [659.25, 783.99, 987.77, 1318.51, 1174.66, 987.77, 783.99, 932.33, 987.77, 1174.66, 1479.98, 1567.98, 1318.51, 987.77, 783.99, 739.99];

      // 1. Double-Time High Speed Kick on 8th notes
      if (step % 2 === 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.07);
        gain.gain.setValueAtTime(0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(now);
        osc.stop(now + 0.095);
      }

      // 2. Heavy Industrial Snare on 4, 12
      if (step === 4 || step === 12) {
        const noise = this.getNoiseBuffer();
        if (noise) {
          const src = this.ctx.createBufferSource();
          src.buffer = noise;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1600, now);
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(this.musicGain);
          src.start(now);
          src.stop(now + 0.145);
        }
      }

      // 3. Constant 16th cyber hats
      const noise = this.getNoiseBuffer();
      if (noise) {
        const src = this.ctx.createBufferSource();
        src.buffer = noise;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(8000, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(step % 2 === 1 ? 0.12 : 0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);
        src.start(now);
        src.stop(now + 0.038);
      }

      // 4. Distorted Heavy Saw Sub-Bass
      const bOsc = this.ctx.createOscillator();
      const bFilter = this.ctx.createBiquadFilter();
      const bGain = this.ctx.createGain();
      bOsc.type = 'sawtooth';
      bOsc.frequency.setValueAtTime(bassNotes[bar % 4], now);
      bFilter.type = 'lowpass';
      bFilter.frequency.setValueAtTime(step % 2 === 0 ? 1400 : 750, now);
      bGain.gain.setValueAtTime(0.38, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(this.musicGain);
      bOsc.start(now);
      bOsc.stop(now + 0.105);

      // 5. Blazing Hyper Arp Lead
      const lOsc = this.ctx.createOscillator();
      const lGain = this.ctx.createGain();
      lOsc.type = 'sawtooth';
      lOsc.frequency.setValueAtTime(leadNotes[step], now);
      lGain.gain.setValueAtTime(0.12, now);
      lGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
      lOsc.connect(lGain);
      lGain.connect(this.musicGain);
      lOsc.start(now);
      lOsc.stop(now + 0.10);
    }
  }
}

export const sound = new SoundFX();
