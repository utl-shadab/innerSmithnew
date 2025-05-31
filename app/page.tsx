"use client"

import { useEffect, useState, useRef } from "react";
import Loader from "@/components/Loader"
// import HeroSection from "@/components/sections/HeroSection"
import PinnedSections from "@/components/PinnedSections"
import { initializeLenis } from "@/lib/lenis"
// import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInPinnedSection, setIsInPinnedSection] = useState(false);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        initializeLenis();
      }, 100);

      return () => clearTimeout(timer);
      // initializeLenis()
    }
  }, [isLoading])
  useEffect(() => {
    const handleScroll = () => {
      if (pinnedSectionRef.current) {
        const rect = pinnedSectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= 0 && rect.bottom > 0;
        setIsInPinnedSection(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <main className="relative">
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {/* <HeroSection /> */}
                <div 
          ref={pinnedSectionRef}
          className={`relative ${isInPinnedSection ? 'z-20' : 'z-10'}`}
        >

        <PinnedSections />
        </div>
      </div>
    </main>
  )
}
