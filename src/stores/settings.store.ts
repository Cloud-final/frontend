import { create } from "zustand";
import { DifficultyLevel, DEFAULT_DIFFICULTY } from "../config/difficulty";

interface SettingsState {
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  difficulty: DEFAULT_DIFFICULTY,
  setDifficulty: (level) => set({ difficulty: level }),
}));
