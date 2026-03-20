"use client";

import { useEffect, useRef, useState } from "react";

type SoundId = "lofi" | "fire" | "rain" | "ocean" | "forest" | "magic" | "potion";

interface Sound {
  id: SoundId;
  label: string;
  emoji: string;
}

const SOUNDS: Sound[] = [
  { id: "lofi",   label: "Lo-fi",   emoji: "🎵" },
  { id: "fire",   label: "Şömine",  emoji: "🔥" },
  { id: "rain",   label: "Yağmur",  emoji: "🌧️" },
  { id: "ocean",  label: "Okyanus", emoji: "🌊" },
  { id: "forest", label: "Orman",   emoji: "🌲" },
  { id: "magic",  label: "Büyü",    emoji: "✨" },
  { id: "potion", label: "İksir",   emoji: "⚗️" },
];

class AmbientEngine {
  private ctx: AudioContext;
  private nodes: AudioNode[] = [];
  private masterGain: GainNode;

  constructor() {
    this.ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);
  }

  setVolume(v: number) {
    this.masterGain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.3);
  }

  stop() {
    this.nodes.forEach((n) => {
      try { (n as OscillatorNode).stop?.(); } catch { /* ignore */ }
    });
    this.nodes = [];
  }

  private noise(type: "white" | "brown" | "pink" = "brown"): AudioBufferSourceNode {
    const bufferSize = this.ctx.sampleRate * 8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    if (type === "white") {
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    } else if (type === "brown") {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * white) / 1.02;
        last = data[i];
        data[i] *= 2.5;
      }
    } else {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + white * 0.5362) * 0.08;
      }
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    return src;
  }

  private osc(freq: number, type: OscillatorType = "sine"): OscillatorNode {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    return o;
  }

  // 🎵 Lo-fi
  playLofi() {
    const n = this.noise("brown");
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 400;
    const g = this.ctx.createGain(); g.gain.value = 0.015;
    n.connect(filter); filter.connect(g); g.connect(this.masterGain);
    n.start(); this.nodes.push(n);

    const scale = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3];
    const playNote = () => {
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const o = this.osc(freq, "triangle");
      const o2 = this.osc(freq * 2, "sine");
      const ng = this.ctx.createGain(); const ng2 = this.ctx.createGain();
      const t = this.ctx.currentTime;
      ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(0.07, t + 0.08); ng.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
      ng2.gain.setValueAtTime(0, t); ng2.gain.linearRampToValueAtTime(0.02, t + 0.08); ng2.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      o.connect(ng); ng.connect(this.masterGain);
      o2.connect(ng2); ng2.connect(this.masterGain);
      o.start(t); o.stop(t + 3); o2.start(t); o2.stop(t + 2);
      this.nodes.push(o, o2);
    };
    const interval = window.setInterval(playNote, 2200 + Math.random() * 1800);
    this.nodes.push({ stop: () => window.clearInterval(interval) } as unknown as AudioNode);
    playNote();
  }

  // 🔥 Şömine — gerçekçi çıtır çıtır odun ateşi
  playFire() {
    // Alev uğultusu: düşük frekanslı brown noise, yumuşak
    const baseNoise = this.noise("brown");
    const baseFilter = this.ctx.createBiquadFilter();
    baseFilter.type = "lowpass"; baseFilter.frequency.value = 250;
    const baseLfo = this.osc(0.12, "sine");
    const baseLfoGain = this.ctx.createGain(); baseLfoGain.gain.value = 0.025;
    baseLfo.connect(baseLfoGain);
    const baseGain = this.ctx.createGain(); baseGain.gain.value = 0.055;
    baseLfoGain.connect(baseGain.gain);
    baseNoise.connect(baseFilter); baseFilter.connect(baseGain); baseGain.connect(this.masterGain);
    baseNoise.start(); baseLfo.start(); this.nodes.push(baseNoise, baseLfo);

    // Orta frekanslı alev sesi
    const midNoise = this.noise("pink");
    const midFilter = this.ctx.createBiquadFilter();
    midFilter.type = "bandpass"; midFilter.frequency.value = 600; midFilter.Q.value = 0.8;
    const midGain = this.ctx.createGain(); midGain.gain.value = 0.022;
    midNoise.connect(midFilter); midFilter.connect(midGain); midGain.connect(this.masterGain);
    midNoise.start(); this.nodes.push(midNoise);

    // Odun çıtırtısı — kısa, keskin, gerçekçi
    const crackle = () => {
      // Her seferinde çıtırtı üretme, doğal aralıklarla
      const freq = 800 + Math.random() * 1200;
      const duration = 0.04 + Math.random() * 0.06;
      const n = this.noise("white");
      const f = this.ctx.createBiquadFilter();
      f.type = "bandpass"; f.frequency.value = freq; f.Q.value = 8;
      const g = this.ctx.createGain();
      const t = this.ctx.currentTime;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.06, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, t + duration);
      n.connect(f); f.connect(g); g.connect(this.masterGain);
      n.start(t); n.stop(t + duration + 0.01);
      this.nodes.push(n);

      // Bazen çift çıtırtı (odun yarılması)
      if (Math.random() > 0.6) {
        const n2 = this.noise("white");
        const f2 = this.ctx.createBiquadFilter();
        f2.type = "bandpass"; f2.frequency.value = freq * 0.7; f2.Q.value = 6;
        const g2 = this.ctx.createGain();
        const t2 = t + 0.02 + Math.random() * 0.03;
        g2.gain.setValueAtTime(0, t2);
        g2.gain.linearRampToValueAtTime(0.05, t2 + 0.005);
        g2.gain.exponentialRampToValueAtTime(0.001, t2 + duration * 0.7);
        n2.connect(f2); f2.connect(g2); g2.connect(this.masterGain);
        n2.start(t2); n2.stop(t2 + duration + 0.01);
        this.nodes.push(n2);
      }
    };

    // Düzensiz aralıklarla — gerçek ateş gibi
    const scheduleCrackles = () => {
      const interval = window.setInterval(() => {
        const count = Math.random() > 0.7 ? 2 : 1; // Bazen 2 çıtırtı arka arkaya
        crackle();
        if (count === 2) {
          window.setTimeout(crackle, 80 + Math.random() * 120);
        }
      }, 800 + Math.random() * 1500);
      return interval;
    };
    const interval = scheduleCrackles();
    this.nodes.push({ stop: () => window.clearInterval(interval) } as unknown as AudioNode);
  }

  // 🌧️ Yağmur — camdan duyulan yağmur, içerideymiş gibi
  playRain() {
    // Ana yağmur sesi — dışarıdan geliyor, filtreli
    const rainNoise = this.noise("pink");
    const highFilter = this.ctx.createBiquadFilter();
    highFilter.type = "bandpass"; highFilter.frequency.value = 2500; highFilter.Q.value = 0.4;
    const lowFilter = this.ctx.createBiquadFilter();
    lowFilter.type = "lowpass"; lowFilter.frequency.value = 4000;
    // İç mekan hissi için ekstra alçak geçiren filtre
    const roomFilter = this.ctx.createBiquadFilter();
    roomFilter.type = "lowpass"; roomFilter.frequency.value = 2000;

    // Çok yavaş yoğunluk değişimi — yağmurun dalgalanması
    const lfo = this.osc(0.05, "sine");
    const lfoGain = this.ctx.createGain(); lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);

    const rainGain = this.ctx.createGain(); rainGain.gain.value = 0.09;
    lfoGain.connect(rainGain.gain);
    rainNoise.connect(highFilter); highFilter.connect(lowFilter); lowFilter.connect(roomFilter);
    roomFilter.connect(rainGain); rainGain.connect(this.masterGain);
    rainNoise.start(); lfo.start(); this.nodes.push(rainNoise, lfo);

    // Cama çarpan damla sesi — tık tık
    const drops = () => {
      const freq = 1200 + Math.random() * 800;
      const o = this.osc(freq, "sine");
      const og = this.ctx.createGain();
      const t = this.ctx.currentTime;
      og.gain.setValueAtTime(0, t);
      og.gain.linearRampToValueAtTime(0.018, t + 0.003);
      og.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      o.frequency.setValueAtTime(freq, t);
      o.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.08);
      o.connect(og); og.connect(this.masterGain);
      o.start(t); o.stop(t + 0.1);
      this.nodes.push(o);
    };
    const dropInterval = window.setInterval(drops, 120 + Math.random() * 200);
    this.nodes.push({ stop: () => window.clearInterval(dropInterval) } as unknown as AudioNode);

    // Arada akan su sesi — camdan aşağı inen yağmur
    const trickle = () => {
      const n = this.noise("pink");
      const f = this.ctx.createBiquadFilter();
      f.type = "bandpass"; f.frequency.value = 800; f.Q.value = 1;
      const g = this.ctx.createGain();
      const t = this.ctx.currentTime;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.015, t + 0.3);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      n.connect(f); f.connect(g); g.connect(this.masterGain);
      n.start(t); n.stop(t + 2);
      this.nodes.push(n);
    };
    const trickleInterval = window.setInterval(trickle, 2000 + Math.random() * 4000);
    this.nodes.push({ stop: () => window.clearInterval(trickleInterval) } as unknown as AudioNode);
  }

  // 🌊 Okyanus
  playOcean() {
    for (let i = 0; i < 3; i++) {
      const n = this.noise("brown");
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass"; filter.frequency.value = 400 + i * 100;
      const lfo = this.osc(0.08 + i * 0.03, "sine");
      const lfoGain = this.ctx.createGain(); lfoGain.gain.value = 0.06;
      lfo.connect(lfoGain);
      const g = this.ctx.createGain(); g.gain.value = 0.07;
      lfoGain.connect(g.gain);
      n.connect(filter); filter.connect(g); g.connect(this.masterGain);
      n.start(); lfo.start(); this.nodes.push(n, lfo);
    }
  }

  // 🌲 Orman
  playForest() {
    const wind = this.noise("pink");
    const wf = this.ctx.createBiquadFilter();
    wf.type = "bandpass"; wf.frequency.value = 500; wf.Q.value = 0.2;
    const lfo = this.osc(0.06, "sine");
    const lfoGain = this.ctx.createGain(); lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    const wg = this.ctx.createGain(); wg.gain.value = 0.04;
    lfoGain.connect(wg.gain);
    wind.connect(wf); wf.connect(wg); wg.connect(this.masterGain);
    wind.start(); lfo.start(); this.nodes.push(wind, lfo);

    const chirp = () => {
      if (Math.random() > 0.6) return;
      const freq = 2000 + Math.random() * 800;
      const o = this.osc(freq, "sine"); const o2 = this.osc(freq * 1.3, "sine");
      const cg = this.ctx.createGain(); const t = this.ctx.currentTime;
      cg.gain.setValueAtTime(0, t); cg.gain.linearRampToValueAtTime(0.025, t + 0.06); cg.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      o.connect(cg); o2.connect(cg); cg.connect(this.masterGain);
      o.start(t); o.stop(t + 0.5); o2.start(t + 0.08); o2.stop(t + 0.5); this.nodes.push(o, o2);
    };
    const interval = window.setInterval(chirp, 3000 + Math.random() * 5000);
    this.nodes.push({ stop: () => window.clearInterval(interval) } as unknown as AudioNode);
  }

  // ✨ Büyü
  playMagic() {
    const drone = this.osc(55, "sine"); const drone2 = this.osc(110, "sine"); const drone3 = this.osc(165, "sine");
    const dg = this.ctx.createGain(); dg.gain.value = 0.025;
    drone.connect(dg); drone2.connect(dg); drone3.connect(dg); dg.connect(this.masterGain);
    drone.start(); drone2.start(); drone3.start(); this.nodes.push(drone, drone2, drone3);

    const shimmer = () => {
      const freqs = [528, 639, 741, 852, 963];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];
      const o = this.osc(freq, "sine"); const o2 = this.osc(freq * 1.5, "sine");
      const mg = this.ctx.createGain(); const t = this.ctx.currentTime;
      mg.gain.setValueAtTime(0, t); mg.gain.linearRampToValueAtTime(0.035, t + 0.5); mg.gain.exponentialRampToValueAtTime(0.001, t + 4);
      o.connect(mg); o2.connect(mg); mg.connect(this.masterGain);
      o.start(t); o.stop(t + 4.5); o2.start(t); o2.stop(t + 4.5); this.nodes.push(o, o2);
    };
    const interval = window.setInterval(shimmer, 2500 + Math.random() * 2000);
    this.nodes.push({ stop: () => window.clearInterval(interval) } as unknown as AudioNode);
    shimmer();
  }

  // ⚗️ İksir
  playPotion() {
    const boil = this.noise("brown");
    const bf = this.ctx.createBiquadFilter(); bf.type = "lowpass"; bf.frequency.value = 150;
    const bg = this.ctx.createGain(); bg.gain.value = 0.04;
    boil.connect(bf); bf.connect(bg); bg.connect(this.masterGain); boil.start(); this.nodes.push(boil);

    const bubble = () => {
      const freq = 200 + Math.random() * 200;
      const o = this.osc(freq, "sine"); const pg = this.ctx.createGain(); const t = this.ctx.currentTime;
      pg.gain.setValueAtTime(0, t); pg.gain.linearRampToValueAtTime(0.04, t + 0.05); pg.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      o.frequency.setValueAtTime(freq, t); o.frequency.linearRampToValueAtTime(freq * 1.4, t + 0.25);
      o.connect(pg); pg.connect(this.masterGain); o.start(t); o.stop(t + 0.3); this.nodes.push(o);
    };
    const interval = window.setInterval(bubble, 400 + Math.random() * 800);
    this.nodes.push({ stop: () => window.clearInterval(interval) } as unknown as AudioNode);

    const stir = () => {
      const n2 = this.noise("pink"); const sf = this.ctx.createBiquadFilter();
      sf.type = "bandpass"; sf.frequency.value = 600; sf.Q.value = 2;
      const sg = this.ctx.createGain(); const t = this.ctx.currentTime;
      sg.gain.setValueAtTime(0, t); sg.gain.linearRampToValueAtTime(0.025, t + 0.4); sg.gain.exponentialRampToValueAtTime(0.001, t + 2);
      n2.connect(sf); sf.connect(sg); sg.connect(this.masterGain); n2.start(t); n2.stop(t + 2.5); this.nodes.push(n2);
    };
    const stirInterval = window.setInterval(stir, 5000 + Math.random() * 5000);
    this.nodes.push({ stop: () => window.clearInterval(stirInterval) } as unknown as AudioNode);
  }

  play(id: SoundId) {
    this.stop();
    switch (id) {
      case "lofi":   this.playLofi(); break;
      case "fire":   this.playFire(); break;
      case "rain":   this.playRain(); break;
      case "ocean":  this.playOcean(); break;
      case "forest": this.playForest(); break;
      case "magic":  this.playMagic(); break;
      case "potion": this.playPotion(); break;
    }
  }

  destroy() { this.stop(); this.ctx.close(); }
}

