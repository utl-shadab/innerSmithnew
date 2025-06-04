"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { Observer } from "gsap/Observer"
import HeroSection from "./sections/HeroSection"
import Problem from "./sections/Problem"
import SecondViewRef from './sections/SecondViewRef'
// import FirstViewRef from './sections/FirstViewRef'
import Stats from "./sections/Stats"
import Disrupt from "./sections/Disrupt"
import Feel from "./sections/Feel"
import Journey from "./sections/Journey"
import Unbox from "./sections/Unbox"
import App from "./sections/App"
import Tools from "./sections/Tools"
import Footer from "./sections/Footer"

gsap.registerPlugin(Observer)

const sections = [
  { id: "hero", component: HeroSection, title: "Hero" },
  // { id: "firstView", component: FirstViewRef, title: "First View" },
  { id: "secondView", component: SecondViewRef, title: "Second View" },
  { id: "problem", component: Problem, title: "Problem" },
  { id: "stats", component: Stats, title: "Stats" },
  { id: "disrupt", component: Disrupt, title: "Disrupt" },
  { id: "feel", component: Feel, title: "Feel" },
  { id: "journey", component: Journey, title: "Journey" },
  { id: "unbox", component: Unbox, title: "Unbox" },
  { id: "app", component: App, title: "App" },
  { id: "tools", component: Tools, title: "Tools" },
  { id: "footer", component: Footer, title: "Footer" },
]

