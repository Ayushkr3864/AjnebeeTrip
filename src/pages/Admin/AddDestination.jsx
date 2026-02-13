import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../../index.css";

const AddDestination = () => {
  const [form, setForm] = useState({
    name: "",
    state: "",
    country: "",
    category: "",
    bestTime: "",
    description: "",
    featured: false,
  });

 const [coverImage, setCoverImage] = useState(null);
 const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

 const uploadImage = async (file) => {
   const data = new FormData();
   data.append("file", file);
   data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

   const res = await fetch(
     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
     {
       method: "POST",
       body: data,
     },
   );

   const result = await res.json();
   return result.secure_url;
 };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!coverImage) {
    alert("Please upload an image");
    return;
  }

  try {
    setLoading(true);

    // Upload cover image
    const coverUrl = await uploadImage(coverImage);

    // Upload gallery images
    const galleryUrls = await Promise.all(
      galleryImages.map((img) => uploadImage(img)),
    );

    // Save ONLY ONCE
    await addDoc(collection(db, "destinations"), {
      ...form,
      slug: generateSlug(form.name),
      imageUrl: coverUrl,
      gallery: galleryUrls,
      createdAt: serverTimestamp(),
    });

    alert("Destination Added Successfully!");

    // Reset form
    setForm({
      name: "",
      state: "",
      country: "",
      category: "",
      bestTime: "",
      description: "",
      featured: false,
    });
  } catch (error) {
    console.error(error.message);
    alert(error.message || "Error adding destination");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Add New Destination</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Destination Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          className="input"
          required
        />

        <input
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="input"
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="input"
          required
        >
          <option value="">Select Category</option>
          <option value="Hill">Hill</option>
          <option value="Beach">Beach</option>
          <option value="Heritage">Heritage</option>
          <option value="Adventure">Adventure</option>
        </select>

        <input
          type="text"
          placeholder="Best Time to Visit"
          value={form.bestTime}
          onChange={(e) => setForm({ ...form, bestTime: e.target.value })}
          className="input"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input"
          rows="4"
          required
        />

        <label>Cover Image</label>
        <input
          type="file"
          onChange={(e) => setCoverImage(e.target.files[0])}
          accept="image/*"
          required
        />

        <label>Gallery Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => setGalleryImages([...e.target.files])}
          accept="image/*"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured Destination
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          {loading ? "Adding..." : "Add Destination"}
        </button>
      </form>
    </div>
  );
};

export default AddDestination;
