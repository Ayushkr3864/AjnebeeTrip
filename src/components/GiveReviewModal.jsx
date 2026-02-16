import { useState } from "react";
import { Star, X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function GiveReviewModal({ onClose, tripId }) {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    review: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await addDoc(collection(db, "reviews"), {
        tripId,
        name: form.name,
        contact: form.contact,
        rating,
        review: form.review,
        createdAt: serverTimestamp(),
      });

      setShowPopup(true);

      // close modal after short delay
      setTimeout(() => {
        setShowPopup(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden">
      {/* 🔵 floating shapes */}
      <div className="absolute w-60 h-60 bg-blue-200 rounded-full top-[-40px] left-[-40px] opacity-40 animate-pulse"></div>
      <div className="absolute w-40 h-40 bg-indigo-200 rounded-full bottom-[-30px] right-[-30px] opacity-40 animate-bounce"></div>

      {/* 🧊 Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        className="relative bg-[#eef4ff] border border-blue-100 shadow-xl rounded-3xl w-full max-w-md p-6 overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:scale-110 transition"
        >
          <X />
        </button>

        <h3 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Share Your Experience 💬
        </h3>

        {/* ⭐ Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                size={28}
                onClick={() => setRating(i)}
                className={`cursor-pointer transition ${
                  i <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* 📝 Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Phone / Email"
            required
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 outline-none transition"
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />

          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            placeholder="Write your experience..."
            required
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-2 h-24 outline-none transition"
            onChange={(e) => setForm({ ...form, review: e.target.value })}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
            type="submit"
            className={`w-full py-3 rounded-full font-semibold text-lg transition ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </motion.button>
        </form>

        {/* 🎉 Success Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-full text-green-600 font-semibold"
            >
              🎉 Review Submitted!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
