import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

export default function EnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "enquiries"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID_ENQUIRY,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC,
      );

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        destination: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, field, placeholder }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-3 text-blue-400" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={formData[field]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-blue-200 
        bg-gradient-to-br from-white to-blue-50 
        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
        outline-none transition hover:shadow-md"
      />
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Floating Blue Shapes */}
          <div className="fixed inset-0 z-40 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -40, 0],
                  x: [0, 30, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute w-72 h-72 rounded-full blur-3xl opacity-30 
                bg-gradient-to-r from-blue-400 to-indigo-500`}
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                }}
              />
            ))}
          </div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 60 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-8 rounded-3xl 
              bg-white/80 backdrop-blur-xl 
              border border-blue-200 shadow-2xl"
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-blue-600"
              >
                <X />
              </button>

              {success ? (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="text-5xl mb-3">✅</div>
                  <h2 className="text-2xl font-bold text-blue-600">
                    Enquiry Sent!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    We will contact you soon ✨
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Enquire Now
                  </h2>
                  <p className="text-center text-gray-500 mb-6 text-sm">
                    Plan your dream trip with us ✈️
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField icon={User} field="name" placeholder="Name" />
                    <InputField
                      icon={Phone}
                      field="phone"
                      placeholder="Phone"
                    />
                    <InputField icon={Mail} field="email" placeholder="Email" />
                    <InputField
                      icon={MapPin}
                      field="destination"
                      placeholder="Destination"
                    />

                    <div>
                      <textarea
                        rows="4"
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-2xl border border-blue-200 
                        bg-gradient-to-br from-white to-blue-50 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        outline-none transition"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-2xl font-semibold text-white
                      bg-gradient-to-r from-blue-500 to-indigo-500
                      hover:scale-105 transition shadow-lg disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Submit Enquiry"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
