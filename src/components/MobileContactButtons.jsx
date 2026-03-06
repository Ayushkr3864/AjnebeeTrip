import { MessageCircle, Mail, Phone, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "./EnquiryModal"

export default function MobileContactButtons({openEnquiry}) {
  const [open, setOpen] = useState(false);
   const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-25 right-4 z-[999] flex flex-col items-end gap-3">
        {/* 🔽 Action Buttons */}
        <AnimatePresence>
          {open && (
            <>
              {/* 📞 Call */}
              <motion.a
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                whileTap={{ scale: 0.95 }}
                href="tel:9310308483"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <Phone size={18} />
                <span className="text-sm font-medium">Call Us</span>
              </motion.a>

              {/* 💬 WhatsApp */}
              <motion.a
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/9310308483"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.a>

              {/* 📧 Email */}
              <motion.a
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:info@ajnabeetrip.com"
                className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <Mail size={18} />
                <span className="text-sm font-medium">Email</span>
              </motion.a>
              <motion.button
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsModalOpen(true);
                  setOpen(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold 
              hover:scale-105 transition duration-300 shadow-md"
              >
                Enquire Now
              </motion.button>
            </>
          )}
        </AnimatePresence>
        {/* 🔘 Main Enquiry Button */}

        <>
          <div className="fixed bottom-10 right-4 z-[999] flex flex-col items-end gap-3">
            {/* 🔘 Main Enquiry Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2"
            >
              {open ? <X size={20} /> : <Plus size={20} />}
              <span className="font-semibold text-sm">
                {open ? "Close" : "Enquiry"}
              </span>
            </motion.button>
          </div>

          {/* 🔥 THIS WAS MISSING */}
          <EnquiryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      </div>
    </>
  );
}
