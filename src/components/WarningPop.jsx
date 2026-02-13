// import { motion, AnimatePresence } from "framer-motion";
// import { AlertTriangle } from "lucide-react";

// export default function WarningPopup({ open, onClose }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm px-4"
//         >
//           <motion.div
//             initial={{ scale: 0.7, y: 60 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.7, y: 60 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl p-8 text-center"
//           >
//             {/* Icon */}
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/20">
//               <AlertTriangle className="text-amber-400" size={32} />
//             </div>

//             {/* Title */}
//             <h2 className="text-2xl font-bold text-amber-400 mb-3">
//               Preview Mode
//             </h2>

//             {/* Message */}
//             <p className="text-gray-300 text-sm leading-relaxed">
//               ⚠️ Something great is taking off.
//               <br />
//               Our full website is launching soon.
//               <br />
//               This version is only for testing & preview purposes.
//             </p>

//             {/* Action */}
//             <button
//               onClick={onClose}
//               className="mt-6 w-full rounded-lg bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2.5 transition"
//             >
//               Got it 👍
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
