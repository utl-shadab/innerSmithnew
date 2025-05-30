"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/mainLogo.svg";
import './MobileSlider.css'
export default function Footer() {
  const [popup, setPopup] = useState<"none" | "form" | "success">("none");
  const [formData, setFormData] = useState({ name: "", email: "", zenBox: true });
  const [errors, setErrors] = useState({ name: false, email: false });

  const validate = () => {
    const nameValid = formData.name.trim().length > 0;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    setErrors({ name: !nameValid, email: !emailValid });
    return nameValid && emailValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setPopup("success");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center relative"
      id="footer"
      style={{ scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/Footerbg.png" alt="Mountain landscape background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight title">
          Ready to take charge of
          <br />
          your emotions?
        </h2>
        <p className="text-lg md:text-xl mb-12 opacity-90 para">The tools are here. You just have to begin.</p>

        
        <div className="flex items-center justify-center mb-8">

          <Image
            src={logo}
            alt="InnerSmith Logo"
            width={1000}
            height={300}
            className="custom-width lg:w-[20rem] h-auto"
          />
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setPopup("form")}
          className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-100 transition-colors button-custom duration-300 flex items-center mx-auto mb-8"
        >
          JOIN THE WAITLIST
          <ArrowRight className="ml-2 w-5 h-5 -rotate-45 arrow" />
        </button>
        <p className="text-sm opacity-75 title">(12K+ PEOPLE HAVE ALREADY JOINED)</p>
      </div>
      <AnimatePresence>
        {popup !== "none" && (
          <motion.div
            key="popup"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl  shadow-2xl p-8 max-w-3xl mx-auto w-full min-h-[300px]"
          >
            <div className="flex justify-end">
              <button onClick={() => setPopup("none")}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {popup === "form" && (
              <div className="grid md:grid-cols-[30%_70%] bg-white rounded-t-3xl shadow-2xl max-w-3xl w-full mx-auto overflow-hidden">
               
                <div className="hidden md:block w-full max-w-sm h-full relative">
                  <Image
                    src="/Footerbg.webp"
                    alt="Side visual"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-l-3xl"
                  />
                </div>

              
                <div className="p-6 sm:p-8 flex flex-col justify-center w-full space-y-5 bg-green-100">
                  <h3 className="text-3xl sm:text-4xl font-light text-gray-900">Join the Waitlist</h3>

                  <input
                    type="text"
                    placeholder="Your name here"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 text-base  placeholder-gray-400 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                  />

                  <input
                    type="email"
                    placeholder="Your email address here"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 text-base  placeholder-gray-400 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                  />

                  <label className="flex items-center space-x-2 text-sm font-medium text-black">
                    <span>I WANT THE ZEN BOX</span>
                    <input
                      type="checkbox"
                      checked={formData.zenBox}
                      onChange={() => setFormData({ ...formData, zenBox: !formData.zenBox })}
                      className="w-4 h-4 accent-black border-gray-950 "
                    />
                  </label>

                  <button
                    onClick={handleSubmit}
                    className="mt-2 flex items-center justify-center gap-2 border border-black px-6 py-3 text-sm font-medium rounded-xl w-fit hover:bg-black hover:text-white transition"
                  >
                    JOIN NOW <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}


            {popup === "success" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-full h-full flex justify-center mb-4">
                  <Image src="/success.webp" alt="Confetti" width={124} height={124} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Congratulations!</h3>
                <p className="text-center text-gray-600 max-w-sm">
                  You have been added to the InnerSmith waitlist.
                </p>
                <p className="mt-4 font-medium text-black">Stay Tuned For More Updates</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}