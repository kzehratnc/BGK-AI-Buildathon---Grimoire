"use client";

import { useEffect, useState } from "react";
import {
  ACHIEVEMENTS,
  CATEGORIES,
  CATEGORY_LABELS,
  getAchievementStats,
  getUnlockedAchievements,
  type AchievementCategory,
} from "@/lib/achievements";

export default function Achievements() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AchievementCategory>("zaman");
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);

  const refresh = () => {
    try {
      const stats = getAchievementStats();
      setUnlockedIds(getUnlockedAchievements(stats));
    } catch { /* ignore */ }
  };

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    const handler = () => {
      const prevIds = new Set(unlockedIds);
      const stats = getAchievementStats();
      const newIds = getUnlockedAchievements(stats);
      const justUnlocked = ACHIEVEMENTS.find(
        (a) => newIds.has(a.id) && !prevIds.has(a.id)
      );
      if (justUnlocked) {
        setNewlyUnlocked(justUnlocked.name);
        setTimeout(() => setNewlyUnlocked(null), 4000);
      }
      setUnlockedIds(newIds);
    };
    window.addEventListener("grimoire:xpGained", handler);
    window.addEventListener("grimoire:choiceMade", handler);
    return () => {
      window.removeEventListener("grimoire:xpGained", handler);
      window.removeEventListener("grimoire:choiceMade", handler);
    };
  }, [unlockedIds]);

  const categoryAchievements = ACHIEVEMENTS.filter((a) => a.category === activeCategory);
  const totalUnlocked = unlockedIds.size;

  return (
    <>
      {/* Yeni başarım toast */}
      {newlyUnlocked && (
        <div className="fixed top-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-yellow-400/40 bg-black/80 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.4)]">
          🏆 Yeni başarım: <span className="text-yellow-200">{newlyUnlocked}</span>
        </div>
      )}

      {/* Toggle butonu — XPBar: bottom-6, Envanter: bottom-28, Harita: bottom-44, Ses: bottom-60, Başarım: bottom-[76] */}
      <button
        type="button"
        onClick={() => { setIsOpen((v) => !v); refresh(); }}
        className={[
          "fixed bottom-[19rem] right-6 z-40 h-12 w-12 rounded-full",
          "border border-white/15 bg-black/60 backdrop-blur-sm",
          "flex items-center justify-center text-xl",
          "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
          "hover:border-yellow-400/50 hover:shadow-[0_0_28px_rgba(234,179,8,0.3)] transition",
          isOpen ? "border-yellow-400/50 bg-yellow-950/30" : "",
        ].join(" ")}
        title="Başarımlar"
      >
        🏆
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Panel */}
      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-80 max-w-[100vw]",
          "border-l border-white/10 bg-black/90 backdrop-blur-md",
          "flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-white/95">🏆 Başarımlar</h2>
            <p className="text-xs text-white/50 mt-0.5">
              {totalUnlocked} / {ACHIEVEMENTS.length} kazanıldı
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 hover:bg-white/10 transition"
          >✕</button>
        </div>

        {/* İlerleme barı */}
        <div className="px-5 pt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-yellow-400/60"
              style={{
                width: `${Math.round((totalUnlocked / ACHIEVEMENTS.length) * 100)}%`,
                boxShadow: "0 0 10px rgba(234,179,8,0.4)",
                transition: "width 500ms ease",
              }}
            />
          </div>
          <p className="text-xs text-white/40 mt-1 text-right">
            %{Math.round((totalUnlocked / ACHIEVEMENTS.length) * 100)} tamamlandı
          </p>
        </div>

        {/* Kategori sekmeleri */}
        <div className="flex border-b border-white/10 mt-2 overflow-x-auto px-2 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const catAchs = ACHIEVEMENTS.filter((a) => a.category === cat);
            const catUnlocked = catAchs.filter((a) => unlockedIds.has(a.id)).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={[
                  "shrink-0 px-2.5 py-2 text-xs font-semibold transition border-b-2 -mb-px whitespace-nowrap",
                  activeCategory === cat
                    ? "border-yellow-400/70 text-yellow-200"
                    : "border-transparent text-white/50 hover:text-white/70",
                ].join(" ")}
              >
                {CATEGORY_LABELS[cat]}{" "}
                <span className="text-white/30">{catUnlocked}/{catAchs.length}</span>
              </button>
            );
          })}
        </div>

        {/* Başarım listesi */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            {categoryAchievements.map((ach) => {
              const unlocked = unlockedIds.has(ach.id);
              const isSecret = ach.secret && !unlocked;
              return (
                <div
                  key={ach.id}
                  className={[
                    "flex items-start gap-3 rounded-2xl border px-4 py-3 transition",
                    unlocked
                      ? "border-yellow-400/25 bg-yellow-950/15"
                      : "border-white/5 bg-white/[0.02] opacity-50",
                  ].join(" ")}
                >
                  <span className={["text-2xl flex-shrink-0", !unlocked ? "grayscale" : ""].join(" ")}>
                    {isSecret ? "🔒" : ach.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className={[
                      "text-sm font-bold leading-tight",
                      unlocked ? "text-white/90" : "text-white/40",
                    ].join(" ")}>
                      {isSecret ? "???" : ach.name}
                    </p>
                    <p className={[
                      "text-xs mt-0.5 leading-snug",
                      unlocked ? "text-white/55" : "text-white/25",
                    ].join(" ")}>
                      {isSecret ? "Gizli başarım — keşfetmeyi bekliyor" : ach.description}
                    </p>
                    {unlocked && (
                      <p className="text-xs text-yellow-400/70 mt-1 font-semibold">✓ Kazanıldı</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}