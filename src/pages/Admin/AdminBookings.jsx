import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const handleStatusChange = async (booking, newStatus) => {
    await updateDoc(doc(db, "bookings", booking.id), {
      status: newStatus,
    });

    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b)),
    );
  };

  if (loading) return <p className="text-center py-20">Loading bookings...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-white">
      <h1 className="text-2xl font-bold text-amber-400 mb-8">All Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-400">No bookings yet.</p>
      )}

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-amber-400">
                  {booking.name}
                </h3>
                <p className="text-sm text-gray-400">{booking.email}</p>
                <p className="text-sm text-gray-400">{booking.phone}</p>
              </div>

              {/* Trip Info */}
              <div>
                <p className="font-semibold">{booking.tourTitle}</p>
                <p className="text-sm text-gray-400">
                  Date: {booking.selectedDate}
                </p>
                <p className="text-sm text-gray-400">
                  Sharing: {booking.sharingType}
                </p>
                <p className="text-sm text-gray-400">
                  Persons: {booking.persons}
                </p>
                <p className="text-lg font-bold text-emerald-400 mt-2">
                  ₹{booking.totalPrice}
                </p>
              </div>

              {/* Status + Actions */}
              <div className="flex flex-col items-end gap-3">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking, e.target.value)}
                  className="bg-black border border-white/20 px-3 py-2 rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => handleDelete(booking.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
