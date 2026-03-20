"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LevelDef = {
  level: number;
  minXP: number;
  title: string;
  nextMinXP: number | null;
};

const LEVELS: LevelDef[] = [
  { level: 1,  minXP: 0,      title: "Çırak",                  nextMinXP: 100 },
  { level: 2,  minXP: 100,    title: "Acemi Büyücü",            nextMinXP: 250 },
  { level: 3,  minXP: 250,    title: "Gölge Öğrencisi",         nextMinXP: 450 },
  { level: 4,  minXP: 450,    title: "Rün Okuyucu",             nextMinXP: 700 },
  { level: 5,  minXP: 700,    title: "Karanlık Çırak",          nextMinXP: 1000 },
  { level: 6,  minXP: 1000,   title: "Büyü Öğrencisi",          nextMinXP: 1400 },
  { level: 7,  minXP: 1400,   title: "Lanetli Yürüyüşçü",       nextMinXP: 1900 },
  { level: 8,  minXP: 1900,   title: "Simya Çırağı",            nextMinXP: 2500 },
  { level: 9,  minXP: 2500,   title: "Gölge Büyücüsü",          nextMinXP: 3200 },
  { level: 10, minXP: 3200,   title: "Usta Büyücü",             nextMinXP: 4000 },
  { level: 11, minXP: 4000,   title: "Karanlık Bilge",          nextMinXP: 5000 },
  { level: 12, minXP: 5000,   title: "Ruh Avcısı",              nextMinXP: 6200 },
  { level: 13, minXP: 6200,   title: "Lanetli Usta",            nextMinXP: 7600 },
  { level: 14, minXP: 7600,   title: "Simyacı",                 nextMinXP: 9200 },
  { level: 15, minXP: 9200,   title: "Arkanist",                nextMinXP: 11000 },
  { level: 16, minXP: 11000,  title: "Karanlık Arkanist",       nextMinXP: 13000 },
  { level: 17, minXP: 13000,  title: "Gölge Lordu",             nextMinXP: 15200 },
  { level: 18, minXP: 15200,  title: "Büyü Ustası",             nextMinXP: 17700 },
  { level: 19, minXP: 17700,  title: "Lanetli Arkanist",        nextMinXP: 20500 },
  { level: 20, minXP: 20500,  title: "Ölüm Büyücüsü",          nextMinXP: 23600 },
  { level: 21, minXP: 23600,  title: "Umbra Efendisi",          nextMinXP: 27000 },
  { level: 22, minXP: 27000,  title: "Rün Ustası",              nextMinXP: 30700 },
  { level: 23, minXP: 30700,  title: "Karanlık Simyacı",        nextMinXP: 34800 },
  { level: 24, minXP: 34800,  title: "Gölge Hakimi",            nextMinXP: 39300 },
  { level: 25, minXP: 39300,  title: "Lanetli Bilge",           nextMinXP: 44200 },
  { level: 26, minXP: 44200,  title: "Büyü Lordu",              nextMinXP: 49600 },
  { level: 27, minXP: 49600,  title: "Karanlık Efendi",         nextMinXP: 55500 },
  { level: 28, minXP: 55500,  title: "Ruh Hakimi",              nextMinXP: 62000 },
  { level: 29, minXP: 62000,  title: "Umbra Büyücüsü",          nextMinXP: 69000 },
  { level: 30, minXP: 69000,  title: "Ölümsüz Arkanist",        nextMinXP: 76500 },
  { level: 31, minXP: 76500,  title: "Lanetli Lord",            nextMinXP: 84500 },
  { level: 32, minXP: 84500,  title: "Karanlık Hakim",          nextMinXP: 93000 },
  { level: 33, minXP: 93000,  title: "Gölge İmparatoru",        nextMinXP: 102000 },
  { level: 34, minXP: 102000, title: "Simya Ustası",            nextMinXP: 111500 },
  { level: 35, minXP: 111500, title: "Büyü İmparatoru",         nextMinXP: 121500 },
  { level: 36, minXP: 121500, title: "Karanlık Simya Ustası",   nextMinXP: 132000 },
  { level: 37, minXP: 132000, title: "Rün İmparatoru",          nextMinXP: 143000 },
  { level: 38, minXP: 143000, title: "Lanetli İmparator",       nextMinXP: 154500 },
  { level: 39, minXP: 154500, title: "Umbra Hakimi",            nextMinXP: 166500 },
  { level: 40, minXP: 166500, title: "Ölümsüz Lord",            nextMinXP: 179000 },
  { level: 41, minXP: 179000, title: "Karanlık Tanrı Adayı",    nextMinXP: 192000 },
  { level: 42, minXP: 192000, title: "Gölge Tanrısı",           nextMinXP: 205500 },
  { level: 43, minXP: 205500, title: "Ruh İmparatoru",          nextMinXP: 219500 },
  { level: 44, minXP: 219500, title: "Lanetli Tanrı",           nextMinXP: 234000 },
  { level: 45, minXP: 234000, title: "Büyü Tanrısı",            nextMinXP: 249000 },
  { level: 46, minXP: 249000, title: "Umbra İmparatoru",        nextMinXP: 264500 },
  { level: 47, minXP: 264500, title: "Karanlık Tanrı",          nextMinXP: 280500 },
  { level: 48, minXP: 280500, title: "Ölümsüz İmparator",       nextMinXP: 297000 },
  { level: 49, minXP: 297000, title: "Grimoire Tanrısı",        nextMinXP: 314000 },
  { level: 50, minXP: 314000, title: "Grimoire Ustası",         nextMinXP: null },
];

