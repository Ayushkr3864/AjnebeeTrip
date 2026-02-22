import { useState, useEffect } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(collection(db, "trips"), orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);

        const tripsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "trips", tripId));
      setTrips(trips.filter((trip) => trip.id !== tripId));
      alert("Trip deleted successfully 🗑️");
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Failed to delete trip ❌");
    }
  };

  return (
    <div className="text-white max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-amber-400">Trips</h1>
          <p className="text-gray-400 text-sm">Manage all travel packages</p>
        </div>

        <button
          onClick={() => navigate("/admin/trips/add")}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} />
          Add Trip
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading trips...</p>}
      {!loading && trips.length === 0 && (
        <p className="text-gray-400">No trips found</p>
      )}

      <div className="space-y-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="rounded-2xl bg-white/5 border border-white/10 p-6"
          >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full md:w-60 h-40 object-cover rounded-xl"
              />

              <div className="flex-1 space-y-3">
                <h2 className="text-xl font-bold text-amber-400">
                  {trip.title}
                </h2>

                <p className="text-gray-400">📍 {trip.location}</p>

                <p className="text-gray-400">⏳ {trip.duration}</p>
                <h1 className="font-bold">{ trip?.deschead}</h1>

                <p className="text-gray-300">{trip.description}</p>

                {/* Pricing */}
                {trip.pricing && (
                  <div className="flex flex-wrap gap-4 text-sm mt-3">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                      Quad: ₹{trip.pricing.quad}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                      Triple: ₹{trip.pricing.triple}
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
                      Double: ₹{trip.pricing.double}
                    </span>
                  </div>
                )}
                {trip.itineraryLink && (
                  <a
                    href={trip.itineraryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-sm"
                  >
                    View Itinerary
                  </a>
                )}

                {/* Available Dates */}
                {trip.availableDates?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-2">
                      Available Dates:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trip.availableDates.map((date, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs"
                        >
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {trip.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {trip.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Includes / Excludes */}
                <div className="grid md:grid-cols-2 gap-6 mt-4 text-sm">
                  {trip.includes?.length > 0 && (
                    <div>
                      <p className="text-emerald-400 font-semibold">
                        Includes:
                      </p>
                      <ul className="list-disc ml-5 text-gray-300">
                        {trip.includes.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {trip.excludes?.length > 0 && (
                    <div>
                      <p className="text-red-400 font-semibold">Excludes:</p>
                      <ul className="list-disc ml-5 text-gray-300">
                        {trip.excludes.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Controls */}
              <div className="flex flex-col items-end gap-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    trip.status === "Active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {trip.status}
                </span>

                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => navigate(`/admin/edit-trip/${trip.id}`)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  <Edit2 size={18} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
