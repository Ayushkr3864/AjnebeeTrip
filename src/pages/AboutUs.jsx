import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Heart,
  Shield,
  Users,
  Mountain,
  Waves,
  Plane,
  Camera,
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar"
// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hero Section Component
const HeroSection = () => {
    return (
        <>
            <Navbar/>
        <section className="relative min-h-screen mt-10 flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-teal-700/90 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
              alt="Travel Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 right-20 text-white/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Compass size={120} strokeWidth={1} />
          </motion.div>

          {/* Content */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We Don't Plan Trips,
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  We Create Stories
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Ajneebe Trip transforms your wanderlust into unforgettable
              journeys. We're not just travel planners—we're memory makers,
              adventure curators, and your companions in discovering the
              extraordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* <button className="group relative px-10 py-5 bg-white text-blue-900 font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our World
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button> */}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>
      </>
    );
};

// Our Story Section
const OurStorySection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%230ea5e9' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Story</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                alt="Our Journey"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              The Journey Begins
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ajneebe Trip was born from a simple belief: travel should be more
              than ticking destinations off a list. It should be about immersing
              yourself in cultures, forming connections, and creating memories
              that last a lifetime.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              What started as a passion project among friends has evolved into a
              trusted community of explorers, dreamers, and adventure seekers.
              Every trip we curate carries our signature touch—authentic
              experiences, hidden gems, and stories waiting to unfold.
            </p>
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    Our Mission
                  </h4>
                  <p className="text-gray-600">
                    To transform travel into transformative experiences that
                    broaden horizons and create lasting connections.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Compass className="text-teal-600" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    Our Vision
                  </h4>
                  <p className="text-gray-600">
                    To be the world's most trusted travel companion, inspiring
                    millions to explore with purpose and passion.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Team Member Card Component
const TeamMemberCard = ({
  image,
  name,
  role,
  bio,
  socials,
  reverse = false,
}) => {
  return (
    <motion.div
      className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:grid-flow-dense" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div
        variants={scaleIn}
        className={`${reverse ? "md:col-start-2" : ""} relative group`}
      >
        <div className="relative overflow-hidden rounded-3xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-[600px] object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-300"></div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className={`${reverse ? "md:col-start-1 md:row-start-1" : ""} space-y-6`}
      >
        <div>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
            {role}
          </p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {name}
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500"></div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">{bio}</p>

        <div className="flex gap-4 pt-4">
          {socials.instagram && (
            <motion.a
              href={socials.instagram}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <Instagram size={20} />
            </motion.a>
          )}
          {socials.linkedin && (
            <motion.a
              href={socials.linkedin}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <Linkedin size={20} />
            </motion.a>
          )}
          {socials.email && (
            <motion.a
              href={`mailto:${socials.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <Mail size={20} />
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Founder & Co-Founder Sections
const LeadershipSection = () => {
  const founder = {
    name: "Rahul Sharma",
    role: "Founder & Chief Explorer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    bio: "With over a decade of exploring 60+ countries, Rahul founded Ajneebe Trip to share his passion for authentic travel experiences. His philosophy is simple: every journey should leave you richer in stories, not just photos. A mountaineer at heart and a storyteller by nature, he believes that the best adventures are the ones where you lose yourself to find something greater.",
    socials: {
      instagram: "#",
      linkedin: "#",
      email: "rahul@ajneebetrip.com",
    },
  };

  const cofounder = {
    name: "Priya Mehta",
    role: "Co-Founder & Experience Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    bio: "Priya brings her expertise in hospitality and cultural anthropology to craft journeys that touch the soul. Her attention to detail and deep respect for local cultures ensure every trip is both comfortable and transformative. A certified scuba diver and wildlife photographer, she has an uncanny ability to find beauty in the most unexpected places and share it with fellow travelers.",
    socials: {
      instagram: "#",
      email: "priya@ajneebetrip.com",
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-blue-600">Visionaries</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The dreamers and doers who turned a passion for travel into your
            gateway to the world
          </p>
        </motion.div>

        <div className="space-y-32">
          <TeamMemberCard {...founder} />
          <TeamMemberCard {...cofounder} reverse={true} />
        </div>
      </div>
    </section>
  );
};

// Captain Card Component
const CaptainCard = ({ image, name, specialty, description, icon: Icon }) => {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Specialty Icon */}
        <div className="absolute top-4 right-4">
          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="text-blue-600" size={24} />
          </div>
        </div>

        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-blue-300 font-semibold">{specialty}</p>
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
};

// Our Captains Section
const CaptainsSection = () => {
  const captains = [
    {
      name: "Arjun Reddy",
      specialty: "Mountain Expeditions",
      description:
        "Himalayan expert with 15+ peaks conquered. Arjun leads high-altitude adventures with unmatched expertise and ensures safety meets thrill.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
      icon: Mountain,
    },
    {
      name: "Maya Desai",
      specialty: "Beach & Island Escapes",
      description:
        "Marine biologist turned travel guide. Maya curates pristine coastal experiences and hidden island paradises across tropical destinations.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
      icon: Waves,
    },
    {
      name: "Vikram Singh",
      specialty: "Adventure Sports",
      description:
        "Adrenaline junkie and certified adventure instructor. From paragliding to white-water rafting, Vikram pushes boundaries safely.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
      icon: Plane,
    },
    {
      name: "Ananya Iyer",
      specialty: "Cultural Immersion",
      description:
        "Anthropologist and storyteller who connects travelers with authentic local experiences, traditions, and communities worldwide.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
      icon: Camera,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Captains</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guides who transform destinations into experiences and
            strangers into lifelong friends
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {captains.map((captain, index) => (
            <CaptainCard key={index} {...captain} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 group-hover:border-blue-300 transition-all duration-300 h-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Personalized Experiences",
      description:
        "Every trip is crafted to match your unique travel style, interests, and dreams. No cookie-cutter itineraries—just authentic adventures designed for you.",
    },
    {
      icon: Shield,
      title: "Safety First, Always",
      description:
        "Your well-being is our priority. From vetted accommodations to 24/7 support, we ensure you explore with complete peace of mind.",
    },
    {
      icon: Users,
      title: "Local Expertise",
      description:
        "Our network of local guides and partners opens doors to experiences you won't find in guidebooks. Discover the soul of every destination.",
    },
    {
      icon: Compass,
      title: "Seamless Planning",
      description:
        "From the first conversation to your return home, we handle every detail. All you need to do is pack your bags and embrace the adventure.",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blue-600">Ajneebe Trip</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're more than a travel company—we're your partners in creating
            memories that last forever
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-teal-800/95 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-10 text-white/10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Compass size={150} strokeWidth={0.5} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-10 text-white/10"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Mountain size={120} strokeWidth={0.5} />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            variants={fadeInUp}
          >
            Your Next Adventure
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Starts Here
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            The world is waiting. Stop dreaming and start exploring. Let's
            create your story together—one destination, one moment, one memory
            at a time.
          </motion.p>

          <motion.div variants={fadeInUp}>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-white text-blue-900 font-bold text-xl rounded-full overflow-hidden shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Journey
                <ArrowRight
                  className="group-hover:translate-x-2 transition-transform"
                  size={24}
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button> */}
          </motion.div>

          <motion.p className="mt-8 text-blue-200 text-sm" variants={fadeInUp}>
            📧 info@ajneebetrip.com | 📞 +91 98765 43210
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// Main About Us Component
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <OurStorySection />
      <LeadershipSection />
      <CaptainsSection />
      <WhyChooseUsSection />
      <CTASection />
    </div>
  );
};

export default AboutUs;
