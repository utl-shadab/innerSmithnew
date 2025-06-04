"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSecondView() {
  const secondViewRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

 

  return (
    <div ref={secondViewRef} className="relative h-screen text-white">
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/heroFullbgfirst.png"
          alt="Second Background"
          fill
          className="object-cover"
          priority
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black/65 z-10" />
      </div>

      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-7xl mx-auto">
          <h2 ref={headingRef} className="para hero-bottom">
            Say hello to the{" "}
            <span className="hero-headings !font-normal text-2xl md:text-3xl lg:text-5xl">
              world's first holistic wellness app
            </span>
            <br className="hidden md:block" />
            that improves your sleep, focus, and emotional balance,
            <br className="hidden md:block" />
            starting on day one.
          </h2>
        </div>
      </div>
    </div>
  );
}
