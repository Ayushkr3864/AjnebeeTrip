import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"; // path check karo
import { auth } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

  const cloudName = import.meta.env.VITE_CLOUD_NAME;
console.log("cloud",cloudName);

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



import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

console.log(getFirestore(getApp()));


console.log("Current user:", auth.currentUser);





export default function AdminAddTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);


  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    image: "",
    status: "Active",
    description: "",
    tags: [],
  });
  


  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------- TAG LOGIC ---------- */
  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageURL = "";

    if (imageFile) {
      imageURL = await uploadToCloudinary(imageFile);
    }

    await addDoc(collection(db, "trips"), {
      title: formData.title.trim(),
      location: formData.location.trim(),
      price: Number(formData.price),
      duration: formData.duration,
      image: imageURL, // ✅ Cloudinary URL
      description: formData.description,
      tags: formData.tags,
      status: formData.status,
      createdAt: serverTimestamp(),
    });

    alert("Trip added successfully 🚀");
    navigate("/admin/trips");
  } catch (err) {
    console.error(err);
    alert("Failed to add trip ❌");
  } finally {
    setLoading(false);
  }
};



if (!auth.currentUser) {
  alert("Not authorized");
  return;
}
// if (!formData.title || !formData.location || !formData.price) {
//   alert("Please fill all required fields");
//   return;
  // }
// if (imageFile && imageFile.size > 2 * 1024 * 1024) {
//   alert("Image must be under 2MB");
//   return;
// }
console.log(import.meta.env);


  return (
    <div className="text-white max-w-3xl mx-auto  ">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/trips")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-amber-400">Add New Trip</h1>
          <p className="text-gray-400 text-sm">
            Create and publish a travel package
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6"
      >
        {/* BASIC INFO */}
        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-3">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Trip Name"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="price"
              type="number"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="duration"
              placeholder="Duration (e.g. 5 Days / 4 Nights)"
              value={formData.duration}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* MEDIA */}
        {/* <input
          type="text"
          name="image"
          placeholder="enter image link"
          onChange={handleChange}
          value={formData.image}
          className="input"
        /> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
          }}
          className="input"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            className="mt-3 h-40 w-full object-cover rounded-lg border border-white/10"
          />
        )}

        {/* {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 h-40 w-full object-cover rounded-lg border border-white/10"
          />
        )} */}

        {/* DESCRIPTION */}
        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-3">
            Description
          </h3>

          <textarea
            name="description"
            placeholder="Short description about the trip"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input resize-none"
          />
        </div>

        {/* TAGS */}
        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-3">Tags</h3>

          <input
            placeholder="Type a tag and press Enter (e.g. Adventure, Budget)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            className="input"
          />

          {/* Tags List */}
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-white"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-3">Status</h3>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2.5 rounded-lg font-semibold"
          >
            Save Trip
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/admin/trips")}
            className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