function getLevelFromXP(totalXP: number) {
  const xp = Math.max(0, Math.floor(totalXP));
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export default function XPBar() {
  const [totalXP, setTotalXP] = useState<number>(0);
  const [pulseNonce, setPulseNonce] = useState<number>(0);
  const lastPulseForXPRef = useRef<number>(-1);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("grimoire_xp");
      const parsed = raw ? Number(raw) : 0;
      const safe = Number.isFinite(parsed) ? parsed : 0;
      setTotalXP(safe);
    } catch {
      // localStorage might be unavailable
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ xp?: number }>;
      const xpFromEvent = custom.detail?.xp;

      if (typeof xpFromEvent === "number" && Number.isFinite(xpFromEvent)) {
        setTotalXP(xpFromEvent);
      } else {
        try {
          const raw = window.localStorage.getItem("grimoire_xp");
          const parsed = raw ? Number(raw) : 0;
          setTotalXP(Number.isFinite(parsed) ? parsed : 0);
        } catch {
          // ignore
        }
      }

      const nextXP = typeof xpFromEvent === "number" ? xpFromEvent : totalXP;
      if (nextXP !== lastPulseForXPRef.current) {
        lastPulseForXPRef.current = nextXP;
        setPulseNonce((v) => v + 1);
      }
    };

    window.addEventListener("grimoire:xpGained", handler);
    return () => window.removeEventListener("grimoire:xpGained", handler);
  }, [totalXP]);

  const level = useMemo(() => getLevelFromXP(totalXP), [totalXP]);

  const progress = useMemo(() => {
    const currentXP = Math.max(level.minXP, Math.floor(totalXP));
    const nextMin = level.nextMinXP;
    if (nextMin === null) return { pct: 1, current: currentXP - level.minXP, needed: 0 };

    const earnedIntoLevel = currentXP - level.minXP;
    const totalToNext = nextMin - level.minXP;
    const safeNeeded = Math.max(0, totalToNext);
    const pct = safeNeeded === 0 ? 1 : earnedIntoLevel / safeNeeded;
    return {
      pct: Math.max(0, Math.min(1, pct)),
      current: earnedIntoLevel,
      needed: safeNeeded,
    };
  }, [level.minXP, level.nextMinXP, totalXP]);

  return (
    <>
      <style jsx>{`
        @keyframes xpGainPulse {
          0% {
            transform: translateY(0);
            box-shadow: 0 0 0 rgba(168, 85, 247, 0.0);
            filter: brightness(1);
          }
          35% {
            transform: translateY(-2px);
            box-shadow: 0 0 26px rgba(168, 85, 247, 0.55);
            filter: brightness(1.15);
          }
          100% {
            transform: translateY(0);
            box-shadow: 0 0 0 rgba(168, 85, 247, 0.0);
            filter: brightness(1);
          }
        }
        .xpbar-pulse {
          animation: xpGainPulse 650ms ease-out both;
        }
      `}</style>

      <aside
        className={[
          "fixed bottom-6 right-6 z-50 w-[320px] max-w-[calc(100vw-2rem)]",
          "rounded-2xl border border-white/10 bg-black/55 backdrop-blur-sm",
          "px-4 py-3 text-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        ].join(" ")}
      >
        <div className={pulseNonce ? "xpbar-pulse" : undefined} key={pulseNonce}>
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white/90">
                Seviye {level.level}: {level.title}
              </div>
            </div>
            <div className="shrink-0 text-xs text-white/70">
              {Math.floor(totalXP)} XP
            </div>
          </div>

          <div className="mt-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-purple-500/70"
                style={{
                  width: `${Math.round(progress.pct * 100)}%`,
                  boxShadow: "0 0 18px rgba(168,85,247,0.55)",
                  transition: "width 500ms ease",
                }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-white/65">
              <span>
                {progress.needed === 0 ? (
                  <>Maksimum Seviye 🏆</>
                ) : (
                  <>{progress.current} / {progress.needed} XP</>
                )}
              </span>
              <span className="text-purple-200/90">⚡</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

