import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsCarousel({ tripId }) {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const getAvatarColor = (name = "") => {
    const colors = [
      "bg-blue-500",
      "bg-indigo-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-teal-500",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, "reviews"), where("tripId", "==", tripId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setReviews(data);
    };

    fetchReviews();
  }, [tripId]);

  // 🔥 Auto slide
  useEffect(() => {
    if (reviews.length === 0 || paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [reviews, paused]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) {
    return <p className="text-center text-gray-500">No reviews yet</p>;
  }

  const review = reviews[index];

  return (
    <section className="relative max-w-5xl mx-auto py-20 px-6 overflow-hidden bg-[#eef4ff] rounded-3xl">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-12 text-indigo-700"
      >
        Traveler Reviews 💬
      </motion.h2>
      <div className="flex justify-around mb-5">
        {" "}
        <button
          onClick={prevSlide}
          className="bg-white shadow-md px-4 py-2 rounded-full"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="bg-white shadow-md px-4 py-2 rounded-full"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-center gap-6">
        {/* Prev Button */}

        {/* Review Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            onClick={() => setPaused(true)} // 🔥 pause slider
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer bg-white shadow-xl border rounded-3xl p-10 text-center max-w-xl"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(
                    review.name,
                  )}`}
                >
                  {review.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < (review.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Review */}
            <p className="italic text-gray-700 text-lg">“{review.review}”</p>

            <p className="mt-4 font-semibold text-indigo-700">
              — {review.name}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
      </div>

      {/* Resume Button */}
      {paused && (
        <div className="text-center mt-6">
          <button
            onClick={() => setPaused(false)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full"
          >
            Resume Auto Slide
          </button>
        </div>
      )}
    </section>
  );
}