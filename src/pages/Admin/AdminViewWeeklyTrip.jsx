import { useState, useEffect } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
  import { Disclosure, Tab } from "@headlessui/react";
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
        const q = query(
          collection(db, "Upcommingtrips"),
          orderBy("createdAt", "desc"),
        );

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
          onClick={() => navigate("/admin/upcommingTrip")}
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
  className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur"
>
  {/* HEADER */}
  <div className="flex flex-col md:flex-row gap-6">
    
    <img
      src={trip.coverImage}
      className="w-full md:w-64 h-44 object-cover rounded-xl"
      alt={trip.title}
    />

    <div className="flex-1">
      <h2 className="text-2xl font-bold text-amber-400">
        {trip.title}
      </h2>

      <p className="text-gray-400">📍 {trip.destination}</p>
      <p className="text-gray-400">🗓 {trip.duration}</p>

      {/* STATUS + SEATS */}
      <div className="flex items-center gap-4 mt-2">
        <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">
          {trip.status || "Draft"}
        </span>

        <span className="text-sm text-gray-300">
          🎟 {trip.seats?.seatsLeft}/{trip.seats?.totalSeats} seats
        </span>
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex flex-col gap-3">
      <button
        onClick={() => navigate(`/admin/edit-trip/${trip.id}`)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(trip.id)}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  </div>

  {/* TABS */}
  <div className="mt-6">
    <Tab.Group>
      <Tab.List className="flex gap-4 border-b border-white/10 pb-2">
        {["Overview", "Pricing", "Itinerary", "Info"].map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `px-4 py-1 rounded-lg text-sm ${
                selected
                  ? "bg-amber-400 text-black"
                  : "text-gray-400"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-4">

        {/* OVERVIEW */}
        <Tab.Panel>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Includes */}
            <div>
              <h3 className="text-green-400 font-semibold">Includes</h3>
              <ul className="list-disc ml-5 text-gray-300">
                {trip.includes?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>

            {/* Excludes */}
            <div>
              <h3 className="text-red-400 font-semibold">Excludes</h3>
              <ul className="list-disc ml-5 text-gray-300">
                {trip.excludes?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Batch Dates */}
          <div className="mt-4">
            <h3 className="text-blue-400 font-semibold">Batch Dates</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {trip.batchDates?.map((date, i) => (
                <span
                  key={i}
                  className="bg-blue-500/20 px-3 py-1 rounded-full text-xs"
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
        </Tab.Panel>

        {/* PRICING */}
        <Tab.Panel>
          <div className="space-y-2 text-sm">
            <p>💰 Price: ₹{trip.pricingDetails?.pricePerPerson}</p>
            <p>🔥 Discount: ₹{trip.pricingDetails?.discountPrice}</p>
            <p>⚡ Early Bird: ₹{trip.pricingDetails?.earlyBird}</p>
            <p>💳 Payment: {trip.pricingDetails?.paymentType}</p>
            <p>💵 Advance: ₹{trip.pricingDetails?.partialAmount}</p>
            <p>👥 Group Discount: {trip.pricingDetails?.groupDiscount}</p>
          </div>
        </Tab.Panel>

        {/* ITINERARY */}
        <Tab.Panel>
          {trip.itinerary?.map((day, i) => (
            <Disclosure key={i}>
              {({ open }) => (
                <div className="mb-3">
                  <Disclosure.Button className="w-full text-left bg-white/10 px-4 py-2 rounded-lg">
                    {day.day} - {day.title}
                  </Disclosure.Button>

                  <Disclosure.Panel className="p-3 text-gray-300">
                    <ul className="list-disc ml-5">
                      {day.description?.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </Tab.Panel>

        {/* INFO */}
        <Tab.Panel>
          <div className="space-y-2 text-sm">
            <p>🌦 Weather: {trip.importantInfo?.weather}</p>
            <p>🪪 ID Proof: {trip.importantInfo?.idProof}</p>
            <p>🎒 What to Carry: {trip.importantInfo?.whatToCarry}</p>
            <p>❌ Cancellation: {trip.importantInfo?.cancellation}</p>

            <hr className="border-white/10 my-3" />

            <p>👤 Organizer: {trip.organizer?.name}</p>
            <p>📞 Phone: {trip.organizer?.phone}</p>
          </div>
        </Tab.Panel>

      </Tab.Panels>
    </Tab.Group>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}
