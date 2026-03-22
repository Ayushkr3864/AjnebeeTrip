import React from "react";
import { useNavigate } from "react-router-dom";



const TripCard = ({ trip }) => {
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={trip.coverImage || "/fallback.jpg"}
          alt={trip.title}
          className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute top-2 left-2 flex gap-2">
          {/* Priority Badge */}
          {trip.priority >= 8 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              🔥 Trending
            </span>
          )}

          {/* Seat Status Badge */}
          {trip.seats?.seatsLeft === 0 ? (
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Sold Out
            </span>
          ) : trip.seats?.seatsLeft <= 5 ? (
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              Filling Fast
            </span>
          ) : (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              Available
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
              ₹{trip.pricingDetails?.pricePerPerson}
            </p>

            {trip.pricingDetails?.discountPrice && (
              <p className="text-sm line-through text-gray-400">
                ₹{trip.pricingDetails.discountPrice}
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
