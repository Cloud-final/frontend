import { useEffect } from "react";
import { useTypingGameStore } from "@/stores/typingGame.store";

export const useGlobalKeyHandler = () => {
  const { resetTest, startTest, status } = useTypingGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status === "playing") {
        e.preventDefault();
        resetTest();
      }
      
      if (e.key === "Enter" && status === "ready") {
        e.preventDefault();
        startTest();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [resetTest, startTest, status]);
};
