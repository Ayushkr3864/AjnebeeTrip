import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <p>No booking found</p>;

  const whatsappMessage = `
New Booking Received:

Name: ${booking.name}
Trip: ${booking.tourTitle}
Date: ${booking.selectedDate}
Sharing: ${booking.sharingType}
Persons: ${booking.persons}
Total: ₹${booking.totalPrice}
`;

  const whatsappLink = `https://wa.me/+919811953565?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-6 py-20">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="font-semibold">Total Amount: ₹{booking.totalPrice}</p>
        </div>

        <div className="mb-6 text-left">
          <h3 className="font-semibold mb-2">Bank Details</h3>
          <p>Account Name: Ajnabee Trips</p>
          <p>Account No: 1234567890</p>
          <p>IFSC: HDFC0001234</p>
          <p>UPI: ajnabeetrips@upi</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="tel:+91 98119 53565"
            className="bg-green-600 text-white py-3 rounded-full"
          >
            Call Us
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-white py-3 rounded-full"
          >
            Confirm via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
