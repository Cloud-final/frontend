"use client";
import { DIFFICULTY_CONFIG, DIFFICULTY_LEVELS } from "@/config/difficulty";
import { useSettingsStore } from "@/stores/settings.store";

type Props = {
  onSelect: (level: keyof typeof DIFFICULTY_CONFIG) => void;
};

export const SettingsPanel = ({ onSelect }: Props) => {
  const { difficulty } = useSettingsStore();

  return (
      <div className="w-full h-full justify-center mx-1">
      <div className="w-full absolute bottom-0 flex flex-col gap-2 justify-center mb-[16vh]">
          <div className="text-center"> Select your tier </div>
          <div className="flex justify-center mx-5">
          {DIFFICULTY_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className={`
                mx-1 px-4 py-4 rounded-lg font-semibold text-white transition-all cursor-pointer
                ${DIFFICULTY_CONFIG[level].color}
                ${
                  difficulty === level
                    ? "ring-3 ring-yellow-400"
                    : "opacity-70 hover:opacity-100 hover:scale-100"
                }
                flex flex-col items-center
              `}
            >
              {DIFFICULTY_CONFIG[level].label}
              <span className="text-xs font-normal mt-0.5">
                {DIFFICULTY_CONFIG[level].description}
              </span>
            </button>
          ))}
          </div>
        </div>
      </div>
  );
};
