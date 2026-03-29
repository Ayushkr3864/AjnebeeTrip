import React from "react";

const Step4Seats = ({ formData, setFormData, prevStep, nextStep }) => {
  const handleSeatsChange = (e) => {
    const total = Number(e.target.value);

    setFormData({
      ...formData,
      seats: {
        ...formData.seats,
        totalSeats: total,
        seatsLeft: total, // 🔥 AUTO SET
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
          onChange={handleSeatsChange}
          className="border p-2 rounded-lg"
        />

        {/* 🔥 LIVE PREVIEW */}
        {formData.seats.totalSeats > 0 && (
          <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
            <p>🎟 Total Seats: {formData.seats.totalSeats}</p>
            <p>🟢 Seats Left: {formData.seats.seatsLeft}</p>
            <p className="text-green-600 font-semibold">Status: Active</p>
          </div>
        )}

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
