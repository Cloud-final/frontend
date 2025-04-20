"use client";
import Image from "next/image";
import { useTypingGameStore } from "@/stores/typingGame.store";
import { useSettingsStore } from "@/stores/settings.store";

export const MusicDisc = () => {
  const { songName, difficulty } = useSettingsStore();
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
    <div className="w-screen flex flex-col items-center gap-4 mt-40 mb-10">
      <div className="text-center flex flex-col gap-1">
        <p className="font-semibold">
          {difficulty}
        </p>
        <p className="font-semibold">
          {songName}
        </p>
        <p className={`font-semibold text-sm ${
          status === "playing" ? "text-red-400 text-xl" : "mb-2"
        }`}>
          {status === "playing" ? `${timeLeft}s` : `Duration: ${Math.floor(duration)}s`}
        </p>
      </div>
      <div
        className={`relative w-48 h-48 rounded-full bg-gradient-to-br overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
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
    </div>
  );
};
