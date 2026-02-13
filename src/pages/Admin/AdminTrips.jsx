import { useState,useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTopNav from "../../components/AdminTopNav";
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
    const [showForm, setShowForm] = useState(false);
    
  const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTrips = async () => {
        try {
          const q = query(
            collection(db, "trips"),
            orderBy("createdAt", "desc"),
          );

          const snapshot = await getDocs(q);

          const tripsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTrips(tripsData);
          console.log(tripsData);
          
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
      alert("Trip deleted successfully 🗑️");
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Failed to delete trip ❌");
    }
  };

  

  return (
    <>
      {loading && <p className="text-gray-400">Loading trips...</p>}

      {!loading && trips.length === 0 && (
        <p className="text-gray-400">No trips found</p>
      )}
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
            type="button"
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold"
          >
            <Plus size={18} />
            Add Trip
          </button>
        </div>

        {/* Trips List */}
        <div className="grid grid-cols-1 gap-4">
          {loading && <p className="text-gray-400">Loading trips...</p>}

          {!loading && trips.length === 0 && (
            <p className="text-gray-400">No trips found</p>
          )}
          {!loading &&
            trips.map((trip) => (
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

                  <p className="text-sm text-gray-400">
                    {trip.location} • ₹{Number(trip.price)}
                  </p>
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

                  {/* <button className="text-blue-400 hover:text-blue-500">
                    <Pencil size={18} />
                  </button> */}

                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="text-red-400 hover:text-red-500"
                  >
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
