import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Star } from "lucide-react";

const TestimonialsInfinite = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH REVIEWS ================= */
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTestimonials(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  /* ================= STAR RENDER FUNCTION ================= */
  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <>
      <style>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <section className="py-28 overflow-hidden bg-[#f6f8fb]">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 font-serif text-[#243047]">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-[#5f6b7a]">
            Real experiences from people who traveled with Ajnabee Trip.
          </p>
        </div>

        <div className="relative w-full">
          {loading ? (
            <p className="text-center text-gray-500">Loading reviews...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No reviews yet.</p>
          ) : (
            <div className="marquee">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="mx-4 w-[320px] shrink-0 rounded-3xl p-6 bg-white border-2 border-[#101828]"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={t.photo || "https://via.placeholder.com/50"}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-[#243047]">{t.name}</h4>
                      <p className="text-sm text-[#5f6b7a]">{t.location}</p>
                    </div>
                  </div>

                  {/* ⭐ Stars */}
                  <div className="flex gap-1 mb-3">{renderStars(t.rating)}</div>

                  <p className="text-sm leading-relaxed text-[#5f6b7a]">
                    “{t.review}”
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TestimonialsInfinite;
