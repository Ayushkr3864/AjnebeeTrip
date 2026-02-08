import { Phone, MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section
      className="py-28"
      style={{
        background: "linear-gradient(135deg, #eef5ff, #f6f8fb)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-6"
          style={{ fontFamily: "Fraunces, serif", color: "#243047" }}
        >
          Ready to Plan Your Next Journey?
        </motion.h2>

        <p
          className="mb-10 text-lg"
          style={{ color: "#5f6b7a", fontFamily: "Space Grotesk" }}
        >
          Talk to our travel experts and get a customized plan today.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="tel:+917701984719"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-sky-500 text-white font-medium"
          >
            <Phone size={18} /> Call Now
          </a>

          <a
            href="https://wa.me/7701 984 719"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500 text-white font-medium"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>

          <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white font-medium">
            <Calendar size={18} /> Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
