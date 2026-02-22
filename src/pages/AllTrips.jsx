import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // path adjust karo
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

/* =======================
   ANIMATIONS
======================= */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AllTrip = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(collection(db, "trips"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const tripsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔥 Fetch all reviews
        const reviewSnapshot = await getDocs(collection(db, "reviews"));
        const reviews = reviewSnapshot.docs.map((doc) => doc.data());

        // 🔥 Calculate average rating per trip
        const ratingMap = {};

        reviews.forEach((review) => {
          const tripId = review.tripId;
          if (!ratingMap[tripId]) {
            ratingMap[tripId] = { total: 0, count: 0 };
          }

          ratingMap[tripId].total += review.rating;
          ratingMap[tripId].count += 1;
        });

        // 🔥 Attach rating to each trip
        const tripsWithRatings = tripsData.map((trip) => {
          const data = ratingMap[trip.id];

          return {
            ...trip,
            rating: data ? (data.total / data.count).toFixed(1) : null,
            reviewCount: data ? data.count : 0,
          };
        });

        setTours(tripsWithRatings);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <>
      {/* =======================
          FONTS + THEME
      ======================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&family=Space+Grotesk:wght@400;500;600&display=swap');

        :root {
          --bg-base: #f6f8fb;
          --bg-accent: #eef5ff;

          --ink-primary: #243047;
          --ink-muted: #5f6b7a;

          --accent-main: #0ea5e9;
          --accent-sharp: #22c55e;

          --card-bg: rgba(255,255,255,0.88);
          --card-border: rgba(36,48,71,0.08);
        }
      `}</style>

      {/* =======================
          SECTION
      ======================= */}
      <Navbar />
      <section
        className="relative py-28"
        style={{
          background: `
            radial-gradient(900px 300px at 85% 0%, rgba(34,197,94,0.14), transparent 45%),
            linear-gradient(180deg, var(--bg-base), var(--bg-accent))
          `,
        }}
      >
        <div id="popular" className="max-w-7xl mx-auto px-6">
          {/* =======================
              HEADING
          ======================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="max-w-2xl mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl leading-tight"
              style={{
                fontFamily: "Fraunces, serif",
                color: "var(--ink-primary)",
              }}
            >
              Popular Tours & Packages
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "var(--ink-muted)",
              }}
            >
              Handpicked journeys our travelers love — designed for comfort,
              beauty, and unforgettable experiences.
            </motion.p>
          </motion.div>

          {loading && (
            <p className="text-center text-lg text-gray-500">
              Loading trips...
            </p>
          )}

          {/* =======================
              TOUR CARDS
          ======================= */}
          <motion.div
            className="grid gap-10 md:grid-cols-3"
            // initial="hidden"
            // whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={container}
          >
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                variants={fadeUp}
                className="rounded-3xl overflow-hidden transition"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  fontFamily: "Space Grotesk, sans-serif",
                  zIndex: 10,
                }}
              >
                {/* IMAGE + TAG */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* LEFT TAG */}
                  {tour.tags && (
                    <span className="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-green-500 text-white shadow">
                      {tour.tags[0]}
                    </span>
                  )}

                  {/* RIGHT RATING */}
                  {/* RIGHT RATING */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold shadow">
                    ⭐
                    <span>
                      {tour.rating ? tour.rating : "New"}
                      {tour.reviewCount > 0 && (
                        <span className="text-xs text-gray-500 ml-1">
                          ({tour.reviewCount})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                {/* CONTENT */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "var(--ink-primary)" }}
                  >
                    {tour.title}
                  </h3>

                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {tour.location}
                  </p>

                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {tour.duration}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--accent-main)" }}
                    >
                      ₹{tour.price?.single}/-
                    </span>

                    <button
                      className="px-4 py-2 rounded-full text-sm font-medium transition"
                      onClick={() => navigate(`/trip/${tour.id}`)}
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-main), var(--accent-sharp))",
                        color: "white",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AllTrip;
