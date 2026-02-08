import { Mail, Phone, MapPin } from "lucide-react";
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer
      id="footer"
      className="text-gray-300 footer"
      style={{ backgroundColor: "#101828" }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <img
            src="/Logo-bg.png"
            className="h-30 w-30 -mt-5"
            alt="Ajnaabee Trip"
          />
          <p className="text-sm leading-relaxed text-gray-400">
            Crafting unforgettable travel experiences with comfort, care, and
            curated journeys across beautiful destinations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link>About Us</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="#Destination">Destinations</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="popular">Packages</Link>
            </li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Services
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Custom Tours</li>
            <li className="hover:text-white cursor-pointer">
              Honeymoon Packages
            </li>
            <li className="hover:text-white cursor-pointer">Adventure Trips</li>
            <li className="hover:text-white cursor-pointer">Group Tours</li>
            <li className="hover:text-white cursor-pointer">Hotel Booking</li>
          </ul>
        </div> */}

        {/* Newsletter + Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>

          {/* Newsletter */}
          <div className="flex items-center mb-5 gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 border-amber-100 border-2 rounded-lg text-sm text-gray-900 outline-none"
            />
            <button className="px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold">
              Subscribe
            </button>
          </div>

          {/* Contact */}
          <ul className="space-y-3 text-sm text-gray-400">
            <a href="tel:+9198119 53565">
              {" "}
              <li className="flex items-center gap-2">
                <Phone size={16} /> +91 98119 53565
              </li>
            </a>
            <a href="mailto:info@ajnabeetrip.com?subject=Travel Inquiry&body=Hello Ajnabee Trip,">
              <li className="flex items-center gap-2">
                <Mail size={16} /> info@ajnabeetrip.com
              </li>
            </a>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Greater Noida,Delhi NCR, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Ajnabee Trip. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
