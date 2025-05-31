"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import "./MobileSlider.css"
gsap.registerPlugin(ScrollTrigger);
export default function Feel() {
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
    <section className="h-screen relative overflow-hidden bg-gray-50"
      id="feel"
      style={{ scrollSnapAlign: 'start' }}
       ref={sectionRef}
       >
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full items-center">
        <div className="w-3/5 flex items-center px-8 xl:px-16 2xl:px-20">
          <div className="max-w-[46rem] space-y-6 xl:space-y-8">
            <h2 className="main-title font-normal  text-[#FE8A65] leading-relaxed">
             Feel More Like Yourself With InnerSmith
            </h2>
           <p className="problem-span text-left text-[#515151] font-[300] max-sm:text-center ">
            <span className="problem-heading font-[400] text-black">
             InnerSmith guides you through quick, calming activities 
            </span>{" "}
             that help you show up for your work, your people, and yourself.
          </p>
          </div>
        </div>
        
        <div className="w-2/5 h-full flex items-center justify-center px-8">
          <div className="w-full max-w-md aspect-square bg-black rounded-3xl overflow-hidden">
            
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="text-white/20 text-sm">Video Content</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex lg:hidden h-full flex-col">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className=" custom-width text-center space-y-5">
            <h2 className="main-title font-normal title text-[#FE8A65] title leading-relaxed">
             Feel More Like Yourself With InnerSmith
            </h2>
            <p className="problem-span text-left para text-[#515151] font-[300] max-sm:text-center ">
            <span className="problem-heading font-[400] text-black">
             InnerSmith guides you through quick, calming activities 
            </span>{" "}
            that help you show up for your work, your people, and yourself.
          </p>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-[60vw] h-[60vw] aspect-square bg-black rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="text-white/20 text-sm">Video Content</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-full flex flex-col py-8">
        {/* Text Content */}
        <div className="flex-1 flex items-center px-6">
          <div className="space-y-4">
            <h3 className="text-base title font-normal  text-[#FE8A65] leading-relaxed">
             Feel More Like Yourself With InnerSmith
            </h3>
            <p className="problem-span text-left para text-[#515151] font-[300] max-sm:text-center ">
            <span className="problem-heading font-[400] text-black">
             InnerSmith guides you through quick, calming activities 
            </span>{" "}
            that help you show up for your work, your people, and yourself.
          </p>
          </div>
        </div>
        
        {/* Video/Image */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-xs aspect-square bg-black rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="text-white/20 text-sm">Video Content</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}