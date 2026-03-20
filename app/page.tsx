'use client';

import Link from "next/link";
import XPBar from "@/components/XPBar";
import Inventory from "@/components/Inventory";
import Map from "@/components/Map";
import AmbientPlayer from "@/components/AmbientPlayer";
import Achievements from "@/components/Achievements";

export default function Home() {
  return (
    <div className="grimoire-hero">
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16 text-center">
        <section className="flex w-full max-w-2xl flex-col items-center gap-6">
          <div className="grimoire-book" aria-hidden="true">
            <span className="text-7xl">📖</span>
          </div>

          <h1 className="gothic-title text-6xl sm:text-7xl">
            Grimoire
          </h1>

          <p className="grimoire-tagline text-lg sm:text-xl">
            Her dakika, karanlık dünyanı genişletir
          </p>

          <Link href="/session" className="grimoire-btn mt-4">
            Seansa Başla
          </Link>

          <div className="flex gap-6 mt-2">
            <Link href="/history" className="text-sm text-white/50 hover:text-white/80 transition underline underline-offset-4">
              📋 Seans Geçmişi
            </Link>
            <Link href="/map" className="text-sm text-white/50 hover:text-white/80 transition underline underline-offset-4">
              🗺️ Harita
            </Link>
          </div>
        </section>
      </main>
      <XPBar />
      <Inventory />
      <Map mode="panel" />
      <AmbientPlayer />
      <Achievements />
    </div>
  );
}