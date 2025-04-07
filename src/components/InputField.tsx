"use client";
import { useEffect, useRef } from "react";
import { useTypingGameStore } from "@/stores/typingGame.store";

export const InputField = () => {
  const { status, userInput, handleInput } = useTypingGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={userInput}
      onChange={handleChange}
      disabled={status !== "playing"}
      className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
};
