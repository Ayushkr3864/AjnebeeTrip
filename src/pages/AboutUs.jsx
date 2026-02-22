// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Compass,
//   Heart,
//   Shield,
//   Users,
//   Mountain,
//   Waves,
//   Plane,
//   Camera,
//   Instagram,
//   Linkedin,
//   Mail,
//   ArrowRight,
// } from "lucide-react";
// import Navbar from "../components/Navbar"
// // Animation Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.2,
//     },
//   },
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const slideInLeft = {
//   hidden: { opacity: 0, x: -60 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const slideInRight = {
//   hidden: { opacity: 0, x: 60 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// // Hero Section Component
// const HeroSection = () => {
//     return (
//         <>
//             <Navbar/>
//         <section className="relative min-h-screen mt-10 flex items-center justify-center overflow-hidden">
//           {/* Background Image with Overlay */}
//           <div className="absolute inset-0 z-0">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-teal-700/90 z-10"></div>
//             <img
//               src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
//               alt="Travel Background"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Floating Elements */}
//           <motion.div
//             className="absolute top-20 right-20 text-white/20"
//             animate={{
//               y: [0, -20, 0],
//               rotate: [0, 5, 0],
//             }}
//             transition={{
//               duration: 6,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <Compass size={120} strokeWidth={1} />
//           </motion.div>

//           {/* Content */}
//           <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h1
//                 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//               >
//                 We Don't Plan Trips,
//                 <br />
//                 <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
//                   We Create Stories
//                 </span>
//               </motion.h1>
//             </motion.div>

//             <motion.p
//               className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//             >
//               Ajneebe Trip transforms your wanderlust into unforgettable
//               journeys. We're not just travel planners—we're memory makers,
//               adventure curators, and your companions in discovering the
//               extraordinary.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.8 }}
//             >
//               {/* <button className="group relative px-10 py-5 bg-white text-blue-900 font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
//                 <span className="relative z-10 flex items-center gap-2">
//                   Explore Our World
//                   <ArrowRight
//                     className="group-hover:translate-x-1 transition-transform"
//                     size={20}
//                   />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
//               </button> */}
//             </motion.div>
//           </div>

//           {/* Scroll Indicator */}
//           <motion.div
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
//               <motion.div
//                 className="w-1.5 h-1.5 bg-white rounded-full"
//                 animate={{ y: [0, 16, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//             </div>
//           </motion.div>
//         </section>
//       </>
//     );
// };

// // Our Story Section
// const OurStorySection = () => {
//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%230ea5e9' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
//             backgroundSize: "30px 30px",
//           }}
//         ></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <motion.div
//           className="text-center mb-20"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeInUp}
//         >
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Our <span className="text-blue-600">Story</span>
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto"></div>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={slideInLeft}
//           >
//             <div className="relative">
//               <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-2xl"></div>
//               <img
//                 src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
//                 alt="Our Journey"
//                 className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
//               />
//             </div>
//           </motion.div>

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={slideInRight}
//             className="space-y-6"
//           >
//             <h3 className="text-3xl font-bold text-gray-900">
//               The Journey Begins
//             </h3>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               Ajneebe Trip was born from a simple belief: travel should be more
//               than ticking destinations off a list. It should be about immersing
//               yourself in cultures, forming connections, and creating memories
//               that last a lifetime.
//             </p>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               What started as a passion project among friends has evolved into a
//               trusted community of explorers, dreamers, and adventure seekers.
//               Every trip we curate carries our signature touch—authentic
//               experiences, hidden gems, and stories waiting to unfold.
//             </p>
//             <div className="pt-6 space-y-4">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                   <Heart className="text-blue-600" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold text-gray-900 mb-1">
//                     Our Mission
//                   </h4>
//                   <p className="text-gray-600">
//                     To transform travel into transformative experiences that
//                     broaden horizons and create lasting connections.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
//                   <Compass className="text-teal-600" size={24} />
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold text-gray-900 mb-1">
//                     Our Vision
//                   </h4>
//                   <p className="text-gray-600">
//                     To be the world's most trusted travel companion, inspiring
//                     millions to explore with purpose and passion.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Team Member Card Component
// const TeamMemberCard = ({
//   image,
//   name,
//   role,
//   bio,
//   socials,
//   reverse = false,
// }) => {
//   return (
//     <motion.div
//       className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:grid-flow-dense" : ""}`}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       variants={staggerContainer}
//     >
//       <motion.div
//         variants={scaleIn}
//         className={`${reverse ? "md:col-start-2" : ""} relative group`}
//       >
//         <div className="relative overflow-hidden rounded-3xl">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           >
//             <img
//               src={image}
//               alt={name}
//               className="w-full h-[600px] object-cover"
//             />
//           </motion.div>
//           <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
//         </div>

//         {/* Decorative Element */}
//         <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-300"></div>
//       </motion.div>

//       <motion.div
//         variants={fadeInUp}
//         className={`${reverse ? "md:col-start-1 md:row-start-1" : ""} space-y-6`}
//       >
//         <div>
//           <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
//             {role}
//           </p>
//           <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             {name}
//           </h3>
//           <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500"></div>
//         </div>

//         <p className="text-lg text-gray-700 leading-relaxed">{bio}</p>

//         <div className="flex gap-4 pt-4">
//           {socials.instagram && (
//             <motion.a
//               href={socials.instagram}
//               whileHover={{ scale: 1.1, y: -2 }}
//               className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <Instagram size={20} />
//             </motion.a>
//           )}
//           {socials.linkedin && (
//             <motion.a
//               href={socials.linkedin}
//               whileHover={{ scale: 1.1, y: -2 }}
//               className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <Linkedin size={20} />
//             </motion.a>
//           )}
//           {socials.email && (
//             <motion.a
//               href={`mailto:${socials.email}`}
//               whileHover={{ scale: 1.1, y: -2 }}
//               className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <Mail size={20} />
//             </motion.a>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Founder & Co-Founder Sections
// const LeadershipSection = () => {
//   const founder = {
//     name: "Rahul Sharma",
//     role: "Founder & Chief Explorer",
//     image:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
//     bio: "With over a decade of exploring 60+ countries, Rahul founded Ajneebe Trip to share his passion for authentic travel experiences. His philosophy is simple: every journey should leave you richer in stories, not just photos. A mountaineer at heart and a storyteller by nature, he believes that the best adventures are the ones where you lose yourself to find something greater.",
//     socials: {
//       instagram: "#",
//       linkedin: "#",
//       email: "rahul@ajneebetrip.com",
//     },
//   };

//   const cofounder = {
//     name: "Priya Mehta",
//     role: "Co-Founder & Experience Designer",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
//     bio: "Priya brings her expertise in hospitality and cultural anthropology to craft journeys that touch the soul. Her attention to detail and deep respect for local cultures ensure every trip is both comfortable and transformative. A certified scuba diver and wildlife photographer, she has an uncanny ability to find beauty in the most unexpected places and share it with fellow travelers.",
//     socials: {
//       instagram: "#",
//       email: "priya@ajneebetrip.com",
//     },
//   };

//   return (
//     <section className="py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           className="text-center mb-20"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeInUp}
//         >
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Meet Our <span className="text-blue-600">Visionaries</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             The dreamers and doers who turned a passion for travel into your
//             gateway to the world
//           </p>
//         </motion.div>

//         <div className="space-y-32">
//           <TeamMemberCard {...founder} />
//           <TeamMemberCard {...cofounder} reverse={true} />
//         </div>
//       </div>
//     </section>
//   );
// };

// // Captain Card Component
// const CaptainCard = ({ image, name, specialty, description, icon: Icon }) => {
//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -8, scale: 1.02 }}
//       className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//     >
//       {/* Image */}
//       <div className="relative h-80 overflow-hidden">
//         <motion.img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.6 }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

//         {/* Specialty Icon */}
//         <div className="absolute top-4 right-4">
//           <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Icon className="text-blue-600" size={24} />
//           </div>
//         </div>

//         {/* Name Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-6">
//           <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
//           <p className="text-blue-300 font-semibold">{specialty}</p>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="p-6">
//         <p className="text-gray-600 leading-relaxed">{description}</p>
//       </div>

//       {/* Decorative Element */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//     </motion.div>
//   );
// };

// // Our Captains Section
// const CaptainsSection = () => {
//   const captains = [
//     {
//       name: "Arjun Reddy",
//       specialty: "Mountain Expeditions",
//       description:
//         "Himalayan expert with 15+ peaks conquered. Arjun leads high-altitude adventures with unmatched expertise and ensures safety meets thrill.",
//       image:
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
//       icon: Mountain,
//     },
//     {
//       name: "Maya Desai",
//       specialty: "Beach & Island Escapes",
//       description:
//         "Marine biologist turned travel guide. Maya curates pristine coastal experiences and hidden island paradises across tropical destinations.",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
//       icon: Waves,
//     },
//     {
//       name: "Vikram Singh",
//       specialty: "Adventure Sports",
//       description:
//         "Adrenaline junkie and certified adventure instructor. From paragliding to white-water rafting, Vikram pushes boundaries safely.",
//       image:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
//       icon: Plane,
//     },
//     {
//       name: "Ananya Iyer",
//       specialty: "Cultural Immersion",
//       description:
//         "Anthropologist and storyteller who connects travelers with authentic local experiences, traditions, and communities worldwide.",
//       image:
//         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
//       icon: Camera,
//     },
//   ];

//   return (
//     <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Decorative Background */}
//       <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl"></div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <motion.div
//           className="text-center mb-20"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeInUp}
//         >
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Our <span className="text-blue-600">Captains</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Expert guides who transform destinations into experiences and
//             strangers into lifelong friends
//           </p>
//         </motion.div>

//         <motion.div
//           className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainer}
//         >
//           {captains.map((captain, index) => (
//             <CaptainCard key={index} {...captain} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // Feature Card Component
// const FeatureCard = ({ icon: Icon, title, description }) => {
//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -5 }}
//       className="relative group"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//       <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 group-hover:border-blue-300 transition-all duration-300 h-full">
//         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//           <Icon className="text-white" size={28} />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
//         <p className="text-gray-600 leading-relaxed">{description}</p>
//       </div>
//     </motion.div>
//   );
// };

// // Why Choose Us Section
// const WhyChooseUsSection = () => {
//   const features = [
//     {
//       icon: Heart,
//       title: "Personalized Experiences",
//       description:
//         "Every trip is crafted to match your unique travel style, interests, and dreams. No cookie-cutter itineraries—just authentic adventures designed for you.",
//     },
//     {
//       icon: Shield,
//       title: "Safety First, Always",
//       description:
//         "Your well-being is our priority. From vetted accommodations to 24/7 support, we ensure you explore with complete peace of mind.",
//     },
//     {
//       icon: Users,
//       title: "Local Expertise",
//       description:
//         "Our network of local guides and partners opens doors to experiences you won't find in guidebooks. Discover the soul of every destination.",
//     },
//     {
//       icon: Compass,
//       title: "Seamless Planning",
//       description:
//         "From the first conversation to your return home, we handle every detail. All you need to do is pack your bags and embrace the adventure.",
//     },
//   ];

//   return (
//     <section className="py-24 bg-white relative">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           className="text-center mb-20"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeInUp}
//         >
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Why Choose <span className="text-blue-600">Ajneebe Trip</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             We're more than a travel company—we're your partners in creating
//             memories that last forever
//           </p>
//         </motion.div>

//         <motion.div
//           className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainer}
//         >
//           {features.map((feature, index) => (
//             <FeatureCard key={index} {...feature} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // CTA Section
// const CTASection = () => {
//   return (
//     <section className="relative py-32 overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-teal-800/95 z-10"></div>
//         <img
//           src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
//           alt="CTA Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Decorative Elements */}
//       <motion.div
//         className="absolute top-1/4 left-10 text-white/10"
//         animate={{
//           rotate: [0, 360],
//           scale: [1, 1.2, 1],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         <Compass size={150} strokeWidth={0.5} />
//       </motion.div>

//       <motion.div
//         className="absolute bottom-1/4 right-10 text-white/10"
//         animate={{
//           rotate: [360, 0],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         <Mountain size={120} strokeWidth={0.5} />
//       </motion.div>

//       {/* Content */}
//       <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//         >
//           <motion.h2
//             className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
//             variants={fadeInUp}
//           >
//             Your Next Adventure
//             <br />
//             <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
//               Starts Here
//             </span>
//           </motion.h2>

//           <motion.p
//             className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
//             variants={fadeInUp}
//           >
//             The world is waiting. Stop dreaming and start exploring. Let's
//             create your story together—one destination, one moment, one memory
//             at a time.
//           </motion.p>

//           <motion.div variants={fadeInUp}>
//             {/* <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="group relative px-12 py-6 bg-white text-blue-900 font-bold text-xl rounded-full overflow-hidden shadow-2xl"
//             >
//               <span className="relative z-10 flex items-center gap-3">
//                 Start Your Journey
//                 <ArrowRight
//                   className="group-hover:translate-x-2 transition-transform"
//                   size={24}
//                 />
//               </span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </motion.button> */}
//           </motion.div>

//           <motion.p className="mt-8 text-blue-200 text-sm" variants={fadeInUp}>
//             📧 info@ajneebetrip.com | 📞 +91 98765 43210
//           </motion.p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// // Main About Us Component
// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       <HeroSection />
//       <OurStorySection />
//       <LeadershipSection />
//       <CaptainsSection />
//       <WhyChooseUsSection />
//       <CTASection />
//     </div>
//   );
// };

// export default AboutUs;

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const captains = [
  {
    name: "Rahul",
    role: "Vibe Master",
    trips: 48,
    expertise: "Nightlife & Music",
    emoji: "🎵",
    desc: "Turns strangers into besties by night one.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Sneha",
    role: "Adventure Queen",
    trips: 62,
    expertise: "Trekking & Offbeat",
    emoji: "🏔️",
    desc: "Will make you hike at 4am and love it.",
    photo:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Aryan",
    role: "Reel Machine",
    trips: 35,
    expertise: "Content & Photography",
    emoji: "🎬",
    desc: "Your trip becomes a film reel in his hands.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Ishita",
    role: "Chill Soul",
    expertise: "Wellness & Mindfulness",
    trips: 29,
    emoji: "🧘",
    desc: "Silence, stars, and soulful conversations.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Vishal",
    role: "Chaos Manager",
    expertise: "Logistics & Problem-solving",
    trips: 55,
    emoji: "⚡",
    desc: "No bus? He'll find one. No signal? He won't need it.",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Mehak",
    role: "Energy Bomb",
    expertise: "Group Games & Bonding",
    trips: 41,
    emoji: "🎉",
    desc: "Her laugh alone is worth the trip ticket.",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face",
  },
];

const coreTeam = [
  {
    name: "Ishaan",
    role: "Creative Brain",
    emoji: "🎨",
    desc: "Designs every campaign to hit different.",
  },
  {
    name: "Tanvi",
    role: "Support System",
    emoji: "💬",
    desc: "Your 2AM query is her 9AM priority.",
  },
  {
    name: "Rohan",
    role: "Digital Wizard",
    emoji: "💻",
    desc: "Makes the internet work for your adventure.",
  },
  {
    name: "Simran",
    role: "Logistics Ninja",
    emoji: "🗺️",
    desc: "Invisible. Indispensable. Always on time.",
  },
];

const whoAreYou = [
  {
    emoji: "😊",
    title: "Introvert ho?",
    desc: "Aaja, tujhe group ki raunak bana denge. Quietly confident trips curated just for you.",
  },
  {
    emoji: "🧭",
    title: "Solo Explorer ho?",
    desc: "Fikar mat kar, dost mil jayenge. We're the family you didn't know you needed.",
  },
  {
    emoji: "🎉",
    title: "Group ke saath ho?",
    desc: "Ready for epic masti. Bring your squad, we'll turn it into a saga.",
  },
];

// Abstract blobs
function Blob({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`}
    />
  );
}

export default function AjnabeeTrip() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sky-50 font-sans overflow-x-hidden relative">
      {/* Global font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        .font-display { font-family: 'Montserrat', sans-serif; }
        .font-heading { font-family: 'Poppins', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255,255,255,0.55); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.7); }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 60px rgba(14,165,233,0.18); }
        .glow-orange:hover { box-shadow: 0 12px 40px rgba(251,146,60,0.3); }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <span className="font-display text-xl text-sky-700 tracking-tight">
          Ajnabee<span className="text-orange-400">Trip</span>
        </span>
        <div className="hidden md:flex gap-8 font-heading text-sm font-semibold text-slate-600">
          {["Story", "Experience", "Team", "Captains"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-sky-500 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-full font-heading text-sm font-semibold shadow-lg hidden md:block"
        >
          Join the Family
        </motion.button>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image simulation with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-slate-800 to-orange-900">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-slate-900/50 to-orange-900/60" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="inline-block bg-orange-400/20 text-orange-300 border border-orange-400/40 px-4 py-1.5 rounded-full text-sm font-heading font-semibold mb-6 tracking-wide">
              ✈️ India's Youth Travel Community
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
              Your Vibe,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                Our Destination.
              </span>
            </h1>
            <p className="text-sky-100/90 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 leading-relaxed">
              Hum sirf tickets nahi,{" "}
              <span className="text-orange-300 font-semibold">
                'Connection'
              </span>{" "}
              bechte hain. Stop waiting for your friends — join the community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 font-heading font-bold px-8 py-4 rounded-full text-base shadow-2xl"
              >
                🗺️ Explore Trips
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="glass text-white font-heading font-semibold px-8 py-4 rounded-full text-base border border-white/30"
              >
                💛 Join the Family
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-xs font-heading flex flex-col items-center gap-1"
        >
          <span>Scroll</span>
          <span>↓</span>
        </motion.div>
      </section>

      {/* ── SECTION 2: OUR STORY ── */}
      <section
        id="story"
        className="relative py-24 px-6 bg-white overflow-hidden"
      >
        <Blob className="w-96 h-96 bg-sky-200 -top-20 -right-20" />
        <Blob className="w-64 h-64 bg-orange-100 bottom-10 left-0" />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
                  alt="Group Trip"
                  className="relative rounded-3xl w-full object-cover shadow-2xl"
                  style={{ height: "420px" }}
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 rounded-2xl p-4 shadow-xl">
                  <p className="font-display text-2xl font-black">10K+</p>
                  <p className="font-heading text-xs font-semibold">
                    Happy Travelers
                  </p>
                </div>
              </div>
            </FadeUp>
            <div>
              <FadeUp delay={0.1}>
                <span className="text-sky-500 font-heading font-semibold text-sm uppercase tracking-widest">
                  Our Story
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-slate-800 mt-2 mb-6 leading-tight">
                  From a "Cancelled Plan"
                  <br />
                  to a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                    Trusted Community
                  </span>
                </h2>
                <FadeUp delay={0.2}>
                  <p className="text-slate-600 font-body text-base leading-relaxed mb-4">
                    Hum sabki zindagi mein wo ek WhatsApp group hota hai jo sirf
                    'Plans' banane ke liye banta hai aur 'Blue Ticks' ke bojh
                    tale dab kar khatam ho jaata hai. AjnabeeTrip ki shuruwat
                    bhi wahi se hui.
                  </p>
                </FadeUp>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-slate-600 font-body text-base leading-relaxed mb-4">
                  Sab ne promise kiya tha — "haan bhai, chalenge!" Phir WhatsApp
                  group pe "next month pakka" aane laga. Ek cancel. Phir doosra.
                  Plans bante rahe, trips nahi.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="text-slate-600 font-body text-base leading-relaxed mb-4">
                  Sahib ne socha —{" "}
                  <span className="text-sky-600 font-semibold">
                    "Kya aisa koi community ban sakta hai jahan koi plan cancel
                    na ho?"
                  </span>{" "}
                  And that's how AjnabeeTrip was born. Not as a travel agency —
                  but as a movement.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="text-slate-600 font-body text-base leading-relaxed mb-6">
                  Akele shuru kiya. Pahle trip mein sirf 8 log the. Phir 80.
                  Phir 800. Aaj <strong>10,000+</strong> log hain is family mein
                  — aur koi plan cancel nahi hota. 🏔️
                </p>
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="flex gap-8">
                  {[
                    ["150+", "Trips Done"],
                    ["42+", "Destinations"],
                    ["98%", "Come Again"],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <p className="font-display text-2xl font-black text-sky-600">
                        {n}
                      </p>
                      <p className="font-heading text-xs text-slate-500">{l}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 3: EXPERIENCE CARDS ── */}
      <section
        id="experience"
        className="relative py-24 px-6 bg-gradient-to-b from-sky-50 to-blue-50 overflow-hidden"
      >
        <Blob className="w-80 h-80 bg-sky-200/60 top-10 right-0" />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <FadeUp className="text-center mb-16">
              <span className="text-orange-400 font-heading font-semibold text-sm uppercase tracking-widest">
                The AjnabeeTrip Way
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-slate-800 mt-2">
                The Experience
              </h2>
            </FadeUp>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌟",
                  title: "Unmatched Vibe",
                  desc: "Hidden gems, secret games, strangers turning into family — all within 24 hours. No awkward silences. Only memories.",
                  color: "from-sky-400 to-blue-500",
                },
                {
                  icon: "🏕️",
                  title: "Premium Comfort",
                  desc: "Tree houses, desert camps, mountain stays. We never compromise on safety or comfort. Adventure + Luxury = AjnabeeTrip.",
                  color: "from-orange-400 to-yellow-400",
                },
                {
                  icon: "🧢",
                  title: "The Captain Factor",
                  desc: "Our Captains aren't guides — they're entertainers, ice-breakers, and leaders. They make every trip legendary.",
                  color: "from-violet-400 to-purple-500",
                },
              ].map((card, i) => (
                <FadeUp key={card.title} delay={i * 0.15}>
                  <div className="bg-white rounded-3xl p-8 shadow-lg card-hover cursor-default relative overflow-hidden">
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-full -translate-y-6 translate-x-6`}
                    />
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-800 mb-3">
                      {card.title}
                    </h3>
                    <p className="font-body text-slate-500 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 4: VISION & STYLE ── */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700">
        <Blob className="w-96 h-96 bg-white/10 -top-20 -left-20" />
        <Blob className="w-72 h-72 bg-orange-400/10 bottom-0 right-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <FadeUp>
              <span className="text-sky-200 font-heading font-semibold text-sm uppercase tracking-widest">
                Vision & Style
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-white mt-3 mb-8 leading-tight">
                Shoot Reels or Find Peace —<br />
                <span className="text-yellow-300">We Do It All! 📸</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-sky-100 font-body text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                Koi reel banana chahta hai to{" "}
                <span className="text-yellow-300 font-semibold">
                  camera ready hai
                </span>
                . Koi silence dhundta hai to humne woh jagah bhi dhoondh rakhi
                hai.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <p className="text-sky-100/80 font-body text-base leading-relaxed max-w-2xl mx-auto mb-10">
                Hum jaante hain — kabhi rolla chahiye hota hai, kabhi raat ko
                seedha taarey dekhna hota hai. AjnabeeTrip dono ke liye hai.
                Teri vibe, tera trip.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  "🎬 Reel-worthy Spots",
                  "🌄 Peaceful Escapes",
                  "🔥 Bonfire Nights",
                  "🏔️ Offbeat Treks",
                ].map((t) => (
                  <span
                    key={t}
                    className="glass text-white px-5 py-2.5 rounded-full font-heading text-sm font-semibold border border-white/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </FadeUp>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 5: WHO ARE YOU ── */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <Blob className="w-64 h-64 bg-sky-100 top-0 right-0" />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <FadeUp className="text-center mb-16">
              <span className="text-orange-400 font-heading font-semibold text-sm uppercase tracking-widest">
                You Belong Here
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-slate-800 mt-2">
                Who Are You?
              </h2>
            </FadeUp>
            <div className="grid md:grid-cols-3 gap-8">
              {whoAreYou.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.15}>
                  <div className="bg-gradient-to-b from-sky-50 to-white border border-sky-100 rounded-3xl p-8 text-center card-hover cursor-default shadow-sm">
                    <span className="text-5xl mb-4 block">{item.emoji}</span>
                    <h3 className="font-heading text-xl font-bold text-slate-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 6: FOUNDER ── */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-sky-50 via-blue-50 to-white overflow-hidden">
        <Blob className="w-96 h-96 bg-sky-200/50 -top-10 -left-20" />
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <FadeUp className="text-center mb-12">
              <span className="text-orange-400 font-heading font-semibold text-sm uppercase tracking-widest">
                Founder Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-slate-800 mt-2">
                Meet The Man Who Said "Enough"
                <br />
                to Cancelled Plans 🎒
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="glass rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full scale-110 opacity-20 blur-md" />
                    <img
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
                      alt="Sahib - Founder"
                      className="relative w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 text-xs font-heading font-bold px-2 py-1 rounded-full shadow-md">
                      Founder 🎒
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-display text-xl text-sky-600 font-bold mb-4">
                    "Hi, main hoon Sahib."
                  </p>
                  <p className="font-body text-slate-600 text-base leading-relaxed mb-4">
                    "Maine ek trip plan ki thi apne dosto ke saath. Sab ready
                    the — ya aise lagte the. Ek ke baad ek cancel hote gaye.
                    Main frustrated nahi tha, main determined tha. Agar dost
                    nahi milenge to aisi jagah banata hoon jahan{" "}
                    <strong>harr baar naye dost milenge.</strong>"
                  </p>
                  <p className="font-body text-slate-600 text-base leading-relaxed">
                    Sahib ne akele travel start kiya, strangers ke saath trips
                    plan kiye, aur 3 saal mein{" "}
                    <span className="text-sky-600 font-semibold">
                      AjnabeeTrip
                    </span>{" "}
                    ko India ke most loved youth travel community mein badal
                    diya. 🌏
                  </p>
                  {/* Social Icons */}
                  <div className="mt-6 flex items-center gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md hover:scale-110 transition"
                    >
                      <FaInstagram />
                    </a>

                    <a
                      href="#"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md hover:scale-110 transition"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px bg-sky-200 flex-1" />
                    <span className="text-sky-400 font-heading font-semibold text-sm">
                      Sahib — Founder, AjnabeeTrip
                    </span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 7: CO-FOUNDER ── */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <Blob className="w-72 h-72 bg-orange-100/60 bottom-0 right-0" />
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <FadeUp className="text-center mb-12">
              <span className="text-orange-400 font-heading font-semibold text-sm uppercase tracking-widest">
                The Beginning
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-slate-800 mt-2">
                The Serendipitous Meeting: How AjnabeeTrip Found Its Second
                Pillar! 🤝
              </h2>
            </FadeUp>
            <div className="grid md:grid-cols- gap-8">
              {[
                // {
                //   name: "Sahib",
                //   role: "Founder",
                //   emoji: "🎒",
                //   color: "from-sky-400 to-blue-600",
                //   type: "short",
                //   quote:
                //     "I wanted to build a space where no one ever has to travel alone unless they want to.",
                //   photo:
                //     "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
                // },
                {
                  name: "Arbaz",
                  role: "Co-Founder",
                  emoji: "🌍",
                  color: "from-orange-400 to-yellow-500",
                  type: "long",
                  photo:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                },
              ].map((p, i) => (
                <FadeUp key={p.name} delay={i * 0.2}>
                  <div className="bg-gradient-to-b from-sky-50 to-white rounded-3xl p-8 border border-sky-100 shadow-md card-hover text-left">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${p.color} rounded-full scale-110 opacity-20 blur-md`}
                        />
                        <img
                          src={p.photo}
                          alt={p.name}
                          className="relative w-20 h-20 rounded-full object-cover shadow-xl border-4 border-white"
                        />
                      </div>
                      <div>
                        <p className="font-display text-xl text-slate-800 font-bold">
                          {p.name}
                        </p>
                        <p
                          className={`font-heading text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${p.color}`}
                        >
                          {p.role}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    {p.type === "short" ? (
                      <p className="font-body text-slate-500 text-sm leading-relaxed italic">
                        "{p.quote}"
                      </p>
                    ) : (
                      <div className="font-body text-slate-500 text-sm leading-relaxed space-y-4">
                        <p>
                          Har founder ki kahani ke piche ek aur kahani hoti hai.
                          Mere saath bhi kuch aisa hi hua. Jab maine AjnabeeTrip
                          ki shuruwat ki, toh mera vision clear tha — lekin us
                          vision ko poora karne ke liye mujhe ek aur aise pagal
                          insaan ki zaroorat thi jo mere jaisa hi junoon rakhta
                          ho.
                        </p>

                        <p>
                          Aur phir, jaise kismat likhi ho, Arbaz se meri mulaqat
                          ek solo trip par hui. Hum dono hi us waqt akele-akele
                          apne raste naap rahe the, duniya ko apne nazariye se
                          dekh rahe the. Safar mein humne ek dusre ki madad ki,
                          mushkilein share keen, aur un ghanton ki baaton mein,
                          hamare{" "}
                          <span className="text-sky-600 font-semibold">
                            'Vibes'
                          </span>{" "}
                          ekdum match ho gaye.
                        </p>

                        <p>
                          Humne us din mehsoos kiya ki agar do ajnabee itni
                          jaldi ek dusre ke saath connect kar sakte hain, toh
                          hum kyun na ek aisi community banayein jahan har
                          ajnabee ko apna dost mil sake?
                        </p>

                        <p>
                          Us trip ne humein sirf dost nahi banaya, usne humein
                          ek{" "}
                          <span className="font-semibold text-orange-500">
                            Partner in Crime
                          </span>{" "}
                          aur{" "}
                          <span className="font-semibold text-orange-500">
                            Partner in Vision
                          </span>{" "}
                          de diya.
                        </p>
                        {/* Social Icons */}
                        <div className="pt-4 flex items-center gap-4">
                          <a
                            href="#"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow hover:scale-110 transition"
                          >
                            <FaInstagram />
                          </a>

                          <a
                            href="#"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white shadow hover:scale-110 transition"
                          >
                            <FaWhatsapp />
                          </a>
                        </div>

                        <p className="font-semibold text-slate-700">
                          Aur bas, wahin se AjnabeeTrip ko uska doosra pillar
                          mila.
                        </p>

                        <p className="italic text-sky-700 font-medium">
                          To turn strangers into family, one epic trip at a
                          time! ❤️
                        </p>
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.4} className="mt-8 text-center">
              <p className="font-body text-slate-500 text-sm">
                Do strangers, ek pahadi, aur ek shared vision — this is how{" "}
                <span className="text-sky-600 font-semibold">AjnabeeTrip</span>{" "}
                became what it is today. ❤️
              </p>
            </FadeUp>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 8: CAPTAINS ── */}
      <section
        id="captains"
        className="relative py-24 px-6 bg-gradient-to-b from-sky-50 to-white overflow-hidden"
      >
        <Blob className="w-96 h-96 bg-sky-200/40 top-0 -left-20" />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <FadeUp className="text-center mb-16">
              <span className="text-orange-400 font-heading font-semibold text-sm uppercase tracking-widest">
                The Legends
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-slate-800 mt-2">
                Trip Captains 🧢
              </h2>
              <p className="font-body text-slate-500 mt-3 text-base">
                They're not guides. They're the reason you'll remember the trip.
              </p>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {captains.map((c, i) => (
                <FadeUp key={c.name} delay={(i % 3) * 0.12}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-sky-100 card-hover cursor-default group">
                    {/* Photo Banner */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100">
                      <img
                        src={c.photo}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      {/* Trips badge */}
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-sky-600 border border-sky-200 font-heading text-xs font-bold px-3 py-1 rounded-full shadow">
                        {c.trips} trips
                      </span>
                      {/* Emoji badge */}
                      <span className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-lg shadow">
                        {c.emoji}
                      </span>
                      {/* Name overlay */}
                      <div className="absolute bottom-3 left-4">
                        <h3 className="font-heading text-lg font-bold text-white drop-shadow">
                          {c.name}
                        </h3>
                        <p className="text-orange-300 font-heading text-xs font-semibold">
                          {c.role}
                        </p>
                      </div>
                    </div>
                    {/* Card body */}
                    <div className="p-5">
                      <p className="text-sky-500 font-body text-xs mb-2">
                        🎯 {c.expertise}
                      </p>
                      <p
                        className="font-body text-slate-500 text-sm leading-relaxed 
              opacity-0 max-h-0 
              group-hover:opacity-100 group-hover:max-h-40 
              transition-all duration-300 ease-in-out overflow-hidden"
                      >
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 9: CORE TEAM ── */}
      <section
        id="team"
        className="relative py-24 px-6 bg-white overflow-hidden"
      >
        <Blob className="w-72 h-72 bg-orange-100/50 top-10 right-0" />
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <FadeUp className="text-center mb-14">
              <span className="text-orange-400 font-heading font-semibold text-sm uppercase tracking-widest">
                Behind The Scenes
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-slate-800 mt-2">
                Core Team 💪
              </h2>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreTeam.map((m, i) => (
                <FadeUp key={m.name} delay={i * 0.12}>
                  <div className="text-center bg-gradient-to-b from-sky-50 to-white rounded-3xl p-6 border border-sky-100 shadow-sm card-hover cursor-default">
                    <span className="text-4xl block mb-3">{m.emoji}</span>
                    <h3 className="font-heading text-base font-bold text-slate-800">
                      {m.name}
                    </h3>
                    <p className="text-sky-500 font-heading text-xs font-semibold mb-3">
                      {m.role}
                    </p>
                    <p className="font-body text-slate-400 text-xs leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-16 px-6 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 overflow-hidden">
        <Blob className="w-96 h-96 bg-sky-500/10 top-0 left-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-2xl md:text-3xl text-white mb-2">
              Ajnabee<span className="text-orange-400">Trip</span>
            </p>
            <p className="font-body text-sky-200/70 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Kyunki duniya bahut badi hai, aur zindagi bahut choti. ❤️
            </p>
            <div className="flex justify-center gap-5 mb-10">
              {[
                { icon: "📸", label: "Instagram" },
                { icon: "👍", label: "Facebook" },
                { icon: "💬", label: "WhatsApp" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="flex flex-col items-center gap-1 text-sky-300 hover:text-white transition-colors"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-heading text-xs font-semibold">
                    {s.label}
                  </span>
                </motion.a>
              ))}
            </div>
            <div className="h-px bg-white/10 mb-6" />
            <p className="font-body text-slate-500 text-xs">
              © 2025 AjnabeeTrip. Made with ❤️ for travelers who don't wait for
              friends.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}