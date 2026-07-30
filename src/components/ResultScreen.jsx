import React, { useState } from "react";
import { Trophy, RefreshCw, Send, ShieldAlert, BadgeCheck, CircleUserRound } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function ResultScreen({ players, secretWord, whiteWord, onRestart }) {
  const [guessInput, setGuessInput] = useState("");
  const [guessResult, setGuessResult] = useState(null); // 'CORRECT' | 'WRONG' | null

  const mrWhitePlayers = players.filter((p) => p.role === "MR_WHITE");

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!guessInput.trim()) return;
    if (guessInput.trim().toLowerCase() === secretWord.toLowerCase()) {
      setGuessResult("CORRECT");
    } else {
      setGuessResult("WRONG");
    }
  };

  return (
    <ScreenFrame
      step={4}
      stepLabel="Result Screen"
      title="HASIL PERMAINAN"
      subtitle="Siapa Mr. White sebenarnya?"
      activeTab="leaderboard"
      showHelp={false}
      showBack={false}
    >
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="screen-panel overflow-hidden rounded-[1.45rem] p-0">
            <div className="bg-gradient-to-r from-lime-500 to-lime-400 px-4 py-2.5 text-center text-[0.62rem] font-black uppercase tracking-[0.3em] text-[#08110a]">
              Mr White Terungkap!
            </div>
            <div className="p-4 text-center sm:p-5">
              <div className="mb-4 flex justify-center">
                <div className="relative grid h-24 w-24 place-items-center rounded-full border border-lime-400/25 bg-black/35 shadow-[0_0_30px_rgba(124,255,114,0.12)]">
                  {mrWhitePlayers[0] ? (
                    <>
                      <div className="grid h-17 w-17 place-items-center rounded-full border border-white/10 bg-white/6 text-2xl font-black text-white">
                        {mrWhitePlayers[0].name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/45 text-base">
                        🎩
                      </div>
                    </>
                  ) : (
                    <CircleUserRound className="h-12 w-12 text-white/35" />
                  )}
                </div>
              </div>

              <div className="text-[0.62rem] uppercase tracking-[0.4em] text-white/42">Pemain terpilih</div>
              <h3 className="mt-2 text-[1.7rem] font-black tracking-[0.12em] text-white">
                {mrWhitePlayers[0]?.name ?? "Belum ada"}
              </h3>
              <p className="mt-2 text-[0.82rem] text-lime-300">adalah Mr. White!</p>
              <p className="mt-3 rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-3 text-[0.8rem] text-white/60">
                Mengira katanya: <span className="font-semibold text-white">"{whiteWord}"</span>
              </p>
            </div>
          </div>

          <div className="screen-panel rounded-[1.45rem] p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-white/42">Kata rahasia asli</p>
                <p className="mt-2 text-[1.45rem] font-black text-lime-300">{secretWord}</p>
              </div>
              <Trophy className="h-8 w-8 text-amber-300" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="screen-panel rounded-[1.45rem] p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-white/42">Mr White, mau coba tebak?</p>
                <p className="mt-2 text-[0.8rem] text-white/55">Ketik kata rahasia asli menurutmu untuk mencuri kemenangan.</p>
              </div>
              <ShieldAlert className="h-7 w-7 text-lime-300/80" />
            </div>

            <form onSubmit={handleGuessSubmit} className="space-y-3">
              <input
                type="text"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                placeholder="Tulis jawabanmu di sini..."
                disabled={guessResult !== null}
                className="w-full rounded-[1rem] border border-white/10 bg-black/35 px-4 py-2.5 text-[0.8rem] text-white placeholder:text-white/28 outline-none transition focus:border-lime-400/50"
              />
              {guessResult === null ? (
                <button
                  type="submit"
                  className="ui-pill-button ui-pill-button--primary w-full px-5 py-3 text-[0.74rem] font-black uppercase tracking-[0.22em]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="ui-button-label">Kirim Jawaban</span>
                </button>
              ) : (
                <div
                  className={`rounded-[1rem] border px-4 py-3.5 text-center text-[0.8rem] font-semibold ${
                    guessResult === "CORRECT"
                      ? "border-lime-400/30 bg-lime-400/10 text-lime-200"
                      : "border-rose-400/30 bg-rose-400/10 text-rose-200"
                  }`}
                >
                  {guessResult === "CORRECT"
                    ? "Tebakan benar. Mr. White membalikkan keadaan dan menang!"
                    : "Tebakan salah. True Fans menang mutlak!"}
                </div>
              )}
            </form>
          </div>

          <div className="screen-panel rounded-[1.45rem] p-3.5">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-[1rem] border border-white/8 bg-white/4 px-3 py-3.5">
                <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/38">Status</p>
                <p className="mt-2 text-[0.8rem] font-bold text-white">Selesai</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/4 px-3 py-3.5">
                <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/38">Mr. White</p>
                <p className="mt-2 text-[0.8rem] font-bold text-white">{mrWhitePlayers.length}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/4 px-3 py-3.5">
                <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/38">Skor Tim</p>
                <p className="mt-2 text-[0.8rem] font-bold text-amber-300">+1200 XP</p>
              </div>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="ui-square-button w-full px-5 py-3.5 text-[0.78rem] font-black uppercase tracking-[0.22em]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="ui-button-label">Main Lagi</span>
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
}