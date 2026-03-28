import React from "react";
import { useNavigate } from "react-router-dom";



const TripCard = ({ trip }) => {
    const getSeatStatus = () => {
      const total = Number(trip?.seats.totalSeats);
      const left = Number(trip?.seats.seatsLeft);

      if (left === 0) return "sold_out";

      const percentageLeft = (left / total) * 100;

      if (percentageLeft <= 20) return "filling_fast";
      return "available";
    };
    const status = getSeatStatus();
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group min-w-[280px] max-w-[280px] flex-shrink-0 snap-start">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={trip.coverImage || "/fallback.jpg"}
          alt={trip.title}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-110"
        />

        <div className="absolute top-2 left-2 flex gap-2">
          {/* Priority Badge */}
          {trip.priority >= 8 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              🔥 Trending
            </span>
          )}

          {/* Seat Status Badge */}
          {status === "available" && (
            <span className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow-lg">
              Available
            </span>
          )}

          {status === "filling_fast" && (
            <span className="px-4 py-2 rounded-full bg-yellow-500 text-white font-semibold shadow-lg animate-pulse">
              Filling Fast
            </span>
          )}

          {status === "sold_out" && (
            <span className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow-lg">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-800">{trip.title}</h3>

        {/* DESTINATION */}
        <p className="text-sm text-gray-500">📍 {trip.destination}</p>

        {/* DURATION */}
        <p className="text-sm text-gray-600 mt-1">🗓 {trip.duration}</p>

        {/* PRICE SECTION */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-green-600">
              ₹
              {trip.pricingDetails?.discountPrice ||
                trip.pricingDetails?.pricePerPerson}
            </p>

            {trip.pricingDetails?.discountPrice && (
              <p className="text-sm line-through text-gray-400">
                ₹{trip.pricingDetails.pricePerPerson}
              </p>
            )}
          </div>

          {/* SEATS */}
          <p className="text-xs text-gray-500">
            {trip.seats?.seatsLeft} seats left
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate(`/weeklytrip/${trip.id}`)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default TripCard;
