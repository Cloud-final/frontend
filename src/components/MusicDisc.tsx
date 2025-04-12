"use client";
import Image from "next/image";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { useSettingsStore } from "@/stores/settings.store";

export const MusicDisc = () => {
  const { songName } = useSettingsStore();
  const { status, startTest, resetTest, currentTime, duration } =
    useTypingGameStore();

  const handleClick = () => {
    if (status === "playing") {
      resetTest();
    } else {
      startTest();
    }
  };

  const timeLeft = Math.max(0, Math.floor(duration - currentTime));

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
          status === "playing" ? "animate-spin-slow" : ""
        }`}
        onClick={handleClick}
      >
        <Image
          src={status === "playing" ? "/playing-cover.gif" : "/ready-cover.png"}
          alt="Music Disc"
          fill
          unoptimized
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-semibold mb-1">
          {status === "playing" ? `Time left: ${timeLeft}s` : `${songName}`}
        </p>
        <p className="text-xs text-gray-400">
          {status === "playing"
            ? "Press Esc to stop."
            : "Say 'OIIA OIIA OI' to start."}
        </p>
      </div>
    </div>
  );
};
