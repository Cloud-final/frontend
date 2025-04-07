import { create } from "zustand";

interface TypingGameState {
  // Game state
  status: "ready" | "playing" | "finished";
  words: string[];
  currentWordIndex: number;
  userInput: string;
  correctWords: number;
  typedWords: string[];

  // Audio
  audio: HTMLAudioElement | null;
  initAudio: (src: string, loop?: boolean) => void;
  setAudioSource: (src: string) => void;
  playAudio: () => void;
  stopAudio: () => void;

  // Actions
  handleInput: (input: string) => void;
  initTest: (wordList: string[]) => void;
  resetTest: () => void;
  startTest: () => void;
  finishTest: () => void;
}

export const useTypingGameStore = create<TypingGameState>((set, get) => ({
  // Game state
  status: "ready",
  words: [],
  currentWordIndex: 0,
  userInput: "",
  correctWords: 0,
  typedWords: [],

  // Audio
  audio: null,

  initAudio: (src, loop = false) => {
    const audio = new Audio(src);
    audio.loop = loop;
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

      const currentWord = state.words[state.currentWordIndex];

      if (input.endsWith(" ")) {
        return {
          currentWordIndex: state.currentWordIndex + 1,
          userInput: "",
          typedWords: [...state.typedWords, input.trim()],
          correctWords:
            input.trim() === currentWord
              ? state.correctWords + 1
              : state.correctWords,
        };
      }

      return { userInput: input };
    }),

  initTest: (wordList) =>
    set({
      status: "ready",
      words: wordList,
      currentWordIndex: 0,
      userInput: "",
      correctWords: 0,
      typedWords: [],
    }),

  resetTest: () => {
    get().stopAudio();
    set({
      status: "ready",
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
