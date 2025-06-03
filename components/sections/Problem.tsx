"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import LaptopLottie from "@/components/laptopLottie";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "../hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let split: SplitType | null = null;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    const setupAnimations = () => {
      const section = sectionRef.current;
      if (!section) {
        console.error("Section ref not found");
        return;
      }

      const heading = section.querySelector(".problem-headings") as HTMLElement | null;
      if (!heading) {
        console.error("Problem heading not found");
        return;
      }
      split = new SplitType(heading, { types: "words,chars" });
      console.log("SplitType initialized:", split);

      gsap.set(".problem-headings .word", { whiteSpace: "nowrap" });
      gsap.set(".problem-headings .char", {
        opacity: 0,
        y: 20,
        fontWeight: 300,
        color: "#515151",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%", 
          end: "bottom 10%", 
          toggleActions: "play none none none", 
        
        },
        defaults: { ease: "power4.out" },
      });

     
      tl.to(".problem-headings .char", {
        opacity: 1,
        y: 0,
        fontWeight: 400,
        color: "#000",
        stagger: 0.05,
        duration: 0.3, 
        onStart: () => console.log("GSAP animation started"),
        onComplete: () => console.log("GSAP animation completed"),
      });

      timelineRef.current = tl;
    };

  
    setupAnimations();

    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill(); 
      }
      if (split) split.revert(); 
      lenis.destroy();
    };
  }, []);

  return (
    <section
      className="h-screen bg-white w-full flex relative justify-start max-sm:py-[3rem] items-center overflow-hidden"
      ref={sectionRef}
      id="problem"
    >
      {/* Desktop Layout (md and above) */}
      <div className="hidden lg:grid grid-cols-2 mx-[5rem] max-sm:h-full max-sm:py-[5rem]">
        <div className="flex flex-col justify-center gap-[2rem] pr-[4rem] items-start max-sm:items-center max-sm:mb-10">
          <h2 className="text-[#525299] main-title">The Problem</h2>
          <p className="problem-span text-left text-[#515151] max-sm:text-center">
            <span className="problem-headings text-black">Stress is a lifestyle issue.</span>{" "}
            It builds quietly, drains you daily, but we don’t talk about it enough.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[603px] h-auto">
            <LaptopLottie />
          </div>
        </div>
      </div>

      {/* Mobile Layout (below md) */}
      <div className="lg:hidden md:grid w-full h-full flex flex-col justify-center padding items-center px-2 md:px-5 py-12">
        <div className="w-full flex flex-col items-center text-center custom-gap">
          <h2 className="text-[#525299] font-semibold text-[1.5rem] title leading-tight">
            The Problem
          </h2>
          <p className="text-[2rem] para text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="problem-headings font-semibold text-black">Stress is a lifestyle issue.</span>{" "}
            It builds quietly, drains you daily, but we don’t talk about it enough.
          </p>
          <div className="w-full mt-4">
            <LaptopLottie />
          </div>
        </div>
      </div>
    </section>
  );
}