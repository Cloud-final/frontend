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
    <div className="flex justify-center">
      {status === "finished" && <ResultsModal></ResultsModal>}
      <div className="w-full mx-[30vw] rounded-lg p-6 flex flex-col gap-3">
        <WordsDisplay />
        <InputField />
        <div className="text-xs text-gray-400">
          <p>Press ENTER to Start | Press ESC to stop</p>
        </div>
      </div>
    </div>
  );
};
