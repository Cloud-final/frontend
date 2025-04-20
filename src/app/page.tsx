"use client";
import { useState } from "react";
import { useSettingsStore } from "@/stores/settings.store";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { fetchSongData } from "@/lib/api/song";
import { DIFFICULTY_CONFIG } from "@/config/difficulty";
import { MusicDisc } from "@/components/MusicDisc";
import { TestContainer } from "@/components/TestContainer";
import { TitlePanel } from "@/components/TitlePanel";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function Home() {
  const { setDifficulty, setSongName } = useSettingsStore();
  const {
    audio,
    initAudio,
    setAudioSource,
    stopAudio,
    initTest,
    closeTest
  } = useTypingGameStore();

  const [gameReady, setGameReady] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSelect = async (level: keyof typeof DIFFICULTY_CONFIG) => {
  setLoading(true);
  try {
    setDifficulty(level);
    const config = DIFFICULTY_CONFIG[level];
    const songData = await fetchSongData(config.value, "1");

    if (songData) {
      initTest(songData.lyrics);
      if (!audio) initAudio(songData.track);
      else setAudioSource(songData.track);
      setSongName(songData.name);
      stopAudio();
      setGameReady(true);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="font-mono">
      {!gameReady ? (
        loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span>Loading...</span> {/* Swap with spinner if you have one */}
          </div>
        ) : (
          <>
            <TitlePanel />
            <SettingsPanel onSelect={handleSelect} />
          </>
        )
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={() => {
                closeTest();
                setGameReady(false);
              }}
              className="px-4 py-2 text-white rounded hover:bg-gray-700 transition font-mono"
            >
              ← Back
            </button>
          </div>
          <MusicDisc />
          <TestContainer />
        </>
      )}
  
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );  
}
