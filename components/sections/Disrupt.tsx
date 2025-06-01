"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import BurdenAnimation from '../burden';

gsap.registerPlugin(ScrollTrigger);

export default function Disrupt() {
  const sectionRef = useRef(null);
  const triggerRef = useRef<ScrollTrigger | undefined>(undefined);

  useEffect(() => {
    let tl: gsap.core.Timeline | undefined;

    const setupAnimations = () => {
      const section = sectionRef.current;
      const heading = new SplitType(".problem-heading", {
        types: "words,chars",
      });

      if (!section) return;

      gsap.set(section, { clearProps: "all" });
      document.querySelectorAll(".problem-heading .word").forEach((el) => {
        (el as HTMLElement).style.whiteSpace = "nowrap";
      });
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top-=100% center",
          end: "bottom-=100% top",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(
        ".problem-heading .char",
        { fontWeight: "300", color: "#515151" },
        {
          fontWeight: "400",
          color: "#000",
          stagger: 0.1,
          duration: 0.2,
        }
      );

      triggerRef.current = tl.scrollTrigger;
    };

    requestAnimationFrame(() => {
      setTimeout(setupAnimations, 100);
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl?.kill();
      triggerRef.current?.kill();
    };
  }, []);

  return (
    <section
      className="h-screen bg-white w-full flex relative justify-start max-sm:py-[3rem] items-center overflow-hidden"
      ref={sectionRef}
      id="disrupt"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Desktop Layout (md and above) */}
      <div className="hidden lg:grid grid-cols-2   mx-[5rem] max-sm:h-full max-sm:py-[5rem]">
        <div className="flex flex-col  justify-center gap-[2rem]  items-start max-sm:items-center max-sm:mb-10">
          <h2 className="text-[#6AA7BB] font-semibold main-title">
           Let’s Disrupt The Spiral
          </h2>
          <p className="problem-span text-left text-[#515151] font-[300] max-sm:text-center ">
            <span className="problem-heading font-[400] text-black">
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
        <div className="w-full flex flex-col items-center text-center gap-8">
          <h2 className="text-[#6AA7BB] font-semibold text-[1.5rem] title leading-tight">
            Let’s Disrupt The Spiral
          </h2>
          <p className="text-[2rem] para text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="problem-heading font-medium text-black">
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