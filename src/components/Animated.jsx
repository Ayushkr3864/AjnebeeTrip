import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AnimatedText = ({ text, className }) => {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={wordAnimation}
          className="inline-block md:mr-5 mr-2.5"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedText;

// import { motion } from "framer-motion";

// const container = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.08,
//     },
//   },
// };

// const wordAnim = {
//   hidden: {
//     opacity: 0,
//     y: 40,
//     scale: 0.9,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// export default function AnimatedText({ lines, className }) {
//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       className={className}
//     >
//       {lines.map((line, index) => (
//         <motion.div
//           key={index}
//           className="overflow-hidden"
//           variants={container}
//         >
//           {line.split(" ").map((word, i) => (
//             <motion.span
//               key={i}
//               variants={wordAnim}
//               className={`inline-block mr-2 ${
//                 word.includes("⚠️") ? "text-amber-400" : ""
//               }`}
//             >
//               {word}
//             </motion.span>
//           ))}
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

