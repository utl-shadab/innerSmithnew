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
    imgLink: "/images/app-section.png",
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
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          phoneFrameRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.4",
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  const slideVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  }

  const transition = {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
  }

  return (
    <section ref={sectionRef} className="h-screen w-full bg-[#F1F3F9] relative overflow-hidden flex items-center">
      <div className="w-full mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-mobile gap-12 lg:gap-16 items-center">
        
          <div ref={textContentRef} className="lg:col-span-7 flex flex-col space-y-6 justify-center text-center lg:text-left order-2 lg:order-1">
            <h3 ref={titleRef} className="text-lg title main-title lg:text-xl text-[#6AA7BB] font-medium tracking-wide uppercase mb-6">
              INSIDE THE APP
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
                <h2 className="text-4xl problem-span font-light leading-tight text-gray-900">
                  {AppSlides[activeIndex].title}
                </h2>
                <p className="text-lg problem-heading text-center lg:text-left leading-relaxed para text-gray-600 w-full lg:max-w-2xl">
                  {AppSlides[activeIndex].content}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center lg:justify-start space-x-3 pt-6">
              {AppSlides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2.5 rounded-full cursor-pointer ${
                    index === activeIndex ? "bg-teal-600" : "bg-gray-300"
                  }`}
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
            <div className="relative">
              <div className="frame-size relative h-[76vw] w-[40vw] sm:h-[85vw] sm:w-[45vw] md:w-[35vw] md:h-[66vw] lg:w-[19vw] lg:h-[36vw] xl:w-[330px] xl:h-[620px]">
               
                <div className="absolute inset-0 z-20">
                  <Image
                    src="/svgs/mobileScreen.svg"
                    alt="Phone frame"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                <div className="absolute inset-0 z-10">
                  <div className="absolute top-[1.5%] left-[7%] right-[7%] bottom-[1.5%] rounded-[28px] lg:rounded-[12px] xl:rounded-[12px] overflow-hidden">
                    <Swiper
                      modules={[Autoplay, Navigation]}
                      slidesPerView={1}
                      spaceBetween={0}
                      speed={800}
                      navigation={false}
                      centeredSlides={true}
                      allowTouchMove={true}
                      grabCursor={true}
                      touchRatio={1}
                      threshold={10}
                      longSwipesRatio={0.5}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper
                      }}
                      onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex)
                      }}
                      loop={true}
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