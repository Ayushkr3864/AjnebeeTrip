import { motion } from "framer-motion";
import AnimatedText from "./Animated";
import { useEffect, useRef } from "react";
import navbar from "../components/Navabr"
const slideUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2; // 🔥 adjust speed (1.2 – 1.5 ideal)
    }
  }, []);
    return (
      <>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&display=swap');

          .hero-heading {
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            letter-spacing: 0.02em;
          }
        `}
        </style>
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            ref={videoRef}
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <div className="max-w-4xl">
              {/* ✅ Animated Heading */}
              <AnimatedText
                text="Something Great is Taking Off! Our full website is launching soon."
                className="text-white hero-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              />

              {/* Subtitle */}
              <motion.p
                variants={slideUpItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-lg text-white/80"
              >
                Curated journeys • Epic destinations • Trusted experiences
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={slideUpItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a href="#popular">
                  <button className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold transition">
                    Explore Packages
                  </button>
                </a>

                <a href="#footer">
                  {" "}
                  <button className="px-8 py-4 rounded-full border border-white/70 text-white text-lg font-semibold hover:bg-white hover:text-black transition">
                    Contact Us
                  </button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </>
    );
};

export default HeroSection;
