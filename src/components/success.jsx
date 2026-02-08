import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#020617] px-4 perspective-1000">
      {/* Animated Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
          z: -200,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          z: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-center"
      >
        <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />

        <h2 className="text-2xl font-bold text-green-400 mb-2">
          Login Successful 🎉
        </h2>

        <p className="text-gray-300 text-sm mb-6">
          You have successfully logged in to the Admin Panel.
        </p>
      </motion.div>
    </div>
  );
}
