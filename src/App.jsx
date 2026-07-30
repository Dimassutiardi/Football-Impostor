import React, { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import PlayScreen from "./components/PlayScreen";
import ResultScreen from "./components/ResultScreen";

import footballWords from "./data/footballWords.json";
import { generateGameRoles } from "./utils/gameLogic";

export default function App() {
  const [gameState, setGameState] = useState("SETUP");
  const [players, setPlayers] = useState([]);
  const [secretWord, setSecretWord] = useState("");
  const [whiteWord, setWhiteWord] = useState("");

  const handleStartGame = (playerNames, category, mrWhiteCount) => {
    const categoryWords = footballWords[category] || footballWords["clubs"];
    const {
      players: generatedPlayers,
      secretWord: word,
      whiteWord: wWord,
    } = generateGameRoles(playerNames, categoryWords, mrWhiteCount);

    setPlayers(generatedPlayers);
    setSecretWord(word);
    setWhiteWord(wWord);
    setGameState("REVEAL");
  };

  return (
    <div className="app-shell">
      <div className="phone-shell">
        <div className="phone-shell__frame">
          <div className="phone-shell__content flex min-h-screen items-start justify-center px-3 py-4 sm:px-4 sm:py-6">
            {gameState === "SETUP" && <SetupScreen onStartGame={handleStartGame} />}

            {gameState === "REVEAL" && (
              <RevealScreen players={players} onFinishReveal={() => setGameState("PLAY")} />
            )}

            {gameState === "PLAY" && (
              <PlayScreen players={players} onGoToResult={() => setGameState("RESULT")} />
            )}

            {gameState === "RESULT" && (
              <ResultScreen
                players={players}
                secretWord={secretWord}
                whiteWord={whiteWord}
                onRestart={() => setGameState("SETUP")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}