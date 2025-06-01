"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cardData = [
  {
    icon: "svgs/userFeel.svg",
    title: "Users Feel Better in 14 Days",
    description: "We combine ancient rituals and modern methods to support your stress relief.",
  },
  {
    icon: "svgs/accuracy.svg",
    title: "98% Tool Match Accuracy",
    description: "Tools are handpicked based on your mood, style, and what works best for you.",
  },
  {
    icon: "svgs/journeys.svg",
    title: "50+ Journeys, One That Fits You",
    description: "Your daily guidance evolves with you to keep your journey engaging.",
  },
  {
    icon: "svgs/riskfree.svg",
    title: "7 Days, Risk-Free Trial",
    description: "Experience meaningful change, or get 100% of your money back.",
  },
];
const cardDataTwo = [
  {
    icon: "svgs/accuracy.svg",
    title: "98% Tool Match Accuracy",
    description: "Tools are handpicked based on your mood, style, and what works best for you.",
  },
  {
    icon: "svgs/userFeel.svg",
    title: "Users Feel Better in 14 Days",
    description: "We combine ancient rituals and modern methods to support your stress relief.",
  },
  {
    icon: "svgs/riskfree.svg",
    title: "7 Days, Risk-Free Trial",
    description: "Experience meaningful change, or get 100% of your money back.",
  },
  {
    icon: "svgs/journeys.svg",
    title: "50+ Journeys, One That Fits You",
    description: "Your daily guidance evolves with you to keep your journey engaging.",
  },
];
export default function Tools() {
  const titleRef = useRef(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const autoSlide = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }, 5000);
    return () => clearInterval(autoSlide);
  }, [isMobile]);

  useEffect(() => {
    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: "lines" });
      gsap.fromTo(
        splitTitle.lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }

    if (!isMobile) {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardImage = card.querySelector(".card-image");
          const cardTitleElement = card.querySelector(".card-title") as HTMLElement | null;
          const cardDescElement = card.querySelector(".card-description") as HTMLElement | null;

          if (cardTitleElement && cardDescElement) {
            const splitCardTitle = new SplitType(cardTitleElement, { types: "lines" });
            const splitCardDesc = new SplitType(cardDescElement, { types: "lines" });

            gsap.fromTo(
              card,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: index * 0.2,
              }
            );
            if (cardImage) {
              gsap.fromTo(
                cardImage,
                { opacity: 0, scale: 0.8 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "power3.out",
                  delay: index * 0.2,
                }
              );
            }

            gsap.fromTo(
              splitCardTitle.lines,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                delay: index * 0.2 + 0.2,
              }
            );

            gsap.fromTo(
              splitCardDesc.lines,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                delay: index * 0.2 + 0.4,
              }
            );
          }
        }
      });
    }
  }, [isMobile]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      y: 0, 
      opacity: 0,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      y: 0,
      opacity: 0,
    }),
  };
  return (
    <section
      className="bg-white min-h-screen flex justify-center items-center py-10"
      id="tools"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="w-full mx-auto px-6 lg:px-20 xl:px-24">
        <div ref={titleRef} className="text-center mb-10 card-margin w-full max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-gray-900 font-normal para">
            <span className="font-bold">500+</span> Scientifically-Backed
            Tools, <span className="text-[#515151] font-light">Matched to You</span>
          </h2>
        </div>

        {isMobile ? (
          <div className="relative w-full flex flex-col items-center">
            <div className="relative w-full h-[600px] max-w-[600px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 60, damping: 15 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute w-full h-full top-0 left-0 card-position"
                >

                  <Card
                    className="rounded-3xl shadow-md text-left relative overflow-hidden bg-[#F3F3F3] px-4 h-auto  opacity-100"
                  >
                    <CardContent className="pt-8 pb-8 relative z-10 text-left">
                      <div className="mb-4">
                        <Image
                          src={cardData[currentIndex].icon}
                          alt=""
                          className="h-auto md:max-h-20 object-contain"
                          width={70}
                          height={70}
                          style={{ transform: "none" }}
                        />
                      </div>
                      <h3 className="w-full md:max-w-[139px]  font-[500] leading-8 text-2xl mb-2 text-gray-900">
                        {cardData[currentIndex].title}
                      </h3>
                      <p className="text-gray-600 text-xl leading-relaxed">
                        {cardData[currentIndex].description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence initial={false} custom={direction} >
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 60, damping: 15 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute w-full h-full top-80 left-0 card-hide"
                >

                  <Card
                    className="rounded-3xl shadow-md text-left relative overflow-hidden bg-[#F3F3F3] px-4 h-auto  opacity-100"
                  >
                    <CardContent className="pt-8 pb-8 relative z-10 text-left">
                      <div className="mb-4">
                        <Image
                          src={cardDataTwo[currentIndex].icon}
                          alt=""
                          className="h-auto md:max-h-20 object-contain"
                          width={70}
                          height={70}
                          style={{ transform: "none" }}
                        />
                      </div>
                      <h3 className="w-full md:max-w-[139px]  font-[500] leading-8 text-2xl mb-2 text-gray-900">
                        {cardDataTwo[currentIndex].title}
                      </h3>
                      <p className="text-gray-600 text-xl leading-relaxed">
                        {cardDataTwo[currentIndex].description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 mt-6 manage-buttons">
              <button
                onClick={handlePrev}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full hidden md:block mx-auto h-full pt-20 px-6 lg:px-20 xl:px-24">

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="rounded-3xl shadow-md text-left relative overflow-hidden bg-[#F3F3F3]  px-4 h-auto max-h-[500px]"

                >

                  <CardContent className="pt-8 card-content pb-8 relative z-10 text-left">
                    <div className="mb-4">
                      <Image
                        src={card.icon}
                        alt=""
                        className="card-image h-auto max-h-20 object-contain"
                        width={70}
                        height={70}
                      />
                    </div>
                    <h3 className="card-title w-full  font-[500] leading-8 text-2xl mb-2 text-gray-900">
                      {card.title}
                    </h3>
                    <p className="card-description text-gray-600 text-xl leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}