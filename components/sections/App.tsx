"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const AppSlides = [
  {
    title: "Wellness, simplified.",
    content:
      "Holistic and personalized tools designed to help you feel better, anytime, anywhere.",
    imgLink: "/images/app-section.png",
  },
  {
    title: "Feel Supported",
    content: "A community that reminds you that you're never in this alone.",
    imgLink: "/svgs/mobileSlider/feelSupport.svg",
  },
  {
    title: "Shift Your Mindset",
    content:
      "Psychologically proven techniques like CBT & EFT to rewire negative thinking.",
    imgLink: "/svgs/mobileSlider/ShiftMind.svg",
  },
  {
    title: "Quiet Your Mind",
    content:
      "Powerful meditations & sensory resets for instant relief and balance.",
    imgLink: "/svgs/mobileSlider/QueitMind.svg",
  },
  {
    title: "Heal Creatively",
    content:
      "Art-based therapy, music, movement, and other expressive outlets for when words aren't enough.",
    imgLink: "/svgs/mobileSlider/Heal.svg",
  },
  {
    title: "Let It Out",
    content:
      "Venting spaces & guided reflections to process and heal, judgment-free.",
    imgLink: "/svgs/mobileSlider/LetitOut.svg",
  },
];

export default function App() {
  const isMobile = useIsMobile();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="min-h-screen w-full bg-gray-100 relative overflow-hidden py-8 sm:py-16 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] h-full w-full px-4 sm:px-8 md:px-12 lg:px-[5rem] gap-8">
        {/* Text Content */}
        <div className="flex flex-col justify-center pt-4 sm:pt-8 lg:pt-[5rem] text-left h-full px-4 sm:px-8 lg:px-[4rem] order-2 lg:order-1">
          <h3 className="text-lg sm:text-xl md:text-2xl text-blue-500 font-medium">
            Inside The App
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mt-4 sm:mt-6 lg:mt-8 text-gray-900">
            <span className="font-medium text-black block mb-2">
              {AppSlides[activeIndex].title}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 pr-4 sm:pr-12 lg:pr-16">
            {AppSlides[activeIndex].content}
          </p>

          {/* Pagination dots */}
          <div className="paginationTemp flex mt-8 sm:mt-12 space-x-2 justify-start hidden sm:block"></div>

          {/* Mobile pagination dots */}
          <div className="flex mt-6 sm:mt-8 space-x-2 justify-center lg:justify-start sm:hidden">
            {AppSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  index === activeIndex ? "bg-teal-500" : "bg-gray-400"
                }`}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(index + 1);
                  }
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Mobile View Slider */}
        <div className="slider pt-4 sm:pt-8 relative block sm:hidden order-1 lg:order-2">
          <div className="relative flex justify-center items-center h-auto">
            <div className="relative w-[280px] h-[580px] mx-auto">
              <Image
                src="/svgs/mobileScreen.svg"
                alt="Phone frame"
                fill
                className="absolute inset-0 z-[3] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center z-[2] px-[22px] pt-[18px] pb-[22px]">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  slidesPerView={1}
                  spaceBetween={0}
                  navigation={false}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                  }}
                  loop={true}
                  className="w-full h-full rounded-[32px] overflow-hidden"
                >
                  {AppSlides.map((slide, index) => (
                    <SwiperSlide
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.imgLink}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View Slider */}
        <div className="sliderDiv relative my-auto hidden sm:block order-1 lg:order-2">
          <div className="relative flex justify-center items-center h-auto w-full">
            <div className="relative w-[320px] h-[650px] mx-auto">
              <Image
                src="/svgs/mobileScreen.svg"
                alt="Phone frame"
                fill
                className="absolute inset-0 z-[3] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center z-[2] px-[24px] pt-[20px] pb-[24px]">
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  slidesPerView={1}
                  spaceBetween={0}
                  speed={1000}
                  navigation={false}
                  pagination={{ el: ".paginationTemp", clickable: true }}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                  }}
                  loop={true}
                  className="w-full h-full rounded-[36px] overflow-hidden"
                >
                  {AppSlides.map((slide, index) => (
                    <SwiperSlide
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.imgLink}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
