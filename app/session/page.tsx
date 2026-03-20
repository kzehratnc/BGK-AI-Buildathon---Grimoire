"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import XPBar from "@/components/XPBar";
import Inventory from "@/components/Inventory";
import Map from "@/components/Map";
import AmbientPlayer from "@/components/AmbientPlayer";
import Achievements from "@/components/Achievements";
import { getUnlockedItems } from "@/lib/items";
import { incrementTotalChoices } from "@/lib/locations";

type TimerMode = "pomodoro" | "countdown" | "stopwatch";
type PomodoroPhase = "work" | "story" | "break" | "ready";

interface Choice { id: number; text: string; }

interface SessionRecord {
  id: string; subject: string; elapsedMinutes: number; targetMinutes: number;
  xpEarned: number; completionRate: number; completedAt: string; chapterPreview: string;
}

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      const t = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t); osc.stop(t + 0.4);
    });
  } catch { /* ignore */ }
}

export default function SessionPage() {
  const [timerMode, setTimerMode] = useState<TimerMode>("countdown");
  const [subject, setSubject] = useState<string>("");
  const [selectedMinutes, setSelectedMinutes] = useState<number>(25);
  const [durationMode, setDurationMode] = useState<"preset" | "custom">("preset");
  const [customHours, setCustomHours] = useState<string>("0");
  const [customMinutes, setCustomMinutes] = useState<string>("0");

  const [pomodoroWork, setPomodoroWork] = useState<number>(25);
  const [pomodoroBreak, setPomodoroBreak] = useState<number>(10);
  const [pomodoroPhase, setPomodoroPhase] = useState<PomodoroPhase>("work");
  const [pomodoroRound, setPomodoroRound] = useState<number>(1);
  const [pomodoroChapterText, setPomodoroChapterText] = useState<string | null>(null);
  const [pomodoroChoices, setPomodoroChoices] = useState<Choice[]>([]);
  const [pomodoroSelectedChoice, setPomodoroSelectedChoice] = useState<Choice | null>(null);
  const [pomodoroGenerating, setPomodoroGenerating] = useState<boolean>(false);
  const [pomodoroRoundXp, setPomodoroRoundXp] = useState<number>(0);

  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);

  const sessionNonceRef = useRef<number>(0);
  const lastAwardedNonceRef = useRef<number>(-1);
  const didFinalizeRef = useRef<boolean>(false);
  const startTimestampRef = useRef<number | null>(null);
  const targetMinutesRef = useRef<number>(25);
  const currentSessionIdRef = useRef<string>("");

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const [completedSubject, setCompletedSubject] = useState<string>("");
  const [completedDuration, setCompletedDuration] = useState<number>(25);
  const [completedElapsedMinutes, setCompletedElapsedMinutes] = useState<number>(0);
  const [completedCompletionRate, setCompletedCompletionRate] = useState<number>(0);
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [chapterText, setChapterText] = useState<string | null>(null);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [completionId, setCompletionId] = useState<number>(0);

  const awardXp = (nonce: number, xpToAdd: number) => {
    const safeXp = Math.max(0, Math.floor(xpToAdd));
    try {
      const raw = window.localStorage.getItem("grimoire_xp");
      const parsed = raw ? Number(raw) : 0;
      const currentXP = Number.isFinite(parsed) ? parsed : 0;
      if (nonce === lastAwardedNonceRef.current) return;
      const newTotal = currentXP + safeXp;
      window.localStorage.setItem("grimoire_xp", String(newTotal));
      lastAwardedNonceRef.current = nonce;
      window.dispatchEvent(new CustomEvent("grimoire:xpGained", { detail: { xp: newTotal } }));
    } catch { /* ignore */ }
  };

  const saveSession = (params: { subject: string; elapsedMinutes: number; targetMinutes: number; xpEarned: number; completionRate: number; }) => {
    try {
      const raw = window.localStorage.getItem("grimoire_sessions");
      const sessions: SessionRecord[] = raw ? (JSON.parse(raw) as SessionRecord[]) : [];
      const sessionId = `session_${Date.now()}`;
      currentSessionIdRef.current = sessionId;
      sessions.push({ id: sessionId, subject: params.subject, elapsedMinutes: params.elapsedMinutes, targetMinutes: params.targetMinutes, xpEarned: params.xpEarned, completionRate: params.completionRate, completedAt: new Date().toISOString(), chapterPreview: "" });
      window.localStorage.setItem("grimoire_sessions", JSON.stringify(sessions));
    } catch { /* ignore */ }
  };

  const updateSessionChapter = (chapter: string) => {
    try {
      const sessionId = currentSessionIdRef.current;
      if (!sessionId) return;
      const raw = window.localStorage.getItem("grimoire_sessions");
      if (!raw) return;
      const sessions = JSON.parse(raw) as SessionRecord[];
      const idx = sessions.findIndex((s) => s.id === sessionId);
      if (idx !== -1) { sessions[idx].chapterPreview = chapter.slice(0, 120); window.localStorage.setItem("grimoire_sessions", JSON.stringify(sessions)); }
    } catch { /* ignore */ }
  };

  const fetchChapter = async (params: { subject: string; elapsedMinutes: number; targetMinutes: number; completionRate: number; }) => {
    let lastChoice: string | null = null;
    try { lastChoice = window.localStorage.getItem("grimoire_last_choice"); } catch { /* ignore */ }
    let unlockedItemNames: string[] = [];
    try { const raw = window.localStorage.getItem("grimoire_xp"); const xp = raw ? Number(raw) : 0; unlockedItemNames = getUnlockedItems(xp).map((i) => i.name); } catch { /* ignore */ }
    const res = await fetch("/api/chapter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ subject: params.subject, elapsedMinutes: params.elapsedMinutes, targetMinutes: params.targetMinutes, completionRate: params.completionRate, lastChoice: lastChoice ?? undefined, unlockedItems: unlockedItemNames.length > 0 ? unlockedItemNames : undefined }) });
    const data = (await res.json()) as { chapter: string; choices?: Choice[] } | { error: string };
    if (!res.ok) throw new Error("error" in data && typeof data.error === "string" ? data.error : "Bölüm üretilemedi.");
    return { chapter: "chapter" in data ? data.chapter : "", choices: "choices" in data && Array.isArray(data.choices) ? data.choices : [] };
  };

  const formattedStopwatch = useMemo(() => {
    const h = Math.floor(stopwatchSeconds / 3600); const m = Math.floor((stopwatchSeconds % 3600) / 60); const s = stopwatchSeconds % 60;
    if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, [stopwatchSeconds]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeftSeconds / 60); const seconds = timeLeftSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [timeLeftSeconds]);

  const customTotalMinutes = useMemo(() => {
    const hRaw = Number.isFinite(Number(customHours)) ? Number(customHours) : 0;
    const mRaw = Number.isFinite(Number(customMinutes)) ? Number(customMinutes) : 0;
    return Math.min(10, Math.max(0, Math.trunc(hRaw))) * 60 + Math.min(59, Math.max(0, Math.trunc(mRaw)));
  }, [customHours, customMinutes]);

  useEffect(() => { if (isRunning || isComplete || timerMode !== "countdown") return; setTimeLeftSeconds(selectedMinutes * 60); }, [selectedMinutes, isRunning, isComplete, timerMode]);
  useEffect(() => { if (isRunning || durationMode !== "custom") return; setSelectedMinutes(customTotalMinutes); }, [customTotalMinutes, durationMode, isRunning]);
  useEffect(() => { if (timerMode === "pomodoro" && !isRunning && !isComplete) { setTimeLeftSeconds(pomodoroWork * 60); setPomodoroPhase("work"); setPomodoroRound(1); } }, [timerMode]);

  useEffect(() => {
    if (!isRunning) return;
    if (timerMode === "stopwatch") { const id = window.setInterval(() => setStopwatchSeconds((p) => p + 1), 1000); return () => window.clearInterval(id); }
    if (timerMode === "pomodoro" && (pomodoroPhase === "story" || pomodoroPhase === "ready")) return;
    const id = window.setInterval(() => setTimeLeftSeconds((p) => Math.max(0, p - 1)), 1000);
    return () => window.clearInterval(id);
  }, [isRunning, timerMode, pomodoroPhase]);

  useEffect(() => {
    if (!isRunning || timerMode === "stopwatch" || timeLeftSeconds !== 0) return;
    playNotificationSound();

    if (timerMode === "pomodoro") {
      if (pomodoroPhase === "work") {
        const xpToAdd = Math.max(5, pomodoroWork * 10);
        setPomodoroRoundXp(xpToAdd);
        awardXp(sessionNonceRef.current, xpToAdd);
        saveSession({ subject, elapsedMinutes: pomodoroWork, targetMinutes: pomodoroWork, xpEarned: xpToAdd, completionRate: 1 });
        setPomodoroPhase("story");
        setPomodoroGenerating(true);
        setPomodoroChapterText(null); setPomodoroChoices([]); setPomodoroSelectedChoice(null);
        fetchChapter({ subject, elapsedMinutes: pomodoroWork, targetMinutes: pomodoroWork, completionRate: 1 })
          .then(({ chapter, choices }) => { setPomodoroChapterText(chapter); setPomodoroChoices(choices); updateSessionChapter(chapter); })
          .catch(() => setPomodoroChapterText("Büyü bu sefer sessiz kaldı..."))
          .finally(() => setPomodoroGenerating(false));
      } else if (pomodoroPhase === "break") {
        setPomodoroPhase("ready");
      }
      return;
    }

    if (didFinalizeRef.current) return;
    didFinalizeRef.current = true;
    const nonce = sessionNonceRef.current; const targetMinutes = targetMinutesRef.current;
    const xpToAdd = Math.max(5, targetMinutes * 10);
    setEarnedXp(xpToAdd); setCompletedElapsedMinutes(targetMinutes); setCompletedCompletionRate(1);
    awardXp(nonce, xpToAdd);
    saveSession({ subject, elapsedMinutes: targetMinutes, targetMinutes, xpEarned: xpToAdd, completionRate: 1 });
    setIsRunning(false); setIsComplete(true); setCompletedSubject(subject); setCompletedDuration(targetMinutes); setCompletionId((v) => v + 1);
  }, [isRunning, timeLeftSeconds, timerMode, pomodoroPhase, pomodoroWork, subject]);

  const startBreak = () => { setPomodoroPhase("break"); setTimeLeftSeconds(pomodoroBreak * 60); };

  const startNextRound = () => {
    setPomodoroRound((r) => r + 1);
    setPomodoroPhase("work");
    setTimeLeftSeconds(pomodoroWork * 60);
    setPomodoroChapterText(null); setPomodoroChoices([]); setPomodoroSelectedChoice(null);
  };

  const finishEarly = () => {
    if (!isRunning || isGenerating) return;
    playNotificationSound();

    if (timerMode === "stopwatch") {
      const elapsedMinutes = Math.floor(stopwatchSeconds / 60);
      const xpToAdd = Math.max(5, elapsedMinutes * 10);
      setEarnedXp(xpToAdd); setCompletedElapsedMinutes(elapsedMinutes); setCompletedCompletionRate(1);
      awardXp(sessionNonceRef.current, xpToAdd);
      saveSession({ subject, elapsedMinutes, targetMinutes: elapsedMinutes, xpEarned: xpToAdd, completionRate: 1 });
      setIsRunning(false); setIsComplete(true); setCompletedSubject(subject); setCompletedDuration(elapsedMinutes); setCompletionId((v) => v + 1);
      setChapterText(null); setChoices([]); setSelectedChoice(null); setGenerationError(null);
      return;
    }

    if (timerMode === "pomodoro") {
      const workedInThisRound = pomodoroPhase === "work" ? pomodoroWork - Math.floor(timeLeftSeconds / 60) : pomodoroWork;
      const totalWorked = (pomodoroRound - 1) * pomodoroWork + workedInThisRound;
      const xpToAdd = Math.max(5, totalWorked * 10);
      setEarnedXp(xpToAdd); setCompletedElapsedMinutes(totalWorked);
      setCompletedCompletionRate(totalWorked >= pomodoroWork ? 1 : totalWorked / pomodoroWork);
      awardXp(sessionNonceRef.current, xpToAdd);
      saveSession({ subject, elapsedMinutes: totalWorked, targetMinutes: pomodoroWork, xpEarned: xpToAdd, completionRate: totalWorked / pomodoroWork });
      setIsRunning(false); setIsComplete(true); setCompletedSubject(subject); setCompletedDuration(pomodoroWork);
      setCompletionId(0);
      setChapterText(null); setChoices([]); setSelectedChoice(null); setGenerationError(null);
      return;
    }

    if (didFinalizeRef.current) return;
    didFinalizeRef.current = true;
    const targetMinutes = targetMinutesRef.current; const startTs = startTimestampRef.current;
    let elapsedMinutes = 0;
    if (typeof startTs === "number") elapsedMinutes = Math.floor(Math.max(0, (Date.now() - startTs) / 1000) / 60);
    elapsedMinutes = Math.min(elapsedMinutes, targetMinutes);
    const completionRate = targetMinutes > 0 ? Math.max(0, Math.min(1, elapsedMinutes / targetMinutes)) : 0;
    const xpToAdd = Math.max(5, elapsedMinutes * 10);
    setEarnedXp(xpToAdd); setCompletedElapsedMinutes(elapsedMinutes); setCompletedCompletionRate(completionRate);
    awardXp(sessionNonceRef.current, xpToAdd);
    saveSession({ subject, elapsedMinutes, targetMinutes, xpEarned: xpToAdd, completionRate });
    setIsRunning(false); setTimeLeftSeconds(0); setIsComplete(true);
    setCompletedSubject(subject); setCompletedDuration(targetMinutes); setCompletionId((v) => v + 1);
    setIsGenerating(false); setChapterText(null); setChoices([]); setSelectedChoice(null); setGenerationError(null);
  };

  const start = () => {
    if (isRunning) return;
    sessionNonceRef.current += 1; didFinalizeRef.current = false; startTimestampRef.current = Date.now();
    if (timerMode === "stopwatch") { setStopwatchSeconds(0); }
    else if (timerMode === "pomodoro") { targetMinutesRef.current = pomodoroWork; setTimeLeftSeconds(pomodoroWork * 60); setPomodoroPhase("work"); setPomodoroRound(1); setPomodoroChapterText(null); setPomodoroChoices([]); setPomodoroSelectedChoice(null); }
    else { targetMinutesRef.current = selectedMinutes; setTimeLeftSeconds(selectedMinutes * 60); }
    setIsComplete(false); setIsGenerating(false); setChapterText(null); setChoices([]); setSelectedChoice(null); setGenerationError(null);
    setIsRunning(true);
  };

  const handleChoiceSelect = (choice: Choice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    try { window.localStorage.setItem("grimoire_last_choice", choice.text); incrementTotalChoices(); } catch { /* ignore */ }
  };

  const handlePomodoroChoiceSelect = (choice: Choice) => {
    if (pomodoroSelectedChoice) return;
    setPomodoroSelectedChoice(choice);
    try { window.localStorage.setItem("grimoire_last_choice", choice.text); incrementTotalChoices(); } catch { /* ignore */ }
  };

  useEffect(() => {
    if (!isComplete || completionId === 0 || !completedSubject || !Number.isFinite(completedDuration) || isGenerating) return;
    let isCancelled = false;
    const generate = async () => {
      setIsGenerating(true); setGenerationError(null); setChapterText(null); setChoices([]); setSelectedChoice(null);
      try {
        const { chapter, choices: rc } = await fetchChapter({ subject: completedSubject, elapsedMinutes: completedElapsedMinutes, targetMinutes: completedDuration, completionRate: completedCompletionRate });
        if (!isCancelled) { setChapterText(chapter); setChoices(rc); updateSessionChapter(chapter); }
      } catch (err) { if (!isCancelled) setGenerationError(err instanceof Error ? err.message : "Bölüm üretilemedi."); }
      finally { if (!isCancelled) setIsGenerating(false); }
    };
    void generate();
    return () => { isCancelled = true; setIsGenerating(false); };
  }, [completionId, isComplete, completedSubject, completedDuration, completedElapsedMinutes, completedCompletionRate]);

  const displayTime = timerMode === "stopwatch" ? formattedStopwatch : formattedTime;
  const isPomodoroStoryOrReady = timerMode === "pomodoro" && (pomodoroPhase === "story" || pomodoroPhase === "ready");

  return (
    <div className="grimoire-hero">
      <style jsx>{`
        @keyframes grimoirePulse { 0%,100% { opacity:0.65; transform:translateY(0); } 50% { opacity:1; transform:translateY(-1px); } }
        .grimoire-loading-pulse { animation: grimoirePulse 1.1s ease-in-out infinite; }
        @keyframes choiceFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .choice-fade-in { animation: choiceFadeIn 0.4s ease-out forwards; }
      `}</style>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black/25 p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">

            {!isRunning && !isComplete && (
              <div className="flex gap-2 mb-6 flex-wrap justify-center">
                {(["pomodoro", "countdown", "stopwatch"] as TimerMode[]).map((mode) => (
                  <button key={mode} type="button" onClick={() => setTimerMode(mode)}
                    className={["rounded-full border px-4 py-1.5 text-xs font-bold transition", timerMode === mode ? "border-purple-400/70 bg-purple-950/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]" : "border-white/10 bg-black/20 text-white/60 hover:text-white/80"].join(" ")}
                  >
                    {mode === "pomodoro" ? "🍅 Pomodoro" : mode === "countdown" ? "⏱️ Sayaç" : "⏲️ Kronometre"}
                  </button>
                ))}
              </div>
            )}

            {timerMode === "pomodoro" && isRunning && (
              <div className="mb-4 flex items-center gap-3">
                <span className={["rounded-full px-3 py-1 text-xs font-bold",
                  pomodoroPhase === "work" ? "bg-purple-500/30 text-purple-200 border border-purple-400/40"
                  : pomodoroPhase === "break" ? "bg-green-500/20 text-green-300 border border-green-400/30"
                  : pomodoroPhase === "ready" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                  : "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                ].join(" ")}>
                  {pomodoroPhase === "work" ? "🧠 Çalışma" : pomodoroPhase === "break" ? "☕ Mola" : pomodoroPhase === "ready" ? "✅ Hazır" : "📖 Hikaye"}
                </span>
                <span className="text-xs text-white/50">{pomodoroRound}. tur</span>
              </div>
            )}

            {!isPomodoroStoryOrReady && (
              <h1 className={["font-serif font-black tracking-wide", timerMode === "pomodoro" && pomodoroPhase === "break" ? "text-4xl sm:text-6xl" : "text-5xl sm:text-7xl"].join(" ")}
                style={{ color: timerMode === "pomodoro" && pomodoroPhase === "break" ? "rgba(134,239,172,0.9)" : "rgba(255,255,255,0.98)", textShadow: "0 0 14px rgba(255,255,255,0.55), 0 0 32px rgba(168,85,247,0.22)" }}
              >{displayTime}</h1>
            )}

            {isComplete && <p className="mt-6 text-xl font-semibold text-white/95">Seans Tamamlandı! 🎉</p>}
            {isGenerating && <p className="mt-5 text-lg font-semibold text-white/90 grimoire-loading-pulse">Büyü örülüyor...</p>}

            {timerMode === "pomodoro" && isRunning && pomodoroPhase === "story" && (
              <div className="w-full mt-2">
                {pomodoroGenerating ? (
                  <p className="text-lg font-semibold text-white/90 grimoire-loading-pulse mb-6">Büyü örülüyor...</p>
                ) : pomodoroChapterText ? (
                  <article className="w-full rounded-3xl border border-white/10 bg-black/35 p-6 text-left mb-4">
                    <h2 className="text-xl font-bold text-white/95">📖 {pomodoroRound}. Tur Bölümü</h2>
                    <div className="mt-4 font-serif italic leading-relaxed text-white/90 whitespace-pre-wrap">{pomodoroChapterText}</div>
                    <p className="mt-4 text-base font-bold text-purple-200/95">⚡ {pomodoroRoundXp} XP Kazandın!</p>
                    {pomodoroChoices.length > 0 && !pomodoroSelectedChoice && (
                      <div className="mt-5 choice-fade-in">
                        <p className="text-sm font-semibold text-white/70 mb-3">⚔️ Kahraman ne yapacak?</p>
                        <div className="flex flex-col gap-3">
                          {pomodoroChoices.map((choice) => (
                            <button key={choice.id} type="button" onClick={() => handlePomodoroChoiceSelect(choice)}
                              className="w-full rounded-2xl border px-5 py-3 text-left text-sm font-semibold border-purple-400/30 bg-purple-950/20 text-white/85 hover:border-purple-400/70 hover:bg-purple-950/40 hover:text-white transition-all duration-200"
                            >{choice.id === 1 ? "◈ " : "◇ "}{choice.text}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {pomodoroSelectedChoice && (
                      <div className="mt-4 rounded-2xl border border-purple-400/20 bg-purple-950/15 px-5 py-3 choice-fade-in">
                        <p className="text-sm font-semibold text-purple-200/90">Seçim yapıldı! ⚔️</p>
                        <p className="mt-1 text-xs text-white/60 italic">&ldquo;{pomodoroSelectedChoice.text}&rdquo;</p>
                      </div>
                    )}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button type="button" onClick={startBreak}
                        className="flex-1 rounded-full border border-green-400/40 bg-green-950/30 px-5 py-3 font-bold text-green-200 hover:bg-green-950/50 transition text-sm"
                      >☕ Molaya Geç ({pomodoroBreak} dk)</button>
                      <button type="button" onClick={startNextRound}
                        className="flex-1 rounded-full border border-purple-400/40 bg-gradient-to-b from-purple-900/60 to-purple-950/80 px-5 py-3 font-bold text-white hover:-translate-y-0.5 transition-transform text-sm"
                      >⚔️ {pomodoroRound + 1}. Tura Geç</button>
                    </div>
                  </article>
                ) : null}
              </div>
            )}

            {timerMode === "pomodoro" && isRunning && pomodoroPhase === "ready" && (
              <div className="w-full mt-6 mb-4">
                <p className="text-green-300/80 font-semibold mb-4">☕ Mola tamamlandı! Hazır olduğunda devam et.</p>
                <button type="button" onClick={startNextRound}
                  className="w-full rounded-full border border-purple-400/40 bg-gradient-to-b from-purple-900/60 to-purple-950/80 px-6 py-3 font-bold text-white shadow-[0_0_32px_rgba(168,85,247,0.25)] hover:-translate-y-0.5 transition-transform"
                >⚔️ {pomodoroRound + 1}. Tura Geç</button>
              </div>
            )}

            <div className="mt-4 w-full">
              <label className="block text-left text-sm font-semibold text-white/80">Konu</label>
              <input type="text" value={subject} disabled={isRunning || isGenerating}
                onChange={(e) => setSubject(e.target.value)} placeholder="Neye odaklanmak istiyorsun?"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white/95 outline-none placeholder:text-white/50 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30"
              />

              {timerMode === "pomodoro" && !isRunning && !isComplete && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-left text-xs font-semibold text-white/70 mb-1.5">🧠 Çalışma (dk)</label>
                    <input type="number" min={1} max={120} value={pomodoroWork} onChange={(e) => setPomodoroWork(Math.max(1, Number(e.target.value)))}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5 text-white/95 outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30" />
                  </div>
                  <div>
                    <label className="block text-left text-xs font-semibold text-white/70 mb-1.5">☕ Mola (dk)</label>
                    <input type="number" min={1} max={60} value={pomodoroBreak} onChange={(e) => setPomodoroBreak(Math.max(1, Number(e.target.value)))}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5 text-white/95 outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30" />
                  </div>
                </div>
              )}

              {timerMode === "countdown" && !isRunning && !isComplete && (
                <div className="mt-5">
                  <p className="text-left text-sm font-semibold text-white/80">Süre</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {[25, 45, 60].map((mins) => {
                      const selected = durationMode === "preset" && selectedMinutes === mins;
                      return (
                        <button key={mins} type="button" onClick={() => { setDurationMode("preset"); setSelectedMinutes(mins); }}
                          className={["rounded-full border px-5 py-2 text-sm font-bold transition", selected ? "border-purple-400/70 bg-purple-950/35 text-white shadow-[0_0_28px_rgba(168,85,247,0.55)]" : "border-white/10 bg-black/20 text-white/80 hover:border-purple-300/35"].join(" ")}
                        >{mins} dk</button>
                      );
                    })}
                    <button type="button" onClick={() => { setDurationMode("custom"); setCustomHours(String(Math.floor(selectedMinutes / 60))); setCustomMinutes(String(selectedMinutes % 60)); }}
                      className={["rounded-full border px-5 py-2 text-sm font-bold transition", durationMode === "custom" ? "border-purple-400/70 bg-purple-950/35 text-white shadow-[0_0_28px_rgba(168,85,247,0.55)]" : "border-white/10 bg-black/20 text-white/80 hover:border-purple-300/35"].join(" ")}
                    >Diğer</button>
                  </div>
                  {durationMode === "custom" && (
                    <div className="mt-4 flex gap-4">
                      <div className="flex-1">
                        <label className="block text-left text-sm font-semibold text-white/80">saat</label>
                        <input type="number" min={0} max={10} step={1} value={customHours} placeholder="0" onChange={(e) => setCustomHours(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white/95 outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-left text-sm font-semibold text-white/80">dakika</label>
                        <input type="number" min={0} max={59} step={1} value={customMinutes} placeholder="0" onChange={(e) => setCustomMinutes(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white/95 outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                <button type="button" onClick={start} disabled={isRunning || isGenerating}
                  className="flex-1 rounded-full border px-6 py-3 font-bold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 border-purple-400/40 bg-gradient-to-b from-purple-900/60 to-purple-950/80 text-white shadow-[0_0_32px_rgba(168,85,247,0.25)]"
                >Başlat</button>

                {!isRunning && !isComplete && (
                  <Link href="/" className="flex-1 rounded-full border px-6 py-3 text-center font-bold border-white/15 bg-white/5 text-white/90 hover:border-purple-300/30 hover:bg-white/10 transition">Vazgeç</Link>
                )}

                {isRunning && !isComplete && !isPomodoroStoryOrReady && (
                  <button type="button" onClick={finishEarly} disabled={isGenerating}
                    className="flex-1 rounded-full border px-6 py-3 font-bold border-purple-400/40 bg-gradient-to-b from-purple-900/50 to-purple-950/80 text-white hover:-translate-y-0.5 transition-transform disabled:cursor-not-allowed disabled:opacity-70"
                  >Seansı Bitir</button>
                )}

                {isComplete && <div className="flex-1" />}
              </div>

              <p className="mt-6 text-sm text-white/60">Konu: <span className="text-white/90 font-semibold">{subject}</span></p>
            </div>

            {chapterText && (
              <article className="mt-8 w-full rounded-3xl border border-white/10 bg-black/35 p-6 text-left">
                <h2 className="text-xl font-bold text-white/95 drop-shadow-[0_0_18px_rgba(168,85,247,0.25)]">📖 Yeni Bölüm Açıldı</h2>
                <div className="mt-4 font-serif italic leading-relaxed text-white/90 whitespace-pre-wrap">{chapterText}</div>
                <p className="mt-3 text-sm italic text-white/55">⚔️ Hikaye devam edecek... Bir sonraki seans yeni bir bölüm açacak.</p>
                <p className="mt-5 text-base font-bold text-purple-200/95">⚡ {earnedXp} XP Kazandın!</p>
                {choices.length > 0 && !selectedChoice && (
                  <div className="mt-6 choice-fade-in">
                    <p className="text-sm font-semibold text-white/70 mb-3">⚔️ Kahraman ne yapacak?</p>
                    <div className="flex flex-col gap-3">
                      {choices.map((choice) => (
                        <button key={choice.id} type="button" onClick={() => handleChoiceSelect(choice)}
                          className="w-full rounded-2xl border px-5 py-3 text-left text-sm font-semibold border-purple-400/30 bg-purple-950/20 text-white/85 hover:border-purple-400/70 hover:bg-purple-950/40 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200"
                        >{choice.id === 1 ? "◈ " : "◇ "}{choice.text}</button>
                      ))}
                    </div>
                  </div>
                )}
                {selectedChoice && (
                  <div className="mt-6 rounded-2xl border border-purple-400/20 bg-purple-950/15 px-5 py-4 choice-fade-in">
                    <p className="text-sm font-semibold text-purple-200/90">Seçim yapıldı! ⚔️</p>
                    <p className="mt-1 text-sm text-white/70 italic">&ldquo;{selectedChoice.text}&rdquo;</p>
                    <p className="mt-2 text-xs text-white/50">Bir sonraki seans bu kararın sonucunu getirecek...</p>
                  </div>
                )}
                <Link href="/" className="mt-6 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 border-white/15 bg-white/5 text-white/95 hover:border-purple-300/30 hover:bg-white/10 transition">Ana Sayfaya Dön</Link>
              </article>
            )}

            {generationError && (
              <div className="mt-8 w-full rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-left">
                <p className="text-red-100 font-semibold">Büyü başarısız oldu.</p>
                <p className="mt-2 text-red-200/90 text-sm whitespace-pre-wrap">{generationError}</p>
                <Link href="/" className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white/95 hover:bg-white/10 transition">Ana Sayfaya Dön</Link>
              </div>
            )}
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