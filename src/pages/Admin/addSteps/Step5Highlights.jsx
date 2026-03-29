import React, { useState } from "react";

const Step5Highlights = ({ formData, setFormData, prevStep, nextStep }) => {
  const [highlightInput, setHighlightInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ CLOUDINARY UPLOAD
 const uploadToCloudinary = async (file) => {
   const data = new FormData();
   data.append("file", file);
   data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

   const cloudName = import.meta.env.VITE_CLOUD_NAME;
   // console.log("cloud",cloudName);

   const res = await fetch(
     `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
     {
       method: "POST",
       body: data,
     },
   );

   const result = await res.json();

   if (!res.ok) {
     console.error("Cloudinary error:", result);
     throw new Error(result.error?.message || "Image upload failed");
   }

   return result.secure_url;
    };
    
    const handleImageUpload = async (file) => {
      if (!file) return;

      try {
        setLoading(true);

        const url = await uploadToCloudinary(file);

        // ✅ Save in formData
        setFormData({
          ...formData,
          coverImage: url,
        });

        // ✅ Show preview
        setImagePreview(url);
      } catch (error) {
        console.error(error);
        alert("Image upload failed");
      } finally {
        setLoading(false);
      }
    };

  // Add highlight
  const addHighlight = () => {
    if (!highlightInput) return;

    setFormData({
      ...formData,
      highlights: [...formData.highlights, highlightInput],
    });

    setHighlightInput("");
  };

  const removeHighlight = (index) => {
    const updated = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: updated });
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Step 5: Trip Highlights
      </h2>

      <div className="flex flex-col gap-4">
        {/* ================= IMAGE UPLOAD ================= */}
        <div>
          <p className="font-medium mb-2">Trip Cover Image</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="border p-2 rounded-lg w-full"
          />

          {loading && <p className="text-sm">Uploading...</p>}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-3 h-40 w-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* ================= HIGHLIGHTS ================= */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter highlight"
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button
                      onClick={addHighlight}
                      type="button"
            className="bg-blue-600 text-white px-3 rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="text-sm">
          {formData.highlights.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>• {item}</span>
              <button onClick={() => removeHighlight(index)}>❌</button>
            </li>
          ))}
        </ul>

        {/* ================= NAV ================= */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            ⬅️ Back
          </button>

          <button
            onClick={nextStep}
            disabled={!formData.coverImage}
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Highlights;
