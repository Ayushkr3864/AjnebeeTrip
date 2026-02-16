import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <p className="text-center py-20">No booking found</p>;

  const whatsappMessage = `
New Booking Received:

Name: ${booking.name}
Trip: ${booking.tourTitle}
Date: ${booking.selectedDate}
Sharing: ${booking.sharingType}
Persons: ${booking.persons}
Total: ₹${booking.totalPrice}
`;

  const whatsappLink = `https://wa.me/9811953565?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <div className="relative min-h-screen flex justify-center items-center px-6 py-20 bg-[#f6f8ff] overflow-hidden">
      {/* 🎈 Floating Shapes */}
      <div className="absolute w-72 h-72 bg-indigo-200 rounded-full top-[-60px] left-[-60px] opacity-40 animate-pulse"></div>
      <div className="absolute w-60 h-60 bg-pink-200 rounded-full bottom-[-60px] right-[-60px] opacity-40 animate-pulse"></div>
      <div className="absolute w-40 h-40 bg-yellow-200 rounded-full top-[30%] left-[5%] opacity-30 animate-bounce"></div>

      {/* 💳 Payment Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 rounded-3xl p-8 max-w-lg w-full text-center hover:shadow-2xl transition"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">
          Complete Your Payment 💳
        </h2>

        <p className="text-gray-500 mb-6">
          Secure your booking for{" "}
          <span className="font-semibold">{booking.tourTitle}</span>
        </p>

        {/* 💰 Amount Box */}
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
          <p className="text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-indigo-700">
            ₹{booking.totalPrice}
          </p>
        </div>

        {/* 📦 Booking Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-left text-sm">
          <p>
            <span className="font-semibold">Name:</span> {booking.name}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {booking.selectedDate}
          </p>
          <p>
            <span className="font-semibold">Sharing:</span>{" "}
            {booking.sharingType}
          </p>
          <p>
            <span className="font-semibold">Persons:</span> {booking.persons}
          </p>
        </div>

        {/* 🏦 Bank Details */}
        <div className="mb-6 text-left text-sm bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-700">Bank Details</h3>
          <p>Account Name: Ajnabee Trips</p>
          <p>Account No: 1234567890</p>
          <p>IFSC: HDFC0001234</p>
          <p>UPI: ajnabeetrips@upi</p>
        </div>

        {/* 📞 Action Buttons */}
        <div className="flex flex-col gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919811953565"
            className="bg-green-600 text-white py-3 rounded-full font-semibold"
          >
            📞 Call Us
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-white py-3 rounded-full font-semibold"
          >
            💬 Confirm via WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
