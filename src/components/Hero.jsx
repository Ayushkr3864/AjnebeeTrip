import { motion } from "framer-motion";
import AnimatedText from "./Animated";
import { useEffect, useRef, useState } from "react";
// import WarningPopup from "./WarningPop";
import TestingToast from "./TestingToast";
import navbar from "./Navbar";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import Navbar from "./Navbar";

const notifyVariant = {
  hidden: {
    opacity: 0,
    y: -80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

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
  const [showWarning, setShowWarning] = useState(true);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2; // 🔥 adjust speed (1.2 – 1.5 ideal)
    }
  }, []);
  const handleCloseWarning = () => {
    setShowWarning(false);

    // show toast after popup closes
    setShowToast(true);

    // auto hide toast
    // setTimeout(() => {
    //   setShowToast(false);
    // }, 3000);
  };
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
      <Navbar/>
      <section className="relative h-screen w-full overflow-hidden text-white">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Explore The World <br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Like A Stranger
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200"
          >
            Curated adventures. Premium experiences. Lifetime memories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-8 flex gap-4"
          >
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 hover:scale-105 transition-all shadow-lg">
              Explore Trips
            </button>

            <button className="px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition-all">
              Book Now
            </button>
          </motion.div>

          {/* Social Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <FaInstagram />,
                value: "25K+",
                label: "Instagram Followers",
              },
              {
                icon: <FaYoutube />,
                value: "18K+",
                label: "YouTube Subscribers",
              },
              { icon: "🌍", value: "320+", label: "Trips Completed" },
              { icon: "😊", value: "5,000+", label: "Happy Travelers" },
            ].map((item, i) => (
              <motion.div
                whileHover={{ scale: 1.08 }}
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl"
              >
                <div className="text-2xl mb-2 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.value}</h3>
                <p className="text-sm text-gray-300">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
