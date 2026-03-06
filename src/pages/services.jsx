import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Navbar from "../components/Navbar"
import {
  Globe,
  Map,
  ShieldCheck,
  Headphones,
  Tag,
  Users,
  Zap,
  Compass,
  ArrowRight,
  Star,
  ChevronDown,
  Plane,
  Anchor,
  Mountain,
} from "lucide-react";
import {useNavigate} from "react-router-dom"

// ── Floating shape component ──────────────────────────────────────────────────
const FloatingShape = ({ style, size = 120, opacity = 0.07, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full bg-blue-500 pointer-events-none"
    style={{ width: size, height: size, ...style }}
    animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
    transition={{
      duration: 7 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

// ── Stagger children wrapper ──────────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Globe,
    title: "Worldwide Destinations",
    desc: "Explore over 190 countries with curated itineraries built for every type of traveler — from coastal escapes to alpine adventures.",
    accent: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Map,
    title: "Custom Trip Planning",
    desc: "Tell us your dream and our expert planners craft a bespoke journey tailored to your schedule, budget, and bucket list.",
    accent: "bg-sky-50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    desc: "Industry-leading encryption and verified payment gateways keep your personal data and transactions completely safe.",
    accent: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Headphones,
    title: "24 / 7 Travel Support",
    desc: "Our dedicated support team is always just a message or call away — before, during, and after your trip.",
    accent: "bg-sky-50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
];

const whyUs = [
  {
    icon: Tag,
    title: "Best Price Guarantee",
    desc: "Find a lower price elsewhere? We'll match it — no questions asked.",
  },
  {
    icon: Users,
    title: "Trusted Travel Partners",
    desc: "We partner only with accredited airlines, hotels, and tour operators.",
  },
  {
    icon: Zap,
    title: "Easy Booking Process",
    desc: "Book flights, hotels, and activities in minutes through our streamlined platform.",
  },
  {
    icon: Compass,
    title: "Experienced Travel Guides",
    desc: "Local experts with deep destination knowledge guide every step of your journey.",
  },
];

const stats = [
  { value: "2M+", label: "Happy Travelers" },
  { value: "190+", label: "Countries" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
    const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-blue-950 text-white px-6">
      {/* Blue textured background dots */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating shapes */}
      <FloatingShape
        style={{ top: "8%", left: "6%" }}
        size={200}
        opacity={0.08}
        delay={0}
      />
      <FloatingShape
        style={{ top: "15%", right: "8%" }}
        size={140}
        opacity={0.06}
        delay={2}
      />
      <FloatingShape
        style={{ bottom: "12%", left: "12%" }}
        size={100}
        opacity={0.09}
        delay={1}
      />
      <FloatingShape
        style={{ bottom: "20%", right: "14%" }}
        size={180}
        opacity={0.05}
        delay={3}
      />
      <FloatingShape
        style={{ top: "45%", left: "2%" }}
        size={70}
        opacity={0.1}
        delay={1.5}
      />

      {/* Decorative rings */}
      <motion.div
        className="absolute rounded-full border border-blue-500 opacity-10"
        style={{
          width: 520,
          height: 520,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border border-blue-400 opacity-[0.06]"
        style={{
          width: 760,
          height: 760,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Flying plane icon */}
      <motion.div
        className="absolute text-blue-400 opacity-20"
        style={{ top: "22%", right: "18%" }}
        animate={{ x: [0, 14, 0], y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plane size={56} />
      </motion.div>
      <motion.div
        className="absolute text-sky-400 opacity-15"
        style={{ bottom: "28%", left: "10%" }}
        animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Anchor size={40} />
      </motion.div>
      <motion.div
        className="absolute text-blue-300 opacity-15"
        style={{ top: "30%", left: "22%" }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Mountain size={36} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-blue-800 bg-opacity-60 border border-blue-600 text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full tracking-wide">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            Trusted by 2 million+ travelers worldwide
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Our Travel
          <br />
          <span className="text-blue-300">Services</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Book your next adventure with complete confidence. Fast, safe, and
          effortlessly simple — from departure to destination.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/alltrip")}
            className="inline-flex items-center gap-2 bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-900 text-base transition-colors"
          >
            Explore Trips <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-blue-500 text-blue-200 font-semibold px-8 py-4 rounded-2xl text-base hover:bg-blue-900 transition-colors"
          >
            Watch How It Works
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-400 flex flex-col items-center gap-1 opacity-60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <motion.section
      className="bg-blue-600 py-8 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div
              className="text-3xl font-extrabold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {s.value}
            </div>
            <div className="text-blue-100 text-sm mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Services cards ────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-3"
          >
            What We Offer
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-slate-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything You Need,
            <br />
            <span className="text-blue-600">All In One Place</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-slate-500 mt-4 max-w-xl mx-auto text-base"
          >
            From dream discovery to airport departure, our platform handles
            every detail so you can focus on the experience.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(59,130,246,0.15)",
                }}
                className={`${s.accent} rounded-2xl p-7 border border-blue-100 shadow-sm cursor-pointer transition-shadow`}
              >
                <div
                  className={`${s.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}
                >
                  <Icon size={22} className={s.iconColor} />
                </div>
                <h3
                  className="text-slate-900 font-bold text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
                <motion.div
                  className="mt-5 flex items-center gap-1 text-blue-500 font-semibold text-sm"
                  whileHover={{ x: 4 }}
                >
                  Learn more <ArrowRight size={14} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
function WhyChooseUs() {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1e40af 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle decorative circle */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-50 border border-blue-100" />
      <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-sky-50 border border-sky-100" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left text */}
          <motion.div
            className="lg:w-5/12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-3"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Journey
              <br />
              <span className="text-blue-600">Deserves the Best</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-500 text-base leading-relaxed mb-8"
            >
              We've been connecting travelers with extraordinary experiences
              since 2015. Our platform is built on trust, simplicity, and a deep
              passion for travel.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "bg-blue-400",
                  "bg-sky-500",
                  "bg-blue-600",
                  "bg-blue-300",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${c} border-2 border-white`}
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm">
                <span className="font-bold text-slate-900">50,000+</span> trips
                booked this month
              </p>
            </motion.div>
          </motion.div>

          {/* Right feature cards */}
          <motion.div
            className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {whyUs.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 16px 36px rgba(59,130,246,0.12)",
                  }}
                  className="bg-slate-50 border border-blue-100 rounded-2xl p-6 shadow-sm cursor-pointer transition-shadow"
                >
                  <div className="bg-blue-100 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <h4
                    className="text-slate-900 font-bold text-base mb-1.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative bg-blue-950 py-28 px-6 overflow-hidden text-white">
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating shapes */}
      <FloatingShape
        style={{ top: "10%", left: "5%" }}
        size={240}
        opacity={0.07}
        delay={0}
      />
      <FloatingShape
        style={{ bottom: "5%", right: "4%" }}
        size={200}
        opacity={0.06}
        delay={2}
      />
      <FloatingShape
        style={{ top: "50%", left: "40%" }}
        size={80}
        opacity={0.08}
        delay={1}
      />

      {/* Ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-700 opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-blue-800 opacity-10" />

      {/* Plane */}
      <motion.div
        className="absolute text-blue-400 opacity-20 top-10 right-20"
        animate={{ x: [0, 20, 0], y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plane size={64} />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.span
          variants={fadeUp}
          className="inline-block bg-blue-800 bg-opacity-60 border border-blue-600 text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide"
        >
          🌏 Your adventure awaits
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ready to Start
          <br />
          <span className="text-blue-300">Your Journey?</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-blue-200 text-lg mb-10 leading-relaxed"
        >
          Thousands of destinations, zero stress. Let us handle every detail
          while you create memories that last a lifetime. Your perfect trip
          starts with one click.
        </motion.p>

        {/* <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.06, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/alltrip")}
            className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-900 text-lg transition-colors"
          >
            Book Your Trip Now <ArrowRight size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/alltrip")}
            className="text-blue-300 font-semibold underline underline-offset-4 text-base hover:text-white transition-colors"
          >
            Browse destinations →
          </motion.button>
        </motion.div> */}

        {/* Trust badges */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-blue-400 text-sm"
        >
          {[
            "SSL Encrypted",
            "Instant Confirmation",
            "Free Cancellation",
            "24/7 Support",
          ].map((b) => (
            <span key={b} className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" /> {b}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-blue-900 text-blue-300 py-8 px-6 text-center text-sm">
      <Globe size={20} className="inline mr-2 text-blue-400" />© 2025 AjnabeeTrip.
       All rights reserved.
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Navbar/>
      <Hero />
      <StatsBar />
      <Services />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </div>
  );
}
