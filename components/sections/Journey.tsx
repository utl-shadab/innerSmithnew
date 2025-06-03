"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import "./MobileSlider.css";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize SplitType on the .problem-headings span
      const split = new SplitType(headingRef.current!, {
        types: "chars", // Split into characters for animation
        tagName: "span",
      });

      // Create GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Start when top of section hits 85% of viewport
          end: "bottom 30%", // End when bottom of section hits 30% of viewport
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          markers: false, // Set to true for debugging
        },
        defaults: { ease: "power2.out" },
      });

      // Animate characters
      tl.fromTo(
        split.chars, // Animate individual characters
        { fontWeight: 300, color: "#515151" },
        {
          fontWeight: 400,
          color: "#000000",
          stagger: 0.05, // Stagger for smooth reading effect
          duration: 0.3, // Slightly faster for character animation
        }
      );

      // Cleanup SplitType and GSAP context
      return () => {
        split.revert(); // Revert SplitType changes
      };
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  return (
    <section
      className="h-screen w-full relative overflow-hidden bg-white"
      id="journey"
      ref={sectionRef}
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="hidden lg:flex h-full">
        <div className="w-3/5 flex items-center justify-center px-8 xl:px-2">
          <div className="max-w-3xl space-y-6">
            <h2 className="title main-title font-medium text-[#7BB338] tracking-wide">
              A Journey That Fits You
            </h2>
            <p className="problem-span para text-left text-[#515151] font-[300] max-sm:text-center">
              <span ref={headingRef} className="problem-headings font-[400] text-black">
                Be it heartache, loss, exhaustion, or just a rough day,
              </span>{" "}
              there’s a path for you here.
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
        <div className="flex-1 custom-gap flex items-center px-6 md:px-8 py-8">
          <div className="space-y-4 md:space-y-6">
            <h2 className="title font-medium text-[#7BB338] tracking-wide">
              A Journey That Fits You
            </h2>
            <p className="problem-span para text-left text-[#515151] font-[300] max-sm:text-center">
              <span ref={headingRef} className="problem-headings font-[400] text-black">
                Be it heartache, loss, exhaustion, or just a rough day,
              </span>{" "}
              there’s a path for you here.
            </p>
          </div>
        </div>
        <div className="flex-1 relative -mx-0">
          <Image
            src="/rounded-full.jpg"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-cover w-full h-full smallFit max-w-md md:max-w-xl sm:max-w-xl mx-auto"
            style={{ bottom: 0, objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}