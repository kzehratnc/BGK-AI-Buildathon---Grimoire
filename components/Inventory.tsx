"use client";

import { useEffect, useState } from "react";
import { ITEMS, getUnlockedItems, getNextItem, type Item } from "@/lib/items";

type Category = "isik" | "bilgi" | "simya" | "savas" | "karanlik" | "doga" | "ejderha";

const CATEGORY_LABELS: Record<Category, string> = {
  isik:     "🕯️ Işık",
  bilgi:    "📜 Bilgi",
  simya:    "⚗️ Simya",
  savas:    "⚔️ Savaş",
  karanlik: "👁️ Karanlık",
  doga:     "🌿 Doğa",
  ejderha:  "🐉 Ejderha",
};

const CATEGORIES: Category[] = ["isik", "bilgi", "simya", "savas", "karanlik", "doga", "ejderha"];

function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${Math.floor(xp / 1000)}K`;
  }
  return String(xp);
}

export default function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("isik");
  const [totalXP, setTotalXP] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("grimoire_xp");
      const parsed = raw ? Number(raw) : 0;
      setTotalXP(Number.isFinite(parsed) ? parsed : 0);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ xp?: number }>;
      const xpFromEvent = custom.detail?.xp;
      if (typeof xpFromEvent === "number" && Number.isFinite(xpFromEvent)) {
        const prevUnlocked = getUnlockedItems(totalXP).map((i) => i.id);
        setTotalXP(xpFromEvent);
        const newUnlocked = getUnlockedItems(xpFromEvent).filter(
          (i) => !prevUnlocked.includes(i.id)
        );
        if (newUnlocked.length > 0) {
          setNewlyUnlocked(newUnlocked[newUnlocked.length - 1].name);
          setTimeout(() => setNewlyUnlocked(null), 4000);
        }
      }
    };
    window.addEventListener("grimoire:xpGained", handler);
    return () => window.removeEventListener("grimoire:xpGained", handler);
  }, [totalXP]);

  const unlockedIds = new Set(getUnlockedItems(totalXP).map((i) => i.id));
  const nextItem = getNextItem(totalXP);
  const categoryItems = ITEMS.filter((i) => i.category === activeCategory);
  const unlockedCount = unlockedIds.size;

  return (
    <>
      {newlyUnlocked && (
        <div className="fixed top-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-purple-400/40 bg-black/80 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          🎉 Yeni eşya: <span className="text-purple-200">{newlyUnlocked}</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={[
          "fixed bottom-28 right-6 z-50 h-12 w-12 rounded-full",
          "border border-white/15 bg-black/60 backdrop-blur-sm",
          "flex items-center justify-center text-xl",
          "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
          "hover:border-purple-400/50 hover:shadow-[0_0_28px_rgba(168,85,247,0.4)] transition",
          isOpen ? "border-purple-400/50 bg-purple-950/40" : "",
        ].join(" ")}
        title="Envanter"
      >
        🎒
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-80 max-w-[100vw]",
          "border-l border-white/10 bg-black/90 backdrop-blur-md",
          "flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-white/95">⚔️ Envanter</h2>
            <p className="text-xs text-white/50 mt-0.5">
              {unlockedCount} / {ITEMS.length} eşya açıldı
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <div className="mx-4 mt-3 h-16 rounded-xl border border-white/5 bg-white/3 px-4 py-2.5">
          {hoveredItem && unlockedIds.has(hoveredItem.id) ? (
            <>
              <p className="text-sm font-semibold text-purple-200/90">
                {hoveredItem.emoji} {hoveredItem.name}
              </p>
              <p className="text-xs text-white/55 mt-0.5 leading-snug line-clamp-2">
                {hoveredItem.description}
              </p>
            </>
          ) : (
            <p className="text-xs text-white/30 mt-3 text-center">
              Eşyanın üzerine gel, açıklamasını gör
            </p>
          )}
        </div>

        {nextItem && (
          <div className="mx-4 mt-2 rounded-xl border border-purple-400/20 bg-purple-950/20 px-4 py-2.5">
            <p className="text-xs text-white/50">Sonraki eşya</p>
            <p className="text-sm font-semibold text-purple-200/90 mt-0.5">
              {nextItem.emoji} {nextItem.name}
            </p>
            <p className="text-xs text-white/40 mt-0.5">
              {Math.max(0, nextItem.requiredXP - Math.floor(totalXP))} XP daha kazan
            </p>
          </div>
        )}

        <div className="flex border-b border-white/10 mt-3 overflow-x-auto px-2 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const catItems = ITEMS.filter((i) => i.category === cat);
            const catUnlocked = catItems.filter((i) => unlockedIds.has(i.id)).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={[
                  "shrink-0 px-2.5 py-2 text-xs font-semibold transition border-b-2 -mb-px whitespace-nowrap",
                  activeCategory === cat
                    ? "border-purple-400 text-purple-200"
                    : "border-transparent text-white/50 hover:text-white/70",
                ].join(" ")}
              >
                {CATEGORY_LABELS[cat]}{" "}
                <span className="text-white/30">{catUnlocked}/{catItems.length}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {categoryItems.map((item) => {
              const unlocked = unlockedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={[
                    "flex flex-col items-center justify-start rounded-2xl border px-2 py-3 text-center transition cursor-default",
                    unlocked
                      ? "border-purple-400/30 bg-purple-950/20 hover:border-purple-400/60 hover:bg-purple-950/35"
                      : "border-white/5 bg-white/[0.02] opacity-40",
                  ].join(" ")}
                >
                  <span className={["text-2xl", !unlocked ? "grayscale" : ""].join(" ")}>
                    {item.emoji}
                  </span>
                  <span className={[
                    "mt-2 text-xs font-semibold leading-tight text-center break-words w-full",
                    unlocked ? "text-white/85" : "text-white/30",
                  ].join(" ")}>
                    {unlocked ? item.name : "???"}
                  </span>
                  {!unlocked && (
                    <span className="mt-1 text-xs text-white/25">
                      {formatXP(item.requiredXP)} XP
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}