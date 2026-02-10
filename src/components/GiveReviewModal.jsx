import { useState } from "react";
import { Star, X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // path sahi hona chahiye
import { useParams } from "react-router-dom";

export default function GiveReviewModal({ onClose, tripId }) 
 {
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    review: "",
  });
    const { id } = useParams();

 const handleSubmit = async (e) => {
   e.preventDefault();

   await addDoc(collection(db, "reviews"), {
     tripId,
     name: form.name,
     contact: form.contact,
     rating,
     review: form.review,
     approved: false, // 👈 ADMIN APPROVAL REQUIRED
     createdAt: serverTimestamp(),
   });

   alert("Review submitted. Waiting for admin approval 🙌");
   onClose();
 };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center">
          Give Your Review
        </h3>

        {/* Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={26}
              onClick={() => setRating(i)}
              className={`cursor-pointer ${
                i <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone / Email"
            required
            className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />

          <textarea
            placeholder="Write your experience..."
            required
            className="w-full border rounded-lg px-4 py-2 h-24"
            onChange={(e) => setForm({ ...form, review: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 py-3 rounded-full font-semibold"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
