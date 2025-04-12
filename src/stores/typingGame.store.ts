import { create } from "zustand";

interface TypingGameState {
  // Game state
  status: "ready" | "playing" | "finished";
  words: string[][];
  currentLineIndex: number;
  currentWordIndex: number;
  userInput: string;
  correctWords: number;
  typedWords: string[][];

  // Audio
  audio: HTMLAudioElement | null;
  duration: number;
  currentTime: number;
  initAudio: (src: string, loop?: boolean) => void;
  setAudioSource: (src: string) => void;
  playAudio: () => void;
  stopAudio: () => void;

  // Actions
  handleInput: (input: string) => void;
  initTest: (wordLines: string[][]) => void;
  resetTest: () => void;
  startTest: () => void;
  finishTest: () => void;
}

export const useTypingGameStore = create<TypingGameState>((set, get) => ({
  // Game state
  status: "ready",
  words: [],
  currentLineIndex: 0,
  currentWordIndex: 0,
  userInput: "",
  correctWords: 0,
  typedWords: [],

  // Audio
  audio: null,
  duration: 0,
  currentTime: 0,

  initAudio: (src, loop = false) => {
    const audio = new Audio(src);
    audio.loop = loop;

    audio.onloadedmetadata = () => {
      set({ duration: audio.duration });
    };

    audio.ontimeupdate = () => {
      set({ currentTime: audio.currentTime });
    };

    audio.onended = () => {
      get().finishTest();
    };
    set({ audio });
  },

  setAudioSource: (src) => {
    const audio = get().audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = src;
      audio.load();
    }
  },

  playAudio: () => {
    get().audio?.play();
  },

  stopAudio: () => {
    const audio = get().audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  },

  // Game logic
  handleInput: (input) =>
    set((state) => {
      if (state.status !== "playing") return {};

      const { currentLineIndex, currentWordIndex, words, typedWords } = state;

      const currentLine = words[currentLineIndex] || [];
      const currentWord = currentLine[currentWordIndex] || "";

      if (input.endsWith(" ")) {
        const trimmedInput = input.trim();
        const isCorrect = trimmedInput === currentWord;

        let nextLineIndex = currentLineIndex;
        let nextWordIndex = currentWordIndex + 1;
        const newTypedWords = [...typedWords];

        if (newTypedWords.length < currentLineIndex + 1) {
          newTypedWords.push([]);
        }
        newTypedWords[currentLineIndex].push(trimmedInput);

        if (nextWordIndex >= currentLine.length) {
          nextLineIndex += 1;
          nextWordIndex = 0;
        }

        return {
          userInput: "",
          currentWordIndex: nextWordIndex,
          currentLineIndex: nextLineIndex,
          typedWords: newTypedWords,
          correctWords: isCorrect ? state.correctWords + 1 : state.correctWords,
        };
      }

      return { userInput: input };
    }),

  initTest: (wordList) =>
    set({
      words: wordList,
    }),

  resetTest: () => {
    get().stopAudio();
    set({
      status: "ready",
      currentLineIndex: 0,
      currentWordIndex: 0,
      userInput: "",
      correctWords: 0,
      typedWords: [],
    });
  },

  startTest: () => {
    get().playAudio();
    set({
      status: "playing",
    });
  },

  finishTest: () => {
    get().stopAudio();
    set({
      status: "finished",
    });
  },
}));
