"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LOCATIONS,
  REGION_LABELS,
  REGIONS,
  getUnlockedLocations,
  getNextLocation,
  getTotalChoices,
  type Location,
} from "@/lib/locations";

type Props = {
  mode?: "panel" | "page";
};

export default function Map({ mode = "panel" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<Location["region"]>("baslangic");
  const [totalChoices, setTotalChoices] = useState(0);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);

  useEffect(() => {
    setTotalChoices(getTotalChoices());
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ total?: number }>;
      const total = custom.detail?.total;
      if (typeof total === "number") {
        const prev = totalChoices;
        setTotalChoices(total);
        const newLocs = getUnlockedLocations(total).filter(
          (l) => l.unlockAtChoice > prev && l.unlockAtChoice <= total
        );
        if (newLocs.length > 0) {
          setNewlyUnlocked(newLocs[newLocs.length - 1].name);
          setTimeout(() => setNewlyUnlocked(null), 4000);
        }
      }
    };
    window.addEventListener("grimoire:choiceMade", handler);
    return () => window.removeEventListener("grimoire:choiceMade", handler);
  }, [totalChoices]);

  const unlockedIds = new Set(getUnlockedLocations(totalChoices).map((l) => l.id));
  const nextLoc = getNextLocation(totalChoices);
  const regionItems = LOCATIONS.filter((l) => l.region === activeRegion);
  const unlockedCount = unlockedIds.size;

  const content = (
    <div className={mode === "page" ? "mx-auto max-w-2xl" : ""}>
      {/* Header */}
      <div className={[
        "flex items-center justify-between border-b border-white/10",
        mode === "panel" ? "px-5 py-4" : "px-0 py-4 mb-2",
      ].join(" ")}>
        <div>
          <h2 className="text-lg font-bold text-white/95">🗺️ Umbra Haritası</h2>
          <p className="text-xs text-white/50 mt-0.5">
            {unlockedCount} / {LOCATIONS.length} lokasyon keşfedildi
          </p>
        </div>
        {mode === "panel" && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 hover:bg-white/10 transition"
          >
            ✕
          </button>
        )}
        {mode === "page" && (
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
          >
            ← Ana Sayfa
          </Link>
        )}
      </div>

      {/* Hovered location description */}
      <div className={[
        "mt-3 h-20 rounded-xl border border-white/5 bg-white/3 px-4 py-3",
        mode === "panel" ? "mx-4" : "",
      ].join(" ")}>
        {hoveredLocation && unlockedIds.has(hoveredLocation.id) ? (
          <>
            <p className="text-sm font-bold text-purple-200/90">
              {hoveredLocation.emoji} {hoveredLocation.name}
            </p>
            <p className="text-xs text-white/55 mt-1 leading-snug">
              {hoveredLocation.description}
            </p>
          </>
        ) : hoveredLocation && !unlockedIds.has(hoveredLocation.id) ? (
          <>
            <p className="text-sm font-bold text-white/40">??? Kilitli Lokasyon</p>
            <p className="text-xs text-white/30 mt-1">
              {hoveredLocation.unlockAtChoice - totalChoices} seçim daha yap, bu yer açılsın
            </p>
          </>
        ) : (
          <p className="text-xs text-white/30 mt-3 text-center">
            Bir lokasyonun üzerine gel, bilgisini gör
          </p>
        )}
      </div>

      {/* Next location hint */}
      {nextLoc && (
        <div className={[
          "mt-2 rounded-xl border border-purple-400/20 bg-purple-950/20 px-4 py-2.5",
          mode === "panel" ? "mx-4" : "",
        ].join(" ")}>
          <p className="text-xs text-white/50">Sonraki lokasyon</p>
          <p className="text-sm font-semibold text-purple-200/90 mt-0.5">
            {nextLoc.emoji} {nextLoc.name}
          </p>
          <p className="text-xs text-white/40 mt-0.5">
            {nextLoc.unlockAtChoice - totalChoices} seçim daha yap
          </p>
        </div>
      )}

      {/* Region tabs */}
      <div className={[
        "flex border-b border-white/10 mt-3 overflow-x-auto scrollbar-hide",
        mode === "panel" ? "px-2" : "",
      ].join(" ")}>
        {REGIONS.map((region) => {
          const regionLocs = LOCATIONS.filter((l) => l.region === region);
          const regionUnlocked = regionLocs.filter((l) => unlockedIds.has(l.id)).length;
          return (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={[
                "shrink-0 px-3 py-2 text-xs font-semibold transition border-b-2 -mb-px whitespace-nowrap",
                activeRegion === region
                  ? "border-purple-400 text-purple-200"
                  : "border-transparent text-white/50 hover:text-white/70",
              ].join(" ")}
            >
              {REGION_LABELS[region]}{" "}
              <span className="text-white/30">{regionUnlocked}/{regionLocs.length}</span>
            </button>
          );
        })}
      </div>

      {/* Locations grid */}
      <div className={["flex-1 overflow-y-auto p-4", mode === "page" ? "pb-24" : ""].join(" ")}>
        <div className="grid grid-cols-3 gap-3">
          {regionItems.map((loc) => {
            const unlocked = unlockedIds.has(loc.id);
            return (
              <div
                key={loc.id}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                className={[
                  "flex flex-col items-center justify-start rounded-2xl border px-2 py-3 text-center transition",
                  unlocked
                    ? "border-purple-400/30 bg-purple-950/20 hover:border-purple-400/60 hover:bg-purple-950/35 cursor-default"
                    : "border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed",
                ].join(" ")}
              >
                <span className={["text-2xl", !unlocked ? "grayscale" : ""].join(" ")}>
                  {loc.emoji}
                </span>
                <span className={[
                  "mt-2 text-xs font-semibold leading-tight text-center break-words w-full",
                  unlocked ? "text-white/85" : "text-white/30",
                ].join(" ")}>
                  {unlocked ? loc.name : "???"}
                </span>
                {!unlocked && (
                  <span className="mt-1 text-xs text-white/25">
                    {loc.unlockAtChoice} seçim
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (mode === "page") {
    return (
      <div className="grimoire-hero min-h-screen">
        <main className="relative z-10 px-6 py-12">
          {newlyUnlocked && (
            <div className="fixed top-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-purple-400/40 bg-black/80 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              🗺️ Yeni lokasyon keşfedildi: <span className="text-purple-200">{newlyUnlocked}</span>
            </div>
          )}
          {content}
        </main>
      </div>
    );
  }

  return (
    <>
      {newlyUnlocked && (
        <div className="fixed top-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-purple-400/40 bg-black/80 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          🗺️ Yeni lokasyon: <span className="text-purple-200">{newlyUnlocked}</span>
        </div>
      )}

      {/* Toggle button - z-index düşürüldü ki envanter üstüne çıkmasın */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={[
          "fixed bottom-44 right-6 z-40 h-12 w-12 rounded-full",
          "border border-white/15 bg-black/60 backdrop-blur-sm",
          "flex items-center justify-center text-xl",
          "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
          "hover:border-purple-400/50 hover:shadow-[0_0_28px_rgba(168,85,247,0.4)] transition",
          isOpen ? "border-purple-400/50 bg-purple-950/40" : "",
        ].join(" ")}
        title="Harita"
      >
        🗺️
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Side panel */}
      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-80 max-w-[100vw]",
          "border-l border-white/10 bg-black/90 backdrop-blur-md",
          "flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {content}
      </aside>
    </>
  );
}