"use client"

import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
// import HeroSection from "@/components/sections/HeroSection"
import PinnedSections from "@/components/PinnedSections"
import { initializeLenis } from "@/lib/lenis"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      initializeLenis()
    }
  }, [isLoading])

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <main className="relative">
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {/* <HeroSection /> */}
        <PinnedSections />
      </div>
    </main>
  )
}
