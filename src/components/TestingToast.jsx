import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

export default function TestingToast({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="flex items-center gap-3 rounded-xl bg-[#0f172a] border border-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
            <Info size={18} className="text-amber-400" />
            <p className="text-sm text-gray-200">
              You are viewing the site in{" "}
              <span className="text-amber-400 font-semibold">
                Testing mode — we’re going live soon. Some features may be
                unavailable.
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
