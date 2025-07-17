"use client";

import PastebinCard from "@/components/PastebinCard";
import SlideInCard from "@/components/SlideInCard";
import ScrapedCard from "@/components/ThirukkuralCard";
import HeroCard from "@/components/HeroCard";

export default function Home() {
  return (
    <main className="transition  min-h-screen bg-gradient-to-br from-secondary to-accent dark:from-black dark:to-slate-950 px-4 py-6">
      <SlideInCard>
        {/* Intro Card wrapper with center logic */}
        <HeroCard />
      </SlideInCard>
      <SlideInCard>
        <ScrapedCard />
      </SlideInCard>
      {/* PastebinCard follows naturally */}
      <div className=" flex justify-center">
        <SlideInCard>
          <PastebinCard />
        </SlideInCard>
      </div>
    </main>
  );
}
