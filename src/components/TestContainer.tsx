"use client";
import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settings.store";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { WordsDisplay } from "./WordsDisplay";
import { InputField } from "./InputField";
import { ResultsModal } from "./ResultModal";
import { useGlobalKeyHandler } from "@/hooks/useGlobalKeyHandler";
import { generateWordList } from "@/lib/words";

export const TestContainer = () => {
  useGlobalKeyHandler();
  const { status, initTest } = useTypingGameStore();
  const { difficulty } = useSettingsStore();

  useEffect(() => {
    const wordList = generateWordList(difficulty);
    initTest(wordList);
  }, [difficulty]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {status === "finished" && <ResultsModal></ResultsModal>}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <WordsDisplay />
        <InputField />
      </div>
    </div>
  );
};
