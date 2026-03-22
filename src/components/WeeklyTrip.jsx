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
          orderBy("priority", "desc"), //  high priority first
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
      {/* SECTION TITLE */}
      <h2 className="text-3xl font-bold mb-6 ">
        🔥 Weekly Upcoming Trips
      </h2>
      {/* GRID */}
     
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;
