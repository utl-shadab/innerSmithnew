"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import "./MobileSlider.css"
gsap.registerPlugin(ScrollTrigger);
export default function Feel() {
 const sectionRef = useRef<HTMLElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
useEffect(() => {
    if (!sectionRef.current) return;

    
    const heading = new SplitType(".problem-headings", {
      types: "words,chars",
    });

  
    document.querySelectorAll(".problem-headings .word").forEach((el) => {
      (el as HTMLElement).style.whiteSpace = "nowrap";
    });

    gsap.set(".problem-headings .char", {
      opacity: 0,
      y: 20,
      fontWeight: "300",
      color: "#515151",
    });

    
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%", 
        toggleActions: "play none none none",
        // markers: true, 
      },
      defaults: { ease: "power2.out" },
    });

    tl.current.to(".problem-headings .char", {
      opacity: 1,
      y: 0,
      fontWeight: "400",
      color: "#000",
      duration: 0.3,
      stagger: 0.05, 
    });

   
    return () => {
      if (tl.current) {
        tl.current.kill(); 
      }
      heading.revert(); 
    };
  }, []);
  return (
    <section className="h-screen relative overflow-hidden bg-white"
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
              <span className="problem-headings font-[400] text-black">
                InnerSmith guides you through quick, calming activities
              </span>{" "}
              that help you show up for your work, <br className='break-mobile' /> your people, and yourself.
            </p>
          </div>
        </div>

        <div className="w-2/5 h-full flex items-center justify-center px-8">
          <div className="w-full max-w-md rounded-3xl overflow-hidden">

            <div className="w-full h-full  flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source src="/videos/logo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
              <span className="problem-headings font-[400] text-black">
                InnerSmith guides you through quick, calming activities
              </span>{" "}
              that help you show up for your work, your people, and yourself.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-[60vw] h-[60vw]  aspect-square bg-black rounded-3xl overflow-hidden">
            <div className="w-full h-full  flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source src="/videos/logo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
              <span className="problem-headings font-[400] text-black">
                InnerSmith guides you through quick, calming activities
              </span>{" "}
              that help you show up for your work, your people, and yourself.
            </p>
          </div>
        </div>

        {/* Video/Image */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-xl video-logo  rounded-3xl overflow-hidden">
         <div className="w-full h-full  flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source src="/videos/logo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}