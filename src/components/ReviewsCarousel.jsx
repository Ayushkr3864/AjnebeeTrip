import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsCarousel({ tripId }) {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // success popup

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("tripId", "==", tripId),
        orderBy("createdAt", "desc"),
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setReviews(data);
    };

    fetchReviews();
  }, [tripId]);

  useEffect(() => {
    if (reviews.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [reviews]);

  // 🔥 show popup whenever review changes (optional effect)
  useEffect(() => {
    if (reviews.length > 0) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  }, [index]);

  if (reviews.length === 0) {
    return <p className="text-center text-gray-500">No reviews yet</p>;
  }

  const review = reviews[index];

  return (
    <section className="relative max-w-5xl mx-auto py-20 px-6 overflow-hidden bg-[#eef4ff] rounded-3xl">
      {/* 🔵 Floating Shapes */}
      <div className="absolute w-60 h-60 bg-blue-200 rounded-full top-[-40px] left-[-40px] opacity-40 animate-pulse"></div>
      <div className="absolute w-40 h-40 bg-indigo-200 rounded-full bottom-[-30px] right-[-30px] opacity-40 animate-bounce"></div>
      <div className="absolute w-24 h-24 bg-sky-200 rounded-full top-[40%] left-[10%] opacity-30 animate-ping"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-12 text-indigo-700"
      >
        Traveler Reviews 💬
      </motion.h2>

      {/* Review Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 rounded-3xl p-10 text-center max-w-2xl mx-auto"
        >
          {/* ⭐ Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star
                  size={20}
                  className={
                    i < (review.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </motion.div>
            ))}
          </div>

          {/* Review text */}
          <p className="italic text-gray-700 text-lg leading-relaxed">
            “{review.review}”
          </p>

          {/* Name */}
          <p className="mt-5 font-semibold text-indigo-700 text-lg">
            — {review.name}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 🎉 Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute top-5 left-1/2 -translate-x-1/2 bg-white shadow-lg border px-6 py-3 rounded-full text-green-600 font-semibold"
          >
            ✨ New Review Loaded
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
