// components/MusicComp.jsx
"use client";

import { useEffect, useRef, useState } from "react";

import { IoVolumeMute, IoVolumeMedium } from "react-icons/io5";
import "@/styles/css/music.css"; 
export default function MusicComp({ src, autoPlay = false }: { src: string; autoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    const audio = audioRef.current;
    if (autoPlay) {
      audio?.play().catch((e) => {
        console.warn("Auto-play failed:", e);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.warn("Play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 music-height right-6 md:right-20 z-[999999] bg-[rgba(0,0,0,0.17)] p-5 rounded-[16px]  flex items-center">
      <div
        className="  bg-white p-4 lg:p-1 rounded-full shadow-lg flex items-center justify-center"
        onClick={togglePlay}
      >
        <button
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <IoVolumeMedium size={18} />
          ) : (
            <IoVolumeMute size={18} />
          )}
        </button>
        <audio ref={audioRef} loop src={src} />
      </div>
    </div>
  );
}