import React from "react";

const EditStep1BasicInfo = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (!formData.title?.trim()) return alert("Title required");
    if (!formData.destination?.trim()) return alert("Destination required");

    nextStep();
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        ✏️ Edit Basic Info
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Trip Title"
          className="border p-2 rounded-lg"
        />

        <input
          type="text"
          name="destination"
          value={formData.destination || ""}
          onChange={handleChange}
          placeholder="Destination"
          className="border p-2 rounded-lg"
        />

        <select
          name="category"
          value={formData.category || ""}
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
          value={formData.duration || ""}
          onChange={handleChange}
          placeholder="Duration"
          className="border p-2 rounded-lg"
        />

        <input
          type="number"
          name="priority"
          value={formData.priority ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: Number(e.target.value),
            })
          }
          placeholder="Priority"
          className="border p-2 rounded-lg"
        />

        <button
          onClick={handleNext}
          className="bg-blue-600 text-white py-2 rounded-lg"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default EditStep1BasicInfo;
