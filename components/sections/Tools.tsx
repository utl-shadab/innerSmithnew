"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SplitType from "split-type";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    icon: "svgs/userFeel.svg",
    title: "Users Feel Better in 14 Days",
    description: "Tailored stress relief, powered by practices old and new, proven to help you feel better.",
  },
  {
    icon: "svgs/accuracy.svg",
    title: "98% Tool Match Accuracy",
    description: "Every recommendation is tuned to your mood, energy, and what actually helps you reset.",
  },
  {
    icon: "svgs/journeys.svg",
    title: "50+ Journeys, One That Fits You",
    description: "Explore daily journeys that shift and grow with how you feel, so your path always feels personal.",
  },
  {
    icon: "svgs/riskfree.svg",
    title: "7 Days, Risk-Free Trial",
    description: "Experience meaningful change, or get 100% of your money back, no questions asked.",
  },
];

export default function Tools() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCard, setExpandedCard] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setExpandedCard(window.innerWidth < 768 ? 0 : -1);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? -1 : index);
  };

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const splitTitle = new SplitType(titleRef.current!, { types: "lines" });
      console.log("SplitType initialized:", splitTitle);
      gsap.set(splitTitle.lines, {
        y: 50,
        opacity: 0,
      });


      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
          markers: false,
        },
        defaults: { ease: "power3.out" },
      }).to(splitTitle.lines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        onStart: () => console.log("Title animation started"),
        onComplete: () => console.log("Title animation completed"),
      });

      return () => {
        splitTitle.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bg-white min-h-screen flex justify-center items-center py-8 px-4"
      id="tools"
      style={{ scrollSnapAlign: "start" }}
      ref={sectionRef}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 card-margin w-full max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl md:leading-tight text-gray-900 font-normal para">
            <span className="font-bold">500+</span> Scientifically-Backed
            Tools, <span className="text-[#515151] font-light">Matched to You</span>
          </h2>
        </div>

        {/* Desktop Grid Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="flex flex-col items-start gap-3 flex-shrink-0 h-full max-h-[30rem] w-full rounded-3xl border border-white bg-[#F3F3F3] cursor-pointer group"
                style={{ padding: "1.875rem" }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <Image
                    src={card.icon}
                    alt=""
                    height={70}
                    width={70}
                    draggable={false}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>

                <motion.h3
                  className="font-medium text-black leading-[2.5rem] group-hover:text-gray-700 transition-colors duration-300 text-start text-[2.12rem]"
                >
                  {!isMobile && card.title === "7 Days, Risk-Free Trial" ? (
                    <>
                      7 Days,<br />
                      Risk-Free<br />
                      Trial
                    </>
                  ) : (
                    card.title
                  )}
                </motion.h3>

                <motion.p
                  className="text-lg font-light text-black leading-[2.125rem] group-hover:text-gray-500 transition-colors duration-300 text-start md:leading-relaxed md:font-normal"
                >
                  {card.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile Accordion Layout */}
        {isMobile && (
          <div className="space-y-4 max-w-md mx-auto">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden ${expandedCard === index ? 'bg-[#EEF5F6]' : 'bg-[#f3f3f3]'}`}
              >
                <motion.div
                  onClick={() => handleCardClick(index)}
                  className="p-3 sm:p-6 cursor-pointer flex items-center justify-between"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <Image
                        draggable={false}
                        priority
                        height={50}
                        width={50}
                        src={card.icon}
                        alt=""
                        className="w-12 h-12 object-contain"
                      />
                    </motion.div>
                    <h3
                      className={`text-base sm:text-lg w-full max-w-40 ${expandedCard === index ? 'font-bold' : 'font-medium'} text-gray-900`}
                    >
                      {card.title}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedCard === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {card.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}