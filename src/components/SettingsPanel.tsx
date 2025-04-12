"use client";
import { useEffect } from "react";
import { DIFFICULTY_CONFIG, DIFFICULTY_LEVELS } from "@/config/difficulty";
import { useSettingsStore } from "@/stores/settings.store";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { fetchSongData } from "@/lib/api/song";

export const SettingsPanel = () => {
  const { difficulty, setDifficulty, setSongName } = useSettingsStore();
  const { audio, initAudio, setAudioSource, stopAudio, initTest } =
    useTypingGameStore();
  useEffect(() => {
    const fetchTrack = async () => {
      const songData = await fetchSongData(
        DIFFICULTY_CONFIG[difficulty].value,
        "1"
      );
      if (songData) {
        initTest(songData.lyrics);
        if (!audio) {
          initAudio(songData.track);
        } else {
          setAudioSource(songData.track);
        }
        setSongName(songData.name);
      }
      stopAudio();
    };

    fetchTrack();
  }, [
    difficulty,
    audio,
    initAudio,
    initTest,
    setAudioSource,
    stopAudio,
    setSongName,
  ]);

  return (
    <div className="w-full flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
      <h2 className="font-semibold text-yellow-400 text-center">
        Who are you?
      </h2>
      <div className="flex gap-3 justify-center">
        {DIFFICULTY_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`
              px-8 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer
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
