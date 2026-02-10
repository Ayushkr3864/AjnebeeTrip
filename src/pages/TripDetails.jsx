import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom"
import ReviewsCarousel from "../components/ReviewsCarousel";
import GiveReviewModal from "../components/GiveReviewModal";
import Navbar from "../components/Navabr"


const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
    const [activeTab, setActiveTab] = useState("dates");
  const navigate = useNavigate()
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      const ref = doc(db, "trips", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setTrip(snap.data());
    };
    fetchTrip();
  }, [id]);

  if (!trip) return <p className="text-center py-20">Loading trip...</p>;

  return (
    <>
      <Navbar />
      {/* HERO */}
      <section className="relative h-[55vh] md:h-[70vh]">
        <img
          src={trip.image}
          alt={trip.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{trip.title}</h1>
          <p className="mt-3 text-lg opacity-90">{trip.location}</p>

          <div className="mt-8 flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold">
              Get Itinerary
            </button>
            <button className="border border-white px-6 py-3 rounded-full">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">{trip.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Starting Price</p>
            <p className="font-semibold text-yellow-500">{trip.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pickup & Drop</p>
            <p className="font-semibold">
              {trip.pickup || "Delhi / Chandigarh"}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="md:col-span-2">
          {/* TABS */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {["itinerary", "dates", "inclusions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full border ${
                    activeTab === tab
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* ⭐ GIVE REVIEW BUTTON */}
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-2 rounded-full bg-black text-white border border-black hover:bg-yellow-400 hover:text-black transition font-medium"
            >
              Give Review
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "dates" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Available Dates</h3>
              <div className="flex flex-wrap gap-3">
                {trip.dates?.map((d, i) => (
                  <span
                    key={i}
                    className="border px-4 py-2 rounded-full text-sm"
                  >
                    {d}
                  </span>
                )) || <p>Dates coming soon</p>}
              </div>
            </div>
          )}

          {activeTab === "itinerary" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="leading-relaxed text-gray-700">
                {trip.description ||
                  "Detailed day-wise itinerary will be shared after booking."}
              </p>
            </div>
          )}

          {activeTab === "inclusions" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {trip.includes?.map((i, idx) => <li key={idx}>{i}</li>) || (
                  <li>Hotels, Meals, Sightseeing</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT – PRICE CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Package Cost
          </h3>

          <table className="w-full text-sm border">
            <thead className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <tr>
                <th className="p-3 text-left">Sharing</th>
                <th className="p-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {trip.pricing?.map((p, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{p.type}</td>
                  <td className="p-3 text-right">{p.price}</td>
                </tr>
              )) || (
                <tr>
                  <td className="p-3">Double Sharing</td>
                  <td className="p-3 text-right">{trip.price}</td>
                </tr>
              )}
            </tbody>
          </table>

          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold">
            Book Now
          </button>
        </div>
      </section>
      {showReviewModal && (
        <GiveReviewModal
          tripId={id} // 🔥 THIS FIXES THE ERROR
          onClose={() => setShowReviewModal(false)}
        />
      )}
      <ReviewsCarousel
        tripId={id}
        onAddReview={() => setShowReviewModal(true)}
      />
    </>
  );
};

export default TripDetails;
