import { NavLink,Link } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  MessageSquare,
  LogOut,
  Menu,
  X,
  RouteIcon,
  CalendarCheck
} from "lucide-react";
import { useState } from "react";

export default function AdminTopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition
     ${
       isActive ? "bg-amber-400 text-black" : "text-gray-300 hover:bg-white/10"
     }`;

  return (
    <header className="sticky top-0 z-30 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/Admin">
          {" "}
          <h1 className="text-xl font-bold text-amber-400">
            AjnaBee Trip <span className="text-xs text-gray-400">Admin</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/admin" end className={navItemClass}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>

          <NavLink to="/admin/trips" className={navItemClass}>
            <MapPin size={16} /> Trips
          </NavLink>

          <NavLink to="/admin/feedback" className={navItemClass}>
            <MessageSquare size={16} /> Feedback
          </NavLink>
          {/* <NavLink to="/admin/add-destination" className={navItemClass}>
            <RouteIcon size={16} /> Add Destination
          </NavLink> */}
          <NavLink to="/admin/bookings" className={navItemClass}>
            <CalendarCheck size={16} /> View Bookings
          </NavLink>
        </nav>

        {/* Desktop Logout */}
        <button className="hidden md:flex items-center gap-2 text-sm text-red-400 hover:text-red-500 font-semibold">
          <LogOut size={16} /> Logout
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#020617] px-6 py-4 space-y-2">
          <NavLink
            to="/admin"
            end
            onClick={() => setMobileOpen(false)}
            className={navItemClass}
          >
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/trips"
            onClick={() => setMobileOpen(false)}
            className={navItemClass}
          >
            <MapPin size={16} /> Trips
          </NavLink>

          <NavLink
            to="/admin/feedback"
            onClick={() => setMobileOpen(false)}
            className={navItemClass}
          >
            <MessageSquare size={16} /> Feedback
          </NavLink>
          {/* <NavLink
            to="/admin/add-destination"
            onClick={() => setMobileOpen(false)}
            className={navItemClass}
          >
            <RouteIcon size={16} /> Add destination
          </NavLink> */}
          <NavLink to="/admin/bookings" className={navItemClass}>
            <CalendarCheck size={16} /> View Bookings
          </NavLink>

          <button
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-400 hover:bg-white/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </header>
  );
}
