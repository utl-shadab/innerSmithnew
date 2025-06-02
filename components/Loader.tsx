"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import shutterUp from "@/public/images/shutterUp.svg";
import blurbgLoader from "@/public/blurbgLoader.svg";
import Loading from "./loading";

const images = [
  "/images/pausebg.jpeg",
  "/images/breathebg.jpg",
  "/images/resetbg.jpg",
];
const texts = ["PAUSE", "BREATHE", "RESET", ""];

type LoaderProp = {
  onComplete?: () => void;
};

export default function Loader({ onComplete: onCompleteProp }: LoaderProp) {
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const loaderContainerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 0.8 },
      onComplete: () => {
        console.log("Loader animation complete");
        if (onCompleteProp) onCompleteProp();
      },
    });

    gsap.set(topPanelRef.current, { yPercent: -150 });
    gsap.set(bottomPanelRef.current, { yPercent: 150 });

    for (let i = 0; i < images.length; i++) {
      tl.to([topPanelRef.current, bottomPanelRef.current], {
        yPercent: 0,
      });

      tl.to(
        loaderContainerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
          onComplete: () => setIndex(i),
        },
        "<0.2"
      ).to(
        loaderContainerRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.in",
        },
        "<"
      );

      tl.to(topPanelRef.current, { yPercent: -150 });
      tl.to(bottomPanelRef.current, { yPercent: 150 }, "<");
      tl.to({}, { duration: 0.4 });
    }

    tl.to([topPanelRef.current, bottomPanelRef.current], { yPercent: 0 });

    return () => {
      tl.kill();
    };
  }, [onCompleteProp]);

  return (
    <>
      {!isClient && <Loading />}

      <div
        ref={loaderContainerRef}
        style={{ display: isClient ? "block" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50"
      >
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
          <div
            ref={topPanelRef}
            className="absolute top-[0] left-0 w-full h-2/3 bg-transprent z-40 max-xl:h-full"
          >
            <Image
              src={shutterUp}
              height="1700"
              priority={true}
              width="974"
              alt=""
              quality={70}
              className="w-full h-auto object-center max-xl:h-full max-xl:object-cover"
            />
          </div>

          <div
            ref={bottomPanelRef}
            className="absolute bottom-0 left-0 w-full h-2/5 bg-tranparent z-40 max-xl:h-2/3 max-sm:h-full rotate-180"
          >
            <Image
              src={shutterUp}
              height="1700"
              width="974"
              priority={true}
              quality={70}
              alt=""
              className="w-full h-auto rotate-x-180 translate-y-[-38vh] object-center max-xl:h-full max-xl:object-cover max-xl:translate-y-0"
            />
          </div>
          <div className="absolute inset-0 bg-cover h-screen w-full z-[1] bg-no-repeat transition-all duration-500">
            <Image
              src={images[index]}
              alt=""
              width="1974"
              priority={true}
              height="1028"
              quality={70}
              className="w-full h-full object-cover"
              style={{ filter: "blur(0px)" }}
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <div
              className={`absolute z-[2] top-[30%] left-1/2 transform -translate-x-1/2 max-sm:top-[40%] ${
                isClient ? "text-white" : "text-black"
              } z-[8]`}
            >
              <Image
                src={blurbgLoader}
                alt=""
                width="345"
                priority={true}
                height="272"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              key={index}
              className={`transition-opacity duration-500 ease-in-out ${
                isClient ? "text-white" : "text-black"
              } text-[4rem] xs:text-[32px] sm:text-[48px] md:text-[80px] lg:text-[128px] font-bold z-10`}
            >
              {texts[index]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}