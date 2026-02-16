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
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");


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

  setSubmitting(true); // 🔒 disable button
  setSuccessMsg(""); // clear old message

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
    // 1️⃣ Save booking
    await addDoc(collection(db, "bookings"), {
      ...bookingData,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    // 2️⃣ Send email
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE,
      import.meta.env.VITE_EMAILJS_TEMPLATE,
      bookingData,
      import.meta.env.VITE_EMAILJS_PUBLIC,
    );

    // 3️⃣ Show success message
    setSuccessMsg("Booking successful 🎉 Redirecting to payment...");

    // 4️⃣ Redirect after 2 sec
    setTimeout(() => {
      navigate(`/payment/${id}`, {
        state: { booking: bookingData },
      });
    }, 2000);
  } catch (error) {
    console.error("Booking Error:", error);
    alert("Something went wrong!");
    setSubmitting(false); // re-enable button if error
  }
};



  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-[#f6f8ff] overflow-hidden">
      {/* 🔵 Floating Shapes */}
      <div className="absolute w-72 h-72 bg-blue-200 rounded-full top-[-60px] left-[-60px] opacity-40 animate-pulse"></div>
      <div className="absolute w-60 h-60 bg-pink-200 rounded-full bottom-[-50px] right-[-50px] opacity-40 animate-pulse"></div>
      <div className="absolute w-32 h-32 bg-yellow-200 rounded-full top-[40%] left-[10%] opacity-30 animate-bounce"></div>

      {/* 🔲 Card */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 rounded-3xl p-8 w-full max-w-xl transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Book Your Trip ✈️
        </h2>

        <p className="text-center text-gray-500 mb-6">{trip.title}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none transition"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none transition"
          />

          {/* Sharing Type */}
          <select
            value={form.sharingType}
            onChange={(e) => setForm({ ...form, sharingType: e.target.value })}
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none transition"
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
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none transition"
          />

          {/* Date */}
          <select
            required
            value={form.selectedDate}
            onChange={(e) => setForm({ ...form, selectedDate: e.target.value })}
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none transition"
          >
            <option value="">Select Date</option>
            {trip.availableDates?.map((date, i) => (
              <option key={i} value={date}>
                {date}
              </option>
            ))}
          </select>

          {/* 💰 Price Card */}
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center">
            <p className="text-gray-600">
              Price per person:{" "}
              <span className="font-semibold">₹{selectedPrice}</span>
            </p>
            <p className="font-bold text-xl text-indigo-700">Total: ₹{total}</p>
          </div>

          {/* Success Message */}
          {successMsg && (
            <p className="text-green-600 text-center font-medium animate-pulse">
              {successMsg}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]"
            }`}
          >
            {submitting ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
