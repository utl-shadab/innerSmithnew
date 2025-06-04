import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/public/mainLogo.svg";

export default function Footer() {
  const [popup, setPopup] = useState("none");
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

  const closePopup = () => {
    setPopup("none");
    setFormData({ name: "", email: "", zenBox: true });
    setErrors({ name: false, email: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/Footerbg.png" alt="Mountain landscape background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl hidden sm:block md:text-5xl max420:custom-footer-title lg:text-[58px] font-light mb-6" style={{ letterSpacing: "-1.16px", lineHeight: "127%" }}>
          Ready to take charge of
          <br />
          your emotions?
        </h2>
        <h2 className="text-3xl font-bold block sm:hidden md:text-5xl max420:custom-footer-title lg:text-[58px]  mb-6" style={{ letterSpacing: "-1.16px", lineHeight: "127%" }}>
          Ready to take charge 
          <br />
         of your emotions?
        </h2>
        <p className="text-2xl mb-12 opacity-90 footer-para block  sm:hidden" style={{ letterSpacing: "-0.48px" }}>The tools are here. <br /> You just have to begin.</p>
        <p className="text-2xl mb-12 opacity-90 footer-para hidden sm:block" style={{ letterSpacing: "-0.48px" }}>The tools are here. You just have to begin.</p>

        <div className="flex items-center justify-center mb-8">
          <Image
            src={logo}
            alt="InnerSmith Logo"
            width={1000}
            height={300}
            className="custom-width lg:w-[21.4rem] h-auto"
          />
        </div>

        <button
          onClick={() => setPopup("form")}
          className="bg-white text-gray-900 custom-button px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center mx-auto mb-8 transform hover:scale-105"
        >
          JOIN THE WAITLIST
          <ArrowRight className="ml-2 w-5 h-5 -rotate-45 btn-arrow" />
        </button>
        <p className="text-xl opacity-75 footer-btm">(12K+ PEOPLE HAVE ALREADY JOINED)</p>
      </div>

      {/* Background Overlay */}
      <AnimatePresence>
        {popup !== "none" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={closePopup}
          />
        )}
      </AnimatePresence>

      {/* Mobile Popup Container */}
      <AnimatePresence>
        {popup !== "none" && (
          <motion.div
            key="popup"
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="fixed sm:hidden  inset-4 z-50 flex items-center justify-center sm:inset-8 md:inset-16"
          >
            {/* Close Button */}

            {popup === "form" && (
              <div className="bg-[#f2faff] relative rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden">
                {/* Top Image */}
                <div className="w-full h-48 relative">
                  <img
                    src="/Footerbg.webp"
                    alt="Mountain landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={closePopup}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* Form Content */}
                <div className="px-6 py-8 space-y-6">
                  <h3 className="text-2xl font-medium text-gray-900  text-start mt-6">Join the Waitlist</h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name here"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 text-gray-800 text-base rounded-lg bg-white  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${errors.name ? 'ring-2 ring-red-400 border-red-400' : ''
                        }`}
                    />

                    <input
                      type="email"
                      placeholder="Your email address here"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2 text-gray-800 text-base rounded-lg bg-white  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${errors.email ? 'ring-2 ring-red-400 border-red-400' : ''
                        }`}
                    />
                  </div>
                  <div className="flex justify-between"><label className="flex items-center justify-center gap-2 text-sm font-medium text-black py-2">
                    <input
                      type="checkbox"
                      checked={formData.zenBox}
                      onChange={() => setFormData({ ...formData, zenBox: !formData.zenBox })}
                      className="w-3 h-3 accent-black cursor-pointer rounded"
                    />
                    <span className="text-xs">I WANT THE ZEN BOX</span>
                  </label>

                    <div className="flex justify-center pt-2">
                      <button
                        onClick={handleSubmit}
                        className="flex items-center justify-center gap-2 bg-white border border-black text-black px-3 py-2 text-xs font-medium rounded-[9px] hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        JOIN NOW
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </button>
                    </div></div>


                </div>
              </div>
            )}

            {popup === "success" && (
              <div className="bg-white relative rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8">
                {/* Success Icon */}
                <button
                  onClick={closePopup}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="flex justify-center mb-8">
                  <div className="w-28 h-28 bg-[#ffd8cb] rounded-full flex items-center justify-center">
                    <Image
                      src="/success.webp"
                      alt="Success"
                      width={48}
                      height={48}
                      className="w-28 h-28"
                    />
                  </div>
                </div>

                {/* Success Content */}
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-medium text-gray-900">Thanks for Signing Up!</h3>

                  <p className="text-sm text-gray-600 leading-relaxed px-2">
                    You have been added to the<br />
                    InnerSmith waitlist.
                  </p>

                  {/* Divider */}
                  <div className="flex justify-center py-4">
                    <div className="w-16 h-px bg-gray-500"></div>
                  </div>

                  <p className="text-sm font-medium text-black">
                    Stay Tuned For More Updates
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Popup (Unchanged) */}
      <AnimatePresence>
        {popup !== "none" && (
          <motion.div
            key="desktop-popup"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-0 left-0  right-0 z-50 rounded-t-3xl p-8 max-w-3xl mx-auto w-full min-h-[300px] hidden md:block"
          >
            <div className="absolute top-10 right-12 z-10">
              <button onClick={closePopup}>
                <X className="w-9 h-9 text-white bg-black p-2 rounded-full" />
              </button>
            </div>

            {popup === "form" && (
              <div className="grid md:grid-cols-[30%_70%] rounded-3xl shadow-2xl max-w-3xl w-full mx-auto overflow-hidden">
                <div className="hidden md:block w-full max-w-sm h-full relative">
                  <img
                    src="/Footerbg.webp"
                    alt="Side visual"
                    className="w-full h-full object-cover rounded-l-3xl"
                  />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-center w-full space-y-5 bg-[#F2FAFF]">
                  <h3 className="text-3xl sm:text-2xl font-custom font-light text-gray-900">Join the Waitlist</h3>

                  <input
                    type="text"
                    placeholder="Your name here"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-6 py-4 text-gray-800 text-base rounded-[4px] bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-400 ${errors.name ? 'ring-2 ring-red-400' : ''
                      }`}
                  />

                  <input
                    type="email"
                    placeholder="Your email address here"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full mt-4 px-4 py-4 text-gray-800 text-base rounded-[4px] bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-400 ${errors.email ? 'ring-2 ring-red-400' : ''
                      }`}
                  />

                  <label className="flex items-center gap-2 text-sm font-medium text-black pt-4">
                    <span>I WANT THE ZEN BOX</span>
                    <input
                      type="checkbox"
                      checked={formData.zenBox}
                      onChange={() => setFormData({ ...formData, zenBox: !formData.zenBox })}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>

                  <button
                    onClick={handleSubmit}
                    className="mt-2 flex items-center justify-center gap-2 border border-black px-6 py-3 text-sm font-medium rounded-xl w-fit hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    JOIN NOW <ArrowRight className="w-4 h-4 -rotate-45" />
                  </button>
                </div>
              </div>
            )}

            {popup === "success" && (
              <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center">
                <Image
                  src="/success.webp"
                  alt="Checkmark"
                  width={108}
                  height={108}
                  className="w-28 h-28 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-8"
                />
                <h3 className="text-4xl font-normal mb-2">Thanks For Signing Up!</h3>
                <p className="text-center text-sm text-gray-600 max-w-sm">
                  You have been added to the InnerSmith waitlist.
                  We're excited to have you on this journey.
                </p>
                <div className="w-16 h-px bg-gray-500 mx-auto my-9"></div>
                <p className="font-medium text-black text-sm">Stay Tuned For More Updates</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}