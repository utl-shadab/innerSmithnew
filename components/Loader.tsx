"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&q=80",
  ];

  const texts = ["PAUSE", "BREATHE", "RESET"];

  useEffect(() => {
    let isMounted = true;

    const runAnimation = async () => {
      if (!isMounted) return;

      setIsClient(true);

      // Initial position - shutters closed
      gsap.set(topPanelRef.current, { yPercent: -50 });
      gsap.set(bottomPanelRef.current, { yPercent: 50 });

      const ctx = gsap.context(() => {
        const animateBlink = async (index: number) => {
          setCurrentIndex(index);

          const tl = gsap.timeline();

          // Open eye (reveal content)
          tl.to([topPanelRef.current, bottomPanelRef.current], {
            yPercent: (i) => (i === 0 ? -100 : 100),
            duration: 0.4,
            ease: "power2.out",
          })
          // Hold open
          .to({}, { duration: 0.8 })
          // Close eye (prepare for next)
          .to([topPanelRef.current, bottomPanelRef.current], {
            yPercent: (i) => (i === 0 ? -50 : 50),
            duration: 0.3,
            ease: "power2.in",
          });

          return tl;
        };

        const runSequence = async () => {
          // Start with closed eye
          await gsap.delayedCall(0.5, () => {});

          // Animate through each image/text
          for (let i = 0; i < images.length; i++) {
            if (!isMounted) break;
            await animateBlink(i);
            
            // Pause between blinks (except after last one)
            if (i < images.length - 1) {
              await gsap.delayedCall(0.4, () => {});
            }
          }

          // Final sequence - open and fade out
          await gsap.delayedCall(0.3, () => {});
          
          // Final open
          await gsap.to([topPanelRef.current, bottomPanelRef.current], {
            yPercent: (i) => (i === 0 ? -120 : 120),
            duration: 0.8,
            ease: "power2.out",
          });

          // Complete
          setIsLoading(false);
          if (onComplete) onComplete();
        };

        runSequence();
      }, containerRef);

      return () => {
        ctx.revert();
        isMounted = false;
      };
    };

    runAnimation();
  }, [onComplete, images.length]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {!isClient && (
        <div className="flex items-center justify-center h-full bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative w-full h-screen overflow-hidden flex justify-center items-center ${
          isClient ? "block" : "hidden"
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover h-screen w-full z-[1] bg-no-repeat transition-all duration-500">
          <Image
            src={images[currentIndex]}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
        </div>

        {/* Content Area */}
        <div className="w-full flex justify-center items-center relative z-[5]">
          {/* Soft glow behind text */}
          <div className="absolute z-[2] top-[30%] left-1/2 transform -translate-x-1/2 max-sm:top-[40%]">
            <div
              className="w-80 h-64 rounded-full opacity-40"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
          </div>

          {/* Main Text */}
          <div
            ref={textRef}
            className="text-white relative font-bold z-10 transition-all duration-500"
            style={{
              fontSize: "clamp(4rem, 15vw, 15rem)",
              textShadow: "0 0 20px rgba(0,0,0,0.8), 2px 2px 8px rgba(0,0,0,0.7)",
              letterSpacing: "0.12em",
              fontFamily: "'Arial Black', sans-serif",
            }}
          >
            {texts[currentIndex]}
          </div>
        </div>

        {/* Top Eyelid */}
        <div
          ref={topPanelRef}
          className="absolute top-0 left-0 w-full h-[60vh] z-40"
          style={{
            willChange: "transform",
            clipPath: "polygon(0% 0%, 8% 2%, 20% 8%, 35% 12%, 50% 13%, 65% 12%, 80% 8%, 92% 2%, 100% 0%, 100% 100%, 85% 88%, 70% 82%, 50% 80%, 30% 82%, 15% 88%, 0% 100%)",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              background: "linear-gradient(180deg, rgba(20, 20, 20, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 -2px 10px rgba(255,255,255,0.1)",
            }}
          >
            {/* Subtle texture overlay */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 6px,
                  rgba(255,255,255,0.08) 6px,
                  rgba(255,255,255,0.08) 12px
                )`,
              }}
            />
            {/* Bottom edge highlight */}
            <div
              className="absolute bottom-0 left-0 w-full h-3"
              style={{
                background: "linear-gradient(90deg, rgba(120,120,120,0.6) 0%, rgba(180,180,180,0.8) 50%, rgba(120,120,120,0.6) 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>

        {/* Bottom Eyelid */}
        <div
          ref={bottomPanelRef}
          className="absolute bottom-0 left-0 w-full h-[50vh] z-40"
          style={{
            willChange: "transform",
            clipPath: "polygon(0% 0%, 15% 12%, 30% 18%, 50% 20%, 70% 18%, 85% 12%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              background: "linear-gradient(0deg, rgba(20, 20, 20, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.1)",
            }}
          >
            {/* Subtle texture overlay */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  180deg,
                  transparent,
                  transparent 6px,
                  rgba(255,255,255,0.08) 6px,
                  rgba(255,255,255,0.08) 12px
                )`,
              }}
            />
            {/* Top edge highlight */}
            <div
              className="absolute top-0 left-0 w-full h-3"
              style={{
                background: "linear-gradient(90deg, rgba(120,120,120,0.6) 0%, rgba(180,180,180,0.8) 50%, rgba(120,120,120,0.6) 100%)",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;