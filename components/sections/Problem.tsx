"use client";
import React, { useRef } from "react";
import LaptopLottie from "@/components/laptopLottie";
import "../hero.css";

export default function Problem() {
  const sectionRef = useRef(null);
  // const text = "Stress is a lifestyle issue.";

  return (
    <section
      className="h-screen bg-white w-full flex relative justify-start max-sm:py-[3rem] items-center overflow-hidden"
      ref={sectionRef}
      id="problem"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-2 mx-[5rem]">
        <div className="flex flex-col justify-center gap-[2rem] pr-[4rem] items-start">
          <h2 className="text-[#525299] main-title">The Problem</h2>
          <p className="problem-span text-left text-[#515151]">
            <span className="problem-heading text-black font-normal" style={{ fontWeight: "400",  color: "#000" }}>
            Stress is a lifestyle issue.
            </span>
            It builds quietly, drains you daily, but we don’t talk about it enough.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[603px] h-auto">
            <LaptopLottie />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full h-full flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full flex flex-col items-center text-center gap-8">
          <h2 className="text-[#525299] font-semibold text-[1.5rem] title leading-tight">
            The Problem
          </h2>
          <p className="text-[2rem] para text-center text-[#8a8a8a] font-light leading-relaxed">
            <span className="problem-heading text-black font-normal">
            Stress is a lifestyle issue.
            </span>
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
