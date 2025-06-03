// "use client";
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./MobileSlider.css";

// const affectedDataSlide = [
//   { title: "970M", text: "globally experience a\nmental disorder." },
//   { title: "77%", text: "say stress affects\ntheir body." },
//   { title: "31%", text: "rank stress as their #1\nhealth concern." },
// ];

// const Stats = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const goToSlide = (index: number) => {
//     if (index === activeIndex) return;
//     setActiveIndex(index);
//     resetInterval();
//   };

//   const resetInterval = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % affectedDataSlide.length);
//     }, 4000);
//   };

//   useEffect(() => {
//     resetInterval();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   const slideVariants = {
//     enter: { opacity: 0, y: 30, scale: 0.95 },
//     center: { opacity: 1, y: 20, scale: 1 },
//     exit: { opacity: 0, y: 30, scale: 0.95 },
//   };

//   const transition = {
//     duration: 0.8,
//     ease: [0.25, 0.46, 0.45, 0.94],
//   };

//   return (
//     <section
//       className="h-screen bg-black w-screen overflow-hidden relative px-4 z-20 py-10 sm:py-16 md:py-20"
//       id="stats"
//       style={{ scrollSnapAlign: "start" }}
//     >
//       <div className="flex flex-col lg:flex-row justify-center items-center h-full w-full gap-1 md:gap-10 lg:gap-1 mx-auto">
//         <div className="stats-text font-light text-center lg:text-left whitespace-nowrap">
//           You&apos;re Not Alone ―
//         </div>

//         {/* <div className="relative w-full slider-state max-w-[486px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeIndex}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={transition}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1, duration: 0.2 }}
//               >
//                 {affectedDataSlide[activeIndex].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p
//                 className="text-white text-xl slide-text font-normal pt-2 "
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1, duration: 0.2 }}
//               >
//                 {affectedDataSlide[activeIndex].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>
//           </AnimatePresence>
//         </div> */}
//         <div
//           className="relative w-full slider-state max-w-[486px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden"
//           style={{
//             perspective: '1000px',
//             perspectiveOrigin: 'center center'
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {/* Previous slide (going down and back) */}
//             <motion.div
//               key={`prev-${activeIndex}`}
//               initial={{
//                 rotateX: 0,
//                 y: 0,
//                 z: 0,
//                 opacity: 1
//               }}
//               animate={{
//                 rotateX: -30,
//                 y: '100%',
//                 z: -300,
//                 opacity: 0.5
//               }}
//               exit={{
//                 rotateX: -60,
//                 y: '200%',
//                 z: -600,
//                 opacity: 0
//               }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transformOrigin: 'center center',
//                 zIndex: 1
//               }}
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//               >
//                 {affectedDataSlide[activeIndex > 0 ? activeIndex - 1 : affectedDataSlide.length - 1].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p className="text-white text-xl slide-text font-normal pt-2">
//                 {affectedDataSlide[activeIndex > 0 ? activeIndex - 1 : affectedDataSlide.length - 1].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>

//             {/* Current active slide */}
//             <motion.div
//               key={`current-${activeIndex}`}
//               initial={{
//                 rotateX: 30,
//                 y: '-100%',
//                 z: -300,
//                 opacity: 0.5
//               }}
//               animate={{
//                 rotateX: 0,
//                 y: 0,
//                 z: 0,
//                 opacity: 1
//               }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transformOrigin: 'center center',
//                 zIndex: 3
//               }}
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.3 }}
//               >
//                 {affectedDataSlide[activeIndex].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p
//                 className="text-white text-xl slide-text font-normal pt-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.3 }}
//               >
//                 {affectedDataSlide[activeIndex].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>

