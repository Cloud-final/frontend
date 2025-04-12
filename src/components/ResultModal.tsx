"use client";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { useSettingsStore } from "@/stores/settings.store";

export const ResultsModal = () => {
  const { difficulty } = useSettingsStore();
  const { correctWords, words, resetTest } = useTypingGameStore();
  const totalWords = words.reduce((count, line) => count + line.length, 0);
  const accuracy =
    totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4">Test Results</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-gray-500">Accuracy</div>
            <div className="text-3xl font-bold">{accuracy}%</div>
          </div>
        </div>
        <div className="mb-6">
          {accuracy === 100 ? (
            <p className="text-green-500 font-semibold">
              ✅ You passed the spirit test. Arise, new {difficulty}!
            </p>
          ) : (
            <p className="text-red-400 italic">
              ❌ Not even {difficulty}&apos;s shadow would accept this...
            </p>
          )}
        </div>
        <button
          onClick={resetTest}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer "
        >
          Close
        </button>
      </div>
    </div>
  );
};
