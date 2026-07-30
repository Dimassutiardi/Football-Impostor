import React, { useState } from "react";
import { Users, UserX, Shield, Trophy, User, BookOpen, PlayCircle, HelpCircle, Star } from "lucide-react";
import ScreenFrame from "./ScreenFrame";

export default function SetupScreen({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(6);
  const [mrWhiteCount, setMrWhiteCount] = useState(1);
  const [category, setCategory] = useState("clubs");

  const categories = [
    { id: "clubs", label: "Klub Dunia", icon: <Shield className="w-6 h-6 mb-1" /> },
    { id: "stadiums_and_trophies", label: "Liga & Trofi", icon: <Trophy className="w-6 h-6 mb-1" /> },
    { id: "players_active", label: "Pemain Aktif", icon: <User className="w-6 h-6 mb-1" /> },
    { id: "legends", label: "Legendaris", icon: <BookOpen className="w-6 h-6 mb-1" /> },
  ];

  const handleStart = (e) => {
    e.preventDefault();
    const defaultNames = Array.from({ length: playerCount }, (_, i) => `Pemain ${i + 1}`);
    onStartGame(defaultNames, category, mrWhiteCount);
  };

  return (
    <ScreenFrame
      step={1}
      stepLabel="Setup Screen"
      title="SETUP GAME"
      subtitle="Atur permainanmu sebelum mulai"
      activeTab="home"
      showHelp
      rightIcon={<HelpCircle className="h-5 w-5" />}
    >
      <form onSubmit={handleStart} className="space-y-3.5">
        <div className="rounded-[1.45rem] border border-white/8 bg-black/22 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-4">
          <div className="mb-3 flex items-center justify-between text-left">
            <div>
              <div className="text-[0.92rem] font-semibold text-white">Jumlah Pemain</div>
              <p className="text-[0.67rem] text-white/45">Total pemain termasuk Mr. White</p>
            </div>
            <Users className="h-4.5 w-4.5 text-lime-300/80" />
          </div>
          <div className="flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-white/3 px-3 py-2.5">
            <button
              type="button"
              onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xl font-light text-white transition hover:bg-white/10"
                className="ui-toggle-button text-xl font-light"
            >
              −
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/8 text-[0.72rem] text-white/75">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                ))}
              </div>
              <span className="text-[1.7rem] font-black leading-none text-white">{playerCount}</span>
            </div>
            <button
              type="button"
              onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xl font-light text-white transition hover:bg-white/10"
                className="ui-toggle-button text-xl font-light"
            >
              +
            </button>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-white/8 bg-black/22 p-3.5 sm:p-4">
          <div className="mb-3 flex items-center justify-between text-left">
            <div>
              <div className="text-[0.92rem] font-semibold text-white">Jumlah Mr. White</div>
              <p className="text-[0.67rem] text-white/45">Pilih berapa Mr. White di game ini</p>
            </div>
            <UserX className="h-4.5 w-4.5 text-lime-300/80" />
          </div>
          <div className="flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-white/3 px-3 py-2.5">
            <button
              type="button"
              onClick={() => setMrWhiteCount(Math.max(1, mrWhiteCount - 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xl font-light text-white transition hover:bg-white/10"
                className="ui-toggle-button text-xl font-light"
            >
              −
            </button>
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-lime-400/12 text-lime-300">
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <span className="text-[1.7rem] font-black leading-none text-white">{mrWhiteCount}</span>
            </div>
            <button
              type="button"
              onClick={() => setMrWhiteCount(Math.min(playerCount >= 6 ? 2 : 1, mrWhiteCount + 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xl font-light text-white transition hover:bg-white/10"
                className="ui-toggle-button text-xl font-light"
            >
              +
            </button>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-white/8 bg-black/22 p-3.5 sm:p-4">
          <div className="mb-3 text-left">
            <div className="text-[0.92rem] font-semibold text-white">Kategori</div>
            <p className="text-[0.67rem] text-white/45">Pilih kategori pengetahuan sepak bola</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const active = category === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`ui-card-button text-center text-[0.62rem] font-semibold ${active ? "is-active" : ""}`}
                >
                  <div className="ui-card-button-icon">
                    {cat.icon}
                  </div>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="ui-pill-button ui-pill-button--primary w-full px-5 py-3.5 text-[0.78rem] font-black uppercase tracking-[0.22em]"
        >
          <PlayCircle className="h-4.5 w-4.5" />
          <span className="ui-button-label">Mulai Game</span>
        </button>
      </form>
    </ScreenFrame>
  );
}