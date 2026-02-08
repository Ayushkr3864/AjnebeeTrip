import { motion } from "framer-motion";
import { MapPin, Briefcase, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Curated Destinations",
    desc: "Handpicked destinations crafted to match your travel style and comfort.",
  },
  {
    icon: Briefcase,
    title: "End-to-End Planning",
    desc: "From bookings to return journeys — we manage everything for you.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Partners",
    desc: "Verified hotels, guides, and transport partners you can rely on.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    desc: "Travel stress-free with round-the-clock assistance throughout your trip.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
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

const WhyChooseUs = () => {
  return (
    <>
      {/* FONT + THEME (component-scoped) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&family=Space+Grotesk:wght@400;500;600&display=swap');

        :root {
          --bg-base: #f6f8fb;
          --bg-accent: #eef5ff;

          --ink-primary: #243047;   /* not dark, not light */
          --ink-muted: #5f6b7a;

          --accent-main: #0ea5e9;   /* sky blue */
          --accent-sharp: #22c55e;  /* green highlight */

          --card-bg: rgba(255,255,255,0.85);
          --card-border: rgba(36,48,71,0.08);
        }
      `}</style>

      <section
        className="relative py-28"
        style={{
          background: `
            radial-gradient(900px 320px at 15% 0%, rgba(14,165,233,0.14), transparent 45%),
            linear-gradient(180deg, var(--bg-accent), var(--bg-base))
          `,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "Fraunces, serif",
                color: "var(--ink-primary)",
              }}
              className="text-3xl md:text-4xl leading-tight"
            >
              Why Travel With{" "}
              <span style={{ color: "var(--accent-main)" }}>Ajnabee Trip</span>?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "var(--ink-muted)",
              }}
              className="mt-4 text-lg"
            >
              We design journeys that feel calm, thoughtful, and memorable — so
              you focus on the experience, not the logistics.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="rounded-2xl p-8 text-center transition"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  fontFamily: "Space Grotesk, sans-serif",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div
                  className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-main), var(--accent-sharp))",
                    color: "white",
                  }}
                >
                  <item.icon size={26} />
                </div>

                <h3
                  style={{ color: "var(--ink-primary)" }}
                  className="text-lg font-semibold"
                >
                  {item.title}
                </h3>

                <p
                  style={{ color: "var(--ink-muted)" }}
                  className="mt-3 text-sm leading-relaxed"
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
