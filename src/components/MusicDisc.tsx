"use client";
import Image from "next/image";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { useSettingsStore } from "@/stores/settings.store";

export const MusicDisc = () => {
  const { difficulty } = useSettingsStore();
  const { status, startTest, resetTest } = useTypingGameStore();

  const handleClick = () => {
    if (status === "playing") {
      resetTest();
    } else {
      startTest();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className={`relative w-64 h-64 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 ${
          status === "playing" ? "animate-spin-slow" : ""
        }`}
        onClick={handleClick}
      >
        <Image
          src="/cover.png"
          alt="Music Disc"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="text-xl font-bold">
          {status === "playing"
            ? "Channeling typing energy..."
            : `Dare to become the next ${difficulty}!`}
        </p>
        <p className="text-sm text-gray-500">
          {status === "playing"
            ? "Press Esc to stop."
            : "Say 'OIIA OIIA OIIA' to start."}
        </p>
      </div>
    </div>
  );
};
