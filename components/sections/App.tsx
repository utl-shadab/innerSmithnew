"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/all";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as swp } from "swiper/types";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
  const swiperRef = useRef<swp>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  
  // Touch handling for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          dotsRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );
      gsap.set(phoneFrameRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          dotsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          phoneFrameRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 20
      });

      const tl = gsap.timeline();
      
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    
    // Pause autoplay when user starts touching
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
      setIsAutoplayPaused(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe left - next slide
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
      } else {
        // Swipe right - previous slide
        if (swiperRef.current) {
          swiperRef.current.slidePrev();
        }
      }
    }
    
    // Resume autoplay after a delay
    setTimeout(() => {
      if (swiperRef.current && swiperRef.current.autoplay && isAutoplayPaused) {
        swiperRef.current.autoplay.start();
        setIsAutoplayPaused(false);
      }
    }, 2000); // 2 second delay before resuming autoplay
  };

  // Prevent default drag behavior on images and maintain proper cursor
  const handleImageDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const handleImagePointerDown = (e: React.PointerEvent) => {
    // Prevent default behavior that might interfere with Swiper
    e.preventDefault();
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#f8f9fa] relative overflow-hidden flex items-center"
    >
      <div className="w-full mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            ref={textContentRef}
            className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
          >
            <h3
              ref={titleRef}
              className="text-lg title lg:text-xl text-[#7dd3fc] font-medium tracking-wide uppercase mb-6"
            >
              INSIDE THE APP
            </h3>
            <h2
              ref={subtitleRef}
              className="text-4xl lg:text-5xl 2xl:text-6xl font-light leading-tight text-gray-900 mb-6"
            >
              {AppSlides[activeIndex].title}
            </h2>
            <span className="text-gray-500 para text-4xl lg:text-5xl 2xl:text-6xl font-light leading-tight mb-6 sm:text-2xl">
              {AppSlides[activeIndex].content}
            </span>

            <div
              ref={dotsRef}
              className="flex justify-center lg:justify-start space-x-3"
            >
              {AppSlides.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer hover:scale-110 ${
                    index === activeIndex
                      ? "w-10 bg-teal-600"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div
            ref={phoneFrameRef}
            className="flex justify-center items-center order-1 lg:order-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              touchAction: isMobile ? 'pan-y' : 'auto' // Allow vertical scrolling but handle horizontal
            }}
          >
            <div className="relative">
              <div className="frame-size relative h-[76vw] w-[40vw] sm:h-[60vw] sm:w-[32vw] md:w-[35vw] md:h-[66vw] lg:w-[40vw] lg:h-[76vw] xl:w-[400px] xl:h-[760px]">
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <Image
                    src="/svgs/mobileScreen.svg"
                    alt="Phone frame"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    draggable={false}
                    onDragStart={handleImageDragStart}
                  />
                </div>

                <div className="absolute inset-0 z-10">
                  <div className="absolute top-[1.5%] left-[7%] right-[7%] bottom-[1.5%] rounded-[28px] lg:rounded-[12px] xl:rounded-[12px] overflow-hidden">
                    <Swiper
                      modules={[Autoplay, Navigation, Thumbs]}
                      slidesPerView={1}
                      spaceBetween={0}
                      speed={800}
                      navigation={false}
                      centeredSlides={true}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                      onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                      }}
                      loop={true}
                      touchEventsTarget="container"
                      touchRatio={1.2}
                      touchAngle={45}
                      simulateTouch={true}
                      allowTouchMove={true}
                      grabCursor={true} // Enable grab cursor for both mobile and desktop
                      touchStartPreventDefault={false}
                      touchReleaseOnEdges={true}
                      resistanceRatio={0.85}
                      // Enable mouse/desktop dragging
                      mousewheel={false}
                      keyboard={{
                        enabled: false,
                      }}
                      className="w-full h-full"
                    >
                      {AppSlides.map((slide, index) => (
                        <SwiperSlide key={index} className="relative">
                          <div className="relative w-full h-full">
                            <Image
                              src={slide.imgLink || "/placeholder.svg"}
                              alt={slide.title}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 1024px) 340px, (max-width: 1280px) 280px, 420px"
                              priority={index === 0}
                              draggable={false}
                              onDragStart={handleImageDragStart}
                              onPointerDown={handleImagePointerDown}
                              style={{
                                userSelect: 'none',
                                WebkitUserSelect: 'none',
                                MozUserSelect: 'none',
                                msUserSelect: 'none',
                                WebkitUserDrag: 'none',
                                KhtmlUserDrag: 'none',
                                MozUserDrag: 'none',
                                OUserDrag: 'none',
                                userDrag: 'none'
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                {/* Mobile swipe indicator - only show on mobile */}
                {isMobile && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="w-4 h-0.5 bg-white/60 rounded-full animate-pulse"></div>
                      <span className="text-white/80 text-xs font-medium">Swipe</span>
                      <div className="w-4 h-0.5 bg-white/60 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}