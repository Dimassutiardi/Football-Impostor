import React, { useState } from "react";
import { CheckCircle2, XCircle, UserX, ShieldCheck, HelpCircle, RotateCcw } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function ResultScreen({ players, secretWord, impostorQuestion, guessedPlayer, onRestart }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const actualImpostors = players.filter((p) => p.isImpostor);
  const isGuessCorrect = guessedPlayer?.isImpostor;

  return (
    <ScreenFrame
      stepLabel="Hasil"
      title="HASIL PERMAINAN"
      subtitle="Apakah tebakan kalian tepat?"
      activeTab="home"
    >
      <div className="space-y-3.5">
        {/* Status Hasil */}
        <div
          className={`rounded-2xl border p-3.5 text-center transition ${
            isGuessCorrect
              ? "border-lime-500/40 bg-lime-500/10 text-lime-300"
              : "border-rose-500/40 bg-rose-500/10 text-rose-300"
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            {isGuessCorrect ? <CheckCircle2 className="h-5 w-5 text-lime-400" /> : <XCircle className="h-5 w-5 text-rose-400" />}
            <span className="text-xs font-black uppercase tracking-wider">
              {isGuessCorrect ? "Tebakan Benar!" : "Tebakan Salah!"}
            </span>
          </div>
          
          <p className="text-[0.7rem] text-white/70">
            Kalian menuduh: <span className="font-bold text-white">"{guessedPlayer?.name}"</span>
          </p>
          
          <div className="mt-1.5 text-xs font-black text-white">
            {isGuessCorrect ? "🎉 Impostor Berhasil Ditangkap!" : "😈 Impostor Berhasil Lolos!"}
          </div>
        </div>

        {/* List Impostor Sebenarnya */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-white">Impostor Sebenarnya</span>
            <UserX className="h-4 w-4 text-rose-400" />
          </div>

          <div className="space-y-1.5">
            {actualImpostors.map((imp) => (
              <div
                key={imp.id}
                className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-200"
              >
                <span className="text-xs font-bold">{imp.name}</span>
                <span className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20">
                  Impostor
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Detail Pertanyaan */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <div className="text-xs font-bold text-white">Bongkar Pertanyaan</div>
              <p className="text-[0.6rem] text-white/50">Lihat perbandingan teks pertanyaan</p>
            </div>
            <HelpCircle className="h-4 w-4 text-lime-400" />
          </button>

          {showQuestions && (
            <div className="mt-3 space-y-2 border-t border-white/10 pt-2.5">
              <div className="rounded-xl border border-lime-500/20 bg-lime-500/5 p-2.5 text-left">
                <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase text-lime-400 mb-0.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Pemain Biasa:</span>
                </div>
                <p className="text-xs font-semibold text-white">{secretWord}</p>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-2.5 text-left">
                <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase text-rose-400 mb-0.5">
                  <UserX className="h-3.5 w-3.5" />
                  <span>Impostor:</span>
                </div>
                <p className="text-xs font-semibold text-white">{impostorQuestion}</p>
              </div>
            </div>
          )}
        </div>

        {/* Restart Button */}
        <button
          type="button"
          onClick={onRestart}
          className="ui-pill-button ui-pill-button--primary w-full py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Main Lagi</span>
        </button>
      </div>
    </ScreenFrame>
  );
}