"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import BurdenAnimation from "../burden";

gsap.registerPlugin(ScrollTrigger);

export default function Disrupt() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const heading = new SplitType(".problem-headings", {
      types: "words,chars",
    });

    gsap.set(".problem-headings .char", {
      opacity: 0,
      y: 30,
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none none",
        once: true,
      },
    });


    tl.current.to(".problem-headings .char", {
      opacity: 1,
      y: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.out",
    });

    triggerRef.current = tl.current.scrollTrigger ?? null;

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
      heading.revert();
    };
  }, []);

  return (
    <section
      className="h-screen bg-white w-full flex relative justify-start max-sm:py-[3rem] items-center overflow-hidden"
      ref={sectionRef}
      id="disrupt"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Desktop Layout (md and above) */}
      <div className="hidden lg:grid grid-cols-2 mx-[5rem] max-sm:h-full max-sm:py-[5rem]">
        <div className="flex flex-col justify-center gap-[2rem] items-start max-sm:items-center max-sm:mb-10">
          <h2 className="text-[#6AA7BB] font-semibold main-title">
            Let’s Disrupt The Spiral
          </h2>
          <p className="problem-span text-left text-[#515151] font-[300] max-sm:text-center ">
            <span className="problem-headings font-[400] text-black">
              What if support showed up the moment the tension set in?
            </span>{" "}
            What if something helped you feel better in minutes?
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[603px] h-auto">
            <BurdenAnimation />
          </div>
        </div>
      </div>

      {/* Mobile Layout (below md) */}
      <div className="lg:hidden md:grid w-full h-full flex flex-col justify-center items-center padding px-6 py-12">
        <div className="w-full flex flex-col items-center text-center gap:2 md:gap-8">
          <h2 className="text-[#6AA7BB] font-semibold text-[1.5rem] title leading-tight">
            Let’s Disrupt The Spiral
          </h2>
          <p className="text-[2rem] para text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="problem-headings font-medium text-black">
              What if support showed up the moment the tension set in?
            </span>{" "}
            What if something helped you feel better in minutes?
          </p>
          <div className="w-full mt-4">
            <BurdenAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
