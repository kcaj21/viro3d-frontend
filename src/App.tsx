import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StructureIndex from "./components/StructureIndex";
import Footer from "./components/Footer";


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/structureindex/:structureID" element={<StructureIndex />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
