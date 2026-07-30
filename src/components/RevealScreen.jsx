import React, { useState } from "react";
import { Eye, EyeOff, Lightbulb, HelpCircle, CircleChevronRight, ScanEye } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function RevealScreen({ players, onFinishReveal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;

  const handleNext = () => {
    setIsHolding(false);
    if (isLastPlayer) {
      onFinishReveal();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <ScreenFrame
      step={2}
      stepLabel="Reveal Screen"
      title="LIHAT PERANMU"
      subtitle="Jangan tunjukkan ke pemain lain!"
      activeTab="home"
      rightIcon={<HelpCircle className="h-5 w-5" />}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-full border border-white/8 bg-black/22 px-3 py-2 text-[0.7rem] text-white/70 sm:px-4">
          <span className="font-semibold">Pemain {currentIndex + 1} dari {players.length}</span>
          <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-lime-300">Ronde aman</span>
        </div>

        <div className="space-y-4">
          <div className="screen-panel green-glow relative overflow-hidden rounded-[1.7rem] p-4 sm:p-5">
            <div className="absolute left-4 top-4 text-white/35">
              <EyeOff className="h-5 w-5" />
            </div>
            <div className="absolute right-4 top-4 rounded-full border border-white/8 bg-black/35 p-2 text-white/45">
              <ScanEye className="h-4 w-4" />
            </div>

            {!isHolding ? (
              <div className="flex min-h-[19rem] flex-col items-center justify-center text-center">
                <div className="mb-4 grid h-20 w-20 place-items-center rounded-full border border-white/8 bg-white/5 shadow-[0_0_40px_rgba(124,255,114,0.08)]">
                  <Eye className="h-10 w-10 text-white/45" />
                </div>
                <div className="mb-2 text-[0.62rem] uppercase tracking-[0.38em] text-white/40">Peranmu</div>
                <div className="text-[1.95rem] font-black tracking-[0.18em] text-lime-300">{currentPlayer.name}</div>
                <p className="mx-auto mt-4 max-w-sm text-[0.82rem] leading-relaxed text-white/55">
                  Tekan dan tahan tombol hijau di bawah untuk melihat kartu peranmu.
                </p>
              </div>
            ) : (
              <div className="flex min-h-[19rem] flex-col items-center justify-center text-center animate-in fade-in duration-300">
                <div className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-white/45">
                  Peranmu ({currentPlayer.name})
                </div>
                <h3 className="text-[1.95rem] font-black tracking-[0.14em] text-lime-300">
                  {currentPlayer.role === "MR_WHITE" ? "MR. WHITE" : "TRUE FAN"}
                </h3>

                <div className="mt-5 w-full rounded-[1.35rem] border border-white/8 bg-black/30 p-4 text-left">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-white/38">Kata kamu</p>
                  <p className="mt-2 text-[1.55rem] font-black text-white">{currentPlayer.word}</p>
                  <p className="mt-2 text-[0.82rem] text-lime-300/90">{currentPlayer.hint}</p>
                </div>

                {currentPlayer.role === "MR_WHITE" ? (
                  <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                    Kamu dapat kata mirip. Cari topik utama dan jangan sampai ketahuan.
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/60">
                    Ingat kata rahasiamu dan beri clue yang aman.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.45rem] border border-white/8 bg-black/22 p-3.5">
              <p className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-white/42">
                Petunjuk reveal
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[0.65rem] text-white/55">
                {[
                  "Jangan tunjukkan layar",
                  "Tekan tombol hijau",
                  "Lanjutkan ke pemain berikutnya",
                ].map((item, index) => (
                  <div key={item} className="rounded-[1rem] border border-white/8 bg-white/5 px-2.5 py-3.5">
                    <div className="mx-auto mb-2 grid h-5 w-5 place-items-center rounded-full bg-lime-400/10 text-[0.58rem] font-black text-lime-300">
                      {index + 1}
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              className="flex w-full items-center justify-center gap-3 rounded-[1.25rem] border border-lime-300/20 bg-gradient-to-r from-lime-500 to-lime-400 px-5 py-3.5 text-[0.78rem] font-black uppercase tracking-[0.22em] text-[#08110a] shadow-[0_0_35px_rgba(124,255,114,0.25)] transition active:scale-[0.99]"
                className="ui-pill-button ui-pill-button--primary w-full px-5 py-3.5 text-[0.78rem] font-black uppercase tracking-[0.22em]"
            >
              <Eye className="h-4.5 w-4.5" />
                <span className="ui-button-label">Hold to Reveal</span>
            </button>

            <button
              onClick={handleNext}
                className="ui-square-button w-full px-5 py-3 text-[0.64rem] font-bold uppercase tracking-[0.24em]"
            >
                <span className="ui-button-label">{isLastPlayer ? "Selesai Reveal & Mulai Diskusi" : "Lanjut ke Pemain Berikutnya"}</span>
              <CircleChevronRight className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3 rounded-[1.15rem] border border-amber-400/15 bg-amber-400/10 p-3.5 text-left text-[0.78rem] text-white/65">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p>
                <span className="font-semibold text-white">Tips:</span> pastikan tidak ada yang bisa melihat
                layarmu saat reveal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}