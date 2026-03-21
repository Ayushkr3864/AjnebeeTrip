import React from "react";

const Step4Seats = ({ formData, setFormData, prevStep,nextStep }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      seats: {
        ...formData.seats,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Step 4: Availability
      </h2>

      <div className="flex flex-col gap-4">
        {/* Total Seats */}
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.seats.totalSeats}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        {/* Seats Left */}
        <input
          type="number"
          name="seatsLeft"
          placeholder="Seats Left"
          value={formData.seats.seatsLeft}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        {/* Trip Status */}
        <select
          name="status"
          value={formData.seats.status}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="filling">Filling Fast</option>
          <option value="sold">Sold Out</option>
        </select>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            ⬅️ Back
          </button>

          <button
            onClick={nextStep}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4Seats;
