import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";


const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: 1,
    selectedDate: "",
    sharingType: "double",
  });

  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, "trips", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip({ id: docSnap.id, ...docSnap.data() });
      }

      setLoading(false);
    };

    fetchTrip();
  }, [id]);
    console.log(import.meta.env.VITE_EMAILJS_SERVICE);
    console.log(import.meta.env.VITE_EMAILJS_TEMPLATE);
    console.log(import.meta.env.VITE_EMAILJS_PUBLIC);


  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!trip) return <p className="text-center py-20">Trip Not Found</p>;

  const selectedPrice = trip.pricing?.[form.sharingType] || 0;

  const total = selectedPrice * form.persons;

 const handleSubmit = async (e) => {
   e.preventDefault();

   const selectedPrice = trip.pricing?.[form.sharingType] || 0;

   const total = selectedPrice * form.persons;

   const bookingData = {
     ...form,
     persons: Number(form.persons),
     tourId: id,
     tourTitle: trip.title,
     pricePerPerson: selectedPrice,
     totalPrice: total,
     createdAt: new Date().toLocaleString(),
   };

   try {
     // 1️⃣ Save in Firestore
     await addDoc(collection(db, "bookings"), {
       ...bookingData,
       status: "pending",
       createdAt: serverTimestamp(),
     });

     // 2️⃣ Send Email to Admin
     await emailjs.send(
       import.meta.env.VITE_EMAILJS_SERVICE,
       import.meta.env.VITE_EMAILJS_TEMPLATE,
       bookingData,
       import.meta.env.VITE_EMAILJS_PUBLIC,
     );

     alert("Booking submitted successfully! Admin has been notified.");

     navigate(`/payment/${id}`, {
       state: { booking: bookingData },
     });
   } catch (error) {
     console.error("Booking Error:", error);
     alert("Something went wrong!");
   }
 };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Book {trip.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="tel"
            placeholder="Phone"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border p-3 rounded-lg"
          />

          {/* Sharing Type */}
          <select
            value={form.sharingType}
            onChange={(e) => setForm({ ...form, sharingType: e.target.value })}
            className="w-full border p-3 rounded-lg"
          >
            <option value="single">Single Sharing</option>
            <option value="double">Double Sharing</option>
            <option value="triple">Triple Sharing</option>
          </select>

          {/* Persons */}
          <input
            type="number"
            min="1"
            value={form.persons}
            onChange={(e) => setForm({ ...form, persons: e.target.value })}
            className="w-full border p-3 rounded-lg"
          />

          {/* Date */}
          <select
            required
            value={form.selectedDate}
            onChange={(e) => setForm({ ...form, selectedDate: e.target.value })}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Date</option>
            {trip.availableDates?.map((date, i) => (
              <option key={i} value={date}>
                {date}
              </option>
            ))}
          </select>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Price per person: ₹{selectedPrice}</p>
            <p className="font-bold text-lg">Total: ₹{total}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
