import { motion } from "framer-motion";

/* =======================
   TOUR DATA
======================= */
const tours = [
  {
    title: "Himalayan Escape",
    location: "Himachal • Uttarakhand",
    duration: "7 Days / 6 Nights",
    price: "From ₹11,999/-",
    tag: "Popular",
    image: "/Himachal.jpeg",
  },
  {
    title: "Goa Coastal Bliss",
    location: "Goa",
    duration: "5 Days / 4 Nights",
    price: "From ₹9,499/-",
    tag: "Best Seller",
    image: "/Goa.jpeg",
  },
  {
    title: "Royal Rajasthan",
    location: "Jaipur • Jodhpur • Udaipur",
    duration: "6 Days / 5 Nights",
    price: "From ₹6,999/-",
    tag: "New",
    image: "/Rajasthan.jpeg",
  },


  {
    title: "Kerala Backwater Retreat",
    location: "Alleppey • Munnar • Kochi",
    duration: "6 Days / 5 Nights",
    price: "From ₹22,999/-",
    tag: "Relaxing",
    image: "/Kerala.jpeg",
  },
  {
    title: "Kashmir Paradise Tour",
    location: "Srinagar • Gulmarg • Pahalgam",
    duration: "5 Days / 4 Nights",
    price: "From ₹14,999/-",
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
  {
    title: "Andaman Island Getaway",
    location: "Port Blair • Havelock",
    duration: "5 Days / 4 Nights",
    price: "From ₹22,999/-",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
];


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

          {/* =======================
              TOUR CARDS
          ======================= */}
          <motion.div
            className="grid gap-10 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={container}
          >
            {tours.map((tour, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="rounded-3xl overflow-hidden transition"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                {/* IMAGE + TAG */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* TAG BADGE */}
                  {tour.tag && (
                    <motion.span
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold tracking-wide"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-main), var(--accent-sharp))",
                        color: "white",
                      }}
                    >
                      {tour.tag}
                    </motion.span>
                  )}
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
                      {tour.price}
                    </span>

                    <button
                      className="px-4 py-2 rounded-full text-sm font-medium transition"
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

export default PopularTours;
