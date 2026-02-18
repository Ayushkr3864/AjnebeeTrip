import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed
import { useNavigate } from "react-router-dom";





/* =======================
   DESTINATIONS DATA
======================= */
const destinations = [
  {
    name: "Himachal Pradesh",
    subtitle: "Mountains • Valleys",
    oldPrice: "₹12,999",
    newPrice: "₹11,999",
    image:
      "/Himachal.jpeg",
  },
  {
    name: "Goa",
    subtitle: "Beaches • Nightlife",
    oldPrice: "₹12,999",
    newPrice: "₹9,999",
    image:"/Goa.jpeg"
    },
  {
    name: "Rajasthan",
    subtitle: "Forts • Culture",
    oldPrice: "₹7,999",
    newPrice: "₹6,999",
    image:"/Rajasthan.jpeg"
  },
  {
    name: "Kerala",
    subtitle: "Backwaters • Nature",
    oldPrice: "₹27,999",
    newPrice: "₹22,999",
    image:"/Kerala.jpeg"  },
  {
    name: "Kashmir",
    subtitle: "Snow • Landscapes",
    oldPrice: "₹15,999",
    newPrice: "₹14,499",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Andaman",
    subtitle: "Islands • Blue Waters",
    oldPrice: "₹24,999",
    newPrice: "₹22,999",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
];

/* =======================
   ANIMATIONS
======================= */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const q = query(
          collection(db, "destinations"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
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
        }
      `}</style>

      {/* =======================
          SECTION
      ======================= */}
      <section
        id="Destination"
        className="relative py-28"
        style={{
          background: `
            radial-gradient(900px 280px at 20% 0%, rgba(14,165,233,0.14), transparent 45%),
            linear-gradient(180deg, var(--bg-accent), var(--bg-base))
          `,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADING */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="max-w-2xl mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "Fraunces, serif",
                color: "var(--ink-primary)",
              }}
            >
              Explore Destinations
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "var(--ink-muted)",
              }}
            >
              Handpicked destinations with exclusive seasonal pricing.
            </motion.p>
          </motion.div>

          {/* DESTINATIONS GRID / SLIDER */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="
              grid gap-8
              sm:grid-cols-2
              lg:grid-cols-3
              overflow-x-auto
              lg:overflow-visible"
            style={{ scrollbarWidth: "none" }}
          >
            {destinations.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="group relative rounded-3xl overflow-hidden min-w-70"
              >
                {/* IMAGE */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* PRICE TAG
                <div
                  className="absolute top-4 right-4 px-4 py-2 rounded-2xl backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  <div className="text-xs line-through text-gray-400">
                    {item.oldPrice}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--accent-main)" }}
                  >
                    {item.newPrice}
                  </div>
                </div> */}

                {/* OVERLAY CONTENT */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0), rgba(0,0,0,0.18))",
                  }}
                >
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "Fraunces, serif",
                      color: "white",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    className="text-sm mb-4"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {item.subtitle}
                  </p>

                  {/* EXPLORE BUTTON */}
                  <motion.button
                    onClick={() => navigate(`/destinations/${item.slug}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      w-fit px-5 py-2 rounded-full text-sm font-semibold
                      opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                      transition
                    "
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-main), var(--accent-sharp))",
                      color: "white",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    Explore
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
