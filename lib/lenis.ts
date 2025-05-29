"use client"

import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let lenis: Lenis | null = null

export function initializeLenis() {
  // Initialize Lenis with smoother settings
  lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
    normalizeWheel: true,
  })

  // Connect Lenis with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Refresh ScrollTrigger after Lenis initialization
  ScrollTrigger.refresh()

  return lenis
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}
