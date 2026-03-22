import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TripPage() {
  const { id } = useParams();

  const [tripData, setTripData] = useState(null);
  const [activeTab, setActiveTab] = useState("inclusions");
  const [selectedDate, setSelectedDate] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(false);

  // ✅ Fetch trip from Firebase
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const docRef = doc(db, "Upcommingtrips", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTripData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrip();
  }, [id]);

  // ✅ Loading state
  if (!tripData) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ✅ Seat calculation
  const seatPercent =
    tripData.totalSeats > 0
      ? (tripData.seatsLeft / tripData.totalSeats) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* HERO */}
      <div className="relative h-[300px] w-full">
        <img
          src={tripData.coverImage}
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
          <h1 className="text-3xl font-bold">{tripData.title}</h1>
          <p>
            {tripData.destination} • {tripData.duration}
          </p>
          <span className="mt-2 inline-block bg-red-500 px-3 py-1 rounded-full text-sm">
            {tripData.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* SEAT PROGRESS */}
        <motion.div className="bg-white p-4 rounded-2xl shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600">Seats Status</h2>
          <p className="text-sm text-gray-600 mb-2">
            {tripData.seatsLeft} / {tripData.totalSeats} seats left
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${seatPercent}%` }}
            ></div>
          </div>
        </motion.div>

        {/* BATCH DATES */}
        <motion.div className="bg-white p-4 rounded-2xl shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Select Batch Date
          </h2>
          <div className="flex gap-3 flex-wrap">
            {tripData.batchDates?.map((date, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-xl border ${
                  selectedDate === date
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </motion.div>

        {/* PRICE */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600">Pricing</h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold text-green-600">
              ₹{tripData.discountPrice}
            </span>
            <span className="line-through text-gray-400">
              ₹{tripData.price}
            </span>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
            Book Now
          </button>
        </motion.div>

        {/* TABS */}
        <div className="flex gap-4 mb-4">
          {["inclusions", "itinerary"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl capitalize ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === "inclusions" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Inclusions
              </h2>
              <ul className="list-disc ml-5">
                {tripData.inclusions?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-red-500 mt-4">
                Exclusions
              </h2>
              <ul className="list-disc ml-5">
                {tripData.exclusions?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

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
                      <p className="font-semibold text-gray-800">{day.title}</p>
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
                        className="mt-3 text-gray-600 text-sm leading-relaxed md:ml-[110px]"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {Array.isArray(day.description) ? (
                          <ul className="space-y-2">
                            {day.description.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{day.description}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* PICKUP MAP */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-blue-600">
            Pickup Location
          </h2>
          <p className="mt-2 text-gray-700">{tripData.pickup}</p>
          <iframe
            title="map"
            className="w-full h-64 mt-4 rounded-xl"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              tripData.pickup,
            )}&z=13&output=embed`}
          />
        </motion.div>

        {/* WHAT TO CARRY */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <button
            onClick={() => setOpenAccordion(!openAccordion)}
            className="w-full text-left text-xl font-semibold text-blue-600"
          >
            What to Carry
          </button>
          {openAccordion && (
            <ul className="mt-3 list-disc ml-5 text-gray-700">
              {tripData.whatToCarry?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
