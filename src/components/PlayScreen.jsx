import React, { useState } from "react";
import { Users, UserX, CheckCircle2, MessageSquare } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function PlayScreen({ players, onFinishPlay }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSubmitVote = () => {
    if (selectedPlayer) {
      onFinishPlay(selectedPlayer);
    }
  };

  return (
    <ScreenFrame
      stepLabel="Debat & Vote"
      title="DEBAT & VOTING"
      subtitle="Jawab pertanyaan, Diskusikan lalu sepakati tebakan!"
      activeTab="home"
    >
      <div className="space-y-3.5">
        {/* Banner Instruksi */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-left text-xs text-amber-200 flex items-start gap-2.5">
          <MessageSquare className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-0.5 text-[0.7rem]">
            <span className="font-bold text-amber-300 block">Aturan Diskusi:</span>
            <p className="text-white/70 leading-relaxed">
              Tanyakan clue tanpa membocorkan kata. Setelah diskusi, pilih nama pemain yang paling dicurigai di bawah ini.
            </p>
          </div>
        </div>

        {/* Voting Grid */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-white">Pilih Terduga Impostor</span>
            <Users className="h-4 w-4 text-lime-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {players.map((player) => {
              const isSelected = selectedPlayer?.id === player.id;

              return (
                <button
                  key={player.id}
                  type="button"
                  onClick={() => setSelectedPlayer(player)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    isSelected
                      ? "border-rose-500 bg-rose-500/20 text-white shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <UserX className={`h-4 w-4 shrink-0 ${isSelected ? "text-rose-400" : "text-white/40"}`} />
                    <span className="text-xs font-bold truncate">{player.name}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-rose-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tombol Eksekusi */}
        <button
          type="button"
          disabled={!selectedPlayer}
          onClick={handleSubmitVote}
          className={`w-full py-3 rounded-full text-xs font-black uppercase tracking-widest transition ${
            selectedPlayer
              ? "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {selectedPlayer ? `Tuduh ${selectedPlayer.name} & Buka Hasil` : "Pilih 1 Nama Dulu..."}
        </button>
      </div>
    </ScreenFrame>
  );
}