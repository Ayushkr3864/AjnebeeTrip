import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Star, CheckCircle, XCircle } from "lucide-react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchReviews = async () => {
    const snapshot = await getDocs(collection(db, "reviews"));

    const data = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const reviewData = docSnap.data();

        let tripName = "Unknown Trip";

        if (reviewData.tripId) {
          try {
            const tripRef = doc(db, "trips", reviewData.tripId);
            const tripSnap = await getDoc(tripRef);

            if (tripSnap.exists()) {
              tripName = tripSnap.data().title;
            }
          } catch (err) {
            console.error("Trip fetch error", err);
          }
        }

        return {
          id: docSnap.id,
          ...reviewData,
          tripName,
        };
      }),
    );

    setReviews(data);
    setLoading(false);
  };

  fetchReviews();
}, []);


  const approveReview = async (id) => {
    await updateDoc(doc(db, "reviews", id), {
      approved: true,
    });

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r)),
    );
  };

  const rejectReview = async (id) => {
    await deleteDoc(doc(db, "reviews", id));
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Review Approval Panel</h1>

        {reviews.length === 0 && (
          <p className="text-gray-400">No reviews available</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#0e111a] border border-white/10 rounded-2xl p-6 shadow-lg"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.contact}</p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    review.approved
                      ? "bg-green-600/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {review.approved ? "Approved" : "Pending"}
                </span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                “{review.review}”
              </p>
              <p className="text-xs text-indigo-400 mt-1">
                Trip: {review.tripName}
              </p>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  onClick={() => rejectReview(review.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  <XCircle size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
