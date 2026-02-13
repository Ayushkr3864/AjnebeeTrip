import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const BookingPage = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: 1,
    selectedDate: "",
  });

  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, "trips", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      }

      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        ...form,
        persons: Number(form.persons),
        tourId: id,
        tourTitle: trip.title,
        totalPrice: trip.price * form.persons,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Booking Successful!");

      setForm({
        name: "",
        email: "",
        phone: "",
        persons: 1,
        selectedDate: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!trip) return <p className="text-center py-20">Trip Not Found</p>;

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <h2 className="text-2xl font-bold mb-6">Book {trip.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          type="tel"
          placeholder="Phone"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          min="1"
          required
          value={form.persons}
          onChange={(e) => setForm({ ...form, persons: e.target.value })}
          className="w-full border p-3 rounded"
        />

        {/* Available Dates Dropdown */}
        <select
          required
          value={form.selectedDate}
          onChange={(e) => setForm({ ...form, selectedDate: e.target.value })}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Available Date</option>

          {trip.availableDates?.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>

        <div className="font-semibold text-blue-600">
          Total: ₹{trip.price * form.persons}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