export default function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [playing, setPlaying] = useState<SoundId | null>(null);
  const [volume, setVolume] = useState(0.5);
  const engineRef = useRef<AmbientEngine | null>(null);

  const getOrCreateEngine = () => {
    if (!engineRef.current) engineRef.current = new AmbientEngine();
    return engineRef.current;
  };

  const handleSelect = (id: SoundId) => {
    if (playing === id) { engineRef.current?.stop(); setPlaying(null); }
    else { const engine = getOrCreateEngine(); engine.setVolume(volume); engine.play(id); setPlaying(id); }
  };

  const handleVolume = (v: number) => { setVolume(v); engineRef.current?.setVolume(v); };

  useEffect(() => { return () => { engineRef.current?.destroy(); }; }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={[
          "fixed bottom-60 right-6 z-40 h-12 w-12 rounded-full",
          "border border-white/15 bg-black/60 backdrop-blur-sm",
          "flex items-center justify-center text-xl",
          "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
          "hover:border-purple-400/50 hover:shadow-[0_0_28px_rgba(168,85,247,0.4)] transition",
          isOpen || playing ? "border-purple-400/50 bg-purple-950/40" : "",
        ].join(" ")}
        title="Ortam Sesi"
      >
        {playing ? "🔊" : "🔇"}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={[
            "fixed bottom-60 right-20 z-50 w-64",
            "rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md p-4",
            "shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
          ].join(" ")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white/90">🎧 Ortam Sesi</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white/70 text-xs">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {SOUNDS.map((sound) => (
                <button key={sound.id} type="button" onClick={() => handleSelect(sound.id)}
                  className={[
                    "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition",
                    playing === sound.id
                      ? "border-purple-400/60 bg-purple-950/40 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-purple-400/30 hover:text-white",
                  ].join(" ")}
                >
                  <span>{sound.emoji}</span>
                  <span>{sound.label}</span>
                  {playing === sound.id && <span className="ml-auto text-purple-300">▶</span>}
                </button>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-white/50">Ses Seviyesi</span>
                <span className="text-xs text-white/50">{Math.round(volume * 100)}%</span>
              </div>
              <input type="range" min={0} max={1} step={0.01} value={volume}
                onChange={(e) => handleVolume(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {playing && (
              <button type="button" onClick={() => { engineRef.current?.stop(); setPlaying(null); }}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-1.5 text-xs text-white/60 hover:text-white/90 transition"
              >⏹ Durdur</button>
            )}
          </div>
        </>
      )}
    </>
  );
}