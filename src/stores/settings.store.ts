import { create } from "zustand";
import { DifficultyLevel, DEFAULT_DIFFICULTY } from "../config/difficulty";

interface SettingsState {
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;

  // meta data
  songName: string;
  setSongName: (name: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  difficulty: DEFAULT_DIFFICULTY,
  setDifficulty: (level) => set({ difficulty: level }),

  // meta data
  songName: "",
  setSongName: (name) => set({ songName: name }),
}));
