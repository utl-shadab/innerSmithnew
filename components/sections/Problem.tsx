'use client';
import React, { useLayoutEffect, useRef } from 'react';
import LaptopLottie from '@/components/laptopLottie';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const initAnimation = () => {
        const headingElements = document.querySelectorAll('.problem-heading');
        console.log('Found heading elements:', headingElements.length);

        headingElements.forEach((heading, index) => {
          // const splitInstance = new SplitType(heading as HTMLElement, {
          //   types: 'chars',
          //   tagName: 'span',
          //   charClass: 'char',
          // });

          const chars = (heading as HTMLElement).querySelectorAll('.char');
          console.log(`Heading ${index + 1} - Found ${chars.length} characters`);
          gsap.set(chars, {
            display: 'inline-block',
            whiteSpace: 'nowrap',
            opacity: 0.2,
            y: 20,
            color: '#515151',
            fontWeight: 300,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none none',
              markers: true,
              onEnter: () => console.log('ScrollTrigger: Entered'),
              onEnterBack: () => console.log('ScrollTrigger: Entered Back'),
              onLeave: () => console.log('ScrollTrigger: Left'),
              onLeaveBack: () => console.log('ScrollTrigger: Left Back'),
            },
            defaults: {
              duration: 0.6,
              ease: 'none',
            },
          });

          tl.to(chars, {
            y: 0,
            opacity: 1,
            color: '#000',
            fontWeight: 600,
            stagger: 0.02,
            ease: 'power2.out',
            repeat: -1, //infintely
            repeatDelay: 2,
            onRepeat: () => console.log(`Animation repeated for heading ${index + 1}`),
            onReverseComplete: () => console.log(`Animation reversed for heading ${index + 1}`),
            onComplete: () => console.log(`Animation complete for heading ${index + 1}`),
          });
        });
      };

      // Wait for fonts and images to load
      const waitForAssets = () => {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            if (typeof imagesLoaded !== 'undefined') {
              imagesLoaded(document.body, initAnimation);
            } else {
              initAnimation();
            }
          });
        } else {
          initAnimation();
        }
      };

      waitForAssets();

      return () => {
        document.querySelectorAll('.problem-heading').forEach((el) => {
          const instance = (el as any)._splitType;
          if (instance) instance.revert();
        });
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      className="h-screen bg-white w-full flex relative justify-start max-sm:py-[3rem] items-center overflow-hidden"
      ref={sectionRef}
      id="problem"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Desktop Layout (md and above) */}
      <div className="hidden lg:grid grid-cols-2  mx-[5rem] max-sm:h-full max-sm:py-[5rem]">
        <div className="flex flex-col justify-center gap-[2rem] pr-[4rem] items-start max-sm:items-center max-sm:mb-10">
          <h2 className="text-[#525299]  main-title">The Problem</h2>
          <p className="problem-span text-left text-[#515151]  max-sm:text-center ">
            <span className="problem-heading  text-black" style={{ fontWeight: '400' }}>
              Stress is a lifestyle issue.
            </span>{' '}
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
        <div className="w-full flex flex-col items-center text-center  custom-gap">
          <h2 className="text-[#525299] font-semibold text-[1.5rem] title leading-tight" style={{ fontWeight: '400' }}>
            The Problem
          </h2>
          <p className="text-[2rem] para text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="problem-heading text-black" style={{ fontWeight: '400' }}>
              Stress is a lifestyle issue.
            </span>{' '}
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