//             {/* Next slide (coming from above and back) */}
//             <motion.div
//               key={`next-${activeIndex}`}
//               initial={{
//                 rotateX: 60,
//                 y: '-200%',
//                 z: -600,
//                 opacity: 0
//               }}
//               animate={{
//                 rotateX: 30,
//                 y: '-100%',
//                 z: -300,
//                 opacity: 0.5
//               }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transformOrigin: 'center center',
//                 zIndex: 2
//               }}
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//               >
//                 {affectedDataSlide[activeIndex < affectedDataSlide.length - 1 ? activeIndex + 1 : 0].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p className="text-white text-xl slide-text font-normal pt-2">
//                 {affectedDataSlide[activeIndex < affectedDataSlide.length - 1 ? activeIndex + 1 : 0].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex gap-2 z-10">
//           {affectedDataSlide.map((_, idx) => (
//             <motion.button
//               key={idx}
//               onClick={() => goToSlide(idx)}
//               className={`rounded-full h-3 flex-shrink-0 cursor-pointer ${idx === activeIndex ? "bg-[#FF7171]" : "bg-[#FF7171]/50"
//                 }`}
//               animate={{
//                 width: idx === activeIndex ? 48 : 24,
//                 backgroundColor:
//                   idx === activeIndex ? "#FF7171" : "rgba(255, 113, 113, 0.5)",
//               }}
//               whileHover={{
//                 scale: 1.1,
//                 backgroundColor:
//                   idx === activeIndex
//                     ? "#FF7171"
//                     : "rgba(255, 113, 113, 0.7)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Stats;

// "use client";
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./MobileSlider.css";

// const affectedDataSlide = [
//   { title: "970M", text: "globally experience a\nmental disorder." },
//   { title: "77%", text: "say stress affects\ntheir body." },
//   { title: "31%", text: "rank stress as their #1\nhealth concern." },
// ];

// const Stats = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const goToSlide = (index: number) => {
//     if (index === activeIndex) return;
//     setActiveIndex(index);
//     resetInterval();
//   };

//   const resetInterval = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % affectedDataSlide.length);
//     }, 4000);
//   };

//   useEffect(() => {
//     resetInterval();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   const slideVariants = {
//     enter: { opacity: 0, y: 30, scale: 0.95 },
//     center: { opacity: 1, y: 20, scale: 1 },
//     exit: { opacity: 0, y: 30, scale: 0.95 },
//   };

//   const transition = {
//     duration: 0.8,
//     ease: [0.25, 0.46, 0.45, 0.94],
//   };

//   return (
//     <section
//       className="h-screen bg-black w-screen overflow-hidden relative px-4 z-20 py-10 sm:py-16 md:py-20"
//       id="stats"
//       style={{ scrollSnapAlign: "start" }}
//     >
//       <div className="flex flex-col lg:flex-row justify-center items-center h-full w-full gap-1 md:gap-10 lg:gap-1 mx-auto">
//         <div className="stats-text font-light text-center lg:text-left whitespace-nowrap">
//           You&apos;re Not Alone ―
//         </div>

//         {/* <div className="relative w-full slider-state max-w-[486px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeIndex}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={transition}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1, duration: 0.2 }}
//               >
//                 {affectedDataSlide[activeIndex].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p
//                 className="text-white text-xl slide-text font-normal pt-2 "
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1, duration: 0.2 }}
//               >
//                 {affectedDataSlide[activeIndex].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>
//           </AnimatePresence>
//         </div> */}
//         <div
//           className="relative w-full slider-state max-w-[486px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden"
//           style={{
//             perspective: '1000px',
//             perspectiveOrigin: 'center center'
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {/* Previous slide (going down and back) */}
//             <motion.div
//               key={`prev-${activeIndex}`}
//               initial={{
//                 rotateX: 0,
//                 y: 0,
//                 z: 0,
//                 opacity: 1
//               }}
//               animate={{
//                 rotateX: -30,
//                 y: '100%',
//                 z: -300,
//                 opacity: 0.5
//               }}
//               exit={{
//                 rotateX: -60,
//                 y: '200%',
//                 z: -600,
//                 opacity: 0
//               }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transformOrigin: 'center center',
//                 zIndex: 1
//               }}
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//               >
//                 {affectedDataSlide[activeIndex > 0 ? activeIndex - 1 : affectedDataSlide.length - 1].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p className="text-white text-xl slide-text font-normal pt-2">
//                 {affectedDataSlide[activeIndex > 0 ? activeIndex - 1 : affectedDataSlide.length - 1].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>

