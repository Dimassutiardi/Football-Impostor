import React, { useState } from "react";
import { Users, UserX, CheckCircle2, MessageSquare, HelpCircle } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function PlayScreen({ 
  players = [], 
  impostorCount = 1, 
  secretWord = "",
  onFinishPlay,
  activeTab = "home",   
  onTabChange           
}) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const toggleSelectPlayer = (player) => {
    const isAlreadySelected = selectedPlayers.some((p) => (p.id || p.name) === (player.id || player.name));

    if (isAlreadySelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => (p.id || p.name) !== (player.id || player.name)));
    } else {
      if (selectedPlayers.length < impostorCount) {
        setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  };

  const handleSubmitVote = () => {
    if (selectedPlayers.length === impostorCount && onFinishPlay) {
      onFinishPlay(selectedPlayers);
    }
  };

  return (
    <ScreenFrame
      stepLabel="Debat & Vote"
      title="DEBAT & VOTING"
      subtitle={`Pilih ${impostorCount} orang yang kamu curigai!`}
      activeTab={activeTab}      
      onTabChange={onTabChange}  
    >
      <div className="space-y-3.5">
        
        {/* 💡 Banner Pertanyaan Impostor */}
        {secretWord && (
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-3 text-left text-xs text-sky-200 flex items-start gap-2.5 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <HelpCircle className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" />
            <div className="space-y-0.5 text-[0.7rem]">
              <span className="font-bold text-sky-300 block uppercase tracking-wider text-[0.65rem]">
                Pertanyaannya:
              </span>
              <p className="text-white font-medium italic leading-relaxed">
                "{secretWord}"
              </p>
            </div>
          </div>
        )}

        {/* Banner Aturan Voting */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-left text-xs text-amber-200 flex items-start gap-2.5">
          <MessageSquare className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-0.5 text-[0.7rem]">
            <span className="font-bold text-amber-300 block">Aturan Voting:</span>
            <p className="text-white/70 leading-relaxed">
              Ada <span className="text-amber-300 font-bold">{impostorCount} Impostor</span> dalam game ini. Tanyakan clue tanpa membocorkan kata, lalu pilih {impostorCount} terduga!
            </p>
          </div>
        </div>

        {/* Voting Grid */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-white">
              Terpilih: {selectedPlayers.length} / {impostorCount}
            </span>
            <Users className="h-4 w-4 text-lime-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {players.map((player, index) => {
              const isSelected = selectedPlayers.some(
                (p) => (p.id || p.name) === (player.id || player.name)
              );

              return (
                <button
                  key={player.id || `player-${index}`}
                  type="button"
                  onClick={() => toggleSelectPlayer(player)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition cursor-pointer ${
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
          disabled={selectedPlayers.length !== impostorCount}
          onClick={handleSubmitVote}
          className={`w-full py-3 rounded-full text-xs font-black uppercase tracking-widest transition ${
            selectedPlayers.length === impostorCount
              ? "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {selectedPlayers.length === impostorCount
            ? `Tuduh ${selectedPlayers.map((p) => p.name).join(", ")} & Buka Hasil`
            : `Pilih ${impostorCount - selectedPlayers.length} Nama Lagi...`}
        </button>
      </div>
    </ScreenFrame>
  );
}