import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StructureIndex from "./components/StructureIndex";
import Footer from "./components/Footer";
import ResultsPage from "./components/ResultsPage";



function App() {

  return (
    <>
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className='container mt-24 py-4 mx-auto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/structureindex/:structureID" element={<StructureIndex />} />
          <Route path="/resultspage/:speciesID" element={<ResultsPage />} />
        </Routes>
        </div>
      <Footer />
      </main>
    </>
  );
}

export default App;
