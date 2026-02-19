import { MessageCircle, Mail, Phone, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MobileContactButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-[999]  flex flex-col items-end gap-3">
      {/* Action Buttons */}
      <AnimatePresence>
        {open && (
          <>
            {/* Call */}
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              href="tel:98119 53565"
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
            >
              <Phone size={22} />
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              href="https://wa.me/98119 53565"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-full shadow-lg"
            >
              <MessageCircle size={22} />
            </motion.a>

            {/* Email */}
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:info@ajnabeetrip.com"
              className="bg-indigo-500 text-white p-3 rounded-full shadow-lg"
            >
              <Mail size={22} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="bg-blue-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center"
      >
        {open ? <X size={26} /> : <Plus size={26} />}
      </motion.button>
    </div>
  );
}
