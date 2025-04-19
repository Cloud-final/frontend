"use client";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { WordsDisplay } from "./WordsDisplay";
import { InputField } from "./InputField";
import { ResultsModal } from "./ResultModal";
import { useGlobalKeyHandler } from "@/hooks/useGlobalKeyHandler";
import { useEffect } from "react";

export const TestContainer = () => {
  useGlobalKeyHandler();
  const { status, currentLineIndex, words, finishTest } = useTypingGameStore();
  useEffect(() => {
    if (currentLineIndex == words.length) {
      finishTest();
    }
  }, [currentLineIndex, finishTest, words]);

  return (
    <div className="max-w-4xl min-w-2xl mx-auto">
      {status === "finished" && <ResultsModal></ResultsModal>}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg py-4 px-6">
        <WordsDisplay />
        <InputField />
      </div>
    </div>
  );
};
