"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import XPBar from "@/components/XPBar";
import Inventory from "@/components/Inventory";

interface SessionRecord {
  id: string;
  subject: string;
  elapsedMinutes: number;
  targetMinutes: number;
  xpEarned: number;
  completionRate: number;
  completedAt: string;
  chapterPreview: string;
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("grimoire_sessions");
      if (raw) {
        const parsed = JSON.parse(raw) as SessionRecord[];
        setSessions(parsed.reverse());
      }
    } catch {
      // ignore
    }
  }, []);

  const totalMinutes = sessions.reduce((acc, s) => acc + s.elapsedMinutes, 0);
  const totalXP = sessions.reduce((acc, s) => acc + s.xpEarned, 0);
  const completedSessions = sessions.filter((s) => s.completionRate >= 1).length;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} dk`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h} sa ${m} dk` : `${h} sa`;
  };

  return (
    <div className="grimoire-hero">
      <main className="relative z-10 min-h-screen px-6 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white/95">📋 Seans Geçmişi</h1>
              <p className="text-sm text-white/50 mt-1">Tüm odaklanma seansların</p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
            >
              ← Ana Sayfa
            </Link>
          </div>

          {/* Stats */}
          {sessions.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white/95">{sessions.length}</p>
                <p className="text-xs text-white/50 mt-1">Toplam Seans</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white/95">{formatDuration(totalMinutes)}</p>
                <p className="text-xs text-white/50 mt-1">Toplam Süre</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-purple-200/95">{totalXP} XP</p>
                <p className="text-xs text-white/50 mt-1">Toplam XP</p>
              </div>
            </div>
          )}

          {/* Session list */}
          {sessions.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-black/25 p-12 text-center">
              <p className="text-4xl mb-4">📖</p>
              <p className="text-white/60 text-lg">Henüz hiç seans yok.</p>
              <p className="text-white/40 text-sm mt-2">İlk seansını tamamladıktan sonra kayıtlar burada görünecek.</p>
              <Link
                href="/session"
                className="mt-6 inline-flex rounded-full border border-purple-400/40 bg-gradient-to-b from-purple-900/60 to-purple-950/80 px-6 py-3 text-sm font-bold text-white"
              >
                İlk Seansı Başlat
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-2xl border border-white/10 bg-black/25 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-bold text-white/95">
                          {session.subject || "Konu belirtilmedi"}
                        </span>
                        {session.completionRate >= 1 ? (
                          <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 text-xs text-purple-200/80">
                            ✓ Tamamlandı
                          </span>
                        ) : (
                          <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/50">
                            {Math.round(session.completionRate * 100)}% tamamlandı
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/40 mt-1">{formatDate(session.completedAt)}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-purple-200/90">+{session.xpEarned} XP</p>
                      <p className="text-xs text-white/50 mt-0.5">{formatDuration(session.elapsedMinutes)}</p>
                    </div>
                  </div>

                  {session.chapterPreview && (
                    <p className="mt-3 text-xs text-white/50 italic leading-relaxed line-clamp-2">
                      &ldquo;{session.chapterPreview}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {sessions.length > 0 && (
            <p className="text-center text-xs text-white/30 mt-8">
              {completedSessions} tamamlanan seans · {sessions.length - completedSessions} erken bitirilen seans
            </p>
          )}
        </div>
      </main>
      <XPBar />
      <Inventory />
    </div>
  );
}