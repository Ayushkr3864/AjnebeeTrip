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
          path="/Admin"
          element={
            <Protected>
              <AdminDashboard />
            </Protected>
          }
        ></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
      </Routes>
    </>
  );
}

export default App;
