// "use client"

// import Lenis from "lenis"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// let lenis: Lenis | null = null

// export function initializeLenis() {
//   lenis = new Lenis({
//     duration: 4,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     lerp: 0.02,
//     touchMultiplier: 1.5,
//     infinite: false,
//   })

//   lenis.on("scroll", ScrollTrigger.update)

//   gsap.ticker.add((time) => {
//     lenis?.raf(time * 1000)
//   })

//   gsap.ticker.lagSmoothing(0)
//   ScrollTrigger.refresh()

//   return lenis
// }

// export function destroyLenis() {
//   if (lenis) {
//     lenis.destroy()
//     lenis = null
//   }
// }

// export function getLenis() {
//   return lenis
// }



"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDeviceType, isHighPerformanceMac } from "@/utils/deviceDetection";

let lenis: Lenis | null = null;
let macTicker: ((time: number) => void) | null = null;
let normalTicker: ((time: number) => void) | null = null;

export function initializeLenis() {
  if (lenis) {
    destroyLenis();
  }

  const device = getDeviceType();
  const isHighPerformanceMacDevice = isHighPerformanceMac();

  console.log("Device detected:", {
    isMac: device.isMac,
    isHighPerformance: isHighPerformanceMacDevice,
  });

  const lenisConfig = {
    duration: device.isMac ? 3.5 : 4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    lerp: device.isMac ? 0.008 : 0.02,
    touchMultiplier: device.isMac ? 0.8 : 1.5,
    infinite: false,
    smoothWheel: !device.isMac,
    syncTouch: false,
    wheelMultiplier: device.isMac ? 0.6 : 1,
  };

  lenis = new Lenis(lenisConfig);
  lenis.on("scroll", ScrollTrigger.update);

  
  if (device.isMac) {
    let lastTime = 0;
    const targetFPS = isHighPerformanceMacDevice ? 30 : 45;
    const interval = 1000 / targetFPS;

    macTicker = (time: number) => {
      const now = time;
      if (now - lastTime >= interval) {
        lenis?.raf(now * 1000);
        lastTime = now;
      }
    };

    gsap.ticker.add(macTicker);
    console.log(`Mac ticker initialized with ${targetFPS}fps limit`);
  } else {
    normalTicker = (time: number) => {
      lenis?.raf(time * 1000);
    };

    gsap.ticker.add(normalTicker);
    console.log("Normal ticker initialized");
  }

  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.refresh();

  return lenis;
}

export function destroyLenis() {
  if (macTicker) {
    gsap.ticker.remove(macTicker);
    macTicker = null;
  }
  if (normalTicker) {
    gsap.ticker.remove(normalTicker);
    normalTicker = null;
  }

  if (lenis) {
    try {
      lenis.destroy();
      lenis = null;
      console.log("Lenis destroyed successfully");
    } catch (error) {
      console.warn("Error destroying Lenis:", error);
      lenis = null;
    }
  }
}

export function getLenis() {
  return lenis;
}

export function pauseLenis() {
  if (lenis) {
    lenis.stop();
  }
}

export function resumeLenis() {
  if (lenis) {
    lenis.start();
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, {
      duration: 2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  }
}
