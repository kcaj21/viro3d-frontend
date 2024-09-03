import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import StructureIndex from "./pages/StructureIndex";
import Footer from "./components/ui/Footer";
import ResultsPage from "./pages/ResultsPage";


function App() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mt-36 my-auto mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/structureindex/:virus_name/:recordID"
              element={<StructureIndex />}
            />
            <Route
              path="/resultspage/:filterParam/:searchParam"
              element={<ResultsPage />}
            />
          </Routes>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
