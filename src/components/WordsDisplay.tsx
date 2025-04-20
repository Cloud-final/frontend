"use client";
import { useTypingGameStore } from "@/stores/typingGame.store";

export const WordsDisplay = () => {
  const { words, typedWords, currentLineIndex, currentWordIndex, userInput } =
    useTypingGameStore();
  return (
    <div className="text-xl leading-relaxed min-h-[140px] font-mono">
      {words.map((line, lineIdx) => (
        <div key={lineIdx} className="">
          {line.map((word, wordIdx) => {
            // upcoming line
            if (lineIdx >= 4 && lineIdx - currentLineIndex >= 2) {
              return;
            }

            // past line
            if (currentLineIndex >= 3 && currentLineIndex - lineIdx >= 3) {
              return;
            }

            // shown line
            const isPast =
              lineIdx < currentLineIndex ||
              (lineIdx === currentLineIndex && wordIdx < currentWordIndex);
            const isCurrent =
              lineIdx === currentLineIndex && wordIdx === currentWordIndex;

            const typed = typedWords[lineIdx]?.[wordIdx] || "";

            if (isPast) {
              return (
                <span key={wordIdx} className="relative mr-1">
                  {Array.from(word).map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className={
                        charIdx < typed.length
                          ? typed[charIdx] === char
                            ? "text-green-500"
                            : "text-red-500 underline"
                          : "text-gray-500 dark:text-gray-600"
                      }
                    >
                      {char}
                    </span>
                  ))}
                  {typed.length > word.length &&
                    Array.from(typed.slice(word.length)).map((char, idx) => (
                      <span
                        key={`extra-${idx}`}
                        className="text-red-500 underline"
                      >
                        {char}
                      </span>
                    ))}
                </span>
              );
            }

            if (isCurrent) {
              return (
                <span key={wordIdx} className="relative mr-1">
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
                  {userInput.length > word.length &&
                    Array.from(userInput.slice(word.length)).map(
                      (char, idx) => (
                        <span
                          key={`extra-${idx}`}
                          className="text-red-500 underline"
                        >
                          {char}
                        </span>
                      )
                    )}
                </span>
              );
            }

            // future word
            return (
              <span
                key={wordIdx}
                className="text-gray-900 dark:text-gray-400 mr-1"
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
