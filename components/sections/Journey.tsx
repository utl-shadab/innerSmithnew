"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Image from "next/image"
gsap.registerPlugin(ScrollTrigger);
import "./MobileSlider.css"
export default function Journey() {
   const sectionRef = useRef(null);
      const triggerRef = useRef<ScrollTrigger | undefined>(undefined);
    
      useEffect(() => {
        let tl: gsap.core.Timeline | undefined;
    
        const setupAnimations = () => {
          const section = sectionRef.current;
          const heading = new SplitType(".problem-headings", {
            types: "words,chars",
          });
    
          if (!section) return;
    
          gsap.set(section, { clearProps: "all" });
          document.querySelectorAll(".problem-headings .word").forEach((el) => {
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
            ".problem-headings .char",
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
    <section className="h-screen  w-full relative overflow-hidden bg-white"
      id="journey"
      ref={sectionRef}
      style={{ scrollSnapAlign: 'start' }}>
      <div className="hidden lg:flex h-full">
        <div className="w-3/5 flex items-center justify-center px-8 xl:px-2">
          <div className="max-w-3xl space-y-6">
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
            src="/images/rightImage2.svg"
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
            src="/rounded-full.jpg"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-cover w-full h-full smallFit max-w-md md:max-w-xl sm:max-w-xl  mx-auto"
           style={{ bottom: 0, objectFit: "cover", }}
            priority
          />
        </div>
      </div>
    </section>
  )
}