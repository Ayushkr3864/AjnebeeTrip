import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ReviewsCarousel from "../components/ReviewsCarousel";
import GiveReviewModal from "../components/GiveReviewModal";
import Navbar from "../components/Navbar";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh]">
        <img
          src={trip.image}
          alt={trip.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{trip.title}</h1>
          <p className="mt-3 text-lg">{trip.location}</p>

          <div className="mt-8 flex gap-4">
            {trip.itineraryLink && (
              <a
                href={trip.itineraryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full font-semibold"
              >
                View Itinerary
              </a>
            )}

            <button
              onClick={() => navigate(`/book/${trip.id}`)}
              className="border border-white px-6 py-3 rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">{trip.duration}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Starting Price</p>
            <p className="font-semibold text-yellow-500">
              ₹{trip.pricing?.double || trip.pricing?.single}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Available Dates</p>
            <p className="font-semibold">
              {trip.availableDates?.length || 0} Dates
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="md:col-span-2">
          {/* TABS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["itinerary", "dates", "inclusions", "exclusions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full border ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "border-gray-300"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2 rounded-full bg-black text-white"
            >
              Give Review
            </button>
          </div>

          {/* TAB CONTENT */}

          {/* DATES */}
          {activeTab === "dates" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Available Dates</h3>

              {trip.availableDates?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {trip.availableDates.map((d, i) => (
                    <span
                      key={i}
                      className="border px-4 py-2 rounded-full text-sm"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              ) : (
                <p>Dates coming soon</p>
              )}
            </div>
          )}

          {/* ITINERARY */}
          {activeTab === "itinerary" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-700 leading-relaxed">
                {trip.description}
              </p>

              {trip.itineraryLink && (
                <a
                  href={trip.itineraryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-indigo-600 underline"
                >
                  Open Full Google Itinerary
                </a>
              )}
            </div>
          )}

          {/* INCLUSIONS */}
          {activeTab === "inclusions" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {trip.includes?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )}

          {/* EXCLUSIONS */}
          {activeTab === "exclusions" && (
            <div className="bg-gray-50 p-6 rounded-2xl">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {trip.excludes?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TAGS */}
          {trip.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {trip.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-400/20 text-yellow-500 px-3 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT – PRICE CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Package Cost
          </h3>

          <table className="w-full text-sm border">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Sharing</th>
                <th className="p-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Single</td>
                <td className="p-3 text-right">₹{trip.pricing?.single}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Double</td>
                <td className="p-3 text-right">₹{trip.pricing?.double}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Triple</td>
                <td className="p-3 text-right">₹{trip.pricing?.triple}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={() => navigate(`/book/${trip.id}`)}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-full font-semibold"
          >
            Book Now
          </button>
        </div>
      </section>

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
    </>
  );
};

export default TripDetails;
