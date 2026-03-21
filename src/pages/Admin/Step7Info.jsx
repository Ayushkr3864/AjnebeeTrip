import React from "react";

const Step7Info = ({ formData, setFormData, prevStep }) => {
  const handleInfoChange = (e) => {
    setFormData({
      ...formData,
      importantInfo: {
        ...formData.importantInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleOrganizerChange = (e) => {
    setFormData({
      ...formData,
      organizer: {
        ...formData.organizer,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Step 7: Final Details
      </h2>

      {/* ================= IMPORTANT INFO ================= */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-amber-400 mb-3">
          Important Information
        </h3>

        <textarea
          name="whatToCarry"
          placeholder="What to carry (e.g. Warm clothes, shoes...)"
          value={formData.importantInfo.whatToCarry}
          onChange={handleInfoChange}
          className="border p-2 rounded-lg w-full mb-2"
        />

        <textarea
          name="weather"
          placeholder="Weather details"
          value={formData.importantInfo.weather}
          onChange={handleInfoChange}
          className="border p-2 rounded-lg w-full mb-2"
        />

        <textarea
          name="idProof"
          placeholder="ID proof requirement"
          value={formData.importantInfo.idProof}
          onChange={handleInfoChange}
          className="border p-2 rounded-lg w-full mb-2"
        />

        <textarea
          name="cancellation"
          placeholder="Cancellation policy"
          value={formData.importantInfo.cancellation}
          onChange={handleInfoChange}
          className="border p-2 rounded-lg w-full"
        />
      </div>

      {/* ================= ORGANIZER ================= */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-amber-400 mb-3">
          Organizer Information
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Trip Host Name"
          value={formData.organizer.name}
          onChange={handleOrganizerChange}
          className="border p-2 rounded-lg w-full mb-2"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          value={formData.organizer.phone}
          onChange={handleOrganizerChange}
          className="border p-2 rounded-lg w-full"
        />
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          ⬅️ Back
        </button>

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Submit 🚀
        </button>
      </div>
    </div>
  );
};

export default Step7Info;
