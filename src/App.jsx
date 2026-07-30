import React, { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import PlayScreen from "./components/PlayScreen";
import ResultScreen from "./components/ResultScreen";

import footballWords from "./data/footballWords.json";
import { generateGameRoles } from "./utils/gameLogic";

export default function App() {
  const [gameState, setGameState] = useState("SETUP");
  
  // Simpan nama pemain di level App agar tidak ter-reset
  const [playerNames, setPlayerNames] = useState(["Pemain 1", "Pemain 2", "Pemain 3", "Pemain 4"]);
  const [players, setPlayers] = useState([]);
  const [secretWord, setSecretWord] = useState("");
  const [impostorQuestion, setImpostorQuestion] = useState("");
  const [guessedPlayer, setGuessedPlayer] = useState(null);

  const handleStartGame = (sanitizedNames, category, impostorCount) => {
    // Simpan nama pemain terbaru yang sudah diedit
    setPlayerNames(sanitizedNames);

    const categoryWords = footballWords[category] || footballWords["clubs"];
    const {
      players: generatedPlayers,
      secretWord: word,
      impostorQuestion: iQuestion,
    } = generateGameRoles(sanitizedNames, categoryWords, impostorCount);

    setPlayers(generatedPlayers);
    setSecretWord(word);
    setImpostorQuestion(iQuestion);
    setGuessedPlayer(null);
    setGameState("REVEAL");
  };

  const handleFinishPlay = (votedPlayer) => {
    setGuessedPlayer(votedPlayer);

    if (votedPlayer) {
      const historyLog = JSON.parse(localStorage.getItem("game_history") || "[]");
      const newEntry = {
        date: new Date().toISOString(),
        votedPlayerName: votedPlayer.name,
        isCorrect: votedPlayer.isImpostor,
      };
      localStorage.setItem("game_history", JSON.stringify([newEntry, ...historyLog]));
    }

    setGameState("RESULT");
  };

  return (
    <div className="app-shell flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="phone-shell w-full max-w-xl lg:max-w-2xl transition-all duration-300">
        <div className="phone-shell__frame p-4 sm:p-6 md:p-8">
          <div className="phone-shell__content">
            {gameState === "SETUP" && (
              <SetupScreen 
                initialPlayerNames={playerNames} 
                onStartGame={handleStartGame} 
              />
            )}

            {gameState === "REVEAL" && (
              <RevealScreen
                players={players}
                onFinishReveal={() => setGameState("PLAY")}
              />
            )}

            {gameState === "PLAY" && (
              <PlayScreen
                players={players}
                onFinishPlay={handleFinishPlay}
              />
            )}

            {gameState === "RESULT" && (
              <ResultScreen
                players={players}
                secretWord={secretWord}
                impostorQuestion={impostorQuestion}
                guessedPlayer={guessedPlayer}
                onRestart={() => setGameState("SETUP")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}