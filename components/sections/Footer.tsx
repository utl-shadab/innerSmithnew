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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight  title" style={{letterSpacing: "-1.16px"}}>
          Ready to take charge of
          <br />
          your emotions?
        </h2>
        <p className="text-2xl  mb-12 opacity-90 para" style={{letterSpacing: "-0.48px"}}>The tools are here. You just have to begin.</p>

        <div className="flex items-center justify-center mb-8">
          <Image
            src={logo}
            alt="InnerSmith Logo"
            width={1000}
            height={300}
            className="custom-width lg:w-[20rem] h-auto"
          />
        </div>

        <button
          onClick={() => setPopup("form")}
          className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center mx-auto mb-8 transform hover:scale-105"
        >
          JOIN THE WAITLIST
          <ArrowRight className="ml-2 w-5 h-5 -rotate-45" />
        </button>
        <p className="text-xl opacity-75">(12K+ PEOPLE HAVE ALREADY JOINED)</p>
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

      {/* Popup Container */}
      <AnimatePresence>
        {popup !== "none" && (
          <motion.div
            key="popup"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl p-8 max-w-3xl mx-auto w-full min-h-[300px]"
          >
            <div className="absolute top-10 right-12 z-10">
              <button onClick={closePopup}>
                <X className="w-9 h-9 text-white bg-black p-2 rounded-full" />
              </button>
            </div>

            {popup === "form" && (
              <div className="grid md:grid-cols-[30%_70%] bg-white rounded-3xl shadow-2xl max-w-3xl w-full mx-auto overflow-hidden">
                <div className="hidden md:block w-full max-w-sm h-full relative">
                  <img
                    src="/Footerbg.webp"
                    alt="Side visual"
                    className="w-full h-full object-cover rounded-l-3xl"
                  />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-center w-full space-y-5 bg-white">
                  <h3 className="text-3xl sm:text-4xl font-light text-gray-900">Join the Waitlist</h3>

                  <input
                    type="text"
                    placeholder="Your name here"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 placeholder-gray-400 focus:outline-none transition-colors duration-300 ${errors.name ? "border-red-500" : "border-gray-200 focus:border-gray-400"
                      }`}
                  />

                  <input
                    type="email"
                    placeholder="Your email address here"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 placeholder-gray-400 focus:outline-none transition-colors duration-300 ${errors.email ? "border-red-500" : "border-gray-200 focus:border-gray-400"
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
                <h3 className="text-4xl font-normal mb-2">Congratulations!</h3>
                <p className="text-center text-sm text-gray-600 max-w-sm">
                  You have been added to the InnerSmith waitlist.
                </p>
                <div className="w-16 h-px bg-gray-300 mx-auto my-9"></div>
                <p className=" font-medium text-black text-lg">Stay Tuned For More Updates</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}