import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import StructureIndex from "./pages/StructureIndex";
import Footer from "./components/ui/Footer";
import ProteinResultsPage from "./pages/ProteinResultsPage";
import FeatureBrowserContainer from "./components/FeatureBrowserContainer";
import VirusResultsPage from "./pages/VirusResultsPage";

function App() {
  return (
    <>
      <main className="flex  flex-col">
        <Navbar />
        <div className="container min-h-screen mt-48 my-auto mx-auto">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/resultspage/:filterParam/:searchParam"
              element={<VirusResultsPage />}
            ></Route>
            <Route
              path="/proteinresultspage/:filterParam/:searchParam"
              element={<ProteinResultsPage />}
            ></Route>
            <Route
              path="/structureindex/:filterParam/:searchParam"
              element={<StructureIndex />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
