// Fungsi Helper: Algoritma Fisher-Yates untuk acak array secara merata
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateGameRoles(playerNames, categoryWords, mrWhiteCount = 1) {
  // 1. Pilih pasangan kata acak dari kategori (True Word vs White Word)
  const randomWordIndex = Math.floor(Math.random() * categoryWords.length);
  const selectedObj = categoryWords[randomWordIndex];

  const totalPlayers = playerNames.length;

  // 2. Buat array penanda role: misal [true, true, true, false] (false = Mr. White)
  // Kita isi array dengan TRUE_FAN terlebih dahulu
  let roleTypes = Array(totalPlayers).fill("TRUE_FAN");

  // 3. Tentukan posisi Mr. White secara acak di array roleTypes
  let assignedWhite = 0;
  while (assignedWhite < mrWhiteCount) {
    const randomIdx = Math.floor(Math.random() * totalPlayers);
    if (roleTypes[randomIdx] !== "MR_WHITE") {
      roleTypes[randomIdx] = "MR_WHITE";
      assignedWhite++;
    }
  }

  // 4. Acak urutan roleTypes supaya posisinya tidak tertebak sama sekali
  roleTypes = shuffleArray(roleTypes);

  // 5. Acak juga urutan nama pemain supaya urutan giliran Pass-the-Phone dinamis
  const shuffledNames = shuffleArray(playerNames);

  // 6. Gabungkan nama pemain dengan role & kata yang sesuai
  const playersWithRoles = shuffledNames.map((name, index) => {
    const isWhite = roleTypes[index] === "MR_WHITE";
    return {
      name: name,
      role: isWhite ? "MR_WHITE" : "TRUE_FAN",
      word: isWhite ? selectedObj.whiteWord : selectedObj.trueWord,
      hint: selectedObj.hint,
    };
  });

  return {
    players: playersWithRoles,
    secretWord: selectedObj.trueWord,
    whiteWord: selectedObj.whiteWord,
  };
}