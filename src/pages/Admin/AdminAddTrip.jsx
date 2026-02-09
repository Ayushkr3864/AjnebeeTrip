import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

export default function AdminAddTrip() {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip Data:", formData);
    alert("Trip added (UI only)");
    navigate("/admin/trips");
  };

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
        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-3">Media</h3>

          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="input"
          />
        </div>

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
