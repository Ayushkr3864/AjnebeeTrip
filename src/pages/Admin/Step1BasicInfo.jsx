import React from "react";

const Step1BasicInfo = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Step 1: Basic Info
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Trip Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select Category</option>
          <option value="Solo">Solo</option>
          <option value="Couple">Couple</option>
          <option value="Group">Group</option>
          <option value="Family">Family</option>
          <option value="Trek">Trek</option>
        </select>

        <input
          type="text"
          name="duration"
          placeholder="4 Days / 3 Nights"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <p className="font-medium mb-1">Trip Priority</p>
          <input
            type="number"
            name="priority"
            placeholder="Enter priority (e.g. 1–10)"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: Number(e.target.value),
              })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <button
          onClick={nextStep}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
