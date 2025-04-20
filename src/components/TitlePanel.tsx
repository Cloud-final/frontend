"use client";
import Image from "next/image";

export const TitlePanel = () => {
  return (
    <div className="w-full m-0 font-mono">
      <div className="h-full w-full mt-40 text-9xl font-bold text-center text-yellow-400">
        OIIA TYPE
      <Image src="/oiia-cat.svg"
        alt="oiia cat" 
        fill 
        className="absolute min-h-screen inset-0 z-0" 
      />
      </div>
    </div>
  );
};