//             {/* Current active slide */}
//             <motion.div
//               key={`current-${activeIndex}`}
//               initial={{
//                 rotateX: 30,
//                 y: '-100%',
//                 z: -300,
//                 opacity: 0.5
//               }}
//               animate={{
//                 rotateX: 0,
//                 y: 0,
//                 z: 0,
//                 opacity: 1
//               }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transformOrigin: 'center center',
//                 zIndex: 3
//               }}
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.3 }}
//               >
//                 {affectedDataSlide[activeIndex].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p
//                 className="text-white text-xl slide-text font-normal pt-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.3 }}
//               >
//                 {affectedDataSlide[activeIndex].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>

//             {/* Next slide (coming from above and back) */}
//             <motion.div
//               key={`next-${activeIndex}`}
//               initial={{
//                 rotateX: 60,
//                 y: '-200%',
//                 z: -600,
//                 opacity: 0
//               }}
//               animate={{
//                 rotateX: 30,
//                 y: '-100%',
//                 z: -300,
//                 opacity: 0.5
//               }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.25, 0.1, 0.25, 1]
//               }}
//               className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transformOrigin: 'center center',
//                 zIndex: 2
//               }}
//             >
//               <motion.h1
//                 className="text-[#FF7171] text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
//               >
//                 {affectedDataSlide[activeIndex < affectedDataSlide.length - 1 ? activeIndex + 1 : 0].title}
//                 <span className="uppercase text-2xl people font-normal ml-2">
//                   PEOPLE
//                 </span>
//               </motion.h1>
//               <motion.p className="text-white text-xl slide-text font-normal pt-2">
//                 {affectedDataSlide[activeIndex < affectedDataSlide.length - 1 ? activeIndex + 1 : 0].text
//                   .split("\n")
//                   .map((line, i, arr) => (
//                     <span key={i}>
//                       {line}
//                       {!isMobile && i < arr.length - 1 && <br />}
//                     </span>
//                   ))}
//               </motion.p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex gap-2 z-10">
//           {affectedDataSlide.map((_, idx) => (
//             <motion.button
//               key={idx}
//               onClick={() => goToSlide(idx)}
//               className={`rounded-full h-3 flex-shrink-0 cursor-pointer ${idx === activeIndex ? "bg-[#FF7171]" : "bg-[#FF7171]/50"
//                 }`}
//               animate={{
//                 width: idx === activeIndex ? 48 : 24,
//                 backgroundColor:
//                   idx === activeIndex ? "#FF7171" : "rgba(255, 113, 113, 0.5)",
//               }}
//               whileHover={{
//                 scale: 1.1,
//                 backgroundColor:
//                   idx === activeIndex
//                     ? "#FF7171"
//                     : "rgba(255, 113, 113, 0.7)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Stats;

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MobileSlider.css";

const affectedDataSlide = [
  { title: "970M", text: "globally experience a\nmental disorder." },
  { title: "77%", text: "say stress affects\ntheir body." },
  { title: "31%", text: "rank stress as their #1\nhealth concern." },
];

