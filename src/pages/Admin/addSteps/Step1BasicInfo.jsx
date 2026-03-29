import React from "react";

const EditStep1BasicInfo = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Validation before next
  const handleNext = () => {
    if (!formData?.title?.trim()) {
      alert("Trip title is required");
      return;
    }

    if (!formData?.destination?.trim()) {
      alert("Destination is required");
      return;
    }

    if (!formData?.category) {
      alert("Please select category");
      return;
    }

    if (!formData?.duration?.trim()) {
      alert("Duration is required");
      return;
    }

    nextStep();
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        ✏️ Edit Trip Basic Info
      </h2>

      <div className="flex flex-col gap-4">
        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Trip Title"
          value={formData?.title || ""}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* DESTINATION */}
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData?.destination || ""}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={formData?.category || ""}
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

        {/* DURATION */}
        <input
          type="text"
          name="duration"
          placeholder="4 Days / 3 Nights"
          value={formData?.duration || ""}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* PRIORITY */}
        <div>
          <p className="font-medium mb-1">Trip Priority</p>
          <input
            type="number"
            name="priority"
            placeholder="1–10"
            value={formData?.priority ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: Number(e.target.value),
              })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>

        {/* 🔥 LIVE PREVIEW */}
        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
          <p className="font-semibold">{formData?.title || "Trip Title"}</p>
          <p>📍 {formData?.destination || "Destination"}</p>
          <p>🗓 {formData?.duration || "Duration"}</p>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default EditStep1BasicInfo;
