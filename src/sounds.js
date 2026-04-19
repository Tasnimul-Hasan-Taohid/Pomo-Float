'use strict';

// All sounds generated with Web Audio API — zero external files needed

class SoundEngine {
  constructor() {
    this._ctx = null;
    this._vol = 0.6;
    this._enabled = true;
  }

  _getCtx() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  }

  setVolume(v) { this._vol = Math.max(0, Math.min(1, v)); }
  setEnabled(v) { this._enabled = v; }

  // ── Tick — soft click every second ─────────────────────────────
  tick() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    gain.gain.setValueAtTime(0.04 * this._vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(); osc.stop(ctx.currentTime + 0.05);
  }

  // ── Session complete — cheerful ascending chime ─────────────────
  sessionDone() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.15;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.35 * this._vol, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t); osc.stop(t + 0.45);
    });
  }

  // ── Break start — gentle descending tone, relaxed ───────────────
  breakStart() {
    if (!this._enabled) return;
    const ctx  = this._getCtx();
    const notes = [784, 659, 523]; // G5 E5 C5
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      const t = ctx.currentTime + i * 0.2;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25 * this._vol, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.start(t); osc.stop(t + 0.55);
    });
  }

  // ── Break end — two-note "wake up" alert ────────────────────────
  breakEnd() {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    [[440, 0], [880, 0.2], [440, 0.4]].forEach(([freq, delay]) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'square';
      const t = ctx.currentTime + delay;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15 * this._vol, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.start(t); osc.stop(t + 0.2);
    });
  }

  // ── Long break — warm triple chime ──────────────────────────────
  longBreakStart() {
    if (!this._enabled) return;
    const ctx   = this._getCtx();
    const notes = [392, 494, 659, 784, 659, 494]; // G4 B4 E5 G5 E5 B4
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.12;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3 * this._vol, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.start(t); osc.stop(t + 0.5);
    });
  }

  // ── Button click ────────────────────────────────────────────────
  click() {
    if (!this._enabled) return;
    const ctx  = this._getCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0.1 * this._vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  }

  // ── Milestone fanfare ───────────────────────────────────────────
  milestone() {
    if (!this._enabled) return;
    const ctx   = this._getCtx();
    const notes = [523, 523, 659, 523, 784, 698];
    const durs  = [0.15, 0.15, 0.15, 0.15, 0.3, 0.4];
    let t = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.18 * this._vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + durs[i]);
      osc.start(t); osc.stop(t + durs[i] + 0.02);
      t += durs[i];
    });
  }
}

window.SoundEngine = SoundEngine;
