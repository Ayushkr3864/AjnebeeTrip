import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X,Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/", navigate:"#footer" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
];

// Animation variants
const mobileMenu = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#12293d]/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl hidden md:flex font-extrabold text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Ajnabee<span className="text-emerald-400">Trip</span>
          </NavLink>
            <a
              href="tel:+919999999999"
              className="flex items-center justify-center gap-3  py-2 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition"
            >
              <Phone />
              Call Us
            </a>
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-white/90 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `hover:text-emerald-400 transition ${
                      isActive ? "text-emerald-400" : ""
                    }`
                  }
                >
                  <a href={link.navigate}>{link.name}</a>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#12293d] z-50 p-6 flex flex-col"
              variants={mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close */}
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setOpen(false)}
              >
                <X size={28} />
              </button>

              {/* Menu Links */}
              <ul className="mt-20 flex flex-col text-white text-lg font-semibold">
                {navLinks.map((link, index) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className="block py-4 hover:text-emerald-400 transition"
                    >
                      {link.name}
                    </NavLink>

                    {/* Divider line */}
                    {index !== navLinks.length - 1 && (
                      <div className="h-px bg-white/10" />
                    )}
                  </li>
                ))}
              </ul>

              {/* Call Us Button */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <a
                  href="tel:+919999999999"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition"
                >
                  <Phone />
                  Call Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
