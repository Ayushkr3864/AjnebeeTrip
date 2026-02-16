import { motion } from "framer-motion";

export default function StickyEnquireBar({ openEnquiry }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 w-full z-40 backdrop-blur-lg bg-white/80 border-t border-blue-100 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text */}
        <p className="text-gray-700 font-medium text-center md:text-left">
          ✈️ Need help planning your perfect getaway?
        </p>

        {/* Button */}
        <button
          onClick={openEnquiry}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition duration-300 shadow-md"
        >
          Enquire Now
        </button>
      </div>
    </motion.div>
  );
}
