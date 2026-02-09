import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navabr";
import Footer from "./components/Footer";
import { auth } from "./firebase";
import Protected from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminOverview from "./pages/Admin/AdminOverview";
import AdminTrips from "./pages/Admin/AdminTrips";
import AdminAddTrip from "./pages/Admin/AdminAddTrip";
import AdminLayout from "./layouts/AdminLayout";

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
        <Route path="/admin" element={<Protected></Protected>} />
        <Route path="/admin/login" element={<AdminLogin />}></Route>
      </Routes>
    </>
  );
}

export default App;
