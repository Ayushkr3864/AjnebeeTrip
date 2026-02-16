import { motion } from "framer-motion";

const TermsAndRefundPolicy = () => {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-6 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 md:p-10">
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          📜 Terms, Policies & Important Notes
        </h2>

        {/* SECTION 1 */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              Important Notes & Terms
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Age Limit:</strong> Our group departures are curated for
                travelers aged 16 to 34 years. Private tours available outside
                this range.
              </li>
              <li>
                <strong>Check-in Policy:</strong> Early check-in is subject to
                room availability.
              </li>
              <li>
                <strong>Accommodation:</strong> Triple/quad sharing will be
                provided with extra mattresses.
              </li>
              <li>
                <strong>Arrival (Non-Delhi):</strong> Reach Delhi by{" "}
                <strong>2:00 PM</strong> on start date.
              </li>
              <li>
                <strong>Departure:</strong> Book return journey after{" "}
                <strong>5:00 PM</strong> on end date.
              </li>
              <li>
                <strong>Flexibility:</strong> Itinerary may change due to
                weather, road, or safety conditions.
              </li>
            </ul>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-200 my-6" />

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              1. Cancellation & Refund Policy
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Booking Amount:</strong> Non-refundable.
              </li>
              <li>
                <strong>30+ Days before Trip:</strong> 50% of advance charged.
              </li>
              <li>
                <strong>15–30 Days before Trip:</strong> 75% of advance charged.
              </li>
              <li>
                <strong>0–15 Days before Trip:</strong> 100% of advance charged.
              </li>
              <li>
                <strong>Unused Services:</strong> No refund for unused
                inclusions.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              2. Payment & Documentation
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full payment must be completed before departure.</li>
              <li>Valid Government ID is mandatory for boarding.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              3. Travel & Vehicle Protocol
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Strict punctuality required. Missed departure = no refund.
              </li>
              <li>AC will be switched off in hills for safety.</li>
              <li>Luggage safety is traveler's responsibility.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              4. Conduct & Discipline
            </h3>
            <p>
              Misbehavior or indiscipline will result in removal from trip
              without refund.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              5. Contingencies & Liability
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Itinerary may change due to weather, health or road conditions.
              </li>
              <li>
                We are not liable for landslides, strikes, delays or mechanical
                failures.
              </li>
              <li>
                No insurance provided. Travelers should arrange their own.
              </li>
              <li>
                No refund for canceled activities due to govt/weather issues.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TermsAndRefundPolicy;
