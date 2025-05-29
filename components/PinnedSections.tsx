"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Problem from "./sections/Problem"
import Stats from "./sections/Stats"
import Disrupt from "./sections/Disrupt"
import Feel from "./sections/Feel"
import Journey from "./sections/Journey"
import Unbox from "./sections/Unbox"
import App from "./sections/App"
import Tools from "./sections/Tools"
import Footer from "./sections/Footer"

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: "problem", component: Problem },
  { id: "stats", component: Stats },
  { id: "disrupt", component: Disrupt },
  { id: "feel", component: Feel },
  { id: "journey", component: Journey },
  { id: "unbox", component: Unbox },
  { id: "app", component: App },
  { id: "tools", component: Tools },
  { id: "footer", component: Footer },
]

export default function PinnedSections() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, index) => {
        if (!section) return

        // Pin each section with smoother settings
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        })

        // Set z-index for stacking effect
        gsap.set(section, { zIndex: sections.length - index })
      })

      // Refresh ScrollTrigger for smoother performance
      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {sections.map((section, index) => {
        const SectionComponent = section.component
        return (
          <div key={section.id} ref={(el) => (sectionsRef.current[index] = el)} className="relative h-screen">
            <SectionComponent />
          </div>
        )
      })}
    </div>
  )
}