export default function SmoothAnimatedSections() {
  const fixedContainerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const outerWrappersRef = useRef<(HTMLDivElement | null)[]>([])
  const innerWrappersRef = useRef<(HTMLDivElement | null)[]>([])
  const backgroundsRef = useRef<(HTMLDivElement | null)[]>([])

  const currentIndexRef = useRef(-1)
  const animatingRef = useRef(false)
  const observerRef = useRef<Observer | null>(null)

  const [currentSection, setCurrentSection] = useState(0)  // Start with Hero section
  const [showIntro, setShowIntro] = useState(true)

  const gotoSection = useCallback((sectionIndex: number, direction: number) => {
    if (animatingRef.current) return;
    if (sectionIndex < 0 || sectionIndex >= sections.length) {
      return;
    }

    const sectionsElements = sectionsRef.current.filter(Boolean) as HTMLDivElement[];
    const outerWrappers = outerWrappersRef.current.filter(Boolean) as HTMLDivElement[];
    const innerWrappers = innerWrappersRef.current.filter(Boolean) as HTMLDivElement[];
    const backgrounds = backgroundsRef.current.filter(Boolean) as HTMLDivElement[];

    if (sectionsElements.length === 0 || sectionIndex >= sectionsElements.length || !outerWrappers[sectionIndex] || !innerWrappers[sectionIndex] || !backgrounds[sectionIndex]) {
      console.error("GSAP target elements not found for index:", sectionIndex);
      return;
    }

    const prevIndex = currentIndexRef.current;
    if (sectionIndex === prevIndex && currentSection === sectionIndex) return;

    // Handle first section entry
    if (sectionIndex === 0 && prevIndex === -1 && direction === 1) {
      animatingRef.current = true;
      setCurrentSection(0);

      gsap.set(sectionsElements[0], {
        zIndex: 10,
        opacity: 1,
        visibility: "visible"
      });

      const dFactor = 1;
      gsap.timeline({
        onComplete: () => {
          animatingRef.current = false;
        }
      })
        .fromTo([outerWrappers[0], innerWrappers[0]], {
          yPercent: (i) => i ? -100 * dFactor : 100 * dFactor
        }, {
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 0)
        .fromTo(backgrounds[0], {
          yPercent: 15 * dFactor
        }, {
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 0);

      currentIndexRef.current = 0;
      return;
    }

    animatingRef.current = true;
    setCurrentSection(sectionIndex);

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power2.out" },
      onComplete: () => {
        animatingRef.current = false;
        sectionsElements.forEach((section, i) => {
          gsap.set(section, {
            zIndex: i === sectionIndex ? 10 : 0,
            opacity: i === sectionIndex ? 1 : 0,
            visibility: i === sectionIndex ? "visible" : "hidden"
          });
        });
      }
    });

    gsap.set(sectionsElements[sectionIndex], {
      zIndex: 10,
      opacity: 1,
      visibility: "visible"
    });

    if (prevIndex >= 0 && prevIndex < sections.length && prevIndex !== sectionIndex) {
      if (outerWrappers[prevIndex] && innerWrappers[prevIndex] && backgrounds[prevIndex]) {
        gsap.set(sectionsElements[prevIndex], {
          zIndex: 5,
          opacity: 1,
          visibility: "visible"
        });

        tl.to([outerWrappers[prevIndex], innerWrappers[prevIndex]], {
          yPercent: (i) => i ? 100 * dFactor : -100 * dFactor,
        }, 0)
          .to(backgrounds[prevIndex], {
            yPercent: -15 * dFactor,
          }, 0);
      }
    }

    tl.fromTo([outerWrappers[sectionIndex], innerWrappers[sectionIndex]], {
      yPercent: (i) => i ? -100 * dFactor : 100 * dFactor
    }, {
      yPercent: 0,
    }, 0)
      .fromTo(backgrounds[sectionIndex], {
        yPercent: 15 * dFactor
      }, {
        yPercent: 0,
      }, 0);

    currentIndexRef.current = sectionIndex;
  }, [sections.length, currentSection]);

  const goBackToNormalScroll = useCallback(() => {
    // Removed - not needed anymore since we always stay in GSAP mode
  }, []);

  useEffect(() => {
    if (currentSection >= 0) {
      // GSAP animation mode - always active now
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      if (fixedContainerRef.current) {
        gsap.set(fixedContainerRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          zIndex: 50,
          display: 'block'
        });
      }

      // Initialize first section
      if (currentIndexRef.current === -1) {
        setTimeout(() => gotoSection(currentSection, 1), 10);
      } else if (currentIndexRef.current !== currentSection && currentSection >= 0 && currentSection < sections.length) {
        setTimeout(() => gotoSection(currentSection, currentSection > currentIndexRef.current ? 1 : -1), 10);
      }

      if (!observerRef.current && fixedContainerRef.current) {
        observerRef.current = Observer.create({
          target: fixedContainerRef.current,
          type: "wheel,touch,pointer",
          wheelSpeed: -1,
          onDown: () => {
            if (animatingRef.current) return;
            const currentIdx = currentIndexRef.current;
            if (currentIdx > 0) {
              gotoSection(currentIdx - 1, -1);
            }
          },
          onUp: () => {
            if (animatingRef.current) return;
            const currentIdx = currentIndexRef.current;
            if (currentIdx < sections.length - 1) {
              gotoSection(currentIdx + 1, 1);
            }
          },
          tolerance: 10,
          preventDefault: true
        });
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.kill();
        observerRef.current = null;
      }
    };
  }, [currentSection, gotoSection, sections.length]);

  // Removed scroll listener - not needed anymore

  useEffect(() => {
    const sectionsElements = sectionsRef.current.filter(Boolean);
    const outerWrappers = outerWrappersRef.current.filter(Boolean);
    const innerWrappers = innerWrappersRef.current.filter(Boolean);

    if (sectionsElements.length > 0) {
      gsap.set(sectionsElements, {
        opacity: 0,
        visibility: "hidden",
        zIndex: 0
      });
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      const currentIdx = currentIndexRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentIdx > 0) {
            gotoSection(currentIdx - 1, -1);
          }
          break;
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          if (currentIdx < sections.length - 1) {
            gotoSection(currentIdx + 1, 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          gotoSection(0, -1);
          break;
        case 'End':
          e.preventDefault();
          if (sections.length > 0) {
            gotoSection(sections.length - 1, 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gotoSection, sections.length]);

  useEffect(() => {
    if (showIntro && currentSection === 0) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro, currentSection]);

  return (
    <div className="min-h-screen w-full bg-black">
      <div
        ref={fixedContainerRef}
        className="smooth-sections-container fixed inset-0 w-full h-full overflow-hidden"
        style={{
          opacity: 1,
          pointerEvents: 'auto',
          zIndex: 50,
          display: 'block',
        }}
      >
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <div
              key={section.id}
              ref={el => { sectionsRef.current[index] = el; }}
              className="smooth-section absolute inset-0 w-full h-full"
            >
              <div ref={el => { outerWrappersRef.current[index] = el; }} className="w-full h-full overflow-hidden">
                <div ref={el => { innerWrappersRef.current[index] = el; }} className="w-full h-full overflow-hidden">
                  <div ref={el => { backgroundsRef.current[index] = el; }} className="w-full h-full">
                    <div className="w-full h-full relative">
                      <SectionComponent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}