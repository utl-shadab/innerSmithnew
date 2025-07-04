"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function FirstViewRef() {
    const firstViewRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                firstViewRef.current?.children || [],
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    delay: 1,
                }
            );

            gsap.fromTo(
                logoRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.2 }
            );

            gsap.fromTo(
                imageRef.current,
                { scale: 1 },
                {
                    scale: 1.2,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.5,
                }
            );

            gsap.fromTo(
                overlayRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.5,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative h-screen z-10">
            <div ref={imageRef} className="absolute inset-0 z-0">
                <Image
                    src="/images/heroFullbgfirst.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div ref={overlayRef} className="absolute inset-0 bg-black/65 z-10" />
            </div>

            <div ref={logoRef} className="absolute top-12 left-28 z-20">
                <Image src="/mainLogomini.svg" width={74} height={74} alt="Logo" />
            </div>

            <div
                ref={firstViewRef}
                className="relative z-30 flex flex-col items-center justify-center h-full text-white px-4"
            >
                <div className="text-center max-w-6xl mx-auto">
                    <p className="hero-para">Stress is a loop that keeps you stuck.</p>
                    <h1 className="font-light tracking-normal custom-size">InnerSmith</h1>
                    <p className="second-custom hero-para">
                        helps you break free and
                        <br className="block sm:hidden" />
                        <em className="italic secondText mx-0 md:mx-2">
                            Feel Better, Live Better.
                        </em>
                    </p>
                    <div className="flex flex-col items-center mt-10 gap-3">
                        <div className="animate-bounce">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="41"
                                height="40"
                                viewBox="0 0 41 40"
                                fill="none"
                            >
                                <mask
                                    id="mask0_682_20273"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="41"
                                    height="40"
                                >
                                    <rect x="0.5" width="40" height="40" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_682_20273)">
                                    <path
                                        d="M20.5009 36.6666C17.2787 36.6666 14.5287 35.5277 12.2509 33.2499C9.97312 30.9721 8.83423 28.2221 8.83423 24.9999V14.9999C8.83423 11.7777 9.97312 9.0277 12.2509 6.74992C14.5287 4.47214 17.2787 3.33325 20.5009 3.33325C23.7231 3.33325 26.4731 4.47214 28.7509 6.74992C31.0287 9.0277 32.1676 11.7777 32.1676 14.9999V24.9999C32.1676 28.2221 31.0287 30.9721 28.7509 33.2499C26.4731 35.5277 23.7231 36.6666 20.5009 36.6666ZM22.1676 14.9999H28.8342C28.8342 12.9999 28.2023 11.236 26.9384 9.70825C25.6745 8.18047 24.0842 7.22214 22.1676 6.83325V14.9999ZM12.1676 14.9999H18.8342V6.83325C16.9176 7.22214 15.3273 8.18047 14.0634 9.70825C12.7995 11.236 12.1676 12.9999 12.1676 14.9999ZM20.5009 33.3333C22.8065 33.3333 24.7717 32.5208 26.3967 30.8958C28.0217 29.2708 28.8342 27.3055 28.8342 24.9999V18.3333H12.1676V24.9999C12.1676 27.3055 12.9801 29.2708 14.6051 30.8958C16.2301 32.5208 18.1953 33.3333 20.5009 33.3333Z"
                                        fill="#EBEBEB"
                                    />
                                </g>
                            </svg>
                        </div>
                        <p className="text-sm uppercase tracking-wider">Scroll to Continue</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
