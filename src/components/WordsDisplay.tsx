"use client";
import { useTypingGameStore } from "@/stores/typingGame.store";

export const WordsDisplay = () => {
  const { words, typedWords, currentWordIndex, userInput } =
    useTypingGameStore();

  return (
    <div className="text-2xl leading-relaxed mb-6 min-h-[120px] font-mono">
      {words.map((word, wordIdx) => {
        if (wordIdx < currentWordIndex) {
          const typed = typedWords[wordIdx] || "";
          return (
            <span key={wordIdx} className="relative">
              {Array.from(word).map((char, charIdx) => (
                <span
                  key={charIdx}
                  className={
                    charIdx < typed.length
                      ? typed[charIdx] === char
                        ? "text-green-500"
                        : "text-red-500 underline"
                      : "text-gray-400 dark:text-gray-600"
                  }
                >
                  {char}
                </span>
              ))}
              {/* Handle extra characters that were typed */}
              {typed.length > word.length &&
                Array.from(typed.slice(word.length)).map((char, idx) => (
                  <span key={`extra-${idx}`} className="text-red-500 underline">
                    {char}
                  </span>
                ))}{" "}
            </span>
          );
        }

        if (wordIdx === currentWordIndex) {
          return (
            <span key={wordIdx} className="relative">
              {Array.from(word).map((char, charIdx) => (
                <span
                  key={charIdx}
                  className={
                    charIdx < userInput.length
                      ? userInput[charIdx] === char
                        ? "text-green-500"
                        : "text-red-500 underline"
                      : "text-gray-900 dark:text-white"
                  }
                >
                  {char}
                </span>
              ))}
              {/* Handle extra characters that were typed */}
              {userInput.length > word.length &&
                Array.from(userInput.slice(word.length)).map((char, idx) => (
                  <span key={`extra-${idx}`} className="text-red-500 underline">
                    {char}
                  </span>
                ))}{" "}
            </span>
          );
        }

        return (
          <span key={wordIdx} className="text-gray-900 dark:text-white">
            {word}{" "}
          </span>
        );
      })}
    </div>
  );
};
