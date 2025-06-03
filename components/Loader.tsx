"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import shutterUp from "@/public/images/shutterUp.svg";
import Loading from "./loading";

const images = [
  "/images/pausebg.jpeg",
  "/images/breathebg.jpg",
  "/images/resetbg.jpg",
];
const texts = ["PAUSE", "BREATHE", "RESET"];

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const overlayRef = useRef(null);
  const loaderContainerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    // Initial positions - panels are off-screen
    gsap.set(topPanelRef.current, { yPercent: -150 });
    gsap.set(bottomPanelRef.current, { yPercent: 150 });
    gsap.set(overlayRef.current, { yPercent: 100 });

    texts.forEach((_, i) => {
      // Set image and text before animation starts
      tl.call(() => setIndex(i));
      tl.to({}, { duration: 0.8 }); 

      // Animate panels in - they slide to center covering text area
      tl.to(topPanelRef.current, {
        yPercent: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      tl.to(bottomPanelRef.current, {
        yPercent: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "<");

      // Hold position
      tl.to({}, { duration: 0.6 }); 

      // Exit animation - panels slide out
      tl.to(topPanelRef.current, {
        yPercent: -150,
        duration: 1,
        ease: "power2.in",
      });
      tl.to(bottomPanelRef.current, {
        yPercent: 150,
        duration: 1,
        ease: "power2.in",
      }, "<");
      
      tl.to({}, { duration: 0.4 });
    });

    // Final overlay animation
    tl.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.6,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const BlurSVG = () => (
    <svg
      width="345"
      height="272"
      viewBox="0 0 1512 813"
      className="w-full h-full"
      style={{ filter: 'blur(50px)' }}
    >
      <defs>
        <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="50" result="blur" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        </filter>
      </defs>
      <path
        d="M-99 754L779 538.5L1641 754V-218H-99V754Z"
        fill="rgba(0,0,0,0.3)"
        filter="url(#blur-filter)"
      />
    </svg>
  );

  return (
    <>
      {!isClient && <Loading />}

      <div
        ref={loaderContainerRef}
        style={{ display: isClient ? "block" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black"
      >
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center bg-black">
          {/* Black base layer */}
          <div className="absolute inset-0 bg-black/50 z-[0]"></div>

          {/* Background Image - Always visible */}
          <div className="absolute inset-0 bg-black h-screen w-full z-[1]">
            <Image
              src={images[index]}
              alt=""
              width={1974}
              priority
              height={1028}
              quality={70}
              className="w-full h-full object-cover"
            />
             <div className="absolute inset-0 bg-black/50 z-[2]"></div>
          </div>

          {/* Text with subtle blur background - Always visible */}
          <div className="w-full flex justify-center items-center relative">
            <div className="absolute z-[8] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20
                           w-[200px] h-[150px]
                           sm:w-[250px] sm:h-[180px]
                           md:w-[300px] md:h-[220px]
                           lg:w-[345px] lg:h-[272px]">
              <BlurSVG />
            </div>
            <div
              key={index}
              className="transition-opacity duration-500 ease-in-out text-white font-bold z-10 text-center px-4
                         text-[2rem] leading-tight
                         xs:text-[2.5rem] 
                         sm:text-[3rem] sm:leading-none
                         md:text-[4rem] 
                         lg:text-[5rem] 
                         xl:text-[6rem] 
                         2xl:text-[8rem]
                         max-w-[90vw] break-words"
            >
              {texts[index]}
            </div>
          </div>

          {/* Top Panel - Covers top portion */}
          <div
            ref={topPanelRef}
            className="absolute top-0 left-0 w-full z-40
                       h-[60vh] sm:h-[55vh] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]"
          >
            <Image
              src={shutterUp}
              height={1700}
              width={974}
              priority
              alt=""
              quality={70}
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Bottom Panel - Covers bottom portion */}
          <div
            ref={bottomPanelRef}
            className="absolute bottom-0 left-0 w-full z-40 rotate-180
                       h-[40vh] sm:h-[35vh] md:h-[50vh] lg:h-[55vh] xl:h-[70vh]"
          >
            <Image
              src={shutterUp}
              height={1700}
              width={974}
              priority
              alt=""
              quality={70}
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Final black overlay */}
          <div
            ref={overlayRef}
            className="absolute top-0 left-0 w-full h-full bg-black z-[60]"
          ></div>
        </div>
      </div>
    </>
  );
}