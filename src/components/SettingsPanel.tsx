"use client";
import { useEffect } from "react";
import { DIFFICULTY_CONFIG, DIFFICULTY_LEVELS } from "@/config/difficulty";
import { useSettingsStore } from "@/stores/settings.store";
import { useTypingGameStore } from "@/stores/typingGame.store";

export const SettingsPanel = () => {
  const { difficulty, setDifficulty } = useSettingsStore();
  const { audio, initAudio, setAudioSource, stopAudio } = useTypingGameStore();
  useEffect(() => {
    if (!audio) {
      initAudio("/god-sound.weba", false);
    }
  }, []);

  useEffect(() => {
    setAudioSource("/god-sound.weba");
    stopAudio();
  }, [difficulty]);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-400 text-center">
        Who are you?
      </h2>
      <div className="flex gap-3 justify-center">
        {DIFFICULTY_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`
              px-6 py-3 rounded-lg font-bold text-white transition-all cursor-pointer
              ${DIFFICULTY_CONFIG[level].color}
              ${
                difficulty === level
                  ? "ring-4 ring-yellow-400 scale-105"
                  : "opacity-80 hover:opacity-100 hover:scale-100"
              }
              flex flex-col items-center
            `}
          >
            {DIFFICULTY_CONFIG[level].label}
            <span className="text-xs font-normal mt-1">
              {DIFFICULTY_CONFIG[level].description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
