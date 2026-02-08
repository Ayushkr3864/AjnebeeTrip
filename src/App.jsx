import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Navbar from "./components/Navabr"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App
