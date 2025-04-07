import { useEffect } from "react";
import { useTypingGameStore } from "@/stores/typingGame.store";

export const useGlobalKeyHandler = () => {
  const { resetTest, status } = useTypingGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status === "playing") {
        e.preventDefault();
        resetTest();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [resetTest, status]);
};
