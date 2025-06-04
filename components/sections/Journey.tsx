"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Image from "next/image"
gsap.registerPlugin(ScrollTrigger);
import "./MobileSlider.css"
export default function Journey() {
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
    <section className="h-screen  w-full relative overflow-hidden bg-white"
      id="journey"
      ref={sectionRef}
      style={{ scrollSnapAlign: 'start' }}>
      <div className="hidden lg:flex h-full">
        <div className="w-3/5 flex items-center justify-center px-8 xl:px-0">
          <div className="max-w-3xl  space-y-6 pr-0 lg:pr-[4.5rem]">
            <h2 className=" title main-title font-medium text-[#7BB338]  tracking-wide">
              A Journey That Fits You
            </h2>
            <p className="problem-span para text-left text-[#515151] font-[300] max-sm:text-center ">
              <span className="problem-headings font-[400] text-black">
                Be it heartache, loss, exhaustion, or just a rough day,
              </span>{" "}
              there's a path for you here.
            </p>
          </div>
        </div>

        <div className="w-2/5 relative">
          <Image
            src="/images/fits.png"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      <div className="lg:hidden h-full flex flex-col">
        <div className="flex-1 custom-gap flex items-start px-6 md:px-8 py-8 mt-10 sm:mt-0">
          <div className="space-y-4 md:space-y-6">
            <h2 className=" title font-medium text-[#7BB338]  tracking-wide">
              A Journey That Fits You
            </h2>
            
            <p className="problem-span para text-left text-[#515151] font-[300] max-sm:text-center ">
              <span className="problem-headings font-[400] text-black">
                Be it heartache, loss, exhaustion, or just a rough day,
              </span>{" "}
              there's a path for you here.
            </p>
          </div>
        </div>

        <div className="flex-1 relative -mx-0">
          <Image
            src="images/smallFit.png"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-cover w-full h-full smallFit max-w-[22rem] md:max-w-xl sm:max-w-xl  mx-auto"
            style={{ bottom: 0, objectFit: "cover", }}
            priority
          />
        </div>
      </div>
    </section>
  )
}