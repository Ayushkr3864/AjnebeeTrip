import { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../../index.css";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error?.message || "Image upload failed");
  }

  return result.secure_url;
};

export default function AdminEditTrip() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [includeInput, setIncludeInput] = useState("");
  const [excludeInput, setExcludeInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    description: "",
    status: "Active",
    itineraryLink: "",
    pricing: { single: "", double: "", triple: "" },
    availableDates: [],
    tags: [],
    includes: [],
    excludes: [],
  });

  const [dayInput, setDayInput] = useState({ title: "", description: "" });
  const [itineraryDays, setItineraryDays] = useState([]);

  /* ================= FETCH TRIP ================= */
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const docRef = doc(db, "trips", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setFormData({
            title: data.title || "",
            location: data.location || "",
            duration: data.duration || "",
            description: data.description || "",
            status: data.status || "Active",
            itineraryLink: data.itineraryLink || "",
            pricing: {
              single: data.pricing?.single || "",
              double: data.pricing?.double || "",
              triple: data.pricing?.triple || "",
            },
            availableDates: data.availableDates || [],
            tags: data.tags || [],
            includes: data.includes || [],
            excludes: data.excludes || [],
          });

          setItineraryDays(data.itineraryDays || []);
          setImagePreview(data.image || null);
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    fetchTrip();
  }, [id]);

  /* ================= BASIC INPUT CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= DAY LOGIC ================= */
  const addDay = () => {
    if (!dayInput.title.trim() || !dayInput.description.trim()) return;

    const newDay = {
      day: `Day ${itineraryDays.length + 1}`,
      title: dayInput.title,
      description: dayInput.description,
    };

    setItineraryDays([...itineraryDays, newDay]);
    setDayInput({ title: "", description: "" });
  };

  const removeDay = (index) => {
    const updated = itineraryDays.filter((_, i) => i !== index);
    const renumbered = updated.map((d, i) => ({
      ...d,
      day: `Day ${i + 1}`,
    }));
    setItineraryDays(renumbered);
  };

  /* ================= TAG / INCLUDE / EXCLUDE ================= */
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

  const addInclude = (e) => {
    if (e.key === "Enter" && includeInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        includes: [...formData.includes, includeInput.trim()],
      });
      setIncludeInput("");
    }
  };

  const removeInclude = (item) => {
    setFormData({
      ...formData,
      includes: formData.includes.filter((i) => i !== item),
    });
  };

  const addExclude = (e) => {
    if (e.key === "Enter" && excludeInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        excludes: [...formData.excludes, excludeInput.trim()],
      });
      setExcludeInput("");
    }
  };

  const removeExclude = (item) => {
    setFormData({
      ...formData,
      excludes: formData.excludes.filter((i) => i !== item),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageURL = imagePreview;

      if (imageFile) {
        imageURL = await uploadToCloudinary(imageFile);
      }

      const docRef = doc(db, "trips", id);

      await updateDoc(docRef, {
        title: formData.title.trim(),
        location: formData.location.trim(),
        duration: formData.duration,
        description: formData.description,
        image: imageURL,
        pricing: {
          single: Number(formData.pricing.single),
          double: Number(formData.pricing.double),
          triple: Number(formData.pricing.triple),
        },
        availableDates: formData.availableDates,
        itineraryLink: formData.itineraryLink.trim(),
        itineraryDays,
        tags: formData.tags,
        includes: formData.includes,
        excludes: formData.excludes,
        status: formData.status,
        updatedAt: serverTimestamp(),
      });

      alert("Trip updated successfully 🚀");
      navigate("/admin/trips");
    } catch (err) {
      console.error(err);
      alert("Failed to update trip ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!auth.currentUser) {
    alert("Not authorized");
    return null;
  }

  /* ================= UI (UNCHANGED) ================= */
  return (
    <div className="text-white max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/trips")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-amber-400">Edit Trip</h1>
          <p className="text-gray-400 text-sm">
            Update and manage travel package
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6"
      >
        {/* BASIC INFO */}
        {step == 1 && (
          <>
            <div>
              <h2 className="text-lg font-bold text-amber-400 mb-4">
                Basic Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="title"
                  placeholder="Trip Name"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="location"
                  placeholder="Pickup/Drop"
                  value={formData.location}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="duration"
                  placeholder="Duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <textarea
                name="description"
                placeholder="Trip Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input mt-4"
              />
            </div>
            {/* DAY WISE ITINERARY */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Day-wise Itinerary
              </h3>

              {/* INPUTS */}
              <input
                type="text"
                placeholder="Day Title (e.g. Departure from Delhi)"
                value={dayInput.title}
                onChange={(e) =>
                  setDayInput({ ...dayInput, title: e.target.value })
                }
                className="input mb-2"
              />

              <textarea
                placeholder="Day Description"
                rows={3}
                value={dayInput.description}
                onChange={(e) =>
                  setDayInput({ ...dayInput, description: e.target.value })
                }
                className="input"
              />

              <button
                type="button"
                onClick={addDay}
                className="mt-3 bg-indigo-500 px-4 py-2 rounded-lg text-white font-semibold"
              >
                ➕ Add Day
              </button>

              {/* DAY LIST */}
              <div className="space-y-3 mt-4">
                {itineraryDays.map((d, index) => (
                  <div
                    key={index}
                    className="bg-indigo-500/10 border border-indigo-300 p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-indigo-400">{d.day}</p>
                        <p className="font-semibold text-white">{d.title}</p>
                        <p className="text-sm text-gray-300 mt-1">
                          {d.description}
                        </p>
                      </div>

                      <button
                        onClick={() => removeDay(index)}
                        className="text-red-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            {/* TAGS */}
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Tags
              </h3>

              <div className="flex gap-2">
                <input
                  placeholder="Add tag (Adventure, Budget...)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  className="input flex-1"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!tagInput.trim()) return;

                    if (!formData.tags.includes(tagInput.trim())) {
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, tagInput.trim()],
                      });
                    }

                    setTagInput("");
                  }}
                  className="bg-amber-500 px-4 rounded-lg text-black font-semibold"
                >
                  Add
                </button>
              </div>

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

            {/* INCLUDES */}
            {/* INCLUDES */}
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Includes
              </h3>

              <div className="flex gap-2">
                <input
                  placeholder="Add include (Hotel, Meals...)"
                  value={includeInput}
                  onChange={(e) => setIncludeInput(e.target.value)}
                  onKeyDown={addInclude}
                  className="input flex-1"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!includeInput.trim()) return;

                    setFormData({
                      ...formData,
                      includes: [...formData.includes, includeInput.trim()],
                    });

                    setIncludeInput("");
                  }}
                  className="bg-emerald-500 px-4 rounded-lg text-black font-semibold"
                >
                  Add
                </button>
              </div>

              {/* Include Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.includes.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeInclude(item)}
                      className="hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* EXCLUDES */}
            {/* EXCLUDES */}
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Excludes
              </h3>

              <div className="flex gap-2">
                <input
                  placeholder="Add exclude (Flights, Personal...)"
                  value={excludeInput}
                  onChange={(e) => setExcludeInput(e.target.value)}
                  onKeyDown={addExclude}
                  className="input flex-1"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!excludeInput.trim()) return;

                    setFormData({
                      ...formData,
                      excludes: [...formData.excludes, excludeInput.trim()],
                    });

                    setExcludeInput("");
                  }}
                  className="bg-red-500 px-4 rounded-lg text-white font-semibold"
                >
                  Add
                </button>
              </div>

              {/* Exclude Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.excludes.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeExclude(item)}
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
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Status
              </h3>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-6 bg-emerald-500 px-6 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* ACTIONS */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-amber-400 mb-6">
              Step 2: Pricing & Dates
            </h2>

            {/* Pricing */}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Single Sharing"
                value={formData.pricing.single}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricing: {
                      ...formData.pricing,
                      single: e.target.value,
                    },
                  })
                }
                className="input"
              />

              <input
                type="number"
                placeholder="Double Sharing"
                value={formData.pricing.double}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricing: {
                      ...formData.pricing,
                      double: e.target.value,
                    },
                  })
                }
                className="input"
              />

              <input
                type="number"
                placeholder="Triple Sharing"
                value={formData.pricing.triple}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricing: {
                      ...formData.pricing,
                      triple: e.target.value,
                    },
                  })
                }
                className="input"
              />
            </div>

            <input
              type="url"
              name="itineraryLink"
              placeholder="Google Itinerary Link (Drive / Docs)"
              value={formData.itineraryLink}
              onChange={handleChange}
              className="input mt-4"
            />

            {/* Available Dates Section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Available Dates
              </h3>

              <div className="flex gap-3">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="input flex-1"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!dateInput) return;

                    if (!formData.availableDates.includes(dateInput)) {
                      setFormData({
                        ...formData,
                        availableDates: [...formData.availableDates, dateInput],
                      });
                    }

                    setDateInput("");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 px-4 rounded-lg text-white"
                >
                  Add
                </button>
              </div>

              {/* Date Chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.availableDates.map((date, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {date}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          availableDates: formData.availableDates.filter(
                            (d) => d !== date,
                          ),
                        })
                      }
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-white/10 px-6 py-2 rounded-lg"
              >
                ← Back
              </button>

              <button
                type="submit"
                className="bg-emerald-500 px-6 py-2 rounded-lg"
              >
                Update Trip
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
