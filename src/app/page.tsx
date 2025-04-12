import { SettingsPanel } from "@/components/SettingsPanel";
import { MusicDisc } from "@/components/MusicDisc";
import { TestContainer } from "@/components/TestContainer";

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] items-center justify-items-center min-h-screen gap-8 font-mono">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div className="w-full text-4xl font-bold text-center text-yellow-400">
          OIIA TYPE
        </div>
        <SettingsPanel></SettingsPanel>
        <MusicDisc></MusicDisc>
        <TestContainer></TestContainer>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
