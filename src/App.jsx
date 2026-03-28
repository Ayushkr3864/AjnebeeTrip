import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { auth } from "./firebase";
import Protected from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminOverview from "./pages/Admin/AdminOverview";
import AdminTrips from "./pages/Admin/AdminTrips";
import AdminAddTrip from "./pages/Admin/AdminAddTrip";
import AdminLayout from "./layouts/AdminLayout";
import TripDetails from "./pages/TripDetails";
import AdminReviews from "./pages/Admin/AdminReviews";
import AllTrip from "./pages/AllTrips";
import AddDestination from "./pages/Admin/AddDestination";
import DestinationDetails from "./pages/DestinationDetails";
import BookingPage from "./pages/BookingPage"
import PaymentPage from "./pages/PaymentPage";
import AdminBookings from "./pages/Admin/AdminBookings";
import AboutUs from "./pages/AboutUs"
import AdminEditTrip from "./pages/Admin/AdminEditTrip"
import Services from "./pages/services"
import AdminAddUpcommingTrip from "./pages/Admin/AddUpcommingTrip"
import WeeklyTrip from "./components/WeeklyTripDetails"
import AdminWeekly from "./pages/Admin/AdminViewWeeklyTrip"
import BookingPageWeekly from "./pages/WeeklyTripBook"

console.log("Firebase Auth:", auth);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <Protected>
              <AdminLayout>
                <AdminOverview />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/admin/trips"
          element={
            <Protected>
              <AdminLayout>
                <AdminTrips />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/admin/trips/add"
          element={
            <Protected>
              <AdminLayout>
                <AdminAddTrip />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="admin/feedback"
          element={
            <Protected>
              <AdminLayout>
                <AdminReviews />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <Protected>
              <AdminLayout>
                <AdminBookings />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/admin/edit-trip/:id"
          element={
            <Protected>
              <AdminLayout>
                <AdminEditTrip />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/admin/upcommingTrip"
          element={
            <Protected>
              <AdminLayout>
                <AdminAddUpcommingTrip />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/view/admin/upcommingTrip"
          element={
            <Protected>
              <AdminLayout>
                <AdminWeekly />
              </AdminLayout>
            </Protected>
          }
        />

        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/alltrip" element={<AllTrip />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/bookweeklytrip/:id" element={<BookingPageWeekly />} />
        <Route path="/weeklytrip/:id" element={<WeeklyTrip />} />
        {/* <Route path="about" element={<AboutUs />} /> */}

        <Route path="/payment/:id" element={<PaymentPage />} />

        {/* <Route
          path="/admin/add-destination"
          element={
            <Protected>
              <AdminLayout>
                <AddDestination />
              </AdminLayout>
            </Protected>
          }
        /> */}

        <Route path="/admin" element={<Protected></Protected>} />
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/destinations/:slug" element={<DestinationDetails />} />
      </Routes>
    </>
  );
}

export default App;
