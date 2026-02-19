import { motion } from "framer-motion";
import Contact from "./MobileContactButtons";

export default function StickyEnquireBar({ openEnquiry }) {
  return (
    <>
      {/* Sticky Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full z-40 backdrop-blur-lg bg-white/80 border-t border-blue-100 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Text (Desktop only) */}
          <p className="hidden md:block text-gray-700 font-medium">
            ✈️ Need help planning your perfect getaway?
          </p>

          {/* Enquire Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <button
              onClick={openEnquiry}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold 
              hover:scale-105 transition duration-300 shadow-md"
            >
              Enquire Now
            </button>
          </div>
        </div>
        
      </motion.div>

      {/* Floating Contact FAB (separate, not inside bar) */}
      <Contact />
    </>
  );
}
