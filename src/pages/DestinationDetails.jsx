import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

const DestinationDetails = () => {
  const { slug } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);


  const [destination, setDestination] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch destination
        const destQuery = query(
          collection(db, "destinations"),
          where("slug", "==", slug),
        );

        const destSnap = await getDocs(destQuery);

        if (!destSnap.empty) {
          const destData = {
            id: destSnap.docs[0].id,
            ...destSnap.docs[0].data(),
          };

            setDestination(destData);
            setSelectedImage(destData.imageUrl);


          // Fetch related tours
          const tourQuery = query(
            collection(db, "tours"),
            where("destinationId", "==", destData.id),
          );

          const tourSnap = await getDocs(tourQuery);

          const toursData = tourSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTours(toursData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!destination)
    return <div className="text-center py-20">Destination Not Found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO FULL IMAGE */}
      <div className="relative h-[500px] w-full">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">{destination.name}</h1>
        </div>
      </div>
      {destination.gallery && destination.gallery.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mb-16">
          {[destination.imageUrl, ...destination.gallery].map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Gallery"
              onClick={() => setSelectedImage(img)}
              className={`h-24 w-32 object-cover rounded-xl cursor-pointer border-2 ${
                selectedImage === img ? "border-blue-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-gray-600 mb-4">
          {destination.state}, {destination.country}
        </p>

        <p className="text-blue-600 mb-4">Category: {destination.category}</p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {destination.description}
        </p>

        <p className="text-gray-500 mb-10">Best Time: {destination.bestTime}</p>

        {/* BOOKING CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact")}
          className="bg-black text-white px-8 py-3 rounded-full"
        >
          Book This Destination
        </motion.button>

        {/* RELATED TOURS */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Available Tours</h2>

          {tours.length === 0 ? (
            <p>No tours available for this destination.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => navigate(`/tours/${tour.slug}`)}
                  className="cursor-pointer bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={tour.imageUrl}
                    alt={tour.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{tour.title}</h3>
                    <p className="text-sm text-gray-500">{tour.duration}</p>
                    <p className="text-blue-600 font-semibold mt-2">
                      ₹{tour.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        💬
      </a>
    </div>
  );
};

export default DestinationDetails;
