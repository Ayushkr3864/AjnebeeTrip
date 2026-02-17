import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ReviewsCarousel from "../components/ReviewsCarousel";
import GiveReviewModal from "../components/GiveReviewModal";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import TermsAndRefundPolicy from "../components/TermsAndRefundPolicy";


const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [activeDay, setActiveDay] = useState(null);

  const [trip, setTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("dates");
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      const ref = doc(db, "trips", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setTrip({ id: snap.id, ...snap.data() });
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) return <p className="text-center py-20">Loading trip...</p>;

  return (
    <div className="relative min-h-screen bg-[#eef4ff] overflow-hidden">
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-400/25 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh]">
        <img
          src={trip.image}
          alt={trip.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> */}

        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-6 text-white">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {trip.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            📍 {trip.location}
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {trip.itineraryLink && (
              <motion.a
                href={trip.itineraryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Itinerary
              </motion.a>
            )}

            <motion.button
              onClick={() => navigate(`/book/${trip.id}`)}
              className="border-2 border-white px-8 py-3 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* INFO STRIP */}
      <motion.section
        className="relative z-20 -mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center border border-white/50"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-2">⏱️ Duration</p>
            <p className="font-bold text-2xl text-gray-800">{trip.duration}</p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center border border-white/50"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-2">💰 Starting Price</p>
            <p className="font-bold text-2xl text-yellow-600">
              ₹{trip.pricing?.single || trip.pricing?.double}
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center border border-white/50"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-2">📅 Available Dates</p>
            <p className="font-bold text-2xl text-gray-800">
              {trip.availableDates?.length || 0} Dates
            </p>
          </motion.div>
        </div>
        {/* DESCRIPTION CARD */}
        <motion.div
          className="max-w-6xl mx-auto px-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/50">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              🧾 Trip Overview
            </h3>

            <p className="text-gray-700 leading-relaxed">{trip.description}</p>
          </div>
        </motion.div>
      </motion.section>

      {/* MAIN CONTENT */}
      <motion.section
        className="relative max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {/* LEFT */}
        <div className="md:col-span-2">
          {/* TABS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["itinerary", "dates", "inclusions/exclusion"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full border-2 font-medium transition-all ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                    : "border-gray-300 bg-white/70 backdrop-blur-sm hover:border-indigo-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.toUpperCase()}
              </motion.button>
            ))}

            <motion.button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-2.5 rounded-full bg-black text-white font-medium shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
              whileTap={{ scale: 0.95 }}
            >
              ✍️ Give Review
            </motion.button>
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {/* DATES */}
            {activeTab === "dates" && (
              <motion.div
                key="dates"
                className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  📅 Available Dates
                </h3>

                {trip.availableDates?.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {trip.availableDates.map((d, i) => (
                      <motion.span
                        key={i}
                        className="border-2 border-indigo-300 bg-indigo-50 px-5 py-2.5 rounded-full text-sm font-medium text-indigo-700"
                        whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {d}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Dates coming soon</p>
                )}
              </motion.div>
            )}

            {/* ITINERARY */}
            {activeTab === "itinerary" && (
              <motion.div
                key="itinerary"
                className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Day Wise Plan
                </h3>

                {trip.itineraryDays?.map((day, index) => (
                  <motion.div
                    key={index}
                    layout
                    className="border-b border-gray-200 pb-3"
                  >
                    {/* ROW */}
                    <div
                      onClick={() =>
                        setActiveDay(activeDay === index ? null : index)
                      }
                      className="flex items-center justify-between cursor-pointer"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-4">
                        {/* BLUE DAY BADGE */}
                        <div className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm">
                          {day.day}
                        </div>

                        {/* TITLE */}
                        <p className="font-semibold text-gray-800">
                          {day.title}
                        </p>
                      </div>

                      {/* ARROW */}
                      <div className="text-xl text-gray-500">
                        {activeDay === index ? "-" : "+"}
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <AnimatePresence>
                      {activeDay === index && (
                        <motion.div
                          className="ml-[110px] mt-3 text-gray-600 text-sm leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {day.description}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* INCLUSIONS */}
            {activeTab === "inclusions/exclusion" && (
              <motion.div
                key="inclusions"
                className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  ✅ Inclusions & ❌ Exclusions
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* INCLUSIONS */}
                  <div>
                    <h4 className="font-semibold text-lg text-green-600 mb-4">
                      Included
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      {trip.includes?.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <span className="text-green-500 text-xl">✓</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* EXCLUSIONS */}
                  <div>
                    <h4 className="font-semibold text-lg text-red-500 mb-4">
                      Not Included
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      {trip.excludes?.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <span className="text-red-500 text-xl">✗</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAGS */}
          {trip.tags?.length > 0 && (
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {trip.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium border border-yellow-300"
                  whileHover={{ scale: 1.1, backgroundColor: "#fef3c7" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT – PRICE CARD */}
        <motion.div
          className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 h-fit sticky top-24 border border-white/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
            💼 Package Cost
          </h3>

          <table className="w-full text-sm border-collapse overflow-hidden rounded-xl">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left font-semibold">Sharing</th>
                <th className="p-4 text-right font-semibold">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium text-gray-700">Quad</td>
                <td className="p-4 text-right font-bold text-gray-800">
                  ₹{trip.pricing?.quad}
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium text-gray-700">Triple</td>
                <td className="p-4 text-right font-bold text-gray-800">
                  ₹{trip.pricing?.triple}
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium text-gray-700">Double</td>
                <td className="p-4 text-right font-bold text-gray-800">
                  ₹{trip.pricing?.double}
                </td>
              </tr>
            </tbody>
          </table>

          <motion.button
            onClick={() => navigate(`/book/${trip.id}`)}
            className="mt-6 w-full bg-indigo-600 text-white py-4 rounded-full font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now 🚀
          </motion.button>
        </motion.div>
      </motion.section>

      {showReviewModal && (
        <GiveReviewModal
          tripId={id}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      <ReviewsCarousel
        tripId={id}
        onAddReview={() => setShowReviewModal(true)}
      />
      <TermsAndRefundPolicy />
    </div>
  );
};

export default TripDetails;
