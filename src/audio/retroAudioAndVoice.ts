// Nostalgic 16-Bit Chiptune, Radar SFX & Spoken Mentor Voice Engine (Dr. Rudra / "Radar Bajey")

class RetroAudioAndVoiceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private bgmTimer: number | null = null;
  private bgmStep = 0;

  public sfxEnabled = true;
  public bgmEnabled = false;
  public voiceEnabled = true;

  private mouthCallback: ((open: boolean) => void) | null = null;
  private speakingChangeCallback: ((speaking: boolean) => void) | null = null;
  private mouthInterval: number | null = null;

  public unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.55;
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.14;
      this.bgmGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    // Warm up speechSynthesis voices list
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }

  public onMouthState(cb: ((open: boolean) => void) | null) {
    this.mouthCallback = cb;
  }

  public onSpeakingState(cb: ((speaking: boolean) => void) | null) {
    this.speakingChangeCallback = cb;
  }

  private duckBgm(duck: boolean) {
    if (!this.ctx || !this.bgmGain) return;
    const now = this.ctx.currentTime;
    this.bgmGain.gain.cancelScheduledValues(now);
    this.bgmGain.gain.linearRampToValueAtTime(duck ? 0.04 : 0.14, now + 0.2);
  }

  public toggleBgm(force?: boolean): boolean {
    this.unlock();
    this.bgmEnabled = force !== undefined ? force : !this.bgmEnabled;
    if (this.bgmEnabled) {
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }
    return this.bgmEnabled;
  }

  private startBgmLoop() {
    this.stopBgmLoop();
    // Nostalgic Himalayan Pentatonic 16-bit sequence (F major / D minor pentatonic mountain flute feel)
    const leadNotes = [
      587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25,
      587.33, 659.25, 523.25, 440.0, 523.25, 587.33, 659.25, 0,
      659.25, 783.99, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33,
      523.25, 587.33, 523.25, 440.0, 392.0, 440.0, 587.33, 0
    ];
    const bassNotes = [
      146.83, 220.0, 293.66, 220.0, 130.81, 196.0, 261.63, 196.0,
      174.61, 261.63, 349.23, 261.63, 146.83, 220.0, 293.66, 220.0
    ];

    this.bgmTimer = window.setInterval(() => {
      if (!this.bgmEnabled || !this.ctx || !this.bgmGain || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const lead = leadNotes[this.bgmStep % leadNotes.length];
      const bass = bassNotes[Math.floor(this.bgmStep / 2) % bassNotes.length];

      // Soft 16-bit flute triangle lead
      if (lead > 0) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(lead, now);
        // Gentle vibrato
        osc.frequency.linearRampToValueAtTime(lead * 1.004, now + 0.16);
        osc.frequency.linearRampToValueAtTime(lead, now + 0.3);
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.28, now + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.33);
        osc.connect(g);
        g.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.35);
      }

      // Warm pulse/sine arpeggio bass on even steps
      if (this.bgmStep % 2 === 0 && bass > 0) {
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(bass, now);
        bGain.gain.setValueAtTime(0.001, now);
        bGain.gain.linearRampToValueAtTime(0.22, now + 0.02);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.62);
        bOsc.connect(bGain);
        bGain.connect(this.bgmGain);
        bOsc.start(now);
        bOsc.stop(now + 0.65);
      }

      this.bgmStep++;
    }, 340);
  }

  private stopBgmLoop() {
    if (this.bgmTimer !== null) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public playUiClick(pitch = 660) {
    if (!this.sfxEnabled) return;
    this.unlock();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.setValueAtTime(pitch * 1.25, now + 0.035);
    g.gain.setValueAtTime(0.08, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.085);
  }

  public playFootstep(onSnow = false) {
    if (!this.sfxEnabled || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    const base = onSnow ? 290 + Math.random() * 60 : 145 + Math.random() * 35;
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.045);
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.055);
  }

  public playRadarPing(band: 'L' | 'S' = 'L') {
    if (!this.sfxEnabled) return;
    this.unlock();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    const startFreq = band === 'L' ? 420 : 840;
    const endFreq = band === 'L' ? 980 : 1560;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.18);
    g.gain.setValueAtTime(0.16, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.44);
  }

  // 3D Geodetic Terrain Extrusion Sweep Sound
  public playWarpTo3D() {
    if (!this.sfxEnabled) return;
    this.unlock();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const arp = [220, 277.18, 329.63, 440, 554.37, 659.25, 880, 1174.66];
    arp.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const t = now + idx * 0.075;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = idx < 4 ? 'sawtooth' : 'square';
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.09, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.24);
    });
  }

  public playWarpTo2D() {
    if (!this.sfxEnabled) return;
    this.unlock();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const arp = [880, 659.25, 554.37, 440, 329.63, 220];
    arp.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const t = now + idx * 0.065;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.18);
    });
  }

  public playBadgeUnlock() {
    if (!this.sfxEnabled) return;
    this.unlock();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      if (!this.ctx || !this.masterGain) return;
      const t = now + i * 0.09;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + (i === 3 ? 0.45 : 0.15));
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + (i === 3 ? 0.48 : 0.16));
    });
  }

  public playDiscoveryChime() {
    this.playBadgeUnlock();
  }

  public playBlip() {
    this.playUiClick(340);
  }

  public playSirenAlert() {
    if (!this.sfxEnabled) return;
    this.unlock();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const t = now + i * 0.36;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.linearRampToValueAtTime(860, t + 0.18);
      osc.frequency.linearRampToValueAtTime(520, t + 0.34);
      g.gain.setValueAtTime(0.09, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.36);
    }
  }

  public playRetroTalkBlip(moodPitch = 250) {
    if (!this.sfxEnabled || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'square';
    const f = moodPitch + (Math.random() * 55 - 25);
    osc.frequency.setValueAtTime(f, now);
    g.gain.setValueAtTime(0.032, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.042);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.045);
  }

  private playRadioKeyChirp() {
    if (!this.sfxEnabled || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1250, now);
    osc.frequency.setValueAtTime(1620, now + 0.03);
    g.gain.setValueAtTime(0.05, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.075);
  }

  public stopSpeaking() {
    if (this.mouthInterval !== null) {
      clearInterval(this.mouthInterval);
      this.mouthInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.duckBgm(false);
    this.mouthCallback?.(false);
    this.speakingChangeCallback?.(false);
  }

  public speakMentor(text: string, mood: 'welcome' | 'radar' | 'warning' | 'somber' | 'eureka' = 'welcome') {
    this.stopSpeaking();
    if (!this.voiceEnabled) return;
    this.unlock();
    this.playRadioKeyChirp();

    // Clean display abbreviations for natural speech
    const cleanSpeech = text
      .replace(/L-band/gi, 'L band')
      .replace(/S-band/gi, 'S band')
      .replace(/InSAR/g, 'In-SAR')
      .replace(/NISAR/g, 'Nigh-SAR')
      .replace(/NPR/g, 'Nepali Rupees')
      .replace(/m³/g, 'cubic meters')
      .replace(/εr/g, 'dielectric constant')
      .replace(/γ/g, 'coherence');

    const hasSpeechApi = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

    if (hasSpeechApi) {
      const voices = window.speechSynthesis.getVoices();
      const utter = new SpeechSynthesisUtterance(cleanSpeech);

      // Prefer a warm, clear mentor voice (South Asian / UK / Google English / Natural)
      const preferred =
        voices.find((v) => /en[-_](IN|NP|GB)/i.test(v.lang) && /Google|Natural|Male|Daniel|Rishi/i.test(v.name)) ||
        voices.find((v) => /en[-_](IN|GB)/i.test(v.lang)) ||
        voices.find((v) => /en/i.test(v.lang) && /Google|Natural/i.test(v.name)) ||
        voices.find((v) => /en/i.test(v.lang));

      if (preferred) utter.voice = preferred;
      utter.rate = mood === 'somber' ? 0.91 : mood === 'warning' ? 1.02 : 0.97;
      utter.pitch = mood === 'somber' ? 0.86 : 0.92;
      utter.volume = 1.0;

      let toggle = false;
      const startMouthAnim = () => {
        this.duckBgm(true);
        this.speakingChangeCallback?.(true);
        if (this.mouthInterval !== null) clearInterval(this.mouthInterval);
        this.mouthInterval = window.setInterval(() => {
          toggle = !toggle;
          this.mouthCallback?.(toggle);
          // If no OS TTS voices exist at all (e.g., minimal container), emit nostalgic 16-bit RPG voice blips!
          if (voices.length === 0 && toggle) {
            this.playRetroTalkBlip(mood === 'somber' ? 195 : 245);
          }
        }, 125);
      };

      const finishSpeech = () => {
        if (this.mouthInterval !== null) {
          clearInterval(this.mouthInterval);
          this.mouthInterval = null;
        }
        this.duckBgm(false);
        this.mouthCallback?.(false);
        this.speakingChangeCallback?.(false);
      };

      utter.onstart = startMouthAnim;
      utter.onend = finishSpeech;
      utter.onerror = finishSpeech;

      // Fallback in case speechSynthesis has 0 system voices and doesn't fire onstart
      if (voices.length === 0) {
        startMouthAnim();
        const durationMs = Math.min(7500, Math.max(2200, cleanSpeech.length * 42));
        window.setTimeout(finishSpeech, durationMs);
      } else {
        window.speechSynthesis.speak(utter);
      }
    }
  }
}

export const retroAudio = new RetroAudioAndVoiceEngine();

