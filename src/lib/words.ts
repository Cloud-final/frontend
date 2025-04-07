// Word lists by difficulty
const HUMAN_WORDS = [
  "the",
  "and",
  "have",
  "that",
  "for",
  "with",
  "this",
  "from",
];
const SUPERMAN_WORDS = [
  "computer",
  "keyboard",
  "developer",
  "algorithm",
  "function",
  "variable",
];
const GOD_WORDS = [
  "asynchronous",
  "quintessential",
  "extravaganza",
  "phenomenon",
  "idiosyncrasy",
];

export const generateWordList = (
  difficulty: "Human" | "Superman" | "God"
): string[] => {
  let wordPool: string[];

  switch (difficulty) {
    case "Human":
      wordPool = HUMAN_WORDS;
      break;
    case "Superman":
      wordPool = SUPERMAN_WORDS;
      break;
    case "God":
      wordPool = GOD_WORDS;
      break;
  }

  const result: string[] = [];
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    result.push(wordPool[randomIndex]);
  }
  return result;
};
