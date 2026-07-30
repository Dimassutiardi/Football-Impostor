import React, { useState } from "react";
import { Users, UserX, Shield, Trophy, User, BookOpen, PlayCircle, HelpCircle, AlertTriangle, UserCheck } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function SetupScreen({ 
  initialPlayerNames = ["Pemain 1", "Pemain 2", "Pemain 3", "Pemain 4"], 
  onStartGame,
  activeTab = "home",   // 💡 Tambahkan ini
  onTabChange           // 💡 Tambahkan ini
}) {
  const [playerNames, setPlayerNames] = useState(initialPlayerNames);
  const [playerCount, setPlayerCount] = useState(initialPlayerNames.length);
  const [impostorCount, setImpostorCount] = useState(1);
  const [category, setCategory] = useState("clubs");

  const categories = [
    { id: "clubs", label: "Klub Dunia", icon: Shield },
    { id: "stadiums_and_trophies", label: "Liga & Trofi", icon: Trophy },
    { id: "players_active", label: "Pemain Aktif", icon: User },
    { id: "legends", label: "Legendaris", icon: BookOpen },
  ];

  const handlePlayerCountChange = (newCount) => {
    if (newCount < 3 || newCount > 10) return;
    setPlayerCount(newCount);

    setPlayerNames((prev) => {
      if (newCount > prev.length) {
        const added = Array.from({ length: newCount - prev.length }, (_, i) => `Pemain ${prev.length + i + 1}`);
        return [...prev, ...added];
      } else {
        return prev.slice(0, newCount);
      }
    });

    if (newCount < 6 && impostorCount > 1) {
      setImpostorCount(1);
    }
  };

  const handleNameChange = (index, value) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  const handleStart = (e) => {
    e.preventDefault();
    const sanitizedNames = playerNames.map((name, i) => name.trim() || `Pemain ${i + 1}`);
    onStartGame(sanitizedNames, category, impostorCount);
  };

  return (
      <ScreenFrame
        stepLabel="Setup Game"
        title="SETUP GAME"
        subtitle="Atur pemain & topik sebelum mulai"
        activeTab={activeTab}
        onTabChange={onTabChange}
        rightIcon={<HelpCircle className="h-5 w-5" />}
      >
      <form onSubmit={handleStart} className="space-y-3.5">
        
        {/* Kategori Topik */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <div className="mb-2 text-left">
            <div className="text-xs font-bold text-white">Topik Pertanyaan</div>
            <p className="text-[0.65rem] text-white/50">Pilih salah satu kategori</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = category === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center transition-all border ${
                    active
                      ? "border-lime-400 bg-lime-400/15 text-lime-300 shadow-[0_0_12px_rgba(163,230,53,0.2)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[0.68rem] font-bold leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jumlah Pemain & Impostor Side-by-Side */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-white">Jumlah Pemain</span>
              <Users className="h-3.5 w-3.5 text-lime-400" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-2 py-1">
              <button
                type="button"
                onClick={() => handlePlayerCountChange(playerCount - 1)}
                className="h-7 w-7 font-bold flex items-center justify-center rounded-lg bg-white/10 active:scale-95 text-white"
              >
                −
              </button>
              <span className="text-base font-black text-white">{playerCount}</span>
              <button
                type="button"
                onClick={() => handlePlayerCountChange(playerCount + 1)}
                className="h-7 w-7 font-bold flex items-center justify-center rounded-lg bg-white/10 active:scale-95 text-white"
              >
                +
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-white">Impostor</span>
              <UserX className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-2 py-1">
              <button
                type="button"
                onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))}
                className="h-7 w-7 font-bold flex items-center justify-center rounded-lg bg-white/10 active:scale-95 text-white"
              >
                −
              </button>
              <span className="text-base font-black text-white">{impostorCount}</span>
              <button
                type="button"
                onClick={() => setImpostorCount(Math.min(playerCount >= 6 ? 2 : 1, impostorCount + 1))}
                className="h-7 w-7 font-bold flex items-center justify-center rounded-lg bg-white/10 active:scale-95 text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Input Nama Pemain */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-white">Nama Pemain</span>
            <UserCheck className="h-3.5 w-3.5 text-lime-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {playerNames.map((name, index) => (
              <div key={index} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 focus-within:border-lime-400/50">
                <span className="text-[0.65rem] font-bold text-lime-400 shrink-0">#{index + 1}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Pemain ${index + 1}`}
                  className="w-full bg-transparent text-xs text-white placeholder:text-white/30 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Mulai */}
        <button
          type="submit"
          className="w-full px-5 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlayCircle className="h-4 w-4" />
          <span>Mulai Game</span>
        </button>
      </form>
    </ScreenFrame>
  );
}