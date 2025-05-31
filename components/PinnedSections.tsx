"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { Observer } from "gsap/Observer"
import HeroSection from "./sections/HeroSection"
import Problem from "./sections/Problem"
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
  
  const [currentSection, setCurrentSection] = useState(-1)
  const [showIntro, setShowIntro] = useState(true)

  // Only pinned sections (Problem to Footer) - Hero is separate
  const gsapSections = sections.slice(1)

  const gotoSection = useCallback((gsapIndex: number, direction: number) => {
    if (animatingRef.current) return;
    if (gsapIndex < 0 || gsapIndex >= gsapSections.length) {
      return;
    }

    const sectionsElements = sectionsRef.current.filter(Boolean) as HTMLDivElement[];
    const outerWrappers = outerWrappersRef.current.filter(Boolean) as HTMLDivElement[];
    const innerWrappers = innerWrappersRef.current.filter(Boolean) as HTMLDivElement[];
    const backgrounds = backgroundsRef.current.filter(Boolean) as HTMLDivElement[];

    if (sectionsElements.length === 0 || gsapIndex >= sectionsElements.length || !outerWrappers[gsapIndex] || !innerWrappers[gsapIndex] || !backgrounds[gsapIndex]) {
        console.error("GSAP target elements not found for index:", gsapIndex);
        return;
    }
    
    const prevGsapIndex = currentIndexRef.current;
    if (gsapIndex === prevGsapIndex && currentSection === gsapIndex) return;

    // SOLUTION 1: REMOVE BLACK OVERLAY - Direct transition without overlay
    if (gsapIndex === 0 && prevGsapIndex === -1 && direction === 1) {
      animatingRef.current = true;
      setCurrentSection(0);

      // Set fixed container visible immediately without black overlay
      if (fixedContainerRef.current) {
        gsap.set(fixedContainerRef.current, { 
          opacity: 1, 
          pointerEvents: 'auto', 
          zIndex: 50 
        });
      }

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
        duration: 0.8, // Faster animation
        ease: "power2.out", // Smoother easing
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
    setCurrentSection(gsapIndex);

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;
    
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power2.out" }, // Faster and smoother
      onComplete: () => {
        animatingRef.current = false;
        sectionsElements.forEach((section, i) => {
          gsap.set(section, { 
            zIndex: i === gsapIndex ? 10 : 0,
            opacity: i === gsapIndex ? 1 : 0,
            visibility: i === gsapIndex ? "visible" : "hidden"
          });
        });
      }
    });

    gsap.set(sectionsElements[gsapIndex], { 
      zIndex: 10, 
      opacity: 1, 
      visibility: "visible"
    });

    if (prevGsapIndex >= 0 && prevGsapIndex < gsapSections.length && prevGsapIndex !== gsapIndex) {
      if (outerWrappers[prevGsapIndex] && innerWrappers[prevGsapIndex] && backgrounds[prevGsapIndex]) {
        gsap.set(sectionsElements[prevGsapIndex], { 
          zIndex: 5, 
          opacity: 1, 
          visibility: "visible"
        });
        
        tl.to([outerWrappers[prevGsapIndex], innerWrappers[prevGsapIndex]], {
          yPercent: (i) => i ? 100 * dFactor : -100 * dFactor, 
        }, 0)
        .to(backgrounds[prevGsapIndex], { 
          yPercent: -15 * dFactor,
        }, 0);
      }
    }

    tl.fromTo([outerWrappers[gsapIndex], innerWrappers[gsapIndex]], {
      yPercent: (i) => i ? -100 * dFactor : 100 * dFactor
    }, {
      yPercent: 0,
    }, 0)
    .fromTo(backgrounds[gsapIndex], { 
      yPercent: 15 * dFactor 
    }, { 
      yPercent: 0,
    }, 0);

    currentIndexRef.current = gsapIndex;
  }, [gsapSections.length, currentSection]);

  useEffect(() => {
    if (currentSection === -1) { 
      // Hero section - normal scroll enabled
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      if (observerRef.current) {
        observerRef.current.kill();
        observerRef.current = null;
      }

      // SOLUTION 1: Hide container completely without overlay
      if (fixedContainerRef.current) {
        gsap.set(fixedContainerRef.current, { 
          opacity: 0, 
          pointerEvents: 'none', 
          zIndex: -1,
          display: 'none' // Completely hide to prevent any overlay
        });
      }

    } else { 
      // GSAP pinned mode - disable scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      if (fixedContainerRef.current) {
        gsap.set(fixedContainerRef.current, { 
          opacity: 1, 
          pointerEvents: 'auto', 
          zIndex: 50,
          display: 'block' // Show when needed
        });
      }

      // Initialize GSAP sections when entering pinned mode
      if (currentIndexRef.current === -1 && currentSection === 0) {
        setTimeout(() => gotoSection(0, 1), 10); // Faster initialization
      } else if (currentIndexRef.current !== currentSection && currentSection >= 0 && currentSection < gsapSections.length) {
        setTimeout(() => gotoSection(currentSection, currentSection > currentIndexRef.current ? 1 : -1), 10);
      }

      if (!observerRef.current && fixedContainerRef.current) {
        observerRef.current = Observer.create({
          target: fixedContainerRef.current, 
          type: "wheel,touch,pointer",
          wheelSpeed: -1, 
          onDown: () => { 
            if (animatingRef.current) return;
            const currentGsapIdx = currentIndexRef.current;
            if (currentGsapIdx > 0) {
              gotoSection(currentGsapIdx - 1, -1);
            } else if (currentGsapIdx === 0) { 
              // SOLUTION 1: Quick exit without overlay animation
              animatingRef.current = true;
              const problemSectionEl = sectionsRef.current[0];

              // Quick cleanup
              if (problemSectionEl) {
                gsap.set(problemSectionEl, { opacity: 0, visibility: "hidden", zIndex: 0 });
              }
              
              if (fixedContainerRef.current) {
                gsap.set(fixedContainerRef.current, { 
                  opacity: 0, 
                  pointerEvents: 'none', 
                  zIndex: -1,
                  display: 'none'
                });
              }
              
              setCurrentSection(-1); 
              currentIndexRef.current = -1; 
              animatingRef.current = false;
              
              // Smooth scroll back to Hero
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          },
          onUp: () => { 
            if (animatingRef.current) return;
            const currentGsapIdx = currentIndexRef.current;
            if (currentGsapIdx < gsapSections.length - 1) {
              gotoSection(currentGsapIdx + 1, 1);
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
  }, [currentSection, gotoSection, gsapSections.length]);

  // SOLUTION 1: Faster trigger point for smoother transition
  useEffect(() => {
    const onScroll = () => {
      if (currentSection !== -1) return; 

      // Trigger GSAP mode earlier for smoother transition
      const scrollProgress = window.scrollY / window.innerHeight;
      if (scrollProgress > 0.85) { // Earlier trigger point
        setCurrentSection(0); // Enter GSAP mode with Problem section
      }
    };
    
    if (currentSection === -1) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [currentSection]);

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
      if (currentSection === -1) {
        // Hero section - normal scroll behavior
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          // Smooth transition to GSAP mode
          const scrollProgress = window.scrollY / window.innerHeight;
          if (scrollProgress > 0.8) {
            setCurrentSection(0);
          } else {
            window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
          }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          if (window.scrollY === 0) return;
          window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
        } else if (e.key === 'Home') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else { 
        // GSAP pinned mode
        if (animatingRef.current) return;
        const currentGsapIdx = currentIndexRef.current;
        switch (e.key) {
          case 'ArrowUp':
          case 'PageUp':
            e.preventDefault();
            if (currentGsapIdx > 0) {
              gotoSection(currentGsapIdx - 1, -1);
            } else if (currentGsapIdx === 0) { 
              // SOLUTION 1: Quick exit to Hero section
              animatingRef.current = true;
              const problemSectionEl = sectionsRef.current[0];

              if (problemSectionEl) {
                gsap.set(problemSectionEl, { opacity: 0, visibility: "hidden", zIndex: 0 });
              }
              
              if (fixedContainerRef.current) {
                gsap.set(fixedContainerRef.current, { 
                  opacity: 0, 
                  pointerEvents: 'none', 
                  zIndex: -1,
                  display: 'none'
                });
              }
              
              setCurrentSection(-1);
              currentIndexRef.current = -1;
              animatingRef.current = false;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            break;
          case 'ArrowDown':
          case 'PageDown':
          case ' ':
            e.preventDefault();
            if (currentGsapIdx < gsapSections.length - 1) {
              gotoSection(currentGsapIdx + 1, 1);
            }
            break;
          case 'Home':
            e.preventDefault();
            setCurrentSection(-1); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
          case 'End':
            e.preventDefault();
            if (gsapSections.length > 0) {
              gotoSection(gsapSections.length - 1, 1);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, gotoSection, gsapSections.length]);

  useEffect(() => {
    if (showIntro && currentSection === -1) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro, currentSection]);

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Hero section always visible, not pinned */}
      <div id="hero" className="relative w-full h-screen">
        <HeroSection />
      </div>
      
      {/* GSAP container for pinned sections (Problem to Footer) */}
      <div
        ref={fixedContainerRef}
        className="smooth-sections-container fixed inset-0 w-full h-full overflow-hidden bg-black"
        style={{
          opacity: 0, 
          pointerEvents: 'none',
          zIndex: -1,
          display: 'none', // SOLUTION 1: Hide completely to prevent overlay
        }}
      >
        {gsapSections.map((section, index) => {
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