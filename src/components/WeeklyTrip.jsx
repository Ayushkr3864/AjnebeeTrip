import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import TripCard from "./TripCard";

const UpcomingTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(
          collection(db, "Upcommingtrips"),
          orderBy("priority", "desc"),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrips(data);
        console.log("Trips from Firestore:", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">🔥 Weekly Upcoming Trips</h2>

      {/* Horizontal Slider */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="min-w-[280px] max-w-[280px] flex-shrink-0"
          >
            <TripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;
