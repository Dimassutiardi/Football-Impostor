import React, { useState } from "react";
import { Eye, HelpCircle, CircleChevronRight, Lock } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function RevealScreen({ 
  players, 
  onFinishReveal,
  activeTab = "home",   // 💡 Tambahkan ini
  onTabChange           // 💡 Tambahkan ini
}) {
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
        stepLabel="Reveal Screen"
        title="LIHAT PERTANYAAN"
        subtitle="Jangan tunjukkan ke pemain lain!"
        activeTab={activeTab}
        onTabChange={onTabChange}
        rightIcon={<HelpCircle className="h-5 w-5" />}
      >
      <div className="space-y-4">
        {/* Status Turn */}
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 text-xs text-white/70">
          <span className="font-medium text-[0.7rem]">Pemain {currentIndex + 1} dari {players.length}</span>
          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-2.5 py-0.5 text-[0.7rem] font-bold text-lime-300">
            {currentPlayer.name}
          </span>
        </div>

        {/* Card Rahasia */}
        <div className="screen-panel green-glow flex min-h-[14rem] flex-col items-center justify-center p-5 text-center transition-all">
          {!isHolding ? (
            <div className="flex flex-col items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/5 text-lime-300">
                <Lock className="h-6 w-6" />
              </div>
              <div className="text-xl font-black tracking-wider text-lime-300">{currentPlayer.name}</div>
              <p className="max-w-xs text-xs text-white/60">
                Tekan dan tahan tombol di bawah untuk melihat pertanyaan rahasiamu.
              </p>
            </div>
          ) : (
            <div className="w-full rounded-2xl border border-lime-400/30 bg-black/40 p-4 text-left animate-in fade-in duration-200">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-lime-400">
                Pertanyaan {currentPlayer.name}:
              </span>
              <p className="mt-2 text-lg font-black text-white leading-snug">{currentPlayer.word}</p>
            </div>
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="space-y-2">
          <button
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            className="ui-pill-button ui-pill-button--primary w-full py-3 text-xs font-black uppercase tracking-wider select-none cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>Tahan Untuk Melihat</span>
          </button>

          <button
            onClick={handleNext}
            className="ui-square-button w-full py-2.5 text-[0.7rem] font-bold uppercase tracking-wider cursor-pointer"
          >
            <span>{isLastPlayer ? "Selesai & Mulai Diskusi" : "Lanjut ke Pemain Berikutnya"}</span>
            <CircleChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
}