function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateGameRoles(playerNames, categoryWords, impostorCount = 1) {
  const randomWordIndex = Math.floor(Math.random() * categoryWords.length);
  const selectedObj = categoryWords[randomWordIndex];

  const totalPlayers = playerNames.length;
  let roleTypes = Array(totalPlayers).fill("REAL_PLAYER");

  let assignedImpostor = 0;
  while (assignedImpostor < impostorCount) {
    const randomIdx = Math.floor(Math.random() * totalPlayers);
    if (roleTypes[randomIdx] !== "IMPOSTOR") {
      roleTypes[randomIdx] = "IMPOSTOR";
      assignedImpostor++;
    }
  }

  roleTypes = shuffleArray(roleTypes);
  const shuffledNames = shuffleArray(playerNames);

  const playersWithRoles = shuffledNames.map((name, index) => {
    const isImpostor = roleTypes[index] === "IMPOSTOR";
    return {
      id: `player-${index}-${Date.now()}`, // 💡 Tambahkan ID unik agar key rendering aman
      name: name,
      isImpostor: isImpostor, // 💡 TAMBAHKAN INI agar ResultScreen & App bisa mendeteksi impostor
      role: isImpostor ? "IMPOSTOR" : "REAL_PLAYER",
      word: isImpostor ? selectedObj.impostor : selectedObj.trueWord,
      hint: selectedObj.hint,
    };
  });

  return {
    players: playersWithRoles,
    secretWord: selectedObj.trueWord,
    impostorQuestion: selectedObj.impostor,
  };
}