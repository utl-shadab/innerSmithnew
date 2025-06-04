"use client"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import type { Swiper as swp } from "swiper/types"

gsap.registerPlugin(ScrollTrigger)

const AppSlides = [
  {
    title: "Wellness, simplified.",
    content: "Holistic and personalized tools designed to help you feel better, anytime, anywhere.",
    imgLink: "/svgs/mobileSlider/wellness.svg",
  },
  {
    title: "Feel Supported",
    content: "A community that reminds you that you're never in this alone.",
    imgLink: "/svgs/mobileSlider/feelSupport.svg",
  },
  {
    title: "Shift Your Mindset",
    content: "Psychologically proven techniques like CBT & EFT to rewire negative thinking.",
    imgLink: "/svgs/mobileSlider/ShiftMind.svg",
  },
  {
    title: "Quiet Your Mind",
    content: "Powerful meditations & sensory resets for instant relief and balance.",
    imgLink: "/svgs/mobileSlider/QueitMind.svg",
  },
  {
    title: "Heal Creatively",
    content: "Art-based therapy, music, movement, and other expressive outlets for when words aren't enough.",
    imgLink: "/svgs/mobileSlider/Heal.svg",
  },
  {
    title: "Let It Out",
    content: "Venting spaces & guided reflections to process and heal, judgment-free.",
    imgLink: "/svgs/mobileSlider/LetitOut.svg",
  },
]

export default function App() {
  const isMobile = useIsMobile()
  const swiperRef = useRef<swp>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const phoneFrameRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 30,
      })
      gsap.set(phoneFrameRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
      })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          phoneFrameRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.2",
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.autoplay?.stop()
      swiperRef.current.slideToLoop(index)
      swiperRef.current.autoplay?.start()
    }
  }

  const slideVariants = {
    enter: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1],
      },
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const transition = {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
  }

  return (
    <section ref={sectionRef} className="h-screen w-full bg-[#F1F3F9] relative overflow-hidden flex items-stretch sm:items-center ">
      <div className="w-full mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-mobile gap-6 sm:gap-12 lg:gap-16 items-center">

          <div ref={textContentRef} className="lg:col-span-7 flex flex-col space-y-2 md:space-y-6 justify-center text-center lg:text-left order-2 lg:order-1">
            <h3 ref={titleRef} className="text-lg title main-title lg:text-xl text-[#6AA7BB] font-medium tracking-wide  ">
              Inside The App
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="space-y-6"
              >
                <p className="para problem-heading-main text-left text-[#515151] font-[300] max-sm:text-center ">
                  <span className="problem-headings font-[400] text-black"> {AppSlides[activeIndex].title}{" "} <br /></span>
                  {AppSlides[activeIndex].content}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center  space-x-3 pt-2 md:pt-6 lg:justify-start 
               absolute bottom-10 sm:bottom-6 manage-dots left-1/2 -translate-x-1/2 
               lg:relative lg:bottom-auto lg:left-auto lg:translate-x-0">
              {AppSlides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2.5 rounded-full cursor-pointer ${index === activeIndex ? "bg-teal-600" : "bg-gray-300"
                    }`} style={{ width: index === activeIndex ? 40 : 10 }}
                  animate={{
                    width: index === activeIndex ? 40 : 10,
                    backgroundColor: index === activeIndex ? "#0d9488" : "#d1d5db",
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: index === activeIndex ? "#0d9488" : "#9ca3af",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div ref={phoneFrameRef} className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <div className="relative lg:static">
              <div className="frame-size relative h-[76vw] w-[40vw] sm:h-[85vw] sm:w-[45vw] md:w-[35vw] md:h-[66vw] lg:w-[19vw] lg:h-[36vw] xl:w-[330px] xl:h-[620px]">


                <div className="absolute inset-0 z-20 pointer-events-none">
                  <Image
                    src="/svgs/mobileScreen.svg"
                    alt="Phone frame"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                <div className="absolute inset-0 z-10">
                  <div className="absolute top-[1.5%] left-[7%] right-[7%] bottom-[1.5%] rounded-sm md:rounded-[8px] lg:rounded-[12px] xl:rounded-[12px] overflow-hidden">
                    <Swiper
                      modules={[Autoplay, Navigation]}
                      slidesPerView={1}
                      spaceBetween={0}
                      speed={600}
                      navigation={false}
                      centeredSlides={true}
                      allowTouchMove={true}
                      grabCursor={true}
                      touchRatio={1}
                      threshold={10}
                      touchAngle={45}
                      longSwipesRatio={0.5}
                      longSwipesMs={300}
                      shortSwipes={true}
                      preventClicks={false}
                      preventClicksPropagation={false}
                      simulateTouch={true}
                      touchStartPreventDefault={false}
                      touchStartForcePreventDefault={false}
                      touchMoveStopPropagation={false}
                      resistance={true}
                      resistanceRatio={0.85}
                      watchSlidesProgress={true}
                      watchOverflow={true}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                      }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper
                      }}
                      onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex)
                      }}
                      onTouchStart={() => {

                        if (swiperRef.current?.autoplay) {
                          swiperRef.current.autoplay.stop()
                        }
                      }}
                      onTouchEnd={() => {

                        setTimeout(() => {
                          if (swiperRef.current?.autoplay) {
                            swiperRef.current.autoplay.start()
                          }
                        }, 3000)
                      }}
                      loop={true}
                      className="w-full h-full touch-pan-x touch-pan-y select-none"
                      style={{
                        touchAction: 'pan-x pan-y',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                      }}
                      cssMode={false}
                    >
                      {AppSlides.map((slide, index) => (
                        <SwiperSlide key={index} className="relative select-none">
                          <div className="relative w-full h-full select-none" style={{ userSelect: 'none' }}>
                            <Image
                              src={slide.imgLink || "/placeholder.svg"}
                              alt={slide.title}
                              fill
                              className="object-cover object-center select-none"
                              sizes="(max-width: 1024px) 340px, (max-width: 1280px) 280px, 420px"
                              priority={index === 0}
                              draggable={false}
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
        </div>
      </div>


    </section>
  )
}