const Stats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % affectedDataSlide.length);
    }, 4000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      className="h-screen bg-black w-screen overflow-hidden relative px-4 z-20 py-10 sm:py-16 md:py-20"
      id="stats"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center h-full w-full gap-1 md:gap-10 lg:gap-1 mx-auto">
        <div className="w-full lg:w-2/5 ml-1 lg:ml-20 flex justify-center lg:justify-end items-center">
          <div className="stats-text font-light text-center lg:text-start whitespace-nowrap mb-4 lg:mb-0">
            You're Not Alone ―
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
          <div
            className="relative w-full slider-state max-w-[486px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[250px] sm:h-[280px] md:h-[300px] lg:h-[400px] overflow-hidden"
            style={{
              perspective: "1000px",
              perspectiveOrigin: "center center",
            }}
          >
            <AnimatePresence mode="wait">
            
              <motion.div
                key={`prev-${activeIndex}`}
                initial={{
                  rotateX: 0,
                  y: 0,
                  z: 0,
                  opacity: 1,
                }}
                animate={{
                  rotateX: -30,
                  y: "100%",
                  z: -300,
                  opacity: 0.5,
                }}
                exit={{
                  rotateX: -60,
                  y: "200%",
                  z: -600,
                  opacity: 0,
                }}
               
                transition={{
                  duration: 2,
                  ease: [0.4, 0, 0.2, 1], 
                }}
                className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  zIndex: 1,
                }}
              >
                <motion.h1 className="text-[#FF7171] text-4xl sm:text-5xl md:text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2">
                  {affectedDataSlide[
                    activeIndex > 0 ? activeIndex - 1 : affectedDataSlide.length - 1
                  ].title}
                  <span className="uppercase text-lg sm:text-xl md:text-2xl people font-normal ml-2">
                    PEOPLE
                  </span>
                </motion.h1>
                <motion.p className="text-white text-base sm:text-lg md:text-xl slide-text font-normal pt-2">
                  {affectedDataSlide[
                    activeIndex > 0 ? activeIndex - 1 : affectedDataSlide.length - 1
                  ].text
                    .split("\n")
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </motion.p>
              </motion.div>

        
              <motion.div
                key={`current-${activeIndex}`}
                initial={{
                  rotateX: 30,
                  y: "-100%",
                  z: -300,
                  opacity: 0.5,
                }}
                animate={{
                  rotateX: 0,
                  y: 0,
                  z: 0,
                  opacity: 1,
                }}
               
                transition={{
                  duration: 2, 
                  ease: [0.4, 0, 0.2, 1], 
                }}
                className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  zIndex: 3,
                }}
              >
                <motion.h1
                  className="text-[#FF7171] text-4xl sm:text-5xl md:text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2"
                  
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                 transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {affectedDataSlide[activeIndex].title}
                  <span className="uppercase text-lg sm:text-xl md:text-2xl people font-normal ml-2">
                    PEOPLE
                  </span>
                </motion.h1>
                <motion.p
                  className="text-white text-base sm:text-lg md:text-xl slide-text font-normal pt-2"
                  
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }} 
                >
                  {affectedDataSlide[activeIndex].text
                    .split("\n")
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </motion.p>
              </motion.div>

              {/* Next slide */}
              <motion.div
                key={`next-${activeIndex}`}
                initial={{
                  rotateX: 60,
                  y: "-200%",
                  z: -600,
                  opacity: 0,
                }}
                animate={{
                  rotateX: 30,
                  y: "-100%",
                  z: -300,
                  opacity: 0.5,
                }}
               
                transition={{
                  duration: 2, 
                  ease: [0.4, 0, 0.2, 1], 
                }}
                className="absolute top-0 left-0 lg:left-20 w-full h-full flex flex-col justify-center items-start px-4 text-left"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  zIndex: 2,
                }}
              >
                <motion.h1 className="text-[#FF7171] text-4xl sm:text-5xl md:text-6xl state-heading font-bold leading-none border-b-2 border-[#FF7171] pb-2">
                  {affectedDataSlide[
                    activeIndex < affectedDataSlide.length - 1 ? activeIndex + 1 : 0
                  ].title}
                  <span className="uppercase text-lg sm:text-xl md:text-2xl people font-normal ml-2">
                    PEOPLE
                  </span>
                </motion.h1>
                <motion.p className="text-white text-base sm:text-lg md:text-xl slide-text font-normal pt-2">
                  {affectedDataSlide[
                    activeIndex < affectedDataSlide.length - 1 ? activeIndex + 1 : 0
                  ].text
                    .split("\n")
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

         
          <div className="absolute bottom-[15%] sm:bottom-[10%] left-36 lg:left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {affectedDataSlide.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full h-3 flex-shrink-0 cursor-pointer ${idx === activeIndex ? "bg-[#FF7171]" : "bg-[#FF7171]/50"
                  }`}
             
                animate={{
                  width: idx === activeIndex ? 48 : 24,
                  backgroundColor:
                    idx === activeIndex ? "#FF7171" : "rgba(255, 113, 113, 0.5)",
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor:
                    idx === activeIndex
                      ? "#FF7171"
                      : "rgba(255, 113, 113, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }} 
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;