import { motion } from "framer-motion";
import { MapPin, CheckCircle, EyeOff, MessageSquare } from "lucide-react";
import AdminTopNav from "../../components/AdminTopNav";
import Subscriber from "./AdminSubscribers"
const stats = [
  {
    title: "Total Trips",
    value: 12,
    icon: MapPin,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Active Trips",
    value: 9,
    icon: CheckCircle,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Inactive Trips",
    value: 3,
    icon: EyeOff,
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Pending Feedback",
    value: 5,
    icon: MessageSquare,
    color: "from-amber-400 to-orange-500",
  },
];

export default function AdminOverview() {
  return (
    <>
      {/* <AdminTopNav /> */}
      <div className="min-h-screen bg-[#020617] p-6 text-white">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Overview of AjnaBee Trip platform
          </p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl shadow-xl"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
              >
                <item.icon className="text-black" />
              </div>

              <h3 className="text-sm text-gray-400">{item.title}</h3>
              <p className="text-3xl font-bold mt-1">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
        <Subscriber />
        {/* Quick Actions */}
      </div>
    </>
  );
}
