import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!validate()) return;

   try {
     setLoading(true);

     // 1️⃣ Save to Firebase
     await addDoc(collection(db, "enquiries"), {
       ...formData,
       createdAt: serverTimestamp(),
     });

     // 2️⃣ Send Email to Admin
     await emailjs.send(
       import.meta.env.VITE_EMAILJS_SERVICE_ID_ENQUIRY,
       import.meta.env.VITE_EMAILJS_TEMPLATE,
       {
         name: formData.name,
         phone: formData.phone,
         email: formData.email,
         destination: formData.destination,
         message: formData.message,
       },
       import.meta.env.VITE_EMAILJS_PUBLIC,
     );

     // 3️⃣ Auto Reply to User
    //  await emailjs.send(
    //    "YOUR_SERVICE_ID",
    //    "template_user_reply",
    //    {
    //      name: formData.name,
    //      email: formData.email,
    //      destination: formData.destination,
    //    },
    //    "YOUR_PUBLIC_KEY",
    //  );

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
   } catch (error) {
     console.error("Email error:", error);
   } finally {
     setLoading(false);
   }
 };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-lg p-8 relative border border-blue-100"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition"
              >
                <X />
              </button>

              {success ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <h2 className="text-2xl font-bold text-blue-600">
                    🎉 Enquiry Sent Successfully!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Our team will contact you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    Enquire Now
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "phone", "email", "destination"].map((field) => (
                      <div key={field}>
                        <input
                          type="text"
                          placeholder={
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          value={formData[field]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field]: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        />
                        {errors[field] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div>
                      <textarea
                        placeholder="Message"
                        rows="4"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
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
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg disabled:opacity-60"
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
