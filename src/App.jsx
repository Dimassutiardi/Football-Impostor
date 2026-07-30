import React, { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import PlayScreen from "./components/PlayScreen";
import ResultScreen from "./components/ResultScreen";
import { X, Clock, Trophy, Settings as SettingsIcon } from "lucide-react";

import footballWords from "./data/footballWords.json";
import { generateGameRoles } from "./utils/gameLogic";

export default function App() {
  const [gameState, setGameState] = useState("SETUP");
  const [activeTab, setActiveTab] = useState("home"); // 💡 State untuk navbar bawah

  const [playerNames, setPlayerNames] = useState(["Pemain 1", "Pemain 2", "Pemain 3", "Pemain 4"]);
  const [impostorCount, setImpostorCount] = useState(1);
  const [players, setPlayers] = useState([]);
  const [secretWord, setSecretWord] = useState("");
  const [impostorQuestion, setImpostorQuestion] = useState("");
  const [guessedPlayers, setGuessedPlayers] = useState([]);

  // Fungsi untuk menghitung statistik pemain berdasarkan historyLog
  const getLeaderboardData = (history) => {
    const stats = {};

    history.forEach((game) => {
      // Jika data game lama belum punya 'allPlayers', skip atau sesuaikan
      if (!game.allPlayers) return;

      game.allPlayers.forEach((player) => {
        const { name, isImpostor } = player;
        if (!name) return;

        if (!stats[name]) {
          stats[name] = { name, win: 0, loss: 0, total: 0 };
        }

        stats[name].total += 1;

        // 💡 LOGIKA PERBAIKAN:
        if (game.isCorrect) {
          // Tebakan BENAR (Impostor Ketahuan)
          if (isImpostor) {
            stats[name].loss += 1; // Impostor Ketahuan = KALAH
          } else {
            stats[name].win += 1;  // Real Player = MENANG
          }
        } else {
          // Tebakan SALAH (Impostor Mengecoh / Lolos)
          if (isImpostor) {
            stats[name].win += 1;   // Impostor Lolos = MENANG
          } else {
            stats[name].loss += 1;  // Real Player = KALAH
          }
        }
      });
    });

    // Urutkan dari jumlah Kemenangan Terbanyak
    return Object.values(stats).sort((a, b) => b.win - a.win || a.loss - b.loss);
  };

  // Ambil history dari LocalStorage
  const historyLog = JSON.parse(localStorage.getItem("game_history") || "[]");

  const handleStartGame = (sanitizedNames, category, selectedImpostorCount) => {
    setPlayerNames(sanitizedNames);
    setImpostorCount(selectedImpostorCount);

    const categoryWords = footballWords[category] || footballWords["clubs"];
    const {
      players: generatedPlayers,
      secretWord: word,
      impostorQuestion: iQuestion,
    } = generateGameRoles(sanitizedNames, categoryWords, selectedImpostorCount);

    setPlayers(generatedPlayers);
    setSecretWord(word);
    setImpostorQuestion(iQuestion);
    setGuessedPlayers([]);
    setGameState("REVEAL");
  };

  const handleFinishPlay = (votedPlayersArray) => {
    setGuessedPlayers(votedPlayersArray);

    if (votedPlayersArray && votedPlayersArray.length > 0) {
      const actualImpostors = players.filter((p) => p.isImpostor);
      
      // Tebakan dianggap BENAR jika jumlah & orang yang ditebak persis sama dengan Impostor
      const isCorrect =
        votedPlayersArray.length === actualImpostors.length &&
        votedPlayersArray.every((p) => p.isImpostor);

      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        // 💡 Simpan daftar seluruh pemain beserta perannya di sesi ini
        allPlayers: players.map((p) => ({
          name: p.name,
          isImpostor: p.isImpostor,
        })),
        votedPlayerNames: votedPlayersArray.map((p) => p.name).join(", "),
        isCorrect: isCorrect, // true = Impostor Ketahuan, false = Impostor Lolos
      };
      localStorage.setItem("game_history", JSON.stringify([newEntry, ...historyLog]));
    }
    setGameState("RESULT");
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="app-shell flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 relative">
      <div className="phone-shell w-full max-w-xl lg:max-w-2xl transition-all duration-300">
        <div className="phone-shell__frame p-4 sm:p-6 md:p-8">
          <div className="phone-shell__content">
            {gameState === "SETUP" && (
              <SetupScreen
                initialPlayerNames={playerNames}
                onStartGame={handleStartGame}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            )}

            {gameState === "REVEAL" && (
              <RevealScreen
                players={players}
                onFinishReveal={() => setGameState("PLAY")}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            )}

            {gameState === "PLAY" && (
              <PlayScreen
                players={players}
                impostorCount={impostorCount}
                onFinishPlay={handleFinishPlay}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            )}

            {gameState === "RESULT" && (
              <ResultScreen
                players={players}
                secretWord={secretWord}
                impostorQuestion={impostorQuestion}
                guessedPlayers={guessedPlayers}
                onRestart={() => setGameState("SETUP")}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* 💡 MODAL OVERLAY NAVBAR BAWAH */}
      {activeTab !== "home" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-5 text-white shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                {activeTab === "history" && <Clock className="h-5 w-5 text-lime-400" />}
                {activeTab === "leaderboard" && <Trophy className="h-5 w-5 text-amber-400" />}
                {activeTab === "settings" && <SettingsIcon className="h-5 w-5 text-sky-400" />}
                <h3 className="text-sm font-black uppercase tracking-wider">
                  {activeTab === "history" && "Riwayat Permainan"}
                  {activeTab === "leaderboard" && "Leaderboard"}
                  {activeTab === "settings" && "Pengaturan"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("home")}
                className="rounded-full p-1 hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {activeTab === "history" && (
                historyLog.length > 0 ? (
                  historyLog.map((item, idx) => (
                    <div key={item.id || idx} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 text-xs">
                      <div>
                        <span className="font-bold text-white block">{item.votedPlayerNames}</span>
                        <span className="text-[0.65rem] text-white/50">{item.date}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[0.65rem] ${
                        item.isCorrect ? "bg-lime-500/20 text-lime-300 border border-lime-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}>
                        {item.isCorrect ? "IMPOSTOR KALAH" : "IMPOSTOR MENANG"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-white/50 py-6">Belum ada riwayat permainan.</p>
                )
              )}

              {activeTab === "leaderboard" && (
                <div className="space-y-2">
                  {getLeaderboardData(historyLog).length > 0 ? (
                    getLeaderboardData(historyLog).map((player, index) => (
                      <div
                        key={player.name}
                        className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black w-5 h-5 flex items-center justify-center rounded-full text-[0.65rem] ${
                              index === 0
                                ? "bg-amber-400 text-black"
                                : index === 1
                                ? "bg-slate-300 text-black"
                                : index === 2
                                ? "bg-amber-700 text-white"
                                : "bg-white/10 text-white/60"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="font-bold text-white">{player.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[0.7rem]">
                          <span className="text-lime-400 font-bold">{player.win} Menang</span>
                          <span className="text-rose-400">{player.loss} Kalah</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs text-white/50 py-6">
                      Belum ada data permainan untuk Leaderboard.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-3 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("game_history");
                      setActiveTab("home");
                    }}
                    className="w-full py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 font-bold transition cursor-pointer"
                  >
                    Hapus Riwayat Permainan
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="w-full py-2.5 rounded-full border border-white/10 bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}