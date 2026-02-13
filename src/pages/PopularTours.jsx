import { motion } from "framer-motion";
import { useEffect, useState,useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // path adjust karo

import { ChevronLeft, ChevronRight } from "lucide-react";

import {useNavigate } from "react-router-dom"
/* =======================
   TOUR DATA
======================= */
// const tours = [
//   {
//     title: "Himalayan Escape",
//     location: "Himachal • Uttarakhand",
//     duration: "7 Days / 6 Nights",
//     price: "From ₹11,999/-",
//     tag: "Popular",
//     image: "/Himachal.jpeg",
//   },
//   {
//     title: "Goa Coastal Bliss",
//     location: "Goa",
//     duration: "5 Days / 4 Nights",
//     price: "From ₹9,499/-",
//     tag: "Best Seller",
//     image: "/Goa.jpeg",
//   },
//   {
//     title: "Royal Rajasthan",
//     location: "Jaipur • Jodhpur • Udaipur",
//     duration: "6 Days / 5 Nights",
//     price: "From ₹6,999/-",
//     tag: "New",
//     image: "/Rajasthan.jpeg",
//   },

//   {
//     title: "Kerala Backwater Retreat",
//     location: "Alleppey • Munnar • Kochi",
//     duration: "6 Days / 5 Nights",
//     price: "From ₹22,999/-",
//     tag: "Relaxing",
//     image: "/Kerala.jpeg",
//   },
//   {
//     title: "Kashmir Paradise Tour",
//     location: "Srinagar • Gulmarg • Pahalgam",
//     duration: "5 Days / 4 Nights",
//     price: "From ₹14,999/-",
//     tag: "Trending",
//     image: "https://images.unsplash.com/photo-1548013146-72479768bada",
//   },
//   {
//     title: "Andaman Island Getaway",
//     location: "Port Blair • Havelock",
//     duration: "5 Days / 4 Nights",
//     price: "From ₹22,999/-",
//     tag: "Premium",
//     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//   },
// ];

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

const PopularTours = () => {
  
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);


  // useEffect(() => {
  //   const container = scrollRef.current;
  //   if (!container) return;

  //   const autoScroll = setInterval(() => {
  //     if (!isHovered) {
  //       container.scrollBy({ left: 300, behavior: "smooth" });

  //       // loop back to start
  //       if (
  //         container.scrollLeft + container.clientWidth >=
  //         container.scrollWidth - 10
  //       ) {
  //         container.scrollTo({ left: 0, behavior: "smooth" });
  //       }
  //     }
  //   }, 3000);

  //   return () => clearInterval(autoScroll);
  // }, [isHovered]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(
          collection(db, "trips"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const tripsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTours(tripsData);
        console.log("popular tripsData",tripsData);
        
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);
  // const scrollToIndex = (index) => {
  //   const container = scrollRef.current;
  //   if (!container) return;

  //   const cardWidth = 300; // card + gap
  //   container.scrollTo({
  //     left: index * cardWidth,
  //     behavior: "smooth",
  //   });

  //   setActiveIndex(index);
  // };
  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 300; // card + gap
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const scroll = (direction) => {
    const newIndex =
      direction === "left"
        ? Math.max(activeIndex - 1, 0)
        : Math.min(activeIndex + 1, tours.length - 1);

    scrollToIndex(newIndex);
  };

  // useEffect(() => {
  //   if (!tours.length) return;

  //   const auto = setInterval(() => {
  //     if (!isHovered && activeIndex < tours.length - 1) {
  //       scrollToIndex(activeIndex + 1);
  //     }
  //   }, 4500);

  //   return () => clearInterval(auto);
  // }, [isHovered, activeIndex, tours.length]);
const handleScroll = () => {
  const container = scrollRef.current;
  if (!container) return;

  const cardWidth = 300;
  const index = Math.round(container.scrollLeft / cardWidth);
  setActiveIndex(index);
};





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
    TOUR CARDS (SCROLLABLE)
======================= */}
          <div className="relative">
            {/* VIEW ALL BUTTON */}
            <div className="absolute -top-14 right-0">
              <button
                onClick={() => navigate("/alltrip")}
                className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-sky-500 to-green-500 text-white shadow"
              >
                View All
              </button>
            </div>

            {/* LEFT BUTTON */}
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full disabled:opacity-30"
            >
              <ChevronLeft size={22} />
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={() => scroll("right")}
              disabled={activeIndex === tours.length - 1}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full disabled:opacity-30"
            >
              <ChevronRight size={22} />
            </button>

            {/* SCROLL CONTAINER */}
            <motion.div
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex gap-8 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
            >
              {tours.map((tour, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={tour.id}
                    animate={{
                      scale: isActive ? 1.05 : 0.92,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.4 }}
                    className="min-w-[280px] max-w-[280px] snap-center flex-shrink-0 rounded-3xl overflow-hidden"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      {tour.tag && (
                        <span className="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-green-500 text-white">
                          {tour.tag}
                        </span>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#243047]">
                        {tour.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {tour.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {tour.duration}
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-semibold text-sky-500">
                          ₹{tour.price}/-
                        </span>

                        <button
                          onClick={() => navigate(`/trip/${tour.id}`)}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-sky-500 to-green-500 text-white"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* PAGINATION DOTS */}
            <div className="flex justify-center mt-6 gap-2">
              {tours.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-sky-500" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularTours
