export type Difficulty = "Human" | "Superman" | "God";

// Central configuration object
export const DIFFICULTY_CONFIG = {
  Human: {
    label: "Human",
    color: "bg-green-500",
    description: "For mere mortals",
    default: false,
  },
  Superman: {
    label: "Superman",
    color: "bg-blue-500",
    description: "Heroic challenge",
    default: true, // This is our default difficulty
  },
  God: {
    label: "God",
    color: "bg-purple-500",
    description: "Divine punishment",
    default: false,
  },
} as const;

// Helper types derived from the config
export type DifficultyLevel = keyof typeof DIFFICULTY_CONFIG;
export const DIFFICULTY_LEVELS = Object.keys(
  DIFFICULTY_CONFIG
) as DifficultyLevel[];
export const DEFAULT_DIFFICULTY = Object.values(DIFFICULTY_CONFIG).find(
  (level) => level.default
)?.label as DifficultyLevel;
