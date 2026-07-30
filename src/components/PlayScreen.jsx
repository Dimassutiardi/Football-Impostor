import React, { useState, useEffect } from "react";
import { Lock, Pause, Play, MessageSquare, Settings2, CircleFadingPlus, Vote } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function PlayScreen({ players, onGoToResult }) {
  const [timeLeft, setTimeLeft] = useState(120); // 2 Menit (120 detik)
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <ScreenFrame
      step={3}
      stepLabel="Reveal Screen"
      title="WAKTUNYA BERMAIN!"
      subtitle="Beri clue, diskusi, dan temukan Mr. White"
      activeTab="history"
      rightIcon={<Settings2 className="h-5 w-5" />}
    >
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="screen-panel rounded-[1.45rem] p-3.5 sm:p-4">
            <div className="mb-2.5 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.32em] text-white/42">
              <span>Kata rahasia</span>
              <Lock className="h-3.5 w-3.5 text-white/35" />
            </div>
            <div className="rounded-[1.15rem] border border-white/8 bg-black/35 px-4 py-4 text-center">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-white/38">Kata rahasia</p>
              <p className="mt-2.5 text-[1.55rem] font-black tracking-[0.28em] text-lime-300">REAL MADRID</p>
            </div>
          </div>

          <div className="screen-panel rounded-[1.45rem] p-3.5 sm:p-4">
            <p className="mb-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-white/42">
              Urutan memberi clue
            </p>
            <div className="flex gap-2.5 overflow-x-auto pb-1.5">
              {players.map((p, idx) => (
                <div key={idx} className="flex min-w-[3.9rem] flex-col items-center gap-1 text-center">
                  <div className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-[0.72rem] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    {p.name.charAt(0).toUpperCase()}
                    <span className="absolute -left-1 -top-1 grid h-4.5 w-4.5 place-items-center rounded-full bg-lime-400 text-[0.58rem] font-black text-[#08110a]">
                      {idx + 1}
                    </span>
                  </div>
                  <span className="w-full truncate text-[0.64rem] text-white/70">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="screen-panel rounded-[1.55rem] p-4">
            <p className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-white/42">Waktu diskusi</p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="relative grid h-24 w-24 place-items-center rounded-full border border-lime-400/20 bg-black/30 shadow-[0_0_36px_rgba(124,255,114,0.12)]">
                <div className="absolute inset-2 rounded-full border border-white/7" />
                <div className="absolute inset-1 rounded-full border border-lime-300/30" />
                <div className="relative text-[1.9rem] font-black tracking-[0.06em] text-white">{formatTime(timeLeft)}</div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="ui-square-button w-24 px-3 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.22em]"
                >
                  {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  <span className="ui-button-label">{isPaused ? "Lanjut" : "Pause"}</span>
                </button>
                <div className="rounded-[1rem] border border-lime-400/15 bg-lime-400/10 px-3 py-2.5 text-center text-[0.62rem] text-lime-200">Gunakan waktu ini untuk diskusi singkat dan fokus ke petunjuk.</div>
              </div>
            </div>
          </div>

          <div className="screen-panel rounded-[1.45rem] p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-lime-300">Panduan voting</p>
              <div className="grid h-7 w-7 place-items-center rounded-full bg-lime-400/10 text-lime-300"><Vote className="h-3.5 w-3.5" /></div>
            </div>
            <div className="space-y-2 text-[0.78rem] text-white/62">
              <div className="rounded-[1rem] border border-white/8 bg-white/4 px-3.5 py-2.5">1. Diskusikan dan cari tahu siapa Mr. White.</div>
              <div className="rounded-[1rem] border border-white/8 bg-white/4 px-3.5 py-2.5">2. Setelah yakin, lakukan voting bersama.</div>
              <div className="rounded-[1rem] border border-white/8 bg-white/4 px-3.5 py-2.5">3. Pemain dengan suara terbanyak harus diungkap.</div>
            </div>
          </div>

          <button
            onClick={onGoToResult}
            className="ui-pill-button ui-pill-button--primary w-full px-5 py-3.5 text-[0.78rem] font-black uppercase tracking-[0.22em]"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span className="ui-button-label">Siap, Mulai Diskusi!</span>
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
}