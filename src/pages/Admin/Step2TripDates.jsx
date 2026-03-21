import React, { useState } from "react";

const Step2TripDates = ({ formData, setFormData, prevStep, nextStep }) => {
  const [batchInput, setBatchInput] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add batch date
  const addBatch = () => {
    if (!batchInput) return;

    setFormData({
      ...formData,
      batchDates: [...formData.batchDates, batchInput],
    });

    setBatchInput(""); // clear input
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Step 2: Trip Dates
      </h2>

      <div className="flex flex-col gap-4">
        {/* Batch Dates */}
        <div>
          <p className="font-medium mb-2">Batch Dates (Optional)</p>

          {/* Single Input */}
          <div className="flex gap-2">
            <input
              type="date"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
            <button
              onClick={addBatch}
              type="button"
              className="bg-blue-600 text-white px-3 rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Show Added Dates */}
          <ul className="mt-2 text-sm">
            {formData.batchDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
        {/* Booking Deadline */}
        <div>
          <p className="font-medium mb-1">Booking Deadline</p>
          <input
            type="date"
            name="bookingDeadline"
            value={formData.bookingDeadline}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        {/* Departure Time */}
        <div>
          <p className="font-medium mb-1">Departure Time</p>
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <p className="font-medium mb-1">Return Date</p>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            ⬅️ Back
          </button>

          <button
            onClick={nextStep}
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2TripDates;
