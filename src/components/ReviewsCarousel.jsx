import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Star } from "lucide-react";

export default function ReviewsCarousel({ tripId }) {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("tripId", "==", tripId),
        where("approved", "==", true), // 🔥 ONLY APPROVED
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

  if (reviews.length === 0) {
    return <p className="text-center text-gray-500">No reviews yet</p>;
  }

  const review = reviews[index];

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Traveler Reviews</h2>

      <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <p className="italic text-gray-700">“{review.review}”</p>

        <p className="mt-4 font-semibold">{review.name}</p>
      </div>
    </section>
  );
}
