import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTopNav from "../../components/AdminTopNav";
import { useNavigate } from "react-router-dom";

const dummyTrips = [
  {
    id: 1,
    title: "Himalayan Escape",
    location: "Himachal",
    price: "₹24,999",
    status: "Active",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: 2,
    title: "Goa Beach Vibes",
    location: "Goa",
    price: "₹18,499",
    status: "Inactive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
];

export default function AdminTrips() {
    const [showForm, setShowForm] = useState(false);
    
const navigate = useNavigate();

  return (
    <>
      {/* <AdminTopNav /> */}
      <div className="text-white input">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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

        {/* Add Trip Form (Modal-like card) */}
        {showForm && (
          <div className="mb-8 rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4 text-amber-400">
              Add New Trip
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Trip Name"
                className="bg-black/40 border border-white/10 px-4 py-2 rounded-lg"
              />
              <input
                placeholder="Location"
                className="bg-black/40 border border-white/10 px-4 py-2 rounded-lg"
              />
              <input
                placeholder="Price"
                className="bg-black/40 border border-white/10 px-4 py-2 rounded-lg"
              />
              <input
                placeholder="Image URL"
                className="bg-black/40 border border-white/10 px-4 py-2 rounded-lg"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-semibold">
                Save Trip
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Trips List */}
        <div className="grid grid-cols-1 gap-4">
          {dummyTrips.map((trip) => (
            <div
              key={trip.id}
              className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-white/5 border border-white/10 p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-24 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{trip.title}</h3>
                  <p className="text-sm text-gray-400">
                    {trip.location} • {trip.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    trip.status === "Active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {trip.status}
                </span>

                <button className="text-blue-400 hover:text-blue-500">
                  <Pencil size={18} />
                </button>

                <button className="text-red-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